const parallaxStyle = (theme) => ({
  parallax: {
    height: '90vh',
    maxHeight: '1000px',
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: 'center top',
    backgroundSize: 'cover',
    margin: '0',
    padding: '0',
    border: '0',
    display: 'flex',
    alignItems: 'center',
  },
  filter: {
    '&:before': {
      backgroundColor: 'rgb(63,94,251, .1)',
      background: 'linear-gradient(90deg, rgba(2,0,36,.8) 0%, rgba(9,9,121,.8) 23%, rgba(162,6,33,.8) 53%, rgba(242,242,242,1) 100%)',
    },
    '&:after,&:before': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: '\'\'',
    },
  },
  small: {
    height: '380px',
  },
  parallaxResponsive: {
    [theme.breakpoints.down('md')]: {
      minHeight: '660px',
    },
  },
})

export default parallaxStyle