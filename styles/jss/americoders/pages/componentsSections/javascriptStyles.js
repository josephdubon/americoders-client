import { container, title } from '/styles/jss/americoders.js'

import modalStyle from '/styles/jss/americoders/modalStyle.js'
import tooltipsStyle from '/styles/jss/americoders/tooltipsStyle.js'
import popoverStyles from '/styles/jss/americoders/popoverStyles.js'

const javascriptStyles = {
  section: {
    padding: '70px 0 0',
  },
  container,
  title: {
    ...title,
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  icon: {
    width: '17px',
    height: '17px',
    marginRight: '4px',
  },
  ...modalStyle,
  label: {
    color: 'rgba(0, 0, 0, 0.26)',
    cursor: 'pointer',
    display: 'inline-flex',
    fontSize: '14px',
    transition: '0.3s ease all',
    lineHeight: '1.428571429',
    fontWeight: '400',
    paddingLeft: '0',
    letterSpacing: 'normal',
  },
  ...tooltipsStyle,
  ...popoverStyles,
}

export default javascriptStyles
