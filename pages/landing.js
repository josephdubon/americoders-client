import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons
// core components
import Header from '../components/Header/Header.js'
import Footer from '../components/Footer/Footer.js'
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
        brand="AMERICODERS"
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
          <GridContainer justify={'center'}>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Welcome to
                <br/>Americoders</h1>
              <br/>
              <h1 className={classes.title}>
                ✩✩✩✩✩✩✩✩✩
              </h1>
              <h4 className={classes.subTitle}>
                We're a community enrichment program founded in the heart of the
                Biggest Little City in the World, Reno, Nevada.
                We believe education should be an experience to foster growth &
                advancements in STEM, Arts, & Mindfulness Development.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>

          {/* 3 row feature section */}
          <FeatureSection id={'more-info'}/>

          {/* 3 col course examples area */}
          <CoursesSection/>
          {/*<p>start</p>*/}
          {/*loop through the published courses*/}
          {/*{props.courses.map((course) => (*/}
          {/*    <Col key={course._id}>*/}
          {/*      <CourseCard course={course}/>*/}
          {/*    </Col>*/}
          {/*  ),*/}
          {/*)}*/}
          {/*end loop*/}
          {/*<p>end</p>*/}

          {/* join mailing list area */}
          <MailingListSection/>

          {/*  announcement section */}
          <FeaturedSectionRight title={'Fall Semester 2022'}
                                description={announcement()}
                                imageUrl={'/images/thumbnail/americoders-kids-laptop-fun.jpg'}
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