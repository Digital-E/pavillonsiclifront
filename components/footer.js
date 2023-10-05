import styled from "styled-components"
import Link from "./link"

import splitSlug from "../lib/splitSlug"

import EmailSubscribe from "./email-subscribe"

import Image from './image'

const Container = styled.footer`
  position: relative;
  display: flex;
  padding: var(--margin);
  z-index: 1;
  padding-bottom: var(--footer-padding-bottom);

  ::before {
    content: '';
    position: absolute;
    background: black;
    height: 1px;
    width: 100%;
    top: -1px;
    left: 0;
  }

  @media(max-width: 1400px) {
    flex-direction: column;
  }
`

const ColLeft = styled.div`
  display: flex;
  flex-basis: 50%;


  @media(max-width: 989px) {
    flex-direction: column;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: calc(4 * var(--margin));

  p {
    margin: 0;
  }

  @media(max-width: 989px) {
    margin-left: 0;
    margin-top: var(--margin);
  }
`

const ColRight = styled.div`
  display: flex;
  flex-basis: 50%;
  justify-content: flex-end;
  align-items: center;

  a {
    width: fit-content;
  }

  @media(max-width: 1400px) {
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: var(--margin);
  }
`

const ImageWrapper = styled.div`
  height: 40px;

  > div {
    height: 100%;
  }

  > div > img {
    height: 100% !important;
    width: auto !important;
  }
`
let List = styled.ul`
  display: flex;
  flex-direction: row;
  list-style-type: none;
  margin: 0;
  padding: 0;
`

let ListItem = styled.li`
  margin: 0;

  ::marker {
    display: none !important;
  }
`

let Socials = styled.div`
  display: flex;
  align-items: center;
  margin: var(--margin) 0  var(--margin) calc(4 * var(--margin));

  a {
    font-family: "Social Media Circled";
    font-size: 1.5rem;
  }

  ${ListItem} {
    margin-left: 5px;
  }

  @media(max-width: 989px) {
    margin: calc(var(--margin) * 2) 0  calc(var(--margin) * 2) 0;

    ${ListItem} {
      margin-left: 0;
      margin-right: 5px;
    }
  }
`


export default function Header({ data }) {

  return (
    <Container>
        <ColLeft>
          <EmailSubscribe data={data} />
          <Links>
            {data?.links?.map(item => <p><Link href={splitSlug(item.linkURL)}>{item.linkLabel}</Link></p>)}
          </Links>
          <Socials>
            <List>
              {data.socials.map(item => (
                <ListItem><Link href={item.linkURL}>{item.linkLabel}</Link></ListItem>
              ))}
            </List>
          </Socials>           
        </ColLeft>
        <ColRight>
          {data?.logos?.map(item => <Link href={item.linkURL}><ImageWrapper><Image data={item.image}/></ImageWrapper></Link>)}
        </ColRight>
    </Container>
  )
}
