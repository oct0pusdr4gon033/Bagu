# VentaService Documentation

This document outlines the operations available in `VentaService` for managing sales and order statuses.

## Class: `VentaService`

Location: `src/services/VentaService.ts`

### 1. `getAll()`

**Description:**
Fetches all sales records from the database, including related information:
- `cliente` (Buyer details)
- `estado_pedido` (Order status)
- `detalles` (Sale line items and related products)

**Returns:**
- `Promise<Venta[]>`: A list of `Venta` objects sorted by `fecha_venta` in descending order.

**Usage:**
```typescript
const sales = await VentaService.getAll();
```

---

### 2. `getById(id: number)`

**Description:**
Fetches a single sale record by its unique identifier (`id_venta`). Includes all related data (client, status, details with products).

**Parameters:**
- `id` (number): The unique ID of the sale.

**Returns:**
- `Promise<Venta | null>`: The `Venta` object if found, otherwise `null`.

**Usage:**
```typescript
const sale = await VentaService.getById(123);
if (sale) {
    console.log(sale.cliente?.nombre);
}
```

---

### 3. `create(venta: Partial<Venta>, detalles: Partial<DetalleVenta>[])`

**Description:**
Creates a new sale and its associated details in a transactional manner.
1. Inserts the main sale record into the `venta` table.
2. Retrieves the generated `id_venta`.
3. Inserts the sale details (products, quantities, prices) into the `detalle_venta` table, linking them to the new sale ID.

**Parameters:**
- `venta` (Partial<Venta>): The main sale data (buyer ID, total amount, shipping address, etc.).
- `detalles` (Partial<DetalleVenta>[]): An array of line items for the sale.

**Returns:**
- `Promise<Venta | null>`: The created `Venta` object if successful. Throws an error if the operation fails.

**Usage:**
```typescript
const newSale = {
    id_comprador: "12345678",
    total_venta: 1500,
    direccion_envio: "123 Main St",
    id_estado_pedido: 1 // Pending
};

const items = [
    { id_producto: 10, cantidad: 2, precio_unitario: 500 },
    { id_producto: 5, cantidad: 1, precio_unitario: 500 }
];

await VentaService.create(newSale, items);
```

---

### 4. `updateStatus(id: number, id_estado_pedido: number)`

**Description:**
Updates the status of a specific sale.

**Parameters:**
- `id` (number): The ID of the sale to update.
- `id_estado_pedido` (number): The new status ID (e.g., 1 for Pending, 2 for Shipped).

**Returns:**
- `Promise<void>`: Resolves when the update is complete. Throws an error if it fails.

**Usage:**
```typescript
await VentaService.updateStatus(123, 2); // Set status to 'Shipped'
```

---

### 5. `getEstadosPedido()`

**Description:**
Fetches all available order statuses for use in dropdowns or filters.

**Returns:**
- `Promise<EstadoPedido[]>`: A list of `EstadoPedido` objects, sorted by ID.

**Usage:**
```typescript
const statuses = await VentaService.getEstadosPedido();
// Example output: [{ id_estado: 1, nombre_estado: 'Pendiente' }, ...]
```
