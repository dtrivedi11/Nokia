var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/**
 * Show a change in a value. If the neither the up or down
 * properties are set, then it is displayed as an average
 * value, with no up/down arrows.
 */
var ChartTrends = (_temp = _class = function (_React$Component) {
  _inherits(ChartTrends, _React$Component);

  function ChartTrends() {
    _classCallCheck(this, ChartTrends);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ChartTrends.prototype.render = function render() {
    var classNames = 'attivio-trend';
    var label = this.props.unchangedLabel;
    var icon = '';

    if (this.props.up) {
      classNames = 'attivio-trend attivio-trend-up';
      icon = React.createElement('span', { className: 'attivio-icon-trend-up' });
      label = this.props.changedLabel;
    } else if (this.props.down) {
      classNames = 'attivio-trend attivio-trend-down';
      icon = React.createElement('span', { className: 'attivio-icon-trend-down' });
      label = this.props.changedLabel;
    }

    return React.createElement(
      'h3',
      { className: classNames },
      icon,
      this.props.change,
      ' ',
      React.createElement(
        'span',
        { className: 'attivio-trend-label' },
        label
      )
    );
  };

  return ChartTrends;
}(React.Component), _class.defaultProps = {
  up: false,
  down: false,
  changedLabel: 'Change',
  unchangedLabel: 'Average'
}, _temp);
export { ChartTrends as default };