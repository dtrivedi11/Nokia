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
 * A button that can triggering an Attivio search. It must be
 * inside a Searcher component. Note that the SearchBar component,
 * designed to be used in the Masthead component, already has its
 * own search button.
 */
var SearchButton = (_temp = _class = function (_React$Component) {
  _inherits(SearchButton, _React$Component);

  function SearchButton(props) {
    _classCallCheck(this, SearchButton);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.doSearch = _this.doSearch.bind(_this);
    return _this;
  }

  SearchButton.prototype.doSearch = function doSearch() {
    var searcher = this.context.searcher;
    if (searcher) {
      searcher.doSearch();
    }
  };

  SearchButton.prototype.render = function render() {
    var style = {
      height: 'calc(2em - 4px)',
      backgroundColor: '#40ace2',
      border: 'none',
      borderRadius: '2px',
      color: 'white',
      left: '-34px',
      position: 'relative',
      fontWeight: 'bold'
    };

    return _react2.default.createElement(
      'button',
      { type: 'button', onClick: this.doSearch, style: style },
      this.props.label
    );
  };

  return SearchButton;
}(_react2.default.Component), _class.defaultProps = {
  label: 'Go'
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SearchButton;
module.exports = exports['default'];