import { Button } from 'antd'

const AddEventForm = ({
  eventValues,
  setEventValues,
  handleAddEvent,
  uploading,
}) => {
  return (<>
    <div className="container pt-3">

      <form onSubmit={handleAddEvent}>
        {/* title */}
        <input
          type="text"
          className="form-control"
          onChange={(e) => setEventValues({ ...eventValues, title: e.target.value })}
          value={eventValues.title}
          placeholder="Title"
          autoFocus
          required
        />

        {/* startDate area */}
        <div className="row form-group gap-2 ">
                    <textarea
                      className="form-control mt-3 col"
                      cols="7"
                      rows="14"
                      onChange={(e) => setEventValues({ ...eventValues, startDate: e.target.value })}
                      value={eventValues.startDate}
                      placeholder="startDate">
                    </textarea>

          {/* endDate area */}
          <textarea
            className="form-control mt-3 col"
            cols="7"
            rows="14"
            onChange={(e) => setEventValues({ ...eventValues, endDate: e.target.value })}
            value={eventValues.endDate}
            placeholder="endDate">
                    </textarea>

          {/* description */}
          <textarea
            className="form-control mt-3"
            cols="7"
            rows="14"
            onChange={(e) => setEventValues({ ...eventValues, description: e.target.value })}
            value={eventValues.description}
            placeholder="description">
                </textarea>

          {/*location*/}
          <textarea
            className="form-control mt-3 col"
            cols="7"
            rows="14"
            onChange={(e) => setEventValues({ ...eventValues, location: e.target.value })}
            value={eventValues.location}
            placeholder="location">
                    </textarea>

        </div>

        <div className="col d-grid gap-2">
          <Button
            onClick={handleAddEvent}
            className="col mt-3"
            size="large"
            type="primary"
            shape="round"
            loading={uploading}
          >
            Save
          </Button>
        </div>

      </form>
    </div>
  </>)
}

export default AddEventForm