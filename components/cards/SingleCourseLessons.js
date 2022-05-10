import {Avatar, List} from 'antd'

const {Item} = List

const SingleCourseLessons = ({lessons, setPreview, setShowModal, showModal}) => {
    return (<>
        <div className='container'>
            <div className='row'>
                <div className='col lesson-list'>
                    {lessons && <h4>{lessons.length} Lessons</h4>}
                    <hr/>
                    <List
                        itemLayout='horizontal'
                        dataSource={lessons}
                        renderItem={(item, index) => (
                            <Item>
                                <Item.Meta
                                    avatar={<Avatar>{index + 1}</Avatar>}
                                    title={item.title}
                                >

                                </Item.Meta>
                            </Item>
                        )}
                    />
                </div>
            </div>
        </div>
    </>)
}

export default SingleCourseLessons