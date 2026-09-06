import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = ''
}: EmptyStateProps) {
  return (
    <div
      role="region"
      aria-label={title}
      className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/40 backdrop-blur-sm ${className}`}
    >
      {icon ? (
        <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-2xl mb-4 shadow-inner text-zinc-300">
          {icon}
        </div>
      ) : (
        <div className="w-14 h-14 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center text-2xl mb-4 shadow-inner text-zinc-400">
          📂
        </div>
      )}
      <h3 className="text-lg font-semibold text-zinc-100 tracking-tight mb-2">
        {title}
      </h3>
      <p className="text-sm text-zinc-400 max-w-md leading-relaxed mb-6">
        {description}
      </p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              type="button"
              className="px-5 py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 font-medium text-xs rounded-xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
            >
              {actionLabel}
            </button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              type="button"
              className="px-5 py-2.5 bg-zinc-800/80 hover:bg-zinc-750 text-zinc-300 hover:text-white font-medium text-xs rounded-xl border border-zinc-700/60 transition-all focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:outline-none"
            >
              {secondaryActionLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
