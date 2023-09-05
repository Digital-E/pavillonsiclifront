import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

export default function Component ({}) {
    let containerRef = useRef();

    
    useEffect(() => {
        const backgroundColor = 0x000000;

        /*////////////////////////////////////////*/
        
        var renderCalls = [];
        function render () {
          requestAnimationFrame( render );
          renderCalls.forEach((callback)=>{ callback(); });
        }
        render();
        
        /*////////////////////////////////////////*/
        
        var scene = new THREE.Scene();
        
        var camera = new THREE.PerspectiveCamera( 80, window.innerWidth / window.innerHeight, 0.1, 800 );
        camera.position.set(5,5,5);
        
        var renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( backgroundColor );//0x );
        
        renderer.toneMapping = THREE.LinearToneMapping;
        renderer.toneMappingExposure = Math.pow( 0.94, 5.0 );
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFShadowMap;
        
        window.addEventListener( 'resize', function () {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize( window.innerWidth, window.innerHeight );
        }, false );
        
        containerRef.current.appendChild( renderer.domElement);
        
        function renderScene(){ renderer.render( scene, camera ); }
        renderCalls.push(renderScene);
        
        /* ////////////////////////////////////////////////////////////////////////// */
        
        var controls = new OrbitControls( camera, renderer.domElement );
        
        controls.rotateSpeed = 0.3;
        controls.zoomSpeed = 0.9;
        
        controls.minDistance = 3;
        controls.maxDistance = 20;
        
        controls.minPolarAngle = 0; // radians
        controls.maxPolarAngle = Math.PI /2; // radians
        
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        
        renderCalls.push(function(){
          controls.update()
        });
        
        
        /* ////////////////////////////////////////////////////////////////////////// */
        
        
        var light = new THREE.PointLight( 0xffffcc, 20, 200 );
        light.position.set( 4, 30, -20 );
        scene.add( light );
        
        var light2 = new THREE.AmbientLight( 0x20202A, 20, 100 );
        light2.position.set( 30, -10, 30 );
        scene.add( light2 );
        
        /* ////////////////////////////////////////////////////////////////////////// */
        
        
        
        var loader = new GLTFLoader();
        loader.crossOrigin = true;
        loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf', function ( data ) {
        
          
            var object = data.scene;
             object.position.set(0, -10, -0.75);
        
        
            // TweenMax.from( object.position, 3, {
            //   y: -8,
            //   yoyo: true,
            //   repeat: -1,
            //   ease: 'Power2.easeInOut'
            // });
        
            scene.add( object );
        
        });
    }, [])

    return (
        <Container ref={containerRef}>

        </Container>
    )
}

