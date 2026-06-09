export default function DailyWorkloadSplit() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="px-6 pt-7 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Daily Trend</p>
        <h3 className="mt-1 text-base font-black text-gray-900">Daily workload split</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Ticket saves, final transitions, and messages on one chart.
        </p>
      </div>
      <div className="mt-auto px-5 pb-5">
        <img
          src="/analytics/diaily%20worload%20split.webp"
          alt="Daily workload split"
          className="w-full rounded-2xl border border-gray-100"
          loading="lazy"
        />
      </div>
    </div>
  )
}
