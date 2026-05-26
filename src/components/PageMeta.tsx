import { Helmet } from 'react-helmet-async'

const BASE = 'https://supvision.ai'

interface PageMetaProps {
  title: string
  description: string
  path: string
}

export default function PageMeta({ title, description, path }: PageMetaProps) {
  const url = `${BASE}${path}`
  const fullTitle = title.includes('supVision') ? title : `${title} — supVision`
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
    </Helmet>
  )
}
