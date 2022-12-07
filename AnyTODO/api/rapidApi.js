import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://tasty.p.rapidapi.com/recipes/get-more-info',
  params: { prefix: 'chicken soup' },
  headers: {
    'X-RapidAPI-Key': '191d6a3a8dmsh88c0ae783216343p182ae3jsn8cc635fe7fb5',
    'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
  }
};

export const RAPID_API = async () => {
  await axios.request(options).then(function (response) {
    return response.data;
  }).catch(function (error) {
    console.error(error);
  });
};

// let response_output = {
//   'results': [
//     { 'display': 'chicken noodle soup', 'search_value': 'chicken noodle soup', 'type': 'ingredient' },
//     { 'display': 'chicken tortilla soup', 'search_value': 'chicken tortilla soup', 'type': 'ingredient' },
//     { 'display': 'chicken soup', 'search_value': 'chicken soup', 'type': 'ingredient' }
//   ]
// };