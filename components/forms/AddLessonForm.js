import { Progress } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import { Switch, TextField } from '@mui/material'
import Button from '../CustomButtons/Button'
import { Tooltip } from '@material-ui/core'
import GridItem from '../Grid/GridItem'

const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  handleVideo,
  handleRemoveVideo,
  progress,
  uploading,
  uploadButtonText,
}) => {
  return (<>
    <GridItem xs={12} style={{ maxHeight: '800px', overflow: 'scroll' }}>
      <form onSubmit={handleAddLesson}>
        {/* title */}
        <TextField
          label="Name"
          multiline
          fullWidth
          rowsMax={2}
          type="text"
          className="form-control"
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          style={{ margin: '15px 0' }}
          placeholder="Title"
          autoFocus
          required
        />

        {/* content */}
        <TextField
          label="Content"
          multiline
          fullWidth
          rows={14}
          type="text"
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          style={{ margin: '15px 0' }}
          placeholder="Content">
        </TextField>

        {/* html */}
        <TextField
          label="HTML"
          multiline
          fullWidth
          rows={14}
          onChange={(e) => setValues({ ...values, html: e.target.value })}
          value={values.html}
          style={{ margin: '15px 0' }}
          placeholder="HTML">
        </TextField>

        {/* css */}
        <TextField
          label="CSS"
          multiline
          fullWidth
          rows={14}
          onChange={(e) => setValues({ ...values, css: e.target.value })}
          value={values.css}
          style={{ margin: '15px 0' }}
          placeholder="CSS">
        </TextField>

        {/* javascript */}
        <TextField
          label="Javascript"
          multiline
          fullWidth
          rows={14}
          onChange={(e) => setValues(
            { ...values, javascript: e.target.value })}
          value={values.javascript}
          style={{ margin: '15px 0' }}
          placeholder="JavaScript">
        </TextField>

        {/* earsketch area */}
        <GridItem xs={12}>
          <p>EarSketch Lesson?</p>
          {/* true */}
          {/*  toggle input if current.earsketch value is true */}
          <Switch
            size={'medium'}
            defaultChecked={values.earsketch}
            onChange={(e) => setValues(
              { ...values, earsketch: e.target.checked })}
          />
        </GridItem>

        {/* buttons */}
        <GridItem xs={12}>
          {/* video section */}
          <Button
            color="success"
          >
            <label style={{ color: '#FFFFFF' }}>
              {uploadButtonText}
              <input
                onChange={handleVideo}
                type="file"
                accept="video/*"
                hidden // hide generic upload button and layout
              />
            </label>
          </Button>
          {!uploading && values.video.Location && (
            <Tooltip title="Remove">
                            <span onClick={handleRemoveVideo}
                                  className="pt-1 pl-3">
                                <CloseCircleFilled
                                  className="text-danger d-flex justify-content-center pt-4"/>
                            </span>
            </Tooltip>
          )}
          {progress > 0 && (
            <Progress
              className="d-flex justify-content-center pt-2"
              percent={progress}
              steps={10}
            />
          )}
          <Button
            fullWidth
            onClick={handleAddLesson}
            size="lg"
            color="primary"
            shape="round"
            loading={uploading}
          >
            Save
          </Button>
        </GridItem>
      </form>
    </GridItem>
  </>)
}

export default AddLessonForm