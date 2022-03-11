import {useContext, useEffect, useState} from 'react'
import Link from 'next/Link'
import axios from 'axios'
import useRouter from 'next/router'
import {toast} from 'react-toastify'
import {Menu} from 'antd'

import {Context} from '../context'
import {AppstoreOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined} from '@ant-design/icons'


// de-structure item from menu
const {Item} = Menu

const TopNav = () => {
    // set state for current page/link
    const [currentPage, setCurrentPage] = useState('')
    const isServer = () => typeof window !== 'undefined'
    const {state, dispatch} = useContext(Context)
    const router = useRouter

    // update state on page change
    useEffect(() => {
        // process.browser is depreciated use typeof instead
        isServer() && setCurrentPage(window.location.pathname)
    }, [isServer() && window.location.pathname])

    // logout logic
    const logout = async () => {
        dispatch({
            type: 'LOGOUT'
        })

        // clear out local storage, context, and redirect
        window.localStorage.removeItem('user')

        const {data} = await axios.get('/api/logout')

        // notification config
        toast(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })

        await router.push('/login')
    }

    return (<>
        <Menu
            mode='horizontal'
            selectedKeys={[currentPage]}
        >
            <Item
                key='/'
                onClick={(e) => {
                    setCurrentPage(e.key)
                }}
                icon={<AppstoreOutlined/>}
            >
                <Link href='/'>
                    <a>Home</a>
                </Link>
            </Item>

            <Item
                key='/login'
                onClick={(e) => {
                    setCurrentPage(e.key)
                }}
                icon={<LoginOutlined/>}
            >
                <Link href='/login'>
                    <a>Login</a>
                </Link>
            </Item>

            <Item
                key='/register'
                onClick={(e) => {
                    setCurrentPage(e.key)
                }}
                icon={<UserAddOutlined/>}
            >
                <Link href='/register'>
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>
    </>)
}

export default TopNav