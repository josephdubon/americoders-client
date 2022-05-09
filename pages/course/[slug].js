import axios from 'axios'
import {useRouter} from 'next/router'

const SingleCourse = ({course}) => {
// state
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState('')

    const router = useRouter()
    const {slug} = router.query

    return (<>
        <div className='container-fluid'>
            <div className='row'>
                <pre>{JSON.stringify(course, null, 4)}</pre>
            </div>
        </div>
    </>)
}

export async function getServerSideProps({query}) {
    console.log(query)
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}`)

    return {
        props: {
            course: data,
        }
    }
}

export default SingleCourse