import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons
// core components
import Header from '../components/Header/Header.js'
import HeaderLinks from '../components/Header/HeaderLinks.js'
import GridContainer from '../components/Grid/GridContainer.js'
import GridItem from '../components/Grid/GridItem.js'
import Card from '../components/Card/Card.js'

import styles from '../styles/jss/americoders/pages/loginPage.js'
import StudentRegisterForm from '../components/forms/StudentRegisterForm'
import Footer from '../components/Footer/Footer'
import NavLogo from '../public/images/logo/americoders-logo-simple_white.svg'
import { PageHead } from '../components/head/PageHead'

const useStyles = makeStyles(styles)

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')
  setTimeout(function () {
    setCardAnimation('')
  }, 700)
  const classes = useStyles()
  const { ...rest } = props
  return (
    <>
      <PageHead title={'New Student Registration'} />

      <Header
        absolute
        color="transparent"
        brand={NavLogo}
        rightLinks={<HeaderLinks />}
        {...rest}
      />

      <div
        className={classes.pageHeader}
        style={{
          backgroundImage:
            "url('/images/original/americoders-community-hands-friends.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <GridContainer
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <GridItem xs={10} sm={6} md={6}>
                <Card className={classes[cardAnimaton]}>
                  {/* register form */}
                  <StudentRegisterForm />
                </Card>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </>
  )
}
