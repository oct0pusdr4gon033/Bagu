# Documentación Completa: Gestión de Pedidos y Estados

## ⚠️ Problema Resuelto

**Síntoma original**: El estado de los pedidos aparecía como "Sin Estado" en la tabla y "Desconocido" en el modal.

**Causa raíz**: Inconsistencia entre el nombre de la columna en la base de datos (`id_estado`) y el que se usaba en el código TypeScript (`id_estado_pedido`).

**Solución aplicada**: Renombrar todas las referencias de `id_estado_pedido` a `id_estado` en:
- `src/models/Venta.ts`
- `src/models/EstadoPedido.ts`
- `src/services/Venta.service.ts`
- `src/sections/adm/Pedido/PedidoGridSection.tsx`
- `src/Pagues/Admin/NuevoPedido.tsx`
- `src/scripts/test_create_sale.ts`

---

## 📊 Estructura de Datos

### Base de Datos (Supabase)

#### Tabla `venta`
```sql
CREATE TABLE venta (
    id_venta SERIAL PRIMARY KEY,
    id_comprador VARCHAR, -- FK a cliente.dni_cliente
    id_estado INT, -- FK a estado_pedido.id_estado (¡IMPORTANTE!)
    total_venta DECIMAL,
    fecha_venta TIMESTAMP,
    direccion_envio VARCHAR,
    notas TEXT
);
```

#### Tabla `estado_pedido`
```sql
CREATE TABLE estado_pedido (
    id_estado SERIAL PRIMARY KEY,
    nombre_estado VARCHAR -- Ej: "Pendiente", "En Proceso", "Entregado", "Cancelado"
);
```

### Modelos TypeScript

#### `EstadoPedido` (`src/models/EstadoPedido.ts`)
```typescript
export class EstadoPedido {
    id_estado?: number;          // ✅ Coincide con DB
    nombre_estado: string;
}
```

#### `Venta` (`src/models/Venta.ts`)
```typescript
export class Venta {
    id_venta?: number;
    id_comprador?: string;
    id_estado?: number;          // ✅ Coincide con DB
    total_venta: number;
    fecha_venta?: Date;
    direccion_envio?: string;
    notas?: string;
    
    // Relaciones populadas por Supabase
    cliente?: Cliente;
    estado_pedido?: EstadoPedido; // ¡Objeto con id_estado y nombre_estado!
    detalles?: DetalleVenta[];
}
```

---

## 🔧 Servicio: `VentaService`

Ubicación: `src/services/Venta.service.ts`

### Métodos Clave

#### `getAll(): Promise<Venta[]>`

**Función**: Obtiene todos los pedidos con sus relaciones.

**Query Supabase**:
```typescript
.from('venta')
.select(`
    *,
    cliente:id_comprador (*),
    estado_pedido:id_estado (*),  // 👈 Mapea la columna id_estado a un objeto
    detalles:detalle_venta (
        *,
        producto:id_producto (*)
    )
`)
```

**Resultado**: Cada `Venta` tendrá:
- `id_estado`: 1, 2, 3, etc. (número)
- `estado_pedido`: `{ id_estado: 1, nombre_estado: "Pendiente" }` (objeto)

---

#### `updateStatus(id: number, id_estado: number): Promise<void>`

**Función**: Cambia el estado de un pedido.

**Parámetros**:
- `id`: ID del pedido (`id_venta`)
- `id_estado`: Nuevo ID de estado (1: Pendiente, 2: En Proceso, 3: Entregado, 4: Cancelado)

**Uso**:
```typescript
await VentaService.updateStatus(5, 3); // Marcar pedido #5 como "Entregado"
```

**Actualización en DB**:
```typescript
.from('venta')
.update({ id_estado }) // ✅ Usa id_estado, NO id_estado_pedido
.eq('id_venta', id);
```

---

#### `getEstadosPedido(): Promise<EstadoPedido[]>`

**Función**: Obtiene la lista de estados disponibles.

**Retorno**:
```typescript
[
    { id_estado: 1, nombre_estado: "Pendiente" },
    { id_estado: 2, nombre_estado: "En Proceso" },
    { id_estado: 3, nombre_estado: "Entregado" },
    { id_estado: 4, nombre_estado: "Cancelado" }
]
```

---

## 🎨 Componentes UI

### `PedidoGridSection` - Tabla de Pedidos

**Ubicación**: `src/sections/adm/Pedido/PedidoGridSection.tsx`

**Responsabilidad**: Muestra la lista de pedidos con acciones rápidas.

#### Props
```typescript
interface PedidoGridSectionProps {
    pedidos: Venta[];
    onViewDetail: (pedido: Venta) => void;
    onUpdateStatus: (id: number, statusId: number) => void;
}
```

#### Características

**1. Visualización del Estado**
```tsx
<span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(pedido.estado_pedido?.nombre_estado)}`}>
    {pedido.estado_pedido?.nombre_estado || 'Sin Estado'}
</span>
```

- **Acceso**: `pedido.estado_pedido?.nombre_estado` (texto del estado)
- **Colores**: Asignados por `getStatusStyle()`:
  - Pendiente: Amarillo (`bg-yellow-100 text-yellow-800`)
  - En Proceso: Azul (`bg-blue-100 text-blue-800`)
  - Entregado: Verde (`bg-green-100 text-green-800`)
  - Cancelado: Rojo (`bg-red-100 text-red-800`)

**2. Selector de Estado Rápido**
```tsx
<select
    value={pedido.id_estado}  // ✅ CLAVE: Usa id_estado (número)
    onChange={(e) => onUpdateStatus(pedido.id_venta!, Number(e.target.value))}
    ...
>
    <option value="1">Pendiente</option>
    <option value="2">En Proceso</option>
    <option value="3">Entregado</option>
    <option value="4">Cancelado</option>
</select>
```

- **Binding**: `value={pedido.id_estado}` (el ID numérico)
- **onChange**: Llama a `onUpdateStatus` con el nuevo ID seleccionado

**3. Botón de Detalle**
```tsx
<button onClick={() => onViewDetail(pedido)}>
    <Eye className="w-5 h-5" />
</button>
```

---

### `PedidoDetailModal` - Vista Detallada

**Ubicación**: `src/sections/adm/Pedido/PedidoDetailModal.tsx`

**Responsabilidad**: Muestra toda la información del pedido en un modal.

#### Props
```typescript
interface PedidoDetailModalProps {
    pedido: Venta | null;
    onClose: () => void;
}
```

#### Secciones

**1. Información del Cliente**
```tsx
<p>Nombre: {pedido.cliente?.nombre_cliente} {pedido.cliente?.apellido_cliente}</p>
<p>Email: {pedido.cliente?.correo_cliente || 'N/A'}</p>
<p>Dirección: {pedido.direccion_envio || pedido.cliente?.direccion_cliente || 'N/A'}</p>
<p>Teléfono: {pedido.cliente?.telefono_cliente || 'N/A'}</p>
```

**2. Listado de Productos**
```tsx
{pedido.detalles?.map((detalle, index) => (
    <div key={index}>
        <p>{detalle.producto?.nombre_producto || 'Producto no encontrado'}</p>
        <p>Cantidad: {detalle.cantidad}</p>
        <p>${(detalle.cantidad * detalle.precio_unitario).toLocaleString()}</p>
    </div>
))}
```

**3. Resumen y Estado**
```tsx
<div>
    <span>Fecha:</span>
    <span>{pedido.fecha_venta ? new Date(pedido.fecha_venta).toLocaleString() : '-'}</span>
</div>
<div>
    <span>Estado:</span>
    <span className={`px-3 py-1 rounded-full ${getStatusStyle(pedido.estado_pedido?.nombre_estado)}`}>
        {pedido.estado_pedido?.nombre_estado || 'Desconocido'}
    </span>
</div>
<div>
    <span>Total:</span>
    <span>${pedido.total_venta?.toLocaleString()}</span>
</div>
```

- **Estado**: Usa `pedido.estado_pedido?.nombre_estado`
- **Estilos**: Mismo `getStatusStyle()` que el Grid para consistencia

---

## 🔄 Flujo Completo de Estados

### 1. Carga Inicial
```
Usuario → Pedidos.tsx → VentaService.getAll() → Supabase
                                                    ↓
                                        SELECT con relaciones:
                                        - cliente:id_comprador
                                        - estado_pedido:id_estado (*)
                                                    ↓
                                        Retorna Venta[] con:
                                        { 
                                            id_estado: 1,
                                            estado_pedido: { 
                                                id_estado: 1, 
                                                nombre_estado: "Pendiente" 
                                            }
                                        }
```

### 2. Visualización en Grid
```
PedidoGridSection recibe pedidos []
    ↓
Renderiza cada pedido:
    - Muestra: pedido.estado_pedido?.nombre_estado → "Pendiente"
    - Select value: pedido.id_estado → 1
    - Color: getStatusStyle("Pendiente") → Amarillo
```

### 3. Cambio de Estado
```
Usuario cambia select a "En Proceso" (value=2)
    ↓
onChange → onUpdateStatus(pedidoId, 2)
    ↓
VentaService.updateStatus(pedidoId, 2)
    ↓
Supabase: UPDATE venta SET id_estado = 2 WHERE id_venta = pedidoId
    ↓
Pedidos.tsx → loadPedidos() (recarga datos)
    ↓
Grid actualiza con nuevo estado
```

### 4. Ver Detalle
```
Usuario hace clic en botón Eye
    ↓
onViewDetail(pedido)
    ↓
Pedidos.tsx → setSelectedPedido(pedido)
    ↓
PedidoDetailModal recibe pedido
    ↓
Muestra: pedido.estado_pedido?.nombre_estado en resumen
```

---

## ✅ Verificación Post-Corrección

### Antes (❌ No funcionaba)
```typescript
// Modelo
id_estado_pedido?: number;

// Servicio
.update({ id_estado_pedido })

// Grid
<select value={pedido.id_estado_pedido}>
```

**Problema**: La columna en DB es `id_estado`, pero el código buscaba `id_estado_pedido` → `undefined` → "Sin Estado"

### Después (✅ Funciona)
```typescript
// Modelo
id_estado?: number;

// Servicio
.update({ id_estado })

// Grid
<select value={pedido.id_estado}>
```

**Resultado**: Coincidencia perfecta con la DB → el estado se muestra correctamente

---

## 🧪 Prueba Manual

1. **Navega a** `/admin/pedidos`
2. **Verifica que**:
   - La columna "Estado" muestra el nombre correcto (no "Sin Estado")
   - El select del estado tiene el valor correcto preseleccionado
   - Al cambiar el estado, se actualiza en la DB y la UI
3. **Haz clic en el ícono del ojo** para abrir el modal
4. **Verifica que**:
   - El campo "Estado" muestra el nombre correcto (no "Desconocido")
   - El color coincide con el estado

---

## 📝 Notas Importantes

- **Reinicio del servidor**: Después de cambiar los modelos TypeScript, es necesario reiniciar `npm run dev` para que Vite recargue los cambios.
- **Consistencia de nombres**: Todos los campos deben coincidir **exactamente** con los nombres de columna en Supabase.
- **Relaciones en Supabase**: La sintaxis `estado_pedido:id_estado (*)` crea una propiedad `estado_pedido` en el objeto, NO reemplaza `id_estado`.
