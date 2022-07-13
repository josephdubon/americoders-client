import {Layout} from 'antd'
import dynamic from 'next/dynamic'
import {useEffect, useState} from 'react'

const {Content} = Layout

const AceDynamic = dynamic(
    () => import('../../components/editor/AceAmericoders'),
    {ssr: false}
)

const PlaygroundFrontEnd = ({htmlValue, cssValue, jsValue}) => {
    // set state
    const [html, setHtml] = useState('')
    const [css, setCss] = useState('')
    const [javascript, setJavascript] = useState('')
    const [srcDoc, setSrcDoc] = useState('')

    useEffect(() => {
        const timeout = setTimeout(() => {
            setSrcDoc(`
            <html lang='en'>
            <body>${html}</body>
            <style>${css}</style>
            <script>${javascript}</script>
            </html>
             `)
        }, 250)
        // clear out on every update
        return () => {
            clearTimeout(timeout)
        }
    }, [html, css, javascript])

    return (<>
        <Content>
            {/* editor area */}
            <div className='container-fluid bg-body pane topPane'>
                {/* html */}
                <AceDynamic
                    language={'xml'}
                    value={html}
                    onChange={setHtml}
                    editorName={'HTML'}
                    displayName={'HTML'}
                />

                {/* css */}
                <AceDynamic
                    language={'css'}
                    value={css}
                    onChange={setCss}
                    editorName={'CSS'}
                    displayName={'CSS'}
                />

                {/* javascript */}
                <AceDynamic
                    language={'javascript'}
                    value={javascript}
                    onChange={setJavascript}
                    editorName={'JavaScript'}
                    displayName={'JavaScript'}
                />
            </div>
        </Content>

        <Content>
            {/* iframe render area */}
            <div className='container-fluid bg-body editorArea'>
                <iframe
                    srcDoc={srcDoc}
                    title={'output'}
                    sandbox={'allow-scripts'}
                    frameBorder={'0'}
                    width={'100%'}
                    height={'100% '}
                />
            </div>
        </Content>
    </>)
}

export default PlaygroundFrontEnd