import { gradientColor } from '../../americoders'

const parallaxStyle = (theme) => ({
  parallax: {
    height: '90vh',
    maxHeight: '1000px',
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    margin: '0',
    padding: '0',
    border: '0',
    display: 'flex',
    alignItems: 'center',
  },
  filter: {
    '&:before': {
      background: gradientColor,
    },
    '&:after,&:before': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: "''",
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
