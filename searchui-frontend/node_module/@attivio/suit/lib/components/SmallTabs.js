'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A set of buttons for choosing among a series of mutually exclusive options.
 */
var SmallTabs = (_temp = _class = function (_React$Component) {
  _inherits(SmallTabs, _React$Component);

  function SmallTabs(props) {
    _classCallCheck(this, SmallTabs);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  SmallTabs.prototype.onClick = function onClick(event) {
    var tabName = event.target.attributes.getNamedItem('data-tab-name').value;
    this.props.changed(tabName);
    event.target.blur();
  };

  SmallTabs.prototype.render = function render() {
    var _this2 = this;

    var currentTab = this.props.currentTab;
    var items = this.props.tabs.map(function (tab) {
      if (tab === currentTab) {
        return _react2.default.createElement(
          'li',
          { key: tab },
          _react2.default.createElement(
            'a',
            { className: 'attivio-smalltabs-selected' },
            tab
          )
        );
      }
      return _react2.default.createElement(
        'li',
        { key: tab },
        _react2.default.createElement(
          'a',
          { onClick: _this2.onClick, 'data-tab-name': tab, role: 'button', tabIndex: 0 },
          tab
        )
      );
    });

    return _react2.default.createElement(
      'ol',
      { className: 'attivio-smalltabs list-inline' },
      items
    );
  };

  return SmallTabs;
}(_react2.default.Component), _class.defaultProps = {
  currentTab: ''
}, _temp);
exports.default = SmallTabs;
module.exports = exports['default'];