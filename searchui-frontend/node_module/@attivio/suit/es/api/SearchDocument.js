function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import SignalData from './SignalData';
import AbstractDocument from './AbstractDocument';
/**
 * An individual document in a search result.
 */

var SearchDocument = function (_AbstractDocument) {
  _inherits(SearchDocument, _AbstractDocument);

  SearchDocument.fromJson = function fromJson(json) {
    var result = new SearchDocument(new Map());
    if (json.fields && Object.keys(json.fields).length > 0) {
      Object.keys(json.fields).forEach(function (key) {
        var values = json.fields[key];
        result.fields.set(key, values);
      });
    }
    if (json.children && json.children.length > 0) {
      var resultChildren = json.children.map(function (child) {
        return SearchDocument.fromJson(child);
      });
      result.children = resultChildren;
    }
    if (json.signal) {
      result.signal = SignalData.fromJson(json.signal);
    }
    return result;
  };

  function SearchDocument(fields) {
    var signal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var children = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

    _classCallCheck(this, SearchDocument);

    var _this = _possibleConstructorReturn(this, _AbstractDocument.call(this, fields));

    _this.signal = signal;
    _this.children = children;
    return _this;
  }

  /**
   * Signal data that is included if requested
   */

  /**
   * An array of any child documents (e.g., as the result of performing
   * a JOIN in the query).
   */


  return SearchDocument;
}(AbstractDocument);

export { SearchDocument as default };