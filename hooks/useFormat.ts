export const useFormat = (value: any): string => {
  const num = Number(value);
  return isNaN(num) ? "--" : num.toFixed(2);
};
