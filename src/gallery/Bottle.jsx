import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, Html, useCursor } from '@react-three/drei';

const Bottle = ({ position, scale, rotation, content, a, b, url }) => {
	const bottle = useRef();
	const [visible, setVisible] = useState(false);
	useCursor(visible);
	const { nodes, materials } = useGLTF('./models/bottle_with_scroll.glb');

	useFrame((state, delta) => {
		const elapsedTime = state.clock.getElapsedTime();
		bottle.current.rotation.y += Math.sin(elapsedTime * b[0]) * b[1];
		bottle.current.rotation.x += Math.sin(elapsedTime * a[0]) * a[1];
	});

	const handleClick = () => {
		const w = window.open('about:blank');
		w.location.href = url;
	};
	return (
		<group
			onClick={handleClick}
			onPointerOver={() => setVisible(true)}
			onPointerOut={() => setVisible(false)}
			ref={bottle}
			scale={scale}
			position={position}
			rotation={rotation}
		>
			{visible && (
				<Html distanceFactor={10}>
					<div className="content">{content}</div>
				</Html>
			)}
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_2.geometry}
				material={materials.Scroll_LPSG}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_3.geometry}
				material={materials.lambert3SG}
			/>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.Object_4.geometry}
				material={materials.phong1SG}
			/>
		</group>
	);
};

export default Bottle;
