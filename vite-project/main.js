import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//ring
const geometry = new THREE.TorusGeometry( 8, 2, 30 , 50);
const material = new THREE.MeshStandardMaterial( {color: 0xffff00, wireframe:true, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );

const bottomplaneGeometry = new THREE.PlaneGeometry(100,100,25,25);
const bottomplaneMaterial = new  THREE.MeshBasicMaterial({
  wireframe: true,
  wireframeLinewidth: 3, // Set the thickness of the wireframe
  color: 0xff66cc, // Set the color of the material to cool pink
  side: THREE.DoubleSide
})
const bottomPlane = new THREE.Mesh ( bottomplaneGeometry, bottomplaneMaterial);
bottomPlane.rotateX(-Math.PI / 2);
bottomPlane.translateZ(-12)
scene.add(bottomPlane);

const aboveplaneGeometry = new THREE.PlaneGeometry(100,100,25,25);
const aboveplaneMaterial = new  THREE.MeshBasicMaterial({
  wireframe: true,
  wireframeLinewidth: 3, // Set the thickness of the wireframe
  color: 0x00FFFF, // Set the color of the material to cool pink
  side: THREE.DoubleSide
})
const abovePlane = new THREE.Mesh ( aboveplaneGeometry, aboveplaneMaterial);
abovePlane.rotateX(-Math.PI / 2);
abovePlane.translateZ(15)
scene.add(abovePlane);

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(30,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);

const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200,50)

scene.add(pointLight)
scene.add(ambientLight)
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);


function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh( geometry, material); 

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}


//moon 
const moonTexture = new THREE.TextureLoader().load('moon.png')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial({
    map:moonTexture,
    normalMap: normalTexture,
    emissive: 0x570047,
    color: 0x049ef4,
  })
);

scene.add(moon)


Array(200).fill().forEach(addStar)

function animate() {
  requestAnimationFrame( animate);

  plane.rotation.x += 0.01;
  plane.rotation.y += 0.005;
  plane.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate()