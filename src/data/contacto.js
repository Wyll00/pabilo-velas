// ─────────────────────────────────────────────────────────────
//  Datos de contacto de Pabilo — un solo sitio para todo
//  Rellena estos campos cuando Claudia y Ana los confirmen.
// ─────────────────────────────────────────────────────────────

export const contacto = {
  // ⚠️ NÚMERO DE EJEMPLO — cambiar por el real.
  //    Formato internacional, solo dígitos: España = 34 + número.
  //    Ej.: 34612345678  (nada de +, espacios ni guiones).
  //    Déjalo como '' (vacío) para ocultar los botones de WhatsApp.
  whatsapp: '34600000000',

  email: '',                    // ej.: 'hola@pabilovelas.com'  ('' lo oculta)
  instagram: '',                // usuario sin @ cuando exista la cuenta (ej.: 'pabilo.velas'). Vacío = oculto.
  ciudad: 'Islas Canarias',
};

// Construye un enlace de WhatsApp con mensaje pre-escrito.
// Devuelve null si no hay número configurado.
export function linkWhatsApp(mensaje) {
  if (!contacto.whatsapp) return null;
  const texto = encodeURIComponent(mensaje || 'Hola Pabilo, me interesan vuestras velas.');
  return `https://wa.me/${contacto.whatsapp}?text=${texto}`;
}
