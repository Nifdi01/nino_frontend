import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Profiler } from 'react'

const onRenderCallback = (
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) => {
console.log('Profiler ID:', id);
console.log('Phase:', phase);
console.log('Actual Duration:', actualDuration);
console.log('Base Duration:', baseDuration);
console.log('Start Time:', startTime);
console.log('Commit Time:', commitTime);
console.log('Interactions:', interactions);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Profiler id="App" onRender={onRenderCallback}>
        <App />
      </Profiler>
    </BrowserRouter>
  </StrictMode>,
)
