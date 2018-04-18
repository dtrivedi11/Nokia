var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import DateUtils from '../util/DateUtils';
import DateFormat from '../util/DateFormat';

/**
 * Display a formatted Date object.
 */
var FormattedDate = (_temp = _class = function (_React$Component) {
  _inherits(FormattedDate, _React$Component);

  function FormattedDate() {
    _classCallCheck(this, FormattedDate);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  FormattedDate.prototype.render = function render() {
    return React.createElement(
      'span',
      null,
      DateUtils.formatDate(this.props.date, this.props.format, this.props.locale)
    );
  };

  return FormattedDate;
}(React.Component), _class.defaultProps = {
  format: DateFormat.SHORT_DATE,
  locale: 'en'
}, _temp);
export { FormattedDate as default };


FormattedDate.DateFormat = DateFormat;