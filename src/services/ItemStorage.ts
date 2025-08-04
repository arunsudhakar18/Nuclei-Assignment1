import fs from "fs";
import path from "path";
import { Item } from "../models/Item";

class ItemStorage {
  private static instance: ItemStorage;
  private filePath: string;
  private constructor() {
    this.filePath = path.join(__dirname, "../../data/Items.json");
  }
  static getInstance(): ItemStorage {
    if (!ItemStorage.instance) ItemStorage.instance = new ItemStorage();
    return ItemStorage.instance;
  }
  fetchItems(): any[] {
    if (!fs.existsSync(this.filePath)) return [];
    const data = fs.readFileSync(this.filePath, "utf-8");
    return JSON.parse(data);
  }
  saveItem(item: any): void {
    const items = this.fetchItems();
    items.push(item);
    fs.writeFileSync(this.filePath, JSON.stringify(items));
  }
}

export default ItemStorage;
