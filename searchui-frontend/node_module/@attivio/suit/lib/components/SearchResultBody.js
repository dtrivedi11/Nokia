"use strict";

exports.__esModule = true;
exports.default = undefined;

var _class, _temp;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The body of a given document in the search results, including its title
 * and text. Any HTML markup in the title and body are preserved so that
 * highlighting, entities, and sentiment can be displayed.
 */
var SearchResultBody = (_temp = _class = function (_React$Component) {
  _inherits(SearchResultBody, _React$Component);

  function SearchResultBody() {
    _classCallCheck(this, SearchResultBody);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SearchResultBody.prototype.render = function render() {
    return _react2.default.createElement("p", {
      className: "attivio-search-result-desc",
      dangerouslySetInnerHTML: { __html: this.props.body } // eslint-disable-line react/no-danger
    });
  };

  return SearchResultBody;
}(_react2.default.Component), _class.defaultProps = {
  onClick: null
}, _temp);
exports.default = SearchResultBody;
module.exports = exports["default"];