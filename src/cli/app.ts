import promptSync from "prompt-sync";
import ItemFactory from "../services/ItemFactory";
import ItemStorage from "../services/ItemStorage";
import { ItemType } from "../models/Item";

const prompt = promptSync();
const storage = ItemStorage.getInstance();

function inputItem(): any {
  const name = prompt("-name ").trim();
  const price = Number(prompt("-price "));
  const quantity = Number(prompt("-quantity "));
  let typeInput = prompt("-type [raw/imported/manufactured] ")
    .toLowerCase()
    .trim();
  while (!["raw", "manufactured", "imported"].includes(typeInput)) {
    typeInput = prompt("Enter valid type [raw/imported/manufactured]: ")
      .toLowerCase()
      .trim();
  }
  const type: ItemType = typeInput as ItemType;
  return { name, price, quantity, type };
}

function displayItem(item: any): void {
  console.log(`Item Name: ${item.name}`);
  console.log(`Item Price: ${item.price}`);
  console.log(`Quantity: ${item.quantity}`);
  console.log(`Type: ${item.type}`);
  console.log(`Sales Tax: ${item.tax.toFixed(2)}`);
  console.log(`Final Price (per item): ${item.totalPrice.toFixed(2)}`);
  console.log(`Grand Total: ${(item.totalPrice * item.quantity).toFixed(2)}`);
}

function main(): void {
  while (true) {
    const { name, price, quantity, type } = inputItem();
    const item = ItemFactory.createItem(name, price, quantity, type);
    const tax = item.getTax();
    const totalPrice = item.getPrice();
    const record = {
      name,
      price,
      quantity,
      type,
      tax,
      totalPrice,
      grandTotal: totalPrice * quantity,
    };
    displayItem(record);
    storage.saveItem(record);
    const more = prompt(
      "Do you want to enter details of any other item (y/n): "
    ).toLowerCase();
    if (more !== "y") break;
  }
}

function viewItems(): void {
  const items = storage.fetchItems();
  if (items.length === 0) {
    console.log("No items found.");
    return;
  }
  items.forEach((item, i) => {
    console.log(`\nItem ${i + 1}`);
    displayItem(item);
  });
}

console.log("Choose Option:");
console.log("1. Enter new item");
console.log("2. View items");
const choice = prompt("Enter (1/2): ").trim();
if (choice === "2") viewItems();
else main();
