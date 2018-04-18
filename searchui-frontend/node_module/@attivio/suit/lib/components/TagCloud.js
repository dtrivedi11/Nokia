"use strict";

exports.__esModule = true;
exports.default = exports.TagCloudValue = undefined;

var _class2, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TagCloudValue =
/** The string to display in the list. */
exports.TagCloudValue = function TagCloudValue(label, value) {
  _classCallCheck(this, TagCloudValue);

  this.label = label;
  this.value = value;
}
/** The value for this item. */
;

/**
 * Display a linear tag "cloud" where the items are proportionally sized
 * based on an associated value.
 */
var TagCloud = (_temp = _class2 = function (_React$Component) {
  _inherits(TagCloud, _React$Component);

  function TagCloud() {
    _classCallCheck(this, TagCloud);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  TagCloud.getAdjustedValue = function getAdjustedValue(value, max) {
    var ratio = value / max;
    var timesSeven = ratio * 7;
    var oneThroughEight = Math.round(timesSeven) + 1;
    return oneThroughEight;
  };

  TagCloud.prototype.render = function render() {
    var _this2 = this;

    var maxValue = this.props.tags.reduce(function (max, tcv) {
      return Math.max(tcv.value, max);
    }, 0);

    var tagCloudValues = this.props.tags;
    if (tagCloudValues.length > this.props.maxValues) {
      // Sort numerically by value
      tagCloudValues.sort(function (tcv1, tcv2) {
        if (tcv1.value === tcv2.value) {
          return 0;
        }
        if (tcv1.value < tcv2.value) {
          return 1;
        }
        return -1;
      });
      // Remove the items with the lowest values
      tagCloudValues = tagCloudValues.slice(0, this.props.maxValues);
    }

    // Sort alphabetically by label
    tagCloudValues.sort(function (tcv1, tcv2) {
      return tcv1.label.localeCompare(tcv2.label);
    });

    var cloudItems = tagCloudValues.map(function (tcv) {
      var size = TagCloud.getAdjustedValue(tcv.value, maxValue);
      var callback = function callback(event) {
        _this2.props.callback(tcv);
        event.target.blur();
      };
      return _react2.default.createElement(
        "li",
        { key: tcv.label },
        _react2.default.createElement(
          "a",
          { className: "attivio-cloud-level-" + size, onClick: callback, role: "button", tabIndex: 0 },
          tcv.label
        )
      );
    });

    return _react2.default.createElement(
      "ul",
      { className: "attivio-cloud list-inline" },
      cloudItems
    );
  };

  return TagCloud;
}(_react2.default.Component), _class2.defaultProps = {
  maxValues: 15
}, _temp);
exports.default = TagCloud;


TagCloud.TagCloudValue = TagCloudValue;