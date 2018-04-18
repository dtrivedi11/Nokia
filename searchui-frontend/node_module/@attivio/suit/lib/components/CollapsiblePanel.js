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
 * This is a panel that the user can exapend or collapse by clicking
 * its header. It's used, for example, for displaying facets in
 * search results but can be used with whatever contents you like.
 */
var CollapsiblePanel = (_temp = _class = function (_React$Component) {
  _inherits(CollapsiblePanel, _React$Component);

  function CollapsiblePanel(props) {
    _classCallCheck(this, CollapsiblePanel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      open: !_this.props.collapsed
    };
    _this.toggleState = _this.toggleState.bind(_this);
    return _this;
  } // eslint-disable-line max-len


  CollapsiblePanel.prototype.toggleState = function toggleState() {
    this.setState({ open: !this.state.open });
    if (this.link) {
      this.link.blur();
    }
  };

  CollapsiblePanel.prototype.render = function render() {
    var _this2 = this;

    var outerClassName = this.props.bordered ? 'attivio-facet attivio-card' : 'attivio-facet';
    var bottomClassName = this.state.open ? 'panel-collapse collapse in' : 'panel-collapse collapse';

    return _react2.default.createElement(
      'div',
      { className: outerClassName },
      _react2.default.createElement(
        'h3',
        { className: 'attivio-facet-hed' },
        _react2.default.createElement(
          'a',
          {
            'data-toggle': 'collapse',
            'aria-expanded': this.state.open,
            'aria-controls': 'key-phrases',
            id: this.props.id + '-hed',
            onClick: this.toggleState,
            role: 'button',
            tabIndex: 0,
            ref: function ref(c) {
              _this2.link = c;
            }
          },
          this.props.title,
          ' ',
          _react2.default.createElement('i', { className: 'attivio-icon-arrow-down' })
        )
      ),
      _react2.default.createElement(
        'div',
        {
          id: this.props.id,
          className: bottomClassName,
          role: 'tabpanel',
          'aria-labelledby': this.props.id + '-hed',
          'aria-expanded': this.state.open
        },
        this.props.children
      )
    );
  };

  return CollapsiblePanel;
}(_react2.default.Component), _class.defaultProps = {
  bordered: false,
  collapsed: false
}, _temp);
exports.default = CollapsiblePanel;
module.exports = exports['default'];