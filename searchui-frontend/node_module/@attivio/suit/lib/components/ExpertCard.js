'use strict';

exports.__esModule = true;
exports.default = exports.ExpertiseItem = undefined;

var _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormattedDate = require('./FormattedDate');

var _FormattedDate2 = _interopRequireDefault(_FormattedDate);

var _DateFormat = require('../util/DateFormat');

var _DateFormat2 = _interopRequireDefault(_DateFormat);

var _StringUtils = require('../util/StringUtils');

var _StringUtils2 = _interopRequireDefault(_StringUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExpertiseItem = exports.ExpertiseItem = function ExpertiseItem(label, link) {
  _classCallCheck(this, ExpertiseItem);

  this.label = label;
  this.link = link;
};

/**
 * Displays a card with details about an "expert" within the company.
 */
var ExpertCard = (_temp = _class2 = function (_React$Component) {
  _inherits(ExpertCard, _React$Component);

  function ExpertCard() {
    _classCallCheck(this, ExpertCard);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ExpertCard.prototype.render = function render() {
    var imageAlt = this.props.expertImage ? this.props.expertName : 'Expert placeholder';
    var expertiseLinks = [];
    this.props.expertiseList.forEach(function (item) {
      if (expertiseLinks.length > 0) {
        // Add a comma if we already have items in the list.
        expertiseLinks.push(', ');
      }
      expertiseLinks.push(_react2.default.createElement(
        'a',
        { href: item.link, key: item.label + ':' + item.link },
        item.label
      )); // eslint-disable-line react/no-array-index-key,max-len
    });

    // Only show these if they're set on the component
    var expertId = this.props.expertId ? [_react2.default.createElement(
      'dt',
      { key: 'expertId-label' },
      'Employee'
    ), _react2.default.createElement(
      'dd',
      { key: 'expertId-value' },
      this.props.expertId
    )] : ''; // eslint-disable-line max-len
    var expertBirthdate = this.props.expertBirthdate ? [_react2.default.createElement(
      'dt',
      { key: 'expertDOB-label' },
      'Birthdate'
    ), _react2.default.createElement(
      'dd',
      { key: 'expertDOB-value' },
      _react2.default.createElement(_FormattedDate2.default, { date: this.props.expertBirthdate, format: _DateFormat2.default.MEDIUM_DATE })
    )] : ''; // eslint-disable-line max-len

    var authorOf = '';
    if (this.props.authorCount > 0) {
      var formattedAuthorMessage = _StringUtils2.default.fmt(this.props.authoredMessage, this.props.authorCount);
      authorOf = _react2.default.createElement(
        'p',
        { className: 'attivio-expert-detail' },
        'Authored ',
        _react2.default.createElement(
          'a',
          { className: 'attivio-expert-detail-link' },
          formattedAuthorMessage
        )
      );
    }

    return _react2.default.createElement(
      'div',
      { className: 'attivio-card attivio-expert' },
      _react2.default.createElement('img', { src: this.props.expertImage, alt: imageAlt, className: 'img-responsive attivio-expert-img' }),
      _react2.default.createElement(
        'h2',
        { className: 'attivio-expert-title' },
        _react2.default.createElement(
          'a',
          null,
          this.props.expertName
        )
      ),
      authorOf,
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-xs-6 col-sm-6' },
          _react2.default.createElement(
            'dl',
            { className: 'attivio-labeldata-2col attivio-expert-details' },
            _react2.default.createElement(
              'dt',
              null,
              'Title'
            ),
            _react2.default.createElement(
              'dd',
              null,
              this.props.expertTitle
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
              this.props.expertDepartment
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'col-xs-6 col-sm-6' },
          _react2.default.createElement(
            'dl',
            { className: 'attivio-labeldata-2col attivio-expert-details' },
            expertId,
            expertBirthdate
          )
        )
      ),
      _react2.default.createElement(
        'dl',
        { className: 'attivio-labeldata-2col attivio-expert-details' },
        _react2.default.createElement(
          'dt',
          null,
          'Expertise'
        ),
        _react2.default.createElement(
          'dd',
          null,
          expertiseLinks
        )
      )
    );
  };

  return ExpertCard;
}(_react2.default.Component), _class2.defaultProps = {
  expertImage: 'img/placeholder-person.svg',
  expertId: null,
  expertBirthdate: null,
  authorCount: 0,
  authoredMessage: '{} document|{} documents'
}, _temp);
exports.default = ExpertCard;


ExpertCard.ExpertiseItem = ExpertiseItem;