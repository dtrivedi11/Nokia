'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _SearchButton = require('./SearchButton');

var _SearchButton2 = _interopRequireDefault(_SearchButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component renders an input field for entering a query string
 * for doing a search. It interacts with its parent Searcher component
 * to actually perform the search and the results will be displayed in
 * other children of the Searcher. It is designed to be used outside of
 * the masthead, unlike the <code>SearchBar</code> component.
 */
var SearchInputField = (_temp = _class = function (_React$Component) {
  _inherits(SearchInputField, _React$Component);

  function SearchInputField(props) {
    _classCallCheck(this, SearchInputField);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.updateQuery = _this.updateQuery.bind(_this);
    _this.keyPressed = _this.keyPressed.bind(_this);
    _this.doSearch = _this.doSearch.bind(_this);
    return _this;
  }

  SearchInputField.prototype.updateQuery = function updateQuery(event) {
    if (event.target instanceof HTMLInputElement) {
      var searcher = this.context.searcher;
      searcher.updateQuery(event.target.value);
    }
  };

  SearchInputField.prototype.keyPressed = function keyPressed(event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.key === 'Enter') {
        this.doSearch();
      }
    }
  };

  SearchInputField.prototype.doSearch = function doSearch() {
    var searcher = this.context.searcher;
    searcher.doSearch();
  };

  SearchInputField.prototype.render = function render() {
    var style = {
      height: '2em',
      padding: '1em',
      borderRadius: '5px',
      border: '1px solid #ccc',
      width: '500px'
    };

    var searcher = this.context.searcher;
    var query = '';
    if (searcher) {
      query = searcher.state.query;
    }

    return _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement('input', {
        type: 'text',
        defaultValue: query,
        placeholder: this.props.placeholder,
        onChange: this.updateQuery,
        style: style,
        onKeyPress: this.keyPressed
      }),
      _react2.default.createElement(_SearchButton2.default, { doSearch: this.doSearch })
    );
  };

  return SearchInputField;
}(_react2.default.Component), _class.defaultProps = {
  placeholder: 'Search\u2026'
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SearchInputField;
module.exports = exports['default'];