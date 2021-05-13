var camera,renderer,control,scene;

window.onload = function () {
  init();
  animate();
  console.log(1);
};

function init() {



  camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,0.01,1e10);
  camera.position.z = 10;

  //light
  var dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(200,200,1000).normalize();
  camera.add(dirLight);
  camera.add(dirLight.target);

  //兰伯特材质 双面
  var material = new THREE.MeshLambertMaterial({color:0xffffff,side:THREE.DoubleSide});
  scene = new THREE.Scene();
  //实例化VTKLoader
  var loader = new THREE.VTKLoader();
  loader.addEventListener( 'load', function ( event ) {

    var geometry = event.content;

    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.setY( - 0.09 );

    control = new THREE.TrackballControls(camera);
    control.rotateSpeed = 5.0;
    control.zoomSpeed = 5;
    control.panSpeed = 1;
    control.noZoom = false;
    control.noPan = false;
    control.staticMoving = false;
    // 动态阻尼（衰减）因素
    control.dynamicDampingFactor = 0.3;

    scene.add( camera );

    scene.add( mesh );

  } );
  loader.load('./res/bunny.vtk');

  //渲染
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setClearColorHex(0x000000,1);
  renderer.setSize(window.innerWidth,window.innerHeight);

  var container = document.createElement('div');//创建一个容器 放在html的body中
  document.body.appendChild(container);
  container.appendChild(renderer.domElement);

  window.addEventListener('resize',onWindowResize,false);

}

function onWindowResize() {
  //相机的方向
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth,window.innerHeight)
  control.handleResize();

}
function animate() {
  requestAnimationFrame(animate);

  renderer.render(scene,camera);
  control&&control.update&&control.update();
}
