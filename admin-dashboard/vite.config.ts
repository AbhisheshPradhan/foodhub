import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
        svgr({
            include: "**/*.svg?react",
            svgrOptions: {
                icon: true,
                // This will transform your SVG to a React component
                exportType: "named",
                namedExport: "ReactComponent",
            },
        }),
    ],

    resolve: {
        alias: [
            { find: "@features", replacement: "/src/features" },
            { find: "@utils", replacement: "/src/utils" },
            { find: "@services", replacement: "/src/services" },
            {
                find: "@shared",
                replacement: path.resolve(__dirname, "../shared"),
            },
            { find: "@assets", replacement: "/src/assets" },
            { find: "@components", replacement: "/src/components" },
        ],
    },
});
