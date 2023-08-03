import React from 'react';
import { useRoute, useLocation } from 'wouter';
import { easing } from 'maath';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Frame from './Frame';

const GOLDENRATIO = 1.61803398875;

const Frames = ({
	images,
	type,
	changeType,
	q = new THREE.Quaternion(),
	p = new THREE.Vector3(),
}) => {
	const ref = useRef();
	const clicked = useRef();
	const [, params] = useRoute('/item/:id');
	const [, setLocation] = useLocation();

	useEffect(() => {
		clicked.current = ref.current.getObjectByName(params?.id);
		if (clicked.current) {
			// clicked.current.parent: Frame
			clicked.current.parent.updateWorldMatrix(true, true);
			clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO, 20));
			clicked.current.parent.getWorldQuaternion(q);
		} else {
			p.set(0, 0, 100);
			q.identity();
		}
	});

	useFrame((state, delta) => {
		if (type === 'image') {
			easing.damp3(state.camera.position, p, 0.4, delta);
			easing.dampQ(state.camera.quaternion, q, 0.4, delta);
		}
	});

	const handleClick = (e) => {
		setLocation(
			clicked.current === e.object ? '/' : '/item/' + e.object.name
		);
		changeType('image');
	};

	return (
		<group
			ref={ref}
			onClick={handleClick}
			onPointerMissed={() => setLocation('/')}
		>
			{images.map((props) => (
				<Frame
					key={props.url}
					{...props}
					GOLDENRATIO={GOLDENRATIO}
					scaleFactor={15}
				/>
			))}
		</group>
	);
};

export default Frames;
