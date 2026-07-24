# Pábilo · Velas de autor

Web de **Pábilo**, una marca de velas artesanales hechas a mano en pequeñas tandas en las Islas Canarias por Claudia y Ana.

> *El fuego de los pequeños placeres.*

🔗 **En producción:** [pabilo-velas.pages.dev](https://pabilo-velas.pages.dev)

---

## Qué es

Landing page de una sola página, estática y rápida, construida con [Astro](https://astro.build). Todo el diseño es propio: la vela del hero, las mini-velas de las tarjetas y los iconos están dibujados **con CSS puro, sin imágenes**.

### Lo que incluye

| Bloque | Detalle |
|---|---|
| **Hero** | Vela encendida animada en CSS: llama que parpadea, halo que late, tarro con degradado y flotación suave |
| **Historia** | La historia de la marca con foto del taller sobre placa dorada |
| **Colección** | Cinta de tarjetas que rota sola en bucle continuo, se pausa al pasar el ratón y tiene flechas de control |
| **Taller de mezclas** | Combinador de aromas: eliges dos y te cuenta qué nace de la mezcla |
| **Wax melts** | Explicación del producto sin llama |
| **Regalo** | Packs a medida, tarjeta con dedicatoria, bodas y eventos |
| **Cómo pedimos** | Los tres pasos del proceso artesanal |
| **FAQ** | Acordeón con una pregunta abierta a la vez |
| **Opiniones** | Reseñas de clientas |
| **Contacto** | Sección oscura con CTA a WhatsApp + footer |
| **Asistente** | Chat con IA que responde dudas sobre las velas (ver más abajo) |

Todos los CTAs abren WhatsApp con un mensaje ya escrito según el contexto.

---

## Puesta en marcha

Requiere **Node 20** (ver `.nvmrc`).

```bash
npm install
```

```bash
npm run dev
```

La web queda en `http://localhost:4321`.

### Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la web estática en `dist/` |
| `npm run preview` | Sirve en local lo que hay en `dist/` |

---

## Estructura

```
src/
├── data/              ← todo el contenido editable vive aquí
│   ├── velas.js          colección, precios, duración y mezclas del taller
│   ├── contacto.js       WhatsApp, email, Instagram, ciudad
│   ├── faq.js            preguntas frecuentes
│   └── testimonios.js    reseñas (array vacío = sección oculta)
├── layouts/
│   └── Layout.astro   ← <head>, metadatos, Open Graph y fuentes
├── pages/
│   └── index.astro    ← la página completa + su JavaScript
├── styles/
│   └── global.css     ← sistema de diseño y todos los estilos
└── assets/            ← imágenes que Astro optimiza

public/
├── _worker.js         ← Worker de Cloudflare: sirve la web y expone /api/chat
├── favicon.svg
└── og.png             ← imagen al compartir en redes
```

### Editar el contenido

**No hace falta tocar el diseño para cambiar textos.** Todo está en `src/data/`:

- **Añadir o quitar una vela** → `velas.js`. Cada vela lleva nombre, nota sensorial, familia olfativa, precio, duración y el color de su círculo.
- **Cambiar el WhatsApp** → `contacto.js`. Formato internacional sin `+` ni espacios (ej. `34612345678`). Si lo dejas vacío, los botones de WhatsApp desaparecen solos.
- **Preguntas frecuentes** → `faq.js`.
- **Reseñas** → `testimonios.js`. Si dejas el array vacío `[]`, la sección no se muestra.

---

## Sistema de diseño

Los tokens están como variables CSS al principio de `src/styles/global.css`:

| | Color | |
|---|---|---|
| Fondo base | `#F7F0E2` | crema |
| Fondo alterno | `#F0E4CE` | arena |
| Tarjetas | `#FCF8EF` | |
| Texto principal | `#2A241E` | tinta |
| Acento de marca | `#C05A2B` | terracota |
| Sección oscura | `#2B2521` | |

**Tipografías:** [Newsreader](https://fonts.google.com/specimen/Newsreader) para lo editorial y emocional, [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) para la interfaz.

La web respeta `prefers-reduced-motion`: si el sistema pide reducir el movimiento, la llama deja de parpadear y la cinta de la colección se detiene.

---

## El asistente de chat

El botón de la esquina abre un chat que responde preguntas sobre las velas, los aromas, los envíos y los cuidados.

Funciona a través de `public/_worker.js`, que expone `POST /api/chat` como **proxy hacia [Groq](https://console.groq.com)**. La clave de API vive solo en el servidor y **nunca llega al navegador**.

Para activarlo en producción:

1. Consigue una clave gratuita en [console.groq.com](https://console.groq.com) → *API Keys*.
2. En Cloudflare: proyecto `pabilo-velas` → **Settings → Variables and secrets**.
3. Añade el secreto `GROQ_API_KEY`.
4. Vuelve a desplegar.

Si la clave no está configurada, el chat falla con elegancia e invita a escribir por WhatsApp.

---

## Despliegue

La web se publica en **Cloudflare Pages**. Hay dos formas:

**Subiendo el paquete a mano**

```bash
npm run build
```

Y arrastrar el contenido de `dist/` (o el zip) a Cloudflare Pages como nuevo deployment.

**Con Wrangler**

```bash
npx wrangler deploy
```

La configuración está en `wrangler.jsonc`.

---

## Pendiente

- [ ] Sustituir el número de WhatsApp de ejemplo (`34600000000`) por el real en `src/data/contacto.js`
- [ ] Cambiar los testimonios de ejemplo por reseñas auténticas
- [ ] Añadir fotos reales del taller en el bloque «Del taller»
- [ ] Configurar el dominio propio y actualizar `site` en `astro.config.mjs`

---

## Créditos

Diseño y desarrollo: **[William González](https://portafoliowilliam.pages.dev)**

*la elegancia de lo efímero*
