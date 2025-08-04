"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ItemStorage {
    constructor() {
        this.filePath = path_1.default.join(__dirname, "../../data/Items.json");
    }
    static getInstance() {
        if (!ItemStorage.instance)
            ItemStorage.instance = new ItemStorage();
        return ItemStorage.instance;
    }
    fetchItems() {
        if (!fs_1.default.existsSync(this.filePath))
            return [];
        const data = fs_1.default.readFileSync(this.filePath, "utf-8");
        return JSON.parse(data);
    }
    saveItem(item) {
        const items = this.fetchItems();
        items.push(item);
        fs_1.default.writeFileSync(this.filePath, JSON.stringify(items));
    }
}
exports.default = ItemStorage;
