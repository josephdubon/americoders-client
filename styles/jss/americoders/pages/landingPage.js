import { cardTitle, container, title } from '../../americoders'

const landingPageStyle = {
  container: {
    zIndex: '12',
    color: '#FFFFFF',
    ...container,
  },
  sections: {
    paddingTop: '30px',
    minHeight: '32px',
  },
  title: {
    ...title,
    fontSize: '2.275rem',
    textAlign: 'center',
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none',
  },
  enrollSection: {
    ...title,
    fontSize: '1rem',
    textDecoration: 'none',
    textAlign: 'center',
  },
  courseTitle: {
    ...title,
    fontSize: '2.275rem',
    color: '#FFFFFF',
    textAlign: 'center',
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
  intro: {
    fontSize: '1.175rem',
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
    margin: '2.5rem auto',
  },
  description: {
    color: '#3C4858',
    fontSize: '1.1rem',
    textAlign: 'left',
    textTransform: 'uppercase',
  },
  price: {
    ...title,
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
