'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The display card for a Placement query result.
 */
var PlacementResult = (_temp = _class = function (_React$Component) {
  _inherits(PlacementResult, _React$Component);

  function PlacementResult() {
    _classCallCheck(this, PlacementResult);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PlacementResult.prototype.render = function render() {
    if (this.props.markup) {
      return _react2.default.createElement(
        _Card2.default,
        { style: { marginBottom: '10px' } },
        _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.markup } }) // eslint-disable-line react/no-danger

      );
    }
    var rawText = this.props.linkText || '';
    var text = _react2.default.createElement(
      'h4',
      null,
      rawText
    );
    var contents = this.props.imageUrl ? _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('img', {
        src: this.props.imageUrl,
        title: rawText,
        alt: rawText
      }),
      text
    ) : text;
    return _react2.default.createElement(
      _Card2.default,
      { style: { marginBottom: '10px' } },
      this.props.linkUrl ? _react2.default.createElement(
        'a',
        { href: this.props.linkUrl },
        contents
      ) : contents
    );
  };

  return PlacementResult;
}(_react2.default.Component), _class.defaultProps = {
  linkUrl: null,
  linkText: null,
  imageUrl: null,
  markup: null
}, _temp);
exports.default = PlacementResult;
module.exports = exports['default'];