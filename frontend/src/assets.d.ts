declare module "*.glb" {
  const content: string;
  export default content;
}

declare module "*.hdr" {
  const content: string;
  export default content;
}

// 다른 에셋 타입들도 필요하다면 추가할 수 있습니다
declare module "*.gltf" {
  const content: string;
  export default content;
}
