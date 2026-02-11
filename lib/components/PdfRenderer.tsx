import React from 'react'

interface PdfVersion {
  version: string
  releaseDate: string
  pdfUrl: string
  originalFilename: string
  fileSize: string
  changeLog?: string
  isDeprecated?: boolean
}

interface CurrentVersion {
  version: string
  releaseDate: string
  pdfUrl: string
  originalFilename: string
  fileSize: string
  changeLog?: string
}

interface PdfCategory {
  title: string
  slug: string
  icon?: string
  color: string
}

interface DownloadablePdf {
  title: string
  slug: string
  description: string
  category: PdfCategory
  currentVersion: CurrentVersion
  versionHistory: PdfVersion[]
  tags: string[]
  downloadCount: number
  featured: boolean
  publishedAt: string
  lastUpdated: string
}

interface PdfRendererProps {
  pdf: DownloadablePdf
}

const PdfRenderer: React.FC<PdfRendererProps> = ({ pdf }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatFileSize = (size: string) => {
    // If size is already formatted, return as-is
    if (size.includes('MB') || size.includes('KB') || size.includes('GB')) {
      return size
    }
    // Otherwise, try to format the number
    const numSize = parseInt(size)
    if (isNaN(numSize)) return size
    if (numSize < 1024) return `${numSize} B`
    if (numSize < 1024 * 1024) return `${(numSize / 1024).toFixed(1)} KB`
    return `${(numSize / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleDownload = (pdfUrl: string, version: string) => {
    // In a real app, you'd track the download here
    console.log(`Downloading ${pdf.title} version ${version}`)
    window.open(pdfUrl, '_blank')
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">{pdf.category.icon || '📄'}</span>
          <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
            {pdf.category.title}
          </span>
          {pdf.featured && (
            <span className="text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded">
              ⭐ Featured
            </span>
          )}
        </div>
        <h1 className="text-3xl font-bold mb-2">{pdf.title}</h1>
        <p className="text-gray-600 mb-4">{pdf.description}</p>
        
        {/* Metadata */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
          <span>Version {pdf.currentVersion.version}</span>
          <span>•</span>
          <span>Updated {formatDate(pdf.lastUpdated)}</span>
          <span>•</span>
          <span>{pdf.downloadCount} downloads</span>
        </div>

        {/* Tags */}
        {pdf.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {pdf.tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Current Version Download */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Download Current Version</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="font-medium text-lg mb-1">
              {pdf.currentVersion.originalFilename}
            </div>
            <div className="text-sm text-gray-600">
              Version {pdf.currentVersion.version} • {formatFileSize(pdf.currentVersion.fileSize)} • {formatDate(pdf.currentVersion.releaseDate)}
            </div>
            {pdf.currentVersion.changeLog && (
              <div className="text-sm text-gray-700 mt-2">
                <strong>What's new:</strong> {pdf.currentVersion.changeLog}
              </div>
            )}
          </div>
          <button
            onClick={() => handleDownload(pdf.currentVersion.pdfUrl, pdf.currentVersion.version)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Download PDF
          </button>
        </div>
      </div>

      {/* Version History */}
      {pdf.versionHistory.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Version History</h2>
          <div className="space-y-4">
            {pdf.versionHistory.map((version, index) => (
              <div
                key={index}
                className={`border rounded-lg p-4 ${
                  version.isDeprecated ? 'border-gray-200 bg-gray-50' : 'border-gray-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">Version {version.version}</span>
                      {version.isDeprecated && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          Deprecated
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {formatDate(version.releaseDate)} • {formatFileSize(version.fileSize)}
                    </div>
                    {version.changeLog && (
                      <div className="text-sm text-gray-700">
                        <strong>Changes:</strong> {version.changeLog}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => handleDownload(version.pdfUrl, version.version)}
                    className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                      version.isDeprecated
                        ? 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                        : 'bg-gray-600 text-white hover:bg-gray-700'
                    }`}
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PdfRenderer
