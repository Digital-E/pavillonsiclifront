import styled from "styled-components"
import Link from "./link"

import splitSlug from "../lib/splitSlug"

const Container = styled.footer`
  display: flex;
  justify-content: space-between;

  a {
    width: fit-content;
    opacity: 1;
    text-transform: uppercase;
  }

  @media(min-width: 990px) {
    * {
      font-size: 0.75rem;
    }
  }

  @media(max-width: 989px) {
    flex-direction: column;
  }
`

const Links = styled.div`
  display: flex;
  flex-direction: row;

  * {
    margin: 0 0 10px 0;
  }

  @media(max-width: 989px) {
    flex-direction: column;
  }
`

const Copyright = styled.h6`
  @media(max-width: 989px) {
    display: none;
  }
`

const MobileCopyright = styled.h6`
  @media(min-width: 990px) {
    display: none;
  }
`

const ColLeft = styled.div`
  display: flex;
  
  > *, > * > * {
    margin-right: 40px;
  }

  @media(max-width: 989px) {
    flex-direction: column;
  }
`

const ColRight = styled.div``

const Credits = styled.h6`
  text-transform: uppercase;
`


export default function Header({ data, dataBis }) {

  return (
    <Container className="padding">
        <ColLeft>
          <Copyright>©ART 4 BIODIVERSITY {new Date().getFullYear()}</Copyright>
          <Links>
            {data?.links?.map(item => <h6><Link href={splitSlug(item.linkURL)}>{item.linkLabel}</Link></h6>)}
          </Links>
        </ColLeft>

        <ColRight>
          <Credits>Website: <a href='https://ok-deploy.live/' target='_blank'>OK Deploy</a> + <a href='https://samuelbassett.xyz/' target='_blank'>Samuel Bassett.XYZ</a></Credits>
          <MobileCopyright>©ART 4 BIODIVERSITY {new Date().getFullYear()}</MobileCopyright>
        </ColRight>
    </Container>
  )
}
