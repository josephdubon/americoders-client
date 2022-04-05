import {SaveOutlined} from '@ant-design/icons'
import {Avatar, Badge, Button, Select} from 'antd'

const {Option} = Select

const CourseCreateForm = ({
                              handleChange,
                              handleImage,
                              handleImageRemove = (f) => f,
                              handleSubmit,
                              preview,
                              values,
                              setValues,
                              uploadButtonText
                          }) => {
    // price dropdown logic
    const children = []
    for (let i = 49.99; i <= 100.99; i++) {
        children.push(<Option key={i.toFixed(2)}>${i.toFixed(2)}</Option>)
    }

    return (<>
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
                            onChange={(v) => setValues({...values, paid: v, price: 0})}
                        >
                            <Option value={true}>Paid</Option>
                            <Option value={false}>Free</Option>
                        </Select>
                    </div>
                </div>

                {/* price dropdown */}
                {values.paid && <div className='form-group'>
                    <Select
                        size='large'
                        tokenSeparators={[,]}
                        defaultValue='$49.99'
                        className='w-100'
                        onChange={v => setValues({...values, price: v})}
                    >
                        {children}
                    </Select>
                </div>}
            </div>

            {/* category */}
            <div className='form-group '>
                <input
                    type='text'
                    name='category'
                    className='form-control'
                    value={values.category}
                    placeholder='Category'
                    onChange={handleChange}
                />
            </div>

            {/* image upload */}
            <div className='form-row'>
                <div className='col'>
                    <div className='form-group d-grid'>
                        <label
                            className='btn btn-outline-secondary text-left'>
                            {uploadButtonText}
                            <input
                                type='file'
                                name='image'
                                accept='image/*'
                                onChange={handleImage}
                                hidden
                            />
                        </label>
                    </div>
                </div>

            </div>
            {/* image preview */}
            {preview && (<>
                <div className='col-md-6 text-center w-100 mb-3'>
                    <p>Image Preview:</p>
                    <Badge count='X' onClick={handleImageRemove} className='pointer-event'>
                        <Avatar width={200} src={preview}/>
                    </Badge>
                </div>
            </>)}

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
    </>)
}
export default CourseCreateForm
