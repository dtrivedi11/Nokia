var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/**
 * Displays an indication of the overall sentiment for a particular document/object.
 * This includes a bar that can be part red and green for mixed sentiment, all red
 * for entirely negative sentiment, all green for entirely positive sentiment, or
 * and empty bar if there is no sentiment information to display.
 */
var SentimentBar = (_temp = _class = function (_React$Component) {
  _inherits(SentimentBar, _React$Component);

  function SentimentBar() {
    _classCallCheck(this, SentimentBar);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SentimentBar.prototype.render = function render() {
    var _this2 = this;

    var posWidthPct = 0;
    var negWidthPct = 0;
    var showPos = true;
    var showNeg = true;
    var showNeither = false;

    var clickPositive = function clickPositive(event) {
      _this2.props.onClick(true);
      event.target.blur();
      event.target.parentElement.blur();
    };

    var clickNegative = function clickNegative(event) {
      _this2.props.onClick(false);
      event.target.blur();
      event.target.parentElement.blur();
    };

    if (this.posCount === 0 && this.negCount === 0) {
      // Special case: don't show anything...
      showPos = false;
      showNeg = false;
      showNeither = true;
    } else if (this.posCount === 0) {
      // Special case: 100% positive
      showPos = false;
      negWidthPct = 100;
    } else if (this.negCount === 0) {
      // Special case: 100% negative
      showNeg = false;
      posWidthPct = 100;
    } else {
      // Figure out the percentages of the positive and negative bars
      var totalWidth = this.props.posCount + this.props.negCount;
      posWidthPct = Math.trunc(this.props.posCount / totalWidth * 100 + 0.5);
      negWidthPct = 100 - posWidthPct; // Do this so, in case of rounding issues, we'll always have 100% total
    }
    var posWidth = posWidthPct + "%";
    var negWidth = negWidthPct + "%";

    var posBar = showPos ? React.createElement("div", {
      className: "attivio-sentiment-chart-bar-positive",
      "aria-hidden": "true",
      onClick: clickPositive,
      style: {
        width: posWidth
      }
    }) : '';
    var negBar = showNeg ? React.createElement("div", {
      className: "attivio-sentiment-chart-bar-negative",
      "aria-hidden": "true",
      onClick: clickNegative,
      style: {
        width: negWidth
      }
    }) : '';

    return React.createElement(
      "div",
      { className: "attivio-sentiment-chart" },
      React.createElement(
        "a",
        {
          className: "attivio-sentiment-chart-positive",
          onClick: clickPositive,
          role: "button",
          tabIndex: 0
        },
        "Positive",
        React.createElement(
          "span",
          { className: "attivio-sentiment-chart-count" },
          "(",
          this.props.posCount,
          ")"
        )
      ),
      React.createElement(
        "a",
        {
          className: "attivio-sentiment-chart-negative",
          onClick: clickNegative,
          role: "button",
          tabIndex: 0
        },
        "Negative",
        React.createElement(
          "span",
          { className: "attivio-sentiment-chart-count" },
          "(",
          this.props.negCount,
          ")"
        )
      ),
      React.createElement(
        "div",
        { className: "attivio-sentiment-chart-bar" },
        posBar,
        negBar,
        showNeither ? React.createElement("div", { className: "attivio-sentiment-chart-bar-empty", "aria-hidden": "true", style: { width: '100%' } }) : ''
      )
    );
  };

  return SentimentBar;
}(React.Component), _class.defaultProps = {
  posCount: 0,
  negCount: 0,
  onClick: function onClick() {}
}, _temp);
export { SentimentBar as default };