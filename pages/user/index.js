import {useContext, useEffect, useState} from 'react'
import {Context} from '../../context'
import UserRoute from '../../components/routes/UserRoute'
import axios from 'axios'

const UserIndex = () => {
    // state
    const [hidden, setHidden] = useState(true)
    const [courses, setCourses] = useState([])

    // get user
    const {
        state: {user},
    } = useContext(Context)

    useEffect(() => {
        loadCourses()
    }, [courses])

    const loadCourses = async () => {
        const {data} = await axios.get('/api/user-courses/')
    }

    return (<UserRoute>
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>User Dashboard</h1>

                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                        <p className='lead'>
                            Welcome User {JSON.stringify(user, null, 4)}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </UserRoute>)
}

export default UserIndex
