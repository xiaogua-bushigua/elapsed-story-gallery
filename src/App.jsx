import { useEffect } from 'react';
import Scene from './gallery/Scene';
import { useLocation } from 'wouter';

function App() {
	const [, setLocation] = useLocation();

	useEffect(() => {
		setLocation('/');
	}, []);
	return <Scene />;
}

export default App;
