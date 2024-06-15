import { useLoader } from "@react-three/fiber";
import React, { useEffect } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

// "2020 Chevrolet Corvette C8 Stingray" (https://skfb.ly/oVE6P) by RBLXSupercars is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).

export default function Car() {
	// const gltf = useLoader(GLTFLoader, "/Models/Car/scene.gltf");
	const gltf = useLoader(GLTFLoader, "/Models/Corvette/scene.gltf");
	// const gltf = useLoader(GLTFLoader, "/Models/Corvette/scene.gltf");

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
	return <primitive object={gltf.scene} />;
}
