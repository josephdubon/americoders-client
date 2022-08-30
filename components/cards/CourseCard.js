import {Badge, Card} from 'antd'
import Link from 'next/link'
import {currencyFormatter} from '../../utils/helpers'

const {Meta} = Card

const CourseCard = ({course}) => {
    // destructure course values
    const {name, instructor, price, image, slug, paid, category} = course

    return (
        <Link href={`/course/${slug}`}>
            <a>
                <Card
                    className='mb-4'
                    cover={image && image.Location ?
                        <img src={image.Location}
                             alt={name}
                             style={{height: '240px', objectFit: 'cover'}}
                             className='p-1'
                        /> : <img src='/images/americoders-course.png'
                                  alt={name}
                                  style={{height: '240px', objectFit: 'cover'}}
                                  className='p-1'
                        />}>
                    <h2 className='fw-bold'>{name}</h2>
                    <p>by {instructor && instructor.name}</p>
                    <Badge
                        count={category}
                        style={{backgroundColor: '#03a9f4'}}
                        className='pb-2 mr-2'
                    />
                    <h4 className='pt-2'>{paid ? currencyFormatter({
                        amount: price,
                        currency: 'usd',
                    }) : 'Free'}</h4>
                </Card>
            </a>
        </Link>
    )
}

export default CourseCard