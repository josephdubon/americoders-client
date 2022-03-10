import {Menu} from 'antd'
import Link from 'next/Link'
import {AppstoreOutlined, LoginOutlined, UserAddOutlined} from '@ant-design/icons'
import {useEffect, useState} from 'react'


// de-structure item from menu
const {Item} = Menu

const TopNav = () => {
    // set state for current page/link
    const [currentPage, setCurrentPage] = useState('')

    const isServer = () => typeof window !== 'undefined'

    // update state on page change
    useEffect(() => {
        // process.browser is depreciated use typeof instead
        isServer() && setCurrentPage(window.location.pathname)
    }, [isServer() && window.location.pathname])


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