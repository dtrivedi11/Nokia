var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';

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
    var error = this.props.error ? React.createElement(
      Alert,
      { bsStyle: 'danger' },
      this.props.error
    ) : null;
    var formValidationState = this.props.error ? 'error' : null;

    return React.createElement(
      Form,
      null,
      error,
      React.createElement(
        FormGroup,
        { controlId: 'usernameText', validationState: formValidationState },
        React.createElement(
          ControlLabel,
          null,
          'Username'
        ),
        React.createElement(FormControl, {
          type: 'text',
          value: this.state.username,
          onChange: this.updateUsername,
          autoComplete: 'username'
        })
      ),
      React.createElement(
        FormGroup,
        { controlId: 'passwordText', validationState: formValidationState },
        React.createElement(
          ControlLabel,
          null,
          'Password'
        ),
        React.createElement(FormControl, {
          type: 'password',
          value: this.state.password,
          onChange: this.updatePassword,
          autoComplete: 'current-password'
        })
      ),
      React.createElement(
        Button,
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
}(React.Component), _class.defaultProps = {
  error: null
}, _temp);
export { LoginForm as default };