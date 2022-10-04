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
import Image from 'next/image'
import CoursesGrid from '../components/CoursesGrid/CoursesGrid'

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
          color="primary"
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
        brand={Logo}
        rightLinks={<HeaderLinks/>}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: 'dark',
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
                  We believe education should be an experience to foster
                  growth
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

          {/* intro section */}
          <FeatureSection id={'more-info'}/>

          {/* live courses and events section */}
          <CoursesGrid id="workshops" courses={props.courses}/>

          {/* join mailing list area */}
          <MailingListSection/>

          {/* course examples section */}
          <CoursesSection/>

          {/*  announcement section */}
          <FeaturedSectionRight title={'Fall Semester 2022'}
                                description={announcement()}
                                imageUrl={'/images/original/americoders-kids-laptop-fun.jpg'}
                                imgAlt={'americoders-robotics-project-student'}/>
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