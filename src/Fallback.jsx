import React, { useEffect, useRef } from 'react';
import { useProgress } from '@react-three/drei';

const Fallback = () => {
	const { progress } = useProgress();
	const lis = useRef([]);

	const setStates = (index) => {
		lis.current.forEach((li, i) => {
			if (i < index) li.className = 'loadedStatus';
			else if (i == index) li.className = 'loadingStatus';
			else li.className = 'notLoading';
		});
	};

	useEffect(() => {
		if (progress <= 25) setStates(0);
		else if (progress <= 50) setStates(1);
		else if (progress <= 75) setStates(2);
		else setStates(3);
	}, [progress]);
	return (
		<div className="loadingBack">
			<ul>
				{new Array(4).fill(0).map((item, index) => (
					<li
						key={index}
						ref={(el) => {
							lis.current[index] = el;
						}}
					></li>
				))}
			</ul>
		</div>
	);
};

export default Fallback;
