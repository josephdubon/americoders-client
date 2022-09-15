import { currencyFormatter } from '../../utils/helpers'
import { LoadingOutlined, SafetyOutlined } from '@ant-design/icons'
import Header from '../Header/Header'
import NavLogo from '../../public/images/logo/americoders-logo-simple_white.svg'
import HeaderLinks from '../Header/HeaderLinks'
import Parallax from '../Parallax/Parallax'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import React, { useContext, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/landingPage'
import { Context } from '../../context'
import { truncate } from 'lodash-es'
import Button from '../CustomButtons/Button'
import moment from 'moment'
import { Tooltip } from '@mui/material'
import parse from 'html-react-parser'

const dashboardRoutes = []

const useStyles = makeStyles(styles)

const SingleCourseHero = (props) => {
  // state
  const [loading, setLoading] = useState(false)

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
      <Parallax filter
                image="/images/original/reno_downtown.png"
      >

        <div className={classes.container}>
          <GridContainer
            direction="row"
            justifyContent="center"
            alignItems="center"
          >

            <GridItem xs={10} sm={10} md={6} style={{ textAlign: 'center' }}>
              {/* course name */}
              <p className={classes.courseTitle}>{props.course && props.course.name}</p>

              {/* course description */}
              <p className={classes.subtitle} style={{ textAlign: 'center' }}>
                {parse(props.course.description)}
              </p>
            </GridItem>
            {/* event date and price details */}
            <GridItem xs={10} sm={10} md={6} style={{ textAlign: 'left' }}>
              <h4 className={classes.eventDetailsTitle}>
                <strong>Address: </strong> {props.course.eventLocation}
                <br/>
                <br/>

                {/* start date */}
                {moment(props.course.eventStartDate).calendar()}
              </h4>

              {/* price */}
              <h4 className={classes.price}>
                {
                  paid ? currencyFormatter({
                    amount: price,
                    currency: 'usd',
                  }) : 'Free'
                }
              </h4>
            </GridItem>
            <GridItem>
            </GridItem>
          </GridContainer>
        </div>
      </GridContainer>
      :
      (<>
          <p className="display-6 fw-bold lh-1 mb-3">Welcome back!!</p>
        </>
      )
    }
  </>)
}

export default SingleCourseHero