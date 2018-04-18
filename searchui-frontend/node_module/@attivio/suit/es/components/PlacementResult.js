var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import Card from './Card';

/**
 * The display card for a Placement query result.
 */
var PlacementResult = (_temp = _class = function (_React$Component) {
  _inherits(PlacementResult, _React$Component);

  function PlacementResult() {
    _classCallCheck(this, PlacementResult);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PlacementResult.prototype.render = function render() {
    if (this.props.markup) {
      return React.createElement(
        Card,
        { style: { marginBottom: '10px' } },
        React.createElement('div', { dangerouslySetInnerHTML: { __html: this.props.markup } }) // eslint-disable-line react/no-danger

      );
    }
    var rawText = this.props.linkText || '';
    var text = React.createElement(
      'h4',
      null,
      rawText
    );
    var contents = this.props.imageUrl ? React.createElement(
      'div',
      null,
      React.createElement('img', {
        src: this.props.imageUrl,
        title: rawText,
        alt: rawText
      }),
      text
    ) : text;
    return React.createElement(
      Card,
      { style: { marginBottom: '10px' } },
      this.props.linkUrl ? React.createElement(
        'a',
        { href: this.props.linkUrl },
        contents
      ) : contents
    );
  };

  return PlacementResult;
}(React.Component), _class.defaultProps = {
  linkUrl: null,
  linkText: null,
  imageUrl: null,
  markup: null
}, _temp);
export { PlacementResult as default };