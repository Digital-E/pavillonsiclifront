import { useState, useContext, useEffect } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { motion, AnimatePresence } from 'framer-motion'

import { store } from '../../store'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Locked from './locked'
import Unlocked from './unlocked'

const Container = styled.div`
    @media(max-width: 989px) {
        position: fixed;
        height: 100%;
        width: 100%;
    }
`

const Background = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 0;

    video {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }
`

const Overlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
`


export default function Component ({ data = {}, footerData, preview = false }) {
    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    const router = useRouter()
    let [locked, setLocked] = useState(true)

    // const slug = data?.slug

    // if (!router.isFallback && !slug) {
    //     return <ErrorPage statusCode={404} />
    // }

    useEffect(() => {
        document.querySelector('footer').style.display = 'none'
        document.querySelector('body').classList.add('lock-scroll')

        

        return () => {
            if(document.querySelector('footer')) {
                document.querySelector('footer').style.display = 'flex'
            }
            document.querySelector('body').classList.remove('lock-scroll')
        }
    }, [])

    useEffect(() => {
        if(state.unlocked) {
            setLocked(false)

            setTimeout(() => {
                document.querySelectorAll('.question-tile-container').forEach(item => {
                    item.classList.add('question-tile-container-reveal')
                })
            }, 1000)
        }
    }, [state.unlocked])

    let variants = {
        'show': {
            opacity: 1,
            transition: {
                duration: 0.3,
                delay: 0.3
            }
        },
        'hide': {
            opacity: 0
        }
    }

    return (
        <>
            <Layout preview={preview} title={`Calculator | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                <Background>
                    <Overlay />
                    <video src={data?.backgroundVideo} autoPlay muted loop playsInline/>
                </Background> 
                <AnimatePresence mode='wait'>
                    {
                        locked ?
                        <motion.div key={1}  initial="hide" animate="show" exit="hide" variants={variants}>
                            <Locked />
                        </motion.div>
                        :
                        <motion.div key={2}  initial="hide" animate="show" exit="hide" variants={variants}>
                            <Unlocked data={data.questions}  />
                        </motion.div>
                    }     
                </AnimatePresence>              
                </Container>
            </Layout>
        </>
    )
}

