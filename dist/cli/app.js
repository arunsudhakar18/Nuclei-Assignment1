"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const ItemFactory_1 = __importDefault(require("../services/ItemFactory"));
const ItemStorage_1 = __importDefault(require("../services/ItemStorage"));
const prompt = (0, prompt_sync_1.default)();
const storage = ItemStorage_1.default.getInstance();
function inputItem() {
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
    const type = typeInput;
    return { name, price, quantity, type };
}
function displayItem(item) {
    console.log(`Item Name: ${item.name}`);
    console.log(`Item Price: ${item.price}`);
    console.log(`Quantity: ${item.quantity}`);
    console.log(`Type: ${item.type}`);
    console.log(`Sales Tax: ${item.tax.toFixed(2)}`);
    console.log(`Final Price (per item): ${item.totalPrice.toFixed(2)}`);
    console.log(`Grand Total: ${(item.totalPrice * item.quantity).toFixed(2)}`);
}
function main() {
    while (true) {
        const { name, price, quantity, type } = inputItem();
        const item = ItemFactory_1.default.createItem(name, price, quantity, type);
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
        const more = prompt("Do you want to enter details of any other item (y/n): ").toLowerCase();
        if (more !== "y")
            break;
    }
}
function viewItems() {
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
if (choice === "2")
    viewItems();
else
    main();
