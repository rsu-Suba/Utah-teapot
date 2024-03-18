import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "three/examples/jsm/geometries/TeapotGeometry.js";

const help_window = document.getElementById("help");
const help_text_obj = document.getElementById("help-text");
const help_text_1 =
   "Key Config:<br>・Q / Options On || Off<br>・A / Resolution-<br>・S / Resolution+<br>・Z / Tessellation-<br>・X / Tessellation+<br>・C / Change shading<br><br>";

let isHelp = 1;
let pixelratio = 4;

console.log(`v3.18.24`);
console.log(THREE);

const camera = new THREE.PerspectiveCamera(
   40,
   window.innerWidth / window.innerHeight,
   0.1,
   10000
);
camera.position.set(7, 8, 12);
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050530);

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setPixelRatio(pixelratio / 10);
var webGLRenderer = new THREE.WebGLRenderer();
webGLRenderer.shadowMap.enabled = true;
const controls = new OrbitControls(camera, renderer.domElement);
document.body.appendChild(renderer.domElement);

const light1 = new THREE.DirectionalLight(0xffffff, 3);
light1.position.set(2, 2, -2).normalize();
scene.add(light1);

var teapot;
let tess = 4;
let shading_mode = 0;
let shading = ["WireNormal", "SolidNormal", "Matcap", "Toon"];
let tea_shading = [
   new THREE.MeshNormalMaterial({ wireframe: true }),
   new THREE.MeshNormalMaterial({ wireframe: false }),
   new THREE.MeshMatcapMaterial({}),
   new THREE.MeshToonMaterial({}),
];
let rotate = 0;

let help_text_2 = `Prop:<br>Tessellation -> ${tess}<br>Shading -> ${
   shading[shading_mode]
}<br>Resolution -> ${pixelratio / 10}`;
help_text_obj.innerHTML = help_text_1 + help_text_2;

createTeapot();

function createTeapot() {
   if (teapot !== undefined) teapot.geometry.dispose();
   scene.remove(teapot);

   var teapotGeometry = new TeapotGeometry(2, tess, true, true, true, true);

   teapot = new THREE.Mesh(teapotGeometry, tea_shading[shading_mode]);

   scene.add(teapot);
}

const tick = () => {
   renderer.setSize(window.innerWidth, window.innerHeight);
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();

   if (teapot !== undefined) rotate += 0.0075;
   teapot.rotation.y = rotate;

   controls.update();
   requestAnimationFrame(tick);

   renderer.render(scene, camera);
};
tick();

window.addEventListener("DOMContentLoaded", function () {
   window.addEventListener("keypress", function (e) {
      switch (e.key) {
         case "q":
            //help
            isHelp == 0
               ? (help_window.className = "back")
               : (help_window.className = "back-hide");
            isHelp == 0 ? (isHelp = 1) : (isHelp = 0);
            break;
         case "z":
            //tess-
            tess--;
            if (tess < 2) tess = 2;
            createTeapot();
            break;
         case "x":
            //tess+
            tess++;
            createTeapot();
            break;
         case "c":
            //shading
            shading_mode++;
            if (shading_mode == 4) shading_mode = 0;
            createTeapot();
            break;
         case "a":
            pixelratio -= 1;
            if (pixelratio < 1) pixelratio = 1;
            break;
         case "s":
            pixelratio += 1;
            break;
         default:
            break;
      }
      renderer.setPixelRatio(pixelratio / 10);
      help_text_2 = `Prop:<br>Tessellation -> ${tess}<br>Shading -> ${
         shading[shading_mode]
      }<br>Resolution -> ${pixelratio / 10}`;
      help_text_obj.innerHTML = help_text_1 + help_text_2;
   });
});
