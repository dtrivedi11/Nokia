'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SearchDocument = require('../api/SearchDocument');

var _SearchDocument2 = _interopRequireDefault(_SearchDocument);

var _SimpleQueryRequest = require('../api/SimpleQueryRequest');

var _SimpleQueryRequest2 = _interopRequireDefault(_SimpleQueryRequest);

var _QueryResponse = require('../api/QueryResponse');

var _QueryResponse2 = _interopRequireDefault(_QueryResponse);

var _FieldNames = require('../api/FieldNames');

var _FieldNames2 = _interopRequireDefault(_FieldNames);

var _KnowledgeGraphUtils = require('../util/KnowledgeGraphUtils');

var _KnowledgeGraphUtils2 = _interopRequireDefault(_KnowledgeGraphUtils);

var _NetworkDiagram = require('./NetworkDiagram');

var _NetworkDiagram2 = _interopRequireDefault(_NetworkDiagram);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KnowledgeGraphPanel = (_temp = _class = function (_React$Component) {
  _inherits(KnowledgeGraphPanel, _React$Component);

  // eslint-disable-line max-len
  KnowledgeGraphPanel.updatePrimaryDoc = function updatePrimaryDoc(primaryDoc, results) {
    var newPrimaryDoc = primaryDoc;
    if (results.length > 0) {
      // If the primary doc is already in the results, remove it and add the remiaing ones as children
      var primaryDocId = primaryDoc.getFirstValue(_FieldNames2.default.ID);
      var docIds = results.map(function (value) {
        return value.getFirstValue(_FieldNames2.default.ID);
      });
      if (docIds.includes(primaryDocId)) {
        // Filter out the primary
        newPrimaryDoc.children = results.filter(function (value) {
          return value.getFirstValue(_FieldNames2.default.ID) !== primaryDocId;
        });
      }
      // If not, use the first doc as the primary one and add the remainig ones as its children
      newPrimaryDoc = results[0];
      newPrimaryDoc.children = results.slice(1);
    }
    return newPrimaryDoc;
  };

  function KnowledgeGraphPanel(props) {
    _classCallCheck(this, KnowledgeGraphPanel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      nodes: [],
      edges: [],
      error: null
    };
    _this.onDoubleClick = _this.onDoubleClick.bind(_this);
    return _this;
  }

  KnowledgeGraphPanel.prototype.componentDidMount = function componentDidMount() {
    this.loadGraphForDocument(this.props.doc, this.props.entityName, this.props.entityValue);
  };

  KnowledgeGraphPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.doc !== nextProps.doc || this.props.entityName !== nextProps.entityName || this.props.entityValue !== nextProps.entityValue) {
      this.loadGraphForDocument(nextProps.doc, nextProps.entityName, nextProps.entityValue);
    }
  };

  KnowledgeGraphPanel.prototype.onDoubleClick = function onDoubleClick(event) {
    if (this.props.navigateToDoc) {
      if (event && event.nodes) {
        var _nodes = event.nodes;
        if (_nodes.length > 0) {
          var nodeId = _nodes[0];
          var node = this.state.nodes.find(function (n) {
            return n.id === nodeId;
          });
          if (node && node.docId) {
            this.props.navigateToDoc(node.docId);
          } else if (node) {
            this.props.navigateToEntity(node.group, node.label);
          }
        }
      }
    }
  };

  KnowledgeGraphPanel.prototype.loadGraphForDocument = function loadGraphForDocument(doc, entityName, entityValue) {
    var _this2 = this;

    if (this.context.searcher) {
      var _docId = doc.getFirstValue(_FieldNames2.default.ID);
      var table = this.props.includeAllTables ? null : doc.getFirstValue(this.props.tableField);

      var query = _KnowledgeGraphUtils2.default.buildQuery(_docId, table, this.props.tableField, this.props.linkingFields, this.props.maxLinkedDocs, entityName, entityValue);
      var req = new _SimpleQueryRequest2.default(query);
      req.queryLanguage = 'advanced';
      this.context.searcher.doCustomSearch(req, function (response, error) {
        if (response && response.documents && response.documents.length >= 1) {
          // Add the nodes and edges to our state so we can display them
          var primaryDoc = response.documents[0];
          if (entityName && entityValue) {
            // Massage the primary doc to have children...
            primaryDoc = KnowledgeGraphPanel.updatePrimaryDoc(primaryDoc, response.documents);
          }
          var result = _KnowledgeGraphUtils2.default.searchResultsToGraph(primaryDoc, _this2.props.linkingFields, primaryDoc.getFirstValue(_FieldNames2.default.ID) === _docId, !_this2.props.showEdges);
          _this2.setState({
            nodes: result.nodes,
            edges: result.edges
          });
        } else if (response) {
          // Got a response but no documents? Bad ID?
          _this2.setState({ error: 'The query produced no results.' });
        } else if (error) {
          _this2.setState({ error: error });
        }
      });
    }
  };

  KnowledgeGraphPanel.prototype.render = function render() {
    var style = {
      backgroundColor: '#f5f5f5',
      height: '1200px'
    };

    if (this.state.error) {
      return _react2.default.createElement(
        'div',
        null,
        this.state.error
      );
    }
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(_NetworkDiagram2.default, {
        nodes: this.state.nodes,
        edges: this.state.edges,
        options: _KnowledgeGraphUtils2.default.calculateGraphOptions(this.props.linkingFields),
        style: style,
        onDoubleClick: this.onDoubleClick
      })
    );
  };

  return KnowledgeGraphPanel;
}(_react2.default.Component), _class.defaultProps = {
  maxLinkedDocs: 3,
  tableField: _FieldNames2.default.TABLE,
  navigateToDoc: function navigateToDoc() {},
  navigateToEntity: function navigateToEntity() {},
  entityName: null,
  entityValue: null,
  showEdges: false,
  includeAllTables: false
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = KnowledgeGraphPanel;
module.exports = exports['default'];