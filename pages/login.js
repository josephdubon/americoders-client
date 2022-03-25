import {useContext, useEffect, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {Context} from '../context'

import {SyncOutlined} from '@ant-design/icons'

const axios = require('axios')
const {toast} = require('react-toastify')

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // global state
    const {
        state: {user}, // get user status from state
        dispatch,
    } = useContext(Context)


    // router
    const router = useRouter()

    // condition redirect for logged-in user
    useEffect(() => {
        if (user !== null) router.push('/')
    }, [user])

    const handleSubmit = async (e) => {
        // do not reload the page
        e.preventDefault()

        // send data to backend
        try {
            // activate load spinner
            setLoading(true)
            const {data} = await axios.post(`/api/login`, {
                email, password
            })

            // notification config
            toast.success('Welcome to Americoders! What will you create to make the world a better place?', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

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

    return (<>
        <main>
            <section className="py-5 text-center container">
                <div className="row py-lg-5">
                    <div className="col-lg-6 col-md-8 mx-auto">
                        <h1 className="fw-light">Login</h1>
                        <p className="lead text-muted">Something short and leading about the collection below—its
                            contents, the creator, etc. Make it short and sweet, but not too short so folks don’t simply
                            skip over it entirely.</p>
                    </div>
                </div>
            </section>

            <div className="album py-5 bg-light">
                <div className="container">
                    {/* Login Form */}
                    <div className='container-fluid col-md-4 offset-md-4 pb-5'>

                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                className='form-control mb-4 p-4'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Enter email'
                                required
                            />
                            <input
                                type="password"
                                className='form-control mb-4 p-4'
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder='Enter password'
                                required
                            />
                            <div className="d-grid gap-2">
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={!email || !password || loading}
                                >
                                    {loading ? <SyncOutlined spin/> : 'Submit'}
                                </button>
                            </div>
                        </form>

                        {/*  register */}
                        <p className='text-center p3'>
                            Want to sign-up? <Link href='/register'><a>Register</a></Link>
                        </p>

                        {/* reset password */}
                        <p className='text-center p3'>
                            <Link href='/forgot-password'><a className='text-danger'>Forgot password?</a></Link>
                        </p>

                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default Login