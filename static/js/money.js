var select1 = d3.select("#sportNation");
var select2 = d3.select("#specific");

select1.on("change", runMain);
select2.on("change", runSpecific);

url = "/api/sports"
var data = d3.json(url);

function radialChart(url){
  d3.json(url).then( (sample) => {
    function add(accumulator, a) {
      return accumulator + a;
    }
    var sportsEarnings = sample.yearSport;
    var yearSport = [];
    var sports = [];
    Object.entries(sportsEarnings).forEach(([key, value]) => {
      yearSport.push(key);
      sports.push(value);
    });
    var sportArray = [];
    var earningArray = [];
    sports.forEach( (sport) => {
      Object.entries(sport).forEach(([key, value]) => {
        sportArray.push(key);
        earningArray.push(Number.parseInt(value));
      });
    });

    // Call the corresponding part of JSON
    var yearaEarnings = sample.yearEarnings;
    var year = [];
    var earnings = [];
    Object.entries(yearaEarnings).forEach(([key, value]) => {
      year.push(key);
      earnings.push(parseInt(value["Earnings (Millions of US$)"]));
    });
    sumTotal = earnings.reduce(add,0);
    
    var labels = ["Total"];
    var parents = [""];
    var values = [sumTotal];
    year.forEach( (value) => {
      labels.push(value);
      parents.push("Total");
    });
    earnings.forEach( (value) => {
      values.push(value);
    });
    earningArray.forEach( (value) => {
      values.push(value);
    });
    sportArray.forEach( (value) => {
      labels.push(value);
    });
    year.forEach( (value) => {
      for (var i =0; i <13; i++) {
        parents.push(value);
      };
    });

    var data = [{
      "type": "sunburst",
      "labels": labels,
      "parents": parents,
      "values": values,
      "leaf": {"opacity": 0.4},
      "marker": {"line": {"width": 2}},
      "branchvalues": 'total'
    }];
    
    var layout = {
      "margin": {"l": 0, "r": 0, "b": 0, "t": 0}
    };
    
    
    Plotly.newPlot('my_sunburst', data, layout, {showSendToCloud: true})
    
    myPlot = document.getElementById("my_sunburst");
  });
}

function nationalitiesPie (url){
  // % of ernings for each country
  d3.json(url).then( (sample) => {

    // Call the corresponding part of JSON
    var nationGlobal = sample.nationGlobalE;
    var countries = [];
    var earnings = [];

    Object.entries(nationGlobal).forEach(([key, value]) => {
      countries.push(key);
      earnings.push(parseInt(value["Earnings (Millions of US$)"]));
    });

    var maxCountries = earnings.indexOf(Math.max.apply(Math, earnings));
    var highestCountry = countries[maxCountries];
    var highestCountryText = `Highest paid country: ${highestCountry}`;
    var liCountry = d3.select(".highest-paid").append("li").text(highestCountryText);
    
    var trace1 = {
      values: earnings,
      labels: countries,
      type: 'pie',
      textinfo: "label+percent",
      textposition: "inside",
      automargin: true
    };
    
    var layout = {
      autosize: true,
      showlegend: false
    };
  
    var data = [trace1];
    Plotly.newPlot('nationality-pie', data, layout);
  });
  
}

function sportPie(url){
  // % of earnings for each sport
  d3.json(url).then( (sample) => {

    // Call the corresponding part of JSON
    var nationGlobal = sample.sportGlobalE;
    var sports = [];
    var earnings = [];

    Object.entries(nationGlobal).forEach(([key, value]) => {
      sports.push(key);
      earnings.push(value["Earnings (Millions of US$)"]);
    });


    var maxSports = earnings.indexOf(Math.max.apply(Math, earnings));
    var highestSport = sports[maxSports];
    var highestSportsText = `Highest paid sport: ${highestSport}`;
    var liSports = d3.select(".highest-paid").append("li").text(highestSportsText);
    
    var trace1 = {
      values: earnings,
      labels: sports,
      type: 'pie',
      textinfo: "label+percent",
      textposition: "inside",
      automargin: true
    };
    
    var layout = {
      autosize: true,
      showlegend: false  
    };
  
    var data = [trace1];
    Plotly.newPlot('sport-pie', data, layout);
  });
}

function atletheHighest(){
  // % of earnings for each sport
  d3.json(url).then( (sample) => {

    // Call the corresponding part of JSON
    var athleteGlobal = sample.AthletesEarnings;
    var athletes = [];
    var earnings = [];

    Object.entries(athleteGlobal).forEach(([key, value]) => {
      athletes.push(key);
      earnings.push(value["Earnings (Millions of US$)"]);
    });

    var maxAthlete = earnings.indexOf(Math.max.apply(Math, earnings));
    var highestAthlete = athletes[maxAthlete];
    var highestAthleteText = `Highest paid athtlete: ${highestAthlete}`;
    var liAthlete = d3.select(".highest-paid")
      .append("li")
      .text(highestAthleteText);    
  });
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
  max = d3.max(values);

  var svgArea = d3.select("#lolliChart").select("svg");

  // clear svg is not empty
  if (!svgArea.empty()) {
    svgArea.remove();
  }

  var svgWidth = window.innerWidth;
  var svgHeight = window.innerHeight;

  // set the dimensions and margins of the graph
  var margin = {top: 10, right: 30, bottom: 90, left: 100},
    width = svgWidth - margin.left - margin.right,
    height = svgHeight - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = d3.select("#lolliChart")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .classed("lolliChart", "true");

  var lolli = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

      // X axis
  var x = d3.scaleBand()
    .domain(years)
    .range([ 0, width])
    .padding(1);

    lolli.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "translate(-10,0)rotate(-45)")
    .style("text-anchor", "end");

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(values)*1.2])
    .range([height, 0]);

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

  var xLabel = lolli.append("g")
    .attr("transform", `translate(${width / 2}, ${height + 20})`)
    .append("text")
    .attr("y", 25)
    .text("Years")

  var yLabel = lolli.append("g")
    .attr("transform", "rotate(-90)")
    .append("text")
    .attr("y", 0 - margin.left + 50)
    .attr("x", 0 - (2*height/3))
    .text("Earnings [Millions of Dollars]");

  // Circles
  var circles = lolli.selectAll("mycircle")
    .data(total)
    .enter()
  
  var circleGroup = circles
    .append("circle")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.earnings))
    .attr("r", d=> d.earnings/max * 20)
    .style("fill", "#69b3a2")
    .attr("stroke", "black")

  var toolTip = d3.tip()
    .attr("class", "d3-tip")
    .offset([80, -60])
    .html(function(data) {
      // console.log(data);
      return(`<strong>Year</strong>: ${data.year}<hr><strong>Earnings</strong>: ${data.earnings} M. US$`)
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
      paper_bgcolor: "white"
      // showlegend: false
    }

    Plotly.newPlot('rankPie', data, layout);    
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
  // sport o nation Global E, sort descending call index
  
  card.append("li").text(`Total Athletes: ${athletes}`);
  card.append("li").text(`Overall Rank: ${athletes}`)
  card.append("li").text(`Best Rank: ${bRank}`)
  card.append("li").text(`Best Year: ${bYear}`)
  card.append("li").text(`Total Earnings: ${sum.toFixed(2)} Millions of Dollars`)
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

radialChart(url);
nationalitiesPie(url);
sportPie(url);
atletheHighest(url);

d3.select(window).on("resize", runSpecific);