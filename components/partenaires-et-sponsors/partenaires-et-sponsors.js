import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'

import Layout from '../layout'
import Body from '../body'
import Link from '../link'
import Image from '../image'

const Container = styled.div`
    padding: var(--margin);
`

const RowLogos = styled.div`
    display: flex;

    > div {
        padding: var(--margin);
    }

    > div:nth-child(1) {
        flex-basis: 40%;
    }

    > div:nth-child(2) {
        flex-basis: 60%;
    }

    @media(max-width: 989px) {
        flex-direction: column;

        > div {
            flex-basis: 100%;
        }
    }
`

const ImageWrapper = styled.div`
  height: 70px;
  margin: calc(var(--margin)*2) 0 calc(var(--margin)*4) 0;
  

  > div {
    height: 100%;
  }

  > div > img {
    height: 100% !important;
    width: auto !important;
  }
`

const Title = styled.h2`
  margin-top: calc(var(--margin) * 3);
`

const Text = styled.div`
    margin: calc(var(--margin) * 4) 0;
    column-count: 4;

    * {
        margin: 0 0 calc(var(--margin) * 2) 0;
        font-size: inherit;
    }

    @media(max-width: 989px) {
        column-count: 1;
    }
`


export default function Component ({ data = {}, footerData, preview = false }) {
    const router = useRouter()

    const slug = data?.slug

    if (router.isFallback) {
        return <div>Loading...</div>
    }    

    if (!router.isFallback && !slug) {
        return <Custom404 />
    }
    
    return (
        <>
            <Layout preview={preview} title={`${data?.referenceTitle} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <h1>{data.referenceTitle}</h1>
                    <Title>{data.titleOne}</Title>
                    <RowLogos>
                        {data?.logosOne?.map(item => <Link href={item.linkURL}><ImageWrapper><Image data={item.image}/></ImageWrapper></Link>)}
                    </RowLogos>
                    <Title>{data.titleTwo}</Title>
                    <RowLogos>
                        {data?.logosTwo?.map(item => <Link href={item.linkURL}><ImageWrapper><Image data={item.image}/></ImageWrapper></Link>)}
                    </RowLogos>
                    <Title>{data.titleThree}</Title>
                    <Text className='h3'><Body content={data?.textOne} /></Text>
                    <Title>{data.titleFour}</Title>
                    <Text className='h3'><Body content={data?.textTwo} /></Text>
                </Container>
            </Layout>
        </>
    )
}

                        {/* <ColLeft>
                            <h1>{data.referenceTitle}</h1>
                        </ColLeft>
                        <ColRight className='h3'>
                            <Body content={data?.textOne} />
                        </ColRight> */}