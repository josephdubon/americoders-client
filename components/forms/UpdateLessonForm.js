import {Button, Progress, Switch} from 'antd'
import ReactPlayer from 'react-player'

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

        <div className='container pt-3'>

            {/*{JSON.stringify(current, null, 4)}*/}
            <form onSubmit={handleUpdateLesson}>
                <p className='mb-1'>Title</p>
                <input
                    type='text'
                    className='form-control square mb-3'
                    onChange={(e) => setCurrent({...current, title: e.target.value})}
                    value={current.title}
                    autoFocus
                    required
                />

                <p className='mb-1'>Content</p>
                <textarea
                    className='form-control mt-3'
                    cols='7'
                    rows='7'
                    onChange={(e) => setCurrent({...current, content: e.target.value})}
                    value={current.content}
                />

                {/* code area */}
                <div className='row form-group gap-2 mt-3 mb-3'>
                    <div>
                        <p className='mb-1'>HTML</p>
                        <textarea
                            className='form-control mt-3 col'
                            cols='7'
                            rows='7'
                            onChange={(e) => setCurrent({...current, html: e.target.value})}
                            value={current.html}
                        />
                    </div>

                    <div>

                        <p className='mb-1'>CSS</p>
                        <textarea
                            className='form-control mt-3 col'
                            cols='7'
                            rows='7'
                            onChange={(e) => setCurrent({...current, css: e.target.value})}
                            value={current.css}
                        />
                    </div>
                    <div>
                        <p className='mb-1'>JavaScript</p>
                        <textarea
                            className='form-control mt-3 col'
                            cols='7'
                            rows='7'
                            onChange={(e) => setCurrent({...current, javascript: e.target.value})}
                            value={current.javascript}
                        />
                    </div>

                </div>

                <div className='col d-grid gap-2'>
                    {!uploading && current.video && current.video.Location && (
                        <div className='pt-2 d-flex justify-content-center'>
                            <ReactPlayer
                                url={current.video.Location}
                                width='410px'
                                height='240px'
                                controls
                            />
                        </div>
                    )}

                    <label className='btn btn-dark btn-block text-left mt-3'>
                        {uploadVideoButtonText}
                        <input onChange={handleVideo} type='file' accept='video/*' hidden/>
                    </label>
                </div>

                {progress > 0 && (
                    <Progress
                        className='d-flex justify-content-center pt-2'
                        percent={progress}
                        steps={10}
                    />
                )}

                <div className='d-flex justify-content-between'>
                    <span className='pt-3 badge text-black'>Preview</span>
                    <Switch
                        className='float-end mt-2'
                        disabled={uploading}
                        checked={current.free_preview}
                        name='free_preview'
                        onChange={(v) => setCurrent({...current, free_preview: v})}
                    />
                </div>

                <Button
                    onClick={handleUpdateLesson}
                    className='col mt-3'
                    size='large'
                    type='primary'
                    loading={uploading}
                    shape='round'
                >
                    Save
                </Button>
            </form>
        </div>
    )
}

export default UpdateLessonForm
