import {useContext, useEffect, useState} from 'react'
import {Context} from '../context'
import {useRouter} from 'next/router'
import {SyncOutlined} from '@ant-design/icons';

const axios = require('axios')
const {toast} = require('react-toastify')

const ForgotPassword = () => {
    // state
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(false)
    const [code, setCode] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // context
    const {
        state: {user},
    } = useContext(Context)

    // router
    const router = useRouter()

    // if user is logged-in, redirect to homepage
    useEffect(() => {
        if (user !== null) router.push('/')
    }, [user]) // add user as dependency to block page from logged-in user

    // submit form data to backend
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            // make request to server
            const {data} = await axios.post('/api/forgot-password', {email})

            // set success state and give user notification
            setSuccess(true)

            toast('Check your email for the secret code', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })
            setLoading(false)

        } catch (err) {
            setLoading(false)

            // notification config
            toast(err.response.data, {
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

    // submit new password from forgotPassword
    const handleResetPassword = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            const {data} = await axios.post('/api/reset-password', {
                email, code, newPassword,
            })

            // reset fields to empty
            setEmail('')
            setCode('')
            setNewPassword('')
            setLoading(false)

            // notification config
            toast('Success! Please try to login with your new password', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            // redirect to login page
            await router.push('login')
        } catch (err) {
            setLoading(false)

            // notification config
            toast(err.response.data, {
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
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>Forgot Password</h1>
                        
                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    {/* ForgotPassword Form */}
                    <div className='container-fluid col-md-4 offset-md-4 pb-5'>

                        {/* if success is true then handle submit with handleResetPassword */}
                        <form onSubmit={success ? handleResetPassword : handleSubmit}>
                            <input
                                type='email'
                                className='form-control mb-4 p-4'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder='Enter email'
                                required
                            />

                            {/* render on successful reset password submission */}
                            {success && <>
                                <input
                                    type='password'
                                    className='form-control mb-4 p-4'
                                    value={code}
                                    onChange={e => setCode(e.target.value)}
                                    placeholder='Enter secret code'
                                    required
                                />

                                <input
                                    type='password'
                                    className='form-control mb-4 p-4'
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    placeholder='Enter new password'
                                    required
                                />
                            </>}

                            <div className='d-grid gap-2'>
                                <button
                                    type='submit'
                                    className='btn btn-primary'
                                    disabled={!email || loading}
                                >
                                    {loading ? <SyncOutlined spin/> : 'Submit'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default ForgotPassword