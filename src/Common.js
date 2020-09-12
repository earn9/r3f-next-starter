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
    scale: props.url === '/about' ? 1. : 2.
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
export default class Common extends Component {
  render() {
    return (
      <Canvas colorManagement position={0, 0, -10} style={{ position: 'fixed', top: 0 }}>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[0, 0, 0]} url={this.props.url} />
        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.2} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    )
  }
}
