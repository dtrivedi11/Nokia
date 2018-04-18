"use strict";

exports.__esModule = true;

var _SimpleQueryRequest = require("../api/SimpleQueryRequest");

var _SimpleQueryRequest2 = _interopRequireDefault(_SimpleQueryRequest);

var _SolrToQueryResponse = require("./SolrToQueryResponse");

var _SolrToQueryResponse2 = _interopRequireDefault(_SolrToQueryResponse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (qr, baseUri, customOptions, callback) {
  var query = qr.query,
      _qr$rows = qr.rows,
      rows = _qr$rows === undefined ? 0 : _qr$rows,
      facets = qr.facets,
      _qr$sort = qr.sort,
      sort = _qr$sort === undefined ? [".score:DESC"] : _qr$sort,
      facetFilters = qr.facetFilters;
  var _qr$restParams$offset = qr.restParams.offset,
      offset = _qr$restParams$offset === undefined ? ["0"] : _qr$restParams$offset;


  var body = JSON.stringify({
    query: query,
    limit: parseInt(rows),
    filter: buildFilter(facetFilters),
    sort: buildSort(sort, customOptions),
    facet: buildFacets(customOptions.facets)
  });

  var headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });

  var params = {
    method: 'POST',
    headers: headers,
    body: body
  };

  var requestUri = baseUri + "?start=" + parseInt(offset.pop());

  var fetchRequest = new Request(requestUri, params);

  fetch(fetchRequest).then(function (r) {
    return r.json();
  }).then(function (r) {
    return callback(undefined, (0, _SolrToQueryResponse2.default)(r, customOptions));
  }).catch(function (e) {
    return callback("Error: " + e);
  });
};

var buildFilter = function buildFilter(facetFilters) {
  if (!facetFilters || facetFilters.length === 0) return "";
  return "" + facetFilters.map(function (ff) {
    return ff.filter;
  }).join(' AND ');
};

var buildFacets = function buildFacets(facets) {
  var aggs = {};
  facets.forEach(function (f) {
    aggs[f.field] = { terms: { field: f.field } };
  });
  return aggs;
};

var buildSort = function buildSort(sort, customConfig) {
  if (!sort || !sort[0] || sort[0].length === 0) return "score DESC";

  var _sort$0$split = sort[0].split(':'),
      field = _sort$0$split[0],
      order = _sort$0$split[1];

  var fieldInSolr = customConfig.mappings[field];

  if (field.indexOf('.score') === 0) return "score " + order;

  if (fieldInSolr) {
    return fieldInSolr + " " + order;
  }

  return field + " " + order;
};
module.exports = exports["default"];