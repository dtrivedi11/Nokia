function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * A geographic coordinate.
 */
var Position = function () {
  Position.fromJson = function fromJson(json) {
    var longitude = 0;
    var latitude = 0;
    if (Object.prototype.hasOwnProperty.call(json, 'longitude')) {
      longitude = json.longitude;
    } else if (Object.prototype.hasOwnProperty.call(json, 'x')) {
      longitude = json.x;
    }
    if (Object.prototype.hasOwnProperty.call(json, 'latitude')) {
      latitude = json.latitude;
    } else if (Object.prototype.hasOwnProperty.call(json, 'y')) {
      latitude = json.y;
    }
    return new Position(longitude, latitude);
  };

  function Position(longitude, latitude) {
    _classCallCheck(this, Position);

    this.longitude = longitude;
    this.latitude = latitude;
  }

  /** The coordinate's longitude */

  /** The coordinate's latitude */


  Position.prototype.toString = function toString() {
    return '(' + this.longitude + ', ' + this.latitude + ')';
  };

  return Position;
}();

export { Position as default };