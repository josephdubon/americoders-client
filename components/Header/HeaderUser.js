/*
* This file is unused
* But you can use this as a user ONLY menu that will render for only logged in users when wrapped in <UserRoute>

*
*
*
*
* */
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SyncOutlined } from '@ant-design/icons'
import { PageHead } from '../PageHead/PageHead'
import { Context } from '../../context'
import Drawer from '@material-ui/core/Drawer'
import styles from '../../styles/jss/americoders/components/headerLinksStyle.js'
import {
  Box,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import Toolbar from '@material-ui/core/Toolbar'
import { List } from '@material-ui/core'
import { drawerWidth } from '../../styles/jss/americoders'
import { Edit, Home, Person } from '@material-ui/icons'
import Link from 'next/link'
import Divider from '@material-ui/core/Divider'
import GridItem from '../Grid/GridItem'
import { makeStyles } from '@material-ui/core/styles'
import Button from '../CustomButtons/Button'

export default function UserRoute ({ children, showNav = true, props }) {
  // state
  const [ok, setOk] = useState(false)
  const [drawerStatus, setDrawerStatus] = useState(false)

  // get user
  const {
    state: { user },
  } = useContext(Context)

  const useStyles = makeStyles(styles)
  const classes = useStyles()

  // router
  const router = useRouter()

  const { ...rest } = props

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    // try to get user match
    try {
      const { data } = await axios.get('/api/current-user')
      if (data.ok) setOk(true) // if match found, set ok to true
    } catch (err) {
      console.log(err)
      setOk(false) // if no match found, set ok to false
      await router.push('/login') // redirect to login page
    }
  }

  return (<>
    {!ok ? (
      // if ok is false, show loading screen
      <SyncOutlined spin
                    className="d-flex justify-content-center display-1 text-primary p-5"
      />
    ) : (
      // if ok is true, show child element
      <>
        <PageHead title={'Welcome! We are a tech learning platform.'}/>

        {/* only show UserNav when showNav is true, hide on false */}
        {showNav &&
          <>
            <Drawer
              variant="temporary"
              anchor="left"
              open={drawerStatus}
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                },
              }}
            >
              <Toolbar/>
              <Box sx={{ overflow: 'auto' }}>
                <h6 style={{
                  textAlign: 'center',
                  fontWeight: '600',
                }}>{user && user.firstName}'s Menu</h6>

                {/* start menu items */}
                <Button onClick={() => {setDrawerStatus(false)}}></Button>

                <GridItem xs={12} sm={12} md={12}>
                  <List>
                    {/* dashboard */}
                    <Link href={'/user'} disablePadding button>
                      <a>
                        <ListItem href={'/user'} disablePadding>
                          <ListItemButton>
                            <ListItemText className={classes.drawerLinks}
                                          primary="View Profile"/>
                          </ListItemButton>
                          <ListItemIcon>
                            <Person/>
                          </ListItemIcon>
                        </ListItem>
                      </a>
                    </Link>

                    {/* update user */}
                    <Link href={'/user/update-user'} disablePadding button>
                      <a>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText className={classes.drawerLinks}
                                          primary="Edit Profile"/>
                          </ListItemButton>
                          <ListItemIcon>
                            <Edit/>
                          </ListItemIcon>
                        </ListItem>
                      </a>
                    </Link>

                    {/* bottom half */}
                    <Divider/>

                    {/* back home */}
                    <Link href={'/landing'} disablePadding
                          button>
                      <a>
                        <ListItem disablePadding>
                          <ListItemButton>
                            <ListItemText className={classes.drawerLinks}
                                          primary="Home"/>
                          </ListItemButton>
                          <ListItemIcon>
                            <Home/>
                          </ListItemIcon>
                        </ListItem>
                      </a>
                    </Link>
                  </List>
                </GridItem>
                {/*  end menu items*/}
              </Box>
            </Drawer>
          </>
        }
        {children}
      </>
    )}
  </>)
}