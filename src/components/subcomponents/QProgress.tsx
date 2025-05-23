import GradientBorder from "../ui/GradientBorder";

function QProgress({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center mt-2">
      <div className="absolute mt-2 w-24 h-12 overflow-hidden">
        <div
          className="w-24 h-24 rounded-full"
          style={{
            background: `conic-gradient(
              from 270deg,
              #2737cf 0%,
              #da1a41 ${progress / 2}%,
              transparent ${progress / 2}% 50%,
              transparent 50% 100%
            )`,
            WebkitMaskImage:
              "radial-gradient(circle at center, transparent 56%, black 56%, black 90%, transparent 92%)",
            maskImage:
              "radial-gradient(circle at center, transparent 56%, black 56%, black 90%, transparent 92%)",
          }}
        />
      </div>
      <div className=" w-28 h-14 overflow-hidden">
        {/* Progress semicircle */}
        <div
          className="w-28 h-28 rounded-full"
          style={{
            background: `conic-gradient(
              from 270deg,
              #23285c 0% 50%,
              
              transparent 50% 100%
            )`,
            WebkitMaskImage:
              "radial-gradient(circle at center, transparent 65%, black 65%, black 68%, transparent 68%)",
            maskImage:
              "radial-gradient(circle at center, transparent 65%, black 65%, black 68%, transparent 68%)",
          }}
        />
      </div>
      <div className="absolute mt-6 flex flex-row items-center">
        <img src="hammer_icon.svg" alt="" className=" w-4 h-4" />
        <p className="font-semibold text-sm">{progress}%</p>
      </div>

      <GradientBorder />
    </div>
  );
}

export default QProgress;
