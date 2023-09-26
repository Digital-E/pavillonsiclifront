import '../styles/normalize.css'
import '../styles/index.css'
import 'plyr/dist/plyr.css'
import '../styles/flickity.css'
import '../styles/flickity-fade.css'

import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
import Script from 'next/script'
import { motion, AnimatePresence } from 'framer-motion'
import { StateProvider } from "../store"
import { getClient } from '../lib/sanity.server'
import { allEvents } from '../lib/queries'

import Body from "../components/body"
// import CookieConsent from "react-cookie-consent"
import Notification from '../components/notification'

import Header from '../components/header'
import Calendar from '../components/calendar'

import { credits } from "../lib/credits"


function MyApp({ Component, pageProps, router }) {
  // let router = useRouter();
  let [calendarData, setCalendarData] = useState(null);

  let getMenuHeight = () => {
    document.querySelector('header').style.height = 'auto';
    let menuHeight = document.querySelector('header').getBoundingClientRect().height
    document.documentElement.style.setProperty("--menu-height", `${menuHeight}px`)
  }

  let setFooterPadding = () => {
    if(window.innerWidth < 990) {
      return document.documentElement.style.setProperty("--footer-padding-bottom", `50px`)
      // return document.querySelector('footer').style.paddingBottom = '50px'
    }

    let calendarHeight = document.querySelector('.home-calendar')?.getBoundingClientRect().height;
    document.documentElement.style.setProperty("--footer-padding-bottom", `${calendarHeight + 10}px`)
    // document.querySelector('footer').style.paddingBottom = `${calendarHeight + 10}px`
  }

  let getCalendarData = async () => {
    let calendarData = await getClient(false).fetch(allEvents, {
      language: router.query.language
    })

    setCalendarData(calendarData)

    setTimeout(() => {
      setFooterPadding()
    }, 100)
  }

  useEffect(() => {
    setTimeout(() => {
      document.querySelector("#__next").style.opacity = 1
      getMenuHeight();
    }, 250)

    window.addEventListener('resize', getMenuHeight)
    window.addEventListener('resize', setFooterPadding)

    // Fetch calendar data
    getCalendarData();

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
      {calendarData !== null && <Calendar data={calendarData} />}
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
