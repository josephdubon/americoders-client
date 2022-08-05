import axios from 'axios'
import {Col, Image, Row} from 'antd'
import Link from 'next/link'
import {PageHead} from '../components/head/PageHead'
import HeroSection from '../components/structure/HeroSection/HeroSection'
import FeatureSectionLeft from '../components/structure/FeatureSectionLeft/FeatureSectionLeft'
import FeatureSectionRight from '../components/structure/FeatureSectionRight/FeatureSectionRight'
// import CourseCard from '../components/cards/CourseCard'

const Index = ({courses}) => {

    const heroIntroContent = () => {
        return (<>
            We're a community enrichment program founded in the heart of the Biggest Little City
            in the World, Reno, Nevada.
            <br/>
            We believe education should be an experience to foster growth &
            advancements in STEM, Arts, & Mindfulness Development.
        </>)
    }

    const heroExtraContent = () => {
        return (<>
            <Row
                align={'middle'}
                justify={'center'}
            >
                <Col xs={24} sm={12} md={6}>
                    <Link href={'/#more-info'}><a>
                        <button type='button'
                                className='btn btn-primary btn-lg shadow px-4 my-2'>More Info
                        </button>
                    </a></Link>
                </Col>

                <Col xs={24} sm={12} md={6}>
                    <Link href={'/#course-list'}>
                        <a>
                            <button type='button'
                                    className='btn btn-outline-light btn-lg shadow px-4 my-2'>
                                Course Examples
                            </button>
                        </a>
                    </Link>
                </Col>
            </Row>
        </>)
    }

    const featuredContentLeft = () => {
        return (<>
            <p className='text-white fs-5 px-5'>
                We practice a sustained process of learning in which we can immerse ourselves in
                multiple disciplines, simultaneously.
                <br/>
                <br/>
                We engage in tailor-made projects that provoke students to instinctively ask complex
                questions all while gaining real-world problem solving
                experience in a monitored environment.
            </p>

            <Col xs={22} sm={18} className='mx-auto m-5'>
                <p className='text-white text-center w-100'>
                    "Participating in project based learning with Americoders brought out a creative and problem
                    solving side of me that I didn't even know existed! I feel I have the tools to become a great
                    problem solver and thinker."
                    - Ennio D, Age 10
                </p>
            </Col>
        </>)
    }

    const featuredContentRight = () => {
        return (<>
            <p className='text-white text-end fs-5 px-5'>
                We must connect meaning with our actions. We hear modern terms but they are offered with
                no explanation of what they mean.
                <br/>
                <br/>
                Then we are left with assumptions and stereotypes. These create patterns and patterns turn into habits.
                Our habits determine our future. Join us as we educate and adapt to understand and break negative
                stereotypes, destroy assumptions, and replace them all with verified knowledge.
                <br/>
                <br/>
                We begin our project/workshop adventures with five minutes of breathing-exercise and guided-meditation.
            </p>
        </>)
    }

    const featuredContentLeft_2 = () => {
        return (<>
            <p className='text-white fs-5 px-5'>
                We can develop a natural state of dignity, pride, and restore our sense of significance in our community
                of Reno, NV. We hear about how we are becoming a 'tech-city' but we will be left behind unless we become
                'tech-citizens'.
                <br/>
                <br/>
                Having a shared cause provides us with a sense of momentum and purpose. Let's experience and explore
                amazing new possibilities in this awesome new world while advancing and leveling up our knowledge as a
                community.
                <br/>
                <br/>
                Don't we deserve the opportunity to learn the knowledge to benefit in this digital world? Yes, we do!
                And so do our children.
            </p>
        </>)
    }

    return (<>
        <PageHead title={'Home'}/>

        <HeroSection
            heroImageUrl={'/images/branding/bg/americoders-classroom-studying-problem-solving.jpg'}
            heroTitle={'Americoders'}
            heroSubTitle={'educate - evolve - adapt - thrive'}
            heroIntro={heroIntroContent()}
            heroExtraContent={heroExtraContent()}
        />

        <div id='more-info'>
            <FeatureSectionLeft
                featuredImage={'/images/branding/misc/americoders-robotics-project-student.jpg'}
                featuredTitle={'Project Based Learning'}
                featuredContent={featuredContentLeft()}
            />

            <FeatureSectionRight
                featuredImage={'/images/branding/misc/americoders-mom-daughter-team-meditation.jpg'}
                featuredTitle={'Mindfulness Awareness'}
                featuredContent={featuredContentRight()}
            />

            <FeatureSectionLeft
                featuredImage={'/images/branding/misc/americoders-kids-community-friends.jpg'}
                featuredTitle={'Community Building'}
                featuredContent={featuredContentLeft_2()}
            />
        </div>

        {/* course and project album section */}
        <Row align={'middle'} justify={'center'} className='py-5 container text-white text-center'>
            {/* title area */}
            <Col xs={24} id='course-list'>
                <div className={'px-3'}>
                    <h2 className='py-3 text-white'>Course and Project Examples</h2>
                    <p className='fw-bold'>
                        Let's level-up by creating some cool games and projects!
                    </p>
                </div>
            </Col>

            {/* courses list */}
            <Row align={'middle'} justify={'center'}>
                {/* loop through the published courses */}
                {/*{courses.map((course) => (*/}
                {/*        <Col key={course._id}>*/}
                {/*            <CourseCard course={course}/>*/}
                {/*        </Col>*/}
                {/*    )*/}
                {/*)}*/}
                {/* end loop */}

                <Col xs={24} md={8} lg={8} className='m-5'>
                    <Image
                        preview={false}
                        src='/images/branding/misc/americoders-scratch-game.jpg'
                        alt='Americoders'
                        className='bg-body rounded-3 p-3'
                        loading='lazy'
                    />
                    <p className='lead text-white text-center'>Introduction to Coding</p>
                </Col>

                <Col xs={24} md={8} lg={8} className='m-5'>
                    <Image
                        preview={false}
                        src='/images/branding/misc/americoders-kids-game-happy.jpg'
                        alt='Americoders'
                        className='bg-body rounded-3 p-3'
                        loading='lazy'
                    />
                    <p className='lead text-white text-center'>Internet Safety</p>
                </Col>

                <Col xs={24} md={8} lg={8} className='m-5'>
                    <Image
                        preview={false}
                        src='/images/branding/misc/americoders-old-school-game.jpg'
                        alt='Americoders'
                        className='bg-body rounded-3 p-3'
                        loading='lazy'
                    />
                    <p className='lead text-white text-center'>Game Development</p>
                </Col>

                <Col xs={24} md={8} lg={8} className='m-5'>
                    <Image
                        preview={false}
                        src='/images/branding/misc/americoders-technology-unplugged.jpg'
                        alt='Americoders'
                        className='bg-body rounded-3 p-3'
                        loading='lazy'
                    />
                    <p className='lead text-white text-center'>Technology Unplugged</p>
                </Col>

                <Col xs={24} md={8} lg={8} className='m-5'>
                    <Image
                        preview={false}
                        src='/images/branding/misc/americoders-teen-coding.jpg'
                        alt='Americoders'
                        className='bg-body rounded-3 p-3'
                        loading='lazy'
                    />
                    <p className='lead text-white text-center'>Create a Projects Portfolio</p>
                </Col>

                <Col xs={24} md={8} className='m-5'>
                    <Image
                        preview={false}
                        src='/images/branding/misc/americoders-teen-3d-printing.jpg'
                        alt='Americoders'
                        className='bg-body rounded-3 p-3'
                        loading='lazy'
                    />
                    <p className='lead text-white text-center'>Hardware Breakdown/Fixes</p>
                </Col>
            </Row>
        </Row>

        {/* mailing list */}
        <Row align={'middle'} justify={'center'} className='py-5 container-fluid bg-light'>
            {/* title area */}
            <Col xs={24} md={20} lg={24} id='course-list'>
                <section className='text-center'>
                        <span className='fs-5 text-muted ls-md text-uppercase'>
                                technology education - arts - mindfulness
                            </span>
                    <h1 className='fw-bold text-black lh-1 mt-2 mb-3'>
                        Join our mailing list
                    </h1>

                    <p className='text-black-50 mb-6 fs-6'>
                        Stay up to date with the news and latest courses + lessons.
                    </p>

                    {/* mailing list */}
                    <MailingListForm className={'bg-light'}/>
                </section>
            </Col>
        </Row>

        {/* features title section */}
        <Row align={'middle'} justify={'center'} className='container py-5'>
            {/* brand title area */}
            <Col xs={24}>
                <div className='px-3 text-center'>
                    <h2 className='py-3 text-white'>Program Starting End of Summer 2022...</h2>
                    <p className='text-light fw-bolder'>Age groups:{' '}
                        <span className='text-light'>7 - 9</span>{' | '}
                        <span className='text-light'>10 - 13</span>{' | '}
                        <span className='text-light'>14 - 17</span>{' | '}
                        <span className='text-light'>18 - 20</span>{' | '}
                        <span className='text-light'>21 +</span>
                    </p>
                    <p className='text-light'>
                        Join our community as we educate, evolve, and adapt to this new world.
                        <br/>
                        Learn to code, create, live, and prosper in this new digital era while
                        <br/>
                        keeping intact the ethics and traditions of our old-world.
                    </p>
                    <p className='text-light'>
                        Please <a href='mailto:scholarships@americoders.org'>email us here</a> to inquire
                        about
                        scholarships and sponsorships.
                    </p>
                </div>
            </Col>

            {/*/!* pricing model row section *!/*/}
            {/*<Row align={'middle'} justify={'center'}>*/}
            {/*    /!* features col 1/3 *!/*/}
            {/*    <Col xs={24} sm={12}>*/}
            {/*        /!* pro tier *!/*/}
            {/*        <div style={{width: '100%'}}*/}
            {/*             className='card mb-4 rounded-3 shadow-sm border text-center'>*/}
            {/*            <div className='card-header py-3'>*/}
            {/*                <h4 className='my-0 fw-normal'>Community</h4>*/}
            {/*            </div>*/}
            {/*            <div className='card-body'>*/}
            {/*                <h1 className='card-title pricing-card-title'>$0<small*/}
            {/*                    className='text-muted fw-light'>/mo</small></h1>*/}
            {/*                <ul className='list-unstyled mt-3 mb-4'>*/}
            {/*                    <li>Child + Parent Participation</li>*/}
            {/*                    <li>Attendance to Online, Public Events</li>*/}
            {/*                    <li>Can Purchase Workshop/Course</li>*/}
            {/*                    <br/>*/}
            {/*                    <li>'Hour of Code' Events</li>*/}
            {/*                    <li>Access to Free Courses on Web App</li>*/}
            {/*                    <li>Email support</li>*/}
            {/*                </ul>*/}
            {/*                <Link href={'/register'}>*/}
            {/*                    <a>*/}
            {/*                        <button type='button' className='w-100 btn btn-md btn-outline-primary'>*/}
            {/*                            Registration Open*/}
            {/*                        </button>*/}
            {/*                    </a>*/}
            {/*                </Link>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </Col>*/}

            {/*    /!* features col 2/3 *!/*/}
            {/*    <Col xs={24} sm={12}>*/}
            {/*        /!* pro tier *!/*/}
            {/*        <div style={{width: '100%'}}*/}
            {/*             className='card mb-4 rounded-3 shadow-sm border text-center'>*/}
            {/*            <div className='card-header py-3'>*/}
            {/*                <h4 className='my-0 fw-normal'>Professional</h4>*/}
            {/*            </div>*/}
            {/*            <div className='card-body'>*/}
            {/*                <h1 className='card-title pricing-card-title'>$149<small*/}
            {/*                    className='text-muted fw-light'>/mo</small></h1>*/}
            {/*                <ul className='list-unstyled mt-3 mb-4'>*/}
            {/*                    <li>Child + Parent Participation</li>*/}
            {/*                    <li>2x in-person workshop per month</li>*/}
            {/*                    <br/>*/}
            {/*                    <li>Access to online workshops/courses.</li>*/}
            {/*                    <li>Hour of Code Events, Special Access</li>*/}
            {/*                    <li>Priority email support</li>*/}
            {/*                    <li>Help center access</li>*/}
            {/*                </ul>*/}
            {/*                <a>*/}
            {/*                    <button type='button' className='w-100 btn btn-sm btn-primary'>*/}
            {/*                        Registration Opening Soon*/}
            {/*                    </button>*/}
            {/*                </a>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </Col>*/}

            {/*</Row>*/}
        </Row>
    </>)
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