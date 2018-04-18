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
 * A pop-up for choosing between the simple and advanced query language.
 */
var SearchLanguagePicker = (_temp = _class = function (_React$Component) {
  _inherits(SearchLanguagePicker, _React$Component);

  // eslint-disable-line max-len
  function SearchLanguagePicker(props) {
    _classCallCheck(this, SearchLanguagePicker);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    return _this;
  }

  SearchLanguagePicker.prototype.onSelect = function onSelect(item) {
    var searcher = this.context.searcher;
    if (searcher) {
      searcher.updateQueryLanguage(item.value);
    }
  };

  SearchLanguagePicker.prototype.render = function render() {
    var searcher = this.context.searcher;
    var value = 'simple';
    if (searcher) {
      value = searcher.state.queryLanguage;
    }

    var items = [new _Menu.MenuItemDef(this.props.simpleLabel, 'simple'), new _Menu.MenuItemDef(this.props.advancedLabel, 'advanced')];

    var leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return _react2.default.createElement(
      'div',
      { className: leftRight },
      _react2.default.createElement(_Menu2.default, {
        label: this.props.label,
        items: items,
        selection: value,
        onSelect: this.onSelect
      })
    );
  };

  return SearchLanguagePicker;
}(_react2.default.Component), _class.defaultProps = {
  initialValue: 'simple',
  label: 'Query Language:',
  simpleLabel: 'Simple',
  advancedLabel: 'Advanced',
  right: false
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SearchLanguagePicker;
module.exports = exports['default'];