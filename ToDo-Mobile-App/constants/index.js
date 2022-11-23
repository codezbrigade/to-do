import { strings } from './localize';

import { COLORS } from './COLORS';
import { FONTS } from './FONTS';

import { asserts } from './asserts';
import { ROUTES } from './ROUTES';
import {
  todoKey,
  expoPushTokenKey,
  ratingKey,
  countKey
} from './AsyncStorageKey';

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

const HEADERS = [{ title: strings.today, },
{ title: strings.tomorrow },
{ title: strings.upcoming },
{ title: strings.completed }
]

const MONTHS = [
  strings.Jan, strings.Feb, strings.Mar, strings.Apr, strings.May,
  strings.Jun, strings.Jul, strings.Aug, strings.Sep, strings.Oct,
  strings.Nov, strings.Dec
];

export {
  asserts,
  FONTS,
  COLORS,
  strings,
  categories,
  categoryLogoMap,
  todoKey,
  expoPushTokenKey,
  ratingKey,
  countKey,
  HEADERS,
  MONTHS,
  ROUTES
}