export default function stringLimit(str, limit = 42, endsWith = '...') {
  let newString = '';
  for (let i = 0; i < limit; i++) {
    if (str[i]) {
      if (i === 0) {
        newString += str[i].toUpperCase();
      } else if (str[i - 1] === ' ') {
        newString += str[i].toUpperCase();
      } else {
        newString += str[i];
      }
    }
  }
  newString += endsWith;
  return newString;
}
