'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A summary of the currently displayed search results.
 */
var SearchResultsSummary = function (_React$Component) {
  _inherits(SearchResultsSummary, _React$Component);

  function SearchResultsSummary() {
    _classCallCheck(this, SearchResultsSummary);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SearchResultsSummary.prototype.render = function render() {
    if (this.props.haveSearched) {
      var _pageNumber = this.props.pageNumber;
      var _totalResults = this.props.totalResults;
      var _resultsPerPage = this.props.resultsPerPage;
      var firstResult = _pageNumber * _resultsPerPage + 1;
      var lastResult = firstResult + _resultsPerPage - 1 > _totalResults ? _totalResults : firstResult + _resultsPerPage - 1;

      var results = _totalResults === 1 ? _react2.default.createElement(
        'span',
        null,
        'Your search returned 1 document.'
      ) : _react2.default.createElement(
        'span',
        null,
        'Your search returned ',
        _totalResults,
        ' documents.'
      );
      var range = void 0;
      if (firstResult !== 1 || lastResult < _totalResults) {
        // Not showing the full range so let the user know
        range = _react2.default.createElement(
          'span',
          null,
          'Currently showing documents ',
          firstResult,
          ' through ',
          lastResult,
          '.'
        );
      } else {
        range = _react2.default.createElement('span', null);
      }

      return _react2.default.createElement(
        'div',
        null,
        results,
        ' ',
        range
      );
    }
    return _react2.default.createElement('div', null);
  };

  return SearchResultsSummary;
}(_react2.default.Component);

exports.default = SearchResultsSummary;
module.exports = exports['default'];