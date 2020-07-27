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
