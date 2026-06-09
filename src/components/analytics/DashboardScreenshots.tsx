import TicketSavesTrend from './TicketSavesTrend'
import BotVsHumanSplit from './BotVsHumanSplit'
import DailyWorkloadSplit from './DailyWorkloadSplit'
import WeeklyHeatmap from './WeeklyHeatmap'
import AgentActivityHeatmap from './AgentActivityHeatmap'

export default function DashboardScreenshots() {
  return (
    <section className="hidden px-4 pb-24 sm:px-6 lg:block lg:px-8" style={{ backgroundColor: '#faf8f5' }}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-2xl font-bold uppercase text-gray-900">Inside the dashboard</p>
          <p className="mt-3 text-base text-gray-500">
            Every chart you see below is live — built from your actual ticket and conversation data.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-6 lg:grid-cols-[3fr_2fr]">
            <TicketSavesTrend />
            <BotVsHumanSplit />
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <DailyWorkloadSplit />
            <WeeklyHeatmap />
            <AgentActivityHeatmap />
          </div>
        </div>
      </div>
    </section>
  )
}
