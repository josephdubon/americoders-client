import {Col, Image, Row} from 'antd'

export default function FeatureSectionLeft({featuredImage, featuredTitle, featuredContent}) {
    return (<>
        <Row
            align={'middle'}
            justify={'center'}
            className='container py-5'
        >
            {/* image */}
            <Col
                xs={24}
                lg={10}
            >
                <Image
                    src={`${featuredImage}`}
                    preview={false}
                    className='rounded-3 bg-body p-3'
                />
            </Col>

            {/* content */}
            <Col
                xs={24}
                lg={14}
            >
                <h2 className='py-3 text-uppercase text-white text-center'>{featuredTitle}</h2>
                {featuredContent}
            </Col>
        </Row>
    </>)
}