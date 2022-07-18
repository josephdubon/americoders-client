import {Badge, Button, Divider, Image, Layout} from 'antd'
import {currencyFormatter} from '../../utils/helpers'
import ReactPlayer from 'react-player'
import {LoadingOutlined, SafetyOutlined} from '@ant-design/icons'
import Moment from 'moment'

const {Content} = Layout


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
                              enrolled,
                              setEnrolled,
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
        {/* hero section */}
        <Content className='bg-light'>
            <div className='container col-xxl-12 px-4 py-5'>
                <div
                    className='row align-items-center justify-content-center g-5 row-cols-sm-1 row-cols-md-2'>
                    <div>
                        {course ?
                            (<>
                                <h1 className='display-6 fw-bold lh-1 mb-3 '>{name}</h1>
                                <Divider/>

                                {/* category */}
                                <Badge
                                    count={category}
                                    className='mb-3'
                                    style={{
                                        backgroundColor: '#03a9f4',
                                    }}
                                />

                                {/* description*/}
                                <p className='lead text-muted'>{description && description.substring(0, 160)}</p>

                                {/* author */}
                                <p className='text-muted'><strong>Created by: </strong> {instructor.name}</p>

                                {/* last update */}
                                <p className='text-muted'><strong>Last
                                    Update: </strong>{Moment(course && course.updatedAt).format('LL')}
                                </p>

                                {/* price */}
                                <h4 className='text-black'>
                                    {
                                        paid ? currencyFormatter({
                                            amount: price,
                                            currency: 'usd',
                                        }) : 'Free'
                                    }
                                </h4>
                            </>)
                            :
                            (<>
                                <p className='display-6 fw-bold lh-1 mb-3'>Welcome back!!</p>
                            </>)}
                    </div>

                    {/* course image and video */}
                    <div className='d-flex flex-column'>
                        {lessons[0].video && lessons[0].video.Location ? (
                            <div className='image-course'>
                                {/*<div*/}
                                {/*    onClick={() => {*/}
                                {/*        setPreview(lessons[0].video.Location)*/}
                                {/*        setShowModal(!showModal) // toggle modal*/}
                                {/*    }}*/}
                                {/*>*/}
                                <ReactPlayer
                                    className='p-1 squareFrame'
                                    url={lessons[0].video.Location}
                                    light={image.Location}
                                    controls
                                />
                                {/*</div>*/}
                            </div>
                        ) : (<>
                            <div className='image-course'>
                                {image && image.Location ?
                                    <Image src={image.Location}
                                           alt={name}
                                           className='p-1 squareFrame'
                                           preview={false}
                                    /> : <Image src='/images/americoders-course.png'
                                                alt={name}
                                                className='p-1 squareFrame'
                                    />
                                }
                            </div>
                        </>)
                        }

                        {/* enroll button */}
                        {loading ? <div className='d-flex justify-content-center'>
                            <LoadingOutlined className='h1 text-danger'/>
                        </div> : (
                            <Button
                                className='mb-3 mt-3'
                                type='danger'
                                block
                                shape='round'
                                icon={<SafetyOutlined/>}
                                size='large'
                                disabled={loading}
                                onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
                            >
                                {user
                                    ? enrolled.status
                                        ? 'Go to course'
                                        : 'Enroll'
                                    : 'Login to enroll'}
                            </Button>
                        )}
                    </div>

                </div>
            </div>
        </Content>
    </>)
}

export default SingleCourseHero