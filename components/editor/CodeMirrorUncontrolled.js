import CodeMirror from '@uiw/react-codemirror'
import {javascript} from '@codemirror/lang-javascript'
import {useCallback} from 'react'

const CodeMirrorUncontrolled = () => {
    const onChange = useCallback((value, viewUpdate) => {
        console.log('value:', value)
    }, [])

    return (<>
        <CodeMirror
            value="console.log('hello world!');"
            height='200px'
            extensions={[javascript({jsx: true})]}
            onChange={onChange}
        />
    </>)
}

export default CodeMirrorUncontrolled