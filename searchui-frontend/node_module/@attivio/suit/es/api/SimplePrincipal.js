function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Principal object used by the Attivio server.
 */
var SimplePrincipal =
/** Any groups the principal belongs to (they should all have their type field set to 'group') */

/** The principal's name */
function SimplePrincipal(name, realm) {
  var groupMemberships = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var type = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'user';

  _classCallCheck(this, SimplePrincipal);

  this.name = name;
  this.realm = realm;
  this.groupMemberships = groupMemberships;
  this.type = type;
}
/** Whether this is a user or a group */

/** The principal's realm */
;

export { SimplePrincipal as default };