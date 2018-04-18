function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import Position from '../api/Position';

var PositionUtils = function () {
  function PositionUtils() {
    _classCallCheck(this, PositionUtils);
  }

  PositionUtils.calcBounds = function calcBounds(values) {
    // Set default bounds in case there are no values in the array
    var minLatitude = -90;
    var maxLatitude = 90;
    var minLongitude = -180;
    var maxLongitude = 180;
    var firstTime = true;
    values.forEach(function (value) {
      if (firstTime) {
        minLatitude = value.latitude || 0;
        minLongitude = value.longitude || 0;
        maxLatitude = minLatitude;
        maxLongitude = minLongitude;
        firstTime = false;
      } else {
        var latitude = value.latitude || 0;
        var longitude = value.longitude || 0;
        minLatitude = Math.min(latitude, minLatitude);
        maxLatitude = Math.max(latitude, maxLatitude);
        minLongitude = Math.min(longitude, minLongitude);
        maxLongitude = Math.max(longitude, maxLongitude);
      }
    });
    var bounds = [[minLongitude, minLatitude], [maxLongitude, maxLatitude]];
    return bounds;
  };

  PositionUtils.calcCenter = function calcCenter(values) {
    var result = void 0;

    if (values.length === 0) {
      result = new Position(0, 0);
    } else if (values.length === 1) {
      result = new Position(values[0].longitude || 0, values[0].latitude || 0);
    } else {
      var x = 0;
      var y = 0;
      var z = 0;

      values.forEach(function (value) {
        // Some value objects may not have both longitude and latitude set...
        var latitudeDegrees = value.latitude || 0;
        var longitudeDegrees = value.longitude || 0;
        var latitude = latitudeDegrees * Math.PI / 180;
        var longitude = longitudeDegrees * Math.PI / 180;

        x += Math.cos(latitude) * Math.cos(longitude);
        y += Math.cos(latitude) * Math.sin(longitude);
        z += Math.sin(latitude);
      });
      var total = values.length;
      x /= total;
      y /= total;
      z /= total;

      var centralSquareRoot = Math.sqrt(x * x + y * y);
      var centerLatitudeRad = Math.atan2(z, centralSquareRoot);
      var centerLongitudeRad = Math.atan2(y, x);

      result = new Position(centerLongitudeRad * 180 / Math.PI, centerLatitudeRad * 180 / Math.PI);
    }
    return result;
  };

  return PositionUtils;
}();

export { PositionUtils as default };