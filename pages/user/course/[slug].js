import {useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'

const SingleCourse = () => {
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({lessons: []}) // course.lessons

    // router
    const router = useRouter()
    const {slug} = router.query

    useEffect(() => {
        if (slug) loadCourse()
    }, [slug])

    const loadCourse = async () => {
        // collect data
        const {data} = await axios.get(`/api/course/${slug}`)

        // update state
        setCourse(data)
    }

    return (<>
        Course Slug:
        <pre>{JSON.stringify(course, null, 4)}</pre>
    </>)
}

export default SingleCourse