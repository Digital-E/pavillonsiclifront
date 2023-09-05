import { useRouter } from "next/router"
import Head from 'next/head'
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
    height: 100vh;
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
    const router = useRouter();

    return (
    <Layout preview={preview} title={`404 | ${SITE_NAME}`}>
      <Container>
          <div>
            <p className='body-large'>404 - PAGE NOT FOUND</p>
            <Button><a href='/'>Home</a></Button>
          </div>
      </Container>
    </Layout>
    )
  }

export async function getStaticProps({ preview = false, params }) {

  // Get Menu And Footer

  const menuData = await getClient(preview).fetch(menuQuery);

  const footerData = await getClient(preview).fetch(footerQuery);


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