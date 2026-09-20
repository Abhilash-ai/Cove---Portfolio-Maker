import React from 'react';
import { ThemeTokens } from '@cove/shared';
import { Check, Zap } from 'lucide-react';

export interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
}

interface Props {
  tokens: ThemeTokens;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const DEFAULT_PLANS: PricingPlan[] = [
  {
    name: 'Advisory & Consultation',
    price: '$250',
    period: '/ hr',
    description: 'Direct 1-on-1 strategy sessions on product architecture, design systems, or creative tech.',
    features: [
      '60-minute video session',
      'Actionable architecture audit',
      'Follow-up summary & roadmap',
      'Async Q&A for 7 days',
    ],
    ctaText: 'Book Session',
  },
  {
    name: 'Sprint Engagement',
    price: '$4,800',
    period: '/ 2-wk sprint',
    description: 'Dedicated embedded design & engineering sprint to ship critical MVPs or redesigns.',
    features: [
      'End-to-end UX/UI execution',
      'Production-ready React/TypeScript',
      'Weekly stakeholder syncs',
      'Design token integration',
      'Priority turnaround',
    ],
    isPopular: true,
    ctaText: 'Start a Sprint',
  },
  {
    name: 'Retainer Partnership',
    price: '$8,500',
    period: '/ month',
    description: 'Ongoing technical design leadership and quarterly design system maintenance.',
    features: [
      'Flexible weekly allocation',
      'Design system governance',
      'High-fidelity motion prototypes',
      'Direct Slack/Discord access',
      'Quarterly code audits',
    ],
    ctaText: 'Inquire Availability',
  },
];

export function Pricing({ tokens, title, subtitle, plans = DEFAULT_PLANS }: Props) {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto" style={{ backgroundColor: tokens.colors.background }}>
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span
          className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
          style={{ borderColor: tokens.colors.border, color: tokens.colors.accent }}
        >
          Transparent Services
        </span>
        <h2
          className="text-3xl sm:text-4xl font-extrabold mt-3 mb-2"
          style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
        >
          {title || 'Engagement & Pricing'}
        </h2>
        <p className="text-xs sm:text-sm" style={{ color: tokens.colors.textSecondary }}>
          {subtitle || 'Flexible collaboration models tailored for venture-backed startups and creative studios.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-2xl border p-7 sm:p-8 flex flex-col justify-between relative transition-all duration-300 shadow-sm hover:shadow-xl ${
              plan.isPopular ? 'scale-105 z-10' : ''
            }`}
            style={{
              backgroundColor: tokens.colors.surface,
              borderColor: plan.isPopular ? tokens.colors.accent : tokens.colors.border,
            }}
          >
            {plan.isPopular && (
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm"
                style={{ backgroundColor: tokens.colors.accent, color: '#ffffff' }}
              >
                <Zap className="w-3 h-3" />
                <span>Most Popular</span>
              </div>
            )}

            <div>
              <h3 className="text-lg font-bold" style={{ color: tokens.colors.textPrimary }}>
                {plan.name}
              </h3>
              <p className="text-xs mt-1 mb-6 min-h-[36px]" style={{ color: tokens.colors.textSecondary }}>
                {plan.description}
              </p>

              <div className="flex items-baseline gap-1 mb-6">
                <span
                  className="text-3xl sm:text-4xl font-extrabold font-mono"
                  style={{ color: tokens.colors.textPrimary }}
                >
                  {plan.price}
                </span>
                <span className="text-xs font-mono" style={{ color: tokens.colors.textSecondary }}>
                  {plan.period}
                </span>
              </div>

              <div className="space-y-3 pt-6 border-t" style={{ borderColor: tokens.colors.border }}>
                {plan.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-2.5 text-xs">
                    <span
                      className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: tokens.colors.badgeBg, color: tokens.colors.accent }}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </span>
                    <span style={{ color: tokens.colors.textPrimary }}>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="mt-8 w-full py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider transition shadow-sm"
              style={{
                backgroundColor: plan.isPopular ? tokens.colors.accent : tokens.colors.border,
                color: plan.isPopular ? '#ffffff' : tokens.colors.textPrimary,
              }}
            >
              {plan.ctaText}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
