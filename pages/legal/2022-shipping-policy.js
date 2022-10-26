import GridContainer from '../../components/Grid/GridContainer'
import GridItem from '../../components/Grid/GridItem'
import { PageHead } from '../../components/PageHead/PageHead'
import Header from '../../components/Header/Header'
import NavLogo from '../../public/images/logo/americoders-logo-simple_white.svg'
import HeaderLinks from '../../components/Header/HeaderLinks'
import Parallax from '../../components/Parallax/Parallax'
import classNames from 'classnames'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/profilePage'
import Footer from '../../components/Footer/Footer'
import Script from 'next/script'

const useStyles = makeStyles(styles)

export default function ShippingPolicy (props) {
  const classes = useStyles()
  const { ...rest } = props

  return (<>
    <PageHead title={'Shipping Policy'}/>
    <Header
      color="transparent"
      brand={NavLogo}
      rightLinks={<HeaderLinks/>}
      fixed
      changeColorOnScroll={{
        height: 200,
        color: 'dark',
      }}
      {...rest}
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    />
    <Parallax small filter
              image="/images/americoders-community-diversity.png"/>
    <div className={classNames(classes.main, classes.mainRaised)}>
      <div>
        <div className={classes.container}>
          <GridContainer
            justifyContent="center"
            alignItems="center"
          >
            <GridContainer
              justifyContent="center"
              alignItems="center"
              spacing={2}>
              <GridItem xs={12} sm={12} md={12}>
                <h2 className={classes.title}>Shipping Policy</h2>
              </GridItem>
            </GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <div name="termly-embed" data-id="5117e4f0-367a-44e3-a4ca-89046d86ef06" data-type="iframe"></div>
              <Script type="text/javascript">{`(function(d, s, id) {
                var js, tjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "https://app.termly.io/embed-policy.min.js";
                tjs.parentNode.insertBefore(js, tjs);
              }(document, 'script', 'termly-jssdk'));`}</Script>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
    <Footer/>
  </>)
}