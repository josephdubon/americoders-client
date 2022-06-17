import {useContext, useEffect, useState} from 'react'
import {Context} from '../../context'
import UserRoute from '../../components/routes/UserRoute'
import axios from 'axios'
import {PlayCircleOutlined, SyncOutlined} from '@ant-design/icons'
import {Avatar, Divider, Image, Layout, Tooltip} from 'antd'
import Link from 'next/link'


const {Content} = Layout


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


    return (<UserRoute className='container'>
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
                    <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1'>
                        {/* list all courses */}
                        {courses && courses.map(course => (<>
                            {/* parent media div */}
                            <div className='d-flex align-items-center pt-2'>
                                {/* image media div */}
                                <div className='flex-shrink-0'>
                                    {/* image source */}
                                    <Avatar
                                        size={80}
                                        src={course.image ? course.image.Location : '/images/americoders-course.png'}
                                    />
                                </div>
                                {/* media text body */}
                                <div className='flex-grow-1 ms-3'>
                                    {/* title / link to course*/}
                                    <Link
                                        href={`/user/course/${course.slug}`}
                                    >
                                        <a className='mt-2 text-primary'><h5 className='pt-2'>{course.name}</h5></a>
                                    </Link>
                                    <p>{
                                        // show number of lessons in course
                                        course.lessons.length} Lessons</p>
                                    {
                                        // show requirements message
                                        <p style={myStyle} className='text-primary'>
                                            By {course.instructor.name}
                                        </p>
                                    }
                                </div>
                                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                                    <Link
                                        href={`/user/course/${course.slug}`}
                                    >
                                        <a>
                                            <Tooltip title='Go to course'>
                                                <PlayCircleOutlined className='h5 text-primary'/>
                                            </Tooltip>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </>))}
                    </div>
                </div>
            </div>
        </main>
    </UserRoute>)
}

export default UserIndex
