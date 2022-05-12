import {Badge, Col, Image} from 'antd'
import {currencyFormatter} from '../../utils/currency'
import ReactPlayer from 'react-player'

const SingleCourseHero = ({
                              course,
                              showModal,
                              setShowModal,
                              preview,
                              setPreview,
                              loading,
                              user,
                              handleFreeEnrollment,
                              handlePaidEnrollment,
                          }) => {

    // destructure course items
    const {
        name,
        description,
        instructor,
        updatedAt,
        lessons,
        image,
        price,
        paid,
        category
    } = course

    return (<>
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>{name}</h1>

                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>
                    <div className='row gap-3'>
                        <div className='row row-cols-1 row-cols-md-2 g-3'>
                            <Col>
                                {/* title */}
                                <h1 className='font-weight-bold'>{name}</h1>

                                {/* description */}
                                <p className='lead'>{description && description.substring(0, 160)}...</p>

                                {/* category */}
                                <Badge
                                    count={category}
                                    className='mb-3'
                                    style={{
                                        backgroundColor: '#03a9f4',
                                    }}
                                />

                                {/* author */}
                                <p>Created by {instructor.name}</p>

                                {/* updated at */}
                                <p>Last update: {new Date(updatedAt).toLocaleDateString()}</p>

                                {/* price */}
                                <h4 className='text-black'>
                                    {
                                        paid ? currencyFormatter({
                                            amount: price,
                                            currency: 'usd',
                                        }) : 'Free'
                                    }
                                </h4>
                            </Col>
                            <Col>
                                {/* show video preview or course image */}
                                {lessons[0].video && lessons[0].video.Location ? (
                                    <div
                                        onClick={() => {
                                            setPreview(lessons[0].video.Location)
                                            setShowModal(!showModal) // toggle modal
                                        }}
                                    >
                                        <ReactPlayer
                                            className='react-player-div'
                                            url={lessons[0].video.Location}
                                            light={image.Location}
                                            width='100%'
                                            height='350px'
                                            controls
                                        />
                                    </div>
                                ) : (<>
                                    <Image
                                        src={image.Location}
                                        alt={name}
                                    />
                                </>)}
                            </Col>
                        </div>
                    </div>

                </div>
            </div>

        </main>
    </>)
}

export default SingleCourseHero