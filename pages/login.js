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
import LoginForm from '../components/forms/LoginForm'
import { PageHead } from '../components/PageHead/PageHead'
import Footer from '../components/Footer/Footer'
import NavLogo from '../public/images/logo/americoders-logo-simple_white.svg'

const useStyles = makeStyles(styles)

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')
  setTimeout(function () {
    setCardAnimation('')
  }, 700)
  const classes = useStyles()
  const { ...rest } = props
  return (
    <div>
      <PageHead title={'Login, Embrace the Knowledge'} />
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
            "url('/images/original/americoders-mindful-meditation-teen.jpg')",
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
              <GridItem xs={10} sm={10} md={12}>
                <Card className={classes[cardAnimaton]}>
                  {/* login form */}
                  <LoginForm />
                </Card>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  )
}
