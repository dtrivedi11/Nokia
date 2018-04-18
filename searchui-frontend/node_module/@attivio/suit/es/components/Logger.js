var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import Configurable from './Configurable';

var LogUtils = (_temp = _class = function (_React$Component) {
  _inherits(LogUtils, _React$Component);

  LogUtils.info = function info(message) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'general';
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    LogUtils.instance.sendInfo('info', message, context, error);
  };

  LogUtils.error = function error(message) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'general';

    var _error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    LogUtils.instance.sendInfo('error', message, context, _error);
  };

  LogUtils.debug = function debug(message) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'general';
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    LogUtils.instance.sendInfo('debug', message, context, error);
  };

  LogUtils.warn = function warn(message) {
    var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'general';
    var error = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

    LogUtils.instance.sendInfo('warn', message, context, error);
  };

  function LogUtils(props) {
    _classCallCheck(this, LogUtils);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    LogUtils.instance = _this;
    return _this;
  }

  LogUtils.prototype.sendInfo = function sendInfo(level, message, context) {
    var error = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    var payload = {
      level: level,
      message: message,
      context: context,
      error: error
    };
    var body = JSON.stringify(payload);
    var params = {
      method: 'POST',
      headers: headers,
      body: body
    };

    var uri = this.props.baseUri + '/rest/loggingApi/log';
    var request = new Request(uri, params);
    fetch(request).then(function (result) {
      if (!result.ok) {
        console.log('Failed to log error to the server:\n' + message, result.statusText); // eslint-disable-line no-console
      }
    }).catch(function (e) {
      console.log('Failed to log error to the server:\n' + message, e); // eslint-disable-line no-console
    });
  };

  LogUtils.prototype.render = function render() {
    return null;
  };

  return LogUtils;
}(React.Component), _class.defaultProps = {
  baseUri: ''
}, _temp);


export default Configurable(LogUtils);