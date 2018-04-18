"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 *  A query placement from a Business Center profile/campaign.
 */
var Placement = function Placement(label, linkUrl, linkText, imageUrl, markup) {
  _classCallCheck(this, Placement);

  this.label = label;
  this.linkUrl = linkUrl;
  this.linkText = linkText;
  this.imageUrl = imageUrl;
  this.markup = markup;
}

/**
 * The descriptive label for this placement.
 * This label is used for placement purposes and will typically have a value
 * of "top", "left", etc.
 */

/** The address of the link. Optional. */

/** The anchortext of the link. Optional. */

/** The address of an image to display. Optional. */

/** The raw html markup to display. Optional. */
;

exports.default = Placement;
module.exports = exports["default"];