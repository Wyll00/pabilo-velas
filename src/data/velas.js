// ─────────────────────────────────────────────────────────────
//  Colección Pábilo — velas
//  Edita aquí nombres, notas, precios y tiempos sin tocar el diseño.
//  · nombre   → el nombre de la vela
//  · nota     → la frase sensorial (se muestra en cursiva Newsreader)
//  · familia  → familia olfativa breve (etiqueta pequeña)
//  · precio   → número en euros (se formatea automáticamente)
//  · duracion → horas de combustión aproximadas
//  · tono     → [colorA, colorB] para el degradado del placeholder de foto
// ─────────────────────────────────────────────────────────────

export const velas = [
  {
    id: 'higo-cedro',
    nombre: 'Higo & Cedro',
    nota: 'Higo maduro sobre madera recién cortada. Cálido, apenas dulce.',
    familia: 'Amaderada · frutal',
    precio: 22,
    duracion: 45,
    tono: ['#B5533A', '#7C3A2C'],
  },
  {
    id: 'naranja-amarga',
    nombre: 'Naranja Amarga',
    nota: 'Piel de naranja y un fondo seco. Luminosa sin empalagar.',
    familia: 'Cítrica',
    precio: 20,
    duracion: 40,
    tono: ['#D99A4E', '#B5723A'],
  },
  {
    id: 'lavanda-lenta',
    nombre: 'Lavanda Lenta',
    nota: 'Lavanda de verdad, sin jabón. Para bajar el ritmo.',
    familia: 'Herbal · floral',
    precio: 22,
    duracion: 45,
    tono: ['#8A8B6C', '#6E6F54'],
  },
  {
    id: 'cafe-cardamomo',
    nombre: 'Café y Cardamomo',
    nota: 'El primer café de la mañana, con una especia detrás. Reconforta.',
    familia: 'Gourmand · especiada',
    precio: 24,
    duracion: 50,
    tono: ['#4A3A2E', '#2B2521'],
  },
  {
    id: 'humo-de-laurel',
    nombre: 'Humo de Laurel',
    nota: 'La laurisilva de Anaga después de la lluvia. Verde y ahumada.',
    familia: 'Verde · ahumada',
    precio: 24,
    duracion: 50,
    tono: ['#6E7355', '#3F4433'],
  },
];
