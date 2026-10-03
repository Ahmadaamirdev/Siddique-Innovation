import React, { useEffect, useRef, useState, useId } from 'react';

export interface HeroGlobeProps {
  tilt?: number; // Earth axial tilt in degrees, default 23
  className?: string;
}

interface CountryMarker {
  id: 'pakistan' | 'ksa' | 'oman' | 'usa';
  name: string;
  lat: number;
  lng: number;
  slot: 'upper-right' | 'left' | 'lower-right' | 'upper-left';
}

const COUNTRIES: CountryMarker[] = [
  { id: 'usa', name: 'USA', lat: 38.0, lng: -97.0, slot: 'upper-left' },
  { id: 'pakistan', name: 'Pakistan', lat: 33.7, lng: 73.0, slot: 'upper-right' },
  { id: 'ksa', name: 'Saudi Arabia (KSA)', lat: 24.7, lng: 46.7, slot: 'left' },
  { id: 'oman', name: 'Oman', lat: 23.6, lng: 58.6, slot: 'lower-right' },
];

export const HeroGlobe: React.FC<HeroGlobeProps> = ({ tilt = 23, className = '' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Label screen positions for leader line anchoring
  const labelPositionsRef = useRef<{
    [key: string]: { x: number; y: number; side: 'left' | 'right' };
  }>({});

  const componentId = useId();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Angles
    const tiltRad = (-tilt * Math.PI) / 180; // Clockwise lean to the right (north pole points upper-right)
    const pitchRad = (18 * Math.PI) / 180; // Forward pitch so top tilts slightly toward viewer
    const cosTilt = Math.cos(tiltRad);
    const sinTilt = Math.sin(tiltRad);
    const cosPitch = Math.cos(pitchRad);
    const sinPitch = Math.sin(pitchRad);

    // Dynamic sizing helper
    const getRadius = (w: number) => {
      if (w < 480) return Math.min(85, w * 0.22);
      if (w < 640) return Math.min(100, w * 0.24);
      if (w < 1024) return 110;
      return 118;
    };

    // 3D projection math
    const project = (
      lat: number,
      lng: number,
      radius: number,
      yaw: number,
      cx: number,
      cy: number
    ) => {
      const phi = (lat * Math.PI) / 180;
      const lambda = (lng * Math.PI) / 180;

      // 1. Polar revolution
      const x0 = Math.cos(phi) * Math.sin(lambda - yaw);
      const y0 = -Math.sin(phi);
      const z0 = Math.cos(phi) * Math.cos(lambda - yaw);

      // 2. Pitch tilt around X-axis (18 deg forward)
      const x1 = x0;
      const y1 = y0 * cosPitch - z0 * sinPitch;
      const z1 = y0 * sinPitch + z0 * cosPitch;

      // 3. Axial tilt around Z-axis (-23 deg clockwise)
      const x2 = x1 * cosTilt - y1 * sinTilt;
      const y2 = x1 * sinTilt + y1 * cosTilt;
      const z2 = z1;

      return {
        x: cx + x2 * radius,
        y: cy + y2 * radius,
        z: z2,
        visible: z2 > -0.15,
      };
    };

    // Main Canvas animation render loop
    const render = () => {
      // Keep moving continuously every frame
      time += 0.016;

      const rect = containerRef.current?.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = rect?.width || 600;
      const height = rect?.height || 480;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = getRadius(width);

      // Continuous perpetual rotation (keeps moving steadily at ~18 deg/s)
      const currentYawDeg = (time * 18) % 360;
      const yaw = (currentYawDeg * Math.PI) / 180;

      // ==============================================================
      // 1. ORBIT RING & SATELLITE (tilted differently at 1.42x radius)
      // ==============================================================
      const orbitRadius = radius * 1.42;
      const orbitTilt = (-55 * Math.PI) / 180; // Tilted differently from globe
      const cosOT = Math.cos(orbitTilt);
      const sinOT = Math.sin(orbitTilt);
      const orbitPitch = (28 * Math.PI) / 180;
      const cosOP = Math.cos(orbitPitch);
      const sinOP = Math.sin(orbitPitch);

      // Orbit step count
      const orbitSteps = 72;
      const orbitPoints: { x: number; y: number; z: number }[] = [];
      for (let i = 0; i <= orbitSteps; i++) {
        const theta = (i / orbitSteps) * Math.PI * 2;
        const ox0 = Math.cos(theta);
        const oy0 = 0;
        const oz0 = Math.sin(theta);

        const ox1 = ox0;
        const oy1 = oy0 * cosOP - oz0 * sinOP;
        const oz1 = oy0 * sinOP + oz0 * cosOP;

        const ox2 = ox1 * cosOT - oy1 * sinOT;
        const oy2 = ox1 * sinOT + oy1 * cosOT;
        const oz2 = oz1;

        orbitPoints.push({
          x: cx + ox2 * orbitRadius,
          y: cy + oy2 * orbitRadius,
          z: oz2,
        });
      }

      // Draw back portion of orbit ring (dimmer when behind)
      ctx.save();
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      for (let i = 0; i < orbitSteps; i++) {
        const p1 = orbitPoints[i];
        const p2 = orbitPoints[i + 1];
        const avgZ = (p1.z + p2.z) / 2;
        if (avgZ < 0) {
          ctx.strokeStyle = 'rgba(31, 214, 187, 0.12)';
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
      ctx.restore();

      // ==============================================================
      // 2. SOFT TEAL RADIAL GLOW INSIDE SPHERE
      // ==============================================================
      const innerGlow = ctx.createRadialGradient(
        cx - radius * 0.25,
        cy - radius * 0.25,
        radius * 0.1,
        cx,
        cy,
        radius
      );
      innerGlow.addColorStop(0, 'rgba(31, 214, 187, 0.14)');
      innerGlow.addColorStop(0.65, 'rgba(5, 14, 16, 0.85)');
      innerGlow.addColorStop(1, 'rgba(3, 7, 8, 0.98)');

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = innerGlow;
      ctx.fill();

      // ==============================================================
      // 3. THIN DASHED OUTER CIRCLE (at ~1.3x radius)
      // ==============================================================
      ctx.save();
      ctx.strokeStyle = 'rgba(31, 214, 187, 0.22)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // ==============================================================
      // 4. LATITUDE & LONGITUDE LINES (every 30 deg, back at 20% opacity)
      // ==============================================================
      // Parallels (-60, -30, 0, 30, 60)
      const parallels = [-60, -30, 0, 30, 60];
      parallels.forEach((lat) => {
        const segSteps = 72;
        for (let i = 0; i < segSteps; i++) {
          const lng1 = (i / segSteps) * 360;
          const lng2 = ((i + 1) / segSteps) * 360;
          const pt1 = project(lat, lng1, radius, yaw, cx, cy);
          const pt2 = project(lat, lng2, radius, yaw, cx, cy);

          const isFront = pt1.z > 0 && pt2.z > 0;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);

          if (isFront) {
            ctx.strokeStyle =
              lat === 0 ? 'rgba(31, 214, 187, 0.55)' : 'rgba(31, 214, 187, 0.35)';
            ctx.lineWidth = lat === 0 ? 1.4 : 0.9;
          } else {
            // Back-facing lines at roughly 20% opacity
            ctx.strokeStyle = 'rgba(31, 214, 187, 0.08)';
            ctx.lineWidth = 0.6;
          }
          ctx.stroke();
        }
      });

      // Meridians (every 30 degrees)
      for (let lng = 0; lng < 360; lng += 30) {
        const segSteps = 36;
        for (let i = 0; i < segSteps; i++) {
          const lat1 = -90 + (i / segSteps) * 180;
          const lat2 = -90 + ((i + 1) / segSteps) * 180;
          const pt1 = project(lat1, lng, radius, yaw, cx, cy);
          const pt2 = project(lat2, lng, radius, yaw, cx, cy);

          const isFront = pt1.z > 0 && pt2.z > 0;
          ctx.beginPath();
          ctx.moveTo(pt1.x, pt1.y);
          ctx.lineTo(pt2.x, pt2.y);

          if (isFront) {
            ctx.strokeStyle = 'rgba(31, 214, 187, 0.32)';
            ctx.lineWidth = 0.9;
          } else {
            // Back-facing lines at roughly 20% opacity
            ctx.strokeStyle = 'rgba(31, 214, 187, 0.08)';
            ctx.lineWidth = 0.6;
          }
          ctx.stroke();
        }
      }

      // BRIGHT TEAL OUTLINE CIRCLE
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(31, 214, 187, 0.7)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // ==============================================================
      // 5. COUNTRY MARKERS (solid 5px teal dot + 2 staggered pulse rings)
      // ==============================================================
      const markerScreenCoords: {
        [key: string]: { x: number; y: number; z: number };
      } = {};

      COUNTRIES.forEach((c) => {
        const pt = project(c.lat, c.lng, radius, yaw, cx, cy);
        markerScreenCoords[c.id] = { x: pt.x, y: pt.y, z: pt.z };

        // Two staggered pulse rings (expand to ~30px and fade out)
        const p1 = (time * 0.7) % 1;
        const p2 = (time * 0.7 + 0.5) % 1;

        const isFront = pt.z > -0.05;
        const depthScale = Math.max(0.25, Math.min(1, pt.z));

        // Pulse rings when facing front
        if (isFront) {
          [p1, p2].forEach((p) => {
            const ringRad = 4 + p * 26; // Expands to 30px
            const ringAlpha = (1 - p) * Math.max(0.1, pt.z) * 0.75;

            ctx.save();
            ctx.beginPath();
            // Scaled vertical ellipse aligned with tilt
            ctx.ellipse(
              pt.x,
              pt.y,
              ringRad,
              ringRad * depthScale,
              tiltRad,
              0,
              Math.PI * 2
            );
            ctx.strokeStyle = `rgba(31, 214, 187, ${ringAlpha})`;
            ctx.lineWidth = 1.2;
            ctx.stroke();
            ctx.restore();
          });
        }

        // Solid teal marker dot (about 5px)
        ctx.save();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, isFront ? 4.5 : 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isFront ? '#1fd6bb' : 'rgba(31, 214, 187, 0.35)';
        if (isFront) {
          ctx.shadowColor = '#1fd6bb';
          ctx.shadowBlur = 12;
        }
        ctx.fill();

        // Inner hot core
        if (isFront) {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.fill();
        }
        ctx.restore();
      });

      // ==============================================================
      // 6. LEADER LINES (always visible, connecting each country label to its globe marker)
      // ==============================================================
      // Redraw every frame so it follows the marker as the globe continuously rotates
      COUNTRIES.forEach((c) => {
        const markerPt = markerScreenCoords[c.id];
        const labelPos = labelPositionsRef.current[c.id];
        if (markerPt && labelPos) {
          const isFront = markerPt.z > -0.05;
          const isHovered = hoveredCountry === c.id;

          ctx.save();
          // Always visible with crisp styling
          ctx.strokeStyle = isHovered
            ? 'rgba(31, 214, 187, 0.95)'
            : isFront
            ? 'rgba(31, 214, 187, 0.65)'
            : 'rgba(31, 214, 187, 0.35)';
          ctx.lineWidth = isHovered ? 1.5 : 1;
          if (!isFront) {
            ctx.setLineDash([4, 4]); // Clean subtle dash when pointing to rear side
          }
          ctx.beginPath();
          ctx.moveTo(labelPos.x, labelPos.y);

          const elbowX =
            labelPos.side === 'left' ? labelPos.x + 22 : labelPos.x - 22;
          const elbowY = labelPos.y;

          ctx.lineTo(elbowX, elbowY);
          ctx.lineTo(markerPt.x, markerPt.y);
          ctx.stroke();
          ctx.restore();
        }
      });

      // ==============================================================
      // 8. FRONT PORTION OF ORBIT RING & SATELLITE DOT (every ~10s)
      // ==============================================================
      ctx.save();
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 6]);
      for (let i = 0; i < orbitSteps; i++) {
        const p1 = orbitPoints[i];
        const p2 = orbitPoints[i + 1];
        const avgZ = (p1.z + p2.z) / 2;
        if (avgZ >= 0) {
          ctx.strokeStyle = 'rgba(31, 214, 187, 0.35)';
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Satellite dot orbiting once every ~10 seconds
      const satelliteAngle = ((time / 10) % 1) * Math.PI * 2;
      const sox0 = Math.cos(satelliteAngle);
      const soy0 = 0;
      const soz0 = Math.sin(satelliteAngle);

      const sox1 = sox0;
      const soy1 = soy0 * cosOP - soz0 * sinOP;
      const soz1 = soy0 * sinOP + soz0 * cosOP;

      const sox2 = sox1 * cosOT - soy1 * sinOT;
      const soy2 = sox1 * sinOT + soy1 * cosOT;
      const soz2 = soz1;

      const satX = cx + sox2 * orbitRadius;
      const satY = cy + soy2 * orbitRadius;
      const isSatFront = soz2 >= 0;

      ctx.beginPath();
      ctx.arc(satX, satY, isSatFront ? 3.5 : 2.5, 0, Math.PI * 2);
      ctx.fillStyle = isSatFront ? '#ffffff' : 'rgba(31, 214, 187, 0.4)';
      if (isSatFront) {
        ctx.shadowColor = '#1fd6bb';
        ctx.shadowBlur = 8;
      }
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [tilt, hoveredCountry]);

  // Callback to update fixed label coordinates for leader line anchor points
  const updateLabelAnchor = (
    id: string,
    el: HTMLDivElement | null,
    side: 'left' | 'right'
  ) => {
    if (!el || !containerRef.current) return;
    const parentRect = containerRef.current.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    // Anchor exactly at the edge facing the globe:
    // Left-pinned labels anchor at right edge (x: right, y: center)
    // Right-pinned labels anchor at left edge (x: left, y: center)
    const anchorX =
      side === 'left'
        ? elRect.right - parentRect.left
        : elRect.left - parentRect.left;
    const anchorY = elRect.top - parentRect.top + elRect.height / 2;

    labelPositionsRef.current[id] = { x: anchorX, y: anchorY, side };
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-3xl mx-auto h-[320px] sm:h-[350px] md:h-[375px] flex items-center justify-center select-none ${className} transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. SLOW BREATHING GLOW BEHIND GLOBE (scale 1 to 1.05 over 6s) */}
      <style>{`
        @keyframes breathingGlow-${componentId} {
          0%, 100% {
            transform: scale(1);
            opacity: 0.22;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.32;
          }
        }
        .breathing-glow-${componentId} {
          animation: breathingGlow-${componentId} 6s ease-in-out infinite;
        }
      `}</style>

      <div
        className={`absolute w-[240px] sm:w-[270px] md:w-[300px] h-[240px] sm:h-[270px] md:h-[300px] rounded-full bg-radial from-[#1fd6bb]/25 via-[#1fd6bb]/8 to-transparent blur-3xl pointer-events-none -z-0 breathing-glow-${componentId}`}
      />

      {/* 2. HTML CANVAS 2D GLOBE */}
      <canvas ref={canvasRef} className="block relative z-10" />

      {/* 3. FIXED PINNED HTML LABELS (always visible, never overlapping) */}
      {/* Upper-Left Slot: USA */}
      <div
        ref={(el) => updateLabelAnchor('usa', el, 'left')}
        onMouseEnter={() => setHoveredCountry('usa')}
        onMouseLeave={() => setHoveredCountry(null)}
        className="absolute left-1 sm:left-4 md:left-6 top-[22%] sm:top-[24%] z-20 cursor-pointer pointer-events-auto transition-transform duration-200 hover:scale-105"
      >
        <div
          style={{
            backgroundColor: 'rgba(4, 9, 10, 0.85)',
            border: '0.5px solid rgba(31, 214, 187, 0.5)',
          }}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.85)] hover:border-[#1fd6bb] transition-colors backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#1fd6bb] shadow-[0_0_6px_#1fd6bb] shrink-0" />
          <span className="text-white font-medium text-xs sm:text-sm tracking-wide whitespace-nowrap">
            USA
          </span>
        </div>
      </div>

      {/* Lower-Left Slot: Saudi Arabia (KSA) */}
      <div
        ref={(el) => updateLabelAnchor('ksa', el, 'left')}
        onMouseEnter={() => setHoveredCountry('ksa')}
        onMouseLeave={() => setHoveredCountry(null)}
        className="absolute left-1 sm:left-4 md:left-6 top-[72%] sm:top-[70%] z-20 cursor-pointer pointer-events-auto transition-transform duration-200 hover:scale-105"
      >
        <div
          style={{
            backgroundColor: 'rgba(4, 9, 10, 0.85)',
            border: '0.5px solid rgba(31, 214, 187, 0.5)',
          }}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.85)] hover:border-[#1fd6bb] transition-colors backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#1fd6bb] shadow-[0_0_6px_#1fd6bb] shrink-0" />
          <span className="text-white font-medium text-xs sm:text-sm tracking-wide whitespace-nowrap">
            Saudi Arabia (KSA)
          </span>
        </div>
      </div>

      {/* Upper-Right Slot: Pakistan (kept at least 24px vertical gap from Oman) */}
      <div
        ref={(el) => updateLabelAnchor('pakistan', el, 'right')}
        onMouseEnter={() => setHoveredCountry('pakistan')}
        onMouseLeave={() => setHoveredCountry(null)}
        className="absolute right-1 sm:right-4 md:right-6 top-[22%] sm:top-[24%] z-20 cursor-pointer pointer-events-auto transition-transform duration-200 hover:scale-105"
      >
        <div
          style={{
            backgroundColor: 'rgba(4, 9, 10, 0.85)',
            border: '0.5px solid rgba(31, 214, 187, 0.5)',
          }}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.85)] hover:border-[#1fd6bb] transition-colors backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#1fd6bb] shadow-[0_0_6px_#1fd6bb] shrink-0" />
          <span className="text-white font-medium text-xs sm:text-sm tracking-wide whitespace-nowrap">
            Pakistan
          </span>
        </div>
      </div>

      {/* Lower-Right Slot: Oman (kept at least 24px vertical gap from Pakistan) */}
      <div
        ref={(el) => updateLabelAnchor('oman', el, 'right')}
        onMouseEnter={() => setHoveredCountry('oman')}
        onMouseLeave={() => setHoveredCountry(null)}
        className="absolute right-1 sm:right-4 md:right-6 top-[72%] sm:top-[70%] z-20 cursor-pointer pointer-events-auto transition-transform duration-200 hover:scale-105"
      >
        <div
          style={{
            backgroundColor: 'rgba(4, 9, 10, 0.85)',
            border: '0.5px solid rgba(31, 214, 187, 0.5)',
          }}
          className="flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.85)] hover:border-[#1fd6bb] transition-colors backdrop-blur-md"
        >
          <span className="w-2 h-2 rounded-full bg-[#1fd6bb] shadow-[0_0_6px_#1fd6bb] shrink-0" />
          <span className="text-white font-medium text-xs sm:text-sm tracking-wide whitespace-nowrap">
            Oman
          </span>
        </div>
      </div>
    </div>
  );
};
