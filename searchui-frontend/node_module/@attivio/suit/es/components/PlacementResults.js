var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import PlacementResult from './PlacementResult';
import Placement from '../api/Placement';

/**
 * A container for showing a list of business center promotional placements from the search results.
 * These come from the parent Searcher component.
 */
var PlacementResults = (_temp = _class = function (_React$Component) {
  _inherits(PlacementResults, _React$Component);

  function PlacementResults() {
    _classCallCheck(this, PlacementResults);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  PlacementResults.prototype.renderResults = function renderResults() {
    var searcher = this.context.searcher;
    var response = searcher.state.response;
    if (response && response.placements && response.documents.length > 0) {
      var placements = response.placements;
      var results = [];
      placements.forEach(function (placement) {
        results.push(React.createElement(PlacementResult, {
          linkUrl: placement.linkUrl,
          linkText: placement.linkText,
          imageUrl: placement.imageUrl,
          markup: placement.markup
        }));
      });
      return results;
    }
    return null;
  };

  PlacementResults.prototype.render = function render() {
    var style = {
      listStyle: 'none',
      paddingLeft: 0
    };

    return React.createElement(
      'ul',
      { style: style },
      this.renderResults()
    );
  };

  return PlacementResults;
}(React.Component), _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { PlacementResults as default };