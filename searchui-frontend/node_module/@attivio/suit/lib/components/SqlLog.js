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
 * Shows a list of log entries, with alternating backgrounds like old-fashioned
 * green-bar printer paper.
 */
var SqlLog = (_temp = _class = function (_React$Component) {
  _inherits(SqlLog, _React$Component);

  function SqlLog() {
    _classCallCheck(this, SqlLog);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SqlLog.prototype.render = function render() {
    var lines = this.props.lines.map(function (line, index) {
      var key = index + ': ' + line;
      return _react2.default.createElement(
        'tr',
        { key: key },
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(
            'code',
            { className: 'attivio-code' },
            line
          )
        )
      );
    });

    return _react2.default.createElement(
      'table',
      { className: 'table table-striped attivio-table attivio-table-card attivio-table-card-detail' },
      _react2.default.createElement(
        'thead',
        null,
        _react2.default.createElement(
          'tr',
          null,
          _react2.default.createElement(
            'th',
            null,
            this.props.label
          )
        )
      ),
      _react2.default.createElement(
        'tbody',
        null,
        lines
      )
    );
  };

  return SqlLog;
}(_react2.default.Component), _class.defaultProps = {
  label: 'Search Query'
}, _temp);
exports.default = SqlLog;
module.exports = exports['default'];