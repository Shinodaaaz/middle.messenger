export function queryStringify(data: Record<string, any>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => {
    const value = encodeURIComponent(data[key]);
    return `${result}${key}=${value}${index < keys.length - 1 ? '&' : ''}`;
  }, '?');
}
