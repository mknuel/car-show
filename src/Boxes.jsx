import { useFrame } from "@react-three/fiber";
import React, { useRef, useState } from "react";
import { Vector3 } from "three";

function Box({ color }) {
	const box = useRef();
	const time = useRef(0);
	const getInitialPosition = () => {
		let v = new Vector3(
			(Math.random() * 2 - 1) * 3,
			Math.random() * 2.5 + 0.1,
			(Math.random() * 2 - 1) * 15
		);

		if (v.x < 0) v.x -= 1.75;
		if (v.x > 0) v.x += 1.75;

		return v;
	};

	const [xRotSpeed] = useState(() => Math.random());
	const [yRotSpeed] = useState(() => Math.random());
	const [position, setPosition] = useState(getInitialPosition());
	const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);
	const resetPosition = () => {
		let v = new Vector3(
			(Math.random() * 2 - 1) * 3,
			Math.random() * 2.5 + 0.1,
			(Math.random() * 2 - 1) * 15
		);

		if (v.x < 0) v.x -= 1.75;
		if (v.x > 0) v.x += 1.75;

		setPosition(v);
	};
	useFrame(
		(state, delta) => {
			time.current -= delta * 1.2;
			let newZ = position.z - time.current;

			if (newZ > 10) {
				time.current = 0;
			}

			const slowFactor = 0.05; // Change this value to control the speed
			box.current.position.set(position.x, position.y, newZ);
			box.current.rotation.x += delta * slowFactor + xRotSpeed * slowFactor;
			box.current.rotation.y += delta * slowFactor + yRotSpeed * slowFactor;
		},
		[xRotSpeed, yRotSpeed, position]
	);

	return (
		<mesh ref={box} scale={scale} /*  position={position} */ castShadow>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={color} envMapIntensity={0.15} />
		</mesh>
	);
}

export default function Boxes() {
	return Array(100)
		.fill("")
		.map((item, index) => (
			<Box
				key={index}
				color={index % 2 === 0 ? [0.4, 0.1, 0.1] : [0.05, 0.15, 0.4]}
			/>
		));
}
