import Link from 'next/link'
import {Image, Layout} from 'antd'
import MailingListForm from '../components/forms/MailingListForm'

const {Header, Content, Footer} = Layout

const axios = require('axios')
const {toast} = require('react-toastify')

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    // global state
    const {
        state: {user},
    } = useContext(Context)

    // router
    const router = useRouter()

    // condition redirect for logged-in user
    useEffect(() => {
        if (user !== null) router.push('/')
    })

    const handleSubmit = async (e) => {
        // do not reload the page
        e.preventDefault()

        // send data to backend
        try {
            // activate load spinner
            setLoading(true)
            const {data} = await axios.post(`/api/register`, {
                name, email, password
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

            // clear fields and redirect home
            setName('')
            setEmail('')
            setPassword('')
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
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>Register</h1>
                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    {/* Registration Form */}
                    <div className='container-fluid col-md-4 offset-md-4 pb-5'>

                        <form onSubmit={handleSubmit}>
                            <input
                                type='text'
                                className='form-control mb-4 p-4'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder='Enter name'
                                required
                            />
                            <input
                                type='text'
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
                                    disabled={!name || !email || !password || loading}
                                >
                                    {loading ? <SyncOutlined spin/> : 'Submit'}
                                </button>
                            </div>
                        </form>

                        <p className='text-center p3'>
                            Already registered?
                            <Link href='/login'>
                                <a> Login</a>
                            </Link>
                        </p>

                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default Register