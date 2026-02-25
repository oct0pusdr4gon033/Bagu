# Guía de Implementación SEO para Bagu E-commerce

Esta guía explica la estrategia implementada para el posicionamiento en buscadores (SEO) del proyecto Bagu, así como los pasos que deberás seguir en el futuro cuando poseas un dominio activo en producción.

## Lo que se ha implementado actualmente

### 1. Sistema Dinámico de Metadatos con `react-helmet-async`
El e-commerce siendo una Aplicación de Página Única (SPA) construida en React, por defecto no cambia las etiquetas `<head>` de la página cuando navegas entre un producto y otro. Esto es muy malo para el SEO porque los robots de Google solo verían un título genérico ("Vite + React").

Para resolver esto:
- Se instaló `react-helmet-async`, permitiendo modificar el `<head>` del HTML real de forma asíncrona.
- Se configuró el `<HelmetProvider>` envolviendo la App global.
- Se creó un componente reutilizable `<SEO />` en `src/components/SEO.tsx`.

### 2. SEO a nivel de Producto (`DetalleProducto.tsx`)
Cada vez que un usuario (o un Bot de Google, Facebook, WhatsApp) entre a un producto, el componente `<SEO />` inyecta automáticamente:
- **`title`**: Dinámico (Ej. "Billetera Heritage | Bagu Luxury Leather"). Fundamental para el ranking de Google.
- **`description`**: Dinámica. Arrojará la descripción del producto o una sugerida enfocada a ventas ("Compra ahora en línea...").
- **Open Graph (og:tags)**: Son etiquetas que le dicen a Facebook, LinkedIn y WhatsApp qué imagen mostrar en la pequeña vista previa cuando pegas un enlace. Hemos configurado `og:image` para que apunte directamente a la foto principal del producto actual y el `og:type` como "product".

---

## Pasos obligatorios cuando tengas el Dominio Final

### 1. Actualizar el Dominio Canónico en el Componente
Ve al archivo `src/components/SEO.tsx` y cambia la constante `domain` por la URL oficial.
```tsx
// CAMBIAR ESTO
const domain = "https://tudominio.com"; 

// POR TU DOMINIO REAL EJEMPLO
const domain = "https://baguperu.com"; 
```

### 2. Generar el archivo `sitemap.xml`
Los Sitemaps le dicen a Google la estructura exacta de tu tienda. En Vite/React, lo recomendable es generar este archivo estático (por ejemplo con librerías o scripts CI/CD) o un archivo manual que coloques en la carpeta `public/sitemaps.xml` que exponga links a tus categorías vitales y rutas estáticas `/collections`, `/about`, entre otras.

### 3. Configurar tu archivo `robots.txt`
Crea un archivo llamado `robots.txt` dentro de la carpeta `public/` (si no existe) para que apunte al sitemap generado:
```txt
User-agent: *
Allow: /
Sitemap: https://(tu-dominio-aqui).com/sitemap.xml
```
*Asegúrate de denegar el acceso a las rutas protegidas para evitar indexar la administración: `Disallow: /admin/`*.

### 4. Herramientas de Medición (Google Search Console y Analytics)
- Crea una cuenta en [Google Search Console](https://search.google.com/search-console). Verifica la propiedad de tu dominio usando el registro TXT de tu proveedor (GoDaddy, Namecheap, etc.)
- Inyecta el ID o script que proporcionan en el `<head>` principal del archivo `index.html` estático en la raíz del proyecto.
- Haz lo mismo para Google Analytics (etiqueta G-XXXX) para entender de dónde vienen tus compradores.

### 5. Server Side Rendering (SSR) o Pre-rendereo (Recomendación Avanzada)
Si a pesar de usar Helmet Async, notas que las vistas previas dinámicas fallan o Google no indexa tus productos rápida y profundamente:
Considera implementar en el servidor Node/Express utilidades como `prerender.io` u opciones nativas. En aplicaciones SPA puras como esta, los robots de redes sociales no suelen ejecutar Javascript lo suficientemente rápido. El Prerendering envía la página "ya cocinada" con todos los datos de SEO a los Bots, resolviendo este problema del 100%.
