function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';

/**
 * A functional wrapper component that uses the configuration properties in
 * place of any null | undefined values in the props of the wrapped component.
 *
 * @param {*} WrappedComponent
 */
function Configurable(WrappedComponent) {
  var _class, _temp;

  return _temp = _class = function (_React$Component) {
    _inherits(_class, _React$Component);

    function _class(props) {
      _classCallCheck(this, _class);

      var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

      _this.state = {
        filled: false,
        props: props
      };
      return _this;
    }

    _class.prototype.componentDidMount = function componentDidMount() {
      this.fillWithDefaults(this.props);
    };

    _class.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
      this.fillWithDefaults(nextProps);
    };

    _class.prototype.fillWithDefaults = function fillWithDefaults(props) {
      var _this2 = this;

      var propKeys = Object.keys(Object.assign({}, WrappedComponent.defaultProps || {}, props));
      var filled = Object.assign({}, props);
      if (this.context && this.context.configuration) {
        propKeys.forEach(function (property) {
          filled[property] = _this2.context.configuration.get(WrappedComponent.name, property, props[property]);
        });
      }
      this.setState({
        filled: true,
        props: filled
      });
    };

    _class.prototype.render = function render() {
      if (this.state.filled) {
        return React.createElement(WrappedComponent, this.state.props);
      }
      return React.createElement('div', null);
    };

    return _class;
  }(React.Component), _class.contextTypes = {
    configuration: PropTypes.any
  }, _temp;
}

export default Configurable;