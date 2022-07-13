import {Button, Progress, Tooltip} from 'antd'
import {CloseCircleFilled} from '@ant-design/icons'

const AddLessonForm = ({
                           values,
                           setValues,
                           handleAddLesson,
                           handleVideo,
                           handleRemoveVideo,
                           progress,
                           uploading,
                           uploadButtonText
                       }) => {
    return (<>
        <div className='container pt-3'>

            <form onSubmit={handleAddLesson}>
                {/* title */}
                <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setValues({...values, title: e.target.value})}
                    value={values.title}
                    placeholder='Title'
                    autoFocus
                    required
                />

                {/* content */}
                <textarea
                    className='form-control mt-3'
                    cols='7'
                    rows='7'
                    onChange={(e) => setValues({...values, content: e.target.value})}
                    value={values.content}
                    placeholder='Content'
                >
            </textarea>

                <div className='col d-grid gap-2'>

                    <label className='btn btn-dark btn-block text-left mt-3'>
                        {uploadButtonText}
                        <input
                            onChange={handleVideo}
                            type='file'
                            accept='video/*'
                            hidden // hide generic upload button and layout
                        />
                    </label>

                    {!uploading && values.video.Location && (
                        <Tooltip title='Remove'>
                            <span onClick={handleRemoveVideo} className='pt-1 pl-3'>
                                <CloseCircleFilled className='text-danger d-flex justify-content-center pt-4'/>
                            </span>
                        </Tooltip>
                    )}

                    {progress > 0 && (
                        <Progress
                            className='d-flex justify-content-center pt-2'
                            percent={progress}
                            steps={10}
                        />
                    )}

                    <Button
                        onClick={handleAddLesson}
                        className='col mt-3'
                        size='large'
                        type='primary'
                        shape='round'
                        loading={uploading}
                    >
                        Save
                    </Button>
                </div>

            </form>
        </div>
    </>)
}

export default AddLessonForm
