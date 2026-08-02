// ─────────────────────────────────────────────────────────────
//  «Enciende la vela» — el interruptor de la noche
//
//  Al pulsarlo cae un telón con un horizonte ámbar: mientras la
//  pantalla está tapada se cambia el tema, y el telón se retira
//  dejando ver la web ya de noche (o ya de día).
//
//  Solo se animan «transform» y «opacity», que el navegador
//  resuelve en la GPU sin volver a pintar la página. El telón se
//  crea la primera vez que hace falta y se retira al acabar.
// ─────────────────────────────────────────────────────────────

type Rotulos = { encender: string; apagar: string };

const CLAVE = 'pabilo-noche';
const DURACION = 900;   // lo que dura el telón entero
const RELEVO = 360;     // cuándo cambia el tema, ya tapado

export function iniciarVela(rotulos: Record<string, Rotulos>) {
  const boton = document.getElementById('vela-boton');
  const raiz = document.documentElement;
  const idioma = raiz.lang === 'en' ? 'en' : 'es';
  const texto = rotulos[idioma] ?? rotulos.es;

  const sinMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let telon: HTMLElement | null = null;
  let relevo: number | undefined;
  let limpieza: number | undefined;

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

  const echarTelon = (anochece: boolean) => {
    if (!telon) {
      telon = document.createElement('div');
      telon.className = 'telon';
      telon.setAttribute('aria-hidden', 'true');
      document.body.appendChild(telon);
    }
    // reiniciar por si se pulsa dos veces seguidas
    telon.classList.remove('telon--cae', 'telon--sube');
    void telon.offsetWidth;
    telon.classList.add(anochece ? 'telon--cae' : 'telon--sube');
  };

  // Al cargar, el <script> del <head> ya pudo dejarla encendida
  pintar(raiz.classList.contains('noche'));

  boton?.addEventListener('click', () => {
    const encendida = !raiz.classList.contains('noche');
    try { localStorage.setItem(CLAVE, encendida ? '1' : '0'); } catch (e) {}

    if (sinMovimiento) {
      pintar(encendida);
      return;
    }

    window.clearTimeout(relevo);
    window.clearTimeout(limpieza);

    echarTelon(encendida);
    // el cambio ocurre a escondidas, con el telón cubriendo
    relevo = window.setTimeout(() => pintar(encendida), RELEVO);
    // y el telón se retira del todo cuando termina
    limpieza = window.setTimeout(() => {
      telon?.classList.remove('telon--cae', 'telon--sube');
    }, DURACION);
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
