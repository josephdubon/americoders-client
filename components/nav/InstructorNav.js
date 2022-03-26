import Link from 'next/link'
import {useEffect, useState} from 'react'

const InstructorNav = () => {
    const [currentPage, setCurrentPage] = useState('')
    const isServer = () => typeof window !== 'undefined'

    // update state on page change
    useEffect(() => {
        // process.browser is depreciated use typeof instead
        isServer() && setCurrentPage(window.location.pathname)
    }, [isServer() && window.location.pathname])


    return (<>
        <div className='nav flex-column nav-pills'>
            <Link href='/instructor'>
                <a className={`nav-link ${currentPage === '/instructor' && 'active'}`}>Dashboard</a>
            </Link>

            <Link href='/instructor/course/create'>
                <a className={`nav-link ${currentPage === '/instructor/course/create' && 'active'}`}>Create Course</a>
            </Link>
        </div>
    </>)
}

export default InstructorNav