'use strict';

exports.__esModule = true;
exports.default = undefined;

var _class, _temp; /* eslint-disable react/no-multi-comp */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('react-bootstrap/lib/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

var _reactOverlays = require('react-overlays');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AutoCompleteInput = (_temp = _class = function (_React$Component) {
  _inherits(AutoCompleteInput, _React$Component);

  // eslint-disable-line max-len
  // Start looking for autocomplete values when there are at least 3 characters in the input field
  function AutoCompleteInput(props) {
    _classCallCheck(this, AutoCompleteInput);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      isLoading: false,
      suggestions: [],
      error: '',
      open: false
    };
    _this.closeMenu = _this.closeMenu.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.doKeyPress = _this.doKeyPress.bind(_this);
    _this.valueSelected = _this.valueSelected.bind(_this);
    _this.onToggle = _this.onToggle.bind(_this);
    return _this;
  }

  AutoCompleteInput.prototype.onToggle = function onToggle(isOpen) {
    this.setState({ open: isOpen });
  };

  AutoCompleteInput.prototype.valueSelected = function valueSelected(newValue) {
    this.props.updateValue(newValue, true);
    this.closeMenu();
  };

  AutoCompleteInput.prototype.closeMenu = function closeMenu() {
    this.setState({
      isLoading: false,
      suggestions: [],
      error: ''
    });
  };

  AutoCompleteInput.prototype.handleChange = function handleChange(event) {
    var _this2 = this;

    var query = event.currentTarget.value;
    this.props.updateValue(query, false);
    if (query && query.length > AutoCompleteInput.AUTOCOMPLETE_THRESHOLD) {
      var _uri = this.props.uri;
      if (_uri) {
        var encodedValue = encodeURIComponent(query);
        this.setState({
          isLoading: true,
          open: true,
          error: '',
          suggestions: []
        });
        fetch(_uri + '?term=' + encodedValue, { credentials: 'include' }).then(function (response) {
          response.json().then(function (data) {
            var suggestions = Array.isArray(data) ? data.map(function (item) {
              return item.label;
            }) : [];
            var open = suggestions.length > 0;
            _this2.setState({
              isLoading: false,
              suggestions: suggestions,
              error: '',
              open: open
            });
          }).catch(function (error) {
            _this2.setState({
              isLoading: false,
              suggestions: [],
              error: error,
              open: error.length > 0
            });
          });
        }, function (error) {
          _this2.setState({
            isLoading: false,
            suggestions: [],
            error: error,
            open: error.length > 0
          });
        });
      }
    } else {
      this.setState({
        isLoading: false,
        suggestions: [],
        error: '',
        open: false
      });
    }
  };

  AutoCompleteInput.prototype.doKeyPress = function doKeyPress(event) {
    if (event.keyCode === 13) {
      var query = event.currentTarget.value;
      this.props.updateValue(query, true);
    }
  };

  AutoCompleteInput.prototype.render = function render() {
    var menuItems = [];
    if (this.state.error && this.state.error.length > 0) {
      menuItems.push(_react2.default.createElement(
        _MenuItem2.default,
        { eventKey: 'error', disabled: true },
        this.state.error
      ));
    } else if (this.state.loading) {
      menuItems.push(_react2.default.createElement(
        _MenuItem2.default,
        { eventKey: 'loading', disabled: true },
        'Loading\u2026'
      ));
    } else {
      this.state.suggestions.forEach(function (suggestion) {
        menuItems.push(_react2.default.createElement(
          _MenuItem2.default,
          {
            eventKey: suggestion,
            key: suggestion
          },
          suggestion
        ));
      });
    }

    return _react2.default.createElement(
      _reactOverlays.RootCloseWrapper,
      {
        onRootClose: this.closeMenu
      },
      _react2.default.createElement(
        _Dropdown2.default,
        {
          id: this.props.id,
          onSelect: this.valueSelected,
          className: 'attivio-dropdown',
          open: this.state.open,
          onToggle: this.onToggle
        },
        _react2.default.createElement('input', {
          placeholder: this.props.placeholder,
          value: this.props.value,
          className: this.props.className,
          style: this.props.style,
          disabled: this.props.disabled,
          onChange: this.handleChange,
          onKeyDown: this.doKeyPress
        }),
        _react2.default.createElement(_Dropdown2.default.Toggle, {
          style: { display: 'none' }
        }),
        _react2.default.createElement(
          _Dropdown2.default.Menu,
          {
            style: this.props.style
          },
          menuItems
        )
      )
    );
  };

  return AutoCompleteInput;
}(_react2.default.Component), _class.AUTOCOMPLETE_THRESHOLD = 2, _class.defaultProps = {
  id: 'autocomplete',
  placeholder: '',
  value: '',
  disabled: false,
  className: '',
  style: {}
}, _temp);
exports.default = AutoCompleteInput;
module.exports = exports['default'];