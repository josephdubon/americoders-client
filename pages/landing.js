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
import CoursesGrid from '../components/CoursesGrid/CoursesGrid'

const dashboardRoutes = []

const useStyles = makeStyles(styles)

export default function LandingPage (props) {
  const classes = useStyles()
  const { ...rest } = props

  function announcement () {
    return (
      <>
        <p className={classes.description}>
          <strong>Join us on our game dev adventures!</strong>
          <br/>
          Bringing the 80s back, one game at a time. Come join our workshops for old-school fun!
          <br/>
          <br/>
          Develop retro arcade
          style games in real life workshops. Get your 8-bit fix here!
        </p>
        <br/>
        <div style={ { textAlign: 'center' } }>
          <Button href={ 'register' } color="primary" size="lg">
            <i className="fas fa-play"/>
            Register Now
          </Button>
        </div>
      </>
    )
  }

  function introMessage () {
    return (
      <>
        We are an IRL EdTech Web3 startup. We offer non-age biased in-real-life
        software engineering workshops.
        <br/>
        <br/>
        Our goal is to make computer science more inviting and engaging. We want
        to diversify and expand the reach of technology education.
        <br/>
        <br/>
        Soon you will be able to register and login with your web3
        wallet/credentials!
        <br/>
        Earn POAP badges and NFTs for your participation.
      </>
    )
  }

  return (
    <>
      {/* header section / nav */ }
      <PageHead title={ 'Welcome to Americoders!' }/>
      <Header
        color="transparent"
        routes={ dashboardRoutes }
        brand={ Logo }
        rightLinks={ <HeaderLinks/> }
        fixed
        changeColorOnScroll={ {
          height: 400,
          color: 'dark',
        } }
        { ...rest }
      />

      {/* hero section */ }
      <Parallax filter responsive image="/images/original/reno_downtown.png">
        <div className={ classes.container }>
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
              <GridItem xs={ 10 } sm={ 10 } md={ 8 }>
                <h2 className={ classes.title }>AMERICODERS</h2>
                <h4 className={ classes.subtitle }>{ introMessage() }</h4>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </div>
      </Parallax>

      <div className={ classNames(classes.main, classes.mainRaised) }>
        <div className={ classes.container }>
          {/* intro section */ }
          <FeatureSection id={ 'more-info' }/>

          {/* live courses and events section */ }
          <CoursesGrid id="workshops" courses={ props.courses }/>

          {/* join mailing list area */ }
          <MailingListSection/>

          {/* course examples section */ }
          <CoursesSection/>

          {/*  announcement section */ }
          <FeaturedSectionRight
            title={'Winter Workshops 2023'}
            description={announcement()}
            imageUrl={'/images/arcade/retro-gaming-americoders-workshops.png'}
            imgAlt={'americoders-robotics-project-student'}
          />
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
