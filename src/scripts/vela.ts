// ─────────────────────────────────────────────────────────────
//  «Enciende la vela» — el interruptor de la noche
//
//  La noche entra como una mancha de tinta que sale del propio
//  botón y se extiende por la pantalla hasta cubrirla. Al apagar,
//  se recoge hacia el botón y vuelve el día.
//
//  Se apoya en la View Transitions API: el navegador toma una foto
//  de la página, aplica el cambio y anima el paso de una a otra
//  recortando un círculo. Como es el compositor quien lo hace, no
//  se repinta la página en cada fotograma.
//
//  Si el navegador no la soporta, o si el sistema pide reducir el
//  movimiento, el cambio es instantáneo y ya está.
// ─────────────────────────────────────────────────────────────

type Rotulos = { encender: string; apagar: string };

const CLAVE = 'pabilo-noche';
const DURACION = 780;
const CURVA = 'cubic-bezier(0.4, 0, 0.2, 1)';

export function iniciarVela(rotulos: Record<string, Rotulos>) {
  const boton = document.getElementById('vela-boton');
  const raiz = document.documentElement;
  const idioma = raiz.lang === 'en' ? 'en' : 'es';
  const texto = rotulos[idioma] ?? rotulos.es;

  const sinMovimiento = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const soportado = () => typeof (document as any).startViewTransition === 'function';

  const pintar = (encendida: boolean) => {
    raiz.classList.toggle('noche', encendida);
    boton?.setAttribute('aria-pressed', String(encendida));
    const rotulo = encendida ? texto.apagar : texto.encender;
    boton?.setAttribute('title', rotulo);
    const etiqueta = boton?.querySelector('.visualmente-oculto');
    if (etiqueta) etiqueta.textContent = rotulo;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', encendida ? '#16120F' : '#2B2521');
  };

  // El centro del botón: de ahí sale (y ahí vuelve) la mancha
  const centroDelBoton = () => {
    const r = boton?.getBoundingClientRect();
    if (!r) return { x: window.innerWidth / 2, y: 0 };
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  };

  // Distancia del botón a la esquina más lejana: hasta dónde crecer
  const radioNecesario = (x: number, y: number) =>
    Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  // Al cargar, el <script> del <head> ya pudo dejarla encendida
  pintar(raiz.classList.contains('noche'));

  boton?.addEventListener('click', () => {
    const encendida = !raiz.classList.contains('noche');
    try { localStorage.setItem(CLAVE, encendida ? '1' : '0'); } catch (e) {}

    if (!soportado() || sinMovimiento()) {
      pintar(encendida);
      return;
    }

    const { x, y } = centroDelBoton();
    const radio = radioNecesario(x, y);
    const circuloChico = `circle(0px at ${x}px ${y}px)`;
    const circuloGrande = `circle(${radio}px at ${x}px ${y}px)`;

    // Al apagar, quien se mueve es la capa vieja: hay que ponerla delante
    raiz.classList.toggle('vela-apagando', !encendida);

    const transicion = (document as any).startViewTransition(() => pintar(encendida));

    transicion.ready
      .then(() => {
        raiz.animate(
          {
            clipPath: encendida
              ? [circuloChico, circuloGrande]   // la noche se extiende
              : [circuloGrande, circuloChico],  // la noche se recoge
          },
          {
            duration: DURACION,
            easing: CURVA,
            pseudoElement: encendida ? '::view-transition-new(root)' : '::view-transition-old(root)',
          }
        );
      })
      .catch(() => {});

    transicion.finished.finally(() => {
      raiz.classList.remove('vela-apagando');
      // Red de seguridad: si el navegador cancelara la transición sin
      // llegar a aplicar el cambio, lo dejamos como debe quedar.
      if (raiz.classList.contains('noche') !== encendida) pintar(encendida);
    });
  });
}

// La luz cálida que sigue al cursor cuando la vela está encendida.
// Solo con ratón: en una pantalla táctil no hay puntero al que seguir.
export function seguirConLaLuz() {
  const luz = document.getElementById('luz-vela');
  if (!luz) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let destinoX = window.innerWidth / 2;
  let destinoY = window.innerHeight * 0.35;
  let lx = destinoX;
  let ly = destinoY;
  let despierta = false;

  window.addEventListener(
    'pointermove',
    (e) => {
      destinoX = e.clientX;
      destinoY = e.clientY;
      if (!despierta) {
        despierta = true;
        lx = destinoX;
        ly = destinoY;
        luz.classList.add('encendida');
      }
    },
    { passive: true }
  );

  const bucle = () => {
    lx += (destinoX - lx) * 0.14;
    ly += (destinoY - ly) * 0.14;
    luz.style.setProperty('--luz-x', lx.toFixed(1) + 'px');
    luz.style.setProperty('--luz-y', ly.toFixed(1) + 'px');
    requestAnimationFrame(bucle);
  };
  requestAnimationFrame(bucle);
}
