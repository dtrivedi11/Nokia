'use strict';

exports.__esModule = true;
exports.default = undefined;

var _SimpleQueryRequest = require('./SimpleQueryRequest');

var _SimpleQueryRequest2 = _interopRequireDefault(_SimpleQueryRequest);

var _QueryResponse = require('./QueryResponse');

var _QueryResponse2 = _interopRequireDefault(_QueryResponse);

var _FieldNames = require('./FieldNames');

var _FieldNames2 = _interopRequireDefault(_FieldNames);

var _AuthUtils = require('../util/AuthUtils');

var _AuthUtils2 = _interopRequireDefault(_AuthUtils);

var _QueryRequestToElastic = require('../util/QueryRequestToElastic');

var _QueryRequestToElastic2 = _interopRequireDefault(_QueryRequestToElastic);

var _QueryRequestToSolr = require('../util/QueryRequestToSolr');

var _QueryRequestToSolr2 = _interopRequireDefault(_QueryRequestToSolr);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Encapsulates the default Attivio search behavior.
 */
var Search = function () {

  /**
   * Construct a Search object.
   *
   * @param baseUri     the base URI for the Attivio instance to call when searching
   *                    (including the protocol, hostname or IP address, and port number,
   *                    with no trailing slash)
   */
  function Search(baseUri, searchEngineType, customOptions) {
    _classCallCheck(this, Search);

    this.baseUri = baseUri;
    this.searchEngineType = searchEngineType;
    this.customOptions = customOptions;
  }

  /**
   * Convert a JavaScript Map object whose keys are
   * strings into a plain-old JavaScript object so it
   * can be converted to JSON.
   */


  Search.strMapToObj = function strMapToObj(strMap) {
    var obj = Object.create(null);
    strMap.forEach(function (value, key) {
      obj[key] = value;
    });
    return obj;
  };

  Search.prototype.search = function search(request, updateResults) {
    if (!request.restParams || request.restParams.size === 0) {
      request.restParams = new Map([['join.rollup', ['TREE']], ['includeMetadataInResponse', ['true']], ['geo.field', ['position']], ['geo.units', ['DEGREES']], ['l.stopwords.mode', ['OFF']], ['l.acronyms.mode', ['OFF']], ['l.acronymBoost', ['25']], ['l.synonyms.mode', ['OFF']], ['l.synonyms.boost', ['25']]]);
    }
    // Do the search on behalf of the logged-in user.
    // If the user is authenticated using the servlet,
    // this will be replaced with that username.
    var username = _AuthUtils2.default.getLoggedInUserId();
    if (username && username.length > 0) {
      request.username = _AuthUtils2.default.getLoggedInUserId();
    }

    var uri = this.baseUri + '/rest/searchApi/search';
    var headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    });
    var jsonRequest = Object.assign({}, request);
    jsonRequest.restParams = Search.strMapToObj(request.restParams);

    if (this.searchEngineType === 'elastic') {
      (0, _QueryRequestToElastic2.default)(jsonRequest, '' + this.baseUri, this.customOptions, function (err, searchResponse) {
        if (err) {
          updateResults(null, err);
        }
        updateResults(searchResponse, null);
      });
    } else if (this.searchEngineType === 'solr') {
      (0, _QueryRequestToSolr2.default)(jsonRequest, '' + this.baseUri, this.customOptions, function (err, searchResponse) {
        if (err) {
          updateResults(null, err);
        }
        updateResults(searchResponse, null);
      });
    } else {
      var body = JSON.stringify(jsonRequest);
      var params = {
        method: 'POST',
        headers: headers,
        body: body,
        credentials: 'include'
      };
      var fetchRequest = new Request(uri, params);

      fetch(fetchRequest).then(function (response) {
        if (response.ok) {
          response.json().then(function (jsonResponse) {
            var searchResponse = _QueryResponse2.default.fromJson(jsonResponse);
            updateResults(searchResponse, null);
          }).catch(function (error) {
            // Catch errors from converting the response's JSON
            updateResults(null, Search.getErrorMessage(error));
          });
        } else {
          // The request came back other than a 200-type response code
          // There should be JSON describing it...
          response.json().then(function (searchException) {
            var exceptionMessasge = searchException.message ? searchException.message : '';
            var exceptionCode = searchException.errorCode ? ' (' + searchException.errorCode + ')' : '';
            var finalExceptionMessage = 'An exception occurred while searching. ' + exceptionMessasge + exceptionCode;
            updateResults(null, finalExceptionMessage);
          }).catch(function (badJsonError) {
            // const errorMessage = response.statusText ? `${response.statusText} (error code ${response.status})` :
            //   `Unknown error of type ${response.status}`;
            updateResults(null, Search.getErrorMessage(badJsonError));
          });
        }
      }, function (error) {
        // Catch network-type errors from the main fetch() call
        updateResults(null, Search.getErrorMessage(error));
      }).catch(function (error) {
        // Catch exceptions from the main "then" function
        updateResults(null, Search.getErrorMessage(error));
      });
    }
  };

  /**
   * Perform a search against the Attivio index.
   *
   * @param query         the query to perform
   * @param queryLanguage the language to use, either "simple" or "advanced"
   * @param offset        the index of the first document to return
   * @param number        the number of documents to return (e.g. page size)
   * @param updateResults will be called when the search is complete with the results or an error
   */


  Search.prototype.simpleSearch = function simpleSearch(query, queryLanguage, offset, count, updateResults) {
    var request = new _SimpleQueryRequest2.default();
    request.rows = count;
    request.query = query;
    request.queryLanguage = queryLanguage;

    this.search(request, updateResults);
  };

  /**
   * Get the error message out of the error object.
   *
   * @param error the error recieved
   * @return      a string represening the error object
   */


  Search.getErrorMessage = function getErrorMessage(error) {
    var message = void 0;
    if (error && error.message) {
      message = error.message;
    } else {
      message = 'There was an error executing the query.';
    }
    return message;
  };

  Search.prototype.updateRealtimeField = function updateRealtimeField(docId, fieldName, fieldValues) {
    var _this = this;

    return new Promise(function (resolve, reject) {
      // Get session
      var connectUri = _this.baseUri + '/rest/ingestApi/connect';
      fetch(connectUri, { credentials: 'include' }).then(function (connectResult) {
        connectResult.json().then(function (json) {
          var sessionId = json;
          var updateUri = _this.baseUri + '/rest/ingestApi/updateRealTimeField/' + sessionId;

          var headers = new Headers({
            Accept: 'application/json',
            'Content-Type': 'application/json'
          });
          var jsonRequest = {
            id: docId,
            fieldName: _FieldNames2.default.TAGS,
            values: fieldValues
          };

          var body = JSON.stringify(jsonRequest);
          var params = {
            method: 'POST',
            headers: headers,
            body: body,
            credentials: 'include'
          };

          var updateFetchRequest = new Request(updateUri, params);
          fetch(updateFetchRequest).then(function (updateResult) {
            if (updateResult.ok) {
              // Now need to refresh the update
              var refreshUri = _this.baseUri + '/rest/ingestApi/refresh/' + sessionId;
              fetch(refreshUri, { credentials: 'include' }).then(function (refreshResult) {
                if (refreshResult.ok) {
                  // Now need to close the session
                  var disconnectUri = _this.baseUri + '/rest/ingestApi/disconnect/' + sessionId;
                  fetch(disconnectUri, { credentials: 'include' }).then(function (disconnectResult) {
                    if (disconnectResult.ok) {
                      resolve();
                    } else {
                      // The request came back other than a 200-type response code
                      disconnectResult.text().then(function (msg) {
                        reject(new Error('Error disconnecting from the ingest API: ' + msg));
                      }).catch(function () {
                        reject(new Error('Error disconnecting from the ingest API: ' + disconnectResult.statusText));
                      });
                    }
                  }).catch(function (error) {
                    reject(new Error('Failed to disconnect from the ingest API: ' + error));
                  });
                } else {
                  // The request came back other than a 200-type response code
                  refreshResult.text().then(function (msg) {
                    reject(new Error('Failed to refresh the update: ' + msg));
                  }).catch(function () {
                    reject(new Error('Failed to refresh the update: ' + refreshResult.statusText));
                  });
                }
              }).catch(function (error) {
                reject(new Error('Failed to refresh the update: ' + error));
              });
            } else {
              // The request came back other than a 200-type response code
              updateResult.text().then(function (msg) {
                reject(new Error('Failed to update the field: ' + msg));
              }).catch(function (error) {
                reject(new Error('Failed to update the field: ' + error));
              });
            }
          }).catch(function (error) {
            // Catch network-type errors from the updating fetch() call
            reject(new Error('Failed to update the field: ' + error));
          });
        }).catch(function (error) {
          reject(new Error('Failed to connect to the ingest API: ' + error));
        });
      }).catch(function (error) {
        reject(new Error('Failed to connect to the ingest API: ' + error));
      });
    });
  };

  return Search;
}();

exports.default = Search;
module.exports = exports['default'];