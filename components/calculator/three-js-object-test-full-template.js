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

        // const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        // hemiLight.position.set( 0, 20, 0 );
        // scene.add( hemiLight );

        // const dirLight = new THREE.DirectionalLight( 0xffffff );
        // dirLight.position.set( 3, 10, 10 );
        // dirLight.castShadow = true;
        // dirLight.shadow.camera.top = 2;
        // dirLight.shadow.camera.bottom = - 2;
        // dirLight.shadow.camera.left = - 2;
        // dirLight.shadow.camera.right = 2;
        // dirLight.shadow.camera.near = 0.1;
        // dirLight.shadow.camera.far = 40;
        // scene.add( dirLight );
        

        // ground

        // const mesh = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
        // mesh.rotation.x = - Math.PI / 2;
        // mesh.receiveShadow = true;
        // scene.add( mesh );

        const loader = new GLTFLoader();
        // loader.load( '/objects/test/shiba.glb', function ( gltf ) {
        loader.load( '/objects/gltf/4 - MEAT 2 PBR 2.gltf', function ( gltf ) {
        // loader.load( '/objects/old-gltf/2- bin.gltf', function ( gltf ) {

            console.log(gltf.scene)
            model = gltf.scene;
            scene.add( model );

            model.traverse( function ( object ) {
                if ( object.isMesh ) object.castShadow = true;

            } );

            // skeleton = new THREE.SkeletonHelper( model );
            // skeleton.visible = false;
            // scene.add( skeleton );

            // const animations = gltf.animations;

            // numAnimations = animations.length;

            // for ( let i = 0; i !== numAnimations; ++ i ) {

            //     let clip = animations[ i ];
            //     const name = clip.name;

            //     if ( baseActions[ name ] ) {

            //         const action = mixer.clipAction( clip );
            //         activateAction( action );
            //         baseActions[ name ].action = action;
            //         allActions.push( action );

            //     } else if ( additiveActions[ name ] ) {

            //         // Make the clip additive and remove the reference frame

            //         THREE.AnimationUtils.makeClipAdditive( clip );

            //         if ( clip.name.endsWith( '_pose' ) ) {

            //             clip = THREE.AnimationUtils.subclip( clip, clip.name, 2, 3, 30 );

            //         }

            //         const action = mixer.clipAction( clip );
            //         activateAction( action );
            //         additiveActions[ name ].action = action;
            //         allActions.push( action );

            //     }

            // }

            // createPanel();

            animate();

        } );

        renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        // renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setSize( containerRef.current.getBoundingClientRect().width, containerRef.current.getBoundingClientRect().height );
        // renderer.shadowMap.enabled = true;
        container.appendChild( renderer.domElement );

        // Light

        // let hlight = new THREE.AmbientLight(null);
        // scene.add(hlight);

        // let directionalLight = new THREE.DirectionalLight(0x662451);
        // directionalLight.position.set(0, 1, 0);
        // directionalLight.castShadow = true;
        
        // scene.add(directionalLight);

        const environment = new RoomEnvironment();
		const pmremGenerator = new THREE.PMREMGenerator( renderer );
		scene.environment = pmremGenerator.fromScene( environment ).texture;

        // camera
        camera = new THREE.PerspectiveCamera( 45, containerRef.current.getBoundingClientRect().width / containerRef.current.getBoundingClientRect().height, 1, 1000 );
        camera.position.set( 0, 0, 700);

        const controls = new OrbitControls( camera, renderer.domElement );
        controls.enablePan = false;
        controls.enableZoom = true;
        controls.target.set( 0, 1, 0 );
        controls.update();

        // stats = new Stats();
        // container.appendChild( stats.dom );

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

        // for ( let i = 0; i !== numAnimations; ++ i ) {

        //     const action = allActions[ i ];
        //     const clip = action.getClip();
        //     const settings = baseActions[ clip.name ] || additiveActions[ clip.name ];
        //     settings.weight = action.getEffectiveWeight();

        // }

        // Get the time elapsed since the last frame, used for mixer update

        // const mixerUpdateDelta = clock.getDelta();

        // Update the animation mixer, the stats panel, and render this frame

        // mixer.update( mixerUpdateDelta );

        // stats.update();

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

