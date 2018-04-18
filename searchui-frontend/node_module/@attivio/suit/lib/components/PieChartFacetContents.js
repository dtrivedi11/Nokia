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

var _StringUtils = require('../util/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

var _ObjectUtils = require('../util/ObjectUtils');

var _ObjectUtils2 = _interopRequireDefault(_ObjectUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component to display the buckets of a facet using a pie chart.
 */
var PieChartFacetContents = (_temp = _class = function (_React$Component) {
  _inherits(PieChartFacetContents, _React$Component);

  function PieChartFacetContents(props) {
    _classCallCheck(this, PieChartFacetContents);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.clickWedge = _this.clickWedge.bind(_this);
    return _this;
  } // eslint-disable-line max-len


  PieChartFacetContents.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !_ObjectUtils2.default.deepEquals(this.props.buckets, nextProps.buckets);
  };

  PieChartFacetContents.prototype.formatTooltip = function formatTooltip() {
    // Note that Flow gets upset because it thinks this will refer to the PieChartFacetContents object
    // so we cast it to "any" to avoid any brouhaha.
    var percentage = Number(Math.round(Number(this.percentage.toString() + 'e2')) + 'e-2');
    var docCount = _StringUtils2.default.fmt('no documents|one document|{} documents', this.y.toLocaleString());
    var tooltip = '<b>' + this.point.name + '</b><br>' + docCount + ' (' + percentage + '%)';
    return tooltip;
  };

  PieChartFacetContents.prototype.clickWedge = function clickWedge(index) {
    var bucket = this.props.buckets[index];
    this.props.addFacetFilter(bucket);
  };

  PieChartFacetContents.prototype.render = function render() {
    var _this2 = this;

    var dataSet = this.props.buckets.map(function (bucket) {
      return {
        name: bucket.displayLabel(),
        y: bucket.count
      };
    });

    var colors = [];
    this.props.entityColors.forEach(function (value) {
      colors.push(value);
    });

    var config = {
      chart: {
        type: 'pie',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      tooltip: {
        formatter: this.formatTooltip
      },
      legend: {
        symbolRadius: 0
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          },
          events: {
            click: function click(event) {
              if (event.point) {
                _this2.clickWedge(event.point.index);
              }
            }
          },
          point: {
            events: {
              legendItemClick: function legendItemClick(event) {
                event.preventDefault();
              }
            }
          },
          states: {
            hover: {
              halo: false
            }
          },
          showInLegend: true,
          colors: colors
        }
      },
      title: {
        text: null
      },
      series: [{
        name: 'data',
        data: []
      }],
      credits: {
        enabled: false
      }
    };
    config.series[0].data = dataSet;

    return _react2.default.createElement(_reactHighcharts2.default, { config: config });
  };

  return PieChartFacetContents;
}(_react2.default.Component), _class.defaultProps = {
  entityColors: new Map()
}, _temp);
exports.default = PieChartFacetContents;
module.exports = exports['default'];