"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GraphNode = function GraphNode(id, label) {
  var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck(this, GraphNode);

  this.id = id;
  this.label = label;
  if (title) {
    this.title = title;
  }
  if (group) {
    this.group = group;
  }
  this.docId = null;
};

exports.default = GraphNode;
module.exports = exports["default"];