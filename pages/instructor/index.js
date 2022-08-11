import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {Context} from '../../context'
import InstructorRoute from '../../components/routes/InstructorRoute'
import {Avatar, Tooltip} from 'antd'
import Link from 'next/link'
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'
import {PageHead} from '../../components/head/PageHead'

const InstructorIndex = () => {
    // state
    const [courses, setCourses] = useState([]) // initialize courses state with empty array
    const {
        state: {user},
    } = useContext(Context)

    // get current courses
    const loadCourses = async () => {
        const {data} = await axios.get('/api/instructor-courses')
        setCourses(data)
    }

    // update courses
    useEffect(() => {
        loadCourses()
    }, [])

    // style
    const myStyle = {
        marginTop: '-15px',
        fontSize: '10px',
    }


    return (<InstructorRoute>

        <PageHead title={'Instructor Dashboard'}/>

        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>Instructor Dashboard</h1>
                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1'>
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
                                <div className='flex-grow-1 ms-3'>
                                    {/* title / link to course*/}
                                    <Link
                                        href={`/instructor/course/view/${course.slug}`}
                                    >
                                        <a className='mt-2 text-primary'><h5 className='pt-2'>{course.name}</h5></a>
                                    </Link>
                                    <p>{
                                        // show number of lessons in course
                                        course.lessons.length} Lessons</p>
                                    {
                                        // show requirements message
                                        course.lessons.length < 5 ? (
                                                <p style={myStyle} className='text-warning'>At least 5 lessons are required
                                                    to publish a course.</p>
                                            ) :
                                            // show success message
                                            course.published ? (
                                                    <p style={myStyle} className='text-success'>Your course is live in the
                                                        marketplace.</p>
                                                ) :
                                                // show 'ready to publish' message
                                                (
                                                    <p style={myStyle} className='text-success'>Your course is ready to
                                                        be published.</p>
                                                )}
                                </div>
                                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                                    {course.published ? (
                                        <Tooltip title='Published'>
                                            <CheckCircleOutlined className='h5 text-success'/>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title='Unpublished'>
                                            <CloseCircleOutlined className='h5 text-warning'/>
                                        </Tooltip>
                                    )}
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>
            </div>
        </main>
    </InstructorRoute>)
}

export default InstructorIndex
