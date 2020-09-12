import React, { useRef, useState, Component } from 'react'
import { Text } from 'drei'
import { useFrame, Canvas } from 'react-three-fiber'

function Icosahedron(props) {
  const mesh = useRef()

  const [active, setActive] = useState(false)
  const [hovered, setHover] = useState(false)

  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  })

  return (
    <mesh
      {...props}
      onClick={(e) => {setActive(!active); window.appHistory.push("/about")}}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      ref={mesh}>
      <icosahedronBufferGeometry attach="geometry" args={[1, 2]} />
      <meshNormalMaterial
        attach="material"
        transparent={true}
        flatShading={true}
        opacity={hovered ? '.6' : '1.'}
      />
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
      position={[0, 0, 1]}>
      {'Click on the Icosahedron to go to About'}
    </Text>
  )
}

export default class Home extends Component {
  componentDidMount() {
    this.props.handler('/')
  }
  render() {
    return (
      <Canvas colorManagement position={0, 0, -10} style={{ position: 'fixed', top: 0 }}>
        <Icosahedron position={[0, -1.5, 1.]}/>
        <Font/>
      </Canvas>
    )
  }
}

