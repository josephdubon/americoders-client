import {useContext, useEffect, useState} from 'react'
import {Context} from '../../context'
import {useRouter} from 'next/router'
import axios from 'axios'
import {toast} from 'react-toastify'
import {SyncOutlined} from '@ant-design/icons'

const StudentUpdateForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)

    // global state
    const {
        state: {user},
    } = useContext(Context)

    // router
    const router = useRouter()

    // condition redirect for logged-in user
    useEffect(() => {
        if (user === null) router.push('/register')
    })

    const handleSubmit = async (e) => {
        // do not reload the page
        e.preventDefault()

        // send data to backend
        try {
            // activate load spinner
            setLoading(true)

            // update user data in db
            const {data} = await axios.post(`/api/update-user`, {
                name, email
            })

            // update user state
            user.name = name

            toast.success('User update successful.', {
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

            // clear fields and redirect home
            setName('')
            setEmail('')
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

    return (<>
        <form onSubmit={handleSubmit}>
            <p className='form-text'>Update Name</p>
            <input
                type='text'
                className='form-control mb-4 p-4'
                defaultValue={name}
                onChange={e => setName(e.target.value)}
                placeholder={user && user.name}
                // required
            />

            <p className='form-text'>Confirm Email</p>
            <input
                type='text'
                className='form-control mb-4 p-4'
                defaultValue={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={user && user.email}
                // required
            />

            <div className='d-grid gap-2'>
                <button
                    type='submit'
                    className='btn btn-primary'
                    disabled={!name || !email || loading}
                >
                    {loading ? <SyncOutlined spin/> : 'Submit'}
                </button>
            </div>
        </form>
    </>)
}

export default StudentUpdateForm