import * as THREE from 'three'
import React, { useRef, useState, Component } from 'react'
import { useFrame, Canvas, extend } from 'react-three-fiber'
import { animated, useSpring } from 'react-spring/three'
import glsl from "babel-plugin-glsl/macro"
import {shaderMaterial} from 'drei'

const ColorShiftMaterial = shaderMaterial(
  { time: 0, opacity: 1. },
  // fragment shader
  glsl`
    #include <common>
    // This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
    // Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
    // depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
    varying vec2 vHighPrecisionZW;
    void main() {
      
      #include <begin_vertex>
      #include <project_vertex>
      vHighPrecisionZW = gl_Position.zw;
    }
  `,
  glsl`
    uniform float opacity;
    varying vec2 vHighPrecisionZW;
    void main() {
      float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
      gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
    }
  `
)

extend({ ColorShiftMaterial })

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  const mat = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(0)
  let pathname = window.appHistory.location.pathname

  const { scale, color, opacity } = useSpring({
    scale:  pathname === '/about' ? .25 : 2.5,
    opacity: pathname === '/about' ? .5 : .1
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
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}>
      <torusKnotBufferGeometry attach="geometry" args={[1., .25, 100, 16]} />
      <colorShiftMaterial ref={mat} attach="material" color="hotpink" transparent={true} time={1} />
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
        side={THREE.DoubleSide}
      >
      <planeBufferGeometry attach="geometry" args={[1, 1]} />
      <meshBasicMaterial attach="material" color={color}/>
    </animated.mesh>
  )
}

export default function Common(props) {
  let pathname = window.appHistory.location.pathname
  return (
    <Canvas
      colorManagement
      onCreated={({ gl }) => gl.setClearColor('#f1f1f1')}
      style={{ position: 'fixed', top: 0 }}
      noEvents
      pixelRatio={1}
      camera={{ position: [0, 0, -3.], far: 100 }}
      gl={{ powerPreference: 'high-performance', alpha: false, antialias: false, stencil: false }}>
      <Plane />

      <Box position={[0, 0, -2.5]} />
    </Canvas>
  )
}
