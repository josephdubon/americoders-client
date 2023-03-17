import { split as SplitEditor } from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-language_tools'

const AceSplitEditor = () => {
  function onChange(newValue) {
    console.log('change', newValue)
  }

  return (
    <>
      {/* editor */}
      <SplitEditor
        mode="javascript"
        theme="tomorrow"
        splits={2}
        orientation="below"
        value={['hi', 'hello']}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{ $blockScrolling: true }}
      />
    </>
  )
}

export default AceSplitEditor
