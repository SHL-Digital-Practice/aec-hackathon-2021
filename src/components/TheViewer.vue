<script setup>
import { onMounted, ref } from "vue";
import { AmbientLight, AxesHelper, Box3, DirectionalLight, GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { IFCLoader } from "web-ifc-three/IFCLoader";
import { Color, Vector3 } from "three";
import { acceleratedRaycast, computeBoundsTree, disposeBoundsTree } from "three-mesh-bvh";
import { IFCCOLUMN } from "web-ifc";

const props = defineProps({
  ifcURL: String,
  showReused: Boolean,
});

const container = ref();
let model, camera, controls, box, id, ifcLoader, manager, scene;

onMounted(() => {
  const threeCanvas = container.value;
  scene = new Scene();

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
  ifcLoader = new IFCLoader();
  ifcLoader.ifcManager.setupThreeMeshBVH(computeBoundsTree, disposeBoundsTree, acceleratedRaycast);

  //IFC Model loader
  ifcLoader.load(props.ifcURL, (ifcModel) => {
    id = ifcModel.mesh.modelID;

    manager = ifcLoader.ifcManager;
    manager.getAllItemsOfType(0, IFCCOLUMN, true).then(function (result) {
      if (props.showReused) {
        return getColumn(result);
      }
    });

    scene.add(ifcModel.mesh);
    model = ifcModel;

    adjustMaterials();
    updateCamera();
  });
  ifcLoader.ifcManager.setWasmPath("/ifc/");
});

//Some IFC.js magic
const getColumn = (result) => {
  manager.hideAllItems(0);
  const ids = result.map((o) => o.expressID);
  manager.showItems(0, ids);
};

const adjustMaterials = () => {
  model.material.forEach((m) => {
    m.color.set(new Color(0xffffff));
  });
};

//Focus camera on the IFC model
function updateCamera(fitOffset = 0.8) {
  box = new Box3();
  box.expandByObject(model.mesh);

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
