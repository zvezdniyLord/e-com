export const checkString = (str, substr) => {
  if (str.toLowerCase().indexOf(substr.toLowerCase()) >= 0) {
    return true;
  }
  return false;
}
