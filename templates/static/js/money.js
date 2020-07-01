function radialChart(){
    // Recibe las ganancias (los circulos externos), por nacionalidad/deporte (barras, cada deporte o nacionalidad es un color), y eso por año
    // (son los tags dentro del circulo, etiquetan cada columna de colores)
}


function nationalitiesPie (){
    // % de ganancias por país, de todos los años del data set

}

function sportPie(){
    // % de ganancias por deporte, todos los años

}

function lollipop(){
    // Recibe los años (eje x), las ganancias (eje y) y el rank (determina el radio de cada círculo)
    
}

function rankingPie(){
    // % De veces que quedo el seleccionado en cada lugar (va del 1 al 10, no todos tienen el rango completo)
    
}

function selector() {
        // Input: Opción seleccionada en el elemento form-check
        // @ sport: Devuelve en el selector todas las opciones de deportes en el data set
        // @ nationality: Devuelve en el selector todas las opciones de nacionalidades en el data set

}

url = "http://localhost:5000/"
d3.json(url).then(sample => {
    console.log(sample);
})