import {Button} from 'antd'

const AddLessonForm = ({values, setValues, handleAddLesson, handleVideo, uploading, uploadButtonText}) => {
    return (<>
        <div className='container pt-3'>

            <form onSubmit={handleAddLesson}>
                <input
                    type='text'
                    className='form-control'
                    onChange={(e) => setValues({...values, title: e.target.value})}
                    value={values.title}
                    placeholder='Title'
                    autoFocus
                    required
                />

                <textarea
                    className='form-control mt-3'
                    cols='7'
                    rows='7'
                    onChange={(e) => setValues({...values, content: e.target.value})}
                    value={values.content}
                    placeholder='Content'
                >
            </textarea>


                <div className='row'>
                    <div className='col d-grid'>
                        <Button
                            onClick={handleAddLesson}
                            className='col mt-3'
                            size='large'
                            type='primary'
                            shape='round'
                            loading={uploading}
                        >Save</Button>
                    </div>
                </div>
            </form>
        </div>
    </>)
}

export default AddLessonForm
