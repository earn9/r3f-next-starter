## Demo :

[https://r3f-next-starter.vercel.app/](https://r3f-next-starter.vercel.app/)

## How to use

```bash
yarn create r3f-app next my-app sass
```

or

```bash
npx create-r3f-app next my-app sass
```

## Available Scripts

- yarn dev
- yarn lint (Sass and Scripts)
- yarn build
- yarn start

## Stack

- Es6
- Nextjs
- Eslint
- Babel
- Scss
- Prettier
- Husky
- [Threejs](https://github.com/mrdoob/three.js/): A lightweight, 3D library with a default WebGL renderer. The library also provides Canvas 2D, SVG and CSS3D - renderers in the examples.
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber): A React renderer for Threejs on the web and react-native.
- [drei](https://github.com/pmndrs/drei): A growing collection of useful helpers and abstractions for react-three-fiber.
- Post processing
- React Devices Detect

## features

- Code Splitting
- Canvas content and DOM loaded by page
- Custom loading

### Todo :

- enable dom events + share events between main dom and canvas + useScroll and useGesture by default
- PWA
- Add heads
- Zustand ?
- useGesture example
- Basic helpers folder
- Clean shaders in helpers example
- Use use-asset repo to prefetch assets
- Update architecture based on sharing materials && geos
- Add draco && gltfjsx example
- Add Vector3().lerp() && lerpVectors() examples

- Flag React to experimental and concurrent attribut to Canvas for Double Buffering (<-- way too much unstable)
- other lib for anim ?
- Make bash scripts for git && deploy

#### Deluxe Todo :

- Camera custom tracker with 2 depth
- Camera animation
- Improve Blender python script with GUI
- Blender + Camera.blend + Python scripts
- Make bash script to automate blender
