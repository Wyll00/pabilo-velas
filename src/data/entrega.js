// ─────────────────────────────────────────────────────────────
//  Dónde llegáis y cuánto tarda
//
//  ⚠️ PENDIENTE DEL TALLER. Estas zonas son las que la web dice hoy
//     de pasada («entrega en mano en la isla», sin decir cuál), pero
//     sin plazo ni coste. Rellenad `plazo` y `coste` cuando los
//     sepáis y aparecen solos en el selector del pedido y en las
//     condiciones de compra.
//
//  Si dejas el array vacío, el selector de zona desaparece del
//  formulario y el pedido se manda sin esa línea: nada se rompe.
//
//  · nombre → lo que se lee en el desplegable
//  · plazo  → '' mientras no esté confirmado
//  · coste  → '' mientras no esté confirmado
// ─────────────────────────────────────────────────────────────

export const zonas = [
  {
    id: 'en-mano',
    nombre: 'Entrega en mano',
    nombre_en: 'Hand delivery',
    plazo: '',
    coste: '',
  },
  {
    id: 'canarias',
    nombre: 'Resto de Canarias',
    nombre_en: 'Rest of the Canary Islands',
    plazo: '',
    coste: '',
  },
  {
    id: 'peninsula',
    nombre: 'Península',
    nombre_en: 'Mainland Spain',
    plazo: '',
    coste: '',
  },
];

/** ¿Hay algún plazo y coste confirmados que publicar? */
export const hayCondicionesEnvio = zonas.some(
  (z) => String(z.plazo).trim() !== '' && String(z.coste).trim() !== ''
);
