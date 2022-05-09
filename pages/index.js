import axios from 'axios'
import CourseCard from '../components/cards/CourseCard'

const Index = ({courses}) => {

    return (<>
        <main>
            <section className='py-5 text-center container'>
                <div className='row py-lg-5'>
                    <div className='col-lg-6 col-md-8 mx-auto'>
                        <h1 className='fw-light'>Home</h1>

                    </div>
                </div>
            </section>

            <div className='album py-5 bg-light'>
                <div className='container'>

                    <div className='row gap-3'>
                        <p className='lead'>
                            Welcome Home
                            <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
                                {courses.map((course) => (
                                        <div key={course._id}>
                                            <CourseCard course={course}/>
                                        </div>
                                    )
                                )}
                            </div>
                        </p>
                    </div>

                </div>
            </div>

        </main>
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