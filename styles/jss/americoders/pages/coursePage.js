import { cardTitle, container, markdownStyles, title } from '../../americoders'

const coursePageStyle = {
  container: {
    zIndex: '12',
    ...container,
  },
  menu: {
    textAlign: 'center',
  },
  menuTitle: {
    ...title,
    marginTop: '30px',
    minWidth: '250px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  menuItem: {
    textAlign: 'left',
  },
  gridItemContainer: {
    zIndex: '12',
    ...container,
    margin: '2rem 0',
  },
  sections: {
    paddingTop: '30px',
    minHeight: '32px',
  },
  title: {
    ...title,
    color: '#FFFFFF',
    fontSize: '2.275rem',
    textAlign: 'center',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none',
  },
  lightTitle: {
    ...title,
    fontSize: '2.275rem',
    textAlign: 'center',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
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
  lightSubtitle: {
    color: '#3C4858',
    fontSize: '1rem',
    fontWeight: '400',
    textAlign: 'center',
  },
  courseImage: {
    objectFit: 'cover',
    margin: '2rem auto',
  },
  intro: {
    color: '#3C4858',
    fontSize: '1.175rem',
    fontWeight: '500',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: '100%',
    margin: '2.5rem auto',
  },
  courseVideo: {
    width: '100%',
    height: '100%',
    margin: '2rem auto',
    objectFit: 'cover',
  },
  description: {
    color: '#3C4858',
    fontSize: '1.1rem',
    textAlign: 'left',
    margin: '.775rem auto',
  },
  markdown: {
    ...markdownStyles,
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
  editorRenderBox: {
    minHeight: '500px',
    border: '3px solid #f1f1f1',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  editorRenderBoxTop: {
    padding: '10px',
    background: '#f1f1f1',
    borderTopLeftRadius: '4px',
    borderTopRightRadius: '4px',
  },
  editorRenderBoxDot: {
    height: '10px',
    width: '10px',
    backgroundColor: '#bbb',
    borderRadius: '50%',
    display: 'inline-block',
    marginRight: '5px',
  },
  editorRenderBoxContent: {
    padding: '15px',
  },
  aceEditor: {
    display: 'none !important',
    minHeight: '500px',
  },
}

export default coursePageStyle