export const debounce = (
  func: any,
  delay: number,
  options?: { leading?: boolean; trailing?: boolean },
) => {
  let timeout: NodeJS.Timeout;
  let leadingCall = false;
  let trailingCall = false;

  const debounced = (...args: any[]) => {
    if (timeout) {
      clearTimeout(timeout);
    }

    if (options?.leading && !leadingCall) {
      func(...args);
      leadingCall = true;
    }

    timeout = setTimeout(() => {
      if (options?.trailing && leadingCall) {
        func(...args);
      }
      leadingCall = false;
      trailingCall = false;
    }, delay);

    if (options?.trailing && !leadingCall && !trailingCall) {
      func(...args);
      trailingCall = true;
    }
  };
  return debounced;
};
