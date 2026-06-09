export default function WeeklyHeatmap() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="px-6 pt-7 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Weekly Rhythm</p>
        <h3 className="mt-1 text-base font-black text-gray-900">When your queue is busiest</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Darker cells mean more activity. Plan shifts around real demand.
        </p>
      </div>
      <div className="mt-auto px-5 pb-5">
        <img
          src="/analytics%20screenz/weekday%20and%20hour%20heatmap.png"
          alt="Weekday and hour heatmap"
          className="w-full rounded-2xl border border-gray-100"
          loading="lazy"
        />
      </div>
    </div>
  )
}
