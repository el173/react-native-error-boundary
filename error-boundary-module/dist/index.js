"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_native_1 = require("react-native");
var ErrorBoundary = function (_a) {
    var children = _a.children, renderError = _a.renderError, message = _a.message, enableOriginalHandler = _a.enableOriginalHandler;
    var _b = (0, react_1.useState)(null), error = _b[0], setError = _b[1];
    var _c = (0, react_1.useState)(false), showStack = _c[0], setShowStack = _c[1];
    var _d = (0, react_1.useState)(react_native_1.Dimensions.get('window').height / 2), maxStackHeight = _d[0], setMaxStackHeight = _d[1];
    (0, react_1.useEffect)(function () {
        var errorHandler = function (err, errorInfo) {
            if (errorInfo.isFatal) {
                setError(err);
            }
        };
        var globalHandler = function (err, isFatal) {
            errorHandler(err, { isFatal: isFatal !== null && isFatal !== void 0 ? isFatal : false });
            if (originalHandler && enableOriginalHandler) {
                originalHandler(err, isFatal);
            }
        };
        var originalHandler = ErrorUtils.getGlobalHandler();
        ErrorUtils.setGlobalHandler(globalHandler);
        return function () {
            ErrorUtils.setGlobalHandler(originalHandler);
        };
    }, [enableOriginalHandler]);
    (0, react_1.useEffect)(function () {
        var handleResize = function (_a) {
            var window = _a.window;
            setMaxStackHeight(window.height / 2);
        };
        react_native_1.Dimensions.addEventListener('change', handleResize);
        return function () {
            react_native_1.Dimensions.removeEventListener('change', handleResize);
        };
    }, []);
    var handleShowStack = function () {
        setShowStack(!showStack);
    };
    if (error) {
        return renderError ? (react_1.default.createElement(react_native_1.View, { style: styles.mainWrapper }, renderError(error, error.stack))) :
            react_1.default.createElement(react_native_1.ScrollView, { contentContainerStyle: styles.mainWrapper },
                react_1.default.createElement(react_native_1.Text, null, message || 'An error occurred. Please restart the app.'),
                react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: handleShowStack },
                    react_1.default.createElement(react_native_1.Text, { style: styles.errorText }, error.toString())),
                showStack && (react_1.default.createElement(react_native_1.ScrollView, { style: [styles.errorStackContainer, { maxHeight: maxStackHeight }] },
                    react_1.default.createElement(react_native_1.Text, { style: styles.errorStack }, error.stack))));
    }
    return children;
};
var styles = react_native_1.StyleSheet.create({
    mainWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        marginTop: 10,
        backgroundColor: '#f8d7da',
        padding: 10,
        borderRadius: 10,
        color: '#721c24',
    },
    errorStackContainer: {
        marginTop: 20,
        width: '100%',
    },
    errorStack: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        fontFamily: 'monospace',
        fontSize: 12,
        lineHeight: 18,
    },
});
exports.default = ErrorBoundary;
