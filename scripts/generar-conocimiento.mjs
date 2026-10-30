// ─────────────────────────────────────────────────────────────
//  Lo que sabe el asistente, a partir de los datos de la web
//
//  El chat vive en public/_worker.js, que Cloudflare despliega tal
//  cual: no pasa por el empaquetador de Astro y no puede importar
//  nada de src/. Por eso llevaba su propia copia a mano de precios,
//  materiales y mezclas… y acabó contradiciendo a la web. Decía
//  «cera de soja y de cristal» en español y «soy and coconut wax»
//  en inglés, con los precios duplicados por si fuera poco.
//
//  Este script lee src/data/ y reescribe SOLO el bloque marcado del
//  Worker. Se ejecuta antes de cada build, así que editar una vela
//  o una pregunta frecuente actualiza el chat sin tocarlo.
//
//  Si lo quieres a mano:  npm run datos
// ─────────────────────────────────────────────────────────────

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

import { velas, combinaciones } from '../src/data/velas.js';
import { marca } from '../src/data/marca.js';
import { faq } from '../src/data/faq.js';
import { contacto } from '../src/data/contacto.js';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const WORKER = join(raiz, 'public', '_worker.js');

const ABRE = '// <<< CONOCIMIENTO GENERADO — no edites hasta la marca de cierre';
const CIERRA = '// CONOCIMIENTO GENERADO >>>';

/** El campo en el idioma pedido, con el español de red de seguridad. */
const campo = (objeto, clave, lang) =>
  (lang === 'en' && objeto[`${clave}_en`]) || objeto[clave];

const T = {
  es: {
    marca: 'MARCA',
    comillas: ['«', '»'],
    eslogan: 'Eslogan',
    coleccion: 'COLECCIÓN DE VELAS (precios y duración aproximados)',
    horas: 'h',
    mezclas: 'MEZCLAS PROBADAS EN EL TALLER (son las únicas que sabemos cómo huelen)',
    avisoMezclas:
      'Cualquier otra pareja se puede encargar como mezcla personalizada, pero NUNCA describas a qué huele ni digas si queda bien: no lo sabemos. Invita a consultarlo por WhatsApp.',
    waxMelts: 'WAX MELTS',
    regalo: 'REGALOS Y EVENTOS',
    faq: 'PREGUNTAS FRECUENTES (la respuesta de la web, palabra por palabra)',
    donde: 'DÓNDE ESTAMOS',
  },
  en: {
    marca: 'THE BRAND',
    comillas: ['“', '”'],
    eslogan: 'Tagline',
    coleccion: 'THE CANDLES (approximate prices and burn time)',
    horas: 'hrs',
    mezclas: 'BLENDS TRIED IN THE STUDIO (the only ones we know the scent of)',
    avisoMezclas:
      'Any other pairing can be ordered as a custom blend, but NEVER describe how it smells or whether it works: we do not know. Invite them to ask on WhatsApp.',
    waxMelts: 'WAX MELTS',
    regalo: 'GIFTS AND EVENTS',
    faq: 'FREQUENTLY ASKED QUESTIONS (the site answer, word for word)',
    donde: 'WHERE WE ARE',
  },
};

function conocimiento(lang) {
  const t = T[lang];
  const linea = [];

  linea.push(t.marca);
  linea.push(`- Pabilo: ${campo(marca, 'quienes', lang)}`);
  linea.push(`- ${t.eslogan}: ${t.comillas[0]}${campo(marca, 'eslogan', lang)}${t.comillas[1]}`);
  linea.push('');

  linea.push(t.coleccion);
  for (const v of velas) {
    linea.push(
      `- ${campo(v, 'nombre', lang)} — ${campo(v, 'familia', lang).toLowerCase()} — ` +
        `${v.precio} € — ${v.duracion} ${t.horas}.`
    );
  }
  linea.push('');

  linea.push(t.mezclas);
  for (const c of combinaciones) {
    linea.push(`- ${campo(c, 'titulo', lang)}: ${campo(c, 'texto', lang)}`);
  }
  // Los aromas que no aparecen en ninguna pareja no tienen mezcla probada:
  // se nombran para que el modelo no se invente a qué huelen.
  const probados = new Set(combinaciones.flatMap((c) => c.par));
  const sueltos = velas
    .map((v) => campo(v, 'nombre', lang))
    .filter((n) => ![...probados].some((p) => n.toLowerCase().includes(p.toLowerCase())));
  linea.push(
    `- ${t.avisoMezclas}` + (sueltos.length ? ` (${sueltos.join(', ')})` : '')
  );
  linea.push('');

  linea.push(t.waxMelts);
  linea.push(`- ${campo(marca, 'waxMelts', lang)}`);
  linea.push('');

  linea.push(t.regalo);
  linea.push(`- ${campo(marca, 'regalo', lang)}`);
  linea.push('');

  linea.push(t.faq);
  for (const f of faq) {
    linea.push(`- ${campo(f, 'pregunta', lang)} → ${campo(f, 'respuesta', lang)}`);
  }

  if (contacto.ciudad) {
    linea.push('');
    linea.push(t.donde);
    linea.push(`- ${contacto.ciudad}.`);
  }

  return linea.join('\n');
}

/** Las comillas invertidas y el ${} romperían la plantilla del Worker. */
const escapar = (texto) => texto.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');

const bloque = [
  ABRE,
  '//     Sale de src/data/ al ejecutar scripts/generar-conocimiento.mjs,',
  '//     que corre solo antes de cada build. Edita los datos, no esto.',
  'const CONOCIMIENTO_ES = `',
  escapar(conocimiento('es')),
  '`;',
  '',
  'const CONOCIMIENTO_EN = `',
  escapar(conocimiento('en')),
  '`;',
  CIERRA,
].join('\n');

const fuente = readFileSync(WORKER, 'utf8');
const i = fuente.indexOf(ABRE);
const j = fuente.indexOf(CIERRA);

if (i === -1 || j === -1 || j < i) {
  console.error(
    `\n  No encuentro las marcas en public/_worker.js.\n` +
      `  Tienen que estar las dos, en este orden:\n\n    ${ABRE}\n    ${CIERRA}\n`
  );
  process.exit(1);
}

const nuevo = fuente.slice(0, i) + bloque + fuente.slice(j + CIERRA.length);

if (nuevo === fuente) {
  console.log('  El conocimiento del chat ya estaba al día.');
} else {
  writeFileSync(WORKER, nuevo, 'utf8');
  console.log(
    `  Conocimiento del chat regenerado: ${velas.length} velas, ` +
      `${combinaciones.length} mezclas, ${faq.length} preguntas.`
  );
}
