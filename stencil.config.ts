import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'wc-trombone',
  globalStyle: 'src/global/variables.css',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ],
  copy: [
    {
      src: './assets',
      dest: 'assets'
    },
    { src: 'global' }
  ]
};
