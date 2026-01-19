import React from 'react'
import { PortableText } from '@portabletext/react'

interface SideBySideContent {
  _type: 'sideBySide'
  layout: 'imageLeft' | 'textLeft'
  image: {
    asset: {
      url: string
    }
    alt?: string
  }
  text: string
}

interface DoubleColumnContent {
  _type: 'doubleColumn'
  col1Image: {
    asset: {
      url: string
    }
    alt?: string
  }
  col1Title?: string
  col1Text: string
  col2Image: {
    asset: {
      url: string
    }
    alt?: string
  }
  col2Title?: string
  col2Text: string
}

interface ContentBlock {
  _type: 'block'
  style?: string
  list?: string
  children: Array<{
    text: string
    marks?: string[]
  }>
}

type ContentItem = ContentBlock | SideBySideContent | DoubleColumnContent

interface ContentRendererProps {
  content: ContentItem[]
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  const portableTextComponents = {
    block: {
      h2: ({ children }: { children: React.ReactNode }) => (
        <h2 className="text-2xl font-bold mt-6 mb-4">{children}</h2>
      ),
      h3: ({ children }: { children: React.ReactNode }) => (
        <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
      ),
      normal: ({ children }: { children: React.ReactNode }) => (
        <p className="mb-4">{children}</p>
      ),
    },
    list: {
      bullet: ({ children }: { children: React.ReactNode }) => (
        <ul className="list-disc pl-6 mb-4">{children}</ul>
      ),
      number: ({ children }: { children: React.ReactNode }) => (
        <ol className="list-decimal pl-6 mb-4">{children}</ol>
      ),
    },
    marks: {
      strong: ({ children }: { children: React.ReactNode }) => (
        <strong className="font-semibold">{children}</strong>
      ),
      em: ({ children }: { children: React.ReactNode }) => (
        <em className="italic">{children}</em>
      ),
      code: ({ children }: { children: React.ReactNode }) => (
        <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>
      ),
    },
  }

  const SideBySideComponent: React.FC<{ data: SideBySideContent }> = ({ data }) => {
    const flexDirection = data.layout === 'imageLeft' ? 'md:flex-row' : 'md:flex-row-reverse'
    
    return (
      <div className={`my-8 flex flex-col ${flexDirection} gap-6 items-center`}>
        <div className="w-full md:w-1/2">
          {data.image && (
            <img
              src={data.image.asset.url}
              alt={data.image.alt || ''}
              className="w-full h-auto rounded-lg shadow-md"
            />
          )}
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-gray-700 leading-relaxed">{data.text}</p>
        </div>
      </div>
    )
  }

  const DoubleColumnComponent: React.FC<{ data: DoubleColumnContent }> = ({ data }) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        <div className="space-y-4">
          {data.col1Image && (
            <img
              src={data.col1Image.asset.url}
              alt={data.col1Image.alt || ''}
              className="w-full h-auto rounded-lg shadow-md"
            />
          )}
          <div className="w-full">
            {data.col1Title && (
              <h3 className="text-lg font-semibold mb-2">{data.col1Title}</h3>
            )}
            <p className="text-gray-700 leading-relaxed">{data.col1Text}</p>
          </div>
        </div>
        <div className="space-y-4">
          {data.col2Image && (
            <img
              src={data.col2Image.asset.url}
              alt={data.col2Image.alt || ''}
              className="w-full h-auto rounded-lg shadow-md"
            />
          )}
          <div className="w-full">
            {data.col2Title && (
              <h3 className="text-lg font-semibold mb-2">{data.col2Title}</h3>
            )}
            <p className="text-gray-700 leading-relaxed">{data.col2Text}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="prose prose-lg max-w-none">
      {content.map((item, index) => {
        if (item._type === 'block') {
          return (
            <div key={index}>
              <PortableText
                value={[item]}
                components={portableTextComponents}
              />
            </div>
          )
        }
        
        if (item._type === 'sideBySide') {
          return <SideBySideComponent key={index} data={item as SideBySideContent} />
        }

        if (item._type === 'doubleColumn') {
          return <DoubleColumnComponent key={index} data={item as DoubleColumnContent} />
        }
        
        return null
      })}
    </div>
  )
}

export default ContentRenderer
