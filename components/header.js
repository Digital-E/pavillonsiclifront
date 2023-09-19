import { useState, useRef, useEffect } from "react"
import { useRouter } from 'next/router'
import styled from "styled-components"

import Link from './link'
import LocaleLink from './locale-link'

const Container = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  z-index: 999;
  background: white;
  border-bottom: 1px solid black;

  &.nav--open .nav-mobile-burger > div:nth-child(1) {
    position: absolute;
    transform: rotateZ(45deg);
    transform-origin: center center;
  }

  &.nav--open .nav-mobile-burger > div:nth-child(2) {
    position: absolute;
    transform: rotateZ(-45deg);
    transform-origin: center center;
  }

  &.nav--open .nav-mobile-burger > div:nth-child(3) {
    display: none;
  }

  .sub-menu--open .nav__dropdown-arrow {
    transform: rotateZ(45deg);
  }

  .sub-menu--open .nav__sub-menu {
    display: flex;
  }

  @media(max-width: 989px) {

    &.nav {
      justify-content: space-between;
      align-items: center;
    }

    .nav-menu {
      display: none;
    }

    &.nav--open .nav-menu {
      display: flex;
      position: absolute;
      top: 61px;
      background: white;
      flex-direction: column;
      width: 100%;
    }

    .language-switch {
      margin-top: calc(2 * var(--margin));
    }
  }
`

const ColLeft = styled.div`
  display: flex;
  align-items: flex-end;
  padding: var(--margin);
`

const Text = styled.div`
  font-size: 1.2rem;
  margin-left: calc(3 * var(--margin));

  @media(max-width: 989px) {
    font-size: 0.7rem;
    margin-left: calc(2 * var(--margin));
  }
`


const Logo = styled.div`
  height: 90px;

  img {
    height: 100%;
    width: auto;
  }

  @media(max-width: 989px) {
    height: 40px;
  }
`

const Menu = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-auto-flow: column;
  width: fit-content;
  margin-left: auto;
  border-left: 1px solid black;

  @media(max-width: 989px) {
    border: none;
    border-bottom: 1px solid black;
  }
`

const MenuElement = styled.div`
  position: relative;
  border-right: 1px solid black;

  a {
    width: fit-content;
    margin: calc(var(--margin) / 2) var(--margin);
    font-size: 1.2rem;
  }

  :nth-child(3n + 1) a {
    margin-top: var(--margin);
  }

  :nth-child(3n) a {
    margin-bottom: var(--margin);
  }

  :nth-last-child(1),
  :nth-last-child(2)
   {
    border-right: none;
  }

  @media(max-width: 989px) {
    border: none;
    display: flex;
    align-items: center;

    :nth-child(n) a {
      margin: var(--margin);
    }
  }
`

const SubMenu = styled.div`
  position: absolute;
  top: 100%;
  margin-left: -1px;
  width: 100%;
  display: none;
  flex-direction: column;
  border: 1px solid black;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  background: white;
  z-index: 1;
`

const DropdownArrow = styled.div`
  position: relative;
  top: 2px;
  height: 6px;
  width: 6px;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
  transform: rotateZ(-45deg);

  @media(min-width: 990px) {
    display: none;
  }
`


const MobileToggleButton = styled.div`
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  position: relative;
  width: 30px;
  height: 35px;
  right: var(--margin);
  z-index: 1;

  > div {
    height: 1px;
    width: 30px;
    background-color: black;
    margin: 3px 0px;
  }

  @media(min-width: 990px) {
    display: none;
  }
`






export default function Header({ data }) {
  let router = useRouter()

  let toggleSubMenuDesktop = (e, action) => {
    if(window.innerWidth < 990 || e.currentTarget.children.length === 1) return

    if(action === 'open') {
      e.currentTarget.classList.add('sub-menu--open')
    } else {
      e.currentTarget.classList.remove('sub-menu--open')
    }
  }

  let toggleSubMenuMobile = (e) => {
    if(window.innerWidth > 989 || e.currentTarget.children.length === 1) return

    if(e.currentTarget.classList.contains('sub-menu--open')) {
      e.currentTarget.classList.remove('sub-menu--open')
    } else {
      e.currentTarget.classList.add('sub-menu--open')
    }
  }

  const toggleNavMobile = (childCount) => {
    if(childCount > 0) return
    let nav = document.querySelector('.nav')
    if(nav.classList.contains('nav--open')) {
      document.querySelector('.nav').classList.remove('nav--open')
      document.querySelector('.sub-menu--open')?.classList.remove('sub-menu--open')

    } else {
      document.querySelector('.nav').classList.add('nav--open')
    }
  }

  return (
    <>
    <Container className='nav'>
      <ColLeft>
        <Link href={router.query.language}>
          <Logo>
            <img src='/logo/pavillonsicli_logo.jpg'/>
          </Logo>
        </Link>
        <Text>
          Architecture et <br/> Arts du Bâti
        </Text>
      </ColLeft>
      <MobileToggleButton className="nav-mobile-burger" onClick={() => toggleNavMobile()}>
        <div></div>
        <div></div>
        <div></div>
      </MobileToggleButton>
      <Menu className='nav-menu'>
        {data?.links.map(item => 
          <MenuElement onMouseEnter={(e) => toggleSubMenuDesktop(e, 'open')} onMouseLeave={(e) => toggleSubMenuDesktop(e, 'close')} onClick={(e) => toggleSubMenuMobile(e)}>
            <div onClick={() => toggleNavMobile(item.subLinks?.length)}><Link href={item.linkURL}>{item.linkLabel}</Link></div>
            {item.subLinks?.length > 0 && <DropdownArrow className='nav__dropdown-arrow'/>}
            {item.subLinks?.length > 0 ?
              <SubMenu className='nav__sub-menu'>
                {item.subLinks?.map(item => <div onClick={() => toggleNavMobile()}><Link href={item.linkURL}>{item.linkLabel}</Link></div>)}
              </SubMenu>
              :
              null          
            }
          </MenuElement>
        )}
        <MenuElement className='language-switch'><LocaleLink href='/en'>En</LocaleLink></MenuElement>
        <MenuElement><LocaleLink href='/fr'>Fr</LocaleLink></MenuElement>
      </Menu>
    </Container>
    </>
  )
}
