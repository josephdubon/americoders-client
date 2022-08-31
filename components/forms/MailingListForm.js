import Button from '../CustomButtons/Button'
import { useRouter } from 'next/router'
import axios from 'axios'
import React, { useState } from 'react'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import CustomInput from '../CustomInput/CustomInput'
import styles from '../../styles/jss/americoders/pages/landingPage.js'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(styles)

export default function MailingListForm () {
  // set state
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(false)

  // router config
  const router = useRouter()

  const classes = useStyles()

  // api request
  const subscribe = () => {
    // update state
    setLoading(true)

    // make request
    axios.put('/api/mailing-list', {
      email,
    }).then((result) => {
      if (result.status === 200) {
        router.push('/thankyou')
        setLoading(false)
      }
    }).catch((err) => {
      console.log(err)
      setLoading(false)
    })
  }

  const onFinish = (values) => {
    console.log('Success:', values)
    setEmail(null)
    router.push('/thankyou')

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (<>
    <p className="lead text-dark text-center form-text">
      Please enter your email to join our mailing list.</p>
    <form
      onSubmit={subscribe}
      name="basic"
      initialvalues={{
        remember: true,
      }}
      autoComplete="off">
      <GridContainer>

        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText="Your Email"
            name="email"
            id="email"
            formControlProps={{
              fullWidth: true,
              onChange: (e) => setEmail(e.target.value),
            }}
          />
        </GridItem>
        <hr/>
        <GridItem xs={12} sm={12} md={4} className={classes.textCenter}
                  style={{ textAlign: 'center' }}>
          <Button
            type="submit"
            color="primary"
            size="lg"
            disabled={!email || loading}
          >
            Beam Me Up, Scotty!
          </Button>
        </GridItem>
      </GridContainer>
    </form>
  </>)
}