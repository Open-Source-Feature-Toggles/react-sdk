import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'feature-toggles-react-sdk',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', "osff-js-sdk"],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM', 
          'osff-js-sdk' : 'FeatureToggleClient', 
        }
      }
    }
  }
})