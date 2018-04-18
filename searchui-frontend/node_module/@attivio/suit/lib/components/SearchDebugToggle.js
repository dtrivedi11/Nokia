'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ToggleSwitch = require('./ToggleSwitch');

var _ToggleSwitch2 = _interopRequireDefault(_ToggleSwitch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A toggle switch for deciding whether the search results should be shown in debug format.
 */
var SearchDebugToggle = (_temp = _class = function (_React$Component) {
  _inherits(SearchDebugToggle, _React$Component);

  function SearchDebugToggle() {
    _classCallCheck(this, SearchDebugToggle);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  // eslint-disable-line max-len
  SearchDebugToggle.prototype.render = function render() {
    var isDebug = false;
    var searcher = this.context.searcher;
    if (searcher) {
      isDebug = searcher.state.format === 'debug';
    }

    var leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return _react2.default.createElement(
      'div',
      { className: leftRight },
      this.props.label,
      ' ',
      _react2.default.createElement(_ToggleSwitch2.default, {
        on: isDebug,
        onChange: function onChange(changingToDebug) {
          if (searcher) {
            searcher.updateFormat(changingToDebug ? 'debug' : 'list');
          }
        }
      })
    );
  };

  return SearchDebugToggle;
}(_react2.default.Component), _class.defaultProps = {
  label: 'Details:',
  right: false
}, _class.contextTypes = {
  searcher: _propTypes2.default.any
}, _temp);
exports.default = SearchDebugToggle;
module.exports = exports['default'];