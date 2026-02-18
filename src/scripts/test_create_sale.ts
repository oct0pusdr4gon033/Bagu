import { VentaService } from '../services/Venta.service';

export const testCreateSale = async () => {
    console.log("Starting Test Sale Creation...");
    try {
        const fakeVenta = {
            total_venta: 100,
            direccion_envio: "Test Address",
            notas: "Test Sale from Script",
            fecha_venta: new Date(),
            // Assuming we have a valid client and order type. 
            // You might need to adjust these IDs based on your actual data.
            id_estado: 1
        };

        const fakeDetalles = [
            {
                cantidad: 1,
                precio_unitario: 100,
                // Assuming a valid product ID exists
                id_producto: 1
            }
        ];

        console.log("Data to send:", { fakeVenta, fakeDetalles });

        const result = await VentaService.create(fakeVenta, fakeDetalles);
        console.log("Test Sale Created Successfully!", result);
        return result;
    } catch (error) {
        console.error("Test Sale Failed:", error);
    }
};
