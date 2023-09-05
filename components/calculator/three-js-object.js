import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import styled from 'styled-components'

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`

export default function Component ({ triggerLoad, gltfObject, rotationX, positionY, rotate }) {
    let containerRef = useRef();
    let camera = useRef(null);
    let renderer = useRef(null);
    let scene = useRef(null)
    let animationFrame = useRef(null);

    let shouldRotate = useRef(false);

    let stats, currentTime, startTime;
    let model, skeleton, mixer, clock;


    function init() {

        const container = containerRef.current;
        clock = new THREE.Clock();

        scene.current = new THREE.Scene();


        const loader = new GLTFLoader();
        loader.load( gltfObject, function ( gltf ) {


            model = gltf.scene;

            // model.position.x = -0
            scene.current.add( model );

            model.traverse( function ( object ) {


                if ( object.isMesh ) object.castShadow = true;

            } );

            // Start

			startTime = Date.now();

            animate();

        } );

        renderer.current = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        renderer.current.info.autoReset = false
        renderer.current.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.current.setSize( containerRef.current.getBoundingClientRect().width, containerRef.current.getBoundingClientRect().height );
        renderer.current.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.current.toneMappingExposure = 0.5;
        renderer.current.shadowMap.enabled = true;
        container.appendChild( renderer.current.domElement );

        // lights

        const environment = new RoomEnvironment();
		const pmremGenerator = new THREE.PMREMGenerator( renderer.current );
		scene.current.environment = pmremGenerator.fromScene( environment ).texture;
        environment.dispose();

        // camera
        camera.current = new THREE.PerspectiveCamera( 45, containerRef.current.getBoundingClientRect().width / containerRef.current.getBoundingClientRect().height, 1, 1500 );
        camera.current.position.set( 0, positionY, 850);

        // const controls = new OrbitControls( camera, renderer.current.domElement );
        // controls.enablePan = false;
        // controls.enableZoom = false;
        // controls.target.set( 0, 1, 0 );
        // controls.update();

        // stats = new Stats();
        // container.appendChild( stats.dom );

        window.addEventListener( 'resize', onWindowResize );

    }
    
    function onWindowResize() {

        camera.current.aspect = containerRef.current.getBoundingClientRect().width / containerRef.current.getBoundingClientRect().height;
        camera.current.updateProjectionMatrix();

        renderer.current.setSize( containerRef.current.getBoundingClientRect().width, containerRef.current.getBoundingClientRect().height );

    }

    var axis = new THREE.Vector3(0, 1, 0).normalize();
    var speed = 0.005;

    function animate() {

        const currentTime = Date.now();
		const time = ( currentTime - startTime ) / 1000;

        // Render loop

        animationFrame.current = requestAnimationFrame( animate );

        // Get the time elapsed since the last frame, used for mixer update

        // model.position.y = 0.8;
        // model.rotation.x = time * 0.5;
        model.rotation.x = rotationX;

        
        if(shouldRotate.current) {
            // model.rotation.y = time * 0.2;
            model.rotation.y += 0.005
        }

        // if (model) {
        //     model.rotateOnAxis(axis, speed);
        // }
        // model.scale.setScalar( Math.cos( time ) * 0.125 + 0.875 );

        renderer.current.render( scene.current, camera.current );

    }

    function empty(elem) {
        if(!elem) return
        while (elem.lastChild) elem.removeChild(elem.lastChild);
    }

    useEffect(() => {
        if(rotate) {
            shouldRotate.current = true
        } else {
            shouldRotate.current = false
        }
    }, [rotate])

    
    useEffect(() => {
        if(gltfObject === undefined) return

        init();

        return () => {
            window.removeEventListener( 'resize', onWindowResize );

            cancelAnimationFrame( animationFrame.current );

            model?.children[0].children.forEach(item => {
                item.material?.dispose()
                item.geometry?.dispose()

                if(item.children.length > 1) {
                    item.children.forEach(item => {
                        item.material?.dispose()
                        item.geometry?.dispose()
                    })
                }
            })

            scene.current.remove(model)
            renderer.current.renderLists.dispose();
            renderer.current.dispose()
            renderer.current.domElement.addEventListener('dblclick', null, false); //remove listener to render
            renderer.current = null
            scene.current = null;
            model = null
            // camera.current = null;
            // empty(containerRef.current);
        }
    }, [])


    useEffect(() => {
        if(gltfObject === undefined) return
        if(triggerLoad === true) {
            setTimeout(() => {
                onWindowResize()
            }, 10)
        }
    }, [triggerLoad])

    return (
        <Container ref={containerRef}>

        </Container>
    )
}

