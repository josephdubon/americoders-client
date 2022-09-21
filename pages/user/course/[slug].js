import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import StudentRoute from '../../../components/routes/StudentRoute'
import { CheckCircleFilled, MinusCircleFilled, SyncOutlined } from '@ant-design/icons'
import { PageHead } from '../../../components/head/PageHead'
import NavLogo from '../../../public/images/logo/americoders-logo-simple_white.svg'
import HeaderLinks from '../../../components/Header/HeaderLinks'
import Header from '../../../components/Header/Header'
import Parallax from '../../../components/Parallax/Parallax'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../styles/jss/americoders/pages/coursePage.js'
import GridContainer from '../../../components/Grid/GridContainer'
import GridItem from '../../../components/Grid/GridItem'
import classNames from 'classnames'
import Button from '../../../components/CustomButtons/Button'
import Footer from '../../../components/Footer/Footer'
import { Avatar, Menu } from '@material-ui/core'
import PlaygroundFrontEnd from '../../../components/editor/PlaygroundFrontEnd'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import MenuItem from '@mui/material/MenuItem'

const useStyles = makeStyles(styles)

const SingleCourse = (props, { courses }) => {
  // state
  const [clicked, setClicked] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState({ lessons: [] }) // course.lesson
  const [completedLessons, setCompletedLessons] = useState([])
  const [visible, setVisible] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  // handle menu click
  const menuToggle = (event) => {
    setAnchorEl(event.currentTarget)
  }

  // handle menu close
  const handleClose = () => {
    setAnchorEl(null)
  }

  // force stat update
  const [updateState, setUpdateState] = useState(false)

  // router
  const router = useRouter()
  const { slug } = router.query

  const currentYear = new Date().getFullYear()

  const classes = useStyles(styles)

  useEffect(() => {
    if (slug) loadCourse()
  }, [slug])

  useEffect(() => {
    if (course) loadCompletedLessons()
  }, [course])

  const loadCourse = async () => {
    // collect data
    const { data } = await axios.get(`/api/user/course/${slug}`)
    // update state
    setCourse(data)
  }

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-complete`, {
      courseId: course._id,
    })
    setCompletedLessons(data)
  }

  const markComplete = async () => {
    const { data } = await axios.post(`/api/mark-complete`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id
    })
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id])
    setUpdateState(!updateState)
  }

  const markIncomplete = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id
      })

      console.log(data)

      // get completed lessons
      const all = completedLessons

      // find index of lesson
      const index = all.indexOf(course.lessons[clicked]._id)

      // remove lesson from completed array
      if (index > -1) {
        all.splice(index, 1)
      }

      // update state
      setCompletedLessons(all)
      setUpdateState(!updateState)
    } catch (err) {
      console.log(err)
    }

  }
  const dashboardRoutes = []
  const { ...rest } = props

  return (<>
      {/* page title meta */}
      <PageHead title={course.name}/>

      {/* student route wrapper */}
      <StudentRoute className="container">

        {/* header and nav */}
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand={NavLogo}
          rightLinks={<HeaderLinks/>}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white',
          }}
          {...rest}
        />

        {/* loading area */}
        {loading && (<SyncOutlined
          spin
          className="d-flex justify-content-between display-1 p-5 center"
        />)}

        {/* parallax hero section */}
        <Parallax small filter image={course.image && course.image.Location}>
          <div className={classes.container}>
            <GridContainer
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <GridContainer direction="row"
                             justifyContent="center"
                             alignItems="center"
              >
                {/* title and intro */}
                <GridItem xs={10} sm={10} md={8}>
                  {/* will take you to course home view*/}
                  <h1
                    onClick={() => setClicked(-1)}
                    className={classes.title}
                    style={{ cursor: 'pointer' }}
                  >
                    {course.name}
                  </h1>

                  {/* lessons drawer menu button */}
                  <GridItem>
                    {/* toggle lessons menu button */}
                    <Button
                      fullWidth
                      color={'primary'}
                      aria-controls={open ? 'lessonsMenu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={menuToggle}
                    >
                      Lessons Menu
                    </Button>

                    {/* lessons menu */}
                    <GridContainer
                      justifyContent="space-between"
                      alignItems="space-between"
                    >
                      <Menu
                        id="lessonsMenu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <h4 className={classes.lightSubtitle}>
                          Lessons Menu
                        </h4>
                        {/* lessons menu items loop */}
                        {course.lessons.map((lesson, index) => (
                          // close menu and open lesson on click
                          <MenuItem
                            onClick={() => {
                              handleClose()
                              setClicked(index)
                            }}
                            key={index}
                            style={{
                              color: completedLessons.includes(lesson._id) ? 'green' : 'black',
                              margin: '.775rem'
                            }}
                          >
                            {lesson.title.substring(0, 30)}
                            {/* mark items complete/not complete */}
                            {completedLessons.includes(lesson._id) ? (
                              <CheckCircleFilled style={{ color: 'green' }}/>
                            ) : (<MinusCircleFilled style={{ color: 'lightgrey' }}/>)}
                          </MenuItem>
                        ))}
                      </Menu>
                    </GridContainer>
                  </GridItem>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </div>
        </Parallax>

        {/* start container */}
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            {/*start*/}
            {clicked !== -1 ? (
              <>
                {/* lesson title area */}
                <GridContainer
                  justifyContent="center"
                  alignItems="center"
                  direction="row"
                >
                  <GridContainer
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                  >
                    <GridItem xs={10} sm={10} md={12}
                              className={classNames(classes.lightSubtitle, classes.gridItemContainer)}>
                      {/* lesson title */}
                      <h2 className={classes.lightTitle}>
                        {course.lessons[clicked].title.substring(0, 30)}
                      </h2>
                      {/* mark as complete area */}
                      {completedLessons.includes(course.lessons[clicked]._id) ? (
                        <Button
                          fullWidth
                          size={'sm'}
                          color={'danger'}
                          className="float-end"
                          onClick={markIncomplete}
                        >
                          Mark lesson as incomplete
                        </Button>
                      ) : (
                        <Button
                          fullWidth
                          size={'sm'}
                          color={'success'}
                          onClick={markComplete}>
                          Mark lesson as completed
                        </Button>
                      )}
                    </GridItem>
                  </GridContainer>
                </GridContainer>

              {/* lesson markdown md mdx content */}
              <Content>
                <div className="container col-xxl-12 px-4 py-5">
                  <div
                    className="row align-items-center justify-content-center g-5 row-cols-sm-1">
                    <div className="text-white">
                      <ReactMarkdown
                        children={course.lessons[clicked].content}
                        className="single-post single-post-content"
                      />
                    </div>
                  </div>
                </div>
              </Content>

              {/* lesson video content */}
              <Content className="bg-light">
                <div
                  className="container px-4 py-5 ">
                  {course.lessons[clicked].video &&
                    course.lessons[clicked].video.Location && (
                      <>
                        <div className="row">
                          {/* video col */}
                          <div className="feature col-lg-12">
                            <h2>Video</h2>
                            <Divider/>
                            <div className="d-flex w-100">
                              <ReactPlayer
                                url={course.lessons[clicked].video.Location}
                                controls
                                onEnded={markComplete} // update lesson completed status on video complete
                                className="p-1 squareFrame"
                              />
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                </div>
              </Content>

              {/* lesson code editor content */}
              <Content>
                <div
                  className="container px-0 py-5">
                  {/* code editors */}
                  {course.lessons[clicked].html &&
                    course.lessons[clicked].css && course.lessons[clicked].css && (
                      <>
                        <PlaygroundFrontEnd
                          htmlValue={course.lessons[clicked].html}
                          cssValue={course.lessons[clicked].css}
                          jsValue={course.lessons[clicked].javascript}
                        />
                      < />
                    )}
                </div>
              </Content>
              <AskForHelp/>
            </>
          ) : (
            <>
              {/* hero section */}
              <Content className="bg-light">
                <div className="container col-xxl-12 px-4 py-5">
                  <div
                    className="row align-items-center justify-content-center g-5 row-cols-sm-1 row-cols-md-2">
                    <div>
                      {course ?
                        (<>
                          <h1 className="display-6 fw-bold lh-1 mb-3 ">{course.name}</h1>
                          <Divider/>

                          {/* category */}
                          <Badge
                            count={course.category}
                            className="mb-3"
                            style={{
                              backgroundColor: '#03a9f4',
                            }}
                          />

                          {/* title */}
                          <p className="text-muted"><strong>Course
                            Name: </strong>{course.name && course.name}</p>

                          {/* lessons count */}
                          <p className="text-muted">
                            <strong>Lessons: </strong>{course.lessons && course.lessons.length}
                          </p>

                          {/* description */}
                          <p className="text-muted">
                            <strong>Description: </strong>{course && course.description}
                          </p>

                          {/* last update */}
                          <p className="text-muted"><strong>Last
                            Update: </strong>{Moment(course && course.updatedAt).format('LL')}
                          </p>
                        </>)
                        :
                        (<>
                          <p className="display-6 fw-bold lh-1 mb-3">Welcome back!!</p>
                        </>)}
                    </div>

                    {/* course image */}
                    <div>
                      <div className="image-course">
                        {course && course.image ?
                          (<>
                            <Image
                              src={course.image && course.image.Location}
                              alt="Americoders"
                              loading="lazy"
                              preview={false}
                              className="p-1 squareFrame"
                            />
                          </>) : <Image
                            src="/images/americoders-course.png"
                            alt="Americoders"
                            loading="lazy"
                            preview={false}
                            className="p-1 squareFrame"
                          />
                        }
                      </div>
                      <p className="text-muted text-center">Please click on the <strong
                        className="text-primary">Lessons
                        Menu</strong> above to start learning!</p>
                    </div>
                  </div>
                </div>
              </Content>

              {/* cta banner */}
              <div>
                <AskForHelp className={'p-0 m-0'}/>
              </div>
            </>)}
        </Content>
      </StudentRoute>
    </>
  )
}

export default SingleCourse