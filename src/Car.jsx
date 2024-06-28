import { useFrame, useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

// "2020 Chevrolet Corvette C8 Stingray" (https://skfb.ly/oVE6P) by RBLXSupercars is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

export default function Car() {
	// const gltf = useLoader(GLTFLoader, "/Models/Car/scene.gltf");
	const gltf = useLoader(GLTFLoader, "/Models/Corvette/scene.gltf");
	// const gltf = useLoader(GLTFLoader, "/Models/Corvette/scene.gltf");

	// front right wheel 131;
	// front right tyre 135,137;
	// front right rim 139;

	// front left wheel 148;
	// front left tyre 152/154;
	// front left rim 139;

	// back right wheel 159;
	// back right tyre 163/165;
	// back right rim 167;

	// back left wheel 170;
	// back left tyre 174/176;
	// back left rim 178;

	useEffect(() => {
		console.log(gltf);

		gltf.scene.scale.set(0.9, 0.9, 0.9);
		gltf.scene.position.set(0, -0.035, 0);
		gltf.scene.traverse((obj) => {
			if (obj instanceof Mesh) {
				obj.castShadow = true;
				obj.receiveShadow = true;
				obj.material.envMapIntensity = 20;
			}
		});
	}, [gltf]);

	useFrame((state) => {
		let t = state.clock.getElapsedTime() * -2;
		const group =
			gltf.scene.children[0].children[0].children[0].children[0].children[0]
				.children[0];

		let FR = group.children[3];
		let FL = group.children[6];
		let RR = group.children[7];
		let RL = group.children[8];

		FR.rotation.x = t;
		FL.rotation.x = t;
		RR.rotation.x = t;
		RL.rotation.x = t;

		FR.children[4].rotation.x = -t;
		FL.children[4].rotation.x = -t;
		RR.children[4].rotation.x = -t;
		RL.children[4].rotation.x = -t;

		let MM = group.children[0].children[11].children[2].children[2];
		console.log(MM, "group");
	});

	return <primitive object={gltf.scene} />;
}
