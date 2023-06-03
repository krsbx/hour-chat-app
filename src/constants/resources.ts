import _ from 'lodash';

export const GENDER = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
} as const;

export const GENDERS = _.map(GENDER, (value) => ({
  label: _.capitalize(value),
  value,
}));
