'use strict';

exports.__esModule = true;
exports.default = exports.MenuItemDef = undefined;

var _class2, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Checkbox = require('react-bootstrap/lib/Checkbox');

var _Checkbox2 = _interopRequireDefault(_Checkbox);

var _Dropdown = require('react-bootstrap/lib/Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _MenuItem = require('react-bootstrap/lib/MenuItem');

var _MenuItem2 = _interopRequireDefault(_MenuItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class for defining each individual menu item to be
 * displayed in the Menu component.
 */
var MenuItemDef =
/**
 * If true, this item is an un-clickable header (headers must
 * still have a value set so they can be deemed unique by React)
 */

/** If true, this item shows up as a divider */

/** The label displayed to the user */
exports.MenuItemDef = function MenuItemDef(label, value) {
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
        return _react2.default.createElement(
          'span',
          null,
          valueItem.label,
          ' ',
          _react2.default.createElement('span', { className: valueItem.customIconClass })
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
      result = _react2.default.createElement(
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

    var buttonLabelPrefix = this.props.block && this.props.selection ? _react2.default.createElement(
      'span',
      null,
      _react2.default.createElement('span', {
        className: 'attivio-model-dot',
        style: { backgroundColor: '#f1c541' }
      }),
      ' '
    ) : null;

    var buttonLabel = _react2.default.createElement(
      'span',
      null,
      buttonLabelPrefix,
      this.props.label,
      ' ',
      _react2.default.createElement(
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
        itemLabel = _react2.default.createElement(
          'span',
          null,
          item.label,
          ' ',
          _react2.default.createElement('span', { className: item.customIconClass })
        );
      }
      if (_this2.props.multiSelect) {
        return _react2.default.createElement(
          _MenuItem2.default,
          {
            eventKey: item.value,
            key: item.value,
            className: 'checkbox',
            componentClass: 'div'
          },
          _react2.default.createElement(
            _Checkbox2.default,
            { checked: selected },
            item.label
          )
        );
      }
      if (item.divider) {
        return _react2.default.createElement(_MenuItem2.default, { divider: true, key: item.value });
      }
      if (item.header) {
        return _react2.default.createElement(
          _MenuItem2.default,
          { header: true, key: item.value },
          itemLabel
        );
      }
      // Normal menu item
      var label = void 0;
      if (_this2.props.multiSelect) {
        label = _react2.default.createElement(
          _Checkbox2.default,
          { checked: selected },
          itemLabel
        );
      } else {
        label = selected ? _react2.default.createElement(
          'b',
          null,
          itemLabel
        ) : itemLabel;
      }
      return _react2.default.createElement(
        _MenuItem2.default,
        { eventKey: item.value, key: item.value },
        label
      );
    });

    var menuPrefix = this.props.multiSelect && this.props.selectAllNone ? _react2.default.createElement(
      _MenuItem2.default,
      {
        eventKey: 'allNone',
        key: 'allNone',
        className: 'checkbox',
        componentClass: 'div'
      },
      _react2.default.createElement(
        'ul',
        { className: 'attivio-dropdown-toolbar attivio-list-inline list-inline' },
        _react2.default.createElement(
          'li',
          null,
          'Check: ',
          _react2.default.createElement(
            'a',
            { onClick: this.selectAll, role: 'button', tabIndex: 0, ref: function ref(c) {
                _this2.selectAllLink = c;
              } },
            'All'
          )
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
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

    return _react2.default.createElement(
      _Dropdown2.default,
      {
        id: 'myDropdown',
        className: classNames,
        onSelect: this.onSelect,
        componentClass: 'div',
        pullRight: this.props.right,
        style: this.props.width ? { width: this.props.width + 'px' } : {}
      },
      _react2.default.createElement(
        _Dropdown2.default.Toggle,
        {
          noCaret: true,
          useAnchor: true,
          className: 'attivio-smalltoolbar-btn',
          bsClass: 'attivio-smalltoolbar-btn',
          style: this.props.width ? { width: this.props.width + 'px' } : {}
        },
        _react2.default.createElement(
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
        _react2.default.createElement('span', { className: 'attivio-icon-arrow-down' })
      ),
      _react2.default.createElement(
        _Dropdown2.default.Menu,
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
}(_react2.default.Component), _class2.defaultProps = {
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
exports.default = Menu;


Menu.MenuItemDef = MenuItemDef;