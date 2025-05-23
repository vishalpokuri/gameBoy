function QRemainingTime({ time }: { time: number }) {
  return (
    <div className="w-full h-full flex flex-row items-center ">
      <div className="mx-2 text-2xl font-semibold">{time}</div>
      <div className="flex flex-col my-auto">
        <div
          className=" text-gray-400"
          style={{
            fontSize: "11px",
            lineHeight: 0.75,
          }}
        >
          Remaining
        </div>
        <h1 className="text-xl  text-white font-semibold">Time</h1>
      </div>
    </div>
  );
}

export default QRemainingTime;
