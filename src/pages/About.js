import React, { useRef, useState, Component } from 'react'
import { shaderMaterial, Text } from 'drei'
import { useFrame, Canvas, extend } from 'react-three-fiber'
import glsl from "babel-plugin-glsl/macro"

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
  const [active, setActive] = useState(false)
  const [hovered, setHover] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
    mat.current.uniforms.opacity.value = hovered ? .5 : 1.
  })

  return (
    <mesh
      {...props}
      onClick={(e) => {setActive(!active); window.appHistory.push("/")}}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      ref={mesh}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      {/* <customDepthMaterial
        attach="material"
        transparent={true}

        opacity={hovered ? '.6' : '1.'}
      /> */}
      <colorDepthMaterial ref={mat} attach="material" color="hotpink" transparent={true} time={1} />
      {/* <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} /> */}
    </mesh>
  )
}

function Font() {
  return (
    <Text
      glyphGeometryDetail={32}
      font="https://fonts.gstatic.com/s/merriweather/v21/u-4l0qyriQwlOrhSvowK_l5-eR7NWMf8.woff"
      fontSize={.5}
      letterSpacing={-0.075}
      lineHeight={0.8}
      color={0x111111}
      position={[0, 2, 1]}>
      {'Click on the cube to go back'}
    </Text>
  )
}

export default function About() {
  return (
    <Canvas colorManagement position={0, 0, -5} style={{ position: 'absolute', top: 0 }}>
      <Box position={[0, -1.5, 2.]}/>
      <Font/>
    </Canvas>
  )
}

