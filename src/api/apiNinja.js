import axios from 'axios';

const limit = 50;
const url = 'https://api.api-ninjas.com/v1/facts?limit=' + limit;
const apiKey = 'aCT5nHaL8Ilvutg8N9nJfA==ZVQQfmoFYIb6ps6i';

export const FACT_API = async () => {
  try {
    return await axios
      .request({
        method: 'get',
        url,
        headers: {
          'X-Api-Key': apiKey,
        },
      })
      .then(res => res.data);
  } catch (error) {
    console.log(error, 'error occured on fetching data');
    // return [{fact: 'The Golden Gate Bridge was first opened in 1937'}];
  }
};
