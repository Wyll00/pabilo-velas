// ─────────────────────────────────────────────────────────────
//  Colección Pabilo — velas y combinaciones de aromas
//  Edita aquí nombres, notas, precios y mezclas sin tocar el diseño.
//  · nombre   → el nombre de la vela
//  · nota     → la frase sensorial (se muestra bajo el nombre)
//  · familia  → familia olfativa breve (etiqueta pequeña)
//  · precio   → número en euros (se formatea automáticamente)
//  · duracion → horas de combustión aproximadas
//  · tono     → [colorA, colorB] para el degradado del placeholder de foto
//  · circulo  → color del círculo de fondo en la tarjeta
//
//  Los campos con sufijo _en son la versión en inglés (web /en/).
//  Si dejas uno vacío, esa web muestra el texto en español.
// ─────────────────────────────────────────────────────────────

export const velas = [
  {
    id: 'vainilla-canela',
    nombre: 'Vainilla y Canela',
    nombre_en: 'Vanilla & Cinnamon',
    nota: 'Vainilla cálida con el punto vivo de la canela. Huele a repostería tranquila.',
    nota_en: 'Warm vanilla with a lively touch of cinnamon. It smells like unhurried baking.',
    familia: 'Dulce · especiada',
    familia_en: 'Sweet · spiced',
    precio: 22,
    duracion: 45,
    tono: ['#C98A4B', '#8F5730'],
    circulo: '#F2D9B8',
  },
  {
    id: 'sandalo-jazmin',
    nombre: 'Sándalo y Jazmín',
    nombre_en: 'Sandalwood & Jasmine',
    nota: 'Madera cálida y flor delicada. Elegante, íntima, envolvente.',
    nota_en: 'Warm wood and delicate blossom. Elegant, intimate, enveloping.',
    familia: 'Amaderada · floral',
    familia_en: 'Woody · floral',
    precio: 24,
    duracion: 50,
    tono: ['#8A6B4F', '#54402F'],
    circulo: '#EAD9E2',
  },
  {
    id: 'lavanda',
    nombre: 'Lavanda',
    nombre_en: 'Lavender',
    nota: 'Lavanda de verdad, sin jabón. Para bajar el ritmo.',
    nota_en: 'Real lavender, nothing soapy about it. For slowing down.',
    familia: 'Herbal · floral',
    familia_en: 'Herbal · floral',
    precio: 20,
    duracion: 40,
    tono: ['#8A8B6C', '#6E6F54'],
    circulo: '#D8DCE8',
  },
  {
    id: 'cereza',
    nombre: 'Cereza',
    nombre_en: 'Cherry',
    nota: 'Fruta roja, jugosa y luminosa. Dulce sin empalagar.',
    nota_en: 'Red fruit, juicy and bright. Sweet without being cloying.',
    familia: 'Frutal',
    familia_en: 'Fruity',
    precio: 20,
    duracion: 40,
    tono: ['#A33E36', '#6C2823'],
    circulo: '#F0CFCB',
  },
  {
    id: 'coco',
    nombre: 'Coco',
    nombre_en: 'Coconut',
    nota: 'Cremoso, suave, con brisa. Vacaciones en voz baja.',
    nota_en: 'Creamy, soft, with a sea breeze. A quiet holiday.',
    familia: 'Cremosa · tropical',
    familia_en: 'Creamy · tropical',
    precio: 22,
    duracion: 45,
    tono: ['#C9B291', '#9A8266'],
    circulo: '#EFE8D6',
  },
];

// Combinaciones probadas en el taller.
// ⚠️ El mezclador de la web sale ENTERO de aquí: solo se ofrecen los aromas
//    que aparecen en algún par, y cada uno solo se puede cruzar con sus
//    parejas de esta lista. Para añadir una opción al mezclador, añade su
//    combinación aquí (con su título y su texto); no hay otra lista que tocar.
export const combinaciones = [
  {
    par: ['Sándalo', 'Jazmín'],
    titulo: 'Sándalo y jazmín',
    titulo_en: 'Sandalwood & jasmine',
    texto:
      'Una mezcla elegante y envolvente que une la calidez amaderada del sándalo con la delicadeza floral del jazmín. El resultado es un aroma sofisticado, relajante y con un toque sensual, ideal para crear ambientes íntimos y equilibrados.',
    texto_en:
      'An elegant, enveloping blend that joins the woody warmth of sandalwood with the floral delicacy of jasmine. The result is sophisticated and relaxing, with a sensual edge — ideal for intimate, balanced spaces.',
  },
  {
    par: ['Canela', 'Coco'],
    titulo: 'Canela y coco',
    titulo_en: 'Cinnamon & coconut',
    texto:
      'Una combinación cálida y reconfortante que mezcla el carácter especiado de la canela con la suavidad cremosa del coco. Es un aroma acogedor, dulce y exótico, perfecto para aportar sensación de hogar con un toque tropical.',
    texto_en:
      'A warm, comforting combination that mixes the spiced character of cinnamon with the creamy softness of coconut. Cosy, sweet and a little exotic — perfect for a homely feel with a tropical touch.',
  },
  {
    par: ['Jazmín', 'Lavanda'],
    titulo: 'Jazmín y lavanda',
    titulo_en: 'Jasmine & lavender',
    texto:
      'Un dúo suave y armonioso que combina la frescura floral del jazmín con la calma relajante de la lavanda. Su fragancia transmite serenidad, limpieza y bienestar, ideal para momentos de descanso y desconexión.',
    texto_en:
      'A soft, harmonious pair that brings together the floral freshness of jasmine and the calm of lavender. It feels serene and clean — made for resting and switching off.',
  },
  {
    par: ['Coco', 'Vainilla'],
    titulo: 'Coco y vainilla',
    titulo_en: 'Coconut & vanilla',
    texto:
      'Una mezcla dulce, cremosa y envolvente que fusiona la suavidad del coco con la calidez reconfortante de la vainilla. Es un aroma agradable y relajante, perfecto para crear espacios acogedores, delicados y luminosos.',
    texto_en:
      'A sweet, creamy blend that melts the softness of coconut into the comforting warmth of vanilla. Gentle and relaxing — perfect for spaces that feel welcoming and bright.',
  },
  {
    par: ['Vainilla', 'Canela'],
    titulo: 'Vainilla y canela',
    titulo_en: 'Vanilla & cinnamon',
    texto:
      'Nos gustó tanto que ya es una vela de la colección: vainilla cálida con el punto vivo de la canela. Dulce, hogareña, de repostería tranquila.',
    texto_en:
      'We liked it so much it became part of the collection: warm vanilla with a lively touch of cinnamon. Sweet, homely, like unhurried baking.',
  },
];
