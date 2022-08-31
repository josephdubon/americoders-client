import React from 'react'
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles'
// @material-ui/icons
// core components
import Header from '../components/Header/Header.js'
import HeaderLinks from '../components/Header/HeaderLinks.js'
import Footer from '../components/Footer/Footer.js'
import GridContainer from '../components/Grid/GridContainer.js'
import GridItem from '../components/Grid/GridItem.js'
import Card from '../components/Card/Card.js'

import styles from '../styles/jss/americoders/pages/loginPage.js'
import LoginForm from '../components/forms/LoginForm'
import { PageHead } from '../components/PageHead/PageHead'

const useStyles = makeStyles(styles)

export default function LoginPage (props) {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')
  setTimeout(function () {
    setCardAnimation('')
  }, 700)
  const classes = useStyles()
  const { ...rest } = props
  return (
    <div>
      <PageHead title={'Login, Embrace the Knowledge'}/>
      <Header
        absolute
        color="transparent"
        brand="AMERICODERS"
        rightLinks={<HeaderLinks/>}
        {...rest}
      />
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: 'url(\'/images/original/americoders-mindful-meditation-teen.jpg\')',
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={6} md={4}>
              <Card className={classes[cardAnimaton]}>
                {/* login form */}
                <LoginForm/>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont/>
      </div>
    </div>
  )
}
