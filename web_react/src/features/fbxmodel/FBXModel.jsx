import React, { useEffect } from "react";

// import * as THREE from "three";
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import model from "../../assets/avatar.fbx"
export default function Threed_model() {
  //three js
  useEffect(() => {
    //basic setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector("#canvas"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    //controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);

    //fbx loader
    const material = new THREE.MeshNormalMaterial();
    const fbxLoader = new FBXLoader();
    // fbxLoader.load("models/3dModdleOfTheBox.fbx", (object) => {
    //   scene.add(object);
    // });


    fbxLoader.load(model, (object) => {
      object.traverse(function (child) {
        if (child.isMesh) {
          console.log(child.geometry.attributes.uv)

          // const texture = new THREE.TextureLoader().load(
          //   'models/pakage(12).png'
          // )
          // child.material.map = texture
          // child.material.needsUpdate = true
        }
      })

      object.scale.set(0.01, 0.01, 0.01)
      scene.add(object)
      console.log(object)
    })
    //light
    const light = new THREE.PointLight();
    light.position.set(0.8, 1.4, 1.0);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight();
    scene.add(ambientLight);

    //adding stuff
    const geometry = new THREE.TorusGeometry(1, 0.5, 16, 100);

    const torus = new THREE.Mesh(geometry, material);

    scene.add(torus);

    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    renderer.render(scene, camera);
  }, []);
  return <>
  {/* <h1>hehe</h1> */}
  <canvas id="canvas">test</canvas>
  </>;
}
