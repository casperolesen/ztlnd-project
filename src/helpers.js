export const sortByScore = (stories) => {
  const temp = [...stories];

  return temp.sort((a, b) => {
    return b.score - a.score;
  });
};

export const sortAuthorsByKarma = (authors) => {
  const temp = [...authors];

  return temp.sort((a, b) => {
    return b.karma - a.karma;
  });
};

export const shuffleArray = (array) => {
  const tempArray = [...array];
  for (let i = tempArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = tempArray[i];
    tempArray[i] = tempArray[j];
    tempArray[j] = temp;
  }
  return tempArray;
};

export const sortMap = (map) => {
  const tempMap = map;
  const sorted = new Map([...tempMap.entries()].sort((a, b) => b[1] - a[1]));
  return sorted;
};
