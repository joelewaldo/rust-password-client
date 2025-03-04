import { PageSwitcher } from "./components/PageSwitcher";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
  return (
    <div className="flex bg-white dark:bg-gray-900 font-inter overflow-hidden">
      <Sidebar />
      <main className={`flex-1 min-h-screenz transition-all duration-300`}>
        <PageSwitcher />
      </main>
    </div>
  );
}

export default App;
