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
//
// ⚠️  LO DE AQUÍ ABAJO ESTÁ GENERADO. No lo edites a mano: lo reescribe
//     scripts/generar-conocimiento.mjs leyendo src/data/ antes de cada
//     build. Para cambiar un precio, una mezcla o la cera, edita el dato.
//
//     Lo llevaba escrito a mano y por eso el chat acabó contradiciendo a
//     la web: decía «cera de soja y de cristal» en español y «soy and
//     coconut wax» en inglés, con los precios duplicados aparte.
// <<< CONOCIMIENTO GENERADO — no edites hasta la marca de cierre
//     Sale de src/data/ al ejecutar scripts/generar-conocimiento.mjs,
//     que corre solo antes de cada build. Edita los datos, no esto.
const CONOCIMIENTO_ES = `
MARCA
- Pabilo: Velas de autor, artesanales, hechas a mano en pequeñas tandas en las Islas Canarias por dos amigas.
- Eslogan: «El fuego de los pequeños placeres.»

COLECCIÓN DE VELAS (precios y duración aproximados)
- Vainilla y Canela — dulce · especiada — 22 € — 45 h.
- Sándalo y Jazmín — amaderada · floral — 24 € — 50 h.
- Lavanda — herbal · floral — 20 € — 40 h.
- Cereza — frutal — 20 € — 40 h.
- Coco — cremosa · tropical — 22 € — 45 h.

MEZCLAS PROBADAS EN EL TALLER (son las únicas que sabemos cómo huelen)
- Sándalo y jazmín: Una mezcla elegante y envolvente que une la calidez amaderada del sándalo con la delicadeza floral del jazmín. El resultado es un aroma sofisticado, relajante y con un toque sensual, ideal para crear ambientes íntimos y equilibrados.
- Canela y coco: Una combinación cálida y reconfortante que mezcla el carácter especiado de la canela con la suavidad cremosa del coco. Es un aroma acogedor, dulce y exótico, perfecto para aportar sensación de hogar con un toque tropical.
- Jazmín y lavanda: Un dúo suave y armonioso que combina la frescura floral del jazmín con la calma relajante de la lavanda. Su fragancia transmite serenidad, limpieza y bienestar, ideal para momentos de descanso y desconexión.
- Coco y vainilla: Una mezcla dulce, cremosa y envolvente que fusiona la suavidad del coco con la calidez reconfortante de la vainilla. Es un aroma agradable y relajante, perfecto para crear espacios acogedores, delicados y luminosos.
- Vainilla y canela: Nos gustó tanto que ya es una vela de la colección: vainilla cálida con el punto vivo de la canela. Dulce, hogareña, de repostería tranquila.
- Cualquier otra pareja se puede encargar como mezcla personalizada, pero NUNCA describas a qué huele ni digas si queda bien: no lo sabemos. Invita a consultarlo por WhatsApp. (Cereza)

WAX MELTS
- Piezas de cera aromática SIN mecha, solo para perfumar. Se usan en un quemador: el calor las funde y liberan el aroma. Cuando dejan de oler, se retira la cera y se pone una pieza nueva. Diferencia con una vela: la vela ilumina y perfuma; el wax melt solo aromatiza.

REGALOS Y EVENTOS
- Packs a medida, tarjeta con dedicatoria escrita a mano, y detalles para bodas y eventos por encargo.

PREGUNTAS FRECUENTES (la respuesta de la web, palabra por palabra)
- ¿Cuánto dura encendida una vela? → Depende del tamaño, pero las nuestras dan entre 40 y 50 horas de aroma. En cada vela te indicamos su duración aproximada.
- ¿Cómo saco el máximo partido a mi vela? → La primera vez, déjala encendida hasta que se funda toda la superficie (así no se forma «túnel»). Recorta la mecha a unos 5 mm antes de cada uso y no la tengas encendida más de 4 horas seguidas.
- ¿Con qué cera están hechas? → Con cera de soja natural. Arden limpio, sin humo raro, y mantienen bien el aroma hasta el final.
- ¿Hacéis envíos? → Sí. Entrega en mano en la isla y envío al resto de Canarias y a la península. Cuéntanos dónde estás y te decimos plazo y coste.
- ¿Puedo pedir un aroma o una mezcla concreta? → Claro. Además de la colección, hacemos mezclas y encargos personalizados. Escríbenos y lo vemos contigo.

DÓNDE ESTAMOS
- Islas Canarias.
`;

const CONOCIMIENTO_EN = `
THE BRAND
- Pabilo: Handmade candles, poured in small batches in the Canary Islands by two friends.
- Tagline: “The fire of small pleasures.”

THE CANDLES (approximate prices and burn time)
- Vanilla & Cinnamon — sweet · spiced — 22 € — 45 hrs.
- Sandalwood & Jasmine — woody · floral — 24 € — 50 hrs.
- Lavender — herbal · floral — 20 € — 40 hrs.
- Cherry — fruity — 20 € — 40 hrs.
- Coconut — creamy · tropical — 22 € — 45 hrs.

BLENDS TRIED IN THE STUDIO (the only ones we know the scent of)
- Sandalwood & jasmine: An elegant, enveloping blend that joins the woody warmth of sandalwood with the floral delicacy of jasmine. The result is sophisticated and relaxing, with a sensual edge — ideal for intimate, balanced spaces.
- Cinnamon & coconut: A warm, comforting combination that mixes the spiced character of cinnamon with the creamy softness of coconut. Cosy, sweet and a little exotic — perfect for a homely feel with a tropical touch.
- Jasmine & lavender: A soft, harmonious pair that brings together the floral freshness of jasmine and the calm of lavender. It feels serene and clean — made for resting and switching off.
- Coconut & vanilla: A sweet, creamy blend that melts the softness of coconut into the comforting warmth of vanilla. Gentle and relaxing — perfect for spaces that feel welcoming and bright.
- Vanilla & cinnamon: We liked it so much it became part of the collection: warm vanilla with a lively touch of cinnamon. Sweet, homely, like unhurried baking.
- Any other pairing can be ordered as a custom blend, but NEVER describe how it smells or whether it works: we do not know. Invite them to ask on WhatsApp. (Vanilla & Cinnamon, Sandalwood & Jasmine, Lavender, Cherry)

WAX MELTS
- Small pieces of scented wax with NO wick, made purely to perfume a room. They go in a burner: the heat melts them and releases the scent. Once they stop giving off scent, the wax is removed and a fresh piece added. Difference from a candle: a candle gives light and scent; a wax melt only scents.

GIFTS AND EVENTS
- Made-to-measure sets, a handwritten card, and favours for weddings and events to order.

FREQUENTLY ASKED QUESTIONS (the site answer, word for word)
- How long does a candle burn for? → It depends on the size, but ours give between 40 and 50 hours of scent. We list the approximate burn time on every candle.
- How do I get the most out of my candle? → The first time, let it burn until the whole surface has melted (that stops it tunnelling). Trim the wick to about 5 mm before each use, and never burn it for more than 4 hours at a time.
- What wax are they made with? → With natural soy wax. They burn clean, with no strange smoke, and hold their scent right to the end.
- Do you ship? → Yes. Hand delivery on the island, and shipping to the rest of the Canaries and mainland Spain. Tell us where you are and we will confirm timing and cost.
- Can I ask for a particular scent or blend? → Of course. Beyond the collection we make custom blends and special orders. Write to us and we will work it out together.

WHERE WE ARE
- Islas Canarias.
`;
// CONOCIMIENTO GENERADO >>>

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
