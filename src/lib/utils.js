export function findIndexOfObjWithAttr(array, attr, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i][attr] === value) {
      return i;
    }
  }
  return -1;
}

export function findIndexOfObjWithId(array, value) {
  for (var i = 0; i < array.length; i += 1) {
    if (array[i].id === value) {
      return i;
    }
  }
  return -1;
}

export function shuffleArray(array) {
  const arrayCopy = [...array];
  for (var i = arrayCopy.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = arrayCopy[i];
    arrayCopy[i] = arrayCopy[j];
    arrayCopy[j] = temp;
  }
  return arrayCopy;
}
