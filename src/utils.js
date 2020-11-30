import champions from './assets/champions.json';

const {data, keys} = champions;

export const shuffleChampions = numberChampions => {
  const options = [];
  const championKeys = Object.keys(keys);
  let i = 0;
  while(options.length < numberChampions && i < 10){
    const option = championKeys[Math.floor(Math.random() * championKeys.length)];
    if(!options.includes(option)) options.push(option);
    i++;
  }
  
  return options
}

export const getChampionDataById = id => {
  const champion = keys[id];
  return data[champion];
}

export const getChampionNameById = id => {
  return getChampionDataById(id).name;  
}

export const getChampionKeyById = id => {
  return keys[id];
}