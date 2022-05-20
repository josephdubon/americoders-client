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
        {/* hero section */}
        <Content className='bg-light'>
            <div className='container col-xxl-8 px-4 py-5'>
                <div className='row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5'>
                    <div className='col-10 col-sm-8 col-lg-6'>
                        <Image
                            src='/images/branding/bg-images/americoders-students-desktop.jpg'
                            alt='Americoders'
                            loading='lazy'
                            preview={false}
                        />
                    </div>
                    <div className='col-lg-6'>
                        <h1 className='display-5 fw-bold lh-1 mb-3'>Early Students Mailing List</h1>
                        <p className='lead text-muted'>
                            Hello future <strong className='text-primary fw-bold'>Americoder</strong>!
                            <br/>
                            <br/>
                            Thank you for your patience as we build out our system. We are currently in development of
                            our first courses/workshops.
                        </p>
                        <p className='lead text-muted'>
                            Use the form below to signup for our early students list. Be the first
                            to know once we launch the <strong
                            className='text-primary fw-bold'>Americoders</strong> app.
                        </p>
                        <p className='lead text-muted'>
                            Our first workshops scheduled to begin in June 2022.
                            <br/>
                            <span
                                className='small text-danger fw-bold'>Limited
                            Spots Available.</span>
                        </p>
                        {/* buttons */}
                        <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                            <Link href='#sign-up'>
                                <a>
                                    <button type='button' className='btn btn-primary btn-lg px-4 me-md-2'>Early Sign-Up
                                    </button>
                                </a>
                            </Link>

                            <Link href='/#more-info'>
                                <a>
                                    <button type='button' className='btn btn-outline-secondary btn-lg px-4'>More
                                        Info
                                    </button>
                                </a>
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </Content>

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