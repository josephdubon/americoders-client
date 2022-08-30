import Link from 'next/link'
import { Image, Layout } from 'antd'
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm'

const { Content } = Layout

const ForgotPassword = () => {

  return (<>
    {/* hero section */}
    <Content className="bg-light">
      <div className="container col-xxl-8 px-4 py-5">
        <div
          className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <Image
              src="/images/branding/bg-images/americoders-student-female-laptop-fun.jpg"
              alt="Americoders"
              loading="lazy"
              preview={false}
            />
            <p className=" text-muted mt-2">
              Thank you for your patience as we build out our system. We are
              currently in development of
              our courses/workshops. Please keep checking back for new content!
            </p>
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Forgot Password
              Form</h1>
            <p className="lead text-muted">
              Welcome back, <strong
              className="text-primary fw-bold">Americoder</strong>!
            </p>
            <p className=" text-muted mt-2">
              Thanks for visiting again! Always remember to reach out if you
              have any questions or
              comments.
            </p>

            {/* ForgotPasswordForm Form */}
            <div className="col-md-12 offset-md-12 pb-5">

              {/* login form */}
              <ForgotPasswordForm/>
              <br/>

              {/*  register */}
              <p className="form-text text-center p3">
                Want to sign-up? <Link href={'/register'}><a>Register</a></Link>
                <br/>

                {/* reset password */}
                <Link href={'/forgot-password'}><a className="text-danger">Forgot
                  password?</a></Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </Content>
  </>)
}

export default ForgotPassword