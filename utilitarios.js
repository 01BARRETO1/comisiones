function recuperarTexto(idComponente) {
    let componente = document.getElementById(idComponente);
    let valor = componente.value;

    return valor;

}

function recuperarFloat (idComponente){
    let valorTexto = recuperarTexto(idComponente);
    let valorFloat = parseFloat(valorTexto);
    return valorFloat;
}

function cambiarTexto(idComponente,mensaje) {
    let componente = document.getElementById(idComponente);
    let valor = componente.value=mensaje;

    return valor;

}

function cambiarSpan(id,mensaje){
    let componente = document.getElementById(id);
    let change=componente.textContent=mensaje;
    return change;
}

function cambiarDiv(id,mensaje){
    let divClean=document.getElementById(id);
    let clean=divClean.innerText=mensaje
    return clean;
}