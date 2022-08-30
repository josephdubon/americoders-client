import Link from 'next/link'
import { Image, Layout } from 'antd'
import StudentRegisterForm from '../components/forms/StudentRegisterForm'

const { Content } = Layout

const Register = () => {

  return (<>
    {/* hero section */}
    <Content className="bg-light">
      <div className="container col-xxl-8 px-4 py-5">
        <div
          className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <Image
              src="/images/branding/misc/americoders-student-male-programming.jpg"
              alt="Americoders"
              loading="lazy"
              title="We offer live, world-class, in-person computer science workshops and courses in a
                            mindful and peaceful, judgment-free zone."
              preview={false}
            />
            <p className="text-muted mt-2">
              We offer live, world-class, in-person computer science workshops
              and courses in a mindful
              and peaceful, judgment-free zone.
            </p>
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Register</h1>
            <p className="lead text-muted">
              Hello, future <strong
              className="text-primary fw-bold">Americoder</strong>!
            </p>
            <p className="text-body text-muted">
              Welcome to <strong
              className="text-primary fw-bold">Americoders</strong>, the #1
              online and
              in-person technology advocacy learning system for all members of
              our community.
            </p>


            {/* Register Form */}
            <div className="col-md-12 offset-md-12 pb-5">
              {/* new student registration form */}
              <StudentRegisterForm/>
              <br/>

              {/*  register */}
              <p className="form-text text-center p3">
                Already registered? <Link href={'/login'}><a>Login</a></Link>
              </p>
            </div>

          </div>
        </div>
      </div>
    </Content>
  </>)
}

export default Register