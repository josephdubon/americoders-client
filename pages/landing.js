import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons
// core components
import Header from '../components/Header/Header.js'
import GridContainer from '../components/Grid/GridContainer.js'
import GridItem from '../components/Grid/GridItem.js'
import Button from '../components/CustomButtons/Button.js'
import HeaderLinks from '../components/Header/HeaderLinks.js'
import Parallax from '../components/Parallax/Parallax.js'

import styles from '../styles/jss/americoders/pages/landingPage.js'

// Sections for this page
import FeatureSection
  from '../pages-sections/LandingPage-Sections/FeatureSection.js'
import CoursesSection
  from '../pages-sections/LandingPage-Sections/CoursesSection.js'
import MailingListSection
  from '../pages-sections/LandingPage-Sections/MailingListSection.js'
import { PageHead } from '../components/PageHead/PageHead'
import axios from 'axios'
import FeaturedSectionRight
  from '../components/FeaturedSectionRight/FeaturedSectionRight'
import Footer from '../components/Footer/Footer'

import Logo from '../public/images/logo/americoders-logo_white.svg'
import NavLogo from '../public/images/logo/americoders-logo-simple_white.svg'
import Image from 'next/image'
import CardHeader from '../components/Card/CardHeader.js'
import CardBody from '../components/Card/CardBody'
import CardFooter from '../components/Card/CardFooter'
import Card from '../components/Card/Card'
import MailingListForm from '../components/forms/MailingListForm'
import Link from 'next/link'
import { currencyFormatter } from '../utils/helpers'
import Badge from '../components/Badge/Badge.js'
import moment from 'moment'

const dashboardRoutes = []

const useStyles = makeStyles(styles)

export default function LandingPage (props) {
  const classes = useStyles()
  const { ...rest } = props

  function announcement () {
    return (<>
      <p className={classes.description}>
        <strong>PROGRAM STARTING SOON</strong>
        <br/>
        Join our community as we educate, evolve,
        and adapt to this new world.
        Learn to code, create, live, and prosper
        in this new digital era while
        keeping intact the ethics and traditions
        of our old-world.
      </p>
      <br/>
      <div style={{ textAlign: 'center' }}>
        <Button
          href={'register'}
          color="danger"
          size="lg"
        >
          <i className="fas fa-play"/>
          Register Now
        </Button>
      </div>
    </>)
  }

  return (
    <>
      {/* header section / nav */}
      <PageHead title={'Welcome! We are a tech learning platform.'}/>
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

      {/* hero section */}
      <Parallax filter responsive
                image="/images/original/reno_downtown.png">
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
              <GridItem xs={10} sm={10} md={8}>
                <Image
                  src={Logo}
                  width={800}
                  height={200}
                  className={classes.logo}
                  alt={'Logo for Americoders'}/>
                <h4 className={classes.subtitle}>
                  We're a community enrichment program founded in the heart of
                  the
                  Biggest Little City in the World, Reno, Nevada.
                  We believe education should be an experience to foster growth
                  &
                  advancements in STEM, Arts, & Mindfulness Development.
                </h4>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>

          {/* 3 row feature section */}
          <FeatureSection id={'more-info'}/>

          {/* 3 col course examples area */}
          <CoursesSection/>

          {/* join mailing list area */}
          <MailingListSection/>

          {/* live and upcoming workshops area*/}
          <div>
            <GridContainer
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <GridContainer direction="row"
                             justifyContent="center"
                             alignItems="center"
              >
                <GridItem cs={12} sm={12} md={12}>
                  {/* title */}
                  <h2 className={classes.sectionTitle}>
                    Live and Upcoming Workshops
                  </h2>
                </GridItem>

                {/* loop through the published courses */}
                {props.courses.map(course => (
                    <GridItem xs={12} md={6} lg={4} key={course._id}>
                      <p style={{ color: 'black' }}>
                        {/*{JSON.stringify(course, null, 2)}*/}
                      </p>
                      <Card>
                        <img
                          style={{ height: '18rem', width: '100%', objectFit: 'cover', display: 'block' }}
                          className={classes.imgCardTop}
                          src={course.image && course.image.Location}
                          alt="Card-img-cap"
                        />
                        <CardBody>
                          {/* course name */}
                          <h4 className={classes.cardTitle}>{course.name}</h4>

                          {/*<p>by {course.instructor.name}</p>*/}
                          {/* categories */}
                          <Badge color="success">
                            {course.category}
                          </Badge>

                          {/* course price */}
                          <h4 className={classes.description}>{course.paid ? currencyFormatter({
                            amount: course.price,
                            currency: 'usd',
                          }) : 'Free'}</h4>

                          <h6 className={classes.description}>{moment(course.event[0].startDate).calendar()}
                            <br/>
                            {course.event[0].location}</h6>
                          {/* action button */}
                          <Link
                            href={`/course/${course.slug}`}
                          >
                            <a>
                              <Button
                                color="primary"
                                size="lg"
                              >More Info</Button>
                            </a>
                          </Link>
                        </CardBody>
                      </Card>
                    </GridItem>
                  ),
                )}
              </GridContainer>
            </GridContainer>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
          </div>

          {/*  announcement section */}
          <FeaturedSectionRight title={'Fall Semester 2022'}
                                description={announcement()}
                                imageUrl={'/images/original/americoders-kids-laptop-fun.jpg'}
                                imgAlt={'americoders-robotics-project-student'}/>
          / >
        </div>
      </div>
      <Footer/>
    </>
  )
}

export async function getServerSideProps () {
  // collect courses data
  const { data } = await axios.get(`${process.env.API}/courses`) // full path of server here

  // console.log(data)
  return {
    props: {
      courses: data, // return data as props
    },
  }
}