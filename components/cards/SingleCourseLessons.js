import { Avatar, Layout, List } from 'antd'

const { Content } = Layout
const { Item } = List

const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
}) => {
  return (<>
    <Content className="rounded-3 mt-3 hero-section">
      <div className="container px-4 py-5 mb-5 lessons-list text-white">
        {lessons && <h4 className="text-white">{lessons.length} Lessons</h4>}
        <hr/>
        <div className="lessons-list">
          <List
            itemLayout="horizontal"
            dataSource={lessons}
            className="text-white"
            renderItem={(item, index) => (
              <Item>
                <Item.Meta
                  avatar={<Avatar>{index + 1}</Avatar>}
                  title={item.title}
                />
                {item.video && true && item.free_preview && (
                  <span
                    role="button"
                    className="text-primary"
                    onClick={() => {
                      setPreview(item.video.Location)
                      setShowModal(!showModal)
                    }}
                  >
                    Preview
                  </span>
                )}
              </Item>
            )}
          />

        </div>
      </div>
    </Content>
  </>)
}

export default SingleCourseLessons
