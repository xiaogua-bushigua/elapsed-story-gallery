import React from 'react';
import { useRoute } from 'wouter';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';
import { useCursor, Image, Text } from '@react-three/drei';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

const Frame = ({
	url,
	title,
	position,
	rotation,
	scaleFactor,
	GOLDENRATIO,
}) => {
	const image = useRef();
	const frame = useRef();
	const [, params] = useRoute('/item/:id');

	const [hovered, hover] = useState(false);
	const [rnd] = useState(() => Math.random());

	const name = getUuid(url);
	const isActive = params?.id === name;
	useCursor(hovered);

	useFrame((state, delta) => {
		image.current.material.zoom =
			1.1 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 10;
		easing.damp3(
			image.current.scale,
			[
				0.85 * (!isActive && hovered ? 0.85 : 1),
				0.9 * (!isActive && hovered ? 0.905 : 1),
				1,
			],
			0.1,
			delta
		);
		easing.dampC(
			frame.current.material.color,
			hovered ? '#a3df00' : 'white',
			0.1,
			delta
		);
	});
	return (
		<group position={position} rotation={rotation}>
			<mesh
				name={name}
				onPointerOver={(e) => (e.stopPropagation(), hover(true))}
				onPointerOut={() => hover(false)}
				position={[0, GOLDENRATIO / 2, 0]}
				scale={[
					1 * scaleFactor,
					0.8 * GOLDENRATIO * scaleFactor,
					0.05 * scaleFactor,
				]}
			>
				<boxGeometry />
				<meshStandardMaterial
					color="#151515"
					metalness={0.5}
					roughness={0.5}
					envMapIntensity={2}
				/>
				<mesh
					ref={frame}
					raycast={() => null}
					scale={[0.9, 0.93, 0.9]}
					position={[0, 0, 0.2]}
				>
					<boxGeometry />
					<meshBasicMaterial toneMapped={false} fog={false} />
				</mesh>
				<Image
					raycast={() => null}
					ref={image}
					position={[0, 0, 0.7]}
					url={url}
				/>
			</mesh>
			<Text
				maxWidth={0.1}
				anchorX="left"
				anchorY="top"
				position={[8, GOLDENRATIO * 6.5, 0]}
				fontSize={0.5}
			>
				{title}
			</Text>
		</group>
	);
};

export default Frame;
