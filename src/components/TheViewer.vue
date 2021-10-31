<script setup>
import { onMounted, ref } from "vue";
import { AmbientLight, AxesHelper, DirectionalLight, GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { Color, Raycaster, Vector2 } from "three";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";

const props = defineProps({
  ifcURL: String,
});

const container = ref();

onMounted(() => {
  //Creates the Three.js scene
  const scene = new Scene();
  // scene.background = new Color(0x1e40af);

  //Object to store the size of the viewport
  const size = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  //Creates the camera (point of view of the user)
  const aspect = size.width / size.height;
  const camera = new PerspectiveCamera(40, aspect);
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
  const threeCanvas = container.value;
  const renderer = new WebGLRenderer({
    canvas: threeCanvas,
    alpha: true,
  });

  renderer.setSize(size.width, size.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //Creates grids and axes in the scene
  const grid = new GridHelper(50, 30, 0x3b82f6, 0x3b82f6);
  scene.add(grid);

  const axes = new AxesHelper();
  axes.material.depthTest = false;
  axes.renderOrder = 1;
  scene.add(axes);

  //Creates the orbit controls (to navigate the scene)
  const controls = new OrbitControls(camera, threeCanvas);
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
    size.width = window.innerWidth;
    size.height = window.innerHeight;
    camera.aspect = size.width / size.height;
    camera.updateProjectionMatrix();
    renderer.setSize(size.width, size.height);
  });

  // Sets up the IFC loading
  const ifcModels = [];
  const ifcLoader = new IFCLoader();
  ifcLoader.ifcManager.setupThreeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast);

  // const ifcURL = "/bloxhub.ifc";
  ifcLoader.load(props.ifcURL, (ifcModel) => scene.add(ifcModel.mesh));
  ifcLoader.ifcManager.setWasmPath("/ifc/");
});

console.log(props.ifcURL);
</script>

<template>
  <div class="static">
    <canvas ref="container" class="absolute bottom-0 left-0"></canvas>
  </div>
</template>
