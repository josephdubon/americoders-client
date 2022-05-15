import {useContext, useEffect, useState} from 'react'
import {Context} from '../../context'
import UserRoute from '../../components/routes/UserRoute'
import axios from 'axios'
import {PlayCircleOutlined, SyncOutlined} from '@ant-design/icons'
import {Avatar, Tooltip} from 'antd'
import Link from 'next/link'


const UserIndex = () => {
    // state
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(false)

    // get user
    const {
        state: {user},
    } = useContext(Context)

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        // update state
        setLoading(true)

        // get data
        const {data} = await axios.get('/api/user-courses')

        // update state
        setCourses(data)
        setLoading(false)
    }

    // style
    const myStyle = {
        marginTop: '-15px',
        fontSize: '10px',
    }


    return (<UserRoute>
        {loading && (
            <SyncOutlined
                spin
                className='d-flex justify-content-between display-1 text-danger p-5'
            />
        )}
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>User Dashboard</h1>

                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                        <p className='lead'>
                            {JSON.stringify(courses, null, 4)}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </UserRoute>)
}

export default UserIndex
