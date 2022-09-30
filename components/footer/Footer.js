/*eslint-disable*/
import React from 'react'
// nodejs library to set properties for components
import PropTypes from 'prop-types'
// nodejs library that concatenates classes
import classNames from 'classnames'
// material-ui core components
import { List } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

// @material-ui/icons
import styles from '../../styles/jss/americoders/components/footerStyle.js'
import Link from 'next/link'
import { ListItem } from '@mui/material'

const useStyles = makeStyles(styles)

export default function Footer (props) {
  const classes = useStyles()
  const { whiteFont } = props
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  })
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  })
  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>

            {/* add left side links here */}
            <ListItem className={classes.inlineBlock}>
              <Link href={'/landing'} as={'/home'}>
                <a
                  className={classes.block}
                >
                  Home
                </a>
              </Link>
            </ListItem>
          </List>
        </div>

        {/* right side credit line */}
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()}
          {' '}
          {/* link back home */}
          <Link href={'/landing'}>
            <a className={aClasses}>
              AMERICODERS
            </a>
          </Link>

        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  whiteFont: PropTypes.bool,
}
