import { useState, useRef, useEffect } from "react"
import { useRouter } from 'next/router'
import styled from "styled-components"

import Link from './link'

const Container = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  z-index: 999;
  background: white;
  border-bottom: 1px solid black;
`

const ColLeft = styled.div`
  display: flex;
  align-items: flex-end;
  padding: var(--margin);
`

const Text = styled.div`
  font-size: 1.2rem;
  margin-left: calc(3 * var(--margin));
`


const Logo = styled.div`
  height: 90px;

  img {
    height: 100%;
    width: auto;
  }
`

const Menu = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  grid-auto-flow: column;
  width: fit-content;
  margin-left: auto;
  border-left: 1px solid black;
`

const MenuElement = styled.div`
  position: relative;
  border-right: 1px solid black;

  a {
    width: fit-content;
    margin: calc(var(--margin) / 2) var(--margin);
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

  &.sub-menu--open {
    display: flex;
  }
`





export default function Header({ data }) {

  let toggleSubMenu = (e, action) => {
    if(action === 'open') {
      e.currentTarget.children[1]?.classList.add('sub-menu--open')
    } else {
      e.currentTarget.children[1]?.classList.remove('sub-menu--open')
    }
  }

  return (
    <>
    <Container>
      <ColLeft>
        <Logo>
          <img src='/logo/pavillonsicli_logo.jpg'/>
        </Logo>
        <Text>
          Architecture et <br/> Arts du Bâti
        </Text>
      </ColLeft>
      <Menu>
        {data?.links.map(item => 
          <MenuElement onMouseEnter={(e) => toggleSubMenu(e, 'open')} onMouseLeave={(e) => toggleSubMenu(e, 'close')}>
            <Link>{item.linkLabel}</Link>
            {item.subLinks?.length > 0 ?
              <SubMenu>
                {item.subLinks?.map(item => <Link>{item.linkLabel}</Link>)}
              </SubMenu>
              :
              null          
            }
          </MenuElement>
        )}
        <MenuElement><Link>En</Link></MenuElement>
        <MenuElement><Link>Fr</Link></MenuElement>
      </Menu>
    </Container>
    </>
  )
}
