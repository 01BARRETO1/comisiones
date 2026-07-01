/* ======================================================
   EFECTO "RECOMPENSA DE VIDEOJUEGO"
   40 monedas + destello + sonido + brillo en el total
   Solo HTML + CSS + JS, sin librerías.
   ====================================================== */

// Reutilizamos el <audio id="sndMonedas"> que ya existe en tu HTML
// (si por alguna razón no existiera, creamos uno de respaldo con coin.mp3)
const sonidoChaChing = document.getElementById("sndMonedas") || new Audio("coin.mp3");
sonidoChaChing.volume = 0.9;

const capaMonedas = document.getElementById("lluviaMonedas");

/**
 * Lanza la animación completa de recompensa.
 * @param {HTMLElement} boton - el botón "Calcular Comisión" (origen de la explosión)
 * @param {HTMLElement} elementoTotal - el elemento donde se muestra el total (para el brillo final)
 */
function celebrarComision(boton, elementoTotal){

    // --- 0 ms: sonido + destello ---
    sonidoChaChing.currentTime = 0;
    sonidoChaChing.play().catch(() => {}); // catch por si el navegador bloquea autoplay

    const rectBoton = boton.getBoundingClientRect();
    const origenX = rectBoton.left + rectBoton.width / 2;
    const origenY = rectBoton.top + rectBoton.height / 2;

    crearDestello(origenX, origenY);

    // --- 100 ms: explosión de monedas ---
    setTimeout(() => {
        crearExplosionDeMonedas(origenX, origenY);
    }, 100);

    // --- Al finalizar (~2.1s): brillo dorado en el total ---
    setTimeout(() => {
        if (elementoTotal){
            elementoTotal.classList.remove("brillo-total"); // reset si ya tenía la clase
            void elementoTotal.offsetWidth; // fuerza reflow para reiniciar animación
            elementoTotal.classList.add("brillo-total");
        }
    }, 2100);
}

function crearDestello(x, y){
    const destello = document.createElement("div");
    destello.className = "destello";
    destello.style.left = x + "px";
    destello.style.top = y + "px";

    capaMonedas.appendChild(destello);

    destello.addEventListener("animationend", () => destello.remove());
}

function crearExplosionDeMonedas(x, y){

    const TOTAL_MONEDAS = 40;
    const tamanos = ["small", "medium", "large"];

    for (let i = 0; i < TOTAL_MONEDAS; i++){

        const moneda = document.createElement("div");
        const tamano = tamanos[Math.floor(Math.random() * tamanos.length)];
        moneda.className = `moneda ${tamano}`;

        // Posición inicial: justo en el centro del botón
        moneda.style.left = x + "px";
        moneda.style.top = y + "px";

        // Ángulo de salida distinto para cada moneda (círculo completo, sesgado hacia arriba)
        const angulo = Math.random() * Math.PI * 2;
        const distancia = 120 + Math.random() * 220; // qué tan lejos llega

        // Componente horizontal libre, componente vertical siempre negativa (sube)
        const tx = Math.cos(angulo) * distancia;
        const ty = -Math.abs(Math.sin(angulo) * distancia) - 60;

        // Rotación aleatoria (varias vueltas)
        const rot = (Math.random() > 0.5 ? 1 : -1) * (720 + Math.random() * 720);

        // Duración y retraso aleatorios -> velocidad aleatoria y sensación de "lluvia"
        const duracion = 1.4 + Math.random() * 0.9; // 1.4s - 2.3s
        const retraso = Math.random() * 0.35;        // hasta 350ms de diferencia

        moneda.style.setProperty("--tx", tx.toFixed(1) + "px");
        moneda.style.setProperty("--ty", ty.toFixed(1) + "px");
        moneda.style.setProperty("--rot", rot.toFixed(0) + "deg");
        moneda.style.animationDuration = duracion.toFixed(2) + "s";
        moneda.style.animationDelay = retraso.toFixed(2) + "s";

        capaMonedas.appendChild(moneda);

        moneda.addEventListener("animationend", () => moneda.remove());
    }
}
