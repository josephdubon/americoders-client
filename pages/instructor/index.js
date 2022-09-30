import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../../context'
import Link from 'next/link'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { PageHead } from '../../components/head/PageHead'
import Header from '../../components/Header/Header'
import NavLogo from '../../public/images/logo/americoders-logo-simple_white.svg'
import HeaderLinks from '../../components/Header/HeaderLinks'
import Parallax from '../../components/Parallax/Parallax'
import classNames from 'classnames'
import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import Moment from 'moment/moment'
import NavPills from '../../components/NavPills/NavPills'
import { School } from '@material-ui/icons'
import Footer from '../../components/Footer/Footer'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/profilePage'
import { Avatar, Tooltip } from '@material-ui/core'

const useStyles = makeStyles(styles)

const InstructorIndex = (props) => {
  // state
  const [courses, setCourses] = useState([]) // initialize courses state with empty array
  const [anchorEl, setAnchorEl] = useState(null)
  const {
    state: { user },
  } = useContext(Context)

  // get current courses
  const loadCourses = async () => {
    const { data } = await axios.get('/api/instructor-courses')
    setCourses(data)
  }

  // update courses
  useEffect(() => {
    loadCourses()
  }, [])

  // style
  const myStyle = {
    marginTop: '-15px',
    fontSize: '10px',
  }

  const classes = useStyles()
  const { ...rest } = props
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid,
  )

  return (<>
    {/* meta data */}
    <PageHead title={`Welcome back, ${user && user.firstName} ${user &&
    user.lastName}!`}/>

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
      <div>
        <div className={classes.container}>
          {/* flex container */}
          <GridContainer
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            {/* flex container - sub */}
            <GridContainer direction="row"
                           justifyContent="center"
                           alignItems="center"
                           spacing={2}>
              {/* intro */}
              <GridItem xs={12} sm={12} md={12}>
                <div className={classes.profile}>
                  <div>
                    <img
                      src={user && user.picture}
                      alt="..."
                      className={imageClasses}
                      style={{ marginBottom: '25px' }}
                    />
                  </div>
                  <div className={classes.name}>
                    {/* name */}
                    <h3 className={classes.title}>
                      Instructor Dashboard
                    </h3>
                    <br/>
                    <h5> Welcome back, Instructor {user && user.lastName}!</h5>
                    {/* user details */}
                    <h6>Courses Listed: {courses && courses.length + ' '}</h6>
                    <h6>Member Since: {Moment(user && user.createdAt,
                      'YYYYMMDD').fromNow()}</h6>
                  </div>
                </div>
              </GridItem>
              <GridItem>
                <div className={classes.description}>
                  <p>
                    {user && user.bio}
                  </p>
                </div>
              </GridItem>
            </GridContainer>

            {/* courses container */}
            <GridContainer direction="row"
                           justifyContent="center"
                           alignItems="center"
                           spacing={2}>
              <GridItem xs={12} sm={12} md={12}
                        className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: 'My Courses',
                      tabIcon: School,
                      tabContent: (
                        <GridContainer
                          direction="row"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <GridContainer direction="row"
                                         justifyContent="center"
                                         alignItems="center"
                          >

                            {/* list all courses */}
                            {courses &&
                              courses.map(course => (<div key={course._id}>
                                {/* parent media div */}
                                <GridContainer
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  {/* image media div */}
                                  <GridItem xs={11} sm={11} md={2}>
                                    {/* image source */}
                                    <Avatar
                                      size={80}
                                      src={course.image
                                        ? course.image.Location
                                        : '/images/americoders-course.png'}
                                    />
                                  </GridItem>

                                  {/* media text body */}
                                  <GridItem xs={11} sm={11} md={8}>
                                    {/* title / link to course*/}
                                    <Link
                                      href={`/instructor/course/view/${course.slug}`}
                                    >
                                      <a><h5>{course.name}</h5></a>
                                    </Link>
                                    <p>{
                                      // show number of lessons in course
                                      course.lessons.length} Lessons</p>
                                    {
                                      // show requirements message
                                      course.lessons.length < 5 ? (
                                          <p style={myStyle}
                                             className="text-warning">At least 5 lessons are required to publish a
                                                                      course.</p>
                                        ) :
                                        // show success message
                                        course.published ? (
                                            <p style={myStyle}
                                               className="text-success">Your course is live in the marketplace.</p>
                                          ) :
                                          // show 'ready to publish' message
                                          (
                                            <p style={myStyle}
                                               className="text-success">Your course is ready to be published.</p>
                                          )}
                                  </GridItem>

                                  <GridItem xs={11} sm={11} md={2}>
                                    {course.published ? (
                                      <Tooltip title="Published">
                                        <CheckCircleOutlined
                                          className="h5 text-success"/>
                                      </Tooltip>
                                    ) : (
                                      <Tooltip title="Unpublished">
                                        <CloseCircleOutlined
                                          className="h5 text-warning"/>
                                      </Tooltip>
                                    )}
                                  </GridItem>
                                </GridContainer>
                              </div>))}
                          </GridContainer>
                        </GridContainer>
                      ),
                    },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </GridContainer>
        </div>
      </div>
    </div>
    <Footer/>
  </>)
}

export default InstructorIndex