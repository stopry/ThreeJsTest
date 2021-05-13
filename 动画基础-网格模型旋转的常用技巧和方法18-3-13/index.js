
var renderer,scene,camera,mesh,light;
var width,height;

function init() {
  width = window.innerWidth;
  height = window.innerHeight;
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(width,height);
  renderer.setClearColor(0x000000, 1.0);

  var container = document.createElement('div');
  container.appendChild(renderer.domElement);
  document.body.appendChild(container);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45,width/height,1,1000);
  camera.position.x = -100;
  camera.position.y = 100;
  camera.position.z = 800;

  light = new THREE.AmbientLight(0x00FF00);

  var geometry  = new THREE.BoxGeometry(100,100,100);//一个立方体
  //为立方体不同的面设置不同的颜色 hex 十六进制
  for(var i = 0;i<geometry.faces.length;i+=2){
    var hex = Math.random()*0xffffff;
    geometry.faces[i].color.setHex(hex);
    geometry.faces[i+1].color.setHex(hex);
  }
  var material = new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors});//材质

  mesh = new THREE.Mesh(geometry,material);

  mesh.position.set(0,0,0);

  scene.add(mesh);
  scene.add(light);
  initGrid();
}
//绘制网格
function initGrid() {
  var grid = new THREE.GridHelper(1000,50,0x0000ff,0x808080);
  scene.add(grid);
}

function animate(){
  renderer.clear();
  mesh.rotateY(0.01);
  renderer.render(scene,camera);
  requestAnimationFrame(animate);
}

window.onload = function () {
  init();
  animate();
};
