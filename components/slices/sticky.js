import styled from 'styled-components'

import Body from '../body'
import Button from '../button'
import Link from '../link'

import TitleRoll from './title-roll'
import CollapsableList from './collapsable-list'

const Container = styled.div`
    display: flex;
    margin: 0px 0;

    @media(max-width: 989px) {
        flex-direction: column;
    }
`

const ColLeft = styled.div`
    flex-basis: 50%;

    .sticky {
        position: sticky;
        top: 20px;
    }

    @media(max-width: 989px) {
        margin: 0 0 20px 0;
    }

`

const ColRight = styled.div`
    flex-basis: 50%;
    margin: 0 0 240px 0;

    @media(max-width: 989px) {
        margin: 0 0 80px 0;
        padding-top: 20px;
    }
`
const Row = styled.div`
    margin: 0 0 60px 0;

    a {
        text-decoration: underline;
    }

    @media(max-width: 989px) {
        margin: 0 0 30px 0;
    }
`

const SecondaryRow = styled.div`
    margin: -30px 0 60px 0;

    @media(max-width: 989px) {
        margin: 0 0 60px 0;
    }
`

const TernaryRow = styled.div`
    margin: -50px 0 30px 0;

    @media(max-width: 989px) {
        margin: 0 0 30px 0;
    }
`

let renderSlice = (slice ,index) => {

    switch(slice._type) {
        case 'row':
        return <Row><Body content={slice.text} /></Row>
        case 'cta':
        return <SecondaryRow><Link href={slice.ctaUrl}><Button>{slice.ctaLabel}</Button></Link></SecondaryRow>
        case 'collapsableList':
        return <TernaryRow><CollapsableList data={slice} /></TernaryRow>
        default:
        return null
    }
}  


function Sticky({ data, index, sliceAnchor, verifiedPage }) {

    return (
        <Container className="padding" id={sliceAnchor || data?.sliceAnchor}>
            <ColLeft>
                <div className="sticky">
                    {
                        index === 0 ?
                        <TitleRoll />
                        :
                        null
                    }                    
                    <Body content={data?.stickyTitle || data?.title || data?.aboutTitle} />
                    {
                        verifiedPage ?
                        <h1>VERIFIED</h1>
                        :
                        null
                    }
                </div>
            </ColLeft>
            <ColRight>
                {data?.rows?.map((slice, index) => renderSlice(slice, index))}
                {data?.aboutText ? <Body content={data?.aboutText}/> : null}
                {data?.text ? <Body content={data?.text}/> : null}
                {verifiedPage ? <p>Thanks for declaring emergency. We’ll now verify you as a signatory before sharing it live. This may take up to 3 days so please bear with us. You can access the toolkit <a href='https://driftime.notion.site/Design-Declares-Toolkit-dcb18f2911394d52a711d8cf4e9f15b8' target='_blank'>here</a>. And you can help sound the alarm on social using these assets <a href='https://drive.google.com/drive/folders/1BkU5y4djsB0JfU6D5WadnnXpP3gq71n9?usp=sharing' target='_blank'>here</a>.</p> : null}
            </ColRight>
        </Container>
    )
}

export default Sticky