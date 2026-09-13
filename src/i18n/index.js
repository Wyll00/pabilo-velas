// ─────────────────────────────────────────────────────────────
//  Idiomas de la web
//  · Español en «/», inglés en «/en/».
//  · Los datos (velas, FAQ, reseñas) llevan sus traducciones con
//    el sufijo _en: nombre / nombre_en, nota / nota_en…
//    Si falta una traducción se muestra el español, nunca un hueco.
// ─────────────────────────────────────────────────────────────

import es from './es.js';
import en from './en.js';

export const idiomas = { es, en };
export const idiomaPorDefecto = 'es';

/** Textos de la interfaz para un idioma. */
export function textos(lang) {
  return idiomas[lang] ?? idiomas[idiomaPorDefecto];
}

/** Campo traducido de un dato, con el español como red de seguridad. */
export function campo(objeto, clave, lang) {
  if (lang === 'en') {
    const traducido = objeto[`${clave}_en`];
    if (traducido) return traducido;
  }
  return objeto[clave];
}

/** Las portadas de cada idioma, para las etiquetas hreflang.
 *  Solo valen para las portadas: una página del diario no tiene su
 *  traducción aquí, así que no debe declarar ninguna. */
export function portadasAlternativas(site) {
  return Object.entries({ es: '/', en: '/en/' }).map(([codigo, ruta]) => ({
    codigo,
    href: new URL(ruta, site).href,
  }));
}

/** Prefijo de las rutas: '' para español, '/en' para inglés. */
export function base(lang) {
  return lang === 'es' ? '' : `/${lang}`;
}

/** Nombres de aroma para mostrar. La clave interna sigue en español. */
const aromasTraducidos = {
  Vainilla: 'Vanilla',
  Canela: 'Cinnamon',
  Sándalo: 'Sandalwood',
  Jazmín: 'Jasmine',
  Lavanda: 'Lavender',
  Cereza: 'Cherry',
  Coco: 'Coconut',
};

export function nombreAroma(aroma, lang) {
  return lang === 'en' ? aromasTraducidos[aroma] ?? aroma : aroma;
}
