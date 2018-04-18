'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Shows a person's profile photo.
 */
var ProfilePhoto = (_temp = _class = function (_React$Component) {
  _inherits(ProfilePhoto, _React$Component);

  function ProfilePhoto() {
    _classCallCheck(this, ProfilePhoto);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ProfilePhoto.prototype.render = function render() {
    var url = this.props.url && this.props.url.length > 0 ? this.props.url : 'img/placeholder-person.svg';
    return _react2.default.createElement('img', { src: url, className: 'attivio-expert360-img', alt: 'Profile' });
  };

  return ProfilePhoto;
}(_react2.default.Component), _class.defaultProps = {
  url: null
}, _temp);
exports.default = ProfilePhoto;
module.exports = exports['default'];