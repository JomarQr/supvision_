import { useState } from 'react'
import { Link } from 'react-router-dom'

export interface Integration {
  name: string
  category: string
  logo: string
  tagline: string
  functions: string[]
  description: string
  comingSoon?: boolean
}

export const allIntegrations: Integration[] = [
  {
    name: 'Telegram', category: 'Messaging', logo: '/logos/telegram.png',
    tagline: 'Instant messaging & bot automation',
    functions: ['Receive & reply to customer messages', 'Send automated notifications', 'Handle file & document requests', 'Support group & channel queries', 'Seamless handoff to human agents'],
    description: 'supVision connects via Telegram Bot API to handle customer queries in real time. Customers message your Telegram bot and the Support Agent replies instantly - pulling live data from your identity verification provider and knowledge base before every response.',
  },
  {
    name: 'Gmail', category: 'Messaging', logo: '/logos/gmail.png',
    tagline: 'Email support automation via Gmail',
    functions: ['Parse inbound support emails', 'Auto-reply with personalised answers', 'Classify and route by topic', 'Attach transaction or verification data', 'Escalate complex threads to humans'],
    description: 'Connect your Gmail inbox to supVision and let the agent triage, classify, and reply to customer emails automatically. No more manually sorting payment failure reports or identity verification status inquiries.',
  },
  {
    name: 'Mail / SMTP', category: 'Messaging', logo: '/mail.png',
    tagline: 'Generic email channel via SMTP',
    functions: ['Inbound email parsing', 'Outbound reply automation', 'Thread-aware conversations', 'HTML & plain-text responses', 'Attachment handling'],
    description: 'Works with any email provider via standard SMTP/IMAP. Ideal for teams using custom or self-hosted mail servers who want agent automation without switching email infrastructure.',
  },
  {
    name: 'Outlook', category: 'Messaging', logo: '/logos/outlook.png',
    tagline: 'Microsoft 365 email & calendar',
    functions: ['Read & respond to support emails', 'Calendar-based scheduling triggers', 'Teams escalation handoff', 'Shared mailbox support', 'Attachment & template handling'],
    description: 'Connect supVision to your Microsoft 365 Outlook mailbox. The Support Agent monitors your shared support inbox, responds to routine queries, and escalates complex cases to the right person via Teams.',
  },
  {
    name: 'Excel / Sheets', category: 'Reporting', logo: '/logos/excel.png',
    tagline: 'Export reports to Excel & Google Sheets',
    functions: ['Automated resolution reports', 'Ticket volume & SLA exports', 'Verification audit trail exports', 'Escalation rate tracking', 'Custom date-range extracts'],
    description: 'Schedule automatic exports of support metrics, resolution rates, and audit logs directly to Excel or Google Sheets. Share regulator-ready reports with your compliance team without manual data pulls.',
  },
  {
    name: 'Looker Studio', category: 'Reporting', logo: '/logos/Looker Studio.png',
    tagline: 'Live support dashboards in Looker Studio',
    functions: ['Real-time resolution rate dashboards', 'Escalation trend visualisation', 'CSAT & SLA tracking', 'Audit log drill-downs', 'Shareable compliance reports'],
    description: 'Connect supVision to Looker Studio and turn support data into live dashboards your ops and compliance teams can monitor in real time - no manual exports, no stale spreadsheets.',
  },
  {
    name: 'Power BI', category: 'Reporting', logo: '/logos/Power BI.png',
    tagline: 'Support analytics inside Power BI',
    functions: ['Automated data connector', 'Resolution & escalation KPIs', 'Multi-team performance views', 'Audit trail reporting', 'Scheduled report distribution'],
    description: 'Push supVision metrics directly into Power BI. Build executive dashboards, compliance audit reports, and team performance views - all within your existing Microsoft 365 environment.',
  },
  {
    name: 'Tableau', category: 'Reporting', logo: '/logos/Tableau.png',
    tagline: 'Enterprise BI for support & compliance',
    functions: ['High-volume data visualisation', 'Regulator-ready audit exports', 'Cross-team performance views', 'Custom calculated fields', 'Enterprise SSO compatibility'],
    description: 'Stream supVision decision logs and support metrics into Tableau for enterprise-grade reporting. Ideal for compliance and risk teams that need structured, auditable data in a platform they already trust.',
  },
  {
    name: 'Metabase', category: 'Reporting', logo: '/logos/metabase.png',
    tagline: 'Self-serve support analytics',
    functions: ['No-code question builder', 'Resolution & volume tracking', 'Escalation funnel analysis', 'Shareable team dashboards', 'Scheduled email reports'],
    description: 'Connect supVision to Metabase and give your support and ops teams self-serve access to resolution metrics, escalation funnels, and CSAT trends - without needing a data analyst.',
  },
  {
    name: 'BigQuery', category: 'Reporting', logo: '/logos/BigQuery.png',
    tagline: 'Decision logs & audit data in BigQuery',
    functions: ['Full decision log streaming', 'Long-term audit data storage', 'SQL-queryable support history', 'Regulator export compatibility', 'Cross-system data joins'],
    description: 'Stream every supVision decision, escalation, and resolution event into BigQuery for long-term storage and analysis. Query full audit trails with SQL and join with your existing data warehouse.',
  },
  {
    name: 'WhatsApp', category: 'Messaging', logo: '/logos/whatsapp.png',
    tagline: 'Customer support over WhatsApp Business',
    functions: ['Real-time message handling', 'Rich media & document support', 'Template message automation', 'Multi-agent shared inbox', 'Read receipts & delivery status'],
    description: 'Connect your WhatsApp Business account and let supVision handle verification queries, payment failures, and transaction disputes over the channel your customers prefer most.',
  },
  {
    name: 'Zendesk', category: 'Helpdesks', logo: '/logos/zendesk.png',
    tagline: 'AI layer on top of your Zendesk',
    functions: ['Auto-resolve tickets before agents see them', 'Attach live data to every ticket', 'Trigger macros based on intent', 'Escalate with full context pre-filled', 'SLA-aware prioritisation'],
    description: 'supVision sits on top of your existing Zendesk setup. It resolves tier-1 tickets automatically and - when escalation is needed - routes to the right agent with the full conversation history and live account data already attached.',
  },
  {
    name: 'Intercom', category: 'Helpdesks', logo: '/logos/intecom (1).png',
    tagline: 'Automated conversations in Intercom',
    functions: ['Auto-answer live chat queries', 'Pull CRM & account data in context', 'Trigger custom bots on keywords', 'Route to human inbox on escalation', 'CSAT & resolution tracking'],
    description: 'Deploy supVision inside your Intercom workspace. The agent handles live chat queries autonomously, surfacing real-time data from your identity verification provider and CRM before every reply.',
  },
  {
    name: 'Freshdesk', category: 'Helpdesks', logo: '/logos/freshdesk.png',
    tagline: 'Smart ticket resolution in Freshdesk',
    functions: ['Classify & tag tickets automatically', 'Auto-resolve verification & payment tickets', 'Pre-fill agent notes on escalation', 'SLA breach prevention triggers', 'Agent collision prevention'],
    description: 'supVision integrates with Freshdesk to classify, respond to, and close routine tickets without any agent involvement. Complex cases are escalated with full context pre-filled in the ticket.',
  },
  {
    name: 'Salesforce Service', category: 'Helpdesks', logo: '/logos/salesforce.png',
    tagline: 'Enterprise ticket automation',
    functions: ['Case auto-creation & classification', 'Einstein-compatible data layer', 'Escalation routing by skill & queue', 'Live account data in case sidebar', 'Full audit log per case'],
    description: 'Integrate supVision with Salesforce Service Cloud to automate case handling at enterprise scale. Every automated action is written back to the case record for a complete audit trail.',
  },
  {
    name: 'Twilio', category: 'Messaging', logo: '/logos/twillio.png',
    tagline: 'SMS & voice channel automation',
    functions: ['Inbound SMS query handling', 'Outbound status notifications', 'Voice IVR integration', 'Two-factor verification flows', 'Multi-country number support'],
    description: 'Use Twilio to reach customers over SMS or voice. supVision handles inbound text queries and sends proactive notifications - payment confirmations, verification status updates - without human involvement.',
  },
  {
    name: 'Facebook Messenger', category: 'Messaging', logo: '/logos/facebook messenger.png',
    tagline: 'Customer support via Facebook Messenger',
    functions: ['Real-time message handling', 'Rich media & document support', 'Automated reply flows', 'Handoff to human agent on escalation', 'Page inbox management'],
    description: 'Connect your Facebook Page inbox to supVision and automate responses to customer queries arriving via Messenger. Ideal for fintechs with strong social media presence in LatAm, SEA, and MENA.',
  },
  {
    name: 'Line', category: 'Messaging', logo: '/logos/line.png',
    tagline: 'Support automation via Line',
    functions: ['Real-time message handling', 'Rich menu & quick reply automation', 'Document & image support', 'Multi-language response handling', 'Handoff to human agent on escalation'],
    description: 'Reach customers in Japan, Thailand, and Taiwan via Line. supVision integrates with the Line Messaging API to automate support queries, send notifications, and escalate complex cases.',
  },
  {
    name: 'Viber', category: 'Messaging', logo: '/logos/viber.png',
    tagline: 'Customer support over Viber',
    functions: ['Real-time message handling', 'Rich media & document support', 'Automated notification flows', 'Chatbot & business account support', 'Handoff to human agent on escalation'],
    description: 'Serve customers in Eastern Europe and CIS markets via Viber. supVision connects to your Viber Business account to handle support queries, send proactive updates, and escalate when needed.',
  },
  {
    name: 'Confluence', category: 'Knowledge base', logo: '/logos/confluence.png',
    tagline: 'Internal policies & procedure docs',
    functions: ['Index support runbooks & SOPs', 'Answer queries from internal docs', 'Keep responses in sync with policy updates', 'Surface relevant pages per query type', 'Restrict access by team or space'],
    description: 'supVision indexes your Confluence spaces to answer support queries using your own internal policies, scripts, and procedures - so every AI response follows the rules your team wrote.',
  },
  {
    name: 'Notion', category: 'Knowledge base', logo: '/logos/notion.png',
    tagline: 'Support knowledge from Notion pages',
    functions: ['Sync playbooks & escalation guides', 'Answer from internal FAQs', 'Update KB without retraining', 'Page-level access control', 'Multi-workspace support'],
    description: 'Connect supVision to your Notion workspace and let the agent answer customer queries using the same knowledge your support team relies on - always up to date, never stale.',
  },
  {
    name: 'Guru', category: 'Knowledge base', logo: '/guru.png',
    tagline: 'Verified knowledge cards for AI answers',
    functions: ['Ingest verified answer cards', 'Trigger card suggestions per intent', 'Flag outdated content automatically', 'Role-based content access', 'Confidence scoring per card'],
    description: 'supVision uses your Guru cards as a verified knowledge layer. When a customer asks a question, the agent surfaces the right card - and flags it for review if the confidence is too low to respond.',
  },
  {
    name: 'Document360', category: 'Knowledge base', logo: '/logos/document360.png',
    tagline: 'Customer-facing & internal KB',
    functions: ['Index public & private KB articles', 'Answer from structured help content', 'Category-based content routing', 'Version-aware article serving', 'Multilingual KB support'],
    description: 'supVision connects to Document360 to serve answers directly from your structured knowledge base - both internal agent guides and public-facing help articles - with no manual prompt engineering needed.',
  },
  {
    name: 'Slack', category: 'Collaboration', logo: '/logos/slack.png',
    tagline: 'Escalation alerts & team notifications',
    functions: ['Real-time escalation alerts', 'Assign cases to agents via Slack', 'Daily resolution summary digests', 'SLA breach notifications', 'Custom alert routing by channel'],
    description: 'supVision sends escalation alerts and resolution summaries directly to your Slack workspace. When an edge case needs a human, the right agent is notified instantly with full context attached.',
  },
  {
    name: 'Microsoft Teams', category: 'Collaboration', logo: '/logos/teams.png',
    tagline: 'Escalation routing via Microsoft Teams',
    functions: ['Escalation notifications to Teams channels', 'Agent assignment via adaptive cards', 'SLA breach alerts', 'Resolution status updates', 'Compliance team notifications'],
    description: 'Route escalations and compliance alerts to the right Microsoft Teams channel. supVision sends structured notifications with full case context so agents never start from zero.',
  },
  {
    name: 'Jira', category: 'Collaboration', logo: '/logos/jira.png',
    tagline: 'Escalation-to-ticket automation',
    functions: ['Auto-create Jira issues on escalation', 'Link support cases to product bugs', 'Sync resolution status back to agent', 'Priority mapping by case type', 'Custom field population'],
    description: 'When supVision escalates a case that requires a product fix or investigation, it automatically creates a Jira issue with the full context - so nothing falls through the cracks between support and engineering.',
  },
  {
    name: 'Linear', category: 'Collaboration', logo: '/logos/linear.png',
    tagline: 'Issue tracking for escalated cases',
    functions: ['Auto-create issues on escalation', 'Attach conversation context', 'Status sync back to support agent', 'Team & project routing', 'Priority assignment by case severity'],
    description: 'Connect supVision to Linear to automatically file issues when escalated cases require engineering involvement. Full conversation context and verification or payment data is attached to every issue.',
  },
  {
    name: 'HubSpot', category: 'CRM', logo: '/logos/hubspot.png',
    tagline: 'Customer data from HubSpot CRM',
    functions: ['Contact & company profile reads', 'Deal & pipeline status', 'Open ticket history', 'Interaction timeline', 'Custom property lookups'],
    description: 'supVision reads HubSpot contact and company records to personalise every response. The agent knows the customer\'s history, open tickets, and account tier before it says a word.',
  },
  {
    name: 'Salesforce CRM', category: 'CRM', logo: '/logos/salesforce.png',
    tagline: 'Enterprise CRM data at agent level',
    functions: ['Account & contact reads', 'Opportunity & case data', 'Entitlement & SLA checks', 'Activity timeline access', 'Custom object support'],
    description: 'Connect supVision to Salesforce CRM to pull full account context before every response. Entitlements, case history, and custom objects are all surfaced to the agent in real time.',
  },
  {
    name: 'Pipedrive', category: 'CRM', logo: '/logos/Pipedrive.png',
    tagline: 'Deal & contact data from Pipedrive',
    functions: ['Contact profile lookups', 'Deal stage & value data', 'Activity & note history', 'Pipeline status surfacing', 'Custom field access'],
    description: 'Pull customer and deal data from Pipedrive to give the Support Agent full context on every interaction - stage, value, and open activities - without switching tools.',
  },
  {
    name: 'Zoho CRM', category: 'CRM', logo: '/logos/zoro.png',
    tagline: 'Zoho customer data integration',
    functions: ['Lead & contact reads', 'Module & custom view access', 'Case & ticket history', 'Workflow trigger support', 'Multi-org compatibility'],
    description: 'Connect supVision to Zoho CRM to access full customer records, module data, and ticket history - personalising agent responses with live context from your CRM.',
  },
  {
    name: 'WeChat', category: 'Messaging', logo: '/logos/wechat.png',
    tagline: 'Support automation via WeChat',
    functions: ['Customer message handling', 'Menu & quick-reply flows', 'Official Account integration', 'Rich media responses', 'Escalation to human agents'],
    description: 'Reach customers in China via WeChat Official Accounts. supVision connects to the WeChat API to handle support queries, send proactive notifications, and escalate complex cases to your team.',
  },
  {
    name: 'Mambu', category: 'CRM', logo: '/logos/mambu.png',
    tagline: 'Core banking data for support context',
    functions: ['Account & product lookups', 'Loan & deposit status', 'Transaction history access', 'Customer profile data', 'Balance & limit queries'],
    description: 'Connect supVision to Mambu to give the Support Agent live access to account balances, loan status, transaction history, and product data - so every response is grounded in real banking context.',
  },
]

export const integrationCategories = ['All', 'Helpdesks', 'Messaging', 'KYC providers', 'Knowledge base', 'CRM', 'Collaboration', 'Reporting']

const VISIBLE_LIMIT = 11

export default function IntegrationFinder() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<Integration | null>(null)
  const [showAll, setShowAll] = useState(false)
  const [kycHovered, setKycHovered] = useState(false)

  const filtered = active === 'All' ? allIntegrations : allIntegrations.filter(i => i.category === active)
  const showLimit = active === 'All' && !showAll
  const visible = showLimit ? filtered.slice(0, VISIBLE_LIMIT) : filtered
  const hidden = showLimit ? filtered.length - VISIBLE_LIMIT : 0

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#f5f4f0' }}>
      <div className="mx-auto max-w-7xl px-6">

        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black leading-tight text-gray-900 sm:text-5xl">
            Find your{' '}
            <span className="rounded-xl px-3 py-1" style={{ backgroundColor: 'rgba(33,73,149,0.12)', color: '#214995' }}>
              integration
            </span>{' '}
            in seconds
          </h2>
          <p className="mt-4 text-base text-gray-500">supVision connects to your existing stack. No migration required.</p>
        </div>

        <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
          {integrationCategories.map(cat => {
            if (cat === 'KYC providers') {
              return (
                <div
                  key={cat}
                  className="relative"
                  onMouseEnter={() => setKycHovered(true)}
                  onMouseLeave={() => setKycHovered(false)}
                >
                  <button
                    className="rounded-full border px-5 py-2 text-sm font-semibold transition-colors cursor-default"
                    style={{ backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#9ca3af' }}
                  >
                    {cat}
                  </button>
                  {kycHovered && (
                    <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 z-20">
                      <div className="rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-gray-100 whitespace-nowrap">
                        <span className="text-sm font-semibold text-gray-400">Coming soon</span>
                      </div>
                    </div>
                  )}
                </div>
              )
            }
            return (
              <button
                key={cat}
                onClick={() => { setActive(cat); setShowAll(false) }}
                className="rounded-full border px-5 py-2 text-sm font-semibold transition-colors"
                style={active === cat
                  ? { backgroundColor: '#214995', borderColor: '#214995', color: '#fff' }
                  : { backgroundColor: '#fff', borderColor: '#e5e7eb', color: '#374151' }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visible.map(item => (
            <button
              key={item.name}
              onClick={() => !item.comingSoon && setSelected(item)}
              className={['group relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-left transition-shadow overflow-hidden', item.comingSoon ? 'cursor-default' : 'hover:shadow-md hover:border-gray-300'].join(' ')}
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.logo}
                  alt={item.name}
                  className="h-10 w-10 flex-shrink-0 rounded-xl object-contain"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.tagline}</p>
                </div>
              </div>
              {item.comingSoon ? (
                <p className="text-xs text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 font-semibold">Coming soon</p>
              ) : (
                <ul className="w-full space-y-1.5">
                  {item.functions.slice(0, 3).map(fn => (
                    <li key={fn} className="flex items-start gap-1.5 text-xs text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="mt-0.5 h-3 w-3 flex-shrink-0" style={{ color: '#214995' }}>
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                      {fn}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          ))}

          {hidden > 0 && (
            <button
              onClick={() => setShowAll(true)}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-300 bg-white p-5 text-center transition-colors hover:border-gray-400"
            >
              <span className="text-2xl font-black text-gray-900">+{hidden}</span>
              <span className="text-xs font-semibold text-gray-400">more integrations</span>
            </button>
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-gray-300 bg-white pl-6 pr-1.5 py-1.5 text-sm font-semibold"
          >
            <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[40]" style={{ backgroundColor: '#214995' }} />
            <span className="relative z-10 text-gray-900 transition-colors duration-300 group-hover:text-white">Can't find your tool? Let's chat about a custom integration</span>
            <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
              </svg>
            </span>
          </Link>
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl"
            style={{ maxHeight: '85vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4">
                <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selected.logo}
                alt={selected.name}
                className="h-14 w-14 rounded-2xl object-contain"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div>
                <p className="text-xl font-black text-gray-900">{selected.name}</p>
                <span className="mt-1 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold" style={{ backgroundColor: 'rgba(33,73,149,0.1)', color: '#214995' }}>
                  {selected.category}
                </span>
              </div>
            </div>

            <p className="mt-5 text-sm leading-relaxed text-gray-600">{selected.description}</p>

            <div className="mt-5">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">What you can automate</p>
              <ul className="space-y-2">
                {selected.functions.map(fn => (
                  <li key={fn} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: 'rgba(33,73,149,0.1)' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-3 w-3" style={{ color: '#214995' }}>
                        <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                      </svg>
                    </span>
                    {fn}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <Link
                to="/contact"
                onClick={() => setSelected(null)}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full pl-6 pr-1.5 py-1.5 text-sm font-bold text-white"
                style={{ backgroundColor: '#111827' }}
              >
                <span className="absolute right-[6px] top-1/2 h-8 w-8 -translate-y-1/2 rounded-full transition-transform duration-500 ease-in-out group-hover:scale-[20]" style={{ backgroundColor: '#214995' }} />
                <span className="relative z-10">Set up this integration</span>
                <span className="relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 text-white">
                    <path fillRule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clipRule="evenodd" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
