import promptsync from "prompt-sync";
import fs from "fs";
import { Item, ItemType, Raw, Manufactured, Imported } from "./Item";

const prompt = promptsync();
const filePath = "Items.json";

function fetchItem(): any[] {
  if (!fs.existsSync(filePath)) return [];
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function savedItem(product: any) {
  const current = fetchItem();
  current.push(product);
  fs.writeFileSync(filePath, JSON.stringify(current));
}

console.log("Choose Option: ");
console.log("1.Enter new product type:");
console.log("2.View Products :");
const choice = prompt("Enter (1/2):").trim();

if (choice === "2") {
  const data = fetchItem();
  if (data.length === 0) {
    console.log("No Products");
  } else {
    console.log("Products List:");
    data.forEach((item: any, i: number) => {
      console.log(`\n${i + 1})`);
      console.log(`Name:${item.name}`);
      console.log(`Price:${item.price}`);
      console.log(`Quantity:${item.quantity}`);
      console.log(`Type:${item.type}`);
      console.log(`Tax per item:${item.tax}`);
      console.log(`Total Price(per item): ${item.totalPrice}`);
      console.log(`Grand Total:${item.grandTotal}`);
    });
  }
  process.exit();
}

while (true) {
  console.log("Enter product detials:");
  let name = prompt("product name : ");
  const prodName: string = name.toLowerCase().trim();
  let prodInput = prompt("price:");
  const prodPrice = Number(prodInput);
  if (isNaN(prodPrice) || prodPrice <= 0) {
    console.log("Input valid price");
    continue;
  }
  const quantityInput = prompt("Quantity:");
  const prodQuantity = Number(quantityInput);
  if (isNaN(prodQuantity) || prodQuantity < 1) {
    console.log("Input quantity greater than 0");
    continue;
  }
  const typeInput = prompt("product type [raw/imported/manufactured]: ")
    .toLowerCase()
    .trim();
  if (
    typeInput !== "raw" &&
    typeInput !== "manufactured" &&
    typeInput !== "imported"
  ) {
    console.log("Invalid type");
    continue;
  }
  const type: ItemType = typeInput;
  let item: Item;
  if (type == "raw") {
    item = new Raw(prodName, prodPrice, prodQuantity, type);
  } else if (type == "imported") {
    item = new Imported(prodName, prodPrice, prodQuantity, type);
  } else {
    item = new Manufactured(prodName, prodPrice, prodQuantity, type);
  }
  let itemprice = item.getPrice();
  let itemtax = item.getTax();
  console.log(`Product name :${item.name}`);
  console.log(`Price ${item.price}`);
  console.log(`Quantity: ${item.quantity}`);
  console.log(`Type: ${item.type}`);
  console.log(`Tax per item : ${itemtax.toFixed(2)}`);
  console.log(`Total Price (peritem): ${itemprice.toFixed(2)}`);
  console.log(`Grand Total : ${itemprice * item.quantity} `);
  savedItem({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    type: item.type,
    tax: itemtax,
    totalPrice: itemprice,
    grandTotal: itemprice * item.quantity,
  });
  const check = prompt("Do you want to add more products? (y/n):");
  if (check != "y") {
    break;
  }
}
