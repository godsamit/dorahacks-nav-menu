import { MenuContent } from "./types";
import { NavMenu } from "./components/NavMenu";
import { TaskSummary } from "./components/TaskSummary";
import { MediaQueryProvider } from "./context";
import "./App.css";

function App() {
  return (
    <MediaQueryProvider query={"(min-width: 800px)"}>
      <NavMenu items={MenuContent} />
      <TaskSummary />
    </MediaQueryProvider>
  );
}

export default App;
