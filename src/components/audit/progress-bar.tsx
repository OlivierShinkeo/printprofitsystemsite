export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-3 w-full overflow-hidden rounded-full border border-neutral-300 bg-neutral-200"
    >
      <div
        className="h-full rounded-full bg-gold-600 transition-all"
        style={{ width: `${Math.max(percent, 4)}%` }}
      />
    </div>
  );
}
