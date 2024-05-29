// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     eslint(),
//     "@babel/plugin-proposal-private-property-in-object",
//   ],
//   rules: {
//     "react/forbid-prop-types": 0,
//   },

// });


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      // Specify ESLint options here
      fix: true, // Enable auto-fixing ESLint errors
      cache: false, // Disable ESLint caching
    }),
  ],
  // Rules configuration (if needed)
  rules: {
    'react/forbid-prop-types': 0, // Example rule configuration
  },
});
