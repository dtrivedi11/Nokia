'use strict';

exports.__esModule = true;
exports.default = exports.LabeledDataPair = undefined;

var _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var LabeledDataPair = exports.LabeledDataPair = function LabeledDataPair(label, value) {
  _classCallCheck(this, LabeledDataPair);

  this.label = label;
  this.value = value;
};

/**
 * Present a collection of name/value pairs. The values can
 * be either simple strings or entire React elements. If the
 * value is a string and appears to be a URL, it will be rendered
 * as a link that will navigate to that URL.
 */
var LabeledData = (_temp = _class2 = function (_React$Component) {
  _inherits(LabeledData, _React$Component);

  function LabeledData() {
    _classCallCheck(this, LabeledData);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  LabeledData.prototype.render = function render() {
    var className = this.props.stacked ? 'attivio-labeldata-stacked' : 'attivio-labeldata-2col';
    var rows = [];
    this.props.data.forEach(function (item) {
      rows.push(_react2.default.createElement(
        'dt',
        { key: item.label + '-label' },
        item.label
      ));
      if (typeof item.value === 'string' && _validator2.default.isURL(item.value)) {
        rows.push(_react2.default.createElement(
          'dd',
          { className: 'attivio-labeldata-url', key: item.label + '-value' },
          _react2.default.createElement(
            'a',
            { href: item.value, target: '_blank' },
            item.value
          )
        ));
      } else {
        rows.push(_react2.default.createElement(
          'dd',
          { key: item.label + '-value' },
          item.value
        ));
      }
    });

    return _react2.default.createElement(
      'dl',
      { className: className },
      rows
    );
  };

  return LabeledData;
}(_react2.default.Component), _class2.defaultProps = {
  data: [],
  stacked: false
}, _temp);
exports.default = LabeledData;


LabeledData.LabeledDataPair = LabeledDataPair;