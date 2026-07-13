// ─────────────────────────────────────────────────────────────
//  Worker de Cloudflare Pages (modo avanzado)
//  · Sirve la web estática tal cual.
//  · Expone POST /api/chat como proxy seguro hacia Groq: la API key
//    NUNCA llega al navegador. Se configura en Cloudflare:
//    proyecto pabilo-velas → Settings → Variables and secrets →
//    añadir secreto GROQ_API_KEY (y volver a desplegar).
//  · Clave gratuita: https://console.groq.com → API Keys.
// ─────────────────────────────────────────────────────────────

const CONOCIMIENTO = `
MARCA
- Pabilo: velas de autor, artesanales, hechas a mano en pequeñas tandas en las Islas Canarias por Claudia y Ana, dos amigas.
- Cera de soja y de cristal, naturales. Arden limpio, sin humo raro.
- Eslogan: «El fuego de los pequeños placeres».

COLECCIÓN DE VELAS (precios y duración aproximados)
- Vainilla y Canela — dulce y especiada — 22 € — unas 45 h.
- Sándalo y Jazmín — amaderada y floral — 24 € — unas 50 h.
- Lavanda — herbal y floral — 20 € — unas 40 h.
- Cereza — frutal — 20 € — unas 40 h.
- Coco — cremosa y tropical — 22 € — unas 45 h.

MEZCLAS PROBADAS EN EL TALLER (se pueden encargar)
- Sándalo y jazmín: elegante, relajante, para ambientes íntimos.
- Canela y coco: acogedor, dulce y exótico, hogar con toque tropical.
- Jazmín y lavanda: serenidad, limpieza y bienestar, para descansar.
- Coco y vainilla: dulce y cremoso, espacios acogedores y luminosos.
- Vainilla y canela: tan buena que ya es vela de la colección.

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

const INSTRUCCIONES = `Eres «el ayudante de Pabilo», el asistente de la web de Pabilo, una marca artesanal de velas de las Islas Canarias.

REGLAS:
- Responde SIEMPRE en español, de tú, con el tono de la marca: cercano, cálido, tranquilo. Frases cortas.
- Responde SOLO con la información del contexto de abajo. No inventes datos, precios ni plazos.
- Respuestas breves: 2 a 4 frases como máximo. Sin listas largas salvo que las pidan.
- Si no sabes algo o no está en el contexto, dilo con naturalidad e invita a escribir por WhatsApp (el botón verde de la web).
- Si preguntan algo que no tiene que ver con Pabilo o las velas, declina con amabilidad y reconduce a las velas.
- Puedes usar como mucho un emoji suave (🕯️ ✨) de vez en cuando.

CONTEXTO:
${CONOCIMIENTO}`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/chat') {
      if (request.method !== 'POST') {
        return json({ error: 'Método no permitido' }, 405);
      }
      return manejarChat(request, env);
    }
    return env.ASSETS.fetch(request);
  },
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
}

async function manejarChat(request, env) {
  if (!env.GROQ_API_KEY) {
    return json({
      respuesta:
        'Ahora mismo el chat está descansando 🕯️ Escríbenos por WhatsApp (el botón verde de aquí al lado) y te atendemos al momento.',
    });
  }

  let cuerpo;
  try {
    cuerpo = await request.json();
  } catch {
    return json({ error: 'Cuerpo inválido' }, 400);
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
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'system', content: INSTRUCCIONES }, ...mensajes],
        max_tokens: 300,
        temperature: 0.4,
      }),
    });

    if (!r.ok) {
      return json({
        respuesta:
          'Uy, se me ha apagado la llama un momento. Vuelve a intentarlo en unos segundos o escríbenos por WhatsApp. 🕯️',
      });
    }

    const datos = await r.json();
    const texto = datos.choices?.[0]?.message?.content?.trim();
    return json({
      respuesta: texto || 'No te he entendido bien, ¿me lo preguntas de otra forma?',
    });
  } catch {
    return json({
      respuesta:
        'Uy, se me ha apagado la llama un momento. Vuelve a intentarlo en unos segundos o escríbenos por WhatsApp. 🕯️',
    });
  }
}
