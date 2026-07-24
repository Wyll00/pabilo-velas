// ─────────────────────────────────────────────────────────────
//  Colección Pabilo — velas y combinaciones de aromas
//  Edita aquí nombres, notas, precios y mezclas sin tocar el diseño.
//  · nombre   → el nombre de la vela
//  · nota     → la frase sensorial (se muestra en cursiva Newsreader)
//  · familia  → familia olfativa breve (etiqueta pequeña)
//  · precio   → número en euros (se formatea automáticamente)
//  · duracion → horas de combustión aproximadas
//  · tono     → [colorA, colorB] para el degradado del placeholder de foto
//  · circulo  → color del círculo de fondo en la tarjeta (rediseño)
// ─────────────────────────────────────────────────────────────

export const velas = [
  {
    id: 'vainilla-canela',
    nombre: 'Vainilla y Canela',
    nota: 'Vainilla cálida con el punto vivo de la canela. Huele a repostería tranquila.',
    familia: 'Dulce · especiada',
    precio: 22,
    duracion: 45,
    tono: ['#C98A4B', '#8F5730'],
    circulo: '#F2D9B8',
  },
  {
    id: 'sandalo-jazmin',
    nombre: 'Sándalo y Jazmín',
    nota: 'Madera cálida y flor delicada. Elegante, íntima, envolvente.',
    familia: 'Amaderada · floral',
    precio: 24,
    duracion: 50,
    tono: ['#8A6B4F', '#54402F'],
    circulo: '#EAD9E2',
  },
  {
    id: 'lavanda',
    nombre: 'Lavanda',
    nota: 'Lavanda de verdad, sin jabón. Para bajar el ritmo.',
    familia: 'Herbal · floral',
    precio: 20,
    duracion: 40,
    tono: ['#8A8B6C', '#6E6F54'],
    circulo: '#D8DCE8',
  },
  {
    id: 'cereza',
    nombre: 'Cereza',
    nota: 'Fruta roja, jugosa y luminosa. Dulce sin empalagar.',
    familia: 'Frutal',
    precio: 20,
    duracion: 40,
    tono: ['#A33E36', '#6C2823'],
    circulo: '#F0CFCB',
  },
  {
    id: 'coco',
    nombre: 'Coco',
    nota: 'Cremoso, suave, con brisa. Vacaciones en voz baja.',
    familia: 'Cremosa · tropical',
    precio: 22,
    duracion: 45,
    tono: ['#C9B291', '#9A8266'],
    circulo: '#EFE8D6',
  },
];

// Aromas disponibles para el mezclador
export const aromas = ['Vainilla', 'Canela', 'Sándalo', 'Jazmín', 'Lavanda', 'Cereza', 'Coco'];

// Combinaciones probadas en el taller.
// La clave es el par ordenado alfabéticamente y unido con «+».
export const combinaciones = [
  {
    par: ['Sándalo', 'Jazmín'],
    titulo: 'Sándalo y jazmín',
    texto:
      'Una mezcla elegante y envolvente que une la calidez amaderada del sándalo con la delicadeza floral del jazmín. El resultado es un aroma sofisticado, relajante y con un toque sensual, ideal para crear ambientes íntimos y equilibrados.',
  },
  {
    par: ['Canela', 'Coco'],
    titulo: 'Canela y coco',
    texto:
      'Una combinación cálida y reconfortante que mezcla el carácter especiado de la canela con la suavidad cremosa del coco. Es un aroma acogedor, dulce y exótico, perfecto para aportar sensación de hogar con un toque tropical.',
  },
  {
    par: ['Jazmín', 'Lavanda'],
    titulo: 'Jazmín y lavanda',
    texto:
      'Un dúo suave y armonioso que combina la frescura floral del jazmín con la calma relajante de la lavanda. Su fragancia transmite serenidad, limpieza y bienestar, ideal para momentos de descanso y desconexión.',
  },
  {
    par: ['Coco', 'Vainilla'],
    titulo: 'Coco y vainilla',
    texto:
      'Una mezcla dulce, cremosa y envolvente que fusiona la suavidad del coco con la calidez reconfortante de la vainilla. Es un aroma agradable y relajante, perfecto para crear espacios acogedores, delicados y luminosos.',
  },
  {
    par: ['Vainilla', 'Canela'],
    titulo: 'Vainilla y canela',
    texto:
      'Nos gustó tanto que ya es una vela de la colección: vainilla cálida con el punto vivo de la canela. Dulce, hogareña, de repostería tranquila.',
  },
];
