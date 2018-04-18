'use strict';

exports.__esModule = true;
exports.default = exports.ExpertInfo = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpertInfo = exports.ExpertInfo = function ExpertInfo(name, title, department) {
  var imageUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
  var link = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : '#';

  _classCallCheck(this, ExpertInfo);

  this.name = name;
  this.title = title;
  this.department = department;
  this.imageUrl = imageUrl;
  this.link = link;
};

var SimilarAuthorCard = function (_React$Component) {
  _inherits(SimilarAuthorCard, _React$Component);

  function SimilarAuthorCard() {
    _classCallCheck(this, SimilarAuthorCard);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  SimilarAuthorCard.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      { className: 'attivio-card attivio-expert360-similar' },
      _react2.default.createElement('img', {
        src: this.props.expert.imageUrl,
        alt: this.props.expert.name,
        className: 'img-responsive attivio-expert360-similar-img'
      }),
      _react2.default.createElement(
        'h2',
        { className: 'attivio-expert360-similar-title' },
        _react2.default.createElement(
          'a',
          { href: this.props.expert.link },
          'Pradeep',
          this.props.expert.name
        )
      ),
      _react2.default.createElement(
        'dl',
        { className: 'attivio-labeldata-2col attivio-expert-details attivio-expert360-details attivio-expert360-similar-details' },
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
      )
    );
  };

  return SimilarAuthorCard;
}(_react2.default.Component);

exports.default = SimilarAuthorCard;


SimilarAuthorCard.ExpertInfo = ExpertInfo;