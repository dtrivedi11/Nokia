'use strict';

exports.__esModule = true;
exports.BreadcrumbInfo = undefined;

var _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouterDom = require('react-router-dom');

var _StringUtils = require('../util/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BreadcrumbInfo = exports.BreadcrumbInfo = function BreadcrumbInfo(label, location) {
  _classCallCheck(this, BreadcrumbInfo);

  this.label = label;
  this.location = location;
};

var Breadcrumbs = (_temp = _class2 = function (_React$Component) {
  _inherits(Breadcrumbs, _React$Component);

  function Breadcrumbs(props) {
    _classCallCheck(this, Breadcrumbs);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  Breadcrumbs.prototype.handleClick = function handleClick(location, index) {
    if (this.links && this.links[index]) {
      this.links[index].blur();
    }
    if (this.props.onClick) {
      this.props.onClick(location);
    } else {
      this.props.history.push(location);
    }
  };

  Breadcrumbs.prototype.render = function render() {
    var _this2 = this;

    var crumbs = this.props.crumbs.map(function (crumb, index) {
      var label = _StringUtils2.default.smartTruncate(crumb.label, 40);
      if (index < _this2.props.crumbs.length - 1) {
        // We're at a prior level... show the link and the separator icon
        return _react2.default.createElement(
          'li',
          { key: JSON.stringify(crumb.location) },
          _react2.default.createElement(
            'a',
            {
              onClick: function onClick() {
                _this2.handleClick(crumb.location, index);
              },
              role: 'button',
              tabIndex: 0,
              ref: function ref(c) {
                if (!_this2.links) {
                  _this2.links = [];
                }
                _this2.links[index] = c;
              }
            },
            label,
            _react2.default.createElement('span', { className: 'attivio-icon-arrow-right' })
          )
        );
      }
      return _react2.default.createElement(
        'li',
        { key: JSON.stringify(crumb.location), className: 'active' },
        label
      );
    });
    return _react2.default.createElement(
      'ol',
      { className: 'list-inline attivio-360-breadcrumb', style: { margin: 0 } },
      crumbs
    );
  };

  return Breadcrumbs;
}(_react2.default.Component), _class2.defaultProps = {
  onClick: null
}, _temp);


Breadcrumbs.BreadcrumbInfo = BreadcrumbInfo;

exports.default = (0, _reactRouterDom.withRouter)(Breadcrumbs);