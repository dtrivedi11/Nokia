'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchFacetBucket = require('../api/SearchFacetBucket');

var _SearchFacetBucket2 = _interopRequireDefault(_SearchFacetBucket);

var _TimeSeries = require('./TimeSeries');

var _TimeSeries2 = _interopRequireDefault(_TimeSeries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component to display the buckets of a facet using a
 * time-series-based area graph. The buckets should all
 * contain min and max values which are timestamps for
 * the ranges they represent.
 */
var TimeSeriesFacetContents = function (_React$Component) {
  _inherits(TimeSeriesFacetContents, _React$Component);

  function TimeSeriesFacetContents(props) {
    _classCallCheck(this, TimeSeriesFacetContents);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  TimeSeriesFacetContents.prototype.handleClick = function handleClick(start, end) {
    this.props.addFacetFilter(start, end);
  };

  TimeSeriesFacetContents.prototype.render = function render() {
    var timeSeriesData = this.props.buckets.map(function (bucket) {
      if (bucket.min && bucket.max) {
        return new _TimeSeries.TimeSeriesPoint(bucket.min, bucket.count, bucket.max);
      }
      return new _TimeSeries.TimeSeriesPoint('', 0);
    });

    return _react2.default.createElement(_TimeSeries2.default, {
      data: timeSeriesData,
      area: true,
      valueName: 'documents',
      onSelect: this.handleClick
    });
  };

  return TimeSeriesFacetContents;
}(_react2.default.Component);

exports.default = TimeSeriesFacetContents;
module.exports = exports['default'];