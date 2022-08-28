import {useContext, useEffect, useState} from 'react'
import {Context} from '../../context'
import UserRoute from '../../components/routes/UserRoute'
import axios from 'axios'
import {PlayCircleOutlined, SyncOutlined} from '@ant-design/icons'
import {Avatar, Divider, Image, Layout, Tooltip} from 'antd'
import Link from 'next/link'
import Moment from 'moment'
import {PageHead} from '../../components/head/PageHead'


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

        <PageHead title={`Welcome back, ${user && user.firstName} ${user && user.lastName}!`}/>

        {/* hero section */}
        <Content className='bg-light'>
            <Divider children='Welcome Back, Americoder!' className='mt-0 pt-3'/>
            <div className='container col-xxl-12 px-4 py-5'>
                <div
                    className='row align-items-center justify-content-center g-5 row-cols-sm-1 row-cols-md-2 row-cols-lg-3'>
                    <div>
                        {user ?
                            (<>
                                <h1 className='display-6 fw-bold lh-1 mb-3 '>{user.name}</h1>
                                <p className='form-text'>
                                    <Link href={'/update-user/'}><a>Update User</a></Link>
                                </p>
                                <Divider/>
                                <p className='text-muted'><strong>Email:</strong> {user.email}</p>
                                <p className='text-muted'><strong>Role:</strong> {user.role.join(', ')}</p>
                                <p className='text-muted'>
                                    <strong>Enrolled: </strong> {courses.length + ' '}
                                    {user.courses.length <= 1 ? 'Course' : 'Courses'}
                                </p>
                                <p className='text-muted'><strong>Member
                                    Since:</strong> {Moment(user && user.createdAt, 'YYYYMMDD').fromNow()}</p>
                            </>)
                            :
                            (<>
                                <p className='display-6 fw-bold lh-1 mb-3'>Welcome back!!</p>
                            </>)}
                    </div>

                    <div>
                        {user ?
                            (<>
                                <Image
                                    src={user.picture}
                                    alt='Americoders'
                                    loading='lazy'
                                    preview={false}
                                />
                                <p className='form-text'>'Knowledge is power. Information is liberating. Education is
                                    the premise of progress in every society, in every family.' <br/>
                                    — Kofi Annan</p>
                            </>) : <Image
                                src='/images/avatars/avatar.png'
                                alt='Americoders'
                                loading='lazy'
                                preview={false}
                            />
                        }
                    </div>

                    <div>
                        <p className='text-muted'>Thank you for visiting us again. If you have not completed your
                            enrolled courses, please do so.
                        </p>
                        <p className='text-muted'>Check the <Link href={'/#course-list'}><a>homepage</a></Link> for new
                            courses.</p>
                    </div>

                </div>
            </div>
        </Content>
        {/*{user ? <pre>{JSON.stringify(user, null, 4)}</pre> : ''}*/}


        {/* enrolled courses section */}
        <Content>
            <div className='container-fluid px-4 py-5' id='enrolled-courses'>
                <h2 className='text-light pb-2 border-bottom'>My Enrolled Courses</h2>
                <div className='container col-xxl-12 px-4 py-5'>
                    {/* first col */}
                    <div className='feature col'>
                        {/* list all courses */}
                        {courses && courses.map(course => (<div key={course._id}>
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
                                <div className='flex-grow-1 ms-3 text-white-50'>
                                    {/* title / link to course*/}
                                    <Link
                                        href={`/user/course/${course.slug}`}
                                    >
                                        <a className='mt-2'><h5 className='pt-2 text-white'>{course.name}</h5></a>
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
                        </div>))}
                    </div>
                </div>
            </div>
        </Content>
    </UserRoute>)
}

export default UserIndex
