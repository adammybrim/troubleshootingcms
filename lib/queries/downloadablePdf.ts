// GROQ query for fetching a single downloadable PDF by slug
export const DOWNLOADABLE_PDF_QUERY = `
  *[_type == "downloadablePdf" && slug.current == $slug][0] {
    title,
    slug,
    description,
    category->{
      title,
      slug,
      icon,
      color
    },
    "currentVersion": {
      version,
      releaseDate,
      "pdfUrl": pdfFile.asset->url,
      "originalFilename": pdfFile.asset.originalFilename,
      fileSize,
      changeLog
    },
    "versionHistory": versionHistory[] {
      version,
      releaseDate,
      "pdfUrl": pdfFile.asset->url,
      "originalFilename": pdfFile.asset.originalFilename,
      fileSize,
      changeLog,
      isDeprecated
    },
    tags,
    downloadCount,
    featured,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for fetching all downloadable PDFs
export const ALL_DOWNLOADABLE_PDFS_QUERY = `
  *[_type == "downloadablePdf"] | order(lastUpdated desc) {
    title,
    slug,
    description,
    category->{
      title,
      slug,
      icon,
      color
    },
    "currentVersion": {
      version,
      releaseDate,
      "pdfUrl": pdfFile.asset->url,
      "originalFilename": pdfFile.asset.originalFilename,
      fileSize
    },
    tags,
    downloadCount,
    featured,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for fetching featured PDFs
export const FEATURED_PDFS_QUERY = `
  *[_type == "downloadablePdf" && featured == true] | order(lastUpdated desc) {
    title,
    slug,
    description,
    category->{
      title,
      slug,
      icon,
      color
    },
    "currentVersion": {
      version,
      releaseDate,
      "pdfUrl": pdfFile.asset->url,
      "originalFilename": pdfFile.asset.originalFilename,
      fileSize
    },
    tags,
    downloadCount,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for fetching PDFs by category
export const PDFS_BY_CATEGORY_QUERY = `
  *[_type == "downloadablePdf" && category->slug.current == $categorySlug] | order(lastUpdated desc) {
    title,
    slug,
    description,
    category->{
      title,
      slug,
      icon,
      color
    },
    "currentVersion": {
      version,
      releaseDate,
      "pdfUrl": pdfFile.asset->url,
      "originalFilename": pdfFile.asset.originalFilename,
      fileSize
    },
    tags,
    downloadCount,
    featured,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for fetching most downloaded PDFs
export const MOST_DOWNLOADED_PDFS_QUERY = `
  *[_type == "downloadablePdf"] | order(downloadCount desc) {
    title,
    slug,
    description,
    category->{
      title,
      slug,
      icon,
      color
    },
    "currentVersion": {
      version,
      releaseDate,
      "pdfUrl": pdfFile.asset->url,
      "originalFilename": pdfFile.asset.originalFilename,
      fileSize
    },
    tags,
    downloadCount,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for fetching recently updated PDFs
export const RECENTLY_UPDATED_PDFS_QUERY = `
  *[_type == "downloadablePdf"] | order(lastUpdated desc) {
    title,
    slug,
    description,
    category->{
      title,
      slug,
      icon,
      color
    },
    "currentVersion": {
      version,
      releaseDate,
      "pdfUrl": pdfFile.asset->url,
      "originalFilename": pdfFile.asset.originalFilename,
      fileSize
    },
    tags,
    downloadCount,
    featured,
    publishedAt,
    lastUpdated
  }
`

// GROQ query for fetching all PDF categories
export const ALL_PDF_CATEGORIES_QUERY = `
  *[_type == "pdfCategory"] | order(order asc) {
    title,
    slug,
    description,
    icon,
    color,
    order
  }
`

// GROQ query for fetching PDF category by slug
export const PDF_CATEGORY_QUERY = `
  *[_type == "pdfCategory" && slug.current == $slug][0] {
    title,
    slug,
    description,
    icon,
    color,
    order
  }
`

// GROQ query for searching PDFs
export const SEARCH_PDFS_QUERY = `
  *[_type == "downloadablePdf" && title match $searchTerm || description match $searchTerm || tags match $searchTerm] | order(lastUpdated desc) {
    title,
    slug,
    description,
    category->{
      title,
      slug,
      icon,
      color
    },
    "currentVersion": {
      version,
      releaseDate,
      "pdfUrl": pdfFile.asset->url,
      "originalFilename": pdfFile.asset.originalFilename,
      fileSize
    },
    tags,
    downloadCount,
    featured,
    publishedAt,
    lastUpdated
  }
`
