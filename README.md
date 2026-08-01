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
├── i18n/              ← los textos de la interfaz, por idioma
│   ├── es.js             español
│   ├── en.js             inglés
│   └── index.js          carga los idiomas y traduce los datos
├── components/
│   └── Landing.astro  ← la web entera + su JavaScript, en el idioma que reciba
├── layouts/
│   └── Layout.astro   ← <head>, metadatos, Open Graph, hreflang y fuentes
├── pages/
│   ├── index.astro       la web en español  →  /
│   └── en/index.astro    la web en inglés   →  /en/
├── styles/
│   └── global.css     ← sistema de diseño y todos los estilos
└── assets/            ← imágenes que Astro optimiza

public/
├── _worker.js         ← Worker de Cloudflare: sirve la web y expone /api/chat
├── robots.txt
├── sitemap.xml
├── favicon.svg
└── og.jpg             ← imagen al compartir (1200×630)
```

### Editar el contenido

**No hace falta tocar el diseño para cambiar textos.** Todo está en `src/data/`:

- **Añadir o quitar una vela** → `velas.js`. Cada vela lleva nombre, nota sensorial, familia olfativa, precio, duración y el color de su círculo.
- **Cambiar el WhatsApp** → `contacto.js`. Formato internacional sin `+` ni espacios (ej. `34612345678`). Si lo dejas vacío, los botones de WhatsApp desaparecen solos.
- **Preguntas frecuentes** → `faq.js`.
- **Reseñas** → `testimonios.js`. Si dejas el array vacío `[]`, la sección no se muestra.

---

## Los dos idiomas

La web está en español (`/`) y en inglés (`/en/`), con un selector **ES / EN** en la
barra superior. Ambas comparten diseño y datos, así que solo hay que mantener una.

**Para cambiar un texto de la interfaz** (botones, títulos, mensajes del chat):
está en `src/i18n/es.js` y su equivalente en `src/i18n/en.js`. Las claves son las
mismas en los dos archivos.

**Para traducir contenido** (velas, FAQ, reseñas): en `src/data/` cada campo tiene
su versión inglesa con el sufijo `_en`.

```js
nombre: 'Lavanda',
nombre_en: 'Lavender',
```

> Si olvidas una traducción no se rompe nada: esa web muestra el texto en español.
> Añadir una vela nueva sin `_en` funciona, simplemente saldrá en español en `/en/`.

El asistente de chat también responde en el idioma de la página: la web le manda
cuál es y el Worker ajusta sus instrucciones.

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

La web se publica sola en **Cloudflare Pages**: el proyecto está conectado a este
repositorio, así que **cada push a `main` lanza un despliegue nuevo**. No hay que
subir nada a mano.

```bash
git push origin main
```

En unos dos minutos está publicado. El progreso se ve en Cloudflare →
Workers & Pages → `pabilo-velas` → **Deployments**.

### Configuración del proyecto en Cloudflare

Si alguna vez hay que reconectar el repositorio, estos son los ajustes:

| Ajuste | Valor |
|---|---|
| Framework preset | Astro (o *None*) |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Production branch | `main` |
| Variable de entorno | `NODE_VERSION` = `20` |
| Secreto | `GROQ_API_KEY` (para el chat) |

El chat viaja en `public/_worker.js`, que Astro copia a `dist/` durante el build,
así que se despliega junto con la web sin pasos extra.

> ⚠️ Al conectar el repositorio, Cloudflare **desactiva la subida manual** de
> archivos: a partir de ahí, la única vía es hacer push.

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
