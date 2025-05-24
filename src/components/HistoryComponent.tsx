import type { Craftables } from "../utils/types";

interface HistoryItem {
  item: Craftables;
  endTime: Date;
}

function HistoryComponent({ historyItem }: { historyItem: HistoryItem }) {
  return (
    <div
      key={`${historyItem.item.id}-${historyItem.endTime.getTime()}`}
      className="bg-gradient-to-b from-[#121624]/0 to-[#121624] rounded-lg p-4 text-white  border-dashed border-gray-400/50 border-[1px]"
    >
      <div className="flex justify-between items-start gap-4">
        <img
          src={historyItem.item.imageUrl}
          alt=""
          className="w-16 aspect-square bg-gradient-to-b from-[#fff]/40 to-[#fff]/0 rounded-lg"
        />
        <div>
          <h3 className="font-medium text-lg">{historyItem.item.title}</h3>
          <p className="text-gray-400 text-sm">
            <p className="text-gray-400 text-sm">
              Completed at: {historyItem.endTime.toLocaleString()}
            </p>
          </p>
        </div>
        <div className="bg-green-500 text-xs px-2 py-1 rounded-full">
          Completed
        </div>
      </div>
    </div>
  );
}

export default HistoryComponent;
