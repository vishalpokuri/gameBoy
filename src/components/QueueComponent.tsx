import QName from "./subcomponents/QName";
import QProgress from "./subcomponents/QProgress";
import QRemainingTime from "./subcomponents/QRemainingTime";
import QTime from "./subcomponents/QTime";

interface QueueComponentProps {
  index: number;
  name: string;
  progress: number;
  remainingTime: number;
  startTime: string;
  endTime: string;
}
function QueueComponent({
  index,
  name,
  progress,
  remainingTime,
  startTime,
  endTime,
}: QueueComponentProps) {
  return (
    <div className="w-[85%] bg-gradient-to-b from-transparent to-[#121624] rounded-2xl mx-auto mb-2 text-white">
      <div className="flex mb-2 pt-2">
        <div className="w-1/3 min-h-[60%]  border-amber-50 ">
          <QName name={name} index={index} />
        </div>
        <div className=" w-px h-[23px] bg-gray-500 my-auto"></div>
        <div className="w-1/3 min-h-[60%] flex items-center justify-center border-amber-50 ">
          <QProgress progress={progress} />
        </div>
        <div className=" w-px h-[23px] bg-gray-500 my-auto"></div>
        <div className="w-1/3 min-h-[60%]  border-amber-50 ">
          <QRemainingTime time={remainingTime} />
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/2 h-[40%]   border-amber-50 ">
          <QTime type="Start" time={startTime} />
        </div>
        <div className=" w-px h-[23px] bg-white my-auto"></div>
        <div className="w-1/2 h-[40%]  border-amber-50 ">
          <QTime type="End" time={endTime} />
        </div>
      </div>
    </div>
  );
}

export default QueueComponent;
