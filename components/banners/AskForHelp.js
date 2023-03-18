import { Layout } from 'antd'

const { Content } = Layout

const AskForHelp = () => {
  return (
    <>
      {/* description col*/}
      <Content className="rounded-3 mt-3 hero-section">
        <div className="container-fluid px-4 py-5 mb-5">
          <h2 className="lead title-large">
            Are you stuck or getting frustrated?
          </h2>
          <p className="text-white text-center lead fs-4">
            Pause. Breathe. Try again.
          </p>
          <p className="text-white text-center lead fs-5">
            Raise your hand and ask for help! <br />
            We are all here to help, learn, and grow together.
          </p>
        </div>
      </Content>
    </>
  )
}

export default AskForHelp
