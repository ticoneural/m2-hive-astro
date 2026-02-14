# M2 Real Estate | Astro Institutional & Catalog

Este repositorio contiene la nueva versión del frontend de **M2 Real Estate**, migrado exitosamente desde SvelteKit a **Astro 5**. Diseñado con una estética de "Banca Privada", el sitio combina un rendimiento extremo con una gestión de catálogo dinámica integrada a la API de **The Hive**.

## 🚀 Tecnologías Core

*   **Framework**: [Astro 5.0](https://astro.build) (SSR Mode)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com) (Configuración simplificada y moderna)
*   **Icons**: [Lucide Astro](https://lucide.dev)
*   **API Integration**: [The Hive Agent API](https://api-m2.agenticantnest.com)
*   **Deployment**: [Vercel](https://vercel.com) (Estandarizado para Astro)

## 🏗️ Arquitectura del Proyecto

El proyecto sigue un enfoque de **MPA (Multi-Page Application)** para optimizar el SEO y la velocidad de carga inicial:

### Páginas Principales
*   `/`: Home cinemático con "Colección Destacada" animada.
*   `/propiedades`: Catálogo dinámico con filtros por precio y categoría.
*   `/propiedades/[sku]`: Páginas de detalle generadas bajo demanda (SSR) con galerías de imágenes y specs técnicos.
*   `/calculadora`: Módulo fiscal para el cálculo de gastos de cierre 2026.
*   `/zonas`: Agrupación de activos por tags geográficos y categorías.
*   `/nosotros`: Perfil institucional, "Board of Directors" y línea de tiempo corporativa.
*   `/contacto`: Canal seguro de briefing con estética de seguridad institucional.

### Componentes Clave
*   `ListingCard.astro`: Tarjetas de propiedades con efectos hover Premium.
*   `Navbar.astro`: Barra de navegación con efecto Glassmorphism por scroll.
*   `PropertyGallery.astro`: Visualizador de activos en alta resolución.
*   `TrustBadge.astro`: Sistema de acreditaciones (SUGEF, etc.).

## 🐝 Integración con The Hive

El frontend consume el endpoint `/api/v1/products` de forma asíncrona en el servidor.
*   **Mapeo de Datos**: Soporta campos de construcción (`size`), parqueos (`parking_spaces`), y galerías de imágenes optimizadas.
*   **Carga de Imágenes**: Integración con el sistema de optimización WebP del Agent para visualización instantánea.

## 🛠️ Desarrollo y Despliegue

### Instalación
```bash
npm install
```

### Modo Desarrollo
```bash
npm run dev
```

### Build y Despliegue (Vercel)
```bash
vercel --prod
```

---
**Desarrollado por**: GenessisDEV para [TicoNeural](https://ticoneural.com)
**Organización**: M2 Real Estate Institutional
