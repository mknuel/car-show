import { Suspense, useState } from "react";
 import reactLogo from "./assets/react.svg";
 import viteLogo from "/vite.svg";
 import "./App.css";
 import { Canvas } from "@react-three/fiber";
 import {
		CubeCamera,
		Environment,
		OrbitControls,
		PerspectiveCamera,
 } from "@react-three/drei";
 import Ground from "./Ground";
 import Car from "./Car";
 import Rings from "./Rings";
import Boxes from "./Boxes";

import {
	EffectComposer,
	Bloom,
	ChromaticAberration,
} from "@react-three/postprocessing";

import { BlendFunction } from "postprocessing";
import FloatingGrid from "./FloatingGrid";
const CarShow = () => {
	return (
		<>
			<OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} />
			<PerspectiveCamera makeDefault fov={50} position={[-3, 2, -5]} />

			{/* bg color */}
			<color args={[0, 0, 0]} attach={"background"} />

			{/* car */}
			<CubeCamera resolution={256} frames={Infinity}>
				{(texture) => (
					<>
						<Environment map={texture} />
						<Car />
					</>
				)}
			</CubeCamera>

			{/* rings */}
			<Rings />

			{/* <ambientLight intensity={0.1} /> */}

			{/* spotlight */}
			<spotLight
				color={[1, 0.25, 0.7]}
				intensity={1.5}
				angle={0.6}
				penumbra={0.5}
				position={[5, 3, 0]}
				castShadow
				shadow-bias={-0.0001}
			/>

			{/* spotlight */}
			<spotLight
				color={[0.14, 0.5, 1]}
				intensity={2}
				angle={0.6}
				penumbra={0.5}
				position={[-5, 3, 0]}
				castShadow
				shadow-bias={-0.0001}
			/>
			<FloatingGrid />
			{/* 	<pointLight
				color={0xffffff}
				intensity={3} // Adjust this value to make the light brighter or dimmer
				distance={10} // Adjust the distance to cover the desired area
				decay={2} // How the light dims with distance, adjust as needed
				position={[0, 5, 0]} // Position the light at the center (or above)
				// castShadow
			/> */}
			<Boxes />

			<Ground />

			<EffectComposer>
				<Bloom
					blendFunction={BlendFunction.ADD}
					intensity={1.3} // Adjust the bloom intensity
					width={300} // Render width
					height={300} // Render height
					kernelSize={5} // Blur kernel size
					luminanceThreshold={0.15} // Threshold to start applying bloom
					luminanceSmoothing={0.025} // Smooth transition from the threshold
				/>
				<ChromaticAberration
					blendFunction={BlendFunction.NORMAL} // Normal blending mode
					offset={[0.0005, 0.0012]} // Adjust the strength of the effect
				/>
			</EffectComposer>
		</>
	);
};

function App() {
	return (
		<Suspense fallback={null}>
			<Canvas shadows>
				<CarShow />
			</Canvas>
		</Suspense>
	);
}

export default App;
