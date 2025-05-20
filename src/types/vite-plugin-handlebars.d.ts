declare module 'vite-plugin-handlebars' {
  import { Plugin } from 'vite';

  interface Options {
    partialDirectory?: string;
    context?: Record<string, any>;
  }

  const plugin: (options?: Options) => Plugin;

  export default plugin;
}