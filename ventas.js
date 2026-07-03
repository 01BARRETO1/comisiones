const VENTAS_BASSE = 5;


function calcularComision(numeroVentas, precioProducto) {
    let comision = 0;

    if (numeroVentas > VENTAS_BASSE) {
        let ventasExtras = numeroVentas - VENTAS_BASSE;
        comision = ventasExtras * (precioProducto * 0.10)
    }

    return comision;
}

/* function validarVentas() {
    //validacion
    let numeroVentasStr = recuperarTexto("txtVentas");
    if (numeroVentasStr.length > 5) {
        alert("Máximo 5 caracteres");
        return false;
    } else {
        return true;

    }

} */


function calcular() {
    if (!validarTodosLosInputs()) {
    limpiarResultados();
    return;
  }

    /* if(validarVentas()==false){
        return;
    } */


    // recuperamos propiedades de las cajas de texto
    //let componenteSueldoBase = document.getElementById("txtSueldoBase");
    //let componenteVentas = document.getElementById("txtVentas");
    //let componentePrecio = document.getElementById("txtPrecio");
    //recuperamos el valor de las cajas de texto
    //let sueldoBaseStr= componenteSueldoBase.value;
    /* let sueldoBaseStr=recuperarTexto("txtSueldoBase");
    let numeroventasStr=recuperarTexto("txtVentas");
    let precioProductoStr=recuperarTexto("txtPrecio"); */
    //let numeroventasStr= componenteVentas.value;
    //let precioProductoStr= componentePrecio.value;

    //convertimos el valor a numero float
    let sueldoBase = recuperarFloat("txtSueldoBase");
    //let sueldoBase = parseFloat(sueldoBaseStr);
    let numeroVentas = recuperarFloat("txtVentas");
    //let numeroventas = parseFloat(numeroventasStr);
    let precioProducto = recuperarFloat("txtPrecio");
    let comision = calcularComision(numeroVentas, precioProducto);

    let total = sueldoBase + comision;

    let spSueldoBase = document.getElementById("spSueldoBase");
    let spComision = document.getElementById("spComision");
    let spTotal = document.getElementById("spTotal");

    spSueldoBase.textContent = sueldoBase;
    spComision.textContent = comision;
    spTotal.textContent = total;
    lanzarMonedas();

}

function validarInput(idInput, idError) {
    const input = document.getElementById(idInput);
    const error = document.getElementById(idError);
    const valor = input.value.trim();

    if (valor === "") {
        error.textContent = "Este campo no puede estar vacío.";
        return false;
    }

    if (!/^\d+$/.test(valor)) {
        error.textContent = "Solo se permiten números.";
        return false;
    }

    if (valor.length > 5) {
        error.textContent = "Máximo 5 dígitos.";
        return false;
    }

    error.textContent = "";
    return true;
}

function lanzarMonedas() {

    const contenedor = document.getElementById("lluviaMonedas");

    const sonido = document.getElementById("sndMonedas");

    sonido.currentTime = 0;
    sonido.play();

    for (let i = 0; i < 25; i++) {
        let moneda = document.createElement("div");
        moneda.className = "moneda";

        let img = document.createElement("img");
        img.src = "coin.png";
        img.alt = "Moneda";

        // tamaño aleatorio entre 20px y 60px
        let tam = 30 + Math.random() * 70;
        img.style.width = tam + "px";
        img.style.height = "auto"; // mantiene proporción

        moneda.appendChild(img);

        moneda.style.left = Math.random() * 100 + "vw";
        moneda.style.animationDuration = (2 + Math.random() * 2) + "s";
        moneda.style.animationDelay = (Math.random() * 0.8) + "s";

        contenedor.appendChild(moneda);

        moneda.addEventListener("animationend", function () {
            moneda.remove();
        });
    }

}

function reset() {
    cambiarTexto("txtSueldoBase", "");
    cambiarTexto("txtVentas", "");
    cambiarTexto("txtPrecio", "");
    cambiarSpan("spSueldoBase", "");
    cambiarSpan("spComision", "");
    cambiarSpan("spTotal", "");
    cambiarDiv("errorSueldoBase", "");
    cambiarDiv("errorVentas", "");
    cambiarDiv("errorPrecio", "");

    // Reproducir sonido
    let sonido = new Audio("cha-ching.mp3");
    sonido.play();
    sonido.loop = false;   // no repetir
    sonido.volume = 0.03;   // volumen 
}

function limpiarResultados() {
  document.getElementById("spSueldoBase").textContent = "";
  document.getElementById("spComision").textContent = "";
  document.getElementById("spTotal").textContent = "";
}

function validarTodosLosInputs() {
  const sueldoValido = validarInput("txtSueldoBase", "errorSueldoBase");
  const ventasValido = validarInput("txtVentas", "errorVentas");
  const precioValido = validarInput("txtPrecio", "errorPrecio");

  return sueldoValido && ventasValido && precioValido;
}
