import { makeStyles } from '@material-ui/core/styles'
import { Check, HourglassFull } from '@material-ui/icons'
import { Tooltip } from '@mui/material'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { toast } from 'react-toastify'
import SingleCourseHero from '../../components/CourseCard/SingleCourseHero'
import SingleCourseLessons from '../../components/CourseCard/SingleCourseLessons'
import Button from '../../components/CustomButtons/Button'
import Footer from '../../components/Footer/Footer'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import { PageHead } from '../../components/head/PageHead'
import PreviewModal from '../../components/modal/PreviewModal'
import { Context } from '../../context'
import CoursesFeatureSection from '../../pages-sections/CoursesPage-Sections/CoursesFeatureSection'
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

  // destructure course items
  const { price, paid } = course

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
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`)

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
      if (enrolled.status)
        return router.push(`/user/course/${enrolled.course.slug}`)

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

  return (
    <>
      {/* page title area */}
      <PageHead title={course && course.name} />

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
          {/* image and description section */}
          <CoursesFeatureSection course={course} />

          {/* enroll section */}
          <GridContainer
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ marginTop: '4rem', marginBottom: '8rem' }}
          >
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.title} style={{ color: '#3C4858' }}>
                Are You Ready To Enroll?
              </h1>
              <h4
                className={classes.subtitle}
                style={{ color: '#3C4858', fontSize: '1.175rem' }}
              >
                Because we are ready for you to come learn with us!
                <br />
                If you have any questions, please contact us at{' '}
                <a href="mailto:events@americoders.org">
                  events@americoders.org
                </a>
              </h4>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <h4
                className={classes.subtitle}
                style={{ color: '#3C4858', fontSize: '1.175rem' }}
              >
                SMASH the enroll button below to get to our enrollment page.
              </h4>
              {loading ? (
                <div className="d-flex justify-content-center">
                  <HourglassFull className="h1 text-danger" />
                </div>
              ) : (
                <div>
                  <Tooltip
                    id="tooltip-top"
                    title="Let's do this!"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      color="primary"
                      icon={<Check />}
                      size="lg"
                      fullWidth
                      onClick={
                        paid ? handlePaidEnrollment : handleFreeEnrollment
                      }
                    >
                      {user
                        ? enrolled.status
                          ? 'Go to course'
                          : 'Enroll'
                        : 'Login to enroll'}
                    </Button>
                  </Tooltip>
                </div>
              )}
            </GridItem>
          </GridContainer>
        </div>

        {/* video and lessons preview section */}
        <div className={classes.container}>
          <GridContainer
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {course &&
            course.lessons[0].video &&
            course.lessons[0].video.Location ? (
              <GridItem
                xs={12}
                sm={12}
                md={12}
                onClick={() => {
                  setPreview(course.lessons[0].video.Location)
                  setShowModal(!showModal) // toggle modal
                }}
              >
                <ReactPlayer
                  url={course.lessons[0].video.Location}
                  // light={course.image.Location} TODO: add thumbnail for video preview
                  width="100%"
                  height="360px"
                />
              </GridItem>
            ) : (
              <></>
            )}
            <GridItem xs={12} sm={12} md={12}>
              {course && course.lessons && (
                <>
                  <SingleCourseLessons
                    lessons={course.lessons}
                    setPreview={setPreview}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    course={course}
                  />
                  <PreviewModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    preview={preview}
                  />
                </>
              )}
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps({ query }) {
  const { data } = await axios.get(`${process.env.API}/course/${query.slug}`)
  return {
    props: {
      course: data,
    },
  }
}

export default SingleCourse
