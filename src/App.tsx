import { MenuContent } from './types';
import { NavMenu } from './components/NavMenu';
import { TaskSummary } from './components/TaskSummary';
import { useState } from 'react';
import { RouteContext, MediaQueryProvider } from './context';
import './App.css';

function App() {
  const [route, setRoute] = useState('');
  return (
    <MediaQueryProvider query={"(min-width: 800px)"}>
      <RouteContext.Provider value={{ route, setRoute }}>
        <NavMenu items={MenuContent} />
        <TaskSummary currentRoute={route} />
      </RouteContext.Provider>
    </MediaQueryProvider>
  );
}

export default App;
