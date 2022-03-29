import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {

  // Change the default browser which the server is opened in.
  // If you do have the need, just create the .env.development file beside vite.config.js,
  // and set "BROWSER = chrome(or any specific browser you want the server to be opened in)" in it.
  // Otherwise, comment out the "process.env.BROWSER = ..." line.
  // Attention: The browser you set must be the one you already have it installed in your OS.
  process.env.BROWSER = loadEnv(mode, process.cwd(), '').BROWSER

  return {
    plugins: [vue()],
    server: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://39.98.123.211'
        }
      }
    }
  }
})
