var _class2, _temp;

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import React from 'react';

import Checkbox from 'react-bootstrap/lib/Checkbox';
import Dropdown from 'react-bootstrap/lib/Dropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';

/**
 * Class for defining each individual menu item to be
 * displayed in the Menu component.
 */
export var MenuItemDef =
/**
 * If true, this item is an un-clickable header (headers must
 * still have a value set so they can be deemed unique by React)
 */

/** If true, this item shows up as a divider */

/** The label displayed to the user */
function MenuItemDef(label, value) {
  _classCallCheck(this, MenuItemDef);

  this.label = label;
  this.value = value;
  this.divider = false;
  this.disabled = false;
  this.header = false;
}
/**
 * If set, then a span with a custom icon class (for example,
 * "'attivio-icon-sort-descending" will be added after the
 * menu item's label.
 */

/**
 * If true, this item shows up disabled (dividers must still
 * have a value set so they can be deemed unique by React)
 */

/**
 * The value returned to the code—values <em>must</em> be
 * unique across all MenuItemDefs passed as the items parameter
 */
;

var Menu = (_temp = _class2 = function (_React$Component) {
  _inherits(Menu, _React$Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onSelect = _this.onSelect.bind(_this);
    _this.selectAll = _this.selectAll.bind(_this);
    _this.selectNone = _this.selectNone.bind(_this);
    return _this;
  }

  Menu.prototype.onSelect = function onSelect(eventKey) {
    var selectedItem = this.itemForValue(eventKey);
    if (selectedItem) {
      this.props.onSelect(selectedItem);
    }
  };

  /**
   * Get the MenuItem whose value is passed in.
   *
   * @param {*} value
   * @returns the corresponding item or null if not found
   */


  Menu.prototype.itemForValue = function itemForValue(value) {
    var result = void 0;
    if (value) {
      result = this.props.items.find(function (item) {
        return item.value === value;
      });
    }
    return result;
  };

  /**
   * Get the label for the MenuItem whose value is passed in.
   * The result may be a simple string or a JSX item.
   */


  Menu.prototype.labelForValue = function labelForValue(value) {
    var valueItem = void 0;
    if (value) {
      valueItem = this.props.items.find(function (item) {
        return item.value === value;
      });
    }
    if (valueItem) {
      if (valueItem.customIconClass) {
        return React.createElement(
          'span',
          null,
          valueItem.label,
          ' ',
          React.createElement('span', { className: valueItem.customIconClass })
        );
      }
      return valueItem.label;
    }
    return null;
  };

  Menu.prototype.selectAll = function selectAll() {
    if (this.props.selectAllNone) {
      this.props.selectAllNone(true);
    }
    if (this.selectAllLink) {
      this.selectAllLink.blur();
    }
  };

  Menu.prototype.selectNone = function selectNone() {
    if (this.props.selectAllNone) {
      this.props.selectAllNone(false);
    }
    if (this.selectNoneLink) {
      this.selectNoneLink.blur();
    }
  };

  /**
   * Get the label to show for the current selection, if any.
   * For multiple selections, shows an abbreviated version
   * if there are two many items.
   */


  Menu.prototype.calcSelectionLabel = function calcSelectionLabel() {
    var result = '';
    if (typeof this.props.selection === 'string') {
      result = this.labelForValue(this.props.selection);
    } else if (this.props.selection) {
      // Must be an array now
      if (typeof this.props.selection !== 'string') {
        var selectionArray = this.props.selection;
        if (selectionArray.length === 1) {
          result = this.labelForValue(selectionArray[0]);
        } else if (selectionArray.length === this.props.items.length) {
          // All!
          result = this.props.allLabel;
        } else if (selectionArray.length > 1) {
          result = selectionArray.length + ' selected';
        }
        // If the array is empty, we fall through
      }
    }
    if (!result) {
      result = React.createElement(
        'span',
        { style: { fontStyle: 'italic' } },
        'None'
      );
    }
    return result;
  };

  /**
   * Determine whether the menu item is selected. If we're
   * a multi-select menu, it needs to be in the selection
   * array. If not, it needs to be the single string value
   * of selection. If selection is not set, then we always
   * return false.
   */


  Menu.prototype.isSelected = function isSelected(item) {
    if (this.props.selection) {
      if (this.props.multiSelect && this.props.selection && typeof this.props.selection !== 'string') {
        var selectionArray = this.props.selection;
        return selectionArray.includes(item.value);
      }
      return typeof this.props.selection === 'string' && this.props.selection === item.value;
    }
    return false;
  };

  /**
   * Generate the label to show inside the button itself.
   */


  Menu.prototype.calcButtonLabel = function calcButtonLabel() {
    if (this.props.promptLabel && !this.props.selection) {
      // If the user wants a prompt and there's no current selection,
      // show the prompt.
      return this.props.promptLabel;
    }
    var selectionLabel = this.calcSelectionLabel();

    var buttonLabelPrefix = this.props.block && this.props.selection ? React.createElement(
      'span',
      null,
      React.createElement('span', {
        className: 'attivio-model-dot',
        style: { backgroundColor: '#f1c541' }
      }),
      ' '
    ) : null;

    var buttonLabel = React.createElement(
      'span',
      null,
      buttonLabelPrefix,
      this.props.label,
      ' ',
      React.createElement(
        'b',
        null,
        selectionLabel
      )
    );
    return buttonLabel;
  };

  Menu.prototype.render = function render() {
    var _this2 = this;

    var buttonLabel = this.calcButtonLabel();
    var menuItems = this.props.items.map(function (item) {
      var selected = _this2.isSelected(item);
      var itemLabel = item.label;
      if (item.customIconClass) {
        itemLabel = React.createElement(
          'span',
          null,
          item.label,
          ' ',
          React.createElement('span', { className: item.customIconClass })
        );
      }
      if (_this2.props.multiSelect) {
        return React.createElement(
          MenuItem,
          {
            eventKey: item.value,
            key: item.value,
            className: 'checkbox',
            componentClass: 'div'
          },
          React.createElement(
            Checkbox,
            { checked: selected },
            item.label
          )
        );
      }
      if (item.divider) {
        return React.createElement(MenuItem, { divider: true, key: item.value });
      }
      if (item.header) {
        return React.createElement(
          MenuItem,
          { header: true, key: item.value },
          itemLabel
        );
      }
      // Normal menu item
      var label = void 0;
      if (_this2.props.multiSelect) {
        label = React.createElement(
          Checkbox,
          { checked: selected },
          itemLabel
        );
      } else {
        label = selected ? React.createElement(
          'b',
          null,
          itemLabel
        ) : itemLabel;
      }
      return React.createElement(
        MenuItem,
        { eventKey: item.value, key: item.value },
        label
      );
    });

    var menuPrefix = this.props.multiSelect && this.props.selectAllNone ? React.createElement(
      MenuItem,
      {
        eventKey: 'allNone',
        key: 'allNone',
        className: 'checkbox',
        componentClass: 'div'
      },
      React.createElement(
        'ul',
        { className: 'attivio-dropdown-toolbar attivio-list-inline list-inline' },
        React.createElement(
          'li',
          null,
          'Check: ',
          React.createElement(
            'a',
            { onClick: this.selectAll, role: 'button', tabIndex: 0, ref: function ref(c) {
                _this2.selectAllLink = c;
              } },
            'All'
          )
        ),
        React.createElement(
          'li',
          null,
          React.createElement(
            'a',
            { onClick: this.selectNone, role: 'button', tabIndex: 0, ref: function ref(c) {
                _this2.selectNoneLink = c;
              } },
            'None'
          )
        )
      )
    ) : null;

    var classNames = this.props.block ? 'attivio-dropdown attivio-dropdown-block' : 'attivio-dropdown';

    return React.createElement(
      Dropdown,
      {
        id: 'myDropdown',
        className: classNames,
        onSelect: this.onSelect,
        componentClass: 'div',
        pullRight: this.props.right,
        style: this.props.width ? { width: this.props.width + 'px' } : {}
      },
      React.createElement(
        Dropdown.Toggle,
        {
          noCaret: true,
          useAnchor: true,
          className: 'attivio-smalltoolbar-btn',
          bsClass: 'attivio-smalltoolbar-btn',
          style: this.props.width ? { width: this.props.width + 'px' } : {}
        },
        React.createElement(
          'div',
          {
            style: this.props.width ? {
              // adjusted to fit the carot
              width: this.props.width - 40 + 'px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              float: 'left'
            } : { float: 'left' }
          },
          buttonLabel
        ),
        React.createElement('span', { className: 'attivio-icon-arrow-down' })
      ),
      React.createElement(
        Dropdown.Menu,
        {
          style: {
            paddingTop: 0,
            paddingBottom: 0
          }
        },
        menuPrefix,
        menuItems
      )
    );
  };

  return Menu;
}(React.Component), _class2.defaultProps = {
  selection: null,
  right: false,
  multiSelect: false,
  selectAllNone: null,
  block: false,
  promptLabel: null,
  allLabel: 'All',
  maxLabelCharacters: null,
  width: null
}, _temp);
export { Menu as default };


Menu.MenuItemDef = MenuItemDef;