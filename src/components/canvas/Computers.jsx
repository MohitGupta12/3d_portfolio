import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const { scene } = useGLTF("./desktop_pc/scene.gltf");

  return (
    <group>
      {/* <ambientLight intensity={1} /> */}

      <directionalLight intensity={1} position={[0, 10, 0]} castShadow />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.3}
        penumbra={1}
        intensity={100}
        castShadow={true}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight intensity={1} groundColor="black" />

      {/* Additional Point Light */}
      <pointLight intensity={1} />

      {/* Adjust the position and rotation */}
      <primitive
        object={scene}
        scale={isMobile ? 0.6 : 0.75}
        position={isMobile ? [0, -2.5, -1.85] : [0, -3.25, -1.5]}
      />
    </group>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 650px)");

    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChanges = (evt) => {
      setIsMobile(evt.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChanges);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChanges);
    };
  }, []);

  return (
    <Canvas
      shadows
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1;
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload />
    </Canvas>
  );
};

export default ComputersCanvas;
