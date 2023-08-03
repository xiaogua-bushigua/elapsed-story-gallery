import React, { useCallback, useState } from 'react';
import Frames from './Frames';
import Screen from './Screen';
import { useFrame } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';

const images = [
	// Back
	{
		position: [-12, 10, 5],
		rotation: [0, 0, 0],
		url: './photos/mmexport1689910736872.jpg',
		title: 'Suzhou river',
	},
	{
		position: [12, 10, 5],
		rotation: [0, 0, 0],
		url: './photos/mmexport1689910070987.jpg',
		title: 'The tree in winter',
	},
	// Left
	{
		position: [-38, 8, 10],
		rotation: [0, Math.PI / 2.8, 0],
		url: './photos/3M5A9169.png',
		title: 'Baoshan temple',
	},
	{
		position: [-35, 8, 40],
		rotation: [0, Math.PI / 2.9, 0],
		url: './photos/3M5A8385.png',
		title: 'Scenes from thirty years ago',
	},
	{
		position: [-53, 8, 46],
		rotation: [0, Math.PI / 3.5, 0],
		url: './photos/3M5A7916-1k.png',
		title: 'Gongqing forest park',
	},
	// Right
	{
		position: [38, 8, 10],
		rotation: [0, -Math.PI / 2.8, 0],
		url: './photos/mmexport1689910425322.jpg',
		title: 'Huangshan mountains',
	},
	{
		position: [35, 8, 40],
		rotation: [0, -Math.PI / 2.9, 0],
		url: './photos/mmexport1689910497995.jpg',
		title: 'The winter in Donghua University',
	},
	{
		position: [53, 8, 46],
		rotation: [0, -Math.PI / 3.5, 0],
		url: './photos/mmexport1689910576643.jpg',
		title: 'The path in front of my home',
	},
];

const Gallery = () => {
	const [type, setType] = useState(null);

	const changeType = useCallback(
		(val) => {
			setType(val);
		},
		[type]
	);

	const { progress } = useProgress();
	const [times, setTimes] = useState([]);

	useFrame((state, delta) => {
		const elapsedTime = state.clock.getElapsedTime();
		if (progress == 100) {
			if (times.length == 0) setTimes([elapsedTime]);
			let delay = 8 + times[0];
			if (elapsedTime < delay) {
				state.camera.position.z = elapsedTime * (100 / delay);
				state.camera.rotation.x =
					-Math.PI * 0.5 + (elapsedTime / delay) * Math.PI * 0.5;
			}
		}
	});

	return (
		<group position={[0, -0.6, 0]} rotation-x={Math.PI * 0.02}>
			<Frames images={images} type={type} changeType={changeType} />
			<Screen type={type} changeType={changeType} />
		</group>
	);
};

export default Gallery;
