import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import GridItem from '../Grid/GridItem'
import { makeStyles } from '@material-ui/core/styles'
import styles from '../../styles/jss/americoders/pages/coursePage'

const AceDynamic = dynamic(
  () => import('../../components/editor/AceAmericoders'),
  { ssr: false }
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

  return (<>
    {/* editor area */}
    <GridItem xs={10} sm={10} md={6}>
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

                {/* iframe render area */}
                <div className='col'>
                    <div id='browser'>
                        <div id='browserTitle'>Code Live Preview:</div>
                        <div id='browserTop'>
                            <div id='closeBtn'/>
                            <div id='minBtn'/>
                            <div id='fullBtn'/>
                            <div id='full'/>
                            <div id='back'/>
                            <div id='forward'/>
                            <div id='url'/>
                        </div>
                        <div id='pageContent'>

                            {/* iframe area */}
                            <div className='bg-body p-2 h-100'>
                                <iframe
                                    srcDoc={srcDoc}
                                    title={'output'}
                                    sandbox={'allow-scripts'}
                                    frameBorder={'0'}
                                    className='editorArea'
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </Content>

        <Content className='editorArea'>
        </Content>
    </>)
}

export default PlaygroundFrontEnd