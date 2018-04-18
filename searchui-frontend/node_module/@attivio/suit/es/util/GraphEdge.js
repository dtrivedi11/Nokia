function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphEdge = function GraphEdge(from, to) {
  _classCallCheck(this, GraphEdge);

  this.from = from;
  this.to = to;
};

export { GraphEdge as default };