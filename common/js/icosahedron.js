window.addEventListener('DOMContentLoaded', function () {
  const containers = document.querySelectorAll('.icosahedron');
  if (!containers.length) return;

  // ユーザー設定
  const userSettings = {
    exposure: 2.5,
    ambientLightIntensity: 0.9,
    directionalLightIntensity: 3.0,
    directionalLightPosition: { x: -0.5, y: 1, z: 0.5 },
    objectColor: 0x009FB3,
    metalness: 0.1,
    roughness: 0.5,
    flatShading: true,
    rotation: {
      x: Math.PI / 7.5,    // ≒0.42
      y: -Math.PI / 7.5,   // ≒-0.42
      z: 0
    }
  };

  function initIcosahedron(container) {
    const width = container.clientWidth;
    const height = container.clientHeight;
    if (!width || !height) return;

    const scene = new THREE.Scene();

    const aspect = width / height;
    const cameraSize = 2.5;
    const camera = new THREE.OrthographicCamera(
      -cameraSize * aspect,
       cameraSize * aspect,
       cameraSize,
      -cameraSize,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = userSettings.exposure;
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, userSettings.ambientLightIntensity);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, userSettings.directionalLightIntensity);
    directionalLight.position.set(
      userSettings.directionalLightPosition.x,
      userSettings.directionalLightPosition.y,
      userSettings.directionalLightPosition.z
    );
    scene.add(directionalLight);

    const pivot = new THREE.Object3D();
    scene.add(pivot);

    const geometry = new THREE.IcosahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({
      color: userSettings.objectColor,
      metalness: userSettings.metalness,
      roughness: userSettings.roughness
    });
    material.flatShading = true;

    const mesh = new THREE.Mesh(geometry, material);

    // ここで角度を指定（Yも追加！）
    mesh.rotation.x = userSettings.rotation.x;
    mesh.rotation.y = userSettings.rotation.y;
    mesh.rotation.z = userSettings.rotation.z;

    pivot.add(mesh);

    function animate() {
      requestAnimationFrame(animate);
      pivot.rotation.y += 0.01;
      renderer.render(scene, camera);
    }

    animate();
  }

  containers.forEach(initIcosahedron);
});
