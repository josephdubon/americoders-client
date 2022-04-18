import {useEffect, useState} from 'react'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import InstructorRoute from '../../../../components/routes/InstructorRoute'
import CourseCreateForm from '../../../../components/forms/CourseCreateForm'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'
import {Avatar, List} from 'antd'
import Item from 'antd/lib/list/Item'

const EditCourse = () => {
    // state
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '49.99',
        uploading: false,
        paid: true,
        category: '',
        loading: false,
        lessons: [],
    })

    // set image initial state to an empty object
    const [image, setImage] = useState({})
    const [preview, setPreview] = useState('')
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')

    // router
    const router = useRouter()
    const {slug} = router.query

    // load course
    useEffect(() => {
        loadCourse()
    }, [slug])

    const loadCourse = async () => {
        // get course data
        const {data} = await axios.get(`/api/course/${slug}`)

        // update state
        if (data) {
            setValues(data)
        }
        if (data && data.image) {
            setImage(data.image)
        }
    }

    // form logic: values
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    // form logic: images
    const handleImage = (e) => {
        let imagePreview = e.target.files[0]

        // set preview state
        setPreview(window.URL.createObjectURL(imagePreview))

        // set state for button text
        setUploadButtonText(imagePreview.name)

        // set values state
        setValues({...values, loading: true})

        // resize image
        Resizer.imageFileResizer(
            imagePreview,
            720,
            500,
            'JPEG',
            100,
            0,
            async (uri) => {
                try {
                    let {data} = await axios.post('/api/course/upload-image', {
                        image: uri,
                    })
                    console.log('IMAGE UPLOADED ', data)

                    // update image state
                    setImage(data)
                    setValues({...values, loading: false})
                } catch (err) {
                    console.log('IMAGE RESIZE ERROR ', err)
                    setValues(({...values, loading: false}))
                    // notification config
                    toast.error('Image upload failed. Try again later.', {
                        position: 'top-center',
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    })
                }
            })
    }

    // drag logic
    const handleDrag = (e, index) => {
        // console.log('ON DRAG => ', index)

        // use dataTransfer for drag and index position
        e.dataTransfer.setData('itemIndex', index)
    }

    // drop logic
    const handleDrop = async (e, index) => {
        // console.log('ON DROP => ', index)

        // what index position is drag-item coming from
        const draggedItemIndex = e.dataTransfer.getData('itemIndex')

        // what index position is drag-item going to
        const targetItemIndex = index

        // collect lessons
        let allLessons = values.lessons

        // item reorder logic
        let draggedItem = allLessons[draggedItemIndex] // active clicked on/dragged item for reorder
        allLessons.splice(draggedItemIndex, 1) // remove 1 item from index
        allLessons.splice(targetItemIndex, 0, draggedItem) // push item after target-item index

        // update state
        setValues({...values, lessons: [...allLessons]})

        // save to database
        const {data} = await axios.put(`/api/course/${slug}`, {
            ...values, // unpack all the values from state
            image, // include image with post request
        })

        // notification config
        toast.success('Great job! Lesson rearranged', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
    }

    // form logic: image remove
    const handleImageRemove = async () => {
        // console.log('REMOVE IMAGE ')
        try {
            setValues(({...values, loading: true}))
            const res = await axios.post('/api/course/remove-image', {image})
            setImage({})
            setPreview('')
            setUploadButtonText('Upload Image')
            setValues(({...values, loading: false}))

        } catch (err) {
            console.log('IMAGE REMOVE ERROR ', err)
            setValues(({...values, loading: false}))
            // notification config
            toast.error('Image remove failed. Try again later.', {
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

    // form logic: submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        // submit request to backend
        try {
            const {data} = await axios.put(`/api/course/${slug}`, {
                ...values, // unpack all the values from state
                image, // include image with post request
            })

            // notification config
            toast.success('Awesome! Course is updated', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            // // redirect to instructor page
            // await router.push('/instructor')
        } catch (err) {
            // notification config
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

    return (<InstructorRoute>
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>Update Course</h1>
                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='container-fluid col-md-12 offset-md-12 pb-5'>
                        {/* use props for form function and values */}
                        <CourseCreateForm
                            handleSubmit={handleSubmit}
                            handleImage={handleImage}
                            handleImageRemove={handleImageRemove}
                            handleChange={handleChange}
                            values={values}
                            setValues={setValues}
                            preview={preview}
                            uploadButtonText={uploadButtonText}
                            editPage={true}
                        />
                    </div>

                    {/* lessons list */}
                    <div className='row pb-5'>
                        <div className='col lesson-list'>
                            <h4>{values && values.lessons && values.lessons.length} Lessons</h4>
                            <List
                                onDragOver={(e) => e.preventDefault()}
                                itemLayout='horizontal'
                                dataSource={values && values.lessons}
                                renderItem={(item, index) => (
                                    // list each item with index number next to title
                                    <Item
                                        draggable
                                        onDragStart={(e) => handleDrag(e, index)} // use index for position
                                        onDrop={(e) => handleDrop(e, index)}
                                    >
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
            </div>
        </main>
    </InstructorRoute>)
}

export default EditCourse