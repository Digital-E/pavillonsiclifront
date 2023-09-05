import '../styles/normalize.css'
import '../styles/index.css'
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

import { credits } from "../lib/credits"


function MyApp({ Component, pageProps, router }) {

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
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
      <Script src='https://cdn.jsdelivr.net/gh/hmongouachon/rgbKineticSlider/js/libs/TweenMax.min.js' strategy='beforeInteractive' />
      <Script src='https://cdn.jsdelivr.net/gh/hmongouachon/rgbKineticSlider/js/libs/imagesLoaded.pkgd.min.js' strategy='beforeInteractive'/>
      <Script src='https://cdn.jsdelivr.net/gh/hmongouachon/rgbKineticSlider/js/libs/pixi.min.js' strategy='beforeInteractive'/>
      <Script src='https://cdn.jsdelivr.net/gh/hmongouachon/rgbKineticSlider/js/libs/pixi-filters.min.js' strategy='beforeInteractive'/>
      <Script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js" integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <Script src="https://apis.google.com/js/api.js" strategy='beforeInteractive' />
      <Script src="https://accounts.google.com/gsi/client" strategy='beforeInteractive' />
      {/* <Script src='https://cdn.jsdelivr.net/gh/hmongouachon/rgbKineticSlider/js/rgbKineticSlider.js' strategy='beforeInteractive'/> */}
      <Script src='scripts/rgbKineticSlider.js' strategy='beforeInteractive'/>
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
        </motion.div>
      </AnimatePresence>
      <Notification />
    </StateProvider>
  )
}

export default MyApp
