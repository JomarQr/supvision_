export default function AgentActivityHeatmap() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="px-6 pt-7 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Hourly Concentration</p>
        <h3 className="mt-1 text-base font-black text-gray-900">Per-agent activity by hour</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Messages by hour in local timezone — isolate queue bursts per agent.
        </p>
      </div>
      <div className="mt-auto px-5 pb-5">
        <img
          src="/analytics/when%20this%20user%20is%20most%20active.png"
          alt="Per-agent activity by hour"
          className="w-full rounded-2xl border border-gray-100"
          loading="lazy"
        />
      </div>
    </div>
  )
}
