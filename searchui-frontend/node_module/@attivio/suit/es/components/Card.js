var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Children } from 'react';

/**
 * A card is just a bordered &lt;div&gt; to wrap a set of
 * related elements.
 */
var Card = (_temp = _class = function (_React$Component) {
  _inherits(Card, _React$Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Card.prototype.render = function render() {
    var cardClassName = this.props.borderless ? 'attivio-card attivio-card-borderless' : 'attivio-card';
    var className = cardClassName + ' ' + this.props.className;
    var title = this.props.title ? React.createElement(
      'h2',
      { className: 'attivio-card-title' },
      this.props.title
    ) : '';
    return React.createElement(
      'div',
      { className: className, style: this.props.style },
      title,
      this.props.children
    );
  };

  return Card;
}(React.Component), _class.defaultProps = {
  borderless: false,
  title: null,
  style: {},
  className: ''
}, _temp);
export { Card as default };