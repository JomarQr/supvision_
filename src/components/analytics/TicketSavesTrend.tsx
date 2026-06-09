export default function TicketSavesTrend() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="px-8 pt-8 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Daily Trend</p>
        <h3 className="mt-1 text-xl font-black text-gray-900">Ticket saves over time</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Blue tracks bot activity, green tracks support. The bot handles the vast majority of ticket saves every day.
        </p>
      </div>
      <div className="mt-auto px-6 pb-6">
        <img
          src="/analytics/ticket%20saves%20daily%20trend%201.png"
          alt="Ticket saves daily trend"
          className="w-full rounded-2xl border border-gray-100"
          loading="lazy"
        />
      </div>
    </div>
  )
}
