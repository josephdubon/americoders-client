import {useEffect, useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import {SyncOutlined} from '@ant-design/icons'
import UserNav from '../nav/UserNav'

const UserRoute = ({children}) => {
    // state
    const [ok, setOk] = useState(false)

    // router
    const router = useRouter()

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        // try to get user match
        try {
            const {data} = await axios.get('/api/current-user')
            if (data.ok) setOk(true) // if match found, set ok to true
        } catch (err) {
            console.log(err)
            setOk(false) // if no match found, set ok to false
            await router.push('/login') // redirect to login page
        }
    }

    return (<>
        {!ok ? (
            // if ok is false, show loading screen
            <SyncOutlined spin className='d-flex justify-content-center display-1 text-primary p-5'
            />
        ) : (
            // if ok is true, show child element
            <>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-md-2'>
                            <UserNav/>
                        </div>
                        <div className='col-md-10'>{children}</div>
                    </div>
                </div>
            </>
        )}
    </>)
}

export default UserRoute
