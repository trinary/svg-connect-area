(function() { 
  function alongXY(p1,p2, r) { 
    return [alongX(p1, p2, r), alongY(p1, p2, r)];
  }

  function alongX(p1, p2, r) {
    var dx, extents;
    dx = ((p2[0] - p1[0]) * r);
    return p1[0] + dx;
  }

  function alongY(p1, p2, r) {
    var dy, extents;
    dy = ((p2[1] - p1[1]) * r);
    return p1[1] + dy;
  }

  function svg_connector_linear(d) {
    var first = d[0], second = d[1];
    return "M " + first[0] + " L " + second[0] +
          " L " + second[1] + " L " + first[1] + " Z";
  }

  function svg_connector_linear_step(d) {
    var first = d[0], second = d[1];
    var breakpoint = 0.3;
    if( second[1][1] > first[0][1]) {
      // switch break to prevent overlap
      breakpoint = 0.6;
    }
    return "M " + first[0] + 
      " H " + alongX(first[0], second[0], breakpoint) + 
      " V"  + alongY(first[0], second[0], 1) + 
      " H"  + alongX(first[0], second[0], 1) + 
      " L " + second[1] +  // second side straight line
      " H " + (alongX(second[1], first[1], breakpoint)) + 
      " V"  + alongY(second[1], first[1], 1) + 
      " L " + first[1] + " Z";
  }

  function svg_connector_vertical_curve(d) {
    var first = d[0], second = d[1];

    return "M " + first[0] + 
      " Q " + alongX(first[0], second[0], 0.5) + " " + first[0][1] + " " + alongXY(first[0], second[0], 0.5) + 
      " T " + second[0] + 
      " L " + second[1] + 
      " Q " + alongX(second[1], first[1], 0.5) + " " + second[1][1] + " " + alongXY(second[1], first[1], 0.5) + 
      " T " + first[1] + 
      " Z ";
      

  }

  function svg_connector() {
    var connectTypes = { "linear-step": svg_connector_linear_step,
                        "linear": svg_connector_linear,
                        "vertical-curve": svg_connector_vertical_curve } ;
    var connectFn = svg_connector_linear_step;
    var xFn = function(point) { return point[0]; },
        yFn = function(point) { return point[1]; };

    function connector(d) {
      var points = [[xFn(d[0]), yFn(d[0])], [xFn(d[1]),yFn(d[1])]];
      return connectFn(points);
    }

    connector.type = function(t) {
      if (! arguments.length) { return connectType; }
      if (typeof(t) == "function") { connectFn = t; }
      else { connectFn = connectTypes[t]; }
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
})();
