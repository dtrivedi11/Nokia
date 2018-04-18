'use strict';

exports.__esModule = true;
exports.default = exports.TimeSeriesPoint = undefined;

var _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactHighcharts = require('react-highcharts');

var _reactHighcharts2 = _interopRequireDefault(_reactHighcharts);

var _DateUtils = require('../util/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _DateFormat = require('../util/DateFormat');

var _DateFormat2 = _interopRequireDefault(_DateFormat);

var _ObjectUtils = require('../util/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for defining plot points for the TimeSeries chart.
 */
var TimeSeriesPoint =
/** The numerical value of the plot point for the y-axis */
exports.TimeSeriesPoint = function TimeSeriesPoint(date, value) {
  var endDate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  _classCallCheck(this, TimeSeriesPoint);

  this.date = date ? _DateUtils2.default.stringToDate(date) : new Date();
  this.value = value;
  this.endDate = endDate ? _DateUtils2.default.stringToDate(endDate) : new Date();
}
/** The end of the date range (optional) */

/** The date/time of the plot point for the x-axis */
;

/**
 * Component to display a chart of values over time
 */
var TimeSeries = (_temp = _class2 = function (_React$Component) {
  _inherits(TimeSeries, _React$Component);

  TimeSeries.formatTooltip = function formatTooltip() {
    var self = this;
    var yDisplay = '<br><b>' + self.y + ' ' + self.point.valueName + '</b>';
    var resolution = self.series.closestPointRange;
    // year
    if (resolution >= 365 * 24 * 60 * 60 * 1000) {
      return '' + _DateUtils2.default.formatDate(self.point.x, _DateFormat2.default.LONG_YEAR) + yDisplay;
      // month
    } else if (resolution >= 28 * 24 * 60 * 60 * 1000) {
      return '' + _DateUtils2.default.formatDate(self.point.x, _DateFormat2.default.LONG_MONTH) + yDisplay;
      // week
    } else if (resolution >= 7 * 24 * 60 * 60 * 1000) {
      return _DateUtils2.default.formatDate(self.x, _DateFormat2.default.MEDIUM_DATE) + ' - ' + _DateUtils2.default.formatDate(self.point.endDate, _DateFormat2.default.MEDIUM_DATE) + yDisplay; // eslint-disable-line max-len
      // day
    } else if (resolution >= 24 * 60 * 60 * 1000) {
      return '' + _DateUtils2.default.formatDate(self.point.x, _DateFormat2.default.MEDIUM_DATE) + yDisplay;
    }
    // default (time)
    return _DateUtils2.default.formatDate(self.x, _DateFormat2.default.MEDIUM) + ' - ' + _DateUtils2.default.formatDate(self.point.endDate, _DateFormat2.default.MEDIUM) + yDisplay; // eslint-disable-line max-len
  };

  function TimeSeries(props) {
    _classCallCheck(this, TimeSeries);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onSelectRange = _this.onSelectRange.bind(_this);
    return _this;
  }

  TimeSeries.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !_ObjectUtils2.default.deepEquals(this.props.data, nextProps.data);
  };

  TimeSeries.prototype.onSelectRange = function onSelectRange(event) {
    var start = typeof event.xAxis[0].min === 'undefined' ? null : new Date(event.xAxis[0].min);
    var end = typeof event.xAxis[0].max === 'undefined' ? null : new Date(event.xAxis[0].max);
    this.props.onSelect(start, end);
  };

  TimeSeries.prototype.render = function render() {
    var _this2 = this;

    _reactHighcharts2.default.Highcharts.setOptions({
      global: {
        useUTC: false
      }
    });

    var data = this.props.data.map(function (point) {
      return {
        x: point.date.getTime(),
        y: point.value,
        endDate: point.endDate ? point.endDate.getTime() : point.date.getTime(),
        valueName: _this2.props.valueName
      };
    });

    var plotOptions = void 0;
    var chartType = void 0;
    if (this.props.area) {
      chartType = 'area';
      plotOptions = {
        series: {},
        area: {
          color: '#6db1de',
          fillColor: '#e2f0f8',
          lineWidth: 2,
          marker: {
            radius: 2
          }
        }
      };
    } else {
      chartType = 'column';
      plotOptions = {
        series: {},
        column: {
          cursor: 'pointer',
          color: '#55b3e3',
          pointPlacement: 'between',
          pointPadding: 0,
          groupPadding: 0,
          grouping: false,
          borderWidth: 1,
          borderColor: '#a4d4ec',
          states: {
            hover: {
              color: '#203267',
              borderColor: '#5d6a90'
            }
          }
        }
      };
    }

    var config = {
      chart: {
        type: chartType,
        zoomType: 'x',
        resetZoomButton: {
          theme: {
            style: {
              display: 'none'
            }
          }
        },
        backgroundColor: null,
        borderWidth: null,
        shadow: false,

        height: 185,

        events: {
          selection: this.onSelectRange
        }
      },
      plotOptions: plotOptions,
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          month: '%b',
          year: '%Y'
        },
        title: {
          text: '' + (this.props.xKey ? this.props.xKey : '')
        },
        tickLength: 0,
        minorTickLength: 0
      },
      yAxis: {
        title: {
          text: '' + (this.props.yKey ? this.props.yKey : '')
        },
        min: 0
      },
      tooltip: {
        formatter: TimeSeries.formatTooltip
      },
      legend: {
        enabled: false
      },
      title: {
        text: ''
      },
      series: [{
        data: data,
        turboThreshold: 0,
        valueName: this.props.valueName
      }],
      credits: {
        enabled: false
      }
    };

    return _react2.default.createElement(_reactHighcharts2.default, { config: config });
  };

  return TimeSeries;
}(_react2.default.Component), _class2.defaultProps = {
  area: false,
  xKey: null,
  yKey: null
}, _temp);
exports.default = TimeSeries;