
var scene = null;
var camera = null;
var renderer = null;
var cube = null;

var material = new THREE.ShaderMaterial({
  vertexShader: document.getElementById('vs').textContent,
  fragmentShader: document.getElementById('fs').textContent
});




function init() {
  console.log(document.getElementById('canvas-frame'))
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('canvas-frame')
  });

  renderer.shadowMapEnabled = true;
  renderer.shadowMapSoft = true;

  scene = new THREE.Scene();


  // camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);

  camera = new THREE.PerspectiveCamera(
    50,//视角
    window.innerWidth/window.innerHeight,
    1,
    100
  );

  camera.position.set(5, 15, 25);
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  scene.add(camera);


  var plane = new THREE.Mesh(new THREE.PlaneGeometry(80, 80, 16, 16),
    new THREE.MeshLambertMaterial({color: 0xaaaaaa}));
  plane.rotation.x = -Math.PI / 2;
  plane.position.y = -1;
  plane.receiveShadow = true;
  scene.add(plane);


  cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
    material);
  cube.position.x = 2;
  cube.castShadow = true;
  scene.add(cube)

  var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
  light.position.set(2, 5, 3);
  light.target = cube;
  light.castShadow = true;

  light.shadowCameraNear = 2;
  light.shadowCameraFar = 10;
  light.shadowCameraFov = 30;
  light.shadowCameraVisible = true;

  light.shadowMapWidth = 1024;
  light.shadowMapHeight = 1024;
  light.shadowDarkness = 0.3;

  scene.add(light);


  draw();
}

function draw() {
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.01;
  if (cube.rotation.y > Math.PI * 2) {
    cube.rotation.y -= Math.PI * 2;
  }
  if (cube.rotation.x > Math.PI * 2) {
    cube.rotation.x -= Math.PI * 2;
  }

  renderer.render(scene, camera);

  requestAnimationFrame(draw);
}

init();
