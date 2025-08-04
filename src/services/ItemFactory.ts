import { Item, Raw, Manufactured, Imported, ItemType } from "../models/Item";

class ItemFactory {
  static createItem(
    name: string,
    price: number,
    quantity: number,
    type: ItemType
  ): Item {
    if (type === "raw") return new Raw(name, price, quantity, type);
    if (type === "manufactured")
      return new Manufactured(name, price, quantity, type);
    if (type === "imported") return new Imported(name, price, quantity, type);
    throw new Error("Invalid item type");
  }
}

export default ItemFactory;
