import {useState} from 'react'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import InstructorRoute from '../../../components/routes/InstructorRoute'
import CourseCreateForm from '../../../components/forms/CourseCreateForm'
import {toast} from 'react-toastify'

const CreateCourse = () => {
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
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('VALUES ', values)
    }

    return (<InstructorRoute>
        <main>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Create Course</h1>
                        <p className="lead text-muted">Something short and leading about the collection below—its
                            contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply
                            skip over it entirely.</p>
                    </div>
                </div>
            </section>

            <div className="album py-5 bg-light">
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
                    <pre>{JSON.stringify(values, null, 4)}</pre>
                    <hr/>
                    <pre>{JSON.stringify(image, null, 4)}</pre>
                </div>
            </div>
        </main>
    </InstructorRoute>)
}

export default CreateCourse