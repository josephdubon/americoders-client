import { cardTitle, container, title } from '../../americoders'

const landingPageStyle = {
  container: {
    zIndex: '12',
    color: '#FFFFFF',
    ...container,
  },
  title: {
    ...title,
    fontSize: '2rem',
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  cardTitle,
  sectionTitle: {
    ...title,
    marginBottom: '50px',
    marginTop: '60px',
    minHeight: '32px',
    textDecoration: 'none',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: '1rem',
    fontWeight: '600',
    textAlign: 'left',
    margin: '2.5rem auto',
  },
  description: {
    color: '#999',
    fontSize: '1.1rem',
    textAlign: 'left',
    textTransform: 'uppercase'
  },
  price: {
    ...title,
    fontSize: '2rem',
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3',
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
  },
}

export default landingPageStyle