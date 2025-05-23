function QName({ name, index }: { name: string; index: number }) {
  return (
    <div className="w-full h-full flex flex-row items-center">
      <div className="mx-2 text-2xl font-semibold">{index}</div>
      <div className="flex flex-col ">
        <div
          className=" text-gray-400"
          style={{
            fontSize: "11px",
            lineHeight: 0.75,
          }}
        >
          Name
        </div>
        <h1 className="text-xl  text-white font-semibold">{name}</h1>
      </div>
    </div>
  );
}

export default QName;
