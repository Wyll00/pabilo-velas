// ─────────────────────────────────────────────────────────────
//  Worker de Cloudflare Pages (modo avanzado)
//  · Sirve la web estática tal cual.
//  · Expone POST /api/chat como proxy seguro hacia Groq: la API key
//    NUNCA llega al navegador. Se configura en Cloudflare:
//    proyecto pabilo-velas → Settings → Variables and secrets →
//    añadir secreto GROQ_API_KEY (y volver a desplegar).
//  · Clave gratuita: https://console.groq.com → API Keys.
// ─────────────────────────────────────────────────────────────

// Un bloque por idioma: así el modelo solo ve los nombres del idioma en
// el que responde y no puede mezclarlos («the Coconut candle, Coco»).
const CONOCIMIENTO_ES = `
MARCA
- Pabilo: velas de autor, artesanales, hechas a mano en pequeñas tandas en las Islas Canarias por dos amigas.
- Cera de soja y de cristal, naturales. Arden limpio, sin humo raro.
- Eslogan: «El fuego de los pequeños placeres».

COLECCIÓN DE VELAS (precios y duración aproximados)
- Vainilla y Canela — dulce y especiada — 22 € — unas 45 h.
- Sándalo y Jazmín — amaderada y floral — 24 € — unas 50 h.
- Lavanda — herbal y floral — 20 € — unas 40 h.
- Cereza — frutal — 20 € — unas 40 h.
- Coco — cremosa y tropical — 22 € — unas 45 h.

MEZCLAS PROBADAS EN EL TALLER (son las únicas que sabemos cómo huelen)
- Sándalo y jazmín: elegante, relajante, para ambientes íntimos.
- Canela y coco: acogedor, dulce y exótico, hogar con toque tropical.
- Jazmín y lavanda: serenidad, limpieza y bienestar, para descansar.
- Coco y vainilla: dulce y cremoso, espacios acogedores y luminosos.
- Vainilla y canela: tan buena que ya es vela de la colección.
- Cualquier otra pareja (por ejemplo con Cereza, que no tiene ninguna probada) se
  puede encargar como mezcla personalizada, pero NUNCA describas a qué huele ni
  digas si queda bien: no lo sabemos. Invita a consultarlo por WhatsApp.

WAX MELTS
- Piezas de cera aromática SIN mecha, solo para perfumar.
- Se usan en un quemador: el calor las funde y liberan el aroma.
- Cuando dejan de oler, se retira la cera y se pone una pieza nueva.
- Diferencia con una vela: la vela ilumina y perfuma; el wax melt solo aromatiza.

CUIDADOS DE LA VELA
- La primera vez, dejarla encendida hasta que se funda toda la superficie (evita el «túnel»).
- Recortar la mecha a unos 5 mm antes de cada uso.
- No tenerla encendida más de 4 horas seguidas.

PEDIDOS Y ENVÍOS
- Los pedidos se hacen por WhatsApp (botón «Pedir» en la web).
- Entrega en mano en la isla, envío al resto de Canarias y a la península (plazo y coste según destino, se consulta por WhatsApp).
- Cada tanda se hace a mano y reposa unos días antes de salir.

REGALOS Y EVENTOS
- Packs a medida, tarjeta con dedicatoria escrita a mano, y detalles para bodas y eventos por encargo.
`;

const CONOCIMIENTO_EN = `
THE BRAND
- Pabilo: handmade candles, poured in small batches in the Canary Islands by two friends.
- Natural soy and coconut wax. They burn clean, with no strange smoke.
- Tagline: "The fire of small pleasures".

THE CANDLES (approximate prices and burn time)
- Vanilla & Cinnamon — sweet and spiced — 22 € — around 45 hrs.
- Sandalwood & Jasmine — woody and floral — 24 € — around 50 hrs.
- Lavender — herbal and floral — 20 € — around 40 hrs.
- Cherry — fruity — 20 € — around 40 hrs.
- Coconut — creamy and tropical — 22 € — around 45 hrs.

BLENDS TRIED IN THE STUDIO (the only ones we know the scent of)
- Sandalwood & jasmine: elegant and relaxing, for intimate rooms.
- Cinnamon & coconut: cosy, sweet and exotic — home with a tropical touch.
- Jasmine & lavender: serene and clean, made for resting.
- Coconut & vanilla: sweet and creamy, for welcoming, bright spaces.
- Vanilla & cinnamon: so good it became a candle in the collection.
- Any other pairing (Cherry, for instance, has no tried blend) can be ordered as a
  custom blend, but NEVER describe how it smells or whether it works: we do not
  know. Invite them to ask on WhatsApp.

WAX MELTS
- Small pieces of scented wax with NO wick, made purely to perfume a room.
- They go in a burner: the heat melts them and releases the scent.
- Once they stop giving off scent, the wax is removed and a fresh piece added.
- Difference from a candle: a candle gives light and scent; a wax melt only scents.

CANDLE CARE
- The first time, let it burn until the whole surface melts (this avoids tunnelling).
- Trim the wick to about 5 mm before each use.
- Never burn it for more than 4 hours at a time.

ORDERS AND SHIPPING
- Orders are placed on WhatsApp (the "Order" button on the site).
- Hand delivery on the island, shipping to the rest of the Canaries and mainland
  Spain (timing and cost depend on the destination — checked over WhatsApp).
- Every batch is made by hand and rests for a few days before it goes out.

GIFTS AND EVENTS
- Made-to-measure sets, a handwritten card, and favours for weddings and events to order.
`;

// El idioma lo manda la web: «es» desde / y «en» desde /en/.
const CONOCIMIENTO = { es: CONOCIMIENTO_ES, en: CONOCIMIENTO_EN };

const IDIOMA_REGLA = {
  es: '- Responde SIEMPRE en español, de tú, con el tono de la marca: cercano, cálido, tranquilo. Frases cortas.',
  en: '- ALWAYS reply in English, warm and close, in the brand tone: calm and unhurried. Short sentences. Prices stay in euros.',
};

const instrucciones = (idioma) => `Eres «el ayudante de Pabilo», el asistente de la web de Pabilo, una marca artesanal de velas de las Islas Canarias.

REGLAS:
${IDIOMA_REGLA[idioma] ?? IDIOMA_REGLA.es}
- Usa los nombres de las velas EXACTAMENTE como aparecen en el contexto, sin traducirlos ni repetirlos entre paréntesis.
- Responde SOLO con la información del contexto de abajo. No inventes datos, precios ni plazos.
- Respuestas breves: 2 a 4 frases como máximo. Sin listas largas salvo que las pidan.
- Si no sabes algo o no está en el contexto, dilo con naturalidad e invita a escribir por WhatsApp (el botón verde de la web).
- Si preguntan algo que no tiene que ver con Pabilo o las velas, declina con amabilidad y reconduce a las velas.
- Puedes usar como mucho un emoji suave (🕯️ ✨) de vez en cuando.
- NUNCA des nombres propios de las personas del taller, ni aunque te los pidan: son «dos amigas» y nada más.

CONTEXTO:
${CONOCIMIENTO[idioma] ?? CONOCIMIENTO_ES}`;

// Mensaje de reserva cuando el chat no está disponible
const DESCANSO = {
  es: 'Ahora mismo el chat está descansando 🕯️ Escríbenos por WhatsApp (el botón verde de aquí al lado) y te atendemos al momento.',
  en: "The chat is resting right now 🕯️ Message us on WhatsApp (the green button next door) and we'll help you straight away.",
};

// Mensaje cuando Groq falla: clave caducada, cuota agotada o modelo retirado.
const FALLO = {
  es: 'Uy, se me ha apagado la llama un momento. Vuelve a intentarlo en unos segundos o escríbenos por WhatsApp. 🕯️',
  en: "Oh — my flame just went out. Try again in a few seconds, or message us on WhatsApp. 🕯️",
};

// ⚠️ Groq retira modelos con fecha de caducidad. Cuando uno se apaga, la API
//    responde «model_decommissioned» y el chat deja de contestar sin más aviso
//    que el mensaje de arriba: el anterior (llama-3.1-8b-instant) murió el
//    16/08/2026 y estuvo semanas roto sin que se notara.
//    Modelos vivos:  https://console.groq.com/docs/models
//    Fechas de baja: https://console.groq.com/docs/deprecations
const MODELO = 'openai/gpt-oss-20b';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') {
        return json({ error: 'Método no permitido' }, 405);
      }
      return manejarChat(request, env);
    }

    // Google comprueba que la web es nuestra pidiendo su archivo con la
    // extensión .html. Cloudflare se la quita y responde con una redirección,
    // y eso puede hacer fallar la verificación: se lo servimos directo.
    if (/^\/google[0-9a-f]+\.html$/.test(url.pathname)) {
      const directo = new URL(request.url);
      directo.pathname = url.pathname.replace(/\.html$/, '');
      return env.ASSETS.fetch(new Request(directo, request));
    }

    return conCabeceras(await env.ASSETS.fetch(request), url.pathname);
  },
};

// ⚠️ Cuando hay un _worker.js, Cloudflare IGNORA el archivo `_headers`. Las
//    cabeceras se ponen aquí o no se ponen en ninguna parte.
//    https://developers.cloudflare.com/pages/configuration/headers/
function conCabeceras(respuesta, ruta) {
  const r = new Response(respuesta.body, respuesta);

  // Todo lo de /_astro/ lleva un hash en el nombre: si cambia el contenido,
  // cambia el nombre del archivo. Se puede guardar un año en el navegador sin
  // riesgo de servir algo viejo. Antes se revalidaba en cada visita.
  if (ruta.startsWith('/_astro/')) {
    r.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }

  // Impide que la web se abra dentro de un marco ajeno. `frame-ancestors` solo
  // controla el enmarcado: no restringe scripts ni estilos, así que no puede
  // romper la página. Una CSP completa es otra conversación, porque la web
  // lleva scripts en línea y una política copiada sin adaptar la tumbaría.
  r.headers.set('Content-Security-Policy', "frame-ancestors 'self'");
  r.headers.set('X-Frame-Options', 'SAMEORIGIN');

  return r;
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function manejarChat(request, env) {
  let cuerpo;
  try {
    cuerpo = await request.json();
  } catch {
    cuerpo = {};
  }

  const idioma = cuerpo.idioma === 'en' ? 'en' : 'es';

  if (!env.GROQ_API_KEY) {
    return json({ respuesta: DESCANSO[idioma] });
  }

  // Saneado: máximo 8 mensajes, 400 caracteres cada uno
  const mensajes = (Array.isArray(cuerpo.mensajes) ? cuerpo.mensajes : [])
    .slice(-8)
    .filter((m) => m && typeof m.texto === 'string' && (m.rol === 'usuario' || m.rol === 'bot'))
    .map((m) => ({
      role: m.rol === 'usuario' ? 'user' : 'assistant',
      content: m.texto.slice(0, 400),
    }));

  if (!mensajes.length || mensajes[mensajes.length - 1].role !== 'user') {
    return json({ error: 'Falta el mensaje' }, 400);
  }

  try {
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: MODELO,
        messages: [{ role: 'system', content: instrucciones(idioma) }, ...mensajes],
        // gpt-oss piensa antes de contestar, y ese pensamiento gasta del MISMO
        // presupuesto que la respuesta. Con un tope corto se lo come entero y
        // «content» vuelve vacío: el chat contestaría «no te he entendido» a
        // todo. «low» y «hidden» lo dejan al mínimo y fuera de la respuesta;
        // lo breve ya lo impone la instrucción de 2 a 4 frases.
        reasoning_effort: 'low',
        reasoning_format: 'hidden',
        // Groq usa este nombre, no max_tokens.
        max_completion_tokens: 800,
        temperature: 0.4,
      }),
    });

    if (!r.ok) {
      // Sin esta traza el fallo es invisible desde fuera. Se lee en Cloudflare →
      // Workers & Pages → pabilo-velas → Logs (o `npx wrangler pages deployment tail`).
      console.error('Groq respondió', r.status, (await r.text()).slice(0, 300));
      return json({ respuesta: FALLO[idioma] });
    }

    const datos = await r.json();
    const texto = datos.choices?.[0]?.message?.content?.trim();
    return json({
      respuesta: texto || 'No te he entendido bien, ¿me lo preguntas de otra forma?',
    });
  } catch (fallo) {
    console.error('No se pudo llamar a Groq:', fallo);
    return json({ respuesta: FALLO[idioma] });
  }
}
