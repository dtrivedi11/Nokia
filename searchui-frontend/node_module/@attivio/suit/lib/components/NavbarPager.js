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
 * Display a page control which lets the user go forward and
 * backward in the search results. The currently displayed
 * page is also displayed. If at the beginning or end of the
 * pages, then the forward and back arrow buttons are disabled.
 */
var NavbarPager = (_temp = _class = function (_React$Component) {
  _inherits(NavbarPager, _React$Component);

  function NavbarPager(props) {
    _classCallCheck(this, NavbarPager);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.navBack = _this.navBack.bind(_this);
    _this.navNext = _this.navNext.bind(_this);
    return _this;
  }

  NavbarPager.prototype.navBack = function navBack() {
    if (this.props.currentPage > 0) {
      this.props.onChange(this.props.currentPage - 1);
    }
  };

  NavbarPager.prototype.navNext = function navNext() {
    if (this.props.currentPage < this.props.maxPage) {
      this.props.onChange(this.props.currentPage + 1);
    }
  };

  NavbarPager.prototype.render = function render() {
    var canPageBack = this.props.currentPage > 0;
    var canPageNext = this.props.currentPage < this.props.maxPage;
    var baseButtonClass = 'attivio-globalmastnavbar-btn';
    var previousButtonClass = baseButtonClass + ' attivio-globalmastnavbar-pagination-previous attivio-icon-arrow-left-gray ' + (canPageBack ? '' : 'disabled');
    var nextButtonClass = baseButtonClass + ' attivio-globalmastnavbar-pagination-next attivio-icon-arrow-right-gray ' + (canPageNext ? '' : 'disabled');

    return _react2.default.createElement(
      'div',
      { className: 'attivio-globalmastnavbar-pagination' },
      _react2.default.createElement(
        'a',
        { className: previousButtonClass },
        'Previous'
      ),
      _react2.default.createElement(
        'div',
        { className: 'attivio-globalmastnavbar-pagination-page' },
        'Page ',
        this.props.currentPage + 1
      ),
      _react2.default.createElement(
        'a',
        { className: nextButtonClass },
        'Next'
      )
    );
  };

  return NavbarPager;
}(_react2.default.Component), _class.defaultProps = {
  maxPage: Number.MAX_SAFE_INTEGER
}, _temp);
exports.default = NavbarPager;
module.exports = exports['default'];