import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {Context} from '../../context'
import InstructorRoute from '../../components/routes/InstructorRoute'
import {Avatar} from 'antd'
import Link from 'next/link'
import {CheckCircleOutlined, CloseCircleOutlined} from '@ant-design/icons'

const InstructorIndex = () => {
    // state
    const [courses, setCourses] = useState([]) // initialize courses state with empty array
    const {
        state: {user},
    } = useContext(Context)

    // update courses
    useEffect(() => {
        loadCourses()
    }, [courses])

    const loadCourses = async () => {
        const {data} = await axios.get('/api/instructor-courses')
        setCourses(data)
    }

    return (<InstructorRoute>
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>Instructor Dashboard</h1>
                        <p className='lead text-muted'>Something short and leading about the collection
                            below—its
                            contents, the creator, etc. Make it short and sweet, but not too short so folks
                            don’t simply
                            skip over it entirely.</p>
                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                        <p className='small'>
                            {JSON.stringify(courses, null, 4)}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </InstructorRoute>)
}

export default InstructorIndex
