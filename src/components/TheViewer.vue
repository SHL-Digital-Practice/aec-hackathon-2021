<script setup>
import { onMounted, ref } from "vue";
import { AmbientLight, AxesHelper, Box3, DirectionalLight, GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { Color, Raycaster, Vector2, Vector3 } from "three";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";

const props = defineProps({
  ifcURL: String,
});

const container = ref();
let model, camera, controls, box;

onMounted(() => {
  //Creates the Three.js scene
  const threeCanvas = container.value;
  console.log(threeCanvas);
  const scene = new Scene();
  // scene.background = new Color(0x1e40af);

  //Object to store the size of the viewport

  const size = {
    width: threeCanvas.offsetWidth,
    height: threeCanvas.offsetHeight,
  };

  //Creates the camera (point of view of the user)
  const aspect = size.width / size.height;
  camera = new PerspectiveCamera(40, aspect);
  camera.position.z = 15;
  camera.position.y = 13;
  camera.position.x = 8;

  //Creates the lights of the scene
  const lightColor = 0xffffff;

  const ambientLight = new AmbientLight(lightColor, 0.5);
  scene.add(ambientLight);

  const directionalLight = new DirectionalLight(lightColor, 1);
  directionalLight.position.set(0, 10, 0);
  directionalLight.target.position.set(-5, 0, 0);
  scene.add(directionalLight);
  scene.add(directionalLight.target);

  //Sets up the renderer, fetching the canvas of the HTML
  const renderer = new WebGLRenderer({
    canvas: threeCanvas,
    alpha: true,
  });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //Creates grids and axes in the scene
  const grid = new GridHelper(50, 30, 0x3b82f6, 0x3b82f6);
  // scene.add(grid);

  const axes = new AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  scene.add(axes);

  //Creates the orbit controls (to navigate the scene)
  controls = new OrbitControls(camera, threeCanvas);
  controls.enableDamping = true;
  controls.target.set(-2, 0, 0);

  //Animation loop
  const animate = () => {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  //Adjust the viewport to the size of the browser
  window.addEventListener("resize", () => {
    size.width = threeCanvas.innerWidth;
    size.height = threeCanvas.innerHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
  });

  // Sets up the IFC loading
  const ifcModels = [];
  const ifcLoader = new IFCLoader();
  ifcLoader.ifcManager.setupThreeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast);

  //const ifcURL = "/bloxhub.ifc";
  ifcLoader.load(props.ifcURL, (ifcModel) => {
    console.log(ifcModel);

    scene.add(ifcModel.mesh);
    model = ifcModel;
    adjustMaterials();
    updateCamera();
  });
  ifcLoader.ifcManager.setWasmPath("/ifc/");
});

const adjustMaterials = () => {
  model.material.forEach((m) => {
    m.color.set(new Color(0xffffff));
  });
};

function updateCamera(fitOffset = 0.8) {
  box = new Box3();
  box.expandByObject(model.mesh);

  // box = model.mesh.geometry.computeBoundingBox();
  let size = box.getSize(new Vector3());
  let center = box.getCenter(new Vector3());

  const maxSize = Math.max(size.x, size.y, size.z);
  const fitHeightDistance = maxSize / (2 * Math.atan((Math.PI * camera.fov) / 360));
  const fitWidthDistance = fitHeightDistance / camera.aspect;
  const distance = fitOffset * Math.max(fitHeightDistance, fitWidthDistance);
  const direction = controls.target.clone().sub(camera.position).normalize().multiplyScalar(distance);

  controls.maxDistance = distance * 10;
  controls.target.copy(center);

  camera.near = distance / 100;
  camera.far = distance * 100;
  camera.updateProjectionMatrix();
  camera.position.copy(controls.target).sub(direction);

  controls.update();
}
</script>

<template>
  <canvas ref="container" class="absolute w-full h-full"></canvas>
</template>
