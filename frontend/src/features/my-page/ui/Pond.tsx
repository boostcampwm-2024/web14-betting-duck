import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  OrthographicCamera,
} from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";
import { Suspense } from "react";

function Ground({ color = "#f0f4fa" }: { color?: string }) {
  const [ref] = usePlane<THREE.Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2.5, 0],
    type: "Static",
    material: {
      friction: 0.5,
      restitution: 0.7,
    },
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <circleGeometry args={[16, 16]} />
      <meshStandardMaterial color={color} roughness={0.2} metalness={0.05} />
    </mesh>
  );
}

function Pond({ ducks }: { ducks: React.ElementType[] }) {
  return (
    <Canvas shadows gl={{ antialias: false }} dpr={[1, 1.5]}>
      <OrthographicCamera
        makeDefault
        zoom={32}
        position={[5.2, 1.0, 7.0]}
        near={-1000}
        far={1000}
      />
      <color attach="background" args={["#f0f4fa"]} />
      <fog attach="fog" args={["#f0f4fa", 80, 100]} />
      <ambientLight intensity={0.6} />
      <directionalLight
        castShadow
        intensity={1.5}
        position={[10, 8, 6]}
        shadow-mapSize={[1024, 1024]}
        color={"#ffffff"}
      >
        <orthographicCamera
          attach="shadow-camera"
          left={-20}
          right={20}
          top={20}
          bottom={-20}
        />
      </directionalLight>
      <Suspense fallback={null}>
        <Physics
          iterations={15}
          gravity={[0, -9.81, 0]}
          defaultContactMaterial={{
            friction: 0.5,
            restitution: 0.3,
          }}
        >
          {ducks.map((DuckComponent, index) => (
            <DuckComponent key={index} />
          ))}
          <Ground color="#80aae9" />
        </Physics>
      </Suspense>
      <Environment
        files={"/src/assets/models/industrial_sunset_puresky_4k.hdr"}
      />
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.9}
        makeDefault
        enableRotate={false}
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}

export { Pond };
