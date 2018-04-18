'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FieldNames = require('../api/FieldNames');

var _FieldNames2 = _interopRequireDefault(_FieldNames);

var _SearchResult = require('./SearchResult');

var _SearchResult2 = _interopRequireDefault(_SearchResult);

var _SearchDocument = require('../api/SearchDocument');

var _SearchDocument2 = _interopRequireDefault(_SearchDocument);

var _SimpleQueryRequest = require('../api/SimpleQueryRequest');

var _SimpleQueryRequest2 = _interopRequireDefault(_SimpleQueryRequest);

var _QueryResponse = require('../api/QueryResponse');

var _QueryResponse2 = _interopRequireDefault(_QueryResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A container for showing a list of documents from the search results.
 * This comes from the parent Searcher component.
 */
var SimilarDocuments = (_temp = _class = function (_React$Component) {
  _inherits(SimilarDocuments, _React$Component);

  // eslint-disable-line max-len
  function SimilarDocuments(props) {
    _classCallCheck(this, SimilarDocuments);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      docs: [],
      error: null
    };
    return _this;
  }

  SimilarDocuments.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    if (this.props.baseDoc) {
      var query = this.props.baseDoc.getFirstValue('morelikethisquery');
      if (query) {
        if (this.context.searcher) {
          var searcher = this.context.searcher;
          var req = new _SimpleQueryRequest2.default(query);
          req.queryLanguage = 'advanced';
          var fields = searcher.getFieldList();
          req.fields = fields;
          req.rows = 6;

          searcher.doCustomSearch(req, function (response, error) {
            if (response && response.documents) {
              var _docs = response.documents.slice();
              if (_this2.props.baseDoc) {
                var baseDocId = _this2.props.baseDoc.getFirstValue(_FieldNames2.default.ID);
                _docs = _docs.filter(function (doc) {
                  return doc.getFirstValue(_FieldNames2.default.ID) !== baseDocId;
                });
              }
              if (_docs.length > 5) {
                _docs = _docs.slice(0, 5);
              }
              _this2.setState({ docs: _docs });
            } else if (error) {
              _this2.setState({ error: error });
            }
          });
        }
      }
    }
  };

  SimilarDocuments.prototype.renderResults = function renderResults() {
    var _this3 = this;

    if (this.state.docs.length > 0) {
      var results = [];
      this.state.docs.forEach(function (document, index) {
        var key = document.getFirstValue(_FieldNames2.default.ID);
        var position = index + 1;
        results.push(_react2.default.createElement(_SearchResult2.default, {
          document: document,
          format: 'simple',
          position: position,
          key: key,
          baseUri: _this3.props.baseUri
        }));
      });
      return results;
    }
    if (this.state.error) {
      return this.state.error;
    }
    return _react2.default.createElement(
      'li',
      { className: 'none' },
      'No similar documents exist'
    );
  };

  SimilarDocuments.prototype.render = function render() {
    var style = {
      listStyle: 'none',
      paddingLeft: 0
    };

    return _react2.default.createElement(
      'ul',
      { style: style },
      this.renderResults()
    );
  };

  return SimilarDocuments;
}(_react2.default.Component), _class.defaultProps = {
  baseUri: ''
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SimilarDocuments;
module.exports = exports['default'];