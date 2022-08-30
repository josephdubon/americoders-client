import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../context'
import { useRouter } from 'next/router'
import axios from 'axios'
import CardHeader from '../Card/CardHeader'
import Button from '../CustomButtons/Button'
import CardBody from '../Card/CardBody'
import CustomInput from '../CustomInput/CustomInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import Icon from '@material-ui/core/Icon'
import CardFooter from '../Card/CardFooter'

import styles from '../../styles/jss/nextjs-material-kit/pages/loginPage.js'
import { makeStyles } from '@material-ui/core/styles'
import { AlternateEmail } from '@material-ui/icons'

const useStyles = makeStyles(styles)

const LoginForm = () => {
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
    state: { user }, // get user status from state
    dispatch,
  } = useContext(Context)

  // router
  const router = useRouter()

  // condition redirect for logged-in user
  useEffect(() => {
    if (user !== null) router.push('/user')
  }, [user])

  const handleSubmit = async (e) => {
    // do not reload the page
    e.preventDefault()

    // send data to backend
    try {
      // activate load spinner
      setLoading(true)
      const { data } = await axios.post(`/api/login`, {
        email, password,
      })

      // // notification config
      // toast.success(
      //   'Welcome to Americoders! What will you create to make the world a better place?',
      //   {
      //     position: 'top-center',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   })

      // deactivate load spinner
      setLoading(false)

      // console.log('LOGIN RESPONSE', data)
      dispatch({
        type: 'LOGIN',
        payload: data,
      })

      // save state in local storage
      window.localStorage.setItem('user', JSON.stringify(data))

      // clear fields and redirect
      setEmail('')
      setPassword('')
      await router.push('user')
    } catch (err) {
      // deactivate load spinner
      setLoading(false)

      // toast.error(err.response.data, {
      //   position: 'top-center',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // })
    }
  }

  return (<>
    <form
      className={classes.form}
      onSubmit={handleSubmit}>
      <CardHeader color="primary" className={classes.cardHeader}>
        <h4>Login</h4>

        {/* social login icons */}
        {/*<div className={classes.socialLine}>*/}
        {/*  <Button*/}
        {/*    justIcon*/}
        {/*    href="#TODO add a social login option"*/}
        {/*    target="_blank"*/}
        {/*    color="transparent"*/}
        {/*    onClick={(e) => e.preventDefault()}*/}
        {/*  >*/}
        {/*    <i className={'fab fa-twitter'}/>*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    justIcon*/}
        {/*    href="#TODO add a social login option"*/}
        {/*    target="_blank"*/}
        {/*    color="transparent"*/}
        {/*    onClick={(e) => e.preventDefault()}*/}
        {/*  >*/}
        {/*    <i className={'fab fa-facebook'}/>*/}
        {/*  </Button>*/}
        {/*  <Button*/}
        {/*    justIcon*/}
        {/*    href="#TODO add a social login option"*/}
        {/*    target="_blank"*/}
        {/*    color="transparent"*/}
        {/*    onClick={(e) => e.preventDefault()}*/}
        {/*  >*/}
        {/*    <i className={'fab fa-google-plus-g'}/>*/}
        {/*  </Button>*/}
        {/*</div>*/}
      </CardHeader>

      <p className={classes.divider}>Code to Live, Live to Code</p>
      <CardBody>
        <CustomInput
          labelText="Email..."
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'email',
            value: email,
            onChange: e => setEmail(e.target.value),
            endAdornment: (
              <InputAdornment position="end">
                <AlternateEmail className={classes.inputIconsColor}/>
              </InputAdornment>
            ),
          }}
        />
        <CustomInput
          labelText="Password"
          id="pass"
          formControlProps={{
            fullWidth: true,
          }}
          inputProps={{
            type: 'password',
            value: password,
            onChange: e => setPassword(e.target.value),
            endAdornment: (
              <InputAdornment position="end">
                <Icon className={classes.inputIconsColor}>
                  password
                </Icon>
              </InputAdornment>
            ),
            autoComplete: 'off',
          }}
        />
      </CardBody>
      <CardFooter className={classes.cardFooter}>
        <Button
          type="submit"
          color="primary"
          size="lg"
          disabled={!email || !password || loading}
        >
          Get started
        </Button>
      </CardFooter>
    </form>
  </>)
}

export default LoginForm