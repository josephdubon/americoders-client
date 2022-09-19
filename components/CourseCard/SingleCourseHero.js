import Header from '../Header/Header'
import NavLogo from '../../public/images/logo/americoders-logo-simple_white.svg'
import HeaderLinks from '../Header/HeaderLinks'
import Parallax from '../Parallax/Parallax'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/landingPage'
import { Context } from '../../context'

const dashboardRoutes = []

const useStyles = makeStyles(styles)

const SingleCourseHero = (props) => {

  const {
    state: { user },
  } = useContext(Context)

  // destructure course items
  const {
    price,
    paid,
  } = props.course

  const classes = useStyles()

  const { ...rest } = props

  return (<>
    {/* header section / nav */}
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
    {props.course ?
      <Parallax filter responsive
                image={props.course.image && props.course.image ?
                  props.course.image.Location :
                  '/images/original/reno_downtown.png'}>
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
              <GridItem xs={10} sm={10} md={10}>
                <h1 className={classes.courseTitle}>{props.course.name}</h1>
                <h4 className={classes.intro}>
                  {props.course.intro}
                </h4>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </div>
      </Parallax>
      :
      (<>
          <p className="display-6 fw-bold lh-1 mb-3">Welcome back!!</p>
        </>
      )
    }
  </>)
}

export default SingleCourseHero