import averageCalculator from "./averageCalculator";

const ratingSorter = (arr, dir) => {
  console.log('arr: ',arr)
  let ratings = arr.map((el) => {
    return averageCalculator(el.comments);
  });

  let arrOfObj = arr;

  for (let i = 0; i < arr.length; i++) {
    arrOfObj[i].ratingAverage = ratings[i];
  }

  //if direction is true sorting in descending order
  if (!dir) {
    arrOfObj.sort((a, b) => {
      if (a.ratingAverage > b.ratingAverage) {
        return -1;
      } else if (a.ratingAverage < b.ratingAverage) {
        return 1;
      }
      return 0;
    });
    return arrOfObj;
  }

  //otherwise ascending order
  arrOfObj.sort((a, b) => {
    if (a.ratingAverage > b.ratingAverage) {
      return 1;
    } else if (a.ratingAverage < b.ratingAverage) {
      return -1;
    }
    return 0;
  });
  return arrOfObj;
};

export default ratingSorter;
