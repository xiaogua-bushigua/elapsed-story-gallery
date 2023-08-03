import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import Fallback from './Fallback';
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Suspense fallback={<Fallback />}>
			<App />
		</Suspense>
	</React.StrictMode>
);
