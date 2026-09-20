import React, { useState } from 'react';
import { ThemeTokens } from '@cove/shared';
import { ChevronDown } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  tokens: ThemeTokens;
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

const DEFAULT_FAQS: FAQItem[] = [
  {
    question: 'What types of engagements do you take on?',
    answer:
      'I specialize in design engineering, early-stage MVP prototyping, and large-scale design systems. Typical engagements range from focused 2-week sprints to ongoing retainer partnerships for venture-backed startups.',
  },
  {
    question: 'How do you collaborate across time zones?',
    answer:
      'I am based in Brooklyn, NY (ET) with standard overlap hours for European and West Coast teams. We use async-first communication via Slack and Loom, paired with scheduled milestone reviews.',
  },
  {
    question: 'What tech stack do you work with?',
    answer:
      'On the design side: Figma, Tokens Studio, Principle. On engineering: React 18/19, TypeScript, Next.js, Tailwind CSS, Framer Motion, and WebGL/Three.js for interactive experiences.',
  },
  {
    question: 'Can you work with our existing engineering and product teams?',
    answer:
      'Yes. I routinely embed with in-house product squads, contributing PRs directly to their repositories, authoring storybooks, and running collaborative design reviews.',
  },
  {
    question: 'What is your availability for new projects?',
    answer:
      'Currently booking sprint engagements for the upcoming quarter. Feel free to reach out directly through the contact section or book an advisory session.',
  },
];

export function FAQ({ tokens, title, subtitle, faqs = DEFAULT_FAQS }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function toggle(idx: number) {
    setOpenIndex(openIndex === idx ? null : idx);
  }

  return (
    <section className="py-20 px-6 max-w-4xl mx-auto" style={{ backgroundColor: tokens.colors.background }}>
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span
          className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
          style={{ borderColor: tokens.colors.border, color: tokens.colors.accent }}
        >
          Common Inquiries
        </span>
        <h2
          className="text-3xl sm:text-4xl font-extrabold mt-3 mb-2"
          style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
        >
          {title || 'Frequently Asked Questions'}
        </h2>
        <p className="text-xs sm:text-sm" style={{ color: tokens.colors.textSecondary }}>
          {subtitle || 'Everything you need to know about working together and engagement expectations.'}
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border transition-all duration-200 overflow-hidden shadow-sm"
              style={{
                backgroundColor: tokens.colors.surface,
                borderColor: isOpen ? tokens.colors.accent : tokens.colors.border,
              }}
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm transition"
                style={{ color: tokens.colors.textPrimary }}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  style={{ color: tokens.colors.accent }}
                />
              </button>

              {isOpen && (
                <div
                  className="px-5 pb-5 text-xs sm:text-sm leading-relaxed border-t pt-3"
                  style={{
                    color: tokens.colors.textSecondary,
                    borderColor: tokens.colors.border,
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
