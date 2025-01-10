import { createRoot } from 'react-dom/client'
import App from './App'
// clear existing HTML content
document.body.innerHTML = '<div id="app"></div>';

import 'bootstrap/dist/css/bootstrap.min.css';

// render your react component instead
const root = createRoot(document.getElementById('app'));
root.render(<App />)