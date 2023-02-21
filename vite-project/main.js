import './style.css'
import './text.js'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { RGBShiftShader } from 'three/addons/shaders/RGBShiftShader.js';
import { DotScreenShader } from 'three/addons/shaders/DotScreenShader.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

//vhs 
// postprocessing

let composer = new EffectComposer( renderer );
composer.addPass( new RenderPass( scene, camera ) );

/* vhs effect
const effect1 = new ShaderPass( DotScreenShader );
effect1.uniforms[ 'scale' ].value = 6;
composer.addPass( effect1 );
*/
const effect2 = new ShaderPass( RGBShiftShader );
effect2.uniforms[ 'amount' ].value = 0.0015;
composer.addPass( effect2 );

//load font text
const loader = new FontLoader();
				loader.load( 'Stereofunk_Display.json', function ( font ) {

					const color = new THREE.Color( 0x00FF00 );

					const matDark = new THREE.MeshBasicMaterial( {
						color: color,
						side: THREE.DoubleSide
					} );

					const matLite = new THREE.MeshBasicMaterial( {
						color: color,
						transparent: true,
						opacity: 0.4,
						side: THREE.DoubleSide
					} );

					const message = 'luos world';

					const shapes = font.generateShapes( message, 5 );

					const textGeometry = new THREE.ShapeGeometry( shapes );

					textGeometry.computeBoundingBox();

					const xMid = - 0.5 * ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x );

					textGeometry.translate( xMid, 0, 0 );
          

					// make shape ( N.B. edge view not visible )

					const text = new THREE.Mesh(textGeometry, matLite );
					text.position.z = 9;
        
          
					scene.add( text );

					// make line shape ( N.B. edge view remains visible )

					const holeShapes = [];

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						if ( shape.holes && shape.holes.length > 0 ) {

							for ( let j = 0; j < shape.holes.length; j ++ ) {

								const hole = shape.holes[ j ];
								holeShapes.push( hole );

							}

						}

					}

					shapes.push.apply( shapes, holeShapes );

					const style = SVGLoader.getStrokeStyle( 0.5, color.getStyle() );

					const strokeText = new THREE.Group();

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						const points = shape.getPoints();

						const geometry = SVGLoader.pointsToStroke( points, style );

						geometry.translate( xMid, 0, 10 );
           

						const strokeMesh = new THREE.Mesh( geometry, matDark );
						strokeText.add( strokeMesh );

					}
          scene.add( strokeText );
        })

        // stats music yt converter
const bottomloader = new FontLoader();

				bottomloader.load( 'https://raw.githubusercontent.com/lukecrosser/LuosWorldRedesign/master/vite-project/Stereofunk_Display.json', function ( font ) {
          

					const color = new THREE.Color( 0x00FF00 );

					const matDark = new THREE.MeshBasicMaterial( {
						color: color,
						side: THREE.DoubleSide
					} );

					const matLite = new THREE.MeshBasicMaterial( {
						color: color,
						transparent: true,
						opacity: 0.4,
						side: THREE.DoubleSide
					} );

					const message = 'stats     music     yt converter';

					const shapes = font.generateShapes( message, 1 );

					const textGeometry = new THREE.ShapeGeometry( shapes );

					textGeometry.computeBoundingBox();

					const xMid = - 0.5 * ( textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x );

					textGeometry.translate( xMid, -5, 0 );
          

					// make shape ( N.B. edge view not visible )

					const text = new THREE.Mesh(textGeometry, matLite );
					text.position.z = 9;

          text.onClick = function() {
            window.location.href = 'https://luos.world/stats.html';
          };
          const raycaster = new THREE.Raycaster();

					scene.add( text );

          const hoverMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFF00 });
          
          //mouse click function 
          window.addEventListener('click', function(event) {
            event.preventDefault();
        
            // calculate mouse position in normalized device coordinates
            const mouse = new THREE.Vector2();
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        
            // update the picking ray with the camera and mouse position
            raycaster.setFromCamera(mouse, camera);
        
            // calculate objects intersecting the picking ray
            const intersects = raycaster.intersectObjects(scene.children, true);
        
            // check if any of the intersects are the text mesh
            for (let i = 0; i < intersects.length; i++) {
                if (intersects[i].object === text) {
                    text.onClick();
                    break;
                }
            }
        }, false);

        //mouse over function
        window.addEventListener('mousemove', function(event) {
          const mouse = new THREE.Vector2();

          // calculate mouse position in normalized device coordinates
          mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
          // update the picking ray with the camera and mouse position
          raycaster.setFromCamera(mouse, camera);
      
          // calculate objects intersecting the picking ray
          const intersects = raycaster.intersectObjects(scene.children, true);
      
          // check if any of the intersects are the text mesh
          const isIntersectingText = intersects.some(intersect => intersect.object === text);
      
          // set the material of the text based on whether it's being hovered over
          text.material = isIntersectingText ? hoverMaterial : matLite;
      });

        
        

					// make line shape ( N.B. edge view remains visible )

					const holeShapes = [];

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						if ( shape.holes && shape.holes.length > 0 ) {

							for ( let j = 0; j < shape.holes.length; j ++ ) {

								const hole = shape.holes[ j ];
								holeShapes.push( hole );

							}

						}

					}

					shapes.push.apply( shapes, holeShapes );

					const style = SVGLoader.getStrokeStyle( 0.1, color.getStyle() );

					const strokeText = new THREE.Group();

					for ( let i = 0; i < shapes.length; i ++ ) {

						const shape = shapes[ i ];

						const points = shape.getPoints();

						const geometry = SVGLoader.pointsToStroke( points, style );

						geometry.translate( xMid, -5, 10 );
           

						const strokeMesh = new THREE.Mesh( geometry, matDark );
						strokeText.add( strokeMesh );
            

					}
          scene.add( strokeText );
        })
					


//ring
const geometry = new THREE.TorusGeometry( 8, 2, 30 , 50);
const material = new THREE.MeshStandardMaterial( {color: 0xffff00, wireframe:true, side: THREE.DoubleSide} );
const plane = new THREE.Mesh( geometry, material );
scene.add( plane );


//bottom plane 
const bottomplaneGeometry = new THREE.PlaneGeometry(500,500,25,25);
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

//above plane
const aboveplaneGeometry = new THREE.PlaneGeometry(500,500,25,25);
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


//stars 
function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 15, 500)
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff })
  const star = new THREE.Mesh( geometry, material); 

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z);
  scene.add(star)
}


//moon 
const moonTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/lukecrosser/LuosWorldRedesign/master/vite-project/moon.png')
const normalTexture = new THREE.TextureLoader().load('https://raw.githubusercontent.com/lukecrosser/LuosWorldRedesign/master/vite-project/normal.jpg')
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


function onWindowResize() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  

}


function animate() {
  requestAnimationFrame( animate);
	

  plane.rotation.x += 0.01;
  plane.rotation.y += 0.005;
  plane.rotation.z += 0.01;

  controls.update();

  composer.render(scene, camera);
}

window.addEventListener( 'resize', onWindowResize );
animate()