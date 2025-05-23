import { useDraggable } from "@dnd-kit/core";

interface Props {
  name: string;
  imageUrl: string;
  id: string | number; // Pass item.id from parent
}

function InventoryItem({ name, imageUrl, id }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id.toString(),
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="aspect-square bg-gradient-to-b from-[#fff]/40 to-[#fff]/0 rounded-lg flex flex-col items-center justify-center p-2"
    >
      <h1 className="text-xs text-center">{name}</h1>
      <img src={imageUrl} alt={name} className="w-3/4 h-3/4 object-contain" />
    </div>
  );
}

export default InventoryItem;
