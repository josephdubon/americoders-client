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

    const [preview, setPreview] = useState('')

    // form logic: values
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    // form logic: images
    const handleImage = (e) => {
        setPreview(window.URL.createObjectURL(e.target.files[0]))
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
                            handleChange={handleChange}
                            values={values}
                            setValues={setValues}
                            preview={preview}
                        />
                    </div>
                    <pre>{JSON.stringify(values, null, 4)}</pre>
                </div>
            </div>
        </main>
    </InstructorRoute>)
}

export default CreateCourse