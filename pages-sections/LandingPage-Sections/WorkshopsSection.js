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
  from '../../styles/jss/americoders/pages/landingPageSections/workStyle.js'
import { CardHeader } from '@mui/material'
import Button from '../../components/CustomButtons/Button'
import axios from 'axios'
import Link from 'next/link'

const useStyles = makeStyles(styles)

export default function WorkshopsSection (props) {
  const classes = useStyles()

  return (<>
    <p>PAGE NOT BUILT YET</p>
  </>)
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