import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";


//Draw a cube box
function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[1, 1, 1]}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry />

      <meshLambertMaterial color={hovered ? "purple" : "orange"} />
    </mesh>
  );
}

//Draw sphere
function Sphere(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh}>
      <sphereGeometry
        attach="geometry"
        args={[1, 22, 50]} // Width, Height and Depth of the sphere
        smoothness={5} // Optional, number of subdivisions
        {...props}
      />

      <meshPhongMaterial
        color="darkred"
        attach="material"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}


//Draw Circle
function CircleShape(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.x += 0.01;
  });

  return (
    <mesh ref={mesh} scale={[3, 3, 3]}>
      <circleBufferGeometry attach="geometry" args={[0.5, 100]} />

      <meshNormalMaterial attach="material" />
    </mesh>
  );
}

//Draw Cone
function ConeShape(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef();

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.y = mesh.current.rotation.x -= 0.01;
  });

  return (
    <mesh ref={mesh} position={[3.5, -0.5, 0]} scale={(0.5, 0.5, 0.8)}>
      <coneGeometry
        attach="geometry"
        args={[1, 2.5, 3]} // Width, Height and Depth of the cone
        smoothness={5} // Optional, number of subdivisions
        {...props}
      />

      <meshPhongMaterial
        color="green"
        attach="material"
        transparent
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

//Main App component 
export default function App() {
  
  return (
    
    <Canvas>
 
      <OrbitControls />
      <Stars />

      <ambientLight intensity={0.4} />
      <spotLight position={[30, 30, 10]} />
      <Box position={[-3.5,-0.4, 0]} />
      <Sphere position={[1.2, 0, 0]} />
      <CircleShape position={[1.2, 0, 0]} />
      <ConeShape />
    </Canvas>
  );
}
