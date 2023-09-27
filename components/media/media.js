import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'
import sanitizeTag from '../../lib/sanitizeTag'

import Layout from '../layout'
import Filters from '../agenda/filters'
import Hero from './hero'
import Tiles from '../home/tiles'

const Container = styled.div`
`



export default function Component ({ data = {}, filters, footerData, preview = false }) {
    const router = useRouter()
    let [filtersArray, setFiltersArray] = useState([]);
    let [mediaArray, setMediaArray] = useState(data?.media);

    const slug = data?.slug


    useEffect(() => {
        setMediaArray(data?.media)
    }, [data])

    useEffect(() => {
        // Reorganise Filters

        let filtersArray = [
            {
                category: 'Catégories',
                filters: ['Image','Video']
            }
        ];

        let mapFiltersArray = filtersArray.map(itemOne => {
            itemOne.filters.unshift('Tout')

            let newFilters = itemOne.filters.map(itemTwo => {
                let obj = {
                    label: itemTwo,
                    selected: false
                }
                return obj
            })

            let newItem = {
                category: itemOne.category,
                filters: newFilters
            }

            newItem.filters[0].selected = true

            return newItem
        })


        setFiltersArray(mapFiltersArray)
    }, [])

    let toggleFilters = (indexOne, indexTwo) => {
        let newMapFiltersArray = JSON.parse(JSON.stringify(filtersArray))

        newMapFiltersArray[indexOne].filters.forEach(item => {
            item.selected = false
        })

        newMapFiltersArray[indexOne].filters[indexTwo].selected = true

        setFiltersArray(newMapFiltersArray)
    }

    useEffect(() => {
        // Filter Tiles

        let selectedFilters = []


        filtersArray.forEach(itemOne => {
            itemOne.filters.forEach((itemTwo, indexTwo) => {
                if(indexTwo === 0) return

                if(itemTwo.selected === true) {
                    selectedFilters.push(itemTwo.label)
                }
            })
        })

        let filterEvents = []

        data?.media?.forEach(itemOne => {

            // if(itemOne.filters === null) return

            let itemOneSanitized = sanitizeTag(itemOne.type)

            let result = selectedFilters.every(i => itemOneSanitized?.includes(sanitizeTag(i)))

            if(result) {
                filterEvents.push(itemOne)
            }
        })

        setMediaArray(filterEvents)

    }, [filtersArray])

    const resetAll = () => {
        let newMapFiltersArray = JSON.parse(JSON.stringify(filtersArray))

        newMapFiltersArray.forEach(item => 
            item.filters.forEach(item => {
                item.selected = false
            })
        )

        setFiltersArray(newMapFiltersArray)
    }

    if (router.isFallback) {
        return <div>Loading...</div>
    }    

    if (!router.isFallback && !slug) {
        return <Custom404 />
    }
    

    return (
        <>
            <Layout preview={preview} title={`${data?.title} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <Filters data={filtersArray} toggleFilters={(indexOne, indexTwo) => toggleFilters(indexOne, indexTwo)} resetAll={() => resetAll()} />
                    <Hero data={data} />
                    <Tiles data={mediaArray} />
                </Container>
            </Layout>
        </>
    )
}

