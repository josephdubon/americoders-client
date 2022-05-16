import {createElement, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import StudentRoute from '../../../components/routes/StudentRoute'
import {Avatar, Button, Menu} from 'antd'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import {MenuFoldOutlined, MenuUnfoldOutlined, PlayCircleOutlined} from '@ant-design/icons'

const {Item} = Menu

const SingleCourse = () => {
    // state
    const [clicked, setClicked] = useState(-1)
    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({lessons: []}) // course.lessonn
    const [completedLessons, setCompletedLessons] = useState([])

    // router
    const router = useRouter()
    const {slug} = router.query

    useEffect(() => {
        if (slug) loadCourse()
    }, [slug])

    useEffect(() => {
        if (course) loadCompletedLessons()
    }, [course])

    const loadCourse = async () => {
        // collect data
        const {data} = await axios.get(`/api/user/course/${slug}`)
        // update state
        setCourse(data)
    }

    const loadCompletedLessons = async () => {
        const {data} = await axios.post(`/api/list-complete`, {
            courseId: course._id,
        })
        console.log('COMPLETED LESSONS => ', data)
        setCompletedLessons(data)
    }

    const markComplete = async () => {
        const {data} = await axios.post(`/api/mark-complete`, {
            courseId: course._id,
            lessonId: course.lessons[clicked]._id
        })
        console.log(data)
    }

    const markIncomplete = async () => {
        const {data} = await axios.post(`/api/mark-incomplete`, {
            courseId: course._id,
            lessonId: course.lessons[clicked]._id
        })
        console.log(data)
    }

    return (
        <StudentRoute>
            <Row>
                <Col>
                    <Button
                        disabled={loading}
                        onClick={() => setCollapsed(!collapsed)}
                        className='text-primary mt-1 btn-block mb-2'
                    >
                        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}{' '}
                        {!collapsed && 'Lessons'}
                    </Button>
                    <Menu
                        defaultSelectedKeys={[clicked]}
                        inlineCollapsed={collapsed}
                        style={{height: '80vh', overflow: 'scroll'}}
                    >
                        {course.lessons.map((lesson, index) => (
                            <Item
                                onClick={() => setClicked(index)}
                                key={index}
                                icon={<Avatar>{index + 1}</Avatar>}
                            >
                                {lesson.title.substring(0, 30)}{' '}
                                {completedLessons.includes(lesson._id) ? (
                                    <CheckCircleFilled
                                        className='float-end text-primary ml-2'
                                        style={{marginTop: '13px'}}
                                    />
                                ) : (
                                    <MinusCircleFilled
                                        className='float-end text-danger ml-2'
                                        style={{marginTop: '13px'}}
                                    />
                                )}
                            </Item>
                        ))}
                    </Menu>
                </Col>

                <div className='col'>
                    {clicked !== -1 ? (
                        <>
                            <div className='col alert alert-primary'>
                                <strong>{course.lessons[clicked].title.substring(0, 30)}</strong>
                                <span
                                    className='float-end'
                                    role='button'
                                    onClick={markComplete}
                                >
                                    Mark as Complete
                                </span>
                            </div>

                            {course.lessons[clicked].video && course.lessons[clicked].video.Location && (<>
                                    <div>
                                        {/* video player */}
                                        <ReactPlayer
                                            className='player'
                                            url={course.lessons[clicked].video.Location}
                                            width='100%'
                                            height='100%'
                                            controls
                                        />
                                    </div>
                                </>
                            )}

                            {/* course description*/}
                            <ReactMarkdown
                                children={course.lessons[clicked].content}
                                className='single-post'
                            />
                        </>
                    ) : (
                        <>
                            <div className='display-flex justify-content-center p-5'>
                                <div className='text-center p-5'>
                                    <PlayCircleOutlined
                                        className='text-primary display-1 p-5'/>
                                    <p className='lead'>Click on a lesson to start learning!</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Row>
        </StudentRoute>
    )
}

export default SingleCourse