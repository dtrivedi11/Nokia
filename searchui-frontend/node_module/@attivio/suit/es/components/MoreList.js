var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';


/**
 * Show the children of the component. If there are more than shortSize
 * children, then only the first shortSize children will be shown, followed by
 * a "More…" link to view the rest of the list. Once the user has clicked
 * the link, it will change to "Fewer…" and clicking it will revert to the
 * shortened version of the list.
 *
 * Depends on CSS classes: more-list-link
 */
var MoreList = (_temp = _class = function (_React$Component) {
  _inherits(MoreList, _React$Component);

  function MoreList(props) {
    _classCallCheck(this, MoreList);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      allVisible: false
    };
    _this.toggleAllVisible = _this.toggleAllVisible.bind(_this);
    return _this;
  }

  MoreList.prototype.toggleAllVisible = function toggleAllVisible() {
    this.setState({
      allVisible: !this.state.allVisible
    });
    if (this.toggleButton) {
      this.toggleButton.blur();
    }
  };

  MoreList.prototype.shortenChildrenList = function shortenChildrenList(numChildrenToShow) {
    var childrenToShow = [];
    var i = 0;
    React.Children.forEach(this.props.children, function (child) {
      if (i < numChildrenToShow) {
        childrenToShow.push(child);
      }
      i += 1;
    });
    return childrenToShow;
  };

  MoreList.prototype.render = function render() {
    var _this2 = this;

    var numChildren = this.props.children ? React.Children.count(this.props.children) : 0;
    // If we're showing everything, then show all of the children.
    // If not, then show either shortSize children or, if there aren't that many, all of them

    var shortSize = this.props.shortSize ? this.props.shortSize : 5;

    var numChildrenToShow = this.state.allVisible ? numChildren : Math.min(shortSize, numChildren);

    var prompt = void 0;
    if (numChildrenToShow < numChildren) {
      // Show a "More…" link
      prompt = this.props.morePrompt;
    } else if (numChildrenToShow > shortSize) {
      // Show a "Fewer…" link
      prompt = this.props.fewerPrompt;
    }
    var link = '';
    if (prompt) {
      link = React.createElement(
        'li',
        { 'data-more-pivot': true },
        React.createElement(
          'a',
          {
            className: 'attivio-facet-more attivio-more',
            onClick: this.toggleAllVisible,
            role: 'button',
            tabIndex: '0',
            ref: function ref(c) {
              _this2.toggleButton = c;
            }
          },
          prompt
        )
      );
    }

    var childrenToShow = numChildrenToShow === numChildren ? this.props.children : this.shortenChildrenList(numChildrenToShow);

    return React.createElement(
      'ul',
      { className: 'list-unstyled' },
      childrenToShow,
      link
    );
  };

  return MoreList;
}(React.Component), _class.defaultProps = {
  shortSize: 5,
  morePrompt: 'More\u2026',
  fewerPrompt: 'Fewer\u2026'
}, _temp);
export { MoreList as default };