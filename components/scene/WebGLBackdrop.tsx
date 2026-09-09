"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"

export function WebGLBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (reduced.matches) return

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setClearColor(0x000000, 0)

    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x070705, 0.085)

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      80,
    )
    camera.position.set(0, 0, 10)

    const count = 1600
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const gold = new THREE.Color("#d4af5a")
    const warm = new THREE.Color("#f4f0e6")

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 28
      positions[i3 + 1] = (Math.random() - 0.5) * 18
      positions[i3 + 2] = (Math.random() - 0.5) * 16
      const mixed = gold.clone().lerp(warm, Math.random() * 0.45)
      colors[i3] = mixed.r
      colors[i3 + 1] = mixed.g
      colors[i3 + 2] = mixed.b
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.045,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const target = { x: 0, y: 0, scroll: 0 }
    const onMove = (event: PointerEvent) => {
      target.x = (event.clientX / window.innerWidth - 0.5) * 0.8
      target.y = (event.clientY / window.innerHeight - 0.5) * 0.4
    }
    const onScroll = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1)
      target.scroll = window.scrollY / max
    }
    const onResize = () => {
      const { innerWidth, innerHeight } = window
      renderer.setSize(innerWidth, innerHeight, false)
      camera.aspect = innerWidth / innerHeight
      camera.updateProjectionMatrix()
    }

    onResize()
    onScroll()
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onResize)

    let frame = 0
    const tick = () => {
      frame = window.requestAnimationFrame(tick)
      points.rotation.y += 0.00045
      points.rotation.x = THREE.MathUtils.lerp(
        points.rotation.x,
        target.y * 0.15 + target.scroll * 0.35,
        0.04,
      )
      points.rotation.z = THREE.MathUtils.lerp(
        points.rotation.z,
        target.x * 0.08,
        0.04,
      )
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, target.x * 1.2, 0.03)
      camera.position.y = THREE.MathUtils.lerp(
        camera.position.y,
        -target.scroll * 1.6,
        0.04,
      )
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    tick()

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  )
}
