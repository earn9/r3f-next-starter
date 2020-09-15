import * as THREE from 'three'
import React, { Suspense, useEffect, useRef, useState, useCallback, useLayoutEffect } from 'react'
import { Canvas, useThree, useFrame, useLoader } from 'react-three-fiber'
import { Flex, Box, useFlexSize } from 'react-three-flex'
import { Loader } from 'drei/prototyping/Loader'
import Effects from '../components/Effects'
import Text from '../components/Text'
import state from '../state'

function Page({ text, tag, images, textScaleFactor, onReflow, left = false }) {
  const textures = useLoader(THREE.TextureLoader, images)
  const { viewport } = useThree()
  const boxProps = {
    centerAnchor: true,
    grow: 1,
    marginTop: 1,
    marginLeft: left * 1,
    marginRight: !left * 1,
    width: '1',
    height: 'auto',
    minWidth: 3,
    minHeight: 3,
    maxWidth: 6,
    maxHeight: 6,
  }
  return (
    <Box dir="column" align={left ? 'flex-start' : 'flex-end'} justify="flex-start" width="100%" height="auto" minHeight="100%">
      <HeightReporter onReflow={onReflow} />
      <Box dir="row" width="100%" height="auto" justify={left ? 'flex-end' : 'flex-start'} margin={0} grow={1} wrap="wrap">
        {textures.map((texture, index) => (
          <Box key={index} {...boxProps}>
            {(width, height) => (
              <mesh>
                <planeBufferGeometry attach="geometry"  args={[width, width]} />
                <meshBasicMaterial map={texture} attach="material" toneMapped={false} />
              </mesh>
            )}
          </Box>
        ))}
      </Box>

      <Box marginLeft={left ? 1.5 : 1} marginRight={left ? 1 : 1.5} marginBottom={1}>
        <Text
          bold
          position-z={0.5}
          textAlign={left ? 'left' : 'right'}
          fontSize={1.5 * textScaleFactor}
          lineHeight={1}
          letterSpacing={-0.05}
          color="black"
          maxWidth={(viewport.width / 4) * 3}>
          {text}
        </Text>
      </Box>
    </Box>
  )
}

function HeightReporter({ onReflow }) {
  const size = useFlexSize()
  useLayoutEffect(() => onReflow && onReflow(...size), [onReflow, size])
  return null
}

function Content({onReflow }) {

  const group = useRef()
  const { viewport, size } = useThree()
  const vec = new THREE.Vector3()
  const pageLerp = useRef(state.top / size.height)
  useFrame(() => {
    const page = (pageLerp.current = THREE.MathUtils.lerp(pageLerp.current, state.top / size.height, 0.15))
    const y = page * viewport.height
    const sticky = state.threshold * viewport.height
    group.current.position.lerp(vec.set(0, page < state.threshold ? y : sticky, page < state.threshold ? 0 : page * 1.25), 0.15)
  })
  const handleReflow = useCallback((w, h) => onReflow((state.pages = h / viewport.height)), [onReflow, viewport.height])
  const sizesRef = useRef([])
  const scale = Math.min(1, viewport.width / 16)

  return (
    <group ref={group}>
      <Flex dir="column" position={[-viewport.width / 2, viewport.height / 2, 0]} size={[viewport.width, viewport.height, 0]} onReflow={handleReflow}>
        {state.content.map((props, index) => (
          <Page
            key={index}
            left={!(index % 2)}
            textScaleFactor={scale}
            onReflow={(w, h) => {
              sizesRef.current[index] = h
              state.threshold = Math.max(4, (4 / (15.8 * 3)) * sizesRef.current.reduce((acc, e) => acc + e, 0))
            }}
            {...props}
          />
        ))}
      </Flex>
    </group>
  )
}

export default function Home (props) {
  const scrollArea = useRef()
  const onScroll = (e) => (state.top = e.target.scrollTop)
  useEffect(() => void onScroll({ target: scrollArea.current }), [])
  const [pages, setPages] = useState(0)
  return (
    <>
      <Canvas
        concurrent
        colorManagement
        shadowMap
        noEvents
        pixelRatio={1.5}
        camera={{ position: [0, 0, 10], far: 1000 }}
        gl={{ powerPreference: 'high-performance', antialias: false, stencil: false, depth: false }}>
        <Suspense fallback={null}>
          <Content onReflow={setPages} />
        </Suspense>
        <Effects />
      </Canvas>
      <div
        className="scrollArea"
        ref={scrollArea}
        onScroll={onScroll}
        onPointerMove={(e) => (state.mouse = [(e.clientX / window.innerWidth) * 2 - 1, (e.clientY / window.innerHeight) * 2 - 1])}>
        <div style={{ height: `${pages * 100}vh` }} />
      </div>
    <Loader />
    </>
  )
}

