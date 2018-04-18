import SimpleQueryRequest from "../api/SimpleQueryRequest";
import ElasticToQueryResponse from "./ElasticToQueryResponse";

export default (function (qr, baseUri, customOptions, callback) {
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
    query: {
      query_string: {
        query: buildQuery(query, facetFilters)
      }
    },
    size: rows,
    from: offset.pop(),
    sort: buildSort(sort, customOptions),
    aggs: buildFacets(customOptions.facets)
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

  var requestUri = "" + baseUri;

  var fetchRequest = new Request(requestUri, params);

  fetch(fetchRequest).then(function (r) {
    return r.json();
  }).then(function (r) {
    return callback(undefined, ElasticToQueryResponse(r, customOptions));
  }).catch(function (e) {
    return callback("Error: " + e);
  });
});

var buildQuery = function buildQuery(query, facetFilters) {
  if (facetFilters.length === 0) return query;
  return query + " AND " + facetFilters.map(function (ff) {
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
  if (sort.length === 0) return [];

  var _sort$0$split = sort[0].split(':'),
      field = _sort$0$split[0],
      order = _sort$0$split[1];

  var fieldInElastic = void 0;
  switch (field) {
    case '.score':
      fieldInElastic = '_score';
      break;
    default:
      fieldInElastic = customConfig.mappings[field];
  }
  var sortObj = {};
  sortObj[fieldInElastic] = order;
  return [sortObj];
};