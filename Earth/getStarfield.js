import * as THREE from "three";

export default function getStarfield({ numStars = 500 } = {}) {
    // computes a random position on the surface of a sphere with a radius between 25 and 50.
  function randomSpherePoint() {
    const radius = Math.random() * 25 + 25;
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    let x = radius * Math.sin(phi) * Math.cos(theta);
    let y = radius * Math.sin(phi) * Math.sin(theta);
    let z = radius * Math.cos(phi);

    return {
      pos: new THREE.Vector3(x, y, z),
      hue: 0.6,
      minDist: radius,
    };
  }

 // The loop generates numStars stars, storing their positions and colors
  const verts = [];
  const colors = [];
  const positions = [];
  let col;
  for (let i = 0; i < numStars; i += 1) {
    let p = randomSpherePoint();
    const { pos, hue } = p;  // Destructure the position and hue
    positions.push(p);  // Save full star data
    col = new THREE.Color().setHSL(hue, 0.2, Math.random());
    verts.push(pos.x, pos.y, pos.z);
    colors.push(col.r, col.g, col.b);
  }

  //A THREE.BufferGeometry object that stores the star positions and colors efficiently.
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
  geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  
  //creating material
  const mat = new THREE.PointsMaterial({
    size: 0.2,
    vertexColors: true,
    map: new THREE.TextureLoader().load("./Assets/circle.png"),
  });
  const points = new THREE.Points(geo, mat);
  return points;
}