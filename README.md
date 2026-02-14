# M2 Real Estate | Astro Institutional Platform

> **Status:** Production Ready (v2.0 - "Professional Realism")
> **Agency:** TicoNeural Studio
> **Client:** M2 Real Estate Institutional

Este repositorio aloja la plataforma web de nueva generación para **M2 Real Estate**, diseñada bajo la filosofía de "Banca Privada": sobriedad, velocidad extrema y confianza institucional.

Migrado de SvelteKit a **Astro 5.0**, este proyecto utiliza un enfoque de **MPA (Multi-Page Application)** con hidratación selectiva (Islas) para garantizar un rendimiento de clase mundial (Lighthouse 95+).

---

## 🚀 Stack Tecnológico

| Componente | Tecnología | Justificación |
| :--- | :--- | :--- |
| **Core Framework** | [Astro 5.0](https://astro.build) | Renderizado estático (SSG) por defecto con SSR para rutas dinámicas. Cero JS innecesario. |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com) | Sistema de diseño atómico. Paleta "OLED Black" & "Gold Accent". |
| **API Layer** | [The Hive Agent](https://api-m2.agenticantnest.com) | Consumo de datos inmobiliarios procesados por IA. |
| **Despliegue** | Vercel (Serverless) | Infraestructura global Edge con invalidación de caché instantánea. |
| **Iconografía** | Lucide Astro | Iconos SVG ligeros y consistentes. |

---

## 🏗️ Arquitectura del Sistema

### 1. Estructura de Directorios Clave

```
/src
├── /components    # Átomos UI (ListingCard, Navbar, TrustBadge)
├── /layouts       # Layout principal con ViewTransitions
├── /lib           # Lógica de negocio (api.ts - Caching Layer)
├── /pages         # Rutas del sistema (File-based routing)
│   ├── /propiedades
│   │   ├── index.astro       # Catálogo con filtros reactivos
│   │   └── [sku].astro       # Detalle de propiedad (SSR)
│   ├── guia-inmision-email.astro  # Herramienta interna protegida
│   └── index.astro           # Landing Page cinemática
└── /styles        # CSS global y fuentes personalizadas
```

### 2. Optimización de Rendimiento

- **View Transitions:** Navegación tipo SPA sin la complejidad de React Router.
- **Server Cache (60s):** Capa de caché en `src/lib/api.ts` usando `globalThis` para persistencia en Vercel Functions. Reduce latencia de API externa.
- **Client-Side Filtering:** Fallback robusto en el cliente para filtrado de propiedades si la API no responde parámetros complejos.

---

## 📦 Instalación y Desarrollo

### Prerrequisitos

- Node.js v18+
- npm v9+

### Pasos Iniciales

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/ticoneural/m2-real-estate-pro.git
    cd m2-real-estate-pro
    ```

2. **Instalar dependencias:**

    ```bash
    npm install
    ```

3. **Iniciar servidor de desarrollo:**

    ```bash
    npm run dev
    ```

    El sitio estará disponible en `http://localhost:4321`.

---

## 🛠️ Guía de Uso (Interna)

### Gestión de Propiedades (The Hive)

El catálogo se alimenta automáticamente mediante correos electrónicos procesados por IA.
- **Guía Privada:** Visitar `/guia-inmision-email` (Local o Prod) para ver el formato de envío de correos.
- **Recurso:** Esta página es `noIndex` para evitar indexación pública.

### Despliegue en Producción

El proyecto está configurado para **Vercel**. Cualquier push a la rama `main` disparará un deploy automático.

```bash
vercel --prod
```

---

## 🎨 Sistema de Diseño "Professional Realism"

- **Tipografía:**
  - *Serif:* "Playfair Display" (Títulos de alto impacto, Hero).
  - *Sans:* "Lato" (Datos técnicos, UI, Lectura).
- **Colores:**
  - `brand-primary`: `#0A192F` (Navy Profundo/OLED Black)
  - `brand-accent`: `#D4AF37` (Dorado Institucional)
  - `brand-surface`: `#112240` (Capas superiores)

---

**© 2026 TicoNeural Studio.** Todos los derechos reservados.
*Código propietario para uso exclusivo de M2 Real Estate.*
