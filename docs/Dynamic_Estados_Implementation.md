# Solución: Carga Dinámica de Estados desde la Base de Datos

## Problema

Los estados en el selector de la tabla estaban hardcodeados:
```tsx
<option value="1">Pendiente</option>
<option value="2">En Proceso</option>
<option value="3">Entregado</option>
<option value="4">Cancelado</option>
```

Esto causaba:
- ❌ Falta de flexibilidad (no podían agregarse estados desde la DB)
- ❌ Posible desincronización entre los estados en el código y los estados reales en la DB
- ❌ El estado del pedido no se mostraba correctamente (problema de FK)

## Solución Implementada

### 1. Servicio de Estados
**Archivo creado**: [`src/services/Estado.service.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/services/Estado.service.ts)

```typescript
import { EstadoPedido } from "../models/EstadoPedido";
import { supabase } from "../lib/supabase";

export const getEstados = async (): Promise<EstadoPedido[]> => {
    const { data, error } = await supabase
        .from('estado_pedido')
        .select('*')
        .order('nombre_estado', { ascending: true });

    if (error) throw error;
    return data as EstadoPedido[];
};
```

**Función**: Obtiene todos los estados desde la tabla `estado_pedido` ordenados alfabéticamente.

---

### 2. Carga de Estados en `Pedidos.tsx`

**Cambios**:

1. **Importaciones**:
```typescript
import { EstadoPedido } from '../../models/EstadoPedido';
import { getEstados } from '../../services/Estado.service';
```

2. **Nuevo State**:
```typescript
const [estados, setEstados] = useState<EstadoPedido[]>([]);
```

3. **Función de carga**:
```typescript
const loadEstados = async () => {
    try {
        const data = await getEstados();
        console.log('Estados cargados:', data);
        setEstados(data);
    } catch (error) {
        console.error('Error cargando estados:', error);
    }
};
```

4. **Llamada en `useEffect`**:
```typescript
useEffect(() => {
    loadPedidos();
    loadEstados(); // ← Nueva línea
}, []);
```

5. **Pasar como prop**:
```typescript
<PedidoGridSection
    pedidos={filteredPedidos}
    estados={estados}  // ← Nueva prop
    onViewDetail={setSelectedPedido}
    onUpdateStatus={handleUpdateStatus}
/>
```

---

### 3. Renderizado Dinámico en `PedidoGridSection.tsx`

**Cambios**:

1. **Importación**:
```typescript
import { EstadoPedido } from '../../../models/EstadoPedido';
```

2. **Props actualizada**:
```typescript
interface PedidoGridSectionProps {
    pedidos: Venta[];
    estados: EstadoPedido[];  // ← Nueva prop
    onViewDetail: (pedido: Venta) => void;
    onUpdateStatus: (id: number, statusId: number) => void;
}
```

3. **Desestructuración**:
```typescript
export default function PedidoGridSection({ 
    pedidos, 
    estados,  // ← Nueva prop
    onViewDetail, 
    onUpdateStatus 
}: PedidoGridSectionProps) {
```

4. **Select dinámico**:
```typescript
<select
    value={pedido.id_estado || ''}
    onChange={(e) => onUpdateStatus(pedido.id_venta!, Number(e.target.value))}
    className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:border-[#742f37]"
>
    {estados.map((estado) => (
        <option key={estado.id_estado} value={estado.id_estado}>
            {estado.nombre_estado}
        </option>
    ))}
</select>
```

---

## Flujo Actualizado

```
1. Usuario abre /admin/pedidos
        ↓
2. Pedidos.tsx se monta
        ↓
3. useEffect ejecuta:
   - loadPedidos() → Carga pedidos con estado_pedido
   - loadEstados() → Carga lista de estados
        ↓
4. Estados se pasan a PedidoGridSection como prop
        ↓
5. Grid renderiza select con estados dinámicos
        ↓
6. Usuario puede ver y seleccionar estados reales de la DB
```

---

## Beneficios

✅ **Flexibilidad**: Los estados se cargan dinámicamente desde la DB  
✅ **Sincronización**: Siempre muestra los estados actuales de la tabla `estado_pedido`  
✅ **Mantenibilidad**: Si se agregan nuevos estados en la DB, aparecen automáticamente  
✅ **Corrección**: El valor del select refleja correctamente el `id_estado` del pedido  

---

## Verificación

### Console Logs

Al abrir la página de pedidos, deberías ver en la consola del navegador:

```
Pedidos cargados: [{id_venta: 1, id_estado: 1, estado_pedido: {...}, ...}, ...]
Estados cargados: [{id_estado: 1, nombre_estado: "Pendiente"}, ...]
```

### Verificación Manual

1. Abre `http://localhost:5174/admin/pedidos`
2. Verifica que el select de estados muestre los valores de la DB
3. Verifica que el estado actual del pedido esté seleccionado
4. Cambia el estado y verifica que se actualice

---

## Archivos Modificados

**Nuevos** (1):
- [`src/services/Estado.service.ts`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/services/Estado.service.ts)

**Modificados** (2):
- [`src/Pagues/Admin/Pedidos.tsx`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/Pagues/Admin/Pedidos.tsx)
- [`src/sections/adm/Pedido/PedidoGridSection.tsx`](file:///c:/Users/Lenovo/Desktop/Bagu/ecommerce/src/sections/adm/Pedido/PedidoGridSection.tsx)

---

## Nota sobre la Relación FK

El problema original de que "el estado se pasa como FK y solo muestra números" se resuelve con la consulta de Supabase en `VentaService.getAll()`:

```typescript
.select(`
    *,
    estado_pedido:id_estado (*)  // ← Popula el objeto completo
`)
```

Esto hace que cada `Venta` tenga:
- `id_estado`: 1 (número)
- `estado_pedido`: `{ id_estado: 1, nombre_estado: "Pendiente" }` (objeto)

Por lo tanto:
- **Para mostrar**: usamos `pedido.estado_pedido?.nombre_estado`
- **Para el select value**: usamos `pedido.id_estado`
