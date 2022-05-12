import {useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import SingleCourseHero from '../../components/cards/SingleCourseHero'
import PreviewModal from '../../components/modal/PreviewModal'
import SingleCourseLessons from '../../components/cards/SingleCourseLessons'

const SingleCourse = ({course}) => {
    // state
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(false)

    // context
    const {
        state: {user},
    } = useContext(Context)

    const router = useRouter()
    const {slug} = router.query

    return (<>
        <SingleCourseHero
            course={course}
            showModal={showModal}
            setShowModal={setShowModal}
            preview={preview}
            setPreview={setPreview}
        />

        <PreviewModal
            showModal={showModal}
            setShowModal={setShowModal}
            preview={preview}
        />

        {course.lessons && (
            <SingleCourseLessons
                lessons={course.lessons}
                setPreview={setPreview}
                showModal={showModal}
                setShowModal={setShowModal}
            />
        )}
    </>)
}

export async function getServerSideProps({query}) {
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}`)
    return {
        props: {
            course: data,
        },
    }
}

export default SingleCourse
