import { Col, Row } from 'antd'

export default function CallToAction({
  subTitle,
  mainTitle,
  subTitle2,
  formElement,
}) {
  return (
    <>
      <Row
        align={'middle'}
        justify={'center'}
        className="py-5 container-fluid bg-light"
      >
        {/* title area */}
        <Col xs={24} md={20} lg={24} id="course-list">
          <section className="text-center">
            <span className="fs-5 text-muted ls-md text-uppercase">
              {subTitle}
            </span>

            <h1 className="fw-bold text-black lh-1 mt-2 mb-3">{mainTitle}</h1>

            <p className="text-black-50 mb-6 fs-6">{subTitle2}</p>

            {/* mailing form */}
            {formElement}
          </section>
        </Col>
      </Row>
    </>
  )
}
