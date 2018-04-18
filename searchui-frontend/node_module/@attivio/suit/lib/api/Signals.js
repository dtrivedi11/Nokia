'use strict';

exports.__esModule = true;
exports.default = undefined;

var _SearchDocument = require('./SearchDocument');

var _SearchDocument2 = _interopRequireDefault(_SearchDocument);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Encapsulates the default Attivio search behavior.
 */
var Signals = function () {

  /**
   * Construct a Signals object.
   *
   * @param baseUri     the base URI for the Attivio instance to call when searching
   *                    (including the protocol, hostname or IP address, and port number,
   *                    with no trailing slash)
   */
  function Signals(baseUri) {
    _classCallCheck(this, Signals);

    this.baseUri = baseUri;
  }

  /**
   * Add a signal for the given document. If the document has no signal information
   * inside it, this method does nothing.
   */


  Signals.prototype.addSignal = function addSignal(doc) {
    var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'click';
    var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    if (doc.signal) {
      var uri = this.baseUri + '/rest/signals/add';
      var headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
      var updatedSignal = Object.assign({}, doc.signal, { type: type, weight: weight });
      var body = JSON.stringify(updatedSignal);
      var params = {
        method: 'POST',
        headers: headers,
        body: body,
        credentials: 'include'
      };
      var fetchRequest = new Request(uri, params);

      fetch(fetchRequest).then(function (response) {
        if (response.ok) {
          response.json().then(function () {}).catch(function (error) {
            // Catch errors from converting the response's JSON
            console.log('Failed to submit signal', updatedSignal, error);
          });
        } else {
          // The request came back other than a 200-type response code
          var message = response.statusText ? response.statusText + ' (error code ' + response.status + ')' : 'Unknown error of type ' + response.status;
          console.log('Failed to submit signal', updatedSignal, message);
        }
      }, function (error) {
        // Catch network-type errors from the main fetch() call
        console.log('Failed to submit signal', updatedSignal, error);
      }).catch(function (error) {
        // Catch exceptions from the main "then" function
        console.log('Failed to submit signal', updatedSignal, error);
      });
    }
  };

  return Signals;
}();

exports.default = Signals;
module.exports = exports['default'];