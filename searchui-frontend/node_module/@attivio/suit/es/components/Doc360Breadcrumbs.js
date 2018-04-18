function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// @Flow
import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import SearchDocument from '../api/SearchDocument';
import Breadcrumbs, { BreadcrumbInfo } from './Breadcrumbs';

var HistoryEntry = function HistoryEntry(label, location) {
  _classCallCheck(this, HistoryEntry);

  this.label = label;
  this.location = location;
};

var Doc360Breadcrumbs = function (_React$Component) {
  _inherits(Doc360Breadcrumbs, _React$Component);

  function Doc360Breadcrumbs(props) {
    _classCallCheck(this, Doc360Breadcrumbs);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.handleClick = _this.handleClick.bind(_this);
    _this.state = {
      history: [],
      back: false
    };
    return _this;
  }

  Doc360Breadcrumbs.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    // we are going back, so we don't want this location added to the history
    if (!this.state.back) {
      if (nextProps.location.key !== this.props.location.key) {
        var _history = this.state.history.slice();
        _history.push(new HistoryEntry(this.findCurrentDocName(), this.props.location));
        this.setState({
          history: _history
        });
      }
    } else {
      this.setState({ back: false });
    }
  };

  Doc360Breadcrumbs.prototype.handleClick = function handleClick(location) {
    var _this2 = this;

    var history = this.state.history.slice();
    var index = -1;
    history.forEach(function (entry, i) {
      if (entry.location.key === location.key) {
        // We found the entry with the same location...
        index = i;
      }
    });
    var backwards = void 0;
    if (index !== -1) {
      // If we have the location in our history, then remove
      // it and things after it...
      history = history.slice(0, index);
      // Also, figure out how many jumps back that will be for the router's history
      backwards = 0 - (this.state.history.length - index);
      this.setState({
        history: history,
        // we are going back, so we don't want this location added to the history
        back: true
      }, function () {
        _this2.props.history.go(backwards);
      });
    } else {
      this.props.history.push(location);
    }
  };

  Doc360Breadcrumbs.prototype.findCurrentDocName = function findCurrentDocName() {
    var currentDocName = void 0;
    if (this.props.currentDoc) {
      currentDocName = this.props.currentDoc.getFirstValue('title');
      if (!currentDocName || currentDocName.length === 0) {
        currentDocName = 'Unknown';
      }
    } else {
      currentDocName = '';
    }
    return currentDocName;
  };

  Doc360Breadcrumbs.prototype.render = function render() {
    // Start with the base location, which is always the search results page
    var crumbs = [new BreadcrumbInfo('Results List', { pathname: '/results', search: this.props.location.search })];
    this.state.history.forEach(function (entry) {
      crumbs.push(new BreadcrumbInfo(entry.label, entry.location));
    });
    // End with the current location
    crumbs.push(new BreadcrumbInfo(this.findCurrentDocName(), null));

    return React.createElement(Breadcrumbs, { crumbs: crumbs, onClick: this.handleClick });
  };

  return Doc360Breadcrumbs;
}(React.Component);

export default withRouter(Doc360Breadcrumbs);