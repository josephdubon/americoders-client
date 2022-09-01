import { useContext, useEffect } from 'react'
import { Context } from '../../context'
import { SyncOutlined } from '@ant-design/icons'
import axios from 'axios'

const StripeCallback = () => {
  // get user
  const {
    state: { user },
    dispatch,
  } = useContext(Context)

  // update user info in db
  useEffect(() => {
    if (user) {
      axios.post('/api/get-account-status').then(res => {
        // console.log(res)

        dispatch({
          type: 'LOGIN',
          payload: res.data,
        })

        // update user in localStorage
        window.localStorage.setItem('user', JSON.stringify(res.data))
        // take user back to instructor page
        window.location.href = '/instructor'
      })
    }
  }, [user])

  return (<>
    <SyncOutlined spin
                  className="d-flex justify-content-center display-1 text-danger p-5"/>
  </>)
}

export default StripeCallback