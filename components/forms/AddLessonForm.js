import { Progress } from 'antd'
import { CloseCircleFilled } from '@ant-design/icons'
import { Switch, TextField } from '@mui/material'
import Button from '../CustomButtons/Button'
import { Tooltip } from '@material-ui/core'

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
    <div className="container pt-3">

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
          placeholder="JavaScript">
        </TextField>

        {/* earsketch area */}
        <div className="row form-group gap-2 mt-3 mb-3">
          <div className="row form-group gap-2 mt-3 mb-3">
            <p>EarSketch Lesson?</p>
            {/* true */}
            {/*  toggle input if current.earsketch value is true */}
            <Switch
              size={'medium'}
              defaultChecked={values.earsketch}
              onChange={(e) => setValues(
                { ...values, earsketch: e.target.checked })}
            />
          </div>
        </div>

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

      </form>
    </div>
  </>)
}

export default AddLessonForm