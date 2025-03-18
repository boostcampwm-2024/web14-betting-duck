import { Mesh } from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  OrthographicCamera,
} from "@react-three/drei";
import { Physics, usePlane } from "@react-three/cannon";
import { lazy, memo, Suspense, useCallback, useEffect, useState } from "react";

const FallingDuck = lazy(() => import("./FallingDuck"));

const Ground = memo(() => {
  const [ref] = usePlane<Mesh>(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -6.5, 0],
    type: "Static",
    material: {
      friction: 0.5,
      restitution: 0.7,
    },
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <circleGeometry args={[16, 16]} />
      <meshStandardMaterial
        color={"#80aae9"}
        roughness={0.2}
        metalness={0.05}
      />
    </mesh>
  );
});

function Pond({ realDuck }: { realDuck: number }) {
  const [envMap, setEnvMap] = useState<string | null>(null);
  const [duckModels, setDuckModels] = useState([FallingDuck]);

  const addDuck = useCallback((count: number, remainDucks: number) => {
    if (count >= remainDucks) return;
    const timer = setTimeout(() => {
      setDuckModels((prevDucks) => [...prevDucks, FallingDuck]);
      addDuck(count + 1, remainDucks);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const remainDucks = realDuck - duckModels.length;
    if (remainDucks <= 0) return;

    const initialTimer = setTimeout(() => {
      addDuck(0, remainDucks);
    }, 1000);

    return () => clearTimeout(initialTimer);
  }, [realDuck, duckModels.length, addDuck]);

  useEffect(() => {
    (async () => {
      const env = await import(
        "@assets/models/industrial_sunset_puresky_4k.hdr"
      );
      setEnvMap(env.default);
    })();
  }, []);

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
          {duckModels.map((DuckComponent, index) => (
            <DuckComponent key={index} />
          ))}
          <Ground />
        </Physics>
      </Suspense>
      {envMap && <Environment files={envMap} />}
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

export default Pond;
