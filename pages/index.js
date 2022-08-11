import axios from 'axios'
import {Col, Image, Row} from 'antd'
import Link from 'next/link'
import {PageHead} from '../components/head/PageHead'
import HeroSection from '../components/structure/HeroSection/HeroSection'
import FeatureSectionLeft from '../components/structure/FeatureSectionLeft/FeatureSectionLeft'
import FeatureSectionRight from '../components/structure/FeatureSectionRight/FeatureSectionRight'
import CallToAction from '../components/banners/CallToAction'
import MailingListForm from '../components/forms/MailingListForm'
import CallToActionImage from '../components/banners/CallToActionImage'
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

    const ctaProgramStart = () => {
        return (<>
            Join our community as we educate, evolve, and adapt to this new world.
            Learn to code, create, live, and prosper in this new digital era while
            keeping intact the ethics and traditions of our old-world.
        </>)
    }

    const customFormElement = () => {
        return (<>
            <MailingListForm className={'bg-dark'}/>
        </>)
    }

    const ctaButtonContent = () => {
        return (<>
            <Row
                align={'middle'}
                justify={'center'}
                className={'text-center'}
            >
                <Col xs={24}>
                    {/*<Link href={'/#more-info'}><a>*/}
                    <button type='button'
                            className='btn btn-secondary btn-lg shadow px-4 my-2'>
                        Registration Opening Soon!!
                    </button>
                    {/*</a></Link>*/}
                </Col>
            </Row>
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
        <CallToAction
            subTitle={'TECHNOLOGY, ARTS, MINDFULNESS EDUCATION'}
            mainTitle={'Join Our Mailing List'}
            subTitle2={'Stay up to date with the news and latest courses + lessons.'}
            formElement={customFormElement()}
        />

        {/* sign up for next cohort */}
        <CallToActionImage
            featuredImage={'/images/branding/misc/americoders-kids-laptop-fun.jpg'}
            subTitle={'Program Starting'}
            mainTitle={'Fall Semester 2022'}
            subTitle2={ctaProgramStart()}
            ctaButtons={ctaButtonContent()}

        />
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