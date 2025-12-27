// Babylon.js powered futuristic background
// This script initializes a Babylon scene and attaches it to
// the #renderCanvas element.  It mirrors the functionality from the
// original inline script in the provided HTML, but is separated into
// its own file for clarity and modularity.

// Log visitor data to server
async function logVisitor() {
  try {
    const response = await fetch('/api/log-visitor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    if (data.success) {
      console.log('✅ Visitor logged:', data.data);
    }
  } catch (error) {
    console.error('Error logging visitor:', error);
  }
}

// Wait for the DOM to be ready before executing Babylon code
window.addEventListener('DOMContentLoaded', () => {
  // Log visitor when page loads
  logVisitor();
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true, {
    preserveDrawingBuffer: false,
    stencil: true,
    disableWebGL2Support: false
  });

  const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isMobile = window.matchMedia &&
    window.matchMedia("(max-width: 768px)").matches;

  const createScene = () => {
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    const camera = new BABYLON.ArcRotateCamera(
      "cam",
      Math.PI / 2,
      Math.PI / 2.35,
      isMobile ? 34 : 30,
      new BABYLON.Vector3(0, 0, 0),
      scene
    );

    camera.attachControl(canvas, false);
    camera.inputs.removeByType("ArcRotateCameraPointersInput");
    camera.lowerRadiusLimit = camera.radius;
    camera.upperRadiusLimit = camera.radius;

    const hemi = new BABYLON.HemisphericLight(
      "hemi",
      new BABYLON.Vector3(0, 1, 0),
      scene
    );
    hemi.intensity = 0.6;

    const point = new BABYLON.PointLight(
      "point",
      new BABYLON.Vector3(0, 8, 0),
      scene
    );
    point.intensity = 1.8;

    const glow = new BABYLON.GlowLayer("glow", scene, {
      blurKernelSize: 64
    });
    glow.intensity = isMobile ? 0.55 : 0.85;

    const ground = BABYLON.MeshBuilder.CreateGround(
      "ground",
      { width: 70, height: 70 },
      scene
    );
    ground.position.y = -7.5;

    const gridMat = new BABYLON.GridMaterial("gridMat", scene);
    gridMat.majorUnitFrequency = 6;
    gridMat.minorUnitVisibility = 0.4;
    gridMat.gridRatio = 2.2;
    gridMat.opacity = 0.28;
    gridMat.mainColor = new BABYLON.Color3(0.0, 0.9, 1.0);
    gridMat.lineColor = new BABYLON.Color3(0.0, 0.45, 0.6);
    ground.material = gridMat;

    const core = BABYLON.MeshBuilder.CreateSphere(
      "core",
      { diameter: 4.2, segments: 48 },
      scene
    );

    const coreMat = new BABYLON.StandardMaterial("coreMat", scene);
    coreMat.emissiveColor = new BABYLON.Color3(0.0, 0.85, 1.0);
    coreMat.alpha = 0.92;
    core.material = coreMat;

    const ring1 = BABYLON.MeshBuilder.CreateTorus(
      "ring1",
      { diameter: 7.2, thickness: 0.1, tessellation: 96 },
      scene
    );
    ring1.rotation.x = Math.PI / 2;
    ring1.position.y = 0.3;

    const ring2 = BABYLON.MeshBuilder.CreateTorus(
      "ring2",
      { diameter: 9.4, thickness: 0.08, tessellation: 96 },
      scene
    );
    ring2.rotation.x = Math.PI / 2.4;
    ring2.rotation.y = Math.PI / 5;

    const ringMat = new BABYLON.StandardMaterial("ringMat", scene);
    ringMat.emissiveColor = new BABYLON.Color3(0.0, 0.65, 0.85);
    ringMat.alpha = 0.75;

    ring1.material = ringMat;
    ring2.material = ringMat;

    const particlesCount = isMobile ? 900 : 1700;
    const ps = new BABYLON.ParticleSystem("ps", particlesCount, scene);
    ps.particleTexture = new BABYLON.Texture(
      "https://playground.babylonjs.com/textures/flare.png",
      scene
    );

    ps.emitter = new BABYLON.Vector3(0, 0, 0);
    ps.minEmitBox = new BABYLON.Vector3(-12, -6, -12);
    ps.maxEmitBox = new BABYLON.Vector3(12, 6, 12);

    ps.color1 = new BABYLON.Color4(0, 0.85, 1, 1);
    ps.color2 = new BABYLON.Color4(0, 0.55, 1, 1);

    ps.minSize = isMobile ? 0.08 : 0.1;
    ps.maxSize = isMobile ? 0.18 : 0.28;

    ps.minLifeTime = 2.3;
    ps.maxLifeTime = 4.3;

    ps.emitRate = isMobile ? 190 : 320;
    ps.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

    ps.gravity = new BABYLON.Vector3(0, 0, 0);
    ps.direction1 = new BABYLON.Vector3(-0.6, -0.2, -0.6);
    ps.direction2 = new BABYLON.Vector3(0.6, 0.5, 0.6);

    ps.minEmitPower = 0.4;
    ps.maxEmitPower = 1.1;
    ps.updateSpeed = 0.01;

    if (!prefersReducedMotion) ps.start();

    let t = 0;
    scene.registerBeforeRender(() => {
      if (prefersReducedMotion) return;

      t += scene.getEngine().getDeltaTime() * 0.001;

      core.position.y = Math.sin(t * 1.2) * 0.35;
      core.rotation.y += 0.002;

      ring1.rotation.z += 0.0025;
      ring2.rotation.z -= 0.0018;

      gridMat.gridOffset += 0.003;
    });

    return scene;
  };

  const scene = createScene();

  engine.runRenderLoop(() => {
    scene.render();
  });

  window.addEventListener("resize", () => {
    engine.resize();
  });
});

// Login button handler
document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      // You can customize this behavior to open a modal, redirect to a login page, etc.
      console.log('Login button clicked');
      // Example: redirect to login page
      // window.location.href = '/login';
      alert('Login functionality coming soon!');
    });
  }

  // Hamburger menu toggle
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      hamburgerBtn.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a, summary');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
});