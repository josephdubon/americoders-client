import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-xml' // works just like HTML
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/ext-language_tools'
import {useState} from 'react'

const AceBasic = (props) => {

    // editor props
    const {
        language,
        value,
        defaultValue,
        onChange,
        editorName,
        displayName
    } = props

    const [open, setOpen] = useState(true)


    return (<>
        {/* editor top area */}
        <div className={`editorContainer ${open ? '' : 'collapsed'}`}>

            {/* editor area */}
            <AceEditor
                value={value}
                mode={language}
                theme='dracula'
                defaultValue={defaultValue}
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
            />
        </div>
    </>)
}

export default AceBasic