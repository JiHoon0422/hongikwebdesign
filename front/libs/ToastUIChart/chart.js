/*!
 * @fileoverview tui.chart
 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
 * @version 2.6.2
 * @license MIT
 * @link https://github.com/nhnent/tui.chart
 * bundle created at "Fri Dec 30 2016 11:19:56 GMT+0900 (KST)"
 */
/******/
(function( modules ){ // webpackBootstrap
	/******/ 	// The module cache
	/******/
	var installedModules={};
	/******/ 	// The require function
	/******/
	function __webpack_require__ ( moduleId ){
		
		/******/ 		// Check if module is in cache
		/******/
		if( installedModules[moduleId] )
		/******/            return installedModules[moduleId].exports;
		/******/ 		// Create a new module (and put it into the cache)
		/******/
		var module=installedModules[moduleId]={
			/******/            exports:{},
			/******/            id:moduleId,
			/******/            loaded:false
			/******/
		};
		/******/ 		// Execute the module function
		/******/
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		/******/ 		// Flag the module as loaded
		/******/
		module.loaded=true;
		/******/ 		// Return the exports of the module
		/******/
		return module.exports;
		/******/
	}
	
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/
	__webpack_require__.m=modules;
	/******/ 	// expose the module cache
	/******/
	__webpack_require__.c=installedModules;
	/******/ 	// __webpack_public_path__
	/******/
	__webpack_require__.p="/dist/";
	/******/ 	// Load entry module and return exports
	/******/
	return __webpack_require__(0);
	/******/
})
/************************************************************************/
/******/([
	/* 0 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview chart.js is entry point of Toast UI Chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var chartFactory=__webpack_require__(3);
		var pluginFactory=__webpack_require__(7);
		var themeManager=__webpack_require__(8);
		var mapManager=__webpack_require__(10);
		var objectUtil=__webpack_require__(11);
		var seriesDataImporter=__webpack_require__(12);
		__webpack_require__(13);
		__webpack_require__(15);
		__webpack_require__(16);
		__webpack_require__(119);
		/**
		 * Raw series datum.
		 * @typedef {{name: ?string, data: Array.<number>, stack: ?string}} rawSeriesDatum
		 */
		/**
		 * Raw series data.
		 * @typedef {Array.<rawSeriesDatum>} rawSeriesData
		 */
		/**
		 * Raw data.
		 * @typedef {{
	 *      categories: ?Array.<string>,
	 *      series: (rawSeriesData|{line: ?rawSeriesData, column: ?rawSeriesData})
	 * }} rawData
		 */
		/**
		 * NHN Entertainment Toast UI Chart.
		 * @namespace tui.chart
		 */
		tui.util.defineNamespace('tui.chart');
		/**
		 * Create chart.
		 * @param {HTMLElement} container container
		 * @param {({
	 *        series: (object|Array),
	 *        categories: Array
	 *   }|{
	 *        table: ({
	 *          elementId: string
	 *        }|{
	 *          element: HTMLElement
	 *        })
	 *   })} rawData - raw data object or data container table element or table's id
		 * @param {{
	 *   chart: {
	 *     width: number,
	 *     height: number,
	 *     title: string,
	 *     format: string
	 *   },
	 *   yAxis: {
	 *     title: string,
	 *     min: number
	 *   },
	 *   xAxis: {
	 *     title: string,
	 *     min: number
	 *   },
	 *   tooltip: {
	 *     suffix: string,
	 *     template: function
	 *   },
	 *   theme: string
	 * }} options - chart options
		 * @param {string} chartType - chart type
		 * @returns {object} chart instance.
		 * @private
		 * @ignore
		 */
		function _createChart ( container, rawData, options, chartType ){
			var themeName, theme, chart, temp;
			if( rawData ){
				if( rawData.table ){
					rawData=seriesDataImporter.makeDataWithTable(rawData.table);
				}
				if( rawData.series ){
					rawData=objectUtil.deepCopy(rawData);
					if( chartType!=='combo' ){
						temp=rawData.series;
						rawData.series={};
						rawData.series[chartType]=temp;
					}
					options=options ? objectUtil.deepCopy(options) : {};
					options.chartType=chartType;
					themeName=options.theme || chartConst.DEFAULT_THEME_NAME;
					theme=themeManager.get(themeName, chartType, rawData.series);
					chart=chartFactory.get(options.chartType, rawData, theme, options);
					container.appendChild(chart.render());
					chart.animateChart();
				}
			}
			return chart;
		}
		
		/**
		 * Bar chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {Array.<string>} rawData.categories - categories
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.yAxis - options for y axis component
		 *          @param {string | object} options.yAxis.title - title text or title object
		 *              @param {string} options.yAxis.title.text - title text
		 *              @param {number} options.yAxis.title.offsetX - title offset x
		 *              @param {number} options.yAxis.title.offsetY - title offset y
		 *          @param {string} options.yAxis.align - align option for center y axis
		 *          @param {boolean} options.yAxis.rotateTitle - whether rotate title or not (default: true)
		 *          @param {string} options.yAxis.type - type of axis
		 *          @param {string} options.yAxis.dateFormat - date format
		 *      @param {object} options.xAxis - options for x axis component
		 *          @param {string | object} options.xAxis.title - title text or title object
		 *              @param {string} options.xAxis.title.text - title text
		 *              @param {number} options.xAxis.title.offsetX - title offset x
		 *              @param {number} options.xAxis.title.offsetY - title offset y
		 *          @param {number} options.xAxis.min - minimum value for x axis
		 *          @param {number} options.xAxis.max - maximum value for x axis
		 *      @param {object} options.series - options for series component
		 *          @param {string} options.series.stackType - type of stack
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *          @param {number} options.series.barWidth - bar width
		 *          @param {boolean} options.series.allowSelect - whether allow select or not
		 *          @param {boolean} options.series.diverging - whether diverging or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offsetX - tooltip offset x
		 *          @param {object} options.tooltip.offsetY - tooltip offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *          @param {boolean} options.tooltip.grouped - whether group tooltip or not
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left)
		 *          @param {boolean} options.legend.showCheckbox - whether show checkbox or not (default: true)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {object} options.plot - options for plot component
		 *          @param {boolean} options.plot.showLine - whether show line or not (default: true)
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} bar chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       categories: ['cate1', 'cate2', 'cate3'],
	 *       series: [
	 *         {
	 *           name: 'Legend1',
	 *           data: [20, 30, 50]
	 *         },
	 *         {
	 *           name: 'Legend2',
	 *           data: [40, 40, 60]
	 *         },
	 *         {
	 *           name: 'Legend3',
	 *           data: [60, 50, 10]
	 *         },
	 *         {
	 *           name: 'Legend4',
	 *           data: [80, 10, 70]
	 *         }
	 *       ]
	 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Bar Chart'
	 *       },
	 *       yAxis: {
	 *         title: 'Y Axis'
	 *       },
	 *       xAxis: {
	 *         title: 'X Axis'
	 *       }
	 *     };
		 * tui.chart.barChart(container, rawData, options);
		 */
		tui.chart.barChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_BAR);
		};
		/**
		 * Column chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {Array.<string>} rawData.categories - categories
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.yAxis - options for y axis component
		 *          @param {string | object} options.yAxis.title - title text or title object
		 *              @param {string} options.yAxis.title.text - title text
		 *              @param {number} options.yAxis.title.offsetX - title offset x
		 *              @param {number} options.yAxis.title.offsetY - title offset y
		 *          @param {number} options.yAxis.min - minimum value for y axis
		 *          @param {number} options.yAxis.max - maximum value for y axis
		 *          @param {boolean} options.yAxis.rotateTitle - whether rotate title or not (default: true)
		 *      @param {object} options.xAxis - options for x axis component
		 *          @param {string | object} options.xAxis.title - title text or title object
		 *              @param {string} options.xAxis.title.text - title text
		 *              @param {number} options.xAxis.title.offsetX - title offset x
		 *              @param {number} options.xAxis.title.offsetY - title offset y
		 *          @param {number} options.xAxis.labelInterval - label interval for x axis
		 *          @param {boolean} options.xAxis.rotateLabel - whether rotate label or not (default: true)
		 *          @param {string} options.xAxis.type - type of axis
		 *          @param {string} options.xAxis.dateFormat - date format
		 *      @param {object} options.series - options for series component
		 *          @param {string} options.series.stackType - type of stack
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *          @param {number} options.series.barWidth - bar width
		 *          @param {boolean} options.series.allowSelect - whether allow select or not
		 *          @param {boolean} options.series.diverging - whether diverging or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offsetX - tooltip offset x
		 *          @param {object} options.tooltip.offsetY - tooltip offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *          @param {boolean} options.tooltip.grouped - whether group tooltip or not
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left)
		 *          @param {boolean} options.legend.showCheckbox - whether show checkbox or not (default: true)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {object} options.plot - options for plot component
		 *          @param {boolean} options.plot.showLine - whether show line or not (default: true)
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} column chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       categories: ['cate1', 'cate2', 'cate3'],
	 *       series: [
	 *         {
	 *           name: 'Legend1',
	 *           data: [20, 30, 50]
	 *         },
	 *         {
	 *           name: 'Legend2',
	 *           data: [40, 40, 60]
	 *         },
	 *         {
	 *           name: 'Legend3',
	 *           data: [60, 50, 10]
	 *         },
	 *         {
	 *           name: 'Legend4',
	 *           data: [80, 10, 70]
	 *         }
	 *       ]
	 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Column Chart'
	 *       },
	 *       yAxis: {
	 *         title: 'Y Axis'
	 *       },
	 *       xAxis: {
	 *         title: 'X Axis'
	 *       }
	 *     };
		 * tui.chart.columnChart(container, rawData, options);
		 */
		tui.chart.columnChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_COLUMN);
		};
		/**
		 * Line chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {?Array.<string>} rawData.categories - categories
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.yAxis - options for y axis component
		 *          @param {string | object} options.yAxis.title - title text or title object
		 *              @param {string} options.yAxis.title.text - title text
		 *              @param {number} options.yAxis.title.offsetX - title offset x
		 *              @param {number} options.yAxis.title.offsetY - title offset y
		 *          @param {number} options.yAxis.min - minimum value for y axis
		 *          @param {number} options.yAxis.max - maximum value for y axis
		 *          @param {boolean} options.yAxis.rotateTitle - whether rotate title or not (default: true)
		 *      @param {object} options.xAxis - options for x axis component
		 *          @param {string | object} options.xAxis.title - title text or title object
		 *              @param {string} options.xAxis.title.text - title text
		 *              @param {number} options.xAxis.title.offsetX - title offset x
		 *              @param {number} options.xAxis.title.offsetY - title offset y
		 *          @param {number} options.xAxis.labelInterval - label interval for x axis
		 *          @param {string} options.xAxis.tickInterval - tick interval for x axis
		 *          @param {boolean} options.xAxis.rotateLabel - whether rotate label or not (default: true)
		 *          @param {string} options.xAxis.type - type of axis
		 *          @param {string} options.xAxis.dateFormat - date format
		 *      @param {object} options.series - options for series component
		 *          @param {boolean} options.series.showDot - whether show dot or not
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *          @param {boolean} options.series.allowSelect - whether allow select or not
		 *          @param {boolean} options.series.spline - whether spline or not
		 *          @param {boolean} options.series.zoomable - whether zoomable or not
		 *          @param {boolean} options.series.shifting - whether shifting or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offsetX - tooltip offset x
		 *          @param {object} options.tooltip.offsetY - tooltip offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *          @param {boolean} options.tooltip.grouped - whether group tooltip or not
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left)
		 *          @param {boolean} options.legend.showCheckbox - whether show checkbox or not (default: true)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {object} options.plot - options for plot component
		 *          @param {boolean} options.plot.showLine - whether show line or not (default: true)
		 *          @param {Array} options.plot.bands - plot bands
		 *              @param {Array.<string|number|date>} options.plot.bands.range - value range for matching
		 *              @param {string} options.plot.bands.color - band color
		 *              @param {number} options.plot.bands.opacity - band opacity
		 *          @param {Array} options.plot.lines - plot lines
		 *              @param {(string|number|date)} options.plot.lines.value - value for matching
		 *              @param {string} options.plot.lines.color - band color
		 *              @param {number} options.plot.lines.opacity - band opacity
		 *          @param {Array.<{value: (string|number|date), color: ?string, opacity: ?string}>} options.plot.lines
		 *                  - plot lines
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} bar chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       categories: ['cate1', 'cate2', 'cate3'],
	 *       series: [
	 *         {
	 *           name: 'Legend1',
	 *           data: [20, 30, 50]
	 *         },
	 *         {
	 *           name: 'Legend2',
	 *           data: [40, 40, 60]
	 *         },
	 *         {
	 *           name: 'Legend3',
	 *           data: [60, 50, 10]
	 *         },
	 *         {
	 *           name: 'Legend4',
	 *           data: [80, 10, 70]
	 *         }
	 *       ]
	 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Line Chart'
	 *       },
	 *       yAxis: {
	 *         title: 'Y Axis'
	 *       },
	 *       xAxis: {
	 *         title: 'X Axis'
	 *       },
	 *       series: {
	 *         showDot: true
	 *       }
	 *     };
		 * tui.chart.lineChart(container, rawData, options);
		 */
		tui.chart.lineChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_LINE);
		};
		/**
		 * Area chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {?Array.<string>} rawData.categories - categories
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.yAxis - options for y axis component
		 *          @param {string | object} options.yAxis.title - title text or title object
		 *              @param {string} options.yAxis.title.text - title text
		 *              @param {number} options.yAxis.title.offsetX - title offset x
		 *              @param {number} options.yAxis.title.offsetY - title offset y
		 *          @param {number} options.yAxis.min - minimum value for y axis
		 *          @param {number} options.yAxis.max - maximum value for y axis
		 *          @param {boolean} options.yAxis.rotateTitle - whether rotate title or not (default: true)
		 *      @param {object} options.xAxis - options for x axis component
		 *          @param {string | object} options.xAxis.title - title text or title object
		 *              @param {string} options.xAxis.title.text - title text
		 *              @param {number} options.xAxis.title.offsetX - title offset x
		 *              @param {number} options.xAxis.title.offsetY - title offset y
		 *          @param {number} options.xAxis.labelInterval - label interval for x axis
		 *          @param {boolean} options.xAxis.rotateLabel - whether rotate label or not (default: true)
		 *          @param {string} options.xAxis.tickInterval - tick interval for x axis
		 *          @param {string} options.xAxis.type - type of axis
		 *          @param {string} options.xAxis.dateFormat - date format
		 *      @param {object} options.series - options for series component
		 *          @param {boolean} options.series.showDot - whether show dot or not
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *          @param {boolean} options.series.allowSelect - whether allow select or not
		 *          @param {boolean} options.series.spline - whether spline or not
		 *          @param {boolean} options.series.zoomable - whether zoomable or not
		 *          @param {boolean} options.series.shifting - whether shifting or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offsetX - tooltip offset x
		 *          @param {object} options.tooltip.offsetY - tooltip offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *          @param {boolean} options.tooltip.grouped - whether group tooltip or not
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left)
		 *          @param {boolean} options.legend.showCheckbox - whether show checkbox or not (default: true)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {object} options.plot - options for plot component
		 *          @param {boolean} options.plot.showLine - whether show line or not (default: true)
		 *          @param {Array} options.plot.bands - plot bands
		 *              @param {Array.<string|number|date>} options.plot.bands.range - value range for matching
		 *              @param {string} options.plot.bands.color - band color
		 *              @param {number} options.plot.bands.opacity - band opacity
		 *          @param {Array} options.plot.lines - plot lines
		 *              @param {(string|number|date)} options.plot.lines.value - value for matching
		 *              @param {string} options.plot.lines.color - band color
		 *              @param {number} options.plot.lines.opacity - band opacity
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} bar chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       categories: ['cate1', 'cate2', 'cate3'],
	 *       series: [
	 *         {
	 *           name: 'Legend1',
	 *           data: [20, 30, 50]
	 *         },
	 *         {
	 *           name: 'Legend2',
	 *           data: [40, 40, 60]
	 *         },
	 *         {
	 *           name: 'Legend3',
	 *           data: [60, 50, 10]
	 *         },
	 *         {
	 *           name: 'Legend4',
	 *           data: [80, 10, 70]
	 *         }
	 *       ]
	 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Area Chart'
	 *       },
	 *       yAxis: {
	 *         title: 'Y Axis'
	 *       },
	 *       xAxis: {
	 *         title: 'X Axis'
	 *       }
	 *     };
		 * tui.chart.areaChart(container, rawData, options);
		 */
		tui.chart.areaChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_AREA);
		};
		/**
		 * Bubble chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {Array.<string>} rawData.categories - categories
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.yAxis - options for y axis component
		 *          @param {string | object} options.yAxis.title - title text or title object
		 *              @param {string} options.yAxis.title.text - title text
		 *              @param {number} options.yAxis.title.offsetX - title offset x
		 *              @param {number} options.yAxis.title.offsetY - title offset y
		 *          @param {number} options.yAxis.min - minimum value for y axis
		 *          @param {number} options.yAxis.max - maximum value for y axis
		 *          @param {boolean} options.yAxis.rotateTitle - whether rotate title or not (default: true)
		 *      @param {object} options.xAxis - options for x axis component
		 *          @param {string | object} options.xAxis.title - title text or title object
		 *              @param {string} options.xAxis.title.text - title text
		 *              @param {number} options.xAxis.title.offsetX - title offset x
		 *              @param {number} options.xAxis.title.offsetY - title offset y
		 *          @param {number} options.xAxis.labelInterval - label interval for x axis
		 *          @param {boolean} options.xAxis.rotateLabel - whether rotate label or not (default: true)
		 *          @param {number} options.xAxis.min - minimum value for y axis
		 *          @param {number} options.xAxis.max - maximum value for y axis
		 *      @param {object} options.series - options for series component
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *          @param {boolean} options.series.allowSelect - whether allow select or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offsetX - tooltip offset x
		 *          @param {object} options.tooltip.offsetY - tooltip offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left)
		 *          @param {boolean} options.legend.showCheckbox - whether show checkbox or not (default: true)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {object} options.circleLegend - options for circleLegend
		 *          @param {boolean} options.circleLegend.visible - whether visible or not (default: true)
		 *      @param {object} options.plot - options for plot component
		 *          @param {boolean} options.plot.showLine - whether show line or not (default: true)
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} bubble chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       series: [
	 *         {
	 *           name: 'Legend1',
	 *           data: [{
	 *              x: 10,
	 *              y: 20,
	 *              r: 15,
	 *              label: 'Lable1'
	 *           }, {
	 *              x: 20,
	 *              y: 40,
	 *              r: 10,
	 *              label: 'Lable2'
	 *           }]
	 *         },
	 *         {
	 *           name: 'Legend2',
	 *           data: [{
	 *              x: 40,
	 *              y: 10,
	 *              r: 5,
	 *              label: 'Lable3'
	 *           }, {
	 *              x: 30,
	 *              y: 40,
	 *              r: 8,
	 *              label: 'Lable4'
	 *           }]
	 *         }
	 *       ]
	 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Bubble Chart'
	 *       },
	 *       yAxis: {
	 *         title: 'Y Axis'
	 *       },
	 *       xAxis: {
	 *         title: 'X Axis'
	 *       }
	 *     };
		 * tui.chart.bubbleChart(container, rawData, options);
		 */
		tui.chart.bubbleChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_BUBBLE);
		};
		/**
		 * Scatter chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {Array.<string>} rawData.categories - categories
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.yAxis - options for y axis component
		 *          @param {string | object} options.yAxis.title - title text or title object
		 *              @param {string} options.yAxis.title.text - title text
		 *              @param {number} options.yAxis.title.offsetX - title offset x
		 *              @param {number} options.yAxis.title.offsetY - title offset y
		 *          @param {number} options.yAxis.min - minimum value for y axis
		 *          @param {number} options.yAxis.max - maximum value for y axis
		 *          @param {boolean} options.yAxis.rotateTitle - whether rotate title or not (default: true)
		 *      @param {object} options.xAxis - options for x axis component
		 *          @param {string | object} options.xAxis.title - title text or title object
		 *              @param {string} options.xAxis.title.text - title text
		 *              @param {number} options.xAxis.title.offsetX - title offset x
		 *              @param {number} options.xAxis.title.offsetY - title offset y
		 *          @param {number} options.xAxis.min - minimum value for y axis
		 *          @param {number} options.xAxis.max - maximum value for y axis
		 *      @param {object} options.series - options for series component
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *          @param {boolean} options.series.allowSelect - whether allow select or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offsetX - tooltip offset x
		 *          @param {object} options.tooltip.offsetY - tooltip offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left)
		 *          @param {boolean} options.legend.showCheckbox - whether show checkbox or not (default: true)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {object} options.plot - options for plot component
		 *          @param {boolean} options.plot.showLine - whether show line or not (default: true)
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} scatter chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       series: [
	 *         {
	 *           name: 'Legend1',
	 *           data: [{
	 *              x: 10,
	 *              y: 20
	 *           }, {
	 *              x: 20,
	 *              y: 40
	 *           }]
	 *         },
	 *         {
	 *           name: 'Legend2',
	 *           data: [{
	 *              x: 40,
	 *              y: 10
	 *           }, {
	 *              x: 30,
	 *              y: 40
	 *           }]
	 *         }
	 *       ]
	 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Scatter Chart'
	 *       },
	 *       yAxis: {
	 *         title: 'Y Axis'
	 *       },
	 *       xAxis: {
	 *         title: 'X Axis'
	 *       }
	 *     };
		 * tui.chart.scatterChart(container, rawData, options);
		 */
		tui.chart.scatterChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_SCATTER);
		};
		/**
		 * Heatmap chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {{x: Array.<string | number>, y: Array.<string | number>}} rawData.categories - categories
		 *      @param {Array.<Array.<number>>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.yAxis - options for y axis component
		 *          @param {string | object} options.yAxis.title - title text or title object
		 *              @param {string} options.yAxis.title.text - title text
		 *              @param {number} options.yAxis.title.offsetX - title offset x
		 *              @param {number} options.yAxis.title.offsetY - title offset y
		 *          @param {boolean} options.yAxis.rotateTitle - whether rotate title or not (default: true)
		 *      @param {object} options.xAxis - options for x axis component
		 *          @param {string | object} options.xAxis.title - title text or title object
		 *              @param {string} options.xAxis.title.text - title text
		 *              @param {number} options.xAxis.title.offsetX - title offset x
		 *              @param {number} options.xAxis.title.offsetY - title offset y
		 *      @param {object} options.series - options for series component
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offsetX - tooltip offset x
		 *          @param {object} options.tooltip.offsetY - tooltip offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} scatter chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       categories: {
	 *           x: [10, 20, 30, 40, 50],
	 *           y: [1, 2, 3, 4, 5, 6]
	 *       },
	 *       series: [
	 *           [10, 20, 30, 40, 50],
	 *           [1, 4, 6, 7, 8],
	 *           [20, 4, 5, 70, 8],
	 *           [100, 40, 30, 80, 30],
	 *           [20, 10, 60, 90, 20],
	 *           [50, 40, 30, 20, 10]
	 *       ]
	 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Heatmap Chart'
	 *       },
	 *       yAxis: {
	 *         title: 'Y Axis'
	 *       },
	 *       xAxis: {
	 *         title: 'X Axis'
	 *       }
	 *     };
		 * tui.chart.heatmapChart(container, rawData, options);
		 */
		tui.chart.heatmapChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_HEATMAP);
		};
		/**
		 * Treemap chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {Array.<Array.<object>>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.series - options for series component
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *          @param {boolean} options.series.useColorValue - whether use colorValue or not
		 *          @param {boolean} options.series.zoomable - whether zoomable or not
		 *          @param {boolean} options.series.useLeafLabel - whether use leaf label or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {object} options.tooltip.offsetX - tooltip offset x
		 *          @param {object} options.tooltip.offsetY - tooltip offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} scatter chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       series: [
	 *          {
	 *              label: 'label1',
	 *              value: 6
	 *          },
	 *          {
	 *              label: 'label2',
	 *              value: 6
	 *          },
	 *          {
	 *              label: 'label3',
	 *              value: 4
	 *          },
	 *          {
	 *              label: 'label4',
	 *              value: 3
	 *          },
	 *          {
	 *              label: 'label5',
	 *              value: 2
	 *          },
	 *          {
	 *              label: 'label6',
	 *              value: 2
	 *          },
	 *          {
	 *              label: 'label7',
	 *              value: 1
	 *          }
	 *     ],
	 *     options = {
	 *       chart: {
	 *         title: 'Treemap Chart'
	 *       }
	 *     };
	 * tui.chart.treemapChart(container, rawData, options);
	 */
		tui.chart.treemapChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_TREEMAP);
		};
		/**
		 * Combo chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {Array.<string>} rawData.categories - categories
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object|Array} options.yAxis - options for y axis component
		 *          @param {string | object} options.yAxis.title - title text or title object
		 *              @param {string} options.yAxis.title.text - title text
		 *              @param {number} options.yAxis.title.offsetX - title offset x
		 *              @param {number} options.yAxis.title.offsetY - title offset y
		 *          @param {number} options.yAxis.min - minimum value for y axis
		 *          @param {number} options.yAxis.max - maximum value for y axis
		 *          @param {boolean} options.yAxis.rotateTitle - whether rotate title or not (default: true)
		 *      @param {object} options.xAxis - options for x axis component
		 *          @param {string | object} options.xAxis.title - title text or title object
		 *              @param {string} options.xAxis.title.text - title text
		 *              @param {number} options.xAxis.title.offsetX - title offset x
		 *              @param {number} options.xAxis.title.offsetY - title offset y
		 *          @param {number} options.xAxis.labelInterval - label interval for x axis
		 *          @param {boolean} options.xAxis.rotateLabel - whether rotate label or not (default: true)
		 *      @param {object} options.series - options for series component
		 *          @param {?object} options.series.column - options for column series component
		 *              @param {string} options.series.column.stackType - type of stack
		 *              @param {boolean} options.series.column.showLabel - whether show label or not
		 *              @param {number} options.series.column.barWidth - bar width
		 *          @param {?object} options.series.line - options for line series component
		 *              @param {boolean} options.series.line.showDot - whether show dot or not
		 *              @param {boolean} options.series.line.showLabel - whether show label or not
		 *              @param {boolean} options.series.line.spline - whether spline or not
		 *          @param {?object} options.series.area - options for line series component
		 *              @param {boolean} options.series.area.showDot - whether show dot or not
		 *              @param {boolean} options.series.area.showLabel - whether show label or not
		 *              @param {boolean} options.series.area.spline - whether spline or not
		 *          @param {?object} options.series.pie - options for pie series component
		 *              @param {boolean} options.series.pie.showLabel - whether show label or not
		 *              @param {number} options.series.pie.radiusRatio - ratio of radius for pie graph
		 *              @param {boolean} options.series.pie.startAngle - start angle
		 *              @param {boolean} options.series.pie.endAngle - end angle
		 *          @param {boolean} options.series.showDot - whether show dot or not
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *          @param {boolean} options.series.allowSelect - whether allow select or not
		 *          @param {boolean} options.series.spline - whether spline or not
		 *          @param {boolean} options.series.zoomable - whether zoomable or not
		 *          @param {boolean} options.series.shifting - whether shifting or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {object} options.tooltip.column - options for column tooltip
		 *              @param {string} options.tooltip.column.suffix - suffix for tooltip
		 *              @param {function} [options.tooltip.column.template] template of tooltip
		 *              @param {string} options.tooltip.column.align - align option for tooltip
		 *              @param {number} options.tooltip.column.offsetX - tooltip offset x
		 *              @param {number} options.tooltip.column.offsetY - tooltip offset y
		 *              @param {object} options.tooltip.column.position - (deprecated) relative position
		 *                  @param {number} options.tooltip.position.left - position left
		 *                  @param {number} options.tooltip.position.top - position top
		 *          @param {boolean} options.tooltip.grouped - whether group tooltip or not
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left)
		 *          @param {boolean} options.legend.showCheckbox - whether show checkbox or not (default: true)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {object} options.plot - options for plot component
		 *          @param {boolean} options.plot.showLine - whether show line or not (default: true)
		 *          @param {Array} options.plot.bands - plot bands for line & area combo chart
		 *              @param {Array.<string|number|date>} options.plot.bands.range - value range for matching
		 *              @param {string} options.plot.bands.color - band color
		 *              @param {number} options.plot.bands.opacity - band opacity
		 *          @param {Array} options.plot.lines - plot lines
		 *              @param {(string|number|date)} options.plot.lines.value - value for matching
		 *              @param {string} options.plot.lines.color - band color
		 *              @param {number} options.plot.lines.opacity - band opacity
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} bar chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       categories: ['cate1', 'cate2', 'cate3'],
	 *       series: {
	 *         column: [
	 *           {
	 *             name: 'Legend1',
	 *             data: [20, 30, 50]]
	 *           },
	 *           {
	 *             name: 'Legend2',
	 *             data: [40, 40, 60]
	 *           },
	 *           {
	 *             name: 'Legend3',
	 *             data: [60, 50, 10]
	 *           },
	 *           {
	 *             name: 'Legend4',
	 *             data: [80, 10, 70]
	 *           }
	 *         },
	 *         line: [
	 *           {
	 *             name: 'Legend5',
	 *             data: [1, 2, 3]
	 *           }
	 *         ]
	 *       }
		 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Combo Chart'
	 *       },
	 *       yAxis:[
	 *         {
	 *           title: 'Y Axis',
	 *           chartType: 'line'
	 *         },
	 *         {
	 *           title: 'Y Right Axis'
	 *         }
	 *       ],
	 *       xAxis: {
	 *         title: 'X Axis'
	 *       },
	 *       series: {
	 *         showDot: true
	 *       }
	 *     };
		 * tui.chart.comboChart(container, rawData, options);
		 */
		tui.chart.comboChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_COMBO);
		};
		/**
		 * Pie chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.series - options for series component
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *          @param {number} options.series.radiusRatio - ratio of radius for pie graph
		 *          @param {boolean} options.series.allowSelect - whether allow select or not
		 *          @param {boolean} options.series.startAngle - start angle
		 *          @param {boolean} options.series.endAngle - end angle
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offset - tooltip offset
		 *              @param {number} options.tooltip.offset.x - offset x
		 *              @param {number} options.tooltip.offset.y - offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left|center|outer)
		 *          @param {boolean} options.legend.showCheckbox - whether show checkbox or not (default: true)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} bar chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       series: [
	 *         {
	 *           name: 'Legend1',
	 *           data: 20
	 *         },
	 *         {
	 *           name: 'Legend2',
	 *           data: 40
	 *         },
	 *         {
	 *           name: 'Legend3',
	 *           data: 60
	 *         },
	 *         {
	 *           name: 'Legend4',
	 *           data: 80
	 *         }
	 *       ]
	 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Pie Chart'
	 *       }
	 *     };
		 * tui.chart.pieChart(container, rawData, options);
		 */
		tui.chart.pieChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_PIE);
		};
		/**
		 * Map chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData chart data
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.series - options for series component
		 *          @param {boolean} options.series.showLabel - whether show label or not
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offset - tooltip offset
		 *              @param {number} options.tooltip.offset.x - offset x
		 *              @param {number} options.tooltip.offset.y - offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left|center|outer)
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.map map type
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} bar chart
		 * @api
		 * @example
		 * var container = document.getElementById('container-id'),
		 *     rawData = {
	 *       series: [
	 *         {
	 *           code: 'KR',
	 *           data: 100,
	 *           labelCoordinate: {
	 *             x: 0.6,
	 *             y: 0.7
	 *           }
	 *         },
	 *         {
	 *           code: 'JP',
	 *           data: 50
	 *         }
	 *       ]
	 *     },
		 *     options = {
	 *       chart: {
	 *         title: 'Map Chart'
	 *       },
	 *       map: 'world'
	 *     };
		 * tui.chart.mapChart(container, rawData, options);
		 */
		tui.chart.mapChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_MAP);
		};
		/**
		 * radial chart creator.
		 * @memberOf tui.chart
		 * @param {HTMLElement} container - chart container
		 * @param {rawData} rawData - raw data
		 *      @param {Array.<Array>} rawData.series - series data
		 * @param {object} options - chart options
		 *      @param {object} options.chart - base options for chart
		 *          @param {number} options.chart.width - chart width
		 *          @param {number} options.chart.height - chart height
		 *          @param {string | object} options.chart.title - title text or title object
		 *              @param {string} options.chart.title.text - title text
		 *              @param {number} options.chart.title.offsetX - title offset x
		 *              @param {number} options.chart.title.offsetY - title offset y
		 *          @param {string | function} options.chart.format - formatter for value
		 *      @param {object} options.series - options for series component
		 *          @param {boolean} options.series.showDot - show dot or not (default: true)
		 *          @param {boolean} options.series.showArea - show area or not (default: true)
		 *      @param {object} options.plot - options for plot component
		 *          @param {boolean} options.plot.type - "spiderweb" or "circle" (default: "spiderweb")
		 *      @param {object|Array} options.yAxis - options for y axis component
		 *          @param {number} options.yAxis.min - minimum value for y axis
		 *          @param {number} options.yAxis.max - maximum value for y axis
		 *      @param {object} options.tooltip - options for tooltip component
		 *          @param {string} options.tooltip.suffix - suffix for tooltip
		 *          @param {function} [options.tooltip.template] - template for tooltip
		 *          @param {string} options.tooltip.align - align option for tooltip
		 *          @param {object} options.tooltip.offset - tooltip offset
		 *              @param {number} options.tooltip.offset.x - offset x
		 *              @param {number} options.tooltip.offset.y - offset y
		 *          @param {object} options.tooltip.position - (deprecated) relative position
		 *              @param {number} options.tooltip.position.left - position left
		 *              @param {number} options.tooltip.position.top - position top
		 *      @param {object} options.legend - options for legend component
		 *          @param {string} options.legend.align - align option for legend (top|bottom|left|center|outer)
		 *          @param {boolean} options.legend.showCheckbox - whether show checkbox or not (default: true)
		 *          @param {boolean} options.legend.visible - whether visible or not (default: true)
		 *      @param {string} options.theme - theme name
		 *      @param {string} options.libType - type of graph library
		 * @returns {object} bar chart
		 * @api
		 * @example
		 *  var container = document.getElementById('chart-area'),
		 *  data = {
	 *      categories: ["June", "July", "Aug", "Sep", "Oct", "Nov"],
	 *      series: [
	 *          {
	 *              name: 'Budget',
	 *              data: [5000, 3000, 5000, 7000, 6000, 4000]
	 *          },
	 *          {
	 *              name: 'Income',
	 *              data: [8000, 8000, 7000, 2000, 5000, 3000]
	 *            },
	 *          {
	 *              name: 'Expenses',
	 *              data: [4000, 4000, 6000, 3000, 4000, 5000]
	 *          },
	 *          {
	 *              name: 'Debt',
	 *              data: [6000, 3000, 3000, 1000, 2000, 4000]
	 *          }
	 *      ]
	 *  },
		 *  options = {
	 *      chart: {
	 *          width: 600,
	 *          height: 400
	 *      },
	 *      series: {
	 *          showDot: true,
	 *          showArea: true
	 *      },
	 *      plot: {
	 *          type: 'circle'
	 *      },
	 *      yAxis: {
	 *          min: 0,
	 *          max: 9000
	 *      }
	 *  };
		 *  tui.chart.radialChart(container, data, options);
		 *
		 */
		tui.chart.radialChart=function( container, rawData, options ){
			return _createChart(container, rawData, options, chartConst.CHART_TYPE_RADIAL);
		};
		/**
		 * Register theme.
		 * @memberOf tui.chart
		 * @param {string} themeName - theme name
		 * @param {object} theme - application chart theme
		 *      @param {object} theme.chart - chart theme
		 *          @param {string} theme.chart.fontFamily - font family for chart
		 *          @param {string} theme.chart.background - background for chart
		 *      @param {object} theme.title - chart title theme
		 *          @param {number} theme.title.fontSize - font size
		 *          @param {string} theme.title.fontFamily - font family
		 *          @param {string} theme.title.fontWeight - font weight
		 *          @param {string} theme.title.color - font color
		 *          @param {string} theme.title.background - background
		 *      @param {object} theme.yAxis - y axis theme
		 *          @param {object} theme.yAxis.title - theme for y axis title
		 *              @param {number} theme.yAxis.title.fontSize - font size
		 *              @param {string} theme.yAxis.title.fontFamily - font family
		 *              @param {string} theme.yAxis.title.fontWeight - font weight
		 *              @param {string} theme.yAxis.title.color - font color
		 *          @param {object} theme.yAxis.label - theme for y axis label
		 *              @param {number} theme.yAxis.label.fontSize - font size
		 *              @param {string} theme.yAxis.label.fontFamily - font family
		 *              @param {string} theme.yAxis.label.fontWeight - font weight
		 *              @param {string} theme.yAxis.label.color - font color
		 *          @param {string} theme.yAxis.tickColor - color for y axis tick
		 *      @param {object} theme.xAxis - theme for x axis
		 *          @param {object} theme.xAxis.title - theme for x axis title
		 *              @param {number} theme.xAxis.title.fontSize - font size
		 *              @param {string} theme.xAxis.title.fontFamily - font family
		 *              @param {string} theme.xAxis.title.fontWeight - font weight
		 *              @param {string} theme.xAxis.title.color - font color
		 *          @param {object} theme.xAxis.label - theme for x axis label
		 *              @param {number} theme.xAxis.label.fontSize - font size
		 *              @param {string} theme.xAxis.label.fontFamily - font family
		 *              @param {string} theme.xAxis.label.fontWeight - font weight
		 *              @param {string} theme.xAxis.label.color - font color
		 *          @param {string} theme.xAxis.tickColor - color for x axis tick
		 *      @param {object} theme.plot - theme for plot
		 *          @param {string} theme.plot.lineColor - line color
		 *          @param {string} theme.plot.background - background
		 *      @param {object} theme.series theme for series
		 *          @param {Array.<string>} theme.series.colors - colors
		 *          @param {string} theme.series.borderColor - border color
		 *          @param {string} theme.series.selectionColor - selection color
		 *          @param {string} theme.series.startColor - start color
		 *          @param {string} theme.series.endColor - end color
		 *          @param {string} theme.series.overColor - over color
		 *      @param {object} theme.legend - theme for legend
		 *          @param {object} theme.legend.label - theme for legend label
		 *              @param {number} theme.legend.label.fontSize - font size
		 *              @param {string} theme.legend.label.fontFamily - font family
		 *              @param {string} theme.legend.label.fontWeight - font family
		 *              @param {string} theme.legend.label.color - font color
		 * @api
		 * @example
		 * var theme = {
	 *   yAxis: {
	 *     tickColor: '#ccbd9a',
	 *       title: {
	 *         color: '#333333'
	 *       },
	 *       label: {
	 *         color: '#6f491d'
	 *       }
	 *     },
	 *     xAxis: {
	 *       tickColor: '#ccbd9a',
	 *       title: {
	 *         color: '#333333'
	 *       },
	 *       label: {
	 *         color: '#6f491d'
	 *       }
	 *     },
	 *     plot: {
	 *       lineColor: '#e5dbc4',
	 *       background: '#f6f1e5'
	 *     },
	 *     series: {
	 *       colors: ['#40abb4', '#e78a31', '#c1c452', '#795224', '#f5f5f5'],
	 *       borderColor: '#8e6535',
	 *       selectionColor: '#cccccc',
	 *       startColor: '#efefef',
	 *       endColor: 'blue',
	 *       overColor: 'yellow'
	 *     },
	 *     legend: {
	 *       label: {
	 *         color: '#6f491d'
	 *       }
	 *     }
	 *   };
		 * tui.chart.registerTheme('newTheme', theme);
		 */
		tui.chart.registerTheme=function( themeName, theme ){
			themeManager.register(themeName, theme);
		};
		/**
		 * Register map.
		 * @param {string} mapName map name
		 * @param {Array.<{code: string, name: string, path: string}>} data map data
		 * @api
		 * @example
		 * var data = [
		 *   {
	 *     code: 'KR',
	 *     name: 'South Korea',
	 *     path: 'M835.13,346.53L837.55,350.71...',
	 *     labelCoordinate: {
	 *       x: 0.6,
	 *       y: 0.7
	 *     }
	 *   },
		 *   //...
		 * ];
		 * tui.chart.registerMap('newMap', data);
		 */
		tui.chart.registerMap=function( mapName, data ){
			mapManager.register(mapName, data);
		};
		/**
		 * Register graph plugin.
		 * @memberOf tui.chart
		 * @param {string} libType type of graph library
		 * @param {object} plugin plugin to control library
		 * @example
		 * var pluginRaphael = {
	 *   bar: function() {} // Render class
	 * };
		 * tui.chart.registerPlugin('raphael', pluginRaphael);
		 */
		tui.chart.registerPlugin=function( libType, plugin ){
			pluginFactory.register(libType, plugin);
		};
		__webpack_require__(120);
		/***/
	},
	/* 1 */,
	/* 2 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview Chart const
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/**
		 * Chart const
		 * @readonly
		 * @enum {number|string}
		 * @private
		 */
		var chartConst={
			/** tui class names
			 * @type {string}
			 */
			CLASS_NAME_LEGEND_LABEL:'tui-chart-legend-label',
			/** @type {string} */
			CLASS_NAME_LEGEND_CHECKBOX:'tui-chart-legend-checkbox',
			/** @type {string} */
			CLASS_NAME_SERIES_LABEL:'tui-chart-series-label',
			/** @type {string} */
			CLASS_NAME_SERIES_LEGEND:'tui-chart-series-legend',
			/** @type {string} */
			CLASS_NAME_RESET_ZOOM_BTN:'tui-chart-reset-zoom-btn',
			/** @type {string} */
			CLASS_NAME_CHART_EXPORT_MENU_AREA:'tui-chart-chartExportMenu-area',
			/** @type {string} */
			CLASS_NAME_CHART_EXPORT_MENU_ITEM:'tui-chart-chartExportMenu-item',
			/** @type {string} */
			CLASS_NAME_CHART_EXPORT_MENU_BUTTON:'tui-chart-chartExportMenu-button',
			/** chart type
			 * @type {string}
			 */
			CHART_TYPE_BAR:'bar',
			/** @type {string} */
			CHART_TYPE_COLUMN:'column',
			/** @type {string} */
			CHART_TYPE_LINE:'line',
			/** @type {string} */
			CHART_TYPE_AREA:'area',
			/** @type {string} */
			CHART_TYPE_COMBO:'combo',
			/** @type {string} */
			CHART_TYPE_COLUMN_LINE_COMBO:'columnLineCombo',
			/** @type {string} */
			CHART_TYPE_LINE_SCATTER_COMBO:'lineScatterCombo',
			/** @type {string} */
			CHART_TYPE_LINE_AREA_COMBO:'lineAreaCombo',
			/** @type {string} */
			CHART_TYPE_PIE_DONUT_COMBO:'pieDonutCombo',
			/** @type {string} */
			CHART_TYPE_PIE:'pie',
			/** @type {string} */
			CHART_TYPE_BUBBLE:'bubble',
			/** @type {string} */
			CHART_TYPE_SCATTER:'scatter',
			/** @type {string} */
			CHART_TYPE_HEATMAP:'heatmap',
			/** @type {string} */
			CHART_TYPE_TREEMAP:'treemap',
			/** @type {string} */
			CHART_TYPE_MAP:'map',
			/** @type {string} */
			CHART_TYPE_RADIAL:'radial',
			/** chart padding */
			CHART_PADDING:10,
			/** chart default width */
			CHART_DEFAULT_WIDTH:500,
			/** chart default height */
			CHART_DEFAULT_HEIGHT:400,
			/** overlapping width of xAxis and yAxis */
			OVERLAPPING_WIDTH:1,
			/** rendered text padding */
			TEXT_PADDING:2,
			/** series expand size */
			SERIES_EXPAND_SIZE:10,
			/** series label padding */
			SERIES_LABEL_PADDING:5,
			/** default font size of title */
			DEFAULT_TITLE_FONT_SIZE:14,
			/** default font size of axis title */
			DEFAULT_AXIS_TITLE_FONT_SIZE:10,
			/** default font size of label */
			DEFAULT_LABEL_FONT_SIZE:12,
			/** default font size of series label */
			DEFAULT_SERIES_LABEL_FONT_SIZE:11,
			/** default graph plugin
			 * @type {string}
			 */
			DEFAULT_PLUGIN:'raphael',
			/** default tick color
			 * @type {string}
			 */
			DEFAULT_TICK_COLOR:'black',
			/** default theme name
			 * @type {string}
			 */
			DEFAULT_THEME_NAME:'default',
			MAX_HEIGHT_WORLD:'A',
			/** stack type
			 * @type {string}
			 */
			NORMAL_STACK_TYPE:'normal',
			/** @type {string} */
			PERCENT_STACK_TYPE:'percent',
			/** default stack
			 * @type {string}
			 */
			DEFAULT_STACK:'___DEFAULT___STACK___',
			/** dummy key
			 * @type {string}
			 */
			DUMMY_KEY:'___DUMMY___KEY___',
			/** root id of treemap
			 * @type {string}
			 */
			TREEMAP_ROOT_ID:'___TUI_TREEMAP_ROOT___',
			/** id prefix of treemap
			 * @type {string}
			 */
			TREEMAP_ID_PREFIX:'___TUI_TREEMAP_ID___',
			/** prefix for caching seriesItems
			 * @type {string}
			 */
			TREEMAP_DEPTH_KEY_PREFIX:'___TUI_TREEMAP_DEPTH___',
			/** @type {string} */
			TREEMAP_PARENT_KEY_PREFIX:'___TUI_TREEMAP_PARENT___',
			/** @type {string} */
			TREEMAP_LEAF_KEY_PREFIX:'___TUI_TREEMAP_LEAF___',
			/** @type {string} */
			TREEMAP_LIMIT_DEPTH_KEY_PREFIX:'___TUI_TREEMAP_LIMIT_DEPTH___',
			/** default border color for treemap chart
			 * @type {string}
			 */
			TREEMAP_DEFAULT_BORDER:'#ccc',
			/** empty axis label */
			EMPTY_AXIS_LABEL:'',
			/** angel */
			ANGLE_85:85,
			ANGLE_90:90,
			ANGLE_360:360,
			/** radian */
			RAD:Math.PI/180,
			RERENDER_TIME:700,
			ADDING_DATA_ANIMATION_DURATION:300,
			/** series label align outer
			 * @type {string}
			 */
			LABEL_ALIGN_OUTER:'outer',
			/** @type {string} */
			LEGEND_ALIGN_TOP:'top',
			/** @type {string} */
			LEGEND_ALIGN_BOTTOM:'bottom',
			/** @type {string} */
			LEGEND_ALIGN_LEFT:'left',
			/** series outer label padding */
			SERIES_OUTER_LABEL_PADDING:20,
			/** default ratio for pie graph */
			PIE_GRAPH_DEFAULT_RATIO:0.8,
			/** small ratio for pie graph */
			PIE_GRAPH_SMALL_RATIO:0.65,
			/** tick count for spectrum legend */
			SPECTRUM_LEGEND_TICK_COUNT:4,
			/** default position ratio of map chart label
			 * @type {object}
			 */
			MAP_CHART_LABEL_DEFAULT_POSITION_RATIO:{
				x:0.5,
				y:0.5
			},
			/** dot radius */
			DOT_RADIUS:4,
			/** radius for circle of scatter chart*/
			SCATTER_RADIUS:5,
			/**
			 * theme properties
			 * @type {{yAxis: Array.<string>, series: Array.<string>}}
			 */
			THEME_PROPS_MAP:{
				yAxis:['tickColor', 'title', 'label'],
				series:['label', 'colors', 'borderColor', 'borderWidth', 'singleColors',
					'selectionColor', 'startColor', 'endColor', 'overColor']
			},
			/** title area width padding */
			TITLE_AREA_WIDTH_PADDING:20,
			/** top margin of x axis label */
			XAXIS_LABEL_TOP_MARGIN:10,
			/** right padding of vertical label */
			V_LABEL_RIGHT_PADDING:10,
			/** tooltip prefix
			 * @type {string}
			 */
			TOOLTIP_PREFIX:'tui-chart-tooltip',
			/** tooltip z-index **/
			TOOLTIP_ZINDEX:500,
			/** tooltip animation time */
			TOOLTIP_ANIMATION_TIME:100,
			/** tooltip animation time for pie chart */
			TOOLTIP_PIE_ANIMATION_TIME:50,
			/** minimum pixel type step size */
			MIN_PIXEL_TYPE_STEP_SIZE:45,
			/** maximum pixel type step size */
			MAX_PIXEL_TYPE_STEP_SIZE:65,
			/** axis scale for percent stack option
			 * @type {object}
			 */
			PERCENT_STACKED_AXIS_SCALE:{
				limit:{
					min:0,
					max:100
				},
				step:25,
				labels:[0, 25, 50, 75, 100]
			},
			/** axis scale for minus percent stack option
			 * @type {object}
			 */
			MINUS_PERCENT_STACKED_AXIS_SCALE:{
				limit:{
					min:-100,
					max:0
				},
				step:25,
				labels:[0, -25, -50, -75, -100]
			},
			/** axis scale of dual percent stack option
			 * @type {object}
			 */
			DUAL_PERCENT_STACKED_AXIS_SCALE:{
				limit:{
					min:-100,
					max:100
				},
				step:25,
				labels:[-100, -75, -50, -25, 0, 25, 50, 75, 100]
			},
			/** axis scale of diverging percent stack option
			 * @type {object}
			 */
			DIVERGING_PERCENT_STACKED_AXIS_SCALE:{
				limit:{
					min:-100,
					max:100
				},
				step:25,
				labels:[100, 75, 50, 25, 0, 25, 50, 75, 100]
			},
			/**
			 * datetime axis type
			 * @type {string}
			 */
			AXIS_TYPE_DATETIME:'datetime',
			/**
			 * default dateFormat
			 * @type {string}
			 */
			DEFAULT_DATE_FORMAT:'YYYY.MM.DD hh:mm:dd',
			/**
			 * date type
			 * @type {string}
			 */
			DATE_TYPE_YEAR:'year',
			DATE_TYPE_MONTH:'month',
			DATE_TYPE_DATE:'date',
			DATE_TYPE_HOUR:'hour',
			DATE_TYPE_MINUTE:'minute',
			DATE_TYPE_SECOND:'second',
			/** title add padding */
			TITLE_PADDING:10,
			/** legend area padding */
			LEGEND_AREA_PADDING:10,
			/** legend checkbox width */
			LEGEND_CHECKBOX_WIDTH:20,
			/** legend rect width */
			LEGEND_RECT_WIDTH:12,
			/** lgend label left padding */
			LEGEND_LABEL_LEFT_PADDING:5,
			MIN_LEGEND_WIDTH:100,
			/** map legend height */
			MAP_LEGEND_SIZE:200,
			/** map legend graph size */
			MAP_LEGEND_GRAPH_SIZE:25,
			/** map legend label padding */
			MAP_LEGEND_LABEL_PADDING:5,
			CIRCLE_LEGEND_LABEL_FONT_SIZE:9,
			CIRCLE_LEGEND_PADDING:10,
			HALF_RATIO:0.5,
			/** AXIS LABEL PADDING */
			AXIS_LABEL_PADDING:7,
			/** rotations degree candidates */
			DEGREE_CANDIDATES:[25, 45, 65, 85],
			/**
			 * auto tick interval
			 * @type {string}
			 */
			TICK_INTERVAL_AUTO:'auto',
			/** yAxis align option
			 * @type {string}
			 */
			YAXIS_ALIGN_CENTER:'center',
			/** xAxis label compare margin */
			XAXIS_LABEL_COMPARE_MARGIN:20,
			/** xAxis label gutter */
			XAXIS_LABEL_GUTTER:2,
			/**
			 * Standard multiple nums of axis
			 * @type {Array}
			 */
			AXIS_STANDARD_MULTIPLE_NUMS:[1, 2, 5, 10, 20, 50, 100],
			/**
			 * Last standard multiple num of axis
			 */
			AXIS_LAST_STANDARD_MULTIPLE_NUM:100,
			/** label padding top */
			LABEL_PADDING_TOP:2,
			/** line margin top */
			LINE_MARGIN_TOP:5,
			/** tooltip gap */
			TOOLTIP_GAP:5,
			/** tooltip direction
			 * @type {string}
			 */
			TOOLTIP_DIRECTION_FORWARD:'forword',
			/** @type {string} */
			TOOLTIP_DIRECTION_CENTER:'center',
			/** @type {string} */
			TOOLTIP_DIRECTION_BACKWARD:'backword',
			/** tooltip align options
			 * @type {string}
			 */
			TOOLTIP_DEFAULT_ALIGN_OPTION:'center top',
			/** @type {string} */
			TOOLTIP_DEFAULT_HORIZONTAL_ALIGN_OPTION:'right middle',
			/** @type {string} */
			TOOLTIP_DEFAULT_GROUP_ALIGN_OPTION:'right middle',
			/** @type {string} */
			TOOLTIP_DEFAULT_GROUP_HORIZONTAL_ALIGN_OPTION:'center bottom',
			/** hide delay */
			HIDE_DELAY:200,
			OLD_BROWSER_OPACITY_100:100,
			SERIES_LABEL_OPACITY:0.3,
			WHEEL_TICK:120,
			MAX_ZOOM_MAGN:32,
			FF_WHEELDELTA_ADJUSTING_VALUE:-40,
			IE7_ROTATION_FILTER_STYLE_MAP:{
				25:' style="filter: progid:DXImageTransform.Microsoft.Matrix(SizingMethod=\'auto expand\','+
				' M11=0.9063077870366499, M12=0.42261826174069944, M21=-0.42261826174069944, M22=0.9063077870366499)"',
				45:' style="filter: progid:DXImageTransform.Microsoft.Matrix(SizingMethod=\'auto expand\','+
				' M11=0.7071067811865476, M12=0.7071067811865475, M21=-0.7071067811865475, M22=0.7071067811865476)"',
				65:' style="filter: progid:DXImageTransform.Microsoft.Matrix(SizingMethod=\'auto expand\','+
				' M11=0.42261826174069944, M12=0.9063077870366499, M21=-0.9063077870366499, M22=0.42261826174069944)"',
				85:' style="filter: progid:DXImageTransform.Microsoft.Matrix(SizingMethod=\'auto expand\','+
				' M11=0.08715574274765814, M12=0.9961946980917455, M21=-0.9961946980917455, M22=0.08715574274765814)"'
			},
			/** prefix for public event
			 * @type {string}
			 */
			PUBLIC_EVENT_PREFIX:'public_',
			/** public event map
			 * @type {object}
			 */
			PUBLIC_EVENT_MAP:{
				load:true,
				selectLegend:true,
				selectSeries:true,
				unselectSeries:true,
				beforeShowTooltip:true,
				afterShowTooltip:true,
				zoom:true
			},
			/** for radial */
			RADIAL_PLOT_PADDING:15, // Prevent cross paper boundaries by line width
			RADIAL_MARGIN_FOR_CATEGORY:60,
			RADIAL_CATEGORY_PADDING:20
		};
		module.exports=chartConst;
		/***/
	},
	/* 3 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview  Chart factory play role register chart.
		 *                Also, you can get chart from this factory.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var rawDataHandler=__webpack_require__(4);
		var predicate=__webpack_require__(5);
		var charts={};
		var factory={
			/**
			 * Find key for getting chart.
			 * @param {string} chartType - type of chart
			 * @param {{seriesAlias: ?object, series: object.<string, Array>}} rawData - raw data
			 * @returns {string}
			 * @private
			 */
			_findKey:function( chartType, rawData ){
				var key=null;
				var chartTypeMap;
				if( predicate.isComboChart(chartType) ){
					chartTypeMap=rawDataHandler.getChartTypeMap(rawData);
					if( chartTypeMap[chartConst.CHART_TYPE_COLUMN] && chartTypeMap[chartConst.CHART_TYPE_LINE] ){
						key=chartConst.CHART_TYPE_COLUMN_LINE_COMBO;
					}else if( chartTypeMap[chartConst.CHART_TYPE_LINE] && chartTypeMap[chartConst.CHART_TYPE_SCATTER] ){
						key=chartConst.CHART_TYPE_LINE_SCATTER_COMBO;
					}else if( chartTypeMap[chartConst.CHART_TYPE_AREA] && chartTypeMap[chartConst.CHART_TYPE_LINE] ){
						key=chartConst.CHART_TYPE_LINE_AREA_COMBO;
					}else if( chartTypeMap[chartConst.CHART_TYPE_PIE] ){
						key=chartConst.CHART_TYPE_PIE_DONUT_COMBO;
					}
				}else{
					key=chartType;
				}
				return key;
			},
			/**
			 * Get chart instance.
			 * @param {string} chartType chart type
			 * @param {object} rawData chart data
			 * @param {object} theme chart options
			 * @param {object} options chart options
			 * @returns {object} chart instance;
			 */
			get:function( chartType, rawData, theme, options ){
				var key=this._findKey(chartType, rawData);
				var Chart=charts[key];
				var chart;
				if( !Chart ){
					throw new Error('Not exist '+chartType+' chart.');
				}
				chart=new Chart(rawData, theme, options);
				return chart;
			},
			/**
			 * Register chart.
			 * @param {string} chartType char type
			 * @param {class} ChartClass chart class
			 */
			register:function( chartType, ChartClass ){
				charts[chartType]=ChartClass;
			}
		};
		module.exports=factory;
		/***/
	},
	/* 4 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Raw data handler.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var arrayUtil=__webpack_require__(6);
		/**
		 * Raw data Handler.
		 * @module rawDataHandler
		 * @private */
		var rawDataHandler={
			/**
			 * Pick stacks.
			 * @param {Array.<{stack: string}>} seriesData - raw series data
			 * @param {boolean} [divergingOption] - diverging option
			 * @returns {Array.<string>} stacks
			 */
			pickStacks:function( seriesData, divergingOption ){
				var stacks, uniqStacks, filteredStack;
				stacks=tui.util.map(seriesData, function( seriesDatum ){
					return seriesDatum.stack;
				});
				uniqStacks=arrayUtil.unique(stacks);
				if( divergingOption ){
					uniqStacks=uniqStacks.slice(0, 2);
				}
				filteredStack=tui.util.filter(uniqStacks, function( stack ){
					return !!stack;
				});
				if( filteredStack.length < uniqStacks.length ){
					filteredStack.push(chartConst.DEFAULT_STACK);
				}
				return filteredStack;
			},
			/**
			 * Sort series data from stacks.
			 * @param {Array.<{stack: ?string}>} seriesData series data
			 * @param {Array.<string>} stacks stacks
			 * @returns {Array}
			 * @private
			 */
			_sortSeriesData:function( seriesData, stacks ){
				var newSeriesData=[];
				if( !stacks ){
					stacks=this.pickStacks(seriesData);
				}
				tui.util.forEachArray(stacks, function( stack ){
					var filtered=tui.util.filter(seriesData, function( datum ){
						return (datum.stack || chartConst.DEFAULT_STACK)===stack;
					});
					newSeriesData=newSeriesData.concat(filtered);
				});
				return newSeriesData;
			},
			/**
			 * Remove stack of series data.
			 * @param {Array.<{stack: ?string}>} seriesData series data
			 */
			removeSeriesStack:function( seriesData ){
				tui.util.forEachArray(seriesData, function( datum ){
					delete datum.stack;
				});
			},
			/**
			 * Find char type from chart name.
			 * @param {object.<string, string>} seriesAlias - alias map
			 * @param {string} seriesName - series name
			 * @returns {*}
			 */
			findChartType:function( seriesAlias, seriesName ){
				var chartType;
				if( seriesAlias ){
					chartType=seriesAlias[seriesName];
				}
				return chartType || seriesName;
			},
			/**
			 * Get chart type map.
			 * @param {{series: (Array | object)}} rawData - raw data
			 * @returns {object.<string, string>}
			 */
			getChartTypeMap:function( rawData ){
				var self=this;
				var chartTypeMap={};
				if( tui.util.isObject(rawData.series) ){
					tui.util.forEach(rawData.series, function( data, seriesName ){
						chartTypeMap[self.findChartType(rawData.seriesAlias, seriesName)]=true;
					});
				}
				return chartTypeMap;
			},
			/**
			 * Create minus values.
			 * @param {Array.<number>} data number data
			 * @returns {Array} minus values
			 * @private
			 */
			_createMinusValues:function( data ){
				return tui.util.map(data, function( value ){
					return value < 0 ? 0 : -value;
				});
			},
			/**
			 * Create plus values.
			 * @param {Array.<number>} data number data
			 * @returns {Array} plus values
			 * @private
			 */
			_createPlusValues:function( data ){
				return tui.util.map(data, function( value ){
					return value < 0 ? 0 : value;
				});
			},
			/**
			 * Make normal diverging raw series data.
			 * @param {{data: Array.<number>}} rawSeriesData raw series data
			 * @returns {{data: Array.<number>}} changed raw series data
			 * @private
			 */
			_makeNormalDivergingRawSeriesData:function( rawSeriesData ){
				rawSeriesData.length=Math.min(rawSeriesData.length, 2);
				rawSeriesData[0].data=this._createMinusValues(rawSeriesData[0].data);
				if( rawSeriesData[1] ){
					rawSeriesData[1].data=this._createPlusValues(rawSeriesData[1].data);
				}
				return rawSeriesData;
			},
			/**
			 * Make raw series data for stacked diverging option.
			 * @param {{data: Array.<number>, stack: string}} rawSeriesData raw series data
			 * @returns {{data: Array.<number>}} changed raw series data
			 * @private
			 */
			_makeRawSeriesDataForStackedDiverging:function( rawSeriesData ){
				var self=this;
				var stacks=this.pickStacks(rawSeriesData, true);
				var result=[];
				var leftStack=stacks[0];
				var rightStack=stacks[1];
				rawSeriesData=this._sortSeriesData(rawSeriesData, stacks);
				tui.util.forEachArray(rawSeriesData, function( seriesDatum ){
					var stack=seriesDatum.stack || chartConst.DEFAULT_STACK;
					if( stack===leftStack ){
						seriesDatum.data=self._createMinusValues(seriesDatum.data);
						result.push(seriesDatum);
					}else if( stack===rightStack ){
						seriesDatum.data=self._createPlusValues(seriesDatum.data);
						result.push(seriesDatum);
					}
				});
				return result;
			},
			/**
			 * Make raw series data for diverging.
			 * @param {{data: Array.<number>, stack: string}} rawSeriesData raw series data
			 * @param {?string} stackTypeOption stackType option
			 * @returns {{data: Array.<number>}} changed raw series data
			 * @private
			 */
			_makeRawSeriesDataForDiverging:function( rawSeriesData, stackTypeOption ){
				if( predicate.isValidStackOption(stackTypeOption) ){
					rawSeriesData=this._makeRawSeriesDataForStackedDiverging(rawSeriesData);
				}else{
					rawSeriesData=this._makeNormalDivergingRawSeriesData(rawSeriesData);
				}
				return rawSeriesData;
			},
			/**
			 * Update raw series data by options.
			 * @param {object} rawData - raw data
			 * @param {{stackType: ?string, diverging: ?boolean}} seriesOptions - series options
			 */
			updateRawSeriesDataByOptions:function( rawData, seriesOptions ){
				var self=this;
				seriesOptions=seriesOptions || {};
				if( predicate.isValidStackOption(seriesOptions.stackType) ){
					tui.util.forEach(rawData.series, function( seriesDatum, seriesType ){
						rawData.series[seriesType]=self._sortSeriesData(rawData.series[seriesType]);
					});
				}
				if( seriesOptions.diverging ){
					tui.util.forEach(rawData.series, function( seriesDatum, seriesType ){
						rawData.series[seriesType]=self._makeRawSeriesDataForDiverging(seriesDatum, seriesOptions.stackType);
					});
				}
			},
			/**
			 * Filter raw data belong to checked legend.
			 * @param {object} rawData raw data
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 * @returns {object} rawData
			 */
			filterCheckedRawData:function( rawData, checkedLegends ){
				var cloneData=JSON.parse(JSON.stringify(rawData));
				if( checkedLegends ){
					tui.util.forEach(cloneData.series, function( serieses, chartType ){
						if( !checkedLegends[chartType] ){
							cloneData.series[chartType]=[];
						}else if( checkedLegends[chartType].length ){
							cloneData.series[chartType]=tui.util.filter(serieses, function( series, index ){
								return checkedLegends[chartType][index];
							});
						}
					});
				}
				return cloneData;
			}
		};
		module.exports=rawDataHandler;
		/***/
	},
	/* 5 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Predicate.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var arrayUtil=__webpack_require__(6);
		/**
		 * predicate.
		 * @module predicate
		 * @private */
		var predicate={
			/**
			 * Whether bar chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isBarChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_BAR;
			},
			/**
			 * Whether column chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isColumnChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_COLUMN;
			},
			/**
			 * Whether bar type chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isBarTypeChart:function( chartType ){
				return predicate.isBarChart(chartType) || predicate.isColumnChart(chartType);
			},
			/**
			 * Whether radial type chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isRadialChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_RADIAL;
			},
			/**
			 * Whether diverging chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @param {boolean} diverging - whether has diverging or not
			 * @returns {*|boolean}
			 */
			isDivergingChart:function( chartType, diverging ){
				return this.isBarTypeChart(chartType) && diverging;
			},
			/**
			 * Whether normal stack chart or not.
			 * @param {string} chartType - type of chart
			 * @param {string} stackType - type of stack
			 * @returns {boolean}
			 * @private
			 */
			isNormalStackChart:function( chartType, stackType ){
				var isAllowedStackOption=predicate.isAllowedStackOption(chartType);
				var isNormalStack=predicate.isNormalStack(stackType);
				return isAllowedStackOption && isNormalStack;
			},
			/**
			 * Whether percent stack chart or not.
			 * @param {string} chartType - type of chart
			 * @param {string} stackType - type of stack
			 * @returns {boolean}
			 * @private
			 */
			isPercentStackChart:function( chartType, stackType ){
				var isAllowedStackOption=predicate.isAllowedStackOption(chartType);
				var isPercentStack=predicate.isPercentStack(stackType);
				return isAllowedStackOption && isPercentStack;
			},
			/**
			 * Whether combo chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isComboChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_COMBO;
			},
			/**
			 * Whether pie and donut combo chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @param {Array.<string>} subChartTypes - types of chart
			 * @returns {boolean}
			 */
			isPieDonutComboChart:function( chartType, subChartTypes ){
				var isAllPieType=arrayUtil.all(subChartTypes, function( subChartType ){
					return predicate.isPieChart(subChartType);
				});
				return predicate.isComboChart(chartType) && isAllPieType;
			},
			/**
			 * Whether line chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isLineChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_LINE;
			},
			/**
			 * Whether area chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isAreaChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_AREA;
			},
			/**
			 * Whether line and area combo chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @param {Array.<string>} subChartTypes - types of chart
			 * @returns {boolean}
			 */
			isLineAreaComboChart:function( chartType, subChartTypes ){
				var isAllLineType=arrayUtil.all(subChartTypes || [], function( subChartType ){
					return predicate.isLineChart(subChartType) || predicate.isAreaChart(subChartType);
				});
				return predicate.isComboChart(chartType) && isAllLineType;
			},
			/**
			 * Whether line and area combo chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @param {Array.<string>} subChartTypes - types of chart
			 * @returns {boolean}
			 */
			hasLineChart:function( chartType, subChartTypes ){
				var hasLineType=arrayUtil.any(subChartTypes || [], function( subChartType ){
					return predicate.isLineChart(subChartType);
				});
				return predicate.isComboChart(chartType) && hasLineType;
			},
			/**
			 * Whether line and scatter combo chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @param {Array.<string>} subChartTypes - types of chart
			 * @returns {boolean}
			 */
			isLineScatterComboChart:function( chartType, subChartTypes ){
				var isAllLineType=arrayUtil.all(subChartTypes || [], function( subChartType ){
					return predicate.isLineChart(subChartType) || predicate.isScatterChart(subChartType);
				});
				return predicate.isComboChart(chartType) && isAllLineType;
			},
			/**
			 * Whether line type chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @param {Array.<string>} [subChartTypes] - types of chart
			 * @returns {boolean}
			 */
			isLineTypeChart:function( chartType, subChartTypes ){
				return predicate.isLineChart(chartType) || predicate.isAreaChart(chartType)
					|| predicate.isLineAreaComboChart(chartType, subChartTypes);
			},
			/**
			 * Whether bubble chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isBubbleChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_BUBBLE;
			},
			/**
			 * Whether scatter chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			isScatterChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_SCATTER;
			},
			/**
			 * Whether heatmap chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			isHeatmapChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_HEATMAP;
			},
			/**
			 * Whether treemap chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			isTreemapChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_TREEMAP;
			},
			/**
			 * Whether box type chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			isBoxTypeChart:function( chartType ){
				return predicate.isHeatmapChart(chartType) || predicate.isTreemapChart(chartType);
			},
			/**
			 * Whether pie chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			isPieChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_PIE;
			},
			/**
			 * Whether map chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isMapChart:function( chartType ){
				return chartType===chartConst.CHART_TYPE_MAP;
			},
			/**
			 * Whether coordinate type chart or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			isCoordinateTypeChart:function( chartType ){
				return predicate.isBubbleChart(chartType) || predicate.isScatterChart(chartType);
			},
			/**
			 * Whether allow rendering for minus point in area of series.
			 * @memberOf module:predicate
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			allowMinusPointRender:function( chartType ){
				return predicate.isLineTypeChart(chartType) || predicate.isCoordinateTypeChart(chartType) ||
					predicate.isBoxTypeChart(chartType);
			},
			/**
			 * Whether chart to detect mouse events on series or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isChartToDetectMouseEventOnSeries:function( chartType ){
				return predicate.isPieChart(chartType) || predicate.isMapChart(chartType)
					|| predicate.isCoordinateTypeChart(chartType);
			},
			/**
			 * Whether align of label is outer or not.
			 * @memberOf module:predicate
			 * @param {string} align - align of legend
			 * @returns {boolean}
			 */
			isLabelAlignOuter:function( align ){
				return align===chartConst.LABEL_ALIGN_OUTER;
			},
			/**
			 * Whether show label or not.
			 * @param {{showLabel: ?boolean, showLegend: ?boolean}} options - options
			 * @returns {boolean}
			 */
			isShowLabel:function( options ){
				return options.showLabel || options.showLegend;
			},
			/**
			 * Whether show outer label or not.
			 * @param {{showLabel: ?boolean, showLegend: ?boolean, labelAlign: string}} options - options
			 * @returns {*|boolean}
			 */
			isShowOuterLabel:function( options ){
				return predicate.isShowLabel(options) && predicate.isLabelAlignOuter(options.labelAlign);
			},
			/**
			 * Whether align of legend is left or not.
			 * @memberOf module:predicate
			 * @param {string} align - align of legend
			 * @returns {boolean}
			 */
			isLegendAlignLeft:function( align ){
				return align===chartConst.LEGEND_ALIGN_LEFT;
			},
			/**
			 * Whether align of legend is top or not.
			 * @memberOf module:predicate
			 * @param {string} align - align of legend
			 * @returns {boolean}
			 */
			isLegendAlignTop:function( align ){
				return align===chartConst.LEGEND_ALIGN_TOP;
			},
			/**
			 * Whether align of legend is bottom or not.
			 * @memberOf module:predicate
			 * @param {string} align - align of legend
			 * @returns {boolean}
			 */
			isLegendAlignBottom:function( align ){
				return align===chartConst.LEGEND_ALIGN_BOTTOM;
			},
			/**
			 * Whether horizontal legend or not.
			 * @memberOf module:predicate
			 * @param {string} align - align option for legend
			 * @returns {boolean}
			 */
			isHorizontalLegend:function( align ){
				return predicate.isLegendAlignTop(align) || predicate.isLegendAlignBottom(align);
			},
			/**
			 * Whether vertical legend or not.
			 * @memberOf module:predicate
			 * @param {string} align - align option for legend
			 * @returns {boolean}
			 */
			isVerticalLegend:function( align ){
				return !predicate.isHorizontalLegend(align);
			},
			/**
			 * Whether allowed stackType option or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - type of chart
			 * @returns {boolean}
			 */
			isAllowedStackOption:function( chartType ){
				return predicate.isBarChart(chartType) || predicate.isColumnChart(chartType)
					|| predicate.isAreaChart(chartType);
			},
			/**
			 * Whether normal stack type or not.
			 * @memberOf module:predicate
			 * @param {boolean} stackType - stackType option
			 * @returns {boolean}
			 */
			isNormalStack:function( stackType ){
				return stackType===chartConst.NORMAL_STACK_TYPE;
			},
			/**
			 * Whether percent stack type or not.
			 * @memberOf module:predicate
			 * @param {boolean} stackType - stackType option
			 * @returns {boolean}
			 */
			isPercentStack:function( stackType ){
				return stackType===chartConst.PERCENT_STACK_TYPE;
			},
			/**
			 * Whether valid stackType option or not.
			 * @memberOf module:predicate
			 * @param {boolean} stackType - stackType option
			 * @returns {boolean}
			 */
			isValidStackOption:function( stackType ){
				return stackType && (predicate.isNormalStack(stackType) || predicate.isPercentStack(stackType));
			},
			/**
			 * Whether allow range data or not.
			 * @memberOf module:predicate
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			isAllowRangeData:function( chartType ){
				return predicate.isBarTypeChart(chartType) || predicate.isAreaChart(chartType);
			},
			/**
			 * Whether align of yAxis is center or not.
			 * @memberOf module:predicate
			 * @param {boolean} hasRightYAxis - whether has right yAxis.
			 * @param {string} alignOption - align option of yAxis.
			 * @returns {boolean} whether - align center or not.
			 */
			isYAxisAlignCenter:function( hasRightYAxis, alignOption ){
				return !hasRightYAxis && (alignOption===chartConst.YAXIS_ALIGN_CENTER);
			},
			/**
			 * Whether minus limit or not.
			 * @memberOf module:predicate
			 * @param {{min: number, max: number}} limit - limit
			 * @returns {boolean}
			 */
			isMinusLimit:function( limit ){
				return limit.min <= 0 && limit.max <= 0;
			},
			/**
			 * Whether auto tick interval or not.
			 * @param {string} [tickInterval] - tick interval option
			 * @returns {boolean}
			 */
			isAutoTickInterval:function( tickInterval ){
				return tickInterval===chartConst.TICK_INTERVAL_AUTO;
			},
			/**
			 * Whether valid label interval or not.
			 * @param {number} [labelInterval] - label interval option
			 * @param {string} [tickInterval] - tick interval option
			 * @returns {*|boolean}
			 */
			isValidLabelInterval:function( labelInterval, tickInterval ){
				return labelInterval && labelInterval > 1 && !tickInterval;
			},
			/**
			 * Whether datetime type or not.
			 * @param {string} type - type
			 * @returns {boolean}
			 */
			isDatetimeType:function( type ){
				return type===chartConst.AXIS_TYPE_DATETIME;
			}
		};
		module.exports=predicate;
		/***/
	},
	/* 6 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview Util for array.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/**
		 * Pick minimum value from value array.
		 * @memberOf module:arrayUtil
		 * @param {Array} arr value array
		 * @param {?function} condition condition function
		 * @param {?object} context target context
		 * @returns {*} minimum value
		 */
		var min=function( arr, condition, context ){
			var result, minValue, rest;
			if( !condition ){
				result=Math.min.apply(null, arr);
			}else{
				result=arr[0];
				minValue=condition.call(context, result, 0);
				rest=arr.slice(1);
				tui.util.forEachArray(rest, function( item, index ){
					var compareValue=condition.call(context, item, index+1);
					if( compareValue < minValue ){
						minValue=compareValue;
						result=item;
					}
				});
			}
			return result;
		};
		/**
		 * Pick maximum value from value array.
		 * @memberOf module:arrayUtil
		 * @param {Array} arr value array
		 * @param {?function} condition condition function
		 * @param {?object} context target context
		 * @returns {*} maximum value
		 */
		var max=function( arr, condition, context ){
			var result, maxValue, rest;
			if( !condition ){
				result=Math.max.apply(null, arr);
			}else{
				result=arr[0];
				maxValue=condition.call(context, result, 0);
				rest=arr.slice(1);
				tui.util.forEachArray(rest, function( item, index ){
					var compareValue=condition.call(context, item, index+1);
					if( compareValue > maxValue ){
						maxValue=compareValue;
						result=item;
					}
				});
			}
			return result;
		};
		/**
		 * Whether one of them is true or not.
		 * @memberOf module:arrayUtil
		 * @param {Array} collection target collection
		 * @param {function} condition condition function
		 * @param {?object} context target context
		 * @returns {boolean} result boolean
		 */
		var any=function( collection, condition, context ){
			var result=false;
			tui.util.forEach(collection, function( item, key ){
				if( condition.call(context, item, key, collection) ){
					result=true;
				}
				return !result;
			});
			return result;
		};
		/**
		 * All of them is true or not.
		 * @memberOf module:arrayUtil
		 * @param {Array} collection target collection
		 * @param {function} condition condition function
		 * @param {?object} context target context
		 * @returns {boolean} result boolean
		 */
		var all=function( collection, condition, context ){
			var result=!!(collection || []).length;
			tui.util.forEach(collection, function( item, key ){
				if( !condition.call(context, item, key, collection) ){
					result=false;
				}
				return result!==false;
			});
			return result;
		};
		/**
		 * Make unique values.
		 * @memberOf module:arrayUtil
		 * @param {Array} arr target array
		 * @param {?boolean} sorted whether sorted or not.
		 * @param {?function} iteratee iteratee function
		 * @param {?object} context target context
		 * @returns {Array} unique values
		 */
		var unique=function( arr, sorted, iteratee, context ){
			var result=[],
				prevValue;
			if( !tui.util.isBoolean(sorted) ){
				context=iteratee;
				iteratee=sorted;
				sorted=false;
			}
			iteratee=iteratee || function( value ){
					return value;
				};
			if( sorted ){
				tui.util.forEachArray(arr, function( value, index ){
					value=iteratee.call(context, value, index, arr);
					if( !index || prevValue!==value ){
						result.push(value);
					}
					prevValue=value;
				});
			}else{
				tui.util.forEachArray(arr, function( value, index ){
					value=iteratee.call(context, value, index, arr);
					if( tui.util.inArray(value, result)=== -1 ){
						result.push(value);
					}
				});
			}
			return result;
		};
		/**
		 * Array pivot.
		 * @memberOf module:arrayUtil
		 * @param {Array.<Array>} arr2d target 2d array
		 * @returns {Array.<Array>} pivoted 2d array
		 */
		var pivot=function( arr2d ){
			var result=[];
			var len=max(tui.util.map(arr2d, function( arr ){
				return arr.length;
			}));
			var index;
			tui.util.forEachArray(arr2d, function( arr ){
				for( index=0; index < len; index+=1 ){
					if( !result[index] ){
						result[index]=[];
					}
					result[index].push(arr[index]);
				}
			});
			return result;
		};
		/**
		 * Util for array.
		 * @module arrayUtil
		 * @private
		 */
		var arrayUtil={
			min:min,
			max:max,
			any:any,
			all:all,
			unique:unique,
			pivot:pivot
		};
		tui.util.defineNamespace('tui.chart');
		tui.chart.arrayUtil=arrayUtil;
		module.exports=arrayUtil;
		/***/
	},
	/* 7 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview  Plugin factory play role register rendering plugin.
		 *                Also, you can get plugin from this factory.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var plugins={},
			factory={
				/**
				 * Get graph renderer.
				 * @param {string} libType type of graph library
				 * @param {string} chartType chart type
				 * @returns {object} renderer instance
				 */
				get:function( libType, chartType ){
					var plugin=plugins[libType],
						Renderer, renderer;
					if( !plugin ){
						throw new Error('Not exist '+libType+' plugin.');
					}
					Renderer=plugin[chartType];
					if( !Renderer ){
						throw new Error('Not exist '+chartType+' chart renderer.');
					}
					renderer=new Renderer();
					return renderer;
				},
				/**
				 * Plugin register.
				 * @param {string} libType type of graph library
				 * @param {object} plugin plugin to control library
				 */
				register:function( libType, plugin ){
					plugins[libType]=plugin;
				}
			};
		module.exports=factory;
		/***/
	},
	/* 8 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @Fileoverview  Theme manager.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var defaultTheme=__webpack_require__(9);
		var themes={};
		module.exports={
			/**
			 * Theme register.
			 * @param {string} themeName theme name
			 * @param {object} theme theme
			 */
			register:function( themeName, theme ){
				theme=JSON.parse(JSON.stringify(theme));
				themes[themeName]=theme;
			},
			/**
			 * Pick series names from raw series data.
			 * @param {string} chartType - chart type
			 * @param {object} rawSeriesData - raw series data
			 * @returns {Array}
			 * @private
			 */
			_pickSeriesNames:function( chartType, rawSeriesData ){
				var seriesNames=[];
				if( predicate.isComboChart(chartType) ){
					tui.util.forEach(rawSeriesData, function( data, seriesName ){
						seriesNames.push(seriesName);
					});
				}else{
					seriesNames.push(chartType);
				}
				return seriesNames;
			},
			/**
			 * Overwrite theme
			 * @param {object} fromTheme - from theme
			 * @param {object} toTheme - to theme
			 * @private
			 */
			_overwriteTheme:function( fromTheme, toTheme ){
				var self=this;
				tui.util.forEach(toTheme, function( item, key ){
					var fromItem=fromTheme[key];
					if( !fromItem ){
						return;
					}
					if( tui.util.isArray(fromItem) ){
						toTheme[key]=fromItem.slice();
					}else if( tui.util.isObject(fromItem) ){
						self._overwriteTheme(fromItem, item);
					}else{
						toTheme[key]=fromItem;
					}
				});
			},
			/**
			 * Pick valid theme properties.
			 * @param {object} theme - theme
			 * @param {string} componentType - component type (series or yAxis)
			 * @returns {object}
			 * @private
			 */
			_pickValidTheme:function( theme, componentType ){
				var validTheme={};
				tui.util.forEachArray(chartConst.THEME_PROPS_MAP[componentType], function( propName ){
					if( tui.util.isExisty(theme[propName]) ){
						validTheme[propName]=theme[propName];
					}
				});
				return validTheme;
			},
			/**
			 * Create component theme with series name
			 * @param {Array.<string>} seriesNames - series names
			 * @param {object} fromTheme - from theme
			 * @param {object} toTheme - to theme
			 * @param {string} componentType - component type
			 * @returns {object}
			 * @private
			 */
			_createComponentThemeWithSeriesName:function( seriesNames, fromTheme, toTheme, componentType ){
				var self=this;
				var newTheme={};
				fromTheme=fromTheme || {};
				tui.util.forEachArray(seriesNames, function( seriesName ){
					var theme=fromTheme[seriesName] || self._pickValidTheme(fromTheme, componentType);
					if( tui.util.keys(theme).length ){
						newTheme[seriesName]=JSON.parse(JSON.stringify(defaultTheme[componentType]));
						self._overwriteTheme(theme, newTheme[seriesName]);
					}else{
						newTheme[seriesName]=JSON.parse(JSON.stringify(toTheme));
					}
				});
				return newTheme;
			},
			/**
			 * Set series colors.
			 * @param {object} theme - theme
			 * @param {object} rawTheme - raw theme
			 * @param {Array.<string>} baseColors - base colors
			 * @private
			 */
			_setSingleColorsThemeIfNeed:function( theme, rawTheme, baseColors ){
				// TODO 추후 수정을 위해 singleColor파트는 최대한 건드리지 않음
				if( rawTheme && rawTheme.singleColors && rawTheme.singleColors.length ){
					theme.singleColors=rawTheme.singleColors.concat(baseColors);
				}
			},
			/**
			 * Make each series's color
			 * @param {Array.<string>} themeColors Theme colors to use
			 * @param {number} seriesCount Series count
			 * @param {number} startColorIndex Start color index
			 * @returns {Array.<string>} colors
			 */
			_makeEachSeriesColors:function( themeColors, seriesCount, startColorIndex ){
				var colors=[];
				var themeColorsLen=themeColors.length;
				var colorIndex=startColorIndex || 0;
				var i;
				for( i=0; i < seriesCount; i+=1 ){
					colors.push(themeColors[colorIndex]);
					colorIndex+=1;
					if( colorIndex >= themeColorsLen ){
						colorIndex=0;
					}
				}
				return colors;
			},
			/**
			 * Set series colors theme.
			 * @param {Array.<string>} seriesTypes - series type
			 * @param {object} seriesThemes - series theme map
			 * @param {object} rawSeriesThemes - raw series theme map
			 * @param {object} rawSeriesData - raw series data
			 * @private
			 */
			_setSeriesColors:function( seriesTypes, seriesThemes, rawSeriesThemes, rawSeriesData ){
				var self=this;
				var seriesColors, seriesCount, hasOwnColors;
				var colorIndex=0;
				rawSeriesThemes=rawSeriesThemes || {}; // 분기문 간소화를위해
				tui.util.forEachArray(seriesTypes, function( seriesType ){
					if( rawSeriesThemes[seriesType] ){
						seriesColors=rawSeriesThemes[seriesType].colors;
						hasOwnColors=true;
					}else{
						seriesColors=rawSeriesThemes.colors || defaultTheme.series.colors;
						hasOwnColors=false;
					}
					seriesCount=rawSeriesData[seriesType] ? rawSeriesData[seriesType].length : 0;
					seriesThemes[seriesType].colors=self._makeEachSeriesColors(seriesColors,
						seriesCount,
						!hasOwnColors && colorIndex);
					self._setSingleColorsThemeIfNeed(seriesThemes[seriesType],
						rawSeriesThemes,
						seriesColors);
					// To distinct between series that use default theme, we make the colors different
					if( !hasOwnColors ){
						colorIndex=(seriesCount+colorIndex)%seriesColors.length;
					}
				});
			},
			/**
			 * Init theme.
			 * @param {string} themeName - theme name
			 * @param {object} rawTheme - raw theme
			 * @param {Array.<string>} seriesNames - series names
			 * @param {object} rawSeriesData - raw series data
			 * @returns {object}
			 * @private
			 * @ignore
			 */
			_initTheme:function( themeName, rawTheme, seriesNames, rawSeriesData ){
				var theme;
				// 테마 선택, 디폴트 테마 or 유저가 지정하는 컬러
				if( themeName!==chartConst.DEFAULT_THEME_NAME ){
					theme=JSON.parse(JSON.stringify(defaultTheme));
					this._overwriteTheme(rawTheme, theme);
				}else{
					theme=JSON.parse(JSON.stringify(rawTheme));
				}
				// 각 컴포넌트 테마에 시리즈명별로 뎊스를 넣어준다. theme.yAxis.테마들 -> theme.yAxis.line.테마들
				theme.yAxis=this._createComponentThemeWithSeriesName(seriesNames, rawTheme.yAxis, theme.yAxis, 'yAxis');
				theme.series=this._createComponentThemeWithSeriesName(seriesNames, rawTheme.series, theme.series, 'series');
				this._setSeriesColors(seriesNames, theme.series, rawTheme.series, rawSeriesData);
				return theme;
			},
			/**
			 * Create target themes for font inherit.
			 * @param {object} theme - theme
			 * @returns {Array.<object>}
			 * @private
			 */
			_createTargetThemesForFontInherit:function( theme ){
				var items=[
					theme.title,
					theme.xAxis.title,
					theme.xAxis.label,
					theme.legend.label,
					theme.plot.label
				];
				tui.util.forEach(theme.yAxis, function( _theme ){
					items.push(_theme.title, _theme.label);
				});
				tui.util.forEach(theme.series, function( _theme ){
					items.push(_theme.label);
				});
				return items;
			},
			/**
			 * Inherit theme font.
			 * @param {object} theme theme
			 * @private
			 */
			_inheritThemeFont:function( theme ){
				var targetThemes=this._createTargetThemesForFontInherit(theme);
				var baseFont=theme.chart.fontFamily;
				tui.util.forEachArray(targetThemes, function( item ){
					if( !item.fontFamily ){
						item.fontFamily=baseFont;
					}
				});
			},
			/**
			 * Copy color theme to otherTheme from seriesTheme.
			 * @param {object} seriesTheme - series theme
			 * @param {object} otherTheme - other theme
			 * @param {object} seriesName - series name
			 * @private
			 */
			_copySeriesColorTheme:function( seriesTheme, otherTheme, seriesName ){
				otherTheme[seriesName]={
					colors:seriesTheme.colors,
					singleColors:seriesTheme.singleColors,
					borderColor:seriesTheme.borderColor,
					selectionColor:seriesTheme.selectionColor
				};
			},
			/**
			 * Copy series color theme to other components.
			 * @param {object} theme theme
			 * @private
			 * @ignore
			 */
			_copySeriesColorThemeToOther:function( theme ){
				var self=this;
				tui.util.forEach(theme.series, function( seriesTheme, seriesName ){
					self._copySeriesColorTheme(seriesTheme, theme.legend, seriesName);
					self._copySeriesColorTheme(seriesTheme, theme.tooltip, seriesName);
				});
			},
			/**
			 * Get theme.
			 * @param {string} themeName - theme name
			 * @param {string} chartType - chart type
			 * @param {object} rawSeriesData - raw series data
			 * @returns {object}
			 */
			get:function( themeName, chartType, rawSeriesData ){
				var rawTheme=themes[themeName];
				var theme, seriesNames;
				if( !rawTheme ){
					throw new Error('Not exist '+themeName+' theme.');
				}
				seriesNames=this._pickSeriesNames(chartType, rawSeriesData);
				theme=this._initTheme(themeName, rawTheme, seriesNames, rawSeriesData);
				this._inheritThemeFont(theme, seriesNames);
				this._copySeriesColorThemeToOther(theme);
				return theme;
			}
		};
		/***/
	},
	/* 9 */
	/***/ function( module, exports ){
		'use strict';
		var DEFAULT_COLOR='#000000';
		var DEFAULT_BACKGROUND='#ffffff';
		var DEFAULT_FONTWEIGHT='normal';
		var EMPTY='';
		var DEFAULT_AXIS={
			tickColor:DEFAULT_COLOR,
			title:{
				fontSize:12,
				fontFamily:EMPTY,
				color:DEFAULT_COLOR,
				fontWeight:DEFAULT_FONTWEIGHT
			},
			label:{
				fontSize:12,
				fontFamily:EMPTY,
				color:DEFAULT_COLOR,
				fontWeight:DEFAULT_FONTWEIGHT
			}
		};
		var defaultTheme={
			chart:{
				background:DEFAULT_BACKGROUND,
				fontFamily:'Verdana'
			},
			title:{
				fontSize:18,
				fontFamily:EMPTY,
				color:DEFAULT_COLOR,
				fontWeight:DEFAULT_FONTWEIGHT
			},
			yAxis:DEFAULT_AXIS,
			xAxis:DEFAULT_AXIS,
			plot:{
				lineColor:'#666',
				background:'#ffffff',
				label:{
					fontSize:16,
					fontFamily:EMPTY,
					color:'#333'
				}
			},
			series:{
				label:{
					fontSize:11,
					fontFamily:EMPTY,
					color:DEFAULT_COLOR,
					fontWeight:DEFAULT_FONTWEIGHT
				},
				colors:['#ac4142', '#d28445', '#f4bf75', '#90a959', '#75b5aa', '#6a9fb5', '#aa759f', '#8f5536'],
				singleColors:[],
				borderColor:EMPTY,
				borderWidth:EMPTY,
				selectionColor:EMPTY,
				startColor:'#F4F4F4',
				endColor:'#345391',
				overColor:'#F0C952'
			},
			legend:{
				label:{
					fontSize:12,
					fontFamily:EMPTY,
					color:DEFAULT_COLOR,
					fontWeight:DEFAULT_FONTWEIGHT
				}
			},
			tooltip:{}
		};
		module.exports=defaultTheme;
		/***/
	},
	/* 10 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview  Map Manager.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var maps={};
		module.exports={
			/**
			 * Get map data.
			 * @param {string} mapName map name
			 * @returns {Array} map data
			 */
			get:function( mapName ){
				var data=maps[mapName];
				if( !data ){
					throw new Error('Not exist '+mapName+' map.');
				}
				return data;
			},
			/**
			 * Register Map.
			 * @param {string} mapName map name
			 * @param {Array} data map data
			 */
			register:function( mapName, data ){
				maps[mapName]=data;
			}
		};
		/***/
	},
	/* 11 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview util for object
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/**
		 * Deep copy.
		 * @memberOf module:objectUtil
		 * @param {object|Array|*} origin - original data
		 * @returns {*}
		 */
		var deepCopy=function( origin ){
			var clone;
			if( tui.util.isArray(origin) ){
				clone=[];
				tui.util.forEachArray(origin, function( value, index ){
					clone[index]=deepCopy(value);
				});
			}else if( tui.util.isFunction(origin) || tui.util.isDate(origin) ){
				clone=origin;
			}else if( tui.util.isObject(origin) ){
				clone={};
				tui.util.forEach(origin, function( value, key ){
					clone[key]=deepCopy(value);
				});
			}else{
				clone=origin;
			}
			return clone;
		};
		/**
		 * util for object
		 * @module objectUtil
		 * @private */
		var objectUtil={
			deepCopy:deepCopy
		};
		module.exports=objectUtil;
		/***/
	},
	/* 12 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileOverview Series data importer
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var arrayUtil=__webpack_require__(6);
		
		/**
		 * Get series data from 2D array
		 * @param {Array.<Array>} table2DArray - extracted 2DArray from table element
		 * @returns {{
	 *     series: Array.<object>,
	 *     categories: Array.<string>
	 *         }}
		 * @private
		 */
		function getChartDataFrom2DArray ( table2DArray ){
			var chartData;
			if( table2DArray.length > 0 ){
				chartData={};
				chartData.categories=[];
				chartData.series=[];
				chartData.categories=table2DArray.shift().slice(1);
				tui.util.forEach(table2DArray, function( tr ){
					var seriesDatum={};
					seriesDatum.name=tr[0];
					seriesDatum.data=tr.slice(1);
					chartData.series.push(seriesDatum);
				});
			}
			return chartData;
		}
		
		/**
		 * Get pivoted second dimension array from table to use element.innerText
		 * @param {HTMLElement} tableElement - table element for extract chart's raw data
		 * @returns {Array.<Array>}
		 * @private
		 */
		function get2DArray ( tableElement ){
			var trs=[];
			var secondDimensionArray=[];
			var resultArray=[];
			if( tableElement ){
				trs=tui.util.toArray(tableElement.getElementsByTagName('TR'));
				tui.util.forEach(trs, function( tr, index ){
					var tagName=index===0 ? 'TH' : 'TD';
					var cells=tui.util.toArray(tr.getElementsByTagName(tagName));
					var rows=tui.util.pluck(cells, 'innerText');
					secondDimensionArray.push(rows);
				});
				if( secondDimensionArray[0].length < secondDimensionArray[1].length ){
					secondDimensionArray[0].unshift('');
				}
				resultArray=arrayUtil.pivot(secondDimensionArray);
			}
			return resultArray;
		}
		
		/**
		 * Make chart data with table element
		 * @param {({
	 *     elementId:string
	 * }|{
	 *     element:HTMLElement
	 * })} table - object for table data import
		 * @returns {rawData}
		 * @api
		 */
		function makeDataWithTable ( table ){
			var element, chartData;
			if( table.element && table.element.tagName==='TABLE' ){
				element=table.element;
			}else if( table.elementId ){
				element=document.getElementById(table.elementId);
			}
			chartData=getChartDataFrom2DArray(get2DArray(element));
			return chartData;
		}
		
		module.exports={
			makeDataWithTable:makeDataWithTable
		};
		/***/
	},
	/* 13 */
	/***/ function( module, exports ){
		
		// removed by extract-text-webpack-plugin
		/***/
	},
	/* 14 */,
	/* 15 */
	/***/ function( module, exports ){
		
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
		// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
		if( !window.JSON ){
			window.JSON={
				parse:function( sJSON ){
					return eval('('+sJSON+')');
				},
				stringify:(function(){
					var toString=Object.prototype.toString;
					var isArray=Array.isArray || function( a ){
							return toString.call(a)==='[object Array]';
						};
					var escMap={ '"':'\\"', '\\':'\\\\', '\b':'\\b', '\f':'\\f', '\n':'\\n', '\r':'\\r', '\t':'\\t' };
					var escFunc=function( m ){
						return escMap[m] || '\\u'+(m.charCodeAt(0)+0x10000).toString(16).substr(1);
					};
					var escRE=/[\\"\u0000-\u001F\u2028\u2029]/g;
					return function stringify ( value ){
						if( value==null ){
							return 'null';
						}else if( typeof value==='number' ){
							return isFinite(value) ? value.toString() : 'null';
						}else if( typeof value==='boolean' ){
							return value.toString();
						}else if( typeof value==='object' ){
							if( typeof value.toJSON==='function' ){
								return stringify(value.toJSON());
							}else if( isArray(value) ){
								var res='[';
								for( var i=0; i < value.length; i++ )
									res+=(i ? ', ' : '')+stringify(value[i]);
								return res+']';
							}else if( toString.call(value)==='[object Object]' ){
								var tmp=[];
								for( var k in value ){
									if( value.hasOwnProperty(k) )
										tmp.push(stringify(k)+': '+stringify(value[k]));
								}
								return '{'+tmp.join(', ')+'}';
							}
						}
						return '"'+value.toString().replace(escRE, escFunc)+'"';
					};
				})()
			};
		}
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
		// Any copyright is dedicated to the Public Domain. http://creativecommons.org/publicdomain/zero/1.0/
		if( typeof Object.create!='function' ){
			Object.create=(function( undefined ){
				var Temp=function(){
				};
				return function( prototype, propertiesObject ){
					if( prototype!==Object(prototype) && prototype!==null ){
						throw TypeError('Argument must be an object, or null');
					}
					Temp.prototype=prototype || {};
					if( propertiesObject!==undefined ){
						Object.defineProperties(Temp.prototype, propertiesObject);
					}
					var result=new Temp();
					Temp.prototype=null;
					// to imitate the case of Object.create(null)
					if( prototype===null ){
						result.__proto__=null;
					}
					return result;
				};
			})();
		}
		// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
		// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
		// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
		// MIT license
		(function(){
			var lastTime=0;
			var vendors=['ms', 'moz', 'webkit', 'o'];
			for( var x=0; x < vendors.length && !window.requestAnimationFrame; ++x ){
				window.requestAnimationFrame=window[vendors[x]+'RequestAnimationFrame'];
				window.cancelAnimationFrame=window[vendors[x]+'CancelAnimationFrame']
					|| window[vendors[x]+'CancelRequestAnimationFrame'];
			}
			if( !window.requestAnimationFrame ){
				window.requestAnimationFrame=function( callback ){
					var currTime=new Date().getTime();
					var timeToCall=Math.max(0, 16-(currTime-lastTime));
					var id=window.setTimeout(function(){
							callback(currTime+timeToCall);
						},
						timeToCall);
					lastTime=currTime+timeToCall;
					return id;
				};
			}
			if( !window.cancelAnimationFrame ){
				window.cancelAnimationFrame=function( id ){
					clearTimeout(id);
				};
			}
		}());
		/***/
	},
	/* 16 */
	/***/ function( module, exports, __webpack_require__ ){
		'use strict';
		var chartConst=__webpack_require__(2);
		var chartFactory=__webpack_require__(3);
		var BarChart=__webpack_require__(17);
		var ColumnChart=__webpack_require__(95);
		var LineChart=__webpack_require__(96);
		var AreaChart=__webpack_require__(100);
		var ColumnLineComboChart=__webpack_require__(101);
		var LineScatterComboChart=__webpack_require__(104);
		var LineAreaComboChart=__webpack_require__(105);
		var PieDonutComboChart=__webpack_require__(106);
		var PieChart=__webpack_require__(108);
		var BubbleChart=__webpack_require__(109);
		var ScatterChart=__webpack_require__(110);
		var HeatmapChart=__webpack_require__(111);
		var TreemapChart=__webpack_require__(114);
		var MapChart=__webpack_require__(115);
		var RadialChart=__webpack_require__(118);
		chartFactory.register(chartConst.CHART_TYPE_BAR, BarChart);
		chartFactory.register(chartConst.CHART_TYPE_COLUMN, ColumnChart);
		chartFactory.register(chartConst.CHART_TYPE_LINE, LineChart);
		chartFactory.register(chartConst.CHART_TYPE_AREA, AreaChart);
		chartFactory.register(chartConst.CHART_TYPE_COLUMN_LINE_COMBO, ColumnLineComboChart);
		chartFactory.register(chartConst.CHART_TYPE_LINE_SCATTER_COMBO, LineScatterComboChart);
		chartFactory.register(chartConst.CHART_TYPE_LINE_AREA_COMBO, LineAreaComboChart);
		chartFactory.register(chartConst.CHART_TYPE_PIE_DONUT_COMBO, PieDonutComboChart);
		chartFactory.register(chartConst.CHART_TYPE_PIE, PieChart);
		chartFactory.register(chartConst.CHART_TYPE_BUBBLE, BubbleChart);
		chartFactory.register(chartConst.CHART_TYPE_SCATTER, ScatterChart);
		chartFactory.register(chartConst.CHART_TYPE_HEATMAP, HeatmapChart);
		chartFactory.register(chartConst.CHART_TYPE_TREEMAP, TreemapChart);
		chartFactory.register(chartConst.CHART_TYPE_MAP, MapChart);
		chartFactory.register(chartConst.CHART_TYPE_RADIAL, RadialChart);
		/***/
	},
	/* 17 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Bar chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var chartConst=__webpack_require__(2);
		var axisTypeMixer=__webpack_require__(94);
		var rawDataHandler=__webpack_require__(4);
		var predicate=__webpack_require__(5);
		var BarChart=tui.util.defineClass(ChartBase, /** @lends BarChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-bar-chart',
			/**
			 * Bar chart.
			 * @constructs BarChart
			 * @extends ChartBase
			 * @mixes axisTypeMixer
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				rawDataHandler.updateRawSeriesDataByOptions(rawData, options.series);
				this._updateOptionsRelatedDiverging(options);
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true
				});
			},
			/**
			 * Update options related diverging option.
			 * @param {object} options - options
			 * @private
			 */
			_updateOptionsRelatedDiverging:function( options ){
				var isCenter;
				options.series=options.series || {};
				/**
				 * Whether has right y axis or not.
				 * @type {boolean}
				 */
				this.hasRightYAxis=false;
				if( options.series.diverging ){
					options.yAxis=options.yAxis || {};
					options.xAxis=options.xAxis || {};
					options.plot=options.plot || {};
					options.series.stackType=options.series.stackType || chartConst.NORMAL_STACK_TYPE;
					this.hasRightYAxis=tui.util.isArray(options.yAxis) && options.yAxis.length > 1;
					isCenter=predicate.isYAxisAlignCenter(this.hasRightYAxis, options.yAxis.align);
					options.yAxis.isCenter=isCenter;
					options.xAxis.divided=isCenter;
					options.series.divided=isCenter;
					options.plot.divided=isCenter;
				}
			},
			/**
			 * Add components
			 * @private
			 */
			_addComponents:function(){
				var axes=[
					{
						name:'yAxis',
						isVertical:true
					},
					{
						name:'xAxis'
					}
				];
				if( this.hasRightYAxis ){
					axes.push({
						name:'rightYAxis',
						isVertical:true
					});
				}
				this._addComponentsForAxisType({
					axis:axes,
					series:[
						{
							name:'barSeries'
						}
					],
					plot:true
				});
			},
			/**
			 * Get scale option.
			 * @returns {{xAxis: boolean}}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				return {
					xAxis:true
				};
			},
			/**
			 * On change selected legend.
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 */
			onChangeCheckedLegends:function( checkedLegends ){
				var boundParams;
				if( this.hasRightYAxis ){
					boundParams={
						optionChartTypes:['bar', 'bar']
					};
				}
				ChartBase.prototype.onChangeCheckedLegends.call(this, checkedLegends, null, boundParams);
			}
		});
		tui.util.extend(BarChart.prototype, axisTypeMixer);
		module.exports=BarChart;
		/***/
	},
	/* 18 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview ChartBase
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var ComponentManager=__webpack_require__(19);
		var DefaultDataProcessor=__webpack_require__(74);
		var rawDataHandler=__webpack_require__(4);
		var dom=__webpack_require__(20);
		var renderUtil=__webpack_require__(23);
		var boundsAndScaleBuilder=__webpack_require__(82);
		var ChartBase=tui.util.defineClass(/** @lends ChartBase.prototype */ {
			/**
			 * Chart base.
			 * @constructs ChartBase
			 * @param {object} params parameters
			 *      @param {object} params.rawData raw data
			 *      @param {object} params.theme chart theme
			 *      @param {object} params.options chart options
			 *      @param {boolean} params.hasAxes whether has axes or not
			 *      @param {boolean} params.isVertical whether vertical or not
			 *      @param {DataProcessor} params.DataProcessor DataProcessor
			 */
			init:function( params ){
				/**
				 * theme
				 * @type {object}
				 */
				this.theme=params.theme;
				this._initializeOptions(params.options);
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=this.options.chartType;
				/**
				 * whether chart has axes or not
				 * @type {boolean}
				 */
				this.hasAxes=params.hasAxes;
				/**
				 * whether vertical or not
				 * @type {boolean}
				 */
				this.isVertical= !!params.isVertical;
				/**
				 * data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=this._createDataProcessor(params);
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=new tui.util.CustomEvents();
				/**
				 * previous xAxis data
				 * @type {null|object}
				 */
				this.prevXAxisData=null;
				/**
				 * component manager
				 * @type {ComponentManager}
				 */
				this.componentManager=this._createComponentManager();
				this._addComponents();
				this._attachToEventBus();
			},
			/**
			 * Attach to event bus.
			 * @private
			 */
			_attachToEventBus:function(){
				this.eventBus.on('changeCheckedLegends', this.onChangeCheckedLegends, this);
				if( this.onZoom ){
					this.eventBus.on({
						zoom:this.onZoom,
						resetZoom:this.onResetZoom
					}, this);
				}
			},
			/**
			 * Set offset property
			 * @param {{offset: object}} options - options
			 * @param {string} fromProperty - from property name
			 * @param {string} toProperty - to property name
			 * @private
			 */
			_setOffsetProperty:function( options, fromProperty, toProperty ){
				if( !tui.util.isExisty(options[fromProperty]) ){
					return;
				}
				options.offset=options.offset || {};
				options.offset[toProperty]=options[fromProperty];
				delete options[fromProperty];
			},
			/**
			 * Initialize offset.
			 * @param {{offsetX: ?number, offsetY: ?number}} options - offset options
			 * @private
			 */
			_initializeOffset:function( options ){
				if( !options ){
					return;
				}
				this._setOffsetProperty(options, 'offsetX', 'x');
				this._setOffsetProperty(options, 'offsetY', 'y');
			},
			/**
			 * Initialize title options.
			 * @param {
	     *      Array.<{title: (string | {text: string, offsetX: number, offsetY: number})}> |
	     *      {title: (string | {text: string, offsetX: number, offsetY: number})}
	     * } targetOptions - target options
			 * @private
			 */
			_initializeTitleOptions:function( targetOptions ){
				var self=this;
				var optionsSet;
				if( !targetOptions ){
					return;
				}
				optionsSet=tui.util.isArray(targetOptions) ? targetOptions : [targetOptions];
				tui.util.forEachArray(optionsSet, function( options ){
					var title=options.title;
					if( tui.util.isString(title) ){
						options.title={
							text:title
						};
					}
					self._initializeOffset(options.title);
				});
			},
			/**
			 * Initialize tooltip options.
			 * @param {{grouped: ?boolean, offsetX: ?number, offsetY: ?number}} options - tooltip options
			 * @private
			 */
			_initializeTooltipOptions:function( options ){
				var position=options.position;
				options.grouped= !!options.grouped;
				this._initializeOffset(options);
				if( !options.offset && position ){
					options.offset={
						x:position.left,
						y:position.top
					};
				}
				delete options.position;
			},
			/**
			 * Initialize options.
			 * @param {object} options - options for chart
			 * @private
			 */
			_initializeOptions:function( options ){
				options.xAxis=options.xAxis || {};
				options.series=options.series || {};
				options.tooltip=options.tooltip || {};
				options.legend=options.legend || {};
				options.chartExportMenu=options.chartExportMenu || {};
				this._initializeTitleOptions(options.chart);
				this._initializeTitleOptions(options.xAxis);
				this._initializeTitleOptions(options.yAxis);
				if( tui.util.isUndefined(options.legend.visible) ){
					options.legend.visible=true;
				}
				if( tui.util.isUndefined(options.chartExportMenu.visible) ){
					options.chartExportMenu.visible=true;
				}
				this._initializeTooltipOptions(options.tooltip);
				/**
				 * options
				 * @type {object}
				 */
				this.options=options;
			},
			/**
			 * Create dataProcessor for processing raw data.
			 * @param {object} params parameters
			 *      @param {object} params.rawData - raw data
			 *      @param {DataProcessor} params.DataProcessor - DataProcessor class
			 *      @param {{chart: object, chartType: string}} params.options - chart options
			 *      @param {Array} params.seriesNames series - chart types for rendering series
			 * @returns {object} data processor
			 * @private
			 */
			_createDataProcessor:function( params ){
				var DataProcessor, dataProcessor;
				DataProcessor=params.DataProcessor || DefaultDataProcessor;
				dataProcessor=new DataProcessor(params.rawData, this.chartType, params.options, this.seriesNames);
				return dataProcessor;
			},
			/**
			 * Create ComponentManager.
			 * @returns {ComponentManager}
			 * @private
			 */
			_createComponentManager:function(){
				return new ComponentManager({
					options:this.options,
					theme:this.theme,
					dataProcessor:this.dataProcessor,
					hasAxes:this.hasAxes,
					eventBus:this.eventBus
				});
			},
			/**
			 * Make data for initialize tooltip component.
			 * @param {string} classType - component class type
			 * @param {object} tooltipOptions tooltip option
			 * @returns {object} tooltip data
			 * @private
			 */
			_makeTooltipData:function( classType, tooltipOptions ){
				return {
					isVertical:this.isVertical,
					chartType:this.chartType,
					chartTypes:this.chartTypes,
					xAxisType:this.options.xAxis.type,
					dateFormat:this.options.xAxis.dateFormat,
					tooltipOptions:(tooltipOptions || {}),
					classType:(classType || 'tooltip')
				};
			},
			/**
			 * Add components.
			 * @private
			 * @abstract
			 */
			_addComponents:function(){
			},
			/**
			 * Render chart title.
			 * @param {HTMLElement} container - container
			 * @private
			 */
			_renderTitle:function( container ){
				var chartOptions=this.options.chart || {};
				var title=chartOptions.title || {};
				var titleElement=renderUtil.renderTitle(title.text, this.theme.title, 'tui-chart-title');
				if( title.offset ){
					renderUtil.renderPosition(titleElement, {
						left:title.offset.x,
						top:title.offset.y
					});
				}
				dom.append(container, titleElement);
			},
			/**
			 * Get scale option.
			 * @private
			 * @abstract
			 */
			_getScaleOption:function(){
			},
			/**
			 * Build bounds and scale data.
			 * @param {object} prevXAxisData - previous xAxis data
			 * @param {boolean} addingDataMode - whether adding data mode or not
			 * @returns {{
	     *      layoutBounds: {
	     *          dimensionMap: {
	     *              xAxis: {width: number, height: number},
	     *              yAxis: {width: number, height: number},
	     *              rightYAxis: {width: number, height: number},
	     *              series: {width: number, height: number},
	     *              extendedSeries: {width: number, height: number},
	     *              mouseEventDetector: {width: number, height: number},
	     *              legend: {width: number, height: number},
	     *              tooltip: {width: number, height: number}
	     *          },
	     *          positionMap: {
	     *              xAxis: {left: number, top: number},
	     *              yAxis: {left: number, top: number},
	     *              rightYAxis: {left: number, top: number},
	     *              series: {left: number, top: number},
	     *              extendedSeries: {left: number, top: number},
	     *              mouseEventDetector: {left: number, top: number},
	     *              legend: {left: number, top: number},
	     *              tooltip: {left: number, top: number}
	     *          }
	     *      },
	     *      limitMap: {
	     *          xAxis: {min: number, max: number},
	     *          yAxis: {min: number, max: number}
	     *      },
	     *      axisDataMap: {
	     *          xAxis: object,
	     *          yAxis: object,
	     *          yRightAxis: object
	     *      },
	     *      maxRadius: ?number
	     * }}
			 * @private
			 */
			_buildBoundsAndScaleData:function( prevXAxisData, addingDataMode ){
				return boundsAndScaleBuilder.build(this.dataProcessor, this.componentManager, {
					chartType:this.chartType,
					seriesNames:this.seriesNames,
					options:this.options,
					theme:this.theme,
					hasAxes:this.hasAxes,
					scaleOption:this._getScaleOption(),
					isVertical:this.isVertical,
					hasRightYAxis:this.hasRightYAxis,
					addedDataCount:this.addedDataCount,
					prevXAxisData:prevXAxisData,
					addingDataMode:addingDataMode
				});
			},
			/**
			 * Add data ratios.
			 * @private
			 * @abstract
			 */
			_addDataRatios:function(){
			},
			/**
			 * Common render function for rendering functions like render, rerender, resize and zoom.
			 * @param {function} onRender render callback function
			 * @param {?boolean} addingDataMode - whether adding data mode or not
			 * @private
			 */
			_render:function( onRender, addingDataMode ){
				var boundsAndScale=this._buildBoundsAndScaleData(this.prevXAxisData, addingDataMode);
				if( boundsAndScale.axisDataMap.xAxis ){
					this.prevXAxisData=boundsAndScale.axisDataMap.xAxis;
				}
				// 비율값 추가
				this._addDataRatios(boundsAndScale.limitMap);
				onRender(boundsAndScale);
			},
			/**
			 * Render chart.
			 * @returns {HTMLElement} chart element
			 */
			render:function(){
				var container=dom.create('DIV', 'tui-chart '+this.className);
				var componentManager=this.componentManager;
				var dataProcessor=this.dataProcessor;
				var seriesVisibilityMap=dataProcessor.getLegendVisibility();
				var rawData=rawDataHandler.filterCheckedRawData(dataProcessor.rawData, seriesVisibilityMap);
				this.dataProcessor.initData(rawData);
				this._renderTitle(container);
				renderUtil.renderBackground(container, this.theme.chart.background);
				renderUtil.renderFontFamily(container, this.theme.chart.fontFamily);
				this._render(function( boundsAndScale ){
					renderUtil.renderDimension(container, boundsAndScale.dimensionMap.chart);
					componentManager.render('render', boundsAndScale, {
						checkedLegends:seriesVisibilityMap
					}, container);
				});
				this.chartContainer=container;
				return container;
			},
			/**
			 * Rerender.
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 * @param {?object} rawData rawData
			 * @private
			 */
			_rerender:function( checkedLegends, rawData ){
				var self=this;
				var dataProcessor=this.dataProcessor;
				if( !rawData ){
					rawData=rawDataHandler.filterCheckedRawData(dataProcessor.getZoomedRawData(), checkedLegends);
				}
				this.dataProcessor.initData(rawData);
				this._render(function( boundsAndScale ){
					self.componentManager.render('rerender', boundsAndScale, {
						checkedLegends:checkedLegends
					});
				});
			},
			/**
			 * On change checked legend.
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 * @param {?object} rawData rawData
			 * @param {?object} boundsParams addition params for calculating bounds
			 */
			onChangeCheckedLegends:function( checkedLegends, rawData, boundsParams ){
				this._rerender(checkedLegends, rawData, boundsParams);
			},
			/**
			 * Animate chart.
			 */
			animateChart:function(){
				this.componentManager.execute('animateComponent');
			},
			/**
			 * Register of user event.
			 * @param {string} eventName event name
			 * @param {function} func event callback
			 */
			on:function( eventName, func ){
				if( chartConst.PUBLIC_EVENT_MAP[eventName] ){
					this.eventBus.on(chartConst.PUBLIC_EVENT_PREFIX+eventName, func);
				}
			},
			/**
			 * Update dimension of chart.
			 * @param {{width: number, height: number}} dimension dimension
			 * @returns {boolean} whether updated or not
			 * @private
			 */
			_updateChartDimension:function( dimension ){
				var updated=false;
				var options=this.options;
				options.chart=options.chart || {};
				if( dimension.width && dimension.width > 0 && options.chart.width!==dimension.width ){
					options.chart.width=dimension.width;
					updated=true;
				}
				if( dimension.height && dimension.height > 0 && options.chart.height!==dimension.height ){
					options.chart.height=dimension.height;
					updated=true;
				}
				return updated;
			},
			/**
			 * Public API for resizable.
			 * @param {object} dimension dimension
			 *      @param {number} dimension.width width
			 *      @param {number} dimension.height height
			 * @api
			 */
			resize:function( dimension ){
				var self=this;
				var updated;
				if( !dimension ){
					return;
				}
				updated=this._updateChartDimension(dimension);
				if( !updated ){
					return;
				}
				this._render(function( boundsAndScale ){
					renderUtil.renderDimension(self.chartContainer, boundsAndScale.dimensionMap.chart);
					self.componentManager.render('resize', boundsAndScale);
				});
			},
			/**
			 * Set tooltip align option.
			 * @param {string} align align (left|center|right, top|middle|bottom)
			 * @api
			 */
			setTooltipAlign:function( align ){
				this.componentManager.get('tooltip').setAlign(align);
			},
			/**
			 * Set tooltip offset option.
			 * @param {object} offset - tooltip offset
			 *      @param {number} offset.x - offset x
			 *      @param {number} offset.y - offset y
			 * @api
			 */
			setTooltipOffset:function( offset ){
				this.componentManager.get('tooltip').setOffset(offset);
			},
			/**
			 * Set position option.
			 * @param {object} position moving position
			 *      @param {number} position.left left
			 *      @param {number} position.top top
			 * @api
			 * @deprecated
			 */
			setTooltipPosition:function( position ){
				this.componentManager.get('tooltip').setPosition(position);
			},
			/**
			 * Reset tooltip align option.
			 * @api
			 */
			resetTooltipAlign:function(){
				this.componentManager.get('tooltip').resetAlign();
			},
			/**
			 * Reset tooltip position.
			 * @api
			 */
			resetTooltipOffset:function(){
				this.componentManager.get('tooltip').resetOffset();
			},
			/**
			 * Reset tooltip position.
			 * @api
			 * @deprecated
			 */
			resetTooltipPosition:function(){
				this.resetTooltipOffset();
			},
			/**
			 * Show series label.
			 * @api
			 */
			showSeriesLabel:function(){
				var seriesSet=this.componentManager.where({ componentType:'series' });
				tui.util.forEachArray(seriesSet, function( series ){
					series.showLabel();
				});
			},
			/**
			 * Hide series label.
			 * @api
			 */
			hideSeriesLabel:function(){
				var seriesSet=this.componentManager.where({ componentType:'series' });
				tui.util.forEachArray(seriesSet, function( series ){
					series.hideLabel();
				});
			},
			/**
			 * Add data.
			 * @abstract
			 */
			addData:function(){
			},
			/**
			 * Add plot line.
			 * @abstract
			 */
			addPlotLine:function(){
			},
			/**
			 * Add plot band.
			 * @abstract
			 */
			addPlotBand:function(){
			},
			/**
			 * Remove plot line.
			 * @abstract
			 */
			removePlotLine:function(){
			},
			/**
			 * Remove plot band.
			 * @abstract
			 */
			removePlotBand:function(){
			}
		});
		module.exports=ChartBase;
		/***/
	},
	/* 19 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview ComponentManager manages components of chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var dom=__webpack_require__(20);
		var Axis=__webpack_require__(21);
		var Plot=__webpack_require__(26);
		var RadialPlot=__webpack_require__(28);
		var ChartExportMenu=__webpack_require__(30);
		// legends
		var Legend=__webpack_require__(33);
		var SpectrumLegend=__webpack_require__(36);
		var CircleLegend=__webpack_require__(37);
		// tooltips
		var Tooltip=__webpack_require__(38);
		var GroupTooltip=__webpack_require__(42);
		var MapChartTooltip=__webpack_require__(44);
		// mouse event detectors
		var AreaTypeEventDetector=__webpack_require__(45);
		var BoundsTypeEventDetector=__webpack_require__(51);
		var GroupTypeEventDetector=__webpack_require__(52);
		var MapChartEventDetector=__webpack_require__(53);
		var SimpleEventDetector=__webpack_require__(54);
		// series
		var BarSeries=__webpack_require__(55);
		var ColumnSeries=__webpack_require__(60);
		var LineSeries=__webpack_require__(61);
		var RadialSeries=__webpack_require__(63);
		var AreaSeries=__webpack_require__(64);
		var BubbleSeries=__webpack_require__(65);
		var ScatterSeries=__webpack_require__(67);
		var MapSeries=__webpack_require__(68);
		var PieSeries=__webpack_require__(69);
		var HeatmapSeries=__webpack_require__(70);
		var TreemapSeries=__webpack_require__(71);
		var Zoom=__webpack_require__(73);
		var COMPONENT_CLASS_MAP={
			axis:Axis,
			plot:Plot,
			radialPlot:RadialPlot,
			legend:Legend,
			spectrumLegend:SpectrumLegend,
			circleLegend:CircleLegend,
			tooltip:Tooltip,
			groupTooltip:GroupTooltip,
			mapChartTooltip:MapChartTooltip,
			areaTypeEventDetector:AreaTypeEventDetector,
			boundsTypeEventDetector:BoundsTypeEventDetector,
			groupTypeEventDetector:GroupTypeEventDetector,
			mapChartEventDetector:MapChartEventDetector,
			simpleEventDetector:SimpleEventDetector,
			barSeries:BarSeries,
			columnSeries:ColumnSeries,
			lineSeries:LineSeries,
			radialSeries:RadialSeries,
			areaSeries:AreaSeries,
			bubbleSeries:BubbleSeries,
			scatterSeries:ScatterSeries,
			mapSeries:MapSeries,
			pieSeries:PieSeries,
			heatmapSeries:HeatmapSeries,
			treemapSeries:TreemapSeries,
			zoom:Zoom,
			chartExportMenu:ChartExportMenu
		};
		var ComponentManager=tui.util.defineClass(/** @lends ComponentManager.prototype */ {
			/**
			 * ComponentManager manages components of chart.
			 * @param {object} params parameters
			 *      @param {object} params.theme - theme
			 *      @param {object} params.options - options
			 *      @param {DataProcessor} params.dataProcessor - data processor
			 *      @param {boolean} params.hasAxes - whether has axes or not
			 * @constructs ComponentManager
			 * @private
			 */
			init:function( params ){
				/**
				 * Components
				 * @type {Array.<object>}
				 */
				this.components=[];
				/**
				 * Component map.
				 * @type {object}
				 */
				this.componentMap={};
				/**
				 * theme
				 * @type {object}
				 */
				this.theme=params.theme || {};
				/**
				 * options
				 * @type {object}
				 */
				this.options=params.options || {};
				/**
				 * data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * whether chart has axes or not
				 * @type {boolean}
				 */
				this.hasAxes=params.hasAxes;
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=params.eventBus;
			},
			/**
			 * Make component options.
			 * @param {object} options options
			 * @param {string} componentType component type
			 * @param {number} index component index
			 * @returns {object} options
			 * @private
			 */
			_makeComponentOptions:function( options, componentType, index ){
				options=options || this.options[componentType];
				options=tui.util.isArray(options) ? options[index] : options || {};
				return options;
			},
			/**
			 * Register component.
			 * The component refers to a component of the chart.
			 * The component types are axis, legend, plot, series and mouseEventDetector.
			 * Chart Component Description : https://i-msdn.sec.s-msft.com/dynimg/IC267997.gif
			 * @param {string} name component name
			 * @param {object} params component parameters
			 */
			register:function( name, params ){
				var index, component, componentType, classType, Component;
				params=params || {};
				componentType=params.componentType || name;
				classType=params.classType || componentType || name;
				index=params.index || 0;
				params.theme=params.theme || this.theme[componentType];
				params.options=this._makeComponentOptions(params.options, componentType, index);
				params.dataProcessor=this.dataProcessor;
				params.hasAxes=this.hasAxes;
				params.eventBus=this.eventBus;
				Component=COMPONENT_CLASS_MAP[classType];
				component=new Component(params);
				component.componentName=name;
				component.componentType=componentType;
				this.components.push(component);
				this.componentMap[name]=component;
			},
			/**
			 * Make data for rendering.
			 * @param {string} name - component name
			 * @param {string} type - component type
			 * @param {object} paper - raphael object
			 * @param {{
	     *      layoutBounds: {
	     *          dimensionMap: object,
	     *          positionMap: object
	     *      },
	     *      limitMap: object,
	     *      axisDataMap: object,
	     *      maxRadius: ?number
	     * }} boundsAndScale - bounds and scale data
			 * @param {?object} additionalData - additional data
			 * @returns {object}
			 * @private
			 */
			_makeDataForRendering:function( name, type, paper, boundsAndScale, additionalData ){
				var data=tui.util.extend({
					paper:paper
				}, additionalData);
				if( boundsAndScale ){
					tui.util.extend(data, boundsAndScale);
					data.layout={
						dimension:data.dimensionMap[name] || data.dimensionMap[type],
						position:data.positionMap[name] || data.positionMap[type]
					};
				}
				return data;
			},
			/**
			 * Render components.
			 * @param {string} funcName - function name for executing
			 * @param {{
	     *      layoutBounds: {
	     *          dimensionMap: object,
	     *          positionMap: object
	     *      },
	     *      limitMap: object,
	     *      axisDataMap: object,
	     *      maxRadius: ?number
	     * }} boundsAndScale - bounds and scale data
			 * @param {?object} additionalData - additional data
			 * @param {?HTMLElement} container - container
			 */
			render:function( funcName, boundsAndScale, additionalData, container ){
				var self=this;
				var name, type, paper;
				var elements=tui.util.map(this.components, function( component ){
					var element=null;
					var data, result;
					if( component[funcName] ){
						name=component.componentName;
						type=component.componentType;
						data=self._makeDataForRendering(name, type, paper, boundsAndScale, additionalData);
						result=component[funcName](data);
						if( result && result.container ){
							element=result.container;
							paper=result.paper;
						}else{
							element=result;
						}
					}
					return element;
				});
				if( container ){
					dom.append(container, elements);
				}
			},
			/**
			 * Find components to conditionMap.
			 * @param {object} conditionMap condition map
			 * @returns {Array.<object>} filtered components
			 */
			where:function( conditionMap ){
				return tui.util.filter(this.components, function( component ){
					var contained=true;
					tui.util.forEach(conditionMap, function( value, key ){
						if( component[key]!==value ){
							contained=false;
						}
						return contained;
					});
					return contained;
				});
			},
			/**
			 * Execute components.
			 * @param {string} funcName - function name
			 */
			execute:function( funcName ){
				var args=Array.prototype.slice.call(arguments, 1);
				tui.util.forEachArray(this.components, function( component ){
					if( component[funcName] ){
						component[funcName].apply(component, args);
					}
				});
			},
			/**
			 * Get component.
			 * @param {string} name component name
			 * @returns {object} component instance
			 */
			get:function( name ){
				return this.componentMap[name];
			},
			/**
			 * Whether has component or not.
			 * @param {string} name - comopnent name
			 * @returns {boolean}
			 */
			has:function( name ){
				return !!this.get(name);
			}
		});
		module.exports=ComponentManager;
		/***/
	},
	/* 20 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview DOM Handler.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var aps=Array.prototype.slice;
		/**
		 * DOM Handler.
		 * @module domHandler
		 * @private */
		var domHandler={
			/**
			 * Create element.
			 * @memberOf module:domHandler
			 * @param {string} tag html tag
			 * @param {string} newClass class name
			 * @returns {HTMLElement} created element
			 */
			create:function( tag, newClass ){
				var el=document.createElement(tag);
				if( newClass ){
					this.addClass(el, newClass);
				}
				return el;
			},
			/**
			 * Get class names.
			 * @memberOf module:domHandler
			 * @param {HTMLElement} el target element
			 * @returns {Array} names
			 * @private
			 */
			_getClassNames:function( el ){
				var className, classNames;
				if( el.classList ){
					classNames=aps.call(el.classList);
				}else{
					className=el.className || '';
					classNames=className && tui.util.isString(className) ? className.split(' ') : [];
				}
				return classNames;
			},
			/**
			 * Add css class to target element.
			 * @memberOf module:domHandler
			 * @param {HTMLElement} el target element
			 * @param {string} newClass add class name
			 */
			addClass:function( el, newClass ){
				var classNames, index;
				if( !el || !newClass ){
					return;
				}
				classNames=this._getClassNames(el);
				index=tui.util.inArray(newClass, classNames);
				if( index > -1 ){
					return;
				}
				classNames.push(newClass);
				el.className=classNames.join(' ');
			},
			/**
			 * Remove css class from target element.
			 * @memberOf module:domHandler
			 * @param {HTMLElement} el target element
			 * @param {string} rmClass remove class name
			 */
			removeClass:function( el, rmClass ){
				var classNames=this._getClassNames(el),
					index=tui.util.inArray(rmClass, classNames);
				if( index=== -1 ){
					return;
				}
				classNames.splice(index, 1);
				el.className=classNames.join(' ');
			},
			/**
			 * Whether class exist or not.
			 * @memberOf module:domHandler
			 * @param {HTMLElement} el target element
			 * @param {string} findClass target css class
			 * @returns {boolean} has class
			 */
			hasClass:function( el, findClass ){
				var classNames=this._getClassNames(el);
				var index=tui.util.inArray(findClass, classNames);
				return index > -1;
			},
			/**
			 * Find parent by class name.
			 * @memberOf module:domHandler
			 * @param {HTMLElement} el target element
			 * @param {string} className target css class
			 * @param {string} lastClass last css class
			 * @returns {HTMLElement} result element
			 */
			findParentByClass:function( el, className, lastClass ){
				var parent=el.parentNode,
					result;
				if( !parent ){
					result=null;
				}else if( this.hasClass(parent, className) ){
					result=parent;
				}else if( parent.nodeName==='BODY' || this.hasClass(parent, lastClass) ){
					result=null;
				}else{
					result=this.findParentByClass(parent, className, lastClass);
				}
				return result;
			},
			/**
			 * Append child element.
			 * @memberOf module:domHandler
			 * @param {HTMLElement} container container element
			 * @param {HTMLElement} children child element
			 */
			append:function( container, children ){
				if( !container || !children ){
					return;
				}
				children=tui.util.isArray(children) ? children : [children];
				tui.util.forEachArray(children, function( child ){
					if( !child ){
						return;
					}
					container.appendChild(child);
				});
			}
		};
		module.exports=domHandler;
		/***/
	},
	/* 21 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview  Axis component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var dom=__webpack_require__(20);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var axisTemplate=__webpack_require__(24);
		var Axis=tui.util.defineClass(/** @lends Axis.prototype */ {
			/**
			 * Axis component.
			 * @constructs Axis
			 * @private
			 * @param {object} params parameters
			 *      @param {object} params.bound axis bound
			 *      @param {object} params.theme axis theme
			 *      @param {object} params.options axis options
			 */
			init:function( params ){
				/**
				 * Axis view className
				 * @type {string}
				 */
				this.className='tui-chart-axis-area';
				/**
				 * Data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * Options
				 * @type {object}
				 */
				this.options=params.options || {};
				/**
				 * Theme
				 * @type {object}
				 */
				this.theme=params.theme[params.seriesName] || params.theme;
				/**
				 * Whether label type or not.
				 * @type {boolean}
				 */
				this.isLabel=null;
				/**
				 * Whether vertical type or not.
				 */
				this.isVertical=params.isVertical;
				/**
				 * cached axis data
				 * @type {object}
				 */
				this.data={};
				/**
				 * layout bounds information for this components
				 * @type {null|{dimension:{width:number, height:number}, position:{left:number, top:number}}}
				 */
				this.layout=null;
				/**
				 * dimension map for layout of chart
				 * @type {null|object}
				 */
				this.dimensionMap=null;
				/**
				 * axis data map
				 * @type {null|object}
				 */
				this.axisDataMap=null;
			},
			/**
			 * Whether valid axis or not.
			 * @returns {boolean} whether valid axis or not.
			 * @private
			 */
			_isValidAxis:function(){
				var isValid=true;
				if( this.componentName==='rightYAxis' ){
					isValid=this.dataProcessor.isValidAllSeriesDataModel();
				}
				return isValid;
			},
			/**
			 * Render opposite side tick area.
			 * @param {string} tickHtml tick html
			 * @returns {?HTMLElement} right tick area element
			 * @private
			 */
			_renderOppositeSideTickArea:function( tickHtml ){
				var tickContainer;
				if( this.options.isCenter ){
					tickContainer=dom.create('DIV', 'tui-chart-tick-area opposite-side');
					tickContainer.innerHTML=tickHtml;
				}
				return tickContainer;
			},
			/**
			 * Add css classes.
			 * @param {HTMLElement} axisContainer axis container
			 * @private
			 */
			_addCssClasses:function( axisContainer ){
				dom.addClass(axisContainer, this.isVertical ? 'vertical' : 'horizontal');
				dom.addClass(axisContainer, this.options.isCenter ? 'center' : '');
				dom.addClass(axisContainer, this.options.divided ? 'division' : '');
				dom.addClass(axisContainer, this.data.isPositionRight ? 'right' : '');
			},
			/**
			 * Render child containers like title area, label area and tick area.
			 * @param {number} size xAxis width or yAxis height
			 * @param {number} width axis width
			 * @param {number} tickCount tick count
			 * @param {Array.<number|string>} categories categories
			 * @param {number} additionalWidth additional width
			 * @returns {Array.<HTMLElement>} child containers
			 * @private
			 */
			_renderChildContainers:function( size, width, tickCount, categories, additionalWidth ){
				var titleContainer=this._renderTitleArea(size),
					labelContainer=this._renderLabelArea(size, width, tickCount, categories, additionalWidth),
					childContainers=[titleContainer, labelContainer],
					isVerticalLineType=this.isVertical && this.data.aligned,
					tickContainer, oppositeSideTickContainer;
				if( !isVerticalLineType ){
					tickContainer=this._renderTickArea(size, tickCount, additionalWidth);
					oppositeSideTickContainer=this._renderOppositeSideTickArea(tickContainer.innerHTML);
					childContainers=childContainers.concat([tickContainer, oppositeSideTickContainer]);
				}
				return childContainers;
			},
			/**
			 * Render divided xAxis if yAxis rendered in the center.
			 * @param {HTMLElement} axisContainer axis container element
			 * @param {number} width axis area width
			 * @private
			 */
			_renderDividedAxis:function( axisContainer, width ){
				var lWidth=Math.round(width/2);
				var rWidth=width-lWidth;
				var axisData=this.data;
				var tickCount=axisData.tickCount;
				var halfTickCount=parseInt(tickCount/2, 10)+1;
				var categories=axisData.labels;
				var lCategories=categories.slice(0, halfTickCount);
				var rCategories=categories.slice(halfTickCount-1, tickCount);
				var additionalWidth=lWidth+this.dimensionMap.yAxis.width;
				var lContainers=this._renderChildContainers(lWidth, lWidth, halfTickCount, lCategories, 0);
				var rContainers=this._renderChildContainers(rWidth, rWidth, halfTickCount, rCategories, additionalWidth);
				var rTitleContainer=rContainers[0];
				dom.addClass(rTitleContainer, 'right');
				dom.append(axisContainer, lContainers.concat(rContainers));
			},
			/**
			 * Render single axis if not divided.
			 * @param {HTMLElement} axisContainer axis container element
			 * @param {{width: number, height: number}} dimension axis area dimension
			 * @private
			 */
			_renderNotDividedAxis:function( axisContainer, dimension ){
				var axisData=this.data;
				var isVertical=this.isVertical;
				var width=dimension.width;
				var size=isVertical ? dimension.height : width;
				var additionalSize=0;
				var childContainers;
				if( axisData.positionRatio ){
					additionalSize=size*axisData.positionRatio;
				}
				childContainers=this._renderChildContainers(size, width, axisData.tickCount, axisData.labels, additionalSize);
				dom.append(axisContainer, childContainers);
			},
			/**
			 * Render axis area.
			 * @param {HTMLElement} axisContainer axis area element
			 * @param {{isVertical: boolean, isPositionRight: boolean, aligned: aligned}} data rendering data
			 * @private
			 */
			_renderAxisArea:function( axisContainer ){
				var dimension=this.layout.dimension;
				var axisData=this.data;
				this.isLabel=axisData.isLabelAxis;
				this._addCssClasses(axisContainer);
				if( this.options.divided ){
					this.containerWidth=dimension.width+this.dimensionMap.yAxis.width;
					this._renderDividedAxis(axisContainer, dimension.width);
					dimension.width=this.containerWidth;
				}else{
					this._renderNotDividedAxis(axisContainer, dimension);
					dimension.width+=this.options.isCenter ? 2 : 0;
				}
				renderUtil.renderDimension(axisContainer, dimension);
				renderUtil.renderPosition(axisContainer, this.layout.position);
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      options: ?object,
	     *      layout: {
	     *          dimension: {width: number, height: number},
	     *          position: {left: number, top: number}
	     *      },
	     *      dimensionMap: object,
	     *      axisDataMap: object
	     * }} data - bounds and scale data
			 * @private
			 */
			_setDataForRendering:function( data ){
				this.layout=data.layout;
				this.dimensionMap=data.dimensionMap;
				this.data=data.axisDataMap[this.componentName];
				this.options=this.data.options;
			},
			/**
			 * @param {object} data - bounds and scale data
			 * @returns {HTMLElement} axis area base element
			 */
			render:function( data ){
				var container=dom.create('DIV', this.className);
				this._setDataForRendering(data);
				this._renderAxisArea(container);
				this.axisContainer=container;
				return container;
			},
			/**
			 * Rerender axis component.
			 * @param {object} data - bounds and scale data
			 */
			rerender:function( data ){
				this.axisContainer.innerHTML='';
				if( this._isValidAxis() ){
					this._setDataForRendering(data);
					this._renderAxisArea(this.axisContainer);
				}
			},
			/**
			 * Resize axis component.
			 * @param {object} data - bounds and scale data
			 */
			resize:function( data ){
				this.rerender(data);
			},
			/**
			 * Zoom.
			 * @param {object} data - bounds and scale data
			 */
			zoom:function( data ){
				this.rerender(data);
			},
			/**
			 * Move axis to left.
			 * @param {number} tickSize - tick size for moving
			 * @private
			 */
			_moveToLeft:function( tickSize ){
				var ticksElement=this.ticksElement;
				var firstTickElement=ticksElement.firstChild;
				var labelContainer=this.labelContainer;
				var firstLabelElement=labelContainer.firstChild;
				var ticksBeforeLeft=parseInt(ticksElement.style.left, 10) || 0;
				var labelBeforeLeft=parseInt(labelContainer.style.left, 10) || 0;
				var startIndex=this.data.startIndex || 0;
				renderUtil.startAnimation(300, function( ratio ){
					var left=tickSize*ratio;
					var opacity=1-ratio;
					ticksElement.style.left=(ticksBeforeLeft-left)+'px';
					labelContainer.style.left=(labelBeforeLeft-left)+'px';
					if( startIndex===0 ){
						renderUtil.setOpacity([firstTickElement, firstLabelElement], opacity);
					}
				});
			},
			/**
			 * Resize by tick size.
			 * @param {number} tickSize - tick size for resizing
			 * @private
			 */
			_resizeByTickSize:function( tickSize ){
				var ticksElement=this.ticksElement;
				var labelContainer=this.labelContainer;
				var beforeWidth=parseInt(ticksElement.style.width, 10) || ticksElement.offsetWidth;
				renderUtil.startAnimation(chartConst.ADDING_DATA_ANIMATION_DURATION, function( ratio ){
					var width=beforeWidth-(tickSize*ratio);
					ticksElement.style.width=width+'px';
					labelContainer.style.width=width+'px';
				});
			},
			/**
			 * Animate for adding data.
			 * @param {{tickSize: number}} data - data for animate
			 */
			animateForAddingData:function( data ){
				if( this.isVertical || this.dataProcessor.isCoordinateType() ){
					return;
				}
				if( data.shifting ){
					this._moveToLeft(data.tickSize);
				}else{
					this._resizeByTickSize(data.tickSize);
				}
			},
			/**
			 * Make cssText from position map for css.
			 * @param {object.<string, number>} positionMap - position map for css
			 * @returns {string}
			 * @private
			 */
			_makeCssTextFromPositionMap:function( positionMap ){
				tui.util.forEach(positionMap, function( value, name ){
					positionMap[name]=value+'px';
				});
				return renderUtil.makeCssTextFromMap(positionMap);
			},
			/**
			 * Make position map for center align option of y axis.
			 * @returns {{left: number, bottom: number}}
			 * @private
			 */
			_makePositionMapForCenterAlign:function(){
				var titleOptions=this.options.title;
				var offset=titleOptions.offset || {};
				var titleWidth=renderUtil.getRenderedLabelWidth(titleOptions.text, this.theme.title);
				var yAxisWidth=this.dimensionMap.yAxis.width;
				var left=(yAxisWidth-titleWidth)/2;
				var bottom=-this.dimensionMap.xAxis.height;
				bottom-=offset.y || 0;
				left+=offset.x || 0;
				return {
					left:left,
					bottom:bottom
				};
			},
			/**
			 * Make right position for right y axis.
			 * @param {number} size - width or height
			 * @returns {number}
			 * @private
			 */
			_makeRightPosition:function( size ){
				var offset=this.options.title.offset || {};
				var rightPosition;
				if( renderUtil.isIE7() || this.options.rotateTitle===false ){
					rightPosition=0;
				}else{
					rightPosition= -size;
				}
				rightPosition-=offset.x || 0;
				return rightPosition;
			},
			/**
			 * Make top position.
			 * @param {number} size - width or height
			 * @returns {?number}
			 * @private
			 */
			_makeTopPosition:function( size ){
				var offset=this.options.title.offset;
				var topPosition=null;
				var titleHeight;
				if( this.options.rotateTitle===false ){
					titleHeight=renderUtil.getRenderedLabelHeight(this.options.title, this.theme.title);
					topPosition=(size-titleHeight)/2;
				}else if( this.data.isPositionRight ){
					topPosition=0;
				}else if( !renderUtil.isOldBrowser() ){
					topPosition=size;
				}
				if( offset ){
					topPosition=topPosition || 0;
					topPosition+=offset.y || 0;
				}
				return topPosition;
			},
			/**
			 * Make positionMap for not center align.
			 * @param {number} size - width or height
			 * @returns {object.<string, number>}
			 * @private
			 */
			_makePositionMapForNotCenterAlign:function( size ){
				var positionMap={};
				var offset=this.options.title.offset || {};
				var topPosition;
				if( this.data.isPositionRight ){
					positionMap.right=this._makeRightPosition(size);
				}else{
					positionMap.left=offset.x || 0;
				}
				topPosition=this._makeTopPosition(size);
				if( !tui.util.isNull(topPosition) ){
					positionMap.top=topPosition;
				}
				return positionMap;
			},
			/**
			 * Render css style of title area for vertical type.
			 * @param {HTMLElement} titleContainer title element
			 * @param {number} size width or height
			 * @private
			 */
			_renderTitleAreaStyleForVertical:function( titleContainer, size ){
				var cssPositionMap;
				var cssText;
				if( this.options.isCenter ){
					cssPositionMap=this._makePositionMapForCenterAlign();
				}else{
					cssPositionMap=this._makePositionMapForNotCenterAlign(size);
				}
				if( this.options.rotateTitle!==false ){
					cssPositionMap.width=size;
				}
				cssText=this._makeCssTextFromPositionMap(cssPositionMap);
				titleContainer.style.cssText+=';'+cssText;
			},
			/**
			 * Render title position for horizontal type.
			 * @param {HTMLElement} titleContainer title element
			 * @param {{left: number, top: number, right: number, bottom: number}} offset - title position option
			 * @private
			 */
			_renderTitlePositionForHorizontal:function( titleContainer, offset ){
				renderUtil.renderPosition(titleContainer, {
					left:offset.x,
					bottom:-offset.y
				});
			},
			/**
			 * Render css style of title area
			 * @param {HTMLElement} titleContainer title element
			 * @param {number} size width or height
			 * @private
			 */
			_renderTitleAreaStyle:function( titleContainer, size ){
				var offset=this.options.title.offset;
				if( this.isVertical ){
					this._renderTitleAreaStyleForVertical(titleContainer, size);
				}else if( offset ){
					this._renderTitlePositionForHorizontal(titleContainer, offset);
				}
			},
			/**
			 * Title area renderer
			 * @param {?number} size (width or height)
			 * @returns {HTMLElement} title element
			 * @private
			 */
			_renderTitleArea:function( size ){
				var title=this.options.title || {};
				var titleContainer=renderUtil.renderTitle(title.text, this.theme.title, 'tui-chart-title-area');
				if( titleContainer ){
					this._renderTitleAreaStyle(titleContainer, size);
				}
				if( this.options.rotateTitle!==false ){
					dom.addClass(titleContainer, 'rotation');
				}
				return titleContainer;
			},
			/**
			 * Make percentage position.
			 * @param {Array.<number>} positions - positions
			 * @param {number} areaSize - area size
			 * @returns {Array.<number>}
			 * @private
			 */
			_makePercentagePositions:function( positions, areaSize ){
				areaSize=this.containerWidth || areaSize;
				return tui.util.map(positions, function( position ){
					return calculator.makePercentageValue(position, areaSize);
				});
			},
			/**
			 * Make tick html.
			 * @param {number} size - area size
			 * @param {number} tickCount - tick count
			 * @param {boolean} isNotDividedXAxis - whether not divided xAxis or not
			 * @param {number} additionalSize - additional size
			 * @returns {string}
			 * @private
			 */
			_makeTickHtml:function( size, tickCount, isNotDividedXAxis, additionalSize ){
				var tickColor=this.theme.tickColor;
				var axisData=this.data;
				var sizeRatio=axisData.sizeRatio || 1;
				var posType=this.isVertical ? 'bottom' : 'left';
				var positions=calculator.makeTickPixelPositions((size*sizeRatio), tickCount);
				var containerWidth=this.containerWidth || size;
				var template, html;
				positions.length=axisData.tickCount;
				additionalSize=calculator.makePercentageValue(additionalSize, containerWidth);
				positions=this._makePercentagePositions(positions, size);
				template=axisTemplate.tplAxisTick;
				html=tui.util.map(positions, function( position, index ){
					var tickHtml, cssTexts;
					position-=(index===0 && isNotDividedXAxis) ? calculator.makePercentageValue(1, containerWidth) : 0;
					position+=additionalSize;
					cssTexts=[
						renderUtil.concatStr('background-color:', tickColor),
						renderUtil.concatStr(posType, ': ', position, '%')
					].join(';');
					tickHtml=template({ cssText:cssTexts });
					return tickHtml;
				}).join('');
				return html;
			},
			/**
			 * Render tick line.
			 * @param {number} areaSize - width or height
			 * @param {boolean} isNotDividedXAxis - whether is not divided x axis or not.
			 * @param {number} additionalSize - additional size
			 * @returns {HTMLElement}
			 * @private
			 */
			_renderTickLine:function( areaSize, isNotDividedXAxis, additionalSize ){
				var tickLineElement=dom.create('DIV', 'tui-chart-tick-line');
				var tickLineExtend=isNotDividedXAxis ? chartConst.OVERLAPPING_WIDTH : 0;
				var axisData=this.data;
				var positionValue=-tickLineExtend;
				var cssMap={};
				var sizeType, posType, lineSize;
				if( this.isVertical ){
					sizeType='height';
					posType='bottom';
				}else{
					sizeType='width';
					posType='left';
				}
				lineSize=areaSize+tickLineExtend;
				if( !axisData.sizeRatio ){
					positionValue+=additionalSize;
				}
				cssMap[posType]=positionValue;
				cssMap[sizeType]=lineSize;
				tickLineElement.style.cssText=this._makeCssTextFromPositionMap(cssMap);
				return tickLineElement;
			},
			/**
			 * Render ticks.
			 * @param {number} areaSize - width or height
			 * @param {number} tickCount - tick count
			 * @param {boolean} isNotDividedXAxis - whether is not divided x axis or not.
			 * @param {number} additionalSize - additional size
			 * @returns {HTMLElement}
			 * @private
			 */
			_renderTicks:function( areaSize, tickCount, isNotDividedXAxis, additionalSize ){
				var ticksElement=dom.create('DIV', 'tui-chart-ticks');
				var ticksHtml=this._makeTickHtml(areaSize, tickCount, isNotDividedXAxis, additionalSize);
				ticksElement.innerHTML=ticksHtml;
				return ticksElement;
			},
			/**
			 * Render tick area.
			 * @param {number} size - width or height
			 * @param {number} tickCount - tick count
			 * @param {?number} additionalSize - additional size (width or height)
			 * @returns {HTMLElement}
			 * @private
			 */
			_renderTickArea:function( size, tickCount, additionalSize ){
				var tickContainer=dom.create('DIV', 'tui-chart-tick-area');
				var isNotDividedXAxis=!this.isVertical && !this.options.divided;
				var tickLineElement, ticksElement;
				additionalSize=additionalSize || 0;
				tickLineElement=this._renderTickLine(size, isNotDividedXAxis, additionalSize);
				ticksElement=this._renderTicks(size, tickCount, isNotDividedXAxis, additionalSize);
				dom.append(tickContainer, tickLineElement);
				dom.append(tickContainer, ticksElement);
				this.ticksElement=ticksElement;
				return tickContainer;
			},
			/**
			 * Make cssText of vertical label.
			 * @param {number} axisWidth axis width
			 * @param {number} titleAreaWidth title area width
			 * @returns {string} cssText
			 * @private
			 */
			_makeVerticalLabelCssText:function( axisWidth, titleAreaWidth ){
				return ';width:'+(axisWidth-titleAreaWidth+chartConst.V_LABEL_RIGHT_PADDING)+'px';
			},
			/**
			 * Apply css style of label area.
			 * @param {HTMLElement} labelContainer label container
			 * @param {number} axisWidth axis width
			 * @private
			 */
			_applyLabelAreaStyle:function( labelContainer, axisWidth ){
				var cssText=renderUtil.makeFontCssText(this.theme.label),
					titleAreaWidth;
				if( this.isVertical ){
					titleAreaWidth=this._getRenderedTitleHeight()+chartConst.TITLE_AREA_WIDTH_PADDING;
					cssText+=this._makeVerticalLabelCssText(axisWidth, titleAreaWidth);
				}
				labelContainer.style.cssText=cssText;
			},
			/**
			 * Render label area.
			 * @param {number} size label area size
			 * @param {number} axisWidth axis area width
			 * @param {number} tickCount tick count
			 * @param {Array.<string>} categories categories
			 * @param {?number} additionalSize additional size (width or height)
			 * @returns {HTMLElement} label area element
			 * @private
			 */
			_renderLabelArea:function( size, axisWidth, tickCount, categories, additionalSize ){
				var labelContainer=dom.create('DIV', 'tui-chart-label-area');
				var sizeRatio=this.data.sizeRatio || 1;
				var tickPixelPositions=calculator.makeTickPixelPositions((size*sizeRatio), tickCount);
				var labelSize=tickPixelPositions[1]-tickPixelPositions[0];
				var options=this.options;
				var containerWidth=this.containerWidth || size;
				var labelsHtml;
				if( predicate.isValidLabelInterval(options.labelInterval, options.tickInterval) ){
					additionalSize-=((labelSize*options.labelInterval/2)-(labelSize/2));
					labelSize*=options.labelInterval;
				}
				additionalSize=additionalSize ? calculator.makePercentageValue(additionalSize, containerWidth) : 0;
				labelsHtml=this._makeLabelsHtml(size, tickPixelPositions, categories, labelSize, additionalSize);
				labelContainer.innerHTML=labelsHtml;
				this._applyLabelAreaStyle(labelContainer, axisWidth);
				this._changeLabelAreaPosition(labelContainer, labelSize);
				this.labelContainer=labelContainer;
				return labelContainer;
			},
			/**
			 * Get height of title area ;
			 * @returns {number} height
			 * @private
			 */
			_getRenderedTitleHeight:function(){
				var title=this.options.title;
				var theme=this.theme.title;
				var result=title ? renderUtil.getRenderedLabelHeight(title.text, theme) : 0;
				return result;
			},
			/**
			 * Make cssText of label.
			 * @param {number} labelSize label size (width or height)
			 * @returns {string} cssText
			 * @private
			 */
			_makeLabelCssText:function( labelSize ){
				var isVertical=this.isVertical;
				var cssTexts=[];
				if( isVertical && this.isLabel ){
					cssTexts.push(renderUtil.concatStr('height:', labelSize, 'px'));
					cssTexts.push(renderUtil.concatStr('line-height:', labelSize, 'px'));
				}else if( !isVertical ){
					cssTexts.push(renderUtil.concatStr('width:', labelSize, 'px'));
				}
				return cssTexts.length ? cssTexts.join(';')+';' : '';
			},
			/**
			 * Calculate rotation moving position.
			 * @param {object} params parameters
			 *      @param {number} params.labelHeight label height
			 *      @param {number} params.left normal left
			 *      @param {number} params.moveLeft move left
			 *      @param {number} params.top top
			 * @returns {{top:number, left: number}} position
			 * @private
			 */
			_calculateRotationMovingPosition:function( params ){
				var moveLeft=params.moveLeft;
				var degree=this.data.degree;
				var containerWidth=this.containerWidth || params.size;
				if( this.data.degree===chartConst.ANGLE_85 ){
					moveLeft+=calculator.calculateAdjacent(chartConst.ANGLE_90-degree, params.labelHeight/2);
				}
				return {
					top:params.top,
					left:params.left-calculator.makePercentageValue(moveLeft, containerWidth)
				};
			},
			/**
			 * Calculate rotation moving position for old browser(IE7, IE8).
			 * @param {object} params parameters
			 *      @param {number} params.labelWidth label width
			 *      @param {number} params.labelHeight label height
			 *      @param {number} params.left normal left
			 *      @param {(string | number)} params.label label
			 *      @param {object} theme label theme
			 * @returns {{top:number, left: number}} position
			 * @private
			 */
			_calculateRotationMovingPositionForOldBrowser:function( params ){
				var labelWidth=renderUtil.getRenderedLabelWidth(params.label, params.theme);
				var degree=this.data.degree;
				var smallAreaWidth=calculator.calculateAdjacent(chartConst.ANGLE_90-degree, params.labelHeight/2);
				var newLabelWidth=(calculator.calculateAdjacent(degree, labelWidth/2)+smallAreaWidth)*2;
				var changedWidth=renderUtil.isIE7() ? 0 : (labelWidth-newLabelWidth);
				var moveLeft=(params.labelWidth/2)-(smallAreaWidth*2);
				var containerWidth=this.containerWidth || params.size;
				if( degree===chartConst.ANGLE_85 ){
					moveLeft+=smallAreaWidth;
				}
				return {
					top:chartConst.XAXIS_LABEL_TOP_MARGIN,
					left:params.left+calculator.makePercentageValue(changedWidth-moveLeft, containerWidth)
				};
			},
			/**
			 * Make cssText for rotation moving.
			 * @param {object} params parameters
			 *      @param {number} params.labelWidth label width
			 *      @param {number} params.labelHeight label height
			 *      @param {number} params.left normal left
			 *      @param {number} params.moveLeft move left
			 *      @param {number} params.top top
			 *      @param {(string | number)} params.label label
			 *      @param {object} theme label theme
			 * @returns {string} cssText
			 * @private
			 */
			_makeCssTextForRotationMoving:function( params ){
				var position;
				if( renderUtil.isOldBrowser() ){
					position=this._calculateRotationMovingPositionForOldBrowser(params);
				}else{
					position=this._calculateRotationMovingPosition(params);
				}
				return renderUtil.concatStr('left:', position.left, '%', ';top:', position.top, 'px');
			},
			/**
			 * Make html of rotation labels.
			 * @param {number} areaSize - area size.
			 * @param {Array.<object>} positions label position array
			 * @param {string[]} categories categories
			 * @param {number} labelSize label size
			 * @param {number} additionalSize additional size
			 * @returns {string} labels html
			 * @private
			 */
			_makeRotationLabelsHtml:function( areaSize, positions, categories, labelSize, additionalSize ){
				var self=this;
				var degree=this.data.degree;
				var template=axisTemplate.tplAxisLabel;
				var labelHeight=renderUtil.getRenderedLabelHeight(categories[0], this.theme.label);
				var labelCssText=this._makeLabelCssText(labelSize);
				var additionalClass=' tui-chart-xaxis-rotation tui-chart-xaxis-rotation'+degree;
				var halfWidth=labelSize/2;
				var moveLeft=calculator.calculateAdjacent(degree, halfWidth);
				var top=calculator.calculateOpposite(degree, halfWidth)+chartConst.XAXIS_LABEL_TOP_MARGIN;
				var spanCssText=(renderUtil.isIE7() && degree) ? chartConst.IE7_ROTATION_FILTER_STYLE_MAP[degree] : '';
				var labelsHtml;
				additionalSize=additionalSize || 0;
				labelsHtml=tui.util.map(positions, function( position, index ){
					var label=categories[index],
						rotationCssText=self._makeCssTextForRotationMoving({
							size:areaSize,
							labelHeight:labelHeight,
							labelWidth:labelSize,
							top:top,
							left:position+additionalSize,
							moveLeft:moveLeft,
							label:label,
							theme:self.theme.label
						});
					return template({
						additionalClass:additionalClass,
						cssText:labelCssText+rotationCssText,
						spanCssText:spanCssText,
						label:label
					});
				}).join('');
				return labelsHtml;
			},
			/**
			 * Make html of normal labels.
			 * @param {Array.<object>} positions label position array
			 * @param {string[]} categories categories
			 * @param {number} labelSize label size
			 * @param {number} additionalSize additional size
			 * @returns {string} labels html
			 * @private
			 */
			_makeNormalLabelsHtml:function( positions, categories, labelSize, additionalSize ){
				var template=axisTemplate.tplAxisLabel,
					labelCssText=this._makeLabelCssText(labelSize),
					posType, labelsHtml;
				if( this.isVertical ){
					posType=this.isLabel ? 'top' : 'bottom';
				}else{
					posType='left';
				}
				labelsHtml=tui.util.map(positions, function( position, index ){
					var addCssText=renderUtil.concatStr(posType, ':', (position+additionalSize), '%');
					return template({
						additionalClass:'',
						cssText:labelCssText+addCssText,
						label:categories[index],
						spanCssText:''
					});
				}).join('');
				return labelsHtml;
			},
			/**
			 * Make labels html.
			 * @param {number} areaSize - area size
			 * @param {Array.<object>} positions - positions for labels
			 * @param {Array.<string>} categories - categories
			 * @param {number} labelSize label size
			 * @param {number} additionalSize additional size
			 * @returns {string} labels html
			 * @private
			 */
			_makeLabelsHtml:function( areaSize, positions, categories, labelSize, additionalSize ){
				var isRotationlessXAxis=!this.isVertical && this.isLabel && this.options.rotateLabel===false;
				var hasRotatedXAxisLabel=this.componentName==='xAxis' && this.data.degree;
				var labelsHtml;
				if( isRotationlessXAxis ){
					categories=this.data.multilineLabels;
				}
				if( categories.length ){
					positions.length=categories.length;
				}
				positions=this._makePercentagePositions(positions, areaSize);
				if( hasRotatedXAxisLabel ){
					labelsHtml=this._makeRotationLabelsHtml(areaSize, positions, categories, labelSize, additionalSize);
				}else{
					labelsHtml=this._makeNormalLabelsHtml(positions, categories, labelSize, additionalSize);
				}
				return labelsHtml;
			},
			/**
			 * Change position of label area.
			 * @param {HTMLElement} labelContainer label area element
			 * @param {number} labelSize label size (width or height)
			 * @private
			 */
			_changeLabelAreaPosition:function( labelContainer, labelSize ){
				var labelHeight;
				if( this.isLabel && !this.data.aligned ){
					return;
				}
				if( this.isVertical ){
					labelHeight=renderUtil.getRenderedLabelHeight('ABC', this.theme.label);
					labelContainer.style.top=renderUtil.concatStr(parseInt(labelHeight/2, 10), 'px');
				}else{
					labelContainer.style.left=renderUtil.concatStr('-', parseInt(labelSize/2, 10), 'px');
				}
			}
		});
		module.exports=Axis;
		/***/
	},
	/* 22 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview calculator.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var arrayUtil=__webpack_require__(6);
		var PERCENT_DIVISOR=100;
		/**
		 * Calculator.
		 * @module calculator
		 * @private */
		var calculator={
			/**
			 * Calculate limit from chart min, max data.
			 *  - http://peltiertech.com/how-excel-calculates-automatic-chart-axis-limits/
			 * @memberOf module:calculator
			 * @param {number} min min minimum value of user data
			 * @param {number} max max maximum value of user data
			 * @returns {{min: number, max: number}} limit axis limit
			 */
			calculateLimit:function( min, max ){
				var saveMin=0,
					limit={},
					iodValue; // increase or decrease value;
				if( min < 0 ){
					saveMin=min;
					max-=min;
					min=0;
				}
				iodValue=(max-min)/20;
				limit.max=max+iodValue+saveMin;
				if( max/6 > min ){
					limit.min=saveMin;
				}else{
					limit.min=min-iodValue+saveMin;
				}
				return limit;
			},
			/**
			 * Make tick positions of pixel type.
			 * @memberOf module:calculator
			 * @param {number} size area width or height
			 * @param {number} count tick count
			 * @param {?number} additionalPosition additional position
			 * @returns {Array.<number>} positions
			 */
			makeTickPixelPositions:function( size, count, additionalPosition ){
				var positions=[];
				additionalPosition=additionalPosition || 0;
				if( count > 0 ){
					positions=tui.util.map(tui.util.range(0, count), function( index ){
						var ratio=index===0 ? 0 : (index/(count-1));
						return (ratio*size)+additionalPosition;
					});
					positions[positions.length-1]-=1;
				}
				return positions;
			},
			/**
			 * Make labels from limit.
			 * @memberOf module:calculator
			 * @param {{min: number, max: number}} limit axis limit
			 * @param {number} step step between max and min
			 * @returns {string[]} labels
			 * @private
			 */
			makeLabelsFromLimit:function( limit, step ){
				var multipleNum=calculator.findMultipleNum(step);
				var min=Math.round(limit.min*multipleNum);
				var max=Math.round(limit.max*multipleNum);
				var labels=tui.util.range(min, max+1, step*multipleNum);
				return tui.util.map(labels, function( label ){
					return label/multipleNum;
				});
			},
			/**
			 * Calculate step from limit.
			 * @memberOf module:calculator
			 * @param {{min: number, max: number}} limit axis limit
			 * @param {number} count value count
			 * @returns {number} step
			 */
			calculateStepFromLimit:function( limit, count ){
				return calculator.divide(calculator.subtract(limit.max, limit.min), (count-1));
			},
			/**
			 * Calculate adjacent.
			 * @param {number} degree degree
			 * @param {number} hypotenuse hypotenuse
			 * @returns {number} adjacent
			 *
			 *   H : Hypotenuse
			 *   A : Adjacent
			 *   O : Opposite
			 *   D : Degree
			 *
			 *        /|
			 *       / |
			 *    H /  | O
			 *     /   |
			 *    /\ D |
			 *    -----
			 *       A
			 */
			calculateAdjacent:function( degree, hypotenuse ){
				return Math.cos(degree*chartConst.RAD)*hypotenuse;
			},
			/**
			 * Calculate opposite.
			 * @param {number} degree degree
			 * @param {number} hypotenuse hypotenuse
			 * @returns {number} opposite
			 */
			calculateOpposite:function( degree, hypotenuse ){
				return Math.sin(degree*chartConst.RAD)*hypotenuse;
			},
			/**
			 * Calculate rotated width.
			 * @param {number} degree - degree
			 * @param {number} width - width
			 * @param {number} height - height
			 * @returns {number}
			 */
			calculateRotatedWidth:function( degree, width, height ){
				var centerHalf=calculator.calculateAdjacent(degree, width/2);
				var sideHalf=calculator.calculateAdjacent(chartConst.ANGLE_90-degree, height/2);
				return (centerHalf+sideHalf)*2;
			},
			/**
			 * Calculate rotated height
			 * @param {number} degree - degree
			 * @param {number} width - width
			 * @param {number} height - height
			 * @returns {number}
			 */
			calculateRotatedHeight:function( degree, width, height ){
				var centerHalf=calculator.calculateOpposite(degree, width/2);
				var sideHalf=calculator.calculateOpposite(chartConst.ANGLE_90-degree, height/2);
				return (centerHalf+sideHalf)*2;
			},
			/**
			 * Sum plus values.
			 * @param {Array.<number>} values values
			 * @returns {number} sum
			 */
			sumPlusValues:function( values ){
				var plusValues=tui.util.filter(values, function( value ){
					return value > 0;
				});
				return calculator.sum(plusValues);
			},
			/**
			 * Sum minus values.
			 * @param {Array.<number>} values values
			 * @returns {number} sum
			 */
			sumMinusValues:function( values ){
				var minusValues=tui.util.filter(values, function( value ){
					return value < 0;
				});
				return calculator.sum(minusValues);
			},
			/**
			 * Make percentage value.
			 * @param {number} value - value
			 * @param {number} totalValue - total value
			 * @returns {number}
			 */
			makePercentageValue:function( value, totalValue ){
				return value/totalValue*PERCENT_DIVISOR;
			},
			/**
			 * Calculate ratio for making bound.
			 * @param {number} value - value
			 * @param {number} divNumber - number for division
			 * @param {number} subNumber - number for subtraction
			 * @param {number} baseRatio - base ratio
			 * @returns {number}
			 */
			calculateRatio:function( value, divNumber, subNumber, baseRatio ){
				return ((value-subNumber)/divNumber)*baseRatio;
			}
		};
		/**
		 * Get length after decimal point.
		 * @memberOf module:calculator
		 * @param {string | number} value target value
		 * @returns {number} result length
		 */
		var getDecimalLength=function( value ){
			var valueArr=String(value).split('.');
			return valueArr.length===2 ? valueArr[1].length : 0;
		};
		/**
		 * Find multiple num.
		 * @memberOf module:calculator
		 * @param {...Array} target values
		 * @returns {number} multiple num
		 */
		var findMultipleNum=function(){
			var args=[].slice.call(arguments);
			var underPointLens=tui.util.map(args, function( value ){
				return calculator.getDecimalLength(value);
			});
			var underPointLen=arrayUtil.max(underPointLens);
			return Math.pow(10, underPointLen);
		};
		/**
		 * Modulo operation for floating point operation.
		 * @memberOf module:calculator
		 * @param {number} target target values
		 * @param {number} modNum mod num
		 * @returns {number} result mod
		 */
		var mod=function( target, modNum ){
			var multipleNum=calculator.findMultipleNum(modNum);
			var result;
			if( multipleNum===1 ){
				result=target%modNum;
			}else{
				result=((target*multipleNum)%(modNum*multipleNum))/multipleNum;
			}
			return result;
		};
		/**
		 * 'add' is function for add operation to floating point.
		 * @memberOf module:calculator
		 * @param {number} a target a
		 * @param {number} b target b
		 * @returns {number}
		 */
		var add=function( a, b ){
			var multipleNum=calculator.findMultipleNum(a, b);
			return ((a*multipleNum)+(b*multipleNum))/multipleNum;
		};
		/**
		 * 'subtract' is function for subtract operation to floating point.
		 * @memberOf module:calculator
		 * @param {number} a target a
		 * @param {number} b target b
		 * @returns {number}
		 */
		var subtract=function( a, b ){
			var multipleNum=calculator.findMultipleNum(a, b);
			return ((a*multipleNum)-(b*multipleNum))/multipleNum;
		};
		/**
		 * 'multiply' is function for multiply operation to floating point.
		 * @param {number} a target a
		 * @param {number} b target b
		 * @returns {number}
		 */
		var multiply=function( a, b ){
			var multipleNum=calculator.findMultipleNum(a, b);
			return ((a*multipleNum)*(b*multipleNum))/(multipleNum*multipleNum);
		};
		/**
		 * 'divide' is function for divide operation to floating point.
		 * @memberOf module:calculator
		 * @param {number} a target a
		 * @param {number} b target b
		 * @returns {number}
		 */
		var divide=function( a, b ){
			var multipleNum=calculator.findMultipleNum(a, b);
			return (a*multipleNum)/(b*multipleNum);
		};
		/**
		 * Sum.
		 * @memberOf module:calculator
		 * @param {Array.<number>} values target values
		 * @returns {number} result value
		 */
		var sum=function( values ){
			var copyArr=values.slice();
			copyArr.unshift(0);
			return tui.util.reduce(copyArr, function( base, value ){
				return calculator.add(parseFloat(base), parseFloat(value));
			});
		};
		calculator.getDecimalLength=getDecimalLength;
		calculator.findMultipleNum=findMultipleNum;
		calculator.mod=mod;
		calculator.add=add;
		calculator.subtract=subtract;
		calculator.multiply=multiply;
		calculator.divide=divide;
		calculator.sum=sum;
		module.exports=calculator;
		/***/
	},
	/* 23 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Util for rendering.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var dom=__webpack_require__(20);
		var arrayUtil=__webpack_require__(6);
		var concat=Array.prototype.concat;
		var browser=tui.util.browser,
			isIE7=browser.msie && browser.version===7,
			isOldBrowser=browser.msie && browser.version <= 8;
		/**
		 * Util for rendering.
		 * @module renderUtil
		 * @private */
		var renderUtil={
			/**
			 * Concat string.
			 * @memberOf module:renderUtil
			 * @params {...string} target strings
			 * @returns {string} concat string
			 */
			concatStr:function(){
				return String.prototype.concat.apply('', arguments);
			},
			/**
			 * Make cssText for font.
			 * @memberOf module:renderUtil
			 * @param {{fontSize: number, fontFamily: string, color: string}} theme font theme
			 * @returns {string} cssText
			 */
			makeFontCssText:function( theme ){
				var cssTexts=[];
				if( !theme ){
					return '';
				}
				if( theme.fontSize ){
					cssTexts.push(this.concatStr('font-size:', theme.fontSize, 'px'));
				}
				if( theme.fontFamily ){
					cssTexts.push(this.concatStr('font-family:', theme.fontFamily));
				}
				if( theme.color ){
					cssTexts.push(this.concatStr('color:', theme.color));
				}
				if( theme.fontWeight ){
					cssTexts.push(this.concatStr('font-weight:', theme.fontWeight));
				}
				return cssTexts.join(';');
			},
			checkEl:null,
			/**
			 * Create element for size check.
			 * @memberOf module:renderUtil
			 * @returns {HTMLElement} element
			 * @private
			 */
			_createSizeCheckEl:function(){
				var div, span;
				if( !this.checkEl ){
					div=dom.create('DIV', 'tui-chart-size-check-element');
					span=dom.create('SPAN');
					div.appendChild(span);
					this.checkEl=div;
				}else{
					this.checkEl.style.cssText='';
				}
				return this.checkEl;
			},
			/**
			 * Make caching key.
			 * @param {string} label labek
			 * @param {{fontSize: number, fontFamily: string}} theme theme
			 * @param {string} offsetType offset type (offsetWidth or offsetHeight)
			 * @returns {string} key
			 * @private
			 */
			_makeCachingKey:function( label, theme, offsetType ){
				var keys=[label, offsetType];
				tui.util.forEach(theme, function( key, value ){
					keys.push(key+value);
				});
				return keys.join('-');
			},
			/**
			 * Add css style.
			 * @param {HTMLElement} div div element
			 * @param {{fontSize: number, fontFamily: string, cssText: string}} theme theme
			 * @private
			 */
			_addCssStyle:function( div, theme ){
				div.style.fontSize=(theme.fontSize || chartConst.DEFAULT_LABEL_FONT_SIZE)+'px';
				if( theme.fontFamily ){
					div.style.fontFamily=theme.fontFamily;
				}
				if( theme.fontWeight ){
					div.style.fontWeight=theme.fontWeight;
				}
				if( theme.cssText ){
					div.style.cssText+=theme.cssText;
				}
			},
			/**
			 * Size cache.
			 * @type {object}
			 */
			sizeCache:{},
			/**
			 * Get rendered label size (width or height).
			 * @memberOf module:renderUtil
			 * @param {string | number} label label
			 * @param {object} theme theme
			 * @param {string} offsetType offset type (offsetWidth or offsetHeight)
			 * @returns {number} size
			 * @private
			 */
			_getRenderedLabelSize:function( label, theme, offsetType ){
				var key, div, span, labelSize;
				theme=theme || {};
				label=tui.util.isExisty(label) ? String(label) : '';
				if( !label ){
					return 0;
				}
				key=this._makeCachingKey(label, theme, offsetType);
				labelSize=this.sizeCache[key];
				if( !labelSize ){
					div=this._createSizeCheckEl();
					span=div.firstChild;
					span.innerHTML=label;
					this._addCssStyle(div, theme);
					document.body.appendChild(div);
					labelSize=span[offsetType];
					document.body.removeChild(div);
					this.sizeCache[key]=labelSize;
				}
				return labelSize;
			},
			/**
			 * Get rendered label width.
			 * @memberOf module:renderUtil
			 * @param {string} label label
			 * @param {{fontSize: number, fontFamily: string, color: string}} theme label theme
			 * @returns {number} width
			 */
			getRenderedLabelWidth:function( label, theme ){
				var labelWidth=this._getRenderedLabelSize(label, theme, 'offsetWidth');
				return labelWidth;
			},
			/**
			 * Get rendered label height.
			 * @memberOf module:renderUtil
			 * @param {string} label label
			 * @param {{fontSize: number, fontFamily: string, color: string}} theme label theme
			 * @returns {number} height
			 */
			getRenderedLabelHeight:function( label, theme ){
				var labelHeight=this._getRenderedLabelSize(label, theme, 'offsetHeight');
				return labelHeight;
			},
			/**
			 * Get Rendered Labels Max Size(width or height).
			 * @memberOf module:renderUtil
			 * @param {string[]} labels labels
			 * @param {{fontSize: number, fontFamily: string, color: string}} theme label theme
			 * @param {function} iteratee iteratee
			 * @returns {number} max size (width or height)
			 * @private
			 */
			_getRenderedLabelsMaxSize:function( labels, theme, iteratee ){
				var maxSize=0,
					sizes;
				if( labels && labels.length ){
					sizes=tui.util.map(labels, function( label ){
						return iteratee(label, theme);
					});
					maxSize=arrayUtil.max(sizes);
				}
				return maxSize;
			},
			/**
			 * Get rendered labels max width.
			 * @memberOf module:renderUtil
			 * @param {string[]} labels labels
			 * @param {{fontSize: number, fontFamily: string, color: string}} theme label theme
			 * @returns {number} max width
			 * @private
			 */
			getRenderedLabelsMaxWidth:function( labels, theme ){
				var iteratee=tui.util.bind(this.getRenderedLabelWidth, this);
				var maxWidth=this._getRenderedLabelsMaxSize(labels, theme, iteratee);
				return maxWidth;
			},
			/**
			 * Get rendered labels max height.
			 * @memberOf module:renderUtil
			 * @param {string[]} labels labels
			 * @param {{fontSize: number, fontFamily: string, color: string}} theme label theme
			 * @returns {number} max height
			 */
			getRenderedLabelsMaxHeight:function( labels, theme ){
				var iteratee=tui.util.bind(this.getRenderedLabelHeight, this);
				var maxHeight=this._getRenderedLabelsMaxSize(labels, theme, iteratee);
				return maxHeight;
			},
			/**
			 * Render dimension.
			 * @memberOf module:renderUtil
			 * @param {HTMLElement} el target element
			 * @param {{width: number, height: number}} dimension dimension
			 */
			renderDimension:function( el, dimension ){
				el.style.cssText=[
					this.concatStr('width:', dimension.width, 'px'),
					this.concatStr('height:', dimension.height, 'px')
				].join(';');
			},
			/**
			 * Render position(top, right).
			 * @memberOf module:renderUtil
			 * @param {HTMLElement} el target element
			 * @param {{top: number, left: number, right: number}} position position
			 */
			renderPosition:function( el, position ){
				if( tui.util.isUndefined(position) ){
					return;
				}
				tui.util.forEachArray(['top', 'bottom', 'left', 'right'], function( key ){
					var value=position[key];
					if( value ){
						el.style[key]=position[key]+'px';
					}
				});
			},
			/**
			 * Render background.
			 * @memberOf module:renderUtil
			 * @param {HTMLElement} el target element
			 * @param {string} background background option
			 */
			renderBackground:function( el, background ){
				if( !background ){
					return;
				}
				el.style.background=background;
			},
			/**
			 * Render font family.
			 * @memberOf module:renderUtil
			 * @param {HTMLElement} el target element
			 * @param {string} fontFamily font family option
			 */
			renderFontFamily:function( el, fontFamily ){
				if( !fontFamily ){
					return;
				}
				el.style.fontFamily=fontFamily;
			},
			/**
			 * Render title.
			 * @memberOf module:renderUtil
			 * @param {string} title title
			 * @param {{fontSize: number, color: string, background: string}} theme title theme
			 * @param {string} className css class name
			 * @returns {HTMLElement} title element
			 */
			renderTitle:function( title, theme, className ){
				var elTitle, cssText;
				if( !title ){
					return null;
				}
				elTitle=dom.create('DIV', className);
				elTitle.innerHTML=title;
				cssText=renderUtil.makeFontCssText(theme);
				if( theme.background ){
					cssText+=';'+this.concatStr('background:', theme.background);
				}
				elTitle.style.cssText=cssText;
				return elTitle;
			},
			/**
			 * Expand dimension.
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }} bound series bound
			 * @returns {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }} expended bound
			 */
			expandBound:function( bound ){
				var dimension=bound.dimension;
				var position=bound.position;
				return {
					dimension:{
						width:dimension.width+(chartConst.SERIES_EXPAND_SIZE*2),
						height:dimension.height+(chartConst.SERIES_EXPAND_SIZE*2)
					},
					position:{
						left:position.left-chartConst.SERIES_EXPAND_SIZE,
						top:position.top-chartConst.SERIES_EXPAND_SIZE
					}
				};
			},
			/**
			 * Proper case.
			 * @param {string} value - string value
			 * @returns {string}
			 */
			_properCase:function( value ){
				return value.substring(0, 1).toUpperCase()+value.substring(1);
			},
			/**
			 * Make mouse event detector name.
			 * @param {string} prefix prefix
			 * @param {string} value value
			 * @param {string} suffix suffix
			 * @returns {string} mouse event detector name
			 */
			makeMouseEventDetectorName:function( prefix, value, suffix ){
				return prefix+this._properCase(value)+this._properCase(suffix);
			},
			/**
			 * Format value.
			 * @param {number} value value
			 * @param {Array.<function>} formatFunctions - functions for format
			 * @param {string} chartType - type of chart
			 * @param {string} areaType - type of area like yAxis, xAxis, series, circleLegend
			 * @param {string} [valueType] - type of value
			 * @returns {string} formatted value
			 */
			formatValue:function( value, formatFunctions, chartType, areaType, valueType ){
				var fns=[String(value)].concat(formatFunctions || []);
				valueType=valueType || 'value';
				return tui.util.reduce(fns, function( stored, fn ){
					return fn(stored, chartType, areaType, valueType);
				});
			},
			/**
			 * Format values.
			 * @param {Array.<number>} values values
			 * @param {Array.<function>} formatFunctions functions for format
			 * @param {string} chartType - type of chart
			 * @param {string} areaType - type of area like yAxis, xAxis, series, circleLegend
			 * @param {string} valueType - type of value
			 * @returns {Array.<string>}
			 */
			formatValues:function( values, formatFunctions, chartType, areaType, valueType ){
				var formatedValues;
				if( !formatFunctions || !formatFunctions.length ){
					return values;
				}
				formatedValues=tui.util.map(values, function( label ){
					return renderUtil.formatValue(label, formatFunctions, chartType, areaType, valueType);
				});
				return formatedValues;
			},
			/**
			 * Format date.
			 * @param {string | number | date} value - value
			 * @param {string} format - date format
			 * @returns {string}
			 */
			formatDate:function( value, format ){
				var date=tui.util.isDate(value) ? value : (new Date(value));
				format=format || chartConst.DEFAULT_DATE_FORMAT;
				return tui.util.formatDate(format, date) || value;
			},
			/**
			 * Format dates.
			 * @param {Array.<string | number | date>} values - values
			 * @param {string} format - date format
			 * @returns {Array}
			 */
			formatDates:function( values, format ){
				var formatDate=this.formatDate;
				format=format || chartConst.DEFAULT_DATE_FORMAT;
				return tui.util.map(values, function( value ){
					return formatDate(value, format);
				});
			},
			/**
			 * Cancel animation
			 * @param {{id: number}} animation animaion object
			 */
			cancelAnimation:function( animation ){
				if( animation && animation.id ){
					cancelAnimationFrame(animation.id);
					delete animation.id;
				}
			},
			/**
			 * Start animation.
			 * @param {number} animationTime - animation time
			 * @param {function} onAnimation - animation callback function
			 * @param {function} onCompleted - completed callback function
			 * @returns {{id: number}} requestAnimationFrame id
			 */
			startAnimation:function( animationTime, onAnimation, onCompleted ){
				var animation={},
					startTime;
				
				/**
				 * Animate.
				 */
				function animate (){
					var diffTime=(new Date()).getTime()-startTime,
						ratio=Math.min((diffTime/animationTime), 1);
					onAnimation(ratio);
					if( ratio===1 ){
						delete animation.id;
						if( onCompleted ){
							onCompleted();
						}
					}else{
						animation.id=requestAnimationFrame(animate);
					}
				}
				
				startTime=(new Date()).getTime();
				animation.id=requestAnimationFrame(animate);
				return animation;
			},
			/**
			 * Whether IE7 or not.
			 * @returns {boolean} result boolean
			 */
			isIE7:function(){
				return isIE7;
			},
			/**
			 * Whether oldBrowser or not.
			 * @memberOf module:renderUtil
			 * @returns {boolean} result boolean
			 */
			isOldBrowser:function(){
				return isOldBrowser;
			},
			/**
			 * Format to zero fill.
			 * @param {string} value target value
			 * @param {number} len length of result
			 * @returns {string} formatted value
			 * @private
			 */
			formatToZeroFill:function( value, len ){
				var zero='0';
				value=String(value);
				if( value.length >= len ){
					return value;
				}
				while( value.length < len ){
					value=zero+value;
				}
				return value;
			},
			/**
			 * Format to Decimal.
			 * @param {string} value target value
			 * @param {number} len length of under decimal point
			 * @returns {string} formatted value
			 */
			formatToDecimal:function( value, len ){
				var DECIMAL=10;
				var pow;
				if( len===0 ){
					return Math.round(value);
				}
				pow=Math.pow(DECIMAL, len);
				value=Math.round(value*pow)/pow;
				value=parseFloat(value).toFixed(len);
				return value;
			},
			/**
			 * Format to Comma.
			 * @param {string} value target value
			 * @returns {string} formatted value
			 * @private
			 */
			formatToComma:function( value ){
				var comma=',',
					underPointValue='',
					betweenLen=3,
					orgValue=value,
					sign, values, lastIndex, formattedValue;
				value=String(value);
				sign=value.indexOf('-') > -1 ? '-' : '';
				if( value.indexOf('.') > -1 ){
					values=value.split('.');
					value=String(Math.abs(values[0]));
					underPointValue='.'+values[1];
				}else{
					value=String(Math.abs(value));
				}
				if( value.length <= betweenLen ){
					formattedValue=orgValue;
				}else{
					values=(value).split('').reverse();
					lastIndex=values.length-1;
					values=tui.util.map(values, function( char, index ){
						var result=[char];
						if( index < lastIndex && (index+1)%betweenLen===0 ){
							result.push(comma);
						}
						return result;
					});
					formattedValue=sign+concat.apply([], values).reverse().join('')+underPointValue;
				}
				return formattedValue;
			},
			/**
			 * Make cssText from map.
			 * @param {object} cssMap - css map
			 * @returns {string}
			 */
			makeCssTextFromMap:function( cssMap ){
				return tui.util.map(cssMap, function( value, name ){
					return renderUtil.concatStr(name, ':', value);
				}).join(';');
			}
		};
		
		/**
		 * Set css opacity.
		 * @param {HTMLElement | Array.<HTMLElement>} elements - elements
		 * @param {function} iteratee - iteratee
		 */
		function setOpacity ( elements, iteratee ){
			elements=tui.util.isArray(elements) ? elements : [elements];
			tui.util.forEachArray(elements, iteratee);
		}
		
		/**
		 * Make filter opacity css string.
		 * @param {number} opacity - opacity
		 * @returns {string}
		 */
		function makeCssFilterOpacityString ( opacity ){
			return 'alpha(opacity='+(opacity*chartConst.OLD_BROWSER_OPACITY_100)+')';
		}
		
		if( isOldBrowser ){
			/**
			 * Make opacity css text for old browser(IE7, IE8).
			 * @param {number} opacity - opacity
			 * @returns {string}
			 */
			renderUtil.makeOpacityCssText=function( opacity ){
				var cssText='';
				if( tui.util.isExisty(opacity) ){
					cssText=';filter:'+makeCssFilterOpacityString(opacity);
				}
				return cssText;
			};
			/**
			 * Set css opacity for old browser(IE7, IE8).
			 * @param {HTMLElement | Array.<HTMLElement>} elements - elements
			 * @param {number} opacity - opacity
			 */
			renderUtil.setOpacity=function( elements, opacity ){
				var filter=makeCssFilterOpacityString(opacity);
				setOpacity(elements, function( element ){
					element.style.filter=filter;
				});
			};
		}else{
			/**
			 * Make opacity css text for browser supporting opacity property of CSS3.
			 * @param {number} opacity - opacity
			 * @returns {string}
			 */
			renderUtil.makeOpacityCssText=function( opacity ){
				var cssText='';
				if( tui.util.isExisty(opacity) ){
					cssText=';opacity:'+opacity;
				}
				return cssText;
			};
			/**
			 * Set css opacity for browser supporting opacity property of CSS3.
			 * @param {HTMLElement | Array.<HTMLElement>} elements - elements
			 * @param {number} opacity - opacity
			 */
			renderUtil.setOpacity=function( elements, opacity ){
				setOpacity(elements, function( element ){
					element.style.opacity=opacity;
				});
			};
		}
		tui.util.defineNamespace('tui.chart');
		tui.chart.renderUtil=renderUtil;
		module.exports=renderUtil;
		/***/
	},
	/* 24 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview This is templates or axis view.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var templateMaker=__webpack_require__(25);
		var htmls={
			HTML_AXIS_TICK_LINE:'<div class="tui-chart-tick-line"'+
			' style="{{ positionType }}:{{ positionValue }}px;{{ sizeType }}:{{ size }}px"></div>',
			HTML_AXIS_TICK:'<div class="tui-chart-tick" style="{{ cssText }}"></div>',
			HTML_AXIS_LABEL:'<div class="tui-chart-label{{ additionalClass }}" style="{{ cssText }}">'+
			'<span{{ spanCssText }}>{{ label }}</span></div>'
		};
		module.exports={
			tplTickLine:templateMaker.template(htmls.HTML_AXIS_TICK_LINE),
			tplAxisTick:templateMaker.template(htmls.HTML_AXIS_TICK),
			tplAxisLabel:templateMaker.template(htmls.HTML_AXIS_LABEL)
		};
		/***/
	},
	/* 25 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview This is template maker.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		module.exports={
			/**
			 * This is template maker.
			 * @param {string} html html
			 * @returns {function} template function
			 * @eaxmple
			 *
			 *   var template = templateMaker.template('<span>{{ name }}</span>'),
			 *       result = template({name: 'John');
	     *   console.log(result); // <span>John</span>
	     *
	     */
			template:function( html ){
				return function( data ){
					var result=html;
					tui.util.forEach(data, function( value, key ){
						var regExp=new RegExp('{{\\s*'+key+'\\s*}}', 'g');
						result=result.replace(regExp, String(value).replace('$', '＄'));
					});
					return result;
				};
			}
		};
		/***/
	},
	/* 26 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Plot component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var dom=__webpack_require__(20);
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var plotTemplate=__webpack_require__(27);
		var Plot=tui.util.defineClass(/** @lends Plot.prototype */ {
			/**
			 * Plot component.
			 * @constructs Plot
			 * @private
			 * @param {object} params parameters
			 *      @param {number} params.vTickCount vertical tick count
			 *      @param {number} params.hTickCount horizontal tick count
			 *      @param {object} params.theme axis theme
			 */
			init:function( params ){
				/**
				 * Plot view className
				 * @type {string}
				 */
				this.className='tui-chart-plot-area';
				/**
				 * Data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * Options
				 * @type {object}
				 */
				this.options=params.options || {};
				this.options.showLine=tui.util.isUndefined(this.options.showLine) ? true : this.options.showLine;
				this.options.lines=this.options.lines || [];
				this.options.bands=this.options.bands || [];
				/**
				 * x axis type option
				 * @type {?string}
				 */
				this.xAxisTypeOption=params.xAxisTypeOption;
				/**
				 * Theme
				 * @type {object}
				 */
				this.theme=params.theme || {};
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * sub charts type
				 * @type {Array.<string>}
				 */
				this.chartTypes=params.chartTypes;
				/**
				 * layout bounds information for this components
				 * @type {null|{dimension:{width:number, height:number}, position:{left:number, top:number}}}
				 */
				this.layout=null;
				/**
				 * axis data map
				 * @type {null|object}
				 */
				this.axisDataMap=null;
			},
			/**
			 * Render plot area.
			 * @param {HTMLElement} plotContainer plot area element
			 * @private
			 */
			_renderPlotArea:function( plotContainer ){
				var dimension;
				dimension=this.layout.dimension;
				renderUtil.renderDimension(plotContainer, dimension);
				renderUtil.renderPosition(plotContainer, this.layout.position);
				if( predicate.isLineTypeChart(this.chartType, this.chartTypes) ){
					this._renderOptionalLines(plotContainer, dimension);
				}
				if( this.options.showLine ){
					this._renderPlotLines(plotContainer, dimension);
				}
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      layout: {
	     *          dimension: {width: number, height: number},
	     *          position: {left: number, top: number}
	     *      },
	     *      axisDataMap: object
	     * }} data - bounds and scale data
			 * @private
			 */
			_setDataForRendering:function( data ){
				if( data ){
					this.layout=data.layout;
					this.dimensionMap=data.dimensionMap;
					this.axisDataMap=data.axisDataMap;
				}
			},
			/**
			 * Render plot component.
			 * @param {object} data - bounds and scale data
			 * @returns {HTMLElement} plot element
			 */
			render:function( data ){
				var container=dom.create('DIV', this.className);
				this._setDataForRendering(data);
				this._renderPlotArea(container);
				this.plotContainer=container;
				return container;
			},
			/**
			 * Rerender.
			 * @param {object} data - bounds and scale data
			 */
			rerender:function( data ){
				this.plotContainer.innerHTML='';
				this._setDataForRendering(data);
				this._renderPlotArea(this.plotContainer);
			},
			/**
			 * Resize plot component.
			 * @param {object} data - bounds and scale data
			 */
			resize:function( data ){
				this.rerender(data);
			},
			/**
			 * Make template params for vertical line.
			 * @param {object} additionalParams - additional params
			 * @returns {object}
			 * @private
			 */
			_makeVerticalLineTemplateParams:function( additionalParams ){
				return tui.util.extend({
					className:'vertical',
					positionType:'left',
					width:'1px'
				}, additionalParams);
			},
			/**
			 * Make template params for horizontal line.
			 * @param {object} additionalParams - additional params
			 * @returns {object}
			 * @private
			 */
			_makeHorizontalLineTemplateParams:function( additionalParams ){
				return tui.util.extend({
					className:'horizontal',
					positionType:'bottom',
					height:'1px'
				}, additionalParams);
			},
			/**
			 * Make line html.
			 * @param {number} startPercent - start percentage position
			 * @param {number} standardWidth - standard width
			 * @param {object} templateParams - template parameters
			 * @returns {string}
			 * @private
			 */
			_makeLineHtml:function( startPercent, standardWidth, templateParams ){
				templateParams.positionValue=startPercent+'%';
				templateParams.opacity=templateParams.opacity || '';
				return plotTemplate.tplPlotLine(templateParams);
			},
			/**
			 * Create value range for optional line.
			 * @param {{range: ?Array.<number>, value: ?number}} optionalLineData - optional line data
			 * @returns {Array.<number>}
			 * @private
			 */
			_createOptionalLineValueRange:function( optionalLineData ){
				var range=optionalLineData.range || [optionalLineData.value];
				if( predicate.isDatetimeType(this.xAxisTypeOption) ){
					range=tui.util.map(range, function( value ){
						var date=new Date(value);
						return date.getTime() || value;
					});
				}
				return range;
			},
			/**
			 * Create position for optional line, when value axis.
			 * @param {{dataMin: number, distance: number}} xAxisData - x axis data
			 * @param {number} width - width
			 * @param {number} value - value
			 * @returns {number|null}
			 * @private
			 */
			_createOptionalLinePosition:function( xAxisData, width, value ){
				var ratio=(value-xAxisData.dataMin)/xAxisData.distance;
				var position=ratio*width;
				if( ratio===1 ){
					position-=1;
				}
				if( position < 0 ){
					position=null;
				}
				return position;
			},
			/**
			 * Create position for optional line, when label axis.
			 * @param {number} width - width
			 * @param {number} value - value
			 * @returns {number|null}
			 * @private
			 */
			_createOptionalLinePositionWhenLabelAxis:function( width, value ){
				var dataProcessor=this.dataProcessor;
				var index=dataProcessor.findCategoryIndex(value);
				var position=null;
				var ratio;
				if( !tui.util.isNull(index) ){
					ratio=(index===0) ? 0 : (index/(dataProcessor.getCategoryCount()-1));
					position=ratio*width;
				}
				if( ratio===1 ){
					position-=1;
				}
				return position;
			},
			/**
			 * Create position map for optional line.
			 * @param {{range: ?Array.<number>, value: ?number}} optionalLineData - optional line data
			 * @param {{isLabelAxis: boolean, dataMin: number, distance: number}} xAxisData - x axis data
			 * @param {number} width - width
			 * @returns {{start: number, end: number}}
			 * @private
			 */
			_createOptionalLinePositionMap:function( optionalLineData, xAxisData, width ){
				var range=this._createOptionalLineValueRange(optionalLineData);
				var startPosition, endPosition;
				if( xAxisData.isLabelAxis ){
					startPosition=this._createOptionalLinePositionWhenLabelAxis(width, range[0]);
					endPosition=this._createOptionalLinePositionWhenLabelAxis(width, range[1]);
				}else{
					startPosition=this._createOptionalLinePosition(xAxisData, width, range[0]);
					endPosition=range[1] && this._createOptionalLinePosition(xAxisData, width, range[1]);
				}
				if( tui.util.isExisty(endPosition) && tui.util.isNull(startPosition) ){
					startPosition=0;
				}
				return {
					start:startPosition,
					end:endPosition
				};
			},
			/**
			 * Make optional line html.
			 * @param {Array.<number>} xAxisData - positions
			 * @param {number} width - standard width
			 * @param {object} templateParams - template parameters
			 * @param {object} optionalLineData - optional line information
			 * @returns {string}
			 * @private
			 */
			_makeOptionalLineHtml:function( xAxisData, width, templateParams, optionalLineData ){
				var positionMap=this._createOptionalLinePositionMap(optionalLineData, xAxisData, width);
				var plotLineWidth='1px';
				var html='';
				var startPercent, widthPercent;
				if( tui.util.isExisty(positionMap.start) && (positionMap.start >= 0) && (positionMap.start <= width) ){
					startPercent=calculator.makePercentageValue(positionMap.start, width);
					if( tui.util.isExisty(positionMap.end) ){
						widthPercent=calculator.makePercentageValue(positionMap.end-positionMap.start, width);
						if( startPercent+widthPercent > 100 ){
							widthPercent=100-startPercent;
						}
						templateParams.width=widthPercent+'%';
					}else{
						templateParams.width=plotLineWidth;
					}
					templateParams.color=optionalLineData.color || 'transparent';
					templateParams.opacity=renderUtil.makeOpacityCssText(optionalLineData.opacity);
					html=this._makeLineHtml(startPercent, width, templateParams);
				}
				return html;
			},
			/**
			 * Make optional lines html.
			 * @param {Array.<object>} lines - optional lines
			 * @param {{width: number, height: number}} dimension - dimension
			 * @returns {string}
			 * @private
			 */
			_makeOptionalLinesHtml:function( lines, dimension ){
				var width=dimension.width;
				var xAxisData=this.axisDataMap.xAxis;
				var templateParams=this._makeVerticalLineTemplateParams({
					height:dimension.height+'px'
				});
				var makeOptionalLineHtml=tui.util.bind(this._makeOptionalLineHtml, this, xAxisData, width, templateParams);
				return tui.util.map(lines, makeOptionalLineHtml).join('');
			},
			/**
			 * Render optional lines and bands.
			 * @param {HTMLElement} container - container
			 * @param {{width: number, height: number}} dimension - dimension
			 * @private
			 */
			_renderOptionalLines:function( container, dimension ){
				var optionalContainer=dom.create('DIV', 'tui-chart-plot-optional-lines-area');
				var bandsHtml=this._makeOptionalLinesHtml(this.options.bands, dimension);
				var linesHtml=this._makeOptionalLinesHtml(this.options.lines, dimension);
				this.optionalContainer=optionalContainer;
				dom.append(container, optionalContainer);
				optionalContainer.innerHTML=bandsHtml+linesHtml;
			},
			/**
			 * Make html of plot lines.
			 * @param {Array.<number>} positions - position values
			 * @param {number} standardWidth - standard width
			 * @param {object} templateParams parameters
			 * @returns {string} html
			 * @private
			 */
			_makeLinesHtml:function( positions, standardWidth, templateParams ){
				var self=this;
				var startPercent;
				var lineHtml=tui.util.map(positions, function( position ){
					startPercent=calculator.makePercentageValue(position, standardWidth);
					return self._makeLineHtml(startPercent, standardWidth, templateParams);
				}).join('');
				return lineHtml;
			},
			/**
			 * Maker html for vertical lines
			 * @param {{width: number, height: number}} dimension - dimension
			 * @param {string} lineColor - line color
			 * @returns {string}
			 * @private
			 */
			_makeVerticalLinesHtml:function( dimension, lineColor ){
				var positions=this._makeHorizontalPositions(dimension.width);
				var templateParams=this._makeVerticalLineTemplateParams({
					height:dimension.height+'px',
					color:lineColor
				});
				return this._makeLinesHtml(positions, dimension.width, templateParams);
			},
			/**
			 * Maker html for horizontal lines.
			 * @param {{width: number, height: number}} dimension - dimension
			 * @param {string} lineColor - line color
			 * @returns {string}
			 * @private
			 */
			_makeHorizontalLinesHtml:function( dimension, lineColor ){
				var positions=this._makeVerticalPositions(dimension.height);
				var templateParams=this._makeHorizontalLineTemplateParams({
					width:dimension.width+'px',
					color:lineColor
				});
				return this._makeLinesHtml(positions, dimension.height, templateParams);
			},
			/**
			 * Render plot lines.
			 * @param {HTMLElement} container - container element
			 * @param {{width: number, height: number}} dimension plot area dimension
			 * @private
			 */
			_renderPlotLines:function( container, dimension ){
				var lineContainer=dom.create('DIV', 'tui-chart-plot-lines-area');
				var theme=this.theme;
				var lineHtml='';
				if( !predicate.isLineTypeChart(this.chartType) ){
					lineHtml+=this._makeVerticalLinesHtml(dimension, theme.lineColor);
				}
				lineHtml+=this._makeHorizontalLinesHtml(dimension, theme.lineColor);
				dom.append(container, lineContainer);
				lineContainer.innerHTML+=lineHtml;
				renderUtil.renderBackground(container, theme.background);
			},
			/**
			 * Make positions for vertical line.
			 * @param {number} height plot height
			 * @returns {Array.<number>} positions
			 * @private
			 */
			_makeVerticalPositions:function( height ){
				var axisDataMap=this.axisDataMap;
				var yAxis=axisDataMap.yAxis || axisDataMap.rightYAxis;
				var positions=calculator.makeTickPixelPositions(height, yAxis.validTickCount);
				positions.shift();
				return positions;
			},
			/**
			 * Make divided positions of plot.
			 * @param {number} width - plot width
			 * @param {number} tickCount - tick count
			 * @returns {Array.<number>}
			 * @private
			 */
			_makeDividedPlotPositions:function( width, tickCount ){
				var yAxisWidth=this.dimensionMap.yAxis.width;
				var leftWidth, rightWidth, leftPositions, rightPositions;
				tickCount=parseInt(tickCount/2, 10)+1;
				width-=yAxisWidth;
				leftWidth=Math.round((width)/2);
				rightWidth=width-leftWidth;
				leftPositions=calculator.makeTickPixelPositions(leftWidth, tickCount);
				rightPositions=calculator.makeTickPixelPositions(rightWidth, tickCount, leftWidth+yAxisWidth);
				leftPositions.pop();
				rightPositions.shift();
				return leftPositions.concat(rightPositions);
			},
			/**
			 * Make positions for horizontal line.
			 * @param {number} width plot width
			 * @returns {Array.<number>} positions
			 * @private
			 */
			_makeHorizontalPositions:function( width ){
				var tickCount=this.axisDataMap.xAxis.validTickCount;
				var positions;
				if( this.options.divided ){
					positions=this._makeDividedPlotPositions(width, tickCount);
				}else{
					positions=calculator.makeTickPixelPositions(width, tickCount);
					positions.shift();
				}
				return positions;
			},
			/**
			 * Add plot line.
			 * @param {{index: number, color: string, id: string}} data - data
			 */
			addPlotLine:function( data ){
				this.options.lines.push(data);
				this.rerender();
			},
			/**
			 * Add plot band.
			 * @param {{range: Array.<number>, color: string, id: string}} data - data
			 */
			addPlotBand:function( data ){
				this.options.bands.push(data);
				this.rerender();
			},
			/**
			 * Remove plot line.
			 * @param {string} id - line id
			 */
			removePlotLine:function( id ){
				this.options.lines=tui.util.filter(this.options.lines, function( line ){
					return line.id!==id;
				});
				this.rerender();
			},
			/**
			 * Remove plot band.
			 * @param {string} id - band id
			 */
			removePlotBand:function( id ){
				this.options.bands=tui.util.filter(this.options.bands, function( line ){
					return line.id!==id;
				});
				this.rerender();
			},
			/**
			 * Animate for adding data.
			 * @param {{tickSize: number, shifting: boolean}} data - data for animation
			 */
			animateForAddingData:function( data ){
				var self=this;
				var beforeLeft=0;
				var interval=data.tickSize;
				var areaWidth;
				if( this.dataProcessor.isCoordinateType() ){
					this.optionalContainer.innerHTML='';
				}else if( data.shifting ){
					renderUtil.startAnimation(chartConst.ADDING_DATA_ANIMATION_DURATION, function( ratio ){
						var left=interval*ratio;
						self.optionalContainer.style.left=(beforeLeft-left)+'px';
					});
				}else{
					areaWidth=this.layout.dimension.width;
					renderUtil.startAnimation(chartConst.ADDING_DATA_ANIMATION_DURATION, function( ratio ){
						var left=interval*ratio;
						self.optionalContainer.style.width=(areaWidth-left)+'px';
					}, function(){
					});
				}
			}
		});
		module.exports=Plot;
		/***/
	},
	/* 27 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview This is templates of plot view .
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var templateMaker=__webpack_require__(25);
		var tags={
			HTML_PLOT_LINE:'<div class="tui-chart-plot-line {{ className }}"'+
			' style="{{ positionType }}:{{ positionValue }};width:{{ width }};height:{{ height }};'+
			'background-color:{{ color }}{{ opacity }}">'+
			'</div>'
		};
		module.exports={
			tplPlotLine:templateMaker.template(tags.HTML_PLOT_LINE)
		};
		/***/
	},
	/* 28 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Radial plot component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var dom=__webpack_require__(20);
		var geom=__webpack_require__(29);
		var chartConst=__webpack_require__(2);
		var renderUtil=__webpack_require__(23);
		var pluginFactory=__webpack_require__(7);
		var RadialPlot=tui.util.defineClass(/** @lends Plot.prototype */ {
			/**
			 * plot component className
			 * @type {string}
			 */
			className:'tui-chart-plot-area',
			/**
			 * Plot component.
			 * @constructs Plot
			 * @param {object} params parameters
			 *      @param {number} params.vTickCount vertical tick count
			 *      @param {number} params.hTickCount horizontal tick count
			 *      @param {object} params.theme axis theme
			 */
			init:function( params ){
				/**
				 * Options
				 * @type {object}
				 */
				this.options=tui.util.extend({
					type:'spiderweb'
				}, params.options);
				/**
				 * Theme
				 * @type {object}
				 */
				this.theme=params.theme || {};
				/**
				 * Graph renderer
				 * @type {object}
				 */
				this.graphRenderer=pluginFactory.get('raphael', 'radialPlot');
			},
			/**
			 * Render plot area
			 * @param {HTMLElement} container html container
			 * @param {object} dimension dimension
			 * @param {Array.<Array>} plotPositions plot positions
			 * @param {object} labelData label data
			 * @returns {Paper} raphael paper
			 */
			_renderPlotArea:function( container, dimension, plotPositions, labelData ){
				var renderParams={
					container:container,
					dimension:dimension,
					plotPositions:plotPositions,
					labelData:labelData,
					theme:this.theme,
					options:this.options
				};
				return this.graphRenderer.render(renderParams);
			},
			/**
			 * Make plot positions for render
			 * @param {object} axisDataMap axisDataMap
			 * @param {object} dimension dimension
			 * @returns {Array.<Array>} plot positions
			 */
			_makePositions:function( axisDataMap, dimension ){
				var width=dimension.width-chartConst.RADIAL_PLOT_PADDING-chartConst.RADIAL_MARGIN_FOR_CATEGORY;
				var height=dimension.height-chartConst.RADIAL_PLOT_PADDING-chartConst.RADIAL_MARGIN_FOR_CATEGORY;
				var centerX=(width/2)+(chartConst.RADIAL_PLOT_PADDING/2)+(chartConst.RADIAL_MARGIN_FOR_CATEGORY/2);
				var centerY=(height/2)-(chartConst.RADIAL_PLOT_PADDING/2)-(chartConst.RADIAL_MARGIN_FOR_CATEGORY/2);
				var stepCount=axisDataMap.yAxis.tickCount;
				var angleStepCount=axisDataMap.xAxis.labels.length;
				return makeSpiderWebPositions({
					width:width,
					height:height,
					centerX:centerX,
					centerY:centerY,
					angleStepCount:angleStepCount,
					stepCount:stepCount
				});
			},
			/**
			 * Make category positions
			 * @param {object} axisDataMap axisDataMap
			 * @param {object} dimension dimension
			 * @returns {Array.<object>} category positions
			 */
			_makeCategoryPositions:function( axisDataMap, dimension ){
				var width=dimension.width-chartConst.RADIAL_PLOT_PADDING-chartConst.RADIAL_CATEGORY_PADDING;
				var height=dimension.height-chartConst.RADIAL_PLOT_PADDING-chartConst.RADIAL_CATEGORY_PADDING;
				var centerX=(width/2)+(chartConst.RADIAL_PLOT_PADDING/2)+(chartConst.RADIAL_CATEGORY_PADDING/2);
				var centerY=(height/2)-(chartConst.RADIAL_PLOT_PADDING/2)-(chartConst.RADIAL_CATEGORY_PADDING/2);
				var angleStepCount=axisDataMap.xAxis.labels.length;
				return makeRadialCategoryPositions({
					width:width,
					height:height,
					centerX:centerX,
					centerY:centerY,
					angleStepCount:angleStepCount
				});
			},
			/**
			 * Make label data
			 * @param {object} axisDataMap axisDataMap
			 * @param {object} dimension dimension
			 * @param {Array.<Array>} plotPositions plot positions
			 * @returns {object}
			 */
			_makeLabelData:function( axisDataMap, dimension, plotPositions ){
				var categories=axisDataMap.xAxis.labels;
				var stepLabels=axisDataMap.yAxis.labels;
				var categoryPositions=this._makeCategoryPositions(axisDataMap, dimension);
				var categoryLabelData=[];
				var stepLabelData=[];
				var i, j;
				for( i=0; i < categories.length; i+=1 ){
					categoryLabelData.push({
						text:categories[i],
						position:categoryPositions[i]
					});
				}
				// 마지막 스탭 라벨은 카테고리랑 겹칠수 있어 만들지 않음
				for( j=0; j < (stepLabels.length-1); j+=1 ){
					stepLabelData.push({
						text:stepLabels[j],
						position:plotPositions[j][0]
					});
				}
				return {
					category:categoryLabelData,
					step:stepLabelData
				};
			},
			/**
			 * Render plot component.
			 * @param {object} data - bounds and scale data
			 * @returns {{
	     *     container: HTMLElement,
	     *     paper: object
	     * }} plot element
			 */
			render:function( data ){
				var paper;
				var plotPositions=this._makePositions(data.axisDataMap, data.layout.dimension);
				var labelData=this._makeLabelData(data.axisDataMap, data.layout.dimension, plotPositions);
				this.plotContainer=dom.create('DIV', this.className);
				this._renderContainerPosition(this.plotContainer, data.positionMap.plot);
				paper=this._renderPlotArea(this.plotContainer, data.layout.dimension, plotPositions, labelData);
				return {
					container:this.plotContainer,
					paper:paper
				};
			},
			/**
			 * Re render plot component
			 * @param {object} data - bounds and scale data
			 */
			rerender:function( data ){
				var plotPositions=this._makePositions(data.axisDataMap, data.layout.dimension);
				var labelData=this._makeLabelData(data.axisDataMap, data.layout.dimension, plotPositions);
				this.plotContainer.innerHTML='';
				this._renderPlotArea(this.plotContainer, data.layout.dimension, plotPositions, labelData);
			},
			/**
			 * Set element's top, left given top, left position
			 * series에서 가져옴, 추후 공통 페이퍼 적용전까지 임시 사용
			 * @param {HTMLElement} el - series element
			 * @param {{top: number, left: number}} position - series top, left position
			 * @private
			 */
			_renderContainerPosition:function( el, position ){
				var hiddenWidth=renderUtil.isOldBrowser() ? 1 : 0;
				renderUtil.renderPosition(el, {
					top:position.top-(hiddenWidth),
					left:position.left-(hiddenWidth*2)
				});
			},
			/**
			 * Resize plot component.
			 * @param {object} data - bounds and scale data
			 */
			resize:function( data ){
				this.rerender(data);
			}
		});
		
		/**
		 * Make Spider web positions
		 * @param {object} params parameters
		 *     @param {number} params.width width
		 *     @param {number} params.height height
		 *     @param {number} params.centerX center x coordinate
		 *     @param {number} params.centerY cneter y coordinate
		 *     @param {number} params.angleStepCount angle step count
		 *     @param {number} params.stepCount step count
		 * @returns {Array<Array>} positions
		 * @private
		 */
		function makeSpiderWebPositions ( params ){
			var width=params.width;
			var height=params.height;
			var centerX=params.centerX;
			var centerY=params.centerY;
			var angleStepCount=params.angleStepCount;
			var stepCount=params.stepCount;
			var radius=Math.min(width, height)/2;
			var angleStep=360/angleStepCount;
			var points=[];
			var stepPoints, pointY, point, stepPixel, i, j;
			stepPixel=radius/(stepCount-1); // 0 스텝에는 크기가 없는 점이니 스텝한개는 제거
			for( i=0; i < stepCount; i+=1 ){
				stepPoints=[];
				// 회전할 첫번째 픽셀의 Y축 값
				pointY=centerY+(stepPixel*i);
				for( j=0; j < angleStepCount; j+=1 ){
					point=geom.rotatePointAroundOrigin(centerX, centerY, centerX, pointY, angleStep*j);
					stepPoints.push({
						left:point.x,
						top:height-point.y // y좌표를 top좌표로 전환
					});
				}
				stepPoints.push(stepPoints[0]);
				points[i]=stepPoints;
			}
			return points;
		}
		
		/**
		 * Make radial category positions
		 * @param {object} params parameters
		 *     @param {number} params.width width
		 *     @param {number} params.height height
		 *     @param {number} params.centerX center x coordinate
		 *     @param {number} params.centerY cneter y coordinate
		 *     @param {number} params.angleStepCount angle step count
		 * @returns {Array<object>} category positions
		 * @private
		 */
		function makeRadialCategoryPositions ( params ){
			var width=params.width;
			var height=params.height;
			var centerX=params.centerX;
			var centerY=params.centerY;
			var angleStepCount=params.angleStepCount;
			var radius=Math.min(height, width)/2;
			var angleStep=360/angleStepCount;
			var points=[];
			var anchor, point, i, pointY, reversedAngle;
			pointY=centerY+radius;
			for( i=0; i < angleStepCount; i+=1 ){
				reversedAngle=360-(angleStep*i);
				point=geom.rotatePointAroundOrigin(centerX, centerY, centerX, pointY, reversedAngle);
				if( reversedAngle > 0 && reversedAngle < 180 ){
					anchor='end';
				}else if( reversedAngle > 180 && reversedAngle < 360 ){
					anchor='start';
				}else{
					anchor='middle';
				}
				points.push({
					left:point.x,
					top:height-point.y, // y좌표를 top좌표로 전환
					anchor:anchor
				});
			}
			return points;
		}
		
		module.exports=RadialPlot;
		/***/
	},
	/* 29 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview module for geometric operation
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/**
		 * Rotate a point around the origin with an angle.
		 * @param {number} centerX center point x
		 * @param {number} centerY center point y
		 * @param {number} pointX point x to rotate
		 * @param {number} pointY point y to rotate
		 * @param {number} angle angle
		 * @returns {object} x, y
		 */
		function rotatePointAroundOrigin ( centerX, centerY, pointX, pointY, angle ){
			var rad=angle*(Math.PI/180);
			var newX=((pointX-centerX)*Math.cos(rad))-((pointY-centerY)*Math.sin(rad));
			var newY=((pointX-centerX)*Math.sin(rad))+((pointY-centerY)*Math.cos(rad));
			newX+=centerX;
			newY+=centerY;
			return {
				x:newX,
				y:newY
			};
		}
		
		module.exports={
			rotatePointAroundOrigin:rotatePointAroundOrigin
		};
		/***/
	},
	/* 30 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview chartExportMenu component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var eventListener=__webpack_require__(31);
		var dom=__webpack_require__(20);
		var renderUtil=__webpack_require__(23);
		var chartDataExporter=__webpack_require__(32);
		var CHART_EXPORT_MENU_ITEMS=['xls', 'csv'];
		var CLASS_NAME_CHART_EXPORT_MENU_OPENED='menu-opened';
		var ChartExportMenu=tui.util.defineClass(/** @lends ChartExportMenu.prototype */ {
			/**
			 * ChartExportMenu component.
			 * @constructs ChartExportMenu
			 * @private
			 * @param {object} params parameters
			 */
			init:function( params ){
				/**
				 * ChartExportMenu view className
				 * @type {string}
				 */
				this.className='tui-chart-chartExportMenu-area';
				/**
				 * Data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * chart title
				 * @type {string}
				 */
				this.chartTitle=params.chartTitle;
				/**
				 * layout bounds information for this components
				 * @type {null|{dimension:{width:number, height:number}, position:{right:number, top:number}}}
				 */
				this.layout=null;
				/**
				 * chartExportMenu container
				 * @type {HTMLElement}
				 */
				this.chartExportMenuContainer=null;
				/**
				 * chartExportMenu element
				 * @type {HTMLElement}
				 */
				this.chartExportMenu=null;
			},
			/**
			 * Create chartExportMenuButton
			 * @returns {HTMLElement}
			 * @private
			 */
			_createChartExportMenuButton:function(){
				var menuButton=dom.create('div', chartConst.CLASS_NAME_CHART_EXPORT_MENU_BUTTON);
				menuButton.innerHTML='menu';
				return menuButton;
			},
			/**
			 * Render chartExportMenu area.
			 * @param {HTMLElement} chartExportMenuContainer chartExportMenu area element
			 * @private
			 */
			_renderChartExportMenuArea:function( chartExportMenuContainer ){
				var menuButton=this._createChartExportMenuButton();
				var dimension=this.layout.dimension;
				chartExportMenuContainer.appendChild(menuButton);
				renderUtil.renderDimension(chartExportMenuContainer, dimension);
				renderUtil.renderPosition(chartExportMenuContainer, this.layout.position);
			},
			/**
			 * Render chartExportMenu area.
			 * @param {HTMLElement} chartExportMenuContainer chartExportMenu area element
			 * @private
			 */
			_renderChartExportMenu:function( chartExportMenuContainer ){
				var browserSupportsDownload=chartDataExporter.isBrowserSupportClientSideDownload();
				var chartExportMenuElement=dom.create('ul');
				var menuStyle=chartExportMenuElement.style;
				var menuItems=[];
				if( browserSupportsDownload ){
					menuItems=tui.util.map(CHART_EXPORT_MENU_ITEMS, function( exportItemType ){
						var itemElement=dom.create('li', chartConst.CLASS_NAME_CHART_EXPORT_MENU_ITEM);
						itemElement.id=exportItemType;
						itemElement.innerHTML='Export to .'+exportItemType;
						return itemElement;
					});
				}else{
					menuStyle.width='200px';
					menuItems[0]=dom.create('li', chartConst.CLASS_NAME_CHART_EXPORT_MENU_ITEM);
					menuItems[0].innerHTML='Browser does not support client-side download.';
				}
				dom.append(chartExportMenuElement, menuItems);
				this.chartExportMenu=chartExportMenuElement;
				dom.append(chartExportMenuContainer, chartExportMenuElement);
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      layout: {
	     *          dimension: {width: number, height: number},
	     *          position: {left: number, top: number}
	     *      },
	     *      axisDataMap: object
	     * }} data - bounds and scale data
			 * @private
			 */
			_setDataForRendering:function( data ){
				if( data ){
					this.layout=data.layout;
					this.dimensionMap=data.dimensionMap;
					this.axisDataMap=data.axisDataMap;
				}
			},
			/**
			 * Render chartExportMenu component.
			 * @param {object} data - bounds and scale data
			 * @returns {HTMLElement} chartExportMenu element
			 */
			render:function( data ){
				var container=dom.create('DIV', this.className);
				this._setDataForRendering(data);
				this._renderChartExportMenuArea(container);
				this._renderChartExportMenu(container);
				this.chartExportMenuContainer=container;
				this._attachEvent(container);
				return container;
			},
			/**
			 * Rerender.
			 */
			rerender:function(){
				this._hideChartExportMenu();
			},
			/**
			 * Resize.
			 */
			resize:function(){
			},
			/**
			 * Show chart export menu
			 * @private
			 */
			_showChartExportMenu:function(){
				dom.addClass(this.chartExportMenuContainer, CLASS_NAME_CHART_EXPORT_MENU_OPENED);
				this.chartExportMenu.style.display='block';
			},
			/**
			 * Hide chart export menu
			 * @private
			 */
			_hideChartExportMenu:function(){
				dom.removeClass(this.chartExportMenuContainer, CLASS_NAME_CHART_EXPORT_MENU_OPENED);
				this.chartExportMenu.style.display='none';
			},
			/**
			 * onclick event handler
			 * @param {MouseEvent} e mouse event
			 * @private
			 */
			_onClick:function( e ){
				var elTarget=e.target || e.srcElement;
				if( dom.hasClass(elTarget, chartConst.CLASS_NAME_CHART_EXPORT_MENU_ITEM) ){
					if( elTarget.id ){
						chartDataExporter.exportChartData(elTarget.id, this.dataProcessor.rawData, this.chartTitle);
					}
					this._hideChartExportMenu();
				}else if( dom.hasClass(elTarget, chartConst.CLASS_NAME_CHART_EXPORT_MENU_BUTTON) ){
					if( dom.hasClass(this.chartExportMenuContainer, CLASS_NAME_CHART_EXPORT_MENU_OPENED) ){
						this._hideChartExportMenu();
					}else{
						this._showChartExportMenu();
					}
				}
			},
			/**
			 * Attach browser event.
			 * @param {HTMLElement} target target element
			 * @private
			 */
			_attachEvent:function( target ){
				eventListener.on(target, 'click', this._onClick, this);
			},
			/**
			 * Detach browser event.
			 * @param {HTMLElement} target target element
			 * @private
			 */
			_detachEvent:function( target ){
				eventListener.off(target, 'click', this._onClick);
			}
		});
		module.exports=ChartExportMenu;
		/***/
	},
	/* 31 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview Event listener.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var bindHandlerMap={};
		/**
		 * Event listener.
		 * @module eventListener
		 * @private */
		var eventListener={
			/**
			 * Add event listener for IE.
			 * @memberOf module:eventListener
			 * @param {HTMLElement} target target element
			 * @param {string} type event type
			 * @param {function} handler callback function
			 * @param {?object} context context for callback
			 * @private
			 */
			_attachEvent:function( target, type, handler, context ){
				var bindHandler;
				if( context ){
					bindHandler=tui.util.bind(handler, context);
				}else{
					bindHandler=handler;
				}
				bindHandlerMap[type+handler]=bindHandler;
				target.attachEvent('on'+type, bindHandler);
			},
			/**
			 * Add event listener for other browsers.
			 * @memberOf module:eventListener
			 * @param {HTMLElement} target - target element
			 * @param {string} type - event type
			 * @param {function} handler - handler
			 * @param {object} [context] - context for handler
			 * @private
			 */
			_addEventListener:function( target, type, handler, context ){
				var bindHandler;
				if( context ){
					bindHandler=tui.util.bind(handler, context);
				}else{
					bindHandler=handler;
				}
				bindHandlerMap[type+handler]=bindHandler;
				target.addEventListener(type, bindHandler);
			},
			/**
			 * Bind DOM event.
			 * @memberOf module:eventListener
			 * @memberOf module:eventListener
			 * @param {HTMLElement} target target element
			 * @param {string} type event type
			 * @param {function} handler handler function
			 * @param {object} [context] - context for handler
			 * @private
			 */
			_bindEvent:function( target, type, handler, context ){
				var bindEvent;
				if( 'addEventListener' in target ){
					bindEvent=this._addEventListener;
				}else if( 'attachEvent' in target ){
					bindEvent=this._attachEvent;
				}
				eventListener._bindEvent=bindEvent;
				bindEvent(target, type, handler, context);
			},
			/**
			 * Bind DOM events.
			 * @memberOf module:eventListener
			 * @param {HTMLElement} target - target element
			 * @param {string | object} types - type or map of type and handler
			 * @param {function | object} [handler] - handler or context
			 * @param {object} [context] - context
			 */
			on:function( target, types, handler, context ){
				var handlerMap={};
				if( tui.util.isString(types) ){
					handlerMap[types]=handler;
				}else{
					handlerMap=types;
					context=handler;
				}
				tui.util.forEach(handlerMap, function( _handler, type ){
					eventListener._bindEvent(target, type, _handler, context);
				});
			},
			/**
			 * Remove event listener for IE.
			 * @memberOf module:eventListener
			 * @param {HTMLElement} target - target element
			 * @param {string} type - event type
			 * @param {function} handler - handler
			 * @private
			 */
			_detachEvent:function( target, type, handler ){
				if( bindHandlerMap[type+handler] ){
					target.detachEvent('on'+type, bindHandlerMap[type+handler]);
					delete bindHandlerMap[type+handler];
				}
			},
			/**
			 * Add event listener for other browsers.
			 * @memberOf module:eventListener
			 * @param {HTMLElement} target - target element
			 * @param {string} type - event type
			 * @param {function} handler - handler
			 * @private
			 */
			_removeEventListener:function( target, type, handler ){
				target.removeEventListener(type, bindHandlerMap[type+handler]);
				delete bindHandlerMap[type+handler];
			},
			/**
			 * Unbind DOM event.
			 * @memberOf module:eventListener
			 * @param {HTMLElement} target - target element
			 * @param {string} type - event type
			 * @param {function} handler - handler
			 * @private
			 */
			_unbindEvent:function( target, type, handler ){
				var unbindEvent;
				if( 'removeEventListener' in target ){
					unbindEvent=eventListener._removeEventListener;
				}else if( 'detachEvent' in target ){
					unbindEvent=eventListener._detachEvent;
				}
				eventListener._unbindEvent=unbindEvent;
				unbindEvent(target, type, handler);
			},
			/**
			 * Unbind DOM events.
			 * @memberOf module:eventListener
			 * @param {HTMLElement} target - target element
			 * @param {string | object} types - type or map of type and handler
			 * @param {function} [handler] - handler
			 */
			off:function( target, types, handler ){
				var handlerMap={};
				if( tui.util.isString(types) ){
					handlerMap[types]=handler;
				}else{
					handlerMap=types;
				}
				tui.util.forEach(handlerMap, function( _handler, type ){
					eventListener._unbindEvent(target, type, _handler);
				});
			}
		};
		module.exports=eventListener;
		/***/
	},
	/* 32 */
	/***/ function( module, exports ){
		/**
		 * @fileOverview Chart data exporter
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var DATA_URI_HEADERS={
			xls:'data:application/vnd.ms-excel;base64,',
			csv:'data:text/csv,'
		};
		var EXPORT_DATA_MAKERS={
			xls:_makeXlsStringWithRawData,
			csv:_makeCsvTextWithRawData
		};
		var DOWNLOADER_FUNCTIONS={
			downloadAttribute:_downloadWithAnchorElementDownloadAttribute,
			msSaveOrOpenBlob:_downloadWithMsSaveOrOpenBlob
		};
		
		/**
		 * Get pivoted second dimension array from table to use element.innerText
		 * @param {rawData} rawData - chart's raw data
		 * @returns {Array.<Array>}
		 * @private
		 */
		function _get2DArrayFromRawData ( rawData ){
			var resultArray=[];
			var categories, seriesName, data;
			var isHeatMap=(rawData.categories && tui.util.isExisty(rawData.categories.x));
			if( rawData ){
				if( isHeatMap ){
					categories=rawData.categories.x;
				}else if( rawData.categories ){
					categories=rawData.categories;
				}
				resultArray.push([''].concat(categories));
				tui.util.forEach(rawData.series, function( seriesDatum ){
					tui.util.forEach(seriesDatum, function( seriesItem, index ){
						if( isHeatMap ){
							seriesName=rawData.categories.y[index];
							data=seriesItem;
						}else{
							seriesName=seriesItem.name;
							data=seriesItem.data;
						}
						resultArray.push([seriesName].concat(data));
					});
				});
			}
			return resultArray;
		}
		
		/**
		 * Return download method name of current browser supports
		 * @returns {string}
		 * @private
		 */
		function _getDownloadMethod (){
			var isDownloadAttributeSupported=tui.util.isExisty(document.createElement('a').download);
			var isMsSaveOrOpenBlobSupported=window.Blob && window.navigator.msSaveOrOpenBlob;
			var method='none';
			if( isMsSaveOrOpenBlobSupported ){
				method='msSaveOrOpenBlob';
			}else if( isDownloadAttributeSupported ){
				method='downloadAttribute';
			}
			return method;
		}
		
		/**
		 * Get table element from chart data 2D array for xls content
		 * @param {Array.<Array<*>>} chartData2DArray - chart data 2D array
		 * @returns {string}
		 * @private
		 */
		function _getTableElementStringForXls ( chartData2DArray ){
			var tableElementString='<table>';
			tui.util.forEach(chartData2DArray, function( row, rowIndex ){
				var cellTagName=rowIndex===0 ? 'th' : 'td';
				tableElementString+='<tr>';
				tui.util.forEach(row, function( cell, cellIndex ){
					var cellNumberClass=(rowIndex!==0 || cellIndex===0) ? ' class="number"' : '';
					var cellString='<'+cellTagName+cellNumberClass+'>'+cell+'</'+cellTagName+'>';
					tableElementString+=cellString;
				});
				tableElementString+='</tr>';
			});
			tableElementString+='</table>';
			return tableElementString;
		}
		
		/**
		 * Make xls file with chart series data
		 * @param {rawData} rawData - chart rawData
		 * @returns {string} xls file content
		 * @private
		 */
		function _makeXlsStringWithRawData ( rawData ){
			var chartData2DArray=_get2DArrayFromRawData(rawData);
			var xlsString='<html xmlns:o="urn:schemas-microsoft-com:office:office" '+
				'xmlns:x="urn:schemas-microsoft-com:office:excel" '+
				'xmlns="http://www.w3.org/TR/REC-html40">'+
				'<head>'+
				'<!--[if gte mso 9]>'+
				'<xml>'+
				'<x:ExcelWorkbook>'+
				'<x:ExcelWorksheets>'+
				'<x:ExcelWorksheet>'+
				'<x:Name>Ark1</x:Name>'+
				'<x:WorksheetOptions>'+
				'<x:DisplayGridlines/>'+
				'</x:WorksheetOptions>'+
				'</x:ExcelWorksheet>'+
				'</x:ExcelWorksheets>'+
				'</x:ExcelWorkbook>'+
				'</xml>'+
				'<![endif]-->'+
				'<meta name=ProgId content=Excel.Sheet>'+
				'<meta charset=UTF-8>'+
				'</head>'+
				'<body>'+
				_getTableElementStringForXls(chartData2DArray)+
				'</body>'+
				'</html>';
			return xlsString;
		}
		
		/**
		 * Make csv text with chart series data
		 * @param {rawData} rawData - chart rawData
		 * @param {string} itemDelimiterCharacter - item delimiter
		 * @param {string} lineDelimiterCharacter - chart rawData
		 * @returns {string} csv text
		 * @private
		 */
		function _makeCsvTextWithRawData ( rawData, itemDelimiterCharacter, lineDelimiterCharacter ){
			var chartData2DArray=_get2DArrayFromRawData(rawData);
			var csvText='';
			var lineDelimiter=lineDelimiterCharacter ? lineDelimiterCharacter : '\u000a';
			var itemDelimiter=itemDelimiterCharacter ? itemDelimiterCharacter : ',';
			var lastRowIndex=chartData2DArray.length-1;
			tui.util.forEachArray(chartData2DArray, function( row, rowIndex ){
				var lastCellIndex=row.length-1;
				tui.util.forEachArray(row, function( cell, cellIndex ){
					var cellContent=typeof cell==='number' ? cell : '"'+cell+'"';
					csvText+=cellContent;
					if( cellIndex < lastCellIndex ){
						csvText+=itemDelimiter;
					}
				});
				if( rowIndex < lastRowIndex ){
					csvText+=lineDelimiter;
				}
			});
			return csvText;
		}
		
		/**
		 * Download content to file with msSaveOrOpenBlob
		 * @param {string} content - file content
		 * @param {string} fileName - file name
		 * @param {string} extension - file extension
		 * @private
		 */
		function _downloadWithMsSaveOrOpenBlob ( content, fileName, extension ){
			var blobObject=new Blob([content]);
			window.navigator.msSaveOrOpenBlob(blobObject, fileName, extension);
		}
		
		/**
		 * Download content to file with anchor element's download attribute
		 * @param {string} content - file content
		 * @param {string} fileName - file name
		 * @param {string} extension - file extension
		 * @private
		 */
		function _downloadWithAnchorElementDownloadAttribute ( content, fileName, extension ){
			var anchorElement=document.createElement('a');
			var data=extension!=='csv' ? window.btoa(unescape(encodeURIComponent(content))) : encodeURIComponent(content);
			var dataUri=DATA_URI_HEADERS[extension]+data;
			anchorElement.href=dataUri;
			anchorElement.target='_blank';
			anchorElement.download=fileName+'.'+extension;
			document.body.appendChild(anchorElement);
			anchorElement.click();
			anchorElement.remove();
		}
		
		/**
		 * Download content to file with given filename and extension
		 * @param {string} content - file content
		 * @param {string} fileName - file name
		 * @param {string} extension - file extension
		 * @private
		 */
		function _download ( content, fileName, extension ){
			var downloadMethod=_getDownloadMethod();
			if( downloadMethod ){
				DOWNLOADER_FUNCTIONS[downloadMethod](content, fileName, extension);
			}
		}
		
		/**
		 * Download chart data with given export type
		 * @param {string} extension - file extension
		 * @param {object} rawData - chart raw data
		 * @param {string} chartTitle - chart title
		 */
		function exportChartData ( extension, rawData, chartTitle ){
			var fileName=chartTitle;
			var content=EXPORT_DATA_MAKERS[extension](rawData);
			_download(content, fileName, extension);
		}
		
		/**
		 * Return boolean value for browser support client side download
		 * @returns {boolean}
		 */
		function isBrowserSupportClientSideDownload (){
			var method=_getDownloadMethod();
			return method!=='none';
		}
		
		module.exports={
			exportChartData:exportChartData,
			isBrowserSupportClientSideDownload:isBrowserSupportClientSideDownload
		};
		/***/
	},
	/* 33 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview  Legend component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var LegendModel=__webpack_require__(34);
		var chartConst=__webpack_require__(2);
		var dom=__webpack_require__(20);
		var predicate=__webpack_require__(5);
		var eventListener=__webpack_require__(31);
		var renderUtil=__webpack_require__(23);
		var arrayUtil=__webpack_require__(6);
		var legendTemplate=__webpack_require__(35);
		var Legend=tui.util.defineClass(/** @lends Legend.prototype */ {
			/**
			 * Legend component.
			 * @constructs Legend
			 * @private
			 * @param {object} params parameters
			 *      @param {object} params.theme - axis theme
			 *      @param {?Array.<string>} params.seriesNames - series names
			 *      @param {string} params.chart - chart type
			 */
			init:function( params ){
				/**
				 * legend theme
				 * @type {Object}
				 */
				this.theme=params.theme;
				/**
				 * options
				 * @type {Object}
				 */
				this.options=params.options || {};
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * series names
				 * @type {?Array.<string>}
				 */
				this.seriesNames=params.seriesNames || [this.chartType];
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=params.eventBus;
				/**
				 * Legend view className
				 */
				this.className='tui-chart-legend-area';
				/**
				 * checked indexes
				 * @type {Array}
				 */
				this.checkedIndexes=[];
				/**
				 * DataProcessor instance
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * legend model
				 */
				this.legendModel=new LegendModel({
					theme:this.theme,
					labels:params.dataProcessor.getLegendLabels(),
					legendData:params.dataProcessor.getLegendData(),
					seriesNames:this.seriesNames,
					chartType:this.chartType
				});
				/**
				 * layout bounds information for this components
				 * @type {null|{dimension:{width:number, height:number}, position:{left:number, top:number}}}
				 */
				this.layout=null;
			},
			/**
			 * Render legend area.
			 * @param {HTMLElement} legendContainer legend container
			 * @private
			 */
			_renderLegendArea:function( legendContainer ){
				legendContainer.innerHTML=this._makeLegendHtml(this.legendModel.getData());
				renderUtil.renderPosition(legendContainer, this.layout.position);
				legendContainer.style.cssText+=';'+renderUtil.makeFontCssText(this.theme.label);
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      layout: {
	     *          dimension: {width: number, height: number},
	     *          position: {left: number, top: number}
	     *      }
	     * }} data - bounds data
			 * @private
			 */
			_setDataForRendering:function( data ){
				if( data ){
					this.layout=data.layout;
				}
			},
			/**
			 * Render legend component.
			 * @param {object} data - bounds data
			 * @returns {HTMLElement} legend element
			 */
			render:function( data ){
				var container=dom.create('DIV', this.className);
				this.legendContainer=container;
				if( predicate.isHorizontalLegend(this.options.align) ){
					dom.addClass(container, 'horizontal');
				}
				this._setDataForRendering(data);
				this._renderLegendArea(container);
				this._attachEvent(container);
				return container;
			},
			/**
			 * Rerender.
			 * @param {object} data - bounds data
			 */
			rerender:function( data ){
				this._setDataForRendering(data);
				this._renderLegendArea(this.legendContainer);
			},
			/**
			 * Rerender, when resizing chart.
			 * @param {object} data - bounds data
			 */
			resize:function( data ){
				this.rerender(data);
			},
			/**
			 * Make cssText of legend rect.
			 * @param {{
	     *      chartType: string,
	     *      theme: {color: string, borderColor: ?string, singleColor: ?string}
	     * }} legendDatum legend datum
			 * @param {number} baseMarginTop base margin-top
			 * @returns {string} cssText of legend rect
			 * @private
			 */
			_makeLegendRectCssText:function( legendDatum, baseMarginTop ){
				var theme=legendDatum.theme,
					borderCssText=theme.borderColor ? renderUtil.concatStr(';border:1px solid ', theme.borderColor) : '',
					rectMargin, marginTop;
				if( legendDatum.chartType==='line' ){
					marginTop=baseMarginTop+chartConst.LINE_MARGIN_TOP;
				}else{
					marginTop=baseMarginTop;
				}
				rectMargin=renderUtil.concatStr(';margin-top:', marginTop, 'px');
				return renderUtil.concatStr('background-color:', theme.singleColor || theme.color, borderCssText, rectMargin);
			},
			/**
			 * Make labels width.
			 * @param {Array.<{chartType: ?string, label: string}>} legendData legend data
			 * @returns {Array.<number>} labels width
			 * @private
			 */
			_makeLabelsWidth:function( legendData ){
				var self=this;
				return tui.util.map(legendData, function( item ){
					var labelWidth=renderUtil.getRenderedLabelWidth(item.label, self.theme.label);
					return labelWidth+chartConst.LEGEND_AREA_PADDING;
				});
			},
			/**
			 * Make legend html.
			 * @param {Array.<{chartType: ?string, label: string}>} legendData legend data
			 * @returns {string} legend html
			 * @private
			 */
			_makeLegendHtml:function( legendData ){
				var self=this;
				var template=legendTemplate.tplLegend;
				var checkBoxTemplate=legendTemplate.tplCheckbox;
				var labelsWidth=this._makeLabelsWidth(legendData);
				var labelHeight=renderUtil.getRenderedLabelHeight(legendData[0].label, legendData[0].theme);
				var isHorizontalLegend=predicate.isHorizontalLegend(this.options.align);
				var height=labelHeight+(chartConst.LABEL_PADDING_TOP*2);
				var baseMarginTop=parseInt((height-chartConst.LEGEND_RECT_WIDTH)/2, 10)-1;
				var html=tui.util.map(legendData, function( legendDatum, index ){
					var rectCssText=self._makeLegendRectCssText(legendDatum, baseMarginTop);
					var checkbox=self.options.showCheckbox===false ? '' : checkBoxTemplate({
						index:index,
						checked:self.legendModel.isCheckedIndex(index) ? ' checked' : ''
					});
					var data={
						rectCssText:rectCssText,
						height:height,
						labelHeight:labelHeight,
						unselected:self.legendModel.isUnselectedIndex(index) ? ' unselected' : '',
						labelWidth:isHorizontalLegend ? ';width:'+labelsWidth[index]+'px' : '',
						iconType:legendDatum.chartType || 'rect',
						label:legendDatum.label,
						checkbox:checkbox,
						index:index
					};
					return template(data);
				}).join('');
				return html;
			},
			/**
			 * Find legend element.
			 * @param {HTMLElement} elTarget target element
			 * @returns {HTMLElement} legend element
			 * @private
			 */
			_findLegendLabelElement:function( elTarget ){
				var legendContainer;
				if( dom.hasClass(elTarget, chartConst.CLASS_NAME_LEGEND_LABEL) ){
					legendContainer=elTarget;
				}else{
					legendContainer=dom.findParentByClass(elTarget, chartConst.CLASS_NAME_LEGEND_LABEL);
				}
				return legendContainer;
			},
			/**
			 * Fire onChangeCheckedLegends event.
			 * @private
			 */
			_fireChangeCheckedLegendsEvent:function(){
				this.eventBus.fire('changeCheckedLegends', this.legendModel.getCheckedIndexes());
			},
			/**
			 * Fire selectLegend event.
			 * @param {{chartType: string, index: number}} data data
			 * @private
			 */
			_fireSelectLegendEvent:function( data ){
				var index=this.legendModel.getSelectedIndex();
				var legendIndex=!tui.util.isNull(index) ? data.seriesIndex : index;
				this.eventBus.fire('selectLegend', data.chartType, legendIndex);
			},
			/**
			 * Fire selectLegend public event.
			 * @param {{label: string, chartType: string, index: number}} data data
			 * @private
			 */
			_fireSelectLegendPublicEvent:function( data ){
				this.eventBus.fire(chartConst.PUBLIC_EVENT_PREFIX+'selectLegend', {
					legend:data.label,
					chartType:data.chartType,
					index:data.index
				});
			},
			/**
			 * Select legend.
			 * @param {number} index index
			 * @private
			 */
			_selectLegend:function( index ){
				var data=this.legendModel.getDatum(index);
				this.legendModel.toggleSelectedIndex(index);
				if( !tui.util.isNull(this.legendModel.getSelectedIndex()) && !this.legendModel.isCheckedSelectedIndex() ){
					this.legendModel.checkSelectedIndex();
					this._fireChangeCheckedLegendsEvent();
				}
				this._renderLegendArea(this.legendContainer);
				this._fireSelectLegendEvent(data);
				this._fireSelectLegendPublicEvent(data);
			},
			/**
			 * Get checked indexes.
			 * @returns {Array} checked indexes
			 * @private
			 */
			_getCheckedIndexes:function(){
				var checkedIndexes=[];
				tui.util.forEachArray(this.legendContainer.getElementsByTagName('input'), function( checkbox, index ){
					if( checkbox.checked ){
						checkedIndexes.push(index);
					}
				});
				return checkedIndexes;
			},
			/**
			 * Check legend.
			 * @private
			 */
			_checkLegend:function(){
				var checkedIndexes=this._getCheckedIndexes();
				var checkedCount=checkedIndexes.length;
				var seriesDataModelMap=this.dataProcessor.seriesDataModelMap;
				var isPieCharts=arrayUtil.all(this.seriesNames, function( seriesName ){
					var seriesDataModel=seriesDataModelMap[seriesName];
					return seriesDataModel && predicate.isPieChart(seriesDataModel.chartType);
				});
				var data;
				if( (isPieCharts && checkedCount===1) || checkedCount===0 ){
					this._renderLegendArea(this.legendContainer);
				}else{
					this.legendModel.updateCheckedLegendsWith(checkedIndexes);
					data=this.legendModel.getSelectedDatum();
					if( !this.legendModel.isCheckedSelectedIndex() ){
						this.legendModel.updateSelectedIndex(null);
					}
					this._renderLegendArea(this.legendContainer);
					this._fireChangeCheckedLegendsEvent();
					if( data ){
						this._fireSelectLegendEvent(data);
					}
				}
			},
			/**
			 * On click event handler.
			 * @param {MouseEvent} e mouse event
			 * @private
			 */
			_onClick:function( e ){
				var elTarget=e.target || e.srcElement,
					legendContainer, index;
				if( dom.hasClass(elTarget, chartConst.CLASS_NAME_LEGEND_CHECKBOX) ){
					this._checkLegend();
					return;
				}
				legendContainer=this._findLegendLabelElement(elTarget);
				if( !legendContainer ){
					return;
				}
				index=parseInt(legendContainer.getAttribute('data-index'), 10);
				this._selectLegend(index);
			},
			/**
			 * Attach browser event.
			 * @param {HTMLElement} target target element
			 * @private
			 */
			_attachEvent:function( target ){
				eventListener.on(target, 'click', this._onClick, this);
			}
		});
		tui.util.CustomEvents.mixin(Legend);
		module.exports=Legend;
		/***/
	},
	/* 34 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview LegendModel is legend model.
		 * 각 범례 힝목의 체크와 선택 여부를 관리하는 모델
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var concat=Array.prototype.concat;
		var LegendModel=tui.util.defineClass(/** @lends LegendModel.prototype */ {
			/**
			 * LegendModel is legend model.
			 * @constructs LegendModel
			 * @private
			 * @param {object} params parameters
			 *      @param {number} params.labels legend labels
			 *      @param {object} params.bound axis bound
			 *      @param {object} params.theme axis theme
			 */
			init:function( params ){
				/**
				 * legend theme
				 * @type {Object}
				 */
				this.theme=params.theme;
				/**
				 * legend labels
				 * @type {Array.<string> | {column: ?Array.<string>, line: ?Array.<string>}}
				 */
				this.labels=params.labels;
				/**
				 * label infos
				 * @type {Array.<{chartType: string, label: string, index: number}>}
				 */
				this.legendData=params.legendData;
				/**
				 * chart types
				 * @type {?Array.<string>}
				 */
				this.seriesNames=params.seriesNames || [];
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * Legend data
				 * @type {?Array}
				 */
				this.data=null;
				/**
				 * Selected legend index.
				 * @type {?number}
				 */
				this.selectedIndex=null;
				/**
				 * sending data to series
				 * @type {object}
				 */
				this.checkedIndexesMap={};
				/**
				 * checked indexes
				 * @type {Array}
				 */
				this.checkedWholeIndexes=[];
				this._setData();
				this._initCheckedIndexes();
			},
			/**
			 * Initialize checked data.
			 * @private
			 */
			_initCheckedIndexes:function(){
				var self=this;
				var checkedIndexes=[];
				tui.util.forEachArray(this.legendData, function( legendDatum, index ){
					if( legendDatum.visible ){
						checkedIndexes.push(index);
					}
					self.checkedWholeIndexes[index]=legendDatum.visible;
				});
				this.updateCheckedLegendsWith(checkedIndexes);
			},
			/**
			 * Set theme to legend data.
			 * @param {Array.<object>} legendData - legend data
			 * @param {{
	     *     colors: Array.<string>,
	     *     singleColors: ?string,
	     *     borderColor: ?string
	     *     }} colorTheme - legend theme
			 * @param {Array.<boolean>} [checkedIndexes] - checked indexes
			 * @private
			 */
			_setThemeToLegendData:function( legendData, colorTheme, checkedIndexes ){
				var seriesIndex=0;
				tui.util.forEachArray(legendData, function( datum, index ){
					var itemTheme={
						color:colorTheme.colors[index]
					};
					if( colorTheme.singleColors && colorTheme.singleColors.length ){
						itemTheme.singleColor=colorTheme.singleColors[index];
					}
					if( colorTheme.borderColor ){
						itemTheme.borderColor=colorTheme.borderColor;
					}
					datum.theme=itemTheme;
					datum.index=index;
					if( !checkedIndexes || !tui.util.isUndefined(checkedIndexes[index]) ){
						datum.seriesIndex=seriesIndex;
						seriesIndex+=1;
					}else{
						datum.seriesIndex= -1;
					}
				});
			},
			/**
			 * Set legend data.
			 * @private
			 */
			_setData:function(){
				var self=this;
				var theme=this.theme;
				var chartType=this.chartType;
				var seriesNames=this.seriesNames;
				var legendData=this.legendData;
				var checkedIndexesMap=this.checkedIndexesMap;
				var data, startIndex;
				if( !seriesNames || seriesNames.length < 2 ){
					this._setThemeToLegendData(legendData, theme[chartType], checkedIndexesMap[chartType]);
					data=legendData;
				}else{
					startIndex=0;
					data=concat.apply([], tui.util.map(seriesNames, function( seriesName ){
						var labelLen=self.labels[seriesName].length;
						var endIndex=startIndex+labelLen;
						var slicedLegendData, checkedIndexes;
						slicedLegendData=legendData.slice(startIndex, endIndex);
						checkedIndexes=checkedIndexesMap[seriesName];
						startIndex=endIndex;
						self._setThemeToLegendData(slicedLegendData, theme[seriesName], checkedIndexes);
						return slicedLegendData;
					}));
				}
				this.data=data;
			},
			/**
			 * Get legend data.
			 * @returns {Array.<{chartType: string, label: string, theme: object}>} legend data
			 */
			getData:function(){
				return this.data;
			},
			/**
			 * Get legend datum by index.
			 * @param {number} index legend index
			 * @returns {{chartType: string, label: string, theme: object}} legend datum
			 */
			getDatum:function( index ){
				return this.data[index];
			},
			/**
			 * Get selected datum.
			 * @returns {{chartType: string, label: string, theme: Object}} legend datum
			 */
			getSelectedDatum:function(){
				return this.getDatum(this.selectedIndex);
			},
			/**
			 * Update selected index.
			 * @param {?number} value value
			 */
			updateSelectedIndex:function( value ){
				this.selectedIndex=value;
			},
			/**
			 * Toggle selected index.
			 * @param {number} index legend index
			 */
			toggleSelectedIndex:function( index ){
				var selectedIndex;
				if( this.selectedIndex===index ){
					selectedIndex=null;
				}else{
					selectedIndex=index;
				}
				this.updateSelectedIndex(selectedIndex);
			},
			/**
			 * Get selected index.
			 * @returns {number} selected index
			 */
			getSelectedIndex:function(){
				return this.selectedIndex;
			},
			/**
			 * Whether unselected index or not.
			 * @param {number} index legend index
			 * @returns {boolean} true if selected
			 */
			isUnselectedIndex:function( index ){
				return !tui.util.isNull(this.selectedIndex) && (this.selectedIndex!==index);
			},
			/**
			 * Whether checked selected index or not.
			 * @returns {boolean} true if checked
			 */
			isCheckedSelectedIndex:function(){
				return this.isCheckedIndex(this.selectedIndex);
			},
			/**
			 * Update checked index.
			 * @param {number} index legend index
			 * @private
			 */
			_updateCheckedIndex:function( index ){
				this.checkedWholeIndexes[index]=true;
			},
			/**
			 * Whether checked index.
			 * @param {number} index legend index
			 * @returns {boolean} true if checked
			 */
			isCheckedIndex:function( index ){
				return !!this.checkedWholeIndexes[index];
			},
			/**
			 * Add sending datum.
			 * @param {number} index legend index
			 */
			_addSendingDatum:function( index ){
				var legendDatum=this.getDatum(index);
				if( !this.checkedIndexesMap[legendDatum.chartType] ){
					this.checkedIndexesMap[legendDatum.chartType]=[];
				}
				this.checkedIndexesMap[legendDatum.chartType][legendDatum.index]=true;
			},
			/**
			 * Check selected index;
			 */
			checkSelectedIndex:function(){
				this._updateCheckedIndex(this.selectedIndex);
				this._addSendingDatum(this.selectedIndex);
				this._setData();
			},
			/**
			 * Get checked indexes.
			 * @returns {object} object data that whether series has checked or not
			 */
			getCheckedIndexes:function(){
				return this.checkedIndexesMap;
			},
			/**
			 * Reset checked data.
			 * @private
			 */
			_resetCheckedData:function(){
				this.checkedWholeIndexes=[];
				this.checkedIndexesMap={};
			},
			/**
			 * Update checked legend's indexes
			 * @param {Array.<number>} indexes indexes
			 */
			updateCheckedLegendsWith:function( indexes ){
				var self=this;
				this._resetCheckedData();
				tui.util.forEachArray(indexes, function( index ){
					self._updateCheckedIndex(index);
					self._addSendingDatum(index);
				});
				this._setData();
			}
		});
		module.exports=LegendModel;
		/***/
	},
	/* 35 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview This is templates of legend view.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var templateMaker=__webpack_require__(25);
		var htmls={
			HTML_CHECKBOX:'<div class="tui-chart-legend-checkbox-area"><input class="tui-chart-legend-checkbox"'+
			' type="checkbox" value="{{ index }}"{{ checked }} /></div>',
			HTML_LEGEND:'<div class="tui-chart-legend{{ unselected }}" style="height:{{ height }}px">'+
			'{{ checkbox }}<div class="tui-chart-legend-rect {{ iconType }}" style="{{ rectCssText }}"></div>'+
			'<div class="tui-chart-legend-label" style="height:{{ labelHeight }}px{{ labelWidth }}"'+
			' data-index="{{ index }}">{{ label }}</div></div>',
			HTML_TICK:'<div class="tui-chart-map-legend-tick" style="{{ position }}"></div>'+
			'<div class="tui-chart-map-legend-tick-label" style="{{ labelPosition }}">{{ label }}</div>',
			HTML_CIRCLE_LEGEND_LABEL:'<div class="tui-chart-circle-legend-label"'+
			' style="left: {{ left }}px;top: {{ top }}px">{{ label }}</div>'
		};
		module.exports={
			tplCheckbox:templateMaker.template(htmls.HTML_CHECKBOX),
			tplLegend:templateMaker.template(htmls.HTML_LEGEND),
			tplTick:templateMaker.template(htmls.HTML_TICK),
			tplCircleLegendLabel:templateMaker.template(htmls.HTML_CIRCLE_LEGEND_LABEL)
		};
		/***/
	},
	/* 36 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview  Spectrum Legend component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var dom=__webpack_require__(20);
		var renderUtil=__webpack_require__(23);
		var pluginFactory=__webpack_require__(7);
		var legendTemplate=__webpack_require__(35);
		var SpectrumLegend=tui.util.defineClass(/** @lends SpectrumLegend.prototype */ {
			/**
			 * Spectrum Legend component.
			 * @constructs SpectrumLegend
			 * @private
			 * @param {object} params parameters
			 *      @param {object} params.theme axis theme
			 *      @param {?Array.<string>} params.options legend options
			 *      @param {MapChartDataProcessor} params.dataProcessor data processor
			 */
			init:function( params ){
				var libType=params.libType || chartConst.DEFAULT_PLUGIN;
				/**
				 * class name.
				 * @type {string}
				 */
				this.className='tui-chart-legend-area';
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * legend theme
				 * @type {Object}
				 */
				this.theme=params.theme;
				/**
				 * options
				 * @type {object}
				 */
				this.options=params.options || {};
				/**
				 * data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * color spectrum
				 * @type {ColorSpectrum}
				 */
				this.colorSpectrum=params.colorSpectrum;
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=params.eventBus;
				/**
				 * Graph renderer
				 * @type {object}
				 */
				this.graphRenderer=pluginFactory.get(libType, 'mapLegend');
				/**
				 * Whether horizontal legend or not.
				 * @type {boolean}
				 */
				this.isHorizontal=predicate.isHorizontalLegend(this.options.align);
				/**
				 * scale data for legend
				 * @type {null|object}
				 */
				this.scaleData=null;
				this._attachToEventBus();
			},
			/**
			 * Attach to event bus.
			 * @private
			 */
			_attachToEventBus:function(){
				this.eventBus.on({
					showWedge:this.onShowWedge,
					hideTooltip:this.onHideWedge
				}, this);
			},
			/**
			 * Make base data to make tick html.
			 * @returns {{startPositionValue: number, step: number, positionType: string, labelSize: ?number}} base data
			 * @private
			 */
			_makeBaseDataToMakeTickHtml:function(){
				var dimension=this.layout.dimension;
				var scaleData=this.scaleData;
				var stepCount=scaleData.stepCount || scaleData.tickCount-1;
				var baseData={};
				var firstLabel;
				if( this.isHorizontal ){
					baseData.startPositionValue=5;
					baseData.step=dimension.width/stepCount;
					baseData.positionType='left:';
				}else{
					baseData.startPositionValue=0;
					baseData.step=dimension.height/stepCount;
					baseData.positionType='top:';
					firstLabel=scaleData.labels[0];
					baseData.labelSize=parseInt(renderUtil.getRenderedLabelHeight(firstLabel, this.theme.label)/2, 10)-1;
				}
				return baseData;
			},
			/**
			 * Make tick html.
			 * @returns {string} tick html.
			 * @private
			 */
			_makeTickHtml:function(){
				var self=this;
				var baseData=this._makeBaseDataToMakeTickHtml();
				var positionValue=baseData.startPositionValue;
				var htmls;
				htmls=tui.util.map(this.scaleData.labels, function( label ){
					var labelSize, html;
					if( self.isHorizontal ){
						labelSize=parseInt(renderUtil.getRenderedLabelWidth(label, self.theme.label)/2, 10);
					}else{
						labelSize=baseData.labelSize;
					}
					html=legendTemplate.tplTick({
						position:baseData.positionType+positionValue+'px',
						labelPosition:baseData.positionType+(positionValue-labelSize)+'px',
						label:label
					});
					positionValue+=baseData.step;
					return html;
				});
				return htmls.join('');
			},
			/**
			 * Render tick area.
			 * @returns {HTMLElement} tick countainer
			 * @private
			 */
			_renderTickArea:function(){
				var tickContainer=dom.create('div', 'tui-chart-legend-tick-area');
				tickContainer.innerHTML=this._makeTickHtml();
				if( this.isHorizontal ){
					dom.addClass(tickContainer, 'horizontal');
				}
				return tickContainer;
			},
			/**
			 * Make graph dimension of vertical legend
			 * @returns {{width: number, height: number}} dimension
			 * @private
			 */
			_makeVerticalGraphDimension:function(){
				return {
					width:chartConst.MAP_LEGEND_GRAPH_SIZE,
					height:this.layout.dimension.height
				};
			},
			/**
			 * Make graph dimension of horizontal legend
			 * @returns {{width: number, height: number}} dimension
			 * @private
			 */
			_makeHorizontalGraphDimension:function(){
				return {
					width:this.layout.dimension.width+10,
					height:chartConst.MAP_LEGEND_GRAPH_SIZE
				};
			},
			/**
			 * Render graph.
			 * @param {HTMLElement} container container element
			 * @private
			 */
			_renderGraph:function( container ){
				var dimension;
				if( this.isHorizontal ){
					dimension=this._makeHorizontalGraphDimension();
				}else{
					dimension=this._makeVerticalGraphDimension();
				}
				this.graphRenderer.render(container, dimension, this.colorSpectrum, this.isHorizontal);
			},
			/**
			 * Render legend area.
			 * @param {HTMLElement} container legend container
			 * @private
			 */
			_renderLegendArea:function( container ){
				var tickContainer;
				container.innerHTML='';
				renderUtil.renderPosition(container, this.layout.position);
				this._renderGraph(container);
				tickContainer=this._renderTickArea();
				container.appendChild(tickContainer);
				container.style.cssText+=';'+renderUtil.makeFontCssText(this.theme.label);
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      layout: object,
	     *      legendScaleData: object
	     * }} data - scale data
			 * @private
			 */
			_setDataForRendering:function( data ){
				this.layout=data.layout;
				this.scaleData=data.legendScaleData;
			},
			/**
			 * Render legend component.
			 * @param {object} data - scale data
			 * @returns {HTMLElement} legend element
			 */
			render:function( data ){
				var container=dom.create('DIV', this.className);
				this.legendContainer=container;
				this._setDataForRendering(data);
				this._renderLegendArea(container);
				return container;
			},
			/**
			 * Resize legend component.
			 * @param {object} data - scale data
			 */
			resize:function( data ){
				this._setDataForRendering(data);
				this._renderLegendArea(this.legendContainer);
			},
			/**
			 * On show wedge.
			 * @param {number} ratio ratio
			 */
			onShowWedge:function( ratio ){
				this.graphRenderer.showWedge(chartConst.MAP_LEGEND_SIZE*ratio);
			},
			/**
			 * On hide wedge.
			 */
			onHideWedge:function(){
				this.graphRenderer.hideWedge();
			}
		});
		module.exports=SpectrumLegend;
		/***/
	},
	/* 37 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview  Circle legend component render a legend in the form of overlapping circles
		 *                  by representative radius values.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var dom=__webpack_require__(20);
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var pluginFactory=__webpack_require__(7);
		var legendTemplate=__webpack_require__(35);
		var CircleLegend=tui.util.defineClass(/** @lends CircleLegend.prototype */ {
			/**
			 * css className of circle legend
			 * @type {string}
			 */
			className:'tui-chart-circle-legend-area',
			/**
			 * ratios for rendering circle
			 * @type {Array.<number>}
			 */
			circleRatios:[1, 0.5, 0.25],
			/**
			 * Circle legend component render a legend in the form of overlapping circles by representative radius values.
			 * @constructs CircleLegend
			 * @private
			 * @param {object} params parameters
			 *      @param {?string} params.libType - library type for graph rendering
			 *      @param {string} params.chartType - chart type
			 *      @param {DataProcessor} params.dataProcessor - DataProcessor
			 *      @param {string} params.baseFontFamily - base fontFamily of chart
			 */
			init:function( params ){
				var libType=params.libType || chartConst.DEFAULT_PLUGIN;
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * theme for label of circle legend area
				 * @type {{fontSize: number, fontFamily: *}}
				 */
				this.labelTheme={
					fontSize:chartConst.CIRCLE_LEGEND_LABEL_FONT_SIZE,
					fontFamily:params.baseFontFamily
				};
				/**
				 * Graph renderer
				 * @type {object}
				 */
				this.graphRenderer=pluginFactory.get(libType, 'circleLegend');
				/**
				 * layout bounds information for this components
				 * @type {null|{dimension:{width:number, height:number}, position:{left:number, top:number}}}
				 */
				this.layout=null;
				/**
				 * max radius for rendering circle legend
				 * @type {null|number}
				 */
				this.maxRadius=null;
			},
			/**
			 * Format label.
			 * @param {number} label - label
			 * @param {number} decimalLength - decimal length
			 * @returns {string}
			 * @private
			 */
			_formatLabel:function( label, decimalLength ){
				var formatFunctions=this.dataProcessor.getFormatFunctions();
				if( decimalLength===0 ){
					label=String(parseInt(label, 10));
				}else{
					label=String(label);
					label=renderUtil.formatToDecimal(label, decimalLength);
				}
				return renderUtil.formatValue(label, formatFunctions, this.chartType, 'circleLegend', 'r');
			},
			/**
			 * Make label html.
			 * @returns {string}
			 * @private
			 */
			_makeLabelHtml:function(){
				var self=this;
				var dimension=this.layout.dimension;
				var halfWidth=dimension.width/2;
				var maxRadius=this.maxRadius;
				var maxValueRadius=this.dataProcessor.getMaxValue(this.chartType, 'r');
				var decimalLength=calculator.getDecimalLength(maxValueRadius);
				var labelHeight=renderUtil.getRenderedLabelHeight(maxValueRadius, this.labelTheme);
				return tui.util.map(this.circleRatios, function( ratio ){
					var diameter=maxRadius*ratio*2;
					var label=self._formatLabel(maxValueRadius*ratio, decimalLength);
					var labelWidth=renderUtil.getRenderedLabelWidth(label, self.labelTheme);
					return legendTemplate.tplCircleLegendLabel({
						left:halfWidth-(labelWidth/2),
						top:dimension.height-diameter-labelHeight,
						label:label
					});
				}).join('');
			},
			/**
			 * Render label area.
			 * @private
			 */
			_renderLabelArea:function(){
				var labelContainer=dom.create('DIV', 'tui-chart-circle-legend-label-area');
				labelContainer.innerHTML=this._makeLabelHtml();
				this.container.appendChild(labelContainer);
			},
			/**
			 * Render for circle legend area.
			 * @private
			 */
			_render:function(){
				var circleContainer=dom.create('DIV', 'tui-chart-circle-area');
				this.container.appendChild(circleContainer);
				this.graphRenderer.render(circleContainer, this.layout.dimension, this.maxRadius, this.circleRatios);
				this._renderLabelArea();
				renderUtil.renderPosition(this.container, this.layout.position);
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      layout: {
	     *          dimension: {width: number, height: number},
	     *          position: {left: number, top: number}
	     *      },
	     *      maxRadius: number
	     * }} data - bounds data
			 * @private
			 */
			_setDataForRendering:function( data ){
				this.layout=data.layout;
				this.maxRadius=data.maxRadius;
			},
			/**
			 * Render.
			 * @param {object} data - bounds data
			 * @returns {HTMLElement}
			 */
			render:function( data ){
				var container=dom.create('DIV', this.className);
				this.container=container;
				this._setDataForRendering(data);
				this._render(data);
				return container;
			},
			/**
			 * Rerender.
			 * @param {object} data - bounds data
			 */
			rerender:function( data ){
				this.container.innerHTML='';
				this._setDataForRendering(data);
				this._render();
			},
			/**
			 * Resize.
			 * @param {object} data - bounds data
			 */
			resize:function( data ){
				this.rerender(data);
			}
		});
		module.exports=CircleLegend;
		/***/
	},
	/* 38 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Tooltip component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var TooltipBase=__webpack_require__(39);
		var singleTooltipMixer=__webpack_require__(40);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		var tooltipTemplate=__webpack_require__(41);
		/**
		 * @classdesc Tooltip component.
		 * @class Tooltip
		 * @private
		 */
		var Tooltip=tui.util.defineClass(TooltipBase, /** @lends Tooltip.prototype */ {
			/**
			 * Tooltip component.
			 * @constructs Tooltip
			 * @private
			 * @override
			 */
			init:function(){
				TooltipBase.apply(this, arguments);
			},
			/**
			 * Make tooltip html.
			 * @param {string} category category
			 * @param {{value: string, legend: string, chartType: string, suffix: ?string}} item item data
			 * @returns {string} tooltip html
			 * @private
			 */
			_makeTooltipHtml:function( category, item ){
				var isPieOrPieDonutComboChart=predicate.isPieChart(this.chartType)
					|| predicate.isPieDonutComboChart(this.chartType, this.chartTypes);
				var template;
				if( isPieOrPieDonutComboChart ){
					template=tooltipTemplate.tplPieChart;
				}else if( this.dataProcessor.coordinateType ){
					template=tooltipTemplate.tplCoordinatetypeChart;
				}else{
					template=tooltipTemplate.tplDefault;
				}
				return template(tui.util.extend({
					categoryVisible:category ? 'show' : 'hide',
					category:category
				}, item));
			},
			/**
			 * Make html for value types like x, y, r
			 * @param {{x: ?number, y: ?number, r: ?number}} data - data
			 * @param {Array.<string>} valueTypes - types of value
			 * @returns {string}
			 * @private
			 */
			_makeHtmlForValueTypes:function( data, valueTypes ){
				return tui.util.map(valueTypes, function( type ){
					return (data[type]) ? '<div>'+type+': '+data[type]+'</div>' : '';
				}).join('');
			},
			/**
			 * Make single tooltip html.
			 * @param {string} chartType chart type
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 * @returns {string} tooltip html
			 * @private
			 */
			_makeSingleTooltipHtml:function( chartType, indexes ){
				var data=tui.util.pick(this.data, chartType, indexes.groupIndex, indexes.index);
				data=tui.util.extend({
					suffix:this.suffix
				}, data);
				data.valueTypes=this._makeHtmlForValueTypes(data, ['x', 'y', 'r']);
				return this.templateFunc(data.category, data);
			},
			/**
			 * Set default align option of tooltip.
			 * @private
			 * @override
			 */
			_setDefaultTooltipPositionOption:function(){
				if( this.options.align ){
					return;
				}
				if( this.isVertical ){
					this.options.align=chartConst.TOOLTIP_DEFAULT_ALIGN_OPTION;
				}else{
					this.options.align=chartConst.TOOLTIP_DEFAULT_HORIZONTAL_ALIGN_OPTION;
				}
			},
			/**
			 * Make parameters for show tooltip user event.
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 * @param {object} additionParams addition parameters
			 * @returns {{chartType: string, legend: string, legendIndex: number, index: number}} parameters for show tooltip
			 * @private
			 */
			_makeShowTooltipParams:function( indexes, additionParams ){
				var legendIndex=indexes.index;
				var legendData=this.dataProcessor.getLegendItem(legendIndex);
				var params;
				if( !legendData ){
					return null;
				}
				params=tui.util.extend({
					chartType:legendData.chartType,
					legend:legendData.label,
					legendIndex:legendIndex,
					index:indexes.groupIndex
				}, additionParams);
				return params;
			},
			/**
			 * Make tooltip datum.
			 * @param {string} legendLabel - legend label
			 * @param {string} category - category
			 * @param {SeriesItem} seriesItem - SeriesItem
			 * @returns {Object}
			 * @private
			 */
			_makeTooltipDatum:function( legendLabel, category, seriesItem ){
				var labelPrefix=(legendLabel && seriesItem.label) ? ':&nbsp;' : '';
				var tooltipLabel=seriesItem.tooltipLabel;
				var labelFormatter=this.tooltipOptions && this.tooltipOptions.labelFormatter;
				var tooltipDatum={
					legend:(legendLabel || '')
				};
				tooltipDatum.label=tooltipLabel || (seriesItem.label ? labelPrefix+seriesItem.label : '');
				if( labelFormatter ){
					tooltipDatum=labelFormatter(seriesItem, tooltipDatum, labelPrefix);
				}
				if( category && predicate.isDatetimeType(this.xAxisType) ){
					category=renderUtil.formatDate(category, this.dateFormat);
				}
				tooltipDatum.category=category || '';
				return tui.util.extend(tooltipDatum, seriesItem.pickValueMapForTooltip());
			},
			/**
			 * Make tooltip data.
			 * @returns {Array.<object>} tooltip data
			 * @override
			 */
			_makeTooltipData:function(){
				var self=this;
				var orgLegendLabels=this.dataProcessor.getLegendLabels();
				var isPivot=predicate.isTreemapChart(this.chartType);
				var legendLabels={};
				var tooltipData={};
				if( tui.util.isArray(orgLegendLabels) ){
					legendLabels[this.chartType]=orgLegendLabels;
				}else{
					legendLabels=orgLegendLabels;
				}
				this.dataProcessor.eachBySeriesGroup(function( seriesGroup, groupIndex, chartType ){
					var data;
					chartType=chartType || self.chartType;
					data=seriesGroup.map(function( seriesItem, index ){
						var category=self.dataProcessor.makeTooltipCategory(groupIndex, index, self.isVertical);
						return seriesItem ? self._makeTooltipDatum(legendLabels[chartType][index], category, seriesItem) : null;
					});
					if( !tooltipData[chartType] ){
						tooltipData[chartType]=[];
					}
					tooltipData[chartType].push(data);
				}, isPivot);
				return tooltipData;
			}
		});
		singleTooltipMixer.mixin(Tooltip);
		module.exports=Tooltip;
		/***/
	},
	/* 39 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview TooltipBase is base class of tooltip components.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2),
			dom=__webpack_require__(20),
			predicate=__webpack_require__(5),
			renderUtil=__webpack_require__(23);
		var TooltipBase=tui.util.defineClass(/** @lends TooltipBase.prototype */ {
			/**
			 * TooltipBase is base class of tooltip components.
			 * @constructs TooltipBase
			 * @private
			 * @param {object} params - parameters
			 *      @param {string} params.chartType - chart type
			 *      @param {Array.<string>} params.chartTypes - chart types
			 *      @param {DataProcessor} params.dataProcessor - DataProcessor instance
			 *      @param {object} params.options - tooltip options
			 *      @param {object} params.theme - tooltip theme
			 *      @param {boolean} params.isVertical - whether vertical or not
			 *      @param {object} params.eventBus - tui.util.CustomEvents instance
			 *      @param {object} params.labelTheme - theme for label
			 *      @param {string} params.xAxisType - xAxis type
			 *      @param {string} params.dateFormat - date format
			 *      @param {object} params.tooltipOptions - label formatter function
			 */
			init:function( params ){
				var isPieChart=predicate.isPieChart(params.chartType);
				/**
				 * Chart type
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * Chart types
				 * @type {Array.<string>}
				 */
				this.chartTypes=params.chartTypes;
				/**
				 * Data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * Options
				 * @type {object}
				 */
				this.options=params.options;
				/**
				 * Theme
				 * @type {object}
				 */
				this.theme=params.theme;
				/**
				 * whether vertical or not
				 * @type {boolean}
				 */
				this.isVertical=params.isVertical;
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=params.eventBus;
				/**
				 * label theme
				 * @type {object}
				 */
				this.labelTheme=params.labelTheme;
				/**
				 * x axis type
				 * @type {?string}
				 */
				this.xAxisType=params.xAxisType;
				/**
				 * dateFormat option for xAxis
				 * @type {?string}
				 */
				this.dateFormat=params.dateFormat;
				/**
				 * tooltip options for each chart
				 * @type {?function}
				 */
				this.tooltipOptions=params.tooltipOptions;
				/**
				 * className
				 * @type {string}
				 */
				this.className='tui-chart-tooltip-area';
				/**
				 * Tooltip container.
				 * @type {HTMLElement}
				 */
				this.tooltipContainer=null;
				/**
				 * Tooltip suffix.
				 * @type {string}
				 */
				this.suffix=this.options.suffix ? '&nbsp;'+this.options.suffix : '';
				/**
				 * Tooltip template function.
				 * @type {function}
				 */
				this.templateFunc=this.options.template || tui.util.bind(this._makeTooltipHtml, this);
				/**
				 * Tooltip animation time.
				 * @type {number}
				 */
				this.animationTime=isPieChart ? chartConst.TOOLTIP_PIE_ANIMATION_TIME : chartConst.TOOLTIP_ANIMATION_TIME;
				/**
				 * TooltipBase base data.
				 * @type {Array.<Array.<object>>}
				 */
				this.data=[];
				/**
				 * layout bounds information for this components
				 * @type {null|{dimension:{width:number, height:number}, position:{left:number, top:number}}}
				 */
				this.layout=null;
				/**
				 * dimension map for layout of chart
				 * @type {null|object}
				 */
				this.dimensionMap=null;
				this._setDefaultTooltipPositionOption();
				this._saveOriginalPositionOptions();
				this._attachToEventBus();
			},
			/**
			 * Attach to event bus.
			 * @private
			 */
			_attachToEventBus:function(){
				this.eventBus.on({
					showTooltip:this.onShowTooltip,
					hideTooltip:this.onHideTooltip
				}, this);
				if( this.onShowTooltipContainer ){
					this.eventBus.on({
						showTooltipContainer:this.onShowTooltipContainer,
						hideTooltipContainer:this.onHideTooltipContainer
					}, this);
				}
			},
			/**
			 * Make tooltip html.
			 * @private
			 * @abstract
			 */
			_makeTooltipHtml:function(){
			},
			/**
			 * Set default align option of tooltip.
			 * @private
			 * @abstract
			 */
			_setDefaultTooltipPositionOption:function(){
			},
			/**
			 * Save position options.
			 * @private
			 */
			_saveOriginalPositionOptions:function(){
				this.orgPositionOptions={
					align:this.options.align,
					offset:this.options.offset
				};
			},
			/**
			 * Make tooltip data.
			 * @private
			 * @abstract
			 */
			_makeTooltipData:function(){
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      layout: {
	     *          dimension: {width: number, height: number},
	     *          position: {left: number, top: number}
	     *      },
	     *      dimensionMap: object
	     * }} data - bounds data
			 * @private
			 */
			_setDataForRendering:function( data ){
				this.layout=data.layout;
				this.dimensionMap=data.dimensionMap;
			},
			/**
			 * Render tooltip component.
			 * @param {object} data - bounds data
			 * @returns {HTMLElement} tooltip element
			 */
			render:function( data ){
				var el=dom.create('DIV', this.className);
				this._setDataForRendering(data);
				this.data=this._makeTooltipData();
				renderUtil.renderPosition(el, this.layout.position);
				this.tooltipContainer=el;
				return el;
			},
			/**
			 * Rerender.
			 * @param {object} data - bounds data
			 */
			rerender:function( data ){
				this.resize(data);
				this.data=this._makeTooltipData();
			},
			/**
			 * Resize tooltip component.
			 * @param {object} data - bounds data
			 * @override
			 */
			resize:function( data ){
				this._setDataForRendering(data);
				renderUtil.renderPosition(this.tooltipContainer, this.layout.position);
				if( this.positionModel ){
					this.positionModel.updateBound(this.layout);
				}
			},
			/**
			 * Zoom.
			 */
			zoom:function(){
				this.data=this._makeTooltipData();
			},
			/**
			 * Get tooltip element.
			 * @returns {HTMLElement} tooltip element
			 * @private
			 */
			_getTooltipElement:function(){
				var tooltipElement;
				if( !this.tooltipElement ){
					this.tooltipElement=tooltipElement=dom.create('DIV', 'tui-chart-tooltip');
					dom.append(this.tooltipContainer, tooltipElement);
				}
				return this.tooltipElement;
			},
			/**
			 * onShowTooltip is callback of mouse event detector showTooltip for SeriesView.
			 * @param {object} params coordinate event parameters
			 */
			onShowTooltip:function( params ){
				var tooltipElement=this._getTooltipElement();
				var isScatterCombo=predicate.isComboChart(this.chartType) && predicate.isScatterChart(params.chartType);
				var prevPosition;
				if( (!predicate.isChartToDetectMouseEventOnSeries(params.chartType) || isScatterCombo)
					&& tooltipElement.offsetWidth ){
					prevPosition={
						left:tooltipElement.offsetLeft,
						top:tooltipElement.offsetTop
					};
				}
				this._showTooltip(tooltipElement, params, prevPosition);
			},
			/**
			 * Get tooltip dimension
			 * @param {HTMLElement} tooltipElement tooltip element
			 * @returns {{width: number, height: number}} rendered tooltip dimension
			 */
			getTooltipDimension:function( tooltipElement ){
				return {
					width:tooltipElement.offsetWidth,
					height:tooltipElement.offsetHeight
				};
			},
			/**
			 * Move to Position.
			 * @param {HTMLElement} tooltipElement tooltip element
			 * @param {{left: number, top: number}} position position
			 * @param {{left: number, top: number}} prevPosition prev position
			 * @private
			 */
			_moveToPosition:function( tooltipElement, position, prevPosition ){
				if( prevPosition ){
					this._slideTooltip(tooltipElement, prevPosition, position);
				}else{
					renderUtil.renderPosition(tooltipElement, position);
				}
			},
			/**
			 * Slide tooltip
			 * @param {HTMLElement} tooltipElement tooltip element
			 * @param {{left: number, top: number}} prevPosition prev position
			 * @param {{left: number, top: number}} position position
			 * @private
			 */
			_slideTooltip:function( tooltipElement, prevPosition, position ){
				var moveTop=position.top-prevPosition.top,
					moveLeft=position.left-prevPosition.left;
				renderUtil.cancelAnimation(this.slidingAnimation);
				this.slidingAnimation=renderUtil.startAnimation(this.animationTime, function( ratio ){
					var left=moveLeft*ratio,
						top=moveTop*ratio;
					tooltipElement.style.left=(prevPosition.left+left)+'px';
					tooltipElement.style.top=(prevPosition.top+top)+'px';
				});
			},
			/**
			 * onHideTooltip is callback of mouse event detector hideTooltip for SeriesView
			 * @param {number} index index
			 */
			onHideTooltip:function( index ){
				var tooltipElement=this._getTooltipElement();
				this._hideTooltip(tooltipElement, index);
			},
			/**
			 * Set align option.
			 * @param {string} align align
			 */
			setAlign:function( align ){
				this.options.align=align;
				if( this.positionModel ){
					this.positionModel.updateOptions(this.options);
				}
			},
			/**
			 * Update offset option.
			 * @param {{x: number, y: number}} offset - offset
			 * @private
			 */
			_updateOffsetOption:function( offset ){
				this.options.offset=offset;
				if( this.positionModel ){
					this.positionModel.updateOptions(this.options);
				}
			},
			/**
			 * Set offset.
			 * @param {{x: number, y: number}} offset - offset
			 */
			setOffset:function( offset ){
				var offsetOption=tui.util.extend({}, this.options.offset);
				if( tui.util.isExisty(offset.x) ){
					offsetOption.x=offset.x;
				}
				if( tui.util.isExisty(offset.y) ){
					offsetOption.y=offset.y;
				}
				this._updateOffsetOption(tui.util.extend({}, this.options.offset, offsetOption));
			},
			/**
			 * Set position option.
			 * @param {{left: number, top: number}} position moving position
			 * @deprecated
			 */
			setPosition:function( position ){
				var offsetOption=tui.util.extend({}, this.options.offset);
				if( tui.util.isExisty(position.left) ){
					offsetOption.x=position.left;
				}
				if( tui.util.isExisty(position.top) ){
					offsetOption.y=position.y;
				}
				this._updateOffsetOption(offsetOption);
			},
			/**
			 * Reset align option.
			 */
			resetAlign:function(){
				var align=this.orgPositionOptions.align;
				this.options.align=align;
				if( this.positionModel ){
					this.positionModel.updateOptions(this.options);
				}
			},
			/**
			 * Reset offset option.
			 */
			resetOffset:function(){
				this.options.offset=this.orgPositionOptions.offset;
				this._updateOffsetOption(this.options.offset);
			}
		});
		module.exports=TooltipBase;
		/***/
	},
	/* 40 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview singleTooltipMixer is single tooltip mixer of map chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2),
			predicate=__webpack_require__(5),
			dom=__webpack_require__(20),
			renderUtil=__webpack_require__(23);
		/**
		 * singleTooltipMixer is single tooltip mixer of map chart.
		 * @mixin
		 * @private */
		var singleTooltipMixer={
			/**
			 * Set data indexes.
			 * @param {HTMLElement} elTooltip tooltip element
			 * @param {{groupIndex: number, index:number}} indexes indexes
			 * @private
			 */
			_setIndexesCustomAttribute:function( elTooltip, indexes ){
				elTooltip.setAttribute('data-groupIndex', indexes.groupIndex);
				elTooltip.setAttribute('data-index', indexes.index);
			},
			/**
			 * Get data indexes
			 * @param {HTMLElement} elTooltip tooltip element
			 * @returns {{groupIndex: number, index: number}} indexes
			 * @private
			 */
			_getIndexesCustomAttribute:function( elTooltip ){
				var groupIndex=elTooltip.getAttribute('data-groupIndex');
				var index=elTooltip.getAttribute('data-index');
				var indexes=null;
				if( !tui.util.isNull(groupIndex) && !tui.util.isNull(index) ){
					indexes={
						groupIndex:parseInt(groupIndex, 10),
						index:parseInt(index, 10)
					};
				}
				return indexes;
			},
			/**
			 * Set showed custom attribute.
			 * @param {HTMLElement} elTooltip tooltip element
			 * @param {boolean} status whether showed or not
			 * @private
			 */
			_setShowedCustomAttribute:function( elTooltip, status ){
				elTooltip.setAttribute('data-showed', status);
			},
			/**
			 * Whether showed tooltip or not.
			 * @param {HTMLElement} elTooltip tooltip element
			 * @returns {boolean} whether showed tooltip or not
			 * @private
			 */
			_isShowedTooltip:function( elTooltip ){
				var isShowed=elTooltip.getAttribute('data-showed');
				return isShowed==='true' || isShowed===true; // ie7에서는 boolean형태의 true를 반환함
			},
			/**
			 * Make left position of not bar chart.
			 * @param {number} baseLeft base left
			 * @param {string} alignOption align option
			 * @param {number} minusWidth minus width
			 * @param {number} lineGap line gap
			 * @returns {number} left position value
			 * @private
			 */
			_makeLeftPositionOfNotBarChart:function( baseLeft, alignOption, minusWidth, lineGap ){
				var left=baseLeft;
				if( alignOption.indexOf('left') > -1 ){
					left-=minusWidth+lineGap;
				}else if( alignOption.indexOf('center') > -1 ){
					left-=minusWidth/2;
				}else{
					left+=lineGap;
				}
				return left;
			},
			/**
			 * Make top position of not bar chart.
			 * @param {number} baseTop base top
			 * @param {string} alignOption align option
			 * @param {number} tooltipHeight tooltip height
			 * @param {number} lineGap line gap
			 * @returns {number} top position value
			 * @private
			 */
			_makeTopPositionOfNotBarChart:function( baseTop, alignOption, tooltipHeight, lineGap ){
				var top=baseTop;
				if( alignOption.indexOf('bottom') > -1 ){
					top+=tooltipHeight+lineGap;
				}else if( alignOption.indexOf('middle') > -1 ){
					top+=tooltipHeight/2;
				}else{
					top-=chartConst.TOOLTIP_GAP;
				}
				return top;
			},
			/**
			 * Make tooltip position for not bar chart.
			 * @param {object} params parameters
			 *      @param {{bound: object}} params.data graph information
			 *      @param {{width: number, height: number}} params.dimension tooltip dimension
			 *      @param {string} params.alignOption position option (ex: 'left top')
			 * @returns {{top: number, left: number}} position
			 * @private
			 */
			_makeTooltipPositionForNotBarChart:function( params ){
				var bound=params.bound,
					positionOption=params.positionOption,
					minusWidth=params.dimension.width-(bound.width || 0),
					lineGap=bound.width ? 0 : chartConst.TOOLTIP_GAP,
					alignOption=params.alignOption || '',
					tooltipHeight=params.dimension.height,
					baseLeft=bound.left+positionOption.left,
					baseTop=bound.top-tooltipHeight+positionOption.top;
				return {
					left:this._makeLeftPositionOfNotBarChart(baseLeft, alignOption, minusWidth, lineGap),
					top:this._makeTopPositionOfNotBarChart(baseTop, alignOption, tooltipHeight, lineGap)
				};
			},
			/**
			 * Make tooltip position to event position.
			 * @param {object} params parameters
			 *      @param {{left: number, top: number}} params.bound bound
			 *      @param {{left: number, top: number}} params.mousePosition mouse position
			 * @returns {{top: number, left: number}} position
			 * @private
			 */
			_makeTooltipPositionToMousePosition:function( params ){
				params.bound=params.bound || {};
				tui.util.extend(params.bound, params.mousePosition);
				return this._makeTooltipPositionForNotBarChart(params);
			},
			/**
			 * Make left position for bar chart.
			 * @param {number} baseLeft base left
			 * @param {string} alignOption align option
			 * @param {number} tooltipWidth tooltip width
			 * @returns {number} left position value
			 * @private
			 */
			_makeLeftPositionForBarChart:function( baseLeft, alignOption, tooltipWidth ){
				var left=baseLeft;
				if( alignOption.indexOf('left') > -1 ){
					left-=tooltipWidth;
				}else if( alignOption.indexOf('center') > -1 ){
					left-=tooltipWidth/2;
				}else{
					left+=chartConst.TOOLTIP_GAP;
				}
				return left;
			},
			/**
			 * Make top position for bar chart.
			 * @param {number} baseTop base top
			 * @param {string} alignOption align option
			 * @param {number} minusHeight minus width
			 * @returns {number} top position value
			 * @private
			 */
			_makeTopPositionForBarChart:function( baseTop, alignOption, minusHeight ){
				var top=baseTop;
				if( alignOption.indexOf('top') > -1 ){
					top-=minusHeight;
				}else if( alignOption.indexOf('middle') > -1 ){
					top-=minusHeight/2;
				}
				return top;
			},
			/**
			 * Make tooltip position for bar chart.
			 * @param {object} params parameters
			 *      @param {{bound: object}} params.data graph information
			 *      @param {{width: number, height: number}} params.dimension tooltip dimension
			 *      @param {string} params.alignOption position option (ex: 'left top')
			 * @returns {{top: number, left: number}} position
			 * @private
			 */
			_makeTooltipPositionForBarChart:function( params ){
				var bound=params.bound,
					positionOption=params.positionOption,
					minusHeight=params.dimension.height-(bound.height || 0),
					alignOption=params.alignOption || '',
					tooltipWidth=params.dimension.width,
					baseLeft=bound.left+bound.width+positionOption.left,
					baseTop=bound.top+positionOption.top;
				return {
					left:this._makeLeftPositionForBarChart(baseLeft, alignOption, tooltipWidth),
					top:this._makeTopPositionForBarChart(baseTop, alignOption, minusHeight)
				};
			},
			/**
			 * Make tooltip position for treemap chart.
			 * @param {object} params parameters
			 *      @param {{bound: object}} params.data - graph information
			 *      @param {{width: number, height: number}} params.dimension - tooltip dimension
			 * @returns {{left: number, top: number}}
			 * @private
			 */
			_makeTooltipPositionForTreemapChart:function( params ){
				var bound=params.bound;
				var positionOption=params.positionOption;
				var labelHeight=renderUtil.getRenderedLabelHeight(chartConst.MAX_HEIGHT_WORLD, this.labelTheme);
				return {
					left:bound.left+((bound.width-params.dimension.width)/2)+positionOption.left,
					top:bound.top+((bound.height-labelHeight)/2)-params.dimension.height+positionOption.top
				};
			},
			/**
			 * Adjust position.
			 * @param {{width: number, height: number}} tooltipDimension tooltip dimension
			 * @param {{left: number, top: number}} position position
			 * @returns {{left: number, top: number}} adjusted position
			 * @private
			 */
			_adjustPosition:function( tooltipDimension, position ){
				var chartDimension=this.dimensionMap.chart;
				var areaPosition=this.layout.position;
				position.left=Math.max(position.left, -areaPosition.left);
				position.left=Math.min(position.left, chartDimension.width-areaPosition.left-tooltipDimension.width);
				position.top=Math.max(position.top, -areaPosition.top);
				position.top=Math.min(position.top, chartDimension.height-areaPosition.top-tooltipDimension.height);
				return position;
			},
			/**
			 * Make tooltip position.
			 * @param {object} params parameters
			 *      @param {{left: number, top: number, width: number, height: number}} params.bound graph bound
			 *      @param {string} params.chartType chart type
			 *      @param {boolean} params.allowNegativeTooltip whether allow negative tooltip or not
			 *      @param {{width: number, height: number}} params.dimension tooltip dimension
			 *      @param {string} params.alignOption position option (ex: 'left top')
			 * @returns {{top: number, left: number}} position
			 * @private
			 */
			_makeTooltipPosition:function( params ){
				var position={},
					sizeType, positionType, addPadding;
				if( params.mousePosition ){
					position=this._makeTooltipPositionToMousePosition(params);
				}else{
					if( predicate.isBarChart(params.chartType) ){
						position=this._makeTooltipPositionForBarChart(params);
						sizeType='width';
						positionType='left';
						addPadding=1;
					}else if( predicate.isTreemapChart(params.chartType) ){
						position=this._makeTooltipPositionForTreemapChart(params);
					}else{
						position=this._makeTooltipPositionForNotBarChart(params);
						sizeType='height';
						positionType='top';
						addPadding= -1;
					}
					if( params.allowNegativeTooltip ){
						position=this._moveToSymmetry(position, {
							bound:params.bound,
							indexes:params.indexes,
							dimension:params.dimension,
							chartType:params.chartType,
							sizeType:sizeType,
							positionType:positionType,
							addPadding:addPadding
						});
					}
					position=this._adjustPosition(params.dimension, position);
				}
				return position;
			},
			/**
			 * Move to symmetry.
			 * @param {{left: number, top: number}} position tooltip position
			 * @param {object} params parameters
			 *      @param {{left: number, top: number, width: number, height: number}} params.bound graph bound
			 *      @param {string} params.id tooltip id
			 *      @param {{width: number, height: number}} params.dimension tooltip dimension
			 *      @param {string} params.sizeType size type (width or height)
			 *      @param {string} params.positionType position type (left or top)
			 *      @param {number} params.addPadding add padding
			 * @returns {{left: number, top: number}} moved position
			 * @private
			 */
			_moveToSymmetry:function( position, params ){
				var bound=params.bound;
				var sizeType=params.sizeType;
				var positionType=params.positionType;
				var seriesName=params.seriesName || params.chartType;
				var value=this.dataProcessor.getValue(params.indexes.groupIndex, params.indexes.index, seriesName);
				var tooltipSizeHalf, barPosition, barSizeHalf, movedPositionValue;
				if( value < 0 ){
					tooltipSizeHalf=params.dimension[sizeType]/2;
					barPosition=bound[positionType];
					barSizeHalf=bound[sizeType]/2;
					movedPositionValue=((barPosition+barSizeHalf-tooltipSizeHalf)*2)-position[positionType];
					position[positionType]=movedPositionValue;
				}
				return position;
			},
			/**
			 * Whether changed indexes or not.
			 * @param {{groupIndex: number, index: number}} prevIndexes prev indexes
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 * @returns {boolean} whether changed or not
			 * @private
			 */
			_isChangedIndexes:function( prevIndexes, indexes ){
				return !!prevIndexes && (prevIndexes.groupIndex!==indexes.groupIndex || prevIndexes.index!==indexes.index);
			},
			/**
			 * Show tooltip.
			 * @param {HTMLElement} elTooltip tooltip element
			 * @param {{indexes: {groupIndex: number, index: number}, bound: object}} params tooltip data
			 * @param {{left: number, top: number}} prevPosition prev position
			 * @private
			 */
			_showTooltip:function( elTooltip, params, prevPosition ){
				var indexes=params.indexes;
				var prevIndexes=this._getIndexesCustomAttribute(elTooltip);
				var offset=this.options.offset || {};
				var positionOption={};
				var prevChartType=elTooltip && elTooltip.getAttribute('data-chart-type');
				var position;
				if( this._isChangedIndexes(prevIndexes, indexes) || prevChartType!==params.chartType ){
					this.eventBus.fire('hoverOffSeries', prevIndexes, prevChartType);
				}
				elTooltip.innerHTML=this._makeSingleTooltipHtml(params.seriesName || params.chartType, indexes);
				elTooltip.setAttribute('data-chart-type', params.chartType);
				this._setIndexesCustomAttribute(elTooltip, indexes);
				this._setShowedCustomAttribute(elTooltip, true);
				this._fireBeforeShowTooltipPublicEvent(indexes);
				dom.addClass(elTooltip, 'show');
				positionOption.left=offset.x || 0;
				positionOption.top=offset.y || 0;
				position=this._makeTooltipPosition(tui.util.extend({
					dimension:this.getTooltipDimension(elTooltip),
					positionOption:positionOption,
					alignOption:this.options.align || ''
				}, params));
				this._moveToPosition(elTooltip, position, prevPosition);
				this.eventBus.fire('hoverSeries', indexes, params.chartType);
				this._fireAfterShowTooltipPublicEvent(indexes, {
					element:elTooltip,
					position:position
				});
			},
			/**
			 * To call beforeShowTooltip callback of public event.
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 * @private
			 */
			_fireBeforeShowTooltipPublicEvent:function( indexes ){
				var params=this._makeShowTooltipParams(indexes);
				this.eventBus.fire(chartConst.PUBLIC_EVENT_PREFIX+'beforeShowTooltip', params);
			},
			/**
			 * To call afterShowTooltip callback of public event.
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 * @param {object} additionParams addition parameters
			 * @private
			 */
			_fireAfterShowTooltipPublicEvent:function( indexes, additionParams ){
				var params=this._makeShowTooltipParams(indexes, additionParams);
				this.eventBus.fire(chartConst.PUBLIC_EVENT_PREFIX+'afterShowTooltip', params);
			},
			/**
			 * Execute hiding tooltip.
			 * @param {HTMLElement} tooltipElement tooltip element
			 * @private
			 */
			_executeHidingTooltip:function( tooltipElement ){
				dom.removeClass(tooltipElement, 'show');
				tooltipElement.removeAttribute('data-groupIndex');
				tooltipElement.removeAttribute('data-index');
				tooltipElement.style.cssText='';
			},
			/**
			 * Hide tooltip.
			 * @param {HTMLElement} tooltipElement tooltip element
			 * @private
			 */
			_hideTooltip:function( tooltipElement ){
				var self=this;
				var indexes=this._getIndexesCustomAttribute(tooltipElement);
				var chartType=tooltipElement.getAttribute('data-chart-type');
				if( predicate.isChartToDetectMouseEventOnSeries(chartType) ){
					this.eventBus.fire('hoverOffSeries', indexes, chartType);
					this._executeHidingTooltip(tooltipElement);
				}else if( chartType ){
					this._setShowedCustomAttribute(tooltipElement, false);
					this.eventBus.fire('hoverOffSeries', indexes, chartType);
					if( this._isChangedIndexes(this.prevIndexes, indexes) ){
						delete this.prevIndexes;
					}
					setTimeout(function(){
						if( self._isShowedTooltip(tooltipElement) ){
							return;
						}
						self._executeHidingTooltip(tooltipElement);
					}, chartConst.HIDE_DELAY);
				}
			},
			/**
			 * On show tooltip container.
			 */
			onShowTooltipContainer:function(){
				this.tooltipContainer.style.zIndex=chartConst.TOOLTIP_ZINDEX;
			},
			/**
			 * On hide tooltip container.
			 */
			onHideTooltipContainer:function(){
				this.tooltipContainer.style.zIndex=0;
			},
			/**
			 * Mix in.
			 * @param {function} func target function
			 * @ignore
			 */
			mixin:function( func ){
				tui.util.extend(func.prototype, this);
			}
		};
		module.exports=singleTooltipMixer;
		/***/
	},
	/* 41 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview This is templates of tooltip.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var templateMaker=__webpack_require__(25);
		var htmls={
			HTML_DEFAULT_TEMPLATE:'<div class="tui-chart-default-tooltip">'+
			'<div class="{{ categoryVisible }}">{{ category }}</div>'+
			'<div>'+
			'<span>{{ legend }}</span>'+
			'<span>{{ label }}</span>'+
			'<span>{{ suffix }}</span>'+
			'</div>'+
			'</div>',
			HTML_PIE_TEMPLATE:'<div class="tui-chart-default-tooltip">'+
			'<div class="{{ categoryVisible }}">{{ category }}</div>'+
			'<div>'+
			'<span>{{ legend }}</span>'+
			'<span>{{ ratioLabel }}</span>'+
			'<span>( {{ label }} {{ suffix }})</span>'+
			'</div>'+
			'</div>',
			HTML_COORDINATE_TYPE_CHART_TEMPLATE:'<div class="tui-chart-default-tooltip">'+
			'<div>{{ category }}</div>'+
			'<div>'+
			'<span>{{ legend }}</span>'+
			'<span>{{ label }}</span>'+
			'</div>{{ valueTypes }}'+
			'</div>',
			HTML_GROUP:'<div class="tui-chart-default-tooltip tui-chart-group-tooltip">'+
			'<div>{{ category }}</div>'+
			'{{ items }}'+
			'</div>',
			HTML_GROUP_ITEM:'<div>'+
			'<div class="tui-chart-legend-rect {{ chartType }}" style="{{ cssText }}"></div>'+
			'&nbsp;<span>{{ legend }}</span>:&nbsp;<span>{{ value }}</span>'+
			'<span>{{ suffix }}</span>'+
			'</div>',
			GROUP_CSS_TEXT:'background-color:{{ color }}',
			HTML_MAP_CHART_DEFAULT_TEMPLATE:'<div class="tui-chart-default-tooltip">'+
			'<div>{{ name }}: {{ value }}{{ suffix }}</div>'+
			'</div>'
		};
		module.exports={
			tplDefault:templateMaker.template(htmls.HTML_DEFAULT_TEMPLATE),
			tplPieChart:templateMaker.template(htmls.HTML_PIE_TEMPLATE),
			tplCoordinatetypeChart:templateMaker.template(htmls.HTML_COORDINATE_TYPE_CHART_TEMPLATE),
			tplGroup:templateMaker.template(htmls.HTML_GROUP),
			tplGroupItem:templateMaker.template(htmls.HTML_GROUP_ITEM),
			tplGroupCssText:templateMaker.template(htmls.GROUP_CSS_TEXT),
			tplMapChartDefault:templateMaker.template(htmls.HTML_MAP_CHART_DEFAULT_TEMPLATE)
		};
		/***/
	},
	/* 42 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Group tooltip component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var TooltipBase=__webpack_require__(39);
		var GroupTooltipPositionModel=__webpack_require__(43);
		var chartConst=__webpack_require__(2);
		var dom=__webpack_require__(20);
		var renderUtil=__webpack_require__(23);
		var defaultTheme=__webpack_require__(9);
		var tooltipTemplate=__webpack_require__(41);
		/**
		 * @classdesc GroupTooltip component.
		 * @class GroupTooltip
		 * @private
		 */
		var GroupTooltip=tui.util.defineClass(TooltipBase, /** @lends GroupTooltip.prototype */ {
			/**
			 * Group tooltip component.
			 * @constructs GroupTooltip
			 * @private
			 * @override
			 */
			init:function(){
				this.prevIndex=null;
				TooltipBase.apply(this, arguments);
			},
			/**
			 * Make tooltip html.
			 * @param {string} category category
			 * @param {Array.<{value: string, legend: string, chartType: string, suffix: ?string}>} items items data
			 * @returns {string} tooltip html
			 * @private
			 */
			_makeTooltipHtml:function( category, items ){
				var template=tooltipTemplate.tplGroupItem,
					cssTextTemplate=tooltipTemplate.tplGroupCssText,
					colors=this._makeColors(this.theme),
					itemsHtml=tui.util.map(items, function( item, index ){
						return template(tui.util.extend({
							cssText:cssTextTemplate({ color:colors[index] })
						}, item));
					}).join('');
				return tooltipTemplate.tplGroup({
					category:category,
					items:itemsHtml
				});
			},
			/**
			 * Set default align option of tooltip.
			 * @private
			 * @override
			 */
			_setDefaultTooltipPositionOption:function(){
				if( this.options.align ){
					return;
				}
				if( this.isVertical ){
					this.options.align=chartConst.TOOLTIP_DEFAULT_GROUP_ALIGN_OPTION;
				}else{
					this.options.align=chartConst.TOOLTIP_DEFAULT_GROUP_HORIZONTAL_ALIGN_OPTION;
				}
			},
			/**
			 * Render tooltip component.
			 * @returns {HTMLElement}
			 * @override
			 */
			render:function( data ){
				var container=TooltipBase.prototype.render.call(this, data);
				var chartDimension=this.dimensionMap.chart;
				var bound=this.layout;
				if( data.checkedLegends ){
					this.theme=this._updateLegendTheme(data.checkedLegends);
				}
				this.positionModel=new GroupTooltipPositionModel(chartDimension, bound, this.isVertical, this.options);
				return container;
			},
			/**
			 * Rerender.
			 * @param {{checkedLegends: Array.<boolean>}} data rendering data
			 * @override
			 */
			rerender:function( data ){
				TooltipBase.prototype.rerender.call(this, data);
				this.prevIndex=null;
				if( data.checkedLegends ){
					this.theme=this._updateLegendTheme(data.checkedLegends);
				}
			},
			/**
			 * Zoom.
			 */
			zoom:function(){
				this.prevIndex=null;
				TooltipBase.prototype.zoom.call(this);
			},
			/**
			 * Update legend theme.
			 * @param {object | Array.<boolean>}checkedLegends checked legends
			 * @returns {{colors: Array.<string>}} legend theme
			 * @private
			 */
			_updateLegendTheme:function( checkedLegends ){
				var colors=[];
				tui.util.forEachArray(this.dataProcessor.getOriginalLegendData(), function( item ){
					var _checkedLegends=checkedLegends[item.chartType] || checkedLegends;
					if( _checkedLegends[item.index] ){
						colors.push(item.theme.color);
					}
				});
				return {
					colors:colors
				};
			},
			/**
			 * Make tooltip data.
			 * @returns {Array.<object>} tooltip data
			 * @override
			 */
			_makeTooltipData:function(){
				var self=this;
				return tui.util.map(this.dataProcessor.getSeriesGroups(), function( seriesGroup, index ){
					return {
						category:self.dataProcessor.getCategory(index),
						values:seriesGroup.pluck('label')
					};
				});
			},
			/**
			 * Make colors.
			 * @param {object} theme tooltip theme
			 * @returns {Array.<string>} colors
			 * @private
			 */
			_makeColors:function( theme ){
				var colorIndex=0,
					legendLabels=this.dataProcessor.getLegendData(),
					defaultColors, colors, prevChartType;
				if( theme.colors ){
					return theme.colors;
				}
				defaultColors=defaultTheme.series.colors.slice(0, legendLabels.length);
				return tui.util.map(tui.util.pluck(legendLabels, 'chartType'), function( chartType ){
					var color;
					if( prevChartType!==chartType ){
						colors=theme[chartType] ? theme[chartType].colors : defaultColors;
						colorIndex=0;
					}
					prevChartType=chartType;
					color=colors[colorIndex];
					colorIndex+=1;
					return color;
				});
			},
			/**
			 * Make rendering data about legend item.
			 * @param {Array.<string>} values values
			 * @returns {Array.<{value: string, legend: string, chartType: string, suffix: ?string}>} legend item data.
			 * @private
			 */
			_makeItemRenderingData:function( values ){
				var dataProcessor=this.dataProcessor,
					suffix=this.suffix;
				return tui.util.map(values, function( value, index ){
					var legendLabel=dataProcessor.getLegendItem(index);
					return {
						value:value,
						legend:legendLabel.label,
						chartType:legendLabel.chartType,
						suffix:suffix
					};
				});
			},
			/**
			 * Make tooltip.
			 * @param {number} groupIndex group index
			 * @returns {string} tooltip html
			 * @private
			 */
			_makeGroupTooltipHtml:function( groupIndex ){
				var data=this.data[groupIndex];
				var items, htmlString='';
				if( data ){
					items=this._makeItemRenderingData(data.values);
					htmlString=this.templateFunc(data.category, items);
				}
				return htmlString;
			},
			/**
			 * Get tooltip sector element.
			 * @returns {HTMLElement} sector element
			 * @private
			 */
			_getTooltipSectorElement:function(){
				var groupTooltipSector;
				if( !this.groupTooltipSector ){
					this.groupTooltipSector=groupTooltipSector=dom.create('DIV', 'tui-chart-group-tooltip-sector');
					dom.append(this.tooltipContainer, groupTooltipSector);
				}
				return this.groupTooltipSector;
			},
			/**
			 * Make bound about tooltip sector of vertical type chart.
			 * @param {number} height height
			 * @param {{start: number, end: number}} range range
			 * @param {boolean} isLine whether line or not
			 * @returns {{dimension: {width: number, height: number}, position: {left: number, top: number}}} bound
			 * @private
			 */
			_makeVerticalTooltipSectorBound:function( height, range, isLine ){
				var width;
				if( isLine ){
					width=1;
					height+=6;
				}else{
					width=range.end-range.start;
				}
				return {
					dimension:{
						width:width,
						height:height
					},
					position:{
						left:range.start+chartConst.SERIES_EXPAND_SIZE,
						top:chartConst.SERIES_EXPAND_SIZE
					}
				};
			},
			/**
			 * Make bound about tooltip sector of horizontal type chart.
			 * @param {number} width width
			 * @param {{start: number, end:number}} range range
			 * @returns {{dimension: {width: number, height: number}, position: {left: number, top: number}}} bound
			 * @private
			 */
			_makeHorizontalTooltipSectorBound:function( width, range ){
				return {
					dimension:{
						width:width,
						height:range.end-range.start
					},
					position:{
						left:chartConst.SERIES_EXPAND_SIZE,
						top:range.start+chartConst.SERIES_EXPAND_SIZE
					}
				};
			},
			/**
			 * Make bound about tooltip sector.
			 * @param {number} size width or height
			 * @param {{start: number, end:number}} range range
			 * @param {boolean} isVertical whether vertical or not
			 * @param {boolean} isLine whether line type or not
			 * @returns {{dimension: {width: number, height: number}, position: {left: number, top: number}}} bound
			 * @private
			 */
			_makeTooltipSectorBound:function( size, range, isVertical, isLine ){
				var bound;
				if( isVertical ){
					bound=this._makeVerticalTooltipSectorBound(size, range, isLine);
				}else{
					bound=this._makeHorizontalTooltipSectorBound(size, range);
				}
				return bound;
			},
			/**
			 * Show tooltip sector.
			 * @param {number} size width or height
			 * @param {{start: number, end:number}} range range
			 * @param {boolean} isVertical whether vertical or not
			 * @param {number} index index
			 * @param {boolean} [isMoving] whether moving or not
			 * @private
			 */
			_showTooltipSector:function( size, range, isVertical, index, isMoving ){
				var groupTooltipSector=this._getTooltipSectorElement(),
					isLine=(range.start===range.end),
					bound=this._makeTooltipSectorBound(size, range, isVertical, isLine);
				if( isLine ){
					this.eventBus.fire('showGroupTooltipLine', bound);
				}else{
					renderUtil.renderDimension(groupTooltipSector, bound.dimension);
					renderUtil.renderPosition(groupTooltipSector, bound.position);
					dom.addClass(groupTooltipSector, 'show');
				}
				if( isMoving ){
					index-=1;
				}
				this.eventBus.fire('showGroupAnimation', index);
			},
			/**
			 * Hide tooltip sector.
			 * @param {number} index index
			 * @private
			 */
			_hideTooltipSector:function( index ){
				var groupTooltipSector=this._getTooltipSectorElement();
				dom.removeClass(groupTooltipSector, 'show');
				this.eventBus.fire('hideGroupAnimation', index);
				this.eventBus.fire('hideGroupTooltipLine');
			},
			/**
			 * Show tooltip.
			 * @param {HTMLElement} elTooltip tooltip element
			 * @param {{index: number, range: {start: number, end: number},
	     *          size: number, direction: string, isVertical: boolean
	     *        }} params coordinate event parameters
			 * @param {{left: number, top: number}} prevPosition prev position
			 * @private
			 */
			_showTooltip:function( elTooltip, params, prevPosition ){
				var dimension, position;
				if( !tui.util.isNull(this.prevIndex) ){
					this.eventBus.fire('hideGroupAnimation', this.prevIndex);
				}
				elTooltip.innerHTML=this._makeGroupTooltipHtml(params.index);
				this._fireBeforeShowTooltipPublicEvent(params.index, params.range);
				dom.addClass(elTooltip, 'show');
				this._showTooltipSector(params.size, params.range, params.isVertical, params.index, params.isMoving);
				dimension=this.getTooltipDimension(elTooltip);
				position=this.positionModel.calculatePosition(dimension, params.range);
				this._moveToPosition(elTooltip, position, prevPosition);
				this._fireAfterShowTooltipPublicEvent(params.index, params.range, {
					element:elTooltip,
					position:position
				});
				this.prevIndex=params.index;
			},
			/**
			 * To call beforeShowTooltip callback of public event.
			 * @param {number} index index
			 * @param {{start: number, end: number}} range range
			 * @private
			 */
			_fireBeforeShowTooltipPublicEvent:function( index, range ){
				this.eventBus.fire(chartConst.PUBLIC_EVENT_PREFIX+'beforeShowTooltip', {
					chartType:this.chartType,
					index:index,
					range:range
				});
			},
			/**
			 * To call afterShowTooltip callback of public event.
			 * @param {number} index index
			 * @param {{start: number, end: number}} range range
			 * @param {object} additionParams addition parameters
			 * @private
			 */
			_fireAfterShowTooltipPublicEvent:function( index, range, additionParams ){
				this.eventBus.fire(chartConst.PUBLIC_EVENT_PREFIX+'afterShowTooltip', tui.util.extend({
					chartType:this.chartType,
					index:index,
					range:range
				}, additionParams));
			},
			/**
			 * Hide tooltip.
			 * @param {HTMLElement} elTooltip tooltip element
			 * @param {number} index index
			 * @private
			 */
			_hideTooltip:function( elTooltip, index ){
				this.prevIndex=null;
				this._hideTooltipSector(index);
				dom.removeClass(elTooltip, 'show');
				elTooltip.style.cssText='';
			}
		});
		module.exports=GroupTooltip;
		/***/
	},
	/* 43 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview GroupTooltipPositionModel is position model for group tooltip..
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var GroupTooltipPositionModel=tui.util.defineClass(/** @lends GroupTooltipPositionModel.prototype */ {
			/**
			 * GroupTooltipPositionModel is position model for group tooltip.
			 * @constructs GroupTooltipPositionModel
			 * @private
			 * @param {{width: number, height: number}} chartDimension chart dimension
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }} areaBound tooltip area bound
			 * @param {boolean} isVertical whether vertical or not
			 * @param {{align: ?string, position: {left: number, top: number}}} options tooltip options
			 */
			init:function( chartDimension, areaBound, isVertical, options ){
				/**
				 * chart dimension
				 * @type {{width: number, height: number}}
				 */
				this.chartDimension=chartDimension;
				/**
				 * tooltip area bound
				 * @type {{dimension: {width: number, height: number}, position: {left: number, top: number}}}
				 */
				this.areaBound=areaBound;
				/**
				 * Whether vertical or not
				 * @type {boolean}
				 */
				this.isVertical=isVertical;
				/**
				 * tooltip options
				 * @type {{align: ?string, position: {left: number, top: number}}}
				 */
				this.options=options;
				/**
				 * For caching
				 * @type {object}
				 */
				this.positions={};
				this._setData(chartDimension, areaBound, isVertical, options);
			},
			/**
			 * Get horizontal direction.
			 * @param {?string} alignOption align option
			 * @returns {string} direction
			 * @private
			 */
			_getHorizontalDirection:function( alignOption ){
				var direction;
				alignOption=alignOption || '';
				if( alignOption.indexOf('left') > -1 ){
					direction=chartConst.TOOLTIP_DIRECTION_BACKWARD;
				}else if( alignOption.indexOf('center') > -1 ){
					direction=chartConst.TOOLTIP_DIRECTION_CENTER;
				}else{
					direction=chartConst.TOOLTIP_DIRECTION_FORWARD;
				}
				return direction;
			},
			/**
			 * Make vertical data.
			 * @param {{width: number, height: number}} chartDimension chart dimension
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }} areaBound tooltip area bound
			 * @param {?string} alignOption align option
			 * @returns {{
	     *      positionType: string, sizeType: string, direction: (string),
	     *      areaPosition: number, areaSize: number, chartSize: number,
	     *      basePosition: (number)
	     * }} vertical data
			 * @private
			 */
			_makeVerticalData:function( chartDimension, areaBound, alignOption ){
				var hDirection=this._getHorizontalDirection(alignOption);
				return {
					positionType:'left',
					sizeType:'width',
					direction:hDirection,
					areaPosition:areaBound.position.left,
					areaSize:areaBound.dimension.width,
					chartSize:chartDimension.width,
					basePosition:chartConst.SERIES_EXPAND_SIZE
				};
			},
			/**
			 * Get vertical direction.
			 * @param {?string} alignOption align option
			 * @returns {string} direction
			 * @private
			 */
			_getVerticalDirection:function( alignOption ){
				var direction;
				alignOption=alignOption || '';
				if( alignOption.indexOf('top') > -1 ){
					direction=chartConst.TOOLTIP_DIRECTION_BACKWARD;
				}else if( alignOption.indexOf('bottom') > -1 ){
					direction=chartConst.TOOLTIP_DIRECTION_FORWARD;
				}else{
					direction=chartConst.TOOLTIP_DIRECTION_CENTER;
				}
				return direction;
			},
			/**
			 * Make horizontal data.
			 * @param {{width: number, height: number}} chartDimension chart dimension
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }} areaBound tooltip area bound
			 * @param {?string} alignOption align option
			 * @returns {{
	     *      positionType: string, sizeType: string, direction: (string),
	     *      areaPosition: number, areaSize: number, chartSize: number,
	     *      basePosition: (number)
	     * }} horizontal data
			 * @private
			 */
			_makeHorizontalData:function( chartDimension, areaBound, alignOption ){
				var vDirection=this._getVerticalDirection(alignOption);
				return {
					positionType:'top',
					sizeType:'height',
					direction:vDirection,
					areaPosition:areaBound.position.top,
					areaSize:areaBound.dimension.height,
					chartSize:chartDimension.height,
					basePosition:chartConst.SERIES_EXPAND_SIZE
				};
			},
			/**
			 * Set data.
			 * @param {{width: number, height: number}} chartDimension chart dimension
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }} areaBound tooltip area bound
			 * @param {boolean} isVertical whether vertical or not
			 * @param {{align: ?string, position: {left: number, top: number}}} options tooltip options
			 * @private
			 */
			_setData:function( chartDimension, areaBound, isVertical, options ){
				var verticalData=this._makeVerticalData(chartDimension, areaBound, options.align);
				var horizontalData=this._makeHorizontalData(chartDimension, areaBound, options.align);
				var offset=options.offset || {};
				if( isVertical ){
					this.mainData=verticalData;
					this.subData=horizontalData;
				}else{
					this.mainData=horizontalData;
					this.subData=verticalData;
				}
				this.positionOption={};
				this.positionOption.left=offset.x || 0;
				this.positionOption.top=offset.y || 0;
				this.positions={};
			},
			/**
			 * Calculate main position value.
			 * @param {number} tooltipSize tooltip size (width or height)
			 * @param {{start: number, end: number}} range range
			 * @param {object} data data
			 *      @param {string} data.direction direction
			 *      @param {number} data.basePosition basePosition
			 * @returns {number} position value
			 * @private
			 */
			_calculateMainPositionValue:function( tooltipSize, range, data ){
				var isLine=(range.start===range.end),
					lineTypePadding=9,
					otherTypePadding=5,
					padding=isLine ? lineTypePadding : otherTypePadding,
					value=data.basePosition;
				if( data.direction===chartConst.TOOLTIP_DIRECTION_FORWARD ){
					value+=range.end+padding;
				}else if( data.direction===chartConst.TOOLTIP_DIRECTION_BACKWARD ){
					value+=range.start-tooltipSize-padding;
				}else if( isLine ){
					value+=range.start-(tooltipSize/2);
				}else{
					value+=range.start+((range.end-range.start-tooltipSize)/2);
				}
				return value;
			},
			/**
			 * Calculate sub position value.
			 * @param {number} tooltipSize tooltip size (width or height)
			 * @param {object} data data
			 *      @param {number} data.areaSize tooltip area size (width or height)
			 *      @param {string} data.direction direction
			 *      @param {number} data.basePosition basePosition
			 * @returns {number} position value
			 * @private
			 */
			_calculateSubPositionValue:function( tooltipSize, data ){
				var middle=data.areaSize/2,
					value;
				if( data.direction===chartConst.TOOLTIP_DIRECTION_FORWARD ){
					value=middle+data.basePosition;
				}else if( data.direction===chartConst.TOOLTIP_DIRECTION_BACKWARD ){
					value=middle-tooltipSize+data.basePosition;
				}else{
					value=middle-(tooltipSize/2)+data.basePosition;
				}
				return value;
			},
			/**
			 * Make position value diff.
			 * @param {number} value positoin value
			 * @param {number} tooltipSize tooltip size (width or height)
			 * @param {object} data data
			 *      @param {number} data.chartSize chart size (width or height)
			 *      @param {number} data.areaPosition tooltip area position (left or top)
			 * @returns {number} diff
			 * @private
			 */
			_makePositionValueDiff:function( value, tooltipSize, data ){
				return value+data.areaPosition+tooltipSize-data.chartSize;
			},
			/**
			 * Adjust backward position value.
			 * @param {number} value position value
			 * @param {{start: number, end: number}} range range
			 * @param {number} tooltipSize tooltip size (width or height)
			 * @param {object} data data
			 *      @param {number} data.chartSize chart size (width or height)
			 *      @param {number} data.areaPosition tooltip area position (left or top)
			 *      @param {number} data.basePosition basePosition
			 * @returns {number} position value
			 * @private
			 */
			_adjustBackwardPositionValue:function( value, range, tooltipSize, data ){
				var changedValue;
				if( value < -data.areaPosition ){
					changedValue=this._calculateMainPositionValue(tooltipSize, range, {
						direction:chartConst.TOOLTIP_DIRECTION_FORWARD,
						basePosition:data.basePosition
					});
					if( this._makePositionValueDiff(changedValue, tooltipSize, data) > 0 ){
						value= -data.areaPosition;
					}else{
						value=changedValue;
					}
				}
				return value;
			},
			/**
			 * Adjust forward position value.
			 * @param {number} value position value
			 * @param {{start: number, end: number}} range range
			 * @param {number} tooltipSize tooltip size (width or height)
			 * @param {object} data data
			 *      @param {number} data.chartSize chart size (width or height)
			 *      @param {number} data.areaPosition tooltip area position (left or top)
			 *      @param {number} data.basePosition basePosition
			 * @returns {number} position value
			 * @private
			 */
			_adjustForwardPositionValue:function( value, range, tooltipSize, data ){
				var diff=this._makePositionValueDiff(value, tooltipSize, data),
					changedValue;
				if( diff > 0 ){
					changedValue=this._calculateMainPositionValue(tooltipSize, range, {
						direction:chartConst.TOOLTIP_DIRECTION_BACKWARD,
						basePosition:data.basePosition
					});
					if( changedValue < -data.areaPosition ){
						value-=diff;
					}else{
						value=changedValue;
					}
				}
				return value;
			},
			/**
			 * Adjust main position value
			 * @param {number} value position value
			 * @param {{start: number, end: number}} range range
			 * @param {number} tooltipSize tooltip size (width or height)
			 * @param {object} data data
			 *      @param {number} data.chartSize chart size (width or height)
			 *      @param {number} data.areaPosition tooltip area position (left or top)
			 * @returns {number} position value
			 * @private
			 */
			_adjustMainPositionValue:function( value, range, tooltipSize, data ){
				if( data.direction===chartConst.TOOLTIP_DIRECTION_BACKWARD ){
					value=this._adjustBackwardPositionValue(value, range, tooltipSize, data);
				}else if( data.direction===chartConst.TOOLTIP_DIRECTION_FORWARD ){
					value=this._adjustForwardPositionValue(value, range, tooltipSize, data);
				}else{
					value=Math.max(value, -data.areaPosition);
					value=Math.min(value, data.chartSize-data.areaPosition-tooltipSize);
				}
				return value;
			},
			/**
			 * Adjust sub position value.
			 * @param {number} value position value
			 * @param {number} tooltipSize tooltip size (width or height)
			 * @param {object} data data
			 *      @param {number} data.chartSize chart size (width or height)
			 *      @param {number} data.areaPosition tooltip area position (left or top)
			 *      @param {number} data.basePosition basePosition
			 * @returns {number} position value
			 * @private
			 */
			_adjustSubPositionValue:function( value, tooltipSize, data ){
				if( data.direction===chartConst.TOOLTIP_DIRECTION_FORWARD ){
					value=Math.min(value, data.chartSize-data.areaPosition-tooltipSize);
				}else{
					value=Math.max(value, -data.areaPosition);
				}
				return value;
			},
			/**
			 * Make caching key.
			 * @param {{start: number, end: number}} range range
			 * @returns {string} key
			 * @private
			 */
			_makeCachingKey:function( range ){
				return range.start+'-'+range.end;
			},
			/**
			 * Add position option.
			 * @param {number} position position
			 * @param {string} positionType position type (left or top)
			 * @returns {number} position
			 * @private
			 */
			_addPositionOptionValue:function( position, positionType ){
				return position+this.positionOption[positionType];
			},
			/**
			 * Make main position value.
			 * @param {{width: number, height: number}} tooltipDimension tooltip dimension
			 * @param {{start: number, end: number}} range tooltip sector range
			 * @param {{
	     *      positionType: string, sizeType: string, direction: (string),
	     *      areaPosition: number, areaSize: number, chartSize: number,
	     *      basePosition: (number)
	     * }} main main data
			 * @returns {number} position value
			 * @private
			 */
			_makeMainPositionValue:function( tooltipDimension, range, main ){
				var value;
				value=this._calculateMainPositionValue(tooltipDimension[main.sizeType], range, main);
				value=this._addPositionOptionValue(value, main.positionType);
				value=this._adjustMainPositionValue(value, range, tooltipDimension[main.sizeType], main);
				return value;
			},
			/**
			 * Make sub position value.
			 * @param {{width: number, height: number}} tooltipDimension tooltip dimension
			 * @param {{
	     *      positionType: string, sizeType: string, direction: (string),
	     *      areaPosition: number, areaSize: number, chartSize: number,
	     *      basePosition: (number)
	     * }} sub sub data
			 * @returns {number} position value
			 * @private
			 */
			_makeSubPositionValue:function( tooltipDimension, sub ){
				var value;
				value=this._calculateSubPositionValue(tooltipDimension[sub.sizeType], sub);
				value=this._addPositionOptionValue(value, sub.positionType);
				value=this._adjustSubPositionValue(value, tooltipDimension[sub.sizeType], sub);
				return value;
			},
			/**
			 * Calculate group tooltip position.
			 * @param {{width: number, height: number}} tooltipDimension tooltip dimension
			 * @param {{start: number, end: number}} range tooltip sector range
			 * @returns {{left: number, top: number}} group tooltip position
			 */
			calculatePosition:function( tooltipDimension, range ){
				var key=this._makeCachingKey(range),
					main=this.mainData,
					sub=this.subData,
					position=this.positions[key];
				if( !position ){
					position={};
					position[main.positionType]=this._makeMainPositionValue(tooltipDimension, range, main);
					position[sub.positionType]=this._makeSubPositionValue(tooltipDimension, sub);
					this.positions[key]=position;
				}
				return position;
			},
			/**
			 * Update tooltip options for position calculation.
			 * @param {{align: ?string, position: {left: number, top: number}}} options tooltip options
			 */
			updateOptions:function( options ){
				this.options=options;
				this._setData(this.chartDimension, this.areaBound, this.isVertical, options);
			},
			/**
			 * Update tooltip bound for position calculation.
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }} bound tooltip area bound
			 */
			updateBound:function( bound ){
				this.areaBound=bound;
				this._setData(this.chartDimension, bound, this.isVertical, this.options);
			}
		});
		module.exports=GroupTooltipPositionModel;
		/***/
	},
	/* 44 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Tooltip component for map chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2),
			TooltipBase=__webpack_require__(39),
			singleTooltipMixer=__webpack_require__(40),
			tooltipTemplate=__webpack_require__(41);
		/**
		 * @classdesc MapChartTooltip component.
		 * @class MapChartTooltip
		 * @private
		 */
		var MapChartTooltip=tui.util.defineClass(TooltipBase, /** @lends MapChartTooltip.prototype */ {
			/**
			 * Map chart tooltip component.
			 * @constructs MapChartTooltip
			 * @private
			 * @override
			 */
			init:function( params ){
				/**
				 * Map model
				 * @type {MapChartMapModel}
				 */
				this.mapModel=params.mapModel;
				TooltipBase.apply(this, arguments);
			},
			/**
			 * Make tooltip html.
			 * @param {{name: string, value: number}} datum tooltip datum
			 * @returns {string} tooltip html
			 * @private
			 */
			_makeTooltipHtml:function( datum ){
				return tooltipTemplate.tplMapChartDefault(datum);
			},
			/**
			 * Make single tooltip html.
			 * @param {string} chartType chart type
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 * @returns {string} tooltip html
			 * @private
			 */
			_makeSingleTooltipHtml:function( chartType, indexes ){
				var datum=this.mapModel.getDatum(indexes.index),
					suffix=this.options.suffix ? ' '+this.options.suffix : '';
				return this.templateFunc({
					name:datum.name || datum.code,
					value:datum.label,
					suffix:suffix
				});
			},
			/**
			 * Make parameters for show tooltip user event.
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 * @param {object} additionParams addition parameters
			 * @returns {{chartType: string, legend: string, legendIndex: number, index: number}} parameters for show tooltip
			 * @private
			 */
			_makeShowTooltipParams:function( indexes, additionParams ){
				var datum=this.mapModel.getDatum(indexes.index),
					params;
				params=tui.util.extend({
					chartType:this.chartType,
					code:datum.code,
					name:datum.name,
					value:datum.label,
					index:indexes.index
				}, additionParams);
				return params;
			},
			/**
			 * Set default align option of tooltip.
			 * @private
			 * @override
			 */
			_setDefaultTooltipPositionOption:function(){
				if( !this.options.align ){
					this.options.align=chartConst.TOOLTIP_DEFAULT_ALIGN_OPTION;
				}
			}
		});
		singleTooltipMixer.mixin(MapChartTooltip);
		module.exports=MapChartTooltip;
		/***/
	},
	/* 45 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview AreaTypeEventDetector is mouse event detector for line type chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var MouseEventDetectorBase=__webpack_require__(46);
		var zoomMixer=__webpack_require__(49);
		var AreaTypeDataModel=__webpack_require__(50);
		var AREA_DETECT_DISTANCE_THRESHHOLD=50;
		var AreaTypeEventDetector=tui.util.defineClass(MouseEventDetectorBase, /** @lends AreaTypeEventDetector.prototype */ {
			/**
			 * AreaTypeEventDetector is mouse event detector for line type chart.
			 * @param {object} params parameters
			 * @constructs AreaTypeEventDetector
			 * @private
			 * @extends MouseEventDetectorBase
			 */
			init:function( params ){
				MouseEventDetectorBase.call(this, params);
				/**
				 * previous found data
				 * @type {null | object}
				 */
				this.prevFoundData=null;
				/**
				 * whether zoomable or not
				 * @type {boolean}
				 */
				this.zoomable=params.zoomable;
				if( this.zoomable ){
					tui.util.extend(this, zoomMixer);
					this._initForZoom(params.zoomable);
				}
			},
			/**
			 * Create areaTypeDataModel from seriesItemBoundsData for mouse event detector.
			 * @param {Array.<object>} seriesItemBoundsDatum - series item bounds datum
			 * @override
			 */
			onReceiveSeriesData:function( seriesItemBoundsDatum ){
				var seriesItemBoundsData=this.seriesItemBoundsData;
				var seriesCount=this.seriesCount;
				if( seriesItemBoundsData.length===seriesCount ){
					seriesItemBoundsData=[];
				}
				seriesItemBoundsData.push(seriesItemBoundsDatum);
				if( seriesItemBoundsData.length===seriesCount ){
					this.dataModel=new AreaTypeDataModel(seriesItemBoundsData);
				}
				if( this.zoomable ){
					this._showTooltipAfterZoom();
				}
			},
			/**
			 * Find data by client position.
			 * @param {number} clientX - clientX
			 * @param {number} clientY - clientY
			 * @returns {object}
			 * @private
			 * @override
			 */
			_findData:function( clientX, clientY ){
				var layerPosition=this._calculateLayerPosition(clientX, clientY);
				return this.dataModel.findData(layerPosition, AREA_DETECT_DISTANCE_THRESHHOLD);
			},
			/**
			 * Find data by client position for zoomable
			 * @param {number} clientX - clientX
			 * @param {number} clientY - clientY
			 * @returns {object}
			 * @private
			 */
			_findDataForZoomable:function( clientX, clientY ){
				var layerPosition=this._calculateLayerPosition(clientX, clientY);
				return this.dataModel.findData(layerPosition);
			},
			/**
			 * Get first model data.
			 * @param {number} index - index
			 * @returns {object}
			 * @private
			 */
			_getFirstData:function( index ){
				return this.dataModel.getFirstData(index);
			},
			/**
			 * Get last model data.
			 * @param {number} index - index
			 * @returns {object}
			 * @private
			 */
			_getLastData:function( index ){
				return this.dataModel.getLastData(index);
			},
			/**
			 * Show tooltip.
			 * @param {object} foundData - model data
			 * @private
			 */
			_showTooltip:function( foundData ){
				this.eventBus.fire('showTooltip', foundData);
			},
			/**
			 * Hide tooltip.
			 * @private
			 */
			_hideTooltip:function(){
				this.eventBus.fire('hideTooltip', this.prevFoundData);
			},
			/**
			 * On mousemove.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 * @override
			 */
			_onMousemove:function( e ){
				var dragMoseupResult, foundData;
				MouseEventDetectorBase.prototype._onMousemove.call(this, e);
				foundData=this._findData(e.clientX, e.clientY);
				if( this.zoomable ){
					dragMoseupResult=this._isAfterDragMouseup();
				}
				if( dragMoseupResult || !this._isChangedSelectData(this.prevFoundData, foundData) ){
					return;
				}
				if( foundData ){
					this._showTooltip(foundData);
				}else if( this.prevFoundData ){
					this._hideTooltip();
				}
				this.prevFoundData=foundData;
			},
			/**
			 * On mouseout.
			 * @private
			 * @override
			 */
			_onMouseout:function(){
				if( this.prevFoundData ){
					this._hideTooltip();
				}
				MouseEventDetectorBase.prototype._onMouseout.call(this);
			}
		});
		module.exports=AreaTypeEventDetector;
		/***/
	},
	/* 46 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview MouseEventDetectorBase is base class for mouse event detector components.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var TickBaseCoordinateModel=__webpack_require__(47);
		var BoundsBaseCoordinateModel=__webpack_require__(48);
		var chartConst=__webpack_require__(2);
		var eventListener=__webpack_require__(31);
		var predicate=__webpack_require__(5);
		var dom=__webpack_require__(20);
		var renderUtil=__webpack_require__(23);
		var MouseEventDetectorBase=tui.util.defineClass(/** @lends MouseEventDetectorBase.prototype */ {
			/**
			 * MouseEventDetectorBase is base class for mouse event detector components.
			 * @constructs MouseEventDetectorBase
			 * @private
			 * @param {object} params parameters
			 *      @param {string} params.chartType - chart type
			 *      @param {Array.<string>} params.chartTypes - chart types
			 *      @param {boolean} params.isVertical - whether vertical or not
			 *      @param {DataProcessor} params.dataProcessor - DataProcessor instance
			 *      @param {boolean} params.allowSelect - whether has allowSelect option or not
			 */
			init:function( params ){
				var hasLineTypeChart;
				/**
				 * type of chart
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * chartTypes is available in combo chart
				 * @type {Array.<string>}
				 */
				this.chartTypes=params.chartTypes;
				/**
				 * whether vertical or not
				 * @type {boolean}
				 */
				this.isVertical=params.isVertical;
				/**
				 * data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * whether allow select series or not
				 */
				this.allowSelect=params.allowSelect;
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=params.eventBus;
				/**
				 * layout bounds information for this components
				 * @type {null|{dimension:{width:number, height:number}, position:{left:number, top:number}}}
				 */
				this.layout=null;
				/**
				 * selected series item.
				 * @type {null | object}
				 */
				this.selectedData=null;
				/**
				 * previous client position of mouse event (clientX, clientY)
				 * @type {null | object}
				 */
				this.prevClientPosition=null;
				/**
				 * previous found data
				 * @type {null | object}
				 */
				this.prevFoundData=null;
				hasLineTypeChart=predicate.hasLineChart(this.chartType, this.chartTypes);
				/**
				 * expand size
				 * @type {number}
				 */
				this.expandSize=hasLineTypeChart ? chartConst.SERIES_EXPAND_SIZE : 0;
				/**
				 * series item bounds data
				 * @type {Array}
				 */
				this.seriesItemBoundsData=[];
				/**
				 * series count
				 * @type {number}
				 */
				this.seriesCount=predicate.isComboChart(this.chartType) ? 2 : 1;
				this._attachToEventBus();
			},
			/**
			 * Attach to event bus.
			 * @private
			 */
			_attachToEventBus:function(){
				this.eventBus.on('receiveSeriesData', this.onReceiveSeriesData, this);
			},
			/**
			 * Get bound for rendering.
			 * @returns {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }}
			 * @private
			 */
			_getRenderingBound:function(){
				var renderingBound=renderUtil.expandBound(this.layout);
				return renderingBound;
			},
			/**
			 * Render event handle layer area.
			 * @param {HTMLElement} mouseEventDetectorContainer - container element for mouse event detector
			 * @param {number} tickCount - tick count
			 * @private
			 */
			_renderMouseEventDetectorArea:function( mouseEventDetectorContainer, tickCount ){
				var dimension=this.layout.dimension;
				var renderingBound, tbcm;
				this.dimension=dimension;
				tbcm=new TickBaseCoordinateModel(dimension, tickCount, this.chartType, this.isVertical, this.chartTypes);
				this.tickBaseCoordinateModel=tbcm;
				renderingBound=this._getRenderingBound();
				renderUtil.renderDimension(mouseEventDetectorContainer, renderingBound.dimension);
				renderUtil.renderPosition(mouseEventDetectorContainer, renderingBound.position);
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      layout: {
	     *          dimension: {width: number, height: number},
	     *          position: {left: number, top: number}
	     *      }
	     * }} data - bounds data
			 * @private
			 */
			_setDataForRendering:function( data ){
				this.layout=data.layout;
			},
			/**
			 * Pick tick count.
			 * @param {{xAxis: object, yAxis: object}} axisDataMap - axis data map
			 * @returns {number}
			 * @private
			 */
			_pickTickCount:function( axisDataMap ){
				var tickCount;
				if( this.isVertical ){
					tickCount=axisDataMap.xAxis.eventTickCount || axisDataMap.xAxis.tickCount;
				}else{
					tickCount=axisDataMap.yAxis.tickCount;
				}
				return tickCount;
			},
			/**
			 * Render for mouseEventDetector component.
			 * @param {object} data - bounds data and tick count
			 * @returns {HTMLElement} container for mouse event detector
			 */
			render:function( data ){
				var container=dom.create('DIV', 'tui-chart-series-custom-event-area');
				var tickCount;
				if( data.axisDataMap.xAxis ){
					tickCount=this._pickTickCount(data.axisDataMap);
				}
				this._setDataForRendering(data);
				this._renderMouseEventDetectorArea(container, tickCount);
				this.attachEvent(container);
				this.mouseEventDetectorContainer=container;
				return container;
			},
			/**
			 * Calculate layer position by client position.
			 * @param {number} clientX - clientX
			 * @param {number} [clientY] - clientY
			 * @param {boolean} [checkLimit] - whether check limit or not
			 * @returns {{x: number, y: ?number}}
			 * @private
			 */
			_calculateLayerPosition:function( clientX, clientY, checkLimit ){
				var bound=this.mouseEventDetectorContainer.getBoundingClientRect();
				var layerPosition={};
				var expandSize=this.expandSize;
				var maxLeft, minLeft;
				checkLimit=tui.util.isUndefined(checkLimit) ? true : checkLimit;
				if( checkLimit ){
					maxLeft=bound.right+expandSize;
					minLeft=bound.left-expandSize;
					clientX=Math.min(Math.max(clientX, minLeft), maxLeft);
				}
				layerPosition.x=clientX-bound.left;
				if( !tui.util.isUndefined(clientY) ){
					layerPosition.y=clientY-bound.top;
				}
				return layerPosition;
			},
			/**
			 * Create BoundsBaseCoordinateModel from seriesItemBoundsData for mouse event detector.
			 * @param {{chartType: string, data: object}} seriesItemBoundsDatum - series item bounds datum
			 */
			onReceiveSeriesData:function( seriesItemBoundsDatum ){
				var seriesItemBoundsData=this.seriesItemBoundsData;
				var seriesCount=this.seriesCount;
				if( seriesItemBoundsData.length===seriesCount ){
					seriesItemBoundsData=[];
				}
				seriesItemBoundsData.push(seriesItemBoundsDatum);
				if( seriesItemBoundsData.length===seriesCount ){
					this.boundsBaseCoordinateModel=new BoundsBaseCoordinateModel(seriesItemBoundsData);
				}
			},
			/**
			 * Rerender mouse event detector component.
			 * @param {object} data - bounds data and tick count
			 */
			rerender:function( data ){
				var tickCount;
				if( data.axisDataMap.xAxis ){
					tickCount=this._pickTickCount(data.axisDataMap);
				}
				this.selectedData=null;
				this._setDataForRendering(data);
				this._renderMouseEventDetectorArea(this.mouseEventDetectorContainer, tickCount);
			},
			/**
			 * Rerender, when resizing chart.
			 * @param {object} data - bounds data and tick count
			 */
			resize:function( data ){
				this.containerBound=null;
				this.rerender(data);
			},
			/**
			 * Whether changed select data or not.
			 * @param {object} prev - previous data
			 * @param {object} cur - current data
			 * @returns {boolean}
			 * @private
			 */
			_isChangedSelectData:function( prev, cur ){
				return !prev || !cur || prev.chartType!==cur.chartType ||
					prev.indexes.groupIndex!==cur.indexes.groupIndex || prev.indexes.index!==cur.indexes.index;
			},
			/**
			 * Find coordinate data from boundsCoordinateModel.
			 * @param {{x: number, y: number}} layerPosition - layer position
			 * @returns {object}
			 * @private
			 */
			_findDataFromBoundsCoordinateModel:function( layerPosition ){
				var layerX=layerPosition.x;
				var layerY=layerPosition.y;
				var groupIndex;
				if( predicate.isTreemapChart(this.chartType) ){
					groupIndex=0;
				}else{
					groupIndex=this.tickBaseCoordinateModel.findIndex(this.isVertical ? layerX : layerY);
				}
				return this.boundsBaseCoordinateModel.findData(groupIndex, layerX, layerY);
			},
			/**
			 * Find data.
			 * @param {number} clientX - clientX
			 * @param {number} clientY - clientY
			 * @returns {object}
			 * @private
			 */
			_findData:function( clientX, clientY ){
				var layerPosition=this._calculateLayerPosition(clientX, clientY);
				return this._findDataFromBoundsCoordinateModel(layerPosition);
			},
			/**
			 * Show tooltip
			 * @private
			 * @abstract
			 */
			_showTooltip:function(){
			},
			/**
			 * Animate for adding data.
			 */
			animateForAddingData:function(){
				var foundData, isMoving;
				if( !this.prevClientPosition ){
					return;
				}
				foundData=this._findData(this.prevClientPosition.x, this.prevClientPosition.y);
				if( foundData ){
					isMoving=this.prevFoundData && (this.prevFoundData.indexes.groupIndex===foundData.indexes.groupIndex);
					this._showTooltip(foundData, isMoving);
				}
				this.prevFoundData=foundData;
			},
			/**
			 * Send mouse position data to series component, when occur mouse event like move, click.
			 * 이벤트 발생시 시리즈 엘리먼트 감지가 가능하도록 mouseEventDetector container를 일시적으로 숨긴다.
			 * @param {string} eventType - mouse event detector type
			 * @param {MouseEvent} e - mouse event
			 * @private
			 */
			_onMouseEvent:function( eventType, e ){
				dom.addClass(this.mouseEventDetectorContainer, 'hide');
				this.eventBus.fire(eventType+'Series', {
					left:e.clientX,
					top:e.clientY
				});
				dom.removeClass(this.mouseEventDetectorContainer, 'hide');
			},
			/**
			 * Unselect selected data.
			 * @private
			 */
			_unselectSelectedData:function(){
				this.eventBus.fire('unselectSeries', this.selectedData);
				this.selectedData=null;
			},
			/**
			 * Call 'selectSeries' event, when changed found position data.
			 * And call 'unselectSeries' event, when not changed found position data.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 */
			_onClick:function( e ){
				var foundData=this._findData(e.clientX, e.clientY);
				if( !this._isChangedSelectData(this.selectedData, foundData) ){
					this._unselectSelectedData();
				}else if( foundData ){
					if( this.selectedData ){
						this._unselectSelectedData();
					}
					this.eventBus.fire('selectSeries', foundData);
					if( this.allowSelect ){
						this.selectedData=foundData;
					}
				}
			},
			/**
			 * On mouse down
			 * @private
			 * @abstract
			 */
			_onMousedown:function(){
			},
			/**
			 * On mouse up
			 * @private
			 * @abstract
			 */
			_onMouseup:function(){
			},
			/**
			 * Store client position, when occur mouse move event.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 */
			_onMousemove:function( e ){
				this.prevClientPosition={
					x:e.clientX,
					y:e.clientY
				};
			},
			/**
			 * Initialize prevClientPosition and prevFoundData, when occur mouse out.
			 * @private
			 */
			_onMouseout:function(){
				this.prevClientPosition=null;
				this.prevFoundData=null;
			},
			/**
			 * Attach mouse event.
			 * @param {HTMLElement} target - target element
			 */
			attachEvent:function( target ){
				eventListener.on(target, {
					click:this._onClick,
					mousedown:this._onMousedown,
					mouseup:this._onMouseup,
					mousemove:this._onMousemove,
					mouseout:this._onMouseout
				}, this);
			}
		});
		tui.util.CustomEvents.mixin(MouseEventDetectorBase);
		module.exports=MouseEventDetectorBase;
		/***/
	},
	/* 47 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview TickBaseDataModel is tick base data model.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var predicate=__webpack_require__(5);
		var arrayUtil=__webpack_require__(6);
		var TickBaseDataModel=tui.util.defineClass(/** @lends TickBaseDataModel.prototype */ {
			/**
			 * TickBaseDataModel is tick base data model.
			 * @param {{width: number, height: number}} dimension dimension
			 * @param {number} tickCount tick count
			 * @param {string} chartType chart type
			 * @param {boolean} isVertical whether vertical or not
			 * @param {Array.<string>} [chartTypes] - chart types of combo chart
			 * @constructs TickBaseDataModel
			 * @private
			 */
			init:function( dimension, tickCount, chartType, isVertical, chartTypes ){
				/**
				 * whether line type or not
				 * @type {boolean}
				 */
				this.isLineType=predicate.isLineTypeChart(chartType, chartTypes);
				this.data=this._makeData(dimension, tickCount, isVertical);
			},
			/**
			 * Make tick base data about line type chart.
			 * @param {number} width width
			 * @param {number} tickCount tick count
			 * @returns {Array} tick base data
			 * @private
			 */
			_makeLineTypeData:function( width, tickCount ){
				var tickInterval=(width+1)/(tickCount-1),
					halfInterval=tickInterval/2,
					ranges=tui.util.map(tui.util.range(0, tickCount), function( index ){
						return {
							min:(index*tickInterval)-halfInterval,
							max:(index*tickInterval)+halfInterval
						};
					});
				ranges[tickCount-1].max-=1;
				return ranges;
			},
			/**
			 * Make tick base data about non line type chart.
			 * @param {number} size width or height
			 * @param {number} tickCount tick count
			 * @returns {Array} tick base data
			 * @private
			 */
			_makeNormalData:function( size, tickCount ){
				var len=tickCount-1;
				var tickInterval=size/len;
				var prev=0;
				return tui.util.map(tui.util.range(0, len), function( index ){
					var max=arrayUtil.min([size, (index+1)*tickInterval]);
					var limit={
						min:prev,
						max:max
					};
					prev=max;
					return limit;
				});
			},
			/**
			 * Make tick base data for mouse event detector.
			 * @param {{width: number, height: number}} dimension dimension
			 * @param {number} tickCount tick count
			 * @param {boolean} isVertical whether vertical or not
			 * @returns {Array.<object>} tick base data
			 * @private
			 */
			_makeData:function( dimension, tickCount, isVertical ){
				var sizeType=isVertical ? 'width' : 'height';
				var data;
				if( this.isLineType ){
					data=this._makeLineTypeData(dimension[sizeType], tickCount);
				}else{
					data=this._makeNormalData(dimension[sizeType], tickCount);
				}
				return data;
			},
			/**
			 * Find index.
			 * @param {number} pointValue mouse position point value
			 * @returns {number} group index
			 */
			findIndex:function( pointValue ){
				var foundIndex=-1;
				tui.util.forEachArray(this.data, function( limit, index ){
					if( limit.min < pointValue && limit.max >= pointValue ){
						foundIndex=index;
						return false;
					}
					return true;
				});
				return foundIndex;
			},
			/**
			 * Get last index.
			 * @returns {number}
			 */
			getLastIndex:function(){
				return this.data.length-1;
			},
			/**
			 * Make range of tooltip position.
			 * @param {number} index index
			 * @param {string} chartType chart type
			 * @returns {{start: number, end: number}} range type value
			 * @private
			 */
			makeRange:function( index ){
				var limit=this.data[index],
					range, center;
				if( this.isLineType ){
					center=parseInt(limit.max-((limit.max-limit.min)/2), 10);
					range={
						start:center,
						end:center
					};
				}else{
					range={
						start:limit.min,
						end:limit.max
					};
				}
				return range;
			}
		});
		module.exports=TickBaseDataModel;
		/***/
	},
	/* 48 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview BoundsBaseCoordinateModel is data model for mouse event detector of bounds type.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/**
		 * position
		 * @typedef {{left: number, top: number}} position
		 */
		/**
		 * bound
		 * @typedef {{
	 *      dimension: {width: number, height: number},
	 *      position: position
	 *}} bound
		 */
		/**
		 * group bound
		 *  @typedef {Array.<Array.<bound>>} groupBound
		 */
		/**
		 * group position
		 *  @typedef {Array.<Array.<position>>} groupPosition
		 */
		/**
		 * series info
		 * @typedef {{
	 *      chartType: {string},
	 *      data: {
	 *          groupBounds: ?groupBound,
	 *          groupValues: ?Array.<Array.<number>>,
	 *          groupPositions: ?groupPosition
	 *      }
	 *}} seriesInfo
		 */
		
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var arrayUtil=__webpack_require__(6);
		var BoundsBaseCoordinateModel=tui.util.defineClass(/** @lends BoundsBaseCoordinateModel.prototype */ {
			/**
			 * BoundsBaseCoordinateModel is data mode for mouse event detector of bounds type.
			 * @constructs BoundsBaseCoordinateModel
			 * @private
			 * @param {Array} seriesItemBoundsData - series item bounds data
			 */
			init:function( seriesItemBoundsData ){
				this.data=this._makeData(seriesItemBoundsData);
			},
			/**
			 * Make position data for rect type graph
			 * @param {groupBound} groupBounds group bounds
			 * @param {string} chartType chart type
			 * @returns {Array}
			 * @private
			 */
			_makeRectTypePositionData:function( groupBounds, chartType ){
				var allowNegativeTooltip=!predicate.isBoxTypeChart(chartType);
				return tui.util.map(groupBounds, function( bounds, groupIndex ){
					return tui.util.map(bounds, function( _bound, index ){
						var bound;
						if( !_bound ){
							return null;
						}
						bound=_bound.end;
						return {
							sendData:{
								chartType:chartType,
								indexes:{
									groupIndex:groupIndex,
									index:index
								},
								allowNegativeTooltip:allowNegativeTooltip,
								bound:bound
							},
							bound:{
								left:bound.left,
								top:bound.top,
								right:bound.left+bound.width,
								bottom:bound.top+bound.height
							}
						};
					});
				});
			},
			/**
			 * Make position data for dot type graph
			 * @param {groupPositions} groupPositions group positions
			 * @param {string} chartType chart type
			 * @returns {Array.<Array.<object>>}
			 * @private
			 */
			_makeDotTypePositionData:function( groupPositions, chartType ){
				if( !groupPositions ){
					return [];
				}
				return tui.util.map(arrayUtil.pivot(groupPositions), function( positions, groupIndex ){
					return tui.util.map(positions, function( position, index ){
						if( !position ){
							return null;
						}
						return {
							sendData:{
								chartType:chartType,
								indexes:{
									groupIndex:groupIndex,
									index:index
								},
								bound:position
							},
							bound:{
								left:position.left-chartConst.DOT_RADIUS,
								top:position.top-chartConst.DOT_RADIUS,
								right:position.left+chartConst.DOT_RADIUS,
								bottom:position.top+chartConst.DOT_RADIUS
							}
						};
					});
				});
			},
			/**
			 * Join data.
			 * @param {Array.<Array.<Array.<object>>>} dataGroupSet data group set
			 * @returns {Array.<Array.<object>>} joined data
			 * @private
			 */
			_joinData:function( dataGroupSet ){
				var results=[];
				tui.util.forEachArray(dataGroupSet, function( dataGroup ){
					tui.util.forEachArray(dataGroup, function( data, index ){
						var additionalIndex;
						if( !results[index] ){
							results[index]=data;
						}else{
							additionalIndex=results[index].length;
							tui.util.forEachArray(data, function( datum ){
								if( datum ){
									datum.sendData.indexes.legendIndex=datum.sendData.indexes.index+additionalIndex;
								}
							});
							results[index]=results[index].concat(data);
						}
					});
				});
				return results;
			},
			/**
			 * Make data for detecting mouse event.
			 * @param {Array} seriesItemBoundsData - series item bounds data
			 * @returns {Array.<Array.<object>>} coordinate data
			 * @private
			 */
			_makeData:function( seriesItemBoundsData ){
				var self=this;
				var data=tui.util.map(seriesItemBoundsData, function( info ){
					var result;
					if( predicate.isLineTypeChart(info.chartType) ){
						result=self._makeDotTypePositionData(info.data.groupPositions, info.chartType);
					}else{
						result=self._makeRectTypePositionData(info.data.groupBounds, info.chartType);
					}
					return result;
				});
				return this._joinData(data);
			},
			/**
			 * Find candidates.
			 * @param {{bound: {left: number, top: number, right: number, bottom: number}}} data data
			 * @param {number} layerX layerX
			 * @param {number} layerY layerY
			 * @returns {Array.<{sendData: object}>} candidates
			 * @private
			 */
			_findCandidates:function( data, layerX, layerY ){
				return tui.util.filter(data, function( datum ){
					var bound=datum && datum.bound,
						included=false,
						includedX, includedY;
					if( bound ){
						includedX=bound.left <= layerX && bound.right >= layerX;
						includedY=bound.top <= layerY && bound.bottom >= layerY;
						included=includedX && includedY;
					}
					return included;
				});
			},
			/**
			 * Find data.
			 * @param {number} groupIndex group index
			 * @param {number} layerX mouse position x
			 * @param {number} layerY mouse position y
			 * @returns {object} tooltip data
			 */
			findData:function( groupIndex, layerX, layerY ){
				var min=10000;
				var result=null;
				var candidates;
				if( groupIndex > -1 && this.data[groupIndex] ){
					// layerX, layerY를 포함하는 data 추출
					candidates=this._findCandidates(this.data[groupIndex], layerX, layerY);
					// 추출된 data 중 top이 layerY와 가장 가까운 data 찾아내기
					tui.util.forEachArray(candidates, function( data ){
						var diff=Math.abs(layerY-data.bound.top);
						if( min > diff ){
							min=diff;
							result=data.sendData;
						}
					});
				}
				return result;
			}
		});
		module.exports=BoundsBaseCoordinateModel;
		/***/
	},
	/* 49 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview  Mixer for zoom event of area type mouse event detector.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var MouseEventDetectorBase=__webpack_require__(46);
		var chartConst=__webpack_require__(2);
		var dom=__webpack_require__(20);
		var renderUtil=__webpack_require__(23);
		var eventListener=__webpack_require__(31);
		/**
		 * Mixer for zoom event of area type mouse event detector.
		 * @mixin
		 * @private */
		var zoomMixer={
			/**
			 * Initialize for zoom.
			 * @param {boolean} zoomable - whether zoomable or not
			 * @private
			 */
			_initForZoom:function( zoomable ){
				/**
				 * whether zoomable or not
				 * @type {boolean}
				 */
				this.zoomable=zoomable;
				/**
				 * drag start index.
				 * @type {null | object}
				 */
				this.dragStartIndexes=null;
				/**
				 * start client position(clientX, clientY) of mouse event.
				 * @type {null | {x: number, y: number}}
				 */
				this.startClientPosition=null;
				/**
				 * start layerX position
				 * @type {null | number}
				 */
				this.startLayerX=null;
				/**
				 * drag selection element
				 * @type {null | HTMLElement}
				 */
				this.dragSelectionElement=null;
				/**
				 * container bound
				 * @type {null | {left: number, right: number, top: number}}
				 */
				this.containerBound=null;
				/**
				 * whether show tooltip after zoom or not.
				 * @type {boolean}
				 */
				this.isShowTooltipAfterZoom=false;
				/**
				 * whether after mouseup or not.
				 * @type {boolean}
				 */
				this.afterMouseup=false;
				/**
				 * previouse distance of range
				 * @type {null | number}
				 */
				this.prevDistanceOfRange=null;
				/**
				 * whether reverse move or not.
				 * @type {null | number}
				 */
				this.reverseMove=null;
				/**
				 * reset zoom button element.
				 * @type {null | HTMLElement}
				 */
				this.resetZoomBtn=null;
			},
			/**
			 * Show tooltip after zoom.
			 * @private
			 */
			_showTooltipAfterZoom:function(){
				var isShowTooltipAfterZoom=this.isShowTooltipAfterZoom;
				var lastDataBeforeZoom;
				this.isShowTooltipAfterZoom=false;
				if( !isShowTooltipAfterZoom || !this.dragStartIndexes ){
					return;
				}
				if( this.reverseMove ){
					lastDataBeforeZoom=this._getFirstData(this.dragStartIndexes.index);
				}else{
					lastDataBeforeZoom=this._getLastData(this.dragEndIndexes.index);
				}
				if( lastDataBeforeZoom ){
					this._showTooltip(lastDataBeforeZoom);
				}
			},
			/**
			 * Update dimension for drag selection element.
			 * @param {HTMLElement} selectionElement - drag selection element
			 * @private
			 */
			_updateDimensionForDragSelection:function( selectionElement ){
				renderUtil.renderDimension(selectionElement, {
					height:this.layout.dimension.height
				});
			},
			/**
			 * Render drag selection.
			 * @returns {HTMLElement}
			 * @private
			 */
			_renderDragSelection:function(){
				var selectionElement=dom.create('DIV', 'tui-chart-drag-selection');
				this._updateDimensionForDragSelection(selectionElement);
				return selectionElement;
			},
			/**
			 * Render.
			 * @param {object} data - data for rendering
			 * @returns {HTMLElement}
			 * @override
			 */
			render:function( data ){
				var container=MouseEventDetectorBase.prototype.render.call(this, data);
				var selectionElement=this._renderDragSelection();
				dom.append(container, selectionElement);
				this.dragSelectionElement=selectionElement;
				return container;
			},
			/**
			 * Resize.
			 * @param {{tickCount: number}} data - data for resizing
			 * @override
			 */
			resize:function( data ){
				this.containerBound=null;
				MouseEventDetectorBase.prototype.resize.call(this, data);
				this._updateDimensionForDragSelection(this.dragSelectionElement);
			},
			/**
			 * On click
			 * @private
			 * @override
			 */
			_onClick:function(){
			},
			/**
			 * Whether after drag mouseup or not.
			 * @returns {boolean}
			 * @private
			 */
			_isAfterDragMouseup:function(){
				var afterMouseup=this.afterMouseup;
				if( afterMouseup ){
					this.afterMouseup=false;
				}
				return afterMouseup;
			},
			/**
			 * Bind drag event for zoom.
			 * @param {HTMLElement} target - target element
			 * @private
			 */
			_bindDragEvent:function( target ){
				if( target.setCapture ){
					target.setCapture();
				}
				eventListener.on(document, 'mousemove', this._onDrag, this);
				eventListener.off(this.mouseEventDetectorContainer, 'mouseup', this._onMouseup, this);
				eventListener.on(document, 'mouseup', this._onMouseupAfterDrag, this);
			},
			/**
			 * Unbind drag event for zoom.
			 * @private
			 */
			_unbindDragEvent:function(){
				if( this.downTarget && this.downTarget.releaseCapture ){
					this.downTarget.releaseCapture();
				}
				eventListener.off(document, 'mousemove', this._onDrag, this);
				eventListener.off(document, 'mouseup', this._onMouseupAfterDrag, this);
				eventListener.on(this.mouseEventDetectorContainer, 'mouseup', this._onMouseup, this);
			},
			/**
			 * On mouse down.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 * @override
			 */
			_onMousedown:function( e ){
				var target;
				if( !this.zoomable ){
					return;
				}
				target=e.target || e.srcElement;
				this.startClientPosition={
					x:e.clientX,
					y:e.clientY
				};
				this.startLayerX=this._calculateLayerPosition(e.clientX).x;
				this.downTarget=target;
				this._bindDragEvent(target);
			},
			/**
			 * Show drag selection.
			 * @param {number} clientX - clientX
			 * @private
			 */
			_showDragSelection:function( clientX ){
				var layerX=this._calculateLayerPosition(clientX).x;
				var left=Math.min(layerX, this.startLayerX);
				var width=Math.abs(layerX-this.startLayerX);
				var element=this.dragSelectionElement;
				element.style.left=left+chartConst.SERIES_EXPAND_SIZE+'px';
				element.style.width=width+'px';
				dom.addClass(element, 'show');
			},
			/**
			 * Hide drag selection.
			 * @private
			 */
			_hideDragSelection:function(){
				dom.removeClass(this.dragSelectionElement, 'show');
			},
			/**
			 * On mouse drag.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 */
			_onDrag:function( e ){
				var clientPos=this.startClientPosition;
				if( tui.util.isNull(this.dragStartIndexes) ){
					this.dragStartIndexes=this._findDataForZoomable(clientPos.x, clientPos.y).indexes;
				}else{
					this._showDragSelection(e.clientX);
				}
			},
			/**
			 * Adjust index range for ensure three indexes.
			 * @param {number} startIndex - start index
			 * @param {number} endIndex - end index
			 * @returns {Array.<number>}
			 * @private
			 */
			_adjustIndexRange:function( startIndex, endIndex ){
				var indexRange=[startIndex, endIndex].sort(function( a, b ){
					return a-b;
				});
				var distanceOfRange=indexRange[1]-indexRange[0];
				if( distanceOfRange===0 ){
					if( indexRange[0]===0 ){
						indexRange[1]+=2;
					}else{
						indexRange[0]-=1;
						indexRange[1]+=1;
					}
				}else if( distanceOfRange===1 ){
					if( indexRange[0]===0 ){
						indexRange[1]+=1;
					}else{
						indexRange[0]-=1;
					}
				}
				return indexRange;
			},
			/**
			 * Fire zoom mouse event detector.
			 * @param {number} startIndex - start index
			 * @param {number} endIndex - end index
			 * @private
			 */
			_fireZoom:function( startIndex, endIndex ){
				var reverseMove=startIndex > endIndex;
				var indexRange=this._adjustIndexRange(startIndex, endIndex);
				var distanceOfRange=indexRange[1]-indexRange[0];
				if( this.prevDistanceOfRange===distanceOfRange ){
					return;
				}
				this.prevDistanceOfRange=distanceOfRange;
				this.reverseMove=reverseMove;
				this.eventBus.fire('zoom', indexRange);
			},
			/**
			 * Set flag about whether show tooltip after zoom or not.
			 * @param {number} clientX - clientX of mouse event
			 * @param {number} clientY - clientY of mouse event
			 * @private
			 */
			_setIsShowTooltipAfterZoomFlag:function( clientX, clientY ){
				var layerX=this._calculateLayerPosition(clientX, clientY, false).x;
				var limitLayerX=this._calculateLayerPosition(clientX, clientY).x;
				this.isShowTooltipAfterZoom=(layerX===limitLayerX);
			},
			/**
			 * On mouseup after drag event.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 */
			_onMouseupAfterDrag:function( e ){
				var target;
				this._unbindDragEvent();
				if( tui.util.isNull(this.dragStartIndexes) ){
					target=e.target || e.srcElement;
					if( dom.hasClass(target, chartConst.CLASS_NAME_RESET_ZOOM_BTN) ){
						this._hideTooltip();
						this.prevDistanceOfRange=null;
						this.eventBus.fire('resetZoom');
					}else{
						MouseEventDetectorBase.prototype._onClick.call(this, e);
					}
				}else{
					this.dragEndIndexes=this._findDataForZoomable(e.clientX, e.clientY).indexes;
					this._setIsShowTooltipAfterZoomFlag(e.clientX, e.clientY);
					this._hideDragSelection();
					this._fireZoom(this.dragStartIndexes.groupIndex, this.dragEndIndexes.groupIndex);
				}
				this.startClientPosition=null;
				this.dragStartIndexes=null;
				this.startLayerX=null;
				this.afterMouseup=true;
			},
			/**
			 * Render reset zoom button element.
			 * @returns {HTMLElement}
			 * @private
			 */
			_renderResetZoomBtn:function(){
				var resetBtn=dom.create('DIV', chartConst.CLASS_NAME_RESET_ZOOM_BTN);
				resetBtn.innerHTML='Reset Zoom';
				return resetBtn;
			},
			/**
			 * Zoom.
			 * @param {object} data - data for rendering
			 */
			zoom:function( data ){
				this.prevFoundData=null;
				this.rerender(data);
				this._updateDimensionForDragSelection(this.dragSelectionElement);
				if( !this.resetZoomBtn ){
					this.resetZoomBtn=this._renderResetZoomBtn();
					dom.append(this.mouseEventDetectorContainer, this.resetZoomBtn);
				}else if( data.isResetZoom ){
					this.mouseEventDetectorContainer.removeChild(this.resetZoomBtn);
					this.resetZoomBtn=null;
				}
			}
		};
		module.exports=zoomMixer;
		/***/
	},
	/* 50 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview AreaTypeDataModel is data model for mouse event detector of area type.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var predicate=__webpack_require__(5);
		var arrayUtil=__webpack_require__(6);
		var concat=Array.prototype.concat;
		var AreaTypeDataModel=tui.util.defineClass(/** @lends AreaTypeDataModel.prototype */ {
			/**
			 * AreaTypeDataModel is data mode for mouse event detector of area type.
			 * @constructs AreaTypeDataModel
			 * @private
			 * @param {Array} seriesItemBoundsData - series item bounds data
			 */
			init:function( seriesItemBoundsData ){
				this.data=this._makeData(seriesItemBoundsData);
				/**
				 * last group index
				 * @type {number}
				 */
				this.lastGroupIndex=0;
			},
			/**
			 * Make data for detecting mouse event.
			 * @param {Array} seriesItemBoundsData - series item bounds data
			 * @returns {Array}
			 * @private
			 */
			_makeData:function( seriesItemBoundsData ){
				var lastGroupIndex=0;
				var seriesItemBoundsLength=seriesItemBoundsData.length;
				var data=tui.util.map(seriesItemBoundsData, function( seriesDatum, seriesIndex ){
					var groupPositions=seriesDatum.data.groupPositions || seriesDatum.data.groupBounds;
					var chartType=seriesDatum.chartType;
					if( predicate.isLineTypeChart(chartType) || predicate.isRadialChart(chartType) ){
						groupPositions=arrayUtil.pivot(groupPositions);
					}
					lastGroupIndex=Math.max(groupPositions.length-1, lastGroupIndex);
					return tui.util.map(groupPositions, function( positions, groupIndex ){
						return tui.util.map(positions, function( position, index ){
							var datum=null;
							if( position ){
								datum={
									chartType:chartType,
									indexes:{
										groupIndex:groupIndex,
										index:index
									},
									bound:position
								};
							}
							// Add legendIndex to datum on making multi series chart data, especially for LineScatterComboChart.
							if( seriesItemBoundsLength > 1 ){
								datum.indexes.legendIndex=seriesIndex;
							}
							return datum;
						});
					});
				});
				data=concat.apply([], data);
				this.lastGroupIndex=lastGroupIndex;
				return tui.util.filter(concat.apply([], data), function( datum ){
					return !!datum;
				});
			},
			/**
			 * Find Data by layer position.
			 * @param {{x: number, y: number}} layerPosition - layer position
			 * @param {number} [distanceLimit] distance limitation to find data
			 * @returns {object}
			 */
			findData:function( layerPosition, distanceLimit ){
				var min=100000;
				var foundData;
				distanceLimit=distanceLimit || Number.MAX_VALUE;
				tui.util.forEach(this.data, function( datum ){
					var xDiff=layerPosition.x-datum.bound.left;
					var yDiff=layerPosition.y-datum.bound.top;
					var distance=Math.sqrt(Math.pow(xDiff, 2)+Math.pow(yDiff, 2));
					if( distance < distanceLimit && distance < min ){
						min=distance;
						foundData=datum;
					}
				});
				return foundData;
			},
			/**
			 * Find data by indexes.
			 * @param {number} groupIndex - group index
			 * @param {number} index - index
			 * @returns {object}
			 * @private
			 */
			_findDataByIndexes:function( groupIndex, index ){
				var foundData=null;
				tui.util.forEachArray(this.data, function( datum ){
					if( datum.indexes.groupIndex===groupIndex && datum.indexes.index===index ){
						foundData=datum;
					}
					return !foundData;
				});
				return foundData;
			},
			/**
			 * Get first data.
			 * @param {number} index - index
			 * @returns {object}
			 */
			getFirstData:function( index ){
				return this._findDataByIndexes(0, index);
			},
			/**
			 * Get last data.
			 * @param {number} index - index
			 * @returns {object}
			 */
			getLastData:function( index ){
				return this._findDataByIndexes(this.lastGroupIndex, index);
			}
		});
		module.exports=AreaTypeDataModel;
		/***/
	},
	/* 51 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview BoundsTypeEventDetector is mouse event detector for bounds type charts
		 *                                                                              like bar, column, heatmap, treemap.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var EventDetectorBase=__webpack_require__(46);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var dom=__webpack_require__(20);
		var BoundsTypeEventDetector=tui.util.defineClass(EventDetectorBase, /** @lends BoundsTypeEventDetector.prototype */ {
			/**
			 * BoundsTypeEventDetector is mouse event detector for bounds type charts like bar, column, heatmap, treemap.
			 * @constructs BoundsTypeEventDetector
			 * @private
			 * @extends EventDetectorBase
			 */
			init:function(){
				EventDetectorBase.apply(this, arguments);
				/**
				 * previous found data
				 * @type {null | object}
				 */
				this.prevFoundData=null;
				/**
				 * history array for treemap chart.
				 * @type {number}
				 */
				this.zoomHistory=[-1];
				/**
				 * button for zoom history back
				 * @type {null | HTMLElement}
				 */
				this.historyBackBtn=null;
			},
			/**
			 * Attach to event bus.
			 * @private
			 * @override
			 */
			_attachToEventBus:function(){
				EventDetectorBase.prototype._attachToEventBus.call(this);
				this.eventBus.on('afterZoom', this.onAfterZoom, this);
			},
			/**
			 * Hide tooltip.
			 * @private
			 */
			_hideTooltip:function(){
				this.eventBus.fire('hideTooltip', this.prevFoundData);
				this.prevFoundData=null;
				this.styleCursor(false);
			},
			/**
			 * Style css cursor.
			 * @param {boolean} hasChild - whether has child or not
			 */
			styleCursor:function( hasChild ){
				var container=this.mouseEventDetectorContainer;
				if( hasChild ){
					container.style.cursor='pointer';
				}else{
					container.style.cursor='default';
				}
			},
			/**
			 * On mousemove.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 * @override
			 */
			_onMousemove:function( e ){
				var layerPosition=this._calculateLayerPosition(e.clientX, e.clientY);
				var foundData=this._findDataFromBoundsCoordinateModel(layerPosition);
				var seriesItem;
				if( !this._isChangedSelectData(this.prevFoundData, foundData) ){
					return;
				}
				if( this.prevFoundData ){
					this._hideTooltip();
				}
				this.prevFoundData=foundData;
				if( !foundData ){
					return;
				}
				if( predicate.isTreemapChart(this.chartType) ){
					seriesItem=this._getSeriesItemByIndexes(foundData.indexes);
					this.styleCursor(seriesItem.hasChild);
				}
				this.eventBus.fire('showTooltip', foundData);
			},
			/**
			 * Zoom history back.
			 * @private
			 */
			_zoomHistoryBack:function(){
				var index=this.zoomHistory[this.zoomHistory.length-2];
				this.zoomHistory.pop();
				this.eventBus.fire('zoom', index);
				if( this.zoomHistory.length===1 ){
					this.mouseEventDetectorContainer.removeChild(this.historyBackBtn);
					this.historyBackBtn=null;
				}
			},
			/**
			 * Get seriesItem by indexes
			 * @param {{groupIndex: number, index: number}} indexes - indexes
			 * @returns {SeriesItem}
			 * @private
			 */
			_getSeriesItemByIndexes:function( indexes ){
				var seriesDataModel=this.dataProcessor.getSeriesDataModel(chartConst.CHART_TYPE_TREEMAP);
				return seriesDataModel.getSeriesItem(indexes.groupIndex, indexes.index, true);
			},
			/**
			 * On mousemove.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 * @override
			 */
			_onClick:function( e ){
				var target=e.target || e.srcElement;
				var layerPosition, foundData, seriesItem;
				EventDetectorBase.prototype._onClick.call(this, e);
				if( !predicate.isTreemapChart(this.chartType) ){
					return;
				}
				if( dom.hasClass(target, chartConst.CLASS_NAME_RESET_ZOOM_BTN) ){
					this._hideTooltip();
					this._zoomHistoryBack();
					return;
				}
				layerPosition=this._calculateLayerPosition(e.clientX, e.clientY);
				foundData=this._findDataFromBoundsCoordinateModel(layerPosition);
				if( foundData ){
					seriesItem=this._getSeriesItemByIndexes(foundData.indexes);
					if( !seriesItem.hasChild ){
						return;
					}
					this._hideTooltip();
					this.eventBus.fire('zoom', foundData.indexes.index);
				}
			},
			/**
			 * On mouseout.
			 * @override
			 */
			_onMouseout:function( e ){
				// getBoundingClientRect()값 캐싱 금지 - 차트 위치 변경 시 오류 발생
				var bound=this.mouseEventDetectorContainer.getBoundingClientRect();
				var clientX=e.clientX;
				var clientY=e.clientY;
				if( (bound.left <= clientX) && (bound.top <= clientY) &&
					(bound.right >= clientX) && (bound.bottom >= clientY) ){
					return;
				}
				if( this.prevFoundData ){
					this._hideTooltip();
				}
				EventDetectorBase.prototype._onMouseout.call(this);
			},
			/**
			 * On after zoom.
			 * @param {number} index - index of target seriesItem
			 */
			onAfterZoom:function( index ){
				if( !this.historyBackBtn ){
					this.historyBackBtn=dom.create('DIV', chartConst.CLASS_NAME_RESET_ZOOM_BTN);
					this.historyBackBtn.innerHTML='< Back';
					dom.append(this.mouseEventDetectorContainer, this.historyBackBtn);
				}
				if( this.zoomHistory[this.zoomHistory.length-1]!==index ){
					this.zoomHistory.push(index);
				}
			}
		});
		module.exports=BoundsTypeEventDetector;
		/***/
	},
	/* 52 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview GroupTypeEventDetector is mouse event detector for grouped tooltip.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var EventDetectorBase=__webpack_require__(46);
		var zoomMixer=__webpack_require__(49);
		var GroupTypeEventDetector=tui.util.defineClass(EventDetectorBase, /** @lends GroupTypeEventDetector.prototype */ {
			/**
			 * GroupTypeEventDetector is mouse event detector for grouped tooltip.
			 * @param {object} params parameters
			 * @constructs GroupTypeEventDetector
			 * @private
			 * @extends EventDetectorBase
			 */
			init:function( params ){
				EventDetectorBase.call(this, params);
				/**
				 * previous index of group data
				 * @type {null}
				 */
				this.prevIndex=null;
				/**
				 * whether zoomable or not
				 * @type {boolean}
				 */
				this.zoomable=params.zoomable;
				/**
				 * type of size
				 * @type {string}
				 */
				this.sizeType=this.isVertical ? 'height' : 'width';
				if( this.zoomable ){
					tui.util.extend(this, zoomMixer);
					this._initForZoom(params.zoomable);
				}
			},
			/**
			 * Initialize data of mouse event detector
			 * @param {Array.<object>} seriesInfos series infos
			 * @override
			 */
			initMouseEventDetectorData:function( seriesInfos ){
				EventDetectorBase.prototype.initMouseEventDetectorData.call(this, seriesInfos);
				if( this.zoomable ){
					this._showTooltipAfterZoom();
				}
			},
			/**
			 * Find data by client position.
			 * @param {number} clientX - clientX
			 * @param {number} clientY - clientY
			 * @returns {object}
			 * @private
			 */
			_findGroupData:function( clientX, clientY ){
				var layerPosition=this._calculateLayerPosition(clientX, clientY, true);
				var pointValue;
				if( this.isVertical ){
					pointValue=layerPosition.x;
				}else{
					pointValue=layerPosition.y;
				}
				return {
					indexes:{
						groupIndex:this.tickBaseCoordinateModel.findIndex(pointValue)
					}
				};
			},
			/**
			 * Find data by client position for zoomable
			 * @param {number} clientX - clientX
			 * @param {number} clientY - clientY
			 * @returns {object}
			 * @private
			 */
			_findDataForZoomable:function( clientX, clientY ){
				return this._findGroupData(clientX, clientY);
			},
			/**
			 * Get first data.
			 * @returns {{indexes: {groupIndex: number}}} - data
			 * @private
			 */
			_getFirstData:function(){
				return {
					indexes:{
						groupIndex:0
					}
				};
			},
			/**
			 * Get last data.
			 * @returns {{indexes: {groupIndex: number}}} - data
			 * @private
			 */
			_getLastData:function(){
				return {
					indexes:{
						groupIndex:this.tickBaseCoordinateModel.getLastIndex()
					}
				};
			},
			/**
			 * Whether outer position or not.
			 * @param {number} layerX layerX
			 * @param {number} layerY layerY
			 * @returns {boolean} result boolean
			 * @private
			 */
			_isOuterPosition:function( layerX, layerY ){
				var dimension=this.dimension;
				return layerX < 0 || layerX > dimension.width || layerY < 0 || layerY > dimension.height;
			},
			/**
			 * Show tooltip.
			 * @param {{indexes: {groupIndex: number}}} foundData - data
			 * @param {boolean} [isMoving] - whether moving or not
			 * @private
			 */
			_showTooltip:function( foundData, isMoving ){
				var index=foundData.indexes.groupIndex;
				this.prevIndex=index;
				this.eventBus.fire('showTooltip', {
					index:index,
					range:this.tickBaseCoordinateModel.makeRange(index),
					size:this.dimension[this.sizeType],
					isVertical:this.isVertical,
					isMoving:isMoving
				});
			},
			/**
			 * Hide tooltip
			 * @private
			 */
			_hideTooltip:function(){
				this.eventBus.fire('hideTooltip', this.prevIndex);
				this.prevIndex=null;
			},
			/**
			 * If found position data by client position, show tooltip.
			 * And if not found, call onMouseout function.
			 * @param {MouseEvent} e mouse event object
			 * @private
			 * @override
			 */
			_onMousemove:function( e ){
				var foundData, index;
				EventDetectorBase.prototype._onMousemove.call(this, e);
				if( this.zoomable && this._isAfterDragMouseup() ){
					return;
				}
				foundData=this._findGroupData(e.clientX, e.clientY);
				index=foundData.indexes.groupIndex;
				if( index=== -1 ){
					this._onMouseout(e);
				}else if( this.prevIndex!==index ){
					this._showTooltip(foundData);
				}
			},
			/**
			 * If mouse position gets out mouse event detector area, hide tooltip.
			 * @override
			 */
			_onMouseout:function( e ){
				var layerPosition;
				layerPosition=this._calculateLayerPosition(e.clientX, e.clientY, false);
				if( this._isOuterPosition(layerPosition.x, layerPosition.y) && !tui.util.isNull(this.prevIndex) ){
					this._hideTooltip();
				}
				EventDetectorBase.prototype._onMouseout.call(this);
			}
		});
		module.exports=GroupTypeEventDetector;
		/***/
	},
	/* 53 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview MapChartEventDetector is mouse event detector for map chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var MouseEventDetectorBase=__webpack_require__(46);
		var chartConst=__webpack_require__(2);
		var eventListener=__webpack_require__(31);
		var dom=__webpack_require__(20);
		var renderUtil=__webpack_require__(23);
		var MapChartEventDetector=tui.util.defineClass(MouseEventDetectorBase, /** @lends MapChartEventDetector.prototype */ {
			/**
			 * MapChartEventDetector is mouse event detector for map chart.
			 * @param {object} params parameters
			 *      @param {string} params.chartType - chart type
			 * @constructs MapChartEventDetector
			 * @private
			 * @extends MouseEventDetectorBase
			 */
			init:function( params ){
				/**
				 * chart type
				 * {string}
				 *
				 */
				this.chartType=params.chartType;
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=params.eventBus;
				/**
				 * whether mouse down or not
				 * @type {boolean}
				 */
				this.isDown=false;
			},
			/**
			 * Render event handle layer area
			 * @param {HTMLElement} mouseEventDetectorContainer mouse event detector container element
			 * @private
			 */
			_renderMouseEventDetectorArea:function( mouseEventDetectorContainer ){
				renderUtil.renderDimension(mouseEventDetectorContainer, this.layout.dimension);
				renderUtil.renderPosition(mouseEventDetectorContainer, this.layout.position);
			},
			/**
			 * On click.
			 * @private
			 * @override
			 */
			_onClick:function(){
			},
			/**
			 * Call 'dragStartMapSeries' event, when occur mouse down event.
			 * @param {mouseevent} e mouse event
			 * @private
			 * @override
			 */
			_onMousedown:function( e ){
				this.isDown=true;
				this.eventBus.fire('dragStartMapSeries', {
					left:e.clientX,
					top:e.clientY
				});
			},
			/**
			 * Drag end.
			 * @private
			 */
			_dragEnd:function(){
				this.isDrag=false;
				dom.removeClass(this.mouseEventDetectorContainer, 'drag');
				this.eventBus.fire('dragEndMapSeries');
			},
			/**
			 * If drag, call dragEnd function.
			 * But if not drag, occur click event.
			 * @param {mouseevent} e mouse event
			 * @private
			 * @override
			 */
			_onMouseup:function( e ){
				this.isDown=false;
				if( this.isDrag ){
					this._dragEnd();
				}else{
					this._onMouseEvent('click', e);
				}
				this.isMove=false;
			},
			/**
			 * If mouse downed, set drag mode.
			 * But if not downed, set move mode.
			 * @param {mouseevent} e mouse event
			 * @private
			 * @override
			 */
			_onMousemove:function( e ){
				if( this.isDown ){
					if( !this.isDrag ){
						dom.addClass(this.mouseEventDetectorContainer, 'drag');
					}
					this.isDrag=true;
					this.eventBus.fire('dragMapSeries', {
						left:e.clientX,
						top:e.clientY
					});
				}else{
					this.isMove=true;
					this._onMouseEvent('move', e);
				}
			},
			/**
			 * If drag mode, call dragEnd.
			 * But if not drag mode, occur move event.
			 * @private
			 * @override
			 */
			_onMouseout:function( e ){
				if( this.isDrag ){
					this._dragEnd();
				}else{
					this._onMouseEvent('move', e);
				}
				this.isDown=false;
			},
			/**
			 * On mouse wheel.
			 * @param {mouseevent} e mouse event
			 * @returns {?boolean}
			 * @private
			 */
			_onMousewheel:function( e ){
				var wheelDelta=e.wheelDelta || e.detail*chartConst.FF_WHEELDELTA_ADJUSTING_VALUE;
				this.eventBus.fire('wheel', wheelDelta, {
					left:e.clientX,
					top:e.clientY
				});
				if( e.preventDefault ){
					e.preventDefault();
				}
				return false;
			},
			/**
			 * Attach event.
			 * @param {HTMLElement} target target element
			 * @override
			 */
			attachEvent:function( target ){
				MouseEventDetectorBase.prototype.attachEvent.call(this, target);
				if( tui.util.browser.firefox ){
					eventListener.on(target, 'DOMMouseScroll', this._onMousewheel, this);
				}else{
					eventListener.on(target, 'mousewheel', this._onMousewheel, this);
				}
			}
		});
		module.exports=MapChartEventDetector;
		/***/
	},
	/* 54 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview SimpleEventDetector is event handle layer for simply sending clientX, clientY.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var MouseEventDetectorBase=__webpack_require__(46);
		var renderUtil=__webpack_require__(23);
		var SimpleEventDetector=tui.util.defineClass(MouseEventDetectorBase, /** @lends SimpleEventDetector.prototype */ {
			/**
			 * SimpleEventDetector is event handle layer for simply sending clientX, clientY.
			 * @constructs SimpleEventDetector
			 * @private
			 * @param {object} params parameters
			 *      @param {string} params.chartType - chart type
			 * @extends MouseEventDetectorBase
			 */
			init:function( params ){
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=params.eventBus;
			},
			/**
			 * Render mouse event detector area
			 * @param {HTMLElement} mouseEventDetectorContainer - container element for mouse event detector
			 * @private
			 */
			_renderMouseEventDetectorArea:function( mouseEventDetectorContainer ){
				renderUtil.renderDimension(mouseEventDetectorContainer, this.layout.dimension);
				renderUtil.renderPosition(mouseEventDetectorContainer, this.layout.position);
			},
			/**
			 * Initialize data of mouse event detector
			 * @override
			 */
			onReceiveSeriesData:function(){
			},
			/**
			 * On click.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 * @override
			 */
			_onClick:function( e ){
				this._onMouseEvent('click', e);
			},
			/**
			 * On mouse move.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 * @override
			 */
			_onMousemove:function( e ){
				this._onMouseEvent('move', e);
			},
			/**
			 * On mouse out.
			 * @param {MouseEvent} e - mouse event
			 * @private
			 * @override
			 */
			_onMouseout:function( e ){
				this._onMouseEvent('move', e);
			}
		});
		module.exports=SimpleEventDetector;
		/***/
	},
	/* 55 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Bar chart series component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56);
		var BarTypeSeriesBase=__webpack_require__(59);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		var calculator=__webpack_require__(22);
		var BarChartSeries=tui.util.defineClass(Series, /** @lends BarChartSeries.prototype */ {
			/**
			 * Bar chart series component.
			 * @constructs BarChartSeries
			 * @private
			 * @extends Series
			 * @param {object} params parameters
			 *      @param {object} params.model series model
			 *      @param {object} params.options series options
			 *      @param {object} params.theme series theme
			 */
			init:function(){
				Series.apply(this, arguments);
			},
			/**
			 * Make bound of bar chart.
			 * @param {number} width width
			 * @param {number} height height
			 * @param {number} top top position value
			 * @param {number} startLeft start left position value
			 * @param {number} endLeft end left position value
			 * @returns {{
	     *      start: {left: number, top: number, width: number, height: number},
	     *      end: {left: number, top: number, width: number, height: number}
	     * }} column chart bound
			 * @private
			 */
			_makeBound:function( width, height, top, startLeft, endLeft ){
				return {
					start:{
						top:top,
						left:startLeft,
						width:0,
						height:height
					},
					end:{
						top:top,
						left:endLeft,
						width:width,
						height:height
					}
				};
			},
			/**
			 * Calculate additional left for divided option.
			 * @param {number} value value
			 * @returns {number}
			 * @private
			 */
			_calculateAdditionalLeft:function( value ){
				var additionalLeft=0;
				if( this.options.divided && value > 0 ){
					additionalLeft=this.dimensionMap.yAxis.width+chartConst.OVERLAPPING_WIDTH;
				}
				return additionalLeft;
			},
			/**
			 * Make bar chart bound.
			 * @param {{
	     *      baseBarSize: number,
	     *      groupSize: number,
	     *      barSize: number,
	     *      pointInterval: number,
	     *      firstAdditionalPosition: number,
	     *      basePosition: number
	     * }} baseData base data for making bound
			 * @param {{
	     *      baseTop: number,
	     *      top: number,
	     *      plusLeft: number,
	     *      minusLeft: number,
	     *      prevStack: ?string
	     * }} iterationData iteration data
			 * @param {?boolean} isStackType whether stackType option or not.
			 * @param {SeriesItem} seriesItem series item
			 * @param {number} index index
			 * @returns {{
	     *      start: {left: number, top: number, width: number, height: number},
	     *      end: {left: number, top: number, width: number, height: number}
	     * }}
			 * @private
			 */
			_makeBarChartBound:function( baseData, iterationData, isStackType, seriesItem, index ){
				var barWidth=baseData.baseBarSize*seriesItem.ratioDistance;
				var additionalLeft=this._calculateAdditionalLeft(seriesItem.value);
				var barStartLeft=baseData.baseBarSize*seriesItem.startRatio;
				var startLeft=baseData.basePosition+barStartLeft+additionalLeft+chartConst.SERIES_EXPAND_SIZE;
				var changedStack=(seriesItem.stack!==iterationData.prevStack);
				var pointCount, endLeft, bound, boundTop;
				if( !isStackType || (!this.options.diverging && changedStack) ){
					pointCount=isStackType ? this.dataProcessor.findStackIndex(seriesItem.stack) : index;
					iterationData.top=iterationData.baseTop+(baseData.pointInterval*pointCount);
					iterationData.plusLeft=0;
					iterationData.minusLeft=0;
				}
				if( seriesItem.value >= 0 ){
					endLeft=startLeft+iterationData.plusLeft;
					iterationData.plusLeft+=barWidth;
				}else{
					iterationData.minusLeft-=barWidth;
					endLeft=startLeft+iterationData.minusLeft;
				}
				iterationData.prevStack=seriesItem.stack;
				boundTop=iterationData.top+baseData.pointInterval-(baseData.barSize/2);
				bound=this._makeBound(barWidth, baseData.barSize, boundTop, startLeft, endLeft);
				return bound;
			},
			/**
			 * Make series bounds for rendering
			 * @returns {Array.<Array.<object>>} bounds
			 * @private
			 */
			_makeBounds:function(){
				var self=this;
				var seriesDataModel=this._getSeriesDataModel();
				var isStacked=predicate.isValidStackOption(this.options.stackType);
				var dimension=this.layout.dimension;
				var baseData=this._makeBaseDataForMakingBound(dimension.height, dimension.width);
				return seriesDataModel.map(function( seriesGroup, groupIndex ){
					var baseTop=(groupIndex*baseData.groupSize)+chartConst.SERIES_EXPAND_SIZE;
					var iterationData={
						baseTop:baseTop,
						top:baseTop,
						plusLeft:0,
						minusLeft:0,
						prevStack:null
					};
					var iteratee=tui.util.bind(self._makeBarChartBound, self, baseData, iterationData, isStacked);
					return seriesGroup.map(iteratee);
				});
			},
			/**
			 * Calculate top position of sum label.
			 * @param {{left: number, top: number}} bound bound
			 * @param {number} labelHeight label height
			 * @returns {number} top position value
			 * @private
			 */
			_calculateTopPositionOfSumLabel:function( bound, labelHeight ){
				return bound.top+((bound.height-labelHeight+chartConst.TEXT_PADDING)/2);
			},
			/**
			 * Make html of plus sum label.
			 * @param {Array.<number>} values values
			 * @param {{left: number, top: number}} bound bound
			 * @param {number} labelHeight label height
			 * @returns {string} plus sum label html
			 * @private
			 */
			_makePlusSumLabelHtml:function( values, bound, labelHeight ){
				var html='';
				var sum, formatFunctions, formattedSum;
				if( bound ){
					sum=calculator.sumPlusValues(values);
					formatFunctions=this.dataProcessor.getFormatFunctions();
					formattedSum=renderUtil.formatValue(sum, formatFunctions, this.chartType, 'series');
					html=this._makeSeriesLabelHtml({
						left:bound.left+bound.width+chartConst.SERIES_LABEL_PADDING,
						top:this._calculateTopPositionOfSumLabel(bound, labelHeight)
					}, formattedSum, -1);
				}
				return html;
			},
			/**
			 * Make minus sum label html.
			 * @param {Array.<number>} values values
			 * @param {{left: number, top: number}} bound bound
			 * @param {number} labelHeight label height
			 * @returns {string} plus minus label html
			 * @private
			 */
			_makeMinusSumLabelHtml:function( values, bound, labelHeight ){
				var html='';
				var sum, formatFunctions, formattedSum, labelWidth;
				if( bound ){
					sum=calculator.sumMinusValues(values);
					if( this.options.diverging ){
						sum=Math.abs(sum);
					}
					formatFunctions=this.dataProcessor.getFormatFunctions();
					formattedSum=renderUtil.formatValue(sum, formatFunctions, this.chartType, 'series');
					labelWidth=renderUtil.getRenderedLabelWidth(formattedSum, this.theme.label);
					html=this._makeSeriesLabelHtml({
						left:bound.left-labelWidth-chartConst.SERIES_LABEL_PADDING,
						top:this._calculateTopPositionOfSumLabel(bound, labelHeight)
					}, formattedSum, -1);
				}
				return html;
			}
		});
		BarTypeSeriesBase.mixin(BarChartSeries);
		module.exports=BarChartSeries;
		/***/
	},
	/* 56 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Series base component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var FADE_IN_DURATION=1000;
		var EASING_FORMULA='easeInQuint';
		var labelHelper=__webpack_require__(57);
		var chartConst=__webpack_require__(2);
		var dom=__webpack_require__(20);
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		var pluginFactory=__webpack_require__(7);
		var animation=tui.component.animation;
		var Series=tui.util.defineClass(/** @lends Series.prototype */ {
			/**
			 * Series component className
			 * @type {string}
			 */
			className:'tui-chart-series-area',
			/**
			 * Series base component.
			 * @constructs Series
			 * @private
			 * @param {object} params parameters
			 *      @param {object} params.options series options
			 *      @param {object} params.theme series theme
			 */
			init:function( params ){
				var libType=params.libType || chartConst.DEFAULT_PLUGIN;
				/**
				 * Chart type
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * Series name
				 * @tpye {string}
				 */
				this.seriesName=params.seriesName || params.chartType;
				/**
				 * Component type
				 * @type {string}
				 */
				this.componentType=params.componentType;
				/**
				 * Data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=params.eventBus;
				/**
				 * chart background.
				 * @type {string}
				 */
				this.chartBackground=params.chartBackground;
				/**
				 * Options
				 * @type {object}
				 */
				this.options=params.options || {};
				/**
				 * Theme
				 * @type {object}
				 */
				this.orgTheme=this.theme=params.theme[this.seriesName];
				/**
				 * Graph renderer
				 * @type {object}
				 */
				this.graphRenderer=pluginFactory.get(libType, params.chartType);
				/**
				 * series container
				 * @type {HTMLElement}
				 */
				this.seriesContainer=null;
				/**
				 * series label container
				 * @type {HTMLElement}
				 */
				this.seriesLabelContainer=null;
				/**
				 * series data
				 * @type {Array.<object>}
				 */
				this.seriesData=[];
				/**
				 * Selected legend index
				 * @type {?number}
				 */
				this.selectedLegendIndex=null;
				/**
				 * effector for show layer
				 * @type {object}
				 */
				this.labelShowEffector=null;
				/**
				 * raphael object
				 * @type {null|object}
				 */
				this.paper=null;
				/**
				 * limit(min, max) data for series
				 * @type {null|{min:number, max:number}}
				 */
				this.limit=null;
				/**
				 * aligned
				 * @type {null|boolean}
				 */
				this.aligned=null;
				/**
				 * layout bounds information for this components
				 * @type {null|{dimension:{width:number, height:number}, position:{left:number, top:number}}}
				 */
				this.layout=null;
				/**
				 * dimension map for layout of chart
				 * @type {null|object}
				 */
				this.dimensionMap=null;
				/**
				 * position map for layout of chart
				 * @type {null|object}
				 */
				this.positionMap=null;
				/**
				 * axis data map
				 * @type {null|object}
				 */
				this.axisDataMap=null;
				/**
				 * before axis data map
				 * @type {null|object}
				 */
				this.beforeAxisDataMap=null;
				this._attachToEventBus();
			},
			/**
			 * Attach to event bus.
			 * @private
			 */
			_attachToEventBus:function(){
				this.eventBus.on({
					selectLegend:this.onSelectLegend,
					selectSeries:this.onSelectSeries,
					unselectSeries:this.onUnselectSeries,
					hoverSeries:this.onHoverSeries,
					hoverOffSeries:this.onHoverOffSeries,
					showGroupAnimation:this.onShowGroupAnimation,
					hideGroupAnimation:this.onHideGroupAnimation
				}, this);
				if( this.onShowTooltip ){
					this.eventBus.on('showTooltip', this.onShowTooltip, this);
				}
				if( this.onShowGroupTooltipLine ){
					this.eventBus.on({
						showGroupTooltipLine:this.onShowGroupTooltipLine,
						hideGroupTooltipLine:this.onHideGroupTooltipLine
					}, this);
				}
				if( this.onClickSeries ){
					this.eventBus.on({
						clickSeries:this.onClickSeries,
						moveSeries:this.onMoveSeries
					}, this);
				}
			},
			/**
			 * Get seriesDataModel.
			 * @returns {SeriesDataModel}
			 * @private
			 */
			_getSeriesDataModel:function(){
				return this.dataProcessor.getSeriesDataModel(this.seriesName);
			},
			/**
			 * Make series data.
			 * @private
			 * @abstract
			 */
			_makeSeriesData:function(){
			},
			/**
			 * Get seriesData
			 * @returns {object} series data
			 */
			getSeriesData:function(){
				return this.seriesData;
			},
			/**
			 * Render series label.
			 * @private
			 * @abstract
			 */
			_renderSeriesLabel:function(){
			},
			/**
			 * Render series label area
			 * @param {?HTMLElement} seriesLabelContainer series label area element
			 * @returns {HTMLElement} series label area element
			 * @private
			 */
			_renderSeriesLabelArea:function( seriesLabelContainer ){
				var extendedDimension;
				if( !seriesLabelContainer ){
					seriesLabelContainer=dom.create('div', 'tui-chart-series-label-area');
				}
				if( !predicate.isChartToDetectMouseEventOnSeries(this.chartType) ){
					extendedDimension=this.dimensionMap.extendedSeries;
					renderUtil.renderDimension(seriesLabelContainer, extendedDimension);
				}
				this._renderSeriesLabel(seriesLabelContainer);
				return seriesLabelContainer;
			},
			/**
			 * Append label container to series container.
			 * @param {HTMLElement} seriesContainer - series container
			 * @param {HTMLElement} labelContainer - label container
			 * @private
			 */
			_appendLabelContainer:function( seriesContainer, labelContainer ){
				this.seriesLabelContainer=labelContainer;
				dom.append(seriesContainer, labelContainer);
			},
			/**
			 * Send boudns to mouseEventDetector component.
			 * @param {object} seriesData - series data
			 * @private
			 */
			_sendBoundsToMouseEventDetector:function( seriesData ){
				this.eventBus.fire('receiveSeriesData', {
					chartType:this.chartType,
					data:seriesData
				});
			},
			/**
			 * Render series area.
			 * @param {HTMLElement} seriesContainer - series area element
			 * @param {object} paper - raphael object
			 * @param {function} funcRenderGraph - function for graph rendering
			 * @returns {object}
			 * @private
			 */
			_renderSeriesArea:function( seriesContainer, paper, funcRenderGraph ){
				var dimension, position, seriesData, labelContainer;
				dimension=this.dimensionMap.extendedSeries;
				position=this.positionMap.extendedSeries;
				this.seriesData=seriesData=this._makeSeriesData();
				this._sendBoundsToMouseEventDetector(seriesData);
				if( !paper ){
					renderUtil.renderDimension(seriesContainer, dimension);
				}
				this._renderPosition(seriesContainer, position);
				if( this.hasDataForRendering(seriesData) || this.chartType==='map' ){
					if( funcRenderGraph ){
						paper=funcRenderGraph(dimension, seriesData, paper);
					}
					if( predicate.isShowLabel(this.options) ){
						labelContainer=this._renderSeriesLabelArea(this.seriesLabelContainer);
						this._appendLabelContainer(seriesContainer, labelContainer);
					}
				}
				return paper;
			},
			/**
			 * Make parameters for graph rendering.
			 * @param {{width: number, height: number}} dimension dimension
			 * @param {object} seriesData series data
			 * @returns {object} parameters for graph rendering
			 * @private
			 */
			_makeParamsForGraphRendering:function( dimension, seriesData ){
				return tui.util.extend({
					dimension:dimension,
					chartType:this.seriesName,
					theme:this.theme,
					options:this.options
				}, seriesData);
			},
			/**
			 * Render raphael graph.
			 * @param {{width: number, height: number}} dimension - dimension
			 * @param {object} seriesData - series data
			 * @param {object} [paper] - raphael paper
			 * @returns {object}
			 * @private
			 */
			_renderGraph:function( dimension, seriesData, paper ){
				var params=this._makeParamsForGraphRendering(dimension, seriesData);
				return this.graphRenderer.render(this.seriesContainer, params, paper);
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      paper: ?object,
	     *      limit: {
	     *          min: number,
	     *          max: number
	     *      },
	     *      aligned: boolean,
	     *      layout: {
	     *          dimension: {width: number, height: number},
	     *          position: {left: number, top: number}
	     *      },
	     *      dimensionMap: object,
	     *      positionMap: object,
	     *      axisDataMap: object
	     * }} data - data for rendering
			 * @private
			 */
			_setDataForRendering:function( data ){
				this.paper=data.paper;
				this.limit=data.limitMap[this.chartType];
				if( data.axisDataMap && data.axisDataMap.xAxis ){
					this.aligned=data.axisDataMap.xAxis.aligned;
				}
				this.layout=data.layout;
				this.dimensionMap=data.dimensionMap;
				this.positionMap=data.positionMap;
				this.axisDataMap=data.axisDataMap;
			},
			/**
			 * Render series component.
			 * @param {object} data - data for rendering
			 * @returns {HTMLElement} series element
			 */
			render:function( data ){
				var container=dom.create('DIV', this.className);
				var checkedLegends, paper;
				this.seriesContainer=container;
				this._setDataForRendering(data);
				this.beforeAxisDataMap=this.axisDataMap;
				if( data.checkedLegends ){
					checkedLegends=data.checkedLegends[this.seriesName];
					this.theme=this._getCheckedSeriesTheme(this.orgTheme, checkedLegends);
				}
				paper=this._renderSeriesArea(container, data.paper, tui.util.bind(this._renderGraph, this));
				return {
					container:container,
					paper:paper
				};
			},
			/**
			 * Get checked series theme.
			 * @param {object} theme legend theme
			 * @param {?Array.<?boolean>} checkedLegends checked legends
			 * @returns {object} checked series theme
			 * @private
			 */
			_getCheckedSeriesTheme:function( theme, checkedLegends ){
				var cloneTheme;
				if( !checkedLegends.length ){
					return theme;
				}
				cloneTheme=JSON.parse(JSON.stringify(theme));
				cloneTheme.colors=tui.util.filter(cloneTheme.colors, function( color, index ){
					return checkedLegends[index];
				});
				return cloneTheme;
			},
			/**
			 * Clear series container.
			 * @param {object} paper - Raphael object for series rendering area
			 * @private
			 */
			_clearSeriesContainer:function( paper ){
				if( this.graphRenderer.clear && !paper ){
					this.graphRenderer.clear();
				}
				this.seriesContainer.innerHTML='';
				this.seriesLabelContainer=null;
				this.seriesData=[];
			},
			/**
			 * Rerender series
			 * @param {object} data - data for rendering
			 * @returns {{container: HTMLElement, paper: object}}
			 */
			rerender:function( data ){
				var checkedLegends, paper;
				this._clearSeriesContainer();
				if( this.dataProcessor.getGroupCount(this.seriesName) ){
					if( data.checkedLegends ){
						checkedLegends=data.checkedLegends[this.seriesName];
						this.theme=this._getCheckedSeriesTheme(this.orgTheme, checkedLegends);
					}
					this._setDataForRendering(data);
					paper=this._renderSeriesArea(this.seriesContainer, data.paper, tui.util.bind(this._renderGraph, this));
					if( this.labelShowEffector ){
						clearInterval(this.labelShowEffector.timerId);
					}
					if( checkedLegends ){
						this.animateComponent(true);
					}else{
						this._showGraphWithoutAnimation();
					}
					if( !tui.util.isNull(this.selectedLegendIndex) ){
						this.graphRenderer.selectLegend(this.selectedLegendIndex);
					}
				}
				return {
					container:this.seriesContainer,
					paper:paper
				};
			},
			/**
			 * Return whether label visible or not.
			 * @returns {boolean}
			 * @private
			 */
			_isLabelVisible:function(){
				return this.seriesLabelContainer && (this.options.showLabel || this.options.showLegend);
			},
			/**
			 * Show series label without animation.
			 * @private
			 */
			_showSeriesLabelWithoutAnimation:function(){
				dom.addClass(this.seriesLabelContainer, 'show opacity');
			},
			/**
			 * Show graph without animation.
			 * @private
			 */
			_showGraphWithoutAnimation:function(){
				this.graphRenderer.showGraph();
				if( this._isLabelVisible() ){
					this._showSeriesLabelWithoutAnimation();
				}
			},
			/**
			 * Resize raphael graph by given dimension and series data
			 * @param {{width: number, height: number}} dimension - chart dimension
			 * @param {object} seriesData - series data
			 * @private
			 */
			_resizeGraph:function( dimension, seriesData ){
				this.graphRenderer.resize(tui.util.extend({
					dimension:dimension
				}, seriesData));
			},
			/**
			 * Resize series component.
			 * }} bound series bound
			 * @param {object} data data for rendering
			 */
			resize:function( data ){
				this._setDataForRendering(data);
				this._renderSeriesArea(this.seriesContainer, data.paper, tui.util.bind(this._resizeGraph, this));
			},
			/**
			 * Set element's top, left given top, left position
			 * @param {HTMLElement} el - series element
			 * @param {{top: number, left: number}} position - series top, left position
			 * @private
			 */
			_renderPosition:function( el, position ){
				var hiddenWidth=renderUtil.isOldBrowser() ? 1 : 0;
				renderUtil.renderPosition(el, {
					top:position.top-(hiddenWidth),
					left:position.left-(hiddenWidth*2)
				});
			},
			/**
			 * Get limit distance from zero point.
			 * @param {number} size chart size (width or height)
			 * @param {{min: number, max: number}} limit limit
			 * @returns {{toMax: number, toMin: number}} pixel distance
			 * @private
			 */
			_getLimitDistanceFromZeroPoint:function( size, limit ){
				var min=limit.min,
					max=limit.max,
					distance=max-min,
					toMax=0,
					toMin=0;
				if( min <= 0 && max >= 0 ){
					toMax=(distance+min)/distance*size;
					toMin=(distance-max)/distance*size;
				}else if( min > 0 ){
					toMax=size;
				}
				return {
					toMax:toMax,
					toMin:toMin
				};
			},
			/**
			 * Find label element.
			 * @param {HTMLElement} elTarget target element
			 * @returns {HTMLElement} label element
			 * @private
			 */
			_findLabelElement:function( elTarget ){
				var elLabel=null;
				if( dom.hasClass(elTarget, chartConst.CLASS_NAME_SERIES_LABEL) ){
					elLabel=elTarget;
				}else{
					elLabel=dom.findParentByClass(elTarget, chartConst.CLASS_NAME_SERIES_LABEL);
				}
				return elLabel;
			},
			/**
			 * To call showAnimation function of graphRenderer.
			 * @param {{groupIndex: number, index: number}} data data
			 * @param {string} chartType - chart type
			 */
			onHoverSeries:function( data, chartType ){
				if( chartType!==this.chartType ){
					return;
				}
				if( !this.graphRenderer.showAnimation ){
					return;
				}
				this.graphRenderer.showAnimation(data);
			},
			/**
			 * To call hideAnimation function of graphRenderer.
			 * @param {{groupIndex: number, index: number}} data data
			 * @param {string} chartType - chart type
			 */
			onHoverOffSeries:function( data, chartType ){
				if( chartType!==this.chartType ){
					return;
				}
				if( !this.graphRenderer.hideAnimation || !data ){
					return;
				}
				this.graphRenderer.hideAnimation(data);
			},
			/**
			 * To call showGroupAnimation function of graphRenderer.
			 * @param {number} index index
			 */
			onShowGroupAnimation:function( index ){
				if( !this.graphRenderer.showGroupAnimation ){
					return;
				}
				this.graphRenderer.showGroupAnimation(index);
			},
			/**
			 * To call hideGroupAnimation function of graphRenderer.
			 * @param {number} index index
			 */
			onHideGroupAnimation:function( index ){
				if( !this.graphRenderer.hideGroupAnimation ){
					return;
				}
				this.graphRenderer.hideGroupAnimation(index);
			},
			/**
			 * Animate component.
			 * @param {boolean} [isRerendering] - whether rerendering or not
			 */
			animateComponent:function( isRerendering ){
				if( this.graphRenderer.animate ){
					this.graphRenderer.animate(tui.util.bind(this.animateSeriesLabelArea, this, isRerendering));
				}else{
					this.animateSeriesLabelArea(isRerendering);
				}
			},
			/**
			 * Make html about series label.
			 * @param {{left: number, top: number}} position - position for rendering
			 * @param {string} label - label of SeriesItem
			 * @param {number} index - index of legend
			 * @param {object} [tplCssText] - cssText template object
			 * @param {boolean} [isStart] - whether start label or not
			 * @returns {string}
			 * @private
			 */
			_makeSeriesLabelHtml:function( position, label, index, tplCssText, isStart ){
				var labelTheme=this.theme.label;
				var selectedIndex=this.selectedLegendIndex;
				return labelHelper.makeSeriesLabelHtml(position, label, labelTheme, index, selectedIndex, tplCssText, isStart);
			},
			/**
			 * Fire load event.
			 * @param {boolean} [isRerendering] - whether rerendering or not
			 * @private
			 */
			_fireLoadEvent:function( isRerendering ){
				if( !isRerendering ){
					this.eventBus.fire(chartConst.PUBLIC_EVENT_PREFIX+'load');
				}
			},
			/**
			 * Animate series label area.
			 * @param {boolean} [isRerendering] - whether rerendering or not
			 */
			animateSeriesLabelArea:function( isRerendering ){
				var self=this;
				var labelContainerStyle;
				if( !this._isLabelVisible() ){
					this._fireLoadEvent(isRerendering);
					return;
				}
				if( renderUtil.isIE7() ){
					this._showSeriesLabelWithoutAnimation();
					this._fireLoadEvent(isRerendering);
				}else{
					dom.addClass(this.seriesLabelContainer, 'show');
					labelContainerStyle=this.seriesLabelContainer.style;
					this.labelShowEffector=animation.anim({
						from:0,
						to:100,
						easing:EASING_FORMULA,
						duration:FADE_IN_DURATION,
						frame:function( opacity ){
							labelContainerStyle.opacity=opacity;
						},
						complete:function(){
							if( self.labelShowEffector ){
								self.labelShowEffector=null;
							}
							dom.addClass(self.seriesLabelContainer, 'opacity');
							self._fireLoadEvent(isRerendering);
						}
					});
					this.labelShowEffector.run();
				}
			},
			/**
			 * Make exportation data for public event of series type.
			 * @param {object} seriesData series data
			 * @returns {{chartType: string, legend: string, legendIndex: number, index: number}} export data
			 * @private
			 */
			_makeExportationSeriesData:function( seriesData ){
				var indexes=seriesData.indexes;
				var legendIndex=tui.util.isExisty(indexes.legendIndex) ? indexes.legendIndex : indexes.index;
				var legendData=this.dataProcessor.getLegendItem(legendIndex);
				var index=indexes.groupIndex;
				var result={
					chartType:legendData.chartType,
					legend:legendData.label,
					legendIndex:legendIndex
				};
				var seriesItem;
				if( tui.util.isExisty(index) ){
					seriesItem=this._getSeriesDataModel().getSeriesItem(index, indexes.index);
					result.index=seriesItem.index;
				}
				return result;
			},
			/**
			 * Execute graph renderer.
			 * @param {{left: number, top: number}} position mouse position
			 * @param {string} funcName function name
			 * @returns {*} result.
			 * @private
			 */
			_executeGraphRenderer:function( position, funcName ){
				var isShowLabel=false;
				var result;
				this.eventBus.fire('hideTooltipContainer');
				if( this.seriesLabelContainer && dom.hasClass(this.seriesLabelContainer, 'show') ){
					dom.removeClass(this.seriesLabelContainer, 'show');
					isShowLabel=true;
				}
				result=this.graphRenderer[funcName](position);
				if( isShowLabel ){
					dom.addClass(this.seriesLabelContainer, 'show');
				}
				this.eventBus.fire('showTooltipContainer');
				return result;
			},
			/**
			 * To call selectSeries callback of public event.
			 * @param {object} seriesData - series data
			 * @param {?boolean} shouldSelect - whether should select or not
			 */
			onSelectSeries:function( seriesData, shouldSelect ){
				var eventName;
				if( seriesData.chartType!==this.chartType ){
					return;
				}
				eventName=chartConst.PUBLIC_EVENT_PREFIX+'selectSeries';
				this.eventBus.fire(eventName, this._makeExportationSeriesData(seriesData));
				shouldSelect=tui.util.isEmpty(shouldSelect) ? true : shouldSelect;
				if( this.options.allowSelect && this.graphRenderer.selectSeries && shouldSelect ){
					this.graphRenderer.selectSeries(seriesData.indexes);
				}
			},
			/**
			 * To call unselectSeries callback of public event.
			 * @param {object} seriesData series data.
			 */
			onUnselectSeries:function( seriesData ){
				var eventName;
				if( seriesData.chartType!==this.chartType ){
					return;
				}
				eventName=chartConst.PUBLIC_EVENT_PREFIX+'unselectSeries';
				this.eventBus.fire(eventName, this._makeExportationSeriesData(seriesData));
				if( this.options.allowSelect && this.graphRenderer.unselectSeries ){
					this.graphRenderer.unselectSeries(seriesData.indexes);
				}
			},
			/**
			 *On select legend.
			 * @param {string} seriesName - series name
			 * @param {?number} legendIndex - legend index
			 */
			onSelectLegend:function( seriesName, legendIndex ){
				if( (this.seriesName!==seriesName) && !tui.util.isNull(legendIndex) ){
					legendIndex= -1;
				}
				this.selectedLegendIndex=legendIndex;
				if( this._getSeriesDataModel().getGroupCount() ){
					this._renderSeriesArea(this.seriesContainer, this.paper);
					this.graphRenderer.selectLegend(legendIndex);
				}
			},
			/**
			 * Show label.
			 */
			showLabel:function(){
				var labelContainer;
				this.options.showLabel=true;
				if( !this.seriesLabelContainer ){
					labelContainer=this._renderSeriesLabelArea();
					this._appendLabelContainer(this.seriesContainer, labelContainer);
				}
				this._showSeriesLabelWithoutAnimation();
			},
			/**
			 * Hide label.
			 */
			hideLabel:function(){
				this.options.showLabel=false;
				if( this.seriesLabelContainer ){
					dom.removeClass(this.seriesLabelContainer, 'show');
					dom.removeClass(this.seriesLabelContainer, 'opacity');
				}
			},
			/**
			 * Return boolean value whether seriesData contains data
			 * @param {object} seriesData seriesData object
			 * @returns {boolean}
			 */
			hasDataForRendering:function( seriesData ){
				return !!(seriesData && seriesData.isAvailable());
			}
		});
		module.exports=Series;
		/***/
	},
	/* 57 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview  renderingLabelHelper is helper for rendering of series label.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var renderUtil=__webpack_require__(23);
		var seriesTemplate=__webpack_require__(58);
		/**
		 * renderingLabelHelper is helper for rendering of series label.
		 * @module renderingLabelHelper
		 * @private
		 */
		var renderingLabelHelper={
			/**
			 * Calculate left position for center align of series label.
			 * @param {{left: number, top: number, width:number, height: number}} bound - bound
			 * @param {number} labelWidth - label width
			 * @returns {number}
			 * @private
			 */
			_calculateLeftPositionForCenterAlign:function( bound, labelWidth ){
				return bound.left+((bound.width-labelWidth)/2);
			},
			/**
			 * Calculate top position for middle align of series label.
			 * @param {{left: number, top: number, width:number, height: number}} bound - bound
			 * @param {number} labelHeight - label height
			 * @returns {number}
			 * @private
			 */
			_calculateTopPositionForMiddleAlign:function( bound, labelHeight ){
				return bound.top+((bound.height-labelHeight+chartConst.TEXT_PADDING)/2);
			},
			/**
			 * Make position for type of bound for rendering label.
			 * @param {{left: number, top: number, width:number, height: number}} bound - bound
			 * @param {number} labelHeight - label height
			 * @param {string} label - label
			 * @param {object} theme - theme for series label
			 * @returns {{left: number, top: number}}
			 * @private
			 */
			_makePositionForBoundType:function( bound, labelHeight, label, theme ){
				var labelWidth=renderUtil.getRenderedLabelWidth(label, theme);
				return {
					left:this._calculateLeftPositionForCenterAlign(bound, labelWidth),
					top:this._calculateTopPositionForMiddleAlign(bound, labelHeight)
				};
			},
			/**
			 * Make position map for rendering label.
			 * @param {SeriesItem} seriesItem - series item
			 * @param {{left: number, top: number, width: number, height: number}} bound - bound
			 * @param {number} labelHeight - label height
			 * @param {object} theme - theme for series label
			 * @param {function} makePosition - function for making position of label
			 * @returns {{end: *}}
			 * @private
			 */
			_makePositionMap:function( seriesItem, bound, labelHeight, theme, makePosition ){
				var value=seriesItem.value;
				var isOppositeSide=value >= 0;
				var positionMap={
					end:makePosition(bound, labelHeight, seriesItem.endLabel || seriesItem.label, theme, isOppositeSide)
				};
				if( seriesItem.isRange ){
					isOppositeSide=value < 0;
					positionMap.start=makePosition(bound, labelHeight, seriesItem.startLabel, theme, isOppositeSide);
				}
				return positionMap;
			},
			/**
			 * Bounds to label positions.
			 * @param {SeriesDataModel} seriesDataModel - series data model
			 * @param {Array.<Array.<{left: number, top: number, width: number, height: number}>>} boundsSet - bounds set
			 * @param {object} theme - theme for series label
			 * @param {function} [makePosition] - function for making position of label
			 * @param {boolean} [isPivot] - whether pivot or not
			 * @returns {Array.<Object>}
			 */
			boundsToLabelPositions:function( seriesDataModel, boundsSet, theme, makePosition, isPivot ){
				var self=this;
				var labelHeight=renderUtil.getRenderedLabelHeight(chartConst.MAX_HEIGHT_WORLD, theme);
				makePosition=makePosition || tui.util.bind(this._makePositionForBoundType, this);
				isPivot= !!isPivot;
				return seriesDataModel.map(function( seriesGroup, groupIndex ){
					var bounds=boundsSet[groupIndex];
					return seriesGroup.map(function( seriesItem, index ){
						var bound=bounds[index].end;
						return self._makePositionMap(seriesItem, bound, labelHeight, theme, makePosition);
					});
				}, isPivot);
			},
			/**
			 * Make label position for bar chart.
			 * @param {{left: number, top: number, width:number, height: number}} bound - bound
			 * @param {number} labelHeight - label height
			 * @param {string} label - label
			 * @param {object} theme - theme for series label
			 * @param {boolean} isOppositeSide - whether opossite side or not
			 * @returns {{left: number, top: number}}
			 * @private
			 */
			_makePositionForBarChart:function( bound, labelHeight, label, theme, isOppositeSide ){
				var labelWidth=renderUtil.getRenderedLabelWidth(label, theme);
				var left=bound.left;
				if( isOppositeSide ){
					left+=bound.width+chartConst.SERIES_LABEL_PADDING;
				}else{
					left-=labelWidth+chartConst.SERIES_LABEL_PADDING;
				}
				return {
					left:left,
					top:this._calculateTopPositionForMiddleAlign(bound, labelHeight)
				};
			},
			/**
			 * Bounds to label positions for bar chart.
			 * @param {SeriesDataModel} seriesDataModel - series data model
			 * @param {Array.<Array.<{left: number, top: number, width: number, height: number}>>} boundsSet - bounds set
			 * @param {object} theme - theme for series label
			 * @returns {*|Array.<Object>|Array}
			 */
			boundsToLabelPositionsForBarChart:function( seriesDataModel, boundsSet, theme ){
				var makePositionFunction=tui.util.bind(this._makePositionForBarChart, this);
				return this.boundsToLabelPositions(seriesDataModel, boundsSet, theme, makePositionFunction);
			},
			/**
			 * Make label position for column chart.
			 * @param {{left: number, top: number, width:number, height: number}} bound - bound
			 * @param {number} labelHeight - label height
			 * @param {string} label - label
			 * @param {object} theme - theme for series label
			 * @param {boolean} isOppositeSide - whether opossite side or not
			 * @returns {{left: number, top: number}}
			 * @private
			 */
			_makePositionForColumnChart:function( bound, labelHeight, label, theme, isOppositeSide ){
				var labelWidth=renderUtil.getRenderedLabelWidth(label, theme);
				var top=bound.top;
				if( isOppositeSide ){
					top-=labelHeight+chartConst.SERIES_LABEL_PADDING;
				}else{
					top+=bound.height+chartConst.SERIES_LABEL_PADDING;
				}
				return {
					left:this._calculateLeftPositionForCenterAlign(bound, labelWidth),
					top:top
				};
			},
			/**
			 * Bounds to label positions for column chart.
			 * @param {SeriesDataModel} seriesDataModel - series data model
			 * @param {Array.<Array.<{left: number, top: number, width: number, height: number}>>} boundsSet - bounds set
			 * @param {object} theme - theme for series label
			 * @returns {*|Array.<Object>|Array}
			 */
			boundsToLabelPositionsForColumnChart:function( seriesDataModel, boundsSet, theme ){
				var makePositionFunction=tui.util.bind(this._makePositionForColumnChart, this);
				return this.boundsToLabelPositions(seriesDataModel, boundsSet, theme, makePositionFunction);
			},
			/**
			 * Make css text for series label.
			 * @param {{left: number, top: number}} position - position for rendering label
			 * @param {object} theme - theme for series label
			 * @param {number} index - index of legends
			 * @param {number} selectedIndex - selected index of legends
			 * @param {object} [tplCssText] - cssText template object
			 * @returns {*}
			 * @private
			 */
			_makeLabelCssText:function( position, theme, index, selectedIndex, tplCssText ){
				var cssObj=tui.util.extend(position, theme);
				tplCssText=tplCssText || seriesTemplate.tplCssText;
				if( tui.util.isExisty(selectedIndex) && (selectedIndex!==index) ){
					cssObj.opacity=renderUtil.makeOpacityCssText(chartConst.SERIES_LABEL_OPACITY);
				}else{
					cssObj.opacity='';
				}
				return tplCssText(cssObj);
			},
			/**
			 * Make html for series label.
			 * @param {{left: number, top: number}} position - position for rendering label
			 * @param {string} label - label of SeriesItem
			 * @param {object} theme - theme for series label
			 * @param {number} index - index of legends
			 * @param {number} selectedIndex - selected index of legends
			 * @param {object} [tplCssText] - cssText template object
			 * @param {boolean} [isStart] - whether start label or not
			 * @returns {string}
			 */
			makeSeriesLabelHtml:function( position, label, theme, index, selectedIndex, tplCssText, isStart ){
				/* eslint max-params: [2, 7]*/
				var cssText=this._makeLabelCssText(position, theme, index, selectedIndex, tplCssText);
				var rangeLabelAttribute='';
				if( isStart ){
					rangeLabelAttribute=' data-range="true"';
				}
				return seriesTemplate.tplSeriesLabel({
					label:label,
					cssText:cssText,
					rangeLabelAttribute:rangeLabelAttribute
				});
			},
			/**
			 * Make labels html for bound type chart.
			 * @param {SeriesDataModel} seriesDataModel - series data model
			 * @param {Array.<Array.<{left: number, top: number}>>} positionsSet - positions set
			 * @param {object} theme - theme for series label
			 * @param {number} selectedIndex - selected index of legends
			 * @param {boolean} [isPivot] - whether pivot or not
			 * @returns {*}
			 */
			makeLabelsHtmlForBoundType:function( seriesDataModel, positionsSet, theme, selectedIndex, isPivot ){
				var makeSeriesLabelHtml=tui.util.bind(this.makeSeriesLabelHtml, this);
				var labelsHtml=seriesDataModel.map(function( seriesGroup, groupIndex ){
					return seriesGroup.map(function( seriesItem, index ){
						var positionMap=positionsSet[groupIndex][index];
						var html=makeSeriesLabelHtml(positionMap.end, seriesItem.endLabel, theme, index, selectedIndex);
						if( positionMap.start ){
							html+=makeSeriesLabelHtml(positionMap.start, seriesItem.startLabel, theme, index, selectedIndex);
						}
						return html;
					}).join('');
				}, !!isPivot).join('');
				return labelsHtml;
			},
			/**
			 * Make labels html for treemap chart.
			 * @param {Array.<SeriesItem>} seriesItems - seriesItems
			 * @param {object.<string, {left: number, top: number, width: number, height: number}>} boundMap - bound map
			 * @param {object} theme - theme for series label
			 * @param {function} shouldDimmed - returns whether should dimmed or not
			 * @param {function} template - label template
			 * @returns {string}
			 */
			makeLabelsHtmlForTreemap:function( seriesItems, boundMap, theme, shouldDimmed, template ){
				var self=this;
				var labelHeight=renderUtil.getRenderedLabelHeight(chartConst.MAX_HEIGHT_WORLD, theme);
				var labelsHtml=tui.util.map(seriesItems, function( seriesItem, index ){
					var bound=boundMap[seriesItem.id];
					var html='';
					var position, compareIndex, label;
					if( bound ){
						compareIndex=shouldDimmed(seriesItem) ? -1 : null;
						if( template ){
							label=template(seriesItem.pickLabelTemplateData());
							labelHeight=renderUtil.getRenderedLabelHeight(label, theme);
						}else{
							label=seriesItem.label;
						}
						position=self._makePositionForBoundType(bound, labelHeight, label, theme, seriesItem.value >= 0);
						html=self.makeSeriesLabelHtml(position, label, theme, index, compareIndex);
					}
					return html;
				}).join('');
				return labelsHtml;
			}
		};
		module.exports=renderingLabelHelper;
		/***/
	},
	/* 58 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview This is templates of series.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var templateMaker=__webpack_require__(25);
		var htmls={
			HTML_SERIES_LABEL:'<div class="tui-chart-series-label" style="{{ cssText }}"{{ rangeLabelAttribute }}>'+
			'{{ label }}</div>',
			TEXT_CSS_TEXT:'left:{{ left }}px;top:{{ top }}px;font-family:{{ fontFamily }};'+
			'font-size:{{ fontSize }}px;font-weight:{{ fontWeight }}{{opacity}}',
			TEXT_CSS_TEXT_FOR_LINE_TYPE:'left:{{ left }}%;top:{{ top }}%;font-family:{{ fontFamily }};'+
			'font-size:{{ fontSize }}px;font-weight:{{ fontWeight }}{{opacity}}',
			HTML_ZOOM_BUTTONS:'<a class="tui-chart-zoom-btn" href="#" data-magn="2">'+
			'<div class="horizontal-line"></div><div class="vertical-line"></div></a>'+
			'<a class="tui-chart-zoom-btn" href="#" data-magn="0.5"><div class="horizontal-line"></div></a>',
			HTML_SERIES_BLOCK:'<div class="tui-chart-series-block" style="{{ cssText }}">{{ label }}</div>'
		};
		module.exports={
			tplSeriesLabel:templateMaker.template(htmls.HTML_SERIES_LABEL),
			tplCssText:templateMaker.template(htmls.TEXT_CSS_TEXT),
			tplCssTextForLineType:templateMaker.template(htmls.TEXT_CSS_TEXT_FOR_LINE_TYPE),
			ZOOM_BUTTONS:htmls.HTML_ZOOM_BUTTONS,
			tplSeriesBlock:templateMaker.template(htmls.HTML_SERIES_BLOCK)
		};
		/***/
	},
	/* 59 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview BarTypeSeriesBase is base class for bar type series.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var labelHelper=__webpack_require__(57);
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var DEFAULT_BAR_SIZE_RATIO_BY_POINT_INTERVAL=0.8;
		var BarTypeSeriesBase=tui.util.defineClass(/** @lends BarTypeSeriesBase.prototype */ {
			/**
			 * Make series data.
			 * @returns {object} add data
			 * @private
			 * @override
			 */
			_makeSeriesData:function(){
				var groupBounds=this._makeBounds(this.layout.dimension);
				this.groupBounds=groupBounds;
				return {
					groupBounds:groupBounds,
					seriesDataModel:this._getSeriesDataModel(),
					isAvailable:function(){
						return groupBounds && groupBounds.length > 0;
					}
				};
			},
			/**
			 * Get bar width option size.
			 * @param {number} pointInterval point interval
			 * @param {number} [optionBarWidth] barWidth option
			 * @returns {number} option size
			 * @private
			 */
			_getBarWidthOptionSize:function( pointInterval, optionBarWidth ){
				var optionsSize=0;
				if( optionBarWidth ){
					if( (optionBarWidth/2) >= pointInterval ){
						optionBarWidth=pointInterval*2;
					}else if( optionBarWidth < 0 ){
						optionBarWidth=0;
					}
					optionsSize=optionBarWidth;
				}
				return optionsSize;
			},
			/**
			 * Calculate difference between optionSize and barSize.
			 * @param {number} barSize bar size
			 * @param {number} optionSize option size
			 * @param {number} itemCount item count
			 * @returns {number} addition padding
			 * @private
			 */
			_calculateAdditionalPosition:function( barSize, optionSize, itemCount ){
				var additionalPosition=0;
				if( optionSize && optionSize < barSize ){
					additionalPosition=(barSize/2)+((barSize-optionSize)*itemCount/2);
				}
				return additionalPosition;
			},
			/**
			 * Make base data for making bound.
			 * @param {number} baseGroupSize base group size
			 * @param {number} baseBarSize base bar size
			 * @returns {undefined|{
	     *      baseBarSize: number,
	     *      groupSize: number,
	     *      barSize: number,
	     *      pointInterval: number,
	     *      firstAdditionalPosition: number,
	     *      basePosition: number
	     * }}
			 * @private
			 */
			_makeBaseDataForMakingBound:function( baseGroupSize, baseBarSize ){
				var isStackType=predicate.isValidStackOption(this.options.stackType);
				var seriesDataModel=this._getSeriesDataModel();
				var groupSize=baseGroupSize/seriesDataModel.getGroupCount();
				var itemCount, barSize, optionSize, basePosition, pointInterval, baseBounds;
				if( seriesDataModel.rawSeriesData.length > 0 ){
					if( !isStackType ){
						itemCount=seriesDataModel.getFirstSeriesGroup().getSeriesItemCount();
					}else{
						itemCount=this.options.diverging ? 1 : this.dataProcessor.getStackCount(this.seriesName);
					}
					pointInterval=groupSize/(itemCount+1);
					barSize=pointInterval*DEFAULT_BAR_SIZE_RATIO_BY_POINT_INTERVAL;
					optionSize=this.options.barWidth;
					barSize=this._getBarWidthOptionSize(pointInterval, optionSize) || barSize;
					basePosition=this._getLimitDistanceFromZeroPoint(baseBarSize, this.limit).toMin;
					if( predicate.isColumnChart(this.chartType) ){
						basePosition=baseBarSize-basePosition;
					}
					baseBounds={
						baseBarSize:baseBarSize,
						groupSize:groupSize,
						barSize:barSize,
						pointInterval:pointInterval,
						firstAdditionalPosition:pointInterval,
						basePosition:basePosition
					};
				}
				return baseBounds;
			},
			/**
			 * Render normal series label.
			 * @param {HTMLElement} labelContainer series label area element
			 * @private
			 */
			_renderNormalSeriesLabel:function( labelContainer ){
				var sdm=this._getSeriesDataModel();
				var boundsSet=this.seriesData.groupBounds;
				var labelTheme=this.theme.label;
				var selectedIndex=this.selectedLegendIndex;
				var positionsSet, html;
				if( predicate.isBarChart(this.chartType) ){
					positionsSet=labelHelper.boundsToLabelPositionsForBarChart(sdm, boundsSet, labelTheme);
				}else{
					positionsSet=labelHelper.boundsToLabelPositionsForColumnChart(sdm, boundsSet, labelTheme);
				}
				html=labelHelper.makeLabelsHtmlForBoundType(sdm, positionsSet, labelTheme, selectedIndex);
				labelContainer.innerHTML=html;
			},
			/**
			 * Make sum values.
			 * @param {Array.<number>} values values
			 * @returns {number} sum result.
			 */
			_makeSumValues:function( values ){
				var sum=calculator.sum(values);
				return renderUtil.formatValue(sum, this.dataProcessor.getFormatFunctions(), this.chartType, 'seires');
			},
			/**
			 * Make stackType label position.
			 * @param {{width: number, height: number, left: number, top: number}} bound element bound
			 * @param {string} label label
			 * @param {number} labelHeight label height
			 * @returns {{left: number, top: number}} position
			 * @private
			 */
			_makeStackedLabelPosition:function( bound, label, labelHeight ){
				var labelWidth=renderUtil.getRenderedLabelWidth(label, this.theme.label),
					left=bound.left+((bound.width-labelWidth+chartConst.TEXT_PADDING)/2),
					top=bound.top+((bound.height-labelHeight+chartConst.TEXT_PADDING)/2);
				return {
					left:left,
					top:top
				};
			},
			/**
			 * Make labels html, when has stackType option.
			 * @param {object} params parameters
			 *      @param {number} params.groupIndex group index
			 *      @param {Array.<object>} params.bounds bounds,
			 *      @param {number} params.labelHeight label height
			 * @returns {string} labels html
			 * @private
			 */
			_makeStackedLabelsHtml:function( params ){
				var positiveBound, negativeBound, values;
				var self=this;
				var seriesGroup=params.seriesGroup;
				var labelHeight=params.labelHeight;
				var htmls=seriesGroup.map(function( seriesItem, index ){
					var bound=params.bounds[index];
					var labelHtml='';
					var boundEnd, position;
					if( bound && seriesItem ){
						boundEnd=bound.end;
						position=self._makeStackedLabelPosition(boundEnd, seriesItem.label, params.labelHeight);
						labelHtml=self._makeSeriesLabelHtml(position, seriesItem.label, index);
					}
					if( seriesItem.value > 0 ){
						positiveBound=boundEnd;
					}else if( seriesItem.value < 0 ){
						negativeBound=boundEnd;
					}
					return labelHtml;
				});
				if( predicate.isNormalStack(this.options.stackType) ){
					values=seriesGroup.pluck('value');
					htmls.push(this._makePlusSumLabelHtml(values, positiveBound, labelHeight));
					htmls.push(this._makeMinusSumLabelHtml(values, negativeBound, labelHeight));
				}
				return htmls.join('');
			},
			/**
			 * Render series label, when has stackType option.
			 * @param {HTMLElement} elSeriesLabelArea series label area element
			 * @private
			 */
			_renderStackedSeriesLabel:function( elSeriesLabelArea ){
				var self=this;
				var groupBounds=this.seriesData.groupBounds;
				var seriesDataModel=this._getSeriesDataModel();
				var labelHeight=renderUtil.getRenderedLabelHeight(chartConst.MAX_HEIGHT_WORLD, this.theme.label);
				var stackLabelHtml=seriesDataModel.map(function( seriesGroup, index ){
					var labelsHtml=self._makeStackedLabelsHtml({
						groupIndex:index,
						seriesGroup:seriesGroup,
						bounds:groupBounds[index],
						labelHeight:labelHeight
					});
					return labelsHtml;
				}).join('');
				elSeriesLabelArea.innerHTML=stackLabelHtml;
			},
			/**
			 * Render series label.
			 * @param {HTMLElement} labelContainer series label area element
			 * @private
			 */
			_renderSeriesLabel:function( labelContainer ){
				if( this.options.stackType ){
					this._renderStackedSeriesLabel(labelContainer);
				}else{
					this._renderNormalSeriesLabel(labelContainer);
				}
			}
		});
		BarTypeSeriesBase.mixin=function( func ){
			tui.util.extend(func.prototype, BarTypeSeriesBase.prototype);
		};
		module.exports=BarTypeSeriesBase;
		/***/
	},
	/* 60 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Column chart series component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56);
		var BarTypeSeriesBase=__webpack_require__(59);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		var calculator=__webpack_require__(22);
		var ColumnChartSeries=tui.util.defineClass(Series, /** @lends ColumnChartSeries.prototype */ {
			/**
			 * Column chart series component.
			 * @constructs ColumnChartSeries
			 * @private
			 * @extends Series
			 * @param {object} params parameters
			 *      @param {object} params.model series model
			 *      @param {object} params.options series options
			 *      @param {object} params.theme series theme
			 */
			init:function(){
				Series.apply(this, arguments);
			},
			/**
			 * Make bound of column chart.
			 * @param {number} width width
			 * @param {number} height height
			 * @param {number} left top position value
			 * @param {number} startTop start top position value
			 * @param {number} endTop end top position value
			 * @returns {{
	     *      start: {left: number, top: number, width: number, height: number},
	     *      end: {left: number, top: number, width: number, height: number}
	     * }} column chart bound
			 * @private
			 */
			_makeBound:function( width, height, left, startTop, endTop ){
				return {
					start:{
						top:startTop,
						left:left,
						width:width,
						height:0
					},
					end:{
						top:endTop,
						left:left,
						width:width,
						height:height
					}
				};
			},
			/**
			 * Make column chart bound.
			 * @param {{
	     *      baseBarSize: number,
	     *      groupSize: number,
	     *      barSize: number,
	     *      pointInterval: number,
	     *      firstAdditionalPosition: number,
	     *      basePosition: number
	     * }} baseData base data for making bound
			 * @param {{
	     *      baseLeft: number,
	     *      left: number,
	     *      plusTop: number,
	     *      minusTop: number,
	     *      prevStack: ?string
	     * }} iterationData iteration data
			 * @param {?boolean} isStackType whether stackType option or not.
			 * @param {SeriesItem} seriesItem series item
			 * @param {number} index index
			 * @returns {{
	     *      start: {left: number, top: number, width: number, height: number},
	     *      end: {left: number, top: number, width: number, height: number}
	     * }}
			 * @private
			 */
			_makeColumnChartBound:function( baseData, iterationData, isStackType, seriesItem, index ){
				var barHeight=Math.abs(baseData.baseBarSize*seriesItem.ratioDistance);
				var barStartTop=baseData.baseBarSize*seriesItem.startRatio;
				var startTop=baseData.basePosition-barStartTop+chartConst.SERIES_EXPAND_SIZE;
				var changedStack=(seriesItem.stack!==iterationData.prevStack);
				var pointCount, endTop, bound, boundLeft;
				if( !isStackType || (!this.options.diverging && changedStack) ){
					pointCount=isStackType ? this.dataProcessor.findStackIndex(seriesItem.stack) : index;
					iterationData.left=iterationData.baseLeft+(baseData.pointInterval*pointCount);
					iterationData.plusTop=0;
					iterationData.minusTop=0;
				}
				if( seriesItem.value >= 0 ){
					iterationData.plusTop-=barHeight;
					endTop=startTop+iterationData.plusTop;
				}else{
					endTop=startTop+iterationData.minusTop;
					iterationData.minusTop+=barHeight;
				}
				iterationData.prevStack=seriesItem.stack;
				boundLeft=iterationData.left+baseData.pointInterval-(baseData.barSize/2);
				bound=this._makeBound(baseData.barSize, barHeight, boundLeft, startTop, endTop);
				return bound;
			},
			/**
			 * Make bounds of column chart.
			 * @returns {Array.<Array.<object>>} bounds
			 * @private
			 */
			_makeBounds:function(){
				var self=this;
				var seriesDataModel=this._getSeriesDataModel();
				var isStackType=predicate.isValidStackOption(this.options.stackType);
				var dimension=this.layout.dimension;
				var baseData=this._makeBaseDataForMakingBound(dimension.width, dimension.height);
				return seriesDataModel.map(function( seriesGroup, groupIndex ){
					var baseLeft=(groupIndex*baseData.groupSize)+chartConst.SERIES_EXPAND_SIZE;
					var iterationData={
						baseLeft:baseLeft,
						left:baseLeft,
						plusTop:0,
						minusTop:0,
						prevStack:null
					};
					var iteratee=tui.util.bind(self._makeColumnChartBound, self, baseData, iterationData, isStackType);
					return seriesGroup.map(iteratee);
				});
			},
			/**
			 * Calculate left position of sum label.
			 * @param {{left: number, top: number}} bound bound
			 * @param {string} formattedSum formatted sum.
			 * @returns {number} left position value
			 * @private
			 */
			_calculateLeftPositionOfSumLabel:function( bound, formattedSum ){
				var labelWidth=renderUtil.getRenderedLabelWidth(formattedSum, this.theme.label);
				return bound.left+((bound.width-labelWidth+chartConst.TEXT_PADDING)/2);
			},
			/**
			 * Make plus sum label html.
			 * @param {Array.<number>} values values
			 * @param {{left: number, top: number}} bound bound
			 * @param {number} labelHeight label height
			 * @returns {string} plus sum label html
			 * @private
			 */
			_makePlusSumLabelHtml:function( values, bound, labelHeight ){
				var html='';
				var sum, formatFunctions, formattedSum;
				if( bound ){
					sum=calculator.sumPlusValues(values);
					formatFunctions=this.dataProcessor.getFormatFunctions();
					formattedSum=renderUtil.formatValue(sum, formatFunctions, this.chartType, 'series');
					html=this._makeSeriesLabelHtml({
						left:this._calculateLeftPositionOfSumLabel(bound, formattedSum),
						top:bound.top-labelHeight-chartConst.SERIES_LABEL_PADDING
					}, formattedSum, -1);
				}
				return html;
			},
			/**
			 * Make minus sum label html.
			 * @param {Array.<number>} values values
			 * @param {{left: number, top: number}} bound bound
			 * @returns {string} plus minus label html
			 * @private
			 */
			_makeMinusSumLabelHtml:function( values, bound ){
				var html='';
				var sum, formatFunctions, formattedSum;
				if( bound ){
					sum=calculator.sumMinusValues(values);
					if( this.options.diverging ){
						sum=Math.abs(sum);
					}
					formatFunctions=this.dataProcessor.getFormatFunctions();
					formattedSum=renderUtil.formatValue(sum, formatFunctions, this.chartType, 'series');
					html=this._makeSeriesLabelHtml({
						left:this._calculateLeftPositionOfSumLabel(bound, formattedSum),
						top:bound.top+bound.height+chartConst.SERIES_LABEL_PADDING
					}, formattedSum, -1);
				}
				return html;
			},
			/**
			 * Render series component.
			 * @param {object} data data for rendering
			 * @returns {HTMLElement} series element
			 * @override
			 */
			render:function( data ){
				var result;
				delete data.paper;
				result=Series.prototype.render.call(this, data);
				delete result.paper;
				return result;
			}
		});
		BarTypeSeriesBase.mixin(ColumnChartSeries);
		module.exports=ColumnChartSeries;
		/***/
	},
	/* 61 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Line chart series component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56),
			LineTypeSeriesBase=__webpack_require__(62);
		var LineChartSeries=tui.util.defineClass(Series, /** @lends LineChartSeries.prototype */ {
			/**
			 * Line chart series component.
			 * @constructs LineChartSeries
			 * @private
			 * @extends Series
			 * @mixes LineTypeSeriesBase
			 * @param {object} params parameters
			 *      @param {object} params.model series model
			 *      @param {object} params.options series options
			 *      @param {object} params.theme series theme
			 */
			init:function(){
				Series.apply(this, arguments);
				/**
				 * object for requestAnimationFrame
				 * @type {null | {id: number}}
				 */
				this.movingAnimation=null;
			},
			/**
			 * Make positions for rendering graph and sending to mouse event detector.
			 * @param {number} [seriesWidth] - series width
			 * @returns {Array.<Array.<{left: number, top: number}>>} positions
			 * @private
			 */
			_makePositions:function( seriesWidth ){
				return this._makeBasicPositions(seriesWidth);
			},
			/**
			 * Make series data for rendering graph and sending to mouse event detector.
			 * @returns {object} series data
			 * @private
			 * @override
			 */
			_makeSeriesData:function(){
				var groupPositions=this._makePositions();
				return {
					chartBackground:this.chartBackground,
					groupPositions:groupPositions,
					isAvailable:function(){
						return groupPositions && groupPositions.length > 0;
					}
				};
			},
			/**
			 * Rerender.
			 * @param {object} data - data for rerendering
			 * @override
			 */
			rerender:function( data ){
				var paper;
				this._cancelMovingAnimation();
				paper=Series.prototype.rerender.call(this, data);
				return paper;
			}
		});
		LineTypeSeriesBase.mixin(LineChartSeries);
		module.exports=LineChartSeries;
		/***/
	},
	/* 62 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview LineTypeSeriesBase is base class for line type series.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var seriesTemplate=__webpack_require__(58);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var concat=Array.prototype.concat;
		/**
		 * @classdesc LineTypeSeriesBase is base class for line type series.
		 * @class LineTypeSeriesBase
		 * @private
		 * @mixin
		 * @private */
		var LineTypeSeriesBase=tui.util.defineClass(/** @lends LineTypeSeriesBase.prototype */ {
			/**
			 * Make positions for default data type.
			 * @param {?number} seriesWidth - width of series area
			 * @returns {Array.<Array.<object>>}
			 * @private
			 */
			_makePositionsForDefaultType:function( seriesWidth ){
				var dimension=this.layout.dimension;
				var seriesDataModel=this._getSeriesDataModel();
				var width=seriesWidth || dimension.width || 0;
				var height=dimension.height;
				var len=seriesDataModel.getGroupCount();
				var start=chartConst.SERIES_EXPAND_SIZE;
				var step;
				if( this.aligned ){
					step=width/(len-1);
				}else{
					step=width/len;
					start+=(step/2);
				}
				return seriesDataModel.map(function( seriesGroup ){
					return seriesGroup.map(function( seriesItem, index ){
						var position;
						if( !tui.util.isNull(seriesItem.end) ){
							position={
								left:start+(step*index),
								top:height-(seriesItem.ratio*height)+chartConst.SERIES_EXPAND_SIZE
							};
							if( tui.util.isExisty(seriesItem.startRatio) ){
								position.startTop=height-(seriesItem.startRatio*height)+chartConst.SERIES_EXPAND_SIZE;
							}
						}
						return position;
					});
				}, true);
			},
			/**
			 * Make positions for coordinate data type.
			 * @param {?number} seriesWidth - width of series area
			 * @returns {Array.<Array.<object>>}
			 * @private
			 */
			_makePositionForCoordinateType:function( seriesWidth ){
				var dimension=this.layout.dimension;
				var seriesDataModel=this._getSeriesDataModel();
				var width=seriesWidth || dimension.width || 0;
				var height=dimension.height;
				var xAxis=this.axisDataMap.xAxis;
				var additionalLeft=0;
				if( xAxis.sizeRatio ){
					additionalLeft=calculator.multiply(width, xAxis.positionRatio);
					width=calculator.multiply(width, xAxis.sizeRatio);
				}
				return seriesDataModel.map(function( seriesGroup ){
					return seriesGroup.map(function( seriesItem ){
						var position;
						if( !tui.util.isNull(seriesItem.end) ){
							position={
								left:(seriesItem.ratioMap.x*width)+additionalLeft+chartConst.SERIES_EXPAND_SIZE,
								top:height-(seriesItem.ratioMap.y*height)+chartConst.SERIES_EXPAND_SIZE
							};
							if( tui.util.isExisty(seriesItem.ratioMap.start) ){
								position.startTop=
									height-(seriesItem.ratioMap.start*height)+chartConst.SERIES_EXPAND_SIZE;
							}
						}
						return position;
					});
				}, true);
			},
			/**
			 * Make basic positions for rendering line graph.
			 * @param {?number} seriesWidth - width of series area
			 * @returns {Array.<Array.<object>>}
			 * @private
			 */
			_makeBasicPositions:function( seriesWidth ){
				var positions;
				if( this.dataProcessor.isCoordinateType() ){
					positions=this._makePositionForCoordinateType(seriesWidth);
				}else{
					positions=this._makePositionsForDefaultType(seriesWidth);
				}
				return positions;
			},
			/**
			 * Calculate label position top.
			 * @param {{top: number, startTop: number}} basePosition - base position
			 * @param {number} value - value of seriesItem
			 * @param {number} labelHeight - label height
			 * @param {boolean} isStart - whether start value of seriesItem or not
			 * @returns {number} position top
			 * @private
			 */
			_calculateLabelPositionTop:function( basePosition, value, labelHeight, isStart ){
				var baseTop=basePosition.top,
					top;
				if( predicate.isValidStackOption(this.options.stackType) ){
					top=((basePosition.startTop+baseTop-labelHeight)/2)+1;
				}else if( (value >= 0 && !isStart) || (value < 0 && isStart) ){
					top=baseTop-labelHeight-chartConst.SERIES_LABEL_PADDING;
				}else{
					top=baseTop+chartConst.SERIES_LABEL_PADDING;
				}
				return top;
			},
			/**
			 * Make label position for rendering label of series area.
			 * @param {{left: number, top: number, startTop: ?number}} basePosition - base position for calculating
			 * @param {number} labelHeight - label height
			 * @param {(string | number)} label - label of seriesItem
			 * @param {number} value - value of seriesItem
			 * @param {boolean} isStart - whether start label position or not
			 * @returns {{left: number, top: number}}
			 * @private
			 */
			_makeLabelPosition:function( basePosition, labelHeight, label, value, isStart ){
				var labelWidth=renderUtil.getRenderedLabelWidth(label, this.theme.label);
				var dimension=this.dimensionMap.extendedSeries;
				return {
					left:(basePosition.left-(labelWidth/2))/dimension.width*100,
					top:this._calculateLabelPositionTop(basePosition, value, labelHeight, isStart)/dimension.height*100
				};
			},
			/**
			 * Make html for series label for line type chart.
			 * @param {number} groupIndex - index of seriesDataModel.groups
			 * @param {number} index - index of seriesGroup.items
			 * @param {SeriesItem} seriesItem - series item
			 * @param {number} labelHeight - label height
			 * @param {boolean} isStart - whether start label position or not
			 * @returns {string}
			 * @private
			 */
			_makeSeriesLabelHtmlForLineType:function( groupIndex, index, seriesItem, labelHeight, isStart ){
				var basePosition=tui.util.extend({}, this.seriesData.groupPositions[groupIndex][index]),
					label, position;
				if( isStart ){
					label=seriesItem.startLabel;
					basePosition.top=basePosition.startTop;
				}else{
					label=seriesItem.endLabel || seriesItem.label;
				}
				position=this._makeLabelPosition(basePosition, labelHeight, label, seriesItem.value || seriesItem.y, isStart);
				return this._makeSeriesLabelHtml(position, label, groupIndex, seriesTemplate.tplCssTextForLineType, isStart);
			},
			/**
			 * Render series label.
			 * @param {HTMLElement} elSeriesLabelArea series label area element
			 * @private
			 */
			_renderSeriesLabel:function( elSeriesLabelArea ){
				var self=this;
				var seriesDataModel=this._getSeriesDataModel();
				var firstLabel=seriesDataModel.getFirstItemLabel();
				var labelHeight=renderUtil.getRenderedLabelHeight(firstLabel, this.theme.label);
				var htmls=seriesDataModel.map(function( seriesGroup, groupIndex ){
					return seriesGroup.map(function( seriesItem, index ){
						var labelHtml=self._makeSeriesLabelHtmlForLineType(groupIndex, index, seriesItem, labelHeight);
						if( seriesItem.isRange ){
							labelHtml+=self._makeSeriesLabelHtmlForLineType(groupIndex, index, seriesItem, labelHeight, true);
						}
						return labelHtml;
					}).join('');
				}, true);
				elSeriesLabelArea.innerHTML=htmls.join('');
			},
			/**
			 * To call showGroupTooltipLine function of graphRenderer.
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }} bound bound
			 */
			onShowGroupTooltipLine:function( bound ){
				if( !this.graphRenderer.showGroupTooltipLine ){
					return;
				}
				this.graphRenderer.showGroupTooltipLine(bound);
			},
			/**
			 * To call hideGroupTooltipLine function of graphRenderer.
			 */
			onHideGroupTooltipLine:function(){
				if( !this.seriesData.length
					|| !this.seriesData.isAvailable()
					|| !this.graphRenderer.hideGroupTooltipLine
				){
					return;
				}
				this.graphRenderer.hideGroupTooltipLine();
			},
			/**
			 * Zoom by mouse drag.
			 * @param {object} data - data
			 * @returns {{container: HTMLElement, paper: object}}
			 */
			zoom:function( data ){
				var paper;
				this._cancelMovingAnimation();
				this._clearSeriesContainer(data.paper);
				this._setDataForRendering(data);
				paper=this._renderSeriesArea(this.seriesContainer, data.paper, tui.util.bind(this._renderGraph, this));
				this._showGraphWithoutAnimation();
				if( !tui.util.isNull(this.selectedLegendIndex) ){
					this.graphRenderer.selectLegend(this.selectedLegendIndex);
				}
				return {
					container:this.seriesContainer,
					paper:paper
				};
			},
			/**
			 * Whether changed or not.
			 * @param {{min: number, max: number}} before - before limit
			 * @param {{min: number, max: number}} after - after limit
			 * @returns {boolean}
			 * @private
			 */
			_isChangedLimit:function( before, after ){
				return before.min!==after.min || before.max!==after.max;
			},
			/**
			 * Whether changed axis limit(min, max) or not.
			 * @returns {boolean}
			 * @private
			 */
			_isChangedAxisLimit:function(){
				var beforeAxisDataMap=this.beforeAxisDataMap;
				var axisDataMap=this.axisDataMap;
				var changed=true;
				if( beforeAxisDataMap ){
					changed=this._isChangedLimit(beforeAxisDataMap.yAxis.limit, axisDataMap.yAxis.limit);
					if( axisDataMap.xAxis.limit ){
						changed=changed || this._isChangedLimit(beforeAxisDataMap.xAxis.limit, axisDataMap.xAxis.limit);
					}
				}
				this.beforeAxisDataMap=axisDataMap;
				return changed;
			},
			/**
			 * Animate for motion of series area.
			 * @param {function} callback - callback function
			 * @private
			 */
			_animate:function( callback ){
				var self=this;
				var duration=chartConst.ADDING_DATA_ANIMATION_DURATION;
				var changedLimit=this._isChangedAxisLimit();
				if( changedLimit && this.seriesLabelContainer ){
					this.seriesLabelContainer.innerHTML='';
				}
				if( !callback ){
					return;
				}
				this.movingAnimation=renderUtil.startAnimation(duration, callback, function(){
					self.movingAnimation=null;
				});
			},
			/**
			 * Pick first label elements.
			 * @returns {Array.<HTMLElement>}
			 * @private
			 */
			_pickFirstLabelElements:function(){
				var itemCount=this.dataProcessor.getCategoryCount();
				var seriesLabelContainer=this.seriesLabelContainer;
				var labelElements=seriesLabelContainer.childNodes;
				var filteredElements=[];
				var firstLabelElements;
				tui.util.forEachArray(labelElements, function( element ){
					if( !element.getAttribute('data-range') ){
						filteredElements.push(element);
					}
				});
				filteredElements=tui.util.filter(filteredElements, function( element, index ){
					return ((parseInt(index, 10)+1)%itemCount)===1;
				});
				firstLabelElements=tui.util.map(filteredElements, function( element ){
					var nextElement=element.nextSibling;
					var elements=[element];
					if( nextElement && nextElement.getAttribute('data-range') ){
						elements.push(nextElement);
					}
					return elements;
				});
				return concat.apply([], firstLabelElements);
			},
			/**
			 * Hide first labels.
			 * @private
			 */
			_hideFirstLabels:function(){
				var seriesLabelContainer=this.seriesLabelContainer;
				var firsLabelElements;
				if( !seriesLabelContainer ){
					return;
				}
				firsLabelElements=this._pickFirstLabelElements();
				tui.util.forEachArray(firsLabelElements, function( element ){
					seriesLabelContainer.removeChild(element);
				});
			},
			/**
			 * Animate for moving of graph container.
			 * @param {number} interval - interval for moving
			 * @private
			 */
			_animateForMoving:function( interval ){
				var graphRenderer=this.graphRenderer;
				var childrenForMoving=this.seriesContainer.childNodes;
				var areaWidth=this.dimensionMap.extendedSeries.width;
				var beforeLeft=0;
				this._hideFirstLabels();
				if( childrenForMoving.length ){
					beforeLeft=parseInt(childrenForMoving[0].style.left, 10) || 0;
				}
				this._animate(function( ratio ){
					var left=interval*ratio;
					tui.util.forEachArray(childrenForMoving, function( child ){
						child.style.left=(beforeLeft-left)+'px';
					});
					graphRenderer.setSize(areaWidth+left);
				});
			},
			/**
			 * Animate for resizing of label container.
			 * @param {number} interval - interval for stacking
			 * @private
			 */
			_animateForResizing:function( interval ){
				var seriesLabelContainer=this.seriesLabelContainer;
				var animateLabel, areaWidth;
				if( !seriesLabelContainer ){
					return;
				}
				areaWidth=this.dimensionMap.extendedSeries.width;
				if( !this.dataProcessor.isCoordinateType() ){
					animateLabel=function( ratio ){
						var left=interval*ratio;
						seriesLabelContainer.style.width=(areaWidth-left)+'px';
					};
				}
				this._animate(animateLabel);
			},
			/**
			 * Make top of zero point for adding data.
			 * @returns {number}
			 * @private
			 * @override
			 */
			_makeZeroTopForAddingData:function(){
				var seriesHeight=this.layout.dimension.height;
				var limit=this.axisDataMap.yAxis.limit;
				return this._getLimitDistanceFromZeroPoint(seriesHeight, limit).toMax+chartConst.SERIES_EXPAND_SIZE;
			},
			/**
			 * Animate for adding data.
			 * @param {{tickSize: number}} data - parameters for adding data.
			 */
			animateForAddingData:function( data ){
				var dimension=this.dimensionMap.extendedSeries;
				var seriesWidth=this.layout.dimension.width;
				var tickSize=data.tickSize;
				var shiftingOption=this.options.shifting;
				var seriesData, paramsForRendering, groupPositions, zeroTop;
				this.limit=data.limitMap[this.chartType];
				this.axisDataMap=data.axisDataMap;
				seriesData=this._makeSeriesData();
				paramsForRendering=this._makeParamsForGraphRendering(dimension, seriesData);
				if( shiftingOption ){
					seriesWidth+=tickSize;
				}
				groupPositions=this._makePositions(seriesWidth);
				zeroTop=this._makeZeroTopForAddingData();
				this.graphRenderer.animateForAddingData(paramsForRendering, tickSize, groupPositions, shiftingOption, zeroTop);
				if( shiftingOption ){
					this._animateForMoving(tickSize);
				}else{
					this._animateForResizing(tickSize);
				}
			},
			/**
			 * Cancel moving animation.
			 * @private
			 */
			_cancelMovingAnimation:function(){
				if( this.movingAnimation ){
					cancelAnimationFrame(this.movingAnimation.id);
					this.movingAnimation=null;
				}
			}
		});
		LineTypeSeriesBase.mixin=function( func ){
			tui.util.extend(func.prototype, LineTypeSeriesBase.prototype);
		};
		module.exports=LineTypeSeriesBase;
		/***/
	},
	/* 63 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Radial chart series component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56);
		var chartConst=__webpack_require__(2);
		var geom=__webpack_require__(29);
		var RadialChartSeries=tui.util.defineClass(Series, /** @lends RadialChartSeries.prototype */ {
			/**
			 * Line chart series component.
			 * @constructs RadialChartSeries
			 * @private
			 * @extends Series
			 * @param {object} params parameters
			 *      @param {object} params.model series model
			 *      @param {object} params.options series options
			 *      @param {object} params.theme series theme
			 */
			init:function(){
				Series.apply(this, arguments);
				this.options=tui.util.extend({
					showDot:true,
					showArea:true
				}, this.options);
				/**
				 * object for requestAnimationFrame
				 * @type {null | {id: number}}
				 */
				this.movingAnimation=null;
			},
			/**
			 * Make positions data for radial series
			 * @param {Array.<Array>} seriesGroups series data per category
			 * @param {number} groupCount category count
			 * @returns {Array.<Array.<object>>}
			 * @private
			 */
			_makePositionsForRadial:function( seriesGroups, groupCount ){
				var dimension=this.layout.dimension;
				var width=dimension.width-chartConst.RADIAL_PLOT_PADDING-chartConst.RADIAL_MARGIN_FOR_CATEGORY;
				var height=dimension.height-chartConst.RADIAL_PLOT_PADDING-chartConst.RADIAL_MARGIN_FOR_CATEGORY;
				var centerX=(width/2)+(chartConst.RADIAL_PLOT_PADDING/2)+(chartConst.RADIAL_MARGIN_FOR_CATEGORY/2);
				var centerY=(height/2)-(chartConst.RADIAL_PLOT_PADDING/2)-(chartConst.RADIAL_MARGIN_FOR_CATEGORY/2);
				var stepAngle=360/groupCount;
				var radius;
				radius=Math.min(width, height)/2;
				return tui.util.map(seriesGroups, function( seriesGroup ){
					var positions=tui.util.map(seriesGroup, function( seriesItem, index ){
						var position, y, angle, point, valueSize;
						if( !tui.util.isNull(seriesItem.end) ){
							valueSize=seriesItem.ratio*radius;
							// centerY에 데이터의 값에 해당하는 높이만큼 더 해서 실제 좌표Y를 만든다.
							y=centerY+valueSize;
							// 각도를 시계 방향으로 바꿈
							angle=360-(stepAngle*index);
							point=geom.rotatePointAroundOrigin(centerX, centerY, centerX, y, angle);
							position={
								left:point.x,
								top:height-point.y // y좌표를 top좌표로 변환(4/4분면)
							};
						}
						return position;
					});
					positions.push(positions[0]);
					return positions;
				}, true);
			},
			/**
			 * Get pivoted seriesGroups
			 * @returns {Array.<Array>} series group
			 * @private
			 */
			_getSeriesGroups:function(){
				var seriesDataModel=this._getSeriesDataModel();
				return seriesDataModel.map(function( group ){
					return group.map(function( item ){
						return item;
					});
				}, true);
			},
			/**
			 * Make series data for rendering graph and sending to mouse event detector.
			 * @returns {object} series data
			 * @private
			 * @override
			 */
			_makeSeriesData:function(){
				var groups=this._getSeriesGroups();
				var groupPositions=this._makePositionsForRadial(groups, this._getSeriesDataModel().getGroupCount());
				return {
					groupPositions:groupPositions,
					isAvailable:function(){
						return groupPositions && groupPositions.length > 0;
					}
				};
			},
			/**
			 * Rerender.
			 * @param {object} data - data for rerendering
			 * @returns {Raphael.Paper} raphael paper
			 * @override
			 */
			rerender:function( data ){
				return Series.prototype.rerender.call(this, data);
			}
		});
		module.exports=RadialChartSeries;
		/***/
	},
	/* 64 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Area chart series component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56);
		var LineTypeSeriesBase=__webpack_require__(62);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var AreaChartSeries=tui.util.defineClass(Series, /** @lends AreaChartSeries.prototype */ {
			/**
			 * Area chart series component.
			 * @constructs AreaChartSeries
			 * @private
			 * @extends Series
			 * @mixes LineTypeSeriesBase
			 */
			init:function(){
				Series.apply(this, arguments);
				/**
				 * object for requestAnimationFrame
				 * @type {null | {id: number}}
				 */
				this.movingAnimation=null;
			},
			/**
			 * Make position top of zero point.
			 * @returns {number} position top
			 * @private
			 */
			_makePositionTopOfZeroPoint:function(){
				var dimension=this.layout.dimension;
				var limit=this.axisDataMap.yAxis.limit;
				var top=this._getLimitDistanceFromZeroPoint(dimension.height, limit).toMax;
				if( limit.min >= 0 && !top ){
					top=dimension.height;
				}
				return top+chartConst.SERIES_EXPAND_SIZE;
			},
			/**
			 * Make positions, when has stackType option.
			 * @param {Array.<Array.<{left: number, top: number}>>} groupPositions group positions
			 * @returns {Array.<Array.<{left: number, top: number, startTop: number}>>} stackType positions
			 * @private
			 */
			_makeStackedPositions:function( groupPositions ){
				var height=this.layout.dimension.height+chartConst.SERIES_EXPAND_SIZE,
					firstStartTop=this._makePositionTopOfZeroPoint(),
					prevPositionTops=[];
				return tui.util.map(groupPositions, function( positions ){
					return tui.util.map(positions, function( position, index ){
						var prevTop=prevPositionTops[index] || firstStartTop;
						var positionTop=position ? position.top : 0;
						var stackedHeight=height-positionTop;
						var top=position ? prevTop-stackedHeight : prevTop;
						if( position ){
							position.startTop=prevTop;
							position.top=top;
						}
						prevPositionTops[index]=top;
						return position;
					});
				});
			},
			/**
			 * Make series positions.
			 * @param {number} seriesWidth - width of series area
			 * @returns {Array.<Array.<{left: number, top: number, startTop: number}>>} stackType positions
			 * @private
			 */
			_makePositions:function( seriesWidth ){
				var groupPositions=this._makeBasicPositions(seriesWidth);
				if( predicate.isValidStackOption(this.options.stackType) ){
					groupPositions=this._makeStackedPositions(groupPositions);
				}
				return groupPositions;
			},
			/**
			 * Make series data.
			 * @returns {object} series data
			 * @private
			 * @override
			 */
			_makeSeriesData:function(){
				var dimension=this.layout.dimension;
				var zeroTop=this._getLimitDistanceFromZeroPoint(dimension.height, this.limit).toMax;
				var groupPositions=this._makePositions();
				return {
					chartBackground:this.chartBackground,
					groupPositions:groupPositions,
					hasRangeData:this._getSeriesDataModel().hasRangeData(),
					zeroTop:zeroTop+chartConst.SERIES_EXPAND_SIZE,
					isAvailable:function(){
						return groupPositions && groupPositions.length > 0;
					}
				};
			},
			/**
			 * Rerender.
			 * @param {object} data - data for rerendering
			 * @override
			 */
			rerender:function( data ){
				var paper;
				this._cancelMovingAnimation();
				paper=Series.prototype.rerender.call(this, data);
				return paper;
			}
		});
		LineTypeSeriesBase.mixin(AreaChartSeries);
		module.exports=AreaChartSeries;
		/***/
	},
	/* 65 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Bubble chart series component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var Series=__webpack_require__(56);
		var CoordinateTypeSeriesBase=__webpack_require__(66);
		var BubbleChartSeries=tui.util.defineClass(Series, /** @lends BubbleChartSeries.prototype */ {
			/**
			 * Bubble chart series component.
			 * @constructs BubbleChartSeries
			 * @private
			 * @extends Series
			 */
			init:function(){
				/**
				 * previous clicked index.
				 * @type {?number}
				 */
				this.prevClickedIndex=null;
				/**
				 * max radius for rendering circle graph
				 * @type {null|number}
				 */
				this.maxRadius=null;
				Series.apply(this, arguments);
			},
			/**
			 * Calculate step value for label axis.
			 * @returns {number}
			 * @private
			 */
			_calculateStep:function(){
				var step=0;
				var dimension, size, len;
				var hasVerticalCategory=this.dataProcessor.isXCountGreaterThanYCount(this.chartType);
				if( this.dataProcessor.hasCategories(hasVerticalCategory) ){
					dimension=this.layout.dimension;
					len=this.dataProcessor.getCategoryCount(hasVerticalCategory);
					if( hasVerticalCategory ){
						size=dimension.height;
					}else{
						size=dimension.width;
					}
					step=size/len;
				}
				return step;
			},
			/**
			 * Make bound for bubble chart.
			 * @param {{x: number, y: number, r: number}} ratioMap - ratio map
			 * @param {number} positionByStep - position value by step
			 * @param {number} maxRadius - max radius
			 * @returns {{left: number, top: number, radius: number}}
			 * @private
			 */
			_makeBound:function( ratioMap, positionByStep, maxRadius ){
				var dimension=this.layout.dimension;
				var left=tui.util.isExisty(ratioMap.x) ? (ratioMap.x*dimension.width) : positionByStep;
				var top=tui.util.isExisty(ratioMap.y) ? (ratioMap.y*dimension.height) : positionByStep;
				return {
					left:left+chartConst.SERIES_EXPAND_SIZE,
					top:dimension.height-top+chartConst.SERIES_EXPAND_SIZE,
					radius:Math.max(maxRadius*ratioMap.r, 2)
				};
			},
			/**
			 * Make bounds for bubble chart.
			 * @returns {Array.<Array.<{left: number, top: number, radius: number}>>} positions
			 * @private
			 */
			_makeBounds:function(){
				var self=this;
				var seriesDataModel=this._getSeriesDataModel();
				var maxRadius=this.maxRadius;
				var step=this._calculateStep();
				var start=step ? step/2 : 0;
				return seriesDataModel.map(function( seriesGroup, index ){
					var positionByStep=start+(step*index);
					return seriesGroup.map(function( seriesItem ){
						var hasRationMap=(seriesItem && seriesItem.ratioMap);
						return hasRationMap ? self._makeBound(seriesItem.ratioMap, positionByStep, maxRadius) : null;
					});
				});
			},
			/**
			 * Set data for rendering.
			 * @param {{
	     *      paper: ?object,
	     *      limit: {
	     *          min: number,
	     *          max: number
	     *      },
	     *      aligned: boolean,
	     *      layout: {
	     *          dimension: {width: number, height: number},
	     *          position: {left: number, top: number}
	     *      },
	     *      dimensionMap: object,
	     *      positionMap: object,
	     *      axisDataMap: object,
	     *      maxRadius: number
	     * }} data - data for rendering
			 * @private
			 */
			_setDataForRendering:function( data ){
				this.maxRadius=data.maxRadius;
				Series.prototype._setDataForRendering.call(this, data);
			}
		});
		CoordinateTypeSeriesBase.mixin(BubbleChartSeries);
		module.exports=BubbleChartSeries;
		/***/
	},
	/* 66 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview CoordinateTypeSeriesBase is base class for coordinate type series.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		
		'use strict';
		var renderUtil=__webpack_require__(23);
		var CoordinateTypeSeriesBase=tui.util.defineClass(/** @lends CoordinateTypeSeriesBase.prototype */ {
			/**
			 * Make series data.
			 * @returns {{
	     *      groupBounds: Array.<Array.<{left: number, top: number, radius: number}>>,
	     *      seriesDataModel: SeriesDataModel
	     * }} series data
			 * @private
			 * @override
			 */
			_makeSeriesData:function(){
				var groupBounds=this._makeBounds();
				return {
					groupBounds:groupBounds,
					seriesDataModel:this._getSeriesDataModel(),
					isAvailable:function(){
						return groupBounds && groupBounds.length > 0;
					}
				};
			},
			/**
			 * showTooltip is callback of mouseover event to series element.
			 * @param {object} params parameters
			 *      @param {boolean} params.allowNegativeTooltip whether allow negative tooltip or not
			 * @param {{top:number, left: number, width: number, height: number}} bound graph bound information
			 * @param {number} groupIndex group index
			 * @param {number} index index
			 * @param {{left: number, top: number}} mousePosition mouse position
			 */
			showTooltip:function( params, bound, groupIndex, index, mousePosition ){
				this.eventBus.fire('showTooltip', tui.util.extend({
					indexes:{
						groupIndex:groupIndex,
						index:index
					},
					mousePosition:mousePosition
				}, params));
			},
			/**
			 * hideTooltip is callback of mouseout event to series element.
			 */
			hideTooltip:function(){
				this.eventBus.fire('hideTooltip');
			},
			/**
			 * Render raphael graph.
			 * @param {{width: number, height: number}} dimension dimension
			 * @param {object} seriesData series data
			 * @private
			 * @override
			 */
			_renderGraph:function( dimension, seriesData ){
				var showTooltip=tui.util.bind(this.showTooltip, this, {
					chartType:this.chartType
				});
				var callbacks={
					showTooltip:showTooltip,
					hideTooltip:tui.util.bind(this.hideTooltip, this)
				};
				var params=this._makeParamsForGraphRendering(dimension, seriesData);
				this.graphRenderer.render(this.seriesContainer, params, callbacks);
			},
			/**
			 * Make html for label of series area.
			 * @param {{left: number, top: number}} basePosition - position
			 * @param {string} label - label of SeriesItem
			 * @param {number} index - index
			 * @returns {string}
			 * @private
			 */
			_makeSeriesLabelsHtml:function( basePosition, label, index ){
				var labelHeight=renderUtil.getRenderedLabelHeight(label, this.theme.label);
				var labelWidth=renderUtil.getRenderedLabelWidth(label, this.theme.label);
				var position={
					left:basePosition.left-(labelWidth/2),
					top:basePosition.top-(labelHeight/2)
				};
				return this._makeSeriesLabelHtml(position, label, index);
			},
			/**
			 * Render series label.
			 * @param {HTMLElement} labelContainer - container for label area
			 * @private
			 */
			_renderSeriesLabel:function( labelContainer ){
				var self=this;
				var seriesDataModel=this._getSeriesDataModel();
				var html=seriesDataModel.map(function( seriesGroup, groupIndex ){
					return seriesGroup.map(function( seriesItem, index ){
						var bound=self.seriesData.groupBounds[groupIndex][index];
						return seriesItem ? self._makeSeriesLabelsHtml(bound, seriesItem.label, index) : '';
					}).join('');
				}).join('');
				labelContainer.innerHTML=html;
			},
			/**
			 * If click series, showing selected state.
			 * @param {{left: number, top: number}} position - mouse position
			 */
			onClickSeries:function( position ){
				var indexes=this._executeGraphRenderer(position, 'findIndexes');
				var prevIndexes=this.prevClickedIndexes;
				var allowSelect=this.options.allowSelect;
				var shouldSelect;
				if( indexes && prevIndexes ){
					this.onUnselectSeries({
						indexes:prevIndexes
					});
					this.prevClickedIndexes=null;
				}
				if( !indexes ){
					return;
				}
				shouldSelect=!prevIndexes ||
					(indexes.index!==prevIndexes.index) || (indexes.groupIndex!==prevIndexes.groupIndex);
				if( allowSelect && !shouldSelect ){
					return;
				}
				this.onSelectSeries({
					chartType:this.chartType,
					indexes:indexes
				}, shouldSelect);
				if( allowSelect ){
					this.prevClickedIndexes=indexes;
				}
			},
			/**
			 * If mouse move series, call 'moveMouseOnSeries' of graph render.
			 * @param {{left: number, top: number}} position mouse position
			 */
			onMoveSeries:function( position ){
				this._executeGraphRenderer(position, 'moveMouseOnSeries');
			}
		});
		CoordinateTypeSeriesBase.mixin=function( func ){
			tui.util.extend(func.prototype, CoordinateTypeSeriesBase.prototype);
		};
		module.exports=CoordinateTypeSeriesBase;
		/***/
	},
	/* 67 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Scatter chart series component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56);
		var CoordinateTypeSeriesBase=__webpack_require__(66);
		var chartConst=__webpack_require__(2);
		var ScatterChartSeries=tui.util.defineClass(Series, /** @lends ScatterChartSeries.prototype */ {
			/**
			 * Scatter chart series component.
			 * @constructs ScatterChartSeries
			 * @private
			 * @extends Series
			 */
			init:function(){
				/**
				 * previous clicked index.
				 * @type {?number}
				 */
				this.prevClickedIndex=null;
				Series.apply(this, arguments);
			},
			/**
			 * Make bound for scatter chart.
			 * @param {{x: number, y: number, r: number}} ratioMap - ratio map
			 * @returns {{left: number, top: number, raius: number}}
			 * @private
			 */
			_makeBound:function( ratioMap ){
				var dimension=this.layout.dimension;
				return {
					left:(ratioMap.x*dimension.width)+chartConst.SERIES_EXPAND_SIZE,
					top:dimension.height-(ratioMap.y*dimension.height)+chartConst.SERIES_EXPAND_SIZE,
					radius:chartConst.SCATTER_RADIUS
				};
			},
			/**
			 * Make bounds for scatter chart.
			 * @returns {Array.<Array.<{left: number, top: number, radius: number}>>} positions
			 * @private
			 */
			_makeBounds:function(){
				var self=this;
				var seriesDataModel=this._getSeriesDataModel();
				return seriesDataModel.map(function( seriesGroup ){
					return seriesGroup.map(function( seriesItem ){
						var hasRatioMap=(seriesItem && seriesItem.ratioMap);
						return hasRatioMap ? self._makeBound(seriesItem.ratioMap) : null;
					});
				});
			}
		});
		CoordinateTypeSeriesBase.mixin(ScatterChartSeries);
		module.exports=ScatterChartSeries;
		/***/
	},
	/* 68 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Map chart series component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56);
		var chartConst=__webpack_require__(2);
		var dom=__webpack_require__(20);
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		var MapChartSeries=tui.util.defineClass(Series, /** @lends MapChartSeries.prototype */ {
			/**
			 * Map chart series component.
			 * @constructs MapChartSeries
			 * @private
			 * @extends Series
			 * @param {object} params parameters
			 *      @param {object} params.options series options
			 *      @param {object} params.theme series theme
			 *      @param {MapChartDataProcessor} params.dataProcessor data processor for map chart
			 */
			init:function( params ){
				/**
				 * Base position.
				 * @type {{left: number, top: number}}
				 */
				this.basePosition={
					left:0,
					top:0
				};
				/**
				 * Zoom magnification.
				 * @type {number}
				 */
				this.zoomMagn=1;
				/**
				 * Map ratio.
				 * @type {number}
				 */
				this.mapRatio=1;
				/**
				 * Graph dimension.
				 * @type {{}}
				 */
				this.graphDimension={};
				/**
				 * Limit position.
				 * @type {{}}
				 */
				this.limitPosition={};
				/**
				 * Map model.
				 * @type {MapChartMapModel}
				 */
				this.mapModel=params.mapModel;
				/**
				 * Color spectrum
				 * @type {ColorSpectrum}
				 */
				this.colorSpectrum=params.colorSpectrum;
				/**
				 * Previous mouse position.
				 * @type {?{left: number, top: number}}
				 */
				this.prevPosition=null;
				/**
				 * Previous moved index.
				 * @type {?number}
				 */
				this.prevMovedIndex=null;
				/**
				 * Whether drag or not.
				 * @type {boolean}
				 */
				this.isDrag=false;
				/**
				 * Start position.
				 * @type {?{left: number, top: number}}
				 */
				this.startPosition=null;
				Series.call(this, params);
			},
			/**
			 * Attach to event bus.
			 * @private
			 */
			_attachToEventBus:function(){
				Series.prototype._attachToEventBus.call(this);
				this.eventBus.on({
					dragStartMapSeries:this.onDragStartMapSeries,
					dragMapSeries:this.onDragMapSeries,
					dragEndMapSeries:this.onDragEndMapSeries,
					zoomMap:this.onZoomMap
				}, this);
			},
			/**
			 * Set map ratio.
			 * @private
			 */
			_setMapRatio:function(){
				var seriesDimension=this.layout.dimension;
				var mapDimension=this.mapModel.getMapDimension();
				var widthRatio=seriesDimension.width/mapDimension.width;
				var heightRatio=seriesDimension.height/mapDimension.height;
				this.mapRatio=Math.min(widthRatio, heightRatio);
			},
			/**
			 * Set graph dimension.
			 * @private
			 */
			_setGraphDimension:function(){
				var seriesDimension=this.layout.dimension;
				this.graphDimension={
					width:seriesDimension.width*this.zoomMagn,
					height:seriesDimension.height*this.zoomMagn
				};
			},
			/**
			 * Render series component.
			 * @param {object} data data for rendering
			 * @returns {HTMLElement} series element
			 */
			render:function( data ){
				var container=Series.prototype.render.call(this, data);
				this._setMapRatio();
				return container;
			},
			/**
			 * Set limit position to move map.
			 * @private
			 */
			_setLimitPositionToMoveMap:function(){
				var seriesDimension=this.layout.dimension;
				var graphDimension=this.graphDimension;
				this.limitPosition={
					left:seriesDimension.width-graphDimension.width,
					top:seriesDimension.height-graphDimension.height
				};
			},
			/**
			 * Render raphael graph.
			 * @param {{width: number, height: number}} dimension dimension
			 * @private
			 * @override
			 */
			_renderGraph:function(){
				if( !this.graphContainer ){
					this.graphContainer=dom.create('DIV', 'tui-chart-series-graph-area');
					this.seriesContainer.appendChild(this.graphContainer);
				}
				this._setGraphDimension();
				renderUtil.renderDimension(this.graphContainer, this.graphDimension);
				this._setLimitPositionToMoveMap();
				this.graphRenderer.render(this.graphContainer, {
					colorSpectrum:this.colorSpectrum,
					mapModel:this.mapModel,
					dimension:this.graphDimension,
					theme:this.theme
				});
			},
			/**
			 * Render series label.
			 * @param {HTMLElement} seriesLabelContainer series label area element
			 * @private
			 */
			_renderSeriesLabel:function( seriesLabelContainer ){
				var self=this,
					htmls=tui.util.map(this.mapModel.getLabelData(this.zoomMagn*this.mapRatio), function( datum, index ){
						var label=datum.name || datum.code,
							left=datum.labelPosition.left-(renderUtil.getRenderedLabelWidth(label, self.theme.label)/2),
							top=datum.labelPosition.top-(renderUtil.getRenderedLabelHeight(label, self.theme.label)/2);
						return self._makeSeriesLabelHtml({
							left:left,
							top:top
						}, datum.name, index);
					});
				seriesLabelContainer.innerHTML=htmls.join('');
			},
			/**
			 * Render series area.
			 * @param {HTMLElement} seriesContainer series area element
			 * @param {object} data data for rendering
			 * @param {function} funcRenderGraph function for graph rendering
			 * @private
			 */
			_renderSeriesArea:function( seriesContainer, data, funcRenderGraph ){
				Series.prototype._renderSeriesArea.call(this, seriesContainer, data, funcRenderGraph);
				if( predicate.isShowLabel(this.options) && !this.seriesLabelContainer ){
					this.graphContainer.appendChild(this.seriesLabelContainer);
				}
			},
			/**
			 * Adjust map position.
			 * @param {{left: number, top: number}} targetPosition target position
			 * @returns {{left: number, top: number}} adjusted position
			 * @private
			 */
			_adjustMapPosition:function( targetPosition ){
				return {
					left:Math.max(Math.min(targetPosition.left, 0), this.limitPosition.left),
					top:Math.max(Math.min(targetPosition.top, 0), this.limitPosition.top)
				};
			},
			/**
			 * Update base position for zoom.
			 * @param {{width: number, height: number}} prevDimension previous dimension
			 * @param {{left: number, top: number}} prevLimitPosition previous limit position
			 * @param {number} changedRatio changed ratio
			 * @private
			 */
			_updateBasePositionForZoom:function( prevDimension, prevLimitPosition, changedRatio ){
				var prevBasePosition=this.basePosition,
					prevLeft=prevBasePosition.left-(prevLimitPosition.left/2),
					prevTop=prevBasePosition.top-(prevLimitPosition.top/2),
					newBasePosition={
						left:(prevLeft*changedRatio)+(this.limitPosition.left/2),
						top:(prevTop*changedRatio)+(this.limitPosition.top/2)
					};
				this.basePosition=this._adjustMapPosition(newBasePosition);
			},
			/**
			 * Zoom.
			 * @param {number} changedRatio changed ratio
			 * @private
			 */
			_zoom:function( changedRatio ){
				var prevDimension=this.graphDimension,
					prevLimitPosition=this.limitPosition;
				this._setGraphDimension();
				renderUtil.renderDimension(this.graphContainer, this.graphDimension);
				this.graphRenderer.setSize(this.graphDimension);
				this._setLimitPositionToMoveMap();
				this._updateBasePositionForZoom(prevDimension, prevLimitPosition, changedRatio);
				renderUtil.renderPosition(this.graphContainer, this.basePosition);
				if( this.seriesLabelContainer ){
					this._renderSeriesLabel(this.seriesLabelContainer);
				}
			},
			/**
			 * Update positions to resize.
			 * @param {number} prevMapRatio previous ratio
			 * @private
			 */
			_updatePositionsToResize:function( prevMapRatio ){
				var changedRatio=this.mapRatio/prevMapRatio;
				this.basePosition.left*=changedRatio;
				this.basePosition.top*=changedRatio;
				this.limitPosition.left*=changedRatio;
				this.limitPosition.top*=changedRatio;
			},
			/**
			 * Resize graph.
			 * @private
			 */
			_resizeGraph:function(){
				var prevRatio=this.mapRatio;
				this._setMapRatio();
				this._setGraphDimension();
				renderUtil.renderDimension(this.graphContainer, this.graphDimension);
				this.graphRenderer.setSize(this.graphDimension);
				this._updatePositionsForResizing(prevRatio);
				renderUtil.renderPosition(this.graphContainer, this.basePosition);
				if( this.seriesLabelContainer ){
					this._renderSeriesLabel(this.seriesLabelContainer);
				}
			},
			/**
			 * If click series, showing selected state.
			 * @param {{left: number, top: number}} position - mouse position
			 */
			onClickSeries:function( position ){
				var foundIndex=this._executeGraphRenderer(position, 'findSectorIndex');
				if( !tui.util.isNull(foundIndex) ){
					this.eventBus.fire('selectSeries', {
						chartType:this.chartType,
						index:foundIndex,
						code:this.mapModel.getDatum(foundIndex).code
					});
				}
			},
			/**
			 * Whether changed position or not.
			 * @param {?{left: number, top: number}} prevPosition previous position
			 * @param {{left: number, top: number}} position position
			 * @returns {boolean} result boolean
			 * @private
			 */
			_isChangedPosition:function( prevPosition, position ){
				return !prevPosition || prevPosition.left!==position.left || prevPosition.top!==position.top;
			},
			/**
			 * Show wedge of spectrum legend.
			 * @param {number} index map data index
			 * @private
			 */
			_showWedge:function( index ){
				var datum=this.mapModel.getDatum(index);
				if( !tui.util.isUndefined(datum.ratio) ){
					this.eventBus.fire('showWedge', datum.ratio);
				}
			},
			/**
			 * Show tooltip.
			 * @param {number} index map data index
			 * @param {{left: number, top: number}} mousePosition mouse position
			 * @private
			 */
			_showTooltip:function( index, mousePosition ){
				this.eventBus.fire('showTooltip', {
					chartType:this.chartType,
					indexes:{
						index:index
					},
					mousePosition:mousePosition
				});
			},
			/**
			 * On move series.
			 * @param {{left: number, top: number}} position position
			 */
			onMoveSeries:function( position ){
				var foundIndex=this._executeGraphRenderer(position, 'findSectorIndex'),
					containerBound;
				if( !tui.util.isNull(foundIndex) ){
					if( this.prevMovedIndex!==foundIndex ){
						if( !tui.util.isNull(this.prevMovedIndex) ){
							this.graphRenderer.restoreColor(this.prevMovedIndex);
							this.eventBus.fire('hideTooltip');
						}
						this.graphRenderer.changeColor(foundIndex);
					}
					if( this._isChangedPosition(this.prevPosition, position) ){
						// getBoundingClientRect()값 캐싱 금지 - 차트 위치 변경 시 오류 발생
						containerBound=this.seriesContainer.getBoundingClientRect();
						this._showTooltip(foundIndex, {
							left:position.left-containerBound.left,
							top:position.top-containerBound.top
						});
						this.prevMovedIndex=foundIndex;
					}
					this._showWedge(foundIndex);
				}else if( !tui.util.isNull(this.prevMovedIndex) ){
					this.graphRenderer.restoreColor(this.prevMovedIndex);
					this.eventBus.fire('hideTooltip');
					this.prevMovedIndex=null;
				}
				this.prevPosition=position;
			},
			/**
			 * On drag start series.
			 * @param {{left: number, top: number}} position position
			 */
			onDragStartMapSeries:function( position ){
				this.startPosition={
					left:position.left,
					top:position.top
				};
			},
			/**
			 * Move position.
			 * @param {{left: number, top: number}} startPosition start position
			 * @param {{left: number, top: number}} endPosition end position
			 * @private
			 */
			_movePosition:function( startPosition, endPosition ){
				var movementPosition=this._adjustMapPosition({
					left:this.basePosition.left+(endPosition.left-startPosition.left),
					top:this.basePosition.top+(endPosition.top-startPosition.top)
				});
				renderUtil.renderPosition(this.graphContainer, movementPosition);
				this.basePosition=movementPosition;
			},
			/**
			 * On drag series.
			 * @param {{left: number, top: number}} position position
			 */
			onDragMapSeries:function( position ){
				this._movePosition(this.startPosition, position);
				this.startPosition=position;
				if( !this.isDrag ){
					this.isDrag=true;
					this.eventBus.fire('hideTooltip');
				}
			},
			/**
			 * On drag end series.
			 */
			onDragEndMapSeries:function(){
				this.isDrag=false;
			},
			/**
			 * Move position for zoom.
			 * @param {{left: number, top: number}} position mouse position
			 * @param {number} changedRatio changed ratio
			 * @private
			 */
			_movePositionForZoom:function( position, changedRatio ){
				var seriesDimension=this.layout.dimension;
				var containerBound=this.seriesContainer.getBoundingClientRect();
				var startPosition={
					left:(seriesDimension.width/2)+containerBound.left,
					top:(seriesDimension.height/2)+containerBound.top
				};
				var movementPosition={
					left:position.left-startPosition.left,
					top:position.top-startPosition.top
				};
				var endPosition;
				changedRatio=changedRatio > 1 ? -(changedRatio/2) : changedRatio;
				endPosition={
					left:startPosition.left+(movementPosition.left*changedRatio),
					top:startPosition.top+(movementPosition.top*changedRatio)
				};
				this._movePosition(startPosition, endPosition);
			},
			/**
			 * On zoom map.
			 * @param {number} newMagn new zoom magnification
			 * @param {?{left: number, top: number}} position mouse position
			 */
			onZoomMap:function( newMagn, position ){
				var changedRatio=newMagn/this.zoomMagn;
				this.zoomMagn=newMagn;
				this._zoom(changedRatio);
				if( position ){
					this._movePositionForZoom(position, changedRatio);
				}
				this.eventBus.fire(chartConst.PUBLIC_EVENT_PREFIX+'zoom', newMagn);
			},
			/**
			 * Make exportation data for public event of series type.
			 * @param {object} seriesData - series data
			 * @returns {{
	     *     chartType: string,
	     *     code: string,
	     *     index: number
	     *     }}
			 * @private
			 */
			_makeExportationSeriesData:function( seriesData ){
				return seriesData;
			}
		});
		module.exports=MapChartSeries;
		/***/
	},
	/* 69 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Pie chart series component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		var PieChartSeries=tui.util.defineClass(Series, /** @lends PieChartSeries.prototype */ {
			/**
			 * Line chart series component.
			 * @constructs PieChartSeries
			 * @private
			 * @extends Series
			 * @param {object} params parameters
			 *      @param {object} params.model series model
			 *      @param {object} params.options series options
			 *      @param {object} params.theme series theme
			 */
			init:function( params ){
				Series.call(this, params);
				this.isCombo= !!params.isCombo;
				this.isShowOuterLabel=!!params.isShowOuterLabel || predicate.isShowOuterLabel(this.options);
				/**
				 * range for quadrant.
				 * @type {?number}
				 */
				this.quadrantRange=null;
				/**
				 * previous clicked index.
				 * @type {?number}
				 */
				this.prevClickedIndex=null;
				this._setDefaultOptions();
			},
			/**
			 * Make valid angle.
			 * @param {number} angle - angle
			 * @param {number} defaultAngle - default angle
			 * @returns {number}
			 * @private
			 */
			_makeValidAngle:function( angle, defaultAngle ){
				if( tui.util.isUndefined(angle) ){
					angle=defaultAngle;
				}else if( angle < 0 ){
					angle=chartConst.ANGLE_360-(Math.abs(angle)%chartConst.ANGLE_360);
				}else if( angle > 0 ){
					angle=angle%chartConst.ANGLE_360;
				}
				return angle;
			},
			/**
			 * Transform radius range.
			 * @param {Array.<number>} radiusRange - radius range
			 * @returns {Array}
			 * @private
			 */
			_transformRadiusRange:function( radiusRange ){
				radiusRange=radiusRange || ['0%', '100%'];
				return tui.util.map(radiusRange, function( percent ){
					var ratio=parseInt(percent, 10)*0.01;
					return Math.max(Math.min(ratio, 1), 0);
				});
			},
			/**
			 * Set default options for series of pie type chart.
			 * @private
			 */
			_setDefaultOptions:function(){
				var options=this.options;
				options.startAngle=this._makeValidAngle(options.startAngle, 0);
				options.endAngle=this._makeValidAngle(options.endAngle, options.startAngle);
				options.radiusRange=this._transformRadiusRange(options.radiusRange);
				if( options.radiusRange.length===1 ){
					options.radiusRange.unshift(0);
				}
			},
			/**
			 * Calculate angle for rendering.
			 * @returns {number}
			 * @private
			 */
			_calculateAngleForRendering:function(){
				var startAngle=this.options.startAngle;
				var endAngle=this.options.endAngle;
				var renderingAngle;
				if( startAngle < endAngle ){
					renderingAngle=endAngle-startAngle;
				}else if( startAngle > endAngle ){
					renderingAngle=chartConst.ANGLE_360-(startAngle-endAngle);
				}else{
					renderingAngle=chartConst.ANGLE_360;
				}
				return renderingAngle;
			},
			/**
			 * Make sectors information.
			 * @param {{cx: number, cy: number, r: number}} circleBound circle bound
			 * @returns {Array.<object>} sectors information
			 * @private
			 */
			_makeSectorData:function( circleBound ){
				var self=this;
				var seriesGroup=this._getSeriesDataModel().getFirstSeriesGroup();
				var cx=circleBound.cx;
				var cy=circleBound.cy;
				var r=circleBound.r;
				var angle=this.options.startAngle;
				var angleForRendering=this._calculateAngleForRendering();
				var delta=10;
				var holeRatio=this.options.radiusRange[0];
				var centerR=r*0.5;
				var paths;
				if( holeRatio ){
					centerR+=centerR*holeRatio;
				}
				paths=seriesGroup.map(function( seriesItem ){
					var ratio=seriesItem ? seriesItem.ratio : 0;
					var currentAngle=angleForRendering*ratio;
					var endAngle=angle+currentAngle;
					var popupAngle=angle+(currentAngle/2);
					var angles={
						start:{
							startAngle:angle,
							endAngle:angle
						},
						end:{
							startAngle:angle,
							endAngle:endAngle
						}
					};
					var positionData={
						cx:cx,
						cy:cy,
						angle:popupAngle
					};
					angle=endAngle;
					return {
						ratio:ratio,
						angles:angles,
						centerPosition:self._getArcPosition(tui.util.extend({
							r:centerR
						}, positionData)),
						outerPosition:{
							start:self._getArcPosition(tui.util.extend({
								r:r
							}, positionData)),
							middle:self._getArcPosition(tui.util.extend({
								r:r+delta
							}, positionData))
						}
					};
				});
				return paths;
			},
			/**
			 * Make series data.
			 * @returns {{
	     *      chartBackground: string,
	     *      circleBound: ({cx: number, cy: number, r: number}),
	     *      sectorData: Array.<object>
	     * }} add data for graph rendering
			 * @private
			 * @override
			 */
			_makeSeriesData:function(){
				var circleBound=this._makeCircleBound();
				var sectorData=this._makeSectorData(circleBound);
				return {
					chartBackground:this.chartBackground,
					circleBound:circleBound,
					sectorData:sectorData,
					isAvailable:function(){
						return sectorData && sectorData.length > 0;
					}
				};
			},
			/**
			 * Get quadrant from angle.
			 * @param {number} angle - angle
			 * @param {boolean} isEnd whether end quadrant
			 * @returns {number}
			 * @private
			 */
			_getQuadrantFromAngle:function( angle, isEnd ){
				var quadrant=parseInt(angle/chartConst.ANGLE_90, 10)+1;
				if( isEnd && (angle%chartConst.ANGLE_90===0) ){
					quadrant+=(quadrant===1) ? 3 : -1;
				}
				return quadrant;
			},
			/**
			 * Get range for quadrant.
			 * @returns {{start: number, end: number}}
			 * @private
			 */
			_getRangeForQuadrant:function(){
				if( !this.quadrantRange ){
					this.quadrantRange={
						start:this._getQuadrantFromAngle(this.options.startAngle),
						end:this._getQuadrantFromAngle(this.options.endAngle, true)
					};
				}
				return this.quadrantRange;
			},
			/**
			 * Whether in range for quadrant.
			 * @param {number} start - start quadrant
			 * @param {number} end - end quadrant
			 * @returns {boolean}
			 * @private
			 */
			_isInQuadrantRange:function( start, end ){
				var quadrantRange=this._getRangeForQuadrant();
				return quadrantRange.start===start && quadrantRange.end===end;
			},
			/**
			 * Calculate base size.
			 * @returns {number}
			 * @private
			 */
			_calculateBaseSize:function(){
				var dimension=this.layout.dimension;
				var width=dimension.width;
				var height=dimension.height;
				var quadrantRange;
				if( !this.isCombo ){
					quadrantRange=this._getRangeForQuadrant();
					if( this._isInQuadrantRange(2, 3) || this._isInQuadrantRange(4, 1) ){
						height*=2;
					}else if( this._isInQuadrantRange(1, 2) || this._isInQuadrantRange(3, 4) ){
						width*=2;
					}else if( quadrantRange.start===quadrantRange.end ){
						width*=2;
						height*=2;
					}
				}
				return Math.min(width, height);
			},
			/**
			 * Calculate radius.
			 * @returns {number}
			 * @private
			 */
			_calculateRadius:function(){
				var radiusRatio=this.isShowOuterLabel ? chartConst.PIE_GRAPH_SMALL_RATIO : chartConst.PIE_GRAPH_DEFAULT_RATIO;
				var baseSize=this._calculateBaseSize();
				return baseSize*radiusRatio*this.options.radiusRange[1]/2;
			},
			/**
			 * Calculate center x, y.
			 * @param {number} radius - radius
			 * @returns {{cx: number, cy: number}}
			 * @private
			 */
			_calculateCenterXY:function( radius ){
				var dimension=this.layout.dimension;
				var halfRadius=radius/2;
				var cx=dimension.width/2;
				var cy=dimension.height/2;
				if( !this.isCombo ){
					if( this._isInQuadrantRange(1, 1) ){
						cx-=halfRadius;
						cy+=halfRadius;
					}else if( this._isInQuadrantRange(1, 2) ){
						cx-=halfRadius;
					}else if( this._isInQuadrantRange(2, 2) ){
						cx-=halfRadius;
						cy-=halfRadius;
					}else if( this._isInQuadrantRange(2, 3) ){
						cy-=halfRadius;
					}else if( this._isInQuadrantRange(3, 3) ){
						cx+=halfRadius;
						cy-=halfRadius;
					}else if( this._isInQuadrantRange(3, 4) ){
						cx+=halfRadius;
					}else if( this._isInQuadrantRange(4, 1) ){
						cy+=halfRadius;
					}else if( this._isInQuadrantRange(4, 4) ){
						cx+=halfRadius;
						cy+=halfRadius;
					}
				}
				return {
					cx:cx,
					cy:cy
				};
			},
			/**
			 * Make circle bound
			 * @returns {{cx: number, cy: number, r: number}} circle bounds
			 * @private
			 */
			_makeCircleBound:function(){
				var radius=this._calculateRadius();
				var centerXY=this._calculateCenterXY(radius);
				return tui.util.extend({
					r:radius
				}, centerXY);
			},
			/**
			 * Get arc position.
			 * @param {object} params parameters
			 *      @param {number} params.cx center x
			 *      @param {number} params.cy center y
			 *      @param {number} params.r radius
			 *      @param {number} params.angle angle(degree)
			 * @returns {{left: number, top: number}} arc position
			 * @private
			 */
			_getArcPosition:function( params ){
				return {
					left:params.cx+(params.r*Math.sin(params.angle*chartConst.RAD)),
					top:params.cy-(params.r*Math.cos(params.angle*chartConst.RAD))
				};
			},
			/**
			 * Render raphael graph.
			 * @param {{width: number, height: number}} dimension dimension
			 * @param {object} seriesData series data
			 * @private
			 * @override
			 */
			_renderGraph:function( dimension, seriesData, paper ){
				var showTootltip=tui.util.bind(this.showTooltip, this, {
					allowNegativeTooltip:!!this.allowNegativeTooltip,
					seriesName:this.seriesName,
					chartType:this.chartType
				});
				var callbacks={
					showTooltip:showTootltip,
					hideTooltip:tui.util.bind(this.hideTooltip, this)
				};
				var params=this._makeParamsForGraphRendering(dimension, seriesData);
				var currentSeriesName=this.seriesName;
				var seriesDataModelMap=this.dataProcessor.seriesDataModelMap;
				var pastSeriesNames=[];
				var pastIndex=0;
				tui.util.forEach(this.dataProcessor.seriesNames, function( seriesName ){
					var needNext=true;
					if( seriesName!==currentSeriesName ){
						pastSeriesNames.push(seriesName);
					}else{
						needNext=false;
					}
					return needNext;
				});
				tui.util.forEach(pastSeriesNames, function( seriesName ){
					pastIndex+=seriesDataModelMap[seriesName].baseGroups.length;
				});
				params.additionalIndex=pastIndex;
				params.paper=paper;
				return this.graphRenderer.render(this.seriesContainer, params, callbacks);
			},
			/**
			 * Resize.
			 * @override
			 */
			resize:function(){
				Series.prototype.resize.apply(this, arguments);
				this._moveLegendLines();
			},
			/**
			 * showTooltip is mouseover event callback on series graph.
			 * @param {object} params parameters
			 *      @param {boolean} params.allowNegativeTooltip whether allow negative tooltip or not
			 * @param {{top:number, left: number, width: number, height: number}} bound graph bound information
			 * @param {number} groupIndex group index
			 * @param {number} index index
			 * @param {{left: number, top: number}} mousePosition mouse position
			 */
			showTooltip:function( params, bound, groupIndex, index, mousePosition ){
				this.eventBus.fire('showTooltip', tui.util.extend({
					indexes:{
						groupIndex:groupIndex,
						index:index
					},
					mousePosition:mousePosition
				}, params));
			},
			/**
			 * hideTooltip is mouseout event callback on series graph.
			 */
			hideTooltip:function(){
				this.eventBus.fire('hideTooltip');
			},
			/**
			 * Make series data by selection.
			 * @param {number} index index
			 * @returns {{indexes: {index: number, groupIndex: number}}} series data
			 * @private
			 */
			_makeSeriesDataBySelection:function( index ){
				return {
					indexes:{
						index:index,
						groupIndex:index
					}
				};
			},
			/**
			 * Get series label.
			 * @param {object} params parameters
			 *      @param {string} params.legend legend
			 *      @param {string} params.label label
			 *      @param {string} params.separator separator
			 * @returns {string} series label
			 * @private
			 */
			_getSeriesLabel:function( params ){
				var seriesLabel='';
				if( this.options.showLegend ){
					seriesLabel='<span class="tui-chart-series-legend">'+params.legend+'</span>';
				}
				if( this.options.showLabel ){
					seriesLabel+=(seriesLabel ? params.separator : '')+params.label;
				}
				return seriesLabel;
			},
			/**
			 * Render center legend.
			 * @param {object} params parameters
			 *      @param {Array.<object>} params.positions positions
			 *      @param {string} params.separator separator
			 *      @param {object} params.options options
			 *      @param {function} params.funcMoveToPosition function
			 * @param {HTMLElement} seriesLabelContainer series label area element
			 * @private
			 */
			_renderLegendLabel:function( params, seriesLabelContainer ){
				var self=this;
				var dataProcessor=this.dataProcessor;
				var seriesDataModel=this._getSeriesDataModel();
				var positions=params.positions;
				var htmls=tui.util.map(dataProcessor.getLegendLabels(this.seriesName), function( legend, index ){
					var html='',
						label, position;
					if( positions[index] ){
						label=self._getSeriesLabel({
							legend:legend,
							label:seriesDataModel.getSeriesItem(0, index).label,
							separator:params.separator
						});
						position=params.funcMoveToPosition(positions[index], label);
						html=self._makeSeriesLabelHtml(position, label, index);
					}
					return html;
				});
				seriesLabelContainer.innerHTML=htmls.join('');
			},
			/**
			 * Move to center position.
			 * @param {{left: number, top: number}} position position
			 * @param {string} label label
			 * @returns {{left: number, top: number}} center position
			 * @private
			 */
			_moveToCenterPosition:function( position, label ){
				var left=position.left-(renderUtil.getRenderedLabelWidth(label, this.theme.label)/2),
					top=position.top-(renderUtil.getRenderedLabelHeight(label, this.theme.label)/2);
				return {
					left:left,
					top:top
				};
			},
			/**
			 * Pick poistions from sector data.
			 * @param {string} positionType position type
			 * @returns {Array} positions
			 * @private
			 */
			_pickPositionsFromSectorData:function( positionType ){
				return tui.util.map(this.seriesData.sectorData, function( datum ){
					return datum.ratio ? datum[positionType] : null;
				});
			},
			/**
			 * Render center legend.
			 * @param {HTMLElement} seriesLabelContainer series label area element
			 * @private
			 */
			_renderCenterLegend:function( seriesLabelContainer ){
				this._renderLegendLabel({
					positions:this._pickPositionsFromSectorData('centerPosition'),
					funcMoveToPosition:tui.util.bind(this._moveToCenterPosition, this),
					separator:'<br>'
				}, seriesLabelContainer);
			},
			/**
			 * Add end position.
			 * @param {number} centerLeft center left
			 * @param {Array.<object>} positions positions
			 * @private
			 */
			_addEndPosition:function( centerLeft, positions ){
				tui.util.forEachArray(positions, function( position ){
					var end;
					if( !position ){
						return;
					}
					end=tui.util.extend({}, position.middle);
					if( end.left < centerLeft ){
						end.left-=chartConst.SERIES_OUTER_LABEL_PADDING;
					}else{
						end.left+=chartConst.SERIES_OUTER_LABEL_PADDING;
					}
					position.end=end;
				});
			},
			/**
			 * Move to outer position.
			 * @param {number} centerLeft center left
			 * @param {object} position position
			 * @param {string} label label
			 * @returns {{left: number, top: number}} outer position
			 * @private
			 */
			_moveToOuterPosition:function( centerLeft, position, label ){
				var positionEnd=position.end,
					left=positionEnd.left,
					top=positionEnd.top-(renderUtil.getRenderedLabelHeight(label, this.theme.label)/2);
				if( left < centerLeft ){
					left-=renderUtil.getRenderedLabelWidth(label, this.theme.label)+chartConst.SERIES_LABEL_PADDING;
				}else{
					left+=chartConst.SERIES_LABEL_PADDING;
				}
				return {
					left:left,
					top:top
				};
			},
			/**
			 * Render outer legend.
			 * @param {HTMLElement} seriesLabelContainer series label area element
			 * @private
			 */
			_renderOuterLegend:function( seriesLabelContainer ){
				var centerLeft=this.getSeriesData().circleBound.cx;
				var outerPositions=this._pickPositionsFromSectorData('outerPosition');
				var filteredPositions=tui.util.filter(outerPositions, function( position ){
					return position;
				});
				this._addEndPosition(centerLeft, filteredPositions);
				this._renderLegendLabel({
					positions:outerPositions,
					funcMoveToPosition:tui.util.bind(this._moveToOuterPosition, this, centerLeft),
					separator:':&nbsp;'
				}, seriesLabelContainer);
				this.graphRenderer.renderLegendLines(filteredPositions);
			},
			/**
			 * Render series label.
			 * @param {HTMLElement} seriesLabelContainer series label area element
			 * @private
			 */
			_renderSeriesLabel:function( seriesLabelContainer ){
				if( predicate.isLabelAlignOuter(this.options.labelAlign) ){
					this._renderOuterLegend(seriesLabelContainer);
				}else{
					this._renderCenterLegend(seriesLabelContainer);
				}
			},
			/**
			 * Animate series label area.
			 * @override
			 */
			animateSeriesLabelArea:function(){
				this.graphRenderer.animateLegendLines(this.selectedLegendIndex);
				Series.prototype.animateSeriesLabelArea.call(this);
			},
			/**
			 * Move legend lines.
			 * @private
			 * @override
			 */
			_moveLegendLines:function(){
				var centerLeft=this.dimensionMap.chart.width/2,
					outerPositions=this._pickPositionsFromSectorData('outerPosition'),
					filteredPositions=tui.util.filter(outerPositions, function( position ){
						return position;
					});
				this._addEndPosition(centerLeft, filteredPositions);
				this.graphRenderer.moveLegendLines(filteredPositions);
			},
			/**
			 * Whether detected label element or not.
			 * @param {{left: number, top: number}} position - mouse position
			 * @returns {boolean}
			 * @private
			 */
			_isDetectedLabel:function( position ){
				var labelElement=document.elementFromPoint(position.left, position.top);
				return tui.util.isString(labelElement.className);
			},
			/**
			 * On click series.
			 * @param {{left: number, top: number}} position mouse position
			 */
			onClickSeries:function( position ){
				var sectorInfo=this._executeGraphRenderer(position, 'findSectorInfo');
				var prevIndex=this.prevClickedIndex;
				var allowSelect=this.options.allowSelect;
				var foundIndex, shouldSelect;
				if( (sectorInfo || this._isDetectedLabel(position)) && tui.util.isExisty(prevIndex) && allowSelect ){
					this.onUnselectSeries({
						indexes:{
							index:prevIndex
						}
					});
					this.prevClickedIndex=null;
				}
				if( !sectorInfo || sectorInfo.chartType!==this.seriesName ){
					return;
				}
				foundIndex=sectorInfo.index;
				shouldSelect=foundIndex > -1 && (foundIndex!==prevIndex);
				if( allowSelect && !shouldSelect ){
					return;
				}
				this.onSelectSeries({
					chartType:this.chartType,
					indexes:{
						index:foundIndex,
						legendIndex:sectorInfo.legendIndex
					}
				}, shouldSelect);
				if( allowSelect && foundIndex > -1 ){
					this.prevClickedIndex=foundIndex;
				}
			},
			/**
			 * On move series.
			 * @param {{left: number, top: number}} position mouse position
			 */
			onMoveSeries:function( position ){
				this._executeGraphRenderer(position, 'moveMouseOnSeries');
			}
		});
		module.exports=PieChartSeries;
		/***/
	},
	/* 70 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Series component for rendering graph of heatmap chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56);
		var labelHelper=__webpack_require__(57);
		var chartConst=__webpack_require__(2);
		var HeatmapChartSeries=tui.util.defineClass(Series, /** @lends HeatmapChartSeries.prototype */ {
			/**
			 * Series component for rendering graph of heatmap chart.
			 * @constructs HeatmapChartSeries
			 * @private
			 * @param {object} params - parameters
			 * @extends Series
			 */
			init:function( params ){
				/**
				 * Color spectrum
				 * @type {ColorSpectrum}
				 */
				this.colorSpectrum=params.colorSpectrum;
				Series.call(this, params);
			},
			/**
			 * Make series data for rendering graph and sending to mouse event detector.
			 * @returns {{
	     *      groupBounds: Array.<Array.<{left: number, top: number, radius: number}>>,
	     *      seriesDataModel: SeriesDataModel
	     * }} series data
			 * @private
			 * @override
			 */
			_makeSeriesData:function(){
				var groupBounds=this._makeBounds();
				var seriesDataModel=this._getSeriesDataModel();
				return {
					colorSpectrum:this.colorSpectrum,
					groupBounds:groupBounds,
					seriesDataModel:seriesDataModel,
					isAvailable:function(){
						return groupBounds && groupBounds.length > 0;
					}
				};
			},
			/**
			 * Make bound for graph rendering.
			 * @param {number} blockWidth - block width
			 * @param {number} blockHeight - block height
			 * @param {number} x - x index
			 * @param {number} y - y index
			 * @returns {{end: {left: number, top: number, width: number, height: number}}}
			 * @private
			 */
			_makeBound:function( blockWidth, blockHeight, x, y ){
				var height=this.layout.dimension.height;
				var left=(blockWidth*x)+chartConst.SERIES_EXPAND_SIZE;
				var top=height-(blockHeight*(y+1))+chartConst.SERIES_EXPAND_SIZE;
				return {
					end:{
						left:left,
						top:top,
						width:blockWidth,
						height:blockHeight
					}
				};
			},
			/**
			 * Make bounds for graph rendering.
			 * @returns {Array.<Array.<{left: number, top: number, radius: number}>>} positions
			 * @private
			 */
			_makeBounds:function(){
				var self=this;
				var seriesDataModel=this._getSeriesDataModel();
				var dimension=this.layout.dimension;
				var blockWidth=dimension.width/this.dataProcessor.getCategoryCount(false);
				var blockHeight=dimension.height/this.dataProcessor.getCategoryCount(true);
				return seriesDataModel.map(function( seriesGroup, x ){
					return seriesGroup.map(function( seriesItem, y ){
						return self._makeBound(blockWidth, blockHeight, x, y);
					});
				});
			},
			/**
			 * Call showWedge event of spectrum legend, when call showTooltip event.
			 * @param {{indexes: {groupIndex: number, index: number}}} params - parameters
			 */
			onShowTooltip:function( params ){
				var seriesDataModel=this._getSeriesDataModel();
				var indexes=params.indexes;
				var ratio=seriesDataModel.getSeriesItem(indexes.groupIndex, indexes.index).ratio;
				this.eventBus.fire('showWedge', ratio);
			},
			/**
			 * Render series label.
			 * @param {HTMLElement} labelContainer - series label container
			 * @private
			 */
			_renderSeriesLabel:function( labelContainer ){
				var sdm=this._getSeriesDataModel();
				var boundsSet=this.seriesData.groupBounds;
				var labelTheme=this.theme.label;
				var selectedIndex=this.selectedLegendIndex;
				var positionsSet=labelHelper.boundsToLabelPositions(sdm, boundsSet, labelTheme);
				var html=labelHelper.makeLabelsHtmlForBoundType(sdm, positionsSet, labelTheme, selectedIndex);
				labelContainer.innerHTML=html;
			},
			/**
			 * Make exportation data for public event of series type.
			 * @param {object} seriesData - series data
			 * @returns {{x: number, y: number}}
			 * @private
			 */
			_makeExportationSeriesData:function( seriesData ){
				return {
					x:seriesData.indexes.groupIndex,
					y:seriesData.indexes.index
				};
			}
		});
		module.exports=HeatmapChartSeries;
		/***/
	},
	/* 71 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Series component for rendering graph of treemap chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var Series=__webpack_require__(56);
		var squarifier=__webpack_require__(72);
		var labelHelper=__webpack_require__(57);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var TreemapChartSeries=tui.util.defineClass(Series, /** @lends TreemapChartSeries.prototype */ {
			/**
			 * Series component for rendering graph of treemap chart.
			 * @constructs TreemapChartSeries
			 * @private
			 * @param {object} params - parameters
			 * @extends Series
			 */
			init:function( params ){
				Series.call(this, params);
				this.theme.borderColor=this.theme.borderColor || chartConst.TREEMAP_DEFAULT_BORDER;
				/**
				 * root id
				 * @type {string}
				 */
				this.rootId=chartConst.TREEMAP_ROOT_ID;
				/**
				 * start depth of seriesItem for rendering graph
				 * @type {number}
				 */
				this.startDepth=1;
				/**
				 * selected group
				 * @type {null | number}
				 */
				this.selectedGroup=null;
				/**
				 * bound map
				 * @type {null|object.<string, object>}
				 */
				this.boundMap=null;
				/**
				 * color spectrum
				 * @type {ColorSpectrum}
				 */
				this.colorSpectrum=params.colorSpectrum;
				this._initOptions();
			},
			/**
			 * Initialize options.
			 * @private
			 */
			_initOptions:function(){
				this.options.useColorValue= !!this.options.useColorValue;
				if( tui.util.isUndefined(this.options.zoomable) ){
					this.options.zoomable= !this.options.useColorValue;
				}
				if( tui.util.isUndefined(this.options.useLeafLabel) ){
					this.options.useLeafLabel= !this.options.zoomable;
				}
			},
			/**
			 * Make series data.
			 * @returns {{
	     *      groupBounds: object.<string, {left: number, top: number, width: number, height: number}>,
	     *      seriesDataModel: SeriesDataModel
	     * }}
			 * @private
			 * @override
			 */
			_makeSeriesData:function(){
				var boundMap=this._getBoundMap();
				var groupBounds=this._makeBounds(boundMap);
				return {
					boundMap:boundMap,
					groupBounds:groupBounds,
					seriesDataModel:this._getSeriesDataModel(),
					startDepth:this.startDepth,
					isPivot:true,
					colorSpectrum:this.options.useColorValue ? this.colorSpectrum : null,
					chartBackground:this.chartBackground,
					zoomable:this.options.zoomable,
					isAvailable:function(){
						return groupBounds && groupBounds.length > 0;
					}
				};
			},
			/**
			 * Make bound map by dimension.
			 * @param {string | number} parent - parent id
			 * @param {object.<string, {left: number, top: number, width: number, height: number}>} boundMap - bound map
			 * @param {{width: number, height: number}} dimension - dimension
			 * @returns {object.<string, {left: number, top: number, width: number, height: number}>}
			 * @private
			 */
			_makeBoundMap:function( parent, boundMap, dimension ){
				var self=this;
				var seriesDataModel=this._getSeriesDataModel();
				var seriesItems;
				dimension=dimension || this.layout.dimension;
				seriesItems=seriesDataModel.findSeriesItemsByParent(parent);
				boundMap=tui.util.extend(boundMap || {}, squarifier.squarify(dimension, seriesItems));
				tui.util.forEachArray(seriesItems, function( seriesItem ){
					boundMap=self._makeBoundMap(seriesItem.id, boundMap, boundMap[seriesItem.id]);
				});
				return boundMap;
			},
			/**
			 * Make bounds for rendering graph.
			 * @param {object.<string, {left: number, top: number, width: number, height: number}>} boundMap - bound map
			 * @returns {Array.<Array.<{left: number, top: number, width: number, height: number}>>}
			 * @private
			 */
			_makeBounds:function( boundMap ){
				var startDepth=this.startDepth;
				var seriesDataModel=this._getSeriesDataModel();
				var isValid;
				if( this.options.zoomable ){
					isValid=function( seriesItem ){
						return seriesItem.depth===startDepth;
					};
				}else{
					isValid=function( seriesItem ){
						return !seriesItem.hasChild;
					};
				}
				return seriesDataModel.map(function( seriesGroup ){
					return seriesGroup.map(function( seriesItem ){
						var bound=boundMap[seriesItem.id];
						var result=null;
						if( bound && isValid(seriesItem) ){
							result={
								end:bound
							};
						}
						return result;
					}, true);
				}, true);
			},
			/**
			 * Get bound map for rendering graph.
			 * @returns {object.<string, {left: number, top: number, width: number, height: number}>}
			 * @private
			 */
			_getBoundMap:function(){
				if( !this.boundMap ){
					this.boundMap=this._makeBoundMap(this.rootId);
				}
				return this.boundMap;
			},
			/**
			 * Whether should dimmed or not.
			 * @param {SeriesDataModel} seriesDataModel - SeriesDataModel for treemap
			 * @param {SeriesItem} hoverSeriesItem - hover SeriesItem
			 * @param {SeriesItem} seriesItem - target SeriesItem
			 * @returns {boolean}
			 * @private
			 */
			_shouldDimmed:function( seriesDataModel, hoverSeriesItem, seriesItem ){
				var shouldTransparent=false;
				var parent;
				if( hoverSeriesItem && seriesItem.id!==hoverSeriesItem.id && seriesItem.group===hoverSeriesItem.group ){
					parent=seriesDataModel.findParentByDepth(seriesItem.id, hoverSeriesItem.depth+1);
					if( parent && parent.parent===hoverSeriesItem.id ){
						shouldTransparent=true;
					}
				}
				return shouldTransparent;
			},
			/**
			 * Render series label.
			 * @param {HTMLElement} labelContainer - series label container
			 * @param {SeriesItem} hoverSeriesItem - hover SeriesItem
			 * @private
			 */
			_renderSeriesLabel:function( labelContainer, hoverSeriesItem ){
				var seriesDataModel=this._getSeriesDataModel();
				var boundMap=this._getBoundMap();
				var seriesItems, shouldDimmed, html;
				if( this.options.useLeafLabel ){
					seriesItems=seriesDataModel.findLeafSeriesItems(this.selectedGroup);
				}else{
					seriesItems=seriesDataModel.findSeriesItemsByDepth(this.startDepth, this.selectedGroup);
				}
				shouldDimmed=tui.util.bind(this._shouldDimmed, this, seriesDataModel, hoverSeriesItem);
				html=labelHelper.makeLabelsHtmlForTreemap(
					seriesItems, boundMap, this.theme.label, shouldDimmed, this.options.labelTemplate
				);
				labelContainer.innerHTML=html;
			},
			/**
			 * Resize.
			 * @override
			 */
			resize:function(){
				this.boundMap=null;
				Series.prototype.resize.apply(this, arguments);
			},
			/**
			 * Zoom.
			 * @param {string | number} rootId - root id
			 * @param {number} startDepth - start depth
			 * @param {number} group - group
			 * @private
			 */
			_zoom:function( rootId, startDepth, group ){
				this._clearSeriesContainer();
				this.boundMap=null;
				this.rootId=rootId;
				this.startDepth=startDepth;
				this.selectedGroup=group;
				this._renderSeriesArea(this.seriesContainer, this.paper, tui.util.bind(this._renderGraph, this));
				if( predicate.isShowLabel(this.options) ){
					this._showSeriesLabelWithoutAnimation();
				}
			},
			/**
			 * Zoom
			 * @param {{index: number}} data - data for zoom
			 */
			zoom:function( data ){
				var detectedIndex=data.index;
				var seriesDataModel, seriesItem;
				if( detectedIndex=== -1 ){
					this._zoom(chartConst.TREEMAP_ROOT_ID, 1, null);
					return;
				}
				seriesDataModel=this._getSeriesDataModel();
				seriesItem=seriesDataModel.getSeriesItem(0, detectedIndex, true);
				if( !seriesItem || !seriesItem.hasChild ){
					return;
				}
				this._zoom(seriesItem.id, seriesItem.depth+1, seriesItem.group);
				this.eventBus.fire('afterZoom', detectedIndex);
			},
			/**
			 * Make exportation data for public event of series type.
			 * @param {object} seriesData series data
			 * @returns {{chartType: string, legend: string, legendIndex: number, index: number}} export data
			 * @private
			 */
			_makeExportationSeriesData:function( seriesData ){
				var indexes=seriesData.indexes;
				var seriesItem=this._getSeriesDataModel().getSeriesItem(indexes.groupIndex, indexes.index, true);
				return tui.util.extend({
					chartType:this.chartType,
					indexes:seriesItem.indexes
				});
			},
			/**
			 * To call showAnimation function of graphRenderer.
			 * @param {{groupIndex: number, index: number}} indexes - indexes
			 */
			onHoverSeries:function( indexes ){
				var seriesItem;
				if( !predicate.isShowLabel(this.options) ){
					return;
				}
				seriesItem=this._getSeriesDataModel().getSeriesItem(indexes.groupIndex, indexes.index, true);
				this._renderSeriesLabel(this.seriesLabelContainer, seriesItem);
				this.graphRenderer.showAnimation(indexes, this.options.useColorValue, 0.6);
			},
			/**
			 * To call hideAnimation function of graphRenderer.
			 * @param {{groupIndex: number, index: number}} indexes - indexes
			 */
			onHoverOffSeries:function( indexes ){
				if( !predicate.isShowLabel(this.options) || !indexes ){
					return;
				}
				this._renderSeriesLabel(this.seriesLabelContainer);
				this.graphRenderer.hideAnimation(indexes, this.options.useColorValue);
			},
			/**
			 * On show tooltip for calling showWedge.
			 * @param {{indexes: {groupIndex: number, index: number}}} params - parameters
			 */
			onShowTooltip:function( params ){
				var seriesDataModel=this._getSeriesDataModel();
				var indexes=params.indexes;
				var ratio=seriesDataModel.getSeriesItem(indexes.groupIndex, indexes.index, true).colorRatio;
				if( ratio > -1 ){
					this.eventBus.fire('showWedge', ratio);
				}
			}
		});
		module.exports=TreemapChartSeries;
		/***/
	},
	/* 72 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview squarifier create squarified bounds for rendering graph of treemap chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var calculator=__webpack_require__(22);
		var arrayUtil=__webpack_require__(6);
		var squarifier={
			/**
			 * bound map
			 * @type {object.<string, {width: number, height: number, left: number, top: number}>}
			 */
			boundMap:{},
			/**
			 * Make base bound for calculating bounds.
			 * @param {{width: number, height: number}} dimension - dimension
			 * @returns {{width: number, height: number, left: number, top: number}}
			 * @private
			 */
			_makeBaseBound:function( dimension ){
				return tui.util.extend({
					left:0,
					top:0
				}, dimension);
			},
			/**
			 * Calculate scale for calculating weight.
			 * @param {Array.<number>} values - values
			 * @param {number} width - width of series area
			 * @param {number} height - height of series area
			 * @returns {number}
			 * @private
			 */
			_calculateScale:function( values, width, height ){
				return (width*height)/calculator.sum(values);
			},
			/**
			 * Make base data for creating squarified bounds.
			 * @param {Array.<SeriesItem>} seriesItems - SeriesItems
			 * @param {number} width - width of series area
			 * @param {number} height - height of series area
			 * @returns {Array.<{itme: SeriesItem, weight: number}>}
			 * @private
			 */
			_makeBaseData:function( seriesItems, width, height ){
				var scale=this._calculateScale(tui.util.pluck(seriesItems, 'value'), width, height);
				var data=tui.util.map(seriesItems, function( seriesItem ){
					return {
						id:seriesItem.id,
						weight:seriesItem.value*scale
					};
				}).sort(function( a, b ){
					return b.weight-a.weight;
				});
				return data;
			},
			/**
			 * Calculate worst aspect ratio.
			 * Referred function worst() in https://www.win.tue.nl/~vanwijk/stm.pdf
			 * @param {number} sum - sum for weights
			 * @param {number} min - minimum weight
			 * @param {number} max - maximum weight
			 * @param {number} baseSize - base size (width or height)
			 * @returns {number}
			 * @private
			 */
			_worst:function( sum, min, max, baseSize ){
				var sumSquare=sum*sum;
				var sizeSquare=baseSize*baseSize;
				return Math.max((sizeSquare*max)/sumSquare, sumSquare/(sizeSquare*min));
			},
			/**
			 * Whether changed stack direction or not.
			 * @param {number} sum - sum for weights
			 * @param {Array.<number>} weights - weights
			 * @param {number} baseSize - base size
			 * @param {number} newWeight - new weight
			 * @returns {boolean}
			 * @private
			 */
			_changedStackDirection:function( sum, weights, baseSize, newWeight ){
				var min=arrayUtil.min(weights);
				var max=arrayUtil.max(weights);
				var beforeWorst=this._worst(sum, min, max, baseSize);
				var newWorst=this._worst(sum+newWeight, Math.min(min, newWeight), Math.max(max, newWeight), baseSize);
				return newWorst >= beforeWorst;
			},
			/**
			 * Whether type of vertical stack or not.
			 * @param {{width: number, height: number}} baseBound - base bound
			 * @returns {boolean}
			 * @private
			 */
			_isVerticalStack:function( baseBound ){
				return baseBound.height < baseBound.width;
			},
			/**
			 * Select base size from baseBound.
			 * @param {{width: number, height: number}} baseBound - base bound
			 * @returns {number}
			 * @private
			 */
			_selectBaseSize:function( baseBound ){
				return this._isVerticalStack(baseBound) ? baseBound.height : baseBound.width;
			},
			/**
			 * Calculate fixed size.
			 * @param {number} baseSize - base size
			 * @param {number} sum - sum for weights
			 * @param {Array.<{weight: number}>} row - row
			 * @returns {number}
			 * @private
			 */
			_calculateFixedSize:function( baseSize, sum, row ){
				var weights;
				if( !sum ){
					weights=tui.util.pluck(row, 'weight');
					sum=calculator.sum(weights);
				}
				return sum/baseSize;
			},
			/**
			 * Add bounds.
			 * @param {number} startPosition - start position
			 * @param {Array.<{weight: number}>} row - row
			 * @param {number} fixedSize - fixed size
			 * @param {function} callback - callback function
			 * @private
			 */
			_addBounds:function( startPosition, row, fixedSize, callback ){
				tui.util.reduce([startPosition].concat(row), function( storedPosition, rowDatum ){
					var dynamicSize=rowDatum.weight/fixedSize;
					callback(dynamicSize, storedPosition, rowDatum.id);
					return storedPosition+dynamicSize;
				});
			},
			/**
			 * Add bound.
			 * @param {number} left - left position
			 * @param {number} top - top position
			 * @param {number} width - width
			 * @param {number} height - height
			 * @param {string | number} id - id of seriesItem
			 * @private
			 */
			_addBound:function( left, top, width, height, id ){
				this.boundMap[id]={
					left:left,
					top:top,
					width:width,
					height:height
				};
			},
			/**
			 * Add bounds for type of vertical stack.
			 * @param {Array.<{weight: number}>} row - row
			 * @param {{left: number, top: number, width: number, height: number}} baseBound - base bound
			 * @param {number} baseSize - base size
			 * @param {number} sum - sum for weights of row
			 * @private
			 */
			_addBoundsForVerticalStack:function( row, baseBound, baseSize, sum ){
				var self=this;
				var fixedWidth=this._calculateFixedSize(baseSize, sum, row);
				this._addBounds(baseBound.top, row, fixedWidth, function( dynamicHeight, storedTop, id ){
					self._addBound(baseBound.left, storedTop, fixedWidth, dynamicHeight, id);
				});
				baseBound.left+=fixedWidth;
				baseBound.width-=fixedWidth;
			},
			/**
			 * Add bounds for type of horizontal stack.
			 * @param {Array.<{weight: number}>} row - row
			 * @param {{left: number, top: number, width: number, height: number}} baseBound - base bound
			 * @param {number} baseSize - base size
			 * @param {number} sum - sum for weights of row
			 * @private
			 */
			_addBoundsForHorizontalStack:function( row, baseBound, baseSize, sum ){
				var self=this;
				var fixedHeight=this._calculateFixedSize(baseSize, sum, row);
				this._addBounds(baseBound.left, row, fixedHeight, function( dynamicWidth, storedLeft, id ){
					self._addBound(storedLeft, baseBound.top, dynamicWidth, fixedHeight, id);
				});
				baseBound.top+=fixedHeight;
				baseBound.height-=fixedHeight;
			},
			/**
			 * Get adding bounds function.
			 * @param {{width: number, height: number}} baseBound - base bound
			 * @returns {*}
			 * @private
			 */
			_getAddingBoundsFunction:function( baseBound ){
				var addBound;
				if( this._isVerticalStack(baseBound) ){
					addBound=tui.util.bind(this._addBoundsForVerticalStack, this);
				}else{
					addBound=tui.util.bind(this._addBoundsForHorizontalStack, this);
				}
				return addBound;
			},
			/**
			 * Create squarified bound map for graph rendering.
			 * @param {{width: number, height: number}} dimension - dimension
			 * @param {Array.<SeriesItem>} seriesItems - seriesItems
			 * @returns {object.<string, {width: number, height: number, left: number, top: number}>}
			 */
			squarify:function( dimension, seriesItems ){
				var self=this;
				var baseBound=this._makeBaseBound(dimension);
				var baseData=this._makeBaseData(seriesItems, baseBound.width, baseBound.height);
				var row=[];
				var baseSize, addBounds;
				this.boundMap={};
				tui.util.forEachArray(baseData, function( datum ){
					var weights=tui.util.pluck(row, 'weight');
					var sum=calculator.sum(weights);
					if( row.length && self._changedStackDirection(sum, weights, baseSize, datum.weight) ){
						addBounds(row, baseBound, baseSize, sum);
						row=[];
					}
					if( !row.length ){
						baseSize=self._selectBaseSize(baseBound);
						addBounds=self._getAddingBoundsFunction(baseBound);
					}
					row.push(datum);
				});
				if( row.length ){
					addBounds(row, baseBound, baseSize);
				}
				return this.boundMap;
			}
		};
		module.exports=squarifier;
		/***/
	},
	/* 73 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Zoom component.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var seriesTemplate=__webpack_require__(58);
		var chartConst=__webpack_require__(2);
		var dom=__webpack_require__(20);
		var renderUtil=__webpack_require__(23);
		var eventListener=__webpack_require__(31);
		var Zoom=tui.util.defineClass(/** @lends Zoom.prototype */{
			/**
			 * zoom component className
			 * @type {string}
			 */
			className:'tui-chart-zoom-area',
			/**
			 * Zoom component.
			 * @param {{eventBus: object}} params - parameters
			 * @constructs Zoom
			 * @private
			 */
			init:function( params ){
				/**
				 * event bus for transmitting message
				 * @type {object}
				 */
				this.eventBus=params.eventBus;
				/**
				 * Magnification.
				 * @type {number}
				 */
				this.magn=1;
				/**
				 * Stacked wheelDelta.
				 * @type {number}
				 */
				this.stackedWheelDelta=0;
				this._attachToEventBus();
			},
			/**
			 * Attach to event bus.
			 * @private
			 */
			_attachToEventBus:function(){
				this.eventBus.on('wheel', this.onWheel, this);
			},
			/**
			 * Render.
			 * @param {{positionMap: {series: {left: number, top: number}}}} data - data for rendering
			 * @returns {HTMLElement} zoom container
			 */
			render:function( data ){
				var container=dom.create('DIV', this.className);
				container.innerHTML+=seriesTemplate.ZOOM_BUTTONS;
				renderUtil.renderPosition(container, data.positionMap.series);
				this._attachEvent(container);
				return container;
			},
			/**
			 * Find button element.
			 * @param {HTMLElement} target target element.
			 * @returns {?HTMLElement} button element
			 * @private
			 */
			_findBtnElement:function( target ){
				var btnClassName='tui-chart-zoom-btn',
					btnElement=target;
				if( !dom.hasClass(target, btnClassName) ){
					btnElement=dom.findParentByClass(target, btnClassName);
				}
				return btnElement;
			},
			/**
			 * Zoom
			 * @param {number} magn magnification
			 * @param {?{left: number, top: number}} position mouse position
			 * @private
			 */
			_zoom:function( magn, position ){
				var changedMagn=Math.min(Math.max(1, this.magn*magn), chartConst.MAX_ZOOM_MAGN);
				if( changedMagn!==this.magn ){
					this.magn=changedMagn;
					this.eventBus.fire('zoomMap', this.magn, position);
				}
			},
			/**
			 * On click.
			 * @param {MouseEvent} e mouse event
			 * @returns {?boolean} prevent default for ie
			 * @private
			 */
			_onClick:function( e ){
				var target=e.target || e.srcElement,
					btnElement=this._findBtnElement(target),
					magn;
				if( btnElement ){
					magn=parseFloat(btnElement.getAttribute('data-magn'));
					this._zoom(magn);
				}
				if( e.preventDefault ){
					e.preventDefault();
				}
				return false;
			},
			/**
			 * Attach event.
			 * @param {HTMLElement} target target element
			 * @private
			 */
			_attachEvent:function( target ){
				eventListener.on(target, 'click', this._onClick, this);
			},
			/**
			 * Calculate magnification from wheelDelta.
			 * @param {number} wheelDelta wheelDelta
			 * @returns {number} magnification
			 * @private
			 */
			_calculateMagn:function( wheelDelta ){
				var tick=parseInt(wheelDelta/chartConst.WHEEL_TICK, 10),
					magn;
				if( tick > 0 ){
					magn=Math.pow(2, tick);
				}else{
					magn=Math.pow(0.5, Math.abs(tick));
				}
				return magn;
			},
			/**
			 * On wheel.
			 * @param {number} wheelDelta wheelDelta
			 * @param {{left: number, top: number}} position mouse position
			 */
			onWheel:function( wheelDelta, position ){
				var magn;
				if( Math.abs(wheelDelta) < chartConst.WHEEL_TICK ){
					this.stackedWheelDelta+=wheelDelta;
				}else{
					this.stackedWheelDelta=wheelDelta;
				}
				if( Math.abs(this.stackedWheelDelta) < chartConst.WHEEL_TICK ){
					return;
				}
				magn=this._calculateMagn(this.stackedWheelDelta);
				this._zoom(magn, position);
				this.stackedWheelDelta=this.stackedWheelDelta%chartConst.WHEEL_TICK;
			}
		});
		module.exports=Zoom;
		/***/
	},
	/* 74 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview DataProcessor process rawData.
		 * rawData.categories --> categories
		 * rawData.series --> SeriesDataModel, legendLabels, legendData
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var DataProcessorBase=__webpack_require__(75);
		var SeriesDataModel=__webpack_require__(76);
		var SeriesDataModelForTreemap=__webpack_require__(80);
		var SeriesGroup=__webpack_require__(77);
		var rawDataHandler=__webpack_require__(4);
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		var calculator=__webpack_require__(22);
		var objectUtil=__webpack_require__(11);
		var concat=Array.prototype.concat;
		/*
		 * Raw series datum.
		 * @typedef {{name: ?string, data: Array.<number>, stack: ?string}} rawSeriesDatum
		 */
		/*
		 * Raw series data.
		 * @typedef {Array.<rawSeriesDatum>} rawSeriesData
		 */
		/*
		 * Raw data by user.
		 * @typedef {{
		 *      categories: ?Array.<string>,
		 *      series: (rawSeriesData|{line: ?rawSeriesData, column: ?rawSeriesData})
		 * }} rawData
		 */
		/*
		 * SeriesDataModel is base model for drawing graph of chart series area,
		 *      and create from rawSeriesData by user,
		 * SeriesDataModel.groups has SeriesGroups.
		 */
		/*
		 * SeriesGroup is a element of SeriesDataModel.groups.
		 * SeriesGroup.items has SeriesItem.
		 */
		var DataProcessor=tui.util.defineClass(DataProcessorBase, /** @lends DataProcessor.prototype */{
			/**
			 * Data processor.
			 * @constructs DataProcessor
			 * @private
			 * @param {rawData} rawData raw data
			 * @param {string} chartType chart type
			 * @param {object} options options
			 * @param {Array.<string>} seriesNames chart types
			 */
			init:function( rawData, chartType, options, seriesNames ){
				/**
				 * original raw data.
				 * @type {{categories: ?Array.<string>, series: Array.<object>}}
				 */
				this.originalRawData=objectUtil.deepCopy(rawData);
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=chartType;
				/**
				 * chart options
				 * @type {Object}
				 */
				this.options=options;
				/**
				 * seriesNames is sorted chart types for rendering series area of combo chart.
				 * @type {Array.<string>}
				 */
				this.seriesNames=seriesNames;
				/**
				 * legend data for rendering legend of group tooltip
				 * @type {Array.<{chartType: string, label: string}>}
				 */
				this.originalLegendData=null;
				/**
				 * dynamic data array for adding data.
				 * @type {Array.<{category: string | number, values: Array.<number>}>}
				 */
				this.dynamicData=[];
				this.initData(rawData);
				this.initZoomedRawData();
				this.baseInit();
			},
			/**
			 * Get original raw data.
			 * @returns {rawData} raw data
			 */
			getOriginalRawData:function(){
				return objectUtil.deepCopy(this.originalRawData);
			},
			/**
			 * Get zoomed raw data.
			 * @returns {*|null}
			 */
			getZoomedRawData:function(){
				var zoomedRawData=this.zoomedRawData;
				if( zoomedRawData ){
					zoomedRawData=objectUtil.deepCopy(zoomedRawData);
				}else{
					zoomedRawData=this.getOriginalRawData();
				}
				return zoomedRawData;
			},
			/**
			 * Filter seriesData by index range.
			 * @param {Array.<{data: Array}>} seriesData - series data
			 * @param {number} startIndex - start index
			 * @param {number} endIndex - end index
			 * @returns {Array.<Array.<object>>}
			 * @private
			 */
			_filterSeriesDataByIndexRange:function( seriesData, startIndex, endIndex ){
				tui.util.forEachArray(seriesData, function( seriesDatum ){
					seriesDatum.data=seriesDatum.data.slice(startIndex, endIndex+1);
				});
				return seriesData;
			},
			/**
			 * Filter raw data by index range.
			 * @param {{series: Array.<object>, categories: Array.<string>}} rawData - raw data
			 * @param {Array.<number>} indexRange - index range for zoom
			 * @returns {*}
			 * @private
			 */
			_filterRawDataByIndexRange:function( rawData, indexRange ){
				var self=this;
				var startIndex=indexRange[0];
				var endIndex=indexRange[1];
				tui.util.forEach(rawData.series, function( seriesDataSet, seriesName ){
					rawData.series[seriesName]=self._filterSeriesDataByIndexRange(seriesDataSet, startIndex, endIndex);
				});
				rawData.categories=rawData.categories.slice(startIndex, endIndex+1);
				return rawData;
			},
			/**
			 * Update raw data for zoom
			 * @param {Array.<number>} indexRange - index range for zoom
			 */
			updateRawDataForZoom:function( indexRange ){
				var rawData=this.getRawData();
				var zoomedRawData=this.getZoomedRawData();
				this.zoomedRawData=this._filterRawDataByIndexRange(zoomedRawData, indexRange);
				rawData=this._filterRawDataByIndexRange(rawData, indexRange);
				this.initData(rawData);
			},
			/**
			 * Init zoomed raw data.
			 */
			initZoomedRawData:function(){
				this.zoomedRawData=null;
			},
			/**
			 * Initialize data.
			 * @param {rawData} rawData raw data
			 */
			initData:function( rawData ){
				/**
				 * raw data
				 * @type {rawData}
				 */
				this.rawData=rawData;
				/**
				 * categoriesMap
				 * @type {null|object}
				 */
				this.categoriesMap=null;
				/**
				 * stacks
				 * @type {Array.<number>}
				 */
				this.stacks=null;
				/**
				 * seriesDataModel map
				 * @type {object.<string, SeriesDataModel>}
				 */
				this.seriesDataModelMap={};
				/**
				 * SeriesGroups
				 * @type {Array.<SeriesGroup>}
				 */
				this.seriesGroups=null;
				/**
				 * map of values of SeriesItems
				 * @type {Object.<string, Array.<number>>}
				 */
				this.valuesMap={};
				/**
				 * legend labels for rendering legend area
				 * @type {{column: Array.<string>, line: Array.<string> | Array.<string>}}
				 */
				this.legendLabels=null;
				/**
				 * legend data for rendering legend
				 * @type {Array.<{chartType: string, label: string}>}
				 */
				this.legendData=null;
				/**
				 * multiline categories
				 * @type {Array.<string>}
				 */
				this.multilineCategories=null;
				/**
				 * whether coordinate type data or not
				 * @type {null|boolean}
				 */
				this.coordinateType=null;
			},
			/**
			 * Get raw data.
			 * @returns {rawData}
			 */
			getRawData:function(){
				return this.rawData;
			},
			/**
			 * Find chart type from series name.
			 * @param {string} seriesName - series name
			 * @returns {*}
			 */
			findChartType:function( seriesName ){
				return rawDataHandler.findChartType(this.rawData.seriesAlias, seriesName);
			},
			/**
			 * Escape categories.
			 * @param {Array.<string, number>} categories - cetegories
			 * @returns {*|Array.<Object>|Array}
			 * @private
			 */
			_escapeCategories:function( categories ){
				return tui.util.map(categories, function( category ){
					return tui.util.encodeHTMLEntity(String(category));
				});
			},
			/**
			 * Map categories.
			 * @param {Array.<string | number>} categories - categories
			 * @returns {Array.<string | number>}
			 * @private
			 */
			_mapCategories:function( categories ){
				if( predicate.isDatetimeType(this.options.xAxis.type) ){
					categories=tui.util.map(categories, function( value ){
						var date=new Date(value);
						return date.getTime() || value;
					});
				}else{
					categories=this._escapeCategories(categories);
				}
				return categories;
			},
			/**
			 * Process categories.
			 * @param {string} type - category type (x or y)
			 * @returns {null | Array.<string>} processed categories
			 * @private
			 */
			_processCategories:function( type ){
				var rawCategories=this.rawData.categories;
				var categoriesMap={};
				if( tui.util.isArray(rawCategories) ){
					categoriesMap[type]=this._mapCategories(rawCategories);
				}else if( rawCategories ){
					if( rawCategories.x ){
						categoriesMap.x=this._mapCategories(rawCategories.x);
					}
					if( rawCategories.y ){
						categoriesMap.y=this._mapCategories(rawCategories.y).reverse();
					}
				}
				return categoriesMap;
			},
			/**
			 * Get Categories
			 * @param {boolean} isVertical - whether vertical or not
			 * @returns {Array.<string>}}
			 */
			getCategories:function( isVertical ){
				var type=isVertical ? 'y' : 'x';
				var foundCategories=[];
				if( !this.categoriesMap ){
					this.categoriesMap=this._processCategories(type);
				}
				if( tui.util.isExisty(isVertical) ){
					foundCategories=this.categoriesMap[type] || [];
				}else{
					tui.util.forEach(this.categoriesMap, function( categories ){
						foundCategories=categories;
						return false;
					});
				}
				return foundCategories;
			},
			/**
			 * Get category count.
			 * @param {boolean} isVertical - whether vertical or not
			 * @returns {*}
			 */
			getCategoryCount:function( isVertical ){
				var categories=this.getCategories(isVertical);
				return categories ? categories.length : 0;
			},
			/**
			 * Whether has categories or not.
			 * @param {boolean} isVertical - whether vertical or not
			 * @returns {boolean}
			 */
			hasCategories:function( isVertical ){
				return !!this.getCategoryCount(isVertical);
			},
			/**
			 * Whether count of x data grater than count of y data.
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			isXCountGreaterThanYCount:function( chartType ){
				var seriesDataModel=this.getSeriesDataModel(chartType);
				return seriesDataModel.isXCountGreaterThanYCount();
			},
			/**
			 * Whether has x value or not.
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			hasXValue:function( chartType ){
				var hasVerticalCategory=this.isXCountGreaterThanYCount(chartType);
				return !this.hasCategories(hasVerticalCategory) || hasVerticalCategory;
			},
			/**
			 * Whether has y value or not.
			 * @param {string} chartType - chart type
			 * @returns {boolean}
			 */
			hasYValue:function( chartType ){
				var hasVerticalCategory=this.isXCountGreaterThanYCount(chartType);
				return !this.hasCategories(hasVerticalCategory) || !hasVerticalCategory;
			},
			/**
			 * Get category.
			 * @param {number} index index
			 * @param {boolean} isVertical - whether vertical or not
			 * @returns {string} category
			 */
			getCategory:function( index, isVertical ){
				return this.getCategories(isVertical)[index];
			},
			/**
			 * Find category index by value
			 * @param {string} value - category value
			 * @returns {null|number}
			 */
			findCategoryIndex:function( value ){
				var categories=this.getCategories();
				var foundIndex=null;
				tui.util.forEachArray(categories, function( category, index ){
					if( category===value ){
						foundIndex=index;
					}
					return tui.util.isNull(foundIndex);
				});
				return foundIndex;
			},
			/**
			 * Get tooltip category.
			 * @param {number} categoryIndex - category index
			 * @param {boolean} isVertical - whether vertical category or not
			 * @returns {string}
			 * @private
			 */
			_getTooltipCategory:function( categoryIndex, isVertical ){
				var category=this.getCategory(categoryIndex, isVertical);
				var axisType=isVertical ? 'yAxis' : 'xAxis';
				var options=this.options[axisType] || {};
				if( predicate.isDatetimeType(options.type) ){
					category=renderUtil.formatDate(category, options.dateFormat);
				}
				return category;
			},
			/**
			 * Make category for tooltip.
			 * @param {number} categoryIndex - category index
			 * @param {number} oppositeIndex - opposite index
			 * @param {boolean} isVerticalChart - whether vertical chart or not
			 * @returns {string}
			 */
			makeTooltipCategory:function( categoryIndex, oppositeIndex, isVerticalChart ){
				var isVertical=!isVerticalChart;
				var category=this._getTooltipCategory(categoryIndex, isVertical);
				var categoryCount=this.getCategoryCount(!isVertical);
				if( categoryCount ){
					category+=', '+this._getTooltipCategory(categoryCount-oppositeIndex-1, !isVertical);
				}
				return category;
			},
			/**
			 * Get stacks from raw series data.
			 * @param {string} seriesType seriesType to count stacks
			 * @returns {Array.<string>}
			 */
			getStacks:function( seriesType ){
				if( !this.stacks ){
					this.stacks=rawDataHandler.pickStacks(this.rawData.series[seriesType]);
				}
				return this.stacks;
			},
			/**
			 * Get stack count.
			 * @param {string} seriesType - series type
			 * @returns {Number}
			 */
			getStackCount:function( seriesType ){
				return this.getStacks(seriesType).length;
			},
			/**
			 * Find stack index from stack list by stack value.
			 * @param {string} stack stack
			 * @returns {number}
			 */
			findStackIndex:function( stack ){
				return tui.util.inArray(stack, this.getStacks());
			},
			/**
			 * Whether coordinate type or not.
			 * @returns {boolean}
			 */
			isCoordinateType:function(){
				var chartType=this.chartType;
				var coordinateType=this.coordinateType;
				if( !tui.util.isExisty(coordinateType) ){
					coordinateType=predicate.isCoordinateTypeChart(chartType);
					coordinateType=coordinateType || predicate.isLineScatterComboChart(chartType, this.seriesNames);
					coordinateType=coordinateType || (predicate.isLineTypeChart(chartType) && !this.hasCategories());
					this.coordinateType=coordinateType;
				}
				return coordinateType;
			},
			/**
			 * Get SeriesDataModel.
			 * @param {string} seriesName - series name
			 * @returns {SeriesDataModel}
			 */
			getSeriesDataModel:function( seriesName ){
				var rawSeriesData, chartType, SeriesDataModelClass;
				if( !this.seriesDataModelMap[seriesName] ){
					chartType=this.findChartType(seriesName);
					rawSeriesData=this.rawData.series[seriesName];
					if( predicate.isTreemapChart(this.chartType) ){
						SeriesDataModelClass=SeriesDataModelForTreemap;
					}else{
						SeriesDataModelClass=SeriesDataModel;
					}
					this.seriesDataModelMap[seriesName]=new SeriesDataModelClass(rawSeriesData, chartType,
						this.options, this.getFormatFunctions(), this.isCoordinateType());
				}
				return this.seriesDataModelMap[seriesName];
			},
			/**
			 * Get group count.
			 * @param {string} chartType chart type
			 * @returns {number}
			 */
			getGroupCount:function( chartType ){
				return this.getSeriesDataModel(chartType).getGroupCount();
			},
			/**
			 * Push category.
			 * @param {string} category - category
			 * @private
			 */
			_pushCategory:function( category ){
				if( this.rawData.categories ){
					this.rawData.categories.push(category);
					this.originalRawData.categories.push(category);
				}
			},
			/**
			 * Shift category.
			 * @private
			 */
			_shiftCategory:function(){
				if( this.rawData.categories ){
					this.rawData.categories.shift();
					this.originalRawData.categories.shift();
				}
			},
			/**
			 * Find raw series datum by name.
			 * @param {string} name - legend name
			 * @param {string} [seriesName] - series name
			 * @returns {object}
			 * @private
			 */
			_findRawSeriesDatumByName:function( name, seriesName ){
				var foundSeriesDatum=null;
				var seriesData=this.rawData.series[seriesName];
				tui.util.forEachArray(seriesData, function( seriesDatum ){
					var isEqual=seriesDatum.name===name;
					if( isEqual ){
						foundSeriesDatum=seriesDatum;
					}
					return !isEqual;
				});
				return foundSeriesDatum;
			},
			/**
			 * Push value to data property of series.
			 * @param {{name: string, data: Array}} seriesDatum - series datum
			 * @param {Array.<number>|{x: number, y: number, r: number}|number} value - value
			 * @param {string} seriesName - sereis name
			 * @private
			 */
			_pushValue:function( seriesDatum, value, seriesName ){
				var rawSeriesDatum=this._findRawSeriesDatumByName(seriesDatum.name, seriesName);
				seriesDatum.data.push(value);
				if( rawSeriesDatum ){
					rawSeriesDatum.data.push(value);
				}
			},
			/**
			 * Push values to series of originalRawData and series of rawData.
			 * @param {Array.<{name: string, data: Array}>} seriesData - series data
			 * @param {Array} values - values
			 * @param {string} [seriesName] - series name
			 * @private
			 */
			_pushValues:function( seriesData, values, seriesName ){
				var self=this;
				tui.util.forEachArray(seriesData, function( seriesDatum, index ){
					self._pushValue(seriesDatum, values[index], seriesName);
				});
			},
			/**
			 * Push series data.
			 * @param {Array.<number>} values - values
			 * @private
			 */
			_pushSeriesData:function( values ){
				var self=this;
				var temp;
				if( this.chartType!=='combo' && tui.util.isArray(values) ){
					temp=values;
					values={};
					values[this.chartType]=temp;
				}
				tui.util.forEach(this.originalRawData.series, function( seriesData, seriesName ){
					self._pushValues(seriesData, values[seriesName], seriesName);
				});
			},
			/**
			 * Shift values.
			 * @param {Array.<{name: string, data: Array}>} seriesData - series data
			 * @param {string} seriesName - series name
			 * @private
			 */
			_shiftValues:function( seriesData, seriesName ){
				var self=this;
				tui.util.forEachArray(seriesData, function( seriesDatum ){
					var rawSeriesDatum=self._findRawSeriesDatumByName(seriesDatum.name, seriesName);
					seriesDatum.data.shift();
					if( rawSeriesDatum ){
						rawSeriesDatum.data.shift();
					}
				});
			},
			/**
			 * Shift series data.
			 * @private
			 */
			_shiftSeriesData:function(){
				var self=this;
				tui.util.forEach(this.originalRawData.series, function( seriesData, seriesName ){
					self._shiftValues(seriesData, seriesName);
				});
			},
			/**
			 * Add dynamic data.
			 * @param {string} category - category
			 * @param {Array.<number>} values - values
			 */
			addDynamicData:function( category, values ){
				this.dynamicData.push({
					category:category,
					values:values
				});
			},
			/**
			 * Push dynamic data.
			 * @param {{category: string, values: Array.<number>}} data - adding data
			 * @private
			 */
			_pushDynamicData:function( data ){
				this._pushCategory(data.category);
				this._pushSeriesData(data.values);
			},
			/**
			 * Push dynamic data for coordinate type.
			 * @param {object.<string, Array.<number>|object.<string, number>>} data - adding data
			 * @private
			 */
			_pushDynamicDataForCoordinateType:function( data ){
				var self=this;
				tui.util.forEachArray(this.originalRawData.series, function( seriesDatum ){
					self._pushValue(seriesDatum, data[seriesDatum.name]);
				});
			},
			/**
			 * Add data from dynamic data.
			 * @returns {boolean}
			 */
			addDataFromDynamicData:function(){
				var datum=this.dynamicData.shift();
				if( datum ){
					if( this.isCoordinateType() ){
						this._pushDynamicDataForCoordinateType(datum.values);
					}else{
						this._pushDynamicData(datum);
					}
					this.initData(this.rawData);
				}
				return !!datum;
			},
			/**
			 * Shift data.
			 */
			shiftData:function(){
				this._shiftCategory();
				this._shiftSeriesData();
				this.initData(this.rawData);
			},
			/**
			 * Add data from remain dynamic data.
			 * @param {boolean} shiftingOption - whether has shifting option or not.
			 */
			addDataFromRemainDynamicData:function( shiftingOption ){
				var self=this;
				var dynamicData=this.dynamicData;
				this.dynamicData=[];
				tui.util.forEach(dynamicData, function( datum ){
					self._pushCategory(datum.category);
					self._pushSeriesData(datum.values);
					if( shiftingOption ){
						self._shiftCategory();
						self._shiftSeriesData();
					}
				});
				this.initData(this.rawData);
			},
			/**
			 * Traverse all SeriesDataModel by seriesNames, and executes iteratee function.
			 * @param {function} iteratee iteratee function
			 * @private
			 */
			_eachByAllSeriesDataModel:function( iteratee ){
				var self=this,
					seriesNames=this.seriesNames || [this.chartType];
				tui.util.forEachArray(seriesNames, function( chartType ){
					return iteratee(self.getSeriesDataModel(chartType), chartType);
				});
			},
			/**
			 * Whether valid all SeriesDataModel or not.
			 * @returns {boolean}
			 */
			isValidAllSeriesDataModel:function(){
				var isValid=true;
				this._eachByAllSeriesDataModel(function( seriesDataModel ){
					isValid= !!seriesDataModel.getGroupCount();
					return isValid;
				});
				return isValid;
			},
			/**
			 * Make SeriesGroups.
			 * @returns {Array.<SeriesGroup>}
			 * @private
			 */
			_makeSeriesGroups:function(){
				var joinedGroups=[],
					seriesGroups;
				this._eachByAllSeriesDataModel(function( seriesDataModel ){
					seriesDataModel.each(function( seriesGroup, index ){
						if( !joinedGroups[index] ){
							joinedGroups[index]=[];
						}
						joinedGroups[index]=joinedGroups[index].concat(seriesGroup.items);
					});
				});
				seriesGroups=tui.util.map(joinedGroups, function( items ){
					return new SeriesGroup(items);
				});
				return seriesGroups;
			},
			/**
			 * Get SeriesGroups.
			 * @returns {Array.<SeriesGroup>}
			 */
			getSeriesGroups:function(){
				if( !this.seriesGroups ){
					this.seriesGroups=this._makeSeriesGroups();
				}
				return this.seriesGroups;
			},
			/**
			 * Get value.
			 * @param {number} groupIndex group index
			 * @param {number} index index
			 * @param {?string} chartType chart type
			 * @returns {number} value
			 */
			getValue:function( groupIndex, index, chartType ){
				return this.getSeriesDataModel(chartType).getValue(groupIndex, index);
			},
			/**
			 * Create values that picked value from SeriesItems of specific SeriesDataModel.
			 * @param {?string} chartType - type of chart
			 * @param {?string} valueType - type of value like value, x, y, r.
			 * @returns {Array.<number>}
			 * @private
			 */
			_createValues:function( chartType, valueType ){
				var values;
				if( predicate.isComboChart(chartType) ){
					values=[];
					this._eachByAllSeriesDataModel(function( seriesDataModel ){
						values=values.concat(seriesDataModel.getValues(valueType));
					});
				}else{
					values=this.getSeriesDataModel(chartType).getValues(valueType);
				}
				return values;
			},
			/**
			 * Get values from valuesMap.
			 * @param {?string} chartType - type of chart
			 * @param {?string} valueType - type of value like value, x, y, r.
			 * @returns {Array.<number>}
			 */
			getValues:function( chartType, valueType ){
				var mapKey;
				// chartType = chartType || chartConst.DUMMY_KEY;
				mapKey=chartType+valueType;
				if( !this.valuesMap[mapKey] ){
					this.valuesMap[mapKey]=this._createValues(chartType, valueType);
				}
				return this.valuesMap[mapKey];
			},
			/**
			 * Traverse SeriesGroup of all SeriesDataModel, and executes iteratee function.
			 * @param {function} iteratee iteratee function
			 * @param {boolean} [isPivot] - whether pivot or not
			 */
			eachBySeriesGroup:function( iteratee, isPivot ){
				this._eachByAllSeriesDataModel(function( seriesDataModel, chartType ){
					seriesDataModel.each(function( seriesGroup, groupIndex ){
						iteratee(seriesGroup, groupIndex, chartType);
					}, isPivot);
				});
			},
			/**
			 * Pick legend label.
			 * @param {object} item item
			 * @returns {string} label
			 * @private
			 */
			_pickLegendLabel:function( item ){
				return item.name ? tui.util.encodeHTMLEntity(item.name) : null;
			},
			/**
			 * Pick legend visibility.
			 * @param {object} item item
			 * @returns {boolean}
			 * @private
			 */
			_isVisibleLegend:function( item ){
				var visibility=true;
				if( tui.util.isExisty(item.visible) && item.visible===false ){
					visibility=false;
				}
				return visibility;
			},
			/**
			 * Pick legend labels or visibilities from raw data.
			 * @param {string} dataType data type of picking values
			 * @returns {string[]|boolean[]} labels or visibilities
			 * @private
			 */
			_pickLegendData:function( dataType ){
				var seriesData=this.rawData.series;
				var result={};
				var pickerMethod;
				if( dataType==='visibility' ){
					pickerMethod=this._isVisibleLegend;
				}else if( dataType==='label' ){
					pickerMethod=this._pickLegendLabel;
				}
				if( pickerMethod ){
					tui.util.forEach(seriesData, function( seriesDatum, seriesType ){
						result[seriesType]=tui.util.map(seriesDatum, pickerMethod);
					});
					result=tui.util.filter(result, tui.util.isExisty);
				}
				return result;
			},
			/**
			 * Get legend labels.
			 * @param {?string} chartType chart type
			 * @returns {Array.<string> | {column: ?Array.<string>, line: ?Array.<string>}} legend labels
			 */
			getLegendLabels:function( chartType ){
				if( !this.legendLabels ){
					this.legendLabels=this._pickLegendData('label');
				}
				return this.legendLabels[chartType] || this.legendLabels;
			},
			/**
			 * Get legend visibility.
			 * @param {?string} chartType chart type
			 * @returns {Array.<string> | {column: ?Array.<string>, line: ?Array.<string>}} legend labels
			 */
			getLegendVisibility:function( chartType ){
				if( !this.legendVisibilities ){
					this.legendVisibilities=this._pickLegendData('visibility');
				}
				return this.legendVisibilities[chartType] || this.legendVisibilities;
			},
			/**
			 * Make legend data.
			 * @returns {Array} labels
			 * @private
			 */
			_makeLegendData:function(){
				var legendLabels=this.getLegendLabels(this.chartType);
				var seriesNames=this.seriesNames || [this.chartType];
				var legendLabelsMap, legendData;
				var legendVisibilities=this.getLegendVisibility();
				if( tui.util.isArray(legendLabels) ){
					legendLabelsMap=[this.chartType];
					legendLabelsMap[this.chartType]=legendLabels;
				}else{
					seriesNames=this.seriesNames;
					legendLabelsMap=legendLabels;
				}
				legendData=tui.util.map(seriesNames, function( chartType ){
					return tui.util.map(legendLabelsMap[chartType], function( label, index ){
						var is2DArray=tui.util.isArray(legendVisibilities[chartType]);
						return {
							chartType:chartType,
							label:label,
							visible:is2DArray ? legendVisibilities[chartType][index] : legendVisibilities[index]
						};
					});
				});
				return concat.apply([], legendData);
			},
			/**
			 * Get legend data.
			 * @returns {Array.<{chartType: string, label: string}>} legend data
			 */
			getLegendData:function(){
				if( !this.legendData ){
					this.legendData=this._makeLegendData();
				}
				if( !this.originalLegendData ){
					this.originalLegendData=this.legendData;
				}
				return this.legendData;
			},
			/**
			 * get original legend data.
			 * @returns {Array.<{chartType: string, label: string}>}
			 */
			getOriginalLegendData:function(){
				return this.originalLegendData;
			},
			/**
			 * Get legend item.
			 * @param {number} index index
			 * @returns {{chartType: string, label: string}} legend data
			 */
			getLegendItem:function( index ){
				return this.getLegendData()[index];
			},
			/**
			 * Get first label of SeriesItem.
			 * @param {?string} chartType chartType
			 * @returns {string} formatted value
			 */
			getFirstItemLabel:function( chartType ){
				return this.getSeriesDataModel(chartType).getFirstItemLabel();
			},
			/**
			 * Add data ratios of pie chart.
			 * @param {string} chartType - type of chart.
			 */
			addDataRatiosOfPieChart:function( chartType ){
				this.getSeriesDataModel(chartType).addDataRatiosOfPieChart();
			},
			/**
			 * Add data ratios for chart of coordinate type.
			 * @param {string} chartType - type of chart.
			 * @param {{x: {min: number, max: number}, y: {min: number, max: number}}} limitMap - limit map
			 * @param {boolean} [hasRadius] - whether has radius or not
			 */
			addDataRatiosForCoordinateType:function( chartType, limitMap, hasRadius ){
				if( predicate.isLineTypeChart(chartType) ){
					this._addStartValueToAllSeriesItem(limitMap.yAxis, chartType);
				}
				this.getSeriesDataModel(chartType).addDataRatiosForCoordinateType(limitMap, hasRadius);
			},
			/**
			 * Add start value to all series item.
			 * @param {{min: number, max: number}} limit - limit
			 * @param {string} chartType - chart type
			 * @private
			 */
			_addStartValueToAllSeriesItem:function( limit, chartType ){
				var start=0;
				if( limit.min >= 0 ){
					start=limit.min;
				}else if( limit.max <= 0 ){
					start=limit.max;
				}
				this.getSeriesDataModel(chartType).addStartValueToAllSeriesItem(start);
			},
			/**
			 * Register percent values.
			 * @param {{min: number, max: number}} limit axis limit
			 * @param {string} stackType stackType option
			 * @param {string} chartType chart type
			 */
			addDataRatios:function( limit, stackType, chartType ){
				var seriesDataModel=this.getSeriesDataModel(chartType);
				this._addStartValueToAllSeriesItem(limit, chartType);
				seriesDataModel.addDataRatios(limit, stackType);
			},
			/**
			 * Add data ratios for treemap chart.
			 * @param {{min: number, max: number}} limit - limit
			 * @param {string} chartType - chart type
			 */
			addDataRatiosForTreemapChart:function( limit, chartType ){
				this.getSeriesDataModel(chartType).addDataRatios(limit);
			},
			/**
			 * Create base values for normal stackType chart.
			 * @param {string} chartType - chart type
			 * @returns {Array.<number>}
			 * @private
			 */
			_createBaseValuesForNormalStackedChart:function( chartType ){
				var seriesDataModel=this.getSeriesDataModel(chartType);
				var baseValues=[];
				seriesDataModel.each(function( seriesGroup ){
					var valuesMap=seriesGroup._makeValuesMapPerStack();
					tui.util.forEach(valuesMap, function( values ){
						var plusSum=calculator.sumPlusValues(values);
						var minusSum=calculator.sumMinusValues(values);
						baseValues=baseValues.concat([plusSum, minusSum]);
					});
				});
				return baseValues;
			},
			/**
			 * Create base values for calculating limit
			 * @param {string} chartType - chart type
			 * @param {boolean} isSingleYAxis = whether single y axis or not
			 * @param {string} stackType - stack type
			 * @param {string} valueType - value type
			 * @returns {Array.<number>}
			 */
			createBaseValuesForLimit:function( chartType, isSingleYAxis, stackType, valueType ){
				var baseValues;
				if( predicate.isComboChart(this.chartType) && isSingleYAxis ){
					baseValues=this.getValues(this.chartType, valueType);
					if( predicate.isNormalStackChart(chartType, stackType) ){
						baseValues=baseValues.concat(this._createBaseValuesForNormalStackedChart(chartType));
					}
				}else if( predicate.isTreemapChart(chartType) ){
					baseValues=this.getValues(chartType, 'colorValue');
				}else if( predicate.isNormalStackChart(chartType, stackType) ){
					baseValues=this._createBaseValuesForNormalStackedChart(chartType);
				}else{
					baseValues=this.getValues(chartType, valueType);
				}
				return baseValues;
			},
			/**
			 * Find overflow item than graph area
			 * @param {string} chartType - chart type
			 * @param {string} valueType - value type
			 * @returns {{minItem: SeriesItem, maxItem: SeriesItem}}
			 */
			findOverflowItem:function( chartType, valueType ){
				var seriesDataModel=this.getSeriesDataModel(chartType);
				var maxRadiusValue=seriesDataModel.getMaxValue('r');
				var isBiggerRatioThanHalfRatio=function( seriesItem ){
					return (seriesItem.r/maxRadiusValue) > chartConst.HALF_RATIO;
				};
				return {
					minItem:seriesDataModel.findMinSeriesItem(valueType, isBiggerRatioThanHalfRatio),
					maxItem:seriesDataModel.findMaxSeriesItem(valueType, isBiggerRatioThanHalfRatio)
				};
			}
		});
		module.exports=DataProcessor;
		/***/
	},
	/* 75 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview data processor base.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var arrayUtil=__webpack_require__(6);
		var renderUtil=__webpack_require__(23);
		var calculator=__webpack_require__(22);
		/**
		 * @classdesc data processor base.
		 * @class DataProcessorBase
		 * @private
		 */
		var DataProcessorBase=tui.util.defineClass(/** @lends DataProcessorBase.prototype */{
			/**
			 * Initialize.
			 */
			baseInit:function(){
				/**
				 * functions for formatting
				 * @type {Array.<function>}
				 */
				this.formatFunctions=null;
			},
			/**
			 * Get values.
			 * @abstract
			 * @returns {Array}
			 */
			getValues:function(){
			},
			/**
			 * Get max value.
			 * @param {?string} chartType - type of chart
			 * @param {?string} valueType - type of value like value, x, y, r
			 * @returns {number}
			 */
			getMaxValue:function( chartType, valueType ){
				return arrayUtil.max(this.getValues(chartType, valueType));
			},
			/**
			 * Get formatted max value.
			 * @param {?string} chartType - type of chart
			 * @param {?string} areaType - type of area like circleLegend
			 * @param {?string} valueType - type of value like value, x, y, r
			 * @returns {string | number}
			 */
			getFormattedMaxValue:function( chartType, areaType, valueType ){
				var maxValue=this.getMaxValue(chartType, valueType);
				var formatFunctions=this.getFormatFunctions();
				return renderUtil.formatValue(maxValue, formatFunctions, chartType, areaType, valueType);
			},
			/**
			 * Pick max length under point.
			 * @param {string[]} values chart values
			 * @returns {number} max length under point
			 * @private
			 */
			_pickMaxLenUnderPoint:function( values ){
				var max=0;
				tui.util.forEachArray(values, function( value ){
					var len=calculator.getDecimalLength(value);
					if( len > max ){
						max=len;
					}
				});
				return max;
			},
			/**
			 * Whether zero fill format or not.
			 * @param {string} format format
			 * @returns {boolean} result boolean
			 * @private
			 */
			_isZeroFill:function( format ){
				return format.length > 2 && format.charAt(0)==='0';
			},
			/**
			 * Whether decimal format or not.
			 * @param {string} format format
			 * @returns {boolean} result boolean
			 * @private
			 */
			_isDecimal:function( format ){
				var indexOf=format.indexOf('.');
				return indexOf > -1 && indexOf < format.length-1;
			},
			/**
			 * Whether comma format or not.
			 * @param {string} format format
			 * @returns {boolean} result boolean
			 * @private
			 */
			_isComma:function( format ){
				return format.indexOf(',') > -1;
			},
			/**
			 * Format to zero fill.
			 * @param {number} len length of result
			 * @param {string} value target value
			 * @returns {string} formatted value
			 * @private
			 */
			_formatToZeroFill:function( len, value ){
				var isMinus=value < 0;
				value=renderUtil.formatToZeroFill(Math.abs(value), len);
				return (isMinus ? '-' : '')+value;
			},
			/**
			 * Format to Decimal.
			 * @param {number} len length of under decimal point
			 * @param {string} value target value
			 * @returns {string} formatted value
			 * @private
			 */
			_formatToDecimal:function( len, value ){
				return renderUtil.formatToDecimal(value, len);
			},
			/**
			 * Find simple type format functions.
			 * @param {string} format - simple format
			 * @returns {Array.<function>}
			 */
			_findSimpleTypeFormatFunctions:function( format ){
				var funcs=[];
				var len;
				if( this._isDecimal(format) ){
					len=this._pickMaxLenUnderPoint([format]);
					funcs=[tui.util.bind(this._formatToDecimal, this, len)];
				}else if( this._isZeroFill(format) ){
					len=format.length;
					funcs=[tui.util.bind(this._formatToZeroFill, this, len)];
					return funcs;
				}
				if( this._isComma(format) ){
					funcs.push(renderUtil.formatToComma);
				}
				return funcs;
			},
			/**
			 * Find format functions.
			 * @returns {function[]} functions
			 */
			_findFormatFunctions:function(){
				var format=tui.util.pick(this.options, 'chart', 'format');
				var funcs=[];
				if( tui.util.isFunction(format) ){
					funcs=[format];
				}else if( tui.util.isString(format) ){
					funcs=this._findSimpleTypeFormatFunctions(format);
				}
				return funcs;
			},
			/**
			 * Get format functions.
			 * @returns {Array.<function>} functions
			 */
			getFormatFunctions:function(){
				if( !this.formatFunctions ){
					this.formatFunctions=this._findFormatFunctions();
				}
				return this.formatFunctions;
			}
		});
		module.exports=DataProcessorBase;
		/***/
	},
	/* 76 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview SeriesDataModel is base model for drawing graph of chart series area,
		 *                  and create from rawSeriesData by user,
		 * SeriesDataModel.groups has SeriesGroups.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/*
		 * Raw series datum.
		 * @typedef {{name: ?string, data: Array.<number>, stack: ?string}} rawSeriesDatum
		 */
		/*
		 * Raw series data.
		 * @typedef {Array.<rawSeriesDatum>} rawSeriesData
		 */
		/*
		 * Groups.
		 * @typedef {Array.<SeriesGroup>} groups
		 */
		/*
		 * SeriesGroup is a element of SeriesDataModel.groups.
		 * SeriesGroup.items has SeriesItem.
		 */
		/*
		 * SeriesItem is a element of SeriesGroup.items.
		 * SeriesItem has processed terminal data like value, ratio, etc.
		 */
		var SeriesGroup=__webpack_require__(77);
		var SeriesItem=__webpack_require__(78);
		var SeriesItemForCoordinateType=__webpack_require__(79);
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var arrayUtil=__webpack_require__(6);
		var concat=Array.prototype.concat;
		var SeriesDataModel=tui.util.defineClass(/** @lends SeriesDataModel.prototype */{
			/**
			 * SeriesDataModel is base model for drawing graph of chart series area,
			 *      and create from rawSeriesData by user.
			 * SeriesDataModel.groups has SeriesGroups.
			 * @constructs SeriesDataModel
			 * @private
			 * @param {rawSeriesData} rawSeriesData - raw series data
			 * @param {string} chartType - chart type
			 * @param {object} options - options
			 * @param {Array.<function>} formatFunctions - format functions
			 * @param {boolean} isCoordinateType - whether coordinate type or not
			 */
			init:function( rawSeriesData, chartType, options, formatFunctions, isCoordinateType ){
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=chartType;
				/**
				 * chart options
				 * @type {Object}
				 */
				this.options=options || {};
				/**
				 * functions for formatting
				 * @type {Array.<function>}
				 */
				this.formatFunctions=formatFunctions;
				/**
				 * rawData.series
				 * @type {rawSeriesData}
				 */
				this.rawSeriesData=rawSeriesData || [];
				/**
				 * whether coordinate type or not
				 * @type {boolean}
				 */
				this.isCoordinateType=isCoordinateType;
				/**
				 * baseGroups is base data for making SeriesGroups.
				 * SeriesGroups is made by pivoted baseGroups, lf line type chart.
				 * @type {Array.Array<SeriesItem>}
				 */
				this.baseGroups=null;
				/**
				 * groups has SeriesGroups.
				 * @type {Array.<SeriesGroup>}
				 */
				this.groups=null;
				this.options.series=this.options.series || {};
				/**
				 * whether diverging chart or not.
				 * @type {boolean}
				 */
				this.isDivergingChart=predicate.isDivergingChart(chartType, this.options.series.diverging);
				/**
				 * map of values by value type like value, x, y, r.
				 * @type {object.<string, Array.<number>>}
				 */
				this.valuesMap={};
				this._removeRangeValue();
			},
			/**
			 * Remove range value of item, if has stackType option.
			 * @private
			 */
			_removeRangeValue:function(){
				var seriesOption=tui.util.pick(this.options, 'series') || {};
				var allowRange=predicate.isAllowRangeData(this.chartType) &&
					!predicate.isValidStackOption(seriesOption.stackType) && !seriesOption.spline;
				if( allowRange || this.isCoordinateType ){
					return;
				}
				tui.util.forEachArray(this.rawSeriesData, function( rawItem ){
					if( !tui.util.isArray(rawItem.data) ){
						return;
					}
					tui.util.forEachArray(rawItem.data, function( value, index ){
						if( tui.util.isExisty(value) ){
							rawItem.data[index]=concat.apply(value)[0];
						}
					});
				});
			},
			/**
			 * Create base groups.
			 * Base groups is two-dimensional array by seriesItems.
			 * @returns {Array.<Array.<(SeriesItem | SeriesItemForCoordinateType)>>}
			 * @private
			 */
			_createBaseGroups:function(){
				var chartType=this.chartType;
				var formatFunctions=this.formatFunctions;
				var xAxisOption=this.options.xAxis;
				var isDivergingChart=this.isDivergingChart;
				var isCoordinateType=this.isCoordinateType;
				var isPieChart=predicate.isPieChart(this.chartType);
				var hasRawDatumAsArray=predicate.isHeatmapChart(this.chartType) || predicate.isTreemapChart(this.chartType);
				var sortValues, SeriesItemClass;
				if( isCoordinateType ){
					SeriesItemClass=SeriesItemForCoordinateType;
					sortValues=function( items ){
						items.sort(function( a, b ){
							return a.x-b.x;
						});
					};
				}else{
					SeriesItemClass=SeriesItem;
					sortValues=function(){
					};
				}
				return tui.util.map(this.rawSeriesData, function( rawDatum ){
					var stack, data;
					var items;
					data=tui.util.isArray(rawDatum) ? rawDatum : [].concat(rawDatum.data);
					if( !hasRawDatumAsArray ){
						stack=rawDatum.stack;
					}
					if( isCoordinateType || isPieChart ){
						data=tui.util.filter(data, tui.util.isExisty);
					}
					items=tui.util.map(data, function( datum, index ){
						return new SeriesItemClass({
							datum:datum,
							chartType:chartType,
							formatFunctions:formatFunctions,
							index:index,
							stack:stack,
							isDivergingChart:isDivergingChart,
							xAxisType:xAxisOption.type,
							dateFormat:xAxisOption.dateFormat
						});
					});
					sortValues(items);
					return items;
				});
			},
			/**
			 * Get base groups.
			 * @returns {Array.Array.<SeriesItem>}
			 * @private
			 */
			_getBaseGroups:function(){
				if( !this.baseGroups ){
					this.baseGroups=this._createBaseGroups();
				}
				return this.baseGroups;
			},
			/**
			 * Create SeriesGroups from rawData.series.
			 * @param {boolean} isPivot - whether pivot or not.
			 * @returns {Array.<SeriesGroup>}
			 * @private
			 */
			_createSeriesGroupsFromRawData:function( isPivot ){
				var baseGroups=this._getBaseGroups();
				if( isPivot ){
					baseGroups=arrayUtil.pivot(baseGroups);
				}
				return tui.util.map(baseGroups, function( items ){
					return new SeriesGroup(items);
				});
			},
			/**
			 * Get SeriesGroups.
			 * @returns {(Array.<SeriesGroup>|object)}
			 * @private
			 */
			_getSeriesGroups:function(){
				if( !this.groups ){
					this.groups=this._createSeriesGroupsFromRawData(true);
				}
				return this.groups;
			},
			/**
			 * Get group count.
			 * @returns {Number}
			 */
			getGroupCount:function(){
				return this._getSeriesGroups().length;
			},
			/**
			 * Get pivot groups.
			 * @returns {(Array.<SeriesGroup>|object)}
			 */
			_getPivotGroups:function(){
				if( !this.pivotGroups ){
					this.pivotGroups=this._createSeriesGroupsFromRawData();
				}
				return this.pivotGroups;
			},
			/**
			 * Get SeriesGroup.
			 * @param {number} index - index
			 * @param {boolean} [isPivot] - whether pivot or not
			 * @returns {SeriesGroup}
			 */
			getSeriesGroup:function( index, isPivot ){
				return isPivot ? this._getPivotGroups()[index] : this._getSeriesGroups()[index];
			},
			/**
			 * Get first SeriesGroup.
			 * @param {boolean} [isPivot] - whether pivot or not
			 * @returns {SeriesGroup}
			 */
			getFirstSeriesGroup:function( isPivot ){
				return this.getSeriesGroup(0, isPivot);
			},
			/**
			 * Get first label of SeriesItem.
			 * @returns {string} formatted value
			 */
			getFirstItemLabel:function(){
				return this.getFirstSeriesGroup().getFirstSeriesItem().label;
			},
			/**
			 * Get series item.
			 * @param {number} groupIndex - index of series groups
			 * @param {number} index - index of series items
			 * @param {boolean} [isPivot] - whether pivot or not
			 * @returns {SeriesItem}
			 */
			getSeriesItem:function( groupIndex, index, isPivot ){
				return this.getSeriesGroup(groupIndex, isPivot).getSeriesItem(index);
			},
			/**
			 * Get first series item.
			 * @returns {SeriesItem}
			 */
			getFirstSeriesItem:function(){
				return this.getSeriesItem(0, 0);
			},
			/**
			 * Get value.
			 * @param {number} groupIndex - index of series groups
			 * @param {number} index - index of series items
			 * @returns {number} value
			 */
			getValue:function( groupIndex, index ){
				return this.getSeriesItem(groupIndex, index).value;
			},
			/**
			 * Get minimum value.
			 * @param {string} valueType - value type like value, x, y, r.
			 * @returns {number}
			 */
			getMinValue:function( valueType ){
				return arrayUtil.min(this.getValues(valueType));
			},
			/**
			 * Get maximum value.
			 * @param {string} valueType - value type like value, x, y, r.
			 * @returns {number}
			 */
			getMaxValue:function( valueType ){
				return arrayUtil.max(this.getValues(valueType));
			},
			/**
			 * Traverse seriesGroups, and returns to found SeriesItem by result of execution seriesGroup.find with condition.
			 * @param {function} condition - condition function
			 * @returns {SeriesItem}
			 * @private
			 */
			_findSeriesItem:function( condition ){
				var foundItem;
				this.each(function( seriesGroup ){
					foundItem=seriesGroup.find(condition);
					return !foundItem;
				});
				return foundItem;
			},
			/**
			 * Find SeriesItem by value.
			 * @param {string} valueType - value type like value, x, y, r.
			 * @param {number} value - comparing value
			 * @param {function} condition - condition function
			 * @returns {SeriesItem}
			 * @private
			 */
			_findSeriesItemByValue:function( valueType, value, condition ){
				condition=condition || function(){
						return;
					};
				return this._findSeriesItem(function( seriesItem ){
					return seriesItem && (seriesItem[valueType]===value) && condition(seriesItem);
				});
			},
			/**
			 * Find minimum SeriesItem.
			 * @param {string} valueType - value type like value, x, y, r.
			 * @param {function} condition - condition function
			 * @returns {SeriesItem}
			 */
			findMinSeriesItem:function( valueType, condition ){
				var minValue=this.getMinValue(valueType);
				return this._findSeriesItemByValue(valueType, minValue, condition);
			},
			/**
			 * Find maximum SeriesItem.
			 * @param {string} valueType - value type like value, x, y, r.
			 * @param {function} condition - condition function
			 * @returns {*|SeriesItem}
			 */
			findMaxSeriesItem:function( valueType, condition ){
				var maxValue=this.getMaxValue(valueType);
				return this._findSeriesItemByValue(valueType, maxValue, condition);
			},
			/**
			 * Create values that picked value from SeriesItems of SeriesGroups.
			 * @param {?string} valueType - type of value
			 * @returns {Array.<number>}
			 * @private
			 */
			_createValues:function( valueType ){
				var values=this.map(function( seriesGroup ){
					return seriesGroup.getValues(valueType);
				});
				values=concat.apply([], values);
				return tui.util.filter(values, function( value ){
					return !isNaN(value);
				});
			},
			/**
			 * Get values form valuesMap.
			 * @param {?string} valueType - type of value
			 * @returns {Array.<number>}
			 */
			getValues:function( valueType ){
				valueType=valueType || 'value';
				if( !this.valuesMap[valueType] ){
					this.valuesMap[valueType]=this._createValues(valueType);
				}
				return this.valuesMap[valueType];
			},
			/**
			 * Whether count of x values greater than count of y values.
			 * @returns {boolean}
			 */
			isXCountGreaterThanYCount:function(){
				return this.getValues('x').length > this.getValues('y').length;
			},
			/**
			 * Add ratios, when has normal stackType option.
			 * @param {{min: number, max: number}} limit - axis limit
			 * @private
			 */
			_addRatiosWhenNormalStacked:function( limit ){
				var distance=Math.abs(limit.max-limit.min);
				this.each(function( seriesGroup ){
					seriesGroup.addRatios(distance);
				});
			},
			/**
			 * Calculate base ratio for calculating ratio of item.
			 * @returns {number}
			 * @private
			 */
			_calculateBaseRatio:function(){
				var values=this.getValues(),
					plusSum=calculator.sumPlusValues(values),
					minusSum=Math.abs(calculator.sumMinusValues(values)),
					ratio=(plusSum > 0 && minusSum > 0) ? 0.5 : 1;
				return ratio;
			},
			/**
			 * Add ratios, when has percent stackType option.
			 * @private
			 */
			_addRatiosWhenPercentStacked:function(){
				var baseRatio=this._calculateBaseRatio();
				this.each(function( seriesGroup ){
					seriesGroup.addRatiosWhenPercentStacked(baseRatio);
				});
			},
			/**
			 * Add ratios, when has diverging stackType option.
			 * @private
			 */
			_addRatiosWhenDivergingStacked:function(){
				this.each(function( seriesGroup ){
					var values=seriesGroup.pluck('value'),
						plusSum=calculator.sumPlusValues(values),
						minusSum=Math.abs(calculator.sumMinusValues(values));
					seriesGroup.addRatiosWhenDivergingStacked(plusSum, minusSum);
				});
			},
			/**
			 * Make subtraction value for making ratio of no option chart.
			 * @param {{min: number, max: number}} limit - limit
			 * @returns {number}
			 * @private
			 */
			_makeSubtractionValue:function( limit ){
				var allowMinusPointRender=predicate.allowMinusPointRender(this.chartType),
					subValue=0;
				if( !allowMinusPointRender && predicate.isMinusLimit(limit) ){
					subValue=limit.max;
				}else if( allowMinusPointRender || limit.min >= 0 ){
					subValue=limit.min;
				}
				return subValue;
			},
			/**
			 * Add ratios, when has not option.
			 * @param {{min: number, max: number}} limit - axis limit
			 * @private
			 */
			_addRatios:function( limit ){
				var distance=Math.abs(limit.max-limit.min),
					subValue=this._makeSubtractionValue(limit);
				this.each(function( seriesGroup ){
					seriesGroup.addRatios(distance, subValue);
				});
			},
			/**
			 * Add data ratios.
			 * @param {{min: number, max: number}} limit - axis limit
			 * @param {string} stackType - stackType option
			 * @private
			 */
			addDataRatios:function( limit, stackType ){
				var isAllowedStackOption=predicate.isAllowedStackOption(this.chartType);
				if( isAllowedStackOption && predicate.isNormalStack(stackType) ){
					this._addRatiosWhenNormalStacked(limit);
				}else if( isAllowedStackOption && predicate.isPercentStack(stackType) ){
					if( this.isDivergingChart ){
						this._addRatiosWhenDivergingStacked();
					}else{
						this._addRatiosWhenPercentStacked();
					}
				}else{
					this._addRatios(limit);
				}
			},
			/**
			 * Add data ratios of pie chart.
			 */
			addDataRatiosOfPieChart:function(){
				this.each(function( seriesGroup ){
					var sum=calculator.sum(seriesGroup.pluck('value'));
					seriesGroup.addRatios(sum);
				});
			},
			/**
			 * Add ratios of data for chart of coordinate type.
			 * @param {{x: {min: number, max: number}, y: {min: number, max: number}}} limitMap - limit map
			 * @param {boolean} [hasRadius] - whether has radius or not
			 */
			addDataRatiosForCoordinateType:function( limitMap, hasRadius ){
				var xLimit=limitMap.xAxis;
				var yLimit=limitMap.yAxis;
				var maxRadius=hasRadius ? arrayUtil.max(this.getValues('r')) : 0;
				var xDistance, xSubValue, yDistance, ySubValue;
				if( xLimit ){
					xDistance=Math.abs(xLimit.max-xLimit.min);
					xSubValue=this._makeSubtractionValue(xLimit);
				}
				if( yLimit ){
					yDistance=Math.abs(yLimit.max-yLimit.min);
					ySubValue=this._makeSubtractionValue(yLimit);
				}
				this.each(function( seriesGroup ){
					seriesGroup.each(function( item ){
						if( !item ){
							return;
						}
						item.addRatio('x', xDistance, xSubValue);
						item.addRatio('y', yDistance, ySubValue);
						item.addRatio('r', maxRadius, 0);
						if( tui.util.isExisty(item.start) ){
							item.addRatio('start', yDistance, ySubValue);
						}
					});
				});
			},
			/**
			 * Add start to all series item.
			 * @param {number} start - start value
			 */
			addStartValueToAllSeriesItem:function( start ){
				this.each(function( seriesGroup ){
					seriesGroup.addStartValueToAllSeriesItem(start);
				});
			},
			/**
			 * Whether has range data or not.
			 * @returns {boolean}
			 */
			hasRangeData:function(){
				var hasRangeData=false;
				this.each(function( seriesGroup ){
					hasRangeData=seriesGroup.hasRangeData();
					return !hasRangeData;
				});
				return hasRangeData;
			},
			/**
			 * Traverse groups, and executes iteratee function.
			 * @param {function} iteratee - iteratee function
			 * @param {boolean} isPivot - whether pivot or not
			 */
			each:function( iteratee, isPivot ){
				var groups=isPivot ? this._getPivotGroups() : this._getSeriesGroups();
				tui.util.forEachArray(groups, function( seriesGroup, index ){
					return iteratee(seriesGroup, index);
				});
			},
			/**
			 * Traverse groups, and returns to result of execution about iteratee function.
			 * @param {function} iteratee - iteratee function
			 * @param {boolean} isPivot - whether pivot or not
			 * @returns {Array}
			 */
			map:function( iteratee, isPivot ){
				var results=[];
				this.each(function( seriesGroup, index ){
					results.push(iteratee(seriesGroup, index));
				}, isPivot);
				return results;
			}
		});
		module.exports=SeriesDataModel;
		/***/
	},
	/* 77 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview SeriesGroup is a element of SeriesDataModel.groups.
		 * SeriesGroup.items has SeriesItem.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var calculator=__webpack_require__(22);
		var SeriesGroup=tui.util.defineClass(/** @lends SeriesGroup.prototype */{
			/**
			 * SeriesGroup is a element of SeriesDataModel.groups.
			 * SeriesGroup.items has SeriesItem.
			 * @constructs SeriesGroup
			 * @private
			 * @param {Array.<SeriesItem>} seriesItems - series items
			 */
			init:function( seriesItems ){
				/**
				 * items has SeriesItem
				 * @type {Array.<SeriesItem>}
				 */
				this.items=seriesItems;
				/**
				 * map of values by value type like value, x, y, r.
				 * @type {Array.<number>}
				 */
				this.valuesMap={};
				this.valuesMapPerStack=null;
			},
			/**
			 * Get series item count.
			 * @returns {number}
			 */
			getSeriesItemCount:function(){
				return this.items.length;
			},
			/**
			 * Get series item.
			 * @param {number} index - index of items
			 * @returns {SeriesItem}
			 */
			getSeriesItem:function( index ){
				return this.items[index];
			},
			/**
			 * Get first SeriesItem.
			 * @returns {SeriesItem}
			 */
			getFirstSeriesItem:function(){
				return this.getSeriesItem(0);
			},
			/**
			 * Create values that picked value from SeriesItems.
			 * @param {?string} valueType - type of value
			 * @returns {Array.<number>}
			 * @private
			 */
			_createValues:function( valueType ){
				var values=[];
				this.each(function( item ){
					if( !item ){
						return;
					}
					if( tui.util.isExisty(item[valueType]) ){
						values.push(item[valueType]);
					}
					if( tui.util.isExisty(item.start) ){
						values.push(item.start);
					}
				});
				return values;
			},
			/**
			 * Get values from valuesMap.
			 * @param {?string} valueType - type of value
			 * @returns {Array}
			 */
			getValues:function( valueType ){
				valueType=valueType || 'value';
				if( !this.valuesMap[valueType] ){
					this.valuesMap[valueType]=this._createValues(valueType);
				}
				return this.valuesMap[valueType];
			},
			/**
			 * Make values map per stack.
			 * @returns {object}
			 * @private
			 */
			_makeValuesMapPerStack:function(){
				var valuesMap={};
				this.each(function( item ){
					if( !valuesMap[item.stack] ){
						valuesMap[item.stack]=[];
					}
					valuesMap[item.stack].push(item.value);
				});
				return valuesMap;
			},
			/**
			 * Get values map per stack.
			 * @returns {*|Object}
			 */
			getValuesMapPerStack:function(){
				if( !this.valuesMapPerStack ){
					this.valuesMapPerStack=this._makeValuesMapPerStack();
				}
				return this.valuesMapPerStack;
			},
			/**
			 * Make sum map per stack.
			 * @returns {object} sum map
			 * @private
			 */
			_makeSumMapPerStack:function(){
				var valuesMap=this.getValuesMapPerStack(),
					sumMap={};
				tui.util.forEach(valuesMap, function( values, key ){
					sumMap[key]=calculator.sum(tui.util.map(values, function( value ){
						return Math.abs(value);
					}));
				});
				return sumMap;
			},
			/**
			 * Add start value to all series item.
			 * @param {number} start start value
			 */
			addStartValueToAllSeriesItem:function( start ){
				this.each(function( item ){
					if( !item ){
						return;
					}
					item.addStart(start);
				});
			},
			/**
			 * Add ratios when percent stackType.
			 * @param {number} baseRatio - base ratio
			 */
			addRatiosWhenPercentStacked:function( baseRatio ){
				var sumMap=this._makeSumMapPerStack();
				this.each(function( item ){
					var dividingNumber=sumMap[item.stack];
					item.addRatio(dividingNumber, 0, baseRatio);
				});
			},
			/**
			 * Add ratios when diverging stacked.
			 * @param {number} plusSum - sum of plus number
			 * @param {number} minusSum - sum of minus number
			 */
			addRatiosWhenDivergingStacked:function( plusSum, minusSum ){
				this.each(function( item ){
					var dividingNumber=(item.value >= 0) ? plusSum : minusSum;
					item.addRatio(dividingNumber, 0, 0.5);
				});
			},
			/**
			 * Add ratios.
			 * @param {number} divNumber dividing number
			 * @param {number} subValue subtraction value
			 */
			addRatios:function( divNumber, subValue ){
				this.each(function( item ){
					if( !item ){
						return;
					}
					item.addRatio(divNumber, subValue);
				});
			},
			/**
			 * Whether has range data or not.
			 * @returns {boolean}
			 */
			hasRangeData:function(){
				var hasRangeData=false;
				this.each(function( seriesItem ){
					hasRangeData=seriesItem && seriesItem.isRange;
					return !hasRangeData;
				});
				return hasRangeData;
			},
			/**
			 * Traverse items, and executes iteratee function.
			 * @param {function} iteratee - iteratee function
			 */
			each:function( iteratee ){
				tui.util.forEachArray(this.items, iteratee);
			},
			/**
			 * Traverse items, and returns to results of execution about iteratee function.
			 * @param {function} iteratee - iteratee function
			 * @returns {Array}
			 */
			map:function( iteratee ){
				return tui.util.map(this.items, iteratee);
			},
			/**
			 * Traverse items, and returns to picked result at item.
			 * @param {string} key key for pick
			 * @returns {Array}
			 */
			pluck:function( key ){
				var items=tui.util.filter(this.items, tui.util.isExisty);
				return tui.util.pluck(items, key);
			},
			/**
			 * Traverse items, and returns to found SeriesItem by condition function.
			 * @param {function} condition - condition function
			 * @returns {SeriesItem|null}
			 */
			find:function( condition ){
				var foundItem;
				this.each(function( seriesItem ){
					if( condition(seriesItem) ){
						foundItem=seriesItem;
					}
					return !foundItem;
				});
				return foundItem || null;
			},
			/**
			 * Traverse items, and returns to filter SeriesItems by condition function.
			 * @param {function} condition - condition function
			 * @returns {Array}
			 */
			filter:function( condition ){
				return tui.util.filter(this.items, condition);
			}
		});
		module.exports=SeriesGroup;
		/***/
	},
	/* 78 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview SeriesItem is a element of SeriesGroup.items.
		 * SeriesItem has processed terminal data like value, ratio, etc.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var renderUtil=__webpack_require__(23);
		var calculator=__webpack_require__(22);
		var SeriesItem=tui.util.defineClass(/** @lends SeriesItem.prototype */{
			/**
			 * SeriesItem is a element of SeriesGroup.items.
			 * SeriesItem has processed terminal data like value, ratio, etc.
			 * @constructs SeriesItem
			 * @private
			 * @param {object} params - parameters
			 *      @param {number} params.datum - value
			 *      @param {string} params.chartType - type of chart
			 *      @param {?Array.<function>} params.formatFunctions - format functions
			 *      @param {number} params.index - raw data index
			 *      @param {?string} params.stack - stack
			 */
			init:function( params ){
				/**
				 * type of chart
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * for group stack option.
				 * @type {string}
				 */
				this.stack=params.stack || chartConst.DEFAULT_STACK;
				/**
				 * whether diverging chart or not
				 * @type {boolean}
				 */
				this.isDivergingChart=params.isDivergingChart;
				/**
				 * format functions
				 * @type {Array.<function>}
				 */
				this.formatFunctions=params.formatFunctions;
				/**
				 * whether range item or not
				 * @type {boolean}
				 */
				this.isRange=false;
				/**
				 * value of item
				 * @type {number}
				 */
				this.value=null;
				/**
				 * label
				 * @type {string}
				 */
				this.label=null;
				/**
				 * ratio of value about distance of limit
				 * @type {number}
				 */
				this.ratio=null;
				/**
				 * end value of item.
				 * @type {number}
				 */
				this.end=null;
				/**
				 * end label
				 * @type {number}
				 */
				this.endLabel=null;
				/**
				 * ratio of end value
				 * @type {number}
				 */
				this.endRatio=null;
				/**
				 * start value of item.
				 * @type {number}
				 */
				this.start=null;
				/**
				 * start label
				 * @type {number}
				 */
				this.startLabel=null;
				/**
				 * ratio of start value
				 * @type {number}
				 */
				
				this.startRatio=null;
				/**
				 * distance of start ratio and end ratio
				 * @type {null}
				 */
				this.ratioDistance=null;
				this._initValues(params.datum, params.index);
			},
			/**
			 * Initialize values of item.
			 * @param {number|Array.<number>} rawValue - raw value
			 * @param {number} index - raw data index
			 * @private
			 */
			_initValues:function( rawValue, index ){
				var values=this._createValues(rawValue);
				var areaType='makingSeriesLabel';
				var hasStart=values.length > 1;
				var value=values[0];
				this.value=this.end=value;
				this.index=index;
				if( this.isDivergingChart ){
					value=Math.abs(value);
				}
				if( tui.util.isNull(value) ){
					this.label='';
				}else{
					this.label=renderUtil.formatValue(value, this.formatFunctions, this.chartType, areaType);
				}
				this.endLabel=this.label;
				if( hasStart ){
					this.addStart(values[1], true);
					this._updateFormattedValueforRange();
					this.isRange=true;
				}
			},
			/**
			 * Crete sorted values.
			 * @param {Array.<number>|number} value value
			 * @returns {Array.<number>}
			 * @private
			 */
			_createValues:function( value ){
				var values=tui.util.map([].concat(value), function( newValue ){
					return tui.util.isNull(newValue) ? null : parseFloat(newValue);
				});
				values=values.sort(function( a, b ){
					if( a < 0 && b < 0 ){
						return a-b;
					}
					return b-a;
				});
				return values;
			},
			/**
			 * Add start.
			 * @param {number} value - value
			 * @private
			 */
			addStart:function( value ){
				if( !tui.util.isNull(this.start) ){
					return;
				}
				this.start=value;
				this.startLabel=renderUtil.formatValue(value, this.formatFunctions, this.chartType, 'series');
			},
			/**
			 * Update formatted value for range.
			 * @private
			 */
			_updateFormattedValueforRange:function(){
				this.label=this.startLabel+' ~ '+this.endLabel;
			},
			/**
			 * Add ratio.
			 * @param {number} divNumber - number for division
			 * @param {?number} subNumber - number for subtraction
			 * @param {?number} baseRatio - base ratio
			 */
			addRatio:function( divNumber, subNumber, baseRatio ){
				divNumber=divNumber || 1;
				baseRatio=baseRatio || 1;
				subNumber=subNumber || 0;
				this.ratio=this.endRatio=calculator.calculateRatio(this.value, divNumber, subNumber, baseRatio);
				if( tui.util.isExisty(this.start) ){
					this.startRatio=calculator.calculateRatio(this.start, divNumber, subNumber, baseRatio);
					this.ratioDistance=Math.abs(this.endRatio-this.startRatio);
				}
			},
			/**
			 * Get formatted value for tooltip.
			 * @param {string} valueType - value type
			 * @returns {string}
			 * @private
			 */
			_getFormattedValueForTooltip:function( valueType ){
				return renderUtil.formatValue(this[valueType], this.formatFunctions, this.chartType, 'tooltip', valueType);
			},
			/**
			 * Pick value map for tooltip.
			 * @returns {{value: number, start: ?number, end: ?number}}
			 */
			pickValueMapForTooltip:function(){
				var valueMap={
					value:this._getFormattedValueForTooltip('value'),
					ratio:this.ratio
				};
				if( tui.util.isExisty(this.start) ){
					valueMap.start=this._getFormattedValueForTooltip('start');
					valueMap.end=this._getFormattedValueForTooltip('end');
					valueMap.startRatio=this.startRatio;
					valueMap.endRatio=this.endRatio;
				}
				return valueMap;
			}
		});
		module.exports=SeriesItem;
		/***/
	},
	/* 79 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview SeriesItemForCoordinateType is a element of SeriesGroup.items.
		 * SeriesItemForCoordinateType has processed terminal data like x, y, r, xRatio, yRatio, rRatio.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		var SeriesItemForCoordinateType=tui.util.defineClass(/** @lends SeriesItemForCoordinateType.prototype */{
			/**
			 * SeriesItemForCoordinateType is a element of SeriesGroup.items.
			 * SeriesItemForCoordinateType has processed terminal data like x, y, r, xRatio, yRatio, rRatio.
			 * @constructs SeriesItemForCoordinateType
			 * @private
			 * @param {object} params - parameters
			 *      @param {Array.<number>|{x: number, y:number, r: ?number, label: ?string}} params.datum - raw series datum
			 *      @param {string} params.chartType - type of chart
			 *      @param {?Array.<function>} params.formatFunctions - format functions
			 *      @param {number} params.index - raw data index
			 */
			init:function( params ){
				/**
				 * type of chart
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * format functions
				 * @type {Array.<function>}
				 */
				this.formatFunctions=params.formatFunctions;
				/**
				 * x axis type
				 * @type {?string}
				 */
				this.xAxisType=params.xAxisType;
				/**
				 * date format
				 * @type {?string}
				 */
				this.dateFormat=params.dateFormat;
				/**
				 * ratio map
				 * @type {object}
				 */
				this.ratioMap={};
				this._initData(params.datum, params.index);
			},
			/**
			 * Initialize data of item.
			 @param {Array.<number>|{x: number, y:number, r: ?number, label: ?string}} rawSeriesDatum - raw series datum
			 * @param {number} index - raw data index
			 * @private
			 */
			_initData:function( rawSeriesDatum, index ){
				var date;
				if( tui.util.isArray(rawSeriesDatum) ){
					this.x=rawSeriesDatum[0] || 0;
					this.y=rawSeriesDatum[1] || 0;
					if( predicate.isBubbleChart(this.chartType) ){
						this.r=rawSeriesDatum[2];
						this.label=rawSeriesDatum[3] || '';
					}else{
						this.label=rawSeriesDatum[2] || '';
					}
				}else{
					this.x=rawSeriesDatum.x;
					this.y=rawSeriesDatum.y;
					this.r=rawSeriesDatum.r;
					this.label=rawSeriesDatum.label || '';
				}
				if( predicate.isDatetimeType(this.xAxisType) ){
					date=tui.util.isDate(this.x) ? this.x : (new Date(this.x));
					this.x=date.getTime() || 0;
				}
				this.index=index;
				if( !this.label ){
					if( predicate.isLineTypeChart(this.chartType) && predicate.isDatetimeType(this.xAxisType) ){
						this.label=renderUtil.formatDate(this.x, this.dateFormat);
					}else{
						this.label=renderUtil.formatValue(this.x, this.formatFunctions, this.chartType, 'series');
					}
					this.label+=',&nbsp;'+renderUtil.formatValue(this.y, this.formatFunctions, this.chartType, 'series');
				}
			},
			/**
			 * Add start.
			 * @param {number} value - value
			 * @private
			 */
			addStart:function( value ){
				this.start=value;
			},
			/**
			 * Add ratio.
			 * @param {string} valueType - type of value like x, y, r
			 * @param {?number} divNumber - number for division
			 * @param {?number} subNumber - number for subtraction
			 */
			addRatio:function( valueType, divNumber, subNumber ){
				if( !tui.util.isExisty(this.ratioMap[valueType]) && divNumber ){
					this.ratioMap[valueType]=(this[valueType]-subNumber)/divNumber;
				}
			},
			/**
			 * Get formatted value for tooltip.
			 * @param {string} valueType - value type
			 * @returns {string}
			 * @private
			 */
			_getFormattedValueForTooltip:function( valueType ){
				var ratio=this.ratioMap[valueType];
				var value=this[valueType];
				return ratio ? renderUtil.formatValue(value, this.formatFunctions, this.chartType, 'tooltip', valueType) : null;
			},
			/**
			 * Pick value map for tooltip.
			 * @returns {{x: (number | null), y: (number | null), r: (number | null)}}
			 */
			pickValueMapForTooltip:function(){
				var valueMap={
					x:this._getFormattedValueForTooltip('x'),
					y:this._getFormattedValueForTooltip('y'),
					xRatio:this.ratioMap.x,
					yRatio:this.ratioMap.y
				};
				if( tui.util.isExisty(this.r) ){
					valueMap.r=this._getFormattedValueForTooltip('r');
					valueMap.rRatio=this.ratioMap.r;
				}
				return valueMap;
			}
		});
		module.exports=SeriesItemForCoordinateType;
		/***/
	},
	/* 80 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview SeriesDataModelForTreemap is base model for drawing graph of treemap chart series area.
		 * SeriesDataModel.groups has SeriesGroups.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var SeriesDataModel=__webpack_require__(76);
		var SeriesItem=__webpack_require__(81);
		var chartConst=__webpack_require__(2);
		var calculator=__webpack_require__(22);
		var aps=Array.prototype.slice;
		var SeriesDataModelForTreeMap=tui.util.defineClass(SeriesDataModel, /** @lends SeriesDataModelForTreeMap.prototype */{
			/**
			 * SeriesDataModelForTreemap is base model for drawing graph of treemap chart series area.
			 * @constructs SeriesDataModelForTreemap
			 * @private
			 */
			init:function(){
				SeriesDataModel.apply(this, arguments);
				/**
				 * cached found seriesItems map
				 * @type {object.<string, Array.<SeriesItem>>}
				 */
				this.foundSeriesItemsMap={};
				/**
				 * cached seriesItem map
				 * @type {object<string, SeriesItem>}
				 */
				this.seriesItemMap={};
			},
			/**
			 * Flatten hierarchical data.
			 * @param {Array.<object>} rawSeriesData - raw series data
			 * @param {string | number} parent - parent id
			 * @param {?Array.<number>} ancestorIndexes - ancestor indexes
			 * @returns {Array.<object>}
			 * @private
			 */
			_flattenHierarchicalData:function( rawSeriesData, parent, ancestorIndexes ){
				var self=this;
				var flatData=[];
				var idPrefix;
				if( parent ){
					idPrefix=parent+'_';
				}else{
					idPrefix=chartConst.TREEMAP_ID_PREFIX;
					parent=chartConst.TREEMAP_ROOT_ID;
				}
				ancestorIndexes=ancestorIndexes || [];
				tui.util.forEachArray(rawSeriesData, function( datum, index ){
					var id=idPrefix+index;
					var children=datum.children;
					var indexes=ancestorIndexes.concat(index);
					datum.indexes=indexes;
					if( !tui.util.isNull(datum.value) ){
						flatData.push(datum);
					}
					if( !datum.id ){
						datum.id=id;
					}
					if( !datum.parent ){
						datum.parent=parent;
					}
					if( children ){
						flatData=flatData.concat(self._flattenHierarchicalData(children, id, indexes));
						delete datum.children;
					}
				});
				return flatData;
			},
			/**
			 * Partition raw series data by parent id
			 * @param {Array.<object>} rawSeriesData - raw series data
			 * @param {string | number} parent - parent id
			 * @returns {Array.<Array>}
			 * @private
			 */
			_partitionRawSeriesDataByParent:function( rawSeriesData, parent ){
				var filtered=[];
				var rejected=[];
				tui.util.forEachArray(rawSeriesData, function( datum ){
					if( datum.parent===parent ){
						filtered.push(datum);
					}else{
						rejected.push(datum);
					}
				});
				return [filtered, rejected];
			},
			/**
			 * Set tree properties like depth, group in raw series data.
			 * @param {Array.<object>} flatSeriesData - flat series data
			 * @param {number} depth - tree depth
			 * @param {number} parent - parent id
			 * @param {number} group - tree group
			 * @returns {Array.<object>}
			 * @private
			 */
			_setTreeProperties:function( flatSeriesData, depth, parent, group ){
				var self=this;
				var parted=this._partitionRawSeriesDataByParent(flatSeriesData, parent);
				var filtered=parted[0];
				var rejected=parted[1];
				var childDepth=depth+1;
				tui.util.forEachArray(filtered, function( datum, index ){
					var descendants, children;
					datum.depth=depth;
					datum.group=tui.util.isUndefined(group) ? index : group;
					descendants=self._setTreeProperties(rejected, childDepth, datum.id, datum.group);
					children=tui.util.filter(descendants, function( descendant ){
						return descendant.depth===childDepth;
					});
					if( children.length ){
						datum.value=calculator.sum(tui.util.pluck(children, 'value'));
						datum.hasChild=true;
					}else{
						datum.hasChild=false;
					}
					filtered=filtered.concat(descendants);
				});
				return filtered;
			},
			/**
			 * Set ratio.
			 * @param {Array.<object>} flatSeriesData - raw series data
			 * @param {string} parent - parent id
			 * @private
			 */
			_setRatio:function( flatSeriesData, parent ){
				var self=this;
				var parted=this._partitionRawSeriesDataByParent(flatSeriesData, parent);
				var filtered=parted[0];
				var rejected=parted[1];
				var total=calculator.sum(tui.util.pluck(filtered, 'value'));
				tui.util.forEachArray(filtered, function( datum ){
					var value=tui.util.isNull(datum.value) ? 0 : datum.value;
					datum.ratio=value/total;
					if( datum.hasChild ){
						self._setRatio(rejected, datum.id);
					}
				});
			},
			/**
			 * Create base groups.
			 * @returns {Array.<Array.<SeriesItem>>}
			 * @private
			 * @override
			 */
			_createBaseGroups:function(){
				var chartType=this.chartType;
				var seriesItemMap=this.seriesItemMap;
				var formatFunctions=this.formatFunctions;
				var flatSeriesData=this._flattenHierarchicalData(this.rawSeriesData);
				flatSeriesData=this._setTreeProperties(flatSeriesData, 1, chartConst.TREEMAP_ROOT_ID);
				this._setRatio(flatSeriesData, chartConst.TREEMAP_ROOT_ID);
				return [tui.util.map(flatSeriesData, function( rawDatum ){
					var seriesItem=new SeriesItem(rawDatum, formatFunctions, chartType);
					seriesItemMap[seriesItem.id]=seriesItem;
					return seriesItem;
				})];
			},
			/**
			 * Find SeriesItems.
			 * @param {string} key - key
			 * @param {function} condition - condition function
			 * @returns {Array.<SeriesItem>}
			 * @private
			 */
			_findSeriesItems:function( key, condition ){
				if( !this.foundSeriesItemsMap[key] ){
					this.foundSeriesItemsMap[key]=this.getFirstSeriesGroup(true).filter(condition);
				}
				return this.foundSeriesItemsMap[key];
			},
			/**
			 * Make cache key for caching found SeriesItems.
			 * @param {string} prefix - prefix
			 * @returns {string}
			 * @private
			 */
			_makeCacheKey:function( prefix ){
				var key=prefix;
				if( arguments.length > 1 ){
					key+=aps.call(arguments, 1).join('_');
				}
				return key;
			},
			/**
			 * Whether valid group or not.
			 * If comparingGroup is undefined or group and comparingGroup are equal, this group is valid.
			 * @param {number} group - group
			 * @param {number} [comparingGroup] - comparing group
			 * @returns {boolean}
			 * @private
			 */
			_isValidGroup:function( group, comparingGroup ){
				return !tui.util.isExisty(comparingGroup) || (group===comparingGroup);
			},
			/**
			 * Find SeriesItems by depth.
			 * @param {number} depth - tree depth
			 * @param {number} [group] - tree group
			 * @returns {Array.<SeriesItem>}
			 */
			findSeriesItemsByDepth:function( depth, group ){
				var self=this;
				var key=this._makeCacheKey(chartConst.TREEMAP_DEPTH_KEY_PREFIX, depth, group);
				return this._findSeriesItems(key, function( seriesItem ){
					return (seriesItem.depth===depth) && self._isValidGroup(seriesItem.group, group);
				});
			},
			/**
			 * Find SeriesItems by parent id.
			 * @param {string | number} parent - parent id
			 * @returns {Array.<SeriesItem>}
			 */
			findSeriesItemsByParent:function( parent ){
				var key=this._makeCacheKey(chartConst.TREEMAP_PARENT_KEY_PREFIX, parent);
				return this._findSeriesItems(key, function( seriesItem ){
					return seriesItem.parent===parent;
				});
			},
			/**
			 * Find leaf SeriesItems.
			 * @param {number} [group] - tree group
			 * @returns {Array.<SeriesItem>}
			 */
			findLeafSeriesItems:function( group ){
				var self=this;
				var key=this._makeCacheKey(chartConst.TREEMAP_LEAF_KEY_PREFIX, group);
				return this._findSeriesItems(key, function( seriesItem ){
					return !seriesItem.hasChild && self._isValidGroup(seriesItem.group, group);
				});
			},
			/**
			 * Find parent by depth.
			 * @param {string} id - id
			 * @param {number} depth - depth
			 * @returns {SeriesItem|null}
			 */
			findParentByDepth:function( id, depth ){
				var seriesItem=this.seriesItemMap[id] || null;
				if( seriesItem && seriesItem.depth!==depth ){
					seriesItem=this.findParentByDepth(seriesItem.parent, depth);
				}
				return seriesItem;
			},
			/**
			 * Initialize foundSeriesItemsMap.
			 */
			initSeriesItemsMap:function(){
				this.foundSeriesItemsMap=null;
			}
		});
		module.exports=SeriesDataModelForTreeMap;
		/***/
	},
	/* 81 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview SeriesItem for treemap.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var SeriesItemForTreemap=tui.util.defineClass(/** @lends SeriesItemForTreemap.prototype */{
			/**
			 * SeriesItem for treemap.
			 * @constructs SeriesItemForTreemap
			 * @private
			 * @param {object} rawSeriesDatum - value
			 * @param {?Array.<function>} formatFunctions - format functions
			 * @param {string} chartType - type of chart
			 */
			init:function( rawSeriesDatum, formatFunctions, chartType ){
				/**
				 * type of chart
				 * @type {string}
				 */
				this.chartType=chartType;
				/**
				 * format functions
				 * @type {Array.<function>}
				 */
				this.formatFunctions=formatFunctions;
				this.id=rawSeriesDatum.id;
				this.parent=rawSeriesDatum.parent;
				this.value=rawSeriesDatum.value;
				this.ratio=rawSeriesDatum.ratio;
				this.colorValue=rawSeriesDatum.colorValue;
				this.depth=rawSeriesDatum.depth;
				this.label=rawSeriesDatum.label || '';
				this.group=rawSeriesDatum.group;
				this.hasChild= !!rawSeriesDatum.hasChild;
				this.indexes=rawSeriesDatum.indexes;
			},
			/**
			 * Add ratio.
			 * @param {number} divNumber - number for division
			 * @param {?number} subNumber - number for subtraction
			 */
			addRatio:function( divNumber, subNumber ){
				divNumber=divNumber || 1;
				subNumber=subNumber || 0;
				this.colorRatio=calculator.calculateRatio(this.colorValue, divNumber, subNumber, 1) || -1;
			},
			/**
			 * Pick value map for tooltip.
			 * @returns {{value: number, label: string}}
			 */
			pickValueMapForTooltip:function(){
				var formatFunctions=this.formatFunctions;
				var chartType=this.chartType;
				var colorValue=this.colorValue;
				var formattedValue=renderUtil.formatValue(this.value, formatFunctions, chartType, 'tooltipValue');
				var label=(this.label ? this.label+': ' : '')+formattedValue;
				var valueMap={
					value:formattedValue,
					label:label,
					ratio:this.ratio
				};
				if( tui.util.isExisty(colorValue) ){
					valueMap.colorValue=renderUtil.formatValue(colorValue, formatFunctions, chartType, 'tooltipColorValue');
					valueMap.colorRatio=this.colorRatio;
				}
				return valueMap;
			},
			/**
			 * Pick data for label template.
			 * @param {number} total - value total
			 * @returns {{value: number, ratio: number, label: string, colorValue: ?number, colorValueRatio: ?number}}
			 */
			pickLabelTemplateData:function(){
				var templateData={
					value:this.value,
					ratio:this.ratio,
					label:this.label
				};
				if( tui.util.isExisty(this.colorValue) ){
					templateData.colorValue=this.colorValue;
					templateData.colorValueRatio=this.ratio;
				}
				return templateData;
			}
		});
		module.exports=SeriesItemForTreemap;
		/***/
	},
	/* 82 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Bounds and scale data builder.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var BoundsModel=__webpack_require__(83);
		var ScaleDataModel=__webpack_require__(89);
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		/**
		 * Bounds and scale data builder.
		 * @module boundsAndScaleBuilder
		 * @private */
		var boundsAndScaleBuilder={
			/**
			 * Create BoundsModel.
			 * @param {DataProcessor} dataProcessor - DataProcessor instance
			 * @param {object} params - parameters
			 * @returns {BoundsModel}
			 * @private
			 */
			_createBoundsModel:function( dataProcessor, params ){
				return new BoundsModel({
					chartType:params.chartType,
					seriesNames:params.seriesNames,
					options:params.options,
					theme:params.theme,
					dataProcessor:dataProcessor,
					hasAxes:params.hasAxes,
					isVertical:params.isVertical
				});
			},
			/**
			 * Create ScaleDataModel.
			 * @param {DataProcessor} dataProcessor - DataProcessor instance
			 * @param {BoundsModel} boundsModel - BoundsModel instance
			 * @param {object} params - parameters
			 * @returns {ScaleDataModel}
			 * @private
			 */
			_createScaleDataModel:function( dataProcessor, boundsModel, params ){
				return new ScaleDataModel({
					chartType:params.chartType,
					seriesNames:params.seriesNames,
					options:params.options,
					theme:params.theme,
					dataProcessor:dataProcessor,
					boundsModel:boundsModel,
					hasRightYAxis:params.hasRightYAxis,
					addedDataCount:params.addedDataCount
				});
			},
			/**
			 * Add y axis scale.
			 * @param {ScaleDataModel} scaleDataModel - ScaleDataModel instance
			 * @param {string} name - component name
			 * @param {object} scaleOption - option for add scale
			 * @param {object} yAxisOptions - option for yAxis
			 */
			addYAxisScale:function( scaleDataModel, name, scaleOption, yAxisOptions ){
				scaleDataModel.addScale(name, (scaleOption && scaleOption.options) || yAxisOptions || {}, {
					valueType:scaleOption.valueType || 'value',
					areaType:scaleOption.areaType,
					chartType:scaleOption.chartType
				}, scaleOption.additionalOptions);
			},
			/**
			 * Register dimension for y axis.
			 * @param {ComponentManager} componentManager - ComponentManager instance
			 * @param {BoundsModel} boundsModel - BoundsModel instance
			 * @param {object.<string, object>} scaleDataMap - scale data map
			 * @param {string} axisName - axis name like yAxis and rightYAxis
			 * @param {boolean} isVertical - whether vertical or not
			 * @private
			 */
			_registerYAxisDimension:function( componentManager, boundsModel, scaleDataMap, axisName, isVertical ){
				var yAxis=componentManager.get(axisName);
				var limit=null;
				var scaleData;
				if( !yAxis ){
					return;
				}
				scaleData=scaleDataMap[axisName];
				if( scaleData ){
					limit=scaleData.limit;
				}
				boundsModel.registerYAxisDimension(limit, axisName, yAxis.options, yAxis.theme, isVertical);
			},
			/**
			 * Set layout bounds and scale.
			 * @param {DataProcessor} dataProcessor - DataProcessor instance
			 * @param {ComponentManager} componentManager - ComponentManager instance
			 * @param {BoundsModel} boundsModel - BoundsModel instance
			 * @param {ScaleDataModel} scaleDataModel - ScaleDataModel instance
			 * @param {object} params - parameter for setting layout bounds and scale data.
			 * @private
			 */
			_setLayoutBoundsAndScale:function( dataProcessor, componentManager, boundsModel, scaleDataModel, params ){
				var options=params.options;
				var scaleOption=params.scaleOption || {};
				var addingDataMode=params.addingDataMode;
				var isVertical=params.isVertical;
				var scaleDataMap;
				// 01. base dimension 등록
				if( componentManager.has('xAxis') ){
					boundsModel.registerXAxisHeight();
				}
				if( componentManager.has('legend') ){
					if( componentManager.get('legend').colorSpectrum ){
						boundsModel.registerSpectrumLegendDimension();
					}else{
						boundsModel.registerLegendDimension();
					}
				}
				// 02. y axis, legend scale 추가
				if( scaleOption.yAxis ){
					this.addYAxisScale(scaleDataModel, 'yAxis', scaleOption.yAxis, params.options.yAxis);
				}
				if( scaleOption.rightYAxis ){
					this.addYAxisScale(scaleDataModel, 'rightYAxis', scaleOption.rightYAxis);
				}
				if( scaleOption.legend ){
					scaleDataModel.addScale('legend', {}, {
						chartType:params.chartType
					}, {
						tickCounts:[chartConst.SPECTRUM_LEGEND_TICK_COUNT]
					});
				}
				scaleDataMap=scaleDataModel.scaleDataMap;
				// 03. y axis dimension 등록
				this._registerYAxisDimension(componentManager, boundsModel, scaleDataMap, 'yAxis', isVertical);
				this._registerYAxisDimension(componentManager, boundsModel, scaleDataMap, 'rightYAxis', isVertical);
				// 04. x axis scale 추가
				if( scaleOption.xAxis ){
					scaleDataModel.addScale('xAxis', options.xAxis, {
						valueType:scaleOption.xAxis.valueType || 'value'
					}, scaleOption.xAxis.additionalOptions);
				}
				// 05. axis data map 생성 및 설정
				if( params.hasAxes ){
					scaleDataModel.setAxisDataMap();
				}
				// 06. series 영역 dimension 등록
				boundsModel.registerSeriesDimension();
				// 07. circle legend가 있을 경우에 circle legend dimension 등록
				if( componentManager.has('circleLegend') && options.circleLegend.visible ){
					boundsModel.registerCircleLegendDimension(scaleDataModel.axisDataMap);
				}
				if( componentManager.has('xAxis') ){
					// 08. 자동 tick 계산 옵션이 있을 경우에 axisData 갱신
					if( predicate.isAutoTickInterval(options.xAxis.tickInterval) ){
						scaleDataModel.updateXAxisDataForAutoTickInterval(params.prevXAxisData, addingDataMode);
					}
					// 09. x축 label의 회전 여부 관련한 axisData 갱신
					scaleDataModel.updateXAxisDataForLabel(addingDataMode);
				}
				// 10. 나머지 영역 dimension 등록 및 각 영역의 position 정보 등록
				boundsModel.registerBoundsData(scaleDataModel.axisDataMap.xAxis);
			},
			/**
			 * Build layout bounds and scale data.
			 * @param {DataProcessor} dataProcessor - DataProcessor instance
			 * @param {ComponentManager} componentManager - ComponentManager instance
			 * @param {object} params - parameter for building layout bounds and scale data.
			 * @returns {{
	     *      dimensionMap: object,
	     *      positionMap: object,
	     *      limitMap: {
	     *          xAxis: ?{min: number, max: number},
	     *          yAxis: ?{min: number, max: number},
	     *          rightYAxis: ?{min: number, max: number},
	     *          legend: ?{min: number, max: number}
	     *      },
	     *      axisDataMap: ?object,
	     *      maxRadius: ?number,
	     *      legendScaleData: ?object
	     * }}
			 */
			build:function( dataProcessor, componentManager, params ){
				var boundsModel=this._createBoundsModel(dataProcessor, params);
				var scaleDataModel=this._createScaleDataModel(dataProcessor, boundsModel, params);
				var boundsAndScale;
				this._setLayoutBoundsAndScale(dataProcessor, componentManager, boundsModel, scaleDataModel, params);
				boundsAndScale={
					dimensionMap:boundsModel.dimensionMap,
					positionMap:boundsModel.positionMap,
					limitMap:scaleDataModel.makeLimitMap(params.seriesNames || [params.chartType], params.isVertical)
				};
				if( scaleDataModel.axisDataMap ){
					boundsAndScale.axisDataMap=scaleDataModel.axisDataMap;
				}
				if( predicate.isBubbleChart(params.chartType) ){
					boundsAndScale.maxRadius=boundsModel.calculateMaxRadius(scaleDataModel.axisDataMap);
				}
				if( scaleDataModel.scaleDataMap.legend ){
					boundsAndScale.legendScaleData=scaleDataModel.scaleDataMap.legend;
				}
				return boundsAndScale;
			}
		};
		module.exports=boundsAndScaleBuilder;
		/***/
	},
	/* 83 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Bounds model.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		var circleLegendCalculator=__webpack_require__(84);
		var axisCalculator=__webpack_require__(85);
		var legendCalculator=__webpack_require__(86);
		var seriesCalculator=__webpack_require__(87);
		var spectrumLegendCalculator=__webpack_require__(88);
		/**
		 * Dimension.
		 * @typedef {{width: number, height:number}} dimension
		 */
		/**
		 * Position.
		 * @typedef {{left: number, top:number}} position
		 */
		/**
		 * Bound.
		 * @typedef {{dimension: dimension, position:position}} bound
		 */
		
		var BoundsModel=tui.util.defineClass(/** @lends BoundsModel.prototype */{
			/**
			 * Bounds maker.
			 * @constructs BoundsModel
			 * @private
			 * @param {object} params parameters
			 */
			init:function( params ){
				/**
				 * options
				 * @type {object}
				 */
				this.options=params.options || {};
				this.options.legend=this.options.legend || {};
				this.options.yAxis=this.options.yAxis || {};
				/**
				 * theme
				 * @type {object}
				 */
				this.theme=params.theme || {};
				/**
				 * whether chart has axes or not
				 * @type {boolean}
				 */
				this.hasAxes=params.hasAxes;
				/**
				 * chart type
				 * @type {string}
				 */
				this.chartType=params.chartType;
				/**
				 * series names
				 */
				this.seriesNames=params.seriesNames || [];
				/**
				 * data processor
				 * @type {DataProcessor}
				 */
				this.dataProcessor=params.dataProcessor;
				this.initBoundsData();
			},
			/**
			 * Initialize bounds data.
			 */
			initBoundsData:function(){
				this.dimensionMap={
					legend:{
						width:0
					},
					yAxis:{
						width:0
					},
					rightYAxis:{
						width:0
					},
					xAxis:{
						height:0
					},
					circleLegend:{
						width:0
					},
					chartExportMenu:{
						width:0
					}
				};
				this.positionMap={};
				/**
				 * chart left padding
				 * @type {number}
				 */
				this.chartLeftPadding=chartConst.CHART_PADDING;
				this.maxRadiusForBubbleChart=null;
				this._registerChartDimension();
				this._registerTitleDimension();
				this._registerChartExportMenuDimension();
			},
			/**
			 * Register dimension.
			 * @param {string} name component name
			 * @param {dimension} dimension component dimension
			 * @private
			 */
			_registerDimension:function( name, dimension ){
				this.dimensionMap[name]=tui.util.extend(this.dimensionMap[name] || {}, dimension);
			},
			/**
			 * Get bound.
			 * @param {string} name component name
			 * @returns {bound} component bound
			 */
			getBound:function( name ){
				return {
					dimension:this.dimensionMap[name] || {},
					position:this.positionMap[name] || {}
				};
			},
			/**
			 * Set bound.
			 * @param {string} name component name
			 * @param {bound} bound component bound
			 * @private
			 */
			_setBound:function( name, bound ){
				this.dimensionMap[name]=bound.dimension;
				this.positionMap[name]=bound.position;
			},
			/**
			 * Get dimension.
			 * @param {string} name component name
			 * @returns {dimension} component dimension
			 */
			getDimension:function( name ){
				return this.dimensionMap[name];
			},
			/**
			 * Get dimension map.
			 * @param {string} types - dimension type names
			 * @returns {object}
			 */
			getDimensionMap:function( types ){
				var self=this;
				var dimensionMap={};
				if( types && types.length ){
					tui.util.forEachArray(types, function( type ){
						dimensionMap[type]=self.dimensionMap[type];
					});
				}else{
					dimensionMap=this.dimensionMap;
				}
				return JSON.parse(JSON.stringify((dimensionMap)));
			},
			/**
			 * Get position.
			 * @param {string} name component name
			 * @returns {position} component position
			 */
			getPosition:function( name ){
				return this.positionMap[name];
			},
			/**
			 * Register chart dimension
			 * @private
			 */
			_registerChartDimension:function(){
				var chartOptions=this.options.chart || {},
					dimension={
						width:chartOptions.width || chartConst.CHART_DEFAULT_WIDTH,
						height:chartOptions.height || chartConst.CHART_DEFAULT_HEIGHT
					};
				this._registerDimension('chart', dimension);
			},
			/**
			 * Register title dimension
			 * @private
			 */
			_registerTitleDimension:function(){
				var chartOptions=this.options.chart || { title:{} };
				var hasTitleOption=tui.util.isExisty(chartOptions.title);
				var titleHeight=
					hasTitleOption ? renderUtil.getRenderedLabelHeight(chartOptions.title.text, this.theme.title) : 0;
				var dimension={
					height:titleHeight+chartConst.TITLE_PADDING
				};
				this._registerDimension('title', dimension);
			},
			/**
			 * Register chartExportMenu dimension
			 * @private
			 */
			_registerChartExportMenuDimension:function(){
				this._registerDimension('chartExportMenu', {
					height:17,
					width:60
				});
			},
			/**
			 * Register height for x axis component.
			 */
			registerXAxisHeight:function(){
				this._registerDimension('xAxis', {
					height:axisCalculator.calculateXAxisHeight(this.options.xAxis.title, this.theme.xAxis)
				});
			},
			/**
			 * Register dimension for legend component.
			 */
			registerLegendDimension:function(){
				var legendLabels=tui.util.pluck(this.dataProcessor.getOriginalLegendData(), 'label');
				var legendOptions=this.options.legend;
				var labelTheme=this.theme.legend.label;
				var chartWidth=this.getDimension('chart').width;
				var legendDimension=legendCalculator.calculate(legendOptions, labelTheme, legendLabels, chartWidth);
				this._registerDimension('legend', legendDimension);
			},
			/**
			 * Register dimension for spectrum legend component.
			 */
			registerSpectrumLegendDimension:function(){
				var maxValue=this.dataProcessor.getFormattedMaxValue(this.chartType, 'legend');
				var labelTheme=this.theme.label;
				var dimension;
				if( predicate.isHorizontalLegend(this.options.legend.align) ){
					dimension=spectrumLegendCalculator._makeHorizontalDimension(maxValue, labelTheme);
				}else{
					dimension=spectrumLegendCalculator._makeVerticalDimension(maxValue, labelTheme);
				}
				this._registerDimension('legend', dimension);
			},
			/**
			 * Register dimension for y axis.
			 * @param {{min: number, max: number}} limit - min, max
			 * @param {string} componentName - component name like yAxis, rightYAxis
			 * @param {object} options - options for y axis
			 * @param {{title: object, label: object}} theme - them for y axis
			 * @param {boolean} isVertical - whether vertical or not
			 */
			registerYAxisDimension:function( limit, componentName, options, theme, isVertical ){
				var categories;
				if( limit ){
					categories=[limit.min, limit.max];
				}else if( predicate.isHeatmapChart(this.chartType) || !isVertical ){
					categories=this.dataProcessor.getCategories(true);
				}else{
					return;
				}
				this._registerDimension(componentName, {
					width:axisCalculator.calculateYAxisWidth(categories, options, theme)
				});
			},
			/**
			 * Create series width.
			 * @returns {number} series width
			 */
			calculateSeriesWidth:function(){
				var dimensionMap=this.getDimensionMap(['chart', 'yAxis', 'legend', 'rightYAxis']);
				return seriesCalculator.calculateWidth(dimensionMap, this.options.legend);
			},
			/**
			 * Create series height
			 * @returns {number} series height
			 */
			calculateSeriesHeight:function(){
				var dimensionMap=this.getDimensionMap(['chart', 'title', 'legend', 'xAxis']);
				return seriesCalculator.calculateHeight(dimensionMap, this.options.legend);
			},
			getBaseSizeForLimit:function( isVertical ){
				var baseSize;
				if( isVertical ){
					baseSize=this.calculateSeriesHeight();
				}else{
					baseSize=this.calculateSeriesWidth();
				}
				return baseSize;
			},
			/**
			 * Make series dimension.
			 * @returns {{width: number, height: number}} series dimension
			 * @private
			 */
			_makeSeriesDimension:function(){
				return {
					width:this.calculateSeriesWidth(),
					height:this.calculateSeriesHeight()
				};
			},
			/**
			 * Register series dimension.
			 */
			registerSeriesDimension:function(){
				var seriesDimension=this._makeSeriesDimension();
				this._registerDimension('series', seriesDimension);
			},
			/**
			 * Update width of legend and series of BoundsModel.
			 * @param {number} circleLegendWidth - width for circle legend
			 * @param {number} diffWidth - difference width
			 * @private
			 */
			_updateLegendAndSeriesWidth:function( circleLegendWidth, diffWidth ){
				var legendOptions=this.options.legend;
				if( predicate.isVerticalLegend(legendOptions.align) && legendOptions.visible ){
					this._registerDimension('legend', {
						width:circleLegendWidth
					});
				}
				this._registerDimension('series', {
					width:this.getDimension('series').width-diffWidth
				});
			},
			/**
			 * Register dimension of circle legend.
			 * @param {object} axisDataMap - axisData map
			 * @private
			 */
			registerCircleLegendDimension:function( axisDataMap ){
				var seriesDimension=this.getDimension('series');
				var legendOptions=this.options.legend;
				var maxLabel=this.dataProcessor.getFormattedMaxValue(this.chartType, 'circleLegend', 'r');
				var fontFamily=this.theme.chart.fontFamily;
				var circleLegendWidth=circleLegendCalculator.calculateCircleLegendWidth(seriesDimension, axisDataMap,
					maxLabel, fontFamily);
				var legendWidth, diffWidth;
				if( predicate.isVerticalLegend(legendOptions.align) && legendOptions.visible ){
					legendWidth=this.getDimension('legend').width;
				}else{
					legendWidth=0;
				}
				circleLegendWidth=Math.min(circleLegendWidth, Math.max(legendWidth, chartConst.MIN_LEGEND_WIDTH));
				diffWidth=circleLegendWidth-legendWidth;
				this._registerDimension('circleLegend', {
					width:circleLegendWidth,
					height:circleLegendWidth
				});
				if( diffWidth ){
					this._updateLegendAndSeriesWidth(circleLegendWidth, diffWidth);
				}
			},
			/**
			 * Make plot dimention
			 * @returns {{width: number, height: number}} plot dimension
			 * @private
			 */
			_makePlotDimension:function(){
				var seriesDimension=this.getDimension('series');
				return {
					width:seriesDimension.width,
					height:seriesDimension.height+chartConst.OVERLAPPING_WIDTH
				};
			},
			/**
			 * Register center components dimension.
			 * @private
			 */
			_registerCenterComponentsDimension:function(){
				var seriesDimension=this.getDimension('series');
				this._registerDimension('tooltip', seriesDimension);
				this._registerDimension('mouseEventDetector', seriesDimension);
			},
			/**
			 * Register axis components dimension.
			 * @private
			 */
			_registerAxisComponentsDimension:function(){
				var plotDimension=this._makePlotDimension();
				this._registerDimension('plot', plotDimension);
				this._registerDimension('xAxis', {
					width:plotDimension.width
				});
				this._registerDimension('yAxis', {
					height:plotDimension.height
				});
				this._registerDimension('rightYAxis', {
					height:plotDimension.height
				});
			},
			/**
			 * Update width of dimensions.
			 * @param {number} overflowLeft overflow left
			 * @private
			 */
			_updateDimensionsWidth:function( overflowLeft ){
				this.chartLeftPadding+=overflowLeft;
				this.dimensionMap.plot.width-=overflowLeft;
				this.dimensionMap.series.width-=overflowLeft;
				this.dimensionMap.mouseEventDetector.width-=overflowLeft;
				this.dimensionMap.xAxis.width-=overflowLeft;
			},
			/**
			 * Update height of dimensions.
			 * @param {number} diffHeight diff height
			 * @private
			 */
			_updateDimensionsHeight:function( diffHeight ){
				this.dimensionMap.plot.height-=diffHeight;
				this.dimensionMap.series.height-=diffHeight;
				this.dimensionMap.mouseEventDetector.height-=diffHeight;
				this.dimensionMap.tooltip.height-=diffHeight;
				this.dimensionMap.yAxis.height-=diffHeight;
				this.dimensionMap.rightYAxis.height-=diffHeight;
				this.dimensionMap.xAxis.height+=diffHeight;
			},
			/**
			 * Update dimensions for label of x axis.
			 * @param {?object} xAxisData - axis data for x axis.
			 * @private
			 */
			_updateDimensionsForXAxisLabel:function( xAxisData ){
				if( xAxisData.overflowLeft > 0 ){
					this._updateDimensionsWidth(xAxisData.overflowLeft);
				}
				if( xAxisData.overflowHeight ){
					this._updateDimensionsHeight(xAxisData.overflowHeight);
				}
			},
			/**
			 * Register axes type component positions.
			 * @param {number} leftLegendWidth legend width
			 * @private
			 */
			_registerAxisComponentsPosition:function( leftLegendWidth ){
				var seriesPosition=this.getPosition('series'),
					seriesDimension=this.getDimension('series'),
					yAxisWidth=this.getDimension('yAxis').width,
					leftAreaWidth=yAxisWidth+seriesDimension.width+leftLegendWidth;
				this.positionMap.plot={
					top:seriesPosition.top,
					left:seriesPosition.left
				};
				this.positionMap.yAxis={
					top:seriesPosition.top,
					left:this.chartLeftPadding+leftLegendWidth
				};
				this.positionMap.xAxis={
					top:seriesPosition.top+seriesDimension.height,
					left:seriesPosition.left
				};
				this.positionMap.rightYAxis={
					top:seriesPosition.top,
					left:this.chartLeftPadding+leftAreaWidth-chartConst.OVERLAPPING_WIDTH
				};
			},
			/**
			 * Make legend position.
			 * @returns {{top: number, left: number}} legend bound
			 * @private
			 */
			_makeLegendPosition:function(){
				var dimensionMap=this.dimensionMap;
				var seriesDimension=this.getDimension('series');
				var legendOption=this.options.legend;
				var top=dimensionMap.title.height;
				var yAxisAreaWidth, left;
				if( predicate.isLegendAlignBottom(legendOption.align) ){
					top+=seriesDimension.height+this.getDimension('xAxis').height+chartConst.LEGEND_AREA_PADDING;
				}
				if( predicate.isHorizontalLegend(legendOption.align) ){
					left=((this.getDimension('chart').width-this.getDimension('legend').width)/2)
						-chartConst.LEGEND_AREA_PADDING;
				}else if( predicate.isLegendAlignLeft(legendOption.align) ){
					left=0;
				}else{
					yAxisAreaWidth=this.getDimension('yAxis').width+this.getDimension('rightYAxis').width;
					left=seriesDimension.width+yAxisAreaWidth+this.chartLeftPadding;
				}
				return {
					top:top,
					left:left
				};
			},
			/**
			 * Make chartExportMenu position.
			 * @returns {{top: number, left: number}}
			 * @private
			 */
			_makeChartExportMenuPosition:function(){
				return {
					top:10,
					right:20
				};
			},
			/**
			 * Make CircleLegend position.
			 * @returns {{top: number, left: number}}
			 * @private
			 */
			_makeCircleLegendPosition:function(){
				var seriesPosition=this.getPosition('series');
				var seriesDimension=this.getDimension('series');
				var circleDimension=this.getDimension('circleLegend');
				var legendOptions=this.options.legend;
				var left, legendWidth;
				if( predicate.isLegendAlignLeft(legendOptions.align) ){
					left=0;
				}else{
					left=seriesPosition.left+seriesDimension.width;
				}
				if( predicate.isVerticalLegend(legendOptions.align) && legendOptions.visible ){
					legendWidth=this.getDimension('legend').width+chartConst.CHART_PADDING;
					left+=(legendWidth-circleDimension.width)/2;
				}
				return {
					top:seriesPosition.top+seriesDimension.height-circleDimension.height,
					left:left
				};
			},
			/**
			 * Whether need expansion series or not.
			 * @returns {boolean}
			 * @private
			 */
			_isNeedExpansionSeries:function(){
				var chartType=this.chartType;
				return !(predicate.isPieChart(chartType) || predicate.isMapChart(chartType))
					&& !predicate.isTreemapChart(chartType)
					&& !predicate.isRadialChart(chartType)
					&& !predicate.isPieDonutComboChart(chartType, this.seriesNames);
			},
			/**
			 * Register essential components positions.
			 * Essential components is all components except components for axis.
			 * @private
			 */
			_registerEssentialComponentsPositions:function(){
				var seriesPosition=this.getPosition('series');
				var tooltipPosition;
				this.positionMap.mouseEventDetector=tui.util.extend({}, seriesPosition);
				this.positionMap.legend=this._makeLegendPosition();
				this.positionMap.chartExportMenu=this._makeChartExportMenuPosition();
				if( this.getDimension('circleLegend').width ){
					this.positionMap.circleLegend=this._makeCircleLegendPosition();
				}
				if( this._isNeedExpansionSeries() ){
					tooltipPosition={
						top:seriesPosition.top-chartConst.SERIES_EXPAND_SIZE,
						left:seriesPosition.left-chartConst.SERIES_EXPAND_SIZE
					};
				}else{
					tooltipPosition=seriesPosition;
				}
				this.positionMap.tooltip=tooltipPosition;
			},
			/**
			 * Register positions.
			 * @private
			 */
			_registerPositions:function(){
				var alignOption=this.options.legend.align;
				var isVisibleLegend=this.options.legend.visible;
				var legendDimension=this.getDimension('legend');
				var topLegendHeight=(predicate.isLegendAlignTop(alignOption) && isVisibleLegend) ? legendDimension.height : 0;
				var leftLegendWidth=(predicate.isLegendAlignLeft(alignOption) && isVisibleLegend) ? legendDimension.width : 0;
				var seriesPosition={
					top:this.getDimension('title').height+chartConst.CHART_PADDING+topLegendHeight,
					left:this.chartLeftPadding+leftLegendWidth+this.getDimension('yAxis').width
				};
				this.positionMap.series=seriesPosition;
				if( this.hasAxes ){
					this._registerAxisComponentsPosition(leftLegendWidth);
				}
				this._registerEssentialComponentsPositions();
			},
			/**
			 * Register bound of extended series for rendering.
			 * @private
			 */
			_registerExtendedSeriesBound:function(){
				var seriesBound=this.getBound('series');
				if( this._isNeedExpansionSeries() ){
					seriesBound=renderUtil.expandBound(seriesBound);
				}
				this._setBound('extendedSeries', seriesBound);
			},
			/**
			 * Update bounds(positions, dimensions) of components for center option of yAxis.
			 * @private
			 */
			_updateBoundsForYAxisCenterOption:function(){
				var yAxisWidth=this.getDimension('yAxis').width;
				var yAxisExtensibleLeft=Math.floor((this.getDimension('series').width/2))+chartConst.OVERLAPPING_WIDTH;
				var xAxisDecreasingLeft=yAxisWidth-chartConst.OVERLAPPING_WIDTH;
				var additionalLeft=renderUtil.isOldBrowser() ? 1 : 0;
				this.dimensionMap.extendedSeries.width+=yAxisWidth;
				this.dimensionMap.xAxis.width+=chartConst.OVERLAPPING_WIDTH;
				this.dimensionMap.plot.width+=yAxisWidth+chartConst.OVERLAPPING_WIDTH;
				this.dimensionMap.mouseEventDetector.width+=yAxisWidth;
				this.dimensionMap.tooltip.width+=yAxisWidth;
				this.positionMap.series.left-=(yAxisWidth-additionalLeft);
				this.positionMap.extendedSeries.left-=(xAxisDecreasingLeft-additionalLeft);
				this.positionMap.plot.left-=xAxisDecreasingLeft;
				this.positionMap.yAxis.left+=yAxisExtensibleLeft;
				this.positionMap.xAxis.left-=xAxisDecreasingLeft;
				this.positionMap.mouseEventDetector.left-=xAxisDecreasingLeft;
				this.positionMap.tooltip.left-=xAxisDecreasingLeft;
			},
			/**
			 * Register bounds data.
			 * @param {?object} xAxisData - axis data for x axis.
			 */
			registerBoundsData:function( xAxisData ){
				this._registerCenterComponentsDimension();
				if( this.hasAxes ){
					this._registerAxisComponentsDimension();
					this._updateDimensionsForXAxisLabel(xAxisData);
				}
				this._registerPositions();
				this._registerExtendedSeriesBound();
				if( this.options.yAxis.isCenter ){
					this._updateBoundsForYAxisCenterOption();
				}
			},
			/**
			 * Calculate max radius.
			 * @param {object} axisDataMap - axisData map
			 * @returns {number}
			 */
			calculateMaxRadius:function( axisDataMap ){
				var dimensionMap=this.getDimensionMap(['series', 'circleLegend']);
				return circleLegendCalculator.calculateMaxRadius(dimensionMap, axisDataMap);
			}
		});
		module.exports=BoundsModel;
		/***/
	},
	/* 84 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Calculator for circle legend.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var renderUtil=__webpack_require__(23);
		/**
		 * Calculator for circle legend.
		 * @module circleLegendCalculator
		 * @private */
		var circleLegendCalculator={
			/**
			 * Calculate step of pixel unit.
			 * @param {{tickCount: number, isLabelAxis: boolean}} axisData - data for rendering axis
			 * @param {number} size - width or height of series area
			 * @returns {number}
			 * @private
			 */
			_calculatePixelStep:function( axisData, size ){
				var tickCount=axisData.tickCount;
				var pixelStep;
				if( axisData.isLabelAxis ){
					pixelStep=size/tickCount/2;
				}else{
					pixelStep=size/(tickCount-1);
				}
				return parseInt(pixelStep, 10);
			},
			/**
			 * Calculate radius by axis data.
			 * @param {{width: number, height: number}} seriesDimension - dimension for series
			 * @param {{xAxis: object, yAxis: object}} axisDataMap - axis data map
			 * @returns {number}
			 * @private
			 */
			_calculateRadiusByAxisData:function( seriesDimension, axisDataMap ){
				var yPixelStep=this._calculatePixelStep(axisDataMap.yAxis, seriesDimension.height);
				var xPixelStep=this._calculatePixelStep(axisDataMap.xAxis, seriesDimension.width);
				return Math.min(yPixelStep, xPixelStep);
			},
			/**
			 * Get max width of label for CircleLegend.
			 * @param {string} maxLabel - maximum label
			 * @param {string} fontFamily - fontFamily for legend
			 * @returns {number}
			 * @private
			 */
			_getCircleLegendLabelMaxWidth:function( maxLabel, fontFamily ){
				return renderUtil.getRenderedLabelWidth(maxLabel, {
					fontSize:chartConst.CIRCLE_LEGEND_LABEL_FONT_SIZE,
					fontFamily:fontFamily
				});
			},
			/**
			 * Calculate width for circle legend.
			 * @param {{width: number, height: number}} seriesDimension - dimension for series
			 * @param {{xAxis: object, yAxis: object}} axisDataMap - axis data map
			 * @param {string} maxLabel - maximum label
			 * @param {string} fontFamily - fontFamily for legend
			 * @returns {number}
			 * @private
			 */
			calculateCircleLegendWidth:function( seriesDimension, axisDataMap, maxLabel, fontFamily ){
				var maxRadius=this._calculateRadiusByAxisData(seriesDimension, axisDataMap);
				var maxLabelWidth=this._getCircleLegendLabelMaxWidth(maxLabel, fontFamily);
				return Math.max((maxRadius*2), maxLabelWidth)+chartConst.CIRCLE_LEGEND_PADDING;
			},
			/**
			 * Calculate max radius.
			 * @param {{series: {width: number, height: number}, circleLegend: {width: number}}} dimensionMap - dimension map
			 * @param {{xAxis: object, yAxis: object}} axisDataMap - axis data map
			 * @returns {number}
			 * @private
			 */
			calculateMaxRadius:function( dimensionMap, axisDataMap ){
				var maxRadius=this._calculateRadiusByAxisData(dimensionMap.series, axisDataMap);
				var circleLegendWidth=dimensionMap.circleLegend.width;
				return Math.min((circleLegendWidth-chartConst.CIRCLE_LEGEND_PADDING)/2, maxRadius);
			}
		};
		module.exports=circleLegendCalculator;
		/***/
	},
	/* 85 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Calculator for dimension of axis.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var renderUtil=__webpack_require__(23);
		/**
		 * Calculator for dimension of axis.
		 * @module axisCalculator
		 * @private */
		var axisCalculator={
			/**
			 * Calculate height for x axis.
			 * @param {string} title - title for x axis
			 * @param {{title: object, label: object}} theme - theme for x axis
			 * @returns {*}
			 */
			calculateXAxisHeight:function( title, theme ){
				var titleHeight=title ? renderUtil.getRenderedLabelHeight(title.text, theme.title) : 0;
				var titleAreaHeight=titleHeight ? (titleHeight+chartConst.TITLE_PADDING) : 0;
				var labelHeight=renderUtil.getRenderedLabelHeight(chartConst.MAX_HEIGHT_WORLD, theme.label);
				return titleAreaHeight+labelHeight+chartConst.CHART_PADDING;
			},
			/**
			 * Calculate width for y axis.
			 * @param {Array.<string | number>} labels labels
			 * @param {{title: ?string, isCenter: ?boolean, rotateTitle: ?boolean}} options - options
			 * @param {{title: object, label: object}} theme - them for y axis
			 * @returns {number}
			 * @private
			 */
			calculateYAxisWidth:function( labels, options, theme ){
				var title=options.title || '';
				var titleAreaWidth=0;
				var width=0;
				if( options.isCenter ){
					width+=chartConst.AXIS_LABEL_PADDING;
				}else if( options.rotateTitle===false ){
					titleAreaWidth=renderUtil.getRenderedLabelWidth(title.text, theme.title)+chartConst.TITLE_PADDING;
				}else{
					titleAreaWidth=renderUtil.getRenderedLabelHeight(title.text, theme.title)+chartConst.TITLE_PADDING;
				}
				if( predicate.isDatetimeType(options.type) ){
					labels=renderUtil.formatDates(labels, options.dateFormat);
				}
				width+=renderUtil.getRenderedLabelsMaxWidth(labels, theme.label)+titleAreaWidth+
					chartConst.AXIS_LABEL_PADDING;
				return width;
			}
		};
		module.exports=axisCalculator;
		/***/
	},
	/* 86 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Calculator for dimension of legend.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var arrayUtil=__webpack_require__(6);
		/**
		 * Calculator for dimension of legend.
		 * @module legendCalculator
		 * @private */
		var legendCalculator={
			/**
			 * Legend margin.
			 * @type {number}
			 */
			legendMargin:chartConst.LEGEND_RECT_WIDTH+chartConst.LEGEND_LABEL_LEFT_PADDING+chartConst.LEGEND_AREA_PADDING,
			/**
			 * Calculate sum of legends width.
			 * @param {Array.<string>} labels - legend labels
			 * @param {{fontSize: number, fontFamily: number}} labelTheme - legend label theme
			 * @param {number} checkboxWidth - width for checkbox
			 * @returns {number}
			 * @private
			 */
			_calculateLegendsWidthSum:function( labels, labelTheme, checkboxWidth ){
				var legendMargin=this.legendMargin;
				return calculator.sum(tui.util.map(labels, function( label ){
					var labelWidth=renderUtil.getRenderedLabelWidth(label, labelTheme)+checkboxWidth;
					return labelWidth+legendMargin;
				}));
			},
			/**
			 * Divide legend labels.
			 * @param {Array.<string>} labels legend labels
			 * @param {number} count division count
			 * @returns {Array.<Array.<string>>}
			 * @private
			 */
			_divideLegendLabels:function( labels, count ){
				var limitCount=Math.round(labels.length/count);
				var results=[];
				var temp=[];
				tui.util.forEachArray(labels, function( label ){
					if( temp.length < limitCount ){
						temp.push(label);
					}else{
						results.push(temp);
						temp=[label];
					}
				});
				if( temp.length ){
					results.push(temp);
				}
				return results;
			},
			/**
			 * Get max line width.
			 * @param {Array.<string>} dividedLabels - divided labels
			 * @param {{fontFamily: ?string, fontSize: ?string}} labelTheme - label theme
			 * @param {number} checkboxWidth - width for checkbox
			 * @returns {number}
			 * @private
			 */
			_getMaxLineWidth:function( dividedLabels, labelTheme, checkboxWidth ){
				var self=this;
				var lineWidths=tui.util.map(dividedLabels, function( labels ){
					return self._calculateLegendsWidthSum(labels, labelTheme, checkboxWidth);
				});
				return arrayUtil.max(lineWidths);
			},
			/**
			 * Make divided labels and max line width.
			 * @param {Array.<string>} labels legend labels
			 * @param {number} chartWidth chart width
			 * @param {{fontSize: number, fontFamily: number}} labelTheme legend label theme
			 * @param {number} checkboxWidth - width for checkbox
			 * @returns {{dividedLabels: Array.<Array.<string>>, maxLineWidth: number}}
			 * @private
			 */
			_makeDividedLabelsAndMaxLineWidth:function( labels, chartWidth, labelTheme, checkboxWidth ){
				var divideCount=1;
				var maxLineWidth=0;
				var prevMaxWidth=0;
				var dividedLabels, prevLabels;
				do{
					dividedLabels=this._divideLegendLabels(labels, divideCount);
					maxLineWidth=this._getMaxLineWidth(dividedLabels, labelTheme, checkboxWidth);
					if( prevMaxWidth===maxLineWidth ){
						dividedLabels=prevLabels;
						break;
					}
					prevMaxWidth=maxLineWidth;
					prevLabels=dividedLabels;
					divideCount+=1;
				}while( maxLineWidth >= chartWidth );
				return {
					labels:dividedLabels,
					maxLineWidth:maxLineWidth
				};
			},
			/**
			 * Calculate height of horizontal legend.
			 * @param {Array.<Array.<string>>} dividedLabels - divided labels
			 * @param {{fontSize: number, fontFamily: number}} labelTheme - label theme for legend
			 * @returns {number}
			 * @private
			 */
			_calculateHorizontalLegendHeight:function( dividedLabels, labelTheme ){
				return calculator.sum(tui.util.map(dividedLabels, function( labels ){
					return renderUtil.getRenderedLabelsMaxHeight(labels, labelTheme);
				}));
			},
			/**
			 * Make dimension of horizontal legend.
			 * @param {{fontSize: number, fontFamily: number}} labelTheme - label theme for legend
			 * @param {Array.<string>} legendLabels - labels for legend
			 * @param {number} chartWidth - chart width
			 * @param {number} checkboxWidth - width for checkbox
			 * @returns {{width: number, height: (number)}}
			 * @private
			 */
			_makeHorizontalDimension:function( labelTheme, legendLabels, chartWidth, checkboxWidth ){
				var dividedInfo=this._makeDividedLabelsAndMaxLineWidth(legendLabels, chartWidth, labelTheme, checkboxWidth);
				var horizontalLegendHeight=this._calculateHorizontalLegendHeight(dividedInfo.labels, labelTheme);
				var legendHeight=horizontalLegendHeight+(chartConst.LEGEND_AREA_PADDING*2);
				return {
					width:Math.max(dividedInfo.maxLineWidth, chartConst.MIN_LEGEND_WIDTH),
					height:legendHeight
				};
			},
			/**
			 * Make dimension of vertical legend.
			 * @param {{fontSize: number, fontFamily: number}} labelTheme - label theme for legend
			 * @param {Array.<string>} legendLabels - labels for legend
			 * @param {number} checkboxWidth - width for checkbox
			 * @returns {{width: (number)}}
			 * @private
			 */
			_makeVerticalDimension:function( labelTheme, legendLabels, checkboxWidth ){
				var labelWidth=renderUtil.getRenderedLabelsMaxWidth(legendLabels, labelTheme)+checkboxWidth;
				return {
					width:labelWidth+this.legendMargin,
					height:0
				};
			},
			/**
			 * Calculate legend dimension.
			 * @param {{showCheckbox: boolean, visible: boolean, align: string}} options - options for legend
			 * @param {{fontSize: number, fontFamily: number}} labelTheme - label theme for legend
			 * @param {Array.<string>} legendLabels - labels for legend
			 * @param {number} chartWidth chart width
			 * @returns {{width: number, height: number}}
			 */
			calculate:function( options, labelTheme, legendLabels, chartWidth ){
				var checkboxWidth=options.showCheckbox===false ? 0 : chartConst.LEGEND_CHECKBOX_WIDTH;
				var dimension={};
				if( !options.visible ){
					dimension.width=0;
				}else if( predicate.isHorizontalLegend(options.align) ){
					dimension=this._makeHorizontalDimension(labelTheme, legendLabels, chartWidth, checkboxWidth);
				}else{
					dimension=this._makeVerticalDimension(labelTheme, legendLabels, checkboxWidth);
				}
				return dimension;
			}
		};
		module.exports=legendCalculator;
		/***/
	},
	/* 87 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Calculator for series.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		/**
		 * Calculator for series.
		 * @module seriesCalculator
		 * @private */
		var seriesCalculator={
			/**
			 * Calculate width.
			 * @param {{
	     *      chart: {width: number},
	     *      yAxis: {width: number},
	     *      legend: {width: number},
	     *      rightYAxis: ?{width: number}
	     * }} dimensionMap - dimension map
			 * @param {{align: ?string, visible: boolean}} legendOptions - legend options
			 * @returns {number} series width
			 */
			calculateWidth:function( dimensionMap, legendOptions ){
				var chartWidth=dimensionMap.chart.width;
				var yAxisWidth=dimensionMap.yAxis.width;
				var legendDimension=dimensionMap.legend;
				var legendWidth, rightAreaWidth;
				if( predicate.isVerticalLegend(legendOptions.align) && legendOptions.visible ){
					legendWidth=legendDimension ? legendDimension.width : 0;
				}else{
					legendWidth=0;
				}
				rightAreaWidth=legendWidth+dimensionMap.rightYAxis.width;
				return chartWidth-(chartConst.CHART_PADDING*2)-yAxisWidth-rightAreaWidth;
			},
			/**
			 * Calculate height.
			 * @param {{
	     *      chart: {height: number},
	     *      title: {height: number},
	     *      legend: {height: number},
	     *      xAxis: {height: number}
	     * }} dimensionMap - dimension map
			 * @param {{align: ?string, visible: boolean}} legendOptions - legend options
			 * @returns {number} series height
			 */
			calculateHeight:function( dimensionMap, legendOptions ){
				var chartHeight=dimensionMap.chart.height;
				var titleHeight=dimensionMap.title.height;
				var legendHeight, bottomAreaWidth;
				if( predicate.isHorizontalLegend(legendOptions.align) && legendOptions.visible ){
					legendHeight=dimensionMap.legend.height;
				}else{
					legendHeight=0;
				}
				bottomAreaWidth=legendHeight+dimensionMap.xAxis.height;
				return chartHeight-(chartConst.CHART_PADDING*2)-titleHeight-bottomAreaWidth;
			}
		};
		module.exports=seriesCalculator;
		/***/
	},
	/* 88 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Calculator for spectrum legend.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var renderUtil=__webpack_require__(23);
		/**
		 * Calculator for spectrum legend.
		 * @module spectrumLegendCalculator
		 * @private */
		var spectrumLegendCalculator={
			/**
			 * Make vertical dimension.
			 * @param {string} maxValue - formatted max value
			 * @param {object} labelTheme - theme for label
			 * @returns {{width: number, height: number}}
			 * @private
			 */
			_makeVerticalDimension:function( maxValue, labelTheme ){
				var labelWidth=renderUtil.getRenderedLabelWidth(maxValue, labelTheme);
				var padding=chartConst.LEGEND_AREA_PADDING+chartConst.MAP_LEGEND_LABEL_PADDING;
				return {
					width:chartConst.MAP_LEGEND_GRAPH_SIZE+labelWidth+padding,
					height:chartConst.MAP_LEGEND_SIZE
				};
			},
			/**
			 * Make horizontal dimension.
			 * @param {string} maxValue - formatted max value
			 * @param {object} labelTheme - theme for label
			 * @returns {{width: number, height: number}}
			 * @private
			 */
			_makeHorizontalDimension:function( maxValue, labelTheme ){
				var labelHeight=renderUtil.getRenderedLabelHeight(maxValue, labelTheme);
				var padding=chartConst.LEGEND_AREA_PADDING+chartConst.MAP_LEGEND_LABEL_PADDING;
				return {
					width:chartConst.MAP_LEGEND_SIZE,
					height:chartConst.MAP_LEGEND_GRAPH_SIZE+labelHeight+padding
				};
			}
		};
		module.exports=spectrumLegendCalculator;
		/***/
	},
	/* 89 */
	/***/ function( module, exports, __webpack_require__ ){
		'use strict';
		var scaleDataMaker=__webpack_require__(90);
		var scaleLabelFormatter=__webpack_require__(92);
		var axisDataMaker=__webpack_require__(93);
		var predicate=__webpack_require__(5);
		var ScaleDataModel=tui.util.defineClass(/** @lends ScaleDataModel.prototype */{
			/**
			 * ScaleDataModel is scale model for scale data and axis data.
			 * @param {object} params - parameters
			 * @constructs ScaleDataModel
			 * @private
			 */
			init:function( params ){
				this.chartType=params.chartType;
				this.seriesNames=params.seriesNames;
				this.dataProcessor=params.dataProcessor;
				this.boundsModel=params.boundsModel;
				this.options=params.options;
				this.theme=params.theme;
				this.hasRightYAxis= !!params.hasRightYAxis;
				this.prevValidLabelCount=null;
				this.initScaleData(params.addedDataCount);
				this.initForAutoTickInterval();
			},
			/**
			 * Initialize scale data.
			 * @param {?number} addedDataCount - increased added count by dynamic adding data
			 */
			initScaleData:function( addedDataCount ){
				this.scaleDataMap={};
				this.axisDataMap={};
				this.addedDataCount=addedDataCount;
			},
			/**
			 * Initialize for auto tick interval.
			 */
			initForAutoTickInterval:function(){
				this.firstTickCount=null;
			},
			/**
			 * Pick limit option.
			 * @param {{min: ?number, max: ?number}} axisOptions - axis options
			 * @returns {{min: ?number, max: ?number}}
			 * @private
			 */
			_pickLimitOption:function( axisOptions ){
				axisOptions=axisOptions || {};
				return {
					min:axisOptions.min,
					max:axisOptions.max
				};
			},
			/**
			 * Create base scale data.
			 * @param {{
	     *      chartType: string,
	     *      areaType: string,
	     *      valueType: string
	     * }} typeMap - type map
			 * @param {{
	     *      type: string,
	     *      stackType: string,
	     *      diverging: boolean
	     * }} baseOptions - base options
			 * @param {object} axisOptions - axis options
			 * @param {object} additionalOptions - additional options
			 * @returns {{limit: {min: number, max: number}, step: number}}
			 * @private
			 */
			_createBaseScaleData:function( typeMap, baseOptions, axisOptions, additionalOptions ){
				var chartType=typeMap.chartType;
				var isVertical=typeMap.areaType!=='xAxis';
				var baseValues=this.dataProcessor.createBaseValuesForLimit(
					chartType, additionalOptions.isSingleYAxis, baseOptions.stackType, typeMap.valueType
				);
				var baseSize=this.boundsModel.getBaseSizeForLimit(isVertical);
				var options=tui.util.extend(baseOptions, {
					isVertical:isVertical,
					limitOption:this._pickLimitOption(axisOptions),
					tickCounts:additionalOptions.tickCounts
				});
				if( predicate.isBubbleChart(chartType) ){
					options.overflowItem=this.dataProcessor.findOverflowItem(chartType, typeMap.valueType);
				}
				return scaleDataMaker.makeScaleData(baseValues, baseSize, chartType, options);
			},
			/**
			 * Create scale labels.
			 * @param {{limit: {min: number, max: number}, step: number}} baseScaleData - base scale data
			 * @param {{
	     *      chartType: string,
	     *      areaType: string,
	     *      valueType: string
	     * }} typeMap - type map
			 * @param {{
	     *      type: string,
	     *      stackType: string,
	     *      diverging: boolean
	     * }} baseOptions - base options
			 * @param {string} dateFormat - date format
			 * @returns {Array.<string>}
			 * @private
			 */
			_createScaleLabels:function( baseScaleData, typeMap, baseOptions, dateFormat ){
				var formatFunctions=this.dataProcessor.getFormatFunctions();
				var options=tui.util.extend(baseOptions, {
					dateFormat:dateFormat
				});
				return scaleLabelFormatter.createFormattedLabels(baseScaleData, typeMap, options, formatFunctions);
			},
			/**
			 * Create scale.
			 * @param {object} axisOptions - axis options
			 * @param {{chartType: string, areaType: string}} typeMap - type map
			 * @param {?object} additionalOptions - additional options
			 * @returns {object}
			 * @private
			 */
			_createScaleData:function( axisOptions, typeMap, additionalOptions ){
				var seriesOptions=this.options.series;
				var chartType=typeMap.chartType || this.chartType;
				var baseOptions, baseScaleData;
				typeMap.chartType=chartType;
				seriesOptions=seriesOptions[chartType] || seriesOptions;
				baseOptions={
					stackType:additionalOptions.stackType || seriesOptions.stackType,
					diverging:seriesOptions.diverging,
					type:axisOptions.type
				};
				baseScaleData=this._createBaseScaleData(typeMap, baseOptions, axisOptions, additionalOptions);
				return tui.util.extend(baseScaleData, {
					labels:this._createScaleLabels(baseScaleData, typeMap, baseOptions, axisOptions.dateFormat),
					axisOptions:axisOptions
				});
			},
			/**
			 * Create value type axis data.
			 * @param {{labels: Array.<string>, limit: {min: number, max: number}, step: number}} scaleData - scale data
			 * @param {object} labelTheme - label theme
			 * @param {boolean} aligned - aligned tick and label
			 * @param {boolean} isVertical - whether vertical or not
			 * @param {boolean} isPositionRight - whether right position or not
			 * @returns {{
	     *      labels: Array.<string>,
	     *      tickCount: number,
	     *      validTickCount: number,
	     *      isLabelAxis: boolean,
	     *      limit: {min: number, max: number},
	     *      isVertical: boolean
	     * }}
			 * @private
			 */
			_createValueAxisData:function( scaleData, labelTheme, aligned, isVertical, isPositionRight ){
				var hasCategories=this.dataProcessor.hasCategories();
				var isCoordinateLineType=!isVertical && !hasCategories && aligned;
				var labels=scaleData.labels;
				var limit=scaleData.limit;
				var step=scaleData.step;
				var tickCount=labels.length;
				var values, additional;
				var axisData=axisDataMaker.makeValueAxisData({
					labels:labels,
					tickCount:labels.length,
					limit:limit,
					step:step,
					options:scaleData.axisOptions,
					labelTheme:labelTheme,
					isVertical:!!isVertical,
					isPositionRight:!!isPositionRight,
					aligned:aligned
				});
				if( isCoordinateLineType ){
					values=this.dataProcessor.getValues(this.chartType, 'x');
					additional=axisDataMaker.makeAdditionalDataForCoordinateLineType(labels, values, limit, step, tickCount);
					tui.util.extend(axisData, additional);
				}
				return axisData;
			},
			/**
			 * Create label type axis data.
			 * @param {object} axisOptions - options for axis
			 * @param {object} labelTheme - label theme
			 * @param {boolean} aligned - aligned tick and label
			 * @param {boolean} isVertical - whether vertical or not
			 * @param {boolean} isPositionRight - whether right position or not
			 * @returns {{
	     *      labels: Array.<string>,
	     *      tickCount: number,
	     *      validTickCount: number,
	     *      isLabelAxis: boolean,
	     *      options: object,
	     *      isVertical: boolean,
	     *      isPositionRight: boolean,
	     *      aligned: boolean
	     * }}
			 * @private
			 */
			_createLabelAxisData:function( axisOptions, labelTheme, aligned, isVertical, isPositionRight ){
				return axisDataMaker.makeLabelAxisData({
					labels:this.dataProcessor.getCategories(isVertical),
					options:axisOptions,
					labelTheme:labelTheme,
					isVertical:!!isVertical,
					isPositionRight:!!isPositionRight,
					aligned:aligned,
					addedDataCount:this.options.series.shifting ? this.addedDataCount : 0
				});
			},
			/**
			 * Create axis data.
			 * @param {object} scaleData - scale data
			 * @param {object} axisOptions - axis options
			 * @param {object} labelTheme - them for label
			 * @param {boolean} isVertical - whether vertical or not
			 * @param {boolean} isPositionRight - whether right position or not
			 * @returns {object}
			 * @private
			 */
			_createAxisData:function( scaleData, axisOptions, labelTheme, isVertical, isPositionRight ){
				var aligned=predicate.isLineTypeChart(this.chartType, this.seriesNames);
				var axisData;
				if( scaleData ){
					axisData=this._createValueAxisData(scaleData, labelTheme, aligned, isVertical, isPositionRight);
				}else{
					axisData=this._createLabelAxisData(axisOptions, labelTheme, aligned, isVertical, isPositionRight);
				}
				return axisData;
			},
			/**
			 * Create axes data.
			 * @returns {object.<string, object>}
			 * @private
			 */
			_createAxesData:function(){
				var scaleDataMap=this.scaleDataMap;
				var options=this.options;
				var theme=this.theme;
				var yAxisOptions=tui.util.isArray(options.yAxis) ? options.yAxis : [options.yAxis];
				var dataMap={};
				dataMap.xAxis=this._createAxisData(scaleDataMap.xAxis, options.xAxis, theme.xAxis.label);
				dataMap.yAxis=this._createAxisData(scaleDataMap.yAxis, yAxisOptions[0], theme.yAxis.label, true);
				if( this.hasRightYAxis ){
					dataMap.rightYAxis=this._createAxisData(
						scaleDataMap.rightYAxis, yAxisOptions[1], theme.yAxis.label, true, true
					);
					dataMap.rightYAxis.aligned=dataMap.xAxis.aligned;
				}
				return dataMap;
			},
			/**
			 * Add scale.
			 * @param {string} axisName - axis name
			 * @param {options} axisOptions - axis options
			 * @param {{chartType: string, areaType: string}} typeMap - type map
			 * @param {object} additionalOptions - additional parameters
			 */
			addScale:function( axisName, axisOptions, typeMap, additionalOptions ){
				typeMap=typeMap || {};
				additionalOptions=additionalOptions || {};
				typeMap.areaType=typeMap.areaType || axisName;
				typeMap.chartType=additionalOptions.chartType || typeMap.chartType;
				this.scaleDataMap[axisName]=this._createScaleData(axisOptions, typeMap, additionalOptions);
			},
			/**
			 * Set axis data map.
			 */
			setAxisDataMap:function(){
				this.axisDataMap=this._createAxesData();
			},
			/**
			 * Update x axis data for auto tick interval.
			 * @param {object} prevXAxisData - previous xAxis data
			 * @param {?boolean} addingDataMode - whether adding data mode or not
			 */
			updateXAxisDataForAutoTickInterval:function( prevXAxisData, addingDataMode ){
				var shiftingOption=this.options.series.shifting;
				var zoomableOption=this.options.series.zoomable;
				var xAxisData=this.axisDataMap.xAxis;
				var seriesWidth=this.boundsModel.getDimension('series').width;
				var addedCount=this.addedDataCount;
				if( shiftingOption || !prevXAxisData || zoomableOption ){
					axisDataMaker.updateLabelAxisDataForAutoTickInterval(xAxisData, seriesWidth, addedCount, addingDataMode);
				}else{
					axisDataMaker.updateLabelAxisDataForStackingDynamicData(xAxisData, prevXAxisData, this.firstTickCount);
				}
				if( !this.firstTickCount ){
					this.firstTickCount=xAxisData.tickCount;
				}
			},
			/**
			 * Update x axis data for label.
			 * @param {?boolean} addingDataMode - whether adding data mode or not
			 */
			updateXAxisDataForLabel:function( addingDataMode ){
				var axisData=this.axisDataMap.xAxis;
				var labels=axisData.labels;
				var dimensionMap=this.boundsModel.getDimensionMap(['series', 'yAxis']);
				var isLabelAxis=axisData.isLabelAxis;
				var theme=this.theme.xAxis.label;
				var validLabels, validLabelCount, additionalData;
				if( addingDataMode ){
					labels=labels.slice(0, labels.length-1);
				}
				validLabels=tui.util.filter(labels, function( label ){
					return !!label;
				});
				if( !tui.util.isNull(this.prevValidLabelCount) ){
					validLabelCount=this.prevValidLabelCount;
				}else{
					validLabelCount=validLabels.length;
				}
				if( this.options.yAxis.isCenter ){
					validLabelCount+=1;
					dimensionMap.yAxis.width=0;
				}
				if( axisData.options.rotateLabel===false ){
					additionalData=axisDataMaker.makeAdditionalDataForMultilineLabels(
						labels, validLabelCount, theme, isLabelAxis, dimensionMap
					);
				}else{
					additionalData=axisDataMaker.makeAdditionalDataForRotatedLabels(
						validLabels, validLabelCount, theme, isLabelAxis, dimensionMap
					);
				}
				this.prevValidLabelCount=validLabelCount;
				tui.util.extend(axisData, additionalData);
			},
			/**
			 * Find limit from limitMap by seriesIndex
			 * @param {object} limitMap - limit map
			 * @param {number} seriesIndex - series index
			 * @param {boolean} isVertical - whether vertical or not
			 * @returns {boolean}
			 * @private
			 */
			_findLimit:function( limitMap, seriesIndex, isVertical ){
				var limit;
				if( seriesIndex===0 ){
					limit=isVertical ? limitMap.yAxis : limitMap.xAxis;
				}else{
					limit=limitMap.rightYAxis ? limitMap.rightYAxis : limitMap.yAxis;
				}
				return limit;
			},
			/**
			 * Make limit map.
			 * @param {Array.<string>} seriesNames - series names like bar, column, line, area
			 * @param {boolean} isVertical - whether vertical or not
			 * @returns {{
	     *      xAxis: ?{min: number, max: number},
	     *      yAxis: ?{min: number, max: number},
	     *      rightYAxis: ?{min: number, max: number},
	     *      legend: ?{min: number, max: number},
	     *      bar: ?{min: number, max: number}
	     * }}
			 * @private
			 */
			makeLimitMap:function( seriesNames, isVertical ){
				var self=this;
				var scaleDataMap=this.scaleDataMap;
				var limitMap={};
				if( scaleDataMap.xAxis ){
					limitMap.xAxis=scaleDataMap.xAxis.limit;
				}
				if( scaleDataMap.yAxis ){
					limitMap.yAxis=scaleDataMap.yAxis.limit;
				}
				if( scaleDataMap.rightYAxis ){
					limitMap.rightYAxis=scaleDataMap.rightYAxis.limit;
				}
				if( scaleDataMap.legend ){
					limitMap.legend=scaleDataMap.legend.limit;
				}
				tui.util.forEachArray(seriesNames, function( seriesName, index ){
					limitMap[seriesName]=self._findLimit(limitMap, index, isVertical);
				});
				return limitMap;
			}
		});
		module.exports=ScaleDataModel;
		/***/
	},
	/* 90 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview scaleMaker calculates the limit and step into values of processed data and returns it.
		 * @auth NHN Ent.
		 *       FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var arrayUtil=__webpack_require__(6);
		var coordinateScaleCalculator=__webpack_require__(91);
		var abs=Math.abs;
		/**
		 * scaleMaker calculates limit and step into values of processed data and returns it.
		 * @module scaleDataMaker
		 * @private */
		var scaleDataMaker={
			/**
			 * Make limit for diverging option.
			 * 다이버징 차트에서는 min, max의 값을 절대값으로 최대치로 동일하게하고
			 * 한쪽만 음수로 처리해서 양쪽의 균형이 맞게 한다.
			 * 이렇게 하지 않으면 중심이 한쪽으로 쏠려있다.
			 * @param {{min: number, max: number}} limit limit
			 * @returns {{min: number, max: number}} changed limit
			 * @private
			 */
			_makeLimitForDivergingOption:function( limit ){
				var newMax=Math.max(abs(limit.min), abs(limit.max));
				return {
					min:-newMax,
					max:newMax
				};
			},
			/**
			 * Adjust limit for bubble chart.
			 * @param {{min: number, max: number}} limit - limit
			 * @param {number} step - step;
			 * @param {object.<string, object>} overflowItem - overflow Item map
			 * @returns {object} limit
			 * @private
			 */
			_adjustLimitForBubbleChart:function( limit, step, overflowItem ){
				var min=limit.min;
				var max=limit.max;
				if( overflowItem.minItem ){
					min-=step;
				}
				if( overflowItem.maxItem ){
					max+=step;
				}
				return {
					min:min,
					max:max
				};
			},
			/**
			 * millisecond map
			 */
			millisecondMap:{
				year:31536000000,
				month:2678400000,
				date:86400000,
				hour:3600000,
				minute:60000,
				second:1000
			},
			/**
			 * millisecond types
			 */
			millisecondTypes:['year', 'month', 'date', 'hour', 'minute', 'second'],
			/**
			 * Find date type.
			 * @param {{min: number, max: number}} dataLimit - data limit
			 * @param {number} count - data count
			 * @returns {string}
			 * @private
			 */
			_findDateType:function( dataLimit, count ){
				var diff=dataLimit.max-dataLimit.min;
				var millisecondTypes=this.millisecondTypes;
				var millisecondMap=this.millisecondMap;
				var lastTypeIndex=millisecondTypes.length-1;
				var foundType;
				if( diff ){
					tui.util.forEachArray(millisecondTypes, function( type, index ){
						var millisecond=millisecondMap[type];
						var dividedCount=Math.floor(diff/millisecond);
						var foundIndex;
						if( dividedCount ){
							foundIndex=index < lastTypeIndex && (dividedCount < count) ? index+1 : index;
							foundType=millisecondTypes[foundIndex];
						}
						return !tui.util.isExisty(foundIndex);
					});
				}else{
					foundType=chartConst.DATE_TYPE_SECOND;
				}
				return foundType;
			},
			/**
			 * Make datetime information
			 * @param {{min: number, max: number}} dataLimit - data limit
			 * @param {number} count - data count
			 * @returns {{divisionNumber: number, minDate: number, dataLimit: {min: number, max: number}}}
			 * @private
			 */
			_makeDatetimeInfo:function( dataLimit, count ){
				var dateType=this._findDateType(dataLimit, count);
				var divisionNumber=this.millisecondMap[dateType];
				var minDate=calculator.divide(dataLimit.min, divisionNumber);
				var maxDate=calculator.divide(dataLimit.max, divisionNumber);
				var max=maxDate-minDate;
				return {
					divisionNumber:divisionNumber,
					minDate:minDate,
					dataLimit:{
						min:0,
						max:max
					}
				};
			},
			/**
			 * Restore scale to datetime type.
			 * @param {{scale: number, limit:{min: number, max: number}}} scale - scale
			 * @param {number} minDate - minimum date
			 * @param {number} divisionNumber - division number
			 * @returns {{step: number, limit: {min: number, max: number}}}
			 * @private
			 */
			_restoreScaleToDatetimeType:function( scale, minDate, divisionNumber ){
				var limit=scale.limit;
				scale.step=calculator.multiply(scale.step, divisionNumber);
				limit.min=calculator.multiply(calculator.add(limit.min, minDate), divisionNumber);
				limit.max=calculator.multiply(calculator.add(limit.max, minDate), divisionNumber);
				return scale;
			},
			/**
			 * Get limit values safely by limit values are both Zero then set max value to 10 temporary.
			 * @param {Array} baseValues base values
			 * @returns {{min: number, max: number}}
			 */
			_getLimitSafely:function( baseValues ){
				var limit={
					min:arrayUtil.min(baseValues),
					max:arrayUtil.max(baseValues)
				};
				if( limit.min===0 && limit.max===0 ){
					limit.max=10;
				}
				return limit;
			},
			/**
			 * Calculate date time scale.
			 * @param {Array.<number>} baseValues - base values for calculating scale data
			 * @param {number} baseSize - base size(width or height) for calculating scale data
			 * @param {boolean} isDiverging - is diverging or not
			 * @returns {{limit: {min: number, max: number}, step: number}}
			 * @private
			 */
			_calculateDatetimeScale:function( baseValues, baseSize, isDiverging ){
				var datetimeInfo, scale, limit;
				datetimeInfo=this._makeDatetimeInfo(this._getLimitSafely(baseValues), baseValues.length);
				limit=datetimeInfo.dataLimit;
				if( isDiverging ){
					limit=this._makeLimitForDivergingOption(limit);
				}
				scale=coordinateScaleCalculator({
					min:limit.min,
					max:limit.max,
					offsetSize:baseSize
				});
				scale=this._restoreScaleToDatetimeType(scale, datetimeInfo.minDate, datetimeInfo.divisionNumber);
				return scale;
			},
			/**
			 * Calculate percent stackType scale.
			 * @param {Array.<number>} baseValues - base values
			 * @param {boolean} isDiverging - is diverging or not
			 * @returns {{limit: {min:number, max:number}, step: number}}
			 * @private
			 */
			_calculatePercentStackedScale:function( baseValues, isDiverging ){
				var scale;
				if( calculator.sumMinusValues(baseValues)===0 ){
					scale=chartConst.PERCENT_STACKED_AXIS_SCALE;
				}else if( calculator.sumPlusValues(baseValues)===0 ){
					scale=chartConst.MINUS_PERCENT_STACKED_AXIS_SCALE;
				}else if( isDiverging ){
					scale=chartConst.DIVERGING_PERCENT_STACKED_AXIS_SCALE;
				}else{
					scale=chartConst.DUAL_PERCENT_STACKED_AXIS_SCALE;
				}
				return scale;
			},
			/**
			 * Calculate coordinate scale.
			 * @param {Array.<number>} baseValues - base values
			 * @param {number} baseSize - base size(width or height) for calculating scale data
			 * @param {object} overflowItem - overflow item
			 * @param {boolean} isDiverging - is diverging or not
			 * @param {object} options - scale options
			 * @param {{min: ?number, max: ?number}} options.limit - limit options
			 * @returns {{limit: {min:number, max:number}, step: number}}
			 * @private
			 */
			_calculateCoordinateScale:function( baseValues, baseSize, overflowItem, isDiverging, options ){
				var limit=this._getLimitSafely(baseValues);
				var limitOption=options.limitOption;
				var stepCount=options.stepCount;
				var min=limit.min;
				var max=limit.max;
				var scaleData;
				if( limitOption && (limitOption.min || limitOption.max) ){
					stepCount=null;
					min=tui.util.isExisty(limitOption.min) ? limitOption.min : min;
					max=tui.util.isExisty(limitOption.max) ? limitOption.max : max;
				}
				scaleData=coordinateScaleCalculator({
					min:min,
					max:max,
					stepCount:stepCount,
					offsetSize:baseSize
				});
				if( overflowItem ){
					scaleData.limit=this._adjustLimitForBubbleChart(scaleData.limit, scaleData.step, overflowItem);
				}else if( isDiverging ){
					scaleData.limit=this._makeLimitForDivergingOption(scaleData.limit);
				}
				return scaleData;
			},
			/**
			 * Make scale data.
			 * @param {Array.<number>} baseValues - base values for calculating scale data
			 * @param {number} baseSize - base size(width or height) for calculating scale data
			 * @param {string} chartType - chart type
			 * @param {{
	     *      type: string,
	     *      stackType: string,
	     *      diverging: boolean,
	     *      isVertical: boolean,
	     *      limitOption: ?{min: ?number, max: ?number},
	     *      tickCounts: ?Array.<number>
	     * }} options - options
			 * @returns {{limit: {min:number, max:number}, step: number, stepCount: number}}
			 */
			makeScaleData:function( baseValues, baseSize, chartType, options ){
				var scaleData;
				var isDiverging=predicate.isDivergingChart(chartType, options.diverging);
				var overflowItem=options.overflowItem;
				if( predicate.isPercentStackChart(chartType, options.stackType) ){
					scaleData=this._calculatePercentStackedScale(baseValues, isDiverging);
				}else if( predicate.isDatetimeType(options.type) ){
					scaleData=this._calculateDatetimeScale(baseValues, baseSize, isDiverging);
				}else{
					if( predicate.isRadialChart(chartType) ){
						options.stepCount=Math.floor(baseSize/100);
					}
					scaleData=this._calculateCoordinateScale(baseValues, baseSize, overflowItem, isDiverging, options);
				}
				return scaleData;
			}
		};
		module.exports=scaleDataMaker;
		/***/
	},
	/* 91 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview Implement function that calculate coordinate scale data
		 * @author Sungho Kim
		 */
		
		'use strict';
		/**
		 * The reference values to normailze value
		 * @private
		 * @type {Array.<number>}
		 */
		var SNAP_VALUES=[1, 2, 5, 10];
		/**
		 * Default step pixel size
		 * @private
		 * @type {number}
		 */
		var DEFAULT_PIXELS_PER_STEP=88;
		
		/**
		 * Get digits of number
		 * @param {number} number number
		 * @returns {number}
		 * @private
		 * @example
		 * this.getDigits(2145) == 1000
		 */
		function getDigits ( number ){
			var logNumberDevidedLN10=Math.log(number)/Math.LN10;
			return Math.pow(10, Math.floor(logNumberDevidedLN10));
		}
		
		/**
		 * Select value within SNAP_VALUES that most close with given value
		 * @param {number} number number
		 * @private
		 * @returns {number}
		 */
		function getSnappedNumber ( number ){
			var guideValue, snapNumber, i, t;
			for( i=0, t=SNAP_VALUES.length; i < t; i+=1 ){
				snapNumber=SNAP_VALUES[i];
				guideValue=(snapNumber+(SNAP_VALUES[i+1] || snapNumber))/2;
				if( number <= guideValue ){
					break;
				}
			}
			return snapNumber;
		}
		
		/**
		 * Get normalized step value
		 * @param {number} step step
		 * @private
		 * @returns {number}
		 */
		function getNormalizedStep ( step ){
			var placeNumber=getDigits(step);
			var simplifiedStepValue=step/placeNumber;
			return getSnappedNumber(simplifiedStepValue)*placeNumber;
		}
		
		/**
		 * Get normailzed limit values
		 * @param {number} min min
		 * @param {number} max max
		 * @param {number} step step
		 * @private
		 * @returns {number}
		 * max = 155 and step = 10 ---> max = 160
		 */
		function getNormalizedLimit ( min, max, step ){
			// max의 step 자릿수 이하 올림
			max=Math.ceil(max/step)*step;
			if( min > step ){
				// 최소값을 step 의 배수로 조정
				min=step*Math.floor(min/step);
			}else if( min < 0 ){
				min= -(Math.ceil(Math.abs(min)/step)*step);
			}else{
				// min값이 양수이고 step 보다 작으면 0으로 설정
				min=0;
			}
			return {
				min:min,
				max:max
			};
		}
		
		/**
		 * Get normalized scale data
		 * @param {object} scale scale
		 * @private
		 * @returns {object}
		 */
		function getNormalizedScale ( scale ){
			var step=getNormalizedStep(scale.step);
			var edge=getNormalizedLimit(scale.limit.min, scale.limit.max, step);
			var limitSize=Math.abs(edge.max-edge.min);
			var stepCount=limitSize/step;
			return {
				limit:{
					min:edge.min,
					max:edge.max
				},
				step:step,
				stepCount:stepCount
			};
		}
		
		/**
		 * Get rough(not normalized) scale data
		 * @param {number} min min
		 * @param {number} max max
		 * @param {number} offsetSize offset size
		 * @param {number} stepCount step count
		 * @private
		 * @returns {object} scale data
		 */
		function getRoughScale ( min, max, offsetSize, stepCount ){
			var limitSize=Math.abs(max-min);
			var valuePerPixel=limitSize/offsetSize;
			var pixelsPerStep, step;
			if( !stepCount ){
				stepCount=Math.ceil(offsetSize/DEFAULT_PIXELS_PER_STEP);
			}
			pixelsPerStep=offsetSize/stepCount;
			step=valuePerPixel*pixelsPerStep;
			return {
				limit:{
					min:min,
					max:max
				},
				step:step,
				stepCount:stepCount
			};
		}
		
		/**
		 * Calculate coordinate scale
		 * @param {object} options options
		 * @param {object} options.min min value
		 * @param {object} options.max max value
		 * @param {object} options.offsetSize offset pixel size of screen that needs scale
		 * @param {object} [options.stepCount] if need fixed step count
		 * @returns {object}
		 */
		function coordinateScaleCalculator ( options ){
			var min=options.min;
			var max=options.max;
			var offsetSize=options.offsetSize;
			var stepCount=options.stepCount;
			var scale=getRoughScale(min, max, offsetSize, stepCount);
			scale=getNormalizedScale(scale);
			return scale;
		}
		
		module.exports=coordinateScaleCalculator;
		/***/
	},
	/* 92 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview scaleMaker calculates the limit and step into values of processed data and returns it.
		 * @auth NHN Ent.
		 *       FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var abs=Math.abs;
		/**
		 * Format scale data labels
		 * @module scaleLabelFormatter
		 * @private
		 */
		var scaleLabelFormatter={
			/**
			 * Get functions for formatting value.
			 * @param {string} chartType - chart type
			 * @param {string} stackType - stack type
			 * @param {?Array.<function>} formatFunctions - format functions
			 * @returns {Array.<function>}
			 * @private
			 */
			_getFormatFunctions:function( chartType, stackType, formatFunctions ){
				if( predicate.isPercentStackChart(chartType, stackType) ){
					formatFunctions=[function( value ){
						return value+'%';
					}];
				}
				return formatFunctions;
			},
			/**
			 * Create scale values.
			 * @param {{limit: {min: number, max: number}, step: number}} scale - scale data
			 * @param {string} chartType - chart type
			 * @param {boolean} diverging - diverging option
			 * @returns {Array.<number>}
			 * @private
			 */
			_createScaleValues:function( scale, chartType, diverging ){
				var values=calculator.makeLabelsFromLimit(scale.limit, scale.step);
				return predicate.isDivergingChart(chartType, diverging) ? tui.util.map(values, abs) : values;
			},
			/**
			 * Create formatted scale values.
			 * @param {{limit: {min: number, max: number}, step: number}} scale - scale data
			 * @param {{
	     *      chartType: string,
	     *      areaType: string,
	     *      valueType: string
	     * }} typeMap - type map
			 * @param {{
	     *      type: string,
	     *      stackType: string,
	     *      diverging: boolean,
	     *      dateFormat: ?string
	     * }} options - options
			 * @param {?Array.<function>} formatFunctions - format functions
			 * @returns {Array.<string|number>|*}
			 */
			createFormattedLabels:function( scale, typeMap, options, formatFunctions ){
				var chartType=typeMap.chartType;
				var areaType=typeMap.areaType;
				var valueType=typeMap.valueType;
				var values=this._createScaleValues(scale, chartType, options.diverging);
				var formattedValues;
				if( predicate.isDatetimeType(options.type) ){
					formattedValues=renderUtil.formatDates(values, options.dateFormat);
				}else{
					formatFunctions=this._getFormatFunctions(chartType, options.stackType, formatFunctions);
					formattedValues=renderUtil.formatValues(values, formatFunctions, chartType, areaType, valueType);
				}
				return formattedValues;
			}
		};
		module.exports=scaleLabelFormatter;
		/***/
	},
	/* 93 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Axis Data Maker
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var arrayUtil=__webpack_require__(6);
		/**
		 * Axis data maker.
		 * @module axisDataMaker
		 * @private */
		var axisDataMaker={
			/**
			 * Makes labels by labelInterval option.
			 * @param {Array.<string>} labels - labels
			 * @param {number} labelInterval - label interval option
			 * @param {number} [addedDataCount] - added data count
			 * @returns {Array.<string>} labels
			 * @private
			 */
			_makeLabelsByIntervalOption:function( labels, labelInterval, addedDataCount ){
				addedDataCount=addedDataCount || 0;
				labels=tui.util.map(labels, function( label, index ){
					if( ((index+addedDataCount)%labelInterval)!==0 ){
						label=chartConst.EMPTY_AXIS_LABEL;
					}
					return label;
				});
				return labels;
			},
			/**
			 * Make axis data for label type.
			 * @memberOf module:axisDataMaker
			 * @param {object} params - parameters
			 *      @param {Array.<string>} params.labels - chart labels
			 *      @param {boolean} params.isVertical - whether vertical or not
			 *      @param {boolean} params.aligned - whether align or not
			 *      @param {?boolean} params.addedDataCount - added data count
			 * @returns {{
	     *      labels: Array.<string>,
	     *      tickCount: number,
	     *      validTickCount: number,
	     *      isLabelAxis: boolean,
	     *      options: object,
	     *      isVertical: boolean,
	     *      isPositionRight: boolean,
	     *      aligned: boolean
	     * }}
			 */
			makeLabelAxisData:function( params ){
				var tickCount=params.labels.length;
				var options=params.options || {};
				var labels=params.labels;
				if( predicate.isValidLabelInterval(options.labelInterval, options.tickInterval)
					&& params.labels.length > options.labelInterval ){
					labels=this._makeLabelsByIntervalOption(params.labels, options.labelInterval, params.addedDataCount);
				}
				if( predicate.isDatetimeType(options.type) ){
					labels=renderUtil.formatDates(labels, options.dateFormat);
				}
				if( !params.aligned ){
					tickCount+=1;
				}
				return {
					labels:labels,
					tickCount:tickCount,
					validTickCount:0,
					isLabelAxis:true,
					options:options,
					isVertical:!!params.isVertical,
					isPositionRight:!!params.isPositionRight,
					aligned:!!params.aligned
				};
			},
			/**
			 * Make data for value type axis.
			 * @memberOf module:axisDataMaker
			 * @param {object} params parameters
			 *      @param {AxisScaleMaker} params.axisScaleMaker chart values
			 *      @param {boolean} params.isVertical whether vertical or not
			 * @returns {{
	     *      labels: Array.<string>,
	     *      tickCount: number,
	     *      validTickCount: number,
	     *      isLabelAxis: boolean,
	     *      limit: {min: number, max: number},
	     *      isVertical: boolean
	     * }} axis data
			 */
			makeValueAxisData:function( params ){
				var labels=params.labels;
				var tickCount=params.tickCount;
				var limit=params.limit;
				var axisData={
					labels:labels,
					tickCount:tickCount,
					validTickCount:tickCount,
					limit:limit,
					dataMin:limit.min,
					distance:limit.max-limit.min,
					step:params.step,
					options:params.options,
					isVertical:!!params.isVertical,
					isPositionRight:!!params.isPositionRight,
					aligned:!!params.aligned
				};
				return axisData;
			},
			/**
			 * Make additional data for coordinate line type chart.
			 * @param {Array.<string>} labels - labels
			 * @param {Array.<number>} values - values
			 * @param {{min: number, max: number}} limit - limit
			 * @param {number} step - step
			 * @param {number} tickCount = tickCount
			 * @returns {{
	     *      labels: Array.<string>,
	     *      tickCount: number,
	     *      validTickCount: number,
	     *      limit: {min: number, max: number},
	     *      positionRatio: number,
	     *      sizeRatio: number
	     * }}
			 */
			makeAdditionalDataForCoordinateLineType:function( labels, values, limit, step, tickCount ){
				var sizeRatio=1;
				var positionRatio=0;
				var min=arrayUtil.min(values);
				var max=arrayUtil.max(values);
				var distance;
				distance=max-min;
				if( limit.min < min ){
					limit.min+=step;
					positionRatio=(limit.min-min)/distance;
					sizeRatio-=positionRatio;
					tickCount-=1;
					labels.shift();
				}
				if( limit.max > max ){
					limit.max-=step;
					sizeRatio-=(max-limit.max)/distance;
					tickCount-=1;
					labels.pop();
				}
				return {
					labels:labels,
					tickCount:tickCount,
					validTickCount:tickCount,
					limit:limit,
					dataMin:min,
					distance:distance,
					positionRatio:positionRatio,
					sizeRatio:sizeRatio
				};
			},
			/**
			 * Make adjusting tick interval information.
			 * @param {number} beforeBlockCount - before block count
			 * @param {number} seriesWidth - width of series area
			 * @param {number} blockSize - block size
			 * @returns {null | {blockCount: number, beforeRemainBlockCount: number, interval: number}}
			 * @private
			 */
			_makeAdjustingIntervalInfo:function( beforeBlockCount, seriesWidth, blockSize ){
				var newBlockCount=parseInt(seriesWidth/blockSize, 10);
				// interval : 하나의 새로운 block(tick과 tick 사이의 공간) 영역에 포함되는 이전 block 수
				var interval=parseInt(beforeBlockCount/newBlockCount, 10);
				var intervalInfo=null;
				var remainCount;
				if( interval > 1 ){
					// remainCount : 이전 block들 중 새로운 block으로 채우고 남은 이전 block 수
					// | | | | | | | | | | | |  - 이전 block
					// |     |     |     |      - 새로 계산된 block
					//                   |*|*|  - 남은 이전 block 수
					remainCount=beforeBlockCount-(interval*newBlockCount);
					if( remainCount >= interval ){
						newBlockCount+=parseInt(remainCount/interval, 0);
						remainCount=remainCount%interval;
					}
					intervalInfo={
						blockCount:newBlockCount,
						beforeRemainBlockCount:remainCount,
						interval:interval
					};
				}
				return intervalInfo;
			},
			/**
			 * Make candidate for adjusting tick interval.
			 * @param {number} beforeBlockCount - before block count
			 * @param {number} seriesWidth - width of series area
			 * @returns {Array.<{newBlockCount: number, remainBlockCount: number, interval: number}>}
			 * @private
			 */
			_makeCandidatesForAdjustingInterval:function( beforeBlockCount, seriesWidth ){
				var self=this;
				var blockSizeRange=tui.util.range(90, 121, 5); // [90, 95, 100, 105, 110, 115, 120]
				var candidates=tui.util.map(blockSizeRange, function( blockSize ){
					return self._makeAdjustingIntervalInfo(beforeBlockCount, seriesWidth, blockSize);
				});
				return tui.util.filter(candidates, function( info ){
					return !!info;
				});
			},
			/**
			 * Calculate adjusting interval information for auto tick interval option.
			 * @param {number} curBlockCount - current block count
			 * @param {number} seriesWidth - series width
			 * @returns {{newBlockCount: number, remainBlockCount: number, interval: number}}
			 * @private
			 */
			_calculateAdjustingIntervalInfo:function( curBlockCount, seriesWidth ){
				var candidates=this._makeCandidatesForAdjustingInterval(curBlockCount, seriesWidth);
				var intervalInfo=null;
				if( candidates.length ){
					intervalInfo=arrayUtil.min(candidates, function( candidate ){
						return candidate.blockCount;
					});
				}
				return intervalInfo;
			},
			/**
			 * Make filtered labels by interval.
			 * @param {Array.<string>} labels - labels
			 * @param {number} startIndex - start index
			 * @param {number} interval - interval
			 * @returns {Array.<string>}
			 * @private
			 */
			_makeFilteredLabelsByInterval:function( labels, startIndex, interval ){
				return tui.util.filter(labels.slice(startIndex), function( label, index ){
					return index%interval===0;
				});
			},
			/**
			 * Update label type axisData for auto tick interval option.
			 * @param {object} axisData - axisData
			 * @param {number} seriesWidth - series width
			 * @param {?number} addedDataCount - added data count
			 * @param {?boolean} addingDataMode - whether adding data mode or not
			 */
			updateLabelAxisDataForAutoTickInterval:function( axisData, seriesWidth, addedDataCount, addingDataMode ){
				var beforeBlockCount, intervalInfo;
				var adjustingBlockCount, interval, beforeRemainBlockCount, startIndex;
				if( addingDataMode ){
					axisData.tickCount-=1;
					axisData.labels.pop();
				}
				beforeBlockCount=axisData.tickCount-1;
				intervalInfo=this._calculateAdjustingIntervalInfo(beforeBlockCount, seriesWidth);
				if( !intervalInfo ){
					return;
				}
				adjustingBlockCount=intervalInfo.blockCount;
				interval=intervalInfo.interval;
				beforeRemainBlockCount=intervalInfo.beforeRemainBlockCount;
				axisData.eventTickCount=axisData.tickCount;
				// startIndex는 남은 block수의 반 만큼에서 현재 이동된 tick 수를 뺀 만큼으로 설정함
				// |     |     |     |*|*|*|    - * 영역이 남은 이전 block 수
				// |*|*|O    |     |     |*|    - 현재 이동된 tick이 없을 경우 (O 지점이 startIndex = 2)
				// |*|O    |     |     |*|*|    - tick이 하나 이동 됐을 경우 : O 지점이 startIndex = 1)
				startIndex=Math.round(beforeRemainBlockCount/2)-(addedDataCount%interval);
				// startIndex가 0보다 작을 경우 interval만큼 증가시킴
				if( startIndex < 0 ){
					startIndex+=interval;
				}
				axisData.labels=this._makeFilteredLabelsByInterval(axisData.labels, startIndex, interval);
				tui.util.extend(axisData, {
					startIndex:startIndex,
					tickCount:adjustingBlockCount+1,
					positionRatio:(startIndex/beforeBlockCount),
					sizeRatio:1-(beforeRemainBlockCount/beforeBlockCount),
					interval:interval
				});
			},
			/**
			 * Update label type axisData for stacking dynamic data.
			 * @param {object} axisData - axis data
			 * @param {object} prevUpdatedData - previous updated axisData
			 * @param {number} firstTickCount - calculated first tick count
			 */
			updateLabelAxisDataForStackingDynamicData:function( axisData, prevUpdatedData, firstTickCount ){
				var interval=prevUpdatedData.interval;
				var startIndex=prevUpdatedData.startIndex;
				var beforeBlockCount=axisData.tickCount-1;
				var newBlockCount=beforeBlockCount/interval;
				var firstBlockCount=firstTickCount ? firstTickCount-1 : 0;
				var beforeRemainBlockCount;
				// 새로 계산된 block의 수가 최초로 계산된 block 수의 두배수 보다 많아지면 interval 숫자를 두배로 늘림
				if( firstBlockCount && ((firstBlockCount*2) <= newBlockCount) ){
					interval*=2;
				}
				axisData.labels=this._makeFilteredLabelsByInterval(axisData.labels, startIndex, interval);
				newBlockCount=axisData.labels.length-1;
				beforeRemainBlockCount=beforeBlockCount-(interval*newBlockCount);
				tui.util.extend(axisData, {
					startIndex:startIndex,
					eventTickCount:axisData.tickCount,
					tickCount:axisData.labels.length,
					positionRatio:startIndex/beforeBlockCount,
					sizeRatio:1-(beforeRemainBlockCount/beforeBlockCount),
					interval:interval
				});
			},
			/**
			 * Calculate width for label area for x axis.
			 * @param {boolean} isLabelAxis - whether label type axis or not
			 * @param {number} seriesWidth - series width
			 * @param {number} labelCount - label count
			 * @returns {number} limit width
			 * @private
			 */
			_calculateXAxisLabelAreaWidth:function( isLabelAxis, seriesWidth, labelCount ){
				if( !isLabelAxis ){
					labelCount-=1;
				}
				return seriesWidth/labelCount;
			},
			/**
			 * Create multiline label.
			 * @param {string} label - label
			 * @param {number} limitWidth - limit width
			 * @param {object} theme - label theme
			 * @returns {string}
			 * @private
			 */
			_createMultilineLabel:function( label, limitWidth, theme ){
				var words=String(label).split(/\s+/);
				var lineWords=words[0];
				var lines=[];
				tui.util.forEachArray(words.slice(1), function( word ){
					var width=renderUtil.getRenderedLabelWidth(lineWords+' '+word, theme);
					if( width > limitWidth ){
						lines.push(lineWords);
						lineWords=word;
					}else{
						lineWords+=' '+word;
					}
				});
				if( lineWords ){
					lines.push(lineWords);
				}
				return lines.join('<br>');
			},
			/**
			 * Create multiline labels.
			 * @param {Array.<string>} labels - labels
			 * @param {object} labelTheme - theme for label
			 * @param {number} labelAreaWidth - label area width
			 * @returns {Array}
			 * @private
			 */
			_createMultilineLabels:function( labels, labelTheme, labelAreaWidth ){
				var _createMultilineLabel=this._createMultilineLabel;
				return tui.util.map(labels, function( label ){
					return _createMultilineLabel(label, labelAreaWidth, labelTheme);
				});
			},
			/**
			 * Calculate multiline height.
			 * @param {Array.string} multilineLabels - multiline labels
			 * @param {object} labelTheme - theme for label
			 * @param {number} labelAreaWidth - width for label area
			 * @returns {number}
			 * @private
			 */
			_calculateMultilineHeight:function( multilineLabels, labelTheme, labelAreaWidth ){
				return renderUtil.getRenderedLabelsMaxHeight(multilineLabels, tui.util.extend({
					cssText:'line-height:1.2;width:'+labelAreaWidth+'px'
				}, labelTheme));
			},
			/**
			 * Calculate height difference between origin category and multiline category.
			 * @param {Array.<string>} labels - labels
			 * @param {Array.<string>} validLabelCount - valid label count
			 * @param {object} labelTheme - theme for label
			 * @param {boolean} isLabelAxis - whether label type axis or not
			 * @param {{series: {width: number}, yAxis: {width: number}}} dimensionMap - dimension map
			 * @returns {number}
			 */
			makeAdditionalDataForMultilineLabels:function( labels, validLabelCount, labelTheme, isLabelAxis, dimensionMap ){
				var seriesWidth=dimensionMap.series.width;
				var labelAreaWidth=this._calculateXAxisLabelAreaWidth(isLabelAxis, seriesWidth, validLabelCount);
				var multilineLabels=this._createMultilineLabels(labels, labelTheme, seriesWidth);
				var multilineHeight=this._calculateMultilineHeight(multilineLabels, labelTheme, labelAreaWidth);
				var labelHeight=renderUtil.getRenderedLabelsMaxHeight(labels, labelTheme);
				return {
					multilineLabels:multilineLabels,
					overflowHeight:multilineHeight-labelHeight,
					overflowLeft:(labelAreaWidth/2)-dimensionMap.yAxis.width
				};
			},
			/**
			 * Find rotation degree.
			 * @param {number} labelAreaWidth - limit width
			 * @param {number} labelWidth - label width
			 * @param {number} labelHeight - label height
			 * @returns {number}
			 * @private
			 */
			_findRotationDegree:function( labelAreaWidth, labelWidth, labelHeight ){
				var foundDegree=null;
				tui.util.forEachArray(chartConst.DEGREE_CANDIDATES, function( degree ){
					var compareWidth=calculator.calculateRotatedWidth(degree, labelWidth, labelHeight);
					foundDegree=degree;
					if( compareWidth <= labelAreaWidth+chartConst.XAXIS_LABEL_COMPARE_MARGIN ){
						return false;
					}
					return true;
				});
				return foundDegree;
			},
			/**
			 * Calculate rotated width.
			 * @param {number} degree - degree for label of x axis
			 * @param {string} firstLabel - first label
			 * @param {number} labelHeight - labelHeight
			 * @param {object} labelTheme - theme for label
			 * @returns {number}
			 * @private
			 */
			_calculateRotatedWidth:function( degree, firstLabel, labelHeight, labelTheme ){
				var firstLabelWidth=renderUtil.getRenderedLabelWidth(firstLabel, labelTheme);
				var newLabelWidth=calculator.calculateRotatedWidth(degree, firstLabelWidth, labelHeight);
				// overflow 체크시에는 우측 상단 꼭지 기준으로 계산해야 함
				newLabelWidth-=calculator.calculateAdjacent(chartConst.ANGLE_90-degree, labelHeight/2);
				return newLabelWidth;
			},
			/**
			 * Calculate limit width for label
			 * @param {number} yAxisWidth - y axis width
			 * @param {boolean} isLabelAxis - aligned tick and label
			 * @param {number} labelAreaWidth - width for label area
			 * @returns {number}
			 * @private
			 */
			_calculateLimitWidth:function( yAxisWidth, isLabelAxis, labelAreaWidth ){
				var limitWidth=yAxisWidth;
				if( isLabelAxis ){
					limitWidth+=(labelAreaWidth/2);
				}
				return limitWidth;
			},
			/**
			 * Make additional data for rotated labels.
			 * @param {Array.<string>} validLabels - valid labels
			 * @param {Array.<string>} validLabelCount - valid label count
			 * @param {object} labelTheme - theme for label
			 * @param {boolean} isLabelAxis - whether label type axis or not
			 * @param {{series: {width: number}, yAxis: {width: number}}} dimensionMap - dimension map
			 * @returns {{degree: number, overflowHeight: number, overflowLeft: number}}
			 */
			makeAdditionalDataForRotatedLabels:function( validLabels, validLabelCount, labelTheme, isLabelAxis, dimensionMap ){
				var maxLabelWidth=renderUtil.getRenderedLabelsMaxWidth(validLabels, labelTheme);
				var seriesWidth=dimensionMap.series.width;
				var labelAreaWidth=this._calculateXAxisLabelAreaWidth(isLabelAxis, seriesWidth, validLabelCount);
				var additionalData=null;
				var degree, labelHeight, rotatedHeight, limitWidth, rotatedWidth;
				if( labelAreaWidth < maxLabelWidth ){
					labelHeight=renderUtil.getRenderedLabelsMaxHeight(validLabels, labelTheme);
					degree=this._findRotationDegree(labelAreaWidth, maxLabelWidth, labelHeight);
					rotatedHeight=calculator.calculateRotatedHeight(degree, maxLabelWidth, labelHeight);
					rotatedWidth=this._calculateRotatedWidth(degree, validLabels[0], labelHeight, labelTheme);
					limitWidth=this._calculateLimitWidth(dimensionMap.yAxis.width, isLabelAxis, labelAreaWidth);
					additionalData={
						degree:degree,
						overflowHeight:rotatedHeight-labelHeight,
						overflowLeft:rotatedWidth-limitWidth
					};
				}else{
					labelAreaWidth=renderUtil.getRenderedLabelWidth(validLabels[0], labelTheme)/2;
					additionalData={
						overflowLeft:labelAreaWidth-dimensionMap.yAxis.width
					};
				}
				return additionalData;
			}
		};
		module.exports=axisDataMaker;
		/***/
	},
	/* 94 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview axisTypeMixer is mixer for help to axis types charts like bar, column, line, area,
		 *                  bubble, column&line combo.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var predicate=__webpack_require__(5);
		/**
		 * Axis limit value.
		 * @typedef {{min: number, max: number}} axisLimit
		 */
		/**
		 * axisTypeMixer is mixer for help to axis types charts like bar, column, line, area, bubble, column&line combo.
		 * @mixin
		 * @private */
		var axisTypeMixer={
			/**
			 * Add axis components.
			 * @param {Array.<object>} axes axes option
			 * @param {boolean} aligned whether aligned or not
			 * @private
			 */
			_addAxisComponents:function( axes, aligned ){
				var self=this;
				tui.util.forEach(axes, function( axis ){
					var axisParams={
						aligned:aligned,
						isVertical:!!axis.isVertical,
						seriesName:axis.seriesName || self.chartType,
						classType:'axis'
					};
					if( axis.name==='rightYAxis' ){
						axisParams.componentType='yAxis';
						axisParams.index=1;
					}
					self.componentManager.register(axis.name, axisParams);
				});
			},
			/**
			 * Add series components
			 * @param {Array<object>} seriesSet - series set
			 * @param {object} options - options
			 * @private
			 */
			_addSeriesComponents:function( seriesSet, options ){
				var self=this,
					seriesBaseParams={
						libType:options.libType,
						chartType:options.chartType,
						componentType:'series',
						chartBackground:this.theme.chart.background
					};
				tui.util.forEach(seriesSet, function( series ){
					var seriesParams=tui.util.extend(seriesBaseParams, series.data);
					seriesParams.classType=series.name;
					self.componentManager.register(series.name, seriesParams);
				});
			},
			/**
			 * Add tooltip component.
			 * @private
			 */
			_addTooltipComponent:function(){
				var classType=this.options.tooltip.grouped ? 'groupTooltip' : 'tooltip';
				this.componentManager.register('tooltip', this._makeTooltipData(classType));
			},
			/**
			 * Add legend component.
			 * @param {{LegendClass: ?function, additionalParams: ?object}} legendData - data for register legend
			 * @private
			 */
			_addLegendComponent:function( legendData ){
				var classType=legendData.classType || 'legend';
				this.componentManager.register('legend', tui.util.extend({
					seriesNames:this.seriesNames,
					chartType:this.chartType,
					classType:classType
				}, legendData.additionalParams));
			},
			/**
			 * Add plot component.
			 * @param {?string} xAxisTypeOption - xAxis type option like 'datetime'
			 * @private
			 */
			_addPlotComponent:function( xAxisTypeOption ){
				this.componentManager.register('plot', {
					chartType:this.chartType,
					chartTypes:this.chartTypes,
					xAxisTypeOption:xAxisTypeOption,
					classType:'plot'
				});
			},
			/**
			 * Add chartExportMenu component.
			 * @private
			 */
			_addChartExportMenuComponent:function(){
				var chartOption=this.options.chart;
				var chartTitle=chartOption && chartOption.title ? chartOption.title.text : 'chart';
				this.componentManager.register('chartExportMenu', {
					chartTitle:chartTitle,
					classType:'chartExportMenu'
				});
			},
			/**
			 * Add components for axis type chart.
			 * @param {object} params parameters
			 *      @param {object} params.axes axes data
			 *      @param {object} params.plotData plot data
			 *      @param {function} params.serieses serieses
			 * @private
			 */
			_addComponentsForAxisType:function( params ){
				var options=this.options;
				var aligned=!!params.aligned;
				if( params.plot ){
					this._addPlotComponent(options.xAxis.type);
				}
				this._addAxisComponents(params.axis, aligned);
				if( options.legend.visible ){
					this._addLegendComponent(params.legend || {});
				}
				if( options.chartExportMenu.visible ){
					this._addChartExportMenuComponent(options.chartExportMenu);
				}
				this._addSeriesComponents(params.series, options);
				this._addTooltipComponent();
				this._addMouseEventDetectorComponent();
			},
			/**
			 * Add data ratios.
			 * @private
			 * @override
			 */
			_addDataRatios:function( limitMap ){
				var self=this;
				var chartTypes=this.chartTypes || [this.chartType];
				var seriesOption=this.options.series || {};
				var addDataRatio;
				if( this.dataProcessor.isCoordinateType() ){
					addDataRatio=function( chartType ){
						var hasRadius=predicate.isBubbleChart(chartType);
						self.dataProcessor.addDataRatiosForCoordinateType(chartType, limitMap, hasRadius);
					};
				}else{
					addDataRatio=function( chartType ){
						var stackType=(seriesOption[chartType] || seriesOption).stackType;
						self.dataProcessor.addDataRatios(limitMap[chartType], stackType, chartType);
					};
				}
				tui.util.forEachArray(chartTypes, addDataRatio);
			},
			/**
			 * Add simple mouseEventDetector component.
			 * @private
			 */
			_addSimpleEventDetectorComponent:function(){
				this.componentManager.register('mouseEventDetector', {
					chartType:this.chartType,
					classType:'simpleEventDetector'
				});
			},
			/**
			 * Add mouseEventDetector components for group tooltip.
			 * @private
			 * @override
			 */
			_addMouseEventDetectorComponentForGroupTooltip:function(){
				var seriesOptions=this.options.series;
				this.componentManager.register('mouseEventDetector', {
					chartType:this.chartType,
					isVertical:this.isVertical,
					chartTypes:this.chartTypes,
					zoomable:seriesOptions.zoomable,
					allowSelect:seriesOptions.allowSelect,
					classType:'groupTypeEventDetector'
				});
			},
			/**
			 * Add mouse event detector component for normal(single) tooltip.
			 * @private
			 */
			_addMouseEventDetectorComponentForNormalTooltip:function(){
				this.componentManager.register('mouseEventDetector', {
					chartType:this.chartType,
					isVertical:this.isVertical,
					allowSelect:this.options.series.allowSelect,
					classType:'boundsTypeEventDetector'
				});
			},
			/**
			 * Add mouse event detector component.
			 * @private
			 */
			_addMouseEventDetectorComponent:function(){
				if( predicate.isCoordinateTypeChart(this.chartType) ){
					this._addSimpleEventDetectorComponent();
				}else if( this.options.tooltip.grouped ){
					this._addMouseEventDetectorComponentForGroupTooltip();
				}else{
					this._addMouseEventDetectorComponentForNormalTooltip();
				}
			}
		};
		module.exports=axisTypeMixer;
		/***/
	},
	/* 95 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Column chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var chartConst=__webpack_require__(2);
		var axisTypeMixer=__webpack_require__(94);
		var rawDataHandler=__webpack_require__(4);
		var ColumnChart=tui.util.defineClass(ChartBase, /** @lends ColumnChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-column-chart',
			/**
			 * Column chart.
			 * @constructs ColumnChart
			 * @extends ChartBase
			 * @mixes axisTypeMixer
			 * @mixes verticalTypeMixer
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				rawDataHandler.updateRawSeriesDataByOptions(rawData, options.series);
				this._updateOptionsRelatedDiverging(options);
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true,
					isVertical:true
				});
			},
			/**
			 * Update options related diverging option.
			 * @param {object} options - options
			 * @private
			 */
			_updateOptionsRelatedDiverging:function( options ){
				options.series=options.series || {};
				if( options.series.diverging ){
					options.series.stackType=options.series.stackType || chartConst.NORMAL_STACK_TYPE;
				}
			},
			/**
			 * Add components
			 * @private
			 */
			_addComponents:function(){
				this._addComponentsForAxisType({
					axis:[
						{
							name:'yAxis',
							isVertical:true
						},
						{
							name:'xAxis'
						}
					],
					series:[
						{
							name:'columnSeries',
							data:{
								allowNegativeTooltip:true
							}
						}
					],
					plot:true
				});
			},
			/**
			 * Get scale option.
			 * @returns {{yAxis: boolean}}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				return {
					yAxis:true
				};
			}
		});
		tui.util.extend(ColumnChart.prototype, axisTypeMixer);
		module.exports=ColumnChart;
		/***/
	},
	/* 96 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Line chart
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var lineTypeMixer=__webpack_require__(97);
		var zoomMixer=__webpack_require__(98);
		var axisTypeMixer=__webpack_require__(94);
		var addingDynamicDataMixer=__webpack_require__(99);
		var Series=__webpack_require__(61);
		var LineChart=tui.util.defineClass(ChartBase, /** @lends LineChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-line-chart',
			/**
			 * Series class
			 * @type {function}
			 */
			Series:Series,
			/**
			 * Line chart.
			 * @param {Array.<Array>} rawData - raw data
			 * @param {object} theme - chart theme
			 * @param {object} options - chart options
			 * @constructs LineChart
			 * @extends ChartBase
			 * @mixes axisTypeMixer
			 * @mixes lineTypeMixer
			 */
			init:function( rawData, theme, options ){
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true,
					isVertical:true
				});
				this._initForAddingData();
			},
			/**
			 * On change checked legend.
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 * @param {?object} rawData rawData
			 * @param {?object} boundsParams addition params for calculating bounds
			 * @override
			 */
			onChangeCheckedLegends:function( checkedLegends, rawData, boundsParams ){
				this._initForAddingData();
				this._changeCheckedLegends(checkedLegends, rawData, boundsParams);
			}
		});
		tui.util.extend(LineChart.prototype,
			axisTypeMixer, lineTypeMixer, zoomMixer, addingDynamicDataMixer);
		module.exports=LineChart;
		/***/
	},
	/* 97 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview lineTypeMixer is mixer of line type chart(line, area).
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/**
		 * lineTypeMixer is mixer of line type chart(line, area).
		 * @mixin
		 * @private */
		var lineTypeMixer={
			/**
			 * Get scale option.
			 * @returns {{xAxis: ?{valueType:string}, yAxis: ?(boolean|{valueType:string})}}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				var scaleOption={};
				if( this.dataProcessor.isCoordinateType() ){
					scaleOption.xAxis={
						valueType:'x'
					};
					scaleOption.yAxis={
						valueType:'y'
					};
				}else{
					scaleOption.yAxis=true;
				}
				return scaleOption;
			},
			/**
			 * Add mouse event detector component for normal tooltip.
			 * @private
			 */
			_addMouseEventDetectorComponentForNormalTooltip:function(){
				var seriesOptions=this.options.series;
				this.componentManager.register('mouseEventDetector', {
					chartType:this.chartType,
					isVertical:this.isVertical,
					zoomable:seriesOptions.zoomable,
					allowSelect:seriesOptions.allowSelect,
					classType:'areaTypeEventDetector'
				});
			},
			/**
			 * Add components
			 * @param {string} chartType chart type
			 * @private
			 */
			_addComponents:function(){
				if( this.dataProcessor.isCoordinateType() ){
					delete this.options.xAxis.tickInterval;
					this.options.tooltip.grouped=false;
					this.options.series.shifting=false;
				}
				this._addComponentsForAxisType({
					axis:[
						{
							name:'yAxis',
							seriesName:this.chartType,
							isVertical:true
						},
						{
							name:'xAxis'
						}
					],
					series:[
						{
							name:this.chartType+'Series'
						}
					],
					plot:true
				});
			},
			/**
			 * Add plot line.
			 * @param {{index: number, color: string, id: string}} data - data
			 * @override
			 * @api
			 */
			addPlotLine:function( data ){
				this.componentManager.get('plot').addPlotLine(data);
			},
			/**
			 * Add plot band.
			 * @param {{range: Array.<number>, color: string, id: string}} data - data
			 * @override
			 * @api
			 */
			addPlotBand:function( data ){
				this.componentManager.get('plot').addPlotBand(data);
			},
			/**
			 * Remove plot line.
			 * @param {string} id - line id
			 * @override
			 * @api
			 */
			removePlotLine:function( id ){
				this.componentManager.get('plot').removePlotLine(id);
			},
			/**
			 * Remove plot band.
			 * @param {string} id - band id
			 * @override
			 * @api
			 */
			removePlotBand:function( id ){
				this.componentManager.get('plot').removePlotBand(id);
			}
		};
		module.exports=lineTypeMixer;
		/***/
	},
	/* 98 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview zoomMixer is mixer of line type chart(line, area).
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var rawDataHandler=__webpack_require__(4);
		/**
		 * zoomMixer is mixer of line type chart(line, area).
		 * @mixin
		 * @private */
		var zoomMixer={
			/**
			 * Render for zoom.
			 * @param {boolean} isResetZoom - whether reset zoom or not
			 * @private
			 */
			_renderForZoom:function( isResetZoom ){
				var self=this;
				this._render(function( boundsAndScale ){
					self.componentManager.render('zoom', boundsAndScale, {
						isResetZoom:isResetZoom
					});
				});
			},
			/**
			 * On zoom.
			 * @param {Array.<number>} indexRange - index range for zoom
			 * @override
			 */
			onZoom:function( indexRange ){
				this._pauseAnimationForAddingData();
				this.dataProcessor.updateRawDataForZoom(indexRange);
				this._renderForZoom(false);
			},
			/**
			 * On reset zoom.
			 * @override
			 */
			onResetZoom:function(){
				var rawData=this.dataProcessor.getOriginalRawData();
				if( this.checkedLegends ){
					rawData=rawDataHandler.filterCheckedRawData(rawData, this.checkedLegends);
				}
				this.dataProcessor.initData(rawData);
				this.dataProcessor.initZoomedRawData();
				this.dataProcessor.addDataFromRemainDynamicData(tui.util.pick(this.options.series, 'shifting'));
				this._renderForZoom(true);
				this._restartAnimationForAddingData();
			}
		};
		module.exports=zoomMixer;
		/***/
	},
	/* 99 */
	/***/ function( module, exports, __webpack_require__ ){
		'use strict';
		var chartConst=__webpack_require__(2);
		var predicate=__webpack_require__(5);
		/**
		 * addingDynamicData is mixer for adding dynamic data.
		 * @mixin
		 * @private
		 */
		var addingDynamicDataMixer={
			/**
			 * Initialize for adding data.
			 * @private
			 */
			_initForAddingData:function(){
				/**
				 * whether lookupping or not
				 * @type {boolean}
				 */
				this.lookupping=false;
				/**
				 * whether paused or not
				 * @type {boolean}
				 */
				this.paused=false;
				/**
				 * rendering delay timer id
				 * @type {null}
				 */
				this.rerenderingDelayTimerId=null;
				/**
				 * added data count
				 * @type {number}
				 */
				this.addedDataCount=0;
				/**
				 * checked legends.
				 * @type {null | Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}}
				 */
				this.checkedLegends=null;
				/**
				 * previous xAxis data
				 * @type {null|object}
				 */
				this.prevXAxisData=null;
			},
			/**
			 * Calculate animate tick size.
			 * @param {number} xAxisWidth - x axis width
			 * @returns {number}
			 * @private
			 */
			_calculateAnimateTickSize:function( xAxisWidth ){
				var dataProcessor=this.dataProcessor;
				var tickInterval=this.options.xAxis.tickInterval;
				var shiftingOption=!!this.options.series.shifting;
				var tickCount;
				if( dataProcessor.isCoordinateType() ){
					tickCount=dataProcessor.getValues(this.chartType, 'x').length-1;
				}else{
					tickCount=dataProcessor.getCategoryCount(false)-1;
				}
				if( shiftingOption && !predicate.isAutoTickInterval(tickInterval) ){
					tickCount-=1;
				}
				return xAxisWidth/tickCount;
			},
			/**
			 * Animate for adding data.
			 * @private
			 */
			_animateForAddingData:function(){
				var self=this;
				var shiftingOption=!!this.options.series.shifting;
				this.addedDataCount+=1;
				this._render(function( boundsAndScale ){
					var tickSize=self._calculateAnimateTickSize(boundsAndScale.dimensionMap.xAxis.width);
					self.componentManager.render('animateForAddingData', boundsAndScale, {
						tickSize:tickSize,
						shifting:shiftingOption
					});
				}, true);
				if( shiftingOption ){
					this.dataProcessor.shiftData();
				}
			},
			/**
			 * Rerender for adding data.
			 * @private
			 */
			_rerenderForAddingData:function(){
				var self=this;
				this._render(function( boundsAndScale ){
					self.componentManager.render('rerender', boundsAndScale);
				});
			},
			/**
			 * Check for added data.
			 * @private
			 */
			_checkForAddedData:function(){
				var self=this;
				var added=this.dataProcessor.addDataFromDynamicData();
				if( !added ){
					this.lookupping=false;
					return;
				}
				if( this.paused ){
					if( this.options.series.shifting ){
						this.dataProcessor.shiftData();
					}
					return;
				}
				this._animateForAddingData();
				this.rerenderingDelayTimerId=setTimeout(function(){
					self.rerenderingDelayTimerId=null;
					self._rerenderForAddingData();
					self._checkForAddedData();
				}, 400);
			},
			/**
			 * Pause animation for adding data.
			 * @private
			 */
			_pauseAnimationForAddingData:function(){
				this.paused=true;
				if( this.rerenderingDelayTimerId ){
					clearTimeout(this.rerenderingDelayTimerId);
					this.rerenderingDelayTimerId=null;
					if( this.options.series.shifting ){
						this.dataProcessor.shiftData();
					}
				}
			},
			/**
			 * Restart animation for adding data.
			 * @private
			 */
			_restartAnimationForAddingData:function(){
				this.paused=false;
				this.lookupping=false;
				this._startLookup();
			},
			/**
			 * Start lookup for checking added data.
			 * @private
			 */
			_startLookup:function(){
				if( this.lookupping ){
					return;
				}
				this.lookupping=true;
				this._checkForAddedData();
			},
			/**
			 * Add data.
			 * @param {string} category - category
			 * @param {Array} values - values
			 */
			addData:function( category, values ){
				if( !values ){
					values=category;
					category=null;
				}
				this.dataProcessor.addDynamicData(category, values);
				this._startLookup();
			},
			/**
			 * Change checked legend.
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 * @param {?object} rawData rawData
			 * @param {?object} boundsParams addition params for calculating bounds
			 * @override
			 */
			_changeCheckedLegends:function( checkedLegends, rawData, boundsParams ){
				var self=this;
				var shiftingOption=!!this.options.series.shifting;
				var pastPaused=this.paused;
				if( !pastPaused ){
					this._pauseAnimationForAddingData();
				}
				this.checkedLegends=checkedLegends;
				this._rerender(checkedLegends, rawData, boundsParams);
				if( !pastPaused ){
					setTimeout(function(){
						self.dataProcessor.addDataFromRemainDynamicData(shiftingOption);
						self._restartAnimationForAddingData();
					}, chartConst.RERENDER_TIME);
				}
			}
		};
		module.exports=addingDynamicDataMixer;
		/***/
	},
	/* 100 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Area chart
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var lineTypeMixer=__webpack_require__(97);
		var zoomMixer=__webpack_require__(98);
		var axisTypeMixer=__webpack_require__(94);
		var addingDynamicDataMixer=__webpack_require__(99);
		var rawDataHandler=__webpack_require__(4);
		var Series=__webpack_require__(64);
		var AreaChart=tui.util.defineClass(ChartBase, /** @lends AreaChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-area-chart',
			/**
			 * Series class
			 * @type {function}
			 */
			Series:Series,
			/**
			 * Area chart.
			 * @constructs AreaChart
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData - raw data
			 * @param {object} theme - chart theme
			 * @param {object} options - chart options
			 * @mixes axisTypeMixer
			 * @mixes lineTypeMixer
			 */
			init:function( rawData, theme, options ){
				rawDataHandler.removeSeriesStack(rawData.series);
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true,
					isVertical:true
				});
				this._initForAddingData();
			},
			/**
			 * On change checked legend.
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 * @param {?object} rawData rawData
			 * @param {?object} boundsParams addition params for calculating bounds
			 * @override
			 */
			onChangeCheckedLegends:function( checkedLegends, rawData, boundsParams ){
				this._initForAddingData();
				this._changeCheckedLegends(checkedLegends, rawData, boundsParams);
			}
		});
		tui.util.extend(AreaChart.prototype,
			axisTypeMixer, lineTypeMixer, zoomMixer, addingDynamicDataMixer);
		module.exports=AreaChart;
		/***/
	},
	/* 101 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Column and Line Combo chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var rawDataHandler=__webpack_require__(4);
		var axisTypeMixer=__webpack_require__(94);
		var comboTypeMixer=__webpack_require__(102);
		var verticalTypeComboMixer=__webpack_require__(103);
		var ColumnLineComboChart=tui.util.defineClass(ChartBase, /** @lends ColumnLineComboChart.prototype */ {
			/**
			 * Column and Line Combo chart.
			 * @constructs ColumnLineComboChart
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				this._initForVerticalTypeCombo(rawData, options);
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true,
					isVertical:true
				});
			},
			/**
			 * On change selected legend.
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 */
			onChangeCheckedLegends:function( checkedLegends ){
				var originalRawData=this.dataProcessor.getOriginalRawData();
				var rawData=rawDataHandler.filterCheckedRawData(originalRawData, checkedLegends);
				var chartTypesMap=this._makeChartTypesMap(rawData.series, this.options.yAxis);
				tui.util.extend(this, chartTypesMap);
				this._rerender(checkedLegends, rawData, chartTypesMap);
			}
		});
		tui.util.extend(ColumnLineComboChart.prototype, axisTypeMixer, comboTypeMixer, verticalTypeComboMixer);
		module.exports=ColumnLineComboChart;
		/***/
	},
	/* 102 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview comboTypeMixer is mixer of combo type chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/**
		 * comboTypeMixer is mixer of combo type chart.
		 * @mixin
		 * @private */
		var comboTypeMixer={
			/**
			 * Get base series options.
			 * @param {object.<string, object>} seriesOptions - series options
			 * @param {Array.<string>} seriesNames - seriens names
			 * @returns {object}
			 * @private
			 */
			_getBaseSeriesOptions:function( seriesOptions, seriesNames ){
				var baseSeriesOptions=tui.util.extend({}, seriesOptions);
				tui.util.forEachArray(seriesNames, function( seriesName ){
					delete baseSeriesOptions[seriesName];
				});
				return baseSeriesOptions;
			},
			/**
			 * Make options map
			 * @param {Array.<string>} seriesNames - series names
			 * @returns {object}
			 * @private
			 */
			_makeOptionsMap:function( seriesNames ){
				var seriesOptions=this.options.series;
				var baseSeriesOptions=this._getBaseSeriesOptions(seriesOptions, seriesNames);
				var optionsMap={};
				tui.util.forEachArray(seriesNames, function( chartType ){
					optionsMap[chartType]=tui.util.extend({}, baseSeriesOptions, seriesOptions[chartType]);
				});
				return optionsMap;
			}
		};
		module.exports=comboTypeMixer;
		/***/
	},
	/* 103 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Column and Line Combo chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var predicate=__webpack_require__(5);
		var calculator=__webpack_require__(22);
		var renderUtil=__webpack_require__(23);
		var verticalTypeComboMixer={
			/**
			 * Column and Line Combo chart.
			 * @constructs verticalTypeComboMixer
			 * @private
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} options chart options
			 */
			_initForVerticalTypeCombo:function( rawData, options ){
				var chartTypesMap=this._makeChartTypesMap(rawData.series, options.yAxis, options.chartType);
				options.tooltip=options.tooltip || {};
				options.tooltip.grouped=true;
				/**
				 * chart types map
				 * @type {Object}
				 */
				this.chartTypes=chartTypesMap.chartTypes;
				/**
				 * series names
				 * @type {Object|Array.<T>}
				 */
				this.seriesNames=chartTypesMap.seriesNames;
				/**
				 * whether has right y axis or not
				 * @type {boolean}
				 */
				this.hasRightYAxis=tui.util.isArray(options.yAxis) && options.yAxis.length > 1;
				/**
				 * yAxis options map
				 * @type {object}
				 */
				this.yAxisOptionsMap=this._makeYAxisOptionsMap(chartTypesMap.chartTypes, options.yAxis);
			},
			/**
			 * Make chart types map.
			 * @param {object} rawSeriesData raw series data
			 * @param {object} yAxisOption option for y axis
			 * @returns {object} chart types map
			 * @private
			 */
			_makeChartTypesMap:function( rawSeriesData, yAxisOption ){
				var seriesNames=tui.util.keys(rawSeriesData).sort();
				var optionChartTypes=this._getYAxisOptionChartTypes(seriesNames, yAxisOption);
				var chartTypes=optionChartTypes.length ? optionChartTypes : seriesNames;
				var validChartTypes=tui.util.filter(optionChartTypes, function( _chartType ){
					return rawSeriesData[_chartType].length;
				});
				var chartTypesMap;
				if( validChartTypes.length===1 ){
					chartTypesMap={
						chartTypes:validChartTypes,
						seriesNames:validChartTypes
					};
				}else{
					chartTypesMap={
						chartTypes:chartTypes,
						seriesNames:seriesNames
					};
				}
				return chartTypesMap;
			},
			/**
			 * Make yAxis options map.
			 * @param {Array.<string>} chartTypes chart types
			 * @param {?object} yAxisOptions yAxis options
			 * @returns {{column: ?object, line: ?object}} options map
			 * @private
			 */
			_makeYAxisOptionsMap:function( chartTypes, yAxisOptions ){
				var optionsMap={};
				yAxisOptions=yAxisOptions || {};
				tui.util.forEachArray(chartTypes, function( chartType, index ){
					optionsMap[chartType]=yAxisOptions[index] || yAxisOptions;
				});
				return optionsMap;
			},
			/**
			 * Set additional parameter for making y axis scale option.
			 * @param {{isSingleYAxis: boolean}} additionalOptions - additional options
			 * @private
			 */
			setAdditionalOptions:function( additionalOptions ){
				var dataProcessor=this.dataProcessor;
				tui.util.forEach(this.options.series, function( seriesOption, seriesName ){
					var chartType;
					if( !seriesOption.stackType ){
						return;
					}
					chartType=dataProcessor.findChartType(seriesName);
					if( !predicate.isAllowedStackOption(chartType) ){
						return;
					}
					additionalOptions.chartType=chartType;
					additionalOptions.stackType=seriesOption.stackType;
				});
			},
			/**
			 * Make y axis scale option.
			 * @param {string} name - component name
			 * @param {string} chartType - chart type
			 * @param {boolean} isSingleYAxis - whether single y axis or not
			 * @returns {{options: object, areaType: string, chartType: string, additionalParams: object}}
			 * @private
			 */
			_makeYAxisScaleOption:function( name, chartType, isSingleYAxis ){
				var yAxisOption=this.yAxisOptionsMap[chartType];
				var additionalOptions={
					isSingleYAxis:!!isSingleYAxis
				};
				if( isSingleYAxis && this.options.series ){
					this.setAdditionalOptions(additionalOptions);
				}
				return {
					options:yAxisOption,
					areaType:'yAxis',
					chartType:chartType,
					additionalOptions:additionalOptions
				};
			},
			/**
			 * Get scale option.
			 * @returns {{
	     *      yAxis: {options: object, areaType: string, chartType: string, additionalParams: object},
	     *      rightYAxis: {options: object, areaType: string, chartType: string, additionalParams: object}
	     * }}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				var scaleOption={
					yAxis:this._makeYAxisScaleOption('yAxis', this.chartTypes[0], !this.hasRightYAxis)
				};
				if( this.hasRightYAxis ){
					scaleOption.rightYAxis=this._makeYAxisScaleOption('rightYAxis', this.chartTypes[1]);
				}
				return scaleOption;
			},
			/**
			 * Make data for adding series component.
			 * @param {Array.<string>} seriesNames - series names
			 * @returns {Array.<object>}
			 * @private
			 */
			_makeDataForAddingSeriesComponent:function( seriesNames ){
				var optionsMap=this._makeOptionsMap(seriesNames);
				var dataProcessor=this.dataProcessor;
				var serieses=tui.util.map(seriesNames, function( seriesName ){
					var chartType=dataProcessor.findChartType(seriesName);
					var data={
						allowNegativeTooltip:true,
						chartType:chartType,
						seriesName:seriesName,
						options:optionsMap[seriesName]
					};
					return {
						name:seriesName+'Series',
						data:data
					};
				});
				return serieses;
			},
			/**
			 * Add components.
			 * @private
			 */
			_addComponents:function(){
				var axes=[
					{
						name:'yAxis',
						seriesName:this.seriesNames[0],
						isVertical:true
					},
					{
						name:'xAxis'
					}
				];
				var serieses=this._makeDataForAddingSeriesComponent(this.seriesNames);
				if( this.hasRightYAxis ){
					axes.push({
						name:'rightYAxis',
						seriesName:this.seriesNames[1],
						isVertical:true
					});
				}
				this._addComponentsForAxisType({
					seriesNames:this.seriesNames,
					axis:axes,
					series:serieses,
					plot:true
				});
			},
			/**
			 * Get y axis option chart types.
			 * @param {Array.<string>} chartTypes chart types
			 * @param {object} yAxisOption - options for y axis
			 * @returns {Array.<string>}
			 * @private
			 */
			_getYAxisOptionChartTypes:function( chartTypes, yAxisOption ){
				var resultChartTypes=chartTypes.slice();
				var yAxisOptions=[].concat(yAxisOption || []);
				var isReverse=false;
				var optionChartTypes;
				if( !yAxisOptions.length || (yAxisOptions.length===1 && !yAxisOptions[0].chartType) ){
					resultChartTypes=[];
				}else if( yAxisOptions.length ){
					optionChartTypes=tui.util.map(yAxisOptions, function( option ){
						return option.chartType;
					});
					tui.util.forEachArray(optionChartTypes, function( chartType, index ){
						isReverse=isReverse || ((chartType && resultChartTypes[index]!==chartType) || false);
					});
					if( isReverse ){
						resultChartTypes.reverse();
					}
				}
				return resultChartTypes;
			},
			/**
			 * Increase yAxis tick count.
			 * @param {number} increaseTickCount increase tick count
			 * @param {object} yAxisData yAxis data
			 * @private
			 */
			_increaseYAxisTickCount:function( increaseTickCount, yAxisData ){
				var formatFunctions=this.dataProcessor.getFormatFunctions();
				var labels;
				yAxisData.limit.max+=yAxisData.step*increaseTickCount;
				labels=calculator.makeLabelsFromLimit(yAxisData.limit, yAxisData.step);
				yAxisData.labels=renderUtil.formatValues(labels, formatFunctions, this.chartType, 'yAxis');
				yAxisData.tickCount+=increaseTickCount;
				yAxisData.validTickCount+=increaseTickCount;
			},
			/**
			 * Update tick count to make the same tick count of y Axes(yAxis, rightYAxis).
			 * @param {{yAxis: object, rightYAxis: object}} axesData - axesData
			 * @private
			 */
			_updateYAxisTickCount:function( axesData ){
				var yAxisData=axesData.yAxis;
				var rightYAxisData=axesData.rightYAxis;
				var tickCountDiff=rightYAxisData.tickCount-yAxisData.tickCount;
				if( tickCountDiff > 0 ){
					this._increaseYAxisTickCount(tickCountDiff, yAxisData);
				}else if( tickCountDiff < 0 ){
					this._increaseYAxisTickCount(-tickCountDiff, rightYAxisData);
				}
			}
		};
		module.exports=verticalTypeComboMixer;
		/***/
	},
	/* 104 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Line and Scatter Combo chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var axisTypeMixer=__webpack_require__(94);
		var comboTypeMixer=__webpack_require__(102);
		var LineSeries=__webpack_require__(61);
		var ScatterSeries=__webpack_require__(67);
		var LineScatterComboChart=tui.util.defineClass(ChartBase, /** @lends LineScatterComboChart.prototype */ {
			/**
			 * Line and Scatter Combo chart.
			 * @constructs LineScatterComboChart
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData - raw data
			 * @param {object} theme - chart theme
			 * @param {object} options - chart options
			 */
			init:function( rawData, theme, options ){
				/**
				 * chart types map
				 * @type {Object}
				 */
				this.chartTypes=['line', 'scatter'];
				/**
				 * series names
				 * @type {Object|Array.<T>}
				 */
				this.seriesNames=['line', 'scatter'];
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true,
					isVertical:true
				});
			},
			/**
			 * Add components.
			 * @private
			 */
			_addComponents:function(){
				var optionsMap=this._makeOptionsMap(this.seriesNames);
				this._addPlotComponent(this.options.xAxis.type);
				this._addAxisComponents([
					{
						name:'yAxis',
						seriesName:this.seriesNames[0],
						isVertical:true
					},
					{
						name:'xAxis'
					}
				], false);
				this._addLegendComponent({});
				this._addSeriesComponents([
					{
						name:'lineSeries',
						SeriesClass:LineSeries,
						data:{
							allowNegativeTooltip:true,
							chartType:'line',
							seriesName:'line',
							options:optionsMap.line
						}
					},
					{
						name:'scatterSeries',
						SeriesClass:ScatterSeries,
						data:{
							allowNegativeTooltip:true,
							chartType:'scatter',
							seriesName:'scatter',
							options:optionsMap.scatter
						}
					}
				], this.options);
				this.componentManager.register('mouseEventDetector', {
					chartType:this.chartType,
					isVertical:this.isVertical,
					allowSelect:this.options.series.allowSelect,
					classType:'areaTypeEventDetector'
				});
				this._addTooltipComponent();
			},
			/**
			 * Get scale option.
			 * @returns {{
	     *      yAxis: {valueType: string, additionalOptions: {isSingleYAxis: boolean}},
	     *      xAxis: {valueType: string}
	     * }}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				return {
					yAxis:{
						valueType:'y'
					},
					xAxis:{
						valueType:'x'
					}
				};
			}
		});
		tui.util.extend(LineScatterComboChart.prototype, axisTypeMixer, comboTypeMixer);
		module.exports=LineScatterComboChart;
		/***/
	},
	/* 105 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Line and Area Combo chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var rawDataHandler=__webpack_require__(4);
		var axisTypeMixer=__webpack_require__(94);
		var zoomMixer=__webpack_require__(98);
		var addingDynamicDataMixer=__webpack_require__(99);
		var comboTypeMixer=__webpack_require__(102);
		var verticalTypeComboMixer=__webpack_require__(103);
		var LineAreaComboChart=tui.util.defineClass(ChartBase, /** @lends LineAreaComboChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-combo-chart',
			/**
			 * Line and Area Combo chart.
			 * @constructs LineAreaComboChart
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData - raw data
			 * @param {object} theme - chart theme
			 * @param {object} options - chart options
			 */
			init:function( rawData, theme, options ){
				this._initForVerticalTypeCombo(rawData, options);
				this._initForAddingData();
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true,
					isVertical:true
				});
			},
			/**
			 * On change selected legend.
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 */
			onChangeCheckedLegends:function( checkedLegends ){
				var zoomedRawData=this.dataProcessor.getZoomedRawData();
				var rawData=rawDataHandler.filterCheckedRawData(zoomedRawData, checkedLegends);
				var chartTypesMap=this._makeChartTypesMap(rawData.series, this.options.yAxis);
				tui.util.extend(this, chartTypesMap);
				this._initForAddingData();
				this._changeCheckedLegends(checkedLegends, rawData, chartTypesMap);
			}
		});
		tui.util.extend(LineAreaComboChart.prototype,
			axisTypeMixer, zoomMixer, addingDynamicDataMixer, comboTypeMixer, verticalTypeComboMixer);
		module.exports=LineAreaComboChart;
		/***/
	},
	/* 106 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Pie and Donut Combo chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var rawDataHandler=__webpack_require__(4);
		var pieTypeMixer=__webpack_require__(107);
		var comboTypeMixer=__webpack_require__(102);
		var predicate=__webpack_require__(5);
		var arrayUtil=__webpack_require__(6);
		var PieDonutComboChart=tui.util.defineClass(ChartBase, /** @lends PieDonutComboChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-combo-chart',
			/**
			 * Pie and Donut Combo chart.
			 * @constructs PieDonutComboChart
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				/**
				 * chart types.
				 * @type {Array.<string>}
				 */
				this.seriesNames=tui.util.keys(rawData.series).sort();
				/**
				 * chart types
				 * @type {Object}
				 */
				this.chartTypes=['pie', 'pie'];
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					isVertical:true
				});
			},
			/**
			 * Make data for adding series component.
			 * @returns {Array.<object>}
			 * @private
			 */
			_makeDataForAddingSeriesComponent:function(){
				var seriesNames=this.seriesNames;
				var optionsMap=this._makeOptionsMap(seriesNames);
				var dataProcessor=this.dataProcessor;
				var isShowOuterLabel=arrayUtil.any(optionsMap, predicate.isShowOuterLabel);
				var seriesData=tui.util.map(seriesNames, function( seriesName ){
					var chartType=dataProcessor.findChartType(seriesName);
					var additionalParams={
						chartType:chartType,
						seriesName:seriesName,
						options:optionsMap[seriesName],
						isShowOuterLabel:isShowOuterLabel,
						isCombo:true
					};
					return {
						name:seriesName+'Series',
						additionalParams:additionalParams
					};
				});
				return seriesData;
			},
			/**
			 * Add components
			 * @private
			 */
			_addComponents:function(){
				this._addLegendComponent(this.seriesNames);
				this._addTooltipComponent({
					labelFormatter:this.labelFormatter
				});
				if( this.options.chartExportMenu.visible ){
					this._addChartExportMenuComponent(this.options.chartExportMenu);
				}
				this._addSeriesComponents(this._makeDataForAddingSeriesComponent());
				this._addMouseEventDetectorComponent();
			},
			/**
			 * Add data ratios.
			 * @private
			 * @override
			 */
			_addDataRatios:function(){
				var self=this;
				var seriesNames=this.seriesNames || [this.chartType];
				tui.util.forEachArray(seriesNames, function( chartType ){
					self.dataProcessor.addDataRatiosOfPieChart(chartType);
				});
			},
			/**
			 * On change selected legend.
			 * @param {Array.<?boolean> | {line: ?Array.<boolean>, column: ?Array.<boolean>}} checkedLegends checked legends
			 * @override
			 */
			onChangeCheckedLegends:function( checkedLegends ){
				var originalRawData=this.dataProcessor.getOriginalRawData();
				var rawData=rawDataHandler.filterCheckedRawData(originalRawData, checkedLegends);
				ChartBase.prototype.onChangeCheckedLegends.call(this, checkedLegends, rawData, {
					seriesNames:this.seriesNames
				});
			}
		});
		tui.util.extend(PieDonutComboChart.prototype, pieTypeMixer, comboTypeMixer);
		module.exports=PieDonutComboChart;
		/***/
	},
	/* 107 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview pieTypeMixer is mixer of pie type chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/**
		 * pieTypeMixer is mixer of pie type chart.
		 * @mixin
		 * @private */
		var pieTypeMixer={
			/**
			 * Add legend component.
			 * @param {Array.<string>} [seriesNames] - series names
			 * @private
			 */
			_addLegendComponent:function( seriesNames ){
				var legendOption=this.options.legend || {};
				if( legendOption.visible ){
					this.componentManager.register('legend', {
						seriesNames:seriesNames,
						chartType:this.chartType,
						classType:'legend'
					});
				}
			},
			/**
			 * Add tooltip component.
			 * @param {object} tooltipOptions tooltip options
			 * @private
			 */
			_addTooltipComponent:function( tooltipOptions ){
				this.componentManager.register('tooltip', this._makeTooltipData('tooltip', tooltipOptions));
			},
			/**
			 * Add series components.
			 * @param {Array.<{name: string, additionalParams: ?object}>} seriesData - data for adding series component
			 * @private
			 */
			_addSeriesComponents:function( seriesData ){
				var componentManager=this.componentManager;
				var seriesBaseParams={
					libType:this.options.libType,
					componentType:'series',
					chartBackground:this.theme.chart.background,
					classType:'pieSeries'
				};
				tui.util.forEach(seriesData, function( seriesDatum ){
					var seriesParams=tui.util.extend(seriesBaseParams, seriesDatum.additionalParams);
					componentManager.register(seriesDatum.name, seriesParams);
				});
			},
			/**
			 * Add chartExportMenu component.
			 * @private
			 */
			_addChartExportMenuComponent:function(){
				var chartOption=this.options.chart;
				var chartTitle=chartOption && chartOption.title ? chartOption.title.text : 'chart';
				this.componentManager.register('chartExportMenu', {
					chartTitle:chartTitle,
					classType:'chartExportMenu'
				});
			},
			/**
			 * Add mouse event detector component.
			 * @private
			 * @override
			 */
			_addMouseEventDetectorComponent:function(){
				this.componentManager.register('mouseEventDetector', {
					chartType:this.chartType,
					classType:'simpleEventDetector'
				});
			},
			/**
			 * Label formatter function for pie chart
			 * @param {object} seriesItem series item
			 * @param {object} tooltipDatum tooltip datum object
			 * @param {string} labelPrefix label prefix
			 * @returns {object}
			 */
			labelFormatter:function( seriesItem, tooltipDatum, labelPrefix ){
				var ratioLabel;
				var percentageString=(seriesItem.ratio*100).toFixed(4);
				var percent=parseFloat(percentageString);
				var needSlice=(percent < 0.0009 || percentageString.length > 5);
				percentageString=needSlice ? percentageString.substr(0, 4) : String(percent);
				ratioLabel=percentageString+'&nbsp;%&nbsp;' || '';
				tooltipDatum.ratioLabel=labelPrefix+ratioLabel;
				tooltipDatum.label=seriesItem.tooltipLabel || (seriesItem.label ? seriesItem.label : '');
				return tooltipDatum;
			}
		};
		module.exports=pieTypeMixer;
		/***/
	},
	/* 108 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Pie chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var pieTypeMixer=__webpack_require__(107);
		var chartConst=__webpack_require__(2);
		var PieChart=tui.util.defineClass(ChartBase, /** @lends PieChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-pie-chart',
			/**
			 * Pie chart.
			 * @constructs PieChart
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				options.tooltip=options.tooltip || {};
				if( !options.tooltip.align ){
					options.tooltip.align=chartConst.TOOLTIP_DEFAULT_ALIGN_OPTION;
				}
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options
				});
			},
			/**
			 * Add components
			 * @private
			 */
			_addComponents:function(){
				var chartExportMenu=this.options.chartExportMenu;
				this._addLegendComponent();
				this._addTooltipComponent({
					labelFormatter:this.labelFormatter
				});
				if( chartExportMenu.visible ){
					this._addChartExportMenuComponent(chartExportMenu);
				}
				this._addSeriesComponents([{
					name:'pieSeries',
					additionalParams:{
						chartType:this.chartType
					}
				}]);
				this._addMouseEventDetectorComponent();
			},
			/**
			 * Add data ratios.
			 * @private
			 * @override
			 */
			_addDataRatios:function(){
				this.dataProcessor.addDataRatiosOfPieChart(this.chartType);
			},
			/**
			 * Send series data.
			 * @private
			 * @override
			 */
			_sendSeriesData:function(){
				ChartBase.prototype._sendSeriesData.call(this, chartConst.CHART_TYPE_PIE);
			}
		});
		tui.util.extend(PieChart.prototype, pieTypeMixer);
		module.exports=PieChart;
		/***/
	},
	/* 109 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Bubble chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var chartConst=__webpack_require__(2);
		var axisTypeMixer=__webpack_require__(94);
		var BubbleChart=tui.util.defineClass(ChartBase, /** @lends BubbleChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-bubble-chart',
			/**
			 * Bubble chart.
			 * @constructs BubbleChart
			 * @extends ChartBase
			 * @mixes axisTypeMixer
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				options.tooltip=options.tooltip || {};
				options.circleLegend=options.circleLegend || {};
				if( !options.tooltip.align ){
					options.tooltip.align=chartConst.TOOLTIP_DEFAULT_ALIGN_OPTION;
				}
				if( tui.util.isUndefined(options.circleLegend.visible) ){
					options.circleLegend.visible=true;
				}
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true
				});
			},
			/**
			 * Get scale option.
			 * @returns {{xAxis: ?{valueType:string}, yAxis: ?{valueType:string}}}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				var scaleOption={};
				if( this.dataProcessor.hasXValue(this.chartType) ){
					scaleOption.xAxis={
						valueType:'x'
					};
				}
				if( this.dataProcessor.hasYValue(this.chartType) ){
					scaleOption.yAxis={
						valueType:'y'
					};
				}
				return scaleOption;
			},
			/**
			 * Set default options.
			 * @param {object} options - options for bubble chart
			 * @private
			 * @override
			 */
			_setDefaultOptions:function( options ){
				ChartBase.prototype._setDefaultOptions.call(this, options);
				this.options.circleLegend=this.options.circleLegend || {};
				if( tui.util.isUndefined(this.options.circleLegend.visible) ){
					this.options.circleLegend.visible=true;
				}
			},
			/**
			 * Add components
			 * @private
			 */
			_addComponents:function(){
				this._addComponentsForAxisType({
					axis:[
						{
							name:'yAxis',
							isVertical:true
						},
						{
							name:'xAxis'
						}
					],
					series:[
						{
							name:'bubbleSeries'
						}
					],
					plot:true
				});
				if( this.options.circleLegend.visible ){
					this.componentManager.register('circleLegend', {
						chartType:this.chartType,
						classType:'circleLegend',
						baseFontFamily:this.theme.chart.fontFamily
					});
				}
			}
		});
		tui.util.extend(BubbleChart.prototype, axisTypeMixer);
		module.exports=BubbleChart;
		/***/
	},
	/* 110 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Scatter chart is a type of plot or mathematical diagram using Cartesian coordinates
		 *                  to display values for typically two variables for a set of data.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var chartConst=__webpack_require__(2);
		var axisTypeMixer=__webpack_require__(94);
		var ScatterChart=tui.util.defineClass(ChartBase, /** @lends ScatterChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-scatter-chart',
			/**
			 * Scatter chart is a type of plot or mathematical diagram using Cartesian coordinates
			 *  to display values for typically two variables for a set of data.
			 * @constructs ScatterChart
			 * @extends ChartBase
			 * @mixes axisTypeMixer
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				options.tooltip=options.tooltip || {};
				if( !options.tooltip.align ){
					options.tooltip.align=chartConst.TOOLTIP_DEFAULT_ALIGN_OPTION;
				}
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true
				});
			},
			/**
			 * Add components
			 * @private
			 */
			_addComponents:function(){
				this._addComponentsForAxisType({
					axis:[
						{
							name:'yAxis',
							isVertical:true
						},
						{
							name:'xAxis'
						}
					],
					series:[
						{
							name:'scatterSeries'
						}
					],
					plot:true
				});
			},
			/**
			 * Get scale option.
			 * @returns {{xAxis: {valueType: string}, yAxis: {valueType: string}}}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				return {
					xAxis:{
						valueType:'x'
					},
					yAxis:{
						valueType:'y'
					}
				};
			}
		});
		tui.util.extend(ScatterChart.prototype, axisTypeMixer);
		module.exports=ScatterChart;
		/***/
	},
	/* 111 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Heatmap chart is a graphical representation of data where the individual values contained
		 *                      in a matrix are represented as colors.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var ColorSpectrum=__webpack_require__(112);
		var chartConst=__webpack_require__(2);
		var axisTypeMixer=__webpack_require__(94);
		var HeatmapChart=tui.util.defineClass(ChartBase, /** @lends HeatmapChart.prototype */ {
			/**
			 *
			 * className
			 * @type {string}
			 */
			className:'tui-heatmap-chart',
			/**
			 * Heatmap chart is a graphical representation of data where the individual values contained
			 *      in a matrix are represented as colors.
			 * @constructs HeatmapChart
			 * @extends ChartBase
			 * @mixes axisTypeMixer
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				options.tooltip=options.tooltip || {};
				if( !options.tooltip.align ){
					options.tooltip.align=chartConst.TOOLTIP_DEFAULT_ALIGN_OPTION;
				}
				options.tooltip.grouped=false;
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true,
					isVertical:true
				});
			},
			/**
			 * Add components.
			 * @private
			 */
			_addComponents:function(){
				var seriesTheme=this.theme.series[this.chartType];
				var colorSpectrum=new ColorSpectrum(seriesTheme.startColor, seriesTheme.endColor);
				this._addComponentsForAxisType({
					axis:[
						{
							name:'yAxis',
							isVertical:true
						},
						{
							name:'xAxis'
						}
					],
					legend:{
						classType:'spectrumLegend',
						additionalParams:{
							colorSpectrum:colorSpectrum
						}
					},
					series:[
						{
							name:'heatmapSeries',
							data:{
								colorSpectrum:colorSpectrum
							}
						}
					],
					tooltip:true,
					mouseEventDetector:true
				});
			},
			/**
			 * Get scale option.
			 * @returns {{legend: boolean}}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				return {
					legend:true
				};
			}
		});
		tui.util.extend(HeatmapChart.prototype, axisTypeMixer);
		/**
		 * Add data ratios for rendering graph.
		 * @private
		 * @override
		 */
		HeatmapChart.prototype._addDataRatios=function( limitMap ){
			this.dataProcessor.addDataRatios(limitMap.legend, null, this.chartType);
		};
		module.exports=HeatmapChart;
		/***/
	},
	/* 112 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview ColorSpectrum create a color spectrum and provide color value.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var colorutil=__webpack_require__(113);
		var ColorSpectrum=tui.util.defineClass(/** @lends ColorSpectrum.prototype */ {
			/**
			 * ColorSpectrum create a color spectrum and provide color value.
			 * @constructs ColorSpectrum
			 * @private
			 * @param {string} startColor hex color
			 * @param {string} endColor hex color
			 */
			init:function( startColor, endColor ){
				var endRGB;
				this.start=colorutil.colorNameToHex(startColor);
				this.startRGB=colorutil.hexToRGB(this.start);
				this.end=colorutil.colorNameToHex(endColor);
				endRGB=colorutil.hexToRGB(this.end);
				this.distances=this._makeDistances(this.startRGB, endRGB);
				this.colorMap={};
			},
			/**
			 * Make distances start RGB to end RGB.
			 * @param {Array.<number>} startRGB start RGB
			 * @param {Array.<number>} endRGB end RGB
			 * @returns {Array.<number>} distances
			 * @private
			 */
			_makeDistances:function( startRGB, endRGB ){
				return tui.util.map(startRGB, function( value, index ){
					return endRGB[index]-value;
				});
			},
			/**
			 * Get hex color.
			 * @param {number} ratio ratio
			 * @returns {string} hex color
			 */
			getColor:function( ratio ){
				var hexColor=this.colorMap[ratio];
				var distances, rgbColor;
				if( !hexColor ){
					distances=this.distances;
					rgbColor=tui.util.map(this.startRGB, function( start, index ){
						return start+parseInt(distances[index]*ratio, 10);
					});
					hexColor=colorutil.rgbToHEX.apply(null, rgbColor);
				}
				return hexColor || null;
			}
		});
		module.exports=ColorSpectrum;
		/***/
	},
	/* 113 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview Utility methods to manipulate colors
		 * @author NHN Ent. FE Development Lab <dl_javascript@nhnent.com>
		 */
		'use strict';
		var hexRX=/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
		/**
		 * Color map.
		 * http://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
		 * http://www.w3schools.com/HTML/html_colornames.asp
		 * @type {object}
		 * @ignore
		 */
		var colorMap={
			'aliceblue':'#f0f8ff',
			'antiquewhite':'#faebd7',
			'aqua':'#00ffff',
			'aquamarine':'#7fffd4',
			'azure':'#f0ffff',
			'beige':'#f5f5dc',
			'bisque':'#ffe4c4',
			'black':'#000000',
			'blanchedalmond':'#ffebcd',
			'blue':'#0000ff',
			'blueviolet':'#8a2be2',
			'brown':'#a52a2a',
			'burlywood':'#deb887',
			'cadetblue':'#5f9ea0',
			'chartreuse':'#7fff00',
			'chocolate':'#d2691e',
			'coral':'#ff7f50',
			'cornflowerblue':'#6495ed',
			'cornsilk':'#fff8dc',
			'crimson':'#dc143c',
			'cyan':'#00ffff',
			'darkblue':'#00008b',
			'darkcyan':'#008b8b',
			'darkgoldenrod':'#b8860b',
			'darkgray':'#a9a9a9',
			'darkgreen':'#006400',
			'darkkhaki':'#bdb76b',
			'darkmagenta':'#8b008b',
			'darkolivegreen':'#556b2f',
			'darkorange':'#ff8c00',
			'darkorchid':'#9932cc',
			'darkred':'#8b0000',
			'darksalmon':'#e9967a',
			'darkseagreen':'#8fbc8f',
			'darkslateblue':'#483d8b',
			'darkslategray':'#2f4f4f',
			'darkturquoise':'#00ced1',
			'darkviolet':'#9400d3',
			'deeppink':'#ff1493',
			'deepskyblue':'#00bfff',
			'dimgray':'#696969',
			'dodgerblue':'#1e90ff',
			'firebrick':'#b22222',
			'floralwhite':'#fffaf0',
			'forestgreen':'#228b22',
			'fuchsia':'#ff00ff',
			'gainsboro':'#dcdcdc',
			'ghostwhite':'#f8f8ff',
			'gold':'#ffd700',
			'goldenrod':'#daa520',
			'gray':'#808080',
			'green':'#008000',
			'greenyellow':'#adff2f',
			'honeydew':'#f0fff0',
			'hotpink':'#ff69b4',
			'indianred ':'#cd5c5c',
			'indigo':'#4b0082',
			'ivory':'#fffff0',
			'khaki':'#f0e68c',
			'lavender':'#e6e6fa',
			'lavenderblush':'#fff0f5',
			'lawngreen':'#7cfc00',
			'lemonchiffon':'#fffacd',
			'lightblue':'#add8e6',
			'lightcoral':'#f08080',
			'lightcyan':'#e0ffff',
			'lightgoldenrodyellow':'#fafad2',
			'lightgrey':'#d3d3d3',
			'lightgreen':'#90ee90',
			'lightpink':'#ffb6c1',
			'lightsalmon':'#ffa07a',
			'lightseagreen':'#20b2aa',
			'lightskyblue':'#87cefa',
			'lightslategray':'#778899',
			'lightsteelblue':'#b0c4de',
			'lightyellow':'#ffffe0',
			'lime':'#00ff00',
			'limegreen':'#32cd32',
			'linen':'#faf0e6',
			'magenta':'#ff00ff',
			'maroon':'#800000',
			'mediumaquamarine':'#66cdaa',
			'mediumblue':'#0000cd',
			'mediumorchid':'#ba55d3',
			'mediumpurple':'#9370d8',
			'mediumseagreen':'#3cb371',
			'mediumslateblue':'#7b68ee',
			'mediumspringgreen':'#00fa9a',
			'mediumturquoise':'#48d1cc',
			'mediumvioletred':'#c71585',
			'midnightblue':'#191970',
			'mintcream':'#f5fffa',
			'mistyrose':'#ffe4e1',
			'moccasin':'#ffe4b5',
			'navajowhite':'#ffdead',
			'navy':'#000080',
			'oldlace':'#fdf5e6',
			'olive':'#808000',
			'olivedrab':'#6b8e23',
			'orange':'#ffa500',
			'orangered':'#ff4500',
			'orchid':'#da70d6',
			'palegoldenrod':'#eee8aa',
			'palegreen':'#98fb98',
			'paleturquoise':'#afeeee',
			'palevioletred':'#d87093',
			'papayawhip':'#ffefd5',
			'peachpuff':'#ffdab9',
			'peru':'#cd853f',
			'pink':'#ffc0cb',
			'plum':'#dda0dd',
			'powderblue':'#b0e0e6',
			'purple':'#800080',
			'red':'#ff0000',
			'rosybrown':'#bc8f8f',
			'royalblue':'#4169e1',
			'saddlebrown':'#8b4513',
			'salmon':'#fa8072',
			'sandybrown':'#f4a460',
			'seagreen':'#2e8b57',
			'seashell':'#fff5ee',
			'sienna':'#a0522d',
			'silver':'#c0c0c0',
			'skyblue':'#87ceeb',
			'slateblue':'#6a5acd',
			'slategray':'#708090',
			'snow':'#fffafa',
			'springgreen':'#00ff7f',
			'steelblue':'#4682b4',
			'tan':'#d2b48c',
			'teal':'#008080',
			'thistle':'#d8bfd8',
			'tomato':'#ff6347',
			'turquoise':'#40e0d0',
			'violet':'#ee82ee',
			'wheat':'#f5deb3',
			'white':'#ffffff',
			'whitesmoke':'#f5f5f5',
			'yellow':'#ffff00',
			'yellowgreen':'#9acd32'
		};
		var colorutil={
			/**
			 * pad left zero characters.
			 * @param {number} number number value to pad zero.
			 * @param {number} length pad length to want.
			 * @returns {string} padded string.
			 */
			leadingZero:function( number, length ){
				var zero='',
					i=0;
				if( String(number).length > length ){
					return String(number);
				}
				for( ; i < (length-1); i+=1 ){
					zero+='0';
				}
				return (zero+number).slice(length* -1);
			},
			/**
			 * Check validate of hex string value is RGB
			 * @param {string} str - rgb hex string
			 * @returns {boolean} return true when supplied str is valid RGB hex string
			 */
			isValidRGB:function( str ){
				return hexRX.test(str);
			},
			// @license RGB <-> HSV conversion utilities based off of http://www.cs.rit.edu/~ncs/color/t_convert.html
			/**
			 * Convert color hex string to rgb number array
			 * @param {string} hexStr - hex string
			 * @returns {number[]} rgb numbers
			 */
			hexToRGB:function( hexStr ){
				var r, g, b;
				if( !colorutil.isValidRGB(hexStr) ){
					return false;
				}
				hexStr=hexStr.substring(1);
				r=parseInt(hexStr.substr(0, 2), 16);
				g=parseInt(hexStr.substr(2, 2), 16);
				b=parseInt(hexStr.substr(4, 2), 16);
				return [r, g, b];
			},
			/**
			 * Convert rgb number to hex string
			 * @param {number} r - red
			 * @param {number} g - green
			 * @param {number} b - blue
			 * @returns {string|boolean} return false when supplied rgb number is not valid. otherwise, converted hex string
			 */
			rgbToHEX:function( r, g, b ){
				var hexStr='#'+
					colorutil.leadingZero(r.toString(16), 2)+
					colorutil.leadingZero(g.toString(16), 2)+
					colorutil.leadingZero(b.toString(16), 2);
				if( colorutil.isValidRGB(hexStr) ){
					return hexStr;
				}
				return false;
			},
			/**
			 * Color name to hex.
			 * @param {string} colorName color name
			 * @returns {string} hex
			 */
			colorNameToHex:function( colorName ){
				return colorMap[colorName.toLowerCase()] || colorName;
			}
		};
		tui.util.defineNamespace('tui.chart');
		tui.chart.colorutil=colorutil;
		module.exports=colorutil;
		/***/
	},
	/* 114 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Treemap chart is graphical representation of hierarchical data by using rectangles.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var ColorSpectrum=__webpack_require__(112);
		var TreemapChart=tui.util.defineClass(ChartBase, /** @lends TreemapChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-treemap-chart',
			/**
			 * Treemap chart is graphical representation of hierarchical data by using rectangles.
			 * @constructs TreemapChart
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				// options.series = options.series || {};
				options.tooltip=options.tooltip || {};
				options.tooltip.grouped=false;
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:false,
					isVertical:true
				});
			},
			/**
			 * Add components.
			 * @private
			 */
			_addComponents:function(){
				var seriesTheme=this.theme.series[this.chartType];
				var useColorValue=this.options.series.useColorValue;
				var colorSpectrum=useColorValue ? (new ColorSpectrum(seriesTheme.startColor, seriesTheme.endColor)) : null;
				this.componentManager.register('series', {
					chartBackground:this.theme.chart.background,
					chartType:this.chartType,
					classType:'treemapSeries',
					colorSpectrum:colorSpectrum
				});
				this.componentManager.register('tooltip', tui.util.extend({
					labelTheme:tui.util.pick(this.theme, 'series', 'label')
				}, this._makeTooltipData()));
				if( useColorValue && this.options.legend.visible ){
					this.componentManager.register('legend', {
						chartType:this.chartType,
						classType:'spectrumLegend',
						colorSpectrum:colorSpectrum
					});
				}
				this.componentManager.register('mouseEventDetector', {
					chartType:this.chartType,
					classType:'boundsTypeEventDetector',
					isVertical:this.isVertical
				});
			},
			/**
			 * Get scale option.
			 * @returns {{legend: boolean}}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				return {
					legend:true
				};
			},
			/**
			 * Add data ratios to dataProcessor for rendering graph.
			 * @private
			 * @override
			 */
			_addDataRatios:function( limitMap ){
				this.dataProcessor.addDataRatiosForTreemapChart(limitMap.legend, this.chartType);
			},
			/**
			 * On zoom.
			 * @param {number} index - index of target seriesItem
			 */
			onZoom:function( index ){
				this.componentManager.render('zoom', null, {
					index:index
				});
			}
		});
		module.exports=TreemapChart;
		/***/
	},
	/* 115 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Map chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var mapManager=__webpack_require__(10);
		var MapChartMapModel=__webpack_require__(116);
		var ColorSpectrum=__webpack_require__(112);
		var MapChartDataProcessor=__webpack_require__(117);
		var MapChart=tui.util.defineClass(ChartBase, /** @lends MapChart.prototype */ {
			/**
			 * Map chart.
			 * @constructs MapChart
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				/**
				 * class name
				 * @type {string}
				 */
				this.className='tui-map-chart';
				options.map=mapManager.get(options.map);
				options.tooltip=options.tooltip || {};
				options.legend=options.legend || {};
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					DataProcessor:MapChartDataProcessor
				});
			},
			/**
			 * Add components.
			 * @private
			 */
			_addComponents:function(){
				var options=this.options;
				var seriesTheme=this.theme.series[this.chartType];
				var colorSpectrum=new ColorSpectrum(seriesTheme.startColor, seriesTheme.endColor);
				var mapModel=new MapChartMapModel(this.dataProcessor, this.options.map);
				options.legend=options.legend || {};
				if( options.legend.visible ){
					this.componentManager.register('legend', {
						colorSpectrum:colorSpectrum,
						classType:'spectrumLegend'
					});
				}
				this.componentManager.register('tooltip', tui.util.extend({
					mapModel:mapModel
				}, this._makeTooltipData('mapChartTooltip')));
				this.componentManager.register('mapSeries', {
					libType:options.libType,
					chartType:options.chartType,
					componentType:'series',
					classType:'mapSeries',
					mapModel:mapModel,
					colorSpectrum:colorSpectrum
				});
				this.componentManager.register('zoom', {
					classType:'zoom'
				});
				this.componentManager.register('mouseEventDetector', {
					chartType:this.chartType,
					classType:'mapChartEventDetector'
				});
			},
			/**
			 * Get scale option.
			 * @returns {{legend: boolean}}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				return {
					legend:true
				};
			},
			/**
			 * Add data ratios.
			 * @private
			 * @override
			 */
			_addDataRatios:function( limitMap ){
				this.dataProcessor.addDataRatios(limitMap.legend);
			}
		});
		module.exports=MapChart;
		/***/
	},
	/* 116 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview MapChartMapModel is map model of map chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var chartConst=__webpack_require__(2);
		var arrayUtil=__webpack_require__(6);
		var MapChartMapModel=tui.util.defineClass(/** @lends MapChartMapModel.prototype */ {
			/**
			 * MapChartMapModel is map model of map chart.
			 * @constructs MapChartMapModel
			 * @param {MapChartDataProcessor} dataProcessor Map chart data processor
			 * @param {Array.<{name: string, path: string, labelCoordinate: ?{x: number, y:number}}>} rawMapData raw map data
			 */
			init:function( dataProcessor, rawMapData ){
				/**
				 * Command function map.
				 * @type {{
	         *      M: MapChartMapModel._makeCoordinate, m: MapChartMapModel._makeCoordinateFromRelativeCoordinate,
	         *      L: MapChartMapModel._makeCoordinate, l: MapChartMapModel._makeCoordinateFromRelativeCoordinate,
	         *      H: MapChartMapModel._makeXCoordinate, h: MapChartMapModel._makeXCoordinateFroRelativeCoordinate,
	         *      V: MapChartMapModel._makeYCoordinate, v: MapChartMapModel._makeYCoordinateFromRelativeCoordinate
	         * }}
				 */
				this.commandFuncMap={
					M:tui.util.bind(this._makeCoordinate, this),
					m:tui.util.bind(this._makeCoordinateFromRelativeCoordinate, this),
					L:tui.util.bind(this._makeCoordinate, this),
					l:tui.util.bind(this._makeCoordinateFromRelativeCoordinate, this),
					H:tui.util.bind(this._makeXCoordinate, this),
					h:tui.util.bind(this._makeXCoordinateFroRelativeCoordinate, this),
					V:tui.util.bind(this._makeYCoordinate, this),
					v:tui.util.bind(this._makeYCoordinateFromRelativeCoordinate, this)
				};
				/**
				 * Ignore command map.
				 * @type {{Z: boolean, z: boolean}}
				 */
				this.ignoreCommandMap={
					Z:true,
					z:true
				};
				/**
				 * Map dimension
				 * @type {{width: number, height: number}}
				 */
				this.mapDimension=null;
				/**
				 * Map chart data processor.
				 * @type {MapChartDataProcessor}
				 */
				this.dataProcessor=dataProcessor;
				/**
				 * Raw map data.
				 * @type {Array.<{name: string, path: string, labelCoordinate: ?{x: number, y: number}}>}
				 */
				this.rawMapData=rawMapData;
				/**
				 * Map data.
				 * @type {null|Array.<object>}
				 */
				this.mapData=null;
			},
			/**
			 * Split coordinate string.
			 * @param {string} coordinateStr coordinate string
			 * @returns {{x: number, y: number}} coordinate map
			 * @private
			 */
			_splitCoordinate:function( coordinateStr ){
				var coordinates=coordinateStr.split(','),
					result={
						x:parseFloat(coordinates[0])
					};
				if( coordinates[1] ){
					result.y=parseFloat(coordinates[1]);
				}
				return result;
			},
			/**
			 * Make coordinate
			 * @param {string} coordinateStr coordinate
			 * @returns {{x: number, y: number}} coordinate
			 * @private
			 */
			_makeCoordinate:function( coordinateStr ){
				return this._splitCoordinate(coordinateStr);
			},
			/**
			 * Make coordinate from relative coordinate.
			 * @param {string} coordinateStr coordinate
			 * @param {{x: number, y: number}} prevCoordinate previous coordinate
			 * @returns {{x: number, y: number}} coordinate
			 * @private
			 */
			_makeCoordinateFromRelativeCoordinate:function( coordinateStr, prevCoordinate ){
				var coordinate=this._splitCoordinate(coordinateStr);
				return {
					x:coordinate.x+prevCoordinate.x,
					y:coordinate.y+prevCoordinate.y
				};
			},
			/**
			 * Make x coordinate.
			 * @param {string} coordinateStr coordinate
			 * @returns {{x: number}} x coordinate
			 * @private
			 */
			_makeXCoordinate:function( coordinateStr ){
				var coordinate=this._splitCoordinate(coordinateStr);
				return {
					x:coordinate.x
				};
			},
			/**
			 * Make x coordinate from relative coordinate.
			 * @param {string} coordinateStr coordinate
			 * @param {{x: number, y: number}} prevCoordinate previous coordinate
			 * @returns {{x: number}} x coordinate
			 * @private
			 */
			_makeXCoordinateFroRelativeCoordinate:function( coordinateStr, prevCoordinate ){
				var coordinate=this._splitCoordinate(coordinateStr);
				return {
					x:coordinate.x+prevCoordinate.x
				};
			},
			/**
			 * Make y coordinate.
			 * @param {string} coordinateStr coordinate
			 * @returns {{y: number}} y coordinate
			 * @private
			 */
			_makeYCoordinate:function( coordinateStr ){
				var coordinate=this._splitCoordinate(coordinateStr);
				return {
					y:coordinate.x
				};
			},
			/**
			 * Make y coordinate from relative coordinate.
			 * @param {string} coordinateStr coordinate
			 * @param {{x: number, y: number}} prevCoordinate previous coordinate
			 * @returns {{y: number}} y coordinate
			 * @private
			 */
			_makeYCoordinateFromRelativeCoordinate:function( coordinateStr, prevCoordinate ){
				var coordinate=this._splitCoordinate(coordinateStr);
				return {
					y:coordinate.x+prevCoordinate.y
				};
			},
			/**
			 * Split path.
			 * @param {string} path path
			 * @returns {Array.<{type: string, coordinate: string}>} splitted path data
			 * @private
			 */
			_splitPath:function( path ){
				var i=0,
					len=path.length,
					pathData=[],
					coordinate='',
					chr, commandType;
				for( ; i < len; i+=1 ){
					chr=path.charAt(i);
					if( this.commandFuncMap[chr] ){
						if( commandType && coordinate ){
							pathData.push({
								type:commandType,
								coordinate:coordinate
							});
						}
						commandType=chr;
						coordinate='';
					}else if( !this.ignoreCommandMap[chr] ){
						coordinate+=chr;
					}
				}
				if( commandType && coordinate ){
					pathData.push({
						type:commandType,
						coordinate:coordinate
					});
				}
				return pathData;
			},
			/**
			 * Make coordinates from path.
			 * @param {string} path path
			 * @returns {Array.<{x: number, y: number}>} coordinates
			 * @private
			 */
			_makeCoordinatesFromPath:function( path ){
				var self=this,
					pathData=this._splitPath(path),
					prevCoordinate={
						x:0,
						y:0
					};
				return tui.util.map(pathData, function( datum ){
					var commandFunc=self.commandFuncMap[datum.type],
						coordinate=commandFunc(datum.coordinate, prevCoordinate);
					tui.util.extend(prevCoordinate, coordinate);
					return coordinate;
				});
			},
			/**
			 * Find bound from coordinates.
			 * @param {Array.<{left: number, top: number}>} coordinates coordinates
			 * @returns {{dimension: {width: number, height: number}, position: {top: number, left: number}}} bound
			 * @private
			 */
			_findBoundFromCoordinates:function( coordinates ){
				var xs=tui.util.filter(tui.util.pluck(coordinates, 'x'), function( x ){
						return !tui.util.isUndefined(x);
					}),
					ys=tui.util.filter(tui.util.pluck(coordinates, 'y'), function( y ){
						return !tui.util.isUndefined(y);
					}),
					maxLeft=arrayUtil.max(xs),
					minLeft=arrayUtil.min(xs),
					maxTop=arrayUtil.max(ys),
					minTop=arrayUtil.min(ys);
				return {
					dimension:{
						width:maxLeft-minLeft,
						height:maxTop-minTop
					},
					position:{
						left:minLeft,
						top:minTop
					}
				};
			},
			/**
			 * Make label position.
			 * @param {{dimension: {width: number, height: number}, position: {top: number, left: number}}} bound bound
			 * @param {?{left: number, top: number}} positionRatio position ratio
			 * @returns {{left: number, top: number}} label position
			 * @private
			 */
			_makeLabelPosition:function( bound, positionRatio ){
				positionRatio=positionRatio || chartConst.MAP_CHART_LABEL_DEFAULT_POSITION_RATIO;
				return {
					left:bound.position.left+(bound.dimension.width*positionRatio.x),
					top:bound.position.top+(bound.dimension.height*positionRatio.y)
				};
			},
			/**
			 * Create map data.
			 * @param {Array.<{name: string, path: string, labelCoordinate: ?{x: number, y:number}}>} rawMapData raw map data
			 * @returns {Array.<object>}
			 * @private
			 */
			_createMapData:function( rawMapData ){
				var self=this;
				return tui.util.map(rawMapData, function( datum ){
					var coordinate=self._makeCoordinatesFromPath(datum.path),
						bound=self._findBoundFromCoordinates(coordinate),
						userData=self.dataProcessor.getValueMapDatum(datum.code),
						name, labelCoordinate, label, ratio, resultData;
					if( userData ){
						label=userData.label;
						ratio=userData.ratio;
						name=userData.name || datum.name;
						labelCoordinate=userData.labelCoordinate || datum.labelCoordinate;
					}
					resultData={
						code:datum.code,
						name:name,
						path:datum.path,
						bound:bound,
						labelPosition:self._makeLabelPosition(bound, labelCoordinate)
					};
					if( label ){
						resultData.label=label;
					}
					if( ratio ){
						resultData.ratio=ratio;
					}
					return resultData;
				});
			},
			/**
			 * Get map data.
			 * @returns {Array.<object>}
			 */
			getMapData:function(){
				if( !this.mapData ){
					this.mapData=this._createMapData(this.rawMapData);
				}
				return this.mapData;
			},
			/**
			 * Get map datum.
			 * @param {number} index - index
			 * @returns {object}
			 */
			getDatum:function( index ){
				return this.getMapData()[index];
			},
			/**
			 * Get label data.
			 * @param {number} ratio ratio
			 * @returns {Array.<{name: string, bound: {dimension: {width: number, height: number},
	     *          position: {top: number, left: number}}, labelPosition: {width: number, height: number}}>} map data
			 */
			getLabelData:function( ratio ){
				var self=this;
				var mapData=this.getMapData();
				var labelData=tui.util.filter(mapData, function( datum ){
					return self.dataProcessor.getValueMapDatum(datum.code);
				});
				return tui.util.map(labelData, function( datum ){
					return {
						name:datum.name,
						labelPosition:{
							left:datum.labelPosition.left*ratio,
							top:datum.labelPosition.top*ratio
						}
					};
				});
			},
			/**
			 * Make map dimension
			 * @returns {{width: number, height: number}} map dimension
			 * @private
			 */
			_makeMapDimension:function(){
				var mapData=this.getMapData();
				var lefts=tui.util.map(mapData, function( datum ){
					return datum.bound.position.left;
				});
				var rights=tui.util.map(mapData, function( datum ){
					return datum.bound.position.left+datum.bound.dimension.width;
				});
				var tops=tui.util.map(mapData, function( datum ){
					return datum.bound.position.top;
				});
				var bottoms=tui.util.map(mapData, function( datum ){
					return datum.bound.position.top+datum.bound.dimension.height;
				});
				return {
					width:arrayUtil.max(rights)-arrayUtil.min(lefts),
					height:arrayUtil.max(bottoms)-arrayUtil.min(tops)
				};
			},
			/**
			 * Get map dimension.
			 * @returns {{width: number, height: number}} map dimension
			 */
			getMapDimension:function(){
				if( !this.mapDimension ){
					this.mapDimension=this._makeMapDimension();
				}
				return this.mapDimension;
			}
		});
		module.exports=MapChartMapModel;
		/***/
	},
	/* 117 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Data processor for map chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var DataProcessorBase=__webpack_require__(75);
		var renderUtil=__webpack_require__(23);
		/**
		 * Raw series data.
		 * @typedef {Array.<{code: string, name: ?string, data: number}>} rawSeriesData
		 */
		/**
		 * Value map.
		 * @typedef {{value: number, label: string, name: ?string}} valueMap
		 */
		
		var MapChartDataProcessor=tui.util.defineClass(DataProcessorBase, /** @lends MapChartDataProcessor.prototype */{
			/**
			 * Data processor for map chart.
			 * @param {rawData} rawData raw data
			 * @param {string} chartType chart type
			 * @param {object} options options
			 * @constructs MapChartDataProcessor
			 * @private
			 * @extends DataProcessor
			 */
			init:function( rawData, chartType, options ){
				/**
				 * raw data
				 * @type {rawData}
				 */
				this.rawData=rawData;
				/**
				 * chart options
				 * @type {Object}
				 */
				this.options=options;
			},
			/**
			 * Update raw data.
			 * @param {{series: rawSeriesData}} rawData raw data
			 */
			initData:function( rawData ){
				this.rawData=rawData;
				/**
				 * value map
				 * @type {valueMap}
				 */
				this.valueMap=null;
			},
			/**
			 * Make value map.
			 * @returns {valueMap} value map
			 * @private
			 */
			_makeValueMap:function(){
				var rawSeriesData=this.rawData.series.map;
				var valueMap={};
				var formatFunctions=this._findFormatFunctions();
				tui.util.forEachArray(rawSeriesData, function( datum ){
					var result={
						value:datum.data,
						label:renderUtil.formatValue(datum.data, formatFunctions, 'map', 'series')
					};
					if( datum.name ){
						result.name=datum.name;
					}
					if( datum.labelCoordinate ){
						result.labelCoordinate=datum.labelCoordinate;
					}
					valueMap[datum.code]=result;
				});
				return valueMap;
			},
			/**
			 * Get value map.
			 * @returns {number} value
			 */
			getValueMap:function(){
				if( !this.valueMap ){
					this.valueMap=this._makeValueMap();
				}
				return this.valueMap;
			},
			/**
			 * Get values.
			 * @returns {Array.<number>} picked values.
			 */
			getValues:function(){
				return tui.util.pluck(this.getValueMap(), 'value');
			},
			/**
			 * Get valueMap datum.
			 * @param {string} code map code
			 * @returns {{code: string, name: string, label: number,
	     *              labelCoordinate: {x: number, y: number}}} valueMap datum
			 */
			getValueMapDatum:function( code ){
				return this.getValueMap()[code];
			},
			/**
			 * Add data ratios of map chart.
			 * @param {{min: number, max: number}} limit axis limit
			 */
			addDataRatios:function( limit ){
				var min=limit.min,
					max=limit.max-min;
				tui.util.forEach(this.getValueMap(), function( map ){
					map.ratio=(map.value-min)/max;
				});
			},
			createBaseValuesForLimit:function(){
				return this.getValues();
			},
			getLegendVisibility:function(){
				return null;
			}
		});
		module.exports=MapChartDataProcessor;
		/***/
	},
	/* 118 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Radial chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var ChartBase=__webpack_require__(18);
		var Series=__webpack_require__(61);
		var RadialChart=tui.util.defineClass(ChartBase, /** @lends RadialChart.prototype */ {
			/**
			 * className
			 * @type {string}
			 */
			className:'tui-radial-chart',
			/**
			 * Series class
			 * @type {function}
			 */
			Series:Series,
			/**
			 * Radial chart.
			 * @constructs RadialChart
			 * @extends ChartBase
			 * @param {Array.<Array>} rawData raw data
			 * @param {object} theme chart theme
			 * @param {object} options chart options
			 */
			init:function( rawData, theme, options ){
				ChartBase.call(this, {
					rawData:rawData,
					theme:theme,
					options:options,
					hasAxes:true,
					isVertical:true
				});
			},
			/**
			 * Add components
			 * @private
			 * @override
			 */
			_addComponents:function(){
				this.componentManager.register('series', {
					libType:this.options.libType,
					chartType:this.options.chartType,
					componentType:'series',
					classType:'radialSeries',
					chartBackground:this.theme.chart.background
				});
				this.componentManager.register('tooltip', this._makeTooltipData('tooltip'));
				this.componentManager.register('plot', {
					componentType:'plot',
					classType:'radialPlot'
				});
				this.componentManager.register('mouseEventDetector', {
					chartType:this.chartType,
					isVertical:true,
					allowSelect:true,
					classType:'areaTypeEventDetector'
				});
				this.componentManager.register('legend', tui.util.extend({
					seriesNames:this.seriesNames,
					chartType:this.chartType,
					classType:'legend'
				}));
				this.componentManager.register('chartExportMenu', {
					chartTitle:this.options.chart && this.options.chart.title ? this.options.chart.title.text : 'chart',
					classType:'chartExportMenu'
				});
			},
			/**
			 * Add data ratios.
			 * @private
			 * @override
			 */
			_addDataRatios:function( limitMap ){
				this.dataProcessor.addDataRatios(limitMap[this.chartType], null, this.chartType);
			},
			/**
			 * Get scale option.
			 * @returns {{xAxis: ?{valueType:string}, yAxis: ?(boolean|{valueType:string})}}
			 * @private
			 * @override
			 */
			_getScaleOption:function(){
				return {
					yAxis:{}
				};
			}
		});
		tui.util.extend(RadialChart.prototype);
		module.exports=RadialChart;
		/***/
	},
	/* 119 */
	/***/ function( module, exports, __webpack_require__ ){
		'use strict';
		var chartConst=__webpack_require__(2);
		var themeManager=__webpack_require__(8);
		var defaultTheme=__webpack_require__(9);
		themeManager.register(chartConst.DEFAULT_THEME_NAME, defaultTheme);
		/***/
	},
	/* 120 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Raphael render plugin.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var BarChart=__webpack_require__(121);
		var LineChart=__webpack_require__(123);
		var AreaChart=__webpack_require__(125);
		var PieChart=__webpack_require__(126);
		var RadialLineSeries=__webpack_require__(127);
		var CoordinateTypeChart=__webpack_require__(128);
		var BoxTypeChart=__webpack_require__(129);
		var MapChart=__webpack_require__(130);
		var MapLegend=__webpack_require__(131);
		var CircleLegend=__webpack_require__(132);
		var RadialPlot=__webpack_require__(133);
		var pluginName='raphael';
		var pluginRaphael={
			bar:BarChart,
			column:BarChart,
			line:LineChart,
			area:AreaChart,
			pie:PieChart,
			bubble:CoordinateTypeChart,
			scatter:CoordinateTypeChart,
			heatmap:BoxTypeChart,
			treemap:BoxTypeChart,
			map:MapChart,
			radial:RadialLineSeries,
			mapLegend:MapLegend,
			circleLegend:CircleLegend,
			radialPlot:RadialPlot
		};
		tui.chart.registerPlugin(pluginName, pluginRaphael);
		/***/
	},
	/* 121 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Raphael bar chart renderer.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var raphaelRenderUtil=__webpack_require__(122);
		var raphael=window.Raphael;
		var ANIMATION_DURATION=700;
		var EMPHASIS_OPACITY=1;
		var DE_EMPHASIS_OPACITY=0.3;
		var DEFAULT_LUMINANC=0.2;
		/**
		 * @classdesc RaphaelBarChart is graph renderer for bar, column chart.
		 * @class RaphaelBarChart
		 * @private
		 */
		var RaphaelBarChart=tui.util.defineClass(/** @lends RaphaelBarChart.prototype */ {
			/**
			 * Render function of bar chart
			 * @param {HTMLElement} container container element
			 * @param {{size: object, model: object, options: object, tooltipPosition: string}} data chart data
			 * @returns {object} paper raphael paper
			 */
			render:function( container, data ){
				var groupBounds=data.groupBounds,
					dimension=data.dimension,
					paper;
				if( !groupBounds ){
					return null;
				}
				this.paper=paper=raphael(container, dimension.width, dimension.height);
				this.theme=data.theme;
				this.seriesDataModel=data.seriesDataModel;
				this.chartType=data.chartType;
				this.groupBars=this._renderBars(groupBounds);
				this.groupBorders=this._renderBarBorders(groupBounds);
				this.overlay=this._renderOverlay();
				this.theme=data.theme;
				this.groupBounds=groupBounds;
				return paper;
			},
			/**
			 * Render overlay.
			 * @returns {object} raphael object
			 * @private
			 */
			_renderOverlay:function(){
				var bound={
					width:1,
					height:1,
					left:0,
					top:0
				};
				var attributes={
					'fill-opacity':0
				};
				return this._renderBar(bound, '#fff', attributes);
			},
			/**
			 * Render rect
			 * @param {{left: number, top: number, width: number, height: number}} bound bound
			 * @param {string} color series color
			 * @param {object} [attributes] - attributes
			 * @returns {object} bar rect
			 * @private
			 */
			_renderBar:function( bound, color, attributes ){
				var rect;
				if( bound.width < 0 || bound.height < 0 ){
					return null;
				}
				rect=raphaelRenderUtil.renderRect(this.paper, bound, tui.util.extend({
					fill:color,
					stroke:'none'
				}, attributes));
				return rect;
			},
			/**
			 * Render bars.
			 * @param {Array.<Array.<{left: number, top:number, width: number, height: number}>>} groupBounds bounds
			 * @returns {Array.<Array.<object>>} bars
			 * @private
			 */
			_renderBars:function( groupBounds ){
				var self=this,
					singleColors=[],
					colors=this.theme.colors,
					groupBars;
				if( (groupBounds[0].length===1) && this.theme.singleColors ){
					singleColors=this.theme.singleColors;
				}
				groupBars=tui.util.map(groupBounds, function( bounds, groupIndex ){
					var singleColor=singleColors[groupIndex];
					return tui.util.map(bounds, function( bound, index ){
						var color, rect, item;
						if( !bound ){
							return null;
						}
						item=self.seriesDataModel.getSeriesItem(groupIndex, index);
						color=singleColor || colors[index];
						rect=self._renderBar(bound.start, color);
						return {
							rect:rect,
							color:color,
							bound:bound.end,
							item:item,
							groupIndex:groupIndex,
							index:index,
							isRange:item.isRange
						};
					});
				});
				return groupBars;
			},
			/**
			 * Make rect points.
			 * @param {{left: number, top:number, width: number, height: number}} bound rect bound
			 * @returns {{
	     *      leftTop: {left: number, top: number},
	     *      rightTop: {left: number, top: number},
	     *      rightBottom: {left: number, top: number},
	     *      leftBottom: {left: number, top: number}
	     * }} rect points
			 * @private
			 */
			_makeRectPoints:function( bound ){
				return {
					leftTop:{
						left:Math.ceil(bound.left),
						top:Math.ceil(bound.top)
					},
					rightTop:{
						left:Math.ceil(bound.left+bound.width),
						top:Math.ceil(bound.top)
					},
					rightBottom:{
						left:Math.ceil(bound.left+bound.width),
						top:Math.ceil(bound.top+bound.height)
					},
					leftBottom:{
						left:Math.ceil(bound.left),
						top:Math.ceil(bound.top+bound.height)
					}
				};
			},
			/**
			 * Make top line path.
			 * @param {object} points points
			 *      @param {{left: number, top: number}} points.leftTop left top
			 *      @param {{left: number, top: number}} points.rightTop right top
			 * @param {string} chartType chart type
			 * @param {Item} item item
			 * @returns {string} top line path
			 * @private
			 */
			_makeTopLinePath:function( points, chartType, item ){
				var linePath=null,
					value=item.value,
					cloneLeftTop;
				if( chartType==='bar' || value >= 0 || item.isRange ){
					cloneLeftTop=tui.util.extend({}, points.leftTop);
					cloneLeftTop.left-=chartType==='column' || value < 0 ? 1 : 0;
					linePath=raphaelRenderUtil.makeLinePath(cloneLeftTop, points.rightTop).join(' ');
				}
				return linePath;
			},
			/**
			 * Make right line path.
			 * @param {object} points points
			 *      @param {{left: number, top: number}} points.rightTop right top
			 *      @param {{left: number, top: number}} points.rightBottom right bottom
			 * @param {string} chartType chart type
			 * @param {Item} item item
			 * @returns {string} top line path
			 * @private
			 */
			_makeRightLinePath:function( points, chartType, item ){
				var linePath=null;
				if( chartType==='column' || item.value >= 0 || item.isRange ){
					linePath=raphaelRenderUtil.makeLinePath(points.rightTop, points.rightBottom).join(' ');
				}
				return linePath;
			},
			/**
			 * Make bottom line path.
			 * @param {object} points points
			 *      @param {{left: number, top: number}} points.lefBottom left bottom
			 *      @param {{left: number, top: number}} points.rightBottom right bottom
			 * @param {string} chartType chart type
			 * @param {Item} item item
			 * @returns {string} top line path
			 * @private
			 */
			_makeBottomLinePath:function( points, chartType, item ){
				var linePath=null;
				if( chartType==='bar' || item.value < 0 || item.isRange ){
					linePath=raphaelRenderUtil.makeLinePath(points.leftBottom, points.rightBottom).join(' ');
				}
				return linePath;
			},
			/**
			 * Make left line path.
			 * @param {object} points points
			 *      @param {{left: number, top: number}} points.lefTop left top
			 *      @param {{left: number, top: number}} points.leftBottom left bottom
			 * @param {string} chartType chart type
			 * @param {Item} item item
			 * @returns {string} top line path
			 * @private
			 */
			_makeLeftLinePath:function( points, chartType, item ){
				var linePath=null;
				if( chartType==='column' || item.value < 0 || item.isRange ){
					linePath=raphaelRenderUtil.makeLinePath(points.leftTop, points.leftBottom).join(' ');
				}
				return linePath;
			},
			/**
			 * Make border lines paths.
			 * @param {{left: number, top:number, width: number, height: number}} bound rect bound
			 * @param {string} chartType chart type
			 * @param {Item} item item
			 * @returns {{top: string, right: string, bottom: string, left: string}} paths
			 * @private
			 */
			_makeBorderLinesPaths:function( bound, chartType, item ){
				var points=this._makeRectPoints(bound),
					paths={
						top:this._makeTopLinePath(points, chartType, item),
						right:this._makeRightLinePath(points, chartType, item),
						bottom:this._makeBottomLinePath(points, chartType, item),
						left:this._makeLeftLinePath(points, chartType, item)
					};
				return tui.util.filter(paths, function( path ){
					return path;
				});
			},
			/**
			 * Render border lines;
			 * @param {{left: number, top:number, width: number, height: number}} bound bar bound
			 * @param {string} borderColor border color
			 * @param {string} chartType chart type
			 * @param {Item} item item
			 * @returns {object} raphael object
			 * @private
			 */
			_renderBorderLines:function( bound, borderColor, chartType, item ){
				var self=this,
					borderLinePaths=this._makeBorderLinesPaths(bound, chartType, item),
					lines={};
				tui.util.forEach(borderLinePaths, function( path, name ){
					lines[name]=raphaelRenderUtil.renderLine(self.paper, path, borderColor, 1);
				});
				return lines;
			},
			/**
			 * Render bar borders.
			 * @param {Array.<Array.<{left: number, top:number, width: number, height: number}>>} groupBounds bounds
			 * @returns {Array.<Array.<object>>} borders
			 * @private
			 */
			_renderBarBorders:function( groupBounds ){
				var self=this,
					borderColor=this.theme.borderColor,
					groupBorders;
				if( !borderColor ){
					return null;
				}
				groupBorders=tui.util.map(groupBounds, function( bounds, groupIndex ){
					return tui.util.map(bounds, function( bound, index ){
						var seriesItem;
						if( !bound ){
							return null;
						}
						seriesItem=self.seriesDataModel.getSeriesItem(groupIndex, index);
						return self._renderBorderLines(bound.start, borderColor, self.chartType, seriesItem);
					});
				});
				return groupBorders;
			},
			/**
			 * Animate rect.
			 * @param {object} rect raphael object
			 * @param {{left: number, top:number, width: number, height: number}} bound rect bound
			 * @private
			 */
			_animateRect:function( rect, bound ){
				rect.animate({
					x:bound.left,
					y:bound.top,
					width:bound.width,
					height:bound.height
				}, ANIMATION_DURATION);
			},
			/**
			 * Animate borders.
			 * @param {Array.<object>} lines raphael objects
			 * @param {{left: number, top:number, width: number, height: number}} bound rect bound
			 * @param {string} chartType chart type
			 * @param {Item} item item
			 * @private
			 */
			_animateBorders:function( lines, bound, chartType, item ){
				var paths=this._makeBorderLinesPaths(bound, chartType, item);
				tui.util.forEach(lines, function( line, name ){
					line.animate({ path:paths[name] }, ANIMATION_DURATION);
				});
			},
			/**
			 * Animate.
			 * @param {function} onFinish finish callback function
			 */
			animate:function( onFinish ){
				var self=this,
					groupBorders=this.groupBorders || [];
				if( this.callbackTimeout ){
					clearTimeout(this.callbackTimeout);
					delete this.callbackTimeout;
				}
				raphaelRenderUtil.forEach2dArray(this.groupBars, function( bar, groupIndex, index ){
					var lines=groupBorders[groupIndex] && groupBorders[groupIndex][index];
					if( !bar ){
						return;
					}
					self._animateRect(bar.rect, bar.bound);
					if( lines ){
						self._animateBorders(lines, bar.bound, self.chartType, bar.item);
					}
				});
				if( onFinish ){
					this.callbackTimeout=setTimeout(function(){
						onFinish();
						delete self.callbackTimeout;
					}, ANIMATION_DURATION);
				}
			},
			/**
			 * Show animation.
			 * @param {{groupIndex: number, index:number}} data show info
			 */
			showAnimation:function( data ){
				var bar=this.groupBars[data.groupIndex][data.index],
					bound=bar.bound;
				this.overlay.attr({
					width:bound.width,
					height:bound.height,
					x:bound.left,
					y:bound.top,
					'fill-opacity':0.3
				});
			},
			/**
			 * Hide animation.
			 */
			hideAnimation:function(){
				this.overlay.attr({
					width:1,
					height:1,
					x:0,
					y:0,
					'fill-opacity':0
				});
			},
			/**
			 * Update rect bound
			 * @param {object} rect raphael object
			 * @param {{left: number, top: number, width: number, height: number}} bound bound
			 * @private
			 */
			_updateRectBound:function( rect, bound ){
				rect.attr({
					x:bound.left,
					y:bound.top,
					width:bound.width,
					height:bound.height
				});
			},
			/**
			 * Resize graph of bar type chart.
			 * @param {object} params parameters
			 *      @param {{width: number, height:number}} params.dimension dimension
			 *      @param {Array.<Array.<{
	     *                  left:number, top:number, width: number, height: number
	     *              }>>} params.groupBounds group bounds
			 */
			resize:function( params ){
				var self=this,
					groupBorders=this.groupBorders || [],
					dimension=params.dimension,
					groupBounds=params.groupBounds;
				this.groupBounds=groupBounds;
				this.paper.setSize(dimension.width, dimension.height);
				raphaelRenderUtil.forEach2dArray(this.groupBars, function( bar, groupIndex, index ){
					var lines, bound;
					if( !bar ){
						return;
					}
					lines=groupBorders[groupIndex] && groupBorders[groupIndex][index];
					bound=groupBounds[groupIndex][index].end;
					bar.bound=bound;
					raphaelRenderUtil.updateRectBound(bar.rect, bound);
					if( lines ){
						self._updateBordersPath(lines, bound, self.chartType, bar.item);
					}
				});
			},
			/**
			 * Change borders color.
			 * @param {Array.<object>} lines raphael objects
			 * @param {borderColor} borderColor border color
			 * @private
			 */
			_changeBordersColor:function( lines, borderColor ){
				tui.util.forEach(lines, function( line ){
					line.attr({ stroke:borderColor });
				});
			},
			/**
			 * Change bar color.
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 * @param {string} color fill color
			 * @param {?string} borderColor stroke color
			 * @private
			 */
			_changeBarColor:function( indexes, color, borderColor ){
				var bar=this.groupBars[indexes.groupIndex][indexes.index],
					lines;
				bar.rect.attr({
					fill:color
				});
				if( borderColor ){
					lines=this.groupBorders[indexes.groupIndex][indexes.index];
					this._changeBordersColor(lines, borderColor);
				}
			},
			/**
			 * Select series.
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 */
			selectSeries:function( indexes ){
				var bar=this.groupBars[indexes.groupIndex][indexes.index],
					objColor=raphael.color(bar.color),
					selectionColorTheme=this.theme.selectionColor,
					color=selectionColorTheme || raphaelRenderUtil.makeChangedLuminanceColor(objColor.hex, DEFAULT_LUMINANC),
					borderColor=this.theme.borderColor,
					objBorderColor;
				if( borderColor ){
					objBorderColor=raphael.color(borderColor);
					borderColor=raphaelRenderUtil.makeChangedLuminanceColor(objBorderColor.hex, DEFAULT_LUMINANC);
				}
				this._changeBarColor(indexes, color, borderColor);
			},
			/**
			 * Unselect series.
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 */
			unselectSeries:function( indexes ){
				var bar=this.groupBars[indexes.groupIndex][indexes.index],
					borderColor=this.theme.borderColor;
				this._changeBarColor(indexes, bar.color, borderColor);
			},
			/**
			 * Select legend.
			 * @param {?number} legendIndex legend index
			 */
			selectLegend:function( legendIndex ){
				var groupBorders=this.groupBorders || [],
					noneSelected=tui.util.isNull(legendIndex);
				raphaelRenderUtil.forEach2dArray(this.groupBars, function( bar, groupIndex, index ){
					var lines, opacity;
					if( !bar ){
						return;
					}
					lines=groupBorders[groupIndex] && groupBorders[groupIndex][index];
					opacity=(noneSelected || legendIndex===index) ? EMPHASIS_OPACITY : DE_EMPHASIS_OPACITY;
					bar.rect.attr({ 'fill-opacity':opacity });
					if( lines ){
						tui.util.forEach(lines, function( line ){
							line.attr({ 'stroke-opacity':opacity });
						});
					}
				});
			}
		});
		module.exports=RaphaelBarChart;
		/***/
	},
	/* 122 */
	/***/ function( module, exports ){
		/**
		 * @fileoverview Util for raphael rendering.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		/**
		 * Util for raphael rendering.
		 * @module raphaelRenderUtil
		 * @private
		 */
		var raphaelRenderUtil={
			/**
			 * Make line path.
			 * @memberOf module:raphaelRenderUtil
			 * @param {{top: number, left: number}} fromPos from position
			 * @param {{top: number, left: number}} toPos to position
			 * @param {number} width width
			 * @returns {string} path
			 */
			makeLinePath:function( fromPos, toPos, width ){
				var fromPoint=[fromPos.left, fromPos.top];
				var toPoint=[toPos.left, toPos.top];
				var additionalPoint;
				width=width || 1;
				additionalPoint=(width%2/2);
				tui.util.forEachArray(fromPoint, function( from, index ){
					if( from===toPoint[index] ){
						fromPoint[index]=toPoint[index]=Math.round(from)-additionalPoint;
					}
				});
				return ['M'].concat(fromPoint).concat('L').concat(toPoint);
			},
			/**
			 * Render line.
			 * @memberOf module:raphaelRenderUtil
			 * @param {object} paper raphael paper
			 * @param {string} path line path
			 * @param {string} color line color
			 * @param {number} strokeWidth stroke width
			 * @returns {object} raphael line
			 */
			renderLine:function( paper, path, color, strokeWidth ){
				var line=paper.path([path]),
					strokeStyle={
						stroke:color,
						'stroke-width':strokeWidth || 2
					};
				if( color==='transparent' ){
					strokeStyle.stroke='#fff';
					strokeStyle['stroke-opacity']=0;
				}
				line.attr(strokeStyle);
				return line;
			},
			/**
			 * Render text
			 * @param {object} paper - raphael object
			 * @param {{left: number, top: number}} pos - position
			 * @param {string} text - text
			 * @param {object} attrs - attrs
			 */
			renderText:function( paper, pos, text, attrs ){
				// for raphael's svg bug;
				// DOM에 붙지 않은 paper에 텍스트 객체 생성시 버그가 있다.
				setTimeout(function(){
					var textObj=paper.text(pos.left, pos.top, text);
					if( attrs ){
						textObj.attr(attrs);
					}
					if( attrs['dominant-baseline'] ){
						textObj.node.setAttribute('dominant-baseline', attrs['dominant-baseline']);
					}
				});
			},
			/**
			 * Render area graph.
			 * @param {object} paper raphael paper
			 * @param {string} path path
			 * @param {object} fillStyle fill style
			 *      @param {string} fillStyle.fill fill color
			 *      @param {?number} fillStyle.opacity fill opacity
			 *      @param {string} fillStyle.stroke stroke color
			 *      @param {?number} fillStyle.stroke-opacity stroke opacity
			 * @returns {Array.<object>} raphael object
			 */
			renderArea:function( paper, path, fillStyle ){
				var area=paper.path(path);
				fillStyle=tui.util.extend({
					'stroke-opacity':0
				}, fillStyle);
				area.attr(fillStyle);
				return area;
			},
			/**
			 * Render circle.
			 * @param {object} paper - raphael object
			 * @param {{left: number, top: number}} position - position
			 * @param {number} radius - radius
			 * @param {object} attributes - attributes
			 * @returns {object}
			 */
			renderCircle:function( paper, position, radius, attributes ){
				var circle=paper.circle(position.left, position.top, radius);
				if( attributes ){
					circle.attr(attributes);
				}
				return circle;
			},
			/**
			 * Render rect.
			 * @param {object} paper - raphael object
			 * @param {{left: number, top: number, width: number, height, number}} bound - bound
			 * @param {object} attributes - attributes
			 * @returns {*}
			 */
			renderRect:function( paper, bound, attributes ){
				var rect=paper.rect(bound.left, bound.top, bound.width, bound.height);
				if( attributes ){
					rect.attr(attributes);
				}
				return rect;
			},
			/**
			 * Update rect bound
			 * @param {object} rect raphael object
			 * @param {{left: number, top: number, width: number, height: number}} bound bound
			 */
			updateRectBound:function( rect, bound ){
				rect.attr({
					x:bound.left,
					y:bound.top,
					width:bound.width,
					height:bound.height
				});
			},
			/**
			 * Render items of line type chart.
			 * @param {Array.<Array.<object>>} groupItems group items
			 * @param {function} funcRenderItem function
			 */
			forEach2dArray:function( groupItems, funcRenderItem ){
				if( groupItems ){
					tui.util.forEachArray(groupItems, function( items, groupIndex ){
						tui.util.forEachArray(items, function( item, index ){
							funcRenderItem(item, groupIndex, index);
						});
					});
				}
			},
			/**
			 * Make changed luminance color.
			 * @param {string} hex hax color
			 * @param {number} lum luminance
			 * @returns {string} changed color
			 */
			makeChangedLuminanceColor:function( hex, lum ){
				var changedHex;
				hex=hex.replace('#', '');
				lum=lum || 0;
				changedHex=tui.util.map(tui.util.range(3), function( index ){
					var hd=parseInt(hex.substr(index*2, 2), 16);
					var newHd=hd+(hd*lum);
					newHd=Math.round(Math.min(Math.max(0, newHd), 255)).toString(16);
					return tui.chart.renderUtil.formatToZeroFill(newHd, 2);
				}).join('');
				return '#'+changedHex;
			}
		};
		module.exports=raphaelRenderUtil;
		/***/
	},
	/* 123 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Raphael line chart renderer.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var RaphaelLineBase=__webpack_require__(124),
			raphaelRenderUtil=__webpack_require__(122);
		var EMPHASIS_OPACITY=1;
		var DE_EMPHASIS_OPACITY=0.3;
		var LEFT_BAR_WIDTH=10;
		var ADDING_DATA_ANIMATION_DURATION=300;
		var raphael=window.Raphael;
		var RaphaelLineChart=tui.util.defineClass(RaphaelLineBase, /** @lends RaphaelLineChart.prototype */ {
			/**
			 * RaphaelLineCharts is graph renderer for line chart.
			 * @constructs RaphaelLineChart
			 * @private
			 * @private
			 * @extends RaphaelLineTypeBase
			 */
			init:function(){
				/**
				 * selected legend index
				 * @type {?number}
				 */
				this.selectedLegendIndex=null;
				/**
				 * type of chart
				 * @type {string}
				 */
				this.chartType='line';
			},
			/**
			 * Render function of line chart.
			 * @param {HTMLElement} container container
			 * @param {{groupPositions: Array.<Array>, dimension: object, theme: object, options: object}} data render data
			 * @param {object} [paper] - raphael paper
			 * @returns {object} paper raphael paper
			 */
			render:function( container, data, paper ){
				var dimension=data.dimension;
				var groupPositions=data.groupPositions;
				var theme=data.theme;
				var colors=theme.colors;
				var opacity=data.options.showDot ? 1 : 0;
				var isSpline=data.options.spline;
				var borderStyle=this.makeBorderStyle(theme.borderColor, opacity);
				var outDotStyle=this.makeOutDotStyle(opacity, borderStyle);
				var groupPaths;
				if( isSpline ){
					groupPaths=this._getSplineLinesPath(groupPositions, data.options.connectNulls);
				}else{
					groupPaths=this._getLinesPath(groupPositions, data.options.connectNulls);
				}
				paper=paper || raphael(container, 1, dimension.height);
				this.paper=paper;
				this.isSpline=isSpline;
				this.dimension=dimension;
				this.groupLines=this._renderLines(paper, groupPaths, colors);
				this.leftBar=this._renderLeftBar(dimension.height, data.chartBackground);
				this.tooltipLine=this._renderTooltipLine(paper, dimension.height);
				this.groupDots=this._renderDots(paper, groupPositions, colors, opacity);
				if( data.options.allowSelect ){
					this.selectionDot=this._makeSelectionDot(paper);
					this.selectionColor=theme.selectionColor;
				}
				this.colors=colors;
				this.borderStyle=borderStyle;
				this.outDotStyle=outDotStyle;
				this.groupPositions=groupPositions;
				this.groupPaths=groupPaths;
				this.dotOpacity=opacity;
				delete this.pivotGroupDots;
				return paper;
			},
			/**
			 * Get lines path.
			 * @param {Array.<Array.<{left: number, top: number, startTop: number}>>} groupPositions positions
			 * @param {boolean} [connectNulls] - boolean value connect nulls or not
			 * @returns {Array.<Array.<string>>} path
			 * @private
			 */
			_getLinesPath:function( groupPositions, connectNulls ){
				var self=this;
				return tui.util.map(groupPositions, function( positions ){
					return self._makeLinesPath(positions, null, connectNulls);
				});
			},
			/**
			 * Get spline lines path.
			 * @param {Array.<Array.<{left: number, top: number, startTop: number}>>} groupPositions positions
			 * @param {boolean} [connectNulls] - boolean value connect nulls or not
			 * @returns {Array} path
			 * @private
			 */
			_getSplineLinesPath:function( groupPositions, connectNulls ){
				var self=this;
				return tui.util.map(groupPositions, function( positions ){
					return self._makeSplineLinesPath(positions, connectNulls);
				});
			},
			/**
			 * Render lines.
			 * @param {object} paper raphael paper
			 * @param {Array.<Array.<string>>} groupPaths paths
			 * @param {string[]} colors line colors
			 * @param {?number} strokeWidth stroke width
			 * @returns {Array.<Array.<object>>} lines
			 * @private
			 */
			_renderLines:function( paper, groupPaths, colors, strokeWidth ){
				return tui.util.map(groupPaths, function( path, groupIndex ){
					var color=colors[groupIndex] || 'transparent';
					return raphaelRenderUtil.renderLine(paper, path.join(' '), color, strokeWidth);
				});
			},
			/**
			 * Resize graph of line chart.
			 * @param {object} params parameters
			 *      @param {{width: number, height:number}} params.dimension dimension
			 *      @param {Array.<Array.<{left:number, top:number}>>} params.groupPositions group positions
			 */
			resize:function( params ){
				var self=this,
					dimension=params.dimension,
					groupPositions=params.groupPositions;
				this.groupPositions=groupPositions;
				this.groupPaths=this.isSpline ? this._getSplineLinesPath(groupPositions) : this._getLinesPath(groupPositions);
				this.paper.setSize(dimension.width, dimension.height);
				this.tooltipLine.attr({ top:dimension.height });
				tui.util.forEachArray(this.groupPaths, function( path, groupIndex ){
					self.groupLines[groupIndex].attr({ path:path.join(' ') });
					tui.util.forEachArray(self.groupDots[groupIndex], function( item, index ){
						self._moveDot(item.endDot.dot, groupPositions[groupIndex][index]);
					});
				});
			},
			/**
			 * Select legend.
			 * @param {?number} legendIndex legend index
			 */
			selectLegend:function( legendIndex ){
				var self=this,
					noneSelected=tui.util.isNull(legendIndex);
				this.selectedLegendIndex=legendIndex;
				tui.util.forEachArray(this.groupLines, function( line, groupIndex ){
					var opacity=(noneSelected || legendIndex===groupIndex) ? EMPHASIS_OPACITY : DE_EMPHASIS_OPACITY;
					line.attr({ 'stroke-opacity':opacity });
					tui.util.forEachArray(self.groupDots[groupIndex], function( item ){
						item.opacity=opacity;
						if( self.dotOpacity ){
							item.endDot.dot.attr({ 'fill-opacity':opacity });
						}
					});
				});
			},
			/**
			 * Animate for adding data.
			 * @param {object} data - data for graph rendering
			 * @param {number} tickSize - tick size
			 * @param {Array.<Array.<object>>} groupPositions - group positions
			 * @param {boolean} [shiftingOption] - shifting option
			 */
			animateForAddingData:function( data, tickSize, groupPositions, shiftingOption ){
				var self=this;
				var isSpline=data.options.spline;
				var groupPaths=isSpline ? this._getSplineLinesPath(groupPositions) : this._getLinesPath(groupPositions);
				var additionalIndex=0;
				if( !groupPositions.length ){
					return;
				}
				if( shiftingOption ){
					this.leftBar.animate({
						width:tickSize+LEFT_BAR_WIDTH
					}, ADDING_DATA_ANIMATION_DURATION);
					additionalIndex=1;
				}
				tui.util.forEachArray(this.groupLines, function( line, groupIndex ){
					var dots=self.groupDots[groupIndex];
					var groupPosition=groupPositions[groupIndex];
					if( shiftingOption ){
						self._removeFirstDot(dots);
					}
					tui.util.forEachArray(dots, function( item, index ){
						var position=groupPosition[index+additionalIndex];
						self._animateByPosition(item.endDot.dot, position);
					});
					self._animateByPath(line, groupPaths[groupIndex]);
				});
			}
		});
		module.exports=RaphaelLineChart;
		/***/
	},
	/* 124 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview RaphaelLineTypeBase is base class for line type renderer.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var raphaelRenderUtil=__webpack_require__(122);
		var ANIMATION_DURATION=700;
		var DEFAULT_DOT_RADIUS=3;
		var HOVER_DOT_RADIUS=4;
		var SELECTION_DOT_RADIUS=7;
		var DE_EMPHASIS_OPACITY=0.3;
		var MOVING_ANIMATION_DURATION=300;
		var LEFT_BAR_WIDTH=10;
		var concat=Array.prototype.concat;
		/**
		 * @classdesc RaphaelLineTypeBase is base for line type renderer.
		 * @class RaphaelLineTypeBase
		 * @private
		 */
		var RaphaelLineTypeBase=tui.util.defineClass(/** @lends RaphaelLineTypeBase.prototype */ {
			/**
			 * Render left bar for hiding overflow graph.
			 * @param {number} height - area height
			 * @param {string} chartBackground - background style of chart
			 * @private
			 * @returns {object}
			 */
			_renderLeftBar:function( height, chartBackground ){
				var bound={
					left:0,
					top:0,
					width:LEFT_BAR_WIDTH,
					height:height
				};
				return raphaelRenderUtil.renderRect(this.paper, bound, {
					fill:chartBackground,
					stroke:'none'
				});
			},
			/**
			 * Make lines path.
			 * @param {Array.<{left: number, top: number, startTop: number}>} positions positions
			 * @param {?string} [posTopType='top'] position top type
			 * @param {boolean} [connectNulls] - boolean value connect nulls or not
			 * @returns {Array.<string | number>} paths
			 * @private
			 */
			_makeLinesPath:function( positions, posTopType, connectNulls ){
				var path=[];
				var prevMissing=false;
				posTopType=posTopType || 'top';
				tui.util.map(positions, function( position ){
					var pathCommand=(prevMissing && !connectNulls) ? 'M' : 'L';
					if( position ){
						path.push([pathCommand, position.left, position[posTopType]]);
						if( prevMissing ){
							prevMissing=false;
						}
					}else{
						prevMissing=true;
					}
				});
				path=concat.apply([], path);
				path[0]='M';
				return path;
			},
			/**
			 * Get anchor. (http://raphaeljs.com/analytics.js)
			 * @param {{left: number, top: number}} fromPos from position
			 * @param {{left: number, top: number}} pos position
			 * @param {{left: number, top: number}} nextPos next position
			 * @returns {{x1: number, y1: number, x2: number, y2: number}} anchor
			 * @private
			 */
			_getAnchor:function( fromPos, pos, nextPos ){
				var l1=(pos.left-fromPos.left)/2,
					l2=(nextPos.left-pos.left)/2,
					a=Math.atan((pos.left-fromPos.left)/Math.abs(pos.top-fromPos.top)),
					b=Math.atan((nextPos.left-pos.left)/Math.abs(pos.top-nextPos.top)),
					alpha, dx1, dy1, dx2, dy2;
				a=fromPos.top < pos.top ? Math.PI-a : a;
				b=nextPos.top < pos.top ? Math.PI-b : b;
				alpha=(Math.PI/2)-(((a+b)%(Math.PI*2))/2);
				dx1=l1*Math.sin(alpha+a);
				dy1=l1*Math.cos(alpha+a);
				dx2=l2*Math.sin(alpha+b);
				dy2=l2*Math.cos(alpha+b);
				return {
					x1:pos.left-dx1,
					y1:pos.top+dy1,
					x2:pos.left+dx2,
					y2:pos.top+dy2
				};
			},
			/**
			 * Get spline positions groups which is divided with null data value.
			 * If series has not divided positions, it returns only one positions group.
			 * @param {Array.<object>} positions positions array
			 * @param {boolean} connectNulls option of connect line of both null data's side
			 * @returns {Array.<Array.<object>>}
			 * @private
			 */
			_getSplinePositionsGroups:function( positions, connectNulls ){
				var positionsGroups=[];
				var positionsGroup=[];
				tui.util.forEach(positions, function( position, index ){
					var isLastIndex=index===positions.length-1;
					if( position ){
						positionsGroup.push(position);
					}
					if( (!position && positionsGroup.length > 0 && !connectNulls) || isLastIndex ){
						positionsGroups.push(positionsGroup);
						positionsGroup=[];
					}
				});
				return positionsGroups;
			},
			/**
			 * Get spline partial paths
			 * @param {Array.<Array.<object>>} positionsGroups positions groups
			 * @returns {Array.<Array.<Array>>}
			 * @private
			 */
			_getSplinePartialPaths:function( positionsGroups ){
				var self=this;
				var paths=[];
				var firstPos, lastPos, positionsLen, fromPos, middlePositions, path;
				tui.util.forEach(positionsGroups, function( dataPositions ){
					firstPos=dataPositions[0];
					positionsLen=dataPositions.length;
					fromPos=firstPos;
					lastPos=dataPositions[positionsLen-1];
					middlePositions=dataPositions.slice(1).slice(0, positionsLen-2);
					path=tui.util.map(middlePositions, function( position, index ){
						var nextPos=dataPositions[index+2];
						var anchor=self._getAnchor(fromPos, position, nextPos);
						fromPos=position;
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
			 * @param {boolean} [connectNulls] - boolean value connect nulls or not
			 * @returns {Array.<string | number>} paths
			 * @private
			 */
			_makeSplineLinesPath:function( positions, connectNulls ){
				var path=[];
				var positionsGroups=this._getSplinePositionsGroups(positions, connectNulls);
				var partialPaths=this._getSplinePartialPaths(positionsGroups);
				tui.util.forEach(partialPaths, function( partialPath ){
					path=path.concat(partialPath);
				});
				return path;
			},
			/**
			 * Render tooltip line.
			 * @param {object} paper raphael paper
			 * @param {number} height height
			 * @returns {object} raphael object
			 * @private
			 */
			_renderTooltipLine:function( paper, height ){
				var linePath=raphaelRenderUtil.makeLinePath({
					left:10,
					top:height
				}, {
					left:10,
					top:0
				});
				return raphaelRenderUtil.renderLine(paper, linePath, 'transparent', 1);
			},
			/**
			 * Make border style.
			 * @param {string} borderColor border color
			 * @param {number} opacity opacity
			 * @returns {{stroke: string, stroke-width: number, strike-opacity: number}} border style
			 */
			makeBorderStyle:function( borderColor, opacity ){
				var borderStyle;
				if( borderColor ){
					borderStyle={
						stroke:borderColor,
						'stroke-width':1,
						'stroke-opacity':opacity
					};
				}
				return borderStyle;
			},
			/**
			 * Make dot style for mouseout event.
			 * @param {number} opacity opacity
			 * @param {object} borderStyle border style
			 * @returns {{fill-opacity: number, stroke-opacity: number, r: number}} style
			 */
			makeOutDotStyle:function( opacity, borderStyle ){
				var outDotStyle={
					'fill-opacity':opacity,
					'stroke-opacity':0,
					r:DEFAULT_DOT_RADIUS
				};
				if( borderStyle ){
					tui.util.extend(outDotStyle, borderStyle);
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
			renderDot:function( paper, position, color, opacity ){
				var dot, dotStyle, raphaelDot;
				if( position ){
					dot=paper.circle(position.left, position.top, DEFAULT_DOT_RADIUS);
					dotStyle={
						fill:color,
						'fill-opacity':opacity,
						'stroke-opacity':0
					};
					dot.attr(dotStyle);
					raphaelDot={
						dot:dot,
						color:color
					};
				}
				return raphaelDot;
			},
			/**
			 * Move dots to front.
			 * @param {Array.<{startDot: {dot: object}, endDot: {dot: object}}>} dots - dots
			 * @private
			 */
			_moveDotsToFront:function( dots ){
				raphaelRenderUtil.forEach2dArray(dots, function( dotInfo ){
					dotInfo.endDot.dot.toFront();
					if( dotInfo.startDot ){
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
			 * @returns {Array.<object>} dots
			 * @private
			 */
			_renderDots:function( paper, groupPositions, colors, opacity ){
				var self=this;
				var dots;
				// 기존에 캐싱된 dot을 다른 도형에 의해 가려지지 않게 하기 위해 제일 앞으로 이동시킴
				if( paper.dots ){
					this._moveDotsToFront(paper.dots);
				}
				dots=tui.util.map(groupPositions, function( positions, groupIndex ){
					var color=colors[groupIndex];
					return tui.util.map(positions, function( position ){
						var dotMap={
							endDot:self.renderDot(paper, position, color, opacity)
						};
						var startPosition;
						if( self.hasRangeData ){
							startPosition=tui.util.extend({}, position);
							startPosition.top=startPosition.startTop;
							dotMap.startDot=self.renderDot(paper, startPosition, color, opacity);
						}
						return dotMap;
					});
				});
				if( !paper.dots ){
					paper.dots=[];
				}
				// 다른 그래프 렌더링 시 앞으로 이동시키기 위해 paper에 캐싱함
				paper.dots=paper.dots.concat(dots);
				return dots;
			},
			/**
			 * Get center position
			 * @param {{left: number, top: number}} fromPos from position
			 * @param {{left: number, top: number}} toPos to position
			 * @returns {{left: number, top: number}} position
			 * @private
			 */
			_getCenter:function( fromPos, toPos ){
				return {
					left:(fromPos.left+toPos.left)/2,
					top:(fromPos.top+toPos.top)/2
				};
			},
			/**
			 * Show dot.
			 * @param {object} dot raphael object
			 * @private
			 */
			_showDot:function( dot ){
				dot.attr({
					'fill-opacity':1,
					'stroke-opacity':0.3,
					'stroke-width':2,
					r:HOVER_DOT_RADIUS
				});
			},
			/**
			 * Update line stroke width.
			 * @param {object} line raphael object
			 * @param {number} strokeWidth stroke width
			 * @private
			 */
			_updateLineStrokeWidth:function( line, strokeWidth ){
				line.attr({
					'stroke-width':strokeWidth
				});
			},
			/**
			 * Show animation.
			 * @param {{groupIndex: number, index:number}} data show info
			 */
			showAnimation:function( data ){
				var index=data.groupIndex; // Line chart has pivot values.
				var groupIndex=data.index;
				var line=this.groupLines ? this.groupLines[groupIndex] : this.groupAreas[groupIndex];
				var item=this.groupDots[groupIndex][index];
				var strokeWidth, startLine;
				if( !item ){
					return;
				}
				if( this.chartType==='area' ){
					strokeWidth=2;
					startLine=line.startLine;
					line=line.line;
				}else{
					strokeWidth=3;
				}
				this._updateLineStrokeWidth(line, strokeWidth);
				if( startLine ){
					this._updateLineStrokeWidth(startLine, strokeWidth);
				}
				this._showDot(item.endDot.dot);
				if( item.startDot ){
					this._showDot(item.startDot.dot);
				}
			},
			/**
			 * Get pivot group dots.
			 * @returns {Array.<Array>} dots
			 * @private
			 */
			_getPivotGroupDots:function(){
				if( !this.pivotGroupDots && this.groupDots ){
					this.pivotGroupDots=tui.chart.arrayUtil.pivot(this.groupDots);
				}
				return this.pivotGroupDots;
			},
			/**
			 * Show group dots.
			 * @param {number} index index
			 * @private
			 */
			_showGroupDots:function( index ){
				var self=this;
				var groupDots=this._getPivotGroupDots();
				if( !groupDots || !groupDots[index] ){
					return;
				}
				tui.util.forEachArray(groupDots[index], function( item ){
					if( item.endDot ){
						self._showDot(item.endDot.dot);
					}
					if( item.startDot ){
						self._showDot(item.startDot.dot);
					}
				});
			},
			/**
			 * Show line for group tooltip.
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      position: {left: number, top: number}
	     * }} bound bound
			 */
			showGroupTooltipLine:function( bound ){
				var left=Math.max(bound.position.left, 11);
				var linePath=raphaelRenderUtil.makeLinePath({
					left:left,
					top:bound.position.top+bound.dimension.height
				}, {
					left:left,
					top:bound.position.top
				});
				this.tooltipLine.attr({
					path:linePath,
					stroke:'#999',
					'stroke-opacity':1
				});
			},
			/**
			 * Show group animation.
			 * @param {number} index index
			 */
			showGroupAnimation:function( index ){
				this._showGroupDots(index);
			},
			/**
			 * Hide dot.
			 * @param {object} dot raphael object
			 * @param {?number} opacity opacity
			 * @private
			 */
			_hideDot:function( dot, opacity ){
				var outDotStyle=this.outDotStyle;
				if( !tui.util.isUndefined(opacity) ){
					outDotStyle=tui.util.extend({}, this.outDotStyle, {
						'fill-opacity':opacity
					});
				}
				dot.attr(outDotStyle);
			},
			/**
			 * Hide animation.
			 * @param {{groupIndex: number, index:number}} data hide info
			 */
			hideAnimation:function( data ){
				var index=data.groupIndex; // Line chart has pivot values.
				var groupIndex=data.index;
				var opacity=this.dotOpacity;
				var groupDot=this.groupDots[groupIndex];
				var line, item, strokeWidth, startLine;
				if( !groupDot || !groupDot[index] ){
					return;
				}
				line=this.groupLines ? this.groupLines[groupIndex] : this.groupAreas[groupIndex];
				item=groupDot[index];
				if( this.chartType==='area' ){
					strokeWidth=1;
					startLine=line.startLine;
					line=line.line;
				}else{
					strokeWidth=2;
				}
				if( opacity && !tui.util.isNull(this.selectedLegendIndex) && this.selectedLegendIndex!==groupIndex ){
					opacity=DE_EMPHASIS_OPACITY;
				}
				if( line ){
					this._updateLineStrokeWidth(line, strokeWidth);
				}
				if( startLine ){
					this._updateLineStrokeWidth(startLine, strokeWidth);
				}
				if( item ){
					this._hideDot(item.endDot.dot, opacity);
					if( item.startDot ){
						this._hideDot(item.startDot.dot, opacity);
					}
				}
			},
			/**
			 * Hide group dots.
			 * @param {number} index index
			 * @private
			 */
			_hideGroupDots:function( index ){
				var self=this;
				var hasSelectedIndex=!tui.util.isNull(this.selectedLegendIndex);
				var baseOpacity=this.dotOpacity;
				var groupDots=this._getPivotGroupDots();
				if( !groupDots || !groupDots[index] ){
					return;
				}
				tui.util.forEachArray(groupDots[index], function( item, groupIndex ){
					var opacity=baseOpacity;
					if( opacity && hasSelectedIndex && self.selectedLegendIndex!==groupIndex ){
						opacity=DE_EMPHASIS_OPACITY;
					}
					if( item.endDot ){
						self._hideDot(item.endDot.dot, opacity);
					}
					if( item.startDot ){
						self._hideDot(item.startDot.dot, opacity);
					}
				});
			},
			/**
			 * Hide line for group tooltip.
			 */
			hideGroupTooltipLine:function(){
				this.tooltipLine.attr({
					'stroke-opacity':0
				});
			},
			/**
			 * Hide group animation.
			 * @param {number} index index
			 */
			hideGroupAnimation:function( index ){
				this._hideGroupDots(index);
			},
			/**
			 * Move dot.
			 * @param {object} dot - raphael object
			 * @param {{left: number, top: number}} position - position
			 * @private
			 */
			_moveDot:function( dot, position ){
				var dotAttrs={
					cx:position.left,
					cy:position.top
				};
				if( this.dotOpacity ){
					dotAttrs=tui.util.extend({ 'fill-opacity':this.dotOpacity }, dotAttrs, this.borderStyle);
				}
				dot.attr(dotAttrs);
			},
			/**
			 * Show graph for zoom.
			 */
			showGraph:function(){
				this.paper.setSize(this.dimension.width, this.dimension.height);
			},
			/**
			 * Animate.
			 * @param {function} onFinish callback
			 */
			animate:function( onFinish ){
				var self=this;
				var seriesWidth, seriesHeight;
				if( this.dimension ){
					seriesWidth=this.dimension.width;
					seriesHeight=this.dimension.height;
					tui.chart.renderUtil.cancelAnimation(this.animation);
					this.animation=tui.chart.renderUtil.startAnimation(ANIMATION_DURATION, function( ratio ){
						var width=Math.min(seriesWidth*ratio, seriesWidth);
						self.paper.setSize(width, seriesHeight);
						if( ratio===1 ){
							onFinish();
						}
					});
				}
			},
			/**
			 * Make selection dot.
			 * @param {object} paper raphael paper
			 * @returns {object} selection dot
			 * @private
			 */
			_makeSelectionDot:function( paper ){
				var selectionDot=paper.circle(0, 0, SELECTION_DOT_RADIUS);
				selectionDot.attr({
					'fill':'#ffffff',
					'fill-opacity':0,
					'stroke-opacity':0,
					'stroke-width':2
				});
				return selectionDot;
			},
			/**
			 * Select series.
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 */
			selectSeries:function( indexes ){
				var item=this.groupDots[indexes.index][indexes.groupIndex],
					position=this.groupPositions[indexes.index][indexes.groupIndex];
				this.selectedItem=item;
				this.selectionDot.attr({
					cx:position.left,
					cy:position.top,
					'fill-opacity':0.5,
					'stroke-opacity':1,
					stroke:this.selectionColor || item.endDot.color
				});
				if( this.selectionStartDot ){
					this.selectionStartDot.attr({
						cx:position.left,
						cy:position.startTop,
						'fill-opacity':0.5,
						'stroke-opacity':1,
						stroke:this.selectionColor || item.startDot.color
					});
				}
			},
			/**
			 * Unselect series.
			 * @param {{groupIndex: number, index: number}} indexes indexes
			 */
			unselectSeries:function( indexes ){
				var item=this.groupDots[indexes.index][indexes.groupIndex];
				if( this.selectedItem===item ){
					this.selectionDot.attr({
						'fill-opacity':0,
						'stroke-opacity':0
					});
				}
				if( this.selectionStartDot ){
					this.selectionStartDot.attr({
						'fill-opacity':0,
						'stroke-opacity':0
					});
				}
			},
			/**
			 * Set width or height of paper.
			 * @param {number} width - width
			 * @param {number} height - height
			 */
			setSize:function( width, height ){
				width=width || this.dimension.width;
				height=height || this.dimension.height;
				this.paper.setSize(width, height);
			},
			/**
			 * Animate by position.
			 * @param {object} raphaelObj - raphael object
			 * @param {{left: number, top: number}} position - position
			 * @private
			 */
			_animateByPosition:function( raphaelObj, position ){
				raphaelObj.animate({
					cx:position.left,
					cy:position.top
				}, MOVING_ANIMATION_DURATION);
			},
			/**
			 * Animate by path.
			 * @param {object} raphaelObj - raphael object
			 * @param {Array.<string | number>} paths - paths
			 * @private
			 */
			_animateByPath:function( raphaelObj, paths ){
				raphaelObj.animate({
					path:paths.join(' ')
				}, MOVING_ANIMATION_DURATION);
			},
			/**
			 * Remove first dot.
			 * @param {Array.<object>} dots - dots
			 * @private
			 */
			_removeFirstDot:function( dots ){
				var firstDot=dots.shift();
				firstDot.endDot.dot.remove();
				if( firstDot.startDot ){
					firstDot.startDot.dot.remove();
				}
			},
			/**
			 * Clear paper.
			 */
			clear:function(){
				delete this.paper.dots;
				this.paper.clear();
			}
		});
		module.exports=RaphaelLineTypeBase;
		/***/
	},
	/* 125 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Raphael area chart renderer.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var RaphaelLineBase=__webpack_require__(124);
		var raphaelRenderUtil=__webpack_require__(122);
		var EMPHASIS_OPACITY=1;
		var DE_EMPHASIS_OPACITY=0.3;
		var LEFT_BAR_WIDTH=10;
		var ADDING_DATA_ANIMATION_DURATION=300;
		var raphael=window.Raphael;
		var concat=Array.prototype.concat;
		var RaphaelAreaChart=tui.util.defineClass(RaphaelLineBase, /** @lends RaphaelAreaChart.prototype */ {
			/**
			 * RaphaelAreaChart is graph renderer for area chart.
			 * @constructs RaphaelAreaChart
			 * @private
			 * @private
			 * @extends RaphaelLineTypeBase
			 */
			init:function(){
				/**
				 * selected legend index
				 * @type {?number}
				 */
				this.selectedLegendIndex=null;
				/**
				 * type of chart
				 * @type {string}
				 */
				this.chartType='area';
			},
			/**
			 * Render function of area chart.
			 * @param {HTMLElement} container container
			 * @param {{groupPositions: Array.<Array>, dimension: object, theme: object, options: object}} data render data
			 * @param {object} paper - raphael paper
			 * @returns {object}
			 */
			render:function( container, data, paper ){
				var dimension=data.dimension;
				var groupPositions=data.groupPositions;
				var theme=data.theme;
				var colors=theme.colors;
				var opacity=data.options.showDot ? 1 : 0;
				var borderStyle=this.makeBorderStyle(theme.borderColor, opacity);
				var outDotStyle=this.makeOutDotStyle(opacity, borderStyle);
				paper=paper || raphael(container, 1, dimension.height);
				this.paper=paper;
				this.isSpline=data.options.spline;
				this.dimension=dimension;
				this.zeroTop=data.zeroTop;
				this.hasRangeData=data.hasRangeData;
				this.groupPaths=this._getAreaChartPath(groupPositions, null, data.options.connectNulls);
				this.groupAreas=this._renderAreas(paper, this.groupPaths, colors);
				this.leftBar=this._renderLeftBar(dimension.height, data.chartBackground);
				this.tooltipLine=this._renderTooltipLine(paper, dimension.height);
				this.groupDots=this._renderDots(paper, groupPositions, colors, opacity);
				if( data.options.allowSelect ){
					this.selectionDot=this._makeSelectionDot(paper);
					this.selectionColor=theme.selectionColor;
					if( this.hasRangeData ){
						this.selectionStartDot=this._makeSelectionDot(paper);
					}
				}
				this.outDotStyle=outDotStyle;
				this.groupPositions=groupPositions;
				this.dotOpacity=opacity;
				this.pivotGroupDots=null;
				return paper;
			},
			/**
			 * Get path for area chart.
			 * @param {Array.<Array.<{left: number, top: number, startTop: number}>>} groupPositions - positions
			 * @param {boolean} [hasExtraPath] - whether has extra path or not
			 * @param {boolean} [connectNulls] - boolean value connect nulls or not
			 * @returns {*}
			 * @private
			 */
			_getAreaChartPath:function( groupPositions, hasExtraPath, connectNulls ){
				var path;
				if( this.isSpline ){
					path=this._makeSplineAreaChartPath(groupPositions, hasExtraPath);
				}else{
					path=this._makeAreaChartPath(groupPositions, hasExtraPath, connectNulls);
				}
				return path;
			},
			/**
			 * Render area graphs.
			 * @param {object} paper paper
			 * @param {Array.<object>} groupPaths group paths
			 * @param {Array.<string>} colors colors
			 * @returns {Array} raphael objects
			 * @private
			 */
			_renderAreas:function( paper, groupPaths, colors ){
				var groupAreas;
				colors=colors.slice(0, groupPaths.length);
				colors.reverse();
				groupPaths.reverse();
				groupAreas=tui.util.map(groupPaths, function( path, groupIndex ){
					var areaColor=colors[groupIndex] || 'transparent',
						lineColor=areaColor,
						polygons={
							area:raphaelRenderUtil.renderArea(paper, path.area.join(' '), {
								fill:areaColor,
								opacity:0.5,
								stroke:areaColor
							}),
							line:raphaelRenderUtil.renderLine(paper, path.line.join(' '), lineColor, 1)
						};
					if( path.startLine ){
						polygons.startLine=raphaelRenderUtil.renderLine(paper, path.startLine.join(' '), lineColor, 1);
					}
					return polygons;
				});
				return groupAreas.reverse();
			},
			/**
			 * Make height.
			 * @param {number} top top
			 * @param {number} startTop start top
			 * @returns {number} height
			 * @private
			 */
			_makeHeight:function( top, startTop ){
				return Math.abs(top-startTop);
			},
			/**
			 * Make areas path.
			 * @param {Array.<{left: number, top: number, startTop: number}>} positions positions
			 * @param {boolean} [hasExtraPath] - whether has extra path or not
			 * @returns {Array.<string | number>} path
			 * @private
			 */
			_makeAreasPath:function( positions, hasExtraPath ){
				var path=[];
				var paths=[];
				var prevNull=false;
				var positionLength=positions.length;
				var targetIndex;
				var formerPath=[];
				var latterPath=[];
				tui.util.forEachArray(positions, function( position, index ){
					var moveOrLine;
					if( position ){
						if( prevNull ){
							moveOrLine='M';
							prevNull=false;
						}else{
							moveOrLine='L';
						}
						formerPath.push([moveOrLine, position.left, position.top]);
						latterPath.unshift(['L', position.left, position.startTop]);
					}else{
						prevNull=true;
						latterPath.push(['z']);
					}
					if( !position || index===positionLength-1 ){
						paths.push(formerPath.concat(latterPath));
						formerPath=[];
						latterPath=[];
					}
				});
				tui.util.forEachArray(paths, function( partialPath ){
					path=path.concat(partialPath);
				});
				if( hasExtraPath!==false ){
					targetIndex=positions.length-1;
					path.splice(targetIndex+1, 0, path[targetIndex], path[targetIndex+1]);
				}
				path=concat.apply([], path);
				path[0]='M';
				return path;
			},
			/**
			 * Make path for area chart.
			 * @param {Array.<Array.<{left: number, top: number, startTop: number}>>} groupPositions positions
			 * @param {boolean} [hasExtraPath] - whether has extra path or not
			 * @param {boolean} [connectNulls] - boolean value connect nulls or not
			 * @returns {Array.<{area: Array.<string | number>, line: Array.<string | number>}>} path
			 * @private
			 */
			_makeAreaChartPath:function( groupPositions, hasExtraPath, connectNulls ){
				var self=this;
				return tui.util.map(groupPositions, function( positions ){
					var paths;
					paths={
						area:self._makeAreasPath(positions, hasExtraPath),
						line:self._makeLinesPath(positions, null, connectNulls)
					};
					if( self.hasRangeData ){
						paths.startLine=self._makeLinesPath(positions, 'startTop');
					}
					return paths;
				});
			},
			/**
			 * Make spline area bottom path.
			 * @param {Array.<{left: number, top: number}>} positions positions
			 * @returns {Array.<string | number>} spline area path
			 * @private
			 */
			_makeSplineAreaBottomPath:function( positions ){
				var self=this;
				return tui.util.map(positions, function( position ){
					return ['L', position.left, self.zeroTop];
				}).reverse();
			},
			/**
			 * Make spline path for area chart.
			 * @param {Array.<Array.<{left: number, top: number, startTop: number}>>} groupPositions positions
			 * @param {boolean} [hasExtraPath] - whether has extra path or not
			 * @returns {Array.<{area: Array.<string | number>, line: Array.<string | number>}>} path
			 * @private
			 */
			_makeSplineAreaChartPath:function( groupPositions, hasExtraPath ){
				var self=this;
				return tui.util.map(groupPositions, function( positions ){
					var linesPath=self._makeSplineLinesPath(positions);
					var areaPath=JSON.parse(JSON.stringify(linesPath));
					var areasBottomPath=self._makeSplineAreaBottomPath(positions);
					var lastPosition;
					if( hasExtraPath!==false ){
						lastPosition=positions[positions.length-1];
						areaPath.push(['L', lastPosition.left, lastPosition.top]);
						areasBottomPath.unshift(['L', lastPosition.left, self.zeroTop]);
					}
					return {
						area:areaPath.concat(areasBottomPath),
						line:linesPath
					};
				});
			},
			/**
			 * Resize graph of area chart.
			 * @param {object} params parameters
			 *      @param {{width: number, height:number}} params.dimension dimension
			 *      @param {Array.<Array.<{left:number, top:number}>>} params.groupPositions group positions
			 */
			resize:function( params ){
				var self=this,
					dimension=params.dimension,
					groupPositions=params.groupPositions;
				this.zeroTop=params.zeroTop;
				this.groupPositions=groupPositions;
				this.groupPaths=this._getAreaChartPath(groupPositions);
				this.paper.setSize(dimension.width, dimension.height);
				this.tooltipLine.attr({ top:dimension.height });
				tui.util.forEachArray(this.groupPaths, function( path, groupIndex ){
					var area=self.groupAreas[groupIndex];
					area.area.attr({ path:path.area.join(' ') });
					area.line.attr({ path:path.line.join(' ') });
					if( area.startLine ){
						area.startLine.attr({ path:path.startLine.join(' ') });
					}
					tui.util.forEachArray(self.groupDots[groupIndex], function( item, index ){
						var position=groupPositions[groupIndex][index];
						var startPositon;
						self._moveDot(item.endDot.dot, position);
						if( item.startDot ){
							startPositon=tui.util.extend({}, position);
							startPositon.top=startPositon.startTop;
							self._moveDot(item.startDot.dot, startPositon);
						}
					});
				});
			},
			/**
			 * Select legend.
			 * @param {?number} legendIndex legend index
			 */
			selectLegend:function( legendIndex ){
				var self=this,
					noneSelected=tui.util.isNull(legendIndex);
				this.selectedLegendIndex=legendIndex;
				tui.util.forEachArray(this.groupAreas, function( area, groupIndex ){
					var opacity=(noneSelected || legendIndex===groupIndex) ? EMPHASIS_OPACITY : DE_EMPHASIS_OPACITY;
					area.area.attr({ 'fill-opacity':opacity });
					area.line.attr({ 'stroke-opacity':opacity });
					if( area.startLine ){
						area.startLine.attr({ 'stroke-opacity':opacity });
					}
					tui.util.forEachArray(self.groupDots[groupIndex], function( item ){
						if( self.dotOpacity ){
							item.endDot.dot.attr({ 'fill-opacity':opacity });
							if( item.startDot ){
								item.startDot.dot.attr({ 'fill-opacity':opacity });
							}
						}
					});
				});
			},
			/**
			 * Animate for adding data.
			 * @param {object} data - data for graph rendering
			 * @param {number} tickSize - tick size
			 * @param {Array.<Array.<object>>} groupPositions - group positions
			 * @param {boolean} [shiftingOption] - shifting option
			 * @param {number} zeroTop - position top value for zero point
			 */
			animateForAddingData:function( data, tickSize, groupPositions, shiftingOption, zeroTop ){
				var self=this;
				var additionalIndex=0;
				var groupPaths;
				if( !groupPositions.length ){
					return;
				}
				this.zeroTop=zeroTop;
				groupPaths=this._getAreaChartPath(groupPositions, false);
				if( shiftingOption ){
					this.leftBar.animate({
						width:tickSize+LEFT_BAR_WIDTH
					}, ADDING_DATA_ANIMATION_DURATION);
					additionalIndex=1;
				}
				tui.util.forEachArray(this.groupAreas, function( area, groupIndex ){
					var dots=self.groupDots[groupIndex];
					var groupPosition=groupPositions[groupIndex];
					var pathMap=groupPaths[groupIndex];
					if( shiftingOption ){
						self._removeFirstDot(dots);
					}
					tui.util.forEachArray(dots, function( item, index ){
						var position=groupPosition[index+additionalIndex];
						self._animateByPosition(item.endDot.dot, position);
						if( item.startDot ){
							self._animateByPosition(item.startDot.dot, {
								left:position.left,
								top:position.startTop
							});
						}
					});
					self._animateByPath(area.area, pathMap.area);
					self._animateByPath(area.line, pathMap.line);
					if( area.startLine ){
						self._animateByPath(area.startLine, pathMap.startLine);
					}
				});
			}
		});
		module.exports=RaphaelAreaChart;
		/***/
	},
	/* 126 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview RaphaelPieCharts is graph renderer for pie chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var raphaelRenderUtil=__webpack_require__(122);
		var raphael=window.Raphael;
		var DEGREE_180=180;
		var DEGREE_360=360;
		var MIN_DEGREE=0.01;
		var RAD=Math.PI/DEGREE_180;
		var LOADING_ANIMATION_DURATION=700;
		var EMPHASIS_OPACITY=1;
		var DE_EMPHASIS_OPACITY=0.3;
		var DEFAULT_LUMINANC=0.2;
		var OVERLAY_ID='overlay';
		/**
		 * @classdesc RaphaelPieCharts is graph renderer for pie chart.
		 * @class RaphaelPieChart
		 * @private
		 */
		var RaphaelPieChart=tui.util.defineClass(/** @lends RaphaelPieChart.prototype */ {
			/**
			 * Render function of pie chart.
			 * @param {HTMLElement} container container
			 * @param {{
	     *      sectorData: Array.<object>,
	     *      circleBound: {cx: number, cy: number, r: number},
	     *      dimension: object, theme: object, options: object
	     * }} data render data
			 * @param {object} callbacks callbacks
			 *      @param {function} callbacks.showTooltip show tooltip function
			 *      @param {function} callbacks.hideTooltip hide tooltip function
			 * @returns {object} paper raphael paper
			 */
			render:function( container, data, callbacks ){
				var dimension=data.dimension;
				var paper;
				/**
				 * raphael object
				 * @type {object}
				 */
				if( data.paper ){
					this.paper=paper=data.paper;
				}else{
					this.paper=paper=raphael(container, dimension.width, dimension.height);
				}
				/**
				 * series container
				 * @type {HTMLElement}
				 */
				this.container=container;
				/**
				 * ratio for hole
				 * @type {number}
				 */
				this.holeRatio=data.options.radiusRange[0];
				/**
				 * base background
				 * @type {string}
				 */
				this.chartBackground=data.chartBackground;
				/**
				 * type of chart
				 * @type {string}
				 */
				this.chartType=data.chartType;
				/**
				 * functions for tooltip control
				 * @type {{showTooltip: Function, hideTooltip: Function}}
				 */
				this.callbacks=callbacks;
				/**
				 * color for selection
				 * @type {string}
				 */
				this.selectionColor=data.theme.selectionColor;
				/**
				 * bound for circle
				 * @type {{cx: number, cy: number, r: number}}
				 */
				this.circleBound=data.circleBound;
				/**
				 * sector attr's name for draw graph
				 * @type {string}
				 */
				this.sectorName='sector_'+this.chartType;
				this._setSectorAttr();
				this.sectorInfos=this._renderPie(data.sectorData, data.theme.colors, data.additionalIndex);
				this.overlay=this._renderOverlay();
				/**
				 * selected previous sector
				 * @type {object}
				 */
				this.prevSelectedSector=null;
				/**
				 * previous mouse position
				 * @type {{left: number, top: number}}
				 */
				this.prevPosition=null;
				/**
				 * previous hover sector
				 * @type {object}
				 */
				this.prevHoverSector=null;
				return paper;
			},
			/**
			 * Clear paper.
			 */
			clear:function(){
				this.legendLines=null;
				this.paper.clear();
			},
			/**
			 * Make sector path.
			 * @param {number} cx center x
			 * @param {number} cy center y
			 * @param {number} r radius
			 * @param {number} startAngle start angle
			 * @param {number} endAngle end angel
			 * @returns {{path: Array}} sector path
			 * @private
			 */
			_makeSectorPath:function( cx, cy, r, startAngle, endAngle ){
				var startRadian=startAngle*RAD;
				var endRadian=endAngle*RAD;
				var x1=cx+(r*Math.sin(startRadian)); // 원 호의 시작 x 좌표
				var y1=cy-(r*Math.cos(startRadian)); // 원 호의 시작 y 좌표
				var x2=cx+(r*Math.sin(endRadian)); // 원 호의 종료 x 좌표
				var y2=cy-(r*Math.cos(endRadian)); // 원 호의 종료 y 좌표
				var largeArcFlag=endAngle-startAngle > DEGREE_180 ? 1 : 0;
				var path=['M', cx, cy,
					'L', x1, y1,
					'A', r, r, 0, largeArcFlag, 1, x2, y2,
					'Z'
				];
				// path에 대한 자세한 설명은 아래 링크를 참고
				// http://www.w3schools.com/svg/svg_path.asp
				// https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/d
				return { path:path };
			},
			/**
			 * Make sector path for donut chart.
			 * @param {number} cx - center x
			 * @param {number} cy - center y
			 * @param {number} r - radius
			 * @param {number} startAngle - start angle
			 * @param {number} endAngle - end angel
			 * @param {number} [holeRadius] - hole radius
			 * @returns {{path: Array}} sector path
			 * @private
			 */
			_makeDonutSectorPath:function( cx, cy, r, startAngle, endAngle, holeRadius ){
				/* eslint max-params: [2, 6]*/
				var startRadian=startAngle*RAD;
				var endRadian=endAngle*RAD;
				var r2=holeRadius || (r*this.holeRatio); // 구멍 반지름
				var x1=cx+(r*Math.sin(startRadian));
				var y1=cy-(r*Math.cos(startRadian));
				var x2=cx+(r2*Math.sin(startRadian));
				var y2=cy-(r2*Math.cos(startRadian));
				var x3=cx+(r*Math.sin(endRadian));
				var y3=cy-(r*Math.cos(endRadian));
				var x4=cx+(r2*Math.sin(endRadian));
				var y4=cy-(r2*Math.cos(endRadian));
				var largeArcFlag=endAngle-startAngle > DEGREE_180 ? 1 : 0;
				var path=[
					'M', x1, y1,
					'A', r, r, 0, largeArcFlag, 1, x3, y3,
					'L', x4, y4,
					'A', r2, r2, 0, largeArcFlag, 0, x2, y2,
					'Z'
				];
				return { path:path };
			},
			/**
			 * Set sector attribute for raphael paper.
			 * @private
			 */
			_setSectorAttr:function(){
				var makeSectorPath;
				if( this.paper.customAttributes[this.sectorName] ){
					return;
				}
				if( this.holeRatio ){
					makeSectorPath=this._makeDonutSectorPath;
				}else{
					makeSectorPath=this._makeSectorPath;
				}
				this.paper.customAttributes[this.sectorName]=tui.util.bind(makeSectorPath, this);
			},
			/**
			 * Render overlay.
			 * @returns {object} raphael object
			 * @private
			 */
			_renderOverlay:function(){
				var params={
					paper:this.paper,
					circleBound:{
						cx:0,
						cy:0,
						r:0
					},
					angles:{
						startAngle:0,
						endAngle:0
					},
					attrs:{
						fill:'none',
						opacity:0,
						stroke:this.chartBackground,
						'stroke-width':1
					}
				};
				var inner=this._renderSector(params);
				inner.data('id', OVERLAY_ID);
				inner.data('chartType', this.chartType);
				return {
					inner:inner,
					outer:this._renderSector(params)
				};
			},
			/**
			 * Render sector
			 * @param {object} params parameters
			 *      @param {object} params.paper raphael paper
			 *      @param {{cx: number, cy: number, r:number}} params.circleBound circle bounds
			 *      @param {number} params.startAngle start angle
			 *      @param {number} params.endAngle end angle
			 *      @param {{fill: string, stroke: string, strike-width: string}} params.attrs attrs
			 * @returns {object} raphael object
			 * @private
			 */
			_renderSector:function( params ){
				var circleBound=params.circleBound;
				var angles=params.angles;
				var attrs=params.attrs;
				attrs[this.sectorName]=[circleBound.cx, circleBound.cy, circleBound.r, angles.startAngle, angles.endAngle];
				return params.paper.path().attr(attrs);
			},
			/**
			 * Render pie graph.
			 * @param {Array.<object>} sectorData - sectorData
			 * @param {Array.<string>} colors - sector colors
			 * @param {number} additionalIndex - additional index for accumulate past pie series's data indexes on pieDonutCombo
			 * @returns {Array.<object>}
			 * @private
			 */
			_renderPie:function( sectorData, colors, additionalIndex ){
				var self=this;
				var circleBound=this.circleBound;
				var chartBackground=this.chartBackground;
				var sectorInfos=[];
				tui.util.forEachArray(sectorData, function( sectorDatum, index ){
					var ratio=sectorDatum.ratio;
					var color=colors[index];
					var sector=self._renderSector({
						paper:self.paper,
						circleBound:circleBound,
						angles:sectorDatum.angles.start,
						attrs:{
							fill:chartBackground,
							stroke:chartBackground,
							'stroke-width':1
						}
					});
					sector.data('index', index);
					sector.data('legendIndex', index+additionalIndex);
					sector.data('chartType', self.chartType);
					sectorInfos.push({
						sector:sector,
						color:color,
						angles:sectorDatum.angles.end,
						ratio:ratio
					});
				});
				return sectorInfos;
			},
			/**
			 * Render legend lines.
			 * @param {Array.<object>} outerPositions outer position
			 */
			renderLegendLines:function( outerPositions ){
				var paper=this.paper,
					paths;
				if( !this.legendLines ){
					paths=this._makeLinePaths(outerPositions);
					this.legendLines=tui.util.map(paths, function( path ){
						return raphaelRenderUtil.renderLine(paper, path, 'transparent', 1);
					});
				}
			},
			/**
			 * Make line paths.
			 * @param {Array.<object>} outerPositions outer positions
			 * @returns {Array} line paths.
			 * @private
			 */
			_makeLinePaths:function( outerPositions ){
				var paths=tui.util.map(outerPositions, function( positions ){
					return [
						raphaelRenderUtil.makeLinePath(positions.start, positions.middle),
						raphaelRenderUtil.makeLinePath(positions.middle, positions.end),
						'Z'
					].join('');
				});
				return paths;
			},
			/**
			 * Show overlay.
			 * @param {number} index - index
			 * @param {number} legendIndex - legend index
			 * @private
			 */
			_showOverlay:function( index, legendIndex ){
				var overlay=this.overlay;
				var sectorInfo=this.sectorInfos[index];
				var sa=sectorInfo.angles.startAngle;
				var ea=sectorInfo.angles.endAngle;
				var cb=this.circleBound;
				var innerAttrs;
				innerAttrs={
					fill:'#fff',
					opacity:0.3
				};
				innerAttrs[this.sectorName]=[cb.cx, cb.cy, cb.r, sa, ea, cb.r*this.holeRatio];
				overlay.inner.attr(innerAttrs);
				overlay.inner.data('index', index);
				overlay.inner.data('legendIndex', legendIndex);
				overlay.outer.attr({
					path:this._makeDonutSectorPath(cb.cx, cb.cy, cb.r+10, sa, ea, cb.r).path,
					fill:sectorInfo.color,
					opacity:0.3
				});
			},
			/**
			 * Hide overlay.
			 * @private
			 */
			_hideOverlay:function(){
				var overlay=this.overlay;
				var attrs={
					fill:'none',
					opacity:0
				};
				overlay.inner.attr(attrs);
				overlay.outer.attr(attrs);
			},
			/**
			 * Animate.
			 * @param {function} callback callback
			 */
			animate:function( callback ){
				var delayTime=0;
				var sectorName=this.sectorName;
				var circleBound=this.circleBound;
				var sectorArgs=[circleBound.cx, circleBound.cy, circleBound.r];
				tui.util.forEachArray(this.sectorInfos, function( sectorInfo ){
					var angles=sectorInfo.angles;
					var attrMap={
						fill:sectorInfo.color
					};
					var animationTime=LOADING_ANIMATION_DURATION*sectorInfo.ratio;
					var anim;
					if( (angles.startAngle===0) && (angles.endAngle===DEGREE_360) ){
						angles.endAngle=DEGREE_360-MIN_DEGREE;
					}
					attrMap[sectorName]=sectorArgs.concat([angles.startAngle, angles.endAngle]);
					anim=raphael.animation(attrMap, animationTime);
					sectorInfo.sector.animate(anim.delay(delayTime));
					delayTime+=animationTime;
				});
				if( callback ){
					setTimeout(callback, delayTime);
				}
			},
			/**
			 * Animate legend lines.
			 * @param {?number} legendIndex legend index
			 */
			animateLegendLines:function( legendIndex ){
				var isNull;
				if( !this.legendLines ){
					return;
				}
				isNull=tui.util.isNull(legendIndex);
				tui.util.forEachArray(this.legendLines, function( line, index ){
					var opacity=(isNull || legendIndex===index) ? EMPHASIS_OPACITY : DE_EMPHASIS_OPACITY;
					line.animate({
						'stroke':'black',
						'stroke-opacity':opacity
					});
				});
			},
			/**
			 * Resize graph of pie chart.
			 * @param {object} params parameters
			 *      @param {{width: number, height:number}} params.dimension dimension
			 *      @param {{cx:number, cy:number, r: number}} params.circleBound circle bound
			 */
			resize:function( params ){
				var dimension=params.dimension;
				var circleBound=params.circleBound;
				var sectorName=this.sectorName;
				this.circleBound=circleBound;
				this.paper.setSize(dimension.width, dimension.height);
				tui.util.forEachArray(this.sectorInfos, function( sectorInfo ){
					var angles=sectorInfo.angles;
					var attrs={};
					attrs[sectorName]=[circleBound.cx, circleBound.cy, circleBound.r, angles.startAngle, angles.endAngle];
					sectorInfo.sector.attr(attrs);
				});
			},
			/**
			 * Move legend lines.
			 * @param {Array.<object>} outerPositions outer positions
			 */
			moveLegendLines:function( outerPositions ){
				var paths;
				if( !this.legendLines ){
					return;
				}
				paths=this._makeLinePaths(outerPositions);
				tui.util.forEachArray(this.legendLines, function( line, index ){
					line.attr({ path:paths[index] });
					return line;
				});
			},
			findSectorInfo:function( position ){
				var sector=this.paper.getElementByPoint(position.left, position.top);
				var info=null;
				if( sector ){
					info={
						legendIndex:tui.util.isExisty(sector.data('legendIndex')) ? sector.data('legendIndex') : -1,
						index:tui.util.isExisty(sector.data('index')) ? sector.data('index') : -1,
						chartType:sector.data('chartType')
					};
				}
				return info;
			},
			/**
			 * Whether changed or not.
			 * @param {{left: number, top: number}} prevPosition previous position
			 * @param {{left: number, top: number}} position position
			 * @returns {boolean} result boolean
			 * @private
			 */
			_isChangedPosition:function( prevPosition, position ){
				return !prevPosition || prevPosition.left!==position.left || prevPosition.top!==position.top;
			},
			/**
			 * Show tooltip.
			 * @param {object} sector - raphael object
			 * @param {{left: number, top: number}} position - mouse position
			 * @private
			 */
			_showTooltip:function( sector, position ){
				var containerBound=this.container.getBoundingClientRect();
				var args=[{}, 0, sector.data('index'), {
					left:position.left-containerBound.left,
					top:position.top-containerBound.top
				}];
				this.callbacks.showTooltip.apply(null, args);
			},
			/**
			 * Whether valid sector or not.
			 * @param {object} sector - raphael object
			 * @returns {boolean}
			 * @private
			 */
			_isValidSector:function( sector ){
				return sector && sector.data('chartType')===this.chartType;
			},
			/**
			 * Move mouse on series.
			 * @param {{left: number, top: number}} position mouse position
			 */
			moveMouseOnSeries:function( position ){
				var sector=this.paper.getElementByPoint(position.left, position.top);
				if( this._isValidSector(sector) ){
					if( this.prevHoverSector!==sector ){
						this._showOverlay(sector.data('index'), sector.data('legendIndex'));
						this.prevHoverSector=sector;
					}
					if( this._isChangedPosition(this.prevPosition, position) ){
						this._showTooltip(sector, position);
					}
				}else if( this.prevHoverSector ){
					this._hideOverlay();
					this.callbacks.hideTooltip();
					this.prevHoverSector=null;
				}
				this.prevPosition=position;
			},
			/**
			 * Select series.
			 * @param {{index: number}} indexes - index map
			 */
			selectSeries:function( indexes ){
				var sectorInfo=this.sectorInfos[indexes.index];
				var objColor, color;
				if( !sectorInfo ){
					return;
				}
				objColor=raphael.color(sectorInfo.color);
				color=this.selectionColor || raphaelRenderUtil.makeChangedLuminanceColor(objColor.hex, DEFAULT_LUMINANC);
				sectorInfo.sector.attr({
					fill:color
				});
			},
			/**
			 * Unelect series.
			 * @param {{index: number}} indexes - index map
			 */
			unselectSeries:function( indexes ){
				var sectorInfo=this.sectorInfos[indexes.index];
				if( !sectorInfo ){
					return;
				}
				sectorInfo.sector.attr({
					fill:sectorInfo.color
				});
			},
			/**
			 * Select legend.
			 * @param {?number} legendIndex legend index
			 */
			selectLegend:function( legendIndex ){
				var isNull=tui.util.isNull(legendIndex);
				var legendLines=this.legendLines;
				tui.util.forEachArray(this.sectorInfos, function( sectorInfo, index ){
					var opacity=(isNull || legendIndex===index) ? EMPHASIS_OPACITY : DE_EMPHASIS_OPACITY;
					sectorInfo.sector.attr({
						'fill-opacity':opacity
					});
					if( legendLines ){
						legendLines[index].attr({
							'stroke-opacity':opacity
						});
					}
				});
			}
		});
		module.exports=RaphaelPieChart;
		/***/
	},
	/* 127 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Raphael radial line series renderer.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var RaphaelLineTypeBase=__webpack_require__(124);
		var raphaelRenderUtil=__webpack_require__(122);
		var EMPHASIS_OPACITY=1;
		var DE_EMPHASIS_OPACITY=0.3;
		var raphael=window.Raphael;
		var RaphaelRadialLineSeries=tui.util.defineClass(RaphaelLineTypeBase, /** @lends RaphaelRadialLineSeries.prototype */{
			/**
			 * RaphaelLineCharts is graph renderer for line chart.
			 * @constructs RaphaelRadialLineSeries
			 * @extends RaphaelLineTypeBase
			 */
			init:function(){
				/**
				 * selected legend index
				 * @type {?number}
				 */
				this.selectedLegendIndex=null;
				/**
				 * type of chart
				 * @type {string}
				 */
				this.chartType='radial';
			},
			/**
			 * Render function of line chart.
			 * @param {HTMLElement} container container
			 * @param {{groupPositions: Array.<Array>, dimension: object, theme: object, options: object}} data render data
			 * @param {object} [paper] - raphael paper
			 * @returns {object} paper raphael paper
			 */
			render:function( container, data, paper ){
				var dimension=data.dimension;
				var groupPositions=data.groupPositions;
				var theme=data.theme;
				var colors=theme.colors;
				var dotOpacity=data.options.showDot ? 1 : 0;
				var isShowArea=data.options.showArea;
				var groupPaths=this._getLinesPath(groupPositions);
				var borderStyle=this.makeBorderStyle(theme.borderColor, dotOpacity);
				var outDotStyle=this.makeOutDotStyle(dotOpacity, borderStyle);
				paper=paper || raphael(container, 1, dimension.height);
				this.paper=paper;
				this.dimension=dimension;
				if( isShowArea ){
					this._renderArea(paper, groupPaths, colors);
				}
				this.groupLines=this._renderLines(paper, groupPaths, colors);
				this.groupDots=this._renderDots(paper, groupPositions, colors, dotOpacity);
				if( data.options.allowSelect ){
					this.selectionDot=this._makeSelectionDot(paper);
					this.selectionColor=theme.selectionColor;
				}
				this.colors=colors;
				this.borderStyle=borderStyle;
				this.outDotStyle=outDotStyle;
				this.groupPositions=groupPositions;
				this.groupPaths=groupPaths;
				this.dotOpacity=dotOpacity;
				return paper;
			},
			/**
			 * Get lines path.
			 * @param {Array.<Array.<{left: number, top: number, startTop: number}>>} groupPositions positions
			 * @returns {Array.<Array.<string>>} path
			 * @private
			 */
			_getLinesPath:function( groupPositions ){
				var self=this;
				return tui.util.map(groupPositions, function( positions ){
					return self._makeLinesPath(positions);
				});
			},
			/**
			 * Render lines.
			 * @param {object} paper raphael paper
			 * @param {Array.<Array.<string>>} groupPaths paths
			 * @param {string[]} colors line colors
			 * @param {?number} strokeWidth stroke width
			 * @returns {Array.<Array.<object>>} lines
			 * @private
			 */
			_renderLines:function( paper, groupPaths, colors, strokeWidth ){
				return tui.util.map(groupPaths, function( path, groupIndex ){
					var color=colors[groupIndex] || 'transparent';
					return raphaelRenderUtil.renderLine(paper, path.join(' '), color, strokeWidth);
				});
			},
			/**
			 * Render area.
			 * @param {object} paper raphael paper
			 * @param {Array.<Array.<string>>} groupPaths paths
			 * @param {string[]} colors line colors
			 * @returns {Array.<Array.<object>>} lines
			 * @private
			 */
			_renderArea:function( paper, groupPaths, colors ){
				return tui.util.map(groupPaths, function( path, groupIndex ){
					var color=colors[groupIndex] || 'transparent';
					return raphaelRenderUtil.renderArea(paper, path, {
						fill:color,
						opacity:0.4,
						'stroke-width':0,
						stroke:color
					});
				});
			},
			/**
			 * Resize graph of line chart.
			 * raphaelLineCharts에서 가져옴, 구조 개편시 중복 제거
			 * @param {object} params parameters
			 *      @param {{width: number, height:number}} params.dimension dimension
			 *      @param {Array.<Array.<{left:number, top:number}>>} params.groupPositions group positions
			 */
			resize:function( params ){
				var self=this,
					dimension=params.dimension,
					groupPositions=params.groupPositions;
				this.groupPositions=groupPositions;
				this.groupPaths=this._getLinesPath(groupPositions);
				this.paper.setSize(dimension.width, dimension.height);
				this.tooltipLine.attr({ top:dimension.height });
				tui.util.forEachArray(this.groupPaths, function( path, groupIndex ){
					self.groupLines[groupIndex].attr({ path:path.join(' ') });
					tui.util.forEachArray(self.groupDots[groupIndex], function( item, index ){
						self._moveDot(item.endDot.dot, groupPositions[groupIndex][index]);
					});
				});
			},
			/**
			 * Select legend.
			 * raphaelLineCharts에서 가져옴, 구조 개편시 중복 제거
			 * @param {?number} legendIndex legend index
			 */
			selectLegend:function( legendIndex ){
				var self=this,
					noneSelected=tui.util.isNull(legendIndex);
				this.selectedLegendIndex=legendIndex;
				tui.util.forEachArray(this.groupLines, function( line, groupIndex ){
					var opacity=(noneSelected || legendIndex===groupIndex) ? EMPHASIS_OPACITY : DE_EMPHASIS_OPACITY;
					line.attr({ 'stroke-opacity':opacity });
					tui.util.forEachArray(self.groupDots[groupIndex], function( item ){
						item.opacity=opacity;
						if( self.dotOpacity ){
							item.endDot.dot.attr({ 'fill-opacity':opacity });
						}
					});
				});
			}
		});
		module.exports=RaphaelRadialLineSeries;
		/***/
	},
	/* 128 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview Raphael bubble chart renderer.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var raphaelRenderUtil=__webpack_require__(122);
		var raphael=window.Raphael;
		var ANIMATION_DURATION=700;
		var CIRCLE_OPACITY=0.5;
		var STROKE_OPACITY=0.3;
		var EMPHASIS_OPACITY=0.5;
		var DE_EMPHASIS_OPACITY=0.3;
		var DEFAULT_LUMINANC=0.2;
		var OVERLAY_BORDER_WIDTH=2;
		/**
		 * bound for circle
		 * @typedef {{left: number, top: number, radius: number}} bound
		 */
		/**
		 * Information for rendered circle
		 * @typedef {{circle: object, color: string, bound: bound}} circleInfo
		 */
		/**
		 * @classdesc RaphaelBubbleChart is graph renderer for bubble chart.
		 * @class RaphaelBubbleChart
		 * @private
		 */
		var RaphaelBubbleChart=tui.util.defineClass(/** @lends RaphaelBubbleChart.prototype */ {
			/**
			 * Render function of bubble chart
			 * @param {HTMLElement} container - container element
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      seriesDataModel: SeriesDataModel,
	     *      groupBounds: Array.<Array.<bound>>,
	     *      theme: object
	     * }} data - data for rendering
			 * @param {{showTooltip: function, hideTooltip: function}} callbacks - callbacks for toggle of tooltip.
			 * @returns {object}
			 */
			render:function( container, data, callbacks ){
				var dimension=data.dimension,
					paper;
				this.paper=paper=raphael(container, dimension.width, dimension.height);
				/**
				 * container element
				 * @type {HTMLElement}
				 */
				this.container=container;
				/**
				 * theme
				 * @type {object}
				 */
				this.theme=data.theme;
				/**
				 * seriesDataModel
				 * @type {SeriesDataModel}
				 */
				this.seriesDataModel=data.seriesDataModel;
				/**
				 * group bounds
				 * @type {Array.<Array.<bound>>}
				 */
				this.groupBounds=data.groupBounds;
				/**
				 * callbacks for toggle of tooltip.
				 * @type {{showTooltip: Function, hideTooltip: Function}}
				 */
				this.callbacks=callbacks;
				/**
				 * overlay is circle object of raphael, that using for mouseover.
				 * @type {object}
				 */
				this.overlay=this._renderOverlay();
				/**
				 * two-dimensional array by circleInfo
				 * @type {Array.<Array.<circleInfo>>}
				 */
				this.groupCircleInfos=this._renderCircles();
				/**
				 * previous selected circle
				 * @type {?object}
				 */
				this.prevCircle=null;
				/**
				 * previous over circle
				 * @type {?object}
				 */
				this.prevOverCircle=null;
				/**
				 * animation timeout id
				 * @type {?number}
				 */
				this.animationTimeoutId=null;
				return paper;
			},
			/**
			 * Render overlay.
			 * @returns {object}
			 * @private
			 */
			_renderOverlay:function(){
				var position={
					left:0,
					top:0
				};
				var attribute={
					fill:'none',
					stroke:'#fff',
					'stroke-opacity':STROKE_OPACITY,
					'stroke-width':2
				};
				var circle=raphaelRenderUtil.renderCircle(this.paper, position, 0, attribute);
				return circle;
			},
			/**
			 * Render circles.
			 * @returns {Array.<Array.<circleInfo>>}
			 * @private
			 */
			_renderCircles:function(){
				var self=this;
				var colors=this.theme.colors;
				var singleColors=[];
				if( (this.groupBounds[0].length===1) && this.theme.singleColors ){
					singleColors=this.theme.singleColors;
				}
				return tui.util.map(this.groupBounds, function( bounds, groupIndex ){
					var singleColor=singleColors[groupIndex];
					return tui.util.map(bounds, function( bound, index ){
						var circleInfo=null;
						var color, circle;
						if( bound ){
							color=singleColor || colors[index];
							circle=raphaelRenderUtil.renderCircle(self.paper, bound, 0, {
								fill:color,
								opacity:0,
								stroke:'none'
							});
							circle.data('groupIndex', groupIndex);
							circle.data('index', index);
							circleInfo={
								circle:circle,
								color:color,
								bound:bound
							};
						}
						return circleInfo;
					});
				});
			},
			/**
			 * Animate circle
			 * @param {object} circle - raphael object
			 * @param {number} radius - radius of circle
			 * @private
			 */
			_animateCircle:function( circle, radius ){
				circle.animate({
					r:radius,
					opacity:CIRCLE_OPACITY
				}, ANIMATION_DURATION);
			},
			/**
			 * Animate.
			 * @param {function} onFinish - finish callback function
			 */
			animate:function( onFinish ){
				var self=this;
				if( this.animationTimeoutId ){
					clearTimeout(this.animationTimeoutId);
					this.animationTimeoutId=null;
				}
				raphaelRenderUtil.forEach2dArray(this.groupCircleInfos, function( circleInfo ){
					if( !circleInfo ){
						return;
					}
					self._animateCircle(circleInfo.circle, circleInfo.bound.radius);
				});
				if( onFinish ){
					this.animationTimeoutId=setTimeout(function(){
						onFinish();
						this.animationTimeoutId=null;
					}, ANIMATION_DURATION);
				}
			},
			/**
			 * Update circle bound
			 * @param {object} circle - raphael object
			 * @param {{left: number, top: number}} bound - bound
			 * @private
			 */
			_updatePosition:function( circle, bound ){
				circle.attr({
					cx:bound.left,
					cy:bound.top,
					r:bound.radius
				});
			},
			/**
			 * Resize graph of bubble type chart.
			 * @param {object} params parameters
			 *      @param {{width: number, height:number}} params.dimension - dimension
			 *      @param {Array.<Array.<bound>>} params.groupBounds - group bounds
			 */
			resize:function( params ){
				var self=this;
				var dimension=params.dimension;
				var groupBounds=params.groupBounds;
				this.groupBounds=groupBounds;
				this.paper.setSize(dimension.width, dimension.height);
				raphaelRenderUtil.forEach2dArray(this.groupCircleInfos, function( circleInfo, groupIndex, index ){
					var bound=groupBounds[groupIndex][index];
					circleInfo.bound=bound;
					self._updatePosition(circleInfo.circle, bound);
				});
			},
			/**
			 * Find data indexes of rendered circle by position.
			 * @param {{left: number, top: number}} position - mouse position
			 * @returns {{index: number, groupIndex: number}}
			 */
			findIndexes:function( position ){
				var circle=this.paper.getElementByPoint(position.left, position.top);
				var foundIndexes=null;
				if( circle ){
					foundIndexes={
						index:circle.data('index'),
						groupIndex:circle.data('groupIndex')
					};
				}
				return foundIndexes;
			},
			/**
			 * Whether changed or not.
			 * @param {{left: number, top: number}} prevPosition - previous position
			 * @param {{left: number, top: number}} position - position
			 * @returns {boolean} result boolean
			 * @private
			 */
			_isChangedPosition:function( prevPosition, position ){
				return !prevPosition || prevPosition.left!==position.left || prevPosition.top!==position.top;
			},
			/**
			 * Show overlay with animation.
			 * @param {object} indexes - indexes
			 *      @param {number} indexes.groupIndex - index of circles group
			 *      @param {number} indexes.index - index of circles
			 */
			showAnimation:function( indexes ){
				var circleInfo=this.groupCircleInfos[indexes.groupIndex][indexes.index];
				var bound=circleInfo.bound;
				this.overlay.attr({
					cx:bound.left,
					cy:bound.top,
					r:bound.radius+OVERLAY_BORDER_WIDTH,
					stroke:circleInfo.color,
					opacity:1
				});
			},
			/**
			 * Hide overlay with animation.
			 * @private
			 */
			hideAnimation:function(){
				this.overlay.attr({
					cx:0,
					cy:0,
					r:0,
					opacity:0
				});
			},
			/**
			 * Find circle.
			 * @param {{left: number, top: number}} position - position
			 * @returns {?object}
			 * @private
			 */
			_findCircle:function( position ){
				var circles=[];
				var paper=this.paper;
				var foundCircle, circle;
				while( tui.util.isUndefined(foundCircle) ){
					circle=paper.getElementByPoint(position.left, position.top);
					if( circle ){
						if( circle.attrs.opacity > DE_EMPHASIS_OPACITY ){
							foundCircle=circle;
						}else{
							circles.push(circle);
							circle.hide();
						}
					}else{
						foundCircle=null;
					}
				}
				if( !foundCircle ){
					foundCircle=circles[0];
				}
				tui.util.forEachArray(circles, function( _circle ){
					_circle.show();
				});
				return foundCircle;
			},
			/**
			 * Move mouse on series.
			 * @param {{left: number, top: number}} position - mouse position
			 */
			moveMouseOnSeries:function( position ){
				var circle=this._findCircle(position);
				var containerBound, groupIndex, index, args;
				if( circle && tui.util.isExisty(circle.data('groupIndex')) ){
					containerBound=this.container.getBoundingClientRect();
					groupIndex=circle.data('groupIndex');
					index=circle.data('index');
					args=[{}, groupIndex, index, {
						left:position.left-containerBound.left,
						top:position.top-containerBound.top
					}];
					if( this._isChangedPosition(this.prevPosition, position) ){
						this.callbacks.showTooltip.apply(null, args);
						this.prevOverCircle=circle;
					}
				}else if( this.prevOverCircle ){
					this.callbacks.hideTooltip();
					this.prevOverCircle=null;
				}
				this.prevPosition=position;
			},
			/**
			 * Select series.
			 * @param {{index: number, groupIndex: number}} indexes - index map
			 */
			selectSeries:function( indexes ){
				var groupIndex=indexes.groupIndex;
				var index=indexes.index;
				var circleInfo=this.groupCircleInfos[groupIndex][index];
				var objColor=raphael.color(circleInfo.color);
				var themeColor=this.theme.selectionColor;
				var color=themeColor || raphaelRenderUtil.makeChangedLuminanceColor(objColor.hex, DEFAULT_LUMINANC);
				circleInfo.circle.attr({
					fill:color
				});
			},
			/**
			 * Unselect series.
			 * @param {{index: number, groupIndex: number}} indexes - index map
			 */
			unselectSeries:function( indexes ){
				var groupIndex=indexes.groupIndex;
				var index=indexes.index;
				var circleInfo=this.groupCircleInfos[groupIndex][index];
				circleInfo.circle.attr({
					fill:circleInfo.color
				});
			},
			/**
			 * Select legend.
			 * @param {?number} legendIndex - index of legend
			 */
			selectLegend:function( legendIndex ){
				var noneSelected=tui.util.isNull(legendIndex);
				raphaelRenderUtil.forEach2dArray(this.groupCircleInfos, function( circleInfo, groupIndex, index ){
					var opacity;
					if( !circleInfo ){
						return;
					}
					opacity=(noneSelected || legendIndex===index) ? EMPHASIS_OPACITY : DE_EMPHASIS_OPACITY;
					circleInfo.circle.attr({ opacity:opacity });
				});
			}
		});
		module.exports=RaphaelBubbleChart;
		/***/
	},
	/* 129 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview RaphaelBoxTypeChart is graph renderer for box type chart(heatmap chart, treemap chart).
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var raphaelRenderUtil=__webpack_require__(122);
		var raphael=window.Raphael;
		var ANIMATION_DURATION=100;
		var MIN_BORDER_WIDTH=1;
		var MAX_BORDER_WIDTH=3;
		/**
		 * @classdesc RaphaelBoxTypeChart is graph renderer for box type chart(heatmap chart, treemap chart).
		 * @class RaphaelBarChart
		 * @private
		 */
		var RaphaelBoxTypeChart=tui.util.defineClass(/** @lends RaphaelBoxTypeChart.prototype */ {
			/**
			 * Render function of bar chart
			 * @param {HTMLElement} container container element
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      colorSpectrum: object,
	     *      seriesDataModel: SeriesDataModel,
	     *      groupBounds: (Array.<Array.<object>>|object.<string, object>),
	     *      theme: object
	     * }} seriesData - data for graph rendering
			 * @returns {object}
			 */
			render:function( container, seriesData ){
				var dimension=seriesData.dimension;
				this.paper=raphael(container, dimension.width, dimension.height);
				/**
				 * theme
				 * @type {*|{}}
				 */
				this.theme=seriesData.theme || {};
				/**
				 * color spectrum
				 * @type {Object}
				 */
				this.colorSpectrum=seriesData.colorSpectrum;
				/**
				 *
				 */
				this.chartBackground=seriesData.chartBackground;
				/**
				 * zoomable option
				 */
				this.zoomable=seriesData.zoomable;
				/**
				 * border color for rendering box
				 * @type {string}
				 */
				this.borderColor=this.theme.borderColor || 'none';
				/**
				 * border width for rendering box
				 */
				this.borderWidth=this.theme.borderWidth;
				/**
				 * group bounds
				 * @type {Array.<Array.<object>>|object.<string, object>}
				 */
				this.groupBounds=seriesData.groupBounds;
				/**
				 * bound map
				 * @type {object.<string, {left: number, top: number, width: number, height: number}>}
				 */
				this.boundMap=seriesData.boundMap;
				this._bindGetBoundFunction();
				this._bindGetColorFunction();
				/**
				 * boxes set
				 * @type {Array.<Array.<{rect: Object, color: string}>>}
				 */
				this.boxesSet=this._renderBoxes(seriesData.seriesDataModel, seriesData.startDepth, !!seriesData.isPivot);
				return this.paper;
			},
			/**
			 * Bind _getBound private function.
			 * @private
			 */
			_bindGetBoundFunction:function(){
				if( this.boundMap ){
					this._getBound=this._getBoundFromBoundMap;
				}else{
					this._getBound=this._getBoundFromGroupBounds;
				}
			},
			/**
			 * Bind _bindGetColorFunction private function.
			 * @private
			 */
			_bindGetColorFunction:function(){
				if( this.colorSpectrum ){
					this._getColor=this._getColorFromSpectrum;
				}else if( this.zoomable ){
					this._getColor=this._getColorFromColorsWhenZoomable;
				}else{
					this._getColor=this._getColorFromColors;
				}
			},
			/**
			 * Get bound from groupBounds by indexes(groupIndex, index) of seriesItem.
			 * @param {SeriesItem} seriesItem - seriesItem
			 * @returns {{width: number, height: number, left: number, top: number}}
			 * @private
			 */
			_getBoundFromGroupBounds:function( seriesItem ){
				return this.groupBounds[seriesItem.groupIndex][seriesItem.index].end;
			},
			/**
			 * Get bound from boundMap by id of seriesItem.
			 * @param {SeriesItem} seriesItem - seriesItem
			 * @returns {{width: number, height: number, left: number, top: number}}
			 * @private
			 */
			_getBoundFromBoundMap:function( seriesItem ){
				return this.boundMap[seriesItem.id];
			},
			/**
			 * Get color from colorSpectrum by ratio of seriesItem.
			 * @param {SeriesItem} seriesItem - seriesItem
			 * @returns {string}
			 * @private
			 */
			_getColorFromSpectrum:function( seriesItem ){
				var color;
				if( !seriesItem.hasChild ){
					color=this.colorSpectrum.getColor(seriesItem.colorRatio || seriesItem.ratio) || this.chartBackground;
				}else{
					color='none';
				}
				return color;
			},
			/**
			 * Get color from colors theme by group property of seriesItem.
			 * @param {SeriesItem} seriesItem - seriesItem
			 * @returns {string}
			 * @private
			 */
			_getColorFromColors:function( seriesItem ){
				return seriesItem.hasChild ? 'none' : this.theme.colors[seriesItem.group];
			},
			/**
			 * Get color from colors theme, when zoomable option.
			 * @param {SeriesItem} seriesItem - seriesItem
			 * @param {number} startDepth - start depth
			 * @returns {string}
			 * @private
			 */
			_getColorFromColorsWhenZoomable:function( seriesItem, startDepth ){
				return (seriesItem.depth===startDepth) ? this.theme.colors[seriesItem.group] : 'none';
			},
			/**
			 * Render rect.
			 * @param {{width: number, height: number, left: number, top: number}} bound - bound
			 * @param {string} color - color
			 * @param {number} strokeWidth - stroke width
			 * @returns {object}
			 * @private
			 */
			_renderRect:function( bound, color, strokeWidth ){
				return raphaelRenderUtil.renderRect(this.paper, bound, {
					fill:color,
					stroke:this.borderColor,
					'stroke-width':strokeWidth
				});
			},
			/**
			 * Get stroke width.
			 * @param {?number} depth - depth
			 * @param {number} startDepth - start depth
			 * @returns {number}
			 * @private
			 */
			_getStrokeWidth:function( depth, startDepth ){
				var strokeWidth;
				if( this.borderWidth ){
					strokeWidth=this.borderWidth;
				}else if( tui.util.isExisty(depth) ){
					strokeWidth=Math.max(MIN_BORDER_WIDTH, MAX_BORDER_WIDTH-(depth-startDepth));
				}else{
					strokeWidth=MIN_BORDER_WIDTH;
				}
				return strokeWidth;
			},
			/**
			 * Render boxes.
			 * @param {SeriesDataModel} seriesDataModel - seriesDataModel
			 * @param {number} startDepth - start depth
			 * @param {boolean} isPivot - whether pivot or not
			 * @returns {Array.<Array.<{rect: object, color: string}>>}
			 * @private
			 */
			_renderBoxes:function( seriesDataModel, startDepth, isPivot ){
				var self=this;
				var rectToBack;
				if( this.colorSpectrum || !this.zoomable ){
					rectToBack=function( rect ){
						rect.toBack();
					};
				}else{
					rectToBack=function(){
					};
				}
				return seriesDataModel.map(function( seriesGroup, groupIndex ){
					return seriesGroup.map(function( seriesItem, index ){
						var result=null;
						var strokeWidth=self._getStrokeWidth(seriesItem.depth, startDepth);
						var bound, color;
						seriesItem.groupIndex=groupIndex;
						seriesItem.index=index;
						bound=self._getBound(seriesItem);
						if( bound ){
							color=self._getColor(seriesItem, startDepth);
							result={
								rect:self._renderRect(bound, color, strokeWidth),
								seriesItem:seriesItem,
								color:color
							};
							rectToBack(result.rect);
						}
						return result;
					});
				}, isPivot);
			},
			/**
			 * Animate changing color of box.
			 * @param {object} rect - raphael object
			 * @param {string} [color] - fill color
			 * @param {number} [opacity] - fill opacity
			 * @private
			 */
			_animateChangingColor:function( rect, color, opacity ){
				var properties={
					'fill-opacity':tui.util.isExisty(opacity) ? opacity : 1
				};
				if( color ){
					properties.fill=color;
				}
				rect.animate(properties, ANIMATION_DURATION);
			},
			/**
			 * Show animation.
			 * @param {{groupIndex: number, index:number}} indexes - index info
			 * @param {boolean} [useSpectrum] - whether use spectrum legend or not
			 * @param {number} [opacity] - fill opacity
			 */
			showAnimation:function( indexes, useSpectrum, opacity ){
				var box=this.boxesSet[indexes.groupIndex][indexes.index];
				var color;
				if( !box ){
					return;
				}
				useSpectrum=tui.util.isUndefined(useSpectrum) ? true : useSpectrum;
				color=useSpectrum ? this.theme.overColor : box.color;
				if( box.seriesItem.hasChild ){
					if( useSpectrum ){
						box.rect.attr({ 'fill-opacity':0 });
					}
					box.rect.toFront();
				}
				this._animateChangingColor(box.rect, color, opacity);
			},
			/**
			 * Hide animation.
			 * @param {{groupIndex: number, index:number}} indexes - index info
			 * @param {boolean} [useColorValue] - whether use colorValue or not
			 */
			hideAnimation:function( indexes, useColorValue ){
				var colorSpectrum=this.colorSpectrum;
				var box=this.boxesSet[indexes.groupIndex][indexes.index];
				var opacity=1;
				var color;
				if( !box ){
					return;
				}
				if( box.seriesItem.hasChild ){
					color=null;
					if( useColorValue ){
						opacity=0;
					}
				}else{
					color=box.color;
				}
				this._animateChangingColor(box.rect, color, opacity);
				setTimeout(function(){
					if( !colorSpectrum && box.seriesItem.hasChild ){
						box.rect.toBack();
					}
				}, ANIMATION_DURATION);
			},
			/**
			 * Resize.
			 * @param {{
	     *      dimension: {width: number, height: number},
	     *      groupBounds: (Array.<Array.<object>>|object.<string, object>)
	     * }} seriesData - data for graph rendering
			 */
			resize:function( seriesData ){
				var self=this;
				var dimension=seriesData.dimension;
				this.boundMap=seriesData.boundMap;
				this.groupBounds=seriesData.groupBounds;
				this.paper.setSize(dimension.width, dimension.height);
				raphaelRenderUtil.forEach2dArray(this.boxesSet, function( box, groupIndex, index ){
					var bound;
					if( !box ){
						return;
					}
					bound=self._getBound(box.seriesItem, groupIndex, index);
					if( bound ){
						raphaelRenderUtil.updateRectBound(box.rect, bound);
					}
				});
			}
		});
		module.exports=RaphaelBoxTypeChart;
		/***/
	},
	/* 130 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview RaphaelPieCharts is graph renderer for map chart.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var raphaelRenderUtil=__webpack_require__(122);
		var raphael=window.Raphael;
		var STROKE_COLOR='gray';
		var ANIMATION_DURATION=100;
		/**
		 * @classdesc RaphaelMapCharts is graph renderer for map chart.
		 * @class RaphaelMapChart
		 * @private
		 */
		var RaphaelMapChart=tui.util.defineClass(/** @lends RaphaelMapChart.prototype */ {
			/**
			 * Render function of map chart.
			 * @param {HTMLElement} container container
			 * @param {object} data data
			 *      @param {{width: number, height: number}} data.dimension series dimension
			 *      @param {Array.<{code: string, path: string}>} data.map mapData
			 *      @param {ColorSpectrum} data.colorSpectrum color model
			 * @returns {object} paper raphael paper
			 */
			render:function( container, data ){
				var dimension=data.dimension,
					mapDimension=data.mapModel.getMapDimension(),
					paper;
				this.paper=paper=raphael(container, dimension.width, dimension.height);
				this.sectors=this._renderMap(data);
				this.overColor=data.theme.overColor;
				paper.setViewBox(0, 0, mapDimension.width, mapDimension.height, false);
				return paper;
			},
			/**
			 * Render map graph.
			 * @param {object} data data
			 *      @param {{width: number, height: number}} data.dimension series dimension
			 *      @param {Array.<{code: string, path: string}>} data.map mapData
			 *      @param {ColorSpectrum} data.colorSpectrum color model
			 * @returns {Array.<{sector: object, color: string, data: object}>} rendered map information
			 * @private
			 */
			_renderMap:function( data ){
				var paper=this.paper,
					colorSpectrum=data.colorSpectrum;
				return tui.util.map(data.mapModel.getMapData(), function( datum, index ){
					var ratio=datum.ratio || 0,
						color=colorSpectrum.getColor(ratio),
						sector=raphaelRenderUtil.renderArea(paper, datum.path, {
							fill:color,
							opacity:1,
							stroke:STROKE_COLOR,
							'stroke-opacity':1
						});
					sector.data('index', index);
					return {
						sector:sector,
						color:color,
						ratio:datum.ratio
					};
				});
			},
			/**
			 * Find sector index.
			 * @param {{left: number, top: number}} position position
			 * @returns {?number} found index
			 */
			findSectorIndex:function( position ){
				var sector=this.paper.getElementByPoint(position.left, position.top),
					foundIndex=sector && sector.data('index'),
					data=!tui.util.isUndefined(foundIndex) && this.sectors[foundIndex];
				return data && !tui.util.isUndefined(data.ratio) ? foundIndex : null;
			},
			/**
			 * Change color.
			 * @param {number} index index
			 */
			changeColor:function( index ){
				var sector=this.sectors[index];
				sector.sector.animate({
					fill:this.overColor
				}, ANIMATION_DURATION);
			},
			/**
			 * Restore color.
			 * @param {number} index index
			 */
			restoreColor:function( index ){
				var sector=this.sectors[index];
				sector.sector.animate({
					fill:sector.color
				}, ANIMATION_DURATION);
			},
			/**
			 * Set size
			 * @param {{width: number, height: number}} dimension dimension
			 */
			setSize:function( dimension ){
				this.paper.setSize(dimension.width, dimension.height);
			}
		});
		module.exports=RaphaelMapChart;
		/***/
	},
	/* 131 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview RaphaelMapLegend is graph renderer for map chart legend.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var raphaelRenderUtil=__webpack_require__(122);
		var raphael=window.Raphael;
		var PADDING=10;
		/**
		 * @classdesc RaphaelMapLegend is graph renderer for map chart legend.
		 * @class RaphaelMapLegend
		 * @private
		 */
		var RaphaelMapLegend=tui.util.defineClass(/** @lends RaphaelMapLegend.prototype */ {
			/**
			 * Render function of map chart legend.
			 * @param {HTMLElement} container container
			 * @param {{width: number, height: number}} dimension legend dimension
			 * @param {ColorSpectrum} colorSpectrum map chart color model
			 * @param {boolean} isHorizontal whether horizontal legend or not
			 * @returns {object} paper raphael paper
			 */
			render:function( container, dimension, colorSpectrum, isHorizontal ){
				var paper=raphael(container, dimension.width, dimension.height);
				this._renderGradientBar(paper, dimension, colorSpectrum, isHorizontal);
				this.wedge=this._renderWedge(paper);
				return paper;
			},
			/**
			 * Render gradient bar.
			 * @param {object} paper raphael object
			 * @param {{width: number, height: number}} dimension legend dimension
			 * @param {ColorSpectrum} colorSpectrum map chart color model
			 * @param {boolean} isHorizontal whether horizontal legend or not
			 * @private
			 */
			_renderGradientBar:function( paper, dimension, colorSpectrum, isHorizontal ){
				var rectHeight=dimension.height;
				var left=0;
				var degree, bound;
				if( isHorizontal ){
					rectHeight-=PADDING;
					left=PADDING/2;
					degree=360;
					this._makeWedghPath=this._makeHorizontalWedgePath;
				}else{
					degree=270;
					this._makeWedghPath=this._makeVerticalWedgePath;
				}
				bound={
					left:left,
					top:0,
					width:dimension.width-PADDING,
					height:rectHeight
				};
				raphaelRenderUtil.renderRect(paper, bound, {
					fill:degree+'-'+colorSpectrum.start+'-'+colorSpectrum.end,
					stroke:'none'
				});
			},
			/**
			 * Render wedge.
			 * @param {object} paper raphael object
			 * @returns {object} raphael object
			 * @private
			 */
			_renderWedge:function( paper ){
				var wedge=paper.path(this.verticalBasePath).attr({
					'fill':'gray',
					stroke:'none',
					opacity:0
				});
				return wedge;
			},
			/**
			 * Vertical base path
			 * @type {Array}
			 */
			verticalBasePath:['M', 16, 6, 'L', 24, 3, 'L', 24, 9],
			/**
			 * Make vertical wedge path.
			 * @param {number} top top
			 * @returns {Array} path
			 * @private
			 */
			_makeVerticalWedgePath:function( top ){
				var path=this.verticalBasePath;
				path[2]=top;
				path[5]=top-3;
				path[8]=top+3;
				return path;
			},
			/**
			 * Horizontal base path
			 * @type {Array}
			 */
			horizontalBasePath:['M', 5, 16, 'L', 8, 24, 'L', 2, 24],
			/**
			 * Make horizontal wedge path.
			 * @param {number} left left
			 * @returns {Array} path
			 * @private
			 */
			_makeHorizontalWedgePath:function( left ){
				var path=this.horizontalBasePath;
				left+=PADDING/2;
				path[1]=left;
				path[4]=left+3;
				path[7]=left-3;
				return path;
			},
			/**
			 * Show wedge.
			 * @param {number} positionValue top
			 */
			showWedge:function( positionValue ){
				var path=this._makeWedghPath(positionValue);
				this.wedge.attr({
					path:path,
					opacity:1
				});
			},
			/**
			 * Hide wedge
			 */
			hideWedge:function(){
				this.wedge.attr({
					opacity:0
				});
			}
		});
		module.exports=RaphaelMapLegend;
		/***/
	},
	/* 132 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview RaphaelCircleLegend is graph renderer for circleLegend.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var raphaelRenderUtil=__webpack_require__(122);
		var raphael=window.Raphael;
		/**
		 * @classdesc RaphaelCircleLegend is graph renderer for circleLegend.
		 * @class RaphaelCircleLegend
		 * @private
		 */
		var RaphaelCircleLegend=tui.util.defineClass(/** @lends RaphaelCircleLegend.prototype */ {
			/**
			 * Render function of map chart legend.
			 * @param {HTMLElement} container container
			 * @param {{width: number, height: number}} dimension - dimension of circle legend area
			 * @param {number} maxRadius - pixel type maximum radius
			 * @param {Array.<number>} radiusRatios - radius ratios
			 * @returns {object} paper raphael paper
			 */
			render:function( container, dimension, maxRadius, radiusRatios ){
				var paper=raphael(container, dimension.width, dimension.height);
				this.paper=paper;
				this._renderCircles(dimension, maxRadius, radiusRatios);
				return paper;
			},
			/**
			 * Render circles.
			 * @param {{width: number, height: number}} dimension - dimension of circle legend area
			 * @param {number} maxRadius - pixel type maximum radius
			 * @param {Array.<number>} radiusRatios - radius ratios
			 * @private
			 */
			_renderCircles:function( dimension, maxRadius, radiusRatios ){
				var paper=this.paper;
				var left=dimension.width/2;
				tui.util.forEachArray(radiusRatios, function( ratio ){
					var radius=maxRadius*ratio;
					var top=(dimension.height-radius)-1;
					raphaelRenderUtil.renderCircle(paper, {
						left:left,
						top:top
					}, radius, {
						fill:'none',
						opacity:1,
						stroke:'#888',
						'stroke-width':1
					});
				});
			}
		});
		module.exports=RaphaelCircleLegend;
		/***/
	},
	/* 133 */
	/***/ function( module, exports, __webpack_require__ ){
		/**
		 * @fileoverview RaphaelRadialPlot is graph renderer for radial plot.
		 * @author NHN Ent.
		 *         FE Development Lab <dl_javascript@nhnent.com>
		 */
		
		'use strict';
		var raphaelRenderUtil=__webpack_require__(122);
		var arrayUtil=__webpack_require__(6);
		var raphael=window.Raphael;
		var STEP_TOP_ADJUSTMENT=8;
		var STEP_LEFT_ADJUSTMENT=3;
		/**
		 * @classdesc RaphaelRadialPlot is graph renderer for radial plot.
		 * @class RaphaelRadialPlot
		 * @private
		 */
		var RaphaelRadialPlot=tui.util.defineClass(/** @lends RaphaelRadialPlot.prototype */ {
			/**
			 * Render function of map chart legend.
			 * @param {object} params parameters
			 * @param {HTMLElement} params.container container
			 * @param {{width: number, height: number}} params.dimension - dimension of circle legend area
			 * @param {Array<Array>} params.plotPositions plot positions
			 * @param {object} params.labelData label data
			 * @returns {object} paper raphael paper
			 */
			render:function( params ){
				var paper=raphael(params.container, params.dimension.width, params.dimension.height);
				this.paper=paper;
				this.dimension=params.dimension;
				this.plotPositions=params.plotPositions;
				this.theme=params.theme;
				this.options=params.options;
				this.labelData=params.labelData;
				this._renderPlot();
				this._renderLabels();
				return paper;
			},
			/**
			 * Render plot component
			 * @private
			 */
			_renderPlot:function(){
				if( this.options.type==='circle' ){
					this._renderCirclePlot();
				}else{
					this._renderSpiderwebPlot();
				}
				this._renderCatergoryLines();
			},
			/**
			 * Render spider web plot
			 * @private
			 */
			_renderSpiderwebPlot:function(){
				this._renderLines(this._getLinesPath(this.plotPositions), this.theme.lineColor);
			},
			/**
			 * Render circle plot
			 * @private
			 */
			_renderCirclePlot:function(){
				var i, pos, radius;
				var plotPositions=this.plotPositions;
				var centerPoint=plotPositions[0][0];
				var strokeColor=this.theme.lineColor;
				for( i=1; i < plotPositions.length; i+=1 ){
					pos=plotPositions[i][0];
					radius=centerPoint.top-pos.top;
					raphaelRenderUtil.renderCircle(this.paper, centerPoint, radius, {
						stroke:strokeColor
					});
				}
			},
			/**
			 * Render category lines
			 * @private
			 */
			_renderCatergoryLines:function(){
				this._renderLines(this._getLinesPath(arrayUtil.pivot(this.plotPositions)), this.theme.lineColor);
			},
			/**
			 * Render labels
			 * @private
			 */
			_renderLabels:function(){
				var paper=this.paper;
				var theme=this.theme;
				var labelData=this.labelData;
				tui.util.forEachArray(labelData.category, function( item ){
					var attrs={
						fill:theme.label.color,
						'font-size':theme.label.fontSize,
						'font-family':theme.label.fontFamily,
						'text-anchor':item.position.anchor,
						'font-weight':'100',
						'dominant-baseline':'middle'
					};
					raphaelRenderUtil.renderText(paper, item.position, item.text, attrs);
				});
				tui.util.forEachArray(labelData.step, function( item ){
					var attrs={
						fill:theme.lineColor,
						'font-size':theme.label.fontSize,
						'font-family':theme.label.fontFamily,
						'text-anchor':'end',
						'font-weight':'100',
						'dominant-baseline':'middle'
					};
					item.position.top-=STEP_TOP_ADJUSTMENT;
					item.position.left-=STEP_LEFT_ADJUSTMENT;
					raphaelRenderUtil.renderText(paper, item.position, item.text, attrs);
				});
			},
			/**
			 * Render lines.
			 * @param {Array.<Array.<string>>} groupPaths paths
			 * @param {string} lineColor line color
			 * @returns {Array.<Array.<object>>} lines
			 * @private
			 */
			_renderLines:function( groupPaths, lineColor ){
				var paper=this.paper;
				return tui.util.map(groupPaths, function( path ){
					return raphaelRenderUtil.renderLine(paper, path.join(' '), lineColor, 1);
				});
			},
			/**
			 * Get lines path.
			 * raphaelLineTypeBase에서 가져옴, 구조 개선 작업시 수정필요
			 * @param {Array.<Array.<{left: number, top: number, startTop: number}>>} groupPositions positions
			 * @returns {Array.<Array.<string>>} path
			 * @private
			 */
			_getLinesPath:function( groupPositions ){
				var self=this;
				return tui.util.map(groupPositions, function( positions ){
					return self._makeLinesPath(positions);
				});
			},
			/**
			 * Make lines path.
			 * raphaelLineTypeBase에서 가져옴, 구조 개선 작업시 수정필요
			 * @param {Array.<{left: number, top: number, startTop: number}>} positions positions
			 * @param {?string} [posTopType='top'] position top type
			 * @param {boolean} [connectNulls] - boolean value connect nulls or not
			 * @returns {Array.<string | number>} paths
			 * @private
			 */
			_makeLinesPath:function( positions, posTopType, connectNulls ){
				var path=[];
				var prevMissing=false;
				posTopType=posTopType || 'top';
				tui.util.map(positions, function( position ){
					var pathCommand=(prevMissing && !connectNulls) ? 'M' : 'L';
					if( position ){
						path.push([pathCommand, position.left, position[posTopType]]);
						if( prevMissing ){
							prevMissing=false;
						}
					}else{
						prevMissing=true;
					}
				});
				path=Array.prototype.concat.apply([], path);
				path[0]='M';
				return path;
			}
		});
		module.exports=RaphaelRadialPlot;
		/***/
	}
	/******/]);