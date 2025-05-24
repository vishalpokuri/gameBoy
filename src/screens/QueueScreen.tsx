import QueueComponent from "../components/QueueComponent";
import { useQueueStore } from "../utils/store";

function QueueScreen() {
  const { queueItems } = useQueueStore();
  return (
    <div className="">
      <h1 className="p-4 text-2xl font-bold text-white mb-6">Queue </h1>

      {queueItems.length === 0 ? (
        <div className="text-gray-400 text-center py-10">
          The Queue is empty
        </div>
      ) : (
        <div>
          {queueItems.map((comp) => (
            <QueueComponent comp={comp} />
          ))}
        </div>
      )}
    </div>
  );
}

export default QueueScreen;
