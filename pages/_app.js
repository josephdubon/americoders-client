import TopBanner from "../components/top-banner/TopBanner";
import {useEffect} from 'react'

import TopNav from '../components/nav/TopNav'
import Footer from '../components/footer/Footer'
import {Provider} from '../context'

import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'

const {ToastContainer} = require('react-toastify')


function MyApp({Component, pageProps}) {
    // add this for bootstrap js components to render correctly
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap');
    }, []);

    return (
        // wrap app in provider for access to state
        <Provider>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <TopBanner/>
            <TopNav/>
            <Component {...pageProps}/>
            <Footer/>
        </Provider>
    )
}

export default MyApp