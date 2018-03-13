var camera,scene,renderer,mesh,texture;


function start() {
  clock();
  init();
  animate();
}

function init() {
  renderer = new THREE.WebGLRenderer({
    antialias:true
  });
  renderer.setSize(window.innerWidth,window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(
    70,//视角
    window.innerWidth/window.innerHeight,
    1,
    1000
  );
  camera.position.z = 400;
  scene = new THREE.Scene();

  var geometry = new THREE.CubeGeometry(150,150,150);//创建几何体
  texture = new THREE.Texture(canvas);
  var material = new THREE.MeshBasicMaterial({map:texture});
  texture.needsUpdate = true;
  mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);

  window.addEventListener('resize',onWindowResize,!1);
}

function onWindowResize() {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);

}

function animate() {
  texture.needsUpdate = true;
  mesh.rotation.x -= 0.01;
  mesh.rotation.y -= 0.01;

  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}

window.onload = function () {
  start();
  console.log(1);
};
