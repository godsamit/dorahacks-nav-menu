import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      eslintrc: {
        enabled: true
      },
      dts: true,
      resolvers: [
        IconsResolver({
          prefix: "Icon",
          extension: "jsx",
        })
      ]
    }),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
    }),
    react(),
  ],
})
