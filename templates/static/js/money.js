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
    // Add 2 buttons 
    <button onclick="update('var1')">Sport</button>
    <button onclick="update('var2')">Nationality</button>

    // set the dimensions and margins of the graph
    var margin = {top: 30, right: 30, bottom: 70, left: 60},
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");
    // Initialize the X axis
    var x = d3.scaleBand()
    .range([ 0, width ])
    .padding(1);
    var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")

    // Initialize the Y axis
    var y = d3.scaleLinear()
    .range([ height, 0]);
    var yAxis = svg.append("g")
    .attr("class", "myYaxis")

    // A function that create / update the plot for a given variable:
function update(selectedVar) {

    // Parse the Data
    d3.csv("top_paid_clean.csv", function(data) {
  
      // X axis
      x.domain(data.map(function(d) { return d.group; }))
      xAxis.transition().duration(1000).call(d3.axisBottom(x))
  
      // Add Y axis
      y.domain([0, d3.max(data, function(d) { return +d[selectedVar] }) ]);
      yAxis.transition().duration(1000).call(d3.axisLeft(y));

        // variable u: map data to existing circle
    var j = svg.selectAll(".myLine")
    .data(data)
  // update lines
  j
    .enter()
    .append("line")
    .attr("class", "myLine")
    .merge(j)
    .transition()
    .duration(1000)
      .attr("x1", function(d) { console.log(x(d.group)) ; return x(d.group); })
      .attr("x2", function(d) { return x(d.group); })
      .attr("y1", y(0))
      .attr("y2", function(d) { return y(d[selectedVar]); })
      .attr("stroke", "grey")


  // variable u: map data to existing circle
  var u = svg.selectAll("circle")
    .data(data)
  // update bars
  u
    .enter()
    .append("circle")
    .merge(u)
    .transition()
    .duration(1000)
      .attr("cx", function(d) { return x(d.group); })
      .attr("cy", function(d) { return y(d[selectedVar]); })
      .attr("r", 8)
      .attr("fill", "#69b3a2");


})

}

// Initialize plot
update('var1')
  


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