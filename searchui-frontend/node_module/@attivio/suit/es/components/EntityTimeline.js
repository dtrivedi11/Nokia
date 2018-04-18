function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';
import ReactHighcharts from 'react-highcharts';

import ObjectUtils from '../util/ObjectUtils';

export var EntityTimelineInstace = function EntityTimelineInstace(time, count) {
  _classCallCheck(this, EntityTimelineInstace);

  this.time = time;
  this.count = count;
};

var EntityTimeline = function (_React$Component) {
  _inherits(EntityTimeline, _React$Component);

  function EntityTimeline() {
    _classCallCheck(this, EntityTimeline);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  EntityTimeline.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
    return !ObjectUtils.deepEquals(this.props.instances, nextProps.instances);
  };

  EntityTimeline.prototype.render = function render() {
    var dataSet = this.props.instances.map(function (instance) {
      return {
        date: instance.time,
        y: instance.count
      };
    });
    var config = {
      chart: {
        type: 'TimeSeries',
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false
      },
      tooltip: {
        pointFormat: '{point.y}'
      },
      plotOptions: {
        Bar: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: false
          }
        }
      },
      title: {
        text: null
      },
      series: [{
        name: 'data',
        data: []
      }]
    };
    config.series[0].data = dataSet;

    return React.createElement(ReactHighcharts, { config: config });
  };

  return EntityTimeline;
}(React.Component);

export { EntityTimeline as default };


EntityTimeline.EntityTimelineInstace = EntityTimelineInstace;