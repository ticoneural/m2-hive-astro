# Integración M2 Real Estate x The Hive (v0.7.2)

Este documento detalla la integración técnica entre el frontend de M2 Real Estate (SvelteKit) y el motor backend The Hive Agent.

## 📡 Arquitectura de Consumo

El frontend consume la API REST pública de The Hive para obtener el inventario en tiempo real.

- **Base URL**: `https://api-m2.agenticantnest.com`
- **Endpoints Utilizados**:
  - `GET /api/v1/products`: Listado general con paginación y filtros.
  - `GET /api/v1/products/{sku}`: Detalle atómico de propiedad con especificaciones completas.

## 🖼️ Componentes Desarrollados

### 1. Página de Detalle Dinámica (`src/routes/propiedades/[slug]`)
Implementa Server-Side Rendering (SSR) para garantizar SEO y Open Graph Tags.
- **Carga de Datos**: Realiza `fetch` directo al backend usando el SKU de la URL.
- **Mapeo de Datos**: Transforma el JSON flexible de The Hive (`specifications`) a una estructura tipada para la UI (`specs.beds`, `specs.sqm`).
- **SEO/OG**: Inyecta etiquetas `<meta>` dinámicas en el `<head>` para que al compartir en WhatsApp/Facebook aparezca:
  - Título de la Propiedad
  - Precio Actualizado
  - Imagen Principal (URL Absoluta)

### 2. Modal Inspirador (`src/lib/components/PropertyModal.svelte`)
Componente de UI para "Vista Rápida" dentro de los listados.
- **Diseño**: Glassmorphism con Tailwind CSS (`backdrop-blur`).
- **Funcionalidad**: Muestra una síntesis visual (Foto, Precio, Highlights) y un botón de "Ver Detalles".

## 🔧 Configuración de Imágenes

El backend (The Hive v0.7.2) ha sido configurado para devolver **URLs Absolutas** en el campo `images`.
- Formato: `https://api-m2.agenticantnest.com/products/{sku}-img{n}.webp`
- **Importante**: No se requiere configuración de proxy en `vite.config.ts` ni en Vercel, ya que las imágenes se sirven directamente desde el origen con los headers CORS correctos (`Access-Control-Allow-Origin: *`).

## 🚀 Despliegue en Vercel

Al hacer push a `main`, Vercel detectará la aplicación SvelteKit.
- **Environment Variables**: No se requieren variables secretas para la API pública, ya que la URL está hardcodeada como endpoint de producción.
- **Build**: `npm run build` generará las rutas estáticas y serverless functions necesarias.

---
**Mantenimiento**:
Si se añaden nuevos campos a la IA de The Hive (ej: "Amenidades de Lujo"), se deben actualizar el mapeo en `+page.svelte` para mostrarlos en la UI.
