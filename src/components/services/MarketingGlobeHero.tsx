import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { feature } from 'topojson-client';

interface MarketingGlobeHeroProps {
  heading?: React.ReactNode;
  description?: string;
  ctaText?: string;
  onScrollToContact?: () => void;
  onScrollToProjects?: () => void;
}

// 24 Globally Distributed Hubs [latitude, longitude] evenly spanning all continents
const CITIES: [number, number][] = [
  [40.7, -74],    // New York (North America East)
  [37.8, -122.4], // San Francisco (North America West)
  [49.2, -123.1], // Vancouver (North America North)
  [19.4, -99.1],  // Mexico City (Central America)
  [-23.5, -46.6], // Sao Paulo (South America East)
  [-34.6, -58.4], // Buenos Aires (South America South)
  [-12.0, -77.0], // Lima (South America West)
  [51.5, -0.1],   // London (Europe West)
  [50.1, 8.6],    // Frankfurt (Europe Central)
  [41.0, 28.9],   // Istanbul (Eurasia)
  [25.2, 55.3],   // Dubai (Middle East)
  [28.6, 77.2],   // Delhi (South Asia)
  [19.0, 72.8],   // Mumbai (India West)
  [1.3, 103.8],   // Singapore (SE Asia)
  [35.7, 139.7],  // Tokyo (Japan)
  [37.5, 127.0],  // Seoul (Korea)
  [-33.9, 151.2], // Sydney (Australia East)
  [-31.9, 115.8], // Perth (Australia West)
  [-36.8, 174.7], // Auckland (New Zealand)
  [30.0, 31.2],   // Cairo (North Africa)
  [6.5, 3.4],     // Lagos (West Africa)
  [-1.2, 36.8],   // Nairobi (East Africa)
  [-33.9, 18.4],  // Cape Town (South Africa)
  [-26.2, 28.0],  // Johannesburg (Southern Africa)
];

// Convert latitude & longitude to 3D sphere coordinate
function latLongToVector3(lat: number, lon: number): THREE.Vector3 {
  const phi = (lat * Math.PI) / 180;
  const theta = ((lon + 180) / 360) * Math.PI * 2;
  return new THREE.Vector3(
    -Math.cos(theta) * Math.cos(phi),
    Math.sin(phi),
    Math.sin(theta) * Math.cos(phi)
  );
}

// Generate genuine world map canvas with authentic country boundaries and smaller portions
function drawGenuineWorldMap(topologyData: any, width = 2048, height = 1024): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);

  try {
    const geo = feature(topologyData, topologyData.objects.countries || topologyData.objects.land) as any;

    const project = (lon: number, lat: number): [number, number] => {
      const x = ((lon + 180) / 360) * width;
      const y = ((90 - lat) / 180) * height;
      return [x, y];
    };

    const drawRing = (ring: number[][]) => {
      if (!ring || ring.length < 3) return;
      const [startX, startY] = project(ring[0][0], ring[0][1]);
      let prevLon = ring[0][0];
      ctx.moveTo(startX, startY);
      for (let i = 1; i < ring.length; i++) {
        const [lon, lat] = ring[i];
        const [px, py] = project(lon, lat);
        if (Math.abs(lon - prevLon) > 180) {
          ctx.moveTo(px, py);
        } else {
          ctx.lineTo(px, py);
        }
        prevLon = lon;
      }
    };

    // 1. Fill genuine landmasses
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    for (const feat of geo.features || [geo]) {
      const geom = feat.geometry || feat;
      if (!geom) continue;
      if (geom.type === 'Polygon') {
        for (const ring of geom.coordinates) {
          drawRing(ring);
        }
      } else if (geom.type === 'MultiPolygon') {
        for (const poly of geom.coordinates) {
          for (const ring of poly) {
            drawRing(ring);
          }
        }
      }
    }
    ctx.fill();

    // 2. Stroke genuine borders to break continents into smaller country portions
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    for (const feat of geo.features || [geo]) {
      const geom = feat.geometry || feat;
      if (!geom) continue;
      if (geom.type === 'Polygon') {
        for (const ring of geom.coordinates) {
          drawRing(ring);
        }
      } else if (geom.type === 'MultiPolygon') {
        for (const poly of geom.coordinates) {
          for (const ring of poly) {
            drawRing(ring);
          }
        }
      }
    }
    ctx.stroke();
  } catch (e) {
    console.error('Failed to draw genuine world map:', e);
  }

  return canvas;
}

// Fallback procedural land mask if async fetch has not completed yet
function createProceduralLandMask(): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const imgData = ctx.createImageData(512, 256);
    for (let j = 0; j < 256; j++) {
      for (let i = 0; i < 512; i++) {
        const lo = (i / 512 - 0.5) * 6.28318;
        const la = (0.5 - j / 256) * 3.14159;
        const v =
          Math.sin(lo * 2 + 1) * Math.cos(la * 3) +
          Math.sin(lo * 5) * Math.sin(la * 2) * 0.6;
        const idx = (j * 512 + i) * 4;
        const val = v > 0.15 ? 255 : 0;
        imgData.data[idx] = val;
        imgData.data[idx + 1] = val;
        imgData.data[idx + 2] = val;
        imgData.data[idx + 3] = 255;
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }
  return canvas;
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - Math.min(x, 1), 3);
}

export const MarketingGlobeHero: React.FC<MarketingGlobeHeroProps> = ({
  heading,
  description,
  ctaText = 'Get a Free Quote',
  onScrollToContact,
  onScrollToProjects,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let animId: number;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 520;

    // 1. Renderer & Scene (crisp, zero-overexposure, high contrast)
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(width, height, false);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 50);
    camera.position.set(0, 0, 4);

    const brandTeal = new THREE.Color('#00E6D2');
    const uniforms = {
      uTime: { value: 0 },
      uColor: { value: brandTeal },
      uLand: { value: new THREE.CanvasTexture(createProceduralLandMask()) },
      uGrow: { value: 0 },
    };

    // Load authentic world countries map with genuine boundaries and smaller regional portions
    fetch('/countries-110m.json')
      .then((res) => res.json())
      .then((data) => {
        const genuineCanvas = drawGenuineWorldMap(data, 2048, 1024);
        const genuineTex = new THREE.CanvasTexture(genuineCanvas);
        genuineTex.anisotropy = 4;
        uniforms.uLand.value.dispose();
        uniforms.uLand.value = genuineTex;
      })
      .catch((err) => {
        console.warn('Fallback to procedural map:', err);
      });

    // 2. Hierarchical groups: tilt (fixed angle + mouse parallax) -> spin (constant rotation)
    const tiltGroup = new THREE.Group();
    const spinGroup = new THREE.Group();
    tiltGroup.add(spinGroup);
    scene.add(tiltGroup);

    const GLOBE_RADIUS = 2.35;
    tiltGroup.scale.setScalar(GLOBE_RADIUS);
    tiltGroup.position.set(0, -4.4, 0);
    tiltGroup.rotation.x = 0.58;

    // 3. Globe Mesh with high-contrast dot matrix shader (genuine boundaries & smaller portions)
    const vertexShader = `
      varying vec2 vUv;
      varying vec3 vN;
      void main(){
        vUv = uv;
        vN = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const globeFragmentShader = `
      uniform sampler2D uLand;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vN;
      void main(){
        // High density grid for authentic, articulate country portions (680 x 340)
        vec2 g = vUv * vec2(680.0, 340.0);
        vec2 cell = floor(g) + 0.5;
        float l = texture2D(uLand, cell / vec2(680.0, 340.0)).r;
        float dist = length(fract(g) - 0.5);
        // Smaller, refined dots revealing genuine coastlines and country borders
        float d = (1.0 - smoothstep(0.18, 0.40, dist)) * l;
        float la = abs(fract(vUv.y * 18.0) - 0.5);
        float lo = abs(fract(vUv.x * 36.0) - 0.5);
        float gr = ((1.0 - smoothstep(0.0, 0.012, la)) + (1.0 - smoothstep(0.0, 0.006, lo))) * 0.05;
        
        // Pole fade prevents dots from condensing into a solid wall at the horizon
        float poleFade = smoothstep(0.02, 0.16, vUv.y) * smoothstep(0.98, 0.84, vUv.y);
        d *= poleFade;

        // Visible grazing rim glow on globe edge
        float fr = pow(1.0 - max(dot(normalize(vN), vec3(0.0, 0.0, 1.0)), 0.0), 3.2);
        vec3 c = uColor * (d * 0.92 + gr * 0.45) + uColor * (fr * 0.55);
        gl_FragColor = vec4(c + vec3(0.004, 0.007, 0.006), 1.0);
      }
    `;

    const globeGeom = new THREE.SphereGeometry(1, 96, 64);
    const globeMat = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader: globeFragmentShader,
    });
    const globe = new THREE.Mesh(globeGeom, globeMat);
    spinGroup.add(globe);

    // 3b. Atmospheric Rim Glow (luminous, vibrant cyan aura around the horizon)
    const atmGeom = new THREE.SphereGeometry(1.07, 64, 48);
    const atmMat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexShader,
      fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vN;
        void main(){
          float d = max(0.0, 0.64 - dot(normalize(vN), vec3(0.0, 0.0, 1.0)));
          float i = pow(d, 2.3) * 1.25;
          gl_FragColor = vec4(uColor * i, i);
        }
      `,
    });
    const atm = new THREE.Mesh(atmGeom, atmMat);
    tiltGroup.add(atm);

    // 4. Interconnecting Curved Rays evenly distributed across continents (No clustering/concentration)
    const arcPositions: number[] = [];
    const arcTimes: number[] = [];
    const arcOffsets: number[] = [];

    // Filter non-concentrated intercontinental routes with max 2 connections per hub
    const usedPairs = new Set<string>();
    const cityConnections = new Array(CITIES.length).fill(0);
    const validPairs: [number, number][] = [];

    let seed = 42;
    const pseudoRandom = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

    for (let attempts = 0; attempts < 1000 && validPairs.length < 22; attempts++) {
      const a = Math.floor(pseudoRandom() * CITIES.length);
      const b = Math.floor(pseudoRandom() * CITIES.length);
      if (a === b) continue;

      const pA = latLongToVector3(...CITIES[a]);
      const pB = latLongToVector3(...CITIES[b]);
      const angle = pA.angleTo(pB);

      // Require broad intercontinental span (avoid tight local bunches and globe-clipping chords)
      if (angle < 0.75 || angle > 2.25) continue;

      const pairKey = a < b ? `${a}-${b}` : `${b}-${a}`;
      if (usedPairs.has(pairKey)) continue;

      // Prevent concentration: strictly cap connections per city to 2
      if (cityConnections[a] >= 2 || cityConnections[b] >= 2) continue;

      usedPairs.add(pairKey);
      cityConnections[a]++;
      cityConnections[b]++;
      validPairs.push([a, b]);
    }

    // Build smooth 3D curved arc geometry for valid distributed pairs
    validPairs.forEach(([aIdx, bIdx], k) => {
      const pA = latLongToVector3(...CITIES[aIdx]);
      const pB = latLongToVector3(...CITIES[bIdx]);
      const angle = pA.angleTo(pB);

      // Elegant arc altitude arching smoothly above globe
      const altitude = 0.05 + (0.11 * angle) / Math.PI;
      // Stagger pulses evenly in time to avoid pulses bunching up
      const offset = (k / validPairs.length) + (pseudoRandom() * 0.08);
      const segments = 48;

      let prevPoint: THREE.Vector3 | null = null;
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const currentPoint = pA
          .clone()
          .lerp(pB, t)
          .normalize()
          .multiplyScalar(1 + Math.sin(Math.PI * t) * altitude);

        if (prevPoint) {
          arcPositions.push(
            prevPoint.x,
            prevPoint.y,
            prevPoint.z,
            currentPoint.x,
            currentPoint.y,
            currentPoint.z
          );
          arcTimes.push((i - 1) / segments, t);
          arcOffsets.push(offset, offset);
        }
        prevPoint = currentPoint;
      }
    });

    const arcGeom = new THREE.BufferGeometry();
    arcGeom.setAttribute('position', new THREE.Float32BufferAttribute(arcPositions, 3));
    arcGeom.setAttribute('aT', new THREE.Float32BufferAttribute(arcTimes, 1));
    arcGeom.setAttribute('aO', new THREE.Float32BufferAttribute(arcOffsets, 1));

    // Rays Shader with crisp luminous paths and distinct laser pulses
    const arcMat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aT;
        attribute float aO;
        varying float vT;
        varying float vO;
        void main(){
          vT = aT;
          vO = aO;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime, uGrow;
        varying float vT;
        varying float vO;
        void main(){
          float p = fract(uTime * 0.16 + vO);
          float d = p - vT;
          if(d < 0.0) d += 1.0;
          float pulse = exp(-d * 8.0) * step(d, 0.42);
          float e = smoothstep(0.0, 0.05, vT) * smoothstep(1.0, 0.95, vT);
          float g = step(vT, uGrow * 1.35 - vO * 0.35);
          float alpha = (0.24 + pulse * 2.6) * e * g;
          vec3 rayColor = mix(uColor * 1.3, vec3(1.0, 1.0, 1.0), pulse * 0.8);
          gl_FragColor = vec4(rayColor * alpha, alpha);
        }
      `,
    });
    const arcs = new THREE.LineSegments(arcGeom, arcMat);
    spinGroup.add(arcs);

    // 5. Vertical Beacon Rays shooting from well-spaced landmark hubs
    const beaconPositions: number[] = [];
    // Only place beacons on well-spaced hubs so they don't crowd each other
    const beaconHubs: THREE.Vector3[] = [];
    CITIES.forEach((c) => {
      const v = latLongToVector3(...c);
      const tooClose = beaconHubs.some((b) => b.angleTo(v) < 0.7);
      if (!tooClose) {
        beaconHubs.push(v);
        const vBase = v.clone().multiplyScalar(1.002);
        const vTop = v.clone().multiplyScalar(1.085);
        beaconPositions.push(vBase.x, vBase.y, vBase.z, vTop.x, vTop.y, vTop.z);
      }
    });

    const beaconGeom = new THREE.BufferGeometry();
    beaconGeom.setAttribute('position', new THREE.Float32BufferAttribute(beaconPositions, 3));
    const beaconMat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        void main(){
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uTime;
        void main(){
          float p = 0.5 + 0.5 * sin(uTime * 2.8);
          vec3 bCol = mix(uColor * 1.6, vec3(1.0), 0.3);
          gl_FragColor = vec4(bCol, 0.5 + p * 0.35);
        }
      `,
    });
    const beaconRays = new THREE.LineSegments(beaconGeom, beaconMat);
    spinGroup.add(beaconRays);

    // 6. Prominent Pulsing City Hub Points on continent outlines
    const cityPositions: number[] = [];
    CITIES.forEach((c) => {
      const v = latLongToVector3(...c).multiplyScalar(1.004);
      cityPositions.push(v.x, v.y, v.z);
    });

    const cityGeom = new THREE.BufferGeometry();
    cityGeom.setAttribute('position', new THREE.Float32BufferAttribute(cityPositions, 3));

    const cityMat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        uniform float uTime;
        varying float vP;
        void main(){
          vP = 0.5 + 0.5 * sin(uTime * 3.4 + position.x * 35.0 + position.y * 22.0);
          vec4 m = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = (7.5 + 8.5 * vP) * ${window.devicePixelRatio > 1 ? 1.4 : 1.0};
          gl_Position = projectionMatrix * m;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vP;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          float core = smoothstep(0.18, 0.0, d);
          vec3 pCol = mix(uColor * 1.6, vec3(1.0), 0.7 + core * 0.3);
          gl_FragColor = vec4(pCol * a * 2.2, a * (0.8 + 0.5 * vP));
        }
      `,
    });
    const cityPoints = new THREE.Points(cityGeom, cityMat);
    spinGroup.add(cityPoints);

    // 7. Mouse interaction & Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    };
    container.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    let lastTime = performance.now();
    let simTime = 0;

    const animate = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) / 1000);
      lastTime = now;
      simTime += dt;

      uniforms.uTime.value = simTime;
      uniforms.uGrow.value = Math.max(0, (simTime - 1.0) / 2.0);

      // Clean upward rise from below - elevated comfortably upward
      tiltGroup.position.y = -4.4 + (-2.75 + 4.4) * easeOutCubic(simTime / 1.8);
      spinGroup.rotation.y = simTime * 0.12;

      // Parallax smooth interpolation
      targetX += (mouseX * 0.12 - targetX) * 0.05;
      targetY += (mouseY * 0.08 - targetY) * 0.05;
      tiltGroup.rotation.x = 0.58 + targetY;
      tiltGroup.rotation.z = targetX * 0.45;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);

      // Cleanup WebGL resources
      globeGeom.dispose();
      globeMat.dispose();
      atmGeom.dispose();
      atmMat.dispose();
      arcGeom.dispose();
      arcMat.dispose();
      beaconGeom.dispose();
      beaconMat.dispose();
      cityGeom.dispose();
      cityMat.dispose();
      uniforms.uLand.value.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[490px] sm:h-[530px] lg:h-[560px] overflow-hidden select-none bg-[#050608] rounded-3xl border border-white/5 flex flex-col items-center justify-between"
    >
      <style>{STYLE}</style>

      {/* ── WebGL Canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block pointer-events-none" />

      {/* ── Floating Social Media Badges (Original Brand Colors, Substantially Bigger Size, Asynchronous Random Floating) ── */}
      {/* 1. Instagram Badge (Left Top - Authentic Instagram Gradient App Icon) */}
      <div
        className="marketing-social-pill pill-instagram float-random-1 hidden sm:flex left-[3%] md:left-[6%] lg:left-[8%] top-[105px] sm:top-[120px]"
        title="Instagram Growth"
      >
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="none">
          <defs>
            <radialGradient id="ig-brand-radial" cx="20%" cy="105%" r="120%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="10%" stopColor="#fdf497" />
              <stop offset="50%" stopColor="#fd5949" />
              <stop offset="68%" stopColor="#d6249f" />
              <stop offset="100%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill="url(#ig-brand-radial)" />
          <rect x="5.5" y="5.5" width="13" height="13" rx="3.6" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
          <circle cx="12" cy="12" r="3.2" stroke="#FFFFFF" strokeWidth="1.8" fill="none" />
          <circle cx="15.8" cy="8.2" r="0.9" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 2. LinkedIn Badge (Left Lower - Authentic LinkedIn Blue #0A66C2) */}
      <div
        className="marketing-social-pill pill-linkedin float-random-2 hidden sm:flex left-[4%] md:left-[8%] lg:left-[10%] top-[245px] sm:top-[270px]"
        title="LinkedIn B2B Lead Gen"
      >
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="none">
          <rect width="24" height="24" rx="5" fill="#0A66C2" />
          <path d="M7.12 9.5H4.88V18H7.12V9.5Z" fill="#FFFFFF" />
          <path d="M6 8.25C6.76 8.25 7.38 7.63 7.38 6.87C7.38 6.11 6.76 5.5 6 5.5C5.24 5.5 4.62 6.11 4.62 6.87C4.62 7.63 5.24 8.25 6 8.25Z" fill="#FFFFFF" />
          <path d="M10.63 9.5H8.43V18H10.63V13.88C10.63 11.71 13.43 11.51 13.43 13.88V18H15.63V12.72C15.63 8.62 10.94 8.77 10.63 10.9V9.5Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 3. YouTube Badge (Right Top - Authentic YouTube Red #FF0000 & White Play Button) */}
      <div
        className="marketing-social-pill pill-youtube float-random-3 hidden sm:flex right-[3%] md:right-[6%] lg:right-[8%] top-[110px] sm:top-[125px]"
        title="YouTube Content Strategy"
      >
        <svg className="w-8 h-8 sm:w-9 sm:h-9" viewBox="0 0 24 24" fill="none">
          <path
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z"
            fill="#FF0000"
          />
          <polygon points="9.545,15.568 15.818,12 9.545,8.432" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 4. TikTok Badge (Right Lower - Authentic Chromatic Glitch Cyan & Pink-Red) */}
      <div
        className="marketing-social-pill pill-tiktok float-random-4 hidden sm:flex right-[4%] md:right-[8%] lg:right-[10%] top-[250px] sm:top-[275px]"
        title="Viral Short-Form Campaigns"
      >
        <svg className="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none">
          <g>
            <path
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.27.77.14 1.58.01 2.26-.35.88-.44 1.47-1.32 1.56-2.29.07-2.61.04-5.22.04-7.83V.02h.85z"
              fill="#25F4EE"
              transform="translate(-0.8, -0.6)"
            />
            <path
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.27.77.14 1.58.01 2.26-.35.88-.44 1.47-1.32 1.56-2.29.07-2.61.04-5.22.04-7.83V.02h.85z"
              fill="#FE2C55"
              transform="translate(0.8, 0.6)"
            />
            <path
              d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.16 1.18 2.09 2.35 2.27.77.14 1.58.01 2.26-.35.88-.44 1.47-1.32 1.56-2.29.07-2.61.04-5.22.04-7.83V.02h.85z"
              fill="#FFFFFF"
            />
          </g>
        </svg>
      </div>

      {/* ── Centered Hero Headline & Content (Fits in single fold) ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 pt-8 sm:pt-10 md:pt-12 flex flex-col items-center pointer-events-auto">
        {/* H1 Headline */}
        {heading || (
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-[35px] font-extrabold text-white tracking-[-0.02em] leading-[1.18] font-heading py-1 drop-shadow-md max-w-2xl mx-auto">
            <span>Marketing That Reaches the </span>
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] drop-shadow-[0_0_25px_rgba(0,255,229,0.35)] inline-block"
              style={{ WebkitTextFillColor: 'transparent' }}
            >
              Right People
            </span>
          </h1>
        )}

        {/* Description Paragraph */}
        <p className="text-gray-300 text-xs sm:text-sm md:text-[15px] font-normal leading-relaxed font-sans max-w-xl mx-auto mt-2.5 sm:mt-3 text-center">
          {description ||
            'We build digital marketing campaigns based on data, not guesswork. Put your brand in front of the people most likely to become your customers.'}
        </p>

        {/* Action Buttons */}
        <div className="pt-4 sm:pt-5 flex flex-wrap items-center justify-center gap-3 sm:gap-3.5">
          <a
            href="#service-cta"
            onClick={(e) => {
              if (onScrollToContact) {
                e.preventDefault();
                onScrollToContact();
              } else {
                e.preventDefault();
                document.getElementById('service-cta')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group relative inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-bold text-xs sm:text-sm text-[#050505] bg-gradient-to-r from-[#00FFE5] via-[#00E6D2] to-[#00BFA6] hover:from-[#00E6D2] hover:to-[#00FFE5] shadow-[0_0_20px_rgba(0,230,210,0.3)] hover:shadow-[0_0_30px_rgba(0,255,229,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 font-heading cursor-pointer"
          >
            <span>{ctaText}</span>
            <ArrowUpRight className="w-4 h-4 text-[#050505] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          <a
            href="#service-projects"
            onClick={(e) => {
              if (onScrollToProjects) {
                e.preventDefault();
                onScrollToProjects();
              } else {
                e.preventDefault();
                document.getElementById('service-projects')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="group inline-flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full font-semibold text-xs sm:text-sm text-gray-300 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#00E6D2]/40 transition-all duration-300 font-heading cursor-pointer backdrop-blur-md"
          >
            <span>See Our Work</span>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          </a>
        </div>
      </div>

      {/* Bottom Spacer */}
      <div className="w-full h-4 pointer-events-none" />
    </div>
  );
};

const STYLE = `
/* Substantially larger social media icons (uniform 66px x 66px, rounded-2xl) */
.marketing-social-pill {
  position: absolute;
  width: 58px;
  height: 58px;
  align-items: center;
  justify-content: center;
  background: rgba(10, 13, 16, 0.85);
  border-radius: 18px;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: 20;
  pointer-events: none;
  transition: transform 0.3s ease;
}

@media (min-width: 640px) {
  .marketing-social-pill {
    width: 66px;
    height: 66px;
    border-radius: 20px;
  }
}

/* Authentic Brand Color Accents & Glows */
.pill-instagram {
  border: 1.5px solid rgba(225, 48, 108, 0.5);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.65), 0 0 22px rgba(225, 48, 108, 0.25);
  background: radial-gradient(circle at center, rgba(35, 14, 25, 0.88), rgba(12, 10, 16, 0.92));
}

.pill-linkedin {
  border: 1.5px solid rgba(10, 102, 194, 0.5);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.65), 0 0 22px rgba(10, 102, 194, 0.25);
  background: radial-gradient(circle at center, rgba(10, 24, 42, 0.88), rgba(8, 12, 18, 0.92));
}

.pill-youtube {
  border: 1.5px solid rgba(255, 0, 0, 0.45);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.65), 0 0 22px rgba(255, 0, 0, 0.22);
  background: radial-gradient(circle at center, rgba(38, 12, 12, 0.88), rgba(16, 8, 8, 0.92));
}

.pill-tiktok {
  border: 1.5px solid rgba(37, 244, 238, 0.35);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.65), -2px 0 16px rgba(37, 244, 238, 0.2), 2px 0 16px rgba(254, 44, 85, 0.2);
  background: radial-gradient(circle at center, rgba(14, 18, 22, 0.88), rgba(8, 9, 12, 0.92));
}

/* 4 distinct asynchronous floating animations */
.float-random-1 {
  animation: floatRandom1 5.8s ease-in-out infinite;
}

.float-random-2 {
  animation: floatRandom2 7.1s ease-in-out infinite 0.6s;
}

.float-random-3 {
  animation: floatRandom3 6.3s ease-in-out infinite 1.1s;
}

.float-random-4 {
  animation: floatRandom4 7.6s ease-in-out infinite 0.3s;
}

@keyframes floatRandom1 {
  0%, 100% {
    transform: translate(0px, 0px) rotate(-4deg);
  }
  30% {
    transform: translate(-9px, -15px) rotate(4deg);
  }
  65% {
    transform: translate(8px, -7px) rotate(-3deg);
  }
  85% {
    transform: translate(-4px, 7px) rotate(2deg);
  }
}

@keyframes floatRandom2 {
  0%, 100% {
    transform: translate(0px, 0px) rotate(4deg);
  }
  25% {
    transform: translate(10px, -13px) rotate(-5deg);
  }
  60% {
    transform: translate(-8px, -17px) rotate(6deg);
  }
  80% {
    transform: translate(6px, 6px) rotate(-2deg);
  }
}

@keyframes floatRandom3 {
  0%, 100% {
    transform: translate(0px, 0px) rotate(-4deg);
  }
  35% {
    transform: translate(9px, -16px) rotate(5deg);
  }
  70% {
    transform: translate(-10px, -6px) rotate(-6deg);
  }
  90% {
    transform: translate(5px, 9px) rotate(3deg);
  }
}

@keyframes floatRandom4 {
  0%, 100% {
    transform: translate(0px, 0px) rotate(5deg);
  }
  28% {
    transform: translate(-10px, -10px) rotate(-4deg);
  }
  58% {
    transform: translate(8px, -18px) rotate(6deg);
  }
  82% {
    transform: translate(-5px, 6px) rotate(-3deg);
  }
}
`;

export default MarketingGlobeHero;
