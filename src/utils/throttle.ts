export const throttle = (func: Function, delay: number) => {
  let timerFlag: NodeJS.Timer | null = null;
  return (...args: any[]) => {
    if (timerFlag === null) {
      func(...args);
      timerFlag = setTimeout(() => {
        timerFlag = null;
      }, delay);
    }
  };
};

export const throttleAnimation = (func: Function) => {
  let isFiring = false;
  return (...args: any[]) => {
    if (isFiring === false) {
      requestAnimationFrame(() => {
        func(...args);
        isFiring = false;
      });
    }
    isFiring = true;
  };
};
