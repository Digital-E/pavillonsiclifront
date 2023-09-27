import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Custom404 from '../../pages/404'

import styled from 'styled-components'

import { SITE_NAME } from '../../lib/constants'
import sanitizeTag from '../../lib/sanitizeTag'

import Layout from '../layout'
import Filters from './filters'
import Hero from './hero'
import Tiles from './tiles'

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/dist/ScrollToPlugin";
gsap.registerPlugin(ScrollToPlugin);


const Container = styled.div``



export default function Component ({ data = {}, filters, isDark, footerData, preview = false }) {
    const router = useRouter()
    let [filtersArray, setFiltersArray] = useState([]);
    let [eventsArray, setEventsArray] = useState([]);

    const slug = data?.slug

    if (router.isFallback) {
        return <div>Loading...</div>
    }

    if (!router.isFallback && !slug) {
        return <Custom404 />
    }

    let scrollToClosestToToday = () => {

        let allTiles = document.querySelectorAll('.agenda-tile')

        if(allTiles.length === 0) return

        let allDates = Array.from(allTiles).map(item => item.getAttribute('data-date'))
        let arr = allDates.map(item => new Date(item))

        let diffdate = new Date();

        arr.sort(function(a, b) {
            var distancea = Math.abs(diffdate - a);
            var distanceb = Math.abs(diffdate - b);
            return distancea - distanceb; // sort a before b when the distance is smaller
        });

        let closestToToday = arr[0]

        let closestToTodayFormat = `${closestToToday.getMonth() + 1}-${closestToToday.getDate()}-${closestToToday.getFullYear()}`

        let tileToScrollTo = null

        Array.from(allTiles).forEach(item => {
            if(item.getAttribute('data-date') === closestToTodayFormat) {
                tileToScrollTo = item
            }
        })

        let scrollTo = tileToScrollTo.getBoundingClientRect().top - document.querySelector('header').getBoundingClientRect().height - document.querySelector('.filters').getBoundingClientRect().height

        gsap.to(window, {duration: 1, scrollTo: scrollTo});
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
            itemOne.filters?.unshift('Tout')

            let newFilters = itemOne.filters?.map(itemTwo => {
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

            if(newItem.filters) {
                newItem.filters[0].selected = true
            }

            return newItem
        })


        setFiltersArray(mapFiltersArray)

        getUrlParams(mapFiltersArray)

        // Sort events by date

        let allEvents = data?.events

        allEvents?.sort((a, b) => new Date(a.dateAndTime) - new Date(b.dateAndTime));

        setEventsArray(allEvents)

        setTimeout(() => {
            scrollToClosestToToday();
        }, 0)
    }, [])

    let modifyUrlParams = (indexOne, indexTwo) => {
        const url = new URL(window.location.href);
        url.searchParams.set(indexOne, indexTwo);
        window.history.replaceState(null, null, url); // or pushState
    }

    let resetUrlParams = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete(0);
        url.searchParams.delete(1);
        url.searchParams.delete(2);
        window.history.replaceState(null, null, url); // or pushState
    }

    let getUrlParams = (filtersArray) => {
        let params = new URL(document.location).searchParams;
        let value1 = {indexOne: 0, indexTwo: params.get(0)};
        let value2 = {indexOne: 1, indexTwo: params.get(1)};
        let value3 = {indexOne: 2, indexTwo: params.get(2)};

        let valuesArray = [value1, value2, value3]

        valuesArray.forEach(item => {
            if(item.indexTwo === null) return
            toggleFiltersInit(item.indexOne, item.indexTwo, filtersArray)
        })
    }

    let toggleFiltersInit = (indexOne, indexTwo, filtersArray) => {

        let newMapFiltersArray = JSON.parse(JSON.stringify(filtersArray))
    
        newMapFiltersArray[indexOne].filters.forEach(item => {
            item.selected = false
        })

        newMapFiltersArray[indexOne].filters[indexTwo].selected = true
        
        setFiltersArray(newMapFiltersArray)

    }

    let toggleFilters = (indexOne, indexTwo) => {
        let newMapFiltersArray = JSON.parse(JSON.stringify(filtersArray))
    
        newMapFiltersArray[indexOne].filters.forEach(item => {
            item.selected = false
        })

        newMapFiltersArray[indexOne].filters[indexTwo].selected = true
        
        setFiltersArray(newMapFiltersArray)

        modifyUrlParams(indexOne, indexTwo);
    }

    useEffect(() => {
        // Filter Tiles

        let selectedTags = []

        filtersArray.forEach(itemOne => {
            itemOne.filters?.forEach((itemTwo, indexTwo) => {
                if(indexTwo === 0) return

                if(itemTwo.selected === true) {
                    selectedTags.push(itemTwo.label)
                }
            })
        })

        let filterEvents = []

        data?.events?.forEach(itemOne => {

            let itemOneSanitized = itemOne.tags?.map(item => sanitizeTag(item))

            let result = selectedTags.every(i => itemOneSanitized?.includes(sanitizeTag(i)))

            if(result) {
                filterEvents.push(itemOne)
            }
        })

        setEventsArray(filterEvents)

    }, [filtersArray])

    const resetAll = () => {
        let newMapFiltersArray = JSON.parse(JSON.stringify(filtersArray))

        newMapFiltersArray.forEach(item => 
            item.filters?.forEach(item => {
                item.selected = false
            })
        )

        setFiltersArray(newMapFiltersArray)

        resetUrlParams();
    }

    return (
        <>
            <Layout preview={preview} title={`${data?.title} | ${SITE_NAME}`} description={data?.description} ogImage={data?.ogImage} footerData={footerData}>
                <Container>
                    <Filters data={filtersArray} toggleFilters={(indexOne, indexTwo) => toggleFilters(indexOne, indexTwo)} resetAll={() => resetAll()} />
                    <Hero data={data} isDark={isDark} />
                    <Tiles data={eventsArray} isDark={isDark} />
                </Container>
            </Layout>
        </>
    )
}

