var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

/**
 * A button that can triggering an Attivio search. It must be
 * inside a Searcher component. Note that the SearchBar component,
 * designed to be used in the Masthead component, already has its
 * own search button.
 */
var SearchButton = (_temp = _class = function (_React$Component) {
  _inherits(SearchButton, _React$Component);

  function SearchButton(props) {
    _classCallCheck(this, SearchButton);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.doSearch = _this.doSearch.bind(_this);
    return _this;
  }

  SearchButton.prototype.doSearch = function doSearch() {
    var searcher = this.context.searcher;
    if (searcher) {
      searcher.doSearch();
    }
  };

  SearchButton.prototype.render = function render() {
    var style = {
      height: 'calc(2em - 4px)',
      backgroundColor: '#40ace2',
      border: 'none',
      borderRadius: '2px',
      color: 'white',
      left: '-34px',
      position: 'relative',
      fontWeight: 'bold'
    };

    return React.createElement(
      'button',
      { type: 'button', onClick: this.doSearch, style: style },
      this.props.label
    );
  };

  return SearchButton;
}(React.Component), _class.defaultProps = {
  label: 'Go'
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { SearchButton as default };