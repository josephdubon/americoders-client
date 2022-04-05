import {useState} from 'react'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import InstructorRoute from '../../../components/routes/InstructorRoute'
import CourseCreateForm from '../../../components/forms/CourseCreateForm'
import {toast} from 'react-toastify'
import {useRouter} from 'next/router'

const CreateCourse = () => {
    // router
    const router = useRouter()

    // state
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '49.99',
        uploading: false,
        paid: true,
        category: '',
        loading: false,
    })

    // set image initial state to an empty object
    const [image, setImage] = useState({})
    const [preview, setPreview] = useState('')
    const [uploadButtonText, setUploadButtonText] = useState('Upload Image')

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

    // form logic: image remove
    const handleImageRemove = async (e) => {
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
        // console.log('VALUES ', values)
        try {
            const {data} = await axios.post('/api/course', {
                ...values, // unpack all the values from state
                image, // include image with post request
            })
            // notification config
            toast.success('Excellent! Now you can start adding lessons', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            // redirect to instructor page
            await router.push('/instructor')
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
                        <h1 className='fw-light'>Create Course</h1>
                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='container-fluid col-md-4 offset-md-4 pb-5'>
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
                        />
                    </div>
                    <p className='small'>
                        {JSON.stringify(values, null, 4)}</p>
                    <hr/>
                    <p className='small'>
                        {JSON.stringify(image, null, 4)}</p>
                </div>
            </div>
        </main>
    </InstructorRoute>)
}

export default CreateCourse