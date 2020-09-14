import React, { useRef, useState, Component, useEffect } from 'react'
import { useFrame, Canvas } from 'react-three-fiber'
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from 'react-postprocessing'
import { animated, useSpring } from 'react-spring/three'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(0)
  
  const { scale } = useSpring({
    scale: window.appHistory.location.pathname === '/about' ? 1. : 2.
  })

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <animated.mesh
      {...props}
      ref={mesh}
      scale-x={scale}
      scale-y={scale}
      scale-z={scale}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <torusKnotBufferGeometry attach="geometry" args={[1, .25, 100, 16]} />
      <meshNormalMaterial
        attach="material"
      />
      {/* <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} /> */}
    </animated.mesh>
  )
}
export default function Common() {
  return (
    <Canvas
      colorManagement
      onCreated={({ gl }) => gl.setClearColor('#fff')}
      position={0, 0, -10}
      style={{ position: 'fixed', top: 0 }}
      gl={{ powerPreference: 'high-performance', alpha: false, antialias: false, stencil: false }}>
    >
      <Box position={[0, 0, 0]} />
    </Canvas>
  )
}
