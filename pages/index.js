import { useEffect } from "react"
import router from "next/router"

export default function Index({}) {
    useEffect(() => {
        router.replace("/fr")

        // let lang = window.navigator.language
        // if(lang === "en-GB") {
        //     router.replace("/en")
        // } else if (lang === "fr-FR") {
        //     router.replace("/fr")
        // } else {
        //     router.replace("/en")
        // }
    },[])

    return null
  }