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
 * A card is just a bordered &lt;div&gt; to wrap a set of
 * related elements.
 */
var Card = (_temp = _class = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Card.prototype.render = function render() {
    var cardClassName = this.props.borderless ? 'attivio-card attivio-card-borderless' : 'attivio-card';
    var className = cardClassName + ' ' + this.props.className;
    var title = this.props.title ? _react2.default.createElement(
      'h2',
      { className: 'attivio-card-title' },
      this.props.title
    ) : '';
    return _react2.default.createElement(
      'div',
      { className: className, style: this.props.style },
      title,
      this.props.children
    );
  };

  return Card;
}(_react2.default.Component), _class.defaultProps = {
  borderless: false,
  title: null,
  style: {},
  className: ''
}, _temp);
exports.default = Card;
module.exports = exports['default'];