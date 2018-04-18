'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Menu = require('./Menu');

var _Menu2 = _interopRequireDefault(_Menu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A pop-up for choosing how many search results should be
 * on each page. It works with the parent Searcher component to
 * update its property and to show the current value.
 */
var SearchResultsPerPage = (_temp = _class = function (_React$Component) {
  _inherits(SearchResultsPerPage, _React$Component);

  // eslint-disable-line max-len
  function SearchResultsPerPage(props) {
    _classCallCheck(this, SearchResultsPerPage);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }

  SearchResultsPerPage.prototype.onSelect = function onSelect(item) {
    var newValue = parseInt(item.value, 10);
    var searcher = this.context.searcher;
    if (searcher) {
      searcher.updateResultsPerPage(newValue);
    }
  };

  SearchResultsPerPage.prototype.render = function render() {
    var searcher = this.context.searcher;
    var value = 25;
    if (searcher) {
      value = searcher.state.resultsPerPage;
    }

    var items = this.props.options.map(function (count) {
      var stringCount = count.toString();
      return new _Menu.MenuItemDef(stringCount, stringCount);
    });

    return _react2.default.createElement(_Menu2.default, {
      label: 'Page Size:',
      items: items,
      selection: value.toString(),
      onSelect: this.onSelect
    });
  };

  return SearchResultsPerPage;
}(_react2.default.Component), _class.defaultProps = {
  options: [10, 25, 50, 100]
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SearchResultsPerPage;
module.exports = exports['default'];