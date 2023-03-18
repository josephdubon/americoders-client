import React, { useState } from 'react'
import axios from 'axios'
import Resizer from 'react-image-file-resizer'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import { PageHead } from '../../../components/head/PageHead'
import Header from '../../../components/Header/Header'
import NavLogo from '../../../public/images/logo/americoders-logo-simple_white.svg'
import HeaderLinks from '../../../components/Header/HeaderLinks'
import GridContainer from '../../../components/Grid/GridContainer'
import GridItem from '../../../components/Grid/GridItem'
import Card from '../../../components/Card/Card'

import CardHeader from '../../../components/Card/CardHeader'
import CardBody from '../../../components/Card/CardBody'
import Footer from '../../../components/Footer/Footer'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../../styles/jss/americoders/pages/loginPage'
import CourseCreateForm from '../../../components/forms/CourseCreateForm'

const useStyles = makeStyles(styles)

const CreateCourse = (props) => {
  // router
  const router = useRouter()

  // state
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '49.99',
    uploading: false,
    paid: true,
    category: '',
    eventStartDate: '',
    eventEndDate: '',
    eventLocation: '',
    loading: false,
  })

  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden')
  setTimeout(function () {
    setCardAnimation('')
  }, 700)
  const classes = useStyles()
  const { ...rest } = props

  // form logic: values
  // set image initial state to an empty object
  const [image, setImage] = useState({})
  const [preview, setPreview] = useState('')
  const [uploadButtonText, setUploadButtonText] = useState('Upload Image')

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  // form logic: images
  const handleImage = (e) => {
    let imagePreview = e.target.files[0]

    // set preview state
    setPreview(window.URL.createObjectURL(imagePreview))

    // set state for button text
    setUploadButtonText(imagePreview.name)

    // set values state
    setValues({ ...values, loading: true })

    // resize image
    Resizer.imageFileResizer(
      imagePreview,
      1920,
      1080,
      'PNG',
      100,
      0,
      async (uri) => {
        try {
          let { data } = await axios.post('/api/course/upload-image', {
            image: uri,
          })
          // console.log('IMAGE UPLOADED ', data)

          // update image state
          setImage(data)
          setValues({ ...values, loading: false })
        } catch (err) {
          console.log('IMAGE RESIZE ERROR ', err)
          setValues({ ...values, loading: false })
          // notification config
          toast.error('Image upload failed. Try again later.', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      },
    )
  }

  // form logic: image remove
  const handleImageRemove = async (e) => {
    // console.log('REMOVE IMAGE ')
    try {
      setValues({ ...values, loading: true })
      const res = await axios.post('/api/course/remove-image', { image })
      setImage({})
      setPreview('')
      setUploadButtonText('Upload Image')
      setValues({ ...values, loading: false })
    } catch (err) {
      console.log('IMAGE REMOVE ERROR ', err)
      setValues({ ...values, loading: false })
      // notification config
      toast.error('Image remove failed. Try again later.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  // form logic: submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    // submit request to backend
    // console.log('VALUES ', values)
    try {
      const { data } = await axios.post('/api/course', {
        ...values, // unpack all the values from state
        image, // include image with post request
      })

      // notification config
      toast.success('Excellent! Now you can start adding lessons', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

      // redirect to instructor page
      await router.push('/instructor')
    } catch (err) {
      setLoading(false)
      // notification config
      toast.error(err.response.data, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <>
      <PageHead title={'Create New Course Form'} />

      <Header
        absolute
        color="transparent"
        brand={NavLogo}
        rightLinks={<HeaderLinks />}
        {...rest}
      />

      <div
        className={classes.pageHeader}
        style={{
          backgroundImage:
            "url('/images/original/americoders-community-hands-friends.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'top center',
        }}
      >
        <div className={classes.container}>
          <GridContainer
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <GridContainer
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <GridItem xs={10} sm={8} md={11}>
                <Card className={classes[cardAnimaton]}>
                  {/* create course form */}
                  {/* use props for form function and values */}
                  <CourseCreateForm
                    handleSubmit={handleSubmit}
                    handleImage={handleImage}
                    handleImageRemove={handleImageRemove}
                    handleChange={handleChange}
                    values={values}
                    setValues={setValues}
                    preview={preview}
                    uploadButtonText={uploadButtonText}
                  />{' '}
                </Card>
              </GridItem>
            </GridContainer>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </>
  )
}

export default CreateCourse
