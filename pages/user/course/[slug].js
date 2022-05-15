import {useRouter} from 'next/router'

const SingleCourse = () => {
    const router = useRouter()

    return (<>
        Course Slug:
        <pre>{JSON.stringify(router, null, 4)}</pre>
    </>)
}

export default SingleCourse