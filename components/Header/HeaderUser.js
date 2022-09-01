import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { SyncOutlined } from '@ant-design/icons'
import { PageHead } from '../PageHead/PageHead'
import { Context } from '../../context'
import Drawer from '@material-ui/core/Drawer'
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
import { Dashboard, Edit, Home } from '@material-ui/icons'
import Link from 'next/link'
import Divider from '@material-ui/core/Divider'

export default function UserRoute ({ children, showNav = true, props }) {
  // state
  const [ok, setOk] = useState(false)
  const [drawerStatus, setDrawerStatus] = useState(true)

  // get user
  const {
    state: { user },
  } = useContext(Context)

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

  // toggleDrawer
  const toggleDrawer = () => {
    setDrawerStatus(!drawerStatus)
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
              variant="permanent"

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
                <h5 style={{
                  textAlign: 'center',
                  fontWeight: '600',
                }}>{user && user.firstName}'s Menu</h5>

                {/* start menu items */}
                <List>

                  {/* dashboard */}
                  <Link href={'/user'} disablePadding button>
                    <a>
                      <ListItem href={'/user'} disablePadding button>
                        <ListItemButton>
                          <ListItemIcon>
                            <Dashboard/>
                          </ListItemIcon>
                          <ListItemText primary="My Dashboard"/>
                        </ListItemButton>
                      </ListItem>
                    </a>
                  </Link>

                  {/* update user */}
                  <Link href={'/user/update-user'} disablePadding button>
                    <a>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <Edit/>
                          </ListItemIcon>
                          <ListItemText primary="Update User"/>
                        </ListItemButton>
                      </ListItem>
                    </a>
                  </Link>

                  {/* bottom half */}
                  <Divider/>

                  {/* back home */}
                  <Link href={'/landing'} as={'/home'} disablePadding button>
                    <a>
                      <ListItem disablePadding button>
                        <ListItemButton>
                          <ListItemIcon>
                            <Home/>
                          </ListItemIcon>
                          <ListItemText primary="Back Home"/>
                        </ListItemButton>
                      </ListItem>
                    </a>
                  </Link>
                </List>
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