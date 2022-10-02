import React from 'react'
import styles
  from '../../styles/jss/americoders/pages/landingPageSections/productStyle.js'
import { makeStyles } from '@material-ui/core/styles'
import Image from 'next/image'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'

const useStyles = makeStyles(styles)

export default function CoursesFeaturedSectionCenter ({
  title,
  description,
  imageUrl,
  imageAlt,
}) {
  const classes = useStyles()

  return (<>
    <div className={classes.section}>
      <GridContainer
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <GridContainer direction="row"
                       justifyContent="center"
                       alignItems="center"
                       spacing={2}>
          <GridItem xs={12} sm={12} md={11}>
            <div className={classes.imageBox}>
              <Image
                src={imageUrl}
                width={800}
                height={800}
                alt={imageAlt}
                className={classes.image}
              />
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={11}>
            <h5 className={classes.description}>
              {description}
            </h5>
          </GridItem>
        </GridContainer>
      </GridContainer>
    </div>
  </>)
}