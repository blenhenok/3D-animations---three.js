import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';
import getStarfield from './getStarfield.js';

// setting up the renderer
const w = window.innerWidth;
const h= window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h); 
document.body.appendChild(renderer.domElement); 
// setting up  the camera
const camera = new THREE.PerspectiveCamera(75, w/h, 0.1, 1000);
camera.position.z = 3;
//creating the scene
const scene = new THREE.Scene();


//Earth Group
const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI / 180;
scene.add(earthGroup);

//creating the earth mesh
const geo = new THREE.IcosahedronGeometry( 1,12 );
const loader = new THREE.TextureLoader();
const mat = new THREE.MeshStandardMaterial( 
    { 
        map: loader.load("./Assets/earthmap.jpg")
    } ); 
const Earthmesh = new THREE.Mesh( geo, mat);
earthGroup.add(Earthmesh);


// setting up the Lights Mesh
const lightmat = new THREE.MeshBasicMaterial(
    { 
        map: loader.load("./Assets/earthlights.jpg"),
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
    } 
);
const lightsmesh = new THREE.Mesh(geo, lightmat);
earthGroup.add(lightsmesh);

// setting up the cloud mesh
const cloudmat = new THREE.MeshStandardMaterial(
    { 
        map: loader.load("./Assets/earthbump.jpg"),
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
    } 
);
const cloudsmesh = new THREE.Mesh(geo, cloudmat);
//cloudsmesh.scale.addScalar(1.5);
earthGroup.add(cloudsmesh);

// adding the stars into the scene
const stars = getStarfield({ numStars: 2000 }); // Adjust the number of stars if needed
scene.add(stars);

//setting up sunlighting
const sunlight = new THREE.DirectionalLight(0xffffff);
sunlight.position.set(-2, 0.5, 2); // to fix the position of the lighting
scene.add(sunlight);

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; 
controls.dampingFactor = 0.05; 

function animate() {
    requestAnimationFrame(animate); 
    Earthmesh.rotation.y += 0.01;
    lightsmesh.rotation.y += 0.01;
    cloudsmesh.rotation.y += 0.01;     
    controls.update();            
    renderer.render(scene, camera); 
}

animate(); // Start the animation loop


