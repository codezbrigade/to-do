import {MONTHS} from '../constants';

export const filterFunction = toDoList => {
  let today = [];
  let completed = [];
  let tomorrow = [];
  let upcoming = [];
  let others = [];
  let now = new Date();

  toDoList.forEach(element => {
    const {isCompleted, time} = element;
    let timeArr = time.split(' ');

    if (!isCompleted) {
      if (timeArr[2] > now.getFullYear()) {
        upcoming.push(element);
      } else if (MONTHS.indexOf(timeArr[0]) > now.getMonth()) {
        upcoming.push(element);
      } else if (timeArr[1] > now.getDate() + 1) {
        upcoming.push(element);
      } else if (timeArr[1] > now.getDate()) {
        tomorrow.push(element);
      } else if (parseInt(timeArr[1], 10) === now.getDate()) {
        today.push(element);
      } else {
        others.push(element);
      }
    } else {
      completed.push(element);
    }
  });

  // console.log('TO BE deleted/missed todos =>>>', others);

  return [today, tomorrow, upcoming, completed];
};
