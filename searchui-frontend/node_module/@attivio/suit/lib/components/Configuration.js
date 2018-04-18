'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Configuration = (_temp = _class = function (_React$Component) {
  _inherits(Configuration, _React$Component);

  function Configuration(props) {
    _classCallCheck(this, Configuration);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = Object.assign({}, _this.props.config);

    _this.set = _this.set.bind(_this);
    _this.get = _this.get.bind(_this);
    return _this;
  }

  Configuration.prototype.getChildContext = function getChildContext() {
    return {
      configuration: this
    };
  };

  /**
   * Children can use this to store global information for the
   * application in our state. Note that this currently doesn't
   * allow removing objects from the state, just adding or replacing
   * them. If a child has multiple values to store, it probably
   * makes sense to encapsulate them into an object and store that
   * single object.
   *
   * @param {*} prefix the namespace within which to set the property
   * @param {*} newConfigItems the property:value pairs to set on the configuration
   * @param {*} callback a callback to run after the values have been set
   */


  Configuration.prototype.set = function set(prefix, newConfigItems, callback) {
    this.setState(Object.assign({}, this.state[prefix || 'ALL'], newConfigItems), callback);
  };

  /**
   * Children can use this to retrieve global information for the
   * application in our state.
   *
   * @param {*} prefix the namespace containing the property
   * @param {*} property the name of the property
   * @param {*} override this value will be used instead if it isn't null or undefined
   */


  Configuration.prototype.get = function get(prefix, property, override) {
    if (override === null || override === undefined) {
      var prefixVersion = this.state[prefix] ? this.state[prefix][property] : null;
      if (prefixVersion === null || prefixVersion === undefined) {
        return this.state.ALL[property];
      }
      return prefixVersion;
    }
    return override;
  };

  Configuration.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      this.props.children
    );
  };

  return Configuration;
}(_react2.default.Component), _class.childContextTypes = {
  configuration: _propTypes2.default.any
}, _temp);
exports.default = Configuration;
module.exports = exports['default'];