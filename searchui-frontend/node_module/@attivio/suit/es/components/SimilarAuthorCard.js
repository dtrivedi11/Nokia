function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';

export var ExpertInfo = function ExpertInfo(name, title, department) {
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
    return React.createElement(
      'div',
      { className: 'attivio-card attivio-expert360-similar' },
      React.createElement('img', {
        src: this.props.expert.imageUrl,
        alt: this.props.expert.name,
        className: 'img-responsive attivio-expert360-similar-img'
      }),
      React.createElement(
        'h2',
        { className: 'attivio-expert360-similar-title' },
        React.createElement(
          'a',
          { href: this.props.expert.link },
          'Pradeep',
          this.props.expert.name
        )
      ),
      React.createElement(
        'dl',
        { className: 'attivio-labeldata-2col attivio-expert-details attivio-expert360-details attivio-expert360-similar-details' },
        React.createElement(
          'dt',
          null,
          'Title'
        ),
        React.createElement(
          'dd',
          null,
          this.props.expert.title
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
          this.props.expert.department
        )
      )
    );
  };

  return SimilarAuthorCard;
}(React.Component);

export { SimilarAuthorCard as default };


SimilarAuthorCard.ExpertInfo = ExpertInfo;