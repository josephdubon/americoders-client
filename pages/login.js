import {useState} from 'react'
import {SyncOutlined} from "@ant-design/icons";
import Link from 'next/link'

const axios = require('axios')
const {toast} = require('react-toastify')

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

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

            toast.success('Registration successful. Please login.', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            })

            console.log('LOGIN RESPONSE', data)
            // deactivate load spinner
            // setLoading(false)
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
        <header>
            <div className="collapse bg-dark" id="navbarHeader">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-8 col-md-7 py-4">
                            <h4 className="text-white">Americoders</h4>
                            <p className="text-muted">Add some information about the album below, the author, or any
                                other background context. Make it a few sentences long so folks can pick up some
                                informative tidbits. Then, link them off to some social networking sites or contact
                                information.</p>
                        </div>

                        <div className="col-sm-4 offset-md-1 py-4">
                            <h4 className="text-white">Contact</h4>
                            <ul className="list-unstyled">
                                <li><a href="#" className="text-white">Follow on Twitter</a></li>
                                <li><a href="#" className="text-white">Like on Facebook</a></li>
                                <li><a href="#" className="text-white">Email me</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="navbar navbar-dark bg-dark shadow-sm">
                <div className="container-fluid">
                    <a href="/" className="navbar-brand d-flex align-items-center">
                        <strong>Americoders</strong>
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon">{' '}</span>
                    </button>
                </div>
            </div>
        </header>

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
                                type="text"
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

                        <p className='text-center p3'>
                            Need to sign up?
                            <br />Register
                            <Link href='/register'>
                                <a> Here</a>
                            </Link>
                        </p>

                    </div>
                </div>
            </div>

        </main>

        <footer className="text-muted py-5">
            <div className="container">
                <p className="float-end mb-1">
                    <a href="#">Back to top</a>
                </p>
                <p className="mb-1">Americoders Center for Advanced Learning</p>
                <p className="mb-0">Want to sign-up? <a href="/">Visit the homepage</a> or read our <a
                    href="#">getting started guide</a>.</p>
            </div>
        </footer>
    </>)
}

export default Login