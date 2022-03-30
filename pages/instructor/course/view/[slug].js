import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import {CheckOutlined, EditOutlined} from '@ant-design/icons'
import {Avatar, Tooltip} from 'antd'
import ReactMarkdown from 'react-markdown'

const CourseView = () => {
// state
    const [course, setCourse] = useState({})

    // router config
    const router = useRouter()
    // get slug from router url
    const {slug} = router.query

    // load requested course by slug
    const loadCourse = async () => {
        // make get request
        const {data} = await axios.get(`/api/course/${slug}`)
        // update state with course
        setCourse(data)
    }

    useEffect(() => {
        loadCourse()
    }, [slug]) // use slug as dependency to run loadCourse in useEffect

    // style
    const myStyle = {
        marginTop: '-15px', fontSize: '10px',
    }

    return (<InstructorRoute>
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>{course && course.name}</h1>
                        <p className='lead text-muted'>{course && course.description}</p>
                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1'>
                        {course && (<>
                            <div className='d-flex align-items-center pt-2'>
                                {/* image media div */}
                                <div className="flex-shrink-0">
                                    {/* image source */}
                                    <Avatar
                                        size={80}
                                        src={course.image ? course.image.Location : '/images/americoders-course.png'}
                                    />
                                </div>

                                {/* media text body */}
                                <div className="flex-grow-1 ms-3">
                                    {/* course name and lesson count */}
                                    <h5 className="pt-2">{course.name}</h5>
                                    <p> {course.lessons && course.lessons.length} Lessons</p>

                                    <p style={myStyle}>{course.category}</p>
                                </div>

                                {/* action icons */}
                                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                                    {/* edit */}
                                    <div>
                                        <Tooltip title='Edit'>
                                            <EditOutlined className='h5 text-warning'/>
                                            <small>Edit</small>
                                        </Tooltip>
                                    </div>

                                    <span/> {/* keep this here for some space */}

                                    {/* publish */}
                                    <div>
                                        <Tooltip title='Publish'>
                                            <CheckOutlined className='h5 text-danger'/>
                                            <small>Publish</small>
                                        </Tooltip>
                                    </div>

                                </div>
                            </div>

                            <hr/>

                            {/* course description */}
                            <div className='row row-ols-1 g-3'>
                                <ReactMarkdown children={course.description}/>
                            </div>
                        </>)}

                    </div>
                </div>
            </div>
        </main>
    </InstructorRoute>)

}

export default CourseView