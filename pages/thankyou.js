import Image from 'next/image'

const axios = require('axios')
const { toast } = require('react-toastify')

const Thankyou = () => {
  return (
    <>
      {/* hero section */}
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <Image
              src="/images/branding/bg-images/americoders-students-desktop.jpg"
              alt="Americoders"
              loading="lazy"
              preview={false}
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Thank You!</h1>
            <p className="lead text-muted">
              Hello future{' '}
              <strong className="text-primary fw-bold">Americoder</strong>!
              <br />
              <br />
              Thank you for your patience as we build out our system. We are
              currently in development of our first courses/workshops.
            </p>
            <p className="lead text-muted">
              If you have any questions, comments, or would like to get a coffee
              and talk about code, and our community project please use the
              button below to send me an email.
            </p>
            {/* buttons */}
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <a href="mailto:helloworld@americoders.org">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 me-md-2"
                >
                  Email Me Here
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Thankyou
