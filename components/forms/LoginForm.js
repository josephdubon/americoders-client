import {useContext, useEffect, useState} from 'react'
import {Context} from '../../context'
import {useRouter} from 'next/router'
import axios from 'axios'
import {toast} from 'react-toastify'
import {SyncOutlined} from '@ant-design/icons'

const LoginForm = () => {
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
        if (user !== null) router.push('/user')
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
        <form onSubmit={handleSubmit}>
            <input
                type='email'
                className='form-control mb-4 p-4'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='Enter email'
                required
            />
            <input
                type='password'
                className='form-control mb-4 p-4'
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Enter password'
                required
            />
            <div className='d-grid gap-2'>
                <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={!email || !password || loading}
                >
                    {loading ? <SyncOutlined spin/> : 'Submit'}
                </button>
            </div>
        </form>

    </>)
}

export default LoginForm