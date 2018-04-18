var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import Popover from 'react-bootstrap/lib/Popover';
import OverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';

import Code from './Code';

/**
 * Display the relevancy score for a document, including providing
 * a popover with the explanation of the score.
 */
var RelevancyScore = (_temp = _class = function (_React$Component) {
  _inherits(RelevancyScore, _React$Component);

  function RelevancyScore() {
    _classCallCheck(this, RelevancyScore);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  RelevancyScore.prototype.render = function render() {
    var result = void 0;
    if (this.props.explanation) {
      var popover = React.createElement(
        Popover,
        {
          id: 'relevancyScore-' + this.props.id,
          title: 'Relevancy Score Explanation'
        },
        React.createElement(
          Code,
          null,
          this.props.explanation
        )
      );
      result = React.createElement(
        OverlayTrigger,
        { trigger: 'click', placement: 'right', overlay: popover, rootClose: true },
        React.createElement(
          'a',
          { className: 'attivio-search-result-score' },
          this.props.score,
          ' ',
          React.createElement('span', { className: 'attivio-icon-help' })
        )
      );
    } else {
      result = React.createElement(
        'span',
        { className: 'attivio-search-result-score' },
        this.props.score
      );
    }
    return result;
  };

  return RelevancyScore;
}(React.Component), _class.defaultProps = {
  explanation: null
}, _temp);
export { RelevancyScore as default };