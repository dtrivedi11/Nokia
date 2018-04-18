function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Statistics about the values in a given facet. Only
 * applies to numeric fields.
 */
var SearchFacetStatistics = function () {
  function SearchFacetStatistics() {
    _classCallCheck(this, SearchFacetStatistics);
  }

  SearchFacetStatistics.fromJson = function fromJson(json) {
    var result = new SearchFacetStatistics();
    result.count = json.count;
    result.max = json.max;
    result.min = json.min;
    result.mean = json.mean;
    result.midpoint = json.midpoint;
    result.stdev = json.stdev;
    result.sum = json.sum;
    result.var = json.var;

    return result;
  };

  /** The number of the counts for all buckets */

  /** The lowest value for all buckets */

  /** The highest value for all buckets */

  /** The arithmetic mean for all buckets' values */

  /** The midpoint between the min and max values */

  /** The standard deviation for all values in the field */

  /** The sum of all values in the field */

  /** The statistical variance for all values in the field */


  return SearchFacetStatistics;
}();

export { SearchFacetStatistics as default };