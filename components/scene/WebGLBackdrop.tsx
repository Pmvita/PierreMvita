"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScrubContext } from "@/components/layout/ScrubProvider";

/**
 * Four layered depth system behind .site-content.
 *
 *  1. Background blueprint grid  — faint steel grid plane (turns on near hero)
 *  2. Isometric wireframe box    — brass wireframe ISO cube, auto-rotating
 *  3. Floating brass particles   — small lit point field, slow drift
 *  4. Atmosphere mesh            — faint transparent sphere, backface
 *
 * Interaction:
 *  - cursor x/y → wireframe tilt + grid skew
 *  - scroll     → camera lerp (scroll lift)
 *  - scrub      → depth lift + layer opacity breathing
 *  - prefers-reduced-motion → static fallback only, no loop
 */
export function WebGLBackdrop({ scrub = 0 }: { scrub?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const targetScrubRef = useRef(0);

  // Debounce scrub so fast scrolling doesn't fight the renderer
  useEffect(() => {
    if (scrub === targetScrubRef.current) return;
    targetScrubRef.current = scrub;
  }, [scrub]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      // Static fallback: deep steel ground + faint brass grid, no loop
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = "#0c0c10";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "rgba(201, 162, 39, 0.07)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 80) {
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
        }
        for (let y = 0; y < canvas.height; y += 80) {
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
        }
        ctx.stroke();
      }
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0c10, 0.06);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      80
    );
    camera.position.set(0, 0, 12);

    // ── Layer 1: background blueprint grid ───────────────────────────────
    const grid = new THREE.GridHelper(24, 48, 0xc9a227, 0x1a1812);
    grid.material.transparent = true;
    grid.material.opacity = 0.28;
    scene.add(grid);

    // ── Layer 2: isometric wireframe brass box ───────────────────────────
    const boxGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const edges = new THREE.EdgesGeometry(boxGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.45,
    });
    const wireframe = new THREE.LineSegments(edges, wireMat);
    scene.add(wireframe);

    // ── Layer 3: floating brass particles ────────────────────────────────
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i += 1) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 36;
      positions[i3 + 1] = Math.random() * 22 - 4;
      positions[i3 + 2] = (Math.random() - 0.5) * 24;
      const base = new THREE.Color(0xc9a227);
      const bright = new THREE.Color(0xe8c96a);
      const mixed = base.clone().lerp(bright, Math.random() * 0.4);
      colors[i3] = mixed.r;
      colors[i3 + 1] = mixed.g;
      colors[i3 + 2] = mixed.b;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // ── Layer 4: atmosphere mesh ─────────────────────────────────────────
    const sphereGeo = new THREE.SphereGeometry(3.8, 24, 16);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0xc9a227,
      transparent: true,
      opacity: 0.04,
      depthWrite: false,
      side: THREE.BackSide,
    });
    const atmosphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(atmosphere);

    // ── Interaction ──────────────────────────────────────────────────────
    const target = { x: 0, y: 0, scroll: 0 };
    const onMove = (event: PointerEvent) => {
      target.x = event.clientX / window.innerWidth - 0.5;
      target.y = event.clientY / window.innerHeight - 0.5;
    };
    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      target.scroll = window.scrollY / max;
    };
    const onResize = () => {
      const { innerWidth, innerHeight } = window;
      renderer.setSize(innerWidth, innerHeight, false);
      camera.aspect = innerWidth / innerHeight;
      camera.updateProjectionMatrix();
    };

    onResize();
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    const tick = () => {
      const ss = targetScrubRef.current;

      // Grid breathing + slow drift
      grid.rotation.y += ss * 0.0004;
      grid.rotation.x = THREE.MathUtils.lerp(
        grid.rotation.x,
        target.y * 0.08,
        0.04
      );

      // Wireframe auto-rotation + cursor tilt
      wireframe.rotation.y += 0.0035;
      wireframe.rotation.x = THREE.MathUtils.lerp(
        wireframe.rotation.x,
        target.y * 0.15 + ss * 0.2,
        0.04
      );
      wireframe.rotation.z = THREE.MathUtils.lerp(
        wireframe.rotation.z,
        target.x * 0.08,
        0.04
      );

      // Camera: scroll lift + scrub depth
      const lift = ss * 1.8;
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        -target.scroll * 1.8 - lift,
        0.04
      );
      camera.position.x = THREE.MathUtils.lerp(
        camera.position.x,
        target.x * 1.2,
        0.03
      );
      camera.lookAt(0, 0, 0);

      // Layer opacities / fog
      const opacity = THREE.MathUtils.lerp;
      grid.material.opacity = opacity(
        grid.material.opacity,
        0.28 + ss * 0.32,
        0.04
      );
      wireMat.opacity = opacity(wireMat.opacity, 0.45 + ss * 0.35, 0.04);
      pMat.opacity = opacity(pMat.opacity, 0.55 + ss * 0.25, 0.04);
      sphereMat.opacity = opacity(
        sphereMat.opacity,
        0.04 + ss * 0.08,
        0.04
      );

      const fog = scene.fog;
      if (fog) {
        // @ts-ignore
        const fe2 = fog as THREE.FogExp2;
        fe2.density = opacity(fe2.density, 0.06 + ss * 0.04, 0.04);
      }

      renderer.render(scene, camera);
    };
    const frameId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      grid.material.dispose();
      edges.dispose();
      wireMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
