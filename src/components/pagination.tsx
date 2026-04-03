import Link from 'next/link'

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: {
  currentPage: number
  totalPages: number
  basePath: string
}) {
  if (totalPages <= 1) return null

  function pageUrl(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`
  }

  // Show up to 7 page numbers with ellipsis
  const pages: (number | 'ellipsis')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== 'ellipsis') {
      pages.push('ellipsis')
    }
  }

  return (
    <nav className="flex items-center justify-center gap-1 mt-12" aria-label="Pagination">
      {currentPage > 1 && (
        <Link
          href={pageUrl(currentPage - 1)}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-muted hover:border-primary/40 hover:text-primary transition-all"
        >
          Previous
        </Link>
      )}

      {pages.map((page, i) =>
        page === 'ellipsis' ? (
          <span key={`e${i}`} className="px-2 text-text-light">
            ...
          </span>
        ) : (
          <Link
            key={page}
            href={pageUrl(page)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition-all ${
              page === currentPage
                ? 'bg-primary text-white'
                : 'border border-border text-text-muted hover:border-primary/40 hover:text-primary'
            }`}
          >
            {page}
          </Link>
        )
      )}

      {currentPage < totalPages && (
        <Link
          href={pageUrl(currentPage + 1)}
          className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-text-muted hover:border-primary/40 hover:text-primary transition-all"
        >
          Next
        </Link>
      )}
    </nav>
  )
}
