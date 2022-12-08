import { defineConfig, loadEnv } from 'vite'; // Vite doesn't load .env by default
import react from '@vitejs/plugin-react';
import postcssNested from 'postcss-nested';
// https://vitejs.dev/config/

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  // console.log(env.PORT);
  return {
    // vite config
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    plugins: [react(), postcssNested()],
    server: {
      port: env.PORT || 5173,
    },
    // preview: {
    //   port: env.PREVIEW_PORT,
    // },
  };
});

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     port: import.meta.env.PORT,
//   },
//   preview: {
//     port: import.meta.env.PREVIEW_PORT,
//   },
// });
