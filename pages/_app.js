import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'
import {useEffect} from "react";

function MyApp({Component, pageProps}) {

    // add this for bootstrap js components to render correctly
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap');
    }, []);


    // get base component and any props
    return <Component {...pageProps}/>
}

export default MyApp