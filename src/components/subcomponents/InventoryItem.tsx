import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  name: string;
  imageUrl: string;
  id: string | number;
}

function InventoryItem({ name, imageUrl, id }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id.toString(),
    data: {
      type: "Item",
      name,
      imageUrl,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`aspect-square bg-gradient-to-b from-[#fff]/40 to-[#fff]/0 rounded-lg flex flex-col items-center justify-center px-1 cursor-grab active:cursor-grabbing transition-opacity ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <h1
        className=" text-gray-300 text-center font-semibold truncate w-full"
        style={{
          fontSize: "11px",
        }}
      >
        {name}
      </h1>
      <img src={imageUrl} alt={name} className="w-3/4 h-3/4 object-contain" />
    </div>
  );
}

export default InventoryItem;
