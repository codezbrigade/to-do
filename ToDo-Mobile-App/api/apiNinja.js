import axios from "axios";

const limit = 10;
const url = 'https://api.api-ninjas.com/v1/facts?limit=' + limit;
const apiKey = 'aCT5nHaL8Ilvutg8N9nJfA==ZVQQfmoFYIb6ps6i';

export const FACT_API = async () => {
  try {
    return await axios.request({
      method: 'get',
      url,
      headers: {
        'X-Api-Key': apiKey
      }
    })
      .then((res) => res.data)
    // .then(data => data.filter(data.fact.length < 60))
  } catch (error) {
    console.log(error);
    return [{ "fact": "The Golden Gate Bridge was first opened in 1937" }]
  }
}