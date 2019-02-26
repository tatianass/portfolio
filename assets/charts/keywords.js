data = {
	"keywords":
		[
			{"keyword": "Hi my name is", "number_of_times": 389},
			{"keyword": "Hi my name is", "number_of_times": 1929},
			{"keyword": "Hi my name is", "number_of_times": 3853},
			{"keyword": "Hi my name is", "number_of_times": 1117}
		]
}

var margin = 60,
	width = 1000 - 2* margin,
	height = 600 - 2 * margin;


var chart = d3.select(".main")
		.append("svg")
		.append('g')
		.attr('transform', `translate(${margin}, ${margin})`);