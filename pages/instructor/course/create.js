import {useState} from 'react'
// import axios from 'axios'
import {Button, Select} from 'antd'

import {SaveOutlined} from '@ant-design/icons'

import InstructorRoute from '../../../components/routes/InstructorRoute'

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

    // form logic: create form
    const courseCreateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className='form-group '>
                {/* name */}
                <input
                    type='text'
                    name='name'
                    className='form-control'
                    value={values.name}
                    placeholder='Name'
                    onChange={handleChange}
                />
            </div>

            {/* description */}
            <div className='form-group'>
                <textarea
                    name='description'
                    id=''
                    cols='7'
                    rows='7'
                    className='form-control'
                    value={values.description}
                    placeholder='Description'
                    onChange={handleChange}
                >
                </textarea>
            </div>

            {/* paid or free course */}
            <div className='form-row'>
                <div className='col'>
                    <div className='form-group d-grid'>
                        <Select
                            size='large'
                            value={values.paid}
                            onChange={(v) => setValues({...values, paid: !values.paid})}
                        >
                            <Option value={true}>Paid</Option>
                            <Option value={false}>Free</Option>
                        </Select>
                    </div>
                </div>
            </div>

            {/* image upload */}
            <div className="form-row">
                <div className="col">
                    <div className="form-group d-grid">
                        <label
                            className="btn btn-outline-secondary text-left">
                            {values.loading ? ' Uploading' : 'Image Upload'}
                            <input
                                type="file"
                                name='image'
                                accept='image/*'
                                onChange={handleChange}
                                hidden
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* button */}
            <div className="row">
                <div className="col d-grid">
                    <Button
                        onClick={handleSubmit}
                        disabled={values.loading || values.uploading}
                        className='btn btn-primary'
                        loading={values.loading}
                        icon={<SaveOutlined/>}
                        type='primary'
                        size='large'
                        shape='round'
                    >
                        {values.loading ? 'Saving...' : 'Save & Continue'}
                    </Button>
                </div>
            </div>
        </form>
    )

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
                        {courseCreateForm()}
                    </div>
                </div>
            </div>
        </main>
    </InstructorRoute>)
}

export default CreateCourse