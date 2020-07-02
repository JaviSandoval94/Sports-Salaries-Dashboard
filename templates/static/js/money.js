var select1 = d3.select("#sportNation");
var select2 = d3.select("#specific");

select1.on("change", runMain);
select2.on("change", runSpecific);

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

function lollipop(data){
 
  var years = [];
  var values = [];
  var total = [];
  Object.entries(data).forEach(([key, value]) => {
    key = +key;
    value = +value;
    years.push(key);
    values.push(value);
    total.push({"year":key, "earnings":value});
  })
  // console.log(total[0].year);

  var svgArea = d3.select("#lolliChart").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight*0.5;

  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 90, left: 50},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#lolliChart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  var lolli = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      // X axis
  var x = d3.scaleBand()
    .domain(years)
    .range([ 0, width])
    .padding(1);

    lolli.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(values)])
    .range([ height, 0]);

    lolli.append("g")
    .call(d3.axisLeft(y));

  // Lines
  lolli.selectAll("myline")
    .data(total)
    .enter()
    .append("line")
    .attr("x1", d => x(d.year))
    .attr("x2", function(d) { return x(d.year); })
    .attr("y1", function(d) { return y(d.earnings); })
    .attr("y2", y(0))
    .attr("stroke", "grey")

  // Circles
  var circles = lolli.selectAll("mycircle")
    .data(total)
    .enter()
  
  var circleGroup = circles
    .append("circle")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.earnings))
    .attr("r", "5")
    .style("fill", "#69b3a2")
    .attr("stroke", "black")

  var toolTip = d3.tip()
    .attr("class", "tip")
    .offset([80, -60])
    .html(function(data) {
      return(`<strong>${data}<br>Earnings: ${data}`)
    });

  circleGroup.call(toolTip);

  circleGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
    .on("mouseout", function(data) {
      toolTip.hide(data);
    })
}


function rankingPie(rank){
    var rPie = d3.select("#rankPie");
    rPie.html("");
    labels = [];
    values = [];
    Object.entries(rank).forEach(([key, value]) => {
      if(value){
        labels.push(key);
        values.push(value);
      }
    })

    var data = [{
      labels: labels,
      values: values,
      type: "pie",
      textfont: {
        color: "whitesmoke"
      }
    }];

    var layout = {
      title: `${s2} Ranking Distribution`,
      paper_bgcolor: "white",

    }

    Plotly.newPlot('rankPie', data, layout);    
}

function fillSpecific(options) {
  var specific = d3.select("#specific");

  specific.html("");

  if(all){
    options.forEach(value => {
      var option = specific.append("option");
      option.property("value", value).text(value);
    })
  }
}

function fillCard(earnings, ranks, athletes, all) {
  var s2 = select2.property("value");

  // console.log(athletes);
  var card = d3.select(".stats-list");

  card.html("");

  athletes = athletes[s2].Name;
  var sum = 0;
  var tEarn = 0;
  var bRank = 11;

  Object.entries(earnings[s2]).forEach(([key, value]) => {
    sum += value;
    if(value>tEarn){
      tEarn = value;
      bYear = key;
    }
  })
  Object.entries(ranks[s2]).forEach(([key, value]) => {
    if (value){
      if (key<bRank){
        bRank = key;
      }
    }
  })
  
  // console.log(all);
  oRank = all.findIndex(function(result) {
    result = s2;
    // console.log(result);
    return result
  });
  // console.log(oRank);
  
  
  card.append("li").text(`Total Athletes: ${athletes}`);
  card.append("li").text(`Overall Rank: ${athletes}`)
  card.append("li").text(`Best Rank: ${bRank}`)
  card.append("li").text(`Best Year: ${bYear}`)
  card.append("li").text(`Total Earnings: ${sum.toFixed(2)} Millions of Dollars`)
}

url = "http://localhost:5000/"
var data = d3.json(url);

function runSpecific() {
  data.then(sample => {

    var s1 = select1.property("value");

    if (s1=="sport") {
      earnings = sample.sportEarnings;
      ranks = sample.sportRanks;
      athletes = sample.sportAthletes;
      all = sample.allSports;
    }
    else if (s1=="nation") {
      earnings = sample.nationEarnings;
      ranks = sample.nationRanks;
      athletes = sample.nationAthletes;
      all = sample.allNations;
    }

    // console.log(sample.sportRanks)

    s2 = select2.property("value");
   
    fillCard(earnings, ranks, athletes, all);

    rankingPie(ranks[s2]);

    lollipop(earnings[s2]);

  })
}

function runMain() {

  data.then(sample => {
    // console.log(sample);

    var s1 = select1.property("value");
    // console.log(s1);

    if (s1=="sport") {
      earnings = sample.sportEarnings;
      ranks = sample.sportRanks;
      athletes = sample.sportAthletes;
      all = sample.allSports;
    }
    else if (s1=="nation") {
      earnings = sample.nationEarnings;
      ranks = sample.nationRanks;
      athletes = sample.nationAthletes;
      all = sample.allNations;
    }
    else {
      all = "";
    }

    fillSpecific(all);
  })
}
d3.select(window).on("resize", runSpecific);