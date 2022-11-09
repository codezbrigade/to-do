import TODOLIST from './ToDoList.json';

import { strings } from './localize';

import { COLORS, FONTS } from './THEMES';
import { asserts } from './asserts';
import { ROUTES } from './ROUTES';
import { todoKey } from './AsyncStorageKey';

const categories = [
  {
    name: strings.university,
    color: COLORS.university
  },
  {
    name: strings.work,
    color: COLORS.work
  },
  {
    name: strings.grocery,
    color: COLORS.grocery
  },
  {
    name: strings.home,
    color: COLORS.home
  },
  {
    name: strings.customize,
    color: COLORS.customize
  }
];

const categoryLogoMap = {
  [strings.grocery]: asserts.grocery,
  [strings.work]: asserts.work,
  [strings.university]: asserts.university,
  [strings.customize]: asserts.customize,
  [strings.home]: asserts.home,
};

const HEADERS = [{
  title: strings.today,
},
{
  title: strings.completed,
},
{
  title: strings.tomorrow,
},
{
  title: strings.upcoming,
}
]

const MONTHS = [
  strings.Jan, strings.Feb, strings.Mar, strings.Apr, strings.May,
  strings.Jun, strings.Jul, strings.Aug, strings.Sep, strings.Oct,
  strings.Nov, strings.Dec
];

export {
  TODOLIST,
  asserts,
  FONTS,
  COLORS,
  strings,
  categories,
  categoryLogoMap,
  todoKey,
  HEADERS,
  MONTHS,
  ROUTES
}