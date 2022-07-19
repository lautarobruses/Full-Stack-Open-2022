import { createRoot } from 'react-dom/client'; //Render in React 18
import App from './components/App'

//Render in React 18
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);