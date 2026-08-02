// @ts-check
import { defineConfig } from 'astro/config';

// Las tablas del diario se envuelven en un div propio para que, si no
// caben, se deslicen ellas solas en el móvil sin descuadrar la página.
function envolverTablas() {
  return (arbol) => {
    const recorrer = (nodo) => {
      if (!nodo.children) return;
      nodo.children = nodo.children.map((hijo) => {
        if (hijo.type === 'element' && hijo.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { className: ['tabla-envoltorio'] },
            children: [hijo],
          };
        }
        recorrer(hijo);
        return hijo;
      });
    };
    recorrer(arbol);
  };
}

// https://astro.build/config
export default defineConfig({
  // Dominio público — se usa para las URLs de compartir (Open Graph).
  // Cámbialo cuando tengáis dominio propio (p. ej. https://pabilovelas.com).
  site: 'https://pabilo-velas.pages.dev',

  markdown: {
    rehypePlugins: [envolverTablas],
  },
});
