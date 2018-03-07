const observers = [];

const update = () => observers.forEach(listener => listener());

export const observe = fn => observers.push(fn);

export const observable = obj =>
  new Proxy(obj, {
    set: (target, prop, value) => {
      console.log(
        `%c STORE UPDATE: Setting ${prop} with value:`,
        'font-size: 13px; background-color: black;',
      );
      console.log(value);
      Reflect.set(target, prop, value);
      update();
      return true;
    },
    get: (target, prop, receiver) => {
      return Reflect.get(target, prop);
    },
  });
