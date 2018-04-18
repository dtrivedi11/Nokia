var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';


import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/**
 * A button control that can have arbitrary
 * contents and is clickable by the user. The contents of the
 * tag are rendered as the button's contents. You can pass
 * either an <code>onClick</code> callback or a <code>route</code>
 * name. If you pass the former, it , that will be called in response
 * to the user clickling the button; if, instead, you pass the name
 * of a route, when the user clicks the button, the application will
 * navigate to that route.
 * <p>By default, the <code>BigButton</code> will have a
 * rounded-corner border like a regular Bootstrap button (you can
 * pass a value to the <code>bsStyle</code> prop to change its style). Alternatively,
 * you can pass the name of a CSS class or a style object as to style it yourself.
 */
var BigButton = (_temp = _class = function (_React$Component) {
  _inherits(BigButton, _React$Component);

  function BigButton(props) {
    _classCallCheck(this, BigButton);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.doClick = _this.doClick.bind(_this);
    return _this;
  }

  BigButton.prototype.doClick = function doClick() {
    if (this.props.route) {
      this.props.history.push({ pathname: this.props.route, search: this.props.location.search });
    } else if (this.props.onClick) {
      this.props.onClick();
    }
    if (this.button) {
      this.button.blur();
    }
  };

  BigButton.prototype.render = function render() {
    var _this2 = this;

    var className = this.props.className ? this.props.className : 'btn big-button';
    if (this.props.bsStyle) {
      className = className + ' btn-' + this.props.bsStyle;
    }
    return React.createElement(
      'div',
      {
        onClick: this.doClick,
        className: className,
        style: this.props.style,
        role: 'button',
        tabIndex: '0',
        ref: function ref(c) {
          _this2.button = c;
        }
      },
      this.props.children
    );
  };

  return BigButton;
}(React.Component), _class.defaultProps = {
  className: '',
  bsStyle: 'default',
  route: '',
  onClick: function onClick() {},
  style: {}
}, _temp);


export default withRouter(BigButton);