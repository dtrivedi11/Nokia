var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Details for a single value for a particular facet.
 */
var SearchFacetBucket = function () {
  SearchFacetBucket.fromJson = function fromJson(json) {
    return new SearchFacetBucket(json.value, json.label, json.count, json.filter, json.min, json.max);
  };

  function SearchFacetBucket(value, label, count, filter) {
    var min = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var max = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : null;

    _classCallCheck(this, SearchFacetBucket);

    this.value = value;
    this.label = label;
    this.count = count;
    this.filter = filter;
    this.min = min;
    this.max = max;
  }

  /** Get the label to display for this bucket */


  SearchFacetBucket.prototype.displayLabel = function displayLabel() {
    var result = 'Unknown';
    if (this.label) {
      result = this.label;
    } else if (this.value) {
      if (typeof this.value === 'string') {
        result = this.value;
      } else if (_typeof(this.value) === 'object') {
        // If it's a position, with either y and y coordinate or
        // longitude and latitude values, show it within parentheses
        if (Object.prototype.hasOwnProperty.call(this.value, 'x') && Object.prototype.hasOwnProperty.call(this.value, 'y')) {
          result = '(' + this.value.x + ', ' + this.value.y + ')';
        } else if (Object.prototype.hasOwnProperty.call(this.value, 'longitude') && Object.prototype.hasOwnProperty.call(this.value, 'latitude')) {
          result = '(' + this.value.longitude + ', ' + this.value.latitude + ')';
        } else {
          // Always convert to a string in any case...
          result = this.value.toString();
        }
      } else {
        result = this.value;
      }
    } else if (this.min) {
      if (this.max) {
        result = this.min + ' - ' + this.max;
      }
      result = this.min;
    }
    return result;
  };

  /** Get a key to use for this bucket */


  SearchFacetBucket.prototype.bucketKey = function bucketKey() {
    if (this.value && this.value.length > 0) {
      return this.value;
    }
    return this.displayLabel() + ':' + this.filter;
  };

  /** The value of the bucket */

  /**
   * If present (generaly for filter facet requests or range facets), the label to display
   * as the facet bucket's value instead of the value field
   */

  /** The number of occurances of this value in the facet */

  /** The filter that can be used to limit the original query to only show documents matching this value */

  /** The minimum, or "from," value for the bucket's range (for range facets only) */

  /** The maximum, or "to," value for the bucket's range (for range facets only) */


  return SearchFacetBucket;
}();

export { SearchFacetBucket as default };