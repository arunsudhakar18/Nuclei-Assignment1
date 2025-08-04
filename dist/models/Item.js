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
        const baseTax = this.price * 0.125;
        return baseTax + (this.price + baseTax) * 0.02;
    }
}
exports.Manufactured = Manufactured;
class Imported extends Item {
    getTax() {
        const importDuty = this.price * 0.1;
        const subtotal = this.price + importDuty;
        let surcharge = 0;
        if (subtotal <= 100)
            surcharge = 5;
        else if (subtotal <= 200)
            surcharge = 10;
        else
            surcharge = subtotal * 0.05;
        return importDuty + surcharge;
    }
}
exports.Imported = Imported;
