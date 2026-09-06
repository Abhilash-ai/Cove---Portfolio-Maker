import { CriticReportDto, CriticFeedbackItem, CriticScoreBreakdown } from '@cove/shared';

interface PortfolioCriticPayload {
  portfolio: {
    id: string;
    title: string;
    description?: string;
    projects: Array<{
      id: string;
      title: string;
      shortDescription?: string;
      fullDescription?: string;
      coverImage?: string;
      media?: any[];
      tags?: string[];
      links?: any;
    }>;
    designSystem?: any;
    sectionOrder?: string[];
  };
  profile?: {
    headline?: string;
    bio?: string;
    avatarUrl?: string;
    socialLinks?: any[];
  };
}

export class CriticService {
  async evaluatePortfolio(payload: any): Promise<CriticReportDto> {
    return this.critiquePortfolio(payload);
  }

  async critiquePortfolio(payload: PortfolioCriticPayload): Promise<CriticReportDto> {
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (apiKey) {
      try {
        return await this.evaluateWithClaude(payload, apiKey);
      } catch (err) {
        console.warn('Claude Critic evaluation failed, falling back to heuristic engine:', err);
      }
    }

    return this.evaluateHeuristic(payload);
  }

  private async evaluateWithClaude(payload: PortfolioCriticPayload, apiKey: string): Promise<CriticReportDto> {
    const systemPrompt = `You are a world-class design director and executive design recruiter specializing in portfolio criticism.
Evaluate the given portfolio data across 5 dimensions:
1. completeness: Are bio, avatar, headline, projects, and contact channels present?
2. storytelling: Do case studies clearly articulate problem, constraints, solution, and measurable business/design outcomes?
3. visualHierarchy: Are project covers compelling, media rich, and layout structured logically?
4. mobileReadiness: Is project density appropriate for mobile viewports? (Not overwhelming, well-spaced).
5. contactClarity: Is it effortless for a recruiter or client to initiate communication?

Output STRICT JSON matching this schema:
{
  "overallScore": number (0-100),
  "breakdown": {
    "completeness": number (0-100),
    "storytelling": number (0-100),
    "visualHierarchy": number (0-100),
    "mobileReadiness": number (0-100),
    "contactClarity": number (0-100)
  },
  "strengths": string[],
  "feedbackItems": [
    {
      "id": string,
      "category": "completeness" | "storytelling" | "visual_hierarchy" | "mobile" | "contact",
      "severity": "high" | "medium" | "low",
      "title": string,
      "description": string,
      "actionableRecommendation": string,
      "affectedSection": string,
      "affectedProjectId": string (optional)
    }
  ]
}`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 2000,
        system: systemPrompt,
        messages: [{ role: 'user', content: JSON.stringify(payload) }]
      })
    });

    if (!res.ok) {
      throw new Error(`Claude HTTP ${res.status}: ${await res.text()}`);
    }

    const data: any = await res.json();
    const textContent = data.content?.[0]?.text || '{}';
    const parsed = JSON.parse(textContent);

    return {
      portfolioId: payload.portfolio.id,
      overallScore: parsed.overallScore || 75,
      breakdown: parsed.breakdown || {
        completeness: 75,
        storytelling: 70,
        visualHierarchy: 80,
        mobileReadiness: 75,
        contactClarity: 75
      },
      strengths: parsed.strengths || ['Clean presentation of foundational work.'],
      feedbackItems: (parsed.feedbackItems || []).map((item: any, idx: number) => ({
        ...item,
        id: item.id || `fb-${idx + 1}`
      })),
      analyzedAt: new Date().toISOString(),
      provider: 'claude'
    };
  }

  private evaluateHeuristic(payload: PortfolioCriticPayload): CriticReportDto {
    const { portfolio, profile } = payload;
    const feedbackItems: CriticFeedbackItem[] = [];
    const strengths: string[] = [];

    let completenessScore = 60;
    let storytellingScore = 60;
    let visualHierarchyScore = 60;
    let mobileReadinessScore = 70;
    let contactClarityScore = 60;

    // 1. Profile Checks
    if (!profile?.avatarUrl) {
      completenessScore -= 10;
      feedbackItems.push({
        id: 'fb-avatar-missing',
        category: 'completeness',
        severity: 'medium',
        title: 'Missing profile portrait or avatar',
        description: 'Your portfolio currently lacks a personal photo or professional monogram.',
        actionableRecommendation: 'Upload a high-resolution portrait or signature avatar to build immediate creator rapport.',
        affectedSection: 'hero'
      });
    } else {
      completenessScore += 10;
      strengths.push('Personal avatar anchors the hero section effectively.');
    }

    if (!profile?.headline || profile.headline.trim().length < 8) {
      completenessScore -= 10;
      feedbackItems.push({
        id: 'fb-headline-weak',
        category: 'completeness',
        severity: 'high',
        title: 'Vague or missing headline',
        description: 'A crisp, role-defining headline allows hiring leads and clients to immediately categorize your specialization.',
        actionableRecommendation: 'Add a distinct headline (e.g. Senior Spatial Designer & Computational Architect).',
        affectedSection: 'hero'
      });
    } else {
      completenessScore += 10;
      strengths.push('Clear professional headline: ' + profile.headline.trim());
    }

    if (!profile?.bio || profile.bio.trim().length < 40) {
      storytellingScore -= 15;
      feedbackItems.push({
        id: 'fb-bio-brief',
        category: 'narrative',
        severity: 'medium',
        title: 'Bio is brief or missing narrative depth',
        description: 'Recruiters and collaborators seek personal context behind the craft.',
        actionableRecommendation: 'Expand your bio into 2-3 sentences highlighting your ethos, approach, and current focus.',
        affectedSection: 'hero'
      });
    } else {
      storytellingScore += 15;
      strengths.push('Engaging biographical narrative establishes professional personality.');
    }

    // 2. Contact & Social Links
    const socialCount = profile?.socialLinks?.length || 0;
    if (socialCount === 0) {
      contactClarityScore -= 20;
      feedbackItems.push({
        id: 'fb-no-social-links',
        category: 'contact',
        severity: 'high',
        title: 'No external contact or social channels linked',
        description: 'Visitors have no frictionless channel to verify your work on GitHub, LinkedIn, or reach out directly.',
        actionableRecommendation: 'Connect at least LinkedIn, GitHub, or an email mailto link in your profile.',
        affectedSection: 'contact'
      });
    } else {
      contactClarityScore += 20;
      strengths.push(socialCount + ' external social and professional channels linked.');
    }

    // 3. Projects Analysis
    const projectCount = portfolio.projects.length;
    if (projectCount === 0) {
      completenessScore -= 30;
      storytellingScore -= 30;
      visualHierarchyScore -= 30;
      feedbackItems.push({
        id: 'fb-no-projects',
        category: 'completeness',
        severity: 'high',
        title: 'Zero projects added to portfolio',
        description: 'A portfolio requires showcase projects to demonstrate execution excellence.',
        actionableRecommendation: 'Add at least 2 featured case studies highlighting your strongest recent achievements.',
        affectedSection: 'projects'
      });
    } else {
      if (projectCount === 1) {
        storytellingScore -= 5;
        feedbackItems.push({
          id: 'fb-single-project',
          category: 'completeness',
          severity: 'low',
          title: 'Only one showcase project present',
          description: 'A single project can feel like a landing page rather than a comprehensive body of work.',
          actionableRecommendation: 'Consider curating a secondary project to demonstrate versatility across problem types.',
          affectedSection: 'projects'
        });
      } else {
        completenessScore += 15;
        strengths.push('Solid showcase breadth with ' + projectCount + ' curated projects.');
      }

      // Project narrative & media depth
      let projectsMissingCovers = 0;
      let projectsMissingOutcomes = 0;

      for (const p of portfolio.projects) {
        if (!p.coverImage && (!p.media || p.media.length === 0)) {
          projectsMissingCovers++;
          feedbackItems.push({
            id: 'fb-no-cover-' + p.id,
            category: 'visual_hierarchy',
            severity: 'high',
            title: 'Missing visual cover on ' + p.title,
            description: 'Projects without cover imagery suffer from low click-through rates in grid previews.',
            actionableRecommendation: 'Upload an evocative high-resolution render or screenshot for ' + p.title + '.',
            affectedSection: 'projects',
            affectedProjectId: p.id
          });
        }

        const desc = p.fullDescription || p.shortDescription || '';
        if (desc.length < 120) {
          projectsMissingOutcomes++;
          feedbackItems.push({
            id: 'fb-short-narrative-' + p.id,
            category: 'narrative',
            severity: 'medium',
            title: 'Case study for ' + p.title + ' lacks problem & outcome depth',
            description: 'The description gives minimal context into technical friction, architectural decisions, or quantitative results.',
            actionableRecommendation: 'Use Cove Copilot (Turn into a case study) to unpack Problem, Approach, Solution, and Outcome.',
            affectedSection: 'projects',
            affectedProjectId: p.id
          });
        }
      }

      if (projectsMissingCovers === 0) {
        visualHierarchyScore += 20;
        strengths.push('Every project is reinforced with distinct, evocative cover imagery.');
      } else {
        visualHierarchyScore -= projectsMissingCovers * 10;
      }

      if (projectsMissingOutcomes === 0) {
        storytellingScore += 15;
        strengths.push('Rich contextual storytelling present across all project case studies.');
      } else {
        storytellingScore -= projectsMissingOutcomes * 5;
      }
    }

    // 4. Mobile & Layout Considerations
    if (projectCount > 8) {
      mobileReadinessScore -= 10;
      feedbackItems.push({
        id: 'fb-too-many-projects',
        category: 'mobile',
        severity: 'low',
        title: 'High project density on mobile viewports',
        description: 'Displaying over 8 projects creates excessive vertical scrolling fatigue on handheld devices.',
        actionableRecommendation: 'Curate down to top 4-6 marquee works or utilize a compact list interaction layout.',
        affectedSection: 'projects'
      });
    } else {
      mobileReadinessScore += 15;
      strengths.push('Optimal project count ensures rapid scanning on mobile viewports.');
    }

    // Clamp scores
    const clamp = (val: number) => Math.max(20, Math.min(98, Math.round(val)));
    const breakdown: CriticScoreBreakdown = {
      completeness: clamp(completenessScore),
      storytelling: clamp(storytellingScore),
      visualHierarchy: clamp(visualHierarchyScore),
      mobileReadiness: clamp(mobileReadinessScore),
      contactClarity: clamp(contactClarityScore)
    };

    const overallScore = clamp(
      (breakdown.completeness * 0.25) +
      (breakdown.storytelling * 0.25) +
      (breakdown.visualHierarchy * 0.20) +
      (breakdown.mobileReadiness * 0.15) +
      (breakdown.contactClarity * 0.15)
    );

    return {
      portfolioId: portfolio.id,
      overallScore,
      breakdown,
      strengths: strengths.length > 0 ? strengths : ['Clear baseline portfolio structure established.'],
      feedbackItems,
      analyzedAt: new Date().toISOString(),
      provider: 'local_demo'
    };
  }
}

export const criticService = new CriticService();
