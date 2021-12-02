"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const antd_1 = require("antd");
const react_1 = __importDefault(require("react"));
class Test extends react_1.default.Component {
    render() {
        return react_1.default.createElement(antd_1.Button, null);
    }
}
exports.Test = Test;
