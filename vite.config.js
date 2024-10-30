"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var plugin_react_1 = require("@vitejs/plugin-react");
var vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    base: "./",
    plugins: [(0, plugin_react_1.default)()],
    assetsInclude: ["**/*.jpg"],
    server: {
        port: 3008,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: "dist",
        rollupOptions: {
            input: {
                main: path.resolve(__dirname, "index.html"),
            },
        },
    },
    define: {
        "process.env": {},
    },
});
