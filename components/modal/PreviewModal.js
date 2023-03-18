import React from 'react'
import { Modal } from 'antd'
import ReactPlayer from 'react-player'
import { Dialog, DialogContent, DialogTitle } from '@mui/material'
// material-ui components
import withStyles from '@material-ui/core/styles/withStyles'
import Slide from '@material-ui/core/Slide'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
// @material-ui/icons
import Close from '@material-ui/icons/Close'
// core components
import Button from '../CustomButtons/Button.js'

import modalStyle from '../../styles/jss/americoders/modalStyle.js'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/landingPage'

const useStyles = makeStyles(styles)

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />
})

const PreviewModal = ({ showModal, setShowModal, preview }) => {
  const classes = useStyles()

  return (
    <>
      <Dialog
        classes={{
          root: classes.center,
          paper: classes.modal,
        }}
        open={showModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShowModal(false)}
        aria-labelledby="modal-slide-title"
        aria-describedby="modal-slide-description"
      >
        <DialogTitle
          id="classic-modal-slide-title"
          disableTypography
          className={classes.modalHeader}
        >
          <IconButton
            className={classes.modalCloseButton}
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={() => setShowModal(false)}
          >
            <Close className={classes.modalClose} />
          </IconButton>
        </DialogTitle>
        <DialogContent
          id="modal-slide-description"
          className={classes.modalBody}
        >
          <ReactPlayer
            url={preview}
            playing={showModal}
            controls
            width="100%"
            height="100%"
          />
        </DialogContent>
        <DialogActions
          className={classes.modalFooter + ' ' + classes.modalFooterCenter}
        >
          <Button onClick={() => setShowModal(false)} color="danger">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default PreviewModal
