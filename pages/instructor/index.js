import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../../context'
import Link from 'next/link'
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
import { Check, Clear, School } from '@material-ui/icons'
import Footer from '../../components/Footer/Footer'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/profilePage'
import { Tooltip } from '@material-ui/core'
import CardBody from '../../components/Card/CardBody'
import Badge from '../../components/Badge/Badge'
import { currencyFormatter } from '../../utils/helpers'
import Button from '../../components/CustomButtons/Button'
import Card from '../../components/Card/Card'

const useStyles = makeStyles(styles)

const InstructorIndex = (props) => {
  // state
  const [courses, setCourses] = useState([]) // initialize courses state with empty array
  const [anchorEl, setAnchorEl] = useState(null)

  // user state
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

  const successStyle = {
    marginTop: '-15px',
    fontSize: '1.175rem',
    color: 'blue',
  }

  const cancelStyle = {
    marginTop: '-15px',
    fontSize: '1.175rem',
    color: 'red',
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
                              courses.map(course => (
                                <GridItem
                                  xs={12} sm={12} md={6}
                                  key={course._id}
                                >
                                  <Card>
                                    <img
                                      style={{
                                        height: '18rem',
                                        width: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                      }}
                                      className={classes.imgCardTop}
                                      src={course.image
                                        ? course.image.Location
                                        : '/images/americoders-course.png'}
                                      alt="Card-img-cap"
                                    />
                                    <CardBody>
                                      {/* course name */}
                                      <h4
                                        className={classes.cardTitle}>{course.name}</h4>

                                      {/*<p>by {course.instructor.name}</p>*/}
                                      {/* categories */}
                                      <Badge color="success">
                                        {course.category}
                                      </Badge>

                                      {/* course price */}
                                      <h4
                                        className={classes.description}>{course.paid
                                        ? currencyFormatter({
                                          amount: course.price,
                                          currency: 'usd',
                                        })
                                        : 'Free'}</h4>

                                      <h6 className={classes.description}>
                                        <p>{
                                          // show number of lessons in course
                                          course.lessons.length} Lessons</p>
                                        {
                                          // show requirements message
                                          course.lessons.length < 5 ? (
                                              <p style={myStyle}
                                                 className="text-warning">5
                                                                          lessons
                                                                          are
                                                                          required
                                                                          to
                                                                          publish
                                                                          a
                                                                          course.</p>
                                            ) :
                                            // show success message
                                            course.published ? (
                                                <p style={myStyle}
                                                   className="text-success">Your
                                                                            course
                                                                            is
                                                                            live
                                                                            in
                                                                            the
                                                                            marketplace.</p>
                                              ) :
                                              // show 'ready to publish' message
                                              (
                                                <p style={myStyle}
                                                   className="text-success">Your
                                                                            course
                                                                            is
                                                                            ready
                                                                            to
                                                                            be
                                                                            published.</p>
                                              )}
                                      </h6>

                                      {course.published ? (
                                        <Tooltip
                                          title="Published"
                                          style={successStyle}>
                                          <Check/>
                                        </Tooltip>
                                      ) : (
                                        <Tooltip
                                          title="Unpublished"
                                          style={cancelStyle}>
                                          <Clear/>
                                        </Tooltip>
                                      )}

                                      {/* action button */}
                                      <Link
                                        href={`/instructor/course/view/${course.slug}`}
                                      >
                                        <a>
                                          <Button
                                            fullWidth
                                            color="primary"
                                            size="lg"
                                          >Details</Button>
                                        </a>
                                      </Link>
                                    </CardBody>
                                  </Card>
                                </GridItem>))}
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