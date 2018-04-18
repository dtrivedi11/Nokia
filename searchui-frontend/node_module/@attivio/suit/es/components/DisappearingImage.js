var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// @Flow

import React from 'react';

/**
 * Component that will hide an image if it can't be displayed due to, e.g.,
 * a URL to a non-existant file. You can pass in any props that work for
 * a standard <img> tag and they'll be added to the inserted image.
 */
var DisappearingImage = function (_React$Component) {
  _inherits(DisappearingImage, _React$Component);

  function DisappearingImage(props) {
    _classCallCheck(this, DisappearingImage);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onError = _this.onError.bind(_this);
    _this.state = {
      error: false
    };
    return _this;
  }

  DisappearingImage.prototype.onError = function onError() {
    this.setState({
      error: true
    });
  };

  DisappearingImage.prototype.render = function render() {
    // Note: all required props should being passed in
    if (!this.state.error) {
      return React.createElement('img', _extends({ onError: this.onError }, this.props)); // eslint-disable-line jsx-a11y/alt-text
    }
    return null; // If we had an error loading the image, don't show it.
  };

  return DisappearingImage;
}(React.Component);

export { DisappearingImage as default };