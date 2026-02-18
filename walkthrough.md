# Walkthrough: Corrección de Estados de Pedidos

## Problema Identificado

El usuario reportó que los estados de pedidos no se mostraban correctamente:
- En la tabla: aparecía **"Sin Estado"** (amarillo)
- En el modal: aparecía **"Desconocido"**

## Diagnóstico

### Investigación Inicial

1. **Ejecuté el script de verificación** [`check_db_schema.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/scripts/check_db_schema.ts) para inspeccionar el esquema de la base de datos.

**Resultado**:
```
Columns found in 'venta': id_venta, id_comprador, id_estado, total_venta, fecha_venta, direccion_envio, notas
```

2. **Identifiqué la discrepancia**:
   - **Base de datos**: usa `id_estado`
   - **Código TypeScript**: esperaba `id_estado_pedido`

### Archivos Afectados

Busqué todas las referencias a `id_estado_pedido` y encontré:
- [`src/models/Venta.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/models/Venta.ts:L8)
- [`src/models/EstadoPedido.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/models/EstadoPedido.ts:L2)
- [`src/services/Venta.service.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/services/Venta.service.ts:L105)
- [`src/sections/adm/Pedido/PedidoGridSection.tsx`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/sections/adm/Pedido/PedidoGridSection.tsx:L75)
- [`src/Pagues/Admin/NuevoPedido.tsx`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/Pagues/Admin/NuevoPedido.tsx:L119)
- [`src/scripts/test_create_sale.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/scripts/test_create_sale.ts:L13)

---

## Cambios Implementados

### 1. Modelos de Datos

#### [`EstadoPedido.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/models/EstadoPedido.ts)
```diff
- id_estado_pedido?: number;
+ id_estado?: number;
```

```diff
- this.id_estado_pedido = data.id_estado_pedido;
+ this.id_estado = data.id_estado;
```

#### [`Venta.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/models/Venta.ts)
```diff
- id_estado_pedido?: number;
+ id_estado?: number;
```

```diff
- this.id_estado_pedido = data.id_estado_pedido;
+ this.id_estado = data.id_estado;
```

---

### 2. Servicio

#### [`Venta.service.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/services/Venta.service.ts:L105-L108)
```diff
- static async updateStatus(id: number, id_estado_pedido: number): Promise<void> {
+ static async updateStatus(id: number, id_estado: number): Promise<void> {
      const { error } = await supabase
          .from('venta')
-         .update({ id_estado_pedido })
+         .update({ id_estado })
          .eq('id_venta', id);
```

---

### 3. Componentes UI

#### [`PedidoGridSection.tsx`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/sections/adm/Pedido/PedidoGridSection.tsx:L75)
```diff
  <select
-     value={pedido.id_estado_pedido}
+     value={pedido.id_estado}
      onChange={(e) => onUpdateStatus(pedido.id_venta!, Number(e.target.value))}
```

---

### 4. Páginas

#### [`NuevoPedido.tsx`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/Pagues/Admin/NuevoPedido.tsx:L119)
```diff
  const ventaData = {
      id_comprador: selectedClient.dni_cliente,
-     id_estado_pedido: 1,
+     id_estado: 1,
      total_venta: total,
```

---

### 5. Scripts de Prueba

#### [`test_create_sale.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/scripts/test_create_sale.ts:L13)
```diff
  const fakeVenta = {
      total_venta: 100,
-     id_estado_pedido: 1
+     id_estado: 1
  };
```

---

## Documentación Creada

### [`docs/Docs_PedidoComponents.md`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/docs/Docs_PedidoComponents.md)

Documentación exhaustiva que incluye:
- ✅ Explicación del problema y solución
- ✅ Estructura de datos (tablas DB y modelos TS)
- ✅ Documentación de `VentaService` con ejemplos de uso
- ✅ Detalles de `PedidoGridSection` (tabla con selector de estado)
- ✅ Detalles de `PedidoDetailModal` (vista completa del pedido)
- ✅ Flujo completo de estados con diagramas
- ✅ Guía de verificación manual

### [`docs/VentaService.md`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/docs/VentaService.md) (ya existente)

Documentación de referencia del servicio.

---

## Verificación

### TypeScript Compilation
```bash
npx tsc --noEmit
```
✅ **0 errores**

### Dev Server
- Reiniciado en puerto **5174**
- Estado: **Running**

---

## Resultado Esperado

### Antes ❌
- **Tabla**: "Sin Estado" (amarillo)
- **Modal**: "Desconocido"
- **Select**: No mostraba el valor correcto

### Después ✅
- **Tabla**: "Pendiente", "En Proceso", "Entregado", o "Cancelado"
- **Modal**: Mismo estado que en la tabla
- **Select**: Preselecciona el estado actual correctamente
- **Colores**: Amarillo (Pendiente), Azul (En Proceso), Verde (Entregado), Rojo (Cancelado)

---

## Pasos para Verificar

1. Navega a `http://localhost:5174/admin/pedidos`
2. Verifica que la columna "Estado" muestre el nombre correcto
3. Abre el modal de un pedido y verifica que el estado coincida
4. Cambia el estado usando el selector y verifica que se actualice

---

## Archivos Modificados

Total: **6 archivos**

**Modelos** (2):
- [`src/models/Venta.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/models/Venta.ts)
- [`src/models/EstadoPedido.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/models/EstadoPedido.ts)

**Servicios** (1):
- [`src/services/Venta.service.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/services/Venta.service.ts)

**Componentes** (1):
- [`src/sections/adm/Pedido/PedidoGridSection.tsx`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/sections/adm/Pedido/PedidoGridSection.tsx)

**Páginas** (1):
- [`src/Pagues/Admin/NuevoPedido.tsx`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/Pagues/Admin/NuevoPedido.tsx)

**Scripts** (1):
- [`src/scripts/test_create_sale.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/scripts/test_create_sale.ts)

---

## Documentación Adicional

Para más detalles técnicos, consulta:
- [`docs/Docs_PedidoComponents.md`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/docs/Docs_PedidoComponents.md) - Guía completa de componentes y estados
- [`docs/VentaService.md`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/docs/VentaService.md) - Referencia del servicio de ventas
