var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import md5 from 'crypto-js/md5';

import StringUtils from './StringUtils';

var AuthUtils = (_temp = _class = function () {
  function AuthUtils() {
    _classCallCheck(this, AuthUtils);
  }

  /**
   * Called by the application to pass in configuration to the
   * library's utility and API classes.
   */
  AuthUtils.configure = function configure(users, config) {
    var configError = AuthUtils.validateConfiguration(config);
    if (configError) {
      throw configError;
    }
    if (config.ALL.authType === 'XML') {
      // Only validate users if the auth type is XML
      var usersError = AuthUtils.validateUsers(users);
      if (usersError) {
        throw usersError;
      }
    }
    AuthUtils.users = users;
    AuthUtils.config = config;
  };

  /**
   * Logs the currently logged-in user out.
   */


  AuthUtils.logout = function logout(callback) {
    localStorage.removeItem(AuthUtils.USER_KEY);
    if (AuthUtils.config.ALL.authType === 'SAML') {
      // For SAML auth, call the special URL from Spring/SAML to tell the IdP we’re logging out
      fetch(AuthUtils.config.ALL.baseUri + '/saml/logout', { method: 'GET' }).then(function () {
        // And then call the callback
        callback();
      }).catch(function () {
        // Always do the callback even if we got an error fetching
        callback();
      });
    } else if (AuthUtils.config.ALL.authType === 'NONE') {
      // For "none," we want to tell the server to
      // delete the SessionId cookie
      document.cookie = 'SessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      // And tell the server to log us out
      fetch(AuthUtils.config.ALL.baseUri + '/', { method: 'POST' }).then(function () {
        // And then call the callback
        callback();
      }).catch(function () {
        // Always do the callback even if we got an error fetching
        callback();
      });
    } else {
      // Just XML authentication, remoing from local storage is good enough.
      // Still need to call the callback
      callback();
    }
  };

  /**
   * Imeplementation of the obfuscation algorithm from Jetty.
   */


  AuthUtils.obfuscate = function obfuscate(orig) {
    var buf = [];
    var bytes = orig.split('').map(function (c) {
      return c.charCodeAt(0);
    });
    bytes.forEach(function (b1, i) {
      var b2 = bytes[orig.length - (i + 1)];
      var i1 = 127 + b1 + b2;
      var i2 = 127 + b1 - b2;
      var i0 = i1 * 256 + i2;
      var newChar = i0.toString(36);
      switch (newChar.length) {
        case 1:
          buf.push('000' + newChar);
          break;
        case 2:
          buf.push('00' + newChar);
          break;
        case 3:
          buf.push('0' + newChar);
          break;
        default:
          buf.push(newChar);
          break;
      }
    });
    return buf.join('');
  };

  /**
   * Validate a password against a hashed one.
   */


  AuthUtils.passwordMatches = function passwordMatches(comp, compTo) {
    if (compTo.startsWith('OBF:')) {
      var remainder = compTo.substring(4);
      var obfuscatedComp = AuthUtils.obfuscate(comp);
      return obfuscatedComp === remainder;
    } else if (compTo.startsWith('MD5:')) {
      var _remainder = compTo.substring(4);
      var md5Comp = md5(comp).toString();
      return md5Comp === _remainder;
    }
    return comp === compTo;
  };

  /**
   * Find the user info for a given user name.
   * This is only applicable in the case of XML authentication.
   */


  AuthUtils.findUser = function findUser(username) {
    if (this.config.ALL.authType === 'XML') {
      if (Array.isArray(AuthUtils.users.principals.user)) {
        return AuthUtils.users.principals.user.find(function (testUser) {
          return testUser.$.id === username;
        });
      }
      // This will happen if there's only use user...
      if (AuthUtils.users.principals.user.$.id === username) {
        return AuthUtils.users.principals.user;
      }
    }
    return null;
  };

  /**
   * Attempt to log the specified user in. If an error
   * occurs logging in, then it is returned. Otherwise
   * this returns null. The log in is valid for the timeout
   * set in the authentication configuration.
   */


  AuthUtils.login = function login(username, password) {
    if (!AuthUtils.config || !AuthUtils.config.ALL) {
      return null;
    }

    if (AuthUtils.config.ALL.authType === 'NONE') {
      return null;
    }
    if (AuthUtils.config.ALL.authType === 'XML') {
      var userObject = AuthUtils.findUser(username);
      if (userObject) {
        if (AuthUtils.passwordMatches(password, userObject.$.password)) {
          userObject.timeout = new Date().getTime() + AuthUtils.TIMEOUT;
          localStorage.setItem(AuthUtils.USER_KEY, JSON.stringify(userObject));
          return null;
        }
      }
      return new Error('Invalid log-in credentials.');
    }
    return null;
  };

  /**
   * Push the currently logged-in user's info into local storage for easy access.
   */


  AuthUtils.saveLoggedInUser = function saveLoggedInUser(userInfo) {
    if (userInfo) {
      var userInfoCopy = JSON.parse(JSON.stringify(userInfo));
      userInfoCopy.timeout = new Date().getTime() + AuthUtils.TIMEOUT;
      localStorage.setItem(AuthUtils.USER_KEY, JSON.stringify(userInfoCopy));
    } else {
      localStorage.removeItem(AuthUtils.USER_KEY);
    }
  };

  /**
   * Check whether the user has a particular permission.
   * TO BE IMPLEMENTED
   */


  AuthUtils.hasPermission = function hasPermission() {
    if (AuthUtils.config && AuthUtils.config.ALL && AuthUtils.config.ALL.authType === 'NONE') {
      return true;
    }
    return false;
  };

  /**
   * Check whether there is a user currently logged in.
   */


  AuthUtils.isLoggedIn = function isLoggedIn(permission) {
    if (!AuthUtils.config || !AuthUtils.config.ALL) {
      return false;
    }
    if (AuthUtils.config.ALL.authType === 'NONE') {
      return true;
    }

    var user = AuthUtils.getLocalStorageUser();
    if (user) {
      if (permission) {
        return AuthUtils.hasPermission();
      }
      return true;
    }
    return false;
  };

  /**
   * Get the full info object for a logged-in user we already know about.
   * If no user is logged in or if the logged-in user's login has expired,
   * then this method returns null.
   */


  AuthUtils.getLocalStorageUser = function getLocalStorageUser() {
    var userObjectJson = localStorage.getItem(AuthUtils.USER_KEY);
    if (userObjectJson) {
      var userObject = JSON.parse(userObjectJson);
      if (userObject && userObject.timeout && userObject.timeout > new Date().getTime()) {
        return userObject;
      }
    }
    return null;
  };

  /**
   * Get the full info object for the logged-in user and call the passed-in
   * callback function with this info. If no user is logged in, the callback
   * is passed null.
   *
   * @param callback a function which takes the user info as a parameter
   */


  AuthUtils.getLoggedInUserInfo = function getLoggedInUserInfo(callback) {
    var userObject = AuthUtils.getLocalStorageUser();
    if (userObject && userObject.timeout && userObject.timeout > new Date().getTime()) {
      callback(userObject);
    } else if (AuthUtils.config.ALL.authType === 'SAML' || AuthUtils.config.ALL.authType === 'NONE') {
      // If the authentication is done on the front-end, we shouldn't
      // ever get here because if there's no local-storage user, then
      // no one is logged in yet...
      var headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
      });
      var params = {
        method: 'GET',
        headers: headers,
        credentials: 'include' // Need to do this to make sure the cookies are sent
      };
      var request = new Request(AuthUtils.config.ALL.baseUri + '/rest/serverDetailsApi/user', params);
      fetch(request).then(function (response) {
        if (response.ok) {
          response.json().then(function (userInfo) {
            AuthUtils.saveLoggedInUser(userInfo);
            callback(userInfo);
          }).catch(function (error) {
            // Catch errors from converting the response's JSON
            console.log('Got an error parsing the current user info', error);
            callback(null);
          });
        } else {
          // The request came back other than a 200-type response code
          var message = response.statusText ? response.statusText + ' (error code ' + response.status + ')' : 'Unknown error of type ' + response.status;
          console.log('Got an error trying to fetch the user info: ' + message);
          callback(null);
        }
      }).catch(function (err) {
        console.log('Got an error trying to fetch the user info: ' + err.toString());
        callback(null);
      });
    } else {
      // If we're doing our own authentication, and nobody is logged in, pass null to the callback
      callback(null);
    }
  };

  AuthUtils.getLoggedInUserId = function getLoggedInUserId() {
    var userInfo = AuthUtils.getLocalStorageUser();
    if (userInfo) {
      if (userInfo.$ && userInfo.$.id) {
        // Special case for XML-based user authentication
        return userInfo.$.id;
      }
      if (userInfo.userId) {
        return userInfo.userId;
      }
    }
    return '';
  };

  /**
   * Get the user name to display given the user info passed in.
   */


  AuthUtils.getUserName = function getUserName(userInfo) {
    if (userInfo) {
      if (userInfo.$) {
        // Special case for XML-based user authentication
        if (userInfo.$.name && userInfo.$.name.length > 0) {
          return userInfo.$.name;
        }
        return userInfo.$.id;
      }
      if (userInfo.fullName) {
        return userInfo.fullName;
      }
      if (userInfo.firstName && userInfo.lastName) {
        return userInfo.firstName + ' ' + userInfo.lastName;
      }
      if (userInfo.firstName) {
        return userInfo.firstName;
      }
      if (userInfo.lastName) {
        return userInfo.lastName;
      }
      if (userInfo.userId) {
        return userInfo.userId;
      }
    }
    return '';
  };

  /**
   * Validate the users object to make sure it won't cause us any
   * grief. Return null if it's good, or an error messager otherwise.
   * This should only be called if auth type is 'XML'
   */


  AuthUtils.validateUsers = function validateUsers(users) {
    if (!users) {
      return 'The users.xml file was not properly loaded.';
    }
    if (!users.principals) {
      return 'The users.xml file is invalid; it must contain an outer <principals> element.';
    }
    if (!users.principals.user) {
      return 'The users.xml file is invalid; it must contain at least one <user> definition.';
    }
    if (Array.isArray(users.principals.user)) {
      for (var i = 0; i < users.principals.user.length; i += 1) {
        if (!users.principals.user[i].$ || !StringUtils.notEmpty(users.principals.user[i].$.id)) {
          return 'The users.xml file is invalid; the user at position ' + i + ' is missing an "id" attribute.';
        }
      }
    } else if (!users.principals.user.$ || !StringUtils.notEmpty(users.principals.user.$.id)) {
      return 'The users.xml file is invalid; the user is missing an "id" attribute.';
    }
    return null;
  };

  /**
   * Validate the configuration object to make sure it won't cause us any
   * grief. Return null if it's good, or an error messager otherwise.
   */


  AuthUtils.validateConfiguration = function validateConfiguration(config) {
    if (!config) {
      return 'The configuration object must be specified.';
    }
    if (!config.ALL) {
      return 'The configuration object is missing the \'ALL\' value.';
    }
    if (config.ALL.baseUri === null || typeof config.ALL.baseUri === 'undefined') {
      // Note that baseUri can be the empty string, as in the case of running inside a node
      return 'The configuration object is missing the \'ALL.baseUri\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.basename)) {
      return 'The configuration object is missing the \'ALL.basename\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.authType)) {
      return 'The configuration object is missing the \'ALL.authType\' value.';
    }
    if (config.ALL.authType !== 'XML' && config.ALL.authType !== 'SAML' && config.ALL.authType !== 'NONE') {
      return 'The configuration object has an invalid value for \'ALL.authType\': it must be \'XML,\' \'SAML,\' or \'NONE\' but it is \'' + config.ALL.authType + '.\''; // eslint-disable-line max-len
    }
    if (!StringUtils.notEmpty(config.ALL.defaultRealm)) {
      return 'The configuration object is missing the \'ALL.defaultRealm\' value.';
    }
    if (!config.ALL.entityFields) {
      return 'The configuration object is missing the \'ALL.entityFields\' value.';
    }
    if (!(config.ALL.entityFields instanceof Map)) {
      return 'The configuration object\'s \'ALL.entityFields\' value should be a Map.';
    }
    if (!config.ALL.entityColors) {
      return 'The configuration object is missing the \'ALL.entityColors\' value.';
    }
    if (!(config.ALL.entityColors instanceof Map)) {
      return 'The configuration object\'s \'ALL.entityColors\' value should be a Map.';
    }
    if (!config.ALL.fields) {
      return 'The configuration object is missing the \'ALL.fields\' value.';
    }
    if (!Array.isArray(config.ALL.fields)) {
      return 'The configuration object\'s \'ALL.fields\' value should be an array with at least one value.';
    }
    if (config.ALL.fields.length < 1) {
      return 'The configuration object\'s \'ALL.fields\' value should be an array with at least one value.';
    }
    if (!StringUtils.notEmpty(config.ALL.title)) {
      return 'The configuration object is missing the \'ALL.title\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.uri)) {
      return 'The configuration object is missing the \'ALL.uri\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.table)) {
      return 'The configuration object is missing the \'ALL.table\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.latitude)) {
      return 'The configuration object is missing the \'ALL.latitude\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.longitude)) {
      return 'The configuration object is missing the \'ALL.longitude\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.mimetype)) {
      return 'The configuration object is missing the \'ALL.mimetype\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.sourcePath)) {
      return 'The configuration object is missing the \'ALL.sourcePath\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.previewImageUri)) {
      return 'The configuration object is missing the \'ALL.previewImageUri\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.thumbnailImageUri)) {
      return 'The configuration object is missing the \'ALL.thumbnailImageUri\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.moreLikeThisQuery)) {
      return 'The configuration object is missing the \'ALL.moreLikeThisQuery\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.teaser)) {
      return 'The configuration object is missing the \'ALL.teaser\' value.';
    }
    if (!StringUtils.notEmpty(config.ALL.text)) {
      return 'The configuration object is missing the \'ALL.text\' value.';
    }
    return null;
  };

  AuthUtils.getEntityColors = function getEntityColors() {
    if (this.config && this.config.ALL && this.config.ALL.entityColors) {
      return this.config.ALL.entityColors;
    }
    // If it's not configured, return an empty map.
    return new Map();
  };

  AuthUtils.getConfig = function getConfig() {
    return this.config;
  };

  return AuthUtils;
}(), _class.USER_KEY = 'suit-user', _class.TIMEOUT = 30 * 60 * 1000, _temp);
export { AuthUtils as default };