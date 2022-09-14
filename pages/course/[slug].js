import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import SingleCourseHero from '../../components/cards/SingleCourseHero'
import PreviewModal from '../../components/modal/PreviewModal'
import SingleCourseLessons from '../../components/cards/SingleCourseLessons'
import { Context } from '../../context'
import { toast } from 'react-toastify'
import { loadStripe } from '@stripe/stripe-js'
import { PageHead } from '../../components/head/PageHead'
import classNames from 'classnames'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import ReactPlayer from 'react-player'
import Footer from '../../components/Footer/Footer'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/landingPage'

const Stripe = require('stripe')

const useStyles = makeStyles(styles)

const SingleCourse = ({ course }) => {
  // state
  const [showModal, setShowModal] = useState(false)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [enrolled, setEnrolled] = useState({})

  // context
  const {
    state: { user },
  } = useContext(Context)

  const classes = useStyles()

  // make request to backend
  useEffect(() => {
    //
    if (user && course) checkEnrollment()
  }, [user, course])

  const checkEnrollment = async () => {
    const { data } = await axios.get(`/api/check-enrollment/${course._id}`)
    // console.log('CHECK ENROLLMENT', data)

    // update state
    setEnrolled(data)
  }

  const router = useRouter()
  const { slug } = router.query

  const handlePaidEnrollment = async () => {
    console.log('handle paid enroll hit!')
    try {
      // update state
      setLoading(true)

      // check if user is logged in
      if (!user) await router.push('/login')

      // check if already enrolled and redirect to course page
      if (enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`)

      // collect data
      const { data } = await axios.post(`/api/paid-enrollment/${course._id}`)

      // stripe config
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)
      await stripe.redirectToCheckout({ sessionId: data })

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

      // update state
      setLoading(false)
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
      console.log('PAID ENROLLMENT ERROR: ', err)

      // update state
      setLoading(false)
    }
  }

  const handleFreeEnrollment = async (e) => {
    // console.log('handle FREE enroll hit!')
    e.preventDefault()

    try {
      // check if user is logged in
      if (!user) await router.push('/login')

      // check if already enrolled and redirect to course page
      if (enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`)

      // update state
      setLoading(true)
      const { data } = await axios.post(`/api/free-enrollment/${course._id}`)

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

      // update state
      setLoading(false)

      // redirect to course page
      await router.push(`/user/course/${data.course.slug}`)
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

      // update state
      setLoading(false)
    }

  }

  return (<>

    <PageHead title={course.name}/>

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

    <div className={classNames(classes.main, classes.mainRaised)}>
      <div className={classes.container}>
        <GridContainer
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {course.lessons[0].video && course.lessons[0].video.Location ? (
            <GridItem cs={12} sm={12} md={6}
                      onClick={() => {
                        setPreview(course.lessons[0].video.Location)
                        setShowModal(!showModal) // toggle modal
                      }}
            >
              <ReactPlayer
                url={course.lessons[0].video.Location}
                light={course.image.Location}
                width={'100%'}
              />
            </GridItem>
          ) : (<>
            <GridItem cs={12} sm={12} md={6}>
              {course.image && course.image.Location ?
                <Image src={course.image.Location}
                       alt={course.name}
                       preview={false}
                       width={'100%'}
                /> : <Image src="/images/americoders-course.png"
                            alt={course.name}
                            width={'100%'}
                            className="p-1 squareFrame"
                />
              }
            </GridItem>
          </>)
          }
          <GridItem cs={12} sm={12} md={6}>
            {course.lessons && (<>
              <SingleCourseLessons
                lessons={course.lessons}
                setPreview={setPreview}
                showModal={showModal}
                setShowModal={setShowModal}
              />
              <PreviewModal
                showModal={showModal}
                setShowModal={setShowModal}
                preview={preview}
              />
            </>)
            }
          </GridItem>
        </GridContainer>
      </div>
    </div>
    <Footer/>
  </>)
}

export async function getServerSideProps ({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`)
  return {
    props: {
      course: data,
    },
  }
}

export default SingleCourse