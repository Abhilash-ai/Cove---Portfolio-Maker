import React from 'react';
import { ThemeTokens } from '@cove/shared';
import { Quote, Star } from 'lucide-react';

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatarUrl?: string;
  rating?: number;
}

interface Props {
  tokens: ThemeTokens;
  title?: string;
  subtitle?: string;
  testimonials?: TestimonialItem[];
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't-1',
    quote:
      'Alex delivered an exceptional product overhaul in record time. The level of craftsmanship, interaction nuance, and technical rigor completely transformed our product metrics.',
    author: 'Elena Rostova',
    role: 'VP of Product',
    company: 'NeuralGrid Systems',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't-2',
    quote:
      'Working with Alex felt like having an entire design engineering department in one person. Our investors and users regularly praise the design polish and responsiveness.',
    author: 'Marcus Vance',
    role: 'Co-Founder & CEO',
    company: 'AeroDynamics Lab',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
  {
    id: 't-3',
    quote:
      'Rarely do you meet a creator who bridges deep design system theory with buttery-smooth React code. The component architecture has scaled effortlessly with our team.',
    author: 'Sarah Chen',
    role: 'Head of Engineering',
    company: 'PulseFlow Bio',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    rating: 5,
  },
];

export function Testimonial({ tokens, title, subtitle, testimonials = DEFAULT_TESTIMONIALS }: Props) {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto" style={{ backgroundColor: tokens.colors.background }}>
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span
          className="text-xs font-mono uppercase tracking-widest px-3 py-1 rounded-full border"
          style={{ borderColor: tokens.colors.border, color: tokens.colors.accent }}
        >
          Social Proof & Endorsements
        </span>
        <h2
          className="text-3xl sm:text-4xl font-extrabold mt-3 mb-2"
          style={{ fontFamily: tokens.typography.fontHeading, color: tokens.colors.textPrimary }}
        >
          {title || 'Client & Team Perspectives'}
        </h2>
        <p className="text-xs sm:text-sm" style={{ color: tokens.colors.textSecondary }}>
          {subtitle || 'What founders, executives, and engineering leads say about working together.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all duration-300 relative group"
            style={{
              backgroundColor: tokens.colors.surface,
              borderColor: tokens.colors.border,
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <Quote className="w-8 h-8 opacity-20" style={{ color: tokens.colors.accent }} />
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-3.5 h-3.5 fill-current"
                      style={{ color: tokens.colors.accent }}
                    />
                  ))}
                </div>
              </div>

              <p
                className="text-xs sm:text-sm leading-relaxed mb-6 italic"
                style={{ color: tokens.colors.textPrimary }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
            </div>

            <div className="pt-4 border-t flex items-center gap-3" style={{ borderColor: tokens.colors.border }}>
              {t.avatarUrl ? (
                <img
                  src={t.avatarUrl}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border"
                  style={{ borderColor: tokens.colors.border }}
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold font-mono text-xs border"
                  style={{
                    backgroundColor: tokens.colors.badgeBg,
                    color: tokens.colors.accent,
                    borderColor: tokens.colors.border,
                  }}
                >
                  {t.author.charAt(0)}
                </div>
              )}
              <div>
                <div className="text-xs font-bold" style={{ color: tokens.colors.textPrimary }}>
                  {t.author}
                </div>
                <div className="text-[11px]" style={{ color: tokens.colors.textSecondary }}>
                  {t.role} · <span className="font-semibold">{t.company}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
