export function isEmptyObject(obj: Object) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      return false;
    }
  }
  return true;
}
