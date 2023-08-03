import React, { useRef } from 'react';
import { EffectComposer, GodRays } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useEffect, useState, forwardRef } from 'react';
import { Text, useCursor } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

const GOLDENRATIO = 1.61803398875;
const scaleFactor = 0.8;

const Screen = forwardRef(({ type, changeType }, ref) => {
	const [material, set] = useState();

	return (
		<>
			<Emitter ref={set} type={type} changeType={changeType} />
			{material && (
				<EffectComposer disableNormalPass multisampling={8}>
					<GodRays sun={material} exposure={0.34} decay={0.8} blur />
				</EffectComposer>
			)}
		</>
	);
});

const Emitter = forwardRef((props, forwardRef) => {
	const p = new THREE.Vector3();

	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	const ref = useRef();

	const frame = useRef();
	useCursor(hovered);

	const [video] = useState(() =>
		Object.assign(document.createElement('video'), {
			src: './photos/video.mp4',
			crossOrigin: 'Anonymous',
			loop: true,
			muted: true,
		})
	);

	useFrame((state, delta) => {
		if (props.type === 'video')
			easing.damp3(state.camera.position, p, 0.4, delta);
		easing.dampC(
			frame.current.material.color,
			hovered ? '#a3df00' : 'white',
			0.1,
			delta
		);
	});

	useEffect(() => {
		if (clicked) {
			ref.current.parent.updateWorldMatrix(true, true);
			ref.current.parent.localToWorld(p.set(0, GOLDENRATIO, 80));
		} else {
			p.set(0, 0, 100);
		}
	});

	useEffect(() => void video.play(), [video]);

	return (
		<group
			ref={ref}
			onClick={() => (click(true), props.changeType('video'))}
			onPointerMissed={() => click(false)}
		>
			<mesh
				onPointerOver={(e) => (e.stopPropagation(), hover(true))}
				onPointerOut={() => hover(false)}
				position={[0, 4, 60]}
				scale={[
					1 * scaleFactor,
					0.8 * GOLDENRATIO * scaleFactor,
					0.05 * scaleFactor,
				]}
			>
				<mesh scale={[18.5, 11.8, 0.2]} position={[0, 0, -0.4]}>
					<boxGeometry />
					<meshStandardMaterial
						color="#151515"
						metalness={0.5}
						roughness={0.5}
						envMapIntensity={2}
					/>
				</mesh>
				<mesh
					ref={frame}
					raycast={() => null}
					scale={[17, 10.8, 0.2]}
					position={[0, 0, -0.2]}
				>
					<boxGeometry />
					<meshBasicMaterial toneMapped={false} fog={false} />
				</mesh>
				<mesh ref={forwardRef} {...props}>
					<planeGeometry args={[16, 10]} />
					<meshBasicMaterial>
						<videoTexture
							attach="map"
							args={[video]}
							colorSpace={THREE.SRGBColorSpace}
						/>
					</meshBasicMaterial>
				</mesh>
			</mesh>
			<Text
				maxWidth={0.1}
				anchorX="left"
				anchorY="top"
				position={[8.2, GOLDENRATIO * 6, 60]}
				fontSize={0.8}
			>
				Summary of 2022
			</Text>
		</group>
	);
});

export default Screen;
