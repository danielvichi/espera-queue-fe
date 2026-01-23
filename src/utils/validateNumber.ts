const filterOnlyNumber = (data: string): number => {
  const numberString = data.replace(/\D+/g, '');
  return Number(numberString);
};

export default filterOnlyNumber;
