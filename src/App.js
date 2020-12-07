<<<<<<< HEAD
import { useQuery, QueryCache, ReactQueryCacheProvider } from "react-query";
import Loading from "./components/Loading";
import Chart from "./components/Chart";
import styled from "styled-components";
import groupBy from "lodash.groupby";
import { ReactComponent as BrandLogo } from "./assets/ecologi.svg";

const AppContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: #e8e4df;
`;

const Header = styled.header`
  align-items: center;
  position: fixed;
  display: flex;
  width: 100%;
  height: 3rem;
  padding: 1rem;
  background-color: #03080a;
`;

const HeaderOffset = styled.div`
  padding-top: 6rem;
`;

const Logo = styled(BrandLogo)`
  height: 51px;
`;

const queryChache = new QueryCache();

function App() {
  //data fetching
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://public.ecologi.com/trees").then((res) => res.json())
  );
  if (isLoading) return <Loading loading={isLoading} />;
  if (error) return "An error has occurred: " + error.message;

  //order purchases array by createdAt date:
  //resource: https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
  const orderedByDay = data.data.sort(function (a, b) {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });

  //groups an array of ordered purchases by day (createdAt)
  //returns an object with arrays of objects
  //resource: https://lodash.com/docs/4.17.15#groupBy
  //use state to switch out the filtering
  const groupedByDay = groupBy(orderedByDay, (item) => {
    return item.createdAt.split("T")[0];
  });

  //add total purchases per day and return new object from the Map
  //resources: https://dev.to/attacomsian/object-entries-and-object-values-methods-in-javascript-3l8c, https://stackoverflow.com/questions/47841899/js-map-return-object
  const totalPurchasesPerDay = Object.entries(groupedByDay).map(
    ([date, purchases]) => {
      const dailyPurchaseObj = {
        date: date,
        trees: purchases
          //filter only the number dates - data was being weird, assuming there's a string in it
          .filter((purchases) => typeof purchases.value === "number")
          .reduce((acc, purchases) => acc + purchases.value, 0),
      };
      return dailyPurchaseObj;
    }
  );

  //I WOULD TRY AND COMBINE THIS WITH THE CODE ABOVE WITH MORE TIME
  //group the array of ordered purchases by the month and year
  const groupedByYearMonth = groupBy(orderedByDay, (item) => {
    return item.createdAt.substring(0, 7);
  });
  //return a new object with the total purchases for each month
  const totalPurchasesPerMonth = Object.entries(groupedByYearMonth).map(
    ([date, purchases]) => {
      const monthlyPurchaseObj = {
        date: date,
        trees: purchases
          .filter((purchases) => typeof purchases.value === "number")
          .reduce((acc, purchases) => acc + purchases.value, 0),
      };
      return monthlyPurchaseObj;
=======
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
>>>>>>> tab
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ecologi_svg_1 = require("./assets/ecologi.svg");
var styled_components_1 = __importDefault(require("styled-components"));
var lodash_groupby_1 = __importDefault(require("lodash.groupby"));
var Chart_1 = __importDefault(require("./components/Chart"));
var Loading_1 = __importDefault(require("./components/Loading"));
var Tab_1 = require("./components/Tab");
require("./vars.css");
var AppContainer = styled_components_1.default.main(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n\n  background-color: #e8e4df;\n"], ["\n  height: 100%;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n\n  background-color: #e8e4df;\n"])));
var Header = styled_components_1.default.header(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: fixed;\n  display: flex;\n  align-items: center;\n\n  width: 100%;\n  height: 3rem;\n  padding: 1rem;\n  background-color: #03080a;\n"], ["\n  position: fixed;\n  display: flex;\n  align-items: center;\n\n  width: 100%;\n  height: 3rem;\n  padding: 1rem;\n  background-color: #03080a;\n"])));
var HeaderOffset = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding-top: 6rem;\n"], ["\n  padding-top: 6rem;\n"])));
var Logo = styled_components_1.default(ecologi_svg_1.ReactComponent)(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  height: 51px;\n"], ["\n  height: 51px;\n"])));
function App() {
    var _a = react_1.useState(), treeData = _a[0], setData = _a[1];
    var _b = react_1.useState(false), loading = _b[0], setLoading = _b[1];
    react_1.useEffect(function () {
        function getTreeData() {
            return __awaiter(this, void 0, void 0, function () {
                var response, data, error_1;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            setLoading(true);
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, fetch("https://public.ecologi.com/trees")];
                        case 2:
                            response = _a.sent();
                            return [4 /*yield*/, response.json()];
                        case 3:
                            data = _a.sent();
                            setData(data);
                            setLoading(false);
                            return [3 /*break*/, 5];
                        case 4:
                            error_1 = _a.sent();
                            console.warn(error_1);
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        getTreeData();
    }, []);
    if (loading || !treeData)
        return react_1.default.createElement(Loading_1.default, { loading: loading });
    //order purchases array by createdAt date:
    //resource: https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
    var orderedByDay = treeData.data.sort(function (a, b) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    //groups an array of ordered purchases by day (createdAt)
    //returns an object with arrays of objects
    //resource: https://lodash.com/docs/4.17.15#groupBy
    var groupedByDay = lodash_groupby_1.default(orderedByDay, function (item) {
        return item.createdAt.split("T")[0];
    });
    //add total purchases per day and return new object from the Map
    //resources: https://dev.to/attacomsian/object-entries-and-object-values-methods-in-javascript-3l8c, https://stackoverflow.com/questions/47841899/js-map-return-object
    var totalPurchasesPerDay = Object.entries(groupedByDay).map(function (_a) {
        var date = _a[0], purchases = _a[1];
        var dailyPurchaseObj = {
            date: date,
            trees: purchases
                //filter only the number dates - data was being weird, assuming there's a string in it
                .filter(function (purchases) { return typeof purchases.value === "number"; })
                .reduce(function (acc, purchases) { return acc + purchases.value; }, 0),
        };
        return dailyPurchaseObj;
    });
    //I WOULD TRY AND COMBINE THIS WITH THE CODE ABOVE WITH MORE TIME
    //group the array of ordered purchases by the month and year
    var groupedByYearMonth = lodash_groupby_1.default(orderedByDay, function (item) {
        return item.createdAt.substring(0, 7);
    });
    //return a new object with the total purchases for each month
    var totalPurchasesPerMonth = Object.entries(groupedByYearMonth).map(function (_a) {
        var date = _a[0], purchases = _a[1];
        var monthlyPurchaseObj = {
            date: date,
            trees: purchases
                .filter(function (purchases) { return typeof purchases.value === "number"; })
                .reduce(function (acc, purchases) { return acc + purchases.value; }, 0),
        };
        return monthlyPurchaseObj;
    });
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Header, null,
            react_1.default.createElement(Logo, null)),
        react_1.default.createElement(HeaderOffset, null),
        react_1.default.createElement(AppContainer, null,
            react_1.default.createElement(Tab_1.TopTabs, { tabContent: [
                    {
                        id: "monthly",
                        title: "Monthly",
                        render: function () {
                            return react_1.default.createElement(Chart_1.default, { data: totalPurchasesPerMonth });
                        },
                    },
                    {
                        id: "daily",
                        title: "Daily",
                        render: function () {
                            return react_1.default.createElement(Chart_1.default, { data: totalPurchasesPerDay });
                        },
                    },
                ] }))));
}
exports.default = App;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
