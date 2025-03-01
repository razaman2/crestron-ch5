// @ts-nocheck

import {fileURLToPath, URL} from "node:url";

import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import tailwindcss from "@tailwindcss/vite";
import {viteStaticCopy} from "vite-plugin-static-copy";
import {viteSingleFile} from "vite-plugin-singlefile";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        jsx(),
        tailwindcss(),
        viteStaticCopy({
            targets: [
                {
                    src: "node_modules/@crestron/ch5-crcomlib/build_bundles/umd/cr-com-lib.js",
                    dest: "",
                },
            ],
        }),
        viteSingleFile(),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./", import.meta.url)),
            "@helpers": fileURLToPath(new URL("./helpers", import.meta.url)),
            "@src": fileURLToPath(new URL("./src", import.meta.url)),
            "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
            "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
            "@layouts": fileURLToPath(new URL("./src/layouts", import.meta.url)),
            "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
            "@routes": fileURLToPath(new URL("./src/routes", import.meta.url)),
        },
    },
});
