import React from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'

// core components
import { infoColor, title } from '../../styles/jss/americoders.js'
import Image from 'next/image'
import Logo from '../../public/images/logo/americoders-logo_white.svg'

const useStyles = makeStyles({
  progress: {
    color: infoColor,
    width: '6rem !important',
    height: '6rem !important',
  },
  wrapperDiv: {
    margin: '100px auto',
    padding: '0px',
    maxWidth: '360px',
    textAlign: 'center',
    position: 'relative',
    zIndex: '9999',
    top: '0',
  },
  iconWrapper: {
    display: 'block',
  },
  title: {
    ...title,
    color: '#FFFFFF',
  },
})

export default function PageChange(props) {
  const classes = useStyles()
  return (
    <div>
      <div className={classes.wrapperDiv}>
        <Image
          src={Logo}
          width={800}
          height={200}
          alt={'Logo for Americoders'}
          className={classes.bgAnimation}
        />
        <h4 className={classes.title}>
          Loading page contents for: {props.path}
        </h4>
      </div>
    </div>
  )
}
