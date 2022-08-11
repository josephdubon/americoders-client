import Link from 'next/link'
import {Image, Layout} from 'antd'
import StudentUpdateForm from '../components/forms/StudentUpdateForm'
import {PageHead} from '../components/head/PageHead'

const {Content} = Layout

export default function UpdateUser() {

    return (<>
        <PageHead title={'Update User'}/>

        {/* hero section */}
        <Content className='bg-light'>
            <div className='container col-xxl-8 px-4 py-5'>
                <div className='row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5'>
                    <div className='col-10 col-sm-8 col-lg-6'>
                        <Image
                            src='/images/branding/misc/americoders-student-male-programming.jpg'
                            alt='Americoders'
                            loading='lazy'
                            title='We offer live, world-class, in-person computer science workshops and courses in a
                            mindful and peaceful, judgment-free zone.'
                            preview={false}
                        />
                        <p className='text-muted mt-2'>
                            We offer live, world-class, in-person computer science workshops and courses in a mindful
                            and peaceful, judgment-free zone.
                        </p>
                    </div>
                    <div className='col-lg-6'>
                        <h1 className='display-5 fw-bold lh-1 mb-3'>Update User Details</h1>
                        <p className='text-body text-muted'>
                            Review your details before submitting the form.
                        </p>


                        {/* Update User Form */}
                        <div className='col-md-12 offset-md-12 pb-5'>
                            {/* new student registration form */}
                            <StudentUpdateForm />
                            <br/>

                            {/* go back */}
                            <p className='form-text text-center p3'>
                                Change your mind? <Link href={'/user'}><a>Go Back</a></Link>
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </Content>
    </>)
}

