/*eslint-disable*/
import React, { useContext, useEffect, useState } from 'react'

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'
import Icon from '@material-ui/core/Icon'

// @material-ui/icons
import { Dashboard, HowToReg, PersonOutline } from '@material-ui/icons'

// core components
import Button from '../../components/CustomButtons/Button.js'

import styles from '../../styles/jss/americoders/components/headerLinksStyle.js'
import { Context } from '../../context'
import useRouter from 'next/router'
import axios from 'axios'
import Link from 'next/link'
import CustomDropdown from '../CustomDropdown/CustomDropdown'

const useStyles = makeStyles(styles)

export default function HeaderLinks (props) {
  const classes = useStyles()

  // set state for current page/link
  const [currentPage, setCurrentPage] = useState('')
  const isServer = () => typeof window !== 'undefined'
  const { state, dispatch } = useContext(Context)
  const { user } = state

  const router = useRouter

  // update state on page change
  useEffect(() => {
    // process.browser is depreciated use typeof instead
    isServer() && setCurrentPage(window.location.pathname)
  }, [isServer() && window.location.pathname])

  // logout logic
  const logout = async () => {
    dispatch({
      type: 'LOGOUT',
    })

    // clear out local storage, context, and redirect
    window.localStorage.removeItem('user')

    const { data } = await axios.get('/api/logout')

    // notification config
    // toast(data.message, {
    //   position: 'top-center',
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // })

    await router.push('/login')
  }

  return (
    <List className={classes.list}>
      {/* start nav items */}
      {/* conditional render of content depending on user role (instructor or subscriber) */}
      {user && user.role && user.role.includes('Instructor') ? (<>
        {/* Instructor Role */}
        <ListItem className={classes.listItem}>
          <Link href={'/instructor/course/create'}>
            <Button
              color="transparent"
              className={classes.navLink}
            >
              <Icon className={classes.icons}>create</Icon> Create Course
            </Button>
          </Link>
        </ListItem>
      </>) : (<>
      </>)}

      {/* not logged in user menu */}
      {user === null && (
        <>
          {/* login */}
          <ListItem className={classes.listItem}>
            <Link href={'/login'}>
              <Button
                color="transparent"
                className={classes.navLink}
              >
                <Icon className={classes.icons}>login</Icon> Login
              </Button>
            </Link>
          </ListItem>

          {/* signup */}
          <ListItem className={classes.listItem}>
            <Link href={'/register'}>
              <Button
                color="transparent"
                className={classes.navLink}
              >
                <HowToReg
                  className={classes.icons}/> Register
              </Button>
            </Link>
          </ListItem>
        </>
      )}
      {/* end main nav items */}

      {/* logged in user menu */}
      {user !== null && (
        <>
          <ListItem className={classes.listItem}>
            <CustomDropdown
              noLiPadding
              navDropdown
              buttonText={`${user && user.firstName} ${user && user.lastName}`}
              buttonProps={{
                className: classes.navLink,
                color: 'transparent',
              }}
              buttonIcon={PersonOutline}
              dropdownList={[
                <Link href={'/user'}>
                  <a className={classes.dropdownLink}>Dashboard</a>
                </Link>,
                <a
                  onClick={logout}
                  className={classes.dropdownLink}
                >
                  Logout
                </a>,
              ]}
            />
          </ListItem>
        </>
      )}

      {/* user is instructor menu */}
      {user && user.role && user.role.includes('Instructor') && (
        <>
          {/* signup */}
          <ListItem className={classes.listItem}>
            <Link href={'/instructor'}>
              <Button
                color="transparent"
                className={classes.navLink}
              >
                <Dashboard
                  className={classes.icons}/> Instructor Dashboard
              </Button>
            </Link>
          </ListItem>
        </>
      )}

      {/* start social media nav items */}
      {/* twitter */}
      <ListItem className={classes.listItem}>
        {/*<Tooltip title="Delete">
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>*/}
        <Tooltip
          id="instagram-twitter"
          title="Follow us on twitter"
          placement={'top'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            href="https://twitter.com/americoders"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-twitter'}/>
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  )
}
