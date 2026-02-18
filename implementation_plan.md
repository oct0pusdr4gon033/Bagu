# Implementation Plan - Fix Order Status & Document Components

The user is experiencing an issue where the order status is not displaying correctly ("Sin Estado" / "Desconocido") in the Grid and Modal components. This is due to a mismatch between the database schema (using `id_estado`) and the TypeScript models/frontend code (expecting `id_estado_pedido`).

## User Review Required
> [!IMPORTANT]
> I will be renaming `id_estado_pedido` to `id_estado` in the TypeScript models to match the database schema. This might require updating other files that reference these fields.

## Proposed Changes

### Database & Models
#### [MODIFY] [Venta.ts](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/models/Venta.ts)
- Rename `id_estado_pedido` to `id_estado`.

#### [MODIFY] [EstadoPedido.ts](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/models/EstadoPedido.ts)
- Rename `id_estado_pedido` to `id_estado`.

### Services
#### [MODIFY] [Venta.service.ts](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/services/Venta.service.ts)
- Ensure the query aliases match the model structure.
- `estado_pedido:id_estado (*)` is already correct for the relation, but need to ensure the returned object matches the `EstadoPedido` interface.

### UI Components
#### [MODIFY] [PedidoGridSection.tsx](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/sections/adm/Pedido/PedidoGridSection.tsx)
- Update references from `id_estado_pedido` to `id_estado` if used for the select value.
- Ensure `pedido.estado_pedido?.nombre_estado` is correctly accessed.

#### [MODIFY] [PedidoDetailModal.tsx](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/sections/adm/Pedido/PedidoDetailModal.tsx)
- Verify status access.

### Documentation
#### [NEW] [Docs_PedidoComponents.md](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/docs/Docs_PedidoComponents.md)
- Create comprehensive documentation for `PedidoDetailModal`, `PedidoGridSection`, and the status management functions in `VentaService`.

## Verification Plan

### Automated Tests
- Run `check_db_schema.ts` (already exists/modified) to verify DB column names one last time if needed.
- `npx tsc` to check for type errors after renaming properties.

### Manual Verification
- The user will need to check the UI to see if "Sin Estado" is replaced by the actual status (e.g., "Pendiente").
- Verify that changing the status in the dropdown updates the database (and UI).
