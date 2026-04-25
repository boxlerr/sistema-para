export default function Logo({ showDomain = true }: { showDomain?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span
        aria-hidden
        className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-600 shadow-sm"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="h-5 w-5"
          stroke="currentColor"
          strokeWidth={1.75}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="6" y1="7" x2="12" y2="12" className="text-white" stroke="currentColor" />
          <line x1="18" y1="6" x2="12" y2="12" className="text-white" stroke="currentColor" />
          <line x1="12" y1="12" x2="12" y2="18" className="text-white" stroke="currentColor" />
          <circle cx="6" cy="7" r="1.6" fill="currentColor" className="text-white" />
          <circle cx="18" cy="6" r="1.6" fill="currentColor" className="text-teal-300" />
          <circle cx="12" cy="12" r="1.8" fill="currentColor" className="text-white" />
          <circle cx="12" cy="18" r="1.6" fill="currentColor" className="text-white" />
        </svg>
      </span>
      <span className="flex items-baseline gap-0.5 font-heading">
        <span className="text-lg font-bold text-slate-900">Sistemas</span>
        <span className="text-lg font-bold text-indigo-600">Para</span>
        {showDomain && (
          <span className="text-sm font-medium text-slate-500">.com</span>
        )}
      </span>
    </span>
  );
}
