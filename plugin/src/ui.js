"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var ui_1 = require("@create-figma-plugin/ui");
var utilities_1 = require("@create-figma-plugin/utilities");
var preact_1 = require("preact");
var hooks_1 = require("preact/hooks");
var styles_css_1 = __importDefault(require("./styles.css"));
function Plugin() {
    var _a = (0, hooks_1.useState)(null), documentTitle = _a[0], setDocumentTitle = _a[1];
    var defaultFilename = "".concat(documentTitle || "export", ".plugin.json");
    var _b = (0, hooks_1.useState)(null), filenameOverride = _b[0], setFilenameOverride = _b[1];
    var filename = filenameOverride || defaultFilename;
    var _c = (0, hooks_1.useState)(false), loading = _c[0], setLoading = _c[1];
    (0, hooks_1.useEffect)(function () {
        (0, utilities_1.on)("RES_DOCUMENT_TITLE", function (documentTitle) {
            setDocumentTitle(documentTitle);
        });
        (0, utilities_1.emit)("REQ_DOCUMENT_TITLE");
    }, []);
    var handleDownloadJson = (0, hooks_1.useCallback)(function () {
        setLoading(true);
        (0, utilities_1.on)("RES_SERIALIZE_JSON", function (json) {
            downloadFile(json, filename);
            setLoading(false);
        });
        // delay to allow the loading state to be set
        setTimeout(function () { return (0, utilities_1.emit)("REQ_SERIALIZE_JSON"); }, 100);
    }, [filename]);
    return ((0, preact_1.h)(ui_1.Container, { space: 'medium' },
        (0, preact_1.h)(ui_1.VerticalSpace, { space: 'small' }),
        (0, preact_1.h)("div", { "class": styles_css_1["default"].container },
            (0, preact_1.h)(ui_1.Text, { style: { marginBottom: 8 } }, "Filename"),
            (0, preact_1.h)(ui_1.Textbox, { onInput: function (e) { return setFilenameOverride(e.currentTarget.value); }, placeholder: 'filename', value: filename, variant: 'border' })),
        (0, preact_1.h)(ui_1.VerticalSpace, { space: 'large' }),
        (0, preact_1.h)(ui_1.Button, { fullWidth: true, onClick: handleDownloadJson, disabled: loading }, loading ? "Loading JSON..." : "Download JSON"),
        (0, preact_1.h)(ui_1.VerticalSpace, { space: 'small' })));
}
function downloadFile(content, filename) {
    var blob = new Blob([content], { type: "application/json" });
    var blobURL = window.URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = blobURL;
    link.download = filename || "export.plugin.json";
    link.click();
}
exports["default"] = (0, ui_1.render)(Plugin);
//# sourceMappingURL=ui.js.map