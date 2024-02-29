export const randomUniqueId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // eslint-disable-next-line no-bitwise
    const r = (Math.random() * 16) | 0,
      // eslint-disable-next-line no-bitwise
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const numberWithCommas = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const truncateString = (value: string, maxLength = 30) => {
  if (value?.length === 0 || !value) return ' ';
  if (value.length <= maxLength) return value;

  return value.substring(0, maxLength) + '...';
};
