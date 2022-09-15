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
import Badge from '../Badge/Badge.js'
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
      <GridContainer
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.overlay}
        style={{
          width: '100%',
          height: '100vh',
          background: `linear-gradient(90deg, rgba(2,0,36,.8) 0%, rgba(9,9,121,.8) 23%, rgba(162,6,33,.8) 53%, rgba(242,242,242,1) 100%), url(${props.course.image && props.course.image.Location})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}>
        <div className={classes.container}>
          <GridContainer
            direction="row"
            justifyContent="center"
            alignItems="center"
          >

            <GridItem xs={10} sm={10} md={6} style={{ textAlign: 'center' }}>
              {/* course name */}
              <h4 className={classes.title}>{props.course && props.course.name}</h4>
              <br/>
              {/* category */}
              <Badge color="success">
                {props.course.category}
              </Badge>

              {/* course description */}
              <h4 className={classes.subtitle} style={{ textAlign: 'center' }}>
                {parse(props.course.description)}
              </h4>
              {/* enroll button */}
              {loading ? <div className="d-flex justify-content-center">
                <LoadingOutlined className="h1 text-danger"/>
              </div> : (
                <div>
                  <Tooltip
                    id="tooltip-top"
                    title="Tooltip on top"
                    placement="top"
                    classes={{ tooltip: classes.tooltip }}
                  >
                    <Button
                      color="danger"
                      icon={<SafetyOutlined/>}
                      size="sm"
                      disabled={true} // disable button for now
                      onClick={paid ? props.handlePaidEnrollment : props.handleFreeEnrollment}
                    >
                      {user
                        ? props.enrolled.status
                          ? 'Go to course'
                          : 'Enroll'
                        : 'Login to enroll'}
                    </Button>
                  </Tooltip>
                </div>
              )}
            </GridItem>
            {/* event date and price details */}
            <GridItem xs={10} sm={10} md={6} style={{ textAlign: 'left' }}>
              <h4 className={classes.eventDetailsTitle}>
                Event Details
                <br/>
                <br/>
                <strong>Address: </strong> {props.course.eventLocation}
                <br/>
                <br/>

                {/* start date */}
                <strong>Start
                  Date: </strong> {moment(props.course.eventStartDate).calendar()}
                <br/>

                {/* start date */}
                <strong>End
                  Date: </strong> {moment(props.course.eventEndDate).calendar()}
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