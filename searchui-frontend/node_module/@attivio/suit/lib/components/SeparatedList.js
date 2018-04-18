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
 * Render a list of items with a separater bar in between them.
 */
var SeparatedList = function (_React$Component) {
  _inherits(SeparatedList, _React$Component);

  function SeparatedList() {
    _classCallCheck(this, SeparatedList);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SeparatedList.prototype.render = function render() {
    return _react2.default.createElement(
      'ul',
      { className: 'attivio-list-inline list-inline' },
      this.props.children
    );
  };

  return SeparatedList;
}(_react2.default.Component);

exports.default = SeparatedList;
module.exports = exports['default'];