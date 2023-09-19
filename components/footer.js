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

  ::before {
    content: '';
    position: absolute;
    background: black;
    height: 1px;
    width: 100%;
    top: -1px;
    left: 0;
  }

  @media(max-width: 989px) {
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

  a {
    width: fit-content;
  }

  @media(max-width: 989px) {
    justify-content: flex-start;
    flex-wrap: wrap;
  }
`

const ImageWrapper = styled.div`
  height: 70px;

  > div {
    height: 100%;
  }

  > div > img {
    height: 100% !important;
    width: auto !important;
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
        </ColLeft>
        <ColRight>
          {data?.logos?.map(item => <Link href={item.linkURL}><ImageWrapper><Image data={item.image}/></ImageWrapper></Link>)}
        </ColRight>
    </Container>
  )
}
