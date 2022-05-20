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

        {/* mailing list form */}
        <Content>
            <div className='container px-4 py-5' id='sign-up'>
                <h2 className='text-light pb-2 border-bottom'>Early Sign Up Form</h2>
                <div className='row g-4 py-5 row-cols-1 row-cols-lg-2'>
                    <div className='feature col'>
                        <div className='feature-icon bg-primary bg-gradient'>
                            <svg className='bi' width='1em' height='1em'>
                            </svg>
                        </div>

                        <h2 className='text-light'>Unlock a 20% Discount</h2>
                        <p className='text-light'>

                        </p>
                        <p className='text-light'>
                            Welcome to Americoders, the #1 online and in-person technology advocacy learning system for
                            kids and adults of all ages. We offer live, world-class, in-person computer science
                            workshops and courses in a mindful and peaceful, judgment-free zone.
                        </p>
                        <p className='text-light fw-bold'>
                            Projects: <br/>
                            Learn to Code | Build Games | Solve Puzzles | Build Hardware Projects
                        </p>
                        <MailingListForm/>
                    </div>
                    <div className='feature col'>
                        <div className='feature-icon bg-primary bg-gradient'>
                            <svg className='bi' width='1em' height='1em'>
                            </svg>
                        </div>

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