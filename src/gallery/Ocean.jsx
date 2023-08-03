import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { extend, useThree, useLoader, useFrame } from '@react-three/fiber';
import { Water } from 'three-stdlib';
import Bottle from './Bottle';

extend({ Water });

function Ocean() {
	const ref = useRef();
	const gl = useThree((state) => state.gl);
	const waterNormals = useLoader(
		THREE.TextureLoader,
		'./textures/waternormals.jpeg'
	);
	waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

	const geom = useMemo(() => new THREE.PlaneGeometry(1000, 200), []);
	const config = useMemo(
		() => ({
			textureWidth: 512,
			textureHeight: 512,
			waterNormals,
			sunDirection: new THREE.Vector3(),
			sunColor: 0xffffff,
			waterColor: 0x001e0f,
			distortionScale: 3.7,
			fog: false,
			format: gl.encoding,
		}),
		[waterNormals]
	);

	useFrame((state, delta) => {
		ref.current.material.uniforms.time.value += delta * 0.5;
	});

	return (
		<group position={[0, -2, 0]} rotation={[0.08, 0, 0]}>
			<water
				ref={ref}
				args={[geom, config]}
				rotation-x={-Math.PI / 2}
				position-y={0}
			/>
			<Bottle
				scale={1.5}
				content="去些安静的地方"
				position={[-15, 0.2, 80]}
				rotation={[0, -Math.PI * 0.25, 0]}
				a={[6, 0.004]}
				b={[0.2, 0.002]}
				url={'http://localhost:8067'}
			/>
			<Bottle
				scale={2}
				content="或者干脆就回家"
				position={[-10, 0.2, 70]}
				rotation={[0, Math.PI * 0.25, 0]}
				a={[5, 0.005]}
				b={[0.2, 0.002]}
				url={'http://localhost:8066'}
			/>
			<Bottle
				content="再不然开始旅行"
				scale={2}
				position={[15, 0.2, 70]}
				rotation={[0, Math.PI * 0.8, 0]}
				a={[5, 0.006]}
				b={[0.2, 0.002]}
				url={'http://localhost:8064'}
			/>
			<Bottle
				content="但请保持好奇心"
				scale={1.5}
				position={[5, 0.2, 85]}
				rotation={[0, Math.PI * 0.4, 0]}
				a={[6, 0.005]}
				b={[0.2, 0.002]}
				url={'http://localhost:8065'}
			/>
		</group>
	);
}

export default Ocean;
