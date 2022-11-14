import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment/moment'
import Link from 'next/link'
import React from 'react'
import styles from '../../styles/jss/americoders/pages/coursePage'
import { currencyFormatter } from '../../utils/helpers'
import Badge from '../Badge/Badge'
import Card from '../Card/Card'
import CardBody from '../Card/CardBody'
import Button from '../CustomButtons/Button'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'

const useStyles = makeStyles(styles)

export default function CoursesGrid (props) {
  const classes = useStyles()

  let imgUrl = '{course.image && course.image.Location}'

  return (<>
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
          <GridItem xs={10} sm={11} md={12}>
            {/* title */}

            {props.courses.length < 1 ?
              <h2 className={classes.sectionTitle}>
                Nothing scheduled</h2>
              :
              <h2 className={classes.sectionTitle}>
                Active Listings: {props.courses.length}
              </h2>
            }
          </GridItem>

          {/* loop through the published courses */}
          {props.courses.map(course => (
              <GridItem xs={10} sm={11} md={4} key={course._id}>
                <p style={{ color: 'black' }}>
                  {/*{JSON.stringify(course, null, 2)}*/}
                </p>
                <Card>
                  <img
                    style={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      margin: '0 auto',
                      borderRadius: '.5rem',
                      boxShadow: '0 0 10px 0 rgba(0, 0, 0, .6)',
                    }}
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
                    <h4 className={classes.description}>{course.paid
                      ? currencyFormatter({
                        amount: course.price,
                        currency: 'usd',
                      })
                      : 'Free'}</h4>

                    <h6 className={classes.description}>{course.event &&
                      moment(course.event[0].startDate).calendar()}
                      <br/>
                      {course.event[0].location}</h6>
                    {/* action button */}
                    <Link
                      href={`/course/${course.slug}`}
                    >
                      <a>
                        <Button
                          fullWidth
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
    </div>
  </>)
}