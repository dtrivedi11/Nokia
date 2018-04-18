function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Enum } from 'enumify';

var DocumentMode = function (_Enum) {
  _inherits(DocumentMode, _Enum);

  function DocumentMode() {
    _classCallCheck(this, DocumentMode);

    return _possibleConstructorReturn(this, _Enum.apply(this, arguments));
  }

  return DocumentMode;
}(Enum);

export { DocumentMode as default };


DocumentMode.initEnum([
/** Add a document to the index. (implies a delete of any existing documents with the same ID prior to adding) */
'ADD',

/** Delete a document from the index. */
'DELETE',

/**
 * Update a document, adding in fields, retaining values for fields not contained in update document.
 * <p>
 * The exact semantics are engine dependent as some may only work on real time fields while others may work on any field in the
 * document.
 */
'PARTIAL',

/**
 * Update a document, uniquely appending values to multi-value fields.
 * <p>
 * NOTE: This operation will only affect multi-value fields. Any updates to single value fields will be ignored.
 */
'PARTIAL_APPEND_VALUES',

/**
 * Update a document, removing matching values from multi-value fields.
 * <p>
 * Fields in this update act as a blacklist, filtering multi-value fields in the previously indexed document.
 * <p>
 * NOTE: This operation will only affect multi-value fields. Any updates to single value fields will be ignored.
 */
'PARTIAL_REMOVE_VALUES',

/**
 * Create a document in the index. (does not imply delete of document prior to add)
 * <p>
 * This document mode should only be used during an initial feed of the index or in situations where the same document will
 * never be feed twice. If the same document is added with this mode twice, the document will occur in the index twice.
 */
'CREATE']);