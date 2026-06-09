import { Helmet } from 'react-helmet-async'

const BASE = 'https://supvision.ai'

interface PageMetaProps {
  title: string
  description: string
  path: string
  jsonLd?: object | object[]
}

export default function PageMeta({ title, description, path, jsonLd }: PageMetaProps) {
  const url = `${BASE}${path}`
  const fullTitle = title.includes('supVision') ? title : `${title} — supVision`
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
      ))}
    </Helmet>
  )
}
