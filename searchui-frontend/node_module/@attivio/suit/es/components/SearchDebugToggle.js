var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

import ToggleSwitch from './ToggleSwitch';

/**
 * A toggle switch for deciding whether the search results should be shown in debug format.
 */
var SearchDebugToggle = (_temp = _class = function (_React$Component) {
  _inherits(SearchDebugToggle, _React$Component);

  function SearchDebugToggle() {
    _classCallCheck(this, SearchDebugToggle);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  // eslint-disable-line max-len
  SearchDebugToggle.prototype.render = function render() {
    var isDebug = false;
    var searcher = this.context.searcher;
    if (searcher) {
      isDebug = searcher.state.format === 'debug';
    }

    var leftRight = this.props.right ? 'attivio-globalmastnavbar-right' : '';

    return React.createElement(
      'div',
      { className: leftRight },
      this.props.label,
      ' ',
      React.createElement(ToggleSwitch, {
        on: isDebug,
        onChange: function onChange(changingToDebug) {
          if (searcher) {
            searcher.updateFormat(changingToDebug ? 'debug' : 'list');
          }
        }
      })
    );
  };

  return SearchDebugToggle;
}(React.Component), _class.defaultProps = {
  label: 'Details:',
  right: false
}, _class.contextTypes = {
  searcher: PropTypes.any
}, _temp);
export { SearchDebugToggle as default };