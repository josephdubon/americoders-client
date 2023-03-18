import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import StudentRoute from '../../../components/routes/StudentRoute'
import { SyncOutlined } from '@ant-design/icons'
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
import { Menu } from '@material-ui/core'
import PlaygroundFrontEnd from '../../../components/editor/PlaygroundFrontEnd'
import ReactPlayer from 'react-player'
import ReactMarkdown from 'react-markdown'
import MenuItem from '@mui/material/MenuItem'
import EarSketch from '../../../components/editor/EarSketch'

const useStyles = makeStyles(styles)

const SingleCourse = (props, { courses }) => {
  // state
  const [clicked, setClicked] = useState(-1)
  const [loading, setLoading] = useState(false)
  const [course, setCourse] = useState({ lessons: [] }) // course.lesson
  const [completedLessons, setCompletedLessons] = useState([])
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
      lessonId: course.lessons[clicked]._id,
    })
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id])
    setUpdateState(!updateState)
  }

  const markIncomplete = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
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

  return (
    <>
      {/* page title meta */}
      <PageHead title={course.name} />

      {/* student route wrapper */}
      <StudentRoute className="container">
        {/* header and nav */}
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand={NavLogo}
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'dark',
          }}
          {...rest}
        />

        {/* loading area */}
        {loading && (
          <SyncOutlined
            spin
            className="d-flex justify-content-between display-1 p-5 center"
          />
        )}

        {/* parallax hero section */}
        <Parallax small filter image={course.image && course.image.Location}>
          <div className={classes.container}>
            <GridContainer
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <GridContainer
                direction="row"
                justifyContent="center"
                alignItems="center"
              >
                {/* title and intro */}
                <GridItem xs={10} sm={10} md={8}>
                  {/* will take you to course home view*/}
                  <h1
                    onClick={() => setClicked(-1)}
                    className={classes.titleWhite}
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
                        className={classes.menu}
                      >
                        <h4 className={classes.menuTitle}>Lessons Menu</h4>
                        {/* lessons menu items loop */}
                        {course.lessons.map((lesson, index) => (
                          // close menu and open lesson on click
                          <GridContainer
                            justifyContent="center"
                            alignItems="center"
                          >
                            <GridContainer
                              justifyContent="center"
                              alignItems="center"
                            >
                              <MenuItem
                                onClick={() => {
                                  handleClose()
                                  setClicked(index)
                                }}
                                key={index}
                                classes={classes.menuItem}
                                style={{
                                  color: completedLessons.includes(lesson._id)
                                    ? 'green'
                                    : 'black',
                                  margin: '.775rem',
                                }}
                              >
                                {lesson.title.substring(0, 30)}
                              </MenuItem>
                            </GridContainer>
                          </GridContainer>
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
                    <GridItem
                      xs={10}
                      sm={10}
                      md={12}
                      className={classNames(
                        classes.lightSubtitle,
                        classes.gridItemContainer,
                      )}
                    >
                      {/* lesson title */}
                      <h2 className={classes.lightTitle}>
                        {course.lessons[clicked].title.substring(0, 30)}
                      </h2>
                      {/* mark as complete area */}
                      {completedLessons.includes(
                        course.lessons[clicked]._id,
                      ) ? (
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
                          onClick={markComplete}
                        >
                          Mark lesson as completed
                        </Button>
                      )}
                    </GridItem>
                  </GridContainer>
                </GridContainer>

                {/* lesson markdown md mdx content */}
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
                    <GridItem
                      xs={10}
                      sm={10}
                      md={12}
                      className={classNames(
                        classes.lightSubtitle,
                        classes.gridItemContainer,
                      )}
                    >
                      <ReactMarkdown
                        className={classes.markdown}
                        children={course.lessons[clicked].content}
                      />
                    </GridItem>
                  </GridContainer>
                </GridContainer>

                {/* lesson video content */}
                <GridContainer
                  justifyContent="center"
                  alignItems="center"
                  direction="column"
                >
                  <GridContainer
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                  >
                    <GridItem
                      xs={10}
                      sm={10}
                      md={12}
                      className={classNames(
                        classes.lightSubtitle,
                        classes.gridItemContainer,
                      )}
                    >
                      {course.lessons[clicked].video &&
                        course.lessons[clicked].video.Location && (
                          <>
                            <h2 className={classes.lightTitle}>Video</h2>
                            {/* video col */}
                            <ReactPlayer
                              url={course.lessons[clicked].video.Location}
                              light={course.image && course.image.Location}
                              controls
                              onEnded={markComplete} // update lesson completed status on video complete
                              className={classes.courseVideo}
                            />
                          </>
                        )}
                    </GridItem>
                  </GridContainer>
                </GridContainer>

                {/* lesson code editor content */}
                <GridContainer
                  justifyContent="center"
                  alignItems="stretch"
                  direction="column"
                >
                  <GridContainer
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                  >
                    {course.lessons[clicked].html && (
                      <>
                        <h2
                          className={classNames(
                            classes.gridItemContainer,
                            classes.lightTitle,
                          )}
                        >
                          Code Sandbox
                        </h2>
                        <PlaygroundFrontEnd
                          htmlValue={course.lessons[clicked].html}
                        />
                      </>
                    )}
                  </GridContainer>
                </GridContainer>

                {/* EarSketch editor content */}
                <GridContainer
                  justifyContent="center"
                  alignItems="stretch"
                  direction="column"
                >
                  <GridContainer
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                  >
                    {course.lessons[clicked].earsketch === true ? (
                      <>
                        <h2
                          className={classNames(
                            classes.gridItemContainer,
                            classes.lightTitle,
                          )}
                        >
                          EarSketch Studio
                        </h2>
                        <EarSketch />
                      </>
                    ) : (
                      ''
                    )}
                  </GridContainer>
                </GridContainer>

                {/* mark course complete button */}
                <GridContainer
                  justifyContent="center"
                  alignItems="stretch"
                  direction="column"
                >
                  <GridContainer
                    justifyContent="center"
                    alignItems="center"
                    direction="row"
                  >
                    {completedLessons.includes(course.lessons[clicked]._id) ? (
                      <>
                        <Button
                          size={'sm'}
                          color={'danger'}
                          style={{ margin: '1.175rem' }}
                          onClick={markIncomplete}
                        >
                          Mark lesson as incomplete
                        </Button>
                      </>
                    ) : (
                      <Button
                        size={'sm'}
                        color={'success'}
                        style={{ margin: '1.175rem' }}
                        onClick={markComplete}
                      >
                        Mark lesson as completed
                      </Button>
                    )}
                  </GridContainer>
                </GridContainer>
              </>
            ) : (
              <>
                {/* course intro section */}
                <GridContainer
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  <GridContainer
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    {/* title and intro */}
                    <GridItem
                      xs={10}
                      sm={10}
                      md={8}
                      className={classNames(
                        classes.lightSubtitle,
                        classes.gridItemContainer,
                      )}
                    >
                      <h5 className={classes.lightTitle}>
                        CLick the lessons menu to begin!
                      </h5>

                      {/* welcoming message to user */}
                      <h4 className={classes.lightSubtitle}>
                        Good luck on your journey!
                        <br />
                        If you need any help please raise your hand.
                      </h4>
                    </GridItem>
                  </GridContainer>
                </GridContainer>
              </>
            )}
            {/*end*/}
          </div>
        </div>
        <Footer />
      </StudentRoute>
    </>
  )
}

export default SingleCourse
