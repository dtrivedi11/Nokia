'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SearchFacetBucket = require('../api/SearchFacetBucket');

var _SearchFacetBucket2 = _interopRequireDefault(_SearchFacetBucket);

var _TagCloud = require('./TagCloud');

var _TagCloud2 = _interopRequireDefault(_TagCloud);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** Display a facet's bucket values in a list with TagClouds. */
var TagCloudFacetContents = function (_React$Component) {
  _inherits(TagCloudFacetContents, _React$Component);

  function TagCloudFacetContents(props) {
    _classCallCheck(this, TagCloudFacetContents);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.tagCloudCallback = _this.tagCloudCallback.bind(_this);
    return _this;
  }

  TagCloudFacetContents.prototype.tagCloudCallback = function tagCloudCallback(tcv) {
    var selectedBucket = this.props.buckets.find(function (bucket) {
      var bucketLabel = bucket.displayLabel();
      return bucketLabel === tcv.label;
    });
    if (selectedBucket) {
      this.props.addFacetFilter(selectedBucket);
    }
  };

  TagCloudFacetContents.prototype.render = function render() {
    var tagCloudValues = this.props.buckets.map(function (bucket) {
      var bucketLabel = bucket.displayLabel();
      return new _TagCloud.TagCloudValue(bucketLabel, bucket.count);
    });

    return _react2.default.createElement(_TagCloud2.default, { tags: tagCloudValues, maxValues: this.props.maxBuckets, callback: this.tagCloudCallback });
  };

  return TagCloudFacetContents;
}(_react2.default.Component);

exports.default = TagCloudFacetContents;
module.exports = exports['default'];