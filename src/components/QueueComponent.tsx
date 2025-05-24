import { useEffect, useState } from "react";
import QName from "./subcomponents/QName";
import QProgress from "./subcomponents/QProgress";
import QRemainingTime from "./subcomponents/QRemainingTime";
import QTime from "./subcomponents/QTime";
import type { Craftables } from "../utils/types";
import { useHistoryStore, useQueueStore } from "../utils/store";

interface QueueItem {
  item: Craftables;
  startTime: Date;
}

interface QueueComponentProps {
  comp: QueueItem;
}

function QueueComponent({ comp }: QueueComponentProps) {
  const name = comp.item.title;
  const startTime = comp.startTime;
  const duration = comp.item.duration;
  const addCompletedItem = useHistoryStore((state) => state.addCompletedItem);
  const removeFromQueue = useQueueStore((state) => state.removeFromQueue);
  const [progress, setProgress] = useState(0);
  const [remainingTime, setRemainingTime] = useState(duration);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const elapsedSeconds = Math.floor(
        (now.getTime() - startTime.getTime()) / 1000
      );
      const progressPercent = Math.min(100, (elapsedSeconds / duration) * 100);
      const remaining = Math.max(0, duration - elapsedSeconds);

      if (progressPercent >= 100) {
        addCompletedItem(comp.item);
        removeFromQueue(comp.item.id); // Remove from queue
        clearInterval(interval);
      }

      setProgress(parseFloat(progressPercent.toFixed(1)));
      setRemainingTime(remaining);
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, [startTime, duration]);

  const endTime = new Date(startTime.getTime() + duration * 1000);

  const formatTime = (date: Date) =>
    `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

  return (
    <div className="w-[85%] bg-gradient-to-b from-transparent to-[#121624] rounded-2xl mx-auto my-4 text-white">
      <div className="flex mb-2 pt-2">
        <div className="w-1/3 min-h-[60%]">
          <QName name={name} index={1} />
        </div>
        <div className="w-px h-[23px] bg-gray-500 my-auto"></div>
        <div className="w-1/3 min-h-[60%] flex items-center justify-center">
          <QProgress progress={progress} />
        </div>
        <div className="w-px h-[23px] bg-gray-500 my-auto"></div>
        <div className="w-1/3 min-h-[60%]">
          <QRemainingTime time={Math.floor(remainingTime / 60)} />
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/2">
          <QTime type="Start" time={formatTime(startTime)} />
        </div>
        <div className="w-px h-[23px] bg-white my-auto"></div>
        <div className="w-1/2">
          <QTime type="End" time={formatTime(endTime)} />
        </div>
      </div>
    </div>
  );
}

export default QueueComponent;
