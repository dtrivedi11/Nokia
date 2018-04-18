'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('react-bootstrap/lib/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _Toggle = require('./Toggle');

var _Toggle2 = _interopRequireDefault(_Toggle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A button that displays a menu below it when clicked.
 */
var DropdownButton = function (_React$Component) {
  _inherits(DropdownButton, _React$Component);

  function DropdownButton() {
    _classCallCheck(this, DropdownButton);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DropdownButton.prototype.render = function render() {
    return _react2.default.createElement(
      _Dropdown2.default,
      { id: this.props.id, className: 'attivio-dropdown', style: { verticalAlign: 'unset' } },
      _react2.default.createElement(
        _Toggle2.default,
        { bsRole: 'toggle', onClick: this.props.onOpen },
        this.props.title
      ),
      _react2.default.createElement(
        _Dropdown2.default.Menu,
        { bsRole: 'menu', onSelect: this.props.onSelect },
        this.props.children
      )
    );
  };

  return DropdownButton;
}(_react2.default.Component);

exports.default = DropdownButton;
module.exports = exports['default'];