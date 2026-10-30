// ─────────────────────────────────────────────────────────────
//  Quién vende — los datos del aviso legal
//
//  ⚠️ MIENTRAS ESTO ESTÉ VACÍO, LAS PÁGINAS LEGALES NO SE ENLAZAN
//     NI SE INDEXAN. En cuanto rellenes los cuatro campos de abajo
//     aparecen solas en el pie de la web. No hay que tocar nada más.
//
//  Por qué hacen falta: para vender por internet en España, la LSSI
//  (artículo 10) obliga a que quien vende se identifique con nombre
//  o razón social, NIF, domicilio y una vía de contacto directa.
//  Sin esto la tienda no puede abrir, por bonita que esté la web.
//
//  ⚠️ El texto de las tres páginas legales es un punto de partida
//     honesto, no un documento revisado por nadie con título. Antes
//     de cobrar el primer pedido, que lo lea una gestoría: cambian
//     cosas según seáis autónoma, sociedad o venta ocasional, y
//     según si entregáis en mano o enviáis.
// ─────────────────────────────────────────────────────────────

export const empresa = {
  // Nombre y apellidos, o razón social si hay sociedad.
  nombre: '',

  // NIF / CIF.
  nif: '',

  // Domicilio a efectos legales. Calle, número, código postal y municipio.
  domicilio: '',

  // Correo de contacto. La LSSI pide una vía directa y efectiva;
  // el WhatsApp de contacto.js cuenta como la segunda.
  email: '',

  // Opcionales
  registroMercantil: '',   // solo si hay sociedad inscrita
  nombreComercial: 'Pabilo',

  // Impuesto que se aplica. En Canarias es IGIC, no IVA: cámbialo si
  // vendéis desde la península.
  impuesto: 'IGIC',

  // ¿Los precios de la web ya llevan el impuesto incluido?
  preciosConImpuesto: true,

  // Días para desistir de la compra. Por ley son 14 naturales.
  // Ojo: las velas personalizadas o hechas a medida quedan fuera de ese
  // derecho (art. 103.c del texto refundido de consumidores), pero las de
  // la colección NO: esas sí se pueden devolver.
  diasDesistimiento: 14,
};

/** Los campos sin los que no se puede publicar nada legal. */
export const camposObligatorios = ['nombre', 'nif', 'domicilio', 'email'];

/** ¿Están los datos mínimos para publicar las páginas legales? */
export const hayDatosLegales = camposObligatorios.every((c) => String(empresa[c]).trim() !== '');

/** Lo que falta, para avisar al construir. */
export const faltanLegales = camposObligatorios.filter((c) => String(empresa[c]).trim() === '');
