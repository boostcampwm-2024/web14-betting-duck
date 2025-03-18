import { Group } from "three";
import { useBox } from "@react-three/cannon";
import { Gltf } from "@react-three/drei";
import duckModel from "@/assets/models/betting-duck.glb";
import { memo } from "react";

const FallingDuck = memo(() => {
  const randomX = (Math.random() - 0.5) * 2;
  const randomZ = (Math.random() - 0.5) * 2;

  const [ref] = useBox(() => ({
    mass: 1,
    position: [randomX, 5, randomZ],
    rotation: [Math.random() * 0.2, Math.random() * 0.2, Math.random() * 0.2],
    linearDamping: 0.4,
    angularDamping: 0.4,
    material: {
      friction: 0.3,
      restitution: 0.3,
    },
  }));

  return (
    <Gltf
      ref={ref as React.RefObject<Group>}
      castShadow
      receiveShadow
      src={duckModel}
    />
  );
});

export default FallingDuck;
