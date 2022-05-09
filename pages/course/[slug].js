import axios from 'axios'
import {useRouter} from 'next/router'
import {Badge, Col, Image} from 'antd'
import {currencyFormatter} from '../../utils/currency'
import ReactPlayer from 'react-player'
import {useState} from 'react'

const SingleCourse = ({course}) => {
// state
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState('')

    const router = useRouter()
    const {slug} = router.query

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
        <div className='container-fluid'>
            <div className='row'>
                <pre>{JSON.stringify(course, null, 4)}</pre>
            </div>
        </div>
    </>)
}

export async function getServerSideProps({query}) {
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}`)

    return {
        props: {
            course: data,
        }
    }
}

export default SingleCourse