"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/index";
exports.ids = ["pages/index"];
exports.modules = {

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Index)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction Index({}) {\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        let lang = window.navigator.language;\n        if (lang === \"en-GB\") {\n            next_router__WEBPACK_IMPORTED_MODULE_1___default().replace(\"/en\");\n        } else if (lang === \"fr-FR\") {\n            next_router__WEBPACK_IMPORTED_MODULE_1___default().replace(\"/fr\");\n        } else {\n            next_router__WEBPACK_IMPORTED_MODULE_1___default().replace(\"/en\");\n        }\n    }, []);\n    return null;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFpQztBQUNEO0FBRWpCLFNBQVNFLE1BQU0sRUFBRSxFQUFFO0lBQzlCRixnREFBU0EsQ0FBQyxJQUFNO1FBQ1osSUFBSUcsT0FBT0MsT0FBT0MsU0FBUyxDQUFDQyxRQUFRO1FBQ3BDLElBQUdILFNBQVMsU0FBUztZQUNqQkYsMERBQWMsQ0FBQztRQUNuQixPQUFPLElBQUlFLFNBQVMsU0FBUztZQUN6QkYsMERBQWMsQ0FBQztRQUNuQixPQUFPO1lBQ0hBLDBEQUFjLENBQUM7UUFDbkIsQ0FBQztJQUNMLEdBQUUsRUFBRTtJQUVKLE9BQU8sSUFBSTtBQUNiLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9pbmRleC5qcz9iZWU3Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZUVmZmVjdCB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgcm91dGVyIGZyb20gXCJuZXh0L3JvdXRlclwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIEluZGV4KHt9KSB7XG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgbGV0IGxhbmcgPSB3aW5kb3cubmF2aWdhdG9yLmxhbmd1YWdlXG4gICAgICAgIGlmKGxhbmcgPT09IFwiZW4tR0JcIikge1xuICAgICAgICAgICAgcm91dGVyLnJlcGxhY2UoXCIvZW5cIilcbiAgICAgICAgfSBlbHNlIGlmIChsYW5nID09PSBcImZyLUZSXCIpIHtcbiAgICAgICAgICAgIHJvdXRlci5yZXBsYWNlKFwiL2ZyXCIpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByb3V0ZXIucmVwbGFjZShcIi9lblwiKVxuICAgICAgICB9XG4gICAgfSxbXSlcblxuICAgIHJldHVybiBudWxsXG4gIH0iXSwibmFtZXMiOlsidXNlRWZmZWN0Iiwicm91dGVyIiwiSW5kZXgiLCJsYW5nIiwid2luZG93IiwibmF2aWdhdG9yIiwibGFuZ3VhZ2UiLCJyZXBsYWNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/index.js\n");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/index.js"));
module.exports = __webpack_exports__;

})();