import {useEffect} from 'react'

import TopNav from '../components/nav/TopNav'
import {Provider} from '../context'
import {Layout} from 'antd'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/styles.css'
import ParticlesEffect from '../components/effects/Particles'
import 'animate.css'
import SiteFooter from '../components/footer/SiteFooter'

const {Header, Footer, Content} = Layout


const {ToastContainer} = require('react-toastify')


function MyApp({Component, pageProps}) {
    // add this for bootstrap js components to render correctly
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap')
    }, [])

    return (
        // wrap app in provider for access to state
        <Provider>
            {/* parent layout */}
            <Layout>
                {/* notifications */}
                <ToastContainer
                    position='top-center'
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />

                {/* bg effect */}
                <ParticlesEffect/>

                {/* header area / nav area */}
                <Header>
                    {/* logo */}
                    {/*<Link href={'/'}>*/}
                    {/*    <a>*/}
                    {/*        <div className='logo'/>*/}
                    {/*    </a>*/}
                    {/*</Link>*/}
                    <TopNav/>
                </Header>

                {/* main content area */}
                <Content className='container'>
                    <Component {...pageProps}/>
                </Content>

                {/* main footer area */}
                <Footer>
                    <SiteFooter/>
                </Footer>
            </Layout>

        </Provider>
    )
}

export default MyApp