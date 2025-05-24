import QueueComponent from "../components/QueueComponent";
import { useQueueStore } from "../utils/store";

function QueueScreen() {
  const { queueItems } = useQueueStore();
  return (
    <>
      {queueItems.map((comp) => (
        <QueueComponent
          name={comp.item.title}
          startTime={comp.startTime}
          duration={comp.item.duration}
        />
      ))}
    </>
  );
}

export default QueueScreen;
