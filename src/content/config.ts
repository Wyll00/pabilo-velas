// ─────────────────────────────────────────────────────────────
//  El diario del taller
//  Cada artículo es un archivo .md dentro de src/content/blog/.
//  Estos son los datos que lleva arriba (el «frontmatter»); si te
//  dejas alguno obligatorio, el build avisa y te dice cuál.
// ─────────────────────────────────────────────────────────────

import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    // Obligatorios
    titulo: z.string(),
    resumen: z.string(),          // se ve en la lista y al compartir
    fecha: z.date(),              // formato: 2026-08-14

    // Opcionales, con valor por defecto
    idioma: z.enum(['es', 'en']).default('es'),
    autor: z.string().default('Claudia & Ana'),
    etiqueta: z.string().optional(),      // «El oficio», «Cuidados»…
    color: z.string().default('#F2D9B8'), // el tono de su tarjeta
    borrador: z.boolean().default(false), // true = no se publica
  }),
});

export const collections = { blog };
