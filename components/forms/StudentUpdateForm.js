import { useContext, useEffect, useState } from 'react'
import { Context } from '../../context'
import { useRouter } from 'next/router'
import axios from 'axios'
import CardHeader from '../Card/CardHeader'
import CardBody from '../Card/CardBody'
import CustomInput from '../CustomInput/CustomInput'
import InputAdornment from '@material-ui/core/InputAdornment'
import {
  AccountBox,
  AlternateEmail,
  EmojiPeople,
  Person,
} from '@material-ui/icons'
import CardFooter from '../Card/CardFooter'
import Button from '../CustomButtons/Button'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/loginPage'
import Link from 'next/link'

const useStyles = makeStyles(styles)

const StudentUpdateForm = () => {
  // global state
  const {
    state: { user },
  } = useContext(Context)

  const [firstName, setFirstName] = useState(user && user.firstName)
  const [lastName, setLastName] = useState(user && user.lastName)
  const [bio, setBio] = useState(user && user.bio)
  const [email, setEmail] = useState(user && user.email)
  const [loading, setLoading] = useState(false)

  const { state, dispatch } = useContext(Context)

  // router
  const router = useRouter()

  // condition redirect for logged-in user
  useEffect(() => {
    if (user === null) router.push('/login')
  })
  const classes = useStyles()

  const logout = async () => {
    dispatch({
      type: 'LOGOUT',
    })
  }

  const handleSubmit = async (e) => {
    // do not reload the page
    e.preventDefault()

    // send data to backend
    try {
      // activate load spinner
      setLoading(true)

      // update user data in db
      const { data } = await axios.post(`/api/update-user`, {
        firstName, lastName, bio, email,
      })

      // update user state
      user.firstName = firstName
      user.lastName = lastName
      user.bio = bio

      // deactivate load spinner
      setLoading(false)

      await logout()
    } catch (err) {
      // deactivate load spinner
      setLoading(false)

    }
  }

  return (<>
      <form
        className={classes.form}
        onSubmit={handleSubmit}>
        <CardHeader color="primary" className={classes.cardHeader}>
          <h4>Update User Details</h4>
        </CardHeader>

        <p className={classes.divider}>
          Confirm your email and click submit to save your changes.
          <br/>
          <strong>
            🚨 You will be redirected to a login page after saving.
          </strong>
          <br/>
          <small>
            Change your mind? Click <Link href={'/user'}><a>here</a></Link> to
            go back to your profile.
          </small>
        </p>

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
              onChange: e => setFirstName(e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <Person className={classes.inputIconsColor}/>
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
              onChange: e => setLastName(e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <AccountBox className={classes.inputIconsColor}/>
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
              onChange: e => setBio(e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <EmojiPeople className={classes.inputIconsColor}/>
                </InputAdornment>
              ),
            }}
          />

          {/* email */}
          <CustomInput
            labelText="Confirm Email"
            id="email"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              type: 'email',
              // value: email,
              required: true,
              onChange: e => setEmail(e.target.value),
              endAdornment: (
                <InputAdornment position="end">
                  <AlternateEmail className={classes.inputIconsColor}/>
                </InputAdornment>
              ),
            }}
          />

        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button
            type="submit"
            color="danger"
            size="lg"
            disabled={!email || loading}
          >
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </>
  )
}

export default StudentUpdateForm