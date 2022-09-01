import { Button, Space } from 'antd'
import Link from 'next/link'

const LessonsNav = ({ showDrawer }) => {
  return (<>
    {/* top drawer lesson menu */}
    <Space className="d-flex justify-content-center bg-light">
      {/* lessons menu link */}
      <Button
        type="primary"
        onClick={showDrawer}
        className="mt-3 btn-block mb-3 text-white">
        Lessons Menu
      </Button>

      {/* dashboard link */}
      <Link href={'/user'}>
        <a>
          <Button
            className="mt-3 btn-block mb-3"
          >
            Back to Dashboard
          </Button>
        </a>
      </Link>
    </Space>
  </>)
}

export default LessonsNav