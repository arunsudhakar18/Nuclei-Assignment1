"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Item_1 = require("../models/Item");
class ItemFactory {
    static createItem(name, price, quantity, type) {
        if (type === "raw")
            return new Item_1.Raw(name, price, quantity, type);
        if (type === "manufactured")
            return new Item_1.Manufactured(name, price, quantity, type);
        if (type === "imported")
            return new Item_1.Imported(name, price, quantity, type);
        throw new Error("Invalid item type");
    }
}
exports.default = ItemFactory;
