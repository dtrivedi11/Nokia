var _class2, _temp;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';

import FormattedDate from './FormattedDate';
import DateFormat from '../util/DateFormat';
import StringUtils from '../util/StringUtils';

export var ExpertiseItem = function ExpertiseItem(label, link) {
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
      expertiseLinks.push(React.createElement(
        'a',
        { href: item.link, key: item.label + ':' + item.link },
        item.label
      )); // eslint-disable-line react/no-array-index-key,max-len
    });

    // Only show these if they're set on the component
    var expertId = this.props.expertId ? [React.createElement(
      'dt',
      { key: 'expertId-label' },
      'Employee'
    ), React.createElement(
      'dd',
      { key: 'expertId-value' },
      this.props.expertId
    )] : ''; // eslint-disable-line max-len
    var expertBirthdate = this.props.expertBirthdate ? [React.createElement(
      'dt',
      { key: 'expertDOB-label' },
      'Birthdate'
    ), React.createElement(
      'dd',
      { key: 'expertDOB-value' },
      React.createElement(FormattedDate, { date: this.props.expertBirthdate, format: DateFormat.MEDIUM_DATE })
    )] : ''; // eslint-disable-line max-len

    var authorOf = '';
    if (this.props.authorCount > 0) {
      var formattedAuthorMessage = StringUtils.fmt(this.props.authoredMessage, this.props.authorCount);
      authorOf = React.createElement(
        'p',
        { className: 'attivio-expert-detail' },
        'Authored ',
        React.createElement(
          'a',
          { className: 'attivio-expert-detail-link' },
          formattedAuthorMessage
        )
      );
    }

    return React.createElement(
      'div',
      { className: 'attivio-card attivio-expert' },
      React.createElement('img', { src: this.props.expertImage, alt: imageAlt, className: 'img-responsive attivio-expert-img' }),
      React.createElement(
        'h2',
        { className: 'attivio-expert-title' },
        React.createElement(
          'a',
          null,
          this.props.expertName
        )
      ),
      authorOf,
      React.createElement(
        'div',
        { className: 'row' },
        React.createElement(
          'div',
          { className: 'col-xs-6 col-sm-6' },
          React.createElement(
            'dl',
            { className: 'attivio-labeldata-2col attivio-expert-details' },
            React.createElement(
              'dt',
              null,
              'Title'
            ),
            React.createElement(
              'dd',
              null,
              this.props.expertTitle
            ),
            React.createElement(
              'dt',
              null,
              React.createElement(
                'abbr',
                { className: 'attivio-abbr', title: 'Department' },
                'Dept'
              )
            ),
            React.createElement(
              'dd',
              null,
              this.props.expertDepartment
            )
          )
        ),
        React.createElement(
          'div',
          { className: 'col-xs-6 col-sm-6' },
          React.createElement(
            'dl',
            { className: 'attivio-labeldata-2col attivio-expert-details' },
            expertId,
            expertBirthdate
          )
        )
      ),
      React.createElement(
        'dl',
        { className: 'attivio-labeldata-2col attivio-expert-details' },
        React.createElement(
          'dt',
          null,
          'Expertise'
        ),
        React.createElement(
          'dd',
          null,
          expertiseLinks
        )
      )
    );
  };

  return ExpertCard;
}(React.Component), _class2.defaultProps = {
  expertImage: 'img/placeholder-person.svg',
  expertId: null,
  expertBirthdate: null,
  authorCount: 0,
  authoredMessage: '{} document|{} documents'
}, _temp);
export { ExpertCard as default };


ExpertCard.ExpertiseItem = ExpertiseItem;