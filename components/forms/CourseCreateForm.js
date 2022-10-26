import { SaveOutlined } from '@ant-design/icons'
import { Avatar, Badge } from 'antd'
import React from 'react'
import { TextField } from '@mui/material'
import CardHeader from '../Card/CardHeader'
import styles from '../../styles/jss/americoders/pages/loginPage.js'
import { makeStyles } from '@material-ui/core/styles'
import CardBody from '../Card/CardBody'
import MenuItem from '@mui/material/MenuItem'
import Button from '../CustomButtons/Button'
import GridItem from '../Grid/GridItem'
import Image from 'next/image'
import GridContainer from '../Grid/GridContainer'

const useStyles = makeStyles(styles)

const CourseCreateForm = ({
  handleChange,
  handleImage,
  handleImageRemove = (f) => f,
  handleSubmit,
  preview,
  values,
  setValues,
  uploadButtonText,
  editPage = false,
}) => {
  // price dropdown logic
  const children = []
  for (let i = 49.99; i <= 100.99; i++) {
    children.push(<MenuItem key={i.toFixed(2)}>${i.toFixed(2)}</MenuItem>)
  }

  const classes = useStyles()

  return (<>
    {/* confirm values exist and then render form */}
    {values && (
      <form
        className={classes.form}
        onSubmit={handleSubmit}
      >

        {/* form title */}
        <CardHeader color="primary" className={classes.cardHeader}>
          <h4>Create New Course Form</h4>
        </CardHeader>
        <CardBody>
          {/*  name field */}
          <TextField
            id="standard-multiline-flexible"
            label="Name"
            multiline
            fullWidth
            rowsMax={2}
            type="text"
            name="name"
            className="form-control"
            value={values.name}
            placeholder="Name"
            onChange={handleChange}
            variant="standard"
          />

          {/*  category field */}
          <TextField
            id="standard-multiline-flexible"
            label="Category"
            multiline
            fullWidth
            rowsMax={2}
            type="text"
            name="category"
            className="form-control"
            value={values.category}
            placeholder="Category"
            onChange={handleChange}
            variant="standard"
          />

          {/*  ages field */}
          <TextField
            id="standard-multiline-flexible"
            label="Age Group"
            multiline
            fullWidth
            rowsMax={2}
            type="text"
            name="ages"
            className="form-control"
            value={values.ages}
            placeholder="Age Group"
            onChange={handleChange}
            variant="standard"
          />

          {/* intro field */}
          <TextField
            id="standard-multiline-flexible"
            label="Short Intro"
            multiline
            fullWidth
            rowsMax={2}
            type="text"
            name="intro"
            className="form-control"
            value={values.intro}
            placeholder="Short Intro"
            onChange={handleChange}
            variant="standard"
          />

          {/*  description field */}
          <TextField
            id="standard-multiline-flexible"
            label="Description"
            multiline
            fullWidth
            rows={24}
            type="text"
            name="description"
            className="form-control"
            value={values.description}
            placeholder="Description"
            onChange={handleChange}
            variant="standard"
          />

          {/* image upload */}
          <GridContainer justifyContent={'center'} alignItems={'center'}>
            <Button
              color={'success'}
              size={'md'}
            >
              <label style={{ color: '#fff' }}>
                {uploadButtonText}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImage}
                  hidden
                />
              </label>
            </Button>
          </GridContainer>

          {/* image preview */}
          {preview && (<>
            <div>
              <p>Image Preview:</p>
              <Badge
                count="X"
                onClick={handleImageRemove}
                role="button">
                <Avatar width={200} src={preview}/>
              </Badge>
            </div>
          </>)}

          {editPage && values.image && (
            <GridContainer justifyContent={'center'} alignItems={'center'}>
              <Image
                width={200}
                height={200}
                src={values.image.Location}
              />
            </GridContainer>
          )}

          {/* button */}
          <GridContainer justifyContent={'center'} alignItems={'center'}>
            <GridItem xs={10} sm={10} md={4}
            >
              <Button
                fullWidth
                onClick={handleSubmit}
                disabled={values.loading || values.uploading}
                className="btn btn-primary"
                loading={values.loading}
                icon={<SaveOutlined/>}
                color="primary"
                size="lg"
                shape="round"
              >
                {values.loading ? 'Saving...' : 'Save & Continue'}
              </Button>
            </GridItem>
          </GridContainer>
        </CardBody>
      </form>
    )}
  </>)
}
export default CourseCreateForm
