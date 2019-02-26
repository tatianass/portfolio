var data = [
			{"keyword": "Hi my name is", "number_of_times": 389},
			{"keyword": "Tatiana", "number_of_times": 1929},
			{"keyword": "and I am a", "number_of_times": 3853},
			{"keyword": "Data Scientist", "number_of_times": 1117}
		];


var div = d3.select("#keywords").append("div").attr("class", "toolTip");

var axisMargin = 20,
        margin = 40,
        NumberOfTimesMargin = 4,
        width = parseInt(d3.select("#keywords").style('width'), 10),
        height = parseInt(d3.select("#keywords").style('height'), 10),
        barHeight = (height-axisMargin-margin*2)* 0.4/data.length,
        barPadding = (height-axisMargin-margin*2)*0.6/data.length,
        data, bar, svg, scale, xAxis, keywordWidth = 0;

max = d3.max(data, function(d) { return d.number_of_times; });

svg = d3.select("#keywords")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


bar = svg.selectAll("g")
        .data(data)
        .enter()
        .append("g");

bar.attr("class", "bar")
        .attr("cx",0)
        .attr("transform", function(d, i) {
            return "translate(" + margin + "," + (i * (barHeight + barPadding) + barPadding) + ")";
        });

bar.append("text")
        .attr("class", "keyword")
        .attr("y", barHeight / 2)
        .attr("dy", ".35em") //vertical align middle
        .text(function(d){
            return d.keyword;
        }).each(function() {
    keywordWidth = Math.ceil(Math.max(keywordWidth, this.getBBox().width));
});

scale = d3.scale.linear()
        .domain([0, max])
        .range([0, width - margin*2 - keywordWidth]);

xAxis = d3.svg.axis()
        .scale(scale)
        .tickSize(-height + 2*margin + axisMargin)
        .orient("bottom");

bar.append("rect")
        .attr("transform", "translate("+keywordWidth+", 0)")
        .attr("height", barHeight)
					.attr("width", 0)
					.transition()
					.duration(1500)
					.delay(function(d,i){ return i*250})
        .attr("width", function(d){
            return scale(d.number_of_times);
        });

bar.append("text")
        .attr("class", "number_of_times")
        .attr("y", barHeight / 2)
        .attr("dx", -NumberOfTimesMargin + keywordWidth) //margin right
        .attr("dy", ".35em") //vertical align middle
        .attr("text-anchor", "end")
        .text(function(d){
            return (d.number_of_times);
        })
        .attr("x", function(d){
            var width = this.getBBox().width;
            return Math.max(width + NumberOfTimesMargin, scale(d.number_of_times));
        });

bar
        .on("mousemove", function(d){
            div.style("left", d3.event.pageX+10+"px");
            div.style("top", d3.event.pageY-25+"px");
            div.style("display", "inline-block");
            div.html((d.keyword)+"<br>"+(d.number_of_times));
        });
bar
        .on("mouseout", function(d){
            div.style("display", "none");
        });

svg.insert("g",":first-child")
        .attr("class", "axisHorizontal")
        .attr("transform", "translate(" + (margin + keywordWidth) + ","+ (height - axisMargin - margin)+")")
        .call(xAxis);
