export const createPropsProxy = <T extends object>(
  props: T,
  onUpdate: (oldProps: T, newProps: T) => void,
): T => {
  const checkPrivateProp = (prop: string | symbol) => typeof prop === 'string' && prop.startsWith('_');

  let oldProps = { ...props };

  return new Proxy(props, {
    get(target, prop: string | symbol) {
      if (checkPrivateProp(prop)) {
        throw new Error('Нет прав');
      }
      if (typeof prop === 'string' && prop in target) {
        const value = target[prop as keyof T];
        return typeof value === 'function' ? value.bind(target) : value;
      }
      return undefined;
    },

    set(target, prop: string | symbol, value) {
      if (checkPrivateProp(prop)) {
        throw new Error('Нет прав');
      }
      if (typeof prop === 'string' && prop in target) {
        const isChanged = target[prop as keyof T] !== value;
        target[prop as keyof T] = value;
        if (isChanged) {
          onUpdate(oldProps, target);
          oldProps = { ...target };
        }
        return true;
      }
      return false;
    },

    deleteProperty(target, prop: string | symbol) {
      if (checkPrivateProp(prop)) {
        throw new Error('Нет прав');
      }
      throw new Error('нет доступа');
    },
  });
};
