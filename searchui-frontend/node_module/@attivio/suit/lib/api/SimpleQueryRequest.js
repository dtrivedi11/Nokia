'use strict';

exports.__esModule = true;
exports.default = undefined;

var _FacetFilter = require('./FacetFilter');

var _FacetFilter2 = _interopRequireDefault(_FacetFilter);

var _AuthUtils = require('../util/AuthUtils');

var _AuthUtils2 = _interopRequireDefault(_AuthUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * An object that embodies the various parameters needed to
 * make a query of the Attivio index.
 */
var SimpleQueryRequest = function SimpleQueryRequest() {
  var q = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '*:*';
  var wf = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'search';
  var ql = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'simple';
  var l = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'en';
  var r = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10;
  var flt = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];
  var f = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : [];
  var s = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : [];
  var fds = arguments.length > 8 && arguments[8] !== undefined ? arguments[8] : [];
  var un = arguments.length > 9 && arguments[9] !== undefined ? arguments[9] : null;
  var rlm = arguments.length > 10 && arguments[10] !== undefined ? arguments[10] : null;
  var ff = arguments.length > 11 && arguments[11] !== undefined ? arguments[11] : [];
  var rp = arguments.length > 12 && arguments[12] !== undefined ? arguments[12] : new Map();

  _classCallCheck(this, SimpleQueryRequest);

  this.query = q;
  this.workflow = wf;
  this.queryLanguage = ql;
  this.locale = l;
  this.rows = r;
  this.filters = flt;
  this.facets = f;
  this.sort = s;
  this.fields = fds;
  this.facetFilters = ff;
  this.restParams = rp;

  if (un === null) {
    this.username = _AuthUtils2.default.getConfig().ALL.defaultUsername;
  } else {
    this.username = un;
  }
  if (rlm === null) {
    this.realm = _AuthUtils2.default.getConfig().ALL.defaultRealm;
  } else {
    this.realm = rlm;
  }
}

/** The workflow to use when processing the query */

/** The query string */

/** Whether the query is in Simple Query Language or Advanced Query Language */

/** The locale to use when performing the query */

/** The number of documents to return with the query results */

/** Any filters to apply to the query */

/** Which facets you want to have returned with the resuls */

/** How you want the query results sorted */

/** The fields to return for each document */

/** The name of the user performing the query */

/** The user's realm */

/** Any facet filters to apply to the query */

/** Any additional REST parameters to pass. Note that the values MUST be arrays, even if there's only one instance. */
;

exports.default = SimpleQueryRequest;
module.exports = exports['default'];