function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';

import Menu, { MenuItemDef } from './Menu';
import EntityTimeline from './EntityTimeline';

export var EntityTimelineData = function EntityTimelineData(label, entityName, entityType) {
  var timelinePoints = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : new Map();

  _classCallCheck(this, EntityTimelineData);

  this.label = label;
  this.entityName = entityName;
  this.entityType = entityType;
  this.timelinePoints = timelinePoints;
};

var EntityTimelinesPanel = function (_React$Component) {
  _inherits(EntityTimelinesPanel, _React$Component);

  EntityTimelinesPanel.showMore = function showMore() {};

  function EntityTimelinesPanel(props) {
    _classCallCheck(this, EntityTimelinesPanel);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      displayType: '*', // Default to showing all types
      timeframe: '30', // Default to +/- 30 days
      selectedEntities: [] // Default to nothing selected
    };
    _this.addToSelection = _this.addToSelection.bind(_this);
    _this.removeFromSelection = _this.removeFromSelection.bind(_this);
    return _this;
  }

  EntityTimelinesPanel.prototype.addToSelection = function addToSelection(item) {
    var selection = this.state.selectedEntities;
    if (!selection.includes(item)) {
      selection.push(item);
      this.setState({
        selectedEntities: selection
      });
    }
  };

  EntityTimelinesPanel.prototype.removeFromSelection = function removeFromSelection(item) {
    var selection = this.state.selectedEntities;
    var index = selection.indexOf(item);
    if (index >= 0) {
      selection.splice(index, 1);
      this.setState({
        selectedEntities: selection
      });
    }
  };

  EntityTimelinesPanel.prototype.render = function render() {
    var _this2 = this;

    var displayTypeMenuItems = [new MenuItemDef('People', 'people'), new MenuItemDef('Companies', 'companies'), new MenuItemDef('Locations', 'locations'), new MenuItemDef('All Types', '*')];

    var timeframeMenuItems = [new MenuItemDef('±1 Week', '7'), new MenuItemDef('±30 Days', '30'), new MenuItemDef('±3 Months', '90'), new MenuItemDef('±6 Months', '180'), new MenuItemDef('±1 Year', '365')];

    var entitySelecitonCount = this.state.selectedEntities.length;
    var entitySelection = entitySelecitonCount === 1 ? '1 entity selected:' : entitySelecitonCount + ' entities selected:';

    var entityTimelines = this.props.data.filter(function (entityData) {
      // Only use selected entities
      var id = entityData.entityName + ':' + entityData.label;
      return _this2.state.selectedEntities.includes(id);
    }).map(function (entityData) {
      return React.createElement(
        'div',
        { className: 'col-xs-4 col-sm-4 col-lg-3' },
        React.createElement(
          'div',
          { className: 'checkbox' },
          React.createElement(
            'label',
            { className: 'attivio-document360-entity' },
            React.createElement('input', { type: 'checkbox', checked: true }),
            React.createElement(
              'span',
              null,
              entityData.label
            ),
            ' (2,175)',
            React.createElement(EntityTimeline, { instances: [] })
          )
        )
      );
    });

    var unselectedEntities = this.props.data.filter(function (entityData) {
      // Only use unselected entities
      var id = entityData.entityName + ':' + entityData.label;
      return !_this2.state.selectedEntities.includes(id);
    }).map(function () {
      return React.createElement(
        'div',
        { className: 'checkbox' },
        React.createElement(
          'label',
          { className: 'attivio-document360-entity' },
          React.createElement('input', { type: 'checkbox', value: '' }),
          React.createElement(
            'span',
            null,
            'Warren Buffet'
          ),
          ' (665)'
        )
      );
    });

    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'attivio-360-toolbar' },
        React.createElement(Menu, {
          label: 'Display:',
          selection: this.state.displayType,
          items: displayTypeMenuItems,
          onSelect: function onSelect() {}
        }),
        React.createElement(Menu, {
          label: 'Timeframe:',
          selection: this.state.timeframe,
          items: timeframeMenuItems,
          onSelect: function onSelect() {}
        }),
        React.createElement(
          'strong',
          { className: 'attivio-document360-selected' },
          entitySelection,
          ':'
        ),
        React.createElement(
          'button',
          { className: 'btn btn-default btn-xs' },
          'More Results With These'
        )
      ),
      React.createElement(
        'div',
        { className: 'row' },
        entityTimelines
      ),
      unselectedEntities,
      React.createElement(
        'a',
        {
          className: 'attivio-morelink attivio-document360-entity-more',
          role: 'button',
          tabIndex: 0,
          onClick: EntityTimelinesPanel.showMore
        },
        'More\u2026'
      )
    );
  };

  return EntityTimelinesPanel;
}(React.Component);

export { EntityTimelinesPanel as default };


EntityTimelinesPanel.EntityTimelineData = EntityTimelineData;