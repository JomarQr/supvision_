import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import AppSSR from './AppSSR'

export function render(url: string) {
  const helmetContext: Record<string, unknown> = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppSSR />
      </StaticRouter>
    </HelmetProvider>
  )
  const { helmet } = helmetContext as { helmet: { title: { toString(): string }; meta: { toString(): string }; link: { toString(): string } } }
  const headTags = helmet
    ? `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`
    : ''
  return { html, headTags }
}
