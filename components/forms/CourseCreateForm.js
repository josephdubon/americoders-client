import {SaveOutlined} from '@ant-design/icons'
import {Button, Select} from 'antd'

const {Option} = Select

const CourseCreateForm = ({handleChange, handleImage, handleSubmit, values, setValues}) => {
    // price dropdown logic
    const children = []
    for (let i = 49.99; i <= 100.99; i++) {
        children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='form-group '>
                    {/* name */}
                    <input
                        type='text'
                        name='name'
                        className='form-control'
                        value={values.name}
                        placeholder='Name'
                        onChange={handleChange}
                    />
                </div>

            {/* description */}
            <div className='form-group'>
                <textarea
                    name='description'
                    id=''
                    cols='7'
                    rows='7'
                    className='form-control'
                    value={values.description}
                    placeholder='Description'
                    onChange={handleChange}
                >
                </textarea>
            </div>

            {/* paid or free course */}
            <div className='form-row'>
                <div className='col'>
                    <div className='form-group d-grid'>
                        <Select
                            size='large'
                            value={values.paid}
                            onChange={(v) => setValues({...values, paid: !values.paid})}
                        >
                            <Option value={true}>Paid</Option>
                            <Option value={false}>Free</Option>
                        </Select>
                    </div>
                </div>
            </div>

            {/* image upload */}
            <div className='form-row'>
                <div className='col'>
                    <div className='form-group d-grid'>
                        <label
                            className='btn btn-outline-secondary text-left'>
                            {values.loading ? ' Uploading' : 'Image Upload'}
                            <input
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={handleChange}
                                hidden
                            />
                        </label>
                    </div>
                </div>
            </div>

            {/* button */}
            <div className='row'>
                <div className='col d-grid'>
                    <Button
                        onClick={handleSubmit}
                        disabled={values.loading || values.uploading}
                        className='btn btn-primary'
                        loading={values.loading}
                        icon={<SaveOutlined/>}
                        type='primary'
                        size='large'
                        shape='round'
                    >
                        {values.loading ? 'Saving...' : 'Save & Continue'}
                    </Button>
                </div>
            </div>
        </form>
    </>
)
export default CourseCreateForm
