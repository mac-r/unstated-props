"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var unstated_1 = require("unstated");
var wrapperFunction = function (WrappedComponent, config) {
    if (config === void 0) { config = {
        root: false,
        _containerNames: [],
        _containerValues: []
    }; }
    var root = config.root, _containerNames = config._containerNames, _containerValues = config._containerValues;
    return /** @class */ (function (_super) {
        __extends(class_1, _super);
        function class_1(props) {
            var _this = _super.call(this, props) || this;
            _this.renderChildren = _this.renderChildren.bind(_this);
            _this.subscribers = _this.subscribers.bind(_this);
            return _this;
        }
        class_1.prototype.renderChildren = function () {
            var contrs = {};
            var functionArguments = arguments;
            _containerNames.forEach(function (el, i) { contrs[el] = functionArguments[i]; });
            return (React.createElement(WrappedComponent, __assign({}, this.props, { containers: contrs })));
        };
        class_1.prototype.subscribers = function () {
            return (React.createElement(unstated_1.Subscribe, { to: _containerValues }, this.renderChildren));
        };
        class_1.prototype.render = function () {
            if (root) {
                return (React.createElement(unstated_1.Provider, null, this.subscribers()));
            }
            else {
                return this.subscribers();
            }
        };
        return class_1;
    }(React.Component));
};
var connect = function (containers) {
    return function (WrappedComponent, config) {
        if (config === void 0) { config = { root: false }; }
        var _containerNames = Object.keys(containers);
        var _containerValues = Object.values(containers);
        return wrapperFunction(WrappedComponent, __assign({}, config, { _containerNames: _containerNames, _containerValues: _containerValues }));
    };
};
exports.connect = connect;
