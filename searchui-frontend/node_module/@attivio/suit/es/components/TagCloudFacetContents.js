function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';
import TagCloud, { TagCloudValue } from './TagCloud';

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
      return new TagCloudValue(bucketLabel, bucket.count);
    });

    return React.createElement(TagCloud, { tags: tagCloudValues, maxValues: this.props.maxBuckets, callback: this.tagCloudCallback });
  };

  return TagCloudFacetContents;
}(React.Component);

export { TagCloudFacetContents as default };