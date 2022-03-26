import {useState} from 'react'
// import axios from 'axios'
import {Button, Select} from 'antd'

import {SaveOutlined} from '@ant-design/icons'

import InstructorRoute from '../../../components/routes/InstructorRoute'

const {Option} = Select

const CreateCourse = () => {
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
                    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                        <p className='lead'>
                            Create Course
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </InstructorRoute>)
}

export default CreateCourse