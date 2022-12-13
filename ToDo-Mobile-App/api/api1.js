import axios from "axios";

// const options = {
//   method: 'GET',
//   url: 'https://exercisedb.p.rapidapi.com/exercises/bodyPartList'
// };
const url = "https://health.gov/myhealthfinder/api/v3/topicsearch.json?TopicId=30608";
const id = 572;
export const api1 = async () => {

  return await axios.get(url).then(function (response) {
    // console.log(response.data, "api 1 source");
    return response.data;
  }).catch(function (error) {
    console.error(error);
  });
}