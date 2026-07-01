const VENTAS_BASSE = 5;


function calcularComision(numeroVentas, precioProducto) {
    let comision = 0;

    if (numeroVentas > VENTAS_BASSE) {
        let ventasExtras = numeroVentas - VENTAS_BASSE;
        comision = ventasExtras * (precioProducto * 0.10)
    }

    return comision;
}

function calcular(){
    // recuperamos propiedades de las cajas de texto
    let componenteSueldoBase = document.getElementById("txtSueldoBase");
    let componenteVentas = document.getElementById("txtVentas");
    let componentePrecio = document.getElementById("txtPrecio");
    //recuperamos el valor de las cajas de texto
    let sueldoBaseStr= componenteSueldoBase.value;
    let numeroventasStr= componenteVentas.value;
    let precioProductoStr= componentePrecio.value;

    //convertimos el valor a numero float
    let sueldoBase = parseFloat(sueldoBaseStr);
    let numeroventas = parseFloat(numeroventasStr);
    let precioProducto = parseFloat(precioProductoStr);

    let comision =calcularComision(numeroventas,precioProducto)

    let total= sueldoBase + comision;

    let spSueldoBase=document.getElementById("spSueldoBase");
    let spComision=document.getElementById("spComision");
    let spTotal=document.getElementById("spTotal");

    spSueldoBase.textContent = sueldoBase;
    spComision.textContent = comision;
    spTotal.textContent = total;



}