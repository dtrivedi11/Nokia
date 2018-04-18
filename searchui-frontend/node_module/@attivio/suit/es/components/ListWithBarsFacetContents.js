var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import SearchFacetBucket from '../api/SearchFacetBucket';

/**
 * Component to display the buckets of a facet in a table with
 * horizontal bars showing relatrive size.
 */
var ListWithBarsFacetContents = (_temp = _class = function (_React$Component) {
  _inherits(ListWithBarsFacetContents, _React$Component);

  function ListWithBarsFacetContents() {
    _classCallCheck(this, ListWithBarsFacetContents);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  ListWithBarsFacetContents.prototype.render = function render() {
    var _this2 = this;

    // Calculate the max value for the count
    var maxValue = this.props.buckets.reduce(function (accumulator, currentBucket) {
      return currentBucket.count > accumulator ? currentBucket.count : accumulator;
    }, 0);

    // Now generate the table rows for each bucket
    var bucketRows = this.props.buckets.map(function (bucket) {
      var label = bucket.displayLabel();
      var percent = Math.round(bucket.count / maxValue * 100);
      var percentage = percent + '%';
      var callback = function callback(event) {
        _this2.props.addFacetFilter(bucket);
        event.target.blur();
      };

      return React.createElement(
        'tr',
        { key: bucket.bucketKey() },
        React.createElement(
          'td',
          null,
          React.createElement(
            'a',
            {
              onClick: callback,
              role: 'button',
              tabIndex: 0
            },
            label
          )
        ),
        React.createElement(
          'td',
          null,
          bucket.count
        ),
        React.createElement(
          'td',
          { className: 'attivio-linksbar-chart' },
          React.createElement(
            'div',
            {
              className: 'attivio-linksbar-chart-percent',
              style: {
                width: percentage,
                backgroundColor: _this2.props.color
              }
            },
            percentage
          )
        )
      );
    });

    var className = this.props.right ? 'table attivio-linksbar ' : 'table attivio-linksbar attivio-linksbar-b';

    return React.createElement(
      'table',
      { className: className },
      React.createElement(
        'thead',
        { className: 'sr-only' },
        React.createElement(
          'tr',
          null,
          React.createElement(
            'th',
            null,
            'Facet Value'
          ),
          React.createElement(
            'th',
            null,
            'Count'
          ),
          React.createElement(
            'th',
            null,
            'Percent'
          )
        )
      ),
      React.createElement(
        'tbody',
        null,
        bucketRows
      )
    );
  }; // eslint-disable-line max-len


  return ListWithBarsFacetContents;
}(React.Component), _class.defaultProps = {
  right: false,
  color: '#55B3E3'
}, _temp);
export { ListWithBarsFacetContents as default };