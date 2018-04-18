'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Alert = require('react-bootstrap/lib/Alert');

var _Alert2 = _interopRequireDefault(_Alert);

var _Button = require('react-bootstrap/lib/Button');

var _Button2 = _interopRequireDefault(_Button);

var _ControlLabel = require('react-bootstrap/lib/ControlLabel');

var _ControlLabel2 = _interopRequireDefault(_ControlLabel);

var _Form = require('react-bootstrap/lib/Form');

var _Form2 = _interopRequireDefault(_Form);

var _FormControl = require('react-bootstrap/lib/FormControl');

var _FormControl2 = _interopRequireDefault(_FormControl);

var _FormGroup = require('react-bootstrap/lib/FormGroup');

var _FormGroup2 = _interopRequireDefault(_FormGroup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LoginForm = (_temp = _class = function (_React$Component) {
  _inherits(LoginForm, _React$Component);

  function LoginForm(props) {
    _classCallCheck(this, LoginForm);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      loading: false,
      username: '',
      password: ''
    };
    _this.handleClick = _this.handleClick.bind(_this);
    _this.updateUsername = _this.updateUsername.bind(_this);
    _this.updatePassword = _this.updatePassword.bind(_this);
    return _this;
  }

  LoginForm.prototype.handleClick = function handleClick(event) {
    this.props.doLogin(this.state.username, this.state.password);
    event.preventDefault();
  };

  LoginForm.prototype.updateUsername = function updateUsername(event) {
    this.setState({
      username: event.currentTarget.value
    });
  };

  LoginForm.prototype.updatePassword = function updatePassword(event) {
    this.setState({
      password: event.currentTarget.value
    });
  };

  LoginForm.prototype.render = function render() {
    var error = this.props.error ? _react2.default.createElement(
      _Alert2.default,
      { bsStyle: 'danger' },
      this.props.error
    ) : null;
    var formValidationState = this.props.error ? 'error' : null;

    return _react2.default.createElement(
      _Form2.default,
      null,
      error,
      _react2.default.createElement(
        _FormGroup2.default,
        { controlId: 'usernameText', validationState: formValidationState },
        _react2.default.createElement(
          _ControlLabel2.default,
          null,
          'Username'
        ),
        _react2.default.createElement(_FormControl2.default, {
          type: 'text',
          value: this.state.username,
          onChange: this.updateUsername,
          autoComplete: 'username'
        })
      ),
      _react2.default.createElement(
        _FormGroup2.default,
        { controlId: 'passwordText', validationState: formValidationState },
        _react2.default.createElement(
          _ControlLabel2.default,
          null,
          'Password'
        ),
        _react2.default.createElement(_FormControl2.default, {
          type: 'password',
          value: this.state.password,
          onChange: this.updatePassword,
          autoComplete: 'current-password'
        })
      ),
      _react2.default.createElement(
        _Button2.default,
        {
          type: 'submit',
          disabled: this.state.loading,
          onClick: !this.state.loading ? this.handleClick : null
        },
        this.state.loading ? 'Logging In\u2026' : 'Log In'
      )
    );
  };

  return LoginForm;
}(_react2.default.Component), _class.defaultProps = {
  error: null
}, _temp);
exports.default = LoginForm;
module.exports = exports['default'];