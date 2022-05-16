import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import StudentRoute from '../../../components/routes/StudentRoute'
import {Avatar, Menu} from 'antd'

const {Item} = Menu


const SingleCourse = () => {
    // state
    const [clicked, setClicked] = useState(-1)
    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({lessons: []}) // course.lessons

    // router
    const router = useRouter()
    const {slug} = router.query

    useEffect(() => {
        if (slug) loadCourse()
    }, [slug])

    const loadCourse = async () => {
        // collect data
        const {data} = await axios.get(`/api/user/course/${slug}`)

        // update state
        setCourse(data)
    }

    return (
        <StudentRoute>
            <div className='row'>
                <div
                    className='col'
                    style={{maxWidth: 320}}>
                    <Menu
                        defaultSelectedKeys={[clicked]}
                        inlineCollapsed={collapsed}
                        style={{height: '80vh', overflow: 'scroll'}}
                    >
                        {course.lessons.map((lesson, index) => (
                            <Item
                                onClick={() => setClicked(index)}
                                key={index}
                                icon={<Avatar>{index}</Avatar>}
                            >
                                {lesson.title.substring(0, 30)}
                            </Item>
                        ))}
                    </Menu>
                </div>

                <div className='col'>
                    {clicked !== -1 ? (
                        <>
                            <pre>
                            {JSON.stringify(course.lessons[clicked], null, 4)}
                            </pre>
                        </>
                    ) : (
                        <>
                            Click on a lesson to start learning!
                        </>
                    )}
                </div>
            </div>
        </StudentRoute>
    )
}

export default SingleCourse