import { Button } from 'antd'

const UpdateEventForm = ({
  currentEvent,
  setCurrentEvent,
  handleUpdateEvent,
}) => {
  return (

    <div className="container pt-3">

      {/*{JSON.stringify(currentEvent, null, 4)}*/}
      <form onSubmit={handleUpdateEvent}>
        <p className="mb-1">Title</p>
        <input
          type="text"
          className="form-control square mb-3"
          onChange={(e) => setCurrentEvent({ ...currentEvent, title: e.target.value })}
          value={currentEvent.title}
          autoFocus
          required
        />

        <p className="mb-1">Description</p>
        <textarea
          className="form-control mt-3"
          cols="7"
          rows="7"
          onChange={(e) => setCurrentEvent({ ...currentEvent, description: e.target.value })}
          value={currentEvent.description}
        />

        {/* date area */}
        <div className="row form-group gap-2 mt-3 mb-3">
          <div>
            <p className="mb-1">startDate</p>
            <textarea
              className="form-control mt-3 col"
              cols="7"
              rows="7"
              onChange={(e) => setCurrentEvent({ ...currentEvent, startDate: e.target.value })}
              value={currentEvent.startDate}
            />
          </div>

          <div>

            <p className="mb-1">endDate</p>
            <textarea
              className="form-control mt-3 col"
              cols="7"
              rows="7"
              onChange={(e) => setCurrentEvent({ ...currentEvent, endDate: e.target.value })}
              value={currentEvent.endDate}
            />
            <p className="mb-1">location</p>
            <textarea
              className="form-control mt-3 col"
              cols="7"
              rows="7"
              onChange={(e) => setCurrentEvent({ ...currentEvent, location: e.target.value })}
              value={currentEvent.location}
            />
          </div>

        </div>

        <Button
          onClick={handleUpdateEvent}
          className="col mt-3"
          size="large"
          type="primary"
          shape="round"
        >
          Save
        </Button>
      </form>
    </div>
  )
}

export default UpdateEventForm