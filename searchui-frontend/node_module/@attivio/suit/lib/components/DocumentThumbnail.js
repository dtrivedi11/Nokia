'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DisappearingImage = require('./DisappearingImage');

var _DisappearingImage2 = _interopRequireDefault(_DisappearingImage);

var _StringUtils = require('../util/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A component to display the thumbnail for a document. If the
 * thumbnail isn't set, then a default image is displayed instead.
 */
var DocumentThumbnail = (_temp = _class = function (_React$Component) {
  _inherits(DocumentThumbnail, _React$Component);

  function DocumentThumbnail() {
    _classCallCheck(this, DocumentThumbnail);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DocumentThumbnail.prototype.render = function render() {
    var haveImage = _StringUtils2.default.notEmpty(this.props.uri);
    if (haveImage) {
      var _uri = this.props.uri;
      if (_uri && _uri.startsWith('/')) {
        _uri = _uri.substring(1);
      }
      var className = haveImage ? 'attivio-search-result-preview img-responsive' : 'attivio-search-result-preview img-responsive attivio-search-result-preview-placeholder';
      return _react2.default.createElement(_DisappearingImage2.default, { src: _uri, className: className, alt: 'Thumbnail' });
    }
    return null; // No thumbnail for this document
  };

  return DocumentThumbnail;
}(_react2.default.Component), _class.defaultProps = {
  uri: null
}, _temp);
exports.default = DocumentThumbnail;
module.exports = exports['default'];