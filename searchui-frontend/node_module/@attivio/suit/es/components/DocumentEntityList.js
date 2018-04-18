function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// @Flow
import React from 'react';

import SearchDocument from '../api/SearchDocument';
import FieldNames from '../api/FieldNames';
import DataPairs, { DataPairInfo } from './DataPairs';
import DateUtils from '../util/DateUtils';
import DateFormat from '../util/DateFormat';

var DocumentEntityList = function (_React$Component) {
  _inherits(DocumentEntityList, _React$Component);

  function DocumentEntityList() {
    _classCallCheck(this, DocumentEntityList);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  DocumentEntityList.prototype.getEntityValues = function getEntityValues(doc) {
    var result = [];
    this.props.entityFields.forEach(function (fieldLabel, fieldName) {
      var values = doc.getAllValues(fieldName);
      if (values && values.length > 0) {
        var valueString = values.join(', ');
        var dataPair = new DataPairInfo(fieldLabel, valueString, fieldName);
        result.push(dataPair);
      }
    });
    return result;
  };

  DocumentEntityList.prototype.render = function render() {
    var dataPairs = this.getEntityValues(this.props.doc);
    var date = this.props.doc.getFirstValue(FieldNames.DATE);
    if (date) {
      // If date is already there, then remove it before adding it on our own.
      dataPairs = dataPairs.filter(function (dataPair) {
        return dataPair.type !== FieldNames.DATE;
      });
      var dateString = DateUtils.formatDateString(date, DateFormat.LONG_DATE);
      // We always want the date to come first
      dataPairs.unshift(new DataPairInfo('Date', dateString));
    }
    return React.createElement(DataPairs, { pairs: dataPairs });
  };

  return DocumentEntityList;
}(React.Component);

export { DocumentEntityList as default };