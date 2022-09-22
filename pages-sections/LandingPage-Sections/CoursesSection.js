import React from 'react'
// nodejs library that concatenates classes
import classNames from 'classnames'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons
// core components
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'
import Card from '../../components/Card/Card.js'
import CardBody from '../../components/Card/CardBody.js'
import CardFooter from '../../components/Card/CardFooter.js'

import styles
  from '../../styles/jss/americoders/pages/landingPageSections/coursesStyle.js'

const useStyles = makeStyles(styles)

export default function CoursesSection () {
  const classes = useStyles()
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRounded,
    classes.imgFluid,
  )
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Course and Project Examples</h2>
      <div>
        <GridContainer>
          {/* card start */}
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src="/images/thumbnail/americoders-scratch-game.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Introduction to Coding
                <br/>
                <small className={classes.smallTitle}>Python, Javascript,
                  Scratch, EarSketch</small>
              </h4>
              <CardBody>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
              </CardFooter>
            </Card>
          </GridItem>

          {/* card start */}
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src="/images/thumbnail/americoders-kids-game-happy.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Internet Safety
                <br/>
                <small className={classes.smallTitle}>Are we dedicating enough
                  time to the safety and
                  protection of our children
                  while they are
                  online?</small>
              </h4>
              <CardBody>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
              </CardFooter>
            </Card>
          </GridItem>

          {/* card start */}
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src="/images/thumbnail/americoders-old-school-game.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Game Development
                <br/>
                <small className={classes.smallTitle}>Python, Javascript, and
                  Custom Game Engine</small>
              </h4>
              <CardBody>
                {' '}
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                {' '}
              </CardFooter>
            </Card>
          </GridItem>

          {/* card start */}
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src="/images/thumbnail/americoders-technology-unplugged.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Technology Unplugged
                <br/>
                <small className={classes.smallTitle}>Let's turn the screen off
                  and learn in the real
                  world for a
                  change.</small>
              </h4>
              <CardBody>
                {' '}
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                {' '}
              </CardFooter>
            </Card>
          </GridItem>

          {/* card start */}
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src="/images/thumbnail/americoders-teen-coding.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Create a Projects Portfolio
                <br/>
                <small className={classes.smallTitle}>Show off your code and
                  game/program
                  collection.</small>
              </h4>
              <CardBody>
                {' '}
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                {''}
              </CardFooter>
            </Card>
          </GridItem>

          {/* card start */}
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                <img
                  src="/images/thumbnail/americoders-teen-3d-printing.jpg"
                  alt="..."
                  className={imageClasses}
                />
              </GridItem>
              <h4 className={classes.cardTitle}>
                Hardware Hacking
                <br/>
                <small className={classes.smallTitle}>Let's Build And Break Some
                  Stuff! We can learn a
                  whole lot by taking apart
                  and putting things back
                  together.</small>
              </h4>
              <CardBody>
                {' '}
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                {' '}
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  )
}