import Link from 'next/link'

const SiteFooter = () => {
    return (<>
        <footer className='text-muted py-5'>
            <div className='container'>
                <p className='float-end mb-1'>
                    <a href='#'>Back to top</a>
                </p>
                <p className='mb-1'><Link href='/'><a>Americoders</a></Link>: Learn to Code, Build, and Live in this
                    amazing new age.</p>
                <p className='mb-0'>
                    Want to sign-up? {' '}
                    <Link href='/register'><a>Visit the register page</a></Link>.
                </p>
            </div>
        </footer>
    </>)
}

export default SiteFooter