import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('el-'),
        },
      },
      script: {
        defineModel: true,
      },
    }),
    dts({
      insertTypesEntry: true,
      exclude: ['**/__tests__', '**/*.spec.ts'],
      outDir: 'dist/types',
      staticImport: true,
      rollupTypes: false,
      skipDiagnostics: true
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'DanspUiMet8Vue',
      fileName: (format) => `dansp-ui-met8-vue.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [
        'vue',
        'bootstrap',
        'quill',
        'element-plus',
        '@popperjs/core',
        'vue-the-mask',
        'cpf-cnpj-validator',
        'cnpj-promise',
        'email-validator'
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          bootstrap: 'bootstrap',
          quill: 'Quill',
          'element-plus': 'ElementPlus',
          '@popperjs/core': 'Popper',
          'vue-the-mask': 'VueTheMask',
          'cpf-cnpj-validator': 'cpfCnpjValidator',
          'cnpj-promise': 'cnpjPromise',
          'email-validator': 'emailValidator',
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
  },
});
