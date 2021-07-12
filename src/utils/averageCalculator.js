const averageCalculator = (arr) => {
  let average = 0;

  arr.forEach((el) => {
    average += el.rating;
  });

  return (average / arr.length).toFixed(2);
};

export default averageCalculator;
