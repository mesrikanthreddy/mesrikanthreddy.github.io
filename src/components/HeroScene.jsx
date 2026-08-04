import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { TextureLoader, SRGBColorSpace } from 'three'

function KalkiPlane({ src, pointer, reducedMotion }) {
  const meshRef = useRef(null)
  const texture = useLoader(TextureLoader, src)
  texture.colorSpace = SRGBColorSpace

  useFrame((state) => {
    const mesh = meshRef.current
    if (!mesh) return
    const t = state.clock.getElapsedTime()

    const idleX = reducedMotion ? 0 : Math.sin(t * 0.12) * 0.05
    const idleY = reducedMotion ? 0 : Math.cos(t * 0.09) * 0.04
    const idleZoom = reducedMotion ? 0 : Math.sin(t * 0.07) * 0.03

    const targetRotY = idleX + pointer.current.x * 0.18
    const targetRotX = idleY - pointer.current.y * 0.12
    const targetScale = 1.08 + idleZoom + Math.abs(pointer.current.x) * 0.015

    mesh.rotation.y += (targetRotY - mesh.rotation.y) * 0.05
    mesh.rotation.x += (targetRotX - mesh.rotation.x) * 0.05
    mesh.scale.x += (targetScale - mesh.scale.x) * 0.05
    mesh.scale.y += (targetScale - mesh.scale.y) * 0.05
    mesh.position.x += (pointer.current.x * 0.25 - mesh.position.x) * 0.05
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2.6, 2.6]} />
      <meshStandardMaterial map={texture} roughness={0.85} metalness={0} />
    </mesh>
  )
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#8493ac" />
      <directionalLight position={[2.5, 2, 3]} intensity={1.4} color="#e3a857" />
      <directionalLight position={[-2, -1, 2]} intensity={0.5} color="#e8632b" />
    </>
  )
}

export default function HeroScene({ webpSrc, reducedMotion, onContextLost }) {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion) return
    const onMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reducedMotion])

  return (
    <Canvas
      className="hero-canvas"
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 3], fov: 42 }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0)
        gl.domElement.addEventListener('webglcontextlost', (e) => {
          e.preventDefault()
          onContextLost?.()
        })
      }}
      aria-hidden="true"
    >
      <Lights />
      <KalkiPlane src={webpSrc} pointer={pointer} reducedMotion={reducedMotion} />
    </Canvas>
  )
}
