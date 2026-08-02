// ─────────────────────────────────────────────────────────────
//  Los artículos del diario, en un solo sitio.
//
//  Mientras trabajas en local (npm run dev) se ven también los
//  borradores, para poder repasarlos antes de darles el visto
//  bueno. En la web publicada no aparecen nunca.
// ─────────────────────────────────────────────────────────────

import { getCollection } from 'astro:content';

/** ¿Se muestra este artículo aquí? */
export const seVe = (articulo) => import.meta.env.DEV || !articulo.data.borrador;

/** Los artículos de un idioma, del más nuevo al más viejo. */
export async function articulosDe(lang) {
  const lista = await getCollection('blog', (a) => seVe(a) && a.data.idioma === lang);
  return lista.sort((a, b) => b.data.fecha.valueOf() - a.data.fecha.valueOf());
}

/** Todos los publicables, sin filtrar por idioma (para el mapa del sitio). */
export async function articulosPublicados() {
  return getCollection('blog', ({ data }) => !data.borrador);
}
