import '../styles/normalize.css'
import '../styles/index.css'
import 'plyr/dist/plyr.css'
import '../styles/flickity.css'
import '../styles/flickity-fade.css'

import { useEffect } from 'react'
import Script from 'next/script'
import { motion, AnimatePresence } from 'framer-motion'
import { StateProvider } from "../store"

import Body from "../components/body"
// import CookieConsent from "react-cookie-consent"
import Notification from '../components/notification'

import Header from '../components/header'
import Footer from '../components/footer'

import { credits } from "../lib/credits"


function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1

      let menuHeight = document.querySelector('header').getBoundingClientRect().height
      document.documentElement.style.setProperty("--menu-height", `${menuHeight}px`)
    }, 250)

    sessionStorage.setItem('hasSetCalculatorData', 'false')


    // // Credits
    // console.clear()

    // console.log(`
    // ${credits}
    // samuelbassett.xyz
    // Design + Development
    // https://samuelbassett.xyz
    // `)

  },[])

  let desktopVariants = {
    pageInitial: {
      opacity: 0
    },
    pageAnimate: {
      opacity: 1,
      transition: {
        duration: 1
      }
    },
    pageExit: {
      opacity: 0,
      filter: "blur(20px)",
      transition: {
        opacity: {
          duration: 0.5
        },
        filter: {
          duration: 0.5,
        }
      }
    }
  }

  return (
    <StateProvider>
      <Header data={pageProps.data?.menuData} />
      <Script src="https://apis.google.com/js/api.js" strategy='beforeInteractive' />
      <Script src="https://accounts.google.com/gsi/client" strategy='beforeInteractive' />
      {/* <CookieConsent
        buttonText={pageProps.data?.menuData.cookieaccept}
        declineButtonText={pageProps.data?.menuData.cookierefuse}
        enableDeclineButton
        cookieName={"ContrechampsCHCookieConsent"}
        onAccept={() => {
          // gtag('consent', 'update', {
          //   'analytics_storage': 'granted'
          // });
        }}
        onDecline={() => {}}
        >
        <Body content={pageProps.data?.menuData.cookietext} />
      </CookieConsent> */}
      <AnimatePresence mode='wait' onExitComplete={() => { window.scrollTo(0,0) }}>   
        <motion.div key={router.asPath} initial="pageInitial" animate="pageAnimate" exit="pageExit" variants={desktopVariants}> 
          <Component {...pageProps} />
          {/* <Footer data={pageProps.data?.footerData} /> */}
        </motion.div>
      </AnimatePresence>
      <Notification />
    </StateProvider>
  )
}

export default MyApp
