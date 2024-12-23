import React, { useContext, useEffect, useState } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons
// core components
import Header from '../../components/Header/Header.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'
import HeaderLinks from '../../components/Header/HeaderLinks.js'
import Parallax from '../../components/Parallax/Parallax.js'

import { Context } from '../../context'

import styles from '../../styles/jss/americoders/pages/profilePage.js'
import axios from 'axios'
import UserRoute from '../../components/routes/UserRoute'
import { PageHead } from '../../components/PageHead/PageHead'
import Link from 'next/link'
import Moment from 'moment'
import Footer from '../../components/Footer/Footer'
import Button from '../../components/CustomButtons/Button'
import NavLogo from '../../public/images/logo/americoders-logo-simple_white.svg'
import Card from '../../components/Card/Card'
import CardFooter from '../../components/Card/CardFooter'
import CardBody from '../../components/Card/CardBody'

const useStyles = makeStyles(styles)

export default function ProfilePage(props) {
  // state
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)

  // get user
  const {
    state: { user },
  } = useContext(Context)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    // update state
    setLoading(true)

    // get data
    const { data } = await axios.get('/api/user-courses')

    // update state
    setCourses(data)
    setLoading(false)
  }

  const classes = useStyles()
  const { ...rest } = props
  const imageClasses = classNames(classes.imgRaised, classes.imgFluid)
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery)

  return (
    <UserRoute>
      <PageHead
        title={`Welcome back, ${user && user.firstName} ${
          user && user.lastName
        }!`}
      />
      <Header
        color="transparent"
        brand={NavLogo}
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: 'dark',
        }}
        {...rest}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      />
      <Parallax
        small
        filter
        image="/images/americoders-community-diversity.png"
      />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
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
                spacing={2}
              >
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
                        {`${user && user.firstName} ${user && user.lastName}`}
                      </h3>
                      <br />
                      {/* update user */}
                      <Link href={'/user/update-user'} disablePadding button>
                        <a>
                          <Button size="sm" color="warning">
                            Edit Profile
                          </Button>
                        </a>
                      </Link>
                      <br />
                      <h5>{user && user.email}</h5>

                      {/* user details */}
                      <h6>Role: {user && user.role.join(', ')}</h6>
                      <h6>
                        Enrolled: {courses && courses.length + ' '}
                        {user && user.courses.length !== 1
                          ? 'Courses'
                          : 'Course'}
                      </h6>
                      <h6>
                        Member Since:{' '}
                        {Moment(user && user.createdAt, 'YYYYMMDD').fromNow()}
                      </h6>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
            </GridContainer>

            <div className={classes.description}>
              <p>{user && user.bio}</p>
            </div>

            <GridContainer
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <GridContainer
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={2}
              >
                <GridItem
                  xs={12}
                  sm={12}
                  md={12}
                  className={classes.navWrapper}
                >
                  <h2 className={classes.title}>My Courses</h2>
                  <GridContainer
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <GridContainer
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      spacing={2}
                    >
                      {/* list all courses */}
                      {courses && courses.length > 0
                        ? courses.map((course) => (
                            <GridItem
                              xs={10}
                              sm={11}
                              md={4}
                              key={course._id}
                              className={classes.marginBottom}
                            >
                              <Card>
                                <Link href={`/user/course/${course.slug}`}>
                                  <a>
                                    <img
                                      alt="..."
                                      src={
                                        course.image
                                          ? course.image.Location
                                          : '/images/americoders-course.png'
                                      }
                                      className={navImageClasses}
                                    />
                                    <CardBody>
                                      <h3 className={classes.title}>
                                        {course.name}
                                      </h3>
                                      <h6 className={classes.title}>
                                        {course.intro}
                                      </h6>
                                    </CardBody>
                                    <Button size={'sm'} color={'primary'}>
                                      <h6
                                        className={classes.titleWhite}
                                        style={{ fontSize: '1rem' }}
                                      >
                                        Go to Course
                                      </h6>
                                    </Button>
                                  </a>
                                </Link>
                                <CardFooter>
                                  <p className={classes.description}>
                                    {/* show number of lessons in course */}
                                    {course.lessons.length} Lessons
                                  </p>
                                </CardFooter>
                              </Card>
                            </GridItem>
                          ))
                        : 'You are not enrolled in any courses ...yet!'}
                      <GridItem xs={12} sm={12}>
                        <Link href={'/workshops'}>
                          <a>
                            <Button size={'sm'} color={'success'}>
                              <h4
                                className={classes.titleWhite}
                                style={{ fontSize: '1rem' }}
                              >
                                View Available Courses
                              </h4>
                            </Button>
                          </a>
                        </Link>
                      </GridItem>
                    </GridContainer>
                  </GridContainer>
                </GridItem>
              </GridContainer>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </UserRoute>
  )
}
