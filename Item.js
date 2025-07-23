"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Imported = exports.Manufactured = exports.Raw = exports.Item = void 0;
class Item {
    constructor(name, price, quantity, type) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.type = type;
    }
    getPrice() {
        return this.price + this.getTax();
    }
}
exports.Item = Item;
class Raw extends Item {
    getTax() {
        return this.price * 0.125;
    }
}
exports.Raw = Raw;
class Manufactured extends Item {
    getTax() {
        let Itemcost = 0.125 * this.price;
        return Itemcost + (Itemcost + this.price) * 0.02;
    }
}
exports.Manufactured = Manufactured;
class Imported extends Item {
    getTax() {
        const importDuty = this.price * 0.1;
        const finalamount = importDuty + this.price;
        let surCharge = 0;
        if (finalamount <= 100) {
            surCharge = 5;
        }
        else if (finalamount <= 200) {
            surCharge = 10;
        }
        else {
            surCharge = 0.05 * finalamount;
        }
        return importDuty + surCharge;
    }
}
exports.Imported = Imported;
