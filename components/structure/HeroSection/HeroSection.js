// standard hero section for global use

import {Col, Row} from 'antd'
import styles from './HeroSection.module.css'

export default function HeroSection({
                                        heroExtraContent,
                                        heroImageUrl,
                                        heroIntro,
                                        heroTitle,
                                        heroSubTitle,
                                    }) {

    return (<>
        <Row
            align={'middle'}
            justify={'center'}
            className={styles['heroSection']}
            style={{
                backgroundImage: `linear-gradient(180deg, rgba(10,9,40) 15%, rgba(10,9,40,0) 100%, rgba(10,9,40) 15%),
                url(${heroImageUrl})`
            }}
        >
            <Col
                xs={24}
                md={22}
                lg={20}
                xl={18}
            >
                {/* hero content */}

                {/* hero titles */}
                <h1 className='display-5 text-white text-uppercase'>{heroTitle}</h1>
                <h5 className='text-white text-capitalize fw-light mb-4'>
                    {heroSubTitle}
                </h5>

                {/* hero intro */}
                <p className='text-white fs-5'>
                    {heroIntro}
                </p>

                {/* hero extra content */}
                {heroExtraContent}
            </Col>
        </Row>
    </>)
}


