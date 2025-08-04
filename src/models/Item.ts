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
    const baseTax = this.price * 0.125;
    return baseTax + (this.price + baseTax) * 0.02;
  }
}

export class Imported extends Item {
  getTax(): number {
    const importDuty = this.price * 0.1;
    const subtotal = this.price + importDuty;
    let surcharge = 0;
    if (subtotal <= 100) surcharge = 5;
    else if (subtotal <= 200) surcharge = 10;
    else surcharge = subtotal * 0.05;
    return importDuty + surcharge;
  }
}
