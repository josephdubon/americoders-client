import { Col, Image, Row } from 'antd'

export default function CallToActionImage({
  ctaButtons,
  featuredImage,
  subTitle,
  mainTitle,
  subTitle2,
}) {
  return (
    <>
      <Row align={'middle'} justify={'center'} className="container py-5">
        {/* image */}
        <Col xs={24} lg={10}>
          <Image
            src={`${featuredImage}`}
            preview={false}
            className="rounded-3 bg-body p-3"
          />
        </Col>

        {/* content */}
        <Col xs={24} lg={14} className={'px-5'}>
          <p className="fs-5 mb-0 ls-md text-uppercase text-white text-center">
            {subTitle}
          </p>

          <h1 className="fw-bold text-white lh-1 mt-2 mb-3 text-center">
            {mainTitle}
          </h1>

          <p className="text-white-50 mb-6 fs-6">{subTitle2}</p>

          {/* buttons */}
          {ctaButtons}
        </Col>
      </Row>
    </>
  )
}
