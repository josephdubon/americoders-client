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

  // router
  const router = useRouter()

  // condition redirect for logged-in user
  useEffect(() => {
    if (user === null) router.push('/register')
  })
  const classes = useStyles()

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

      // toast.success('User update successful.', {
      //     position: 'top-center',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      // })

      // deactivate load spinner
      setLoading(false)

      await router.push('/login')
    } catch (err) {
      // deactivate load spinner
      setLoading(false)

      // toast.error(err.response.data, {
      //     position: 'top-center',
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      // })
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

      <p className="form-text">Last Name</p>
      <input
        type="text"
        className="form-control mb-4 p-4"
        onChange={e => setLastName(e.target.value)}
        placeholder={user && user.lastName}
        required
      />

      <p className="form-text">Bio</p>
      <input
        type="text"
        className="form-control mb-4 p-4"
        onChange={e => setBio(e.target.value)}
        placeholder={user && user.bio}
        required
      />

      <p className="form-text">Confirm Email</p>
      <input
        type="text"
        className="form-control mb-4 p-4"
        // defaultValue={user && user.email}
        onChange={e => setEmail(e.target.value)}
        placeholder={user && user.email}
        required
      />

      <div className="d-grid gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!email || loading}
        >
          {loading ? <SyncOutlined spin/> : 'Submit'}
        </button>
      </div>
    </form>
  </>)
}

export default StudentUpdateForm