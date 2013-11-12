function alongXY(p1,p2, r) { 
  return [alongX(p1, p2, r), alongY(p1,p2,r)];
}

function alongX(p1, p2, r) {
  var dx, extents, value;
  dx = ((p2[0] - p1[0]) * r);
  value = p1[0] + dx;
  return value;
}

function alongY(p1, p2, r) {
  var dy, extents, value;
  dy = ((p2[1] - p1[1]) * r);
  value = p1[1] + dy;
  return value;
}

function svg_connector_linear(d) {
  var left = d[0], right = d[1];
  return "M " + left[0] + " L " + right[0] +
         " L " + right[1] + " L " + left[1] + " Z";
}

function svg_connector_linear_step(d) {
  var left = d[0], right = d[1];
  var breakpoint = 0.3;
  if( right[1][1] > left[0][1]) {
    breakpoint = 0.6;
  }
  return "M " + left[0] + 
    " H " + alongX(left[0], right[0], breakpoint) + 
    " V"  + alongY(left[0], right[0], 1) + 
    " H"  + alongX(left[0], right[0], 1) + 
    " L " + right[1] +  // Right side straight line
    " H " + (alongX(right[1], left[1], breakpoint)) + 
    " V"  + alongY(right[1], left[1], 1) + 
    " L " + left[1] + " Z";
}

function svg_connector() {
  var connectTypes = { "linear-step": svg_connector_linear_step,
                       "linear": svg_connector_linear } ;
  var connectFn = svg_connector_linear_step;
  var xFn = function(point) { return point[0]},
      yFn = function(point) { return point[1]};

  function connector(d) {
    points = [[xFn(d[0]), yFn(d[0])], [xFn(d[1]),yFn(d[1])]];
    return connectFn(points);
  }

  connector.type = function(t) {
    if (! arguments.length) { return connectType; }
    if (typeof(t) == "function") { connectFn = t }
    else { connectFn = connectTypes[t]}
    return connector;
  };

  connector.x = function(f) {
    if (!arguments.length) { return xFn; }
    xFn = f;
    return connector;
  };

  connector.y = function(f) {
    if (!arguments.length) { return yFn; }
    yFn = f;
    return connector;
  };
  return connector;
}

svgConnector = function() {
  return svg_connector();
};
