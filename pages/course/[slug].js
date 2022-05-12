import {useContext, useEffect, useState} from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import SingleCourseHero from '../../components/cards/SingleCourseHero'
import PreviewModal from '../../components/modal/PreviewModal'
import SingleCourseLessons from '../../components/cards/SingleCourseLessons'
import {Context} from '../../context'
import {toast} from 'react-toastify'

const SingleCourse = ({course}) => {
    // state
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [enrolled, setEnrolled] = useState({})

    // context
    const {
        state: {user},
    } = useContext(Context)

    // make request to backend
    useEffect(() => {
        //
        if (user && course) checkEnrollment()
    }, [user, course])

    const checkEnrollment = async () => {
        const {data} = await axios.get(`/api/check-enrollment/${course._id}`)
        console.log('CHECK ENROLLMENT', data)

        // update state
        setEnrolled(data)
    }


    const router = useRouter()
    const {slug} = router.query

    const handlePaidEnrollment = () => {
        console.log('handle paid enroll hit!')
    }

    const handleFreeEnrollment = async (e) => {
        // console.log('handle FREE enroll hit!')
        e.preventDefault()

        try {
            // update state
            setLoading(true)
            const {data} = await axios.post(`/api/free-enrollment/${course._id}`)

            // notification config
            toast(data.message, {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
        } catch (err) {
            toast.error('Enrollment failed', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            console.log('FREE ENROLLMENT ERROR: ', err)

            //update state
            setLoading(false)
        }

    }

    return (<>
        <SingleCourseHero
            course={course}
            showModal={showModal}
            setShowModal={setShowModal}
            preview={preview}
            setPreview={setPreview}
            user={user}
            loading={loading}
            handlePaidEnrollment={handlePaidEnrollment}
            handleFreeEnrollment={handleFreeEnrollment}
            enrolled={enrolled}
            setEnrolled={setEnrolled}
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
