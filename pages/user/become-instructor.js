import {useContext, useState} from 'react'
import {Context} from '../../context'
import {Button} from 'antd'
import {LoadingOutlined, SettingOutlined, UserSwitchOutlined} from '@ant-design/icons'
import axios from 'axios'
import {toast} from 'react-toastify'

const BecomeInstructor = () => {
    // state
    const [loading, setLoading] = useState(false)

    // get user
    const {
        state: {user}
    } = useContext(Context)

    // become instructor logic
    const becomeInstructor = () => {
        // console.log('become instructor button')

        setLoading(true)

        // api config
        axios
            .post('/api/make-instructor')
            .then((res) => {
                console.log(res)
                window.location.href = res.data // open on-boarding in new window
            })
            .catch((err) => {
                console.log(err.response.status)

                // notification config
                toast('Stripe on-boarding failed. Try again.', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })

                setLoading(false)
            })
    }

    return (<>
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>Become Instructor</h1>
                        <UserSwitchOutlined className='display-1 pb-3'/>
                        <p className='lead text-muted'>Setup payout to publish courses on Americoders.</p>

                        <Button
                            className='mb-3'
                            type='primary'
                            block
                            shape='round'
                            icon={loading ? <LoadingOutlined/> : <SettingOutlined/>}
                            size='large'
                            onClick={becomeInstructor}
                            disabled={
                                (user && user.role && user.role.includes('Instructor')) || loading
                            } // disable button if user is already an instructor
                        >
                            {loading ? 'Processing...' : 'Payout Setup'}
                        </Button>
                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                        <p className='lead'>
                            Americoders partners with Stripe to transfer earnings to your bank account.
                        </p>
                        <p className='lead'>
                            Americoders partners with Stripe to transfer earnings to your bank account.
                        </p>
                        <p className='lead'>
                            Americoders partners with Stripe to transfer earnings to your bank account.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    </>)
}

export default BecomeInstructor