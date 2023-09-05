import { useState, useRef, useEffect } from "react"
import { useRouter } from 'next/router'
import styled from "styled-components"

import Link from './link'
import Image from './image'

const Container = styled.header`
  position: fixed;
  left: 50%;
  top: 0;
  transform: translate(-50%, 0);
  z-index: 999;
  transition: top 0.5s, transform 0.5s;

  .header-background {
    background: rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(40px);
  }

  @media(max-width: 989px) {
    display: flex;
    justify-content: center;
    width: fit-content;
  }

  &.center {
    top: 50%;
    transform: translate(-50%,-50%);
  }

  @media(max-width: 989px) {
    &.nav--open {
      top: 0;
      transform: translate(-50%, 0);
    }
  }

  // Mobile Burger

  &.nav--open .nav__mobile-burger > div:nth-child(1) {
      position: absolute;
      transform: rotateZ(30deg);
      transform-origin: center center;
  }

  &.nav--open .nav__mobile-burger > div:nth-child(2) {
      position: absolute;
      transform: rotateZ(-30deg);
      transform-origin: center center;
  }

  &.nav--open .nav__mobile-burger > div:nth-child(3) {
      display: none;
  } 
`

const InnerContainer = styled.div`
  position: relative;
  display: flex;
  color: white;
`
const MobileBurger = styled.div`
  display: flex;
  width: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 1px;

  > div {
    height: 1px;
    width: 35px;
    background-color: white;
    margin: 4px 0px;
  } 

  @media(min-width: 990px) {
    display: none;
  }
`


const Overlay = styled.div`
    position: fixed;
    height: 100vh;
    width: 100vw;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.8);
    z-index: 1;

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

const Logo = styled.div`
    display: flex;
    align-items: center;
    padding: 0 10px;
    height: 50px;

    a {
      display: flex;
    }

    @media(max-width: 989px) {
      padding: 0 50px;
    }
`

const Menu = styled.div`
    display: flex;
    top: 51px;
    flex-direction: column;
    padding: 16px 0 0 0;
    margin-left: 1px;

    @media(max-width: 989px) {
      position: absolute;
      height: 1px;
      width: 100% !important;
      opacity: 0;
      padding: 0;
      margin-left: 0;
      overflow: hidden;
      transition: height 0.2s cubic-bezier(0.33, 1, 0.68, 1), opacity 0s 0.2s;

      &.menu--open {
        opacity: 1;
        height: calc(100vh - 50px);
        transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0s 0s;
    }
`

const Links = styled.div`
    display: flex;
    width: fit-content;

    @media(max-width: 989px) {
      flex-direction: column;
      transition: transform 0.5s cubic-bezier(0.33, 1, 0.68, 1), opacity 0.4s cubic-bezier(0.33, 1, 0.68, 1);
      opacity: 1;

      &.submenu--open {
        opacity: 0;
        transform: translate(-100%);
        transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1), opacity 0.4s cubic-bezier(0.65, 0, 0.35, 1);
      }
`

const LinkWrapper = styled.div`
    display: flex;
    align-items: center;
    
    margin: 0 20px;

    a {
      display: flex;
      font-size: 0.875rem;
    }

    img {
      margin-left: 10px;
    }

    @media(max-width: 989px) {
      margin: 0 20px 30px 20px;

      :first-child {
        margin-top: 70px;
      }

      a {
        font-size: 1.25rem;
      }
    }
`

const DonateLink = styled.a`
    width: fit-content;
`

const Donate = styled.div`
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin-left: 1px;
  font-size: 0.875rem;
  width: 140px;


  @media(max-width: 989px) {
    width: 70px;
  }
`


const SubMenuArrow = styled.img`
    position: relative;
    top: 0.5px;
    transform: rotateZ(-90deg);
    transition: transform 0.3s;

    // &.arrow-rotate {
    //   transform: rotateZ(0deg);
    // }
`

const SubMenu = styled.div`
  padding-top: 20px;
  overflow: scroll;
  height: 0;
  transition: height 0.5s cubic-bezier(0.33, 1, 0.68, 1);
  pointer-events: none;

  &.submenu--open {
    height: calc(100vh - 50px);
    transition: height 0.5s cubic-bezier(0.65, 0, 0.35, 1);
    pointer-events: all;
  }

  @media(max-width: 989px) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 0;
    transform: translateX(100%);
    transition: transform 0.5s cubic-bezier(0.33, 1, 0.68, 1), height 0s 0.5s;

    &.submenu--open {
      height: 100%;
      transform: translateX(0%);
      transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1), height 0s 0s;
    }
  }

  @media(min-width: 990px) {
    mask-image: linear-gradient(180deg, transparent 20px, black 20px);
  }
`

const SubLinks = styled.div`
`

const SubLinkWrapper = styled.div`
    margin-bottom: 40px;

    :first-child {
      margin-top: 60px;
    }

    :nth-child(odd) {
      width: 80%;
    }

    :nth-child(odd) > a > div:nth-child(2) {
      text-align: right;
    }

    :nth-child(even) {
      width: 70%;
      margin-left: auto;
    }
`

const Caption = styled.div`
    margin-top: 10px;
    text-transform: uppercase;

    p {
      margin: 0;
    }
`

const Back = styled.div`
    display: flex;
    width: fit-content;
    margin-left: 20px;

    @media(min-width: 990px) {
      display: none;
    }
`

const BackArrow = styled.img`
    margin-right: 10px;
    transform: rotateZ(90deg);
`


export default function Header({ data }) {
  let [menuOpen, setMenuOpen] = useState(false);
  let [subMenuOpen, setSubMenuOpen] = useState(false);
  let menuRef = useRef();
  let linksRef = useRef();
  let [isHome, setIsHome] = useState(false)

  let router = useRouter()

  let resizeMenu = () => {
    menuRef.current.style.width = `${linksRef.current.getBoundingClientRect().width}px`

    // Set Header Width Root CSS Value
    let headerWidth = document.querySelector('.header-container').getBoundingClientRect().width
    document.documentElement.style.setProperty('--header-width', `${headerWidth}px`)
  }

  useEffect(() => {
    if(typeof window === 'undefined') return
    setTimeout(() => {
      resizeMenu()
      window.addEventListener('resize', resizeMenu)
    }, 100)
  }, []);

  let scrollToTop = () => {
    gsap.to(window, {duration: 2, ease: 'power3.inOut', scrollTo: {y: 0, offsetY: 20} });
  }

  let desktopMouseAction = (bool) => {
    if(window.innerWidth > 990) {
      setSubMenuOpen(bool)
    }
  }

  useEffect(() => {
    if(router.pathname === '/') {
      setIsHome(true)
    } else {
      setIsHome(false)
    }
  }, [router])

  let toggleCloseOnLinkClick = () => {
    if(window.innerWidth > 990) {
      setSubMenuOpen(!subMenuOpen)
    } else {
      setMenuOpen(false)
    }
  }

  return (
    <>
    {/* <Overlay onClick={() => setMenuOpen(false)} className={menuOpen ? 'show-overlay' : 'hide-overlay'}/> */}
    <Container className={menuOpen ? `nav--open header-container ${isHome && 'center'}` : `header-container ${isHome === true && 'center'}`}> 
      <InnerContainer>
        <MobileBurger className='header-background nav__mobile-burger' onClick={() => setMenuOpen(!menuOpen)}>
          <div></div>
          <div></div>
          <div></div>
        </MobileBurger>
        <Logo className='header-background'>
          <Link href='/'>
            <img src='/logo/logo.svg' />
          </Link>
        </Logo>
        <Menu className={menuOpen ? 'header-background menu--open menu' : 'header-background menu'} ref={menuRef}>
          <Links className={subMenuOpen ? 'submenu--open' : ''} ref={linksRef}>
            {
              data?.links?.map(item => {
                if(item?.subLinks?.length > 0) {
                  return (
                    <LinkWrapper onMouseEnter={() => desktopMouseAction(true)} onMouseLeave={() => desktopMouseAction(false)} onClick={() => setSubMenuOpen(!subMenuOpen)}>
                      <a>{item.linkLabel} <SubMenuArrow className={subMenuOpen && 'arrow-rotate'} src='/icons/menu-arrow.svg' /></a>
                    </LinkWrapper>
                  )
                } else {
                  return (
                    <LinkWrapper onClick={() => setMenuOpen(!menuOpen)}><Link href={item.linkURL}>{item.linkLabel}</Link></LinkWrapper>
                  )
                }
              })
            }
          </Links>

          <SubMenu className={subMenuOpen ? 'submenu--open' : ''} onMouseEnter={() => setSubMenuOpen(true)} onMouseLeave={() => setSubMenuOpen(false)}>
            <Back onClick={() => setSubMenuOpen(false)}><BackArrow src='/icons/menu-arrow.svg' /><span>Back</span></Back>
            {/* <SubLinks>
              {data?.links[3]?.subLinks?.map(item => (
                <SubLinkWrapper onClick={() => toggleCloseOnLinkClick()}>
                  <Link href={`projects/${item.slug}`}>
                    <Image data={item.heroImage} />
                    <Caption><p className='body-small'>{item.title}</p></Caption>
                  </Link>
                </SubLinkWrapper>
              ))}
            </SubLinks> */}
          </SubMenu>
        </Menu>
        <DonateLink href='https://www.paypal.com/donate/?hosted_button_id=FESC9NMPEUBC4' target='_blank'><Donate className='header-background'>Donate</Donate></DonateLink>
      </InnerContainer>
    </Container>
    </>
  )
}
