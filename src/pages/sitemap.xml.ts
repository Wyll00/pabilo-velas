// El mapa del sitio se genera solo: incluye las dos portadas y cada
// artículo del diario que esté publicado. Al añadir un .md nuevo,
// aparece aquí sin tocar nada.
import type { APIRoute } from 'astro';
import { articulosPublicados } from '../lib/blog.js';

export const GET: APIRoute = async ({ site }) => {
  const base = site?.href ?? 'https://pabilo-velas.pages.dev/';
  const url = (ruta: string) => new URL(ruta, base).href;

  // Al mapa del sitio solo van los publicados, nunca los borradores
  const articulos = await articulosPublicados();
  const hayEn = articulos.some((a) => a.data.idioma === 'en');

  const alternativas = `
    <xhtml:link rel="alternate" hreflang="es" href="${url('/')}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${url('/en/')}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${url('/')}"/>`;

  const paginas = [
    { loc: url('/'), prioridad: '1.0', frecuencia: 'monthly', alternativas },
    { loc: url('/en/'), prioridad: '0.9', frecuencia: 'monthly', alternativas },
    { loc: url('/blog/'), prioridad: '0.8', frecuencia: 'weekly' },
    ...(hayEn ? [{ loc: url('/en/blog/'), prioridad: '0.7', frecuencia: 'weekly' }] : []),
    ...articulos.map((a) => ({
      loc: url(a.data.idioma === 'es' ? `/blog/${a.slug}/` : `/${a.data.idioma}/blog/${a.slug}/`),
      prioridad: '0.7',
      frecuencia: 'yearly',
      fecha: a.data.fecha.toISOString().slice(0, 10),
    })),
  ];

  const cuerpo = paginas
    .map(
      (p) => `  <url>
    <loc>${p.loc}</loc>${p.alternativas ?? ''}${p.fecha ? `\n    <lastmod>${p.fecha}</lastmod>` : ''}
    <changefreq>${p.frecuencia}</changefreq>
    <priority>${p.prioridad}</priority>
  </url>`
    )
    .join('\n');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${cuerpo}
</urlset>
`,
    { headers: { 'Content-Type': 'application/xml; charset=utf-8' } }
  );
};
