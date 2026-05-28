"use client";

import { useEffect, useRef } from "react";
import type * as THREE from "three";

export default function HeroScene() {
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

        const w = window.innerWidth;
        const h = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: !isMobile,
          alpha: true,
        });
        renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
        renderer.setSize(w, h);
        rendererRef = renderer;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(55, w / h, 0.1, 100);
        camera.position.set(0, 0, 12);

        scene.add(new THREE.AmbientLight(0x7cc4e8, 0.2));
        const keyLight = new THREE.PointLight(0x4a9fd4, 1.8, 60);
        keyLight.position.set(6, 6, 8);
        scene.add(keyLight);
        const fillLight = new THREE.PointLight(0x1b3a6b, 0.9, 40);
        fillLight.position.set(-6, -4, 4);
        scene.add(fillLight);

        type ShapeEntry = { mesh: THREE.Mesh; rx: number; ry: number; rz: number };
        const shapes: ShapeEntry[] = [];

        const addShape = (
          geo: THREE.BufferGeometry,
          x: number,
          y: number,
          z: number,
          scale: number,
          wireframe: boolean
        ) => {
          const mat: THREE.Material = wireframe
            ? new THREE.MeshBasicMaterial({
                color: 0x7cc4e8,
                wireframe: true,
                transparent: true,
                opacity: 0.38,
              })
            : new THREE.MeshPhongMaterial({
                color: 0x4a9fd4,
                transparent: true,
                opacity: 0.16,
                shininess: 90,
                specular: new THREE.Color(0x7cc4e8),
              });
          const mesh = new THREE.Mesh(geo, mat);
          mesh.position.set(x, y, z);
          mesh.scale.setScalar(scale);
          mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
          scene.add(mesh);
          shapes.push({
            mesh,
            rx: (Math.random() - 0.5) * 0.004,
            ry: (Math.random() - 0.5) * 0.005,
            rz: (Math.random() - 0.5) * 0.003,
          });
        };

        // Origami-inspired polyhedra
        addShape(new THREE.IcosahedronGeometry(1, 0), -4.5, 2.0, -2.0, 1.4, true);
        addShape(new THREE.IcosahedronGeometry(1, 0), 4.0, -1.5, -3.0, 1.0, false);
        addShape(new THREE.OctahedronGeometry(1, 0), 3.5, 3.0, -2.0, 0.9, true);
        addShape(new THREE.OctahedronGeometry(1, 0), -3.0, -2.5, -1.5, 1.2, false);
        addShape(new THREE.TetrahedronGeometry(1, 0), -5.5, -0.5, -3.0, 0.75, true);
        addShape(new THREE.TetrahedronGeometry(1, 0), 2.0, -3.5, -2.0, 1.0, false);
        if (!isMobile) {
          addShape(new THREE.IcosahedronGeometry(1, 0), 0.5, 3.8, -4.0, 0.65, true);
          addShape(new THREE.OctahedronGeometry(1, 0), -1.5, -3.2, -3.0, 0.55, false);
        }

        // Floating particles
        const count = isMobile ? 60 : 120;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          pos[i * 3 + 0] = (Math.random() - 0.5) * 24;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
          pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 4;
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
        scene.add(
          new THREE.Points(
            pGeo,
            new THREE.PointsMaterial({ color: 0x7cc4e8, size: 0.07, transparent: true, opacity: 0.45 })
          )
        );

        let targetCamY = 0;
        let currentCamY = 0;

        const onScroll = () => {
          const heroH = window.innerHeight;
          const progress = Math.min(window.scrollY / heroH, 1);
          targetCamY = -progress * 2.5;
        };

        const onResize = () => {
          const nw = window.innerWidth;
          const nh = window.innerHeight;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onResize);
        removeListeners = () => {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onResize);
        };

        let elapsed = 0;
        let lastTime = performance.now();

        const animate = () => {
          animId = requestAnimationFrame(animate);
          const now = performance.now();
          elapsed += (now - lastTime) / 1000;
          lastTime = now;
          const t = elapsed;

          for (const { mesh, rx, ry, rz } of shapes) {
            mesh.rotation.x += rx;
            mesh.rotation.y += ry;
            mesh.rotation.z += rz;
          }

          currentCamY += (targetCamY - currentCamY) * 0.04;
          camera.position.y = currentCamY;
          camera.position.x = Math.sin(t * 0.08) * 0.4;
          camera.lookAt(0, currentCamY * 0.5, 0);

          renderer.render(scene, camera);
        };

        animate();
      } catch {
        // Three.js failed silently — hero remains fully visible
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
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
