function QTime({ time, type }: { time: string; type: string }) {
  return (
    <div className="w-full h-full mx-auto flex flex-col  items-center">
      <div
        className=" text-gray-400"
        style={{
          fontSize: "10px",
        }}
      >
        {type} Time
      </div>
      <h1
        className=" text-white font-semibold"
        style={{
          fontSize: "18px",
        }}
      >
        {time}
      </h1>
    </div>
  );
}

export default QTime;
