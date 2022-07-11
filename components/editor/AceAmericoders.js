import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'

const AceBasic = () => {

    // editor props
    const {
        language,
        displayName,
        value,
        onChange,
        editorName,
    } = props

    return (<>
        {/* editor */}
        <AceEditor
            value={value}
            mode={language}
            theme='monokai'
            onChange={onChange}
            name={editorName}
            editorProps={{$blockScrolling: true}}
            highlightActiveLine={true}
        />
    </>)
}

export default AceBasic