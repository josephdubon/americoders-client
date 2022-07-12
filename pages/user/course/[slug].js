import {createElement, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import StudentRoute from '../../../components/routes/StudentRoute'

// next.js renders pages server-side, giving a 'window object isn't available' error
// fix: dynamically import the module containing the AceEditor:
import dynamic from 'next/dynamic'
import {Avatar, Button, Col, Layout, Menu, Row} from 'antd'
import ReactMarkdown from 'react-markdown'
import {
    CheckCircleFilled,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    MinusCircleFilled,
    PlayCircleOutlined
} from '@ant-design/icons'
import ReactPlayer from 'react-player'

const {Content} = Layout

const AceDynamic = dynamic(
    () => import('../../../components/editor/AceAmericoders'),
    {ssr: false}
)

const {Item} = Menu

const SingleCourse = () => {
    // state
    const [clicked, setClicked] = useState(-1)
    const [collapsed, setCollapsed] = useState(false)
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({lessons: []}) // course.lessonn
    const [completedLessons, setCompletedLessons] = useState([])

    const [html, setHtml] = useState('')
    const [css, setCss] = useState('')
    const [javascript, setJavascript] = useState('')
    const [srcDoc, setSrcDoc] = useState('')
    // force stat update
    const [updateState, setUpdateState] = useState(false)

    // router
    const router = useRouter()
    const {slug} = router.query

    useEffect(() => {
        if (slug) loadCourse()
    }, [slug])

    useEffect(() => {
        if (course) loadCompletedLessons()
    }, [course])

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
            <html lang='en'>
            <body>${html}</body>
            <style>${css}</style>
            <script>${javascript}</script>
            </html>
             `)
        }, 250)
        // clear out on every update
        return () => {
            clearTimeout(timeout)
        }
    }, [html, css, javascript])

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
                        mode='inline'
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
                                <span style={{marginRight: '25px'}}>
                                    {lesson.title.substring(0, 30)}
                                </span>
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
                                    <div className='row g-4 py-5' mb-3>
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

                                    {/* description col*/}
                                    <Content className='rounded-3'>
                                        <div className='container-fluid px-4 py-5 mb-5'>
                                            <h2 className='lead title-large'>Are you stuck or getting
                                                frustrated?</h2>
                                            <p className='text-white text-center lead fs-4'>Pause. Breathe. Try
                                                again.</p>
                                            <p className='text-white text-center lead fs-5'>Raise your hand and ask
                                                for
                                                help! <br/>
                                                We are all here to help, learn, and grow together.</p>
                                        </div>
                                    </Content>

                                    <Content>
                                        {/* editor area */}
                                        <div className='container-fluid bg-body pane topPane'>
                                            {/* html */}
                                            <AceDynamic
                                                language={'xml'}
                                                value={html}
                                                onChange={setHtml}
                                                editorName={'HTML'}
                                                displayName={'HTML'}
                                            />

                                            {/* css */}
                                            <AceDynamic
                                                language={'css'}
                                                value={css}
                                                onChange={setCss}
                                                editorName={'CSS'}
                                                displayName={'CSS'}
                                            />

                                            {/* javascript */}
                                            <AceDynamic
                                                language={'javascript'}
                                                value={javascript}
                                                onChange={setJavascript}
                                                editorName={'JavaScript'}
                                                displayName={'JavaScript'}
                                            />
                                        </div>
                                    </Content>

                                    <Content>
                                        {/* iframe render area */}
                                        <div className='container-fluid bg-body editorArea'>
                                            <iframe
                                                srcDoc={srcDoc}
                                                title={'output'}
                                                sandbox={'allow-scripts'}
                                                frameBorder={'0'}
                                                width={'100%'}
                                                height={'100% '}
                                            />
                                        </div>
                                    </Content>

                                </div>
                            </Content>


                        </>
                    ) : (
                        <div className='d-flex justify-content-center p-5'>
                            <div className='text-center p-5'>
                                <PlayCircleOutlined className='text-primary display-1 p-5'/>
                                <p className='lead'>Welcome! Click on the lessons to start learning</p>
                            </div>
                        </div>
                    )}
                </div>
            </Row>
        </StudentRoute>
    )
}

export default SingleCourse