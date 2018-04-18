function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Feedback information about the query and how it was processed.
 */
var SearchFeedback = function () {
  function SearchFeedback() {
    _classCallCheck(this, SearchFeedback);
  }

  SearchFeedback.fromJson = function fromJson(json) {
    var result = new SearchFeedback();
    result.message = json.message;
    result.messageName = json.messageName;
    if (json.properties && Object.keys(json.properties).length > 0) {
      var resultProperties = new Map();
      Object.keys(json.properties).forEach(function (key) {
        resultProperties.set(key, json.properties[key]);
      });
      result.properties = resultProperties;
    }
    result.stageName = json.stageName;
    return result;
  };

  /** A user-readable message describing the feedback */

  /** The name of the message */

  /** Properties for the message */

  /** The name of the stage in the workflow that added the feedback */


  return SearchFeedback;
}();

export { SearchFeedback as default };