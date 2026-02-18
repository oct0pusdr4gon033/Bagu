# Task: Fix Order Status Display & Document Components

- [ ] Update Models <!-- id: 0 -->
    - [x] Rename `id_estado_pedido` to `id_estado` in `src/models/EstadoPedido.ts` <!-- id: 1 -->
    - [x] Rename `id_estado_pedido` to `id_estado` in `src/models/Venta.ts` <!-- id: 2 -->
- [ ] Update Services <!-- id: 3 -->
    - [x] Update `src/services/Venta.service.ts` to use `id_estado` in queries and types <!-- id: 4 -->
- [ ] Update UI Components <!-- id: 5 -->
    - [x] Update `src/sections/adm/Pedido/PedidoGridSection.tsx` to use `id_estado` <!-- id: 6 -->
    - [x] Update `src/sections/adm/Pedido/PedidoDetailModal.tsx` to use `id_estado` <!-- id: 7 -->
- [ ] Create Documentation <!-- id: 8 -->
    - [x] Create `docs/Docs_PedidoComponents.md` documenting Modal, Grid, and Service functions <!-- id: 9 -->
- [x] Verify Fixes <!-- id: 10 -->
    - [x] Verify TypeScript compilation <!-- id: 11 -->
