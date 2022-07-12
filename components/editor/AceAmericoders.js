import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-xml' // works just like HTML
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/ext-language_tools'
import {useState} from 'react'
import {ExpandAltOutlined, ShrinkOutlined} from '@ant-design/icons'

const AceBasic = (props) => {

    // editor props
    const {
        language,
        value,
        onChange,
        editorName,
        displayName
    } = props

    const [open, setOpen] = useState(true)


    return (<>
        {/* editor top area */}
        <div className={`editorContainer ${open ? '' : 'collapsed'}`}>
            <div className='editorHeader'>
                <h2>{displayName}</h2>
                <button
                    className='btn btn-primary btn-sm px-4 me-md-2'
                    onClick={() => setOpen(prevOpen => !prevOpen)}
                >
                    {!open ? <ExpandAltOutlined /> : <ShrinkOutlined />}
                </button>
            </div>

            {/* editor area */}
            <AceEditor
                value={value}
                mode={language}
                theme='dracula'
                onChange={onChange}
                name={editorName}
                editorProps={{$blockScrolling: true}}
                wrapEnabled={true}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    showLineNumbers: true,
                    tabSize: 4
                }}
                width={'100%'}
                className={'aceWrapper'}
            />
        </div>
    </>)
}

export default AceBasic