import {useRouter} from 'next/router'

const SingleCourse = () => {
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({lessons: []}) // course.lessons

    // router
    const router = useRouter()

    return (<>
        Course Slug:
        <pre>{JSON.stringify(router, null, 4)}</pre>
    </>)
}

export default SingleCourse