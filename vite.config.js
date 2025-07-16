import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Katla',
        short_name: 'Katla',
        description: 'Permainan kata 5 huruf berbahasa Indonesia',
        theme_color: '#18181b',
        background_color: '#18181b',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/katla.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      }
    })
  ],
})
