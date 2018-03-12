var camera,scene,renderer,mesh;
init();
animate();
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
    100
  );
  camera.position.z = 100;
  scene = new THREE.Scene();

  //A begin
  var geometry = new THREE.PlaneGeometry(500,300,1,1);//创建几何体
  geometry.vertices[0].uv = new THREE.Vector2(0,0);
  geometry.vertices[1].uv = new THREE.Vector2(1,0);
  geometry.vertices[2].uv = new THREE.Vector2(1,1);
  geometry.vertices[3].uv = new THREE.Vector2(0,1);
  //A end

  // B begin
  //加载纹理
  var texture = THREE.ImageUtils.loadTexture('../texure/meinv.png',null,function (t) {
    console.log(t);
  });
  //将图片用于材料
  var material = new THREE.MeshBasicMaterial({
    map:texture
  });
  mesh = new THREE.Mesh(geometry,material);
  scene.add(mesh);
  // B end
  window.addEventListener('resize',onWindowResize,!1);
}

function onWindowResize() {
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight);

}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
}
