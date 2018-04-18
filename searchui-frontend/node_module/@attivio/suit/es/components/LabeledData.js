var _class2, _temp;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';
import validator from 'validator';

export var LabeledDataPair = function LabeledDataPair(label, value) {
  _classCallCheck(this, LabeledDataPair);

  this.label = label;
  this.value = value;
};

/**
 * Present a collection of name/value pairs. The values can
 * be either simple strings or entire React elements. If the
 * value is a string and appears to be a URL, it will be rendered
 * as a link that will navigate to that URL.
 */
var LabeledData = (_temp = _class2 = function (_React$Component) {
  _inherits(LabeledData, _React$Component);

  function LabeledData() {
    _classCallCheck(this, LabeledData);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  LabeledData.prototype.render = function render() {
    var className = this.props.stacked ? 'attivio-labeldata-stacked' : 'attivio-labeldata-2col';
    var rows = [];
    this.props.data.forEach(function (item) {
      rows.push(React.createElement(
        'dt',
        { key: item.label + '-label' },
        item.label
      ));
      if (typeof item.value === 'string' && validator.isURL(item.value)) {
        rows.push(React.createElement(
          'dd',
          { className: 'attivio-labeldata-url', key: item.label + '-value' },
          React.createElement(
            'a',
            { href: item.value, target: '_blank' },
            item.value
          )
        ));
      } else {
        rows.push(React.createElement(
          'dd',
          { key: item.label + '-value' },
          item.value
        ));
      }
    });

    return React.createElement(
      'dl',
      { className: className },
      rows
    );
  };

  return LabeledData;
}(React.Component), _class2.defaultProps = {
  data: [],
  stacked: false
}, _temp);
export { LabeledData as default };


LabeledData.LabeledDataPair = LabeledDataPair;