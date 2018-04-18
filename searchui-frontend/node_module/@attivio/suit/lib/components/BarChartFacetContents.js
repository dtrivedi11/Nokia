'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHighcharts = require('react-highcharts');

var _reactHighcharts2 = _interopRequireDefault(_reactHighcharts);

var _SearchFacetBucket = require('../api/SearchFacetBucket');

var _SearchFacetBucket2 = _interopRequireDefault(_SearchFacetBucket);

var _ObjectUtils = require('../util/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

var _StringUtils = require('../util/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component to display the buckets of a facet using a Bar chart.
 */
var BarChartFacetContents = (_temp = _class = function (_React$Component) {
  _inherits(BarChartFacetContents, _React$Component);

  function BarChartFacetContents() {
    _classCallCheck(this, BarChartFacetContents);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  BarChartFacetContents.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !_ObjectUtils2.default.deepEquals(this.props.buckets, nextProps.buckets);
  }; // eslint-disable-line max-len


  BarChartFacetContents.prototype.render = function render() {
    var _this2 = this;

    var chartType = this.props.columns ? 'column' : 'bar';
    var dataSet = this.props.buckets.map(function (bucket) {
      return {
        name: bucket.displayLabel(),
        y: bucket.count,
        events: {
          click: function click() {
            _this2.props.addFacetFilter(bucket);
          }
        },
        description: _StringUtils2.default.fmt('occurrence|occurrences', bucket.count)
      };
    });
    var config = {
      chart: {
        type: chartType,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      events: {
        selection: this.props.addFacetFilter
      },
      tooltip: {
        headerFormat: '<span style="font-weight: 900">{point.key}</span><br/>',
        pointFormat: '{point.y} {point.description}'
      },
      plotOptions: {
        bar: {
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          color: this.props.color
        },
        column: {
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          color: this.props.color
        }
      },
      xAxis: {
        title: { text: '' },
        categories: this.props.buckets.map(function (bucket) {
          return bucket.displayLabel();
        })
      },
      yAxis: { title: { text: '' } },
      legend: {
        enabled: false
      },
      title: {
        text: null
      },
      series: [{
        name: 'data',
        data: dataSet
      }],
      credits: {
        enabled: false
      }
    };

    return _react2.default.createElement(_reactHighcharts2.default, { config: config });
  };

  return BarChartFacetContents;
}(_react2.default.Component), _class.defaultProps = {
  columns: false,
  color: '#55B3E3'
}, _temp);
exports.default = BarChartFacetContents;
module.exports = exports['default'];