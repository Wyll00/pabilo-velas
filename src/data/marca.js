// ─────────────────────────────────────────────────────────────
//  Los hechos de la marca que no son una vela ni una pregunta
//  frecuente: quiénes sois, el eslogan, qué son los wax melts y
//  qué incluye un regalo.
//
//  ⚠️ De aquí sale TAMBIÉN lo que sabe el asistente del chat. Antes
//     el chat llevaba su propia copia escrita a mano dentro de
//     public/_worker.js, y por eso acabó diciendo cosas distintas
//     de las que decía la web. Ahora se genera al construir: edita
//     aquí y el chat se entera solo.
//
//  Los campos con sufijo _en son la versión inglesa (web /en/).
//  Si dejas uno vacío, esa web muestra el español.
// ─────────────────────────────────────────────────────────────

export const marca = {
  quienes:
    'Velas de autor, artesanales, hechas a mano en pequeñas tandas en las Islas Canarias por dos amigas.',
  quienes_en:
    'Handmade candles, poured in small batches in the Canary Islands by two friends.',

  // ⚠️ PENDIENTE DE CONFIRMAR EN EL TALLER — y es el único sitio donde se
  //    dice de qué están hechas. Hasta el 30/10/2026 la web lo afirmaba en
  //    OCHO sitios y no coincidían: «cera de soja y cristal» en español y
  //    «soy and coconut wax» en inglés. La cera de gel (cristal) y la de coco
  //    son materiales distintos, así que una de las dos era falsa.
  //
  //    La pista: el artículo del diario dice «soja y de coco», el inglés dice
  //    coco en sus cuatro sitios, y justo al lado hay un «tarro de cristal».
  //    Lo de «cristal» parece venir del tarro, no de la cera. Pero afirmar un
  //    material equivocado en un producto físico no es un detalle: hasta que
  //    lo confirmen, se dice solo lo seguro.
  //
  //    Para arreglarlo cuando lo confirmen: añade el segundo componente aquí
  //    y en faq.js. Son los dos únicos sitios.
  cera: 'cera de soja',
  cera_en: 'soy wax',
  ceraClaim: 'Cera de soja',
  ceraClaim_en: 'Soy wax',

  eslogan: 'El fuego de los pequeños placeres.',
  eslogan_en: 'The fire of small pleasures.',

  waxMelts:
    'Piezas de cera aromática SIN mecha, solo para perfumar. Se usan en un quemador: el calor las funde y liberan el aroma. Cuando dejan de oler, se retira la cera y se pone una pieza nueva. Diferencia con una vela: la vela ilumina y perfuma; el wax melt solo aromatiza.',
  waxMelts_en:
    'Small pieces of scented wax with NO wick, made purely to perfume a room. They go in a burner: the heat melts them and releases the scent. Once they stop giving off scent, the wax is removed and a fresh piece added. Difference from a candle: a candle gives light and scent; a wax melt only scents.',

  regalo:
    'Packs a medida, tarjeta con dedicatoria escrita a mano, y detalles para bodas y eventos por encargo.',
  regalo_en:
    'Made-to-measure sets, a handwritten card, and favours for weddings and events to order.',
};
