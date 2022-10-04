import { TextField } from '@mui/material'
import Datetime from 'react-datetime'
import 'react-datetime/css/react-datetime.css'
import GridItem from '../Grid/GridItem'
import Button from '../CustomButtons/Button'

const AddEventForm = ({
  eventValues,
  setEventValues,
  handleAddEvent,
  uploading,
}) => {
  return (<>
    <GridItem xs={12} style={{ maxHeight: '800px', overflow: 'scroll' }}>
      <form onSubmit={handleAddEvent}>
        {/* title */}
        <TextField
          label="Title"
          multiline
          fullWidth
          rowsMax={2}
          type="text"
          className="form-control"
          onChange={(e) => setEventValues(
            { ...eventValues, title: e.target.value })}
          value={eventValues.title}
          placeholder="Title"
          autoFocus
          required
          style={{ margin: '15px 0' }}
        />

        {/* startDate area */}
        <Datetime
          inputProps={{ placeholder: 'Start Date' }}
          onChange={(e) => setEventValues(
            { ...eventValues, startDate: e })}
          value={eventValues.startDate}
          style={{ margin: '15px 0' }}
        />

        {/* endDate area */}
        <Datetime
          inputProps={{ placeholder: 'End Date' }}
          onChange={(e) => setEventValues(
            { ...eventValues, endDate: e })}
          value={eventValues.endDate}
          style={{ margin: '15px 0' }}
        />

        {/* location */}
        <TextField
          label="Location"
          fullWidth
          type="text"
          className="form-control"
          onChange={(e) => setEventValues(
            { ...eventValues, location: e.target.value })}
          value={eventValues.location}
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
          onChange={(e) => setEventValues(
            { ...eventValues, description: e.target.value })}
          value={eventValues.description}
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
            disabled={!eventValues.title || uploading}
            size={'lg'}
            onClick={handleAddEvent}
            style={{ margin: '2rem 0' }}
            loading={uploading}
          >
            Save
          </Button>
        </GridItem>
      </form>
    </GridItem>
  </>)
}

export default AddEventForm