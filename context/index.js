import { createContext, useEffect, useReducer } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

// initialize state
const initialState = {
  user: null,
}

// create context
const Context = createContext()

// create reducer function
// anytime you dispatch an action it returns the type and payload
const rootReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload } // return user payload
    case 'LOGOUT':
      return { ...state, user: null } // return null user
    default:
      return state
  }
}

// context provider, use provider to wrap app so state is available
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)

  // router
  const router = useRouter()

  useEffect(() => {
    // access state from local storage
    dispatch({
      type: 'LOGIN',
      payload: JSON.parse(window.localStorage.getItem('user')),
    })
  }, [])

  // run logout function on cookie expiration
  axios.interceptors.response.use(
    function (response) {
      // any status code that lie within the range of 2xx cause this function
      // to trigger
      return response
    }, function (error) {
      // any status codes that fall outside range of 2xx cause this function
      // to trigger
      let res = error.response
      if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
        return new Promise((resolve, reject) => {
          axios.get('/api/logout').then((data) => {
            // clear out local storage and redirect to login page
            console.log('/401 error > logout')
            dispatch({
              type: 'LOGOUT',
            })
            window.localStorage.removeItem('user')
            router.push('/login')
          }).catch(err => {
            console.log('AXIOS INTERCEPTORS ERR', err)
            reject(error)
          })
        })
      }
      return Promise.reject(error)
    })

  useEffect(() => {
    // use axios interceptors
    const getCsrfToken = async () => {
      const { data } = await axios.get('/api/csrf-token')
      axios.defaults.headers['X-CSRF-Token'] = data.csrfToken
    }
    getCsrfToken()
  }, [])
  return (<Context.Provider value={{ state, dispatch }}>
    {children}
  </Context.Provider>)
}

export { Context, Provider }