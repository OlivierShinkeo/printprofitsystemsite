export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className="h-2 w-full overflow-hidden rounded-full bg-neutral-100"
    >
      <div
        className="h-full rounded-full bg-gold-500 transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
