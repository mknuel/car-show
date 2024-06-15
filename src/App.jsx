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
					intensity={0.5}
					angle={0.6}
					penumbra={0.5}
					position={[5, 5, 0]}
					castShadow
					shadow-bias={-0.0001}
				/>

				{/* spotlight */}
				<spotLight
					color={[0.14, 0.5, 1]}
					intensity={1}
					angle={0.6}
					penumbra={0.5}
					position={[-5, 5, 0]}
					castShadow
					shadow-bias={-0.0001}
				/>

				<Ground />
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
