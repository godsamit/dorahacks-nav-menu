import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import AutoImport from 'unplugin-auto-import/vite';
import { promises as fs } from 'node:fs';

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
          customCollections: ["dora"]
        })
      ]
    }),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
      customCollections: {
        'dora': {
          aptos: () => fs.readFile('./src/assets/aptos.svg', 'utf-8'),
          injective:() => fs.readFile('./src/assets/injective.svg', 'utf-8'), 
          logo: () => fs.readFile('./src/assets/Logo.svg', 'utf-8'),
        }
      }
    }),
    react(),
  ],
});
