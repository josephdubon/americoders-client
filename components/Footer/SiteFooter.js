import Link from 'next/link'

const SiteFooter = () => {
  return (
    <>
      <footer className="text-muted py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a href="#">Back to top</a>
          </p>
          <p className="mb-1">
            © {new Date().getFullYear()}{' '}
            <Link href="/">
              <a>Americoders</a>
            </Link>
          </p>
        </div>
      </footer>
    </>
  )
}

export default SiteFooter
