import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import CourseCreateForm from '../../../../components/forms/CourseCreateForm'
import UpdateLessonForm from '../../../../components/forms/UpdateLessonForm'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { List } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { PageHead } from '../../../../components/head/PageHead'
import UpdateEventForm from '../../../../components/forms/UpdateEventForm'
import Header from '../../../../components/Header/Header'
import NavLogo
  from '../../../../public/images/logo/americoders-logo-simple_white.svg'
import HeaderLinks from '../../../../components/Header/HeaderLinks'
import Parallax from '../../../../components/Parallax/Parallax'
import classNames from 'classnames'
import GridItem from '../../../../components/Grid/GridItem'
import styles from '../../../../styles/jss/americoders/pages/profilePage'

import { makeStyles } from '@material-ui/core/styles'
import GridContainer from '../../../../components/Grid/GridContainer'
import { Avatar, Dialog, ListItem, ListItemText } from '@mui/material'
import Footer from '../../../../components/Footer/Footer'

const useStyles = makeStyles(styles)

const EditCourse = (props, course) => {
  // state
  const [values, setValues] = useState({
    name: '',
    description: '',
    intro: '',
    ages: 'All Ages',
    price: '49.99',
    uploading: false,
    paid: true,
    category: '',
    loading: false,
    lessons: [],
    event: [],
  })

  // set image initial state to an empty object
  const [image, setImage] = useState({})
  const [preview, setPreview] = useState('')
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image')

  const [uploadVideoButtonText, setUploadVideoButtonText] = useState(
    'Upload Video')
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  // set state for lessons update
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState({})

  // set state for events update
  const [visibleEvent, setVisibleEvent] = useState(false)
  const [currentEvent, setCurrentEvent] = useState({})

  // router
  const router = useRouter()
  const { slug } = router.query

  // load course
  useEffect(() => {
    loadCourse()
  }, [slug])

  const loadCourse = async () => {
    // get course data
    const { data } = await axios.get(`/api/course/${slug}`)

    // update state
    if (data) {
      setValues(data)
    }
    if (data && data.image) {
      setImage(data.image)
    }
  }

  // form logic: values
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // form logic: images
  const handleImage = (e) => {
    let imagePreview = e.target.files[0]

    // set preview state
    setPreview(window.URL.createObjectURL(imagePreview))

    // set state for button text
    setUploadButtonText(imagePreview.name)

    // set values state
    setValues({ ...values, loading: true })

    // resize image
    Resizer.imageFileResizer(
      imagePreview,
      1920,
      1080,
      'PNG',
      100,
      0,
      async (uri) => {
        try {
          let { data } = await axios.post('/api/course/upload-image', {
            image: uri,
          })
          console.log('IMAGE UPLOADED ', data)

          // update image state
          setImage(data)
          setValues({ ...values, loading: false })
        } catch (err) {
          console.log('IMAGE RESIZE ERROR ', err)
          setValues(({ ...values, loading: false }))
          // notification config
          toast.error('Image upload failed. Try again later.', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      })
  }

  // drag logic
  const handleDrag = (e, index) => {
    // console.log('ON DRAG => ', index)

    // use dataTransfer for drag and index position
    e.dataTransfer.setData('itemIndex', index)
  }

  // drop logic
  const handleDrop = async (e, index) => {
    // console.log('ON DROP => ', index)

    // what index position is drag-item coming from
    const draggedItemIndex = e.dataTransfer.getData('itemIndex')

    // what index position is drag-item going to
    const targetItemIndex = index

    // collect lessons
    let allLessons = values.lessons

    // item reorder logic
    let draggedItem = allLessons[draggedItemIndex] // active clicked on/dragged item for reorder
    allLessons.splice(draggedItemIndex, 1) // remove 1 item from index
    allLessons.splice(targetItemIndex, 0, draggedItem) // push item after target-item index

    // update state
    setValues({ ...values, lessons: [...allLessons] })

    // save to database
    const { data } = await axios.put(`/api/course/${slug}`, {
      ...values, // unpack all the values from state
      image, // include image with post request
    })

    // notification config
    toast.success('Great job! Lesson rearranged', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  // form logic: image remove
  const handleImageRemove = async () => {
    // console.log('REMOVE IMAGE ')
    try {
      setValues(({ ...values, loading: true }))
      const res = await axios.post('/api/course/remove-image', { image })
      setImage({})
      setPreview('')
      setUploadButtonText('Upload Image')
      setValues(({ ...values, loading: false }))

    } catch (err) {
      console.log('IMAGE REMOVE ERROR ', err)
      setValues(({ ...values, loading: false }))
      // notification config
      toast.error('Image remove failed. Try again later.', {
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

  // form logic: submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    // submit request to backend
    try {
      const { data } = await axios.put(`/api/course/${slug}`, {
        ...values, // unpack all the values from state
        image, // include image with post request
      })

      // notification config
      toast.success('Awesome! Course is updated', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      // // redirect to instructor page
      // await router.push('/instructor')
    } catch (err) {
      // notification config
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

  // form logic: delete lesson
  const handleDelete = async (index) => {
    const answer = window.confirm('Are you sure you want to delete?')
    if (!answer) return // if user clicks cancel on confirmation prompt do nothing but close prompt

    // collect lessons
    let allLessons = values.lessons

    // delete item based in index and collect id
    const removedLesson = allLessons.splice(index, 1)

    // update state
    setValues({ ...values, lessons: allLessons })

    // // send request to server
    const { data } = await axios.put(
      `/api/course/${slug}/${removedLesson[0]._id}`)

    console.log('lesson deleted  => ', data)
  }

  // form logic: delete event
  const handleDeleteEvent = async (index) => {
    const answer = window.confirm('Are you sure you want to delete this event?')
    if (!answer) return // if user clicks cancel on confirmation prompt do nothing but close prompt

    // collect event
    let allEvents = values.event

    // // delete item based in index and collect id
    const removedEvent = allEvents.splice(index, 1)

    // // update state
    setValues({ ...values, event: allEvents })

    // // // send request to server
    const { data } = await axios.put(
      `/api/course/${slug}/${removedEvent[0]._id}`)

    console.log('event deleted  => ', data)
  }

  // lesson update logic
  const handleVideo = async (e) => {
    // remove previous video, if there is one
    if (current.video && current.video.Location) {
      const res = await axios.post(
        `/api/course/remove-video/${values.instructor._id}`,
        current.video,
      )
    }

    // upload replacement video
    const file = e.target.files[0]
    setUploadVideoButtonText(file.name)
    setUploading(true)

    // send video data as form_data
    const videoData = new FormData()
    videoData.append('video', file)
    videoData.append('courseId', values._id)

    // save progress bar and send video as form_data to backend
    const { data } = await axios.post(
      `/api/course/upload-video/${values.instructor._id}`, videoData, {
        onUploadProgress: (e) => setProgress(
          Math.round((100 * e.loaded) / e.total)),
      })

    // update state
    setCurrent({ ...current, video: data })
    setUploading(false)
  }

  const handleUpdateLesson = async (e) => {
    e.preventDefault()

    // collect data
    const { data } = await axios.put(
      `/api/course/lesson/${slug}/${current._id}`,
      current)
    setUploadVideoButtonText('Upload Video')
    setVisible(false)

    // update state and ui
    if (data.ok) {
      let arr = values.lessons
      const index = arr.findIndex((el) => el._id === current._id)
      arr[index] = current
      setValues({ ...values, lessons: arr })
    }

    // notification config
    toast.success('Cool! Lesson has been updated.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const handleUpdateEvent = async (e) => {
    e.preventDefault()

    // collect data
    const { data } = await axios.put(
      `/api/course/event/${slug}/${currentEvent._id}`,
      currentEvent)
    setVisibleEvent(false)

    // update state and ui
    if (data.ok) {
      let arr = values.event
      const index = arr.findIndex((el) => el._id === currentEvent._id)
      arr[index] = currentEvent
      setValues({ ...values, event: arr })
    }

    // notification config
    toast.success('Cool! Event has been updated.', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const classes = useStyles()
  const { ...rest } = props

  return (<>
    {/* meta data */}
    <PageHead title={`Edit ${values.name}`}/>

    {/* navigation */}
    <Header
      color="transparent"
      brand={NavLogo}
      rightLinks={<HeaderLinks/>}
      fixed
      changeColorOnScroll={{
        height: 200,
        color: 'white',
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
          <GridItem xs={11} sm={10} md={12}
                    style={{ margin: '2.275rem 0 2.275rem 0' }}>
            <h2 className={classes.title}>{`Edit ${values.name}`}</h2>
          </GridItem>

          {/* image col */}
          <GridItem xs={11} sm={11} md={12} className={classes.section}>
            <CourseCreateForm
              handleSubmit={handleSubmit}
              handleImage={handleImage}
              handleImageRemove={handleImageRemove}
              handleChange={handleChange}
              values={values}
              setValues={setValues}
              preview={preview}
              uploadButtonText={uploadButtonText}
              editPage={true}
            />
          </GridItem>
        </GridContainer>

        <GridContainer
          direction="row"
          justifyContent="center"
          alignItems="flex-start"
          spacing={2}
          className={classes.listsContainer}
        >
          <GridItem xs={11} sm={11} md={4}>
            <h3 className={classes.title}>
              {values && values.lessons &&
                values.lessons.length} Lessons
            </h3>

            {/* lessons list */}
            <h6 className={classes.subtitle}>Click on title to edit
                                             contents</h6>
            <List
              onDragOver={(e) => e.preventDefault()}
              itemLayout="horizontal"
              dataSource={values && values.lessons}
              renderItem={(item, index) => (

                // list each item with index number next to title
                <ListItem
                  draggable
                  onDragStart={(e) => handleDrag(e,
                    index)} // use index for position
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <ListItemText
                    role="button"
                    onClick={() => {
                      // update lesson modal
                      setVisible(true)
                      setCurrent(item)
                    }}
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                    primary={index + 1}
                    secondary={item.title}
                  />

                  {/* delete lesson icon */}
                  <DeleteOutlined
                    onClick={() => {
                      handleDelete(index)
                    }}
                    className="text-danger float-end"
                  />
                </ListItem>
              )}>
            </List>
          </GridItem>

          {/* events list */}
          <GridItem xs={11} sm={11} md={4}>
            <h3 className={classes.title}>
              {values && values.event &&
                values.event.length} Event
            </h3>

            {/* events list */}
            <h6 className={classes.subtitle}>Click on title to edit
                                             contents</h6>
            <List
              itemLayout="horizontal"
              dataSource={values && values.event}
              renderItem={(item, index) => (

                // list each item with index number next to title
                <ListItem
                >
                  <ListItemText
                    role="button"
                    onClick={() => {
                      // update lesson modal
                      setVisibleEvent(true)
                      setCurrentEvent(item)
                    }}
                    avatar={<Avatar>{index + 1}</Avatar>}
                    title={item.title}
                    primary={index + 1}
                    secondary={item.title}
                  />

                  {/* delete lesson icon */}
                  <DeleteOutlined
                    onClick={() => {
                      handleDeleteEvent(index).then(console.log(index))
                    }}
                  />
                </ListItem>
              )}>
            </List>
          </GridItem>
        </GridContainer>

        {course && (<>
          {/* modal for lesson */}
          <Dialog
            title="+ Edit Lesson"
            centered
            open={visible}
            onClose={() => setVisible(false)}
            footer={null}
          >
            <h4 className={classes.title}>Edit Lesson Form</h4>
            <GridItem xs={10} md={12}>
              {/* render form component */}
              <UpdateLessonForm
                current={current}
                setCurrent={setCurrent}
                handleVideo={handleVideo}
                handleUpdateLesson={handleUpdateLesson}
                uploadVideoButtonText={uploadVideoButtonText}
                progress={progress}
                uploading={uploading}
              />
            </GridItem>
          </Dialog>

          {/* modal for event */}
          <Dialog
            title="Update Event"
            centered
            open={visibleEvent}
            onClose={() => setVisibleEvent(false)}
            footer={null}
          >
            {/* render form component */}
            <h4 className={classes.title}>Edit Event Form</h4>
            <GridItem xs={10} md={12}>
              {/* render form component */}
              <UpdateEventForm
                current={currentEvent}
                setCurrent={setCurrentEvent}
                handleUpdateEvent={handleUpdateEvent}
              />
            </GridItem>
          </Dialog>
        </>)}
      </div>
    </div>
    <Footer/>
  </>)
}

export default EditCourse