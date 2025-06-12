import {METHODS, Method} from './methods';
import {queryStringify} from './queryStringify';

type HTTPOptions = {
  method?: Method;
  headers?: Record<string, string>;
  data?: any;
  timeout?: number;
};

export class HTTPTransport {
  get = (url: string, options: HTTPOptions = {}) => {
    return this.request(url, {...options, method: METHODS.GET});
  };

  post = (url: string, options: HTTPOptions = {}) => {
    return this.request(url, {...options, method: METHODS.POST});
  };

  put = (url: string, options: HTTPOptions = {}) => {
    return this.request(url, {...options, method: METHODS.PUT});
  };

  delete = (url: string, options: HTTPOptions = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE});
  };

  request = (url: string, options: HTTPOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const {method, headers = {}, data} = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && data ? `${url}${queryStringify(data)}` : url,
      );

      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.onload = () => resolve(xhr);
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;
      xhr.timeout = timeout;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
