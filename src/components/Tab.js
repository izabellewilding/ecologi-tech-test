"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BottomTabs = exports.TopTabs = void 0;
var react_1 = __importStar(require("react"));
var styled_components_1 = __importDefault(require("styled-components"));
//1. Will need to store ID of active tab in state
//2. Switch out UI onClick
//3. Customisable label
var Container = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject([""], [""])));
var TabBar = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  display: flex;\n  justify-content: center;\n"], ["\n  display: flex;\n  justify-content: center;\n"])));
var Tab = styled_components_1.default.a(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  color: ", ";\n  border: solid 1px black;\n  padding: 0.5rem 1rem;\n  max-width: 100px;\n  text-align: center;\n  border: none;\n  background-color: transparent;\n  cursor: pointer;\n  border-bottom: ", ";\n"], ["\n  color: ", ";\n  border: solid 1px black;\n  padding: 0.5rem 1rem;\n  max-width: 100px;\n  text-align: center;\n  border: none;\n  background-color: transparent;\n  cursor: pointer;\n  border-bottom: ",
    ";\n"])), function (props) { return (props.activeTab ? "var(--primaryColor)" : "black"); }, function (props) {
    return props.activeTab ? "solid 0.2rem #258ca4" : null;
});
var TabContent = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject([""], [""])));
function useTabs(_a) {
    var tabContent = _a.tabContent;
    var _b = react_1.useState(tabContent[0]), activeTab = _b[0], setActiveTab = _b[1];
    return {
        activeTab: activeTab,
        renderTabBar: function () { return (react_1.default.createElement(TabBar, { role: "tablist" }, tabContent.map(function (tabItem) { return (react_1.default.createElement(Tab, { activeTab: activeTab.id === tabItem.id, key: tabItem.title, onClick: function () { return setActiveTab(tabItem); }, role: "tab" }, tabItem.title)); }))); },
    };
}
var TopTabs = function (props) {
    var _a = useTabs(props), renderTabBar = _a.renderTabBar, activeTab = _a.activeTab;
    return (react_1.default.createElement(Container, null,
        renderTabBar(),
        react_1.default.createElement(TabContent, null, activeTab.render())));
};
exports.TopTabs = TopTabs;
var BottomTabs = function (props) {
    var _a = useTabs(props), renderTabBar = _a.renderTabBar, activeTab = _a.activeTab;
    return (react_1.default.createElement(Container, null,
        react_1.default.createElement(TabContent, null, activeTab.render()),
        renderTabBar()));
};
exports.BottomTabs = BottomTabs;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
