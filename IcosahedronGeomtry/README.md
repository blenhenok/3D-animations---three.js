**PerspectiveCamera**: (fov, aspect, near, far)
  - The first attribute is the field of view. FOV is the extent of the scene that is seen on the display at any given moment. The value is in degrees.
  - The second one is the aspect ratio. You almost always want to use the width of the element divided by the height, or you'll get the same result as when you play old movies on a widescreen TV - the image looks squished.
  - The next two attributes are the near and far clipping plane. What that means, is that objects further away from the camera than the value of far or closer than near won't be rendered. 

**document.body.appendChild( renderer.domElement );**
  - we add the renderer element to our HTML document. This is a <canvas> element the renderer uses to display the scene to us.

**Mesh (geometry, material)**
  - A mesh is an object that takes a geometry, and applies a material to it, which we then can insert to our scene, and move freely around.
   - **flatshading** : Makes the structure of the geometry more visible by emphasizing individual faces.
   - **wireframe**: is a visualization technique in 3D graphics where an object is displayed as a network of lines representing its edges.
   - **scale.setScalar**: enhances readability; This method sets all the components of the vector to the same scalar value.A single numeric value that will be applied to all components (x, y, z,).

**IcosahedronGeometry (radius, detail)**
  - icosahedron geometry is a 3D geometric shape, which is a polyhedron with 20 triangular faces, 12 vertices, and 30 edges.
   - **radius** (default: 1):Defines the size of the icosahedron.Increasing the radius scales the geometry proportionally.
   - **detail** (default: 0): Specifies the level of detail (subdivision) for the geometry.
       - detail = 0: (20 faces), detail = 1: (80 faces), detail = 2:( 320 faces), and so on.

**function animation**
  - **mesh.rotation(x,y,z)**: Refers to the Euler object that defines the cube's orientation in 3D space.

**import {orbitcontrols} from 'jsm/controls/OrbitControls.js';**
  - OrbitControls is a utility that provides user-friendly camera controls for rotate, zoom, and pan around a 3D object or scene using mouse or touch inputs.
  - it is not included in the core library.
**new OrbitControls(camera, renderer);**
  - camera: The camera that OrbitControls will manipulate.
  - renderer: OrbitControls listens to for user interactions, such as mouse or touch events.
  - **.enableDamping = true**: Adds smooth, gradual motion to the camera when the user rotates, pans, or zooms. Without damping, the camera stops moving abruptly when the user releases input.
  - **.dampingFactor = 0.05;** : Controls the speed of the damping effect.(0,1)
  - To make damping work, you must call *controls.update()* in the animation loop.
