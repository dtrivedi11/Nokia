'use strict';

exports.__esModule = true;
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component to show a "star" rating for a document. It can display
 * between 0 and 5 stars, including fractional values rounded to the
 * nearest half star. If the chooseable flag is set, then the user
 * will be able to choose their own rating for the document and call
 * the enclosing Searcher to apply the value to the document in the
 * index.
 */
var StarRating = (_temp = _class = function (_React$Component) {
  _inherits(StarRating, _React$Component);

  function StarRating(props) {
    _classCallCheck(this, StarRating);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.starDivElems = [];

    _this.state = {
      stars: _this.props.stars
    };
    return _this;
  }

  StarRating.prototype.handleClick = function handleClick(numberOfStars) {
    var _this2 = this;

    this.setState({
      stars: numberOfStars
    }, function () {
      // Won't get here unless the callback is set, but this check makes flow happy
      if (_this2.props.onRated) {
        _this2.props.onRated(numberOfStars);
      }
      _this2.starDivElems.forEach(function (elem) {
        if (elem) {
          elem.blur();
        }
      });
    });
  };

  StarRating.prototype.render = function render() {
    var _this3 = this;

    var origStars = this.state.stars;
    var numFull = Math.trunc(origStars);
    var halfIndex = origStars - numFull > 0 ? numFull : -1;
    var starCount = origStars === 1 ? '1 star' : origStars + ' stars';

    var starDivs = [];

    var _loop = function _loop(i) {
      // If we're chooseable, then add click handling stuff
      var clickableProps = _this3.props.onRated === null ? {} : {
        onClick: function onClick() {
          _this3.handleClick(i + 1);
        },
        role: 'button',
        tabIndex: 0,
        ref: function ref(elem) {
          _this3.starDivElems.push(elem);
        }
      };

      if (i < numFull) {
        starDivs.push(_react2.default.createElement('div', _extends({
          key: 'starDiv' + i,
          className: 'attivio-stars-star attivio-icon-star-full'
        }, clickableProps)));
      } else if (i === halfIndex) {
        starDivs.push(_react2.default.createElement('div', _extends({
          key: 'starDiv' + i,
          className: 'attivio-stars-star attivio-icon-star-half'
        }, clickableProps)));
      } else {
        starDivs.push(_react2.default.createElement('div', _extends({
          key: 'starDiv' + i,
          className: 'attivio-stars-star attivio-icon-star-empty'
        }, clickableProps)));
      }
    };

    for (var i = 0; i < 5; i += 1) {
      _loop(i);
    }

    return _react2.default.createElement(
      'div',
      { className: 'attivio-stars' },
      _react2.default.createElement(
        'div',
        { className: 'sr-only' },
        starCount
      ),
      starDivs
    );
  };

  return StarRating;
}(_react2.default.Component), _class.defaultProps = {
  stars: 0,
  onRated: null
}, _temp);
exports.default = StarRating;
module.exports = exports['default'];