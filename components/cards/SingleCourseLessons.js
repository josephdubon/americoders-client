import Card from '../Card/Card'
import { CardHeader, ListItem, ListItemIcon, ListItemText } from '@mui/material'
import CardBody from '../Card/CardBody'
import CardFooter from '../Card/CardFooter'
import { cardTitle } from '../../styles/jss/americoders'
import { makeStyles } from '@material-ui/core/styles'
import { School } from '@material-ui/icons'
import { truncate } from 'lodash-es'
import Moment from 'moment/moment'
import { List } from '@material-ui/core'

const styles = {
  cardTitle,
  textCenter: {
    textAlign: 'center'
  },
  textMuted: {
    color: '#6c757d'
  },
  icon: {
    color: '#999',
    fontSize: '1.1rem',
    textAlign: 'left',
    textTransform: 'uppercase',
    margin: '0 10px 0 0',
  }
}

const useStyles = makeStyles(styles)

const SingleCourseLessons = ({
  lessons,
  setPreview,
  showModal,
  setShowModal,
  course,
}) => {

  // state
  const classes = useStyles()
  return (<>
    <Card className={classes.textCenter}>
      <CardHeader color="danger">Featured</CardHeader>
      <CardBody>
        {lessons && <h4 className={classes.cardTitle}>{lessons.length} Lessons</h4>}

        {/* lessons list */}
        <List>
          {lessons.map((lesson) => (
            <ListItem>
              <School className={classes.icon}/>
              <ListItemText
                primary={truncate(lesson.title, { length: 24 })}
              />
              {lesson.video && true && lesson.free_preview && (
                <span
                  role="button"
                  className="text-primary"
                  onClick={() => {
                    setPreview(lesson.video.Location)
                    setShowModal(!showModal)
                  }}
                >
                    Preview
                  </span>
              )}
            </ListItem>
          ))}
        </List>

      </CardBody>
      <CardFooter className={classes.textMuted}>
        {course.updatedAt && `Last Update: ${Moment(course.updatedAt).format('LL')}`}
      </CardFooter>
    </Card>
  </>)
}

export default SingleCourseLessons