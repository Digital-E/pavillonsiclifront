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
    let scene, renderer, camera, stats;
    let model, skeleton, mixer, clock;

    function init() {

        const container = containerRef.current;
        clock = new THREE.Clock();

        scene = new THREE.Scene();
        // scene.background = new THREE.Color( 0xa0a0a0 );
        // scene.fog = new THREE.Fog( 0xa0a0a0, 10, 50 );

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hemiLight.position.set( 0, 20, 0 );
        scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff );
        dirLight.position.set( 3, 10, 10 );
        dirLight.castShadow = true;
        dirLight.shadow.camera.top = 2;
        dirLight.shadow.camera.bottom = - 2;
        dirLight.shadow.camera.left = - 2;
        dirLight.shadow.camera.right = 2;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 40;
        scene.add( dirLight );

        // ground

        // const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
        // mesh.rotation.x = - Math.PI / 2;
        // mesh.receiveShadow = true;
        // scene.add( mesh );

        const loader = new GLTFLoader();
        // loader.load( '/objects/gltf/Xbot.glb', function ( gltf ) {
        loader.load( '/objects/gltf/bin-tester.glb', function ( gltf ) {
            // loader.load('/objects/gltf/3- plane.gltf', function ( gltf ) {

            model = gltf.scene;
            model.position.set(0, 0, 0);
            scene.add( model );

            // model.traverse( function ( object ) {

            //     if ( object.isMesh ) object.castShadow = true;

            // } );

            //get all children inside gltf file
            model.traverse( function ( child ) {
                //get the meshes
                if ( child.isMesh ) {                
                    // let tempMaterial = new THREE.MeshStandardMaterial();
                    // tempMaterial.color = new THREE.Color( 'skyblue' );
                    // child.material = tempMaterial;
                    // only replace texture if a texture map exist
                    if (child.material.map){
                    //replace the map with another THREE texture
                    child.material.map = myTexture;
                    //update
                    child.material.map.needsUpdate = true;
                    }
                }
            })            

            animate();

        } );

        renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setSize( containerRef.current.getBoundingClientRect().width, containerRef.current.getBoundingClientRect().height );
        // renderer.shadowMap.enabled = true;
        container.appendChild( renderer.domElement );

        // camera
        camera = new THREE.PerspectiveCamera( 45, containerRef.current.getBoundingClientRect().width / containerRef.current.getBoundingClientRect().height, 1, 0 );
        camera.position.set( 0, 0, 700 );

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.target.set( 0, 1, 0 );
        controls.update();

        window.addEventListener( 'resize', onWindowResize );

    }
    
    function onWindowResize() {

        camera.aspect = containerRef.current.getBoundingClientRect().width / containerRef.current.getBoundingClientRect().height;
        camera.updateProjectionMatrix();

        renderer.setSize( containerRef.current.getBoundingClientRect().width, containerRef.current.getBoundingClientRect().height );

    }

    function animate() {

        // Render loop

        requestAnimationFrame( animate );


        renderer.render( scene, camera );

    }
    
    useEffect(() => {
        init();
    }, [])

    return (
        <Container ref={containerRef}>

        </Container>
    )
}

