// GROQ query for fetching troubleshooting guides with simplified content structure
export const TROUBLESHOOTING_GUIDE_QUERY = `
  *[_type == "troubleshootingGuide" && slug.current == $slug][0] {
    title,
    slug,
    description,
    difficulty,
    estimatedTime,
    prerequisites,
    content[]{
      _type,
      // Handle portable text blocks
      ...select(_type == "block" => {
        style,
        list,
        children
      }),
      // Handle inline images
      ...select(_type == "inlineImage" => {
        "asset": {
          "url": asset->url
        },
        alt,
        caption
      }),
      // Handle sideBySide objects
      ...select(_type == "sideBySide" => {
        layout,
        textTitle,
        text,
        "image": {
          "asset": {
            "url": image.asset->url
          },
          alt
        }
      }),
      // Handle doubleColumn objects
      ...select(_type == "doubleColumn" => {
        col1Title,
        col1Text,
        "col1Image": {
          "asset": {
            "url": col1Image.asset->url
          },
          alt
        },
        col2Title,
        col2Text,
        "col2Image": {
          "asset": {
            "url": col2Image.asset->url
          },
          alt
        }
      })
    },
    category->{
      title,
      slug
    },
    publishedAt,
    updatedAt
  }
`

// GROQ query for fetching all troubleshooting guides
export const ALL_TROUBLESHOOTING_GUIDES_QUERY = `
  *[_type == "troubleshootingGuide"] | order(publishedAt desc) {
    title,
    slug,
    description,
    difficulty,
    estimatedTime,
    category->{
      title,
      slug
    },
    publishedAt
  }
`

// GROQ query for fetching guides by category
export const GUIDES_BY_CATEGORY_QUERY = `
  *[_type == "troubleshootingGuide" && category->slug.current == $categorySlug] | order(publishedAt desc) {
    title,
    slug,
    description,
    difficulty,
    estimatedTime,
    publishedAt
  }
`
