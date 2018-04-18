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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A container for showing a list of documents from the search results.
 * This comes from the parent Searcher component.
 */
var SearchResults = (_temp = _class = function (_React$Component) {
  _inherits(SearchResults, _React$Component);

  function SearchResults() {
    _classCallCheck(this, SearchResults);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SearchResults.prototype.renderResults = function renderResults() {
    var _this2 = this;

    var searcher = this.context.searcher;
    var response = searcher.state.response;
    var offset = searcher.state.resultsOffset;
    if (response && response.documents && response.documents.length > 0) {
      var documents = response.documents;
      var results = [];
      documents.forEach(function (document, index) {
        var key = document.getFirstValue(_FieldNames2.default.ID);
        var position = offset + index + 1;
        results.push(_react2.default.createElement(_SearchResult2.default, {
          document: document,
          format: _this2.props.format,
          position: position,
          key: key,
          showScores: _this2.props.showScores,
          entityFields: _this2.props.entityFields,
          baseUri: _this2.props.baseUri,
          showRatings: _this2.props.showRatings,
          showTags: _this2.props.showTags
        }));
      });
      return results;
    }
    return null;
  };

  SearchResults.prototype.render = function render() {
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

  return SearchResults;
}(_react2.default.Component), _class.defaultProps = {
  baseUri: '',
  format: 'list',
  showScores: false,
  entityFields: new Map([['people', 'People'], ['locations', 'Locations'], ['companies', 'Companies']]),
  showTags: true,
  showRatings: true
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SearchResults;
module.exports = exports['default'];