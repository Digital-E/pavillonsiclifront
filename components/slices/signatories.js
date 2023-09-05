import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import countries from 'world-countries';

import Body from '../body'


var _ = require('lodash');

const Container = styled.div`
    margin-bottom: 400px;
    // margin-bottom: 240px;

    .signatories-number {
        color: var(--ternary-color)
    }

    @media(max-width: 989px) {
        margin-bottom: 120px;
    }

    .d-logo {
        margin: 0 10px 0 0;
    }
`

const Row = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-items: space-between;
    margin-bottom: 80px;
`

const Col = styled.div`
    flex-basis: 50%;
`

const Signatory = styled.div`
    flex-basis: 10%;

    a {
        width: fit-content;
    }

    > a > p {
        padding: 0 10px;
        text-indent: -10px;
        font-size: 12px;
    }

    * {
        margin: 0;
    }
`

const RowListOuter = styled.div`
    position: relative;
    // max-height: ${props => props.rowListHeight}px;
    overflow: hidden;
    transition: max-height 2s;

    // ::after {
    //     content: '';
    //     position: absolute;
    //     bottom: 0;
    //     width: 100%;
    //     height: 200px;
    //     background: linear-gradient(0deg, black 0%, transparent 100%);
    //     visibility: hidden;
    //     transition: visibility 0s 1s;
    }

    // &&.hide {
    //     max-height: 500px;
    //     transition: max-height 2s;
    // }

    &&.hide::after {
        visibility: visible;
    }

    @media(max-width: 989px) {
        // ::after {
        //     background: linear-gradient(0deg,black 20%,transparent 100%);
        // }
    }
`

const RowList = styled.div`
    column-count: 10;

    @media(max-width: 1200px) {
        column-count: 5;
    }

    @media(max-width: 989px) {
        column-count: 3;
    }
`

const More = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    margin: 0;
    transform: translateX(-50%);
    z-index: 1;
    text-decoration: underline;
    cursor: pointer;

    :hover {
        color: var(--secondary-color);
    }

    &&.hide {
        visibility: hidden;
        transition: visibility 0s 0.5s;
    }
`

const Title = styled.div`
    margin: 80px 0 10px 0;
`

const Country = styled.div`

     > p {
        color: white;
        padding: 0 10px;
        text-indent: -10px;
        font-size: 12px;
        margin: 0;
    }
`

const KeepTogether = styled.div`
    break-inside: avoid;
    page-break-inside: avoid;

    :not(:first-child) {
        margin-top: 10px;
    }
`




function Component({ data }) {
    let [allSignatories, setAllSignatories] = useState([]);
    let [globalSignatories, setGlobalSignatories] = useState([]);
    let [isShowing, setIsShowing] = useState(false);
    let [rowListHeight, setRowListHeight] = useState(0);
    let rowListRef = useRef();

    // for(let i = 0; i < 200; i++) {
    //     multiplySigList.push(...data.signatoryList)
    // }

    let capitalize = (item) => {
        if(item !== undefined) {
            return item
            .split(' ')
            .map(_.capitalize)
            .join(' ');
        }

        return item
    }

    let getAllContacts = async () => {
        try {
            await fetch("/api/get-contacts", {
              "method": "POST",
              "headers": { "Content-Type": "application/json" }
            })
            .then((response) => response.json())
            .then(res => {

                let signatoriesWithTeamName = res.allContacts.map(item => {
                    let obj = item;

                    if(obj.attributes.TEAMNAME !== undefined) {
                        obj.attributes.NAME = `${capitalize(item.attributes.TEAMNAME)} at ${capitalize(item.attributes.NAME)}`
                    } else {
                        obj.attributes.NAME = capitalize(item.attributes.NAME)
                    }

                    return obj;
                })

                let globalSignatoriesWithTeamName = res.globalContacts.map(item => {
                    let obj = item;

                    if(obj.attributes.TEAMNAME !== undefined) {
                        obj.attributes.NAME = `${capitalize(item.attributes.TEAMNAME)} at ${capitalize(item.attributes.NAME)}`
                    } else {
                        obj.attributes.NAME = capitalize(item.attributes.NAME)
                    }

                    return obj;
                })

                let orderSignatories = 
                signatoriesWithTeamName.sort(function (a, b) {

                  if (a.attributes.NAME < b.attributes.NAME) {
                    return -1;
                  }
                  if (a.attributes.NAME > b.attributes.NAME) {
                    return 1;
                  }
                  return 0;
                });

                let orderGlobalSignatories = 
                globalSignatoriesWithTeamName.sort(function (a, b) {

                  if (a.attributes.NAME < b.attributes.NAME) {
                    return -1;
                  }
                  if (a.attributes.NAME > b.attributes.NAME) {
                    return 1;
                  }
                  return 0;
                });

                let orderCountries = 
                countries.sort(function (a, b) {

                    if (a.name.common < b.name.common) {
                        return -1;
                    }
                    if (a.name.common > b.name.common) {
                        return 1;
                    }
                    return 0;
                });

                let globalListWithCountries = [];

                orderCountries.forEach(itemOne => {
                    let countryList = [];
                    
                    orderGlobalSignatories.forEach(itemTwo => {
                        if(itemOne.name.common === itemTwo.attributes.COUNTRY) {
                            countryList.push(itemTwo)
                        }
                    })

                    if(countryList.length > 0) {
                        let country = {}
                        country.name = itemOne.name.common
                        countryList.unshift(country)
                    }

                    globalListWithCountries.push(...countryList)

                })
                
                setAllSignatories([...orderSignatories])

                setGlobalSignatories([...globalListWithCountries])

            })
            } catch (error) {
                alert(error);
            }        
    }


    useEffect(() => {
        // Get All Contacts
        getAllContacts();

    },[]);

    useEffect(() => {

        if(allSignatories.length === 0) return

        // Measure Row List Height
        
        setRowListHeight(rowListRef.current.getBoundingClientRect().height)

        document.addEventListener('resize', () => {
            setTimeout(() => {
                setRowListHeight(rowListRef.current.getBoundingClientRect().height)
            }, 100)
        })

        // Replace # with number of signatories

        let text = document.querySelector('.signatory-list-text').innerHTML;

        let newText = text.split('')

        newText.splice(text.indexOf('#'), 1, `<span class='signatories-number'>#<span class="signatory-counter value" akhi='${allSignatories.length}'>0</span></span>`)

        document.querySelector('.signatory-list-text').innerHTML = newText.join('')


        setTimeout(() => {

            // Set Counter

            const counters = document.querySelectorAll('.value');
            const speed = 500;

            let triggerCounters = () => {
                counters.forEach( counter => {
                const animate = () => {
                    const value = +counter.getAttribute('akhi');
                    const data = +counter.innerText;
                    
                    const time = value / speed;
                    if(data < value) {
                        counter.innerText = Math.ceil(data + time);
                        setTimeout(animate, 50);
                        }else{
                        counter.innerText = value;
                        }
                    
                }
                
                animate();
                });                
            }
            
            
            // Set Intersection Observer
            let options = {
                root: null,
                rootMargin: '0px',
                threshold: 1.0
            }

            let callback = (entries, observer) => {
            entries.forEach((entry) => {
                if(entry.isIntersecting) {
                    triggerCounters();
                }
            });
            };              

              
            let observer = new IntersectionObserver(callback, options);

            let target = document.querySelector('.signatory-counter');
            observer.observe(target);    
                      

        }, 0)

    }, [allSignatories])

    let toggleIsShowing = () => {
        setIsShowing(!isShowing)
    }

    let getURL = (url) => {
        function validateText(string) {
            if(/(http(s?)):\/\//i.test(string)) {
                return `${string}`
              // do something here
            } else {
                return `//${string}`
            }
          }

        return validateText(url);
    }

    return (
        <Container className="padding slice" data-anchor='signatories' id='signatories'>
            <Row>
                <Col className="signatory-list-text">
                    <Body content={data.signatoryListTitle} />
                </Col>
                <Col></Col>
            </Row>
            <RowListOuter className={!isShowing ? 'hide' : ''} rowListHeight={rowListHeight}>
                <RowList ref={rowListRef}>
                    {
                        allSignatories.map(item => <Signatory><a href={getURL(item.attributes.WEBSITE)} target='_blank'><p>{item.attributes.NAME}</p></a></Signatory>)
                    }
                </RowList>
                {/* <More className={isShowing ? 'p hide' : 'p'} onClick={() => toggleIsShowing()}>See the full list</More> */}
            </RowListOuter>
            <Title><p>Global Supporters</p></Title>
            <RowListOuter>
                <RowList>
                    {
                        globalSignatories.map((item, index) => {
                            if(item.name) {
                                return (
                                <KeepTogether>
                                    <Country><p>{item.name}</p></Country>
                                    <Signatory><a href={getURL(globalSignatories[index + 1].attributes.WEBSITE)} target='_blank'><p>{globalSignatories[index + 1].attributes.NAME}</p></a></Signatory>
                                </KeepTogether>
                                )
                            } else {
                                if(globalSignatories[index - 1]?.name) {
                                    return null
                                } else {
                                    return <Signatory><a href={getURL(globalSignatories[index].attributes.WEBSITE)} target='_blank'><p>{globalSignatories[index].attributes.NAME}</p></a></Signatory>
                                }
                            }
                        })
                    }
                </RowList>
            </RowListOuter>
        </Container>
    )
}

export default Component