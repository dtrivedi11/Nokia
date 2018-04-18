'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A button to live in the navbar. Can have either an icon or a text label or both.
 * (It needs to at least have one or the other, though.) Clicking the butotn calls
 * the onClick handler.
 */
var NavbarButton = (_temp = _class = function (_React$Component) {
  _inherits(NavbarButton, _React$Component);

  function NavbarButton(props) {
    _classCallCheck(this, NavbarButton);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onClick = _this.onClick.bind(_this);
    return _this;
  }

  NavbarButton.prototype.onClick = function onClick() {
    this.props.onClick();
  };

  NavbarButton.prototype.render = function render() {
    return _react2.default.createElement(
      _Button2.default,
      null,
      this.props.label,
      ' ',
      this.props.icon
    );
  };

  return NavbarButton;
}(_react2.default.Component), _class.defaultProps = {
  label: '',
  icon: ''
}, _temp);
exports.default = NavbarButton;
module.exports = exports['default'];