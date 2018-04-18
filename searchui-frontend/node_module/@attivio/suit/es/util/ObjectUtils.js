var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ObjectUtils = function () {
  function ObjectUtils() {
    _classCallCheck(this, ObjectUtils);
  }

  /**
   * Remove an object from an array.
   */
  ObjectUtils.removeItem = function removeItem(a, o) {
    if (a && a.length > 0) {
      var index = a.indexOf(o);
      if (index >= 0) {
        a.splice(index, 1);
      }
    }
    return a;
  };

  /**
   * Compare two objects to see if they are equal. Will handle primitive
   * types, arrays, and plain-old JavaScript objects.
   */


  ObjectUtils.deepEquals = function deepEquals(objA, objB) {
    if (objA === objB) {
      return true;
    }

    if (objA === null || objB === null) {
      // Since they're not the same object, then if one is null they're different
      return false;
    }

    if (objA === undefined || objB === undefined) {
      // Since they're not the same object, then if one is undefined they're different
      return false;
    }

    if ((typeof objA === 'undefined' ? 'undefined' : _typeof(objA)) !== (typeof objB === 'undefined' ? 'undefined' : _typeof(objB))) {
      return false;
    }

    var aType = typeof objA === 'undefined' ? 'undefined' : _typeof(objA);
    if (aType === 'boolean' || aType === 'number' || aType === 'string' || aType === 'symbol' || aType === 'function') {
      // For these types, the equality check would have already worked...
      return false;
    }

    if (Array.isArray(objA) && Array.isArray(objB)) {
      // Only need to check one since we already checked that they're the same type
      return ObjectUtils.arrayEquals(objA, objB);
    }

    // Otherwise check for plain objects...
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    var i = void 0;
    for (i = 0; i < keysA.length; i += 1) {
      if (!bHasOwnProperty(keysA[i])) {
        return false;
      }
      if (!ObjectUtils.deepEquals(objA[keysA[i]], objB[keysA[i]])) {
        return false;
      }
    }
    return true;
  };

  /**
   * Compare two arrays to see if they are equal. If the arrays contain
   * objects, the objects are compared `ly.
   */


  ObjectUtils.arrayEquals = function arrayEquals(a, b) {
    if (a === b) {
      return true;
    }
    if (a && b && a.length === b.length) {
      var mismatch = a.find(function (aElement, idx) {
        var bElement = b[idx];
        // If the corresponding values aren't equal, then squawk.
        return !ObjectUtils.deepEquals(aElement, bElement);
      });
      if (mismatch) {
        return false;
      }
      return true;
    }
    return false;
  };

  /**
   * Convert a plain-old JavaScript object to an ES6-style map.
   * Only looks at the objects own properties.
   */


  ObjectUtils.toMap = function toMap(a) {
    var result = new Map();
    if ((typeof a === 'undefined' ? 'undefined' : _typeof(a)) === 'object') {
      Object.getOwnPropertyNames(a).forEach(function (property) {
        result.set(property, a[property]);
      });
    }
    return result;
  };

  return ObjectUtils;
}();

export { ObjectUtils as default };