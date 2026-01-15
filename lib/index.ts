// Custom utilities and helper functions for your Sanity Studio

export const formatDate = (date: string | Date): string => {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const getSlugFromTitle = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const generateUniqueSlug = async (client: any, title: string, type: string): Promise<string> => {
  const baseSlug = getSlugFromTitle(title)
  let slug = baseSlug
  let counter = 1

  while (true) {
    const existing = await client.fetch(
      `*[_type == $type && slug.current == $slug][0]`,
      { type, slug }
    )
    
    if (!existing) break
    
    slug = `${baseSlug}-${counter}`
    counter++
  }

  return slug
}
