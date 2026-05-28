"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

interface KF { at: number; amp: number; freqX: number; freqZ: number; speed: number; r: number; g: number; b: number; op: number; camY: number; camZ: number; }

const KEYFRAMES: KF[] = [
  // Hero: olas suaves, azul cielo
  { at: 0.00, amp: 1.6, freqX: 0.28, freqZ: 0.22, speed: 0.28, r: 0x4a, g: 0x9f, b: 0xd4, op: 0.18, camY: 6, camZ: 14 },
  // Vision: olas más vivas, sky más brillante
  { at: 0.22, amp: 2.6, freqX: 0.38, freqZ: 0.30, speed: 0.42, r: 0x7c, g: 0xc4, b: 0xe8, op: 0.22, camY: 5, camZ: 9  },
  // Services: grid casi plano, muy tranquilo
  { at: 0.44, amp: 0.5, freqX: 0.18, freqZ: 0.14, speed: 0.14, r: 0x4a, g: 0x9f, b: 0xd4, op: 0.11, camY: 4, camZ: 4  },
  // Attorneys: olas vuelven más fuertes
  { at: 0.66, amp: 2.2, freqX: 0.34, freqZ: 0.27, speed: 0.36, r: 0x7c, g: 0xc4, b: 0xe8, op: 0.20, camY: 3, camZ: 0  },
  // Contact → Footer: se apaga hacia el navy oscuro
  { at: 1.00, amp: 0.3, freqX: 0.15, freqZ: 0.12, speed: 0.09, r: 0x1b, g: 0x3a, b: 0x6b, op: 0.04, camY: 2, camZ: -4 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function sampleKeyframes(progress: number) {
  let from: KF = KEYFRAMES[0];
  let to: KF   = KEYFRAMES[KEYFRAMES.length - 1];

  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (progress >= KEYFRAMES[i].at && progress <= KEYFRAMES[i + 1].at) {
      from = KEYFRAMES[i];
      to   = KEYFRAMES[i + 1];
      break;
    }
  }

  const span = to.at - from.at;
  const t    = span > 0 ? (progress - from.at) / span : 1;

  return {
    amp:   lerp(from.amp,   to.amp,   t),
    freqX: lerp(from.freqX, to.freqX, t),
    freqZ: lerp(from.freqZ, to.freqZ, t),
    speed: lerp(from.speed, to.speed, t),
    r:     lerp(from.r,     to.r,     t) / 255,
    g:     lerp(from.g,     to.g,     t) / 255,
    b:     lerp(from.b,     to.b,     t) / 255,
    op:    lerp(from.op,    to.op,    t),
    camY:  lerp(from.camY,  to.camY,  t),
    camZ:  lerp(from.camZ,  to.camZ,  t),
  };
}

export default function PageScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let rendererRef: { dispose: () => void } | null = null;
    let removeListeners: (() => void) | null = null;

    (async () => {
      try {
        const THREE = await import("three");
        const isMobile = window.innerWidth < 900;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: !isMobile,
          alpha: true,
        });
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x070d1f, 1);
        rendererRef = renderer;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x070d1f, 0.016);

        const camera = new THREE.PerspectiveCamera(
          65,
          window.innerWidth / window.innerHeight,
          0.1,
          120
        );
        camera.position.set(0, 6, 14);
        camera.lookAt(0, 0, -10);

        // ── Primary wave grid ─────────────────────────────────────────────
        const SEG_X = isMobile ? 40 : 70;
        const SEG_Z = isMobile ? 55 : 100;

        const planeGeo = new THREE.PlaneGeometry(60, 90, SEG_X, SEG_Z);
        const planeMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x4a9fd4),
          wireframe: true,
          transparent: true,
          opacity: 0.18,
        });
        const gridMesh = new THREE.Mesh(planeGeo, planeMat);
        gridMesh.rotation.x = -Math.PI / 2;
        gridMesh.position.set(0, -2, -20);
        scene.add(gridMesh);

        const pos = planeGeo.attributes.position as THREE.BufferAttribute;
        pos.setUsage(THREE.DynamicDrawUsage);
        const count = pos.count;

        // Cache static XZ for wave calc (geoX → worldX, geoY → world-Z)
        const staticXY = new Float32Array(count * 2);
        for (let i = 0; i < count; i++) {
          staticXY[i * 2]     = pos.getX(i);
          staticXY[i * 2 + 1] = pos.getY(i);
        }

        // ── Secondary grid (depth / navy) ─────────────────────────────────
        const planeGeo2 = new THREE.PlaneGeometry(60, 90, SEG_X, SEG_Z);
        const planeMat2 = new THREE.MeshBasicMaterial({
          color: new THREE.Color(0x1b3a6b),
          wireframe: true,
          transparent: true,
          opacity: 0.09,
        });
        const gridMesh2 = new THREE.Mesh(planeGeo2, planeMat2);
        gridMesh2.rotation.x = -Math.PI / 2;
        gridMesh2.rotation.z = Math.PI / 6;
        gridMesh2.position.set(0, -3, -20);
        scene.add(gridMesh2);

        const pos2  = planeGeo2.attributes.position as THREE.BufferAttribute;
        pos2.setUsage(THREE.DynamicDrawUsage);
        const staticXY2 = new Float32Array(pos2.count * 2);
        for (let i = 0; i < pos2.count; i++) {
          staticXY2[i * 2]     = pos2.getX(i);
          staticXY2[i * 2 + 1] = pos2.getY(i);
        }

        // ── Scroll tracking ───────────────────────────────────────────────
        let targetProgress  = 0;
        let currentProgress = 0;

        const onScroll = () => {
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          targetProgress =
            maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
        };

        const onResize = () => {
          const w = window.innerWidth;
          const h = window.innerHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        removeListeners = () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
        };

        // ── Render loop ───────────────────────────────────────────────────
        let elapsed  = 0;
        let lastTime = performance.now();

        const animate = () => {
          animId = requestAnimationFrame(animate);
          const now = performance.now();
          elapsed  += (now - lastTime) / 1000;
          lastTime  = now;
          const t   = elapsed;

          // Smooth scroll progress → grid state
          currentProgress += (targetProgress - currentProgress) * 0.012;
          const s = sampleKeyframes(currentProgress);

          // Update primary grid color + opacity
          (planeMat.color as THREE.Color).setRGB(s.r, s.g, s.b);
          planeMat.opacity = s.op;

          // Secondary grid tracks main at lower opacity
          (planeMat2.color as THREE.Color).setRGB(s.r * 0.5, s.g * 0.5, s.b * 0.5);
          planeMat2.opacity = s.op * 0.5;

          // Animate primary wave
          for (let i = 0; i < count; i++) {
            const gx = staticXY[i * 2];
            const gz = -staticXY[i * 2 + 1];
            pos.setZ(
              i,
              Math.sin(gx * s.freqX + t * s.speed) *
              Math.cos(gz * s.freqZ + t * s.speed * 0.72) *
              s.amp +
              Math.sin(gx * s.freqX * 0.5 + t * s.speed * 0.4) * s.amp * 0.3
            );
          }
          pos.needsUpdate = true;

          // Animate secondary wave (different phase)
          for (let i = 0; i < pos2.count; i++) {
            const gx = staticXY2[i * 2];
            const gz = -staticXY2[i * 2 + 1];
            pos2.setZ(
              i,
              Math.sin(gx * s.freqX * 0.75 + t * s.speed * 0.6 + 1.4) *
              Math.cos(gz * s.freqZ * 0.8  + t * s.speed * 0.45) *
              s.amp * 0.85
            );
          }
          pos2.needsUpdate = true;

          // Camera smooth follow
          camera.position.y = lerp(camera.position.y, s.camY, 0.014);
          camera.position.z = lerp(camera.position.z, s.camZ, 0.014);
          camera.position.x = Math.sin(t * 0.035) * 0.7;
          camera.lookAt(
            Math.sin(t * 0.04) * 0.5,
            camera.position.y - 5,
            camera.position.z - 25
          );

          renderer.render(scene, camera);
        };

        animate();
      } catch {
        // Three.js failed silently — page remains fully functional
      }
    })();

    return () => {
      cancelAnimationFrame(animId);
      removeListeners?.();
      rendererRef?.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
