var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import ReactHighcharts from 'react-highcharts';

import SearchFacetBucket from '../api/SearchFacetBucket';
import ObjectUtils from '../util/ObjectUtils';
import StringUtils from '../util/StringUtils';

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
    return !ObjectUtils.deepEquals(this.props.buckets, nextProps.buckets);
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
        description: StringUtils.fmt('occurrence|occurrences', bucket.count)
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

    return React.createElement(ReactHighcharts, { config: config });
  };

  return BarChartFacetContents;
}(React.Component), _class.defaultProps = {
  columns: false,
  color: '#55B3E3'
}, _temp);
export { BarChartFacetContents as default };