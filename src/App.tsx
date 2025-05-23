import "./App.css";
import Navbar from "./components/Navbar";
import HistoryScreen from "./screens/HistoryScreen";

import QueueScreen from "./screens/QueueScreen";
import TableScreen from "./screens/TableScreen";
import { useActiveTabStore } from "./utils/store";

function App() {
  const activeTab = useActiveTabStore((state) => state.activeTab);

  return (
    <div className="bg-linear-to-b from-[#121624]/0 from-30% to-[#121624] flex flex-col w-[20vw] h-screen border-2 border-[#d8d8d8]/30 rounded-2xl mx-auto pt-4 p-1 min-w-[420px]">
      <Navbar />
      {activeTab == "Queue" && <QueueScreen />}
      {activeTab == "History" && <HistoryScreen />}
      {activeTab == "Table" && <TableScreen />}
    </div>
  );
}

export default App;
