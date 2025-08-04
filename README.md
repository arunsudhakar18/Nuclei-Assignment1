# Nuclei Assignment 1 - Item CLI

A TypeScript CLI application to manage items, calculate sales tax, and store item details.

## Features

- Add items with name, price, quantity, and type (raw, manufactured, imported)
- Calculates sales tax and final price per item
- Stores item details in `data/Items.json`
- View all items

## Folder Structure

```
Nuclei-Assignment1/
  data/                # Stores Items.json (persistent data)
  dist/                # Compiled JS output (after tsc)
  src/
    cli/               # CLI entry point (app.ts)
    models/            # Domain models (Item.ts)
    services/          # Business logic (ItemFactory.ts, ItemStorage.ts)
  package.json         # Project metadata
  tsconfig.json        # TypeScript config
```

## Usage

1. Install dependencies:
   ```sh
   npm install
   ```
2. Compile TypeScript:
   ```sh
   npx tsc
   ```
3. Run the CLI:
   ```sh
   node dist/cli/app.js
   ```

## Item Types & Tax Rules

- **raw**: 12.5% of item cost
- **manufactured**: 12.5% of item cost + 2% of (item cost + 12.5% of item cost)
- **imported**: 10% import duty + surcharge:
  - Rs. 5 if final cost ≤ 100
  - Rs. 10 if final cost > 100 and ≤ 200
  - 5% of final cost if > 200

## Sample Output

```
Choose Option:
1. Enter new item
2. View items
Enter (1/2): 1
-name Book
-price 100
-quantity 2
-type raw
Item Name: Book
Item Price: 100
Quantity: 2
Type: raw
Sales Tax: 12.50
Final Price (per item): 112.50
Grand Total: 225.00
Do you want to enter details of any other item (y/n): n
```
