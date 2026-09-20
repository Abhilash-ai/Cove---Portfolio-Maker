import React from 'react';

interface CoveLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function CoveLogo({ className = '', showWordmark = true, size = 'md' }: CoveLogoProps) {
  const height = size === 'sm' ? 24 : size === 'lg' ? 38 : 30;
  const width = showWordmark ? (size === 'sm' ? 104 : size === 'lg' ? 160 : 130) : height;

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      <svg
        viewBox={showWordmark ? "0 0 130 32" : "0 0 32 32"}
        width={width}
        height={height}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105 duration-200"
      >
        {/* Emblem */}
        <rect
          x="1"
          y="1"
          width="30"
          height="30"
          rx="8"
          fill="#FF6B4A"
          fillOpacity="0.15"
          stroke="#FF6B4A"
          strokeWidth="1.75"
        />
        <path
          d="M22 10.5C20.5 9 18.2 8 15.5 8C11.3579 8 8 11.3579 8 15.5C8 19.6421 11.3579 23 15.5 23C18.2 23 20.5 22 22 20.5"
          stroke="#FF6B4A"
          strokeWidth="2.75"
          strokeLinecap="round"
        />
        <circle cx="16" cy="15.5" r="2.25" fill="#FF6B4A" />

        {/* Wordmark */}
        {showWordmark && (
          <text
            x="40"
            y="21.5"
            fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
            fontSize="17"
            fontWeight="800"
            letterSpacing="0.08em"
            className="fill-current text-zinc-900 dark:text-white"
          >
            COVE
          </text>
        )}
      </svg>
    </div>
  );
}
