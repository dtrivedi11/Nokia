'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The count of search results or an indication
 * that a search hasn't yet happened.
 */
var SearchResultsCount = (_temp = _class = function (_React$Component) {
  _inherits(SearchResultsCount, _React$Component);

  function SearchResultsCount() {
    _classCallCheck(this, SearchResultsCount);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SearchResultsCount.prototype.render = function render() {
    var searcher = this.context.searcher;
    var message = void 0;
    var countMessage = void 0;
    if (searcher) {
      var response = searcher.state.response;
      if (response) {
        var count = response.totalHits;
        if (count === 0) {
          countMessage = 'No results found';
        } else if (count === 1) {
          countMessage = '1 result found';
        } else {
          var countStr = Number(count).toLocaleString();
          countMessage = countStr + ' results found';
        }
        message = _react2.default.createElement(
          'span',
          null,
          countMessage,
          _react2.default.createElement(
            'span',
            { style: { fontWeight: 'normal' } },
            ' ',
            '(in ',
            response.totalTime,
            'ms)'
          )
        );
      } else if (searcher.state.error) {
        // got an error...
        message = 'Error: ' + searcher.state.error;
      } else {
        message = ''; // Not yet searched...
      }
    } else {
      message = 'No searcher is configured.';
    }

    return _react2.default.createElement(
      'div',
      { className: 'attivio-globalmastnavbar-results' },
      message
    );
  };

  return SearchResultsCount;
}(_react2.default.Component), _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SearchResultsCount;
module.exports = exports['default'];