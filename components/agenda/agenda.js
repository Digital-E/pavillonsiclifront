import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ErrorPage from 'next/error'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'
import sanitizeTag from '../../lib/sanitizeTag'

import Layout from '../layout'
import Filters from './filters'
import Hero from './hero'
import Tiles from './tiles'
import Link from '../link'

const Container = styled.div`
`



export default function Component ({ data = {}, filters, footerData, preview = false }) {
    const router = useRouter()
    let [filtersArray, setFiltersArray] = useState([]);
    let [eventsArray, setEventsArray] = useState(data.events);

    const slug = data?.slug

    if (!router.isFallback && !slug) {
        return <ErrorPage statusCode={404} />
    }

    useEffect(() => {
        // Reorganise Filters

        let filtersArray = [
            {
                category: filters.filterCategoryOne,
                filters: filters.filterListOne
            },
            {
                category: filters.filterCategoryTwo,
                filters: filters.filterListTwo
            },
            {
                category: filters.filterCategoryThree,
                filters: filters.filterListThree
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

        data.events.forEach(itemOne => {
            if(itemOne.filters === null) return

            let itemOneSanitized = itemOne.filters.map(item => sanitizeTag(item))

            let result = selectedFilters.every(i => itemOneSanitized.includes(sanitizeTag(i)))

            if(result) {
                filterEvents.push(itemOne)
            }
        })

        setEventsArray(filterEvents)

    }, [filtersArray])

    return (
        <>
            <Layout preview={preview} title={`${data?.title} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <Filters data={filtersArray} toggleFilters={(indexOne, indexTwo) => toggleFilters(indexOne, indexTwo)} />
                    <Hero data={data} />
                    <Tiles data={eventsArray} />
                </Container>
            </Layout>
        </>
    )
}

