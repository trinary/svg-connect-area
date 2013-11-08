
function pointAlong(p1,p2, r) { 
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

function svg_connector_linear_step(d) {
    var breakpoint = 0.3;
    if( d[1][1] > d[0][1]) {
      breakpoint = 0.6;
    }
    return "M " + d[0] + 
      " H " + alongX(d[0], d[1], breakpoint) + 
      " V"  + alongY(d[0], d[1], 1) + 
      " H"  + alongX(d[0], d[1], 1) + 
      " L " + d[2] +  // Right side straight line
      " H " + (alongX(d[2], d[3], breakpoint)) + 
      " V"  + alongY(d[3], d[2], 0) + 
      " L " + d[3] + " Z";
}

function svg_connector() {
  var connectTypes = { "linear-step": svg_connector_linear_step } ;
  var connectFn = svg_connector_linear_step;


  function connector(d) {
    return connectFn(d);
  }

  connector.type = function(t) {
    if (! arguments.length) { return connectType; }
    if (typeof(t) == "function") { connectFn = t; }
    else { connectFn = connectTypes[t]; }
    return connector;
  };
  return connector;
}

svgConnector = function() {
  return svg_connector();
};
