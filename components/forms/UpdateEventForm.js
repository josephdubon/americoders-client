import GridItem from '../Grid/GridItem'
import { TextField } from '@mui/material'
import Datetime from 'react-datetime'
import Button from '../CustomButtons/Button'

const UpdateEventForm = ({
  current,
  setCurrent,
  handleUpdateEvent,
}) => {
  return (
    <GridItem xs={12} style={{ maxHeight: '800px', overflow: 'scroll' }}>
      {/*{JSON.stringify(current, null, 4)}*/}
      <form onSubmit={handleUpdateEvent}>

        {/* title */}
        <TextField
          label="Title"
          multiline
          fullWidth
          rowsMax={2}
          type="text"
          className="form-control"
          onChange={(e) => setCurrent(
            { ...current, title: e.target.value })}
          value={current.title}
          style={{ margin: '15px 0' }}
          placeholder="Title"
          autoFocus
          required
        />

        {/* startDate area */}
        <Datetime
          inputProps={{ placeholder: 'Start Date' }}
          onChange={(e) => setCurrent(
            { ...current, startDate: e })}
          value={current.startDate}
          style={{ margin: '15px 0' }}
        />

        {/* endDate area */}
        <Datetime
          inputProps={{ placeholder: 'End Date' }}
          onChange={(e) => setCurrent(
            { ...current, endDate: e })}
          value={current.endDate}
          style={{ margin: '15px 0' }}
        />

        {/* location */}
        <TextField
          label="Location"
          fullWidth
          type="text"
          className="form-control"
          onChange={(e) => setCurrent(
            { ...current, location: e.target.value })}
          value={current.location}
          style={{ margin: '15px 0' }}
          placeholder="Location"
          autoFocus
          required
        />

        {/* description */}
        <TextField
          label="Description"
          multiline
          fullWidth
          rows={12}
          type="text"
          className="form-control"
          onChange={(e) => setCurrent(
            { ...current, description: e.target.value })}
          value={current.description}
          style={{ margin: '15px 0' }}
          placeholder="Use Markdown Syntax"
          autoFocus
          required
        />
        <GridItem xs={12}>
          <Button
            fullWidth
            type="submit"
            color="primary"
            size={'lg'}
            onClick={handleUpdateEvent}
            style={{ margin: '2rem 0' }}
          >
            Save
          </Button>
        </GridItem>
      </form>
    </GridItem>
  )
}

export default UpdateEventForm