import * as THREE from 'three';
import { OrbitControls } from 'jsm/controls/OrbitControls.js';

// setting up the renderer
const w = window.innerWidth;
const h= window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w, h); 
document.body.appendChild(renderer.domElement); 
// setting up  the camera
const fov = 75; 
const aspect = w/h; 
const near = 0.1; 
const far = 10; 
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
//creating the scene
const scene = new THREE.Scene();

const geo = new THREE.IcosahedronGeometry( 1,3 );
// from basic to standard to make it interact with light
const mat = new THREE.MeshStandardMaterial( 
    { color: 0xffffff, 
      flatShading: true
    } ); 
const mesh = new THREE.Mesh( geo, mat);
scene.add(mesh);

//adding a second material on top of the first as a sub material
const wiremat = new THREE.MeshBasicMaterial({
    color:0xffffff,
    wireframe: true
});
const wiremesh = new THREE.Mesh(geo, wiremat);
wiremesh.scale.setScalar(1);
mesh.add(wiremesh);

//setting up lighting
const hemlight = new THREE.HemisphereLight(0x0099ff, 0xaa5500);
scene.add(hemlight);

// Initialize OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Smooth motion
controls.dampingFactor = 0.05; // Adjust damping effect
controls.minDistance = 1;      // Limit zoom distance
controls.maxDistance = 10;


function animate() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    controls.update();
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );



