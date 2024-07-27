import { MenuContent } from './types';
import { NavMenu } from './components/NavMenu';
import './App.css';

function App() {
  return (
    <>
      <NavMenu items={MenuContent} />
    </>
  );
}

export default App;
