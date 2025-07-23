export type ItemType = "raw" | "manufactured" | "imported";

export abstract class Item {
  name: string;
  price: number;
  quantity: number;
  type: ItemType;
  constructor(name: string, price: number, quantity: number, type: ItemType) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.type = type;
  }

  abstract getTax(): number;

  getPrice(): number {
    return this.price + this.getTax();
  }
}

export class Raw extends Item {
  getTax(): number {
    return this.price * 0.125;
  }
}

export class Manufactured extends Item {
  getTax(): number {
    let Itemcost = 0.125 * this.price;
    return Itemcost + (Itemcost + this.price) * 0.02;
  }
}

export class Imported extends Item {
  getTax(): number {
    const importDuty = this.price * 0.1;
    const finalamount = importDuty + this.price;

    let surCharge = 0;

    if (finalamount <= 100) {
      surCharge = 5;
    } else if (finalamount <= 200) {
      surCharge = 10;
    } else {
      surCharge = 0.05 * finalamount;
    }

    return importDuty + surCharge;
  }
}
