import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import StudentRoute from '../../../components/routes/StudentRoute'
import {Avatar, Button, Drawer, Image, Layout, List, Menu, Row, Space} from 'antd'
import ReactMarkdown from 'react-markdown'
import {CheckCircleFilled, MinusCircleFilled, SyncOutlined} from '@ant-design/icons'
import ReactPlayer from 'react-player'
import PlaygroundFrontEnd from '../../../components/editor/PlaygroundFrontEnd'
import Moment from 'moment'

const {Content} = Layout
const {Item} = Menu

const SingleCourse = () => {
    // state
    const [clicked, setClicked] = useState(-1)
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({lessons: []}) // course.lessonn
    const [completedLessons, setCompletedLessons] = useState([])
    const [visible, setVisible] = useState(false)


    // force stat update
    const [updateState, setUpdateState] = useState(false)

    // router
    const router = useRouter()
    const {slug} = router.query

    const currentYear = new Date().getFullYear()


    useEffect(() => {
        if (slug) loadCourse()
    }, [slug])

    useEffect(() => {
        if (course) loadCompletedLessons()
    }, [course])

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

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
        setCompletedLessons(data)
    }

    const markComplete = async () => {
        const {data} = await axios.post(`/api/mark-complete`, {
            courseId: course._id,
            lessonId: course.lessons[clicked]._id
        })
        setCompletedLessons([...completedLessons, course.lessons[clicked]._id])
        setUpdateState(!updateState)
    }

    const markIncomplete = async () => {
        try {
            const {data} = await axios.post(`/api/mark-incomplete`, {
                courseId: course._id,
                lessonId: course.lessons[clicked]._id
            })

            console.log(data)

            // get completed lessons
            const all = completedLessons

            // find index of lesson
            const index = all.indexOf(course.lessons[clicked]._id)

            // remove lesson from completed array
            if (index > -1) {
                all.splice(index, 1)
            }

            // update state
            setCompletedLessons(all)
            setUpdateState(!updateState)
        } catch (err) {
            console.log(err)
        }

    }

    return (<>
            {loading && (<SyncOutlined
                spin
                className='d-flex justify-content-between display-1 p-5 center'
            />)}

            <StudentRoute>
                {/* top drawer lesson menu */}
                <Space className='d-flex justify-content-center'>
                    <Button
                        type='primary'
                        onClick={showDrawer}
                        className='text-primary mt-3 btn-block mb-3 text-white'
                    >
                        {course.name} | Lessons Menu
                    </Button>
                </Space>
                <Drawer
                    title={course && course.name + ' | Lessons Menu'}
                    placement={'left'}
                    width={500}
                    onClose={onClose}
                    visible={visible}
                    extra={<Space>
                        <Button type='primary' onClick={onClose}>
                            Close
                        </Button>
                    </Space>}
                >
                    <Menu
                        theme={'dark'}
                        mode='inline'
                        defaultSelectedKeys={[clicked]}
                        className='p-3 pt-4'
                        style={{height: '80vh', overflow: 'scroll'}}
                    >
                        {course.lessons.map((lesson, index) => (<Item
                            onClick={() => setClicked(index)}
                            key={index}
                            icon={<Avatar>{index + 1}</Avatar>}
                        >
                                <span style={{marginRight: '25px'}}>
                                    {lesson.title.substring(0, 30)}
                                </span>
                            {completedLessons.includes(lesson._id) ? (<CheckCircleFilled
                                className='float-end text-primary ml-2'
                                style={{marginTop: '13px'}}
                            />) : (<MinusCircleFilled
                                className='float-end text-danger ml-2'
                                style={{marginTop: '13px'}}
                            />)}
                        </Item>))}
                    </Menu>
                    <p className='modal-footer text-white shadow'>© {currentYear} Americoders | Questions or
                        comments? <a
                            href='mailto:questions@americoders.org'>Email us
                            here</a></p>
                </Drawer>

                <Row>

                    {/* main content area */}
                    <div className='col'>
                        {/* top bar lesson title , completed status */}
                        {clicked !== -1 ? (
                            <>
                                <Content className='bg-body'>
                                    <div className='container-fluid px-4 py-5'>
                                        {/* lesson title */}
                                        <h2 className='pb-2 border-bottom'>
                                            {course.lessons[clicked].title.substring(0, 30)}
                                        </h2>

                                        {/* mark as complete area */}
                                        {completedLessons.includes(course.lessons[clicked]._id) ? (
                                            <span
                                                className='float-end'
                                                role='button'
                                                onClick={markIncomplete}
                                            >
                                        Mark as incomplete
                                    </span>
                                        ) : (
                                            <span
                                                className='float-end'
                                                role='button'
                                                onClick={markComplete}>
                                        Mark as completed
                                    </span>
                                        )}

                                        {/* course description*/}
                                        <div className='row g-4 py-5 rows-cols-1'>
                                            <ReactMarkdown
                                                children={course.lessons[clicked].content}
                                                className='single-post'
                                            />
                                        </div>

                                        {/* video area */}
                                        <div className='row g-4 py-5 mb-3'>
                                            {course.lessons[clicked].video &&
                                                course.lessons[clicked].video.Location && (
                                                    <>
                                                        {/* video col */}
                                                        <div className='feature col'>
                                                            <div className='feature-icon bg-primary bg-gradient'>
                                                                <svg className='bi' width='1em' height='1em'>
                                                                </svg>
                                                            </div>
                                                            <h2>Video</h2>
                                                            <div className='player'
                                                            >
                                                                <ReactPlayer
                                                                    url={course.lessons[clicked].video.Location}
                                                                    width='auto'
                                                                    height='500px'
                                                                    controls
                                                                    onEnded={markComplete} // update lesson completed status on video complete
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className='feature col'>
                                                            <div className='feature-icon bg-primary bg-gradient'>
                                                                <svg className='bi' width='1em' height='1em'>
                                                                </svg>
                                                            </div>
                                                            <h2>Confused?</h2>
                                                            <ul className='card-subtitle'>
                                                                <li>Read over lesson once more</li>
                                                                <li>Re-watch video (if there is one)</li>
                                                                <li>Raise your hand!</li>
                                                                <br/>
                                                                <li>YOU CAN DO THIS!</li>
                                                            </ul>
                                                        </div>

                                                    </>
                                                )}
                                        </div>

                                        {/* code editors */}
                                        {course.lessons[clicked].html &&
                                            course.lessons[clicked].css && course.lessons[clicked].css && (
                                                <>
                                                    <PlaygroundFrontEnd
                                                        htmlValue={course.lessons[clicked].content}
                                                        cssValue={course.lessons[clicked].css}
                                                        jsValue={course.lessons[clicked].javascript}
                                                    />
                                                < />
                                            )}

                                        {/* description col*/}
                                        <Content className='rounded-3 mt-3'>
                                            <div className='container-fluid px-4 py-5 mb-5'>
                                                <h2 className='lead title-large'>Are you stuck or getting
                                                    frustrated?</h2>
                                                <p className='text-white text-center lead fs-4'>Pause. Breathe. Try
                                                    again.</p>
                                                <p className='text-white text-center lead fs-5'>Raise your hand and ask
                                                    for help! <br/>
                                                    We are all here to help, learn, and grow together.</p>
                                            </div>
                                        </Content>

                                    </div>
                                </Content>


                            </>
                        ) : (
                            <>
                                {/* hero intro section */}
                                <Content className='dark d-flex'>
                                    <div className='container col-xxl-12 px-4 py-5'>
                                        <div className='title-large '>
                                            <h1 className='fw-bold text-white title-large lh-1 mb-3'>
                                                {course.name}
                                            </h1>
                                        </div>
                                        <div
                                            className='row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5'>
                                            <div
                                                className='col-10 col-sm-8 col-lg-6'>
                                                <Image
                                                    src={course.image && course.image.Location ? course.image.Location : '/images/americoders-course.png'}
                                                    alt={course.name}
                                                    preview={false}
                                                    loading='lazy'
                                                    className='p1'
                                                />
                                            </div>

                                            <div className='col-lg-6 description-large bg-text'>
                                                <p className='text-white fs-6'>
                                                    Welcome! Please click the lessons menu at the top of the page to
                                                    start learning.
                                                </p>
                                                <List
                                                    bordered
                                                    className='text-white'
                                                >
                                                    <List.Item className='text-white'>
                                                        <strong>Course Name: </strong> {course.name && course.name}
                                                    </List.Item>

                                                    <List.Item className='text-white'>
                                                        <strong>{course && course.category >= 2 ? 'Categories: ' : 'Category: '} </strong> {course && course.category}
                                                    </List.Item>

                                                    <List.Item className='text-white'>
                                                        <strong>Lessons: </strong> {course.lessons && course.lessons.length}
                                                    </List.Item>

                                                    <List.Item className='text-white'>
                                                        <strong>Description: </strong> {course && course.description}
                                                    </List.Item>

                                                    <List.Item className='text-white'>
                                                        <strong>Last
                                                            Update: {Moment(course && course.updatedAt).format('LL')}
                                                        </strong>
                                                    </List.Item>
                                                </List>
                                            </div>
                                        </div>
                                    </div>
                                </Content>
                            </>)}
                    </div>
                </Row>
            </StudentRoute>
        </>
    )
}

export default SingleCourse