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
        <Content>
            {/* editor area */}
            <div className='container-full row'>
                <div className='col'>

                    <Collapse
                        defaultActiveKey={['1']}
                        className='editorCollapse'
                        ghost
                        accordion
                        expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                    >
                        {/* html */}
                        <Panel header='HTML' key='1'>
                            <AceDynamic
                                language={'xml'}
                                value={htmlValue}
                                defaultValue={htmlValue}
                                onChange={setHtml}
                                editorName={'HTML'}
                                displayName={'HTML'}
                            />
                        </Panel>

                        {/* css */}
                        <Panel header='CSS' key='2'>
                            <AceDynamic
                                language={'css'}
                                value={cssValue}
                                defaultValue={cssValue}
                                onChange={setCss}
                                editorName={'CSS'}
                                displayName={'CSS'}
                            />
                        </Panel>

                        {/* javascript */}
                        <Panel header='JavaScript' key='3'>
                            <AceDynamic
                                language={'javascript'}
                                value={jsValue}
                                defaultValue={jsValue}
                                onChange={setJavascript}
                                editorName={'JavaScript'}
                                displayName={'JavaScript'}
                            />
                        </Panel>
                    </Collapse>
                </div>

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