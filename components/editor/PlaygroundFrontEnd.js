import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import GridItem from '../Grid/GridItem'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/coursePage'

const AceDynamic = dynamic(
  () => import('../../components/editor/AceAmericoders'),
  { ssr: false },
)

const useStyles = makeStyles(styles)

const PlaygroundFrontEnd = ({ htmlValue }) => {
  // set state
  const [html, setHtml] = useState(htmlValue)
  const [srcDoc, setSrcDoc] = useState('')

  const classes = useStyles(styles)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
            <html lang='en'>
            <body>${html}</body>
            </html>
             `)
    }, 250)
    // clear out on every update
    return () => {
      clearTimeout(timeout)
    }
  }, [html])

  return (
    <>
      {/* editor area */}
      <GridItem xs={12} sm={12} md={12}>
        <AceDynamic
          language={'xml'}
          value={htmlValue}
          defaultValue={htmlValue}
          onChange={setHtml}
          editorName={'HTML'}
          displayName={'HTML'}
          className={classes.aceEditor}
        />
      </GridItem>

      {/*/!* iframe render area *!/*/}
      {/*<GridItem xs={10} sm={10} md={6} style={{ margin: '2rem 0' }}>*/}
      {/*  <div className={classes.editorRenderBox}>*/}
      {/*    <div className={classes.editorRenderBoxTop}>*/}
      {/*      <span className={classes.editorRenderBoxDot}></span>*/}
      {/*      <span className={classes.editorRenderBoxDot}></span>*/}
      {/*      <span className={classes.editorRenderBoxDot}></span>*/}
      {/*    </div>*/}

      {/*    <div className={classes.editorRenderBoxContent}>*/}
      {/*      <iframe*/}
      {/*        srcDoc={srcDoc}*/}
      {/*        title={'output'}*/}
      {/*        frameBorder={0}*/}
      {/*        sandbox={'allow-scripts'}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</GridItem>*/}
    </>
  )
}

export default PlaygroundFrontEnd
