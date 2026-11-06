"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import type { Mesh } from "three";

function Orb() {
  const ref = useRef<Mesh>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  useFrame((_, delta) => {
    if (!ref.current || reducedMotion) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.3;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.25, 2]} />
      <meshStandardMaterial color="#333333" emissive="#444444" emissiveIntensity={0.65} roughness={0.28} metalness={0.55} wireframe />
    </mesh>
  );
}

export default function AIAgentScene() {
  return (
    <div className="h-40 w-full overflow-hidden rounded-[1.5rem] border border-[#dddddd] bg-[#f7f7f7]">
      <Canvas camera={{ position: [0, 0, 3.4] }} dpr={[1, 1.5]}>
        <ambientLight intensity={1.1} />
        <pointLight position={[2, 2, 3]} color="#dddddd" intensity={8} />
        <Orb />
      </Canvas>
    </div>
  );
}

