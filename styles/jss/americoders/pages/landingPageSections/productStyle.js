import { title } from '../../../americoders'

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
  },
  subtitle: {
    ...title,
    fontSize: '1.313rem',
  },
  description: {
    color: '#999',
    fontSize: '1.1rem',
    textAlign: 'center',
    margin: '.5rem 1rem',
  },
  quote: {
    color: '#4b4b4b',
    fontSize: '.8rem',
    fontWeight: '400',
    textAlign: 'center',
  },
  imageBox: {
    width: '100%',
    minHeight: '320px',
  },
  image: {
    borderRadius: '2.5rem',
  },
}

export default productStyle