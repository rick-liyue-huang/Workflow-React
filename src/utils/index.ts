import { useEffect, useState } from "react";
import { isNumber } from "util";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: Record<string, any>) => {
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// generic
export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完成后再执行
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => setValue([...value, item]),
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const result = [...value];
      result.splice(index, 1);
      setValue(result);
    },
  };
};

/*

const debounce = (func, delay) => {
  let timer;
  return () => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func()
    }, delay);
  }
}

const log = debounce(() => console.log('call'), 5000);
log()
log()
log()
*/
