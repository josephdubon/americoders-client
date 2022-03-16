import {useContext, useEffect, useState} from 'react'
import {Context} from '../../context'
import axios from 'axios'

const UserIndex = () => {
    // state
    const [hidden, setHidden] = useState(true)
    const {
        state: {user},
    } = useContext(Context)

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        try {
            const {data} = await axios.get('/api/current-user')
            setHidden(false)
        } catch (err) {
            console.log(err)
            setHidden(true)
        }
    }

    return (<>
        {!hidden && (<>
            <header>
                <div className='collapse bg-dark' id='navbarHeader'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-sm-8 col-md-7 py-4'>
                                <h4 className='text-white'>{' '}</h4>
                                <p className='text-muted'>Add some information about the album below, the
                                    author, or any
                                    other background context. Make it a few sentences long so folks can pick up
                                    some
                                    informative tidbits. Then, link them off to some social networking sites or
                                    contact
                                    information.</p>
                            </div>
                            <div className='col-sm-4 offset-md-1 py-4'>
                                <h4 className='text-white'>Contact</h4>
                                <ul className='list-unstyled'>
                                    <li><a href='#' className='text-white'>Follow on Twitter</a></li>
                                    <li><a href='#' className='text-white'>Like on Facebook</a></li>
                                    <li><a href='#' className='text-white'>Email me</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='navbar navbar-dark bg-dark shadow-sm'>
                    <div className='container-fluid'>
                        <a href='/' className='navbar-brand d-flex align-items-center'>
                            <strong>Americoders</strong>
                        </a>
                        <button className='navbar-toggler' type='button' data-bs-toggle='collapse'
                                data-bs-target='#navbarHeader' aria-controls='navbarHeader'
                                aria-expanded='false'
                                aria-label='Toggle navigation'>
                            <span className='navbar-toggler-icon'>{' '}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main>
                <section className='py-5 text-center container'>
                    <div className='row py-lg-5'>
                        <div className='col-lg-6 col-md-8 mx-auto'>
                            <h1 className='fw-light'>User Page</h1>
                            <p className='lead text-muted'>Something short and leading about the collection
                                below—its
                                contents, the creator, etc. Make it short and sweet, but not too short so folks
                                don’t simply
                                skip over it entirely.</p>
                        </div>
                    </div>
                </section>

                <div className='album py-5 bg-light'>
                    <div className='container'>
                        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                            <p className='lead'>
                                Welcome User {JSON.stringify(user.name)}
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className='text-muted py-5'>
                <div className='container'>
                    <p className='float-end mb-1'>
                        <a href='#'>Back to top</a>
                    </p>
                    <p className='mb-1'>Americoders Center for Advanced Learning</p>
                    <p className='mb-0'>Want to sign-up? <a href='/'>Visit the homepage</a> or read our <a
                        href='#'>getting started guide</a>.</p>
                </div>
            </footer>
        </>)}
    </>)
}

export default UserIndex
