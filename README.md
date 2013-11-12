## svg-connect-area

A library for generating connecting areas between svg elements.


### Usage

```
// Draw a line from start to finish.
var myConnectionFn = svgConnector()
  .type(function(d) { return "M " + d[0] + " L " + d[1]; });
```

The default does a horizontal/vertical step that tries to keep out of your way.

[An example, drag the handles.](http://trinary.github.io/svg-connect-area)

