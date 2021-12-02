"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@components/test");
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
const render = () => {
    react_dom_1.default.render(react_1.default.createElement(test_1.Test, null), document.querySelector('#app'));
};
render();
