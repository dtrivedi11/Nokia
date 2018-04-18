function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import { ExpertInfo } from './SimilarAuthorCard';

var ExpertDetails = function (_React$Component) {
  _inherits(ExpertDetails, _React$Component);

  function ExpertDetails() {
    _classCallCheck(this, ExpertDetails);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ExpertDetails.prototype.render = function render() {
    return React.createElement(
      'dl',
      { className: 'attivio-labeldata-2col attivio-expert-details attivio-expert360-details' },
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
    );
  };

  return ExpertDetails;
}(React.Component);

export { ExpertDetails as default };


ExpertDetails.ExpertInfo = ExpertInfo;