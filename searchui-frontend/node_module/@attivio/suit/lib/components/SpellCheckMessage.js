'use strict';

exports.__esModule = true;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _queryString = require('query-string');

var _queryString2 = _interopRequireDefault(_queryString);

var _Card = require('./Card');

var _Card2 = _interopRequireDefault(_Card);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A suggested alternate query if one is available.
 */
var SpellCheckMessage = (_temp = _class = function (_React$Component) {
  _inherits(SpellCheckMessage, _React$Component);

  function SpellCheckMessage() {
    _classCallCheck(this, SpellCheckMessage);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SpellCheckMessage.prototype.getMessage = function getMessage() {
    var searcher = this.context.searcher;
    if (searcher) {
      var response = searcher.state.response;
      if (response && response.totalHits === 0) {
        if (response.feedback) {
          var spellCheckMessages = response.feedback.filter(function (feedback) {
            return feedback.messageName === 'spellcheck.suggested';
          });
          return spellCheckMessages[0] ? spellCheckMessages[0].message : '';
        }
      }
    }
    return '';
  };

  SpellCheckMessage.prototype.getLink = function getLink() {
    var message = this.getMessage();
    if (message) {
      var _location = this.props.location;
      var search = _queryString2.default.parse(_location.search);
      search.query = message;
      var href = _location.pathname + '?' + _queryString2.default.stringify(search);
      return _react2.default.createElement(
        'a',
        { href: href },
        message
      );
    }
    return null;
  };

  SpellCheckMessage.prototype.render = function render() {
    return this.getLink() && _react2.default.createElement(
      _Card2.default,
      { borderless: true, style: { paddingLeft: '20%', fontSize: '2rem' } },
      'Your search returned no results. ',
      _react2.default.createElement('br', null),
      'Did you mean: ',
      this.getLink(),
      '?'
    );
  };

  return SpellCheckMessage;
}(_react2.default.Component), _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = (0, _reactRouterDom.withRouter)(SpellCheckMessage);
module.exports = exports['default'];