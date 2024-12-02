import * as THREE from "three";
import { useBox } from "@react-three/cannon";
import { Gltf } from "@react-three/drei";

function FallingDuck() {
  // 약간의 랜덤 오프셋 추가 (x축과 z축에 대해)
  const randomX = (Math.random() - 0.5) * 2; // -1 ~ 1 사이의 랜덤값
  const randomZ = (Math.random() - 0.5) * 2; // -1 ~ 1 사이의 랜덤값

  const [ref] = useBox(() => ({
    mass: 1,
    position: [randomX, 5, randomZ], // 초기 위치에 랜덤값 적용
    rotation: [
      Math.random() * 0.2, // 약간의 랜덤 회전도 추가
      Math.random() * 0.2,
      Math.random() * 0.2,
    ],
    linearDamping: 0.4,
    angularDamping: 0.4,
    material: {
      friction: 0.3,
      restitution: 0.3,
    },
  }));

  return (
    <Gltf
      ref={ref as React.RefObject<THREE.Group>}
      castShadow
      receiveShadow
      src="/src/assets/models/betting-duck.glb"
    />
  );
}

export { FallingDuck };
