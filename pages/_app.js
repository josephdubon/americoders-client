import React from 'react'
import ReactDOM from 'react-dom'
import App from 'next/app'
import Router from 'next/router'

import PageChange from '../components/PageChange/PageChange.js'

import '/styles/scss/nextjs-material-kit.scss?v=1.2.0'
import { ToastContainer } from 'react-toastify'
import { PageHead } from '../components/PageHead/PageHead'
import { Provider } from '../context'

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
            {/* page head section*/}
            <PageHead title={'Americoders 🇺🇸'}/>

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
                <Content>
                    <DevSupport ComponentPreviews={ComponentPreviews}
                                useInitialHook={useInitial}
                    >
                        <Component {...pageProps}/>
                    </DevSupport>
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