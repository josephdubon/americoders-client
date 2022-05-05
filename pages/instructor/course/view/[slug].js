import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import {CheckOutlined, CloseOutlined, EditOutlined, QuestionOutlined, UploadOutlined} from '@ant-design/icons'
import {Avatar, Button, List, Modal, Tooltip} from 'antd'
import ReactMarkdown from 'react-markdown'
import AddLessonForm from '../../../../components/forms/AddLessonForm'
import {toast} from 'react-toastify'
import Item from 'antd/lib/list/Item'


const CourseView = () => {
    // style
    const myStyle = {
        marginTop: '-15px', fontSize: '10px',
    }

    // state
    const [course, setCourse] = useState({})
    const [visible, setVisible] = useState(false)
    const [values, setValues] = useState({
        title: '',
        content: '',
        video: '',
    })
    const [uploading, setUploading] = useState(false)
    const [uploadButtonText, setUploadButtonText] = useState('Upload video')
    const [progress, setProgress] = useState(0)

    // router config
    const router = useRouter()
    // get slug from router url
    const {slug} = router.query

    useEffect(() => {
        loadCourse()
    }, [slug]) // use slug as dependency to run loadCourse in useEffect

    // load requested course by slug
    const loadCourse = async () => {
        // make get request
        const {data} = await axios.get(`/api/course/${slug}`)
        // update state with course
        setCourse(data)
    }

    // add-lesson functions
    const handleAddLesson = async e => {
        e.preventDefault()
        try {
            // get request for data
            const {data} = await axios.post(`/api/course/lesson/${slug}/${course.instructor._id}`,
                values) // lesson content from values

            // update state
            setValues({
                ...values,
                title: '',
                content: '',
                video: {}, // video is an object
            })
            setVisible(false)
            setUploadButtonText('Upload video')
            setCourse(data)

            // notification config
            toast.success('Lesson added!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

        } catch (err) {
            console.log('HANDLE LESSON: ', err)

            // notification config
            toast.error('Lesson add failed!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    // save video logic
    const handleVideo = async e => {
        e.preventDefault()
        try {
            // get file from form and update button text and loading state
            const file = e.target.files[0]
            setUploadButtonText(file.name)
            setUploading(true)

            // create variable to save from FormData
            const videoData = new FormData()
            videoData.append('video', file)

            // save progress bar and send video as form data to backend
            const {data} = await axios.post(`/api/course/upload-video/${course.instructor._id}`, videoData, {
                onUploadProgress: (e) => {
                    setProgress(Math.round((100 * e.loaded) / e.total))
                },
            })

            // once response is received update state
            setValues({...values, video: data})
            setUploading(false)
        } catch (err) {
            toast.error(err.response.data, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    // remove video logic
    const handleRemoveVideo = async e => {
        e.preventDefault()
        try {
            setUploading(true)

            const {data} = await axios.post(
                `/api/course/remove-video/${course.instructor._id}`,
                values.video
            )

            setProgress(0)
            setValues({...values, video: {}})
            setUploading(false)
            setUploadButtonText('Upload another video')
        } catch (err) {
            setUploading(false)
            toast.error('Video remove failed'.response.data, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }


    const handlePublish = async (e, courseId) => {
        try {
            // confirm publish
            let answer = window.confirm('Once you publish the course will be live on the platform for the students to enroll.')

            if (!answer) return ''

            // make request to backend
            const {data} = await axios.put(`/api/course/publish/${courseId}`)

            // update state
            setCourse(data)

            // notification config
            toast.success('Your course is now live!', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (err) {
            toast.error('Course publish failed.'.response.data, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        }
    }

    function handlePublish(e, courseId) {

    }

    return (<InstructorRoute>
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>{course && course.name}</h1>
                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='row row-cols-1 row-cols-sm-1 row-cols-md-1 g-1'>
                        {course && (<>
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
                                    {/* course name and lesson count */}
                                    <h5 className='pt-2'>{course.name}</h5>
                                    <p> {course.lessons && course.lessons.length} Lessons</p>

                                    <p style={myStyle}>{course.category}</p>
                                </div>

                                {/* action icons */}
                                {/* edit */}
                                <div className='d-flex mr-4 gap-3'>
                                    <Tooltip title='Edit'>
                                        <EditOutlined
                                            onClick={() =>
                                                router.push(`/instructor/course/edit/${slug}`)
                                            }
                                            className='h5 pointer-event text-warning mr-4'
                                        />
                                    </Tooltip>

                                    {/* render publish icon if min of 6 lessons is met */}
                                    {course.lessons && course.lessons.length < 5 ?
                                        <Tooltip title='Minimum of 5 lessons required to publish'>
                                            <QuestionOutlined className='h5 pointer-event text-danger'/>
                                        </Tooltip> : course.published ? (

                                            // unpublish
                                            <Tooltip title='Unpublish'>
                                                <CloseOutlined
                                                    onClick={(e) => handleUnpublish(e, course._id)}/>
                                            </Tooltip>
                                        ) : (

                                            // publish
                                            <Tooltip title='Publish'>
                                                <CheckOutlined
                                                    onClick={(e) => handlePublish(e, course._id)}
                                                    className='text-success'/>
                                            </Tooltip>
                                        )
                                    }
                                </div>
                            </div>

                            <hr/>

                            {/* course description */}
                            <div className='row row-ols-1 g-3'>
                                <ReactMarkdown children={course.description}/>
                            </div>

                            <div className='row'>
                                <Button
                                    onClick={() => setVisible(true)} // update state for modal
                                    className='col-md-6 offset-md-3 text-center'
                                    type='primary'
                                    shape='round'
                                    icon={<UploadOutlined/>}
                                    size='large'
                                >
                                    Add lesson
                                </Button>

                                {/* modal for lesson */}
                                <Modal
                                    title='+ Add Lesson'
                                    centered
                                    visible={visible}
                                    onCancel={() => setVisible(false)}
                                    footer={null}
                                >
                                    {/* render form component */}
                                    <AddLessonForm
                                        values={values}
                                        setValues={setValues}
                                        handleAddLesson={handleAddLesson}
                                        handleVideo={handleVideo}
                                        handleRemoveVideo={handleRemoveVideo}
                                        uploading={uploading}
                                        uploadButtonText={uploadButtonText}
                                        progress={progress}
                                    />
                                </Modal>

                                {/* lessons list */}
                                <div className='row pb-5'>
                                    <div className='col lesson-list'>
                                        <h4>{course && course.lessons && course.lessons.length} Lessons</h4>
                                        <List
                                            itemLayout='horizontal'
                                            dataSource={course && course.lessons}
                                            renderItem={(item, index) => (
                                                // list each item with index number next to title
                                                <Item>
                                                    <Item.Meta
                                                        avatar={<Avatar>{index + 1}</Avatar>}
                                                        title={item.title}
                                                    >
                                                    </Item.Meta>
                                                </Item>
                                            )}>
                                            <span>{}</span>
                                        </List>
                                    </div>
                                </div>
                            </div>

                        </>)}

                    </div>
                </div>
            </div>
        </main>
    </InstructorRoute>)

}

export default CourseView