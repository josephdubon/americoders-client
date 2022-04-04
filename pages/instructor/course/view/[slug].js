import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import {CheckOutlined, EditOutlined, UploadOutlined} from '@ant-design/icons'
import {Avatar, Button, Modal, Tooltip} from 'antd'
import ReactMarkdown from 'react-markdown'
import AddLessonForm from '../../../../components/forms/AddLessonForm'
import {toast} from 'react-toastify'

const CourseView = () => {
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
    const handleLesson = e => {
        e.preventDefault()
        console.log(values)
    }

    // dave video logic
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
            const {data} = await axios.post('/api/course/upload-video', videoData, {
                onUploadProgress: (e) => {
                    setProgress(Math.round((100 * e.loaded) / e.total))
                },
            })

            // once response is received update stateKI
            console.log(data);
            setValues({...values, video: data});
            setUploading(false);
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

                            <div className="row">
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
                                        handleAddLesson={handleLesson}
                                        handleVideo={handleVideo}
                                        uploading={uploading}
                                        uploadButtonText={uploadButtonText}
                                    />
                                </Modal>
                            </div>

                        </>)}

                    </div>
                </div>
            </div>
        </main>
    </InstructorRoute>)

}

export default CourseView