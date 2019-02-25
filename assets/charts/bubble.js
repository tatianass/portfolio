data = [
    {"skill": "Machine Learning" , "level": 1, "num_projects": 2},
    {"skill": "Python (Programming Language)" , "level": 1, "num_projects": 2},
    {"skill": "R" , "level": 1, "num_projects": 2},
    {"skill": "Data Science" , "level": 5, "num_projects": 2},
    {"skill": "Data Analysis" , "level": 1, "num_projects": 2},
    {"skill": "Statistics" , "level": 1, "num_projects": 2},
    {"skill": "SQL" , "level": 1, "num_projects": 2},
    {"skill": "Data Mining" , "level": 1, "num_projects": 2},
    {"skill": "Apache Spark" , "level": 3, "num_projects": 2},
    {"skill": "Deep Learning" , "level": 5, "num_projects": 2},
    {"skill": "Tableau" , "level": 1, "num_projects": 2},
    {"skill": "Statistical Modeling" , "level": 3, "num_projects": 2},
    {"skill": "Big Data" , "level": 1, "num_projects": 2},
    {"skill": "C++" , "level": 1, "num_projects": 2},
    {"skill": "Java" , "level": 1, "num_projects": 2},
    {"skill": "Data Visualization" , "level": 1, "num_projects": 2},
    {"skill": "Algorithms" , "level": 3, "num_projects": 2},
    {"skill": "Natural Language Processing (NLP)" , "level": 1, "num_projects": 2},
    {"skill": "Programming" , "level": 1, "num_projects": 2},
    {"skill": "Predictive Modeling" , "level": 1, "num_projects": 2},
    {"skill": "Artificial Intelligence (AI)" , "level": 3, "num_projects": 2}
  ]

var width = 960,
    height = 500,
    padding = 1.5, // separation between same-color nodes
    clusterPadding = 6, // separation between different-color nodes
    maxRadius = 12;

var n = 100, // total number of nodes
    m = 5; // number of distinct clusters

var color = d3.scale.category10()
    .domain(d3.range(m));

// The largest node for each cluster.
var clusters = new Array(m);

// var nodes = d3.range(data.length).map(function() {
//   var i = Math.floor(Math.random() * m),
//       r = Math.sqrt((i + 1) / m * -Math.log(Math.random())) * maxRadius,
//       d = {
//         cluster: i,
//         radius: r,
//         x: Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random(),
//         y: Math.sin(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random()
//       };
//   if (!clusters[i] || (r > clusters[i].radius)) clusters[i] = d;
//   return d;
// });

nodes = []
for (i = 0; i < data.length; i++) {
  j = {}
  
  a = data[i]['level'] * 10;
  r = data[i]['num_projects'] * 10;

  j['skill'] = data[i]['skill'];
  j['cluster'] = a;
  j['radius'] = r;
  j['x'] = Math.cos(i / m * 2 * Math.PI) * 200 + width / 2 + Math.random();
  j['y'] = Math.cos(i / m * 2 * Math.PI) * 200 + height / 2 + Math.random();

  if (!clusters[a] || (r > clusters[a].radius)) clusters[a] = j

  nodes.push(j)
}

var force = d3.layout.force()
    .nodes(nodes)
    .size([width, height])
    .gravity(.02)
    .charge(0)
    .on("tick", tick)
    .start();

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var node = svg.selectAll("circle")
    .data(nodes)
  .enter().append("circle")
    .style("fill", function(d) { return color(d.cluster); })
    .attr("data-legend",function(d) { return d.skill})
    .call(force.drag);

node.transition()
    .duration(750)
    .delay(function(d, i) { return i * 5; })
    .attrTween("r", function(d) {
      var i = d3.interpolate(0, d.radius);
      return function(t) { return d.radius = i(t); };
    });

function tick(e) {
  node
      .each(cluster(10 * e.alpha * e.alpha))
      .each(collide(.5))
      .attr("cx", function(d) { return d.x; })
      .attr("cy", function(d) { return d.y; });
}

// Move d to be adjacent to the cluster node.
function cluster(alpha) {
  return function(d) {
    var cluster = clusters[d.cluster];
    if (cluster === d) return;
    var x = d.x - cluster.x,
        y = d.y - cluster.y,
        l = Math.sqrt(x * x + y * y),
        r = d.radius + cluster.radius;
    if (l != r) {
      l = (l - r) / l * alpha;
      d.x -= x *= l;
      d.y -= y *= l;
      cluster.x += x;
      cluster.y += y;
    }
  };
}

// Resolves collisions between d and all other circles.
function collide(alpha) {
  var quadtree = d3.geom.quadtree(nodes);
  return function(d) {
    var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
        nx1 = d.x - r,
        nx2 = d.x + r,
        ny1 = d.y - r,
        ny2 = d.y + r;
    quadtree.visit(function(quad, x1, y1, x2, y2) {
      if (quad.point && (quad.point !== d)) {
        var x = d.x - quad.point.x,
            y = d.y - quad.point.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
        if (l < r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          quad.point.x += x;
          quad.point.y += y;
        }
      }
      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
    });
  };
}