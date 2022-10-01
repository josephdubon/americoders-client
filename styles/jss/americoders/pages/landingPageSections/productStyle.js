import { markdownStyles, title } from '../../../americoders'

const productStyle = {
  section: {
    padding: '70px 0',
    textAlign: 'center',
  },
  title: {
    ...title,
    marginBottom: '1rem',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
    textAlign: 'center',
  },
  subtitle: {
    ...title,
    fontSize: '1.313rem',
  },
  description: {
    color: '#999',
    fontSize: '1.125rem',
    lineHeight: '1.5em',
    textAlign: 'center',
    margin: '.5rem 1rem',
  },
  markdown: {
    ...markdownStyles,
  },
  quote: {
    color: '#4b4b4b',
    fontSize: '.8rem',
    fontWeight: '400',
    textAlign: 'center',
  },
  image: {
    borderRadius: '2rem',
  },
}

export default productStyle
