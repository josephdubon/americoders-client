import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-xml' // works just like HTML
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import {Button} from 'antd'

const AceBasic = (props) => {

    // editor props
    const {
        language,
        displayName,
        value,
        onChange,
        editorName,
    } = props

    return (<>
        {/* editor top area */}
        <div className='editorContainer'>
            <div className='editorTitle'>
                {displayName}
                <Button>Open/Close</Button>
            </div>
        </div>

        {/* editor area */}
        <AceEditor
            value={value}
            mode={language}
            theme='monokai'
            onChange={onChange}
            name={editorName}
            editorProps={{$blockScrolling: true}}
            highlightActiveLine={true}
            wrapEnabled={true}
        />
    </>)
}

export default AceBasic