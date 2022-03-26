import {useState} from 'react'
// import axios from 'axios'
import {Select} from 'antd'

import InstructorRoute from '../../../components/routes/InstructorRoute'
import CourseCreateForm from '../../../components/forms/CourseCreateForm'

const {Option} = Select

const CreateCourse = () => {
    // state
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '9.99',
        uploading: false,
        paid: true,
        loading: false,
        imagePreview: '',
    })

    // form logic: values
    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    // form logic: images
    const handleImage = () => {
        //
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
                        <CourseCreateForm handleChange={handleChange}
                                          handleImage={handleImage()}
                                          handleSubmit={handleSubmit}
                                          values={values}
                                          setValues={setValues}
                        />
                    </div>
                    <pre>{JSON.stringify(values, null, 4)}</pre>
                </div>
            </div>
        </main>
    </InstructorRoute>)
}

export default CreateCourse