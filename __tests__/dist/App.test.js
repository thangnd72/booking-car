"use strict";
/**
 * @format
 */
exports.__esModule = true;
require("react-native");
var react_1 = require("react");
var App_1 = require("../App");
// Note: import explicitly to use the types shipped with jest.
var globals_1 = require("@jest/globals");
// Note: test renderer must be required after react-native.
var react_test_renderer_1 = require("react-test-renderer");
globals_1.it('renders correctly', function () {
    react_test_renderer_1["default"].create(react_1["default"].createElement(App_1["default"], null));
});
