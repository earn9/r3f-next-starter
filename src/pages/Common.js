import * as THREE from 'three'
import React, { useRef, useState, Component } from 'react'
import { useFrame, Canvas, extend } from 'react-three-fiber'
import { animated, useSpring } from 'react-spring/three'
import glsl from "babel-plugin-glsl/macro"
import {shaderMaterial} from 'drei'

const ColorDepthMaterial = shaderMaterial(
  { opacity: 1. },
  // fragment shader
  glsl`
    #include <common>
    varying float fogDepth;
    void main() {
      
      #include <begin_vertex>
      #include <project_vertex>
      fogDepth = -mvPosition.z;
    }
  `,
  glsl`
    uniform float opacity;
    varying float fogDepth;
    void main() {
      float fogFactor = 1.0 - exp( - 0.05 * fogDepth * fogDepth );
      gl_FragColor = vec4( vec3( 1.0 ) * fogFactor, opacity );
    }
  `
)

extend({ ColorDepthMaterial })

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const mat = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(0)
  let pathname = window.appHistory.location.pathname

  const { scale, opacity, position } = useSpring({
    opacity: pathname === '/about' ? .5 : .1,
    scale: pathname === '/about' ? .15 : 1,
    position: pathname === '/about' ? -2.5 : -1,
    config: {
      // tension: 140,
      friction: 60
    }
  })

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.005
    mat.current.uniforms.opacity.value = opacity.value
  })

  return (
    <animated.mesh
      {...props}
      ref={mesh}
      scale-x={scale}
      scale-y={scale}
      scale-z={scale}
      position-z={position}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <torusKnotBufferGeometry attach="geometry" args={[1., .25, 100, 16]} />
      <colorDepthMaterial ref={mat} attach="material" color="hotpink" transparent={true} time={1} />
    </animated.mesh>
  )
}

function Plane(props) {
  // This reference will give us direct access to the mesh
  // Set up state for the hovered and active state
  let pathname = window.appHistory.location.pathname

  const { color } = useSpring({
    color: pathname === '/about' ? 'red' : 'green',
  })
  console.log(color)
  return (
    <animated.mesh
      {...props}
        rotation-x={Math.PI / 2}
        side={THREE.DoubleSide}
      >
      <planeBufferGeometry attach="geometry" args={[10, 10]} />
      <meshBasicMaterial attach="material" color={color}/>
    </animated.mesh>
  )
}

export default function Common(props) {
  let pathname = window.appHistory.location.pathname
  return (
    <Canvas
      colorManagement
      onCreated={({ gl }) => gl.setClearColor('#888')}
      style={{ position: 'fixed', top: 0 }}
      noEvents
      pixelRatio={1}
      camera={{ position: [0, 0, -3.], far: 100 }}
      gl={{ powerPreference: 'high-performance', alpha: false, antialias: false, stencil: false }}>
      <Plane position={[0, 0, -2.5]} />

      <Box position={[0, 0, -2.5]} />
    </Canvas>
  )
}
