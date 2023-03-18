import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons
// core components
import GridContainer from '../../components/Grid/GridContainer.js'
import GridItem from '../../components/Grid/GridItem.js'

import styles from '../../styles/jss/americoders/pages/landingPageSections/workStyle.js'
import MailingListForm from '../../components/forms/MailingListForm'

const useStyles = makeStyles(styles)

export default function MailingListSection() {
  const classes = useStyles()
  return (
    <div>
      <GridContainer
        direction="row"
        justifyContent="center"
        alignItems="center"
        className={classes.section}
      >
        <GridContainer
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <GridItem xs={12} sm={12} md={12}>
            {/* title */}
            <h2 className={classes.title}>Join Our Mailing List</h2>

            {/* subtitle */}
            <h3 className={classes.subtitle}>
              Stay up to date with our latest news and events
              <br />
              Learn about new courses directly
            </h3>

            {/* description */}
            <h4 className={classes.description}>
              Stay up to date with the news and latest updates from Americoders.
            </h4>
            <MailingListForm />
          </GridItem>
        </GridContainer>
      </GridContainer>
    </div>
  )
}
