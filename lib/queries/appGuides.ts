// GROQ query for fetching a single app guide by slug
export const APP_GUIDE_QUERY = `
  *[_type == "appGuide" && slug.current == $slug][0] {
    title,
    slug,
    description,
    content[]{
      _type,
      ...select(_type == "block" => { style, list, children }),
      ...select(_type == "inlineImage" => { "asset": { "url": asset->url }, alt, caption }),
      ...select(_type == "sideBySide" => { layout, textTitle, text, "image": { "asset": { "url": image.asset->url }, alt } }),
      ...select(_type == "imageWithText" => { "image": { "asset": { "url": image.asset->url }, alt }, title, text }),
      ...select(_type == "doubleColumn" => { col1Title, col1Text, "col1Image": { "asset": { "url": col1Image.asset->url }, alt }, col2Title, col2Text, "col2Image": { "asset": { "url": col2Image.asset->url }, alt } })
    },
    tags,
    featured,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for fetching all app guides
export const ALL_APP_GUIDES_QUERY = `
  *[_type == "appGuide"] | order(lastUpdated desc) {
    title,
    slug,
    description,
    tags,
    featured,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for fetching featured app guides
export const FEATURED_APP_GUIDES_QUERY = `
  *[_type == "appGuide" && featured == true] | order(lastUpdated desc) {
    title,
    slug,
    description,
    tags,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for searching app guides
export const SEARCH_APP_GUIDES_QUERY = `
  *[_type == "appGuide" && title match $searchTerm || description match $searchTerm || tags match $searchTerm] | order(lastUpdated desc) {
    title,
    slug,
    description,
    tags,
    featured,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for getting all unique apps
export const ALL_APPS_QUERY = `
  *[_type == "appGuide"] | order(title asc) {
    title
  } | groupBy(title) | order(_key asc) {
    _key,
    count
  }
`

// GROQ query for getting app guide statistics
export const APP_GUIDE_STATS_QUERY = `
  {
    "totalGuides": count(*[_type == "appGuide"]),
    "featuredGuides": count(*[_type == "appGuide" && featured == true])
  }
`
