"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScrubContext } from "@/components/layout/ScrubProvider";

/**
 * Five layered depth system behind .site-content.
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

  // ── Build procedural cloud texture once ──────────────────────────────
  function buildCloudTexture(): THREE.Texture {
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, size, size);

    // Draw overlapping cloud wisps, then blur for soft edges
    const w = ctx.createImageData(size, size);
    for (let y = 0; y < size; y += 4) {
      for (let x = 0; x < size; x += 4) {
        const px = x + (Math.random() - 0.5) * 40;
        const py = y + (Math.random() - 0.5) * 40;
        const r = 8 + Math.random() * 16;
        const a = 0.15 + Math.random() * 0.35;
        const dx = x - px;
        const dy = y - py;
        const d = Math.sqrt(dx * dx + dy * dy);
        const alpha = Math.max(0, 1 - (d / r) ** 1.5) * a;
        if (alpha > 0) {
          const i = (py * size + px) * 4;
          w.data[i] = 255;
          w.data[i + 1] = 255;
          w.data[i + 2] = 255;
          w.data[i + 3] = Math.min(255, Math.round(alpha * 255));
        }
      }
    }
    ctx.putImageData(w, 0, 0);
    ctx.filter = "blur(6px)";
    ctx.drawImage(canvas, 0, 0, size, size);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = 4;
    return texture;
  }

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

    // ── Layer 5: interactive cloud field ─────────────────────────────────
    const cloudTex = buildCloudTexture();
    const cloudCount = 4;
    const clouds: THREE.Mesh[] = [];
    const cloudMaterials: THREE.Material[] = [];
    const cloudPositions: THREE.Vector3[] = [];
    const cloudRotations: THREE.Euler[] = [];
    const cloudSpeeds: number[] = [];
    const cloudScales: THREE.Vector3[] = [];

    for (let i = 0; i < cloudCount; i += 1) {
      const zDepth = -3 - i * 1.5;
      const scale = 6 + i * 1.8;
      const speed = 0.003 + i * 0.0012;
      const driftOffset = (i % 3) * 2.2;

      const geo = new THREE.PlaneGeometry(scale, scale * 0.45);
      const mat = new THREE.MeshStandardMaterial({
        map: cloudTex,
        transparent: true,
        opacity: 0.35,
        depthWrite: false,
        side: THREE.DoubleSide,
        roughness: 0.8,
        metalness: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((driftOffset + i * 1.7) % 12, (i - 1.5) * 0.7, zDepth);
      mesh.rotation.x = -0.08;
      mesh.rotation.y = i * 0.5;
      mesh.scale.set(1, 1, 1);

      scene.add(mesh);

      clouds.push(mesh);
      cloudMaterials.push(mat);
      cloudPositions.push(mesh.position);
      cloudRotations.push(mesh.rotation);
      cloudSpeeds.push(speed);
      cloudScales.push(mesh.scale);
    }

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

      // ── Cloud field animation ──────────────────────────────────────────
      for (let i = 0; i < clouds.length; i += 1) {
        const mesh = clouds[i];
        const speed = cloudSpeeds[i];
        const drift = cloudPositions[i];
        const rot = cloudRotations[i];
        const scale = cloudScales[i];

        // Base drift: clouds move left→right slowly, synced with scrub
        const baseX = Math.sin(ss * 0.8 + i * 1.2) * 0.002;

        // Cursor-driven tilt + yaw
        const tiltY = target.y * 0.12 + ss * 0.15;
        const tiltX = target.x * 0.06;

        // Scroll-driven depth movement
        const depthOffset = (i - 1.5) * 0.0006 * target.scroll;

        // Update position
        drift.x =
          Math.sin(ss * 0.6 + i * 1.5) * 0.02 +
          target.x * 0.04 +
          depthOffset;
        drift.y = Math.sin(ss * 0.4 + i * 0.9) * 0.015 + target.y * 0.02;
        drift.z = -3 - i * 1.5 - ss * 0.05 + target.scroll * 0.04;

        // Update rotation (tilt with cursor, sway with drift)
        rot.x = -0.08 - target.y * 0.06 + ss * 0.01;
        rot.y = i * 0.5 + target.x * 0.04 + ss * 0.008;
        rot.z += (target.x * 0.02 + ss * 0.001);

        // Cloud opacity breathing with scrub
        const opacity = 0.32 + ss * 0.16;
        cloudMaterials[i].opacity = THREE.MathUtils.lerp(
          cloudMaterials[i].opacity,
          opacity,
          0.04
        );

        // Cloud scale: near clouds appear larger (with scrub depth)
        const scaleVal = 1 + ss * 0.12 + target.scroll * 0.0004;
        scale.set(
          scaleVal,
          1 + ss * 0.12 + target.scroll * 0.0004,
          1
        );
      }

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
      cloudTex.dispose();
      for (let i = 0; i < clouds.length; i += 1) {
        const mesh = clouds[i];
        mesh.geometry.dispose();
        cloudMaterials[i].dispose();
      }
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
