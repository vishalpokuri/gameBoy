import HistoryComponent from "../components/HistoryComponent";
import { useHistoryStore } from "../utils/store";

function HistoryScreen() {
  const historyItems = useHistoryStore((state) => state.items);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-white mb-6">Crafting History</h1>

      {historyItems.length === 0 ? (
        <div className="text-gray-400 text-center py-10">
          No completed items yet
        </div>
      ) : (
        <div className="space-y-4">
          {historyItems
            .sort((a, b) => b.endTime.getTime() - a.endTime.getTime()) // Sort by newest first
            .map((historyItem) => (
              <HistoryComponent historyItem={historyItem} />
            ))}
        </div>
      )}
    </div>
  );
}

export default HistoryScreen;
