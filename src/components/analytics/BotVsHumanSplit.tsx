export default function BotVsHumanSplit() {
  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      <div className="px-8 pt-8 pb-4">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Ownership Mix</p>
        <h3 className="mt-1 text-xl font-black text-gray-900">Bot vs human — ticket saves</h3>
        <p className="mt-2 text-sm leading-relaxed text-gray-500">
          Bot handles <strong>90%</strong> of all ticket saves. Support steps in for the remaining 10%.
        </p>
      </div>
      <div className="mt-auto px-6 pb-6">
        <img
          src="/analytics/ticket%20saves%20daily%20trend%202.png"
          alt="Bot vs human ticket saves"
          className="w-full rounded-2xl border border-gray-100"
          loading="lazy"
        />
      </div>
    </div>
  )
}
