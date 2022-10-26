import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import {
  CheckOutlined,
  CloseOutlined,
  EditOutlined,
  QuestionOutlined,
  UploadOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons'
import { List } from 'antd'
import ReactMarkdown from 'react-markdown'
import AddLessonForm from '../../../../components/forms/AddLessonForm'
import AddEventForm from '../../../../components/forms/AddEventForm'
import { toast } from 'react-toastify'
import { PageHead } from '../../../../components/head/PageHead'
import Header from '../../../../components/Header/Header'
import NavLogo
  from '../../../../public/images/logo/americoders-logo-simple_white.svg'
import HeaderLinks from '../../../../components/Header/HeaderLinks'
import Parallax from '../../../../components/Parallax/Parallax'
import classNames from 'classnames'
import GridContainer from '../../../../components/Grid/GridContainer'
import GridItem from '../../../../components/Grid/GridItem'
import { Context } from '../../../../context'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../../styles/jss/americoders/pages/profilePage'
import Image from 'next/image'
import { Dialog, ListItem, ListItemText, Tooltip } from '@mui/material'
import Button from '../../../../components/CustomButtons/Button'

const useStyles = makeStyles(styles)

const CourseView = (props) => {
  // user state
  const {
    state: { user },
  } = useContext(Context)

  // style
  const myStyle = {
    marginTop: '-15px', fontSize: '10px',
  }

  // state
  const [course, setCourse] = useState({})
  const [visible, setVisible] = useState(false)
  const [visibleEvent, setVisibleEvent] = useState(false)
  const [values, setValues] = useState({
    title: '',
    content: '',
    html: '',
    css: '',
    javascript: '',
    earsketch: null,
    video: {},
  })
  const [eventVisible, setEventVisible] = useState(false)
  const [eventValues, setEventValues] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
  })
  const [uploading, setUploading] = useState(false)
  const [uploadButtonText, setUploadButtonText] = useState('Upload video')
  const [progress, setProgress] = useState(0)
  const [students, setStudents] = useState(0)

  // router config
  const router = useRouter()
  // get slug from router url
  const { slug } = router.query

  useEffect(() => {
    loadCourse()
  }, [slug]) // use slug as dependency to run loadCourse in useEffect

  useEffect(() => {
    course && studentCount()
  }, [course])

  const studentCount = async () => {
    const { data } = await axios.post(`/api/instructor/student-count`, {
      courseId: course._id,
    })
    // console.log('STUDENT COUNT => ', data)
    setStudents(data.length)
  }

  // load requested course by slug
  const loadCourse = async () => {
    // make get request
    const { data } = await axios.get(`/api/course/${slug}`)
    // update state with course
    setCourse(data)
  }

  //start
  // add-event functions
  const handleAddEvent = async e => {
    e.preventDefault()
    try {
      // get request for data
      const { data } = await axios.post(
        `/api/course/event/${slug}/${course.instructor._id}`,
        eventValues) // lesson content from values

      // update state
      setEventValues({
        ...eventValues,
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
      })
      setVisibleEvent(false)
      setCourse(data)

      // notification config
      toast.success('Event added!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    } catch (err) {
      console.log('HANDLE EVENT: ', err)

      // notification config
      toast.error('Event add failed!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }
  //end

  // add-lesson functions
  const handleAddLesson = async e => {
    e.preventDefault()
    try {
      // get request for data
      const { data } = await axios.post(
        `/api/course/lesson/${slug}/${course.instructor._id}`,
        values) // lesson content from values

      // update state
      setValues({
        ...values,
        title: '',
        content: '',
        html: '',
        css: '',
        javascript: '',
        earsketch: null,
        video: {}, // video is an object
      })
      setProgress(0)
      setUploadButtonText('Upload video')
      setVisible(false)
      setCourse(data)

      // notification config
      toast.success('Lesson added!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    } catch (err) {
      console.log('HANDLE LESSON: ', err)

      // notification config
      toast.error('Lesson add failed!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  // save video logic
  const handleVideo = async e => {
    e.preventDefault()
    try {
      // get file from form and update button text and loading state
      const file = e.target.files[0]
      setUploadButtonText(file.name)
      setUploading(true)

      // create variable to save from FormData
      const videoData = new FormData()
      videoData.append('video', file)

      // save progress bar and send video as form data to backend
      const { data } = await axios.post(
        `/api/course/upload-video/${course.instructor._id}`,
        videoData, {
          onUploadProgress: (e) => {
            setProgress(Math.round((100 * e.loaded) / e.total))
          },
        })

      // once response is received update state
      setValues({ ...values, video: data })
      setUploading(false)
    } catch (err) {
      toast.error(err.response.data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  // remove video logic
  const handleRemoveVideo = async e => {
    e.preventDefault()
    try {
      setUploading(true)

      const { data } = await axios.post(
        `/api/course/remove-video/${course.instructor._id}`,
        values.video,
      )
      setProgress(0)
      setValues({ ...values, video: {} })
      setUploading(false)
      setUploadButtonText('Upload another video')
    } catch (err) {
      setUploading(false)
      toast.error('Video remove failed'.response.data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handlePublish = async () => {
    try {
      // confirm publish
      let answer = window.confirm(
        'Once you publish the course will be live on the platform for the students to enroll.')

      if (!answer) return

      // make request to backend
      const { data } = await axios.put(`/api/course/publish/${course._id}`)

      // update state
      setCourse(data)

      // notification config
      toast.success('Your course is now live!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } catch (err) {
      toast.error('Course publish failed.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  const handleUnpublish = async () => {
    try {
      // confirm publish
      let answer = window.confirm(
        'Once you unpublish the course will be not be live on the platform for the students to enroll.')

      if (!answer) return

      // make request to backend
      const { data } = await axios.put(`/api/course/unpublish/${course._id}`)

      // update state
      setCourse(data)

      // notification config
      toast.success('Your course is unpublished.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    } catch (err) {
      toast.error('Course unpublish failed.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }

  }
  const classes = useStyles()
  const { ...rest } = props

  return (
    <>
      {/* meta data */}
      <PageHead title={course.name}/>

      {/* navigation */}
      <Header
        color="transparent"
        brand={NavLogo}
        rightLinks={<HeaderLinks/>}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: 'dark',
        }}
        {...rest}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      />

      {/* hero section */}
      <Parallax small filter
                image="/images/americoders-community-diversity.png"/>

      {/* main content */}
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          {/* flex container */}
          <GridContainer direction="row"
                         justifyContent="space-evenly"
                         alignItems="center"
                         spacing={2}>
            {/* intro */}
            <GridItem xs={11} sm={10} md={12}>
              <h2 className={classes.title}>{course && course.name}</h2>
            </GridItem>
            <GridContainer
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              {/* image col */}
              <GridItem xs={11} sm={11} md={6}>
                <Image
                  src={course.image && course.image.Location}
                  alt={course && course.name}
                  width={200}
                  height={200}
                  className={classes.image}
                  rounded
                />
              </GridItem>

              {/* details column */}
              <GridItem xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
                {/* course name and lesson count */}
                <h5 className="pt-2">{course.name}</h5>
                <p> {course.lessons && course.lessons.length} Lessons</p>
                <p style={myStyle}>{course.ages}</p>
                <p style={myStyle}>{course.category}</p>

                {/* action buttons */}
                <GridContainer
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                >
                  <Tooltip title={`${students} Currently Enrolled`}>
                    <UserSwitchOutlined
                      onClick={() =>
                        router.push(`/instructor/course/edit/${slug}`)
                      }
                      className="h5 text-success mr-4"
                    />
                  </Tooltip>

                  {/* edit */}
                  <Tooltip title="Edit">
                    <EditOutlined
                      onClick={() =>
                        router.push(`/instructor/course/edit/${slug}`)
                      }
                      className="h5 text-warning mr-4"
                    />
                  </Tooltip>

                  {/* render publish icon if min of 6 lessons is met */}
                  {course.lessons && course.lessons.length < 5 ?
                    <Tooltip
                      title="Minimum of 5 lessons required to publish">
                      <QuestionOutlined role="button"
                                        className="h5 text-danger"/>
                    </Tooltip> : course.published ? (

                      // unpublish
                      <Tooltip title="Unpublish">
                        <CloseOutlined
                          onClick={handleUnpublish}
                          className="text-danger"/>
                      </Tooltip>
                    ) : (

                      // publish
                      <Tooltip title="Publish">
                        <CheckOutlined
                          onClick={handlePublish}
                          className="text-success"/>
                      </Tooltip>
                    )
                  }
                </GridContainer>
              </GridItem>
            </GridContainer>
          </GridContainer>

          <GridContainer
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {/* course description */}
            <GridItem xs={11} sm={11} md={12} style={{ margin: '1.75rem' }}>
              <h4 style={{
                textAlign: 'center',
                fontWeight: '600',
                textTransform: 'uppercase',
              }}>Course Description</h4>
              <GridItem xs={12} sm={12} md={12} style={{ textAlign: 'center' }}>
                <ReactMarkdown className={classes.markdown}
                               children={course.description}/>
              </GridItem>
            </GridItem>
          </GridContainer>

          {/* lessons and events area */}
          <GridContainer
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={2}
            className={classes.listsContainer}
          >
            <GridItem xs={11} sm={11} md={4}>
              <Button
                onClick={() => setVisible(true)} // update state for modal
                type="primary"
                shape="round"
                color={'primary'}
                icon={<UploadOutlined/>}
                size="large"
              >
                Add lesson
              </Button>

              {/* lessons list */}
              <h6>{course && course.lessons &&
                course.lessons.length} Lessons</h6>
              <List
                itemLayout="horizontal"
                dataSource={course && course.lessons}
                renderItem={(item, index) => (
                  // list each item with index number next to title
                  <ListItem style={{ textAlign: 'left' }}>
                    <ListItemText primary={index + 1} secondary={item.title}/>
                  </ListItem>
                )}>
              </List>
            </GridItem>

            {/* events list */}
            <GridItem xs={11} sm={11} md={4}>
              <Button
                onClick={() => setVisibleEvent(true)} // update state for modal
                type="primary"
                shape="round"
                color={'success'}
                icon={<UploadOutlined/>}
                size="large"
              >
                Add Event
              </Button>

              {/* events list */}
              <h6>{course && course.event &&
                course.event.length} Events</h6>
              <List
                itemLayout="horizontal"
                dataSource={course && course.event}
                renderItem={(item, index) => (
                  // list each item with index number next to title
                  <ListItem style={{ textAlign: 'left' }}>
                    <ListItemText primary={index + 1} secondary={item.title}/>
                  </ListItem>
                )}>
              </List>
            </GridItem>
          </GridContainer>

          {course && (<>
            {/* modal for lesson */}
            <Dialog
              title="+ Add Lesson"
              centered
              width={'50vw'}
              open={visible}
              onClose={() => setVisible(false)}
              footer={null}
            >
              <h4 className={classes.title}>Add Lesson Form</h4>
              <GridItem xs={10} md={12}>
                {/* render form component */}
                <AddLessonForm
                  values={values}
                  setValues={setValues}
                  handleAddLesson={handleAddLesson}
                  handleVideo={handleVideo}
                  handleRemoveVideo={handleRemoveVideo}
                  uploading={uploading}
                  uploadButtonText={uploadButtonText}
                  progress={progress}
                />
              </GridItem>
            </Dialog>

            {/* modal for event */}
            <Dialog
              title="+ Add Event"
              centered
              width={'50vw'}
              open={visibleEvent}
              onClose={() => setVisibleEvent(false)}
              footer={null}
            >
              {/* render form component */}
              <h4 className={classes.title}>Event Form</h4>
              <GridItem xs={10} md={12}>
                {/* render form component */}
                <AddEventForm
                  eventValues={eventValues}
                  setEventValues={setEventValues}
                  handleAddEvent={handleAddEvent}
                />
              </GridItem>
            </Dialog>

            {/**/}
          </>)}

          {/*  events area */}
        </div>
      </div>
    </>)

}

export default CourseView
