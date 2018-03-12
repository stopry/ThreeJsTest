var renderer;//渲染器
//初始化

//定义场景的宽高
var width,height;

function initThree() {
  width = document.getElementById('canvas-frame').clientWidth;
  height = document.getElementById('canvas-frame').clientHeight;
  renderer = new THREE.WebGLRenderer({
    antialias:true
  });
  renderer.setSize(width,height);
  document.getElementById('canvas-frame').appendChild(renderer.domElement);
  renderer.setClearColor(0xffffff,1.0);
}

var camera;//相机
//初始化相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(45,width/height,1,10000);
  camera.position.x = 0;
  camera.position.y = 1000;
  camera.position.z = 0;
  camera.up.x = 0;
  camera.up.y = 0;
  camera.up.z = 1;
  camera.lookAt({
    x:0,
    y:0,
    z:0
  });
}

var scene ;//场景
//初始化场景
function initScene() {
  scene  = new THREE.Scene();
}

var light;//光源
//初始化光源
function initLight() {
  light = new THREE.DirectionalLight(0xFF0000,1.0,0);
  light.position.set(100,100,200);
  scene.add(light);//场景添加光源
}

var cube;//立方体
//初始化立方体
function initObject(){
  var geometry = new THREE.Geometry();//几何
  var material = new THREE.LineBasicMaterial({vertexColors:THREE.VertexColors});//材料
  var color1 = new THREE.Color(0x444444),color2 = new THREE.Color(0xff0000);//两个颜色

  //线的材质可由2点的颜色决定
  var p1 = new THREE.Vector3(-100,0,100);
  var p2 = new THREE.Vector3(100,0,-100);
  geometry.vertices.push(p1);
  geometry.vertices.push(p2);
  geometry.colors.push(color1,color2);

  var line = new THREE.Line(geometry,material,THREE.LinePieces);//线
  scene.add(line);//在场景中添加线
}

//渲染
function render() {
  renderer.clear();
  renderer.render(scene,camera);
  requestAnimationFrame(render);
}
//开始
function threeStart() {
  initThree();
  initCamera();
  initScene();
  initLight();
  initObject();
  render();
}
window.onload = function () {
  threeStart();
};