
observations = [{"datetime":"10/10/1949 20:30","city":"san marcos","state":"tx","country":"us","shape":"cylinder","duration (seconds)":"2700","duration (hours/min)":"45 minutes","comments":"This event took place in early fall around 1949-50. It occurred after a Boy Scout meeting in the Baptist Church. The Baptist Church sit","date posted":"4/27/2004","latitude":"29.8830556","longitude":"-97.9411111"},{"datetime":"10/10/1949 21:00","city":"lackland afb","state":"tx","country":"","shape":"light","duration (seconds)":"7200","duration (hours/min)":"1-2 hrs","comments":"1949 Lackland AFB, TX.  Lights racing across the sky & making 90 degree turns on a dime.","date posted":"12/16/2005","latitude":"29.38421","longitude":"-98.581082"}]


//Load la carte du monde
d3.json("https://unpkg.com/world-atlas@1/world/110m.json", function(error, world) {
    if (error) throw error;

    var world = world


    svg.insert("path", ".graticule")
        .datum(topojson.feature(world, world.objects.land))
        .attr("class", "land")
        .attr("d", path);

    svg.insert("path", ".graticule")
        .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
        .attr("class", "boundary")
        .attr("d", path);

    drawPoint([[-98.581082, 29.38421], [-97.9411111, 29.8830556]])
});

d3.request("http://ufo.jerome.cslabs.be/ufo_500.json")
.header("Content-Type", "application/json")
.header("Access-Control-Allow-Origin", "*")
.get(function(data) {
   console.log(data);
});



var svg = d3.select("svg")
width = svg.attr("width");
height = svg.attr("height");

var projection = d3.geoMercator()
    .scale((width - 3) / (2 * Math.PI))
    .translate([width / 2, height / 2]);
//var graticule = d3.geoGraticule();

var path = d3.geoPath()
    .projection(projection);

function drawPoint(data){
    //Erasing previous point
    svg.selectAll("circle").remove()


    svg.selectAll("circle")
		.data(data).enter()
		.append("circle")
		.attr("cx", function (d) { console.log(projection(d)); return projection(d)[0]; })
		.attr("cy", function (d) { return projection(d)[1]; })
		.attr("r", "8px")
		.attr("fill", "red");
}