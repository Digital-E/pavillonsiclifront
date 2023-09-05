import { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from '../image'

const Container = styled.div`
    display: flex;
    box-sizing: border-box;
    margin: 30px 0;
`

const InnerContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
`


const Tile = styled.div`
    flex-basis: calc(16.666% - 30px);
    margin: 0 15px 60px 15px;

    > * {
        width: fit-content;
    }

    @media(max-width: 989px) {
        flex-basis: calc(50% - 30px);
        margin: 0 15px 30px 15px;
    }
`

const Project = styled.p`
    margin: 15px 0;
`

const Name = styled.h6`
    text-transform: uppercase;
`

const Link = styled.h6`
    text-transform: uppercase;

    a {
        opacity: 0.6;
    }

    a:hover {
        opacity: 1;
    }
`



export default function Component({ data }) {
    let [dataAll, setDataAll] = useState([]);


    useEffect(() => {

        if(data.people === undefined) return

        let newData = []

        data.people.forEach((item, index) => {

            let random = Math.random()
    
            if(random < 0.3) {
                return newData.push(item)
            }
    
            if(random < 0.6) {
                newData.push(null)
                return newData.push(item)
            }

    
            newData.push(null)
            newData.push(null)
            return newData.push(item)
        })


        setDataAll(newData)
    }, [])

    return (
        <Container>
            <InnerContainer>
                {dataAll.map((item, index) =>
                {
                    if(item === null) {
                        return <Tile></Tile>
                    } else {
                        return (
                            <Tile>
                                <Image data={item?.image} />
                                <Project className='body-medium'>{item?.projectName}</Project>
                                <Name>{item?.name}</Name>
                                <Link><a href={item?.link} target='_blank'>{item?.linkLabel}</a></Link>
                            </Tile>
                        )
                    }
                }
                )}
            </InnerContainer>
        </Container>
    )
}