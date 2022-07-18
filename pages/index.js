import axios from 'axios'
import {Col, Layout, Row} from 'antd'
import Link from 'next/link'
import Image from 'next/image'
import MailingListForm from '../components/forms/MailingListForm'
import CourseCard from '../components/cards/CourseCard'

const {Content} = Layout

const Index = ({courses}) => {


    return (<>
            {/* page title */}
            <Row align={'middle'} justify={'center'}>
                {/* brand title area */}
                <Col xs={22} md={20} lg={22}>
                    <div className='title-large '>
                        <h1 className='fw-bold text-white title-large lh-1 mb-3'>
                            AMERICODERS
                        </h1>
                    </div>
                </Col>
            </Row>

            {/* hero section */}
            <Row align={'middle'} justify={'center'} gutter={12} className='my-5'>
                {/* hero col 1/2 */}
                <Col xs={22} lg={10} xl={11}>
                    <p className='description-large bg-text text-center'>
                        Hello friends and welcome to our web-app!
                        <br/>
                        <br/>
                        We’re a community enrichment program in Reno, NV.
                        <br/>
                        We believe education should be an experience to foster growth
                        <br/>
                        & development in STEM, Arts & Mindfulness Development.
                    </p>

                    {/* buttons */}
                    <Row align={'middle'} justify={'center'} gutter={12}>
                        <Col xs={22} lg={8}>
                            <Link href={'/register'}>
                                <a>
                                    <button type='button'
                                            className='btn btn-primary w-100 btn-lg px-4 me-md-2'>Register
                                    </button>
                                </a>
                            </Link>
                        </Col>

                        <Col xs={22} lg={8}>
                            <Link href={'/#course-list'}>
                                <a>
                                    <button type='button'
                                            className='btn btn-outline-secondary w-100 btn-lg px-4'>Course
                                        List
                                    </button>
                                </a>
                            </Link>
                        </Col>
                    </Row>
                </Col>

                {/* hero col 2/2 */}
                <Col xs={22} lg={10} xl={11}>
                    <div style={{height: '300px'}}>
                        <Image
                            src='/images/branding/americoders-community-diversity.png'
                            alt='Americoders'
                            layout={'fill'}
                            className='imageFit'
                            loading='lazy'
                            preview={false}
                        />
                    </div>
                </Col>
            </Row>

            {/* features section */}
            <Content className='bg-body'>
                <div className='container px-4 py-5' id='more-info'>
                    <h2 className='pb-2 border-bottom'>What do we do?</h2>
                    <div className='row g-4 py-5 row-cols-1 row-cols-lg-3'>
                        <div className='feature col'>
                            <div className='feature-icon bg-primary bg-gradient'>
                                <svg className='bi' width='1em' height='1em'>
                                </svg>
                            </div>

                            {/* first col */}
                            <h2>Project Based Learning</h2>
                            <p>
                                Positive examples of success. You know the feeling you get when
                                you have built something great from the ground up? Or the excitement when you finally
                                learn something good enough that you can 'humble brag'? Do you know what it's like to
                                solve a puzzle?</p>
                            <p>
                                Maybe you do, maybe you don't! Either way, we all deserve to feel that way, don't you
                                agree? We can learn and master new skills while enjoying the time spent with the
                                experience of trying something new.</p>

                            <p className=' fw-bold'>
                                Projects: <br/>
                                Websites | Apps | Games | Puzzles | Hardware Hacking
                            </p>
                        </div>

                        {/* second col */}
                        <div className='feature col'>
                            <div className='feature-icon bg-primary bg-gradient'>
                                <svg className='bi' width='1em' height='1em'>
                                </svg>
                            </div>
                            <h2>Mindfulness Awareness</h2>
                            <p>
                                We must connect meaning with our actions. We hear modern terms but they are offered with
                                no explanation of what they mean. Then we are left with assumptions and stereotypes.
                                These create patterns and patterns turn into habits.
                            </p>
                            <p>
                                Our habits determine our future. We have the option to not only survive but thrive in
                                the coming future.
                            </p>
                            <p>
                                There are many useful skills that our kids (and ourselves) can learn
                                to get ahead in life, but few are as flexible and fun as the ability to code.
                            </p>
                        </div>

                        {/* third col */}
                        <div className='feature col'>
                            <div className='feature-icon bg-primary bg-gradient'>
                                <svg className='bi' width='1em' height='1em'>
                                </svg>
                            </div>
                            <h2>Community Building</h2>
                            <p>
                                Community building can develop a sense of dignity, and restore our sense of
                                significance and relevance in our beautiful city of Reno, Nevada. Having a shared cause
                                provides us with a sense of momentum and purpose.
                            </p>
                            <p className=' fw-bold'>
                                Don't you want to experience and explore amazing new possibilities in this awesome new
                                world?
                            </p>
                            <p>
                                Wouldn't it be better if we experienced this and grew as a community/society?
                            </p>

                        </div>
                    </div>
                </div>
            </Content>

            {/* course and project album section */}
            <Content>
                <section className='py-5 text-center container' id='course-list'>
                    <div className='row py-lg-5'>
                        <div className='col-lg-6 col-md-8 mx-auto'>
                            <h1 className='text-white'>Course and Project Examples</h1>
                            <p className='lead text-white'>
                                As predicted from years before, computer science and coding has progressed from a hobby
                                to a critical career skill.
                            </p>
                            <p className='lead text-white fw-bold'>
                                Let's level-up by building some cool games and useful
                                projects!
                            </p>
                        </div>
                    </div>
                </section>
                <div className='album pb-5'>
                    <div className='container'>
                        <div
                            className='row justify-content-center align-content-center text-center row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>

                            {/* loop through the published courses */}
                            {courses.map((course) => (
                                    <div key={course._id}>
                                        <CourseCard course={course}/>
                                    </div>
                                )
                            )}
                            {/* end loop */}

                            {/*<div style={{height: '25px'}}>*/}
                            {/*    <Image*/}
                            {/*        layout='fill'*/}
                            {/*        className='imageFit'*/}
                            {/*        src='/images/branding/bg-images/americoders-kids-game-happy.jpg'*/}
                            {/*        alt='Americoders'*/}
                            {/*        loading='lazy'*/}
                            {/*        preview={false}*/}
                            {/*    />*/}
                            {/*    <p className='lead text-white'>Internet Safety for Kids</p>*/}
                            {/*</div>*/}
                            {/*<div style={{height: '25px'}}>*/}
                            {/*    <Image*/}
                            {/*        layout='fill'*/}
                            {/*        className='imageFit'*/}
                            {/*        src='/images/branding/bg-images/americoders-scratch-game.jpg'*/}
                            {/*        alt='Americoders'*/}
                            {/*        loading='lazy'*/}
                            {/*        preview={false}*/}
                            {/*    />*/}
                            {/*    <p className='lead text-white'>Scratch/Scratch Junior - Introduction</p>*/}
                            {/*</div>*/}
                            {/*<div style={{height: '25px'}}>*/}
                            {/*    <Image*/}
                            {/*        layout='fill'*/}
                            {/*        className='imageFit'*/}
                            {/*        src='/images/branding/bg-images/americoders-old-school-game.jpg'*/}
                            {/*        alt='Americoders'*/}
                            {/*        loading='lazy'*/}
                            {/*        preview={false}*/}
                            {/*    />*/}
                            {/*    <p className='lead text-white'>Old-School Game Creation - Introduction</p>*/}

                            {/*</div>*/}
                            {/*<div style={{height: '25px'}}>*/}
                            {/*    <Image*/}
                            {/*        layout='fill'*/}
                            {/*        className='imageFit'*/}
                            {/*        src='/images/branding/bg-images/americoders-technology-unplugged.jpg'*/}
                            {/*        alt='Americoders'*/}
                            {/*        loading='lazy'*/}
                            {/*        preview={false}*/}
                            {/*    />*/}
                            {/*    <p className='lead text-white'>Technology Unplugged - Introduction</p>*/}
                            {/*</div>*/}
                            {/*<div style={{height: '25px'}}>*/}
                            {/*    <Image*/}
                            {/*        layout='fill'*/}
                            {/*        className='imageFit'*/}
                            {/*        src='/images/branding/bg-images/americoders-teen-coding.jpg'*/}
                            {/*        alt='Americoders'*/}
                            {/*        loading='lazy'*/}
                            {/*        preview={false}*/}
                            {/*    />*/}
                            {/*    <p className='lead text-white'>Create Your First Website/Projects Portfolio</p>*/}

                            {/*</div>*/}
                            {/*<div style={{height: '25px'}}>*/}
                            {/*    <Image*/}
                            {/*        layout='fill'*/}
                            {/*        className='imageFit'*/}
                            {/*        src='/images/branding/bg-images/americoders-teen-3d-printing.jpg    '*/}
                            {/*        alt='Americoders'*/}
                            {/*        loading='lazy'*/}
                            {/*        preview={false}*/}
                            {/*    />*/}
                            {/*    <p className='lead text-white'>Intro to 3D Modeling/3D Printing - Introduction</p>*/}

                            {/*</div>*/}

                        </div>
                    </div>
                </div>
            </Content>

            {/* mailing list */}
            <Content className='bg-body'>
                <div className='container px-4 py-5'>
                    <div className='row py-lg-5 text-center'>
                        <div className='col-lg-6 col-md-12 mx-auto'>
                            <span className='lead fs-5 text-muted ls-md text-uppercase fw-semi-bold'>
                                computer science - mindfulness - life skills
                            </span>

                            <h1 className='fw-bold text-black lh-1 mt-2 mb-3'>
                                Join our mailing list
                            </h1>

                            <p className='lead text-black-50 px-lg-8 mb-6'>
                                Stay up to date with the news and latest courses + lessons.
                            </p>

                            {/* mailing list */}
                            <MailingListForm/>
                        </div>
                    </div>
                </div>
            </Content>

            {/* pricing model section */}
            <Content>
                {/* pricing model */}
                <div className='container px-4 py-5' id='featured-3'>
                    <h2 className='text-light pb-2 border-bottom'>Pricing Model</h2>
                    <p className='text-light fw-bolder'>Age groups:{' '}
                        <span className='text-light'>7 - 9</span>{' | '}
                        <span className='text-light'>10 - 13</span>{' | '}
                        <span className='text-light'>14 - 17</span>
                    </p>
                    <div className='row g-4 py-5 row-cols-1 text-center'>
                        <p className='text-light'>
                            Join our community as we educate, evolve, and adapt to this new world.
                            <br/>
                            Learn to code,
                            create,
                            live, and prosper in this new digital era while keeping intact the ethics and traditions of
                            our
                            old-world.
                        </p>
                        <p className='text-light'>
                            Please <a href='mailto:scholarships@americoders.org'>email us here</a> to inquire about
                            scholarships and sponsorships.
                        </p>
                    </div>

                    <div className='row g-4 py-5 row-cols-1 row-cols-lg-3 text-center'>

                        {/* free tier */}
                        <div className='col'>
                            <div className='card mb-4 rounded-3 shadow-sm'>
                                <div className='card-header py-3'>
                                    <h4 className='my-0 fw-normal'>Free</h4>
                                </div>
                                <div className='card-body'>
                                    <h1 className='card-title pricing-card-title'>$0<small
                                        className='text-muted fw-light'>/mo</small></h1>
                                    <ul className='list-unstyled mt-3 mb-4'>
                                        <li>Child + Parent Participation</li>
                                        <li>Attendance to Speakers and Public Events</li>
                                        <li>Can Purchase Workshop/Course 'A La Carte'</li>
                                        <br/>
                                        <li>'Hour of Code' Events</li>
                                        <li>Access to Free Courses on Web App</li>
                                        <li>Email support</li>
                                    </ul>
                                    <Link href={'/register'}>
                                        <a>
                                            <button type='button' className='w-100 btn btn-md btn-outline-primary'>
                                                Registration Open
                                            </button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* pro tier */}
                        <div className='col'>
                            <div className='card mb-4 rounded-3 shadow-sm'>
                                <div className='card-header py-3'>
                                    <h4 className='my-0 fw-normal'>Pro</h4>
                                </div>
                                <div className='card-body'>
                                    <h1 className='card-title pricing-card-title'>$149<small
                                        className='text-muted fw-light'>/mo</small></h1>
                                    <ul className='list-unstyled mt-3 mb-4'>
                                        <li>Child + Parent Participation</li>
                                        <li>2x in-person workshop per month</li>
                                        <br/>
                                        <li>Access to online workshops/courses.</li>
                                        <li>Hour of Code Events, Special Access</li>
                                        <li>Priority email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <a>
                                        <button type='button' className='w-100 btn btn-md btn-danger'>
                                            Registration Opening Soon
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* enterprise tier */}
                        <div className='col'>
                            <div className='card mb-4 rounded-3 shadow-sm border-danger'>
                                <div className='card-header py-3 text-white bg-danger border-danger'>
                                    <h4 className='my-0 fw-normal text-light'>Enterprise</h4>
                                </div>
                                <div className='card-body'>
                                    <h1 className='card-title pricing-card-title'>$225<small
                                        className='text-muted fw-light'>/mo</small></h1>
                                    <ul className='list-unstyled mt-3 mb-4'>
                                        <li>Child + Parent Participation</li>
                                        <li>4x in-person workshop per month</li>
                                        <br/>
                                        <li>Access to online workshops/courses.</li>
                                        <li>Hour of Code Events, Special Access</li>
                                        <li>Priority Phone and email support</li>
                                        <li>Help center access</li>
                                    </ul>
                                    <a>
                                        <button type='button' className='w-100 btn btn-md btn-danger'>
                                            Registration Opening Soon
                                        </button>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </Content>
        </>
    )
}

export async function getServerSideProps() {
    // collect courses data
    const {data} = await axios.get(`${process.env.API}/courses`) // full path of server here

    return {
        props: {
            courses: data // return data as props
        }
    }
}

export default Index