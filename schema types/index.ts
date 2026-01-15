// Export all schema types for TypeScript usage
export type { Category } from '../schemas/category'

// Re-export common types
export type { Slug } from 'sanity'

// Utility types for your content
export interface ContentBase {
  _id: string
  _type: string
  _createdAt: string
  _updatedAt: string
  _rev: string
}

export interface TroubleshootingGuide extends ContentBase {
  title: string
  slug: { current: string }
  description?: string
  category?: { _ref: string; _type: 'reference' }
  difficulty?: 'beginner' | 'intermediate' | 'advanced'
  estimatedTime?: number
  prerequisites?: string[]
  content?: any[]
  publishedAt?: string
  updatedAt?: string
}

export interface Category extends ContentBase {
  title: string
  slug: { current: string }
  description?: string
  icon?: string
  color?: string
  order?: number
}
