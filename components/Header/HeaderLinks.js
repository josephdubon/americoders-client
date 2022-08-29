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

import styles
  from '../../styles/jss/nextjs-material-kit/components/headerLinksStyle.js'
import { Context } from '../../context'
import useRouter from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

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
    toast(data.message, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

    await router.push('/login')
  }

  return (
    <List className={classes.list}>

      {/* start nav items */}

      {/*<ListItem className={classes.listItem}>*/}
      {/*  <CustomDropdown*/}
      {/*    noLiPadding*/}
      {/*    navDropdown*/}
      {/*    buttonText="Components"*/}
      {/*    buttonProps={{*/}
      {/*      className: classes.navLink,*/}
      {/*      color: "transparent"*/}
      {/*    }}*/}
      {/*    buttonIcon={Apps}*/}
      {/*    dropdownList={[*/}
      {/*      <Link href="/components">*/}
      {/*        <a className={classes.dropdownLink}>All components</a>*/}
      {/*      </Link>,*/}
      {/*      <a*/}
      {/*        href="https://creativetimofficial.github.io/nextjs-material-kit/#/documentation?ref=njsmk-navbar"*/}
      {/*        target="_blank"*/}
      {/*        className={classes.dropdownLink}*/}
      {/*      >*/}
      {/*        Documentation*/}
      {/*      </a>*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*</ListItem>*/}

      {/* login */}
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/nextjs-material-kit-pro?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <Icon className={classes.icons}>login</Icon> Login
        </Button>
      </ListItem>

      {/* signup */}
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/nextjs-material-kit?ref=njsmk-navbar"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <HowToReg
            className={classes.icons}/> Signup
        </Button>
      </ListItem>
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
            href="https://twitter.com/CreativeTim?ref=creativetim"
            target="_blank"
            color="transparent"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-twitter'}/>
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={'top'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/CreativeTim?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-facebook'}/>
          </Button>
        </Tooltip>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={'top'}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + ' fab fa-instagram'}/>
          </Button>
        </Tooltip>
      </ListItem>
      {/* end nav items */}
    </List>
  )
}
