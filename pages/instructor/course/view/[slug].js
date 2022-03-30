import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import {CheckOutlined, EditOutlined} from '@ant-design/icons'
import {Avatar, Tooltip} from 'antd'

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
        marginTop: '-15px',
        fontSize: '10px',
    }

    return (
        <InstructorRoute>
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
                        {/* Login Form */}
                        <div className='container-fluid col-md-4 offset-md-4 pb-5'>

                            <small>{JSON.stringify(course, null, 4)}</small>

                        </div>
                    </div>
                </div>
            </main>
        </InstructorRoute>
    )

}

export default CourseView