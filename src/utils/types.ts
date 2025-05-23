interface Item {
  id: string;
  imageUrl: string;
  name: string;
  currentlyAt: string;
}

interface Section {
  id: string;
  title: string;
}

export type { Item, Section };
