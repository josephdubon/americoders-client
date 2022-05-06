import {useEffect, useState} from 'react'
import axios from 'axios'

const Index = () => {
    // state config
    const [courses, setCourses] = useState([])

    // courses config
    useEffect(() => {

        // collect data
        const fetchCourses = async () => {
            const {data} = await axios.get('/api/courses')
            setCourses(data)
        }
        fetchCourses()
    }, [])

    return (<>
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>Home</h1>

                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='row gap-3'>
                        <p className='lead'>
                            Welcome Home
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default Index