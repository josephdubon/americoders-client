import Link from 'next/link'
import {useContext, useEffect, useState} from "react";
import {Context} from "../../context";
import useRouter from "next/router";

const UserNav = () => {
    // set state for current page/link
    const [currentPage, setCurrentPage] = useState('')
    const isServer = () => typeof window !== 'undefined'
    const {state, dispatch} = useContext(Context)
    const {user} = state

    const router = useRouter

    // update state on page change
    useEffect(() => {
        // process.browser is depreciated use typeof instead
        isServer() && setCurrentPage(window.location.pathname)
    }, [isServer() && window.location.pathname])
    return (<>
        <div className='nav flex-column nav-pills'>
            <Link href='/user'>
                <a className={`nav-link ${currentPage === '/user' && 'active'}`}>Dashboard</a>
            </Link>
        </div>
    </>)
}

export default UserNav