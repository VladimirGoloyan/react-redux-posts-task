
const ratingSorter = (arr, dir) => {
  if (arr === []) return arr;
  //if direction is true sorting in descending order
  if (!dir) {
    let arrOfObj = arr.sort((a, b) => {
      if (a.average > b.average) {
        return -1;
      } else if (a.average < b.average) {
        return 1;
      }
      return 0;
    });
    return arrOfObj;
  }

  //otherwise ascending order
  let arrOfObj = arr.sort((a, b) => {
    if (a.average > b.average) {
      return 1;
    } else if (a.average < b.average) {
      return -1;
    }
    return 0;
  });
  return arrOfObj;
};

export default ratingSorter;
