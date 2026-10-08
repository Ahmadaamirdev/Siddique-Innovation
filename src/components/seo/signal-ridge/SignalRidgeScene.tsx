import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';
import { SIGNAL_RIDGE_DATA } from './data';
import type { HoveredColumnInfo } from './types';
import { useSceneLifecycle } from './useSceneLifecycle';

interface SignalRidgeSceneProps {
  onProgress?: (progress: number) => void;
  onHoverColumn?: (info: HoveredColumnInfo | null) => void;
  onJuneProjected?: (coords: { x: number; y: number; visible: boolean } | null) => void;
  replayTrigger?: number;
}

// Ease-out back with overshoot constant 1.3 as specified
function easeOutBack(x: number, c1 = 1.3): number {
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

// Smoothstep easing for ribbon
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
}

// Generate circular soft glow particle texture in memory
function createGlowParticleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const center = size / 2;
    const gradient = ctx.createRadialGradient(center, center, 0, center, center, center);
    gradient.addColorStop(0, 'rgba(168, 239, 226, 1)');
    gradient.addColorStop(0.3, 'rgba(31, 214, 165, 0.7)');
    gradient.addColorStop(0.65, 'rgba(31, 214, 165, 0.2)');
    gradient.addColorStop(1, 'rgba(11, 20, 18, 0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Generate month sprite label on floor
function createMonthLabelSprite(text: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.font = '500 24px "JetBrains Mono", monospace';
    ctx.fillStyle = '#6b8480';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text.toUpperCase(), 64, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true, opacity: 0.85 });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(0.7, 0.35, 1);
  return sprite;
}

export const SignalRidgeScene: React.FC<SignalRidgeSceneProps> = ({
  onProgress,
  onHoverColumn,
  onJuneProjected,
  replayTrigger = 0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // References to keep across renders
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const columnsRef = useRef<THREE.Mesh[]>([]);
  const columnMaterialsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const targetHeightsRef = useRef<number[]>([]);
  const tubeGeomRef = useRef<THREE.TubeGeometry | null>(null);
  const tubeMeshRef = useRef<THREE.Mesh | null>(null);

  // Particles
  const particlesGeomRef = useRef<THREE.BufferGeometry | null>(null);
  const particlesMatRef = useRef<THREE.PointsMaterial | null>(null);
  const particlePositionsRef = useRef<Float32Array | null>(null);
  const particleDataRef = useRef<
    Array<{ t: number; speed: number; radialAngle: number; wobbleSpeed: number; wobblePhase: number }>
  >([]);

  // Finale elements
  const ring1MeshRef = useRef<THREE.Mesh | null>(null);
  const ring2MeshRef = useRef<THREE.Mesh | null>(null);

  // Interaction
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster());
  const mouseNdcRef = useRef<THREE.Vector2>(new THREE.Vector2(-999, -999));
  const mouseParallaxRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoveredColIndexRef = useRef<number>(-1);
  const introFinishedRef = useRef<boolean>(false);
  const june3DPosRef = useRef<THREE.Vector3>(new THREE.Vector3());

  // Disposal tracker
  const disposablesRef = useRef<Array<THREE.BufferGeometry | THREE.Material | THREE.Texture>>([]);

  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);

  // Reset function called on replay
  const handleResetTimeline = useCallback(() => {
    introFinishedRef.current = false;
    hoveredColIndexRef.current = -1;
    if (onHoverColumn) onHoverColumn(null);
  }, [onHoverColumn]);

  useEffect(() => {
    handleResetTimeline();
  }, [replayTrigger, handleResetTimeline]);

  // Main Scene Setup
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. Scene & Fog (transparent — blends with page bg #04070A)
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = null; // transparent canvas
    scene.fog = new THREE.Fog(0x04070a, 14, 42);

    // 2. Camera: fov 38, adjusted for 12-bar span
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 80);
    cameraRef.current = camera;
    camera.position.set(8.5, 5.9, 10.2);
    camera.lookAt(0.2, 2.55, 0);

    // 3. Renderer (alpha:true so canvas composites over page bg)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      stencil: false,
    });
    rendererRef.current = renderer;
    renderer.setClearColor(0x000000, 0); // fully transparent clear
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(width, height, false);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0x0e2f28, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x5fd9c3, 2.2);
    dirLight.position.set(6, 12, 8);
    scene.add(dirLight);

    const tealPointLight = new THREE.PointLight(0x1fd6a5, 2.8, 18);
    tealPointLight.position.set(2, 5, 4);
    scene.add(tealPointLight);

    // 5. Floor: GridHelper in dark teal (Fog near 14, far 42)
    const grid = new THREE.GridHelper(100, 100, 0x164e43, 0x0f362e);
    grid.position.y = 0;
    scene.add(grid);
    disposablesRef.current.push(grid.geometry);
    if (Array.isArray(grid.material)) {
      grid.material.forEach((m) => disposablesRef.current.push(m));
    } else {
      disposablesRef.current.push(grid.material);
    }

    // 6. Columns: hexagonal prisms
    // Increased height multiplier for dramatic length: clicks * 0.38
    const numMonths = SIGNAL_RIDGE_DATA.months.length;
    const centerOffset = (numMonths - 1) / 2;
    const colSpacing = 1.05;
    const heights = SIGNAL_RIDGE_DATA.months.map((m) => m.clicks * 0.38);
    targetHeightsRef.current = heights;

    const columns: THREE.Mesh[] = [];
    const colMaterials: THREE.MeshStandardMaterial[] = [];
    const curveControlPoints: THREE.Vector3[] = [];

    const baseHexGeom = new THREE.CylinderGeometry(0.38, 0.38, 1, 6, 1, false);
    baseHexGeom.translate(0, 0.5, 0); // Scale up from the base
    disposablesRef.current.push(baseHexGeom);

    const edgesGeom = new THREE.EdgesGeometry(baseHexGeom);
    disposablesRef.current.push(edgesGeom);

    const padGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.04, 6);
    padGeom.translate(0, 0.02, 0);
    disposablesRef.current.push(padGeom);

    const padMat = new THREE.MeshBasicMaterial({ color: 0x06110f });
    disposablesRef.current.push(padMat);

    SIGNAL_RIDGE_DATA.months.forEach((item, i) => {
      const x = (i - centerOffset) * colSpacing;
      const targetH = heights[i];

      // Hex Pad on the floor
      const pad = new THREE.Mesh(padGeom, padMat);
      pad.position.set(x, 0, 0);
      scene.add(pad);

      // Column Mesh
      const colMat = new THREE.MeshStandardMaterial({
        color: 0x0e2e28,
        emissive: 0x1fd6a5,
        emissiveIntensity: 0.16,
        roughness: 0.32,
        metalness: 0.18,
        transparent: true,
        opacity: 0.93,
      });
      disposablesRef.current.push(colMat);
      colMaterials.push(colMat);

      const colMesh = new THREE.Mesh(baseHexGeom, colMat);
      colMesh.position.set(x, 0, 0);
      colMesh.scale.set(1, 0.001, 1);
      colMesh.userData = { index: i, month: item.month, clicks: item.clicks, impressions: item.impressions };

      // Edges teal outline as child so it scales with column
      const edgeMat = new THREE.LineBasicMaterial({
        color: 0x1fd6a5,
        transparent: true,
        opacity: 0.75,
      });
      disposablesRef.current.push(edgeMat);
      const edgeLines = new THREE.LineSegments(edgesGeom, edgeMat);
      colMesh.add(edgeLines);

      scene.add(colMesh);
      columns.push(colMesh);

      // Month sprite label in front of column on the floor
      const labelSprite = createMonthLabelSprite(item.month);
      labelSprite.position.set(x, 0.06, 0.95);
      scene.add(labelSprite);
      disposablesRef.current.push(labelSprite.material);
      if (labelSprite.material.map) disposablesRef.current.push(labelSprite.material.map);

      // Ribbon control point (column top offset up by 0.3)
      curveControlPoints.push(new THREE.Vector3(x, targetH + 0.3, 0));
    });

    columnsRef.current = columns;
    columnMaterialsRef.current = colMaterials;

    // Store last column 3D point for finale
    const lastIdx = numMonths - 1;
    const lastX = (lastIdx - centerOffset) * colSpacing;
    june3DPosRef.current.set(lastX, heights[lastIdx], 0);

    // 7. Ribbon: CatmullRomCurve3 through column tops (offset up by 0.3)
    const curve = new THREE.CatmullRomCurve3(curveControlPoints);
    const tubeGeom = new THREE.TubeGeometry(curve, 96, 0.045, 8, false);
    tubeGeom.setDrawRange(0, 0);
    disposablesRef.current.push(tubeGeom);
    tubeGeomRef.current = tubeGeom;

    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x3dbfaa,
      emissive: 0x000000,
      emissiveIntensity: 0,
      roughness: 0.55,
      metalness: 0.1,
    });
    disposablesRef.current.push(tubeMat);

    const tubeMesh = new THREE.Mesh(tubeGeom, tubeMat);
    scene.add(tubeMesh);
    tubeMeshRef.current = tubeMesh;

    // 8. Impressions Funnel: Points system (460 particles desktop / 200 mobile)
    const particleCount = isMobile ? 200 : 460;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleData: Array<{ t: number; speed: number; radialAngle: number; wobbleSpeed: number; wobblePhase: number }> = [];

    // Pre-sample curve points (201 samples)
    const curveSamples = curve.getPoints(200);

    for (let i = 0; i < particleCount; i++) {
      const t = Math.random();
      const speed = 0.16 + Math.random() * 0.14;
      const radialAngle = Math.random() * Math.PI * 2;
      const wobbleSpeed = 2.0 + Math.random() * 2.5;
      const wobblePhase = Math.random() * Math.PI * 2;

      particleData.push({ t, speed, radialAngle, wobbleSpeed, wobblePhase });

      // Initial positions
      const sampleIdx = Math.min(Math.floor(t * 200), 200);
      const cp = curveSamples[sampleIdx];
      const spread = 0.85 * Math.pow(1 - t, 1.6) + 0.05;
      particlePositions[i * 3] = cp.x;
      particlePositions[i * 3 + 1] = cp.y + Math.sin(radialAngle) * spread;
      particlePositions[i * 3 + 2] = cp.z + Math.cos(radialAngle) * spread;
    }

    const particlesGeom = new THREE.BufferGeometry();
    particlesGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    disposablesRef.current.push(particlesGeom);
    particlesGeomRef.current = particlesGeom;
    particlePositionsRef.current = particlePositions;
    particleDataRef.current = particleData;

    const particleTexture = createGlowParticleTexture();
    disposablesRef.current.push(particleTexture);

    const particlesMat = new THREE.PointsMaterial({
      map: particleTexture,
      size: isMobile ? 0.32 : 0.38,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    disposablesRef.current.push(particlesMat);
    particlesMatRef.current = particlesMat;

    const points = new THREE.Points(particlesGeom, particlesMat);
    points.frustumCulled = false;
    scene.add(points);

    // 9. Finale: Expanding Floor Rings under the final column (no vertical beam)
    const ringGeom = new THREE.RingGeometry(0.32, 0.40, 32);
    ringGeom.rotateX(-Math.PI / 2);
    disposablesRef.current.push(ringGeom);

    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x1fd6a5,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    disposablesRef.current.push(ring1Mat);

    const ring1Mesh = new THREE.Mesh(ringGeom, ring1Mat);
    ring1Mesh.position.set(lastX, 0.02, 0);
    scene.add(ring1Mesh);
    ring1MeshRef.current = ring1Mesh;

    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x5fd9c3,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
    });
    disposablesRef.current.push(ring2Mat);

    const ring2Mesh = new THREE.Mesh(ringGeom, ring2Mat);
    ring2Mesh.position.set(lastX, 0.02, 0);
    scene.add(ring2Mesh);
    ring2MeshRef.current = ring2Mesh;

    // Cleanup when component unmounts
    return () => {
      disposablesRef.current.forEach((res) => {
        if ('dispose' in res) res.dispose();
      });
      disposablesRef.current = [];
      renderer.dispose();
      sceneRef.current = null;
      rendererRef.current = null;
      cameraRef.current = null;
    };
  }, [isMobile]);

  // Pointer interactions (raycasting & parallax)
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // NDC coordinates for Raycaster
    mouseNdcRef.current.x = (x / rect.width) * 2 - 1;
    mouseNdcRef.current.y = -(y / rect.height) * 2 + 1;

    // Mouse parallax normalized [-1, 1]
    mouseParallaxRef.current.x = ((x / rect.width) - 0.5) * 2;
    mouseParallaxRef.current.y = ((y / rect.height) - 0.5) * 2;

    // Raycast if intro is finished
    if (introFinishedRef.current && cameraRef.current) {
      raycasterRef.current.setFromCamera(mouseNdcRef.current, cameraRef.current);
      const intersects = raycasterRef.current.intersectObjects(columnsRef.current, false);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const colIdx = hit.userData.index;
        if (hoveredColIndexRef.current !== colIdx) {
          hoveredColIndexRef.current = colIdx;
          if (onHoverColumn) {
            onHoverColumn({
              index: colIdx,
              month: hit.userData.month,
              clicks: hit.userData.clicks,
              impressions: hit.userData.impressions,
              screenX: x,
              screenY: y,
            });
          }
        } else if (onHoverColumn) {
          // Update screen coordinates for tooltip following cursor
          onHoverColumn({
            index: colIdx,
            month: hit.userData.month,
            clicks: hit.userData.clicks,
            impressions: hit.userData.impressions,
            screenX: x,
            screenY: y,
          });
        }
      } else {
        if (hoveredColIndexRef.current !== -1) {
          hoveredColIndexRef.current = -1;
          if (onHoverColumn) onHoverColumn(null);
        }
      }
    }
  };

  const handlePointerLeave = () => {
    mouseNdcRef.current.set(-999, -999);
    mouseParallaxRef.current = { x: 0, y: 0 };
    if (hoveredColIndexRef.current !== -1) {
      hoveredColIndexRef.current = -1;
      if (onHoverColumn) onHoverColumn(null);
    }
  };

  // Per-frame Tick Animation Callback
  const handleTick = useCallback(
    (time: number, dt: number) => {
      const camera = cameraRef.current;
      const renderer = rendererRef.current;
      const scene = sceneRef.current;
      if (!camera || !renderer || !scene) return;

      // Report timeline progress to parent
      const overallProgress = Math.min(Math.max((time - 0.15) / 2.6, 0), 1);
      if (onProgress) onProgress(overallProgress);

      if (time >= 2.8) {
        introFinishedRef.current = true;
      }

      // 1. Camera Dolly in and Parallax
      // Base radius 15.6, dolly in from ~16% farther back over 2.6s
      const dollyT = Math.min(Math.max(time / 2.6, 0), 1);
      const dollyEase = 1 - Math.pow(1 - dollyT, 3); // ease-out cubic
      const orbitRadius = 15.6 * (1 + 0.16 * (1 - dollyEase));

      // Base angle 0.88 rad with slow sine drift, plus parallax (angle +/- 0.22, height +/- 0.85)
      const baseAngle = 0.88 + Math.sin(time * 0.3) * 0.035;
      const angle = baseAngle + mouseParallaxRef.current.x * 0.22;
      const camY = 6.0 - mouseParallaxRef.current.y * 0.85;
      const camX = orbitRadius * Math.cos(angle);
      const camZ = orbitRadius * Math.sin(angle);

      camera.position.set(camX, camY, camZ);
      camera.lookAt(0.2, 2.55, 0);

      // 2. Columns staggered growth: snappy 0.10 + i * 0.16 over 0.75s
      columnsRef.current.forEach((col, i) => {
        const start = 0.10 + i * 0.16;
        const p = Math.min(Math.max((time - start) / 0.75, 0), 1);
        const growth = p === 0 ? 0.001 : Math.max(0.001, easeOutBack(p, 1.25));
        const targetH = targetHeightsRef.current[i];

        // Hover scale and emissive lerp
        const isHovered = hoveredColIndexRef.current === i;
        const targetScaleXZ = isHovered ? 1.09 : 1.0;
        const targetEmissive = isHovered ? 0.75 : 0.16;

        col.scale.x += (targetScaleXZ - col.scale.x) * 0.18;
        col.scale.z += (targetScaleXZ - col.scale.z) * 0.18;
        col.scale.y = growth * targetH;

        const mat = columnMaterialsRef.current[i];
        if (mat) {
          mat.emissiveIntensity += (targetEmissive - mat.emissiveIntensity) * 0.18;
        }
      });

      // 3. Ribbon Tube draw-on: 0.8s to 2.7s with smoothstep easing
      if (tubeGeomRef.current) {
        const ribbonProg = smoothstep(0.8, 2.7, time);
        const indexCount = tubeGeomRef.current.index
          ? tubeGeomRef.current.index.count
          : tubeGeomRef.current.attributes.position.count;
        tubeGeomRef.current.setDrawRange(0, Math.floor(indexCount * ribbonProg));
      }

      // 4. Impressions Funnel Particles: fade in from 0.5s
      if (particlesMatRef.current && particlePositionsRef.current && particlesGeomRef.current) {
        const particleFade = Math.min(Math.max((time - 0.5) / 0.8, 0), 1);
        particlesMatRef.current.opacity = particleFade * 0.88;

        const positions = particlePositionsRef.current;
        const data = particleDataRef.current;
        const particleCount = data.length;

        // Sample along curve with per-particle speed looping 0 to 1
        const numMonths = SIGNAL_RIDGE_DATA.months.length;
        const centerOffset = (numMonths - 1) / 2;
        const colSpacing = 1.05;
        const xStart = (0 - centerOffset) * colSpacing;
        const xEnd = (numMonths - 1 - centerOffset) * colSpacing;
        const totalSpanX = xEnd - xStart;

        for (let i = 0; i < particleCount; i++) {
          const p = data[i];
          p.t = (p.t + dt * p.speed) % 1.0;
          const t = p.t;

          // Spread narrows toward the end: spread = 0.82 * (1 - t)^1.6 + 0.05
          const spread = 0.82 * Math.pow(1 - t, 1.6) + 0.05;
          const wobble = Math.sin(time * p.wobbleSpeed + p.wobblePhase) * 0.06;
          const r = spread + wobble;

          // Dynamic curve interpolation along X and Y
          const fracIdx = t * (numMonths - 1);
          const idx0 = Math.min(Math.floor(fracIdx), numMonths - 2);
          const idx1 = idx0 + 1;
          const subT = fracIdx - idx0;

          const h0 = targetHeightsRef.current[idx0] + 0.3;
          const h1 = targetHeightsRef.current[idx1] + 0.3;
          const currentCurveY = h0 + (h1 - h0) * subT;
          const currentCurveX = xStart + totalSpanX * t;

          positions[i * 3] = currentCurveX;
          positions[i * 3 + 1] = currentCurveY + Math.sin(p.radialAngle) * r;
          positions[i * 3 + 2] = Math.cos(p.radialAngle) * r;
        }

        particlesGeomRef.current.attributes.position.needsUpdate = true;
      }

      // 5. Finale: Floor Rings gate in at 2.5s (no vertical beam)
      const finaleGate = Math.min(Math.max((time - 2.5) / 0.5, 0), 1);

      if (ring1MeshRef.current && ring2MeshRef.current) {
        const pulse1 = (time * 1.2) % 1.0;
        const pulse2 = (time * 1.2 + 0.5) % 1.0;

        const s1 = 0.6 + pulse1 * 1.8;
        const s2 = 0.6 + pulse2 * 1.8;

        ring1MeshRef.current.scale.set(s1, s1, s1);
        ring2MeshRef.current.scale.set(s2, s2, s2);

        const r1Mat = ring1MeshRef.current.material as THREE.MeshBasicMaterial;
        const r2Mat = ring2MeshRef.current.material as THREE.MeshBasicMaterial;

        r1Mat.opacity = finaleGate * Math.max(0, 1 - pulse1) * 0.7;
        r2Mat.opacity = finaleGate * Math.max(0, 1 - pulse2) * 0.7;
      }

      // 6. Project June 3D point to screen space for HTML floating badge
      if (onJuneProjected && containerRef.current) {
        if (finaleGate > 0.05) {
          const juneTop3D = june3DPosRef.current.clone();
          juneTop3D.y += 0.35;
          juneTop3D.project(camera);

          const w = containerRef.current.clientWidth;
          const h = containerRef.current.clientHeight;

          const screenX = (juneTop3D.x * 0.5 + 0.5) * w;
          const screenY = (-juneTop3D.y * 0.5 + 0.5) * h;

          onJuneProjected({
            x: screenX,
            y: screenY,
            visible: juneTop3D.z < 1,
          });
        } else {
          onJuneProjected(null);
        }
      }

      renderer.render(scene, camera);
    },
    [onProgress, onJuneProjected]
  );

  // Resize handler
  const handleResize = useCallback((w: number, h: number) => {
    if (cameraRef.current && rendererRef.current) {
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h, false);
    }
  }, []);

  // Hook into lifecycle (IntersectionObserver, visibilitychange, rAF, dt cap)
  const { resetTimer } = useSceneLifecycle({
    containerRef,
    onTick: handleTick,
    onResize: handleResize,
    enabled: true,
  });

  useEffect(() => {
    resetTimer();
  }, [replayTrigger, resetTimer]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[330px] sm:h-[365px] lg:h-[390px] xl:h-[405px] select-none touch-pan-y overflow-hidden cursor-default"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Organic search performance: clicks rising from 3.1k to 12.4k over 6 months, impressions reaching 148k"
        className="w-full h-full block cursor-default"
        style={{ background: 'transparent' }}
      />
    </div>
  );
};

export default SignalRidgeScene;
