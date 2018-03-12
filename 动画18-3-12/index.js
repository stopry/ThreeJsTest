var renderer;

function initThree() {
  width =  document.getElementById('canvas-frame').clientWidth;
  height  = document.getElementById('canvas-frame').clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias:true
  });
  renderer.setSize(width,height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  renderer.setClearColor(0xFFFFFF,1.0);
}

var camera;
function initCamera() {
  camera = new THREE.PerspectiveCamera(110,width/height,1,1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 1000;
  camera.up.x = 0;
  camera.up.y = 1;
  camera.up.z = 0;
}

var scene;
function initScene() {
  scene = new THREE.Scene();
}

var light;
function initLight() {
  light = new THREE.AmbientLight(0xFF0000);
  light.position.set(100,100,200);
  scene.add(light);

  var lightP = new THREE.PointLight(0x00FF00);
  lightP.position.set(0,0,300);
  scene.add(lightP);
}

var cube;
function initObject() {
  var geometry = new THREE.CylinderBufferGeometry(100,150,400);
  var material = new THREE.MeshBasicMaterial({color:0x00ff00});
  var mesh = new THREE.Mesh(geometry,material);
  mesh.position = new THREE.Vector3(0,0,0);
  scene.add(mesh);
}

function threeStart() {
  initThree();
  initCamera();
  initScene();
  initLight();
  initObject();
  animation();
}
function animation() {
  camera.position.x += 0.5;
  renderer.render(scene,camera);
  requestAnimationFrame(animation);
}
window.onload = function () {
  threeStart();
};
