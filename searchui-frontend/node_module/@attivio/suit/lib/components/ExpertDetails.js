'use strict';

exports.__esModule = true;
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SimilarAuthorCard = require('./SimilarAuthorCard');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExpertDetails = function (_React$Component) {
  _inherits(ExpertDetails, _React$Component);

  function ExpertDetails() {
    _classCallCheck(this, ExpertDetails);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ExpertDetails.prototype.render = function render() {
    return _react2.default.createElement(
      'dl',
      { className: 'attivio-labeldata-2col attivio-expert-details attivio-expert360-details' },
      _react2.default.createElement(
        'dt',
        null,
        'Title'
      ),
      _react2.default.createElement(
        'dd',
        null,
        this.props.expert.title
      ),
      _react2.default.createElement(
        'dt',
        null,
        _react2.default.createElement(
          'abbr',
          { className: 'attivio-abbr', title: 'Department' },
          'Dept'
        )
      ),
      _react2.default.createElement(
        'dd',
        null,
        this.props.expert.department
      )
    );
  };

  return ExpertDetails;
}(_react2.default.Component);

exports.default = ExpertDetails;


ExpertDetails.ExpertInfo = _SimilarAuthorCard.ExpertInfo;
module.exports = exports['default'];