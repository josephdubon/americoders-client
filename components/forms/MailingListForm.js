import Button from '../CustomButtons/Button'
import { useRouter } from 'next/router'
import axios from 'axios'
import React, { useState } from 'react'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import CustomInput from '../CustomInput/CustomInput'
import styles from '../../styles/jss/americoders/pages/landingPage.js'
import { makeStyles } from '@material-ui/core/styles'
import { toast } from 'react-toastify'

const useStyles = makeStyles(styles)

export default function MailingListForm() {
  // set state
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(false)

  // router config
  const router = useRouter()

  const classes = useStyles()

  // handle email validation
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/
    return re.test(email)
  }

  // api request
  const subscribe = (e) => {
    // update state
    setLoading(true)

    // validate email
    if (!validateEmail(email)) {
      // prevent page from reloading on failed email validation
      e.preventDefault()

      // update state
      setLoading(false)

      // notification config
      toast.error('Please enter a valid email 🤯.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else {
      return axios
        .put('/api/mailing-list', {
          email,
        })
        .then((result) => {
          if (result.status === 200 || 202) {
            // notification config
            toast.success('Thanks for joining our mailing-list 🎉', {
              position: 'top-center',
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            setLoading(false)
          }
        })
        .catch((err) => {
          console.log(err)
          setLoading(false)
        })
    }
  }

  return (
    <>
      <p className="lead text-dark text-center form-text">
        Please enter your email to join our mailing list.
      </p>
      <form
        onSubmit={subscribe}
        name="basic"
        initialvalues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <GridContainer justifyContent="center" alignItems="center" spacing={2}>
          <GridContainer
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
          >
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
            <hr />
            <GridItem
              xs={12}
              sm={12}
              md={4}
              className={classes.textCenter}
              style={{ textAlign: 'center' }}
            >
              <Button
                type="submit"
                color="primary"
                size="lg"
                disabled={!email || loading}
              >
                Subscribe
              </Button>
            </GridItem>
          </GridContainer>
        </GridContainer>
      </form>
    </>
  )
}
