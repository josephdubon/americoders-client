import { Progress } from 'antd'
import ReactPlayer from 'react-player'
import { Switch, TextField } from '@mui/material'
import Button from '../CustomButtons/Button'
import GridItem from '../Grid/GridItem'
import GridContainer from '../Grid/GridContainer'

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploading,
  uploadVideoButtonText,
  handleVideo,
  progress,
}) => {
  return (
    <GridItem xs={12} style={{maxHeight: '800px', overflow: 'scroll'}}>
      {/*{JSON.stringify(current, null, 4)}*/}
      <form onSubmit={handleUpdateLesson}>

        {/* title */}
        <TextField
          label="Title"
          fullWidth
          type="text"
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          style={{ margin: '15px 0' }}
          placeholder="Title">
        </TextField>

        {/* content */}
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={14}
          type="text"
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          value={current.content}
          style={{ margin: '15px 0' }}
          placeholder="Content">
        </TextField>

        {/* HTML */}
        <TextField
          label="HTML"
          fullWidth
          multiline
          rows={14}
          type="text"
          onChange={(e) => setCurrent({ ...current, html: e.target.value })}
          value={current.html}
          style={{ margin: '15px 0' }}
          placeholder="HTML">
        </TextField>

        {/* CSS */}
        <TextField
          label="CSS"
          fullWidth
          multiline
          rows={14}
          type="text"
          onChange={(e) => setCurrent({ ...current, css: e.target.value })}
          value={current.css}
          style={{ margin: '15px 0' }}
          placeholder="CSS">
        </TextField>

        {/* Javascript */}
        <TextField
          label="Javascript"
          fullWidth
          multiline
          rows={14}
          type="text"
          onChange={(e) => setCurrent(
            { ...current, javascript: e.target.value })}
          value={current.javascript}
          style={{ margin: '15px 0' }}
          placeholder="Javascript">
        </TextField>

        {/* earsketch area */}
        <GridItem xs={12}>
          <h6>EarSketch Lesson?</h6>
          {/* true */}
          {/*  toggle input if current.earsketch value is true */}
          <Switch
            size="medium"
            defaultChecked={current.earsketch}
            onChange={(e) => setCurrent(
              { ...current, earsketch: e.target.checked })}
          />
        </GridItem>

        {/* video area */}
        <GridItem xs={12}>
          {!uploading && current.video && current.video.Location && (
            <GridContainer
              justifyContent="center"
              alignItems="center"
            >
              <ReactPlayer
                url={current.video.Location}
                width="410px"
                height="240px"
                controls
              />
            </GridContainer>
          )}
          <Button
            fullWidth
            size={'md'}
            color={'success'}
          >
            {uploadVideoButtonText}
            <input onChange={handleVideo} type="file" accept="video/*" hidden/>
          </Button>
          {progress > 0 && (
            <Progress
              className="d-flex justify-content-center pt-2"
              percent={progress}
              steps={10}
            />
          )}
          <hr/>
          <h6>Video Preview?</h6>
          <Switch
            defaultChecked={current.free_preview}
            disabled={uploading}
            name="free_preview"
            onChange={(v) => setCurrent(
              { ...current, free_preview: v.target.checked })}
          />
        </GridItem>
        <GridItem xs={12}>
          <Button
            fullWidth
            onClick={handleUpdateLesson}
            size="lg"
            color="primary"
            loading={uploading}
            style={{ margin: '2rem 0' }}
          >
            Save
          </Button>
        </GridItem>
      </form>
    </GridItem>
  )
}

export default UpdateLessonForm