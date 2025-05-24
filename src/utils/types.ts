interface BaseItem {
  imageUrl: string;
  name: string;
}

interface Item extends BaseItem {
  id: string;
  currentlyAt: string;
}

interface Section {
  id: string;
  title: string;
}

interface Craftables {
  id: string;
  title: string;
  imageUrl: string;
  requirements: {
    item: BaseItem;
    quantity: number;
  }[];
}

export type { Item, BaseItem, Section, Craftables };
