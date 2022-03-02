import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'

function MyApp({Component, pageProps}) {
    // get base component and any props
    return <Component {...pageProps}/>
}

export default MyApp