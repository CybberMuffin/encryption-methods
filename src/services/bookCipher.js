export default function bookCipher(input, key, mode) {
  //let keyRows = clearKeyRows(key);
  let keyRows = makeEvenRows(key.split("\n"));
  let result = [];

  //TODO:
  //1) make same length rows in an array --> done
  //2) find a symbol in array and all possible variants write to another array --> done
  //3) by a random function choose one of possible variants and add to the result --> done

  if (mode == 1) {
    let matches = [];
    for (let ch of input) {
      keyRows.forEach((row, index) =>
        matches.push(...findMatches(ch, row, index))
      );

      if (matches.length !== 0) result.push(randomSelection(matches));
      else result.push(ch);

      matches = [];
    }
    result = result.join(",");
  } else {
    input = input.split(",");

    for (let el of input) {
      if (isCharDigit(el[0]) && el.indexOf("/") >= 0) {
        let indexes = el.split("/");
        if (indexes[0] < keyRows.length && indexes[1] < keyRows[0].length)
          result.push(keyRows[indexes[0]][indexes[1]]);
        else result.push(el);
      } else result.push(el);
    }
    result = result.join("");
  }

  return result;
}

function clearKeyRows(key) {
  let keyRows = key.split("\n");
  keyRows.forEach((row, index) => (keyRows[index] = row.replace(/\s/g, "")));
  keyRows = keyRows.filter(row => row !== "");

  return makeEvenRows(keyRows);
}

function makeEvenRows(array) {
  let shortestRowLength = Math.min.apply(Math, array.map(str => str.length));
  array.forEach(
    (row, index) => (array[index] = row.slice(0, shortestRowLength))
  );

  return array;
}

function findMatches(symbol, array, index) {
  let indexes = [];
  for (let i in array) {
    if (array[i] === symbol) indexes.push(`${index}/${i}`);
  }
  return indexes;
}

function randomSelection(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function isCharDigit(n) {
  return !!n.trim() && n > -1;
}
