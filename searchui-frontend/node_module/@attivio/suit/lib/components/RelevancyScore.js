'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Popover = require('react-bootstrap/lib/Popover');

var _Popover2 = _interopRequireDefault(_Popover);

var _OverlayTrigger = require('react-bootstrap/lib/OverlayTrigger');

var _OverlayTrigger2 = _interopRequireDefault(_OverlayTrigger);

var _Code = require('./Code');

var _Code2 = _interopRequireDefault(_Code);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Display the relevancy score for a document, including providing
 * a popover with the explanation of the score.
 */
var RelevancyScore = (_temp = _class = function (_React$Component) {
  _inherits(RelevancyScore, _React$Component);

  function RelevancyScore() {
    _classCallCheck(this, RelevancyScore);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  RelevancyScore.prototype.render = function render() {
    var result = void 0;
    if (this.props.explanation) {
      var popover = _react2.default.createElement(
        _Popover2.default,
        {
          id: 'relevancyScore-' + this.props.id,
          title: 'Relevancy Score Explanation'
        },
        _react2.default.createElement(
          _Code2.default,
          null,
          this.props.explanation
        )
      );
      result = _react2.default.createElement(
        _OverlayTrigger2.default,
        { trigger: 'click', placement: 'right', overlay: popover, rootClose: true },
        _react2.default.createElement(
          'a',
          { className: 'attivio-search-result-score' },
          this.props.score,
          ' ',
          _react2.default.createElement('span', { className: 'attivio-icon-help' })
        )
      );
    } else {
      result = _react2.default.createElement(
        'span',
        { className: 'attivio-search-result-score' },
        this.props.score
      );
    }
    return result;
  };

  return RelevancyScore;
}(_react2.default.Component), _class.defaultProps = {
  explanation: null
}, _temp);
exports.default = RelevancyScore;
module.exports = exports['default'];