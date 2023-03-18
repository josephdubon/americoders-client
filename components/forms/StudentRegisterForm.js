import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context'
import { useRouter } from 'next/router'
import axios from 'axios'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CustomInput from '../CustomInput/CustomInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import CardFooter from '../Card/CardFooter'
import Button from '../CustomButtons/Button'

import styles from '../../styles/jss/americoders/pages/loginPage.js'
import { makeStyles } from '@material-ui/core/styles'
import {
  AccountBox,
  AlternateEmail,
  EmojiPeople,
  Person,
} from '@material-ui/icons'
import { toast } from 'react-toastify'
import { Typography } from '@mui/material'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import Link from 'next/link'

const useStyles = makeStyles(styles)

const StudentRegisterForm = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [bio, setBio] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')

  setTimeout(function () {
    setCardAnimation('')
  }, 700)

  const classes = useStyles()

  // global state
  const {
    state: { user },
  } = useContext(Context)

  // router
  const router = useRouter()

  // condition redirect for logged-in user
  useEffect(() => {
    if (user !== null) router.push('/user')
  })

  const handleSubmit = async (e) => {
    // do not reload the page
    e.preventDefault()

    // send data to backend
    try {
      // activate load spinner
      setLoading(true)
      const { data } = await axios.post(`/api/register`, {
        firstName,
        lastName,
        bio,
        email,
        password,
      })

      toast.success('Registration successful. Please login.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      // deactivate load spinner
      setLoading(false)

      await router.push('/login')
    } catch (err) {
      // deactivate load spinner
      setLoading(false)

      toast.error(err.response.data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit}>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h4>Register</h4>
        </CardHeader>

        <p className={classes.divider}>Hello, future Americoder!</p>

        <CardBody>
          {/* first name */}
          <CustomInput
            labelText="First Name"
            id="firstName"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'firstName',
              value: firstName,
              required: true,
              onChange: (e) => setFirstName(e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <Person className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />

          {/* last name */}
          <CustomInput
            labelText="Last Name"
            id="lastName"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'lastName',
              value: lastName,
              onChange: (e) => setLastName(e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <AccountBox className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />

          {/* email */}
          <CustomInput
            labelText="Email"
            id="email"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'email',
              value: email,
              required: true,
              onChange: (e) => setEmail(e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmail className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />

          {/* short bio */}
          <CustomInput
            labelText="Short Bio"
            id="bio"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'bio',
              value: bio,
              onChange: (e) => setBio(e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <EmojiPeople className={classes.inputIconsColor} />
                </InputAdornment>
              ),
            }}
          />

          <CustomInput
            labelText="Password"
            id="password"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'password',
              value: password,
              required: true,
              onChange: (e) => setPassword(e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className={classes.inputIconsColor}>password</Icon>
                </InputAdornment>
              ),
              autoComplete: 'off',
            }}
          />
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button
            type="submit"
            color="danger"
            size="lg"
            disabled={!firstName || !email || !password || loading}
          >
            I want to be an Americoder!
          </Button>
        </CardFooter>
      </form>
      <GridContainer
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <GridItem xs={10} sm={10} md={8}>
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            className={classes.legalFooter}
          >
            <span
              style={{
                textTransform: 'uppercase',
                fontWeight: '600',
              }}
            >
              Must be minimum 13 years old to register.
            </span>
            <br />
            By registering for an account, I agree to the Americoders{' '}
            <Link href={'/legal/2022-terms-and-conditions'}>
              <a className={classes.legalFooterLink}>Terms & Conditions</a>
            </Link>{' '}
            and{' '}
            <Link href={'/legal/2022-privacy-policy'}>
              <a className={classes.legalFooterLink}>Privacy Policy</a>
            </Link>
            .
          </Typography>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default StudentRegisterForm
