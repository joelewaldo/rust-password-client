import { PageSwitcher } from "./components/PageSwitcher";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="flex bg-gray-300 dark:bg-gray-900">
      <Sidebar />
      <main
        className={`flex flex-col items-center justify-center flex-1 min-h-screenz transition-all duration-300`}
      >
        <PageSwitcher />
      </main>
    </div>
  );
}

export default App;
