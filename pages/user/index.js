import React, { useContext, useEffect, useState } from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons
// core components
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'
import HeaderLinks from '../../components/Header/HeaderLinks.js'
import NavPills from '../../components/NavPills/NavPills.js'
import Parallax from '../../components/Parallax/Parallax.js'

import { Context } from '../../context'

import styles from '../../styles/jss/americoders/pages/profilePage.js'
import axios from 'axios'
import { School } from '@material-ui/icons'
import UserRoute from '../../components/routes/UserRoute'
import { PageHead } from '../../components/PageHead/PageHead'
import Link from 'next/link'
import Moment from 'moment'

const useStyles = makeStyles(styles)

export default function ProfilePage (props) {
  // state
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(false)
  const [drawerStatus, setDrawerStatus] = useState(false)

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
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgFluid,
  )
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery)

  return (
    <UserRoute>
      <PageHead title={`Welcome back, ${user && user.firstName} ${user &&
      user.lastName}!`}/>
      <Header
        color="transparent"
        brand="AMERICODERS"
        rightLinks={<HeaderLinks/>}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: 'white',
        }}
        {...rest}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      />
      <Parallax small filter
                image="/images/americoders-community-diversity.png"/>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
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
                    <br/>
                    <Link href={'/update-user/'}>
                      <a style={{
                        fontSize: '12px',
                        textTransform: 'uppercase',
                      }}>Confirm or Update Details</a>
                    </Link>
                    <h5>{user && user.email}</h5>

                    {/* user details */}
                    <h6>Role: {user && user.role.join(', ')}</h6>
                    <h6>Enrolled: {courses && courses.length + ' '}
                      {user && user.courses.length !== 1
                        ? 'Courses'
                        : 'Course'}</h6>
                    <h6>Member Since: {Moment(user && user.createdAt,
                      'YYYYMMDD').
                      fromNow()}</h6>

                    {/* icons */}
                    {/*<Button justIcon link className={classes.margin5}>*/}
                    {/*  <i className={'fab fa-twitter'}/>*/}
                    {/*</Button>*/}
                    {/*<Button justIcon link className={classes.margin5}>*/}
                    {/*  <i className={'fab fa-instagram'}/>*/}
                    {/*</Button>*/}
                    {/*<Button justIcon link className={classes.margin5}>*/}
                    {/*  <i className={'fab fa-facebook'}/>*/}
                    {/*</Button>*/}
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <div className={classes.description}>
              <p>
                {user && user.bio}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: 'My Courses',
                      tabIcon: School,
                      tabContent: (
                        <GridContainer justify="center">

                          {/* list all courses */}
                          {courses && courses.length > 0
                            ? courses.map(
                              course => (
                                <GridItem xs={12} sm={12} md={4}
                                          key={course._id}
                                          className={classes.marginBottom}>
                                  <Link
                                    href={`/user/course/${course.slug}`}
                                  >
                                    <a>
                                      <img
                                        alt="..."
                                        src={course.image
                                          ? course.image.Location
                                          : '/images/americoders-course.png'}
                                        className={navImageClasses}
                                      />
                                      <h6 className={classes.marginBottom}>
                                        {course.name}
                                      </h6>
                                    </a>
                                  </Link>
                                  <p className={classes.description}>
                                    {/* show number of lessons in course */}
                                    {course.lessons.length} Lessons
                                  </p>
                                </GridItem>
                              ))
                            : ('You are not enrolled in any courses ...yet!')}
                        </GridContainer>
                      ),
                    },
                    // {
                    //   tabButton: 'Work',
                    //   tabIcon: Palette,
                    //   tabContent: (
                    //     <GridContainer justify="center">
                    //       <GridItem xs={12} sm={12} md={4}>
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/olu-eletu.jpg"
                    //           className={navImageClasses}
                    //         />
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/clem-onojeghuo.jpg"
                    //           className={navImageClasses}
                    //         />
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/cynthia-del-rio.jpg"
                    //           className={navImageClasses}
                    //         />
                    //       </GridItem>
                    //       <GridItem xs={12} sm={12} md={4}>
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/mariya-georgieva.jpg"
                    //           className={navImageClasses}
                    //         />
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/clem-onojegaw.jpg"
                    //           className={navImageClasses}
                    //         />
                    //       </GridItem>
                    //     </GridContainer>
                    //   ),
                    // },
                    // {
                    //   tabButton: 'Favorite',
                    //   tabIcon: Favorite,
                    //   tabContent: (
                    //     <GridContainer justify="center">
                    //       <GridItem xs={12} sm={12} md={4}>
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/mariya-georgieva.jpg"
                    //           className={navImageClasses}
                    //         />
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/studio-3.jpg"
                    //           className={navImageClasses}
                    //         />
                    //       </GridItem>
                    //       <GridItem xs={12} sm={12} md={4}>
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/clem-onojeghuo.jpg"
                    //           className={navImageClasses}
                    //         />
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/olu-eletu.jpg"
                    //           className={navImageClasses}
                    //         />
                    //         <img
                    //           alt="..."
                    //           src="/img/examples/studio-1.jpg"
                    //           className={navImageClasses}
                    //         />
                    //       </GridItem>
                    //     </GridContainer>
                    //   ),
                    // },
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer/>
    </UserRoute>
  )
}
