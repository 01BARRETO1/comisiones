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
    let sueldoBase=recuperarFloat("txtSueldoBase");
    //let sueldoBase = parseFloat(sueldoBaseStr);
    let numeroVentas = recuperarFloat("txtVentas");
    //let numeroventas = parseFloat(numeroventasStr);
    let precioProducto = recuperarFloat("txtPrecio"); 
    let comision =calcularComision(numeroVentas,precioProducto);

    let total= sueldoBase + comision;

    let spSueldoBase=document.getElementById("spSueldoBase");
    let spComision=document.getElementById("spComision");
    let spTotal=document.getElementById("spTotal");

    spSueldoBase.textContent = sueldoBase;
    spComision.textContent = comision;
    spTotal.textContent = total;
    lanzarMonedas();

}

function lanzarMonedas(){

    const contenedor=document.getElementById("lluviaMonedas");

    const sonido=document.getElementById("sndMonedas");

    sonido.currentTime=0;
    sonido.play();

    for(let i=0;i<25;i++){

        let moneda=document.createElement("div");

        moneda.className="moneda";

        moneda.innerHTML="🪙";

        let tam=20+Math.random()*40;

        moneda.style.fontSize=tam+"px";

        moneda.style.left=Math.random()*100+"vw";

        moneda.style.animationDuration=(2+Math.random()*2)+"s";

        moneda.style.animationDelay=(Math.random()*0.8)+"s";

        contenedor.appendChild(moneda);

        moneda.addEventListener("animationend",function(){

            moneda.remove();

        });

    }

}