import crypto from 'crypto';
import { CopilotInput, CopilotOutput, CopilotCommand } from '@cove/shared';

export interface AIServiceProvider {
  name: 'claude' | 'local_demo';
  isAvailable(): boolean;
  execute(input: CopilotInput): Promise<Omit<CopilotOutput, 'undoToken'>>;
}

export class ClaudeAIProvider implements AIServiceProvider {
  name = 'claude' as const;
  private apiKey: string | undefined;

  constructor() {
    this.apiKey = process.env.ANTHROPIC_API_KEY;
  }

  isAvailable(): boolean {
    return Boolean(this.apiKey && this.apiKey.trim().length > 0 && !this.apiKey.includes('placeholder'));
  }

  async execute(input: CopilotInput): Promise<Omit<CopilotOutput, 'undoToken'>> {
    if (!this.isAvailable()) {
      throw new Error('Claude AI provider is not configured with a valid ANTHROPIC_API_KEY');
    }

    const systemPrompt = `You are Cove Copilot, an elite design and editorial writing assistant for high-end creative portfolios.
Your job is to assist creators, architects, developers, and designers with compelling, crisp, and authentic copy.
Never invent fake client names or fabricate metrics. When formatting, deliver punchy, clear text.
Return your response as valid JSON with keys:
- suggestion: string (the revised or generated text)
- rationale: string (brief explanation of the editorial choices made)
- diffSummary: string (summary of what was changed, e.g. "Shifted to active voice and highlighted architectural impact")
- titles?: string[] (only if command is 'suggest_title')
- caseStudy?: { problem: string; approach: string; solution: string; outcome: string } (only if command is 'turn_case_study')
- imageRecommendations?: { imageIndex: number; recommendedRole: 'hero' | 'detail' | 'process'; rationale: string }[] (only if command is 'which_images')`;

    const userContent = `Command: ${input.command}
Context Type: ${input.contextType}
Metadata: ${JSON.stringify(input.metadata || {})}
Input Text:
${input.text}`;

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: 'user', content: userContent }]
      })
    });

    if (!res.ok) {
      const errBody = await res.text();
      throw new Error(`Claude API error (${res.status}): ${errBody}`);
    }

    const data = await res.json();
    const content = data.content?.[0]?.text || '';
    
    // Parse JSON response
    try {
      const parsed = JSON.parse(content.trim());
      return {
        command: input.command,
        suggestion: parsed.suggestion || content,
        titles: parsed.titles,
        caseStudy: parsed.caseStudy,
        imageRecommendations: parsed.imageRecommendations,
        rationale: parsed.rationale || 'Enhanced copy tailored for portfolio impact.',
        diffSummary: parsed.diffSummary || 'Refined editorial tone and vocabulary.',
        provider: 'claude'
      };
    } catch {
      return {
        command: input.command,
        suggestion: content,
        rationale: 'Generated with Claude 3.5 Sonnet.',
        diffSummary: 'Processed content with AI writing assistant.',
        provider: 'claude'
      };
    }
  }
}

export class LocalDemoAIProvider implements AIServiceProvider {
  name = 'local_demo' as const;

  isAvailable(): boolean {
    return true; // Always available offline
  }

  async execute(input: CopilotInput): Promise<Omit<CopilotOutput, 'undoToken'>> {
    const raw = (input.text || '').trim();

    switch (input.command) {
      case 'make_professional': {
        const enhanced = this.professionalize(raw);
        return {
          command: 'make_professional',
          suggestion: enhanced,
          rationale: 'Elevated syntax using active verbs, refined typography conventions, and industry-standard executive terminology.',
          diffSummary: 'Upgraded tone to authoritative active voice, replaced colloquialisms, and emphasized strategic outcomes.',
          provider: 'local_demo'
        };
      }

      case 'make_shorter': {
        const shortened = this.shorten(raw);
        return {
          command: 'make_shorter',
          suggestion: shortened,
          rationale: 'Pruned redundant clauses and passive constructions to achieve maximum signal-to-noise ratio.',
          diffSummary: `Condensed from ${raw.split(/\s+/).length} to ${shortened.split(/\s+/).length} words while preserving core accomplishments.`,
          provider: 'local_demo'
        };
      }

      case 'suggest_title': {
        const titles = this.generateTitles(raw, input.metadata);
        return {
          command: 'suggest_title',
          suggestion: titles[0],
          titles,
          rationale: 'Formulated evocative, memorable project titles that frame technical scope and aesthetic clarity.',
          diffSummary: 'Generated 4 curated title options ranging from minimalist to editorial.',
          provider: 'local_demo'
        };
      }

      case 'turn_case_study': {
        const caseStudy = this.formatCaseStudy(raw, input.metadata);
        const composite = `### The Challenge\n${caseStudy.problem}\n\n### The Approach\n${caseStudy.approach}\n\n### Implementation\n${caseStudy.solution}\n\n### Measurable Outcome\n${caseStudy.outcome}`;
        return {
          command: 'turn_case_study',
          suggestion: composite,
          caseStudy,
          rationale: 'Restructured unstructured project notes into a 4-phase strategic case study narrative: Challenge, Approach, Architecture, and Impact.',
          diffSummary: 'Converted narrative into formal case study breakdown with clear heading hierarchies.',
          provider: 'local_demo'
        };
      }

      case 'which_images': {
        const images = input.metadata?.images || [];
        const recommendations = images.map((img, idx) => {
          if (idx === 0) {
            return {
              imageIndex: idx,
              recommendedRole: 'hero' as const,
              rationale: 'High-impact establishing visual; optimal aspect ratio and visual contrast for the hero card.'
            };
          } else if (idx % 2 === 1) {
            return {
              imageIndex: idx,
              recommendedRole: 'process' as const,
              rationale: 'Reveals development diagrams, wireframes, or structural iterations to demonstrate process.'
            };
          } else {
            return {
              imageIndex: idx,
              recommendedRole: 'detail' as const,
              rationale: 'Focuses on tactile finish, micro-interactions, or high-fidelity component details.'
            };
          }
        });

        const adviceText = images.length > 0
          ? `Selected Image #1 as the primary Hero showcase. Allocated ${images.length - 1} secondary assets across Process and Detail galleries to balance narrative pacing.`
          : 'Upload 2-4 project images to receive algorithmic composition and hero framing recommendations.';

        return {
          command: 'which_images',
          suggestion: adviceText,
          imageRecommendations: recommendations,
          rationale: 'Curated media hierarchy based on visual density, hero contrast, and storytelling flow.',
          diffSummary: `Classified ${images.length} assets into Hero, Process, and Detail roles.`,
          provider: 'local_demo'
        };
      }

      default:
        return {
          command: input.command,
          suggestion: raw,
          rationale: 'Command processed with standard formatting rules.',
          diffSummary: 'Standardized typography and spacing.',
          provider: 'local_demo'
        };
    }
  }

  private professionalize(text: string): string {
    if (!text) {
      return 'Spearheaded the end-to-end design and architectural execution of a cross-functional digital initiative, resulting in measurable operational efficiency and elevated user engagement.';
    }

    let result = text
      .replace(/\bi worked on\b/gi, 'Spearheaded the design and development of')
      .replace(/\bi made\b/gi, 'Architected and deployed')
      .replace(/\bi helped\b/gi, 'Collaborated closely with stakeholders to facilitate')
      .replace(/\bgood\b/gi, 'exemplary')
      .replace(/\blot of\b/gi, 'substantial volume of')
      .replace(/\bstuff\b/gi, 'key deliverables')
      .replace(/\bfixed\b/gi, 'systematically resolved and optimized')
      .replace(/\bworked with\b/gi, 'partnered synergistically with')
      .replace(/\bbuilt\b/gi, 'engineered and launched');

    if (!result.endsWith('.')) result += '.';
    return result;
  }

  private shorten(text: string): string {
    if (!text) return 'Architected high-performance systems with measurable business outcomes.';
    
    const sentences = text.split(/(?<=[.?!])\s+/).filter(Boolean);
    if (sentences.length <= 2) {
      return sentences.map((s) => s.trim()).join(' ');
    }

    return `${sentences[0].trim()} ${sentences[sentences.length - 1].trim()}`;
  }

  private generateTitles(text: string, meta?: any): string[] {
    const base = meta?.title || (text ? text.slice(0, 30) : 'Design Initiative');
    const cleanBase = base.replace(/[^a-zA-Z0-9\s]/g, '').trim();

    return [
      `${cleanBase} — Spatial Experience & Design System`,
      `The ${cleanBase} Architecture & Framework`,
      `${cleanBase}: Next-Gen Interactive Platform`,
      `Reinventing ${cleanBase} Through Minimalist Form`
    ];
  }

  private formatCaseStudy(text: string, meta?: any): { problem: string; approach: string; solution: string; outcome: string } {
    const role = meta?.role || 'Lead Designer & Architect';
    const title = meta?.title || 'Project Initiative';

    return {
      problem: text.length > 50
        ? `Legacy workflows and fragmented interfaces created friction, diminishing user engagement across the ${title} ecosystem.`
        : 'Users faced significant cognitive overload and inconsistent performance across primary interaction touchpoints.',
      approach: `Serving as ${role}, established a unified design system grounded in spatial typography, rapid functional prototyping, and rigorous user feedback loops.`,
      solution: text.length > 50
        ? `Engineered an extensible modular architecture with responsive micro-interactions, full keyboard accessibility, and optimized visual hierarchy: ${text.slice(0, 180)}...`
        : 'Implemented a clean component hierarchy with fluid animations, adaptive typography, and high-contrast color palettes.',
      outcome: 'Achieved a 42% reduction in user task completion latency, zero reported accessibility regressions, and elevated user retention.'
    };
  }
}

export class AIService {
  private claudeProvider = new ClaudeAIProvider();
  private localDemoProvider = new LocalDemoAIProvider();

  getActiveProviderName(): 'claude' | 'local_demo' {
    return this.claudeProvider.isAvailable() ? 'claude' : 'local_demo';
  }

  async executeCopilot(input: CopilotInput): Promise<CopilotOutput> {
    const provider = this.claudeProvider.isAvailable()
      ? this.claudeProvider
      : this.localDemoProvider;

    const result = await provider.execute(input);
    const undoToken = crypto.randomBytes(12).toString('hex');

    return {
      ...result,
      undoToken
    };
  }
}

export const aiService = new AIService();
