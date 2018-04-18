'use strict';

exports.__esModule = true;
exports.default = exports.SimplePermission = undefined;

var _AbstractDocument2 = require('./AbstractDocument');

var _AbstractDocument3 = _interopRequireDefault(_AbstractDocument2);

var _SimplePrincipal = require('./SimplePrincipal');

var _SimplePrincipal2 = _interopRequireDefault(_SimplePrincipal);

var _DocumentMode = require('../util/DocumentMode');

var _DocumentMode2 = _interopRequireDefault(_DocumentMode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimplePermission = exports.SimplePermission = function SimplePermission(principal) {
  var readable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  _classCallCheck(this, SimplePermission);

  this.principal = principal;
  this.readable = readable;
};

var SimpleIngestDocument = function (_AbstractDocument) {
  _inherits(SimpleIngestDocument, _AbstractDocument);

  /** How the document should be applied to the index */

  /** The index zone */
  function SimpleIngestDocument(id, fields) {
    var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _DocumentMode2.default.ADD;
    var zone = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    var correlationId = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
    var permissions = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];

    _classCallCheck(this, SimpleIngestDocument);

    var _this = _possibleConstructorReturn(this, _AbstractDocument.call(this, fields));

    _this.id = id;
    _this.zone = zone;
    _this.correlationId = correlationId;
    _this.mode = mode;
    _this.permissions = permissions;
    return _this;
  }
  /** Permissions on the document */

  /** The document's ID */


  return SimpleIngestDocument;
}(_AbstractDocument3.default);

exports.default = SimpleIngestDocument;