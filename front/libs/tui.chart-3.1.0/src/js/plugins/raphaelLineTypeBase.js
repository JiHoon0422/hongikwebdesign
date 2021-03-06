/**
 * @fileoverview RaphaelLineTypeBase is base class for line type renderer.
 * @author NHN Ent.
 *         FE Development Lab <dl_javascript@nhnent.com>
 */

'use strict';

var raphaelRenderUtil = require('./raphaelRenderUtil');
var renderUtil = require('../helpers/renderUtil');
var snippet = require('tui-code-snippet');
var arrayUtil = require('../helpers/arrayUtil');

var browser = snippet.browser;
var IS_LTE_IE8 = browser.msie && browser.version <= 8;
var ANIMATION_DURATION = 700;
var DEFAULT_DOT_RADIUS = 6;
var SELECTION_DOT_RADIUS = 7;
var DE_EMPHASIS_OPACITY = 0.3;
var MOVING_ANIMATION_DURATION = 300;
var CHART_HOVER_STATUS_OVER = 'over';
var CHART_HOVER_STATUS_OUT = 'out';

var concat = Array.prototype.concat;

/**
 * @classdesc RaphaelLineTypeBase is base for line type renderer.
 * @class RaphaelLineTypeBase
 * @private
 */
var RaphaelLineTypeBase = snippet.defineClass(/** @lends RaphaelLineTypeBase.prototype */ {
    /**
     * Make lines path.
     * @param {Array.<{left: number, top: number, startTop: number}>} positions positions
     * @param {?string} [posTopType='top'] position top type
     * @param {boolean} [connectNulls] - boolean value connect nulls or not
     * @returns {Array.<string | number>} paths
     * @private
     */
    _makeLinesPath: function(positions, posTopType, connectNulls) {
        var path = [];
        var prevMissing = false;

        posTopType = posTopType || 'top';
        snippet.map(positions, function(position) {
            var pathCommand = (prevMissing && !connectNulls) ? 'M' : 'L';

            if (position) {
                path.push([pathCommand, position.left, position[posTopType]]);
                if (prevMissing) {
                    prevMissing = false;
                }
            } else {
                prevMissing = true;
            }
        });

        path = concat.apply([], path);

        if (path.length > 0) {
            path[0] = 'M';
        }

        return path;
    },

    /**
     * Get anchor. (http://raphaeljs.com/analytics.js)
     * @param {{left: number, top: number}} fromPos from position
     * @param {{left: number, top: number}} pos position
     * @param {{left: number, top: number}} nextPos next position
     * @param {?boolean} [isReverseDirection] - True when the line is drawn from right to left
     * @returns {{x1: number, y1: number, x2: number, y2: number}} anchor
     * @private
     */
    _getAnchor: function(fromPos, pos, nextPos, isReverseDirection) {
        var l1 = (pos.left - fromPos.left) / 2,
            l2 = (nextPos.left - pos.left) / 2,
            a, b, alpha, dx1, dy1, dx2, dy2, result;

        if (isReverseDirection) {
            a = Math.atan((fromPos.left - pos.left) / Math.abs(fromPos.top - pos.top));
            b = Math.atan((pos.left - nextPos.left) / Math.abs(nextPos.top - pos.top));
        } else {
            a = Math.atan((pos.left - fromPos.left) / Math.abs(pos.top - fromPos.top));
            b = Math.atan((nextPos.left - pos.left) / Math.abs(pos.top - nextPos.top));
        }

        a = fromPos.top < pos.top ? Math.PI - a : a;
        b = nextPos.top < pos.top ? Math.PI - b : b;
        alpha = (Math.PI / 2) - (((a + b) % (Math.PI * 2)) / 2);
        dx1 = l1 * Math.sin(alpha + a);
        dy1 = l1 * Math.cos(alpha + a);
        dx2 = l2 * Math.sin(alpha + b);
        dy2 = l2 * Math.cos(alpha + b);

        result = {
            x1: pos.left - dx1,
            y1: pos.top + dy1,
            x2: pos.left + dx2,
            y2: pos.top + dy2
        };

        if (isReverseDirection) {
            result.y1 = pos.top - dy1;
            result.y2 = pos.top - dy2;
        }

        return result;
    },

    /**
     * Get spline positions groups which is divided with null data value.
     * If series has not divided positions, it returns only one positions group.
     * @param {Array.<object>} positions positions array
     * @param {boolean} connectNulls option of connect line of both null data's side
     * @Returns {Array.<Array.<object>>}
     * @private
     */
    _getSplinePositionsGroups: function(positions, connectNulls) {
        var positionsGroups = [];
        var positionsGroup = [];
        snippet.forEach(positions, function(position, index) {
            var isLastIndex = index === positions.length - 1;

            if (position) {
                positionsGroup.push(position);
            }

            if ((!position && positionsGroup.length > 0 && !connectNulls) || isLastIndex) {
                positionsGroups.push(positionsGroup);
                positionsGroup = [];
            }
        });

        return positionsGroups;
    },

    /**
     * Get spline partial paths
     * @param {Array.<Array.<object>>} positionsGroups positions groups
     * @param {?boolean} [isReverseDirection] - True when the line is drawn from right to left
     * @returns {Array.<Array.<Array>>}
     * @private
     */
    _getSplinePartialPaths: function(positionsGroups, isReverseDirection) {
        var self = this;
        var paths = [];
        var firstPos, lastPos, positionsLen, fromPos, middlePositions, path, prevPos;

        snippet.forEach(positionsGroups, function(dataPositions) {
            prevPos = firstPos = dataPositions[0];
            positionsLen = dataPositions.length;
            fromPos = firstPos;
            lastPos = dataPositions[positionsLen - 1];
            middlePositions = dataPositions.slice(1).slice(0, positionsLen - 2);

            path = snippet.map(middlePositions, function(position, index) {
                var nextPos = dataPositions[index + 2];
                var anchor = self._getAnchor(fromPos, position, nextPos, isReverseDirection);

                fromPos = position;

                if (Math.abs(anchor.y1 - prevPos.top) > Math.abs(prevPos.top - position.top)) {
                    anchor.y1 = position.top;
                }

                if (Math.abs(anchor.y2 - nextPos.top) > Math.abs(nextPos.top - position.top)) {
                    anchor.y2 = position.top;
                }

                prevPos = position;

                return [anchor.x1, anchor.y1, position.left, position.top, anchor.x2, anchor.y2];
            });

            path.push([lastPos.left, lastPos.top, lastPos.left, lastPos.top]);
            path.unshift(['M', firstPos.left, firstPos.top, 'C', firstPos.left, firstPos.top]);
            paths.push(path);
        });

        return paths;
    },

    /**
     * Make spline lines path.
     * @param {Array.<{left: number, top: number, startTop: number}>} positions positions
     * @param {?object} [makeLineOptions] - options for make spline line
     *   @param {?boolean} [makeLineOptions.connectNulls] - boolean value connect nulls or not
     *   @param {?boolean} [makeLineOptions.isReverseDirection] - True when the line is drawn from right to left
     *   @param {?boolean} [makeLineOptions.isBeConnected] - True when part of another line.
     * @returns {Array.<string | number>} paths
     * @private
     */
    _makeSplineLinesPath: function(positions, makeLineOptions) {
        var path, positionsGroups, partialPaths;

        makeLineOptions = makeLineOptions || {};
        path = [];
        positionsGroups = this._getSplinePositionsGroups(positions, makeLineOptions.connectNulls);
        partialPaths = this._getSplinePartialPaths(positionsGroups, makeLineOptions.isReverseDirection);

        snippet.forEach(partialPaths, function(partialPath) {
            path = path.concat(partialPath);
        });

        if (makeLineOptions.isBeConnected) {
            path[0] = path[0].slice(3);
        }

        return path;
    },

    /**
     * Render tooltip line.
     * @param {object} paper raphael paper
     * @param {number} height height
     * @returns {object} raphael object
     * @private
     */
    _renderTooltipLine: function(paper, height) {
        var linePath = raphaelRenderUtil.makeLinePath({
            left: 10,
            top: height
        }, {
            left: 10,
            top: 0
        });

        return raphaelRenderUtil.renderLine(paper, linePath, 'transparent', 1);
    },

    appendShadowFilterToDefs: function() {
        var filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
        var feOffset = document.createElementNS('http://www.w3.org/2000/svg', 'feOffset');
        var feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
        var feBlend = document.createElementNS('http://www.w3.org/2000/svg', 'feBlend');

        filter.setAttributeNS(null, 'id', 'shadow');
        filter.setAttributeNS(null, 'x', '-50%');
        filter.setAttributeNS(null, 'y', '-50%');
        filter.setAttributeNS(null, 'width', '180%');
        filter.setAttributeNS(null, 'height', '180%');
        feOffset.setAttributeNS(null, 'result', 'offOut');
        feOffset.setAttributeNS(null, 'in', 'SourceAlpha');
        feOffset.setAttributeNS(null, 'dx', '0');
        feOffset.setAttributeNS(null, 'dy', '0');
        feGaussianBlur.setAttributeNS(null, 'result', 'blurOut');
        feGaussianBlur.setAttributeNS(null, 'in', 'offOut');
        feGaussianBlur.setAttributeNS(null, 'stdDeviation', '2');
        feBlend.setAttributeNS(null, 'in', 'SourceGraphic');
        feBlend.setAttributeNS(null, 'in2', 'blurOut');
        feBlend.setAttributeNS(null, 'mode', 'normal');
        filter.appendChild(feOffset);
        filter.appendChild(feGaussianBlur);
        filter.appendChild(feBlend);
        this.paper.defs.appendChild(filter);
    },

    /**
     * Make border style.
     * @param {string} borderColor border color
     * @param {number} opacity opacity
     * @param {number} borderWidth border width
     * @returns {{stroke: string, stroke-width: number, strike-opacity: number}} border style
     */
    makeBorderStyle: function(borderColor, opacity, borderWidth) {
        var borderStyle = {
            'stroke-width': borderWidth,
            'stroke-opacity': opacity
        };

        if (borderColor) {
            borderStyle.stroke = borderColor;
        }

        return borderStyle;
    },

    /**
     * Make dot style for mouseout event.
     * @param {number} opacity opacity
     * @param {object} borderStyle border style
     * @returns {{fill-opacity: number, stroke-opacity: number, r: number}} style
     */
    makeOutDotStyle: function(opacity, borderStyle) {
        var outDotStyle = {
            'fill-opacity': opacity,
            'stroke-opacity': opacity,
            r: DEFAULT_DOT_RADIUS
        };

        if (borderStyle) {
            snippet.extend(outDotStyle, borderStyle);
        }

        return outDotStyle;
    },

    /**
     * Render dot.
     * @param {object} paper raphael papaer
     * @param {{left: number, top: number}} position dot position
     * @param {string} color dot color
     * @param {number} opacity opacity
     * @returns {object} raphael dot
     */
    renderDot: function(paper, position, color, opacity) {
        var dotTheme = (this.theme && this.theme.dot) || {dot: {}};
        var dot, dotStyle, raphaelDot;

        if (position) {
            dot = paper.circle(
                position.left,
                position.top,
                (!snippet.isUndefined(dotTheme.radius)) ? dotTheme.radius : DEFAULT_DOT_RADIUS
            );
            dotStyle = {
                fill: dotTheme.fillColor || color,
                'fill-opacity': snippet.isNumber(opacity) ? opacity : dotTheme.fillOpacity,
                stroke: dotTheme.strokeColor || color,
                'stroke-opacity': snippet.isNumber(opacity) ? opacity : dotTheme.strokeOpacity,
                'stroke-width': dotTheme.strokeWidth
            };

            dot.attr(dotStyle);

            raphaelDot = {
                dot: dot,
                color: color
            };
        }

        return raphaelDot;
    },

    /**
     * Move dots to front.
     * @param {Array.<{startDot: {dot: object}, endDot: {dot: object}}>} dots - dots
     * @private
     */
    _moveDotsToFront: function(dots) {
        raphaelRenderUtil.forEach2dArray(dots, function(dotInfo) {
            dotInfo.endDot.dot.toFront();
            if (dotInfo.startDot) {
                dotInfo.startDot.dot.toFront();
            }
        });
    },

    /**
     * Render dots.
     * @param {object} paper raphael paper
     * @param {Array.<Array.<object>>} groupPositions positions
     * @param {string[]} colors colors
     * @param {number} opacity opacity
     * @param {Array.<object>} [seriesSet] series set
     * @returns {Array.<object>} dots
     * @private
     */
    _renderDots: function(paper, groupPositions, colors, opacity, seriesSet) {
        var self = this;
        var dots;

        dots = snippet.map(groupPositions, function(positions, groupIndex) {
            var color = colors[groupIndex];

            return snippet.map(positions, function(position) {
                var dotMap = {
                    endDot: self.renderDot(paper, position, color, opacity)
                };
                var startPosition;

                if (self.hasRangeData) {
                    startPosition = snippet.extend({}, position);
                    startPosition.top = startPosition.startTop;
                    dotMap.startDot = self.renderDot(paper, startPosition, color, opacity);
                }

                if (seriesSet) {
                    seriesSet.push(dotMap.endDot.dot);
                    if (dotMap.startDot) {
                        seriesSet.push(dotMap.startDot.dot);
                    }
                }

                return dotMap;
            });
        });

        return dots;
    },

    /**
     * Get center position
     * @param {{left: number, top: number}} fromPos from position
     * @param {{left: number, top: number}} toPos to position
     * @returns {{left: number, top: number}} position
     * @private
     */
    _getCenter: function(fromPos, toPos) {
        return {
            left: (fromPos.left + toPos.left) / 2,
            top: (fromPos.top + toPos.top) / 2
        };
    },

    /**
     * Show dot.
     * @param {object} dotInformation raphael object
     * @param {number} groupIndex seriesIndex
     * @private
     */
    _showDot: function(dotInformation, groupIndex) {
        var hoverTheme = this.theme.dot.hover;
        var attributes = {
            'fill-opacity': hoverTheme.fillOpacity,
            stroke: hoverTheme.strokeColor || dotInformation.color,
            'stroke-opacity': hoverTheme.strokeOpacity,
            'stroke-width': hoverTheme.strokeWidth,
            r: hoverTheme.radius,
            filter: 'url(#shadow)'
        };

        this._setPrevDotAttributes(groupIndex, dotInformation.dot);

        if (hoverTheme.fillColor) {
            attributes.fill = hoverTheme.fillColor;
        }

        dotInformation.dot.attr(attributes);
        if (dotInformation.dot.node) {
            dotInformation.dot.node.setAttribute('filter', 'url(#shadow)');
        }
        dotInformation.dot.toFront();
    },

    /**
     * temp save dot style attribute
     * @param {number} groupIndex seriesIndex
     * @param {object} dot raphael circle object
     * @private
     */
    _setPrevDotAttributes: function(groupIndex, dot) {
        if (!this._prevDotAttributes) {
            this._prevDotAttributes = {};
        }
        this._prevDotAttributes[groupIndex] = dot.attr();
    },

    /**
     * Update line stroke width.
     * @param {string} changeType over or out
     * @param {object} line raphael object
     * @private
     */
    _updateLineStrokeOpacity: function(changeType, line) {
        var opacity = 1;
        var isSelectedLegend = !snippet.isNull(this.selectedLegendIndex);
        if (this.groupLines) {
            if (changeType === CHART_HOVER_STATUS_OVER || isSelectedLegend) {
                opacity = (this.chartType === 'radial' && this.isShowArea) ? 0 : DE_EMPHASIS_OPACITY;
            }

            if (changeType === CHART_HOVER_STATUS_OUT && isSelectedLegend) {
                line = this.getLine(this.selectedLegendIndex);
            }

            snippet.forEachArray(this.groupLines, function(otherLine) {
                otherLine.attr({
                    'stroke-opacity': opacity
                });
            });
            line.attr({
                'stroke-opacity': 1
            });
        }
    },

    /**
     * Get the raphael line element with groupIndex
     * @param {number} groupIndex  group index
     * @returns {object} line raphael object
     */
    getLine: function(groupIndex) {
        return this.groupLines ? this.groupLines[groupIndex] : this.groupAreas[groupIndex];
    },

    /**
     * Update line stroke width.
     * @param {string} changeType over or out
     * @private
     */
    _updateAreaOpacity: function(changeType) {
        if (this.groupAreas) {
            snippet.forEach(this.groupAreas, function(otherArea) {
                otherArea.area.attr({
                    'fill-opacity': (changeType === CHART_HOVER_STATUS_OVER) ? DE_EMPHASIS_OPACITY : 1
                });
            });
        }
    },

    /**
     * Update line stroke width.
     * @param {object} line raphael object
     * @param {number} strokeWidth stroke width
     * @private
     */
    _updateLineStrokeWidth: function(line, strokeWidth) {
        var changeAttr = {
            'stroke-width': strokeWidth
        };
        if (line.attrs) {
            changeAttr.stroke = line.attrs.stroke;
        }
        line.attr(changeAttr);
    },

    /**
     * Show animation.
     * @param {{groupIndex: number, index:number}} data show info
     */
    showAnimation: function(data) {
        var index = data.groupIndex; // Line chart has pivot values.
        var groupIndex = data.index;
        var line = this.groupLines ? this.groupLines[groupIndex] : this.groupAreas[groupIndex];
        var item = this.groupDots[groupIndex][index];
        var strokeWidth, startLine;

        if (!item) {
            return;
        }

        if (this.chartType === 'area') {
            strokeWidth = 5;
            startLine = line.startLine;
            this._updateAreaOpacity(CHART_HOVER_STATUS_OVER);
            line = line.line;
        } else {
            strokeWidth = this.lineWidth;
        }

        this._updateLineStrokeOpacity(CHART_HOVER_STATUS_OVER, line);
        this._updateLineStrokeWidth(line, strokeWidth);
        if (startLine) {
            this._updateLineStrokeWidth(startLine, strokeWidth);
        }

        this._showDot(item.endDot, groupIndex);

        if (item.startDot) {
            this._showDot(item.startDot, groupIndex);
        }
    },

    /**
     * Get pivot group dots.
     * @returns {Array.<Array>} dots
     * @private
     */
    _getPivotGroupDots: function() {
        if (!this.pivotGroupDots && this.groupDots) {
            this.pivotGroupDots = arrayUtil.pivot(this.groupDots);
        }

        return this.pivotGroupDots;
    },

    /**
     * Show group dots.
     * @param {number} index index
     * @private
     */
    _showGroupDots: function(index) {
        var self = this;
        var groupDots = this._getPivotGroupDots();

        if (!groupDots || !groupDots[index]) {
            return;
        }

        snippet.forEachArray(groupDots[index], function(item, groupIndex) {
            if (item.endDot) {
                self._showDot(item.endDot, groupIndex);
            }

            if (item.startDot) {
                self._showDot(item.startDot, groupIndex);
            }
        });
    },

    /**
     * Show line for group tooltip.
     * @param {{
     *      dimension: {width: number, height: number},
     *      position: {left: number, top: number}
     * }} bound bound
     * @param {object} layout layout
     */
    showGroupTooltipLine: function(bound, layout) {
        var left = Math.max(bound.position.left, 11);
        var linePath = raphaelRenderUtil.makeLinePath({
            left: left,
            top: layout.position.top + bound.dimension.height
        }, {
            left: left,
            top: layout.position.top
        });

        if (this.tooltipLine) {
            this.tooltipLine.attr({
                path: linePath,
                stroke: '#999',
                'stroke-opacity': 1
            });
        }
    },

    /**
     * Show group animation.
     * @param {number} index index
     */
    showGroupAnimation: function(index) {
        this._showGroupDots(index);
    },

    /**
     * Hide dot.
     * @param {object} dot raphael object
     * @param {number} groupIndex seriesIndex
     * @param {?number} opacity opacity
     * @private
     */
    _hideDot: function(dot, groupIndex, opacity) {
        var prev = this._prevDotAttributes[groupIndex];
        var outDotStyle = this.outDotStyle;

        // if prev data exists, use prev.r
        // there is dot disappearing issue, when hideDot
        if (prev && !snippet.isUndefined(opacity)) {
            outDotStyle = snippet.extend({
                'r': prev.r,
                'stroke': prev.stroke,
                'fill': prev.fill,
                'stroke-opacity': prev['stroke-opacity'],
                'stroke-width': prev['stroke-width'],
                'fill-opacity': prev['fill-opacity']
            });
        }

        dot.attr(outDotStyle);
        if (dot.node) {
            dot.node.setAttribute('filter', '');
        }

        this.resetSeriesOrder(groupIndex);
    },

    /**
     * Hide animation.
     * @param {{groupIndex: number, index:number}} data hide info
     */
    hideAnimation: function(data) {
        var index = data.groupIndex; // Line chart has pivot values.
        var groupIndex = data.index;
        var opacity = this.dotOpacity;
        var groupDot = this.groupDots[groupIndex];
        var line, item, strokeWidth, startLine;

        if (!groupDot || !groupDot[index]) {
            return;
        }

        line = this.groupLines ? this.groupLines[groupIndex] : this.groupAreas[groupIndex];
        item = groupDot[index];

        if (this.chartType === 'area') {
            strokeWidth = this.lineWidth;
            startLine = line.startLine;
            line = line.line;
            this._updateAreaOpacity(CHART_HOVER_STATUS_OUT);
        } else {
            strokeWidth = this.lineWidth;
        }

        if (opacity && !snippet.isNull(this.selectedLegendIndex) && this.selectedLegendIndex !== groupIndex) {
            opacity = DE_EMPHASIS_OPACITY;
        }

        this._updateLineStrokeOpacity(CHART_HOVER_STATUS_OUT, line);
        this._updateLineStrokeWidth(line, strokeWidth);

        if (startLine) {
            this._updateLineStrokeWidth(startLine, strokeWidth);
        }

        if (item) {
            this._hideDot(item.endDot.dot, groupIndex, opacity);

            if (item.startDot) {
                this._hideDot(item.startDot.dot, groupIndex, opacity);
            }
        }
    },

    /**
     * Hide group dots.
     * @param {number} index index
     * @private
     */
    _hideGroupDots: function(index) {
        var self = this;
        var hasSelectedIndex = !snippet.isNull(this.selectedLegendIndex);
        var baseOpacity = this.dotOpacity;
        var groupDots = this._getPivotGroupDots();

        if (!groupDots || !groupDots[index]) {
            return;
        }

        snippet.forEachArray(groupDots[index], function(item, groupIndex) {
            var opacity = baseOpacity;

            if (opacity && hasSelectedIndex && self.selectedLegendIndex !== groupIndex) {
                opacity = DE_EMPHASIS_OPACITY;
            }

            if (item.endDot) {
                self._hideDot(item.endDot.dot, groupIndex, opacity);
            }

            if (item.startDot) {
                self._hideDot(item.startDot.dot, groupIndex, opacity);
            }
        });
    },

    /**
     * Hide line for group tooltip.
     */
    hideGroupTooltipLine: function() {
        this.tooltipLine.attr({
            'stroke-opacity': 0
        });
    },

    /**
     * Hide group animation.
     * @param {number} index index
     */
    hideGroupAnimation: function(index) {
        this._hideGroupDots(index);
    },

    /**
     * Move dot.
     * @param {object} dot - raphael object
     * @param {{left: number, top: number}} position - position
     * @private
     */
    _moveDot: function(dot, position) {
        var dotAttrs = {
            cx: position.left,
            cy: position.top
        };

        if (this.dotOpacity) {
            dotAttrs = snippet.extend({'fill-opacity': this.dotOpacity}, dotAttrs, this.borderStyle);
        }

        dot.attr(dotAttrs);
    },

    /**
     * Animate.
     * @param {function} onFinish callback
     * @param {Array.<object>} seriesSet series set
     */
    animate: function(onFinish, seriesSet) {
        var paper = this.paper;
        var dimension = this.dimension;
        var position = this.position;
        var clipRect = this.clipRect;
        var clipRectId = this._getClipRectId();

        if (!IS_LTE_IE8 && dimension) {
            if (!clipRect) {
                clipRect = createClipPathRectWithLayout(paper, position, dimension, clipRectId);
                this.clipRect = clipRect;
            } else {
                clipRect.attr({
                    width: 0,
                    height: dimension.height
                });
            }

            seriesSet.forEach(function(seriesElement) {
                seriesElement.node.setAttribute('clip-path', 'url(#' + clipRectId + ')');
            });

            clipRect.animate({
                width: dimension.width
            }, ANIMATION_DURATION, '>', onFinish);
        }
    },

    /**
     * Make selection dot.
     * @param {object} paper raphael paper
     * @returns {object} selection dot
     * @private
     */
    _makeSelectionDot: function(paper) {
        var selectionDot = paper.circle(0, 0, SELECTION_DOT_RADIUS);

        selectionDot.attr({
            'fill': '#ffffff',
            'fill-opacity': 0,
            'stroke-opacity': 0,
            'stroke-width': 2
        });

        return selectionDot;
    },

    /**
     * Select series.
     * @param {{groupIndex: number, index: number}} indexes indexes
     */
    selectSeries: function(indexes) {
        var item = this.groupDots[indexes.index][indexes.groupIndex],
            position = this.groupPositions[indexes.index][indexes.groupIndex];

        this.selectedItem = item;
        this.selectionDot.attr({
            cx: position.left,
            cy: position.top,
            'fill-opacity': 0.5,
            'stroke-opacity': 1,
            stroke: this.selectionColor || item.endDot.color
        });

        if (this.selectionStartDot) {
            this.selectionStartDot.attr({
                cx: position.left,
                cy: position.startTop,
                'fill-opacity': 0.5,
                'stroke-opacity': 1,
                stroke: this.selectionColor || item.startDot.color
            });
        }
    },

    /**
     * Unselect series.
     * @param {{groupIndex: number, index: number}} indexes indexes
     */
    unselectSeries: function(indexes) {
        var item = this.groupDots[indexes.index][indexes.groupIndex];

        if (this.selectedItem === item) {
            this.selectionDot.attr({
                'fill-opacity': 0,
                'stroke-opacity': 0
            });
        }

        if (this.selectionStartDot) {
            this.selectionStartDot.attr({
                'fill-opacity': 0,
                'stroke-opacity': 0
            });
        }
    },

    /**
     * Set width or height of paper.
     * @param {number} width - width
     * @param {number} height - height
     */
    setSize: function(width, height) {
        width = width || this.dimension.width;
        height = height || this.dimension.height;
        this.paper.setSize(width, height);
    },

    /**
     * Animate by position.
     * @param {object} raphaelObj - raphael object
     * @param {{left: number, top: number}} position - position
     * @param {number} tickSize tick size
     * @private
     */
    _animateByPosition: function(raphaelObj, position, tickSize) {
        var attr = {
            cx: position.left,
            cy: position.top
        };

        if (snippet.isExisty(tickSize)) {
            attr.transform = 't-' + tickSize + ',0';
        }

        raphaelObj.animate(attr, MOVING_ANIMATION_DURATION);
    },

    /**
     * Animate by path.
     * @param {object} raphaelObj - raphael object
     * @param {Array.<string | number>} paths - paths
     * @param {number} tickSize tick size
     * @private
     */
    _animateByPath: function(raphaelObj, paths, tickSize) {
        var attr = {
            path: paths.join(' ')
        };

        if (snippet.isExisty(tickSize)) {
            attr.transform = 't-' + tickSize + ',0';
        }

        raphaelObj.animate(attr, MOVING_ANIMATION_DURATION);
    },

    /**
     * Remove first dot.
     * @param {Array.<object>} dots - dots
     * @private
     */
    _removeFirstDot: function(dots) {
        var firstDot = dots.shift();

        firstDot.endDot.dot.remove();

        if (firstDot.startDot) {
            firstDot.startDot.dot.remove();
        }
    },

    /**
     * Clear paper.
     */
    clear: function() {
        delete this.paper.dots;
        this.paper.clear();
    },

    /**
     * Resize clip rect size
     * @param {number} width series width
     * @param {number} height series height
     */
    resizeClipRect: function(width, height) {
        var clipRect = this.paper.getById(this._getClipRectId() + '_rect');

        clipRect.attr({
            width: width,
            height: height
        });
    },

    /**
     * Set clip rect id
     * @returns {string} id - clip rect id
     * @private
     */
    _getClipRectId: function() {
        if (!this.clipRectId) {
            this.clipRectId = renderUtil.generateClipRectId();
        }

        return this.clipRectId;
    },

    /**
     * Reset series order after selected to be same to when it is first rendered
     * @param {number} legendIndex - legend index to reset series order
     * @ignore
     * @abstract
     */
    resetSeriesOrder: function() {},

    /**
     * @param {SVGElement | {area: {SVGElement}, line: {SVGElement}, startLine: {SVGElement}}} lineType - line or area graph
     * @param {Array.<SVGElement>} dots - dot type element
     * @abstract
     */
    moveSeriesToFront: function() {}
});

/**
 * Create clip rect with layout
 * @param {object} paper Raphael paper
 * @param {object} position position
 * @param {object} dimension dimension
 * @param {string} id ID string
 * @returns {object}
 * @ignore
 */
function createClipPathRectWithLayout(paper, position, dimension, id) {
    var clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
    var rect = paper.rect((position.left - 10), (position.top - 10), 0, dimension.height);

    rect.id = id + '_rect';
    clipPath.id = id;

    clipPath.appendChild(rect.node);
    paper.defs.appendChild(clipPath);

    return rect;
}

module.exports = RaphaelLineTypeBase;
