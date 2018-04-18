var _class3, _temp;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';
import vis from 'vis';

export var Node = function Node(id, label) {
  var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var group = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  _classCallCheck(this, Node);

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

export var Edge = function Edge(from, to) {
  _classCallCheck(this, Edge);

  this.from = from;
  this.to = to;
};

/**
 * The information passed when a an graphical event occurs.
 */


/**
 * Component to display an arbitrary network diagram of nodes and edges.
 */
var NetworkDiagram = (_temp = _class3 = function (_React$Component) {
  _inherits(NetworkDiagram, _React$Component);

  function NetworkDiagram() {
    _classCallCheck(this, NetworkDiagram);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  NetworkDiagram.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var data = {
      nodes: this.props.nodes,
      edges: this.props.edges
    };

    this.network = new vis.Network(this.networkDiagram, data, this.props.options);
    this.network.on('doubleClick', function (event) {
      _this2.props.onDoubleClick(event);
    });
    this.network.on('stabilizationIterationsDone', function () {
      _this2.network.stopSimulation();
    });
  };

  /** The props have changed and we need to update our diagram. */


  NetworkDiagram.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var update = false;
    if (this.props.nodes.length !== nextProps.nodes.length) {
      update = true;
    } else if (this.props.edges.length !== nextProps.edges.length) {
      update = true;
    } else if (JSON.stringify(this.props.nodes) !== JSON.stringify(nextProps.nodes)) {
      update = true;
    } else if (JSON.stringify(this.props.edges) !== JSON.stringify(nextProps.edges)) {
      update = true;
    }
    if (update) {
      var data = {
        nodes: nextProps.nodes,
        edges: nextProps.edges
      };
      this.network.setData(data);
    }
  };

  NetworkDiagram.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.network) {
      this.network.destroy();
    }
  };

  NetworkDiagram.prototype.render = function render() {
    var _this3 = this;

    return React.createElement('div', { ref: function ref(c) {
        _this3.networkDiagram = c;
      }, style: this.props.style });
  };

  return NetworkDiagram;
}(React.Component), _class3.defaultProps = {
  options: {},
  style: {},
  onDoubleClick: function onDoubleClick() {}
}, _temp);
export { NetworkDiagram as default };


NetworkDiagram.Node = Node;
NetworkDiagram.Edge = Edge;