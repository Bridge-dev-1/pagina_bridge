@AGENTS.md

# Bridge Service — pagina_bridge

Sitio web corporativo de **Bridge Service Co., Ltd.**, empresa japonesa de gestión de personal (派遣・HR). Interfaz completamente bilingüe japonés/español. Stack: Next.js 16.2.4 · React 19.2.4 · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis.

---

## Estructura de directorios

```
src/
  app/
    page.tsx              ← Home (landing de una sola página)
    layout.tsx            ← Root layout + metadata global
    globals.css           ← Variables CSS, keyframes, utilidades globales
    faq/
      page.tsx            ← Metadata de la ruta /faq
      FAQContent.tsx      ← Acordeón de preguntas frecuentes
    margen/
      page.tsx            ← Metadata de la ruta /margen
      MargenContent.tsx   ← Tabla de tasas de margen + descarga PDF
    trabajo/
      page.tsx            ← Metadata de la ruta /trabajo
      TrabajoContent.tsx  ← Chatbot interactivo para búsqueda de empleo
    privacy/
      page.tsx            ← Metadata de la ruta /privacy
      PrivacyContent.tsx  ← Política de privacidad
  components/
    Navbar.tsx            ← Header fijo, menú mobile, toggle de idioma
    Hero.tsx              ← Sección hero con parallax
    Vision.tsx            ← Sección visión/nosotros
    Services.tsx          ← Tarjetas de servicios (Dispatch / HR Support)
    Attorneys.tsx         ← Información del representante
    MapContact.tsx        ← Formulario de contacto (mailto:) + mapa Google
    Footer.tsx            ← Pie de página con links y redes sociales
    BackToTop.tsx         ← Botón scroll-to-top
    LineButton.tsx        ← Botón flotante de LINE
    ScrollProgress.tsx    ← Barra de progreso de scroll
    Marquee.tsx           ← Marquesina animada de servicios
    ScrollReveal.tsx      ← Wrapper Intersection Observer para animaciones
    SmoothScroll.tsx      ← Integración con Lenis
    PageTransition.tsx    ← Transiciones de página con Framer Motion
    FAQ.tsx               ← Componente acordeón reutilizable
    MarginTable.tsx       ← Tabla de información de margen
  contexts/
    LangContext.tsx       ← Context global de idioma (ja | es)
  hooks/
    useInView.ts          ← Hook de Intersection Observer
  lib/
    translations.ts       ← Objeto i18n completo (t.ja / t.es)
public/
  logo.png
  porcentaje_de_margen.pdf  ← Descargable desde /margen
```

---

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing de una página con Hero, Marquee, Vision, Services, Attorneys, MapContact, Footer |
| `/faq` | 6 preguntas frecuentes sobre el servicio de despacho, en acordeón |
| `/margen` | Transparencia de tasas de margen (82 trabajadores, 10 empresas clientes, 31.5% promedio) |
| `/trabajo` | Chatbot que recopila datos del candidato y conecta por WhatsApp |
| `/privacy` | Política de privacidad en 8 secciones |

---

## Sistema de idiomas

- **Proveedor:** `src/contexts/LangContext.tsx` expone `useLang()` → `{ lang, setLang, tr }` donde `lang: "ja" | "es" | "en" | "pt"`.
- **Textos:** `src/lib/translations.ts` exporta el objeto `t` con sub-objetos `t.ja`, `t.es`, `t.en` y `t.pt` que cubren toda la UI.
- **Uso en componentes:** `const { tr } = useLang();` (ya resuelto al idioma activo).
- El selector de idioma en desktop es un dropdown (Globe + ChevronDown) en el `Navbar`. En mobile aparece como una fila de 4 botones (JA / ES / EN / PT) en la parte superior del menú.

---

## Paleta de colores (variables CSS)

```css
--navy:  #1B3A6B   /* azul marino principal */
--blue:  #4A9FD4   /* azul medio (acentos) */
--sky:   #7CC4E8   /* azul claro */
--light: #F8FAFC   /* fondo claro */
--dark:  #1A1A2E   /* fondo oscuro */
```

---

## Animaciones y efectos

- **Smooth scroll:** Lenis (`SmoothScroll.tsx` envuelve toda la app en `layout.tsx`).
- **Page transitions:** Framer Motion en `PageTransition.tsx`.
- **Scroll reveal:** `ScrollReveal.tsx` usa `IntersectionObserver`; `useInView.ts` es el hook base.
- **Parallax:** Hero usa `window.scrollY` directo.
- **Keyframes CSS:** `fadeInUp`, `fadeIn`, `float`, `slideInLeft`, `marquee-left`, `marquee-right` en `globals.css`.
- **Marquee:** pausa al hacer hover.

---

## Dependencias principales

| Paquete | Versión | Uso |
|---------|---------|-----|
| `next` | 16.2.4 | Framework |
| `react` / `react-dom` | 19.2.4 | UI |
| `framer-motion` | ^12.38.0 | Animaciones de página |
| `lenis` | ^1.3.23 | Smooth scroll |
| `lucide-react` | ^1.8.0 | Iconos |
| `tailwindcss` | ^4 | Estilos |
| `@tailwindcss/postcss` | ^4 | Plugin PostCSS |
| `typescript` | ^5 | Tipado |

---

## Convenciones del proyecto

- Componentes de página con interactividad usan `"use client"` al inicio del archivo.
- Los archivos `page.tsx` dentro de cada ruta solo exportan metadata (server component); el contenido real vive en `*Content.tsx` con `"use client"`.
- Path alias `@/*` apunta a `./src/*`.
- Tailwind v4: no hay `tailwind.config.*`; la configuración se hace en CSS con `@theme`.
- El formulario de contacto abre el cliente de email del usuario via `mailto:` (no hay backend ni API routes).
- WhatsApp se integra construyendo una URL `https://wa.me/` con los datos recopilados por el chatbot de `/trabajo`.
- LINE se integra como botón flotante con enlace directo.

---

## Empresa

- **Nombre:** Bridge Service Co., Ltd. (ブリッジサービス株式会社)
- **Email:** admin@bridgeservice.co.jp
- **Servicio principal:** Despacho de trabajadores (人材派遣) y soporte de gestión de RRHH en Japón
- **Público objetivo:** Trabajadores extranjeros en Japón y empresas clientes japonesas
- **Redes:** Facebook, Instagram
- **Comunicación:** Email, WhatsApp, LINE, formulario web
