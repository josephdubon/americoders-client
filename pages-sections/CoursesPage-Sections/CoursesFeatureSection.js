import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons
// core components
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'
import InfoArea from '../../components/InfoArea/InfoArea.js'

import styles
  from '../../styles/jss/americoders/pages/landingPageSections/productStyle.js'
import FeaturedSectionLeft
  from '../../components/FeaturedSectionLeft/FeaturedSectionLeft'
import FeaturedSectionRight
  from '../../components/FeaturedSectionRight/FeaturedSectionRight'
import { Map, Phonelink, MonetizationOn, Today, Money } from '@material-ui/icons'
import parse from 'html-react-parser'
import moment from 'moment'
import { currencyFormatter } from '../../utils/helpers'
import CoursesFeaturedSectionLeft from '../../components/FeaturedSectionLeft/CoursesFeaturedSectionLeft'

const useStyles = makeStyles(styles)

export default function CoursesFeatureSection ({ course }) {
  const classes = useStyles()

  // destructure course items
  const {
    price,
    paid,
  } = course

  return (<>
    {/* product area 1 */}
    <CoursesFeaturedSectionLeft description={parse(course.description)}
                                imageUrl={course.image.Location}
                                imgAlt={'americoders-robotics-project-student'}
    />

    {/**/}
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <InfoArea
            title="Calendar"
            description={moment(course.eventStartDate).calendar()}
            icon={Today}
            iconColor="danger"
            vertical
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <InfoArea
            title="Location"
            description={course.eventLocation}
            icon={Map}
            iconColor="primary"
            vertical
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <InfoArea
            title="Price"
            description={
              paid ? currencyFormatter({
                amount: price,
                currency: 'usd',
              }) : 'Free'
            }
            icon={MonetizationOn}
            iconColor="success"
            vertical
          />
        </GridItem>
      </GridContainer>
    </div>
  </>)
}