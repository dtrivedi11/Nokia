function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';
import SentimentBar from './SentimentBar';

/** Display a facet's bucket values using a sentiment bar. */
var SentimentFacetContents = function (_React$Component) {
  _inherits(SentimentFacetContents, _React$Component);

  function SentimentFacetContents(props) {
    _classCallCheck(this, SentimentFacetContents);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    return _this;
  }

  SentimentFacetContents.prototype.handleClick = function handleClick(positive) {
    var clickedBucket = this.props.buckets.find(function (bucket) {
      if (positive) {
        return bucket.value === 'pos';
      }
      return bucket.value === 'neg';
    });
    if (clickedBucket) {
      var label = positive ? 'Positive' : 'Negative';
      var prettierBucket = new SearchFacetBucket(clickedBucket.value, label, clickedBucket.count, clickedBucket.filter, clickedBucket.max, clickedBucket.min);
      this.props.addFacetFilter(prettierBucket);
    }
  };

  SentimentFacetContents.prototype.render = function render() {
    var posCount = 0;
    var negCount = 0;
    this.props.buckets.forEach(function (bucket) {
      if (bucket.value === 'pos') {
        posCount = bucket.count;
      } else if (bucket.value === 'neg') {
        negCount = bucket.count;
      }
    });

    return React.createElement(SentimentBar, {
      posCount: posCount,
      negCount: negCount,
      onClick: this.handleClick
    });
  };

  return SentimentFacetContents;
}(React.Component);

export { SentimentFacetContents as default };