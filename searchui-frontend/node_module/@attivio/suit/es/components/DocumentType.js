var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

/**
 * Display the type of the document and its position within the search results.
 */
var DocumentType = (_temp = _class = function (_React$Component) {
  _inherits(DocumentType, _React$Component);

  function DocumentType() {
    _classCallCheck(this, DocumentType);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DocumentType.prototype.getDocType = function getDocType() {
    if (this.props.docType && this.props.docType.length > 0) {
      return this.props.docType;
    }
    return 'Document';
  };

  DocumentType.prototype.render = function render() {
    var type = this.getDocType();
    return React.createElement(
      'a',
      { className: 'attivio-category' },
      React.createElement(
        'span',
        { className: 'attivio-category-count' },
        this.props.position
      ),
      React.createElement(
        'span',
        { className: 'attivio-category-label' },
        type
      )
    );
  };

  return DocumentType;
}(React.Component), _class.defaultProps = {
  docType: 'Document'
}, _temp);
export { DocumentType as default };