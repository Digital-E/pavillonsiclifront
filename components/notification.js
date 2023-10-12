import { useEffect, useState, useContext } from 'react'
import styled from "styled-components"

import { store } from "../store";

const Container = styled.div``;

const Popup = styled.div`
    position: fixed;    
    width: calc(50vw - 20px);
    bottom: 20px;
    right: 20px;
    background: white;
    min-height: 150px;
    padding: 15px 20px;
    z-index: 999;
    box-sizing: border-box;

    &&.show-notification {
        transform: translateY(0);
        transition: transform ease-in-out 0.3s;
    }

    &&.hide-notification {
        transform: translateY(calc(100% + 20px));
        transition: transform ease-in-out 0.3s;
    }

    @media(min-width: 1800px) {
        right: calc((100vw - 1800px) / 2 + 20px);
        width: calc(1800px / 2 - 20px);
    }
      

    @media(max-width: 989px) {
        width: calc(100vw - 30px);
        bottom: 20px;
        right: auto;
        left: 15px;
        padding: 10px 15px 0 10px;

        &&.hide-notification {
            transform: translateY(calc(100% + 76px));
        }
    }
`;

const Overlay = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 999;

    &&.show-overlay {
        opacity: 1;
        transition: opacity ease-in-out 0.3s 0s, transform linear 0s 0s;  
        transform: translateX(0);
    }

    &&.hide-overlay {
        opacity: 0;
        transition: opacity ease-in-out 0.3s, transform linear 0s 0.3s;
        transform: translateX(-100%);
    }
`



const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    width: fit-content;
    font-size: 14px;
`

const Text = styled.div`
`


const Component = () => {
    let [displayNotification, setDisplayNotification] = useState(false)
    let [notificationMessage, setNotificationMessage] = useState("")

    //Context
    const context = useContext(store);
    const { state, dispatch } = context;

    useEffect(() => {
        if(state.notificationMessage === null) return setDisplayNotification(false)

        setNotificationMessage(state.notificationMessage)
        setDisplayNotification(true)
    }, [state.notificationMessage])

    useEffect(() => {
        setDisplayNotification(false)
    }, [])

    let closeNotification = () => {
        dispatch({type: "update notification message", value: null})
    }
    

    return (
        <Container>
            <Overlay onClick={() => closeNotification()} className={displayNotification ? 'show-overlay' : 'hide-overlay'}/>
            <Popup className={displayNotification ? 'show-notification' : 'hide-notification'}>
                <Close onClick={() => closeNotification()} className='p'>Close</Close>
                <Text>
                    {/* <h6>DONE!</h6> */}
                    <p className='body-medium'>{notificationMessage}</p>
                </Text>
            </Popup>
        </Container>
    )
}

export default Component

