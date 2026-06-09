import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const routes = [
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/support-agent',
  '/kyc-onboarding',
  '/dispute-resolution',
  '/escalation-rules',
  '/multi-channel',
  '/audit-logs',
  '/multi-language',
  '/integrations',
  '/analytics',
  '/for-whom',
  '/industries/payments-processing',
  '/industries/neobanks',
  '/industries/crypto-web3',
  '/industries/lending-credit',
  '/industries/insurtech',
  '/roles/head-of-support',
  '/roles/compliance-risk',
  '/roles/operations-growth',
  '/roles/founders-csuite',
  '/security',
  '/privacy-policy',
  '/terms',
  '/data-policy',
]

for (const url of routes) {
  const { html: appHtml, headTags } = render(url)
  const html = template
    .replace('<!--helmet-->', headTags ?? '')
    .replace('<!--app-html-->', appHtml)

  const filePath = url === '/'
    ? 'dist/client/index.html'
    : `dist/client${url}/index.html`

  fs.mkdirSync(path.dirname(toAbsolute(filePath)), { recursive: true })
  fs.writeFileSync(toAbsolute(filePath), html)
  console.log('Pre-rendered:', filePath)
}

console.log('\nDone. Serve dist/client/ as your static site.')
