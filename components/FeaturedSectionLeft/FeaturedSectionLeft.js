import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Image from 'next/image'
import React from 'react'
import styles
  from '../../styles/jss/nextjs-material-kit/pages/landingPageSections/productStyle.js'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(styles)

export default function FeaturedSectionLeft ({
  title,
  description,
  imageUrl,
  imageAlt,
}) {
  const classes = useStyles()

  return (<>
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>{title}</h2>
          <h5 className={classes.description}>
            {description}
          </h5>
        </GridItem>
        <GridItem xs={12} sm={12} md={4} class>
          <div className={classes.imageBox}>
            <Image
              src={imageUrl}
              layout={'fill'}
              objectFit={'cover'}
              alt={imageAlt}
              className={classes.image}
            />
          </div>
        </GridItem>
      </GridContainer>
    </div>
  </>)
}