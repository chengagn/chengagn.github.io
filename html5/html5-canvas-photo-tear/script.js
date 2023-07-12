console.clear();

import * as THREE from 'https://cdn.skypack.dev/three@0.125.0';
import gsap from "https://cdn.skypack.dev/gsap@3.5.1";

const BackgroundGradient = (colorA, colorB) => {
  var mesh = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(2, 2, 1, 1),
  new THREE.ShaderMaterial({
    uniforms: {
      uColorA: { value: new THREE.Color(colorA) },
      uColorB: { value: new THREE.Color(colorB) } },

    vertexShader: `
            varying vec2 vUv;
            void main(){
                vUv = uv;
                float depth = -1.; //or maybe 1. you can experiment
                gl_Position = vec4(position.xy, depth, 1.);
            }
          `,
    fragmentShader:
    `
            varying vec2 vUv;
            uniform vec3 uColorA;
            uniform vec3 uColorB;
            void main(){
                gl_FragColor = vec4(
                    mix( uColorA, uColorB, vec3(vUv.y)),
                    1.
                );
            }
          ` }));



  mesh.material.depthWrite = false;
  mesh.renderOrder = -99999;
  return mesh;
};

class Stage
{
  constructor(domCanvasElement, topColor, bottomColor)
  {
    this.canvas = domCanvasElement;
    this.scene = new THREE.Scene();

    this.sizes = {
      width: 0,
      height: 0 };


    /**
     * Background Gradient
     */

    this.background = BackgroundGradient(bottomColor, topColor);
    this.scene.add(this.background);

    /**
     * Camera
     */

    this.camera = new THREE.PerspectiveCamera(30, this.sizes.width / this.sizes.height, 0.1, 100);
    this.camera.position.set(0, 0, 6);
    this.scene.add(this.camera);

    /**
     * Camera Group
     */

    this.cameraGroup = new THREE.Group();

    this.scene.add(this.cameraGroup);

    /**
     * Renderer
     */
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: window.devicePixelRatio === 1 ? true : false });


    renderer.physicallyCorrectLights = true;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;

    this.renderer = renderer;

    window.addEventListener('resize', () => {this.onResize();});

    this.onResize();

  }

  onResize()
  {
    // Update sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;

    if (this.sizes.width < 800) this.camera.position.z = 10;else
    this.camera.position.z = 6;

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  add(item)
  {
    this.scene.add(item);
  }

  cameraAdd(item)
  {
    this.cameraGroup.add(item);
  }

  render(elapsedTime)
  {
    this.cameraGroup.position.copy(this.camera.position);
    this.cameraGroup.rotation.copy(this.camera.rotation);
    this.renderer.render(this.scene, this.camera);
  }}


class Loader
{
  constructor(color = 'black', shadow = "white", size = 1)
  {
    this.mesh = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(2, 2, 1, 1),
    new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(color) },
        uColorShadow: { value: new THREE.Color(shadow) },
        uProgress: { value: 0 },
        uAlpha: { value: 1 },
        uNoiseSize: { value: size } },

      vertexShader: `
        
                
                void main(){
             
                    gl_Position = vec4(position.xy, 0.5, 1.);
                }
                `,
      fragmentShader: `

                uniform vec3 uColor;
                uniform float uAlpha;
            
                void main () {
                    gl_FragColor = vec4(uColor, uAlpha);
                }
            `,
      transparent: true,
      depthTest: false }));


  }

  get progress()
  {
    return this.mesh.material.uniforms.uProgress.value;
  }

  set progress(newValue)
  {
    this.mesh.material.uniforms.uProgress.value = newValue;
  }

  get alpha()
  {
    return this.mesh.material.uniforms.uAlpha.value;
  }

  set alpha(newValue)
  {
    this.mesh.material.uniforms.uAlpha.value = newValue;
  }

  get noiseSize()
  {
    return this.mesh.material.uniforms.uNoiseSize.value;
  }

  set noiseSize(newValue)
  {
    this.mesh.material.uniforms.uNoiseSize.value = newValue;
  }}


const ripVertexShader = `
	uniform float uTearAmount;
	uniform float uTearWidth;
	uniform float uTearXAngle;
	uniform float uTearYAngle;
	uniform float uTearZAngle;
	uniform float uTearXOffset;
	uniform float uXDirection;
	uniform float uRipSide;
	uniform float uRipSeed;

	varying vec2 vUv;
	varying float vAmount;

	mat4 rotationX( in float angle ) {
		return mat4(	1.0,		0,			0,			0,
						0, 	cos(angle),	-sin(angle),		0,
						0, 	sin(angle),	 cos(angle),		0,
						0, 			0,			  0, 		1);
	}

	mat4 rotationY( in float angle ) {
		return mat4(	cos(angle),		0,		sin(angle),	0,
								0,		1.0,			 0,	0,
						-sin(angle),	0,		cos(angle),	0,
								0, 		0,				0,	1);
	}

	mat4 rotationZ( in float angle ) {
		return mat4(	cos(angle),		-sin(angle),	0,	0,
						sin(angle),		cos(angle),		0,	0,
								0,				0,		1,	0,
								0,				0,		0,	1);
	}

	void main(){

		float ripAmount = 0.0;
		float yAmount = max(0.0, (uTearAmount - (1.0 - uv.y)));
		float zRotate = uTearZAngle * yAmount;
		float xRotate = uTearXAngle * yAmount;
		float yRotate = uTearYAngle * yAmount;
		vec3 rotation = vec3(xRotate* yAmount, yRotate* yAmount, zRotate* yAmount);


		float halfHeight = float(HEIGHT) * 0.5;
		float halfWidth = (float(WIDTH) - uTearWidth * 0.5) * 0.5;

		vec4 vertex = vec4(position.x + (halfWidth * uXDirection) - halfWidth, position.y + halfHeight, position.z, 1.0);

		vertex = vertex * rotationY(rotation.y ) * rotationX(rotation.x  ) * rotationZ(rotation.z  );
		vertex.x += uTearXOffset * yAmount + ripAmount + halfWidth ;
		vertex.y -= halfHeight;

		vec4 modelPosition = modelMatrix * vertex;
		vec4 viewPosition = viewMatrix * modelPosition;
		vec4 projectedPosition = projectionMatrix * viewPosition;

		gl_Position = projectedPosition;

		vUv = uv;
		vAmount = yAmount;
	}
`;

const ripFragmentShader = `
	uniform sampler2D uMap;
	uniform sampler2D uRip;
	uniform sampler2D uBorder;

	uniform vec3 uShadeColor;
	uniform float uUvOffset;
	uniform float uRipSide;
	uniform float uTearXAngle;
	uniform float uShadeAmount;
	uniform float uTearWidth;
	uniform float uWhiteThreshold;
	uniform float uTearOffset;

	varying vec2 vUv;
	varying float vAmount;

	void main () {

		bool rightSide = uRipSide == 1.0;
		float ripAmount = -1.0;
		float width = float(WIDTH);
		float widthOverlap = (uTearWidth * 0.5) + width;

		bool frontSheet = uTearXAngle > 0.0;

		float xScale = widthOverlap / float(FULL_WIDTH);
		vec2 uvOffset = vec2(vUv.x * xScale + uUvOffset, vUv.y);
		vec4 textureColor = texture2D(uMap, uvOffset);
		vec4 borderColor = texture2D(uBorder, uvOffset);
		if(borderColor.r > 0.0) textureColor = vec4(vec3(0.95), 1.0);

		float ripRange = uTearWidth / widthOverlap;
		float ripStart = rightSide ? 0.0 : 1.0 - ripRange;

		float alpha = 1.0;

		float ripX = (vUv.x - ripStart) / ripRange;
		float ripY = vUv.y * 0.5 + (0.5 * uTearOffset);
		vec4 ripCut = texture2D(uRip, vec2(ripX, ripY));
		vec4 ripColor = texture2D(uRip, vec2(ripX * 0.9, ripY - 0.02));

		float whiteness = dot(vec4(1.0), ripCut) / 4.0;

		if (!rightSide && whiteness <= uWhiteThreshold)
		{
			whiteness = dot(vec4(1.0), ripColor) / 4.0;
			if(whiteness >= uWhiteThreshold) textureColor = ripColor;
			else alpha = 0.0;
		} 
		if (rightSide && whiteness >= uWhiteThreshold) alpha = 0.0;

		gl_FragColor = mix(vec4(textureColor.rgb, alpha), vec4(uShadeColor, alpha), vAmount * uShadeAmount);
	}
`;

class Photo
{
  constructor(textures, destoryCallback)
  {
    this.destroyCallback = destoryCallback;
    this.photoTexture = textures.photo;
    this.borderTexture = textures.border;
    this.ripTexture = textures.rip;
    this.interactive = false;

    this.group = new THREE.Group();
    this.group.rotation.z = (Math.random() * 2 - 1) * Math.PI;
    this.group.position.y = 10;

    setTimeout(() => {
      this.interactive = true;
    }, 400);

    const introAnimation = gsap.timeline({
      delay: 0.3,
      defaults: {
        duration: 0.8,
        ease: 'power3.out' } });


    introAnimation.to(this.group.rotation, { z: 0 }, 0);
    introAnimation.to(this.group.position, { y: 0 }, 0);

    const width = 3;
    const tearWidth = 0.4;

    this.sheetSettings = {
      widthSegments: 30,
      heightSegments: 50,
      tearOffset: Math.random(),
      width: width,
      height: 2,
      tearAmount: 0,
      tearWidth: tearWidth,
      ripWhiteThreshold: 0.7,
      left: {
        uvOffset: 0,
        ripSide: 0,
        tearXAngle: -0.01,
        tearYAngle: -0.1,
        tearZAngle: 0.05,
        tearXOffset: 0,
        direction: -1,
        shadeColor: new THREE.Color('white'),
        shadeAmount: 0.2 },

      right: {
        uvOffset: (width - tearWidth) / width * 0.5,
        ripSide: 1,
        tearXAngle: 0.2,
        tearYAngle: 0.1,
        tearZAngle: -0.1,
        tearXOffset: 0,
        direction: 1,
        shadeColor: new THREE.Color('black'),
        shadeAmount: 0.4 } };



    this.sides = [
    {
      id: 'left',
      mesh: null,
      material: null },

    {
      id: 'right',
      mesh: null,
      material: null }];



    this.sheetPlane = new THREE.PlaneBufferGeometry(this.sheetSettings.width / 2 + this.sheetSettings.tearWidth / 2, this.sheetSettings.height, this.sheetSettings.widthSegments, this.sheetSettings.heightSegments);

    this.sides.forEach((side) =>
    {
      side.material = this.getRipMaterial(side.id);
      side.mesh = new THREE.Mesh(this.sheetPlane, side.material);

      if (this.sheetSettings[side.id].tearXAngle > 0)
      {
        side.mesh.position.z += 0.0001;
      }
      this.group.add(side.mesh);
    });


  }

  getRipMaterial(side)
  {
    const material = new THREE.ShaderMaterial({
      defines: {
        HEIGHT: this.sheetSettings.height,
        WIDTH: this.sheetSettings.width / 2,
        FULL_WIDTH: this.sheetSettings.width,
        HEIGHT_SEGMENTS: this.sheetSettings.heightSegments,
        WIDTH_SEGMENTS: this.sheetSettings.widthSegments },

      uniforms: {
        uMap: { value: this.photoTexture },
        uRip: { value: this.ripTexture },
        uBorder: { value: this.borderTexture },
        uRipSide: { value: this.sheetSettings[side].ripSide },
        uTearWidth: { value: this.sheetSettings.tearWidth },
        uWhiteThreshold: { value: this.sheetSettings.ripWhiteThreshold },
        uTearAmount: { value: this.sheetSettings.tearAmount },
        uTearOffset: { value: this.sheetSettings.tearOffset },
        uUvOffset: { value: this.sheetSettings[side].uvOffset },
        uTearXAngle: { value: this.sheetSettings[side].tearXAngle },
        uTearYAngle: { value: this.sheetSettings[side].tearYAngle },
        uTearZAngle: { value: this.sheetSettings[side].tearZAngle },
        uTearXOffset: { value: this.sheetSettings[side].tearXOffset },
        uXDirection: { value: this.sheetSettings[side].direction },
        uShadeColor: { value: this.sheetSettings[side].shadeColor },
        uShadeAmount: { value: this.sheetSettings[side].shadeAmount } },

      transparent: true,
      vertexShader: ripVertexShader,
      fragmentShader: ripFragmentShader });


    return material;
  }

  shouldCompleteRip()
  {
    return this.sheetSettings.tearAmount >= 1.5;
  }

  updateUniforms()
  {
    if (this.interactive && this.shouldCompleteRip())
    {
      this.remove();
    } else

    {
      if (this.sheetSettings.tearAmount === 0) this.sheetSettings.tearOffset = Math.random();
      this.sides.forEach((side) =>
      {
        const uniforms = side.mesh.material.uniforms;

        uniforms.uTearAmount.value = this.sheetSettings.tearAmount;
        uniforms.uTearOffset.value = this.sheetSettings.tearOffset;
        uniforms.uUvOffset.value = this.sheetSettings[side.id].uvOffset;
        uniforms.uTearXAngle.value = this.sheetSettings[side.id].tearXAngle;
        uniforms.uTearYAngle.value = this.sheetSettings[side.id].tearYAngle;
        uniforms.uTearZAngle.value = this.sheetSettings[side.id].tearZAngle;
        uniforms.uTearXOffset.value = this.sheetSettings[side.id].tearXOffset;
        uniforms.uXDirection.value = this.sheetSettings[side.id].direction;
        uniforms.uShadeColor.value = this.sheetSettings[side.id].shadeColor;
        uniforms.uShadeAmount.value = this.sheetSettings[side.id].shadeAmount;
        uniforms.uWhiteThreshold.value = this.sheetSettings.ripWhiteThreshold;
      });
    }

  }

  completeRip()
  {
    if (this.sheetSettings.tearAmount >= 1.15) this.remove();else
    this.reset();
  }

  reset()
  {
    gsap.to(this.sheetSettings, { tearAmount: 0, onUpdate: () => this.updateUniforms() });
  }

  remove()
  {
    this.interactive = false;
    this.destroyCallback();
    const removeAnimation = gsap.timeline({ defaults: { duration: 1, ease: 'power2.in' }, onComplete: () => this.destroyMe() });
    removeAnimation.to(this.sheetSettings, { tearAmount: 1.5 + Math.random() * 1.5, ease: 'power2.out', onUpdate: () => this.updateUniforms() });
    removeAnimation.to(this.group.position, { z: 1 }, 0);

    this.sides.forEach((side) =>
    {
      removeAnimation.to(side.mesh.position, { y: -3 + Math.random() * -3, x: (2 + Math.random() * 3) * (this.sheetSettings[side.id].ripSide - 0.5) }, 0);
      removeAnimation.to(side.mesh.rotation, { z: (-2 + Math.random() * -3) * (this.sheetSettings[side.id].ripSide - 0.5) }, 0);
    });
  }

  destroyMe()
  {
    this.sheetPlane.dispose();
    this.sides.forEach((side) =>
    {
      side.material.dispose();
      this.group.remove(side.mesh);
    });
  }}


let interacted = false;

/**
 * Stage
 */

const canvas = document.querySelector('canvas.webgl');
const stage = new Stage(canvas, '#F1EBE4', '#D5C3AE');

/**
 * Loaders
 */

const loaderScreen = new Loader('black');
stage.add(loaderScreen.mesh);

const loadingManager = new THREE.LoadingManager(
() =>
{
  const tl = gsap.timeline();
  tl.to(loaderScreen, { progress: 1, alpha: 0, duration: .5, ease: 'power4.inOut' }, 0);

  init();
});


const textureLoader = new THREE.TextureLoader(loadingManager);

/**
 * Lights
 */

let envLight = new THREE.AmbientLight({ color: 'white', intensity: 6 });
stage.add(envLight);

let pointLight = new THREE.PointLight({ color: 'white', intensity: 20 });
pointLight.position.z = -1;
stage.add(pointLight);

/**
 * Materials
 */

const images = [
{
  texture: textureLoader.load('https://assets.codepen.io/557388/photo-4.jpg'),
  colors: [[192, 208, 220], [217, 190, 174]] },

{
  texture: textureLoader.load('https://assets.codepen.io/557388/photo-3.jpg'),
  colors: [[168, 163, 150], [218, 180, 141]] }];


let currentImage = -1;
const textureRip = textureLoader.load('https://assets.codepen.io/557388/rip.jpg');
const textureBorder = textureLoader.load('https://assets.codepen.io/557388/border.png');

/**
 * Paper
 */

const photos = [];
const mouseStart = new THREE.Vector2();
let mouseDown = false;
const extraImages = [
{ file: 'https://assets.codepen.io/557388/photo-1.jpg', colors: [[208, 229, 224], [209, 209, 220]] },
{ file: 'https://assets.codepen.io/557388/photo-2.jpg', colors: [[191, 192, 184], [217, 200, 170]] },
{ file: 'https://assets.codepen.io/557388/photo-6.jpg', colors: [[217, 226, 233], [216, 220, 203]] },
{ file: 'https://assets.codepen.io/557388/photo-7.jpg', colors: [[206, 221, 226], [219, 213, 222]] },
{ file: 'https://assets.codepen.io/557388/photo-5.jpg', colors: [[199, 199, 210], [218, 203, 195]] }];

const postInitTextureLoader = new THREE.TextureLoader();

const getMousePos = (x, y) =>
{
  return {
    x: x / stage.sizes.width * 2 - 1,
    y: -(y / stage.sizes.height) * 2 + 1 };

};

const down = (x, y) =>
{
  if (photos.length && photos[0].interactive)
  {
    interacted = true;
    hideHand();
    let pos = getMousePos(x, y);
    mouseStart.x = pos.x;
    mouseStart.y = pos.y;
    mouseDown = true;
  }
};

const move = (x, y) =>
{
  if (mouseDown && photos.length && photos[0].interactive)
  {
    let pos = getMousePos(x, y);
    let distanceY = mouseStart.y - pos.y;

    photos[0].sheetSettings.tearAmount = Math.max(2 * distanceY, 0);
    photos[0].updateUniforms();
  }
};

const up = () =>
{
  if (mouseDown && photos.length && photos[0].interactive)
  {
    mouseDown = false;
    photos[0].completeRip();
  }
};

const loadExtraPhoto = () =>
{
  const nextImage = extraImages.shift();
  images.push({
    texture: postInitTextureLoader.load(nextImage.file),
    colors: nextImage.colors });

};

const addNewPhoto = () =>
{
  currentImage++;
  if (currentImage >= images.length) currentImage = 0;

  if (images.length - currentImage < 2 && extraImages.length) loadExtraPhoto();

  mouseDown = false;

  const nextImage = images[currentImage];

  let photo = new Photo(
  {
    photo: nextImage.texture,
    rip: textureRip,
    border: textureBorder },

  () => addNewPhoto());

  photos.unshift(photo);
  stage.add(photo.group);

  gsap.to(stage.background.material.uniforms.uColorB.value, {
    r: nextImage.colors[0][0] / 255,
    g: nextImage.colors[0][1] / 255,
    b: nextImage.colors[0][2] / 255,
    ease: 'power4.inOut',
    duration: 1 });

  gsap.to(stage.background.material.uniforms.uColorA.value, {
    r: nextImage.colors[1][0] / 255,
    g: nextImage.colors[1][1] / 255,
    b: nextImage.colors[1][2] / 255,
    ease: 'power4.inOut',
    duration: 1 });

};

const init = () =>
{
  addNewPhoto();

  window.addEventListener('mousedown', event => down(event.clientX, event.clientY));
  window.addEventListener('touchstart', event => down(event.touches[0].clientX, event.touches[0].clientY));
  window.addEventListener('mousemove', event => move(event.clientX, event.clientY));
  window.addEventListener('touchmove', event => move(event.touches[0].clientX, event.touches[0].clientY));
  window.addEventListener('mouseup', up);
  window.addEventListener('touchend', up);
};

/**
 * Tick
 */

const clock = new THREE.Clock();

const tick = () =>
{
  const elapsedTime = clock.getElapsedTime();
  stage.render(elapsedTime);
  window.requestAnimationFrame(tick);
};

tick();

const hand = document.getElementById('hand');
const downDuration = 2;
const upDuration = 0.7;

const hintAnimation = gsap.timeline({ repeat: -1, defaults: { duration: downDuration, ease: 'power4.inOut' } });
hintAnimation.fromTo(hand, { y: '-100%' }, { y: '100%' });
hintAnimation.to(hand, { y: '-100%', duration: upDuration, motionPath: [{ rotate: '-10' }, { rotate: '0' }] }, downDuration);
hintAnimation.to(hand, { rotate: '-25', scale: 1.1, duration: upDuration * 0.5, ease: 'power4.in' }, downDuration);
hintAnimation.to(hand, { rotate: '0', scale: 1, duration: upDuration * 0.5, ease: 'power4.out' }, downDuration + upDuration * 0.5);

hintAnimation.pause();

const showHand = () =>
{
  if (!interacted)
  {
    hintAnimation.play();
    gsap.to(hand, { opacity: 1 });
  }
};

const hideHand = () =>
{
  gsap.to(hand, { opacity: 0, onComplete: () => hintAnimation.pause() });
};

setTimeout(() => showHand(), 5000);