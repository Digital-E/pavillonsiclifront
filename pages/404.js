import { useRouter } from "next/router";
import Layout from "../components/layout";
import styled from 'styled-components';

import { menuQuery, footerQuery } from '../lib/queries'
import { getClient } from '../lib/sanity.server'


import { SITE_NAME } from "../lib/constants"

import Button from '../components/button'

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - var(--menu-height));
    width: 100vw;

    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    p {
      margin: 0;
    }
`


export default function Custom404({ data = {}, preview }) {
  let router = useRouter()

    return (
    <Layout preview={preview} title={`404 | ${SITE_NAME}`} footerData={data.footerData}>
      <Container>
          <div>
            <h2>404 👀</h2>
            <Button><a href={`/${router.query.language}`}>Home</a></Button>
          </div>
      </Container>
    </Layout>
    )
  }

export async function getStaticProps({ preview = false, params }) {

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery, {
    language: 'fr'
  });

  const footerData = await getClient(preview).fetch(footerQuery, {
    language: 'fr'
  });


    return {
        props: {
            preview,
            data: {
              menuData,
              footerData
            }
          }
    };
}