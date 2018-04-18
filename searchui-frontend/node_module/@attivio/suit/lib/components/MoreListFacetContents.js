'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchFacetBucket = require('../api/SearchFacetBucket');

var _SearchFacetBucket2 = _interopRequireDefault(_SearchFacetBucket);

var _MoreList = require('./MoreList');

var _MoreList2 = _interopRequireDefault(_MoreList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Display a facet's bucket values in a MoreList component. */
var MoreListFacetContents = function (_React$Component) {
  _inherits(MoreListFacetContents, _React$Component);

  function MoreListFacetContents(props) {
    _classCallCheck(this, MoreListFacetContents);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.addFilter = _this.addFilter.bind(_this);
    return _this;
  }

  MoreListFacetContents.prototype.addFilter = function addFilter(event) {
    this.props.addFacetFilter(this.props.buckets[event.target.tabIndex]);
    event.target.blur();
  };

  MoreListFacetContents.prototype.render = function render() {
    var _this2 = this;

    var rows = this.props.buckets.map(function (bucket, index) {
      return _react2.default.createElement(
        'li',
        { key: bucket.bucketKey() },
        _react2.default.createElement(
          'a',
          { onClick: _this2.addFilter, role: 'button', tabIndex: index },
          bucket.displayLabel()
        ),
        ' ',
        '(',
        bucket.count,
        ')'
      );
    });
    return _react2.default.createElement(
      _MoreList2.default,
      { shortSize: 6 },
      rows
    );
  };

  return MoreListFacetContents;
}(_react2.default.Component);

exports.default = MoreListFacetContents;
module.exports = exports['default'];