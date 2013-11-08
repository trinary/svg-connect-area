function curve_functor(v) {
  return typeof v === "function" ? v : function() { return v; };
}

curve = function() {
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
  function curve(d) {

    return "M " + d[0] + 
      " H " + alongX(d[0], d[1], 0.3) + 
      " V"  + alongY(d[0], d[1], 1) + 
      " H"  + alongX(d[0], d[1], 1) + 
      " L " + d[2] +  // Right side straight line
      " H " + (alongX(d[2], d[3], 0.6)) + 
      " V"  + alongY(d[3], d[2], 0) + 
      " L " + d[3] + " Z";
  }
  return curve;
};
