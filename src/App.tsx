import { MenuContent } from './types';
import { NavMenu } from './components/NavMenu';
import { useState } from 'react';
import { RouteContext } from './context';
import './App.css';

function App() {
  const [route, setRoute] = useState('');
  return (
    <RouteContext.Provider value={{ route, setRoute }}>
      <NavMenu items={MenuContent} />
      <div>{route}</div>
      <button>Test another tabbale element on the page</button>
    </RouteContext.Provider>
  );
}

export default App;
