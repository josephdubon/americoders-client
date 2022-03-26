import {useContext, useEffect, useState} from 'react'
import Link from 'next/Link'
import axios from 'axios'
import useRouter from 'next/router'
import {toast} from 'react-toastify'
import {Menu} from 'antd'

import {Context} from '../../context'
import {
    AppstoreOutlined,
    CarryOutOutlined,
    CoffeeOutlined,
    LoginOutlined,
    LogoutOutlined,
    TeamOutlined,
    UserAddOutlined
} from '@ant-design/icons'


// de-structure item from menu
const {Item, ItemGroup, SubMenu} = Menu

const TopNav = () => {
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
            className='mb-2'
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

            {/* conditional render of content depending on user role (instructor or subscriber) */}
            {user && user.role && user.role.includes('Instructor') ? (<>
                {/* Instructor Role */}
                <Item
                    key='/instructor/course/create'
                    onClick={(e) => {
                        setCurrentPage(e.key)
                    }}
                    icon={<CarryOutOutlined/>}
                >
                    <Link href='/instructor/course/create'>
                        <a>Create Course</a>
                    </Link>
                </Item>
            </>) : (<>
                {/* Other Role */}
                <Item
                    key='/user/become-instructor'
                    onClick={(e) => {
                        setCurrentPage(e.key)
                    }}
                    icon={<TeamOutlined/>}
                >
                    <Link href='/user/become-instructor'>
                        <a>Become Instructor</a>
                    </Link>
                </Item>
            </>)}

            {/* not logged in user menu */}
            {user === null && (
                <>
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
                </>
            )}

            {/* logged in user menu */}
            {user !== null && (
                <>

                    <SubMenu
                        key='#submenu'
                        icon={<CoffeeOutlined/>}
                        title={user && user.name}
                        style={{marginLeft: 'auto'}} // float nav item to the right
                    >
                        {/* ItemGroup for multiple items in submenu */}
                        <ItemGroup>
                            <Item
                                key='/user'
                                onClick={(e) => {
                                    setCurrentPage(e.key)
                                }}
                                icon={<LoginOutlined/>}
                            >
                                <Link href='/user'>
                                    <a>Dashboard</a>
                                </Link>
                            </Item>

                            <Item
                                key='#submenu-item'
                                onClick={logout}
                                icon={<LogoutOutlined/>}
                            >
                                Logout
                            </Item>
                        </ItemGroup>
                    </SubMenu>
                </>
            )}
        </Menu>
    </>)
}

export default TopNav