import axios from 'axios'
import {Image, Layout} from 'antd'
import Link from 'next/link'

const {Header, Content, Footer} = Layout

const Index = ({courses}) => {


    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    }


    return (<>
            {/* hero section */}
            <Content className='bg-light'>
                <div className='container col-xxl-8 px-4 py-5'>
                    <div className='row flex-lg-row-reverse align-items-center justify-content-center g-5 py-5'>
                        <div className='col-10 col-sm-8 col-lg-6'>
                            <Image
                                src='/images/branding/bg-images/americoders-kids-laptop-fun.jpg'
                                alt='Americoders'
                                loading='lazy'
                                preview={false}
                            />
                        </div>
                        <div className='col-lg-6'>
                            <h1 className='display-5 fw-bold lh-1 mb-3'>AMERICODERS</h1>
                            <p className='lead text-muted'>
                                Hello friend,
                                <br/>
                                <br/>
                                Welcome to the <strong>Americoders</strong> web-app. We are an online
                                learning platform dedicated to the advancement and technological development of the
                                peoples of our community.
                            </p>
                            <p className='lead text-muted'>
                                <strong>Americoders</strong> is for anyone of any age that wants to
                                learn skills that will lead to the betterment of not only your life but the lives of
                                everyone around you. We can do this by understanding the time we live in as well as
                                magnifying our ability to see opportunity in this new age.
                            </p>
                            {/* buttons */}
                            <div className='d-grid gap-2 d-md-flex justify-content-md-start'>
                                <Link href='/register'>
                                    <a>

                                        <button type='button' className='btn btn-primary btn-lg px-4 me-md-2'>Register
                                        </button>
                                    </a>
                                </Link>

                                <Link href='/#more-info'>
                                    <a>
                                        <button type='button' className='btn btn-outline-secondary btn-lg px-4'>More
                                            Info
                                        </button>
                                    </a>
                                </Link>

                                <Link href='/#course-list'>
                                    <a>
                                        <button type='button' className='btn btn-outline-secondary btn-lg px-4'>Course
                                            List
                                        </button>
                                    </a>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </Content>

            {/* features section */}
            <Content>
                <div className='container px-4 py-5' id='more-info'>
                    <h2 className='text-light pb-2 border-bottom'>What do we do?</h2>
                    <div className='row g-4 py-5 row-cols-1 row-cols-lg-3'>
                        <div className='feature col'>
                            <div className='feature-icon bg-primary bg-gradient'>
                                <svg className='bi' width='1em' height='1em'>
                                </svg>
                            </div>

                            <h2 className='text-light'>Project Based Learning</h2>
                            <p className='text-light'>
                                Positive examples of success. You know the feeling you get when
                                you have built something great from the ground up? Or the excitement when you finally
                                learn something good enough that you can 'humble brag'? Do you know what it's like to
                                solve a puzzle?</p>
                            <p className='text-light'>
                                Maybe you do, maybe you don't! Either way, we all deserve to feel that way, don't you
                                agree? We can learn and master new skills while enjoying the time spent with the
                                experience of trying something new.</p>

                            <p className='text-light fw-bold'>
                                Projects: <br/>
                                Websites | Apps | Games | Puzzles | Hardware Hacking
                            </p>
                        </div>
                        <div className='feature col'>
                            <div className='feature-icon bg-primary bg-gradient'>
                                <svg className='bi' width='1em' height='1em'>
                                </svg>
                            </div>

                            <h2 className='text-light'>Mindfulness Awareness</h2>
                            <p className='text-light'>
                                We must connect meaning with our actions. We hear modern terms but they are offered with
                                no explanation of what they mean. Then we are left with assumptions and stereotypes.
                                These create patterns and patterns turn into habits.
                            </p>
                            <p className='text-light'>
                                Our habits determine our future. We have the option to not only survive but thrive in
                                the coming future. We might not notice it right away -but we are living in and
                                experiencing something really special.
                            </p>
                            <p className='text-light fw-bold'>
                                Technological advancements are emerging and
                                blooming in front of our very eyes.
                            </p>
                        </div>

                        <div className='feature col'>
                            <div className='feature-icon bg-primary bg-gradient'>
                                <svg className='bi' width='1em' height='1em'>
                                </svg>
                            </div>
                            <h2 className='text-light'>Break Assumptions</h2>
                            <p className='text-light'>
                                What is balance? What is the digital-age? Web3? Blockchain? Is the
                                right approach to keep ourselves and children away from modern gadgets? No!
                            </p>

                            <p className='text-light'>
                                The correct answer is to educate ourselves, we must adapt with a logical
                                digital-approach.

                                To put this knowledge and skill forward to witness and participate in
                                the new opportunities the present and future offer us.
                            </p>
                            <p className='text-light fw-bold'>
                                Don't you want to experience and explore amazing new possibilities in this awesome new
                                world?
                            </p>

                        </div>
                    </div>
                </div>
            </Content>

            {/* course album section */}
            <Content className='bg-light'>
                <section className='py-5 text-center container'>
                    <div className='row py-lg-5'>
                        <div className='col-lg-6 col-md-8 mx-auto'>
                            <h1 className='fw-light'>Course and Project Examples</h1>
                            <p className='lead text-muted'>
                                As predicted from years before computer science and coding has progressed from a hobby
                                to a critical career skill.
                            </p>
                            <p className='lead text-muted fw-bold'>
                                Let's level-up by building some cool games and useful
                                projects!
                            </p>
                        </div>
                    </div>
                </section>
                <div className='album pb-5'>
                    <div className='container'>

                        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>

                            {/* loop through the published courses */}
                            {courses.map((course) => (
                                    <div key={course._id}>
                                        <CourseCard course={course}/>
                                    </div>
                                )
                            )}


                        </div>
                    </div>
                </div>
            </Content>

            <Content>
                {/* pricing model */}
                <div className='container px-4 py-5' id='featured-3'>
                    <h2 className='text-light pb-2 border-bottom'>Pricing Model</h2>
                    <p className='text-light fw-bolder'>Age groups:{' '}
                        <span className='text-light'>7 - 9</span>{' | '}
                        <span className='text-light'>10 - 13</span>{' | '}
                        <span className='text-light'>14 - 17</span>
                    </p>
                    <div className='row g-4 py-5 row-cols-1'>
                        <p className='lead text-light'>
                            Join our community as we educate, evolve, and adapt to this new world.
                            <br/>
                            Learn to code,
                            create,
                            live, and prosper in this new digital era while keeping intact the ethics and traditions of
                            our
                            old-world.
                        </p>
                        <p className='lead text-light'>
                            Please <a href='mailto:scholarships@americoders.org'>email us here</a> to inquire about
                            scholarships and sponsorships.
                        </p>

                    </div>
                    <div className='row g-4 py-5 row-cols-1 row-cols-lg-3 text-center'>

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
                                        <li>Can Purchase Workshop/Course <strong>'Å La Carte'</strong></li>
                                        <br/>
                                        <li>'Hour of Code' Events</li>
                                        <li>Free Courses Access on Web App</li>
                                        <li>Email support</li>
                                    </ul>
                                    <Link href='/register'>
                                        <a>
                                            <button type='button' className='w-100 btn btn-lg btn-outline-danger'>
                                                Registration Opening Soon
                                            </button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
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
                                    <Link href='/register'>
                                        <a>
                                            <button type='button' className='w-100 btn btn-lg btn-danger'>
                                                Registration Opening Soon
                                            </button>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
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
                                    <Link href='/register'>
                                        <a>
                                            <button type='button' className='w-100 btn btn-lg btn-danger'>
                                                Registration Opening Soon
                                            </button>
                                        </a>
                                    </Link>
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