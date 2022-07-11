import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-xml' // works just like HTML
import 'ace-builds/src-noconflict/mode-css'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-dracula'
import 'ace-builds/src-noconflict/ext-language_tools'

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
                <button className='btn btn-primary btn-sm px-4 me-md-2 m-3'>Open/Close</button>
            </div>

            {/* editor area */}
            <AceEditor
                value={value}
                mode={language}
                theme='dracula'
                onChange={onChange}
                name={editorName}
                editorProps={{$blockScrolling: true}}
                highlightActiveLine={true}
                wrapEnabled={true}
                width={'100%'}
            />
        </div>
    </>)
}

export default AceBasic