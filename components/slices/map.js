import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import { Loader } from "@googlemaps/js-api-loader"

const Container = styled.div`

    height: 700px;
    width: 100%;

    > div {
        height: 100%;
        width: 100%;
    }

    .gm-style-iw-d > div:first-child > div:first-child > div:first-child {
        margin-bottom: 10px !important;
    }

    .gm-style-iw {
        background: black;
        padding: 20px !important;
        border-radius: 0;
        font-family: Standard;
    }

    .gm-ui-hover-effect {
        top: 0 !important;
        right: 0 !important;
    }

    .gm-ui-hover-effect > span {
        background: white;
    }

    .gm-style .gm-style-iw-tc::after {
        background: black !important;
    }

    #map > div > div > div:nth-child(15),
    #map > div > div > div:nth-child(17)
    {
        display: none;
    }
`

let mapStyles = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#ffffff"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "administrative.country",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "administrative.neighborhood",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#c4c4c4"
            },
            {
                "visibility": "on"
            },
            {
                "weight": "1"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#a0a0a0"
            },
            {
                "lightness": "0"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#555555"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#555555"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#222222"
            },
            {
                "lightness": 16
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#333333"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#999999"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text",
        "stylers": [
            {
                "lightness": "-45"
            }
        ]
    }
]

export default function Component({ data }) {
    let mapRef = useRef()

    useEffect(() => {
        const loader = new Loader({
            apiKey: "AIzaSyDjz9MNf5AYaxbwEsCrRsuGrjDWg3IZ5FU",
            version: "weekly",
            // ...additionalOptions,
          });
          
          loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");
          
            let map = new Map(mapRef.current, {
              center: { lat: -34.397, lng: 150.644 },
              zoom: 8,
              disableDefaultUI: true,
              styles: mapStyles
            });

            var mapLayer = new google.maps.KmlLayer({url: "https://www.google.com/maps/d/kml?mid=1ZtUa-YdU9y2SCdHbsQ9cAOcluJZd9fo"  });
            mapLayer.setMap(map);

          });
    }, [])

    return (
        <Container>
            <div ref={mapRef} id="map"/>
            {/* <div dangerouslySetInnerHTML={{__html:
            `
            <iframe src="https://www.google.com/maps/d/embed?
            key=AIzaSyDjz9MNf5AYaxbwEsCrRsuGrjDWg3IZ5FU
            &mid=1ABGa2cRCpftYrQ6UudBSlxDLbml2Oi33&ehbc=2E312F
            &style=feature:road|element:all|saturation:-100
            &q=Space+Needle,Seattle+WA
            " 
            width="640" height="480"></iframe>
            `
            }} /> */}
        </Container>
    )
}