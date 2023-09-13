const { PEOPLE_NAMES } = require('../utils/constants');

const getFirstName = name => name.split(' ')[0];

const capitalizeEveryWord = text =>
  String(text)
    .toLowerCase()
    .replace(/(?:^|\s)\S/g, a => a.toUpperCase());

const removeSpecialCharacters = text =>
  text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
    .replace(' ', '_');

const cpfMask = value => {
  return value
    ? value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    : value;
};

const cnpjMask = value => {
  return value ? value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '$1.$2.$3/$4-$5') : value;
};

const documentMask = (value, type) => (type === 'PJ' ? cnpjMask(value) : cpfMask(value));

const getPersonTypeByKey = key => {
  const people = Object.keys(PEOPLE_NAMES);
  return people.find(person => PEOPLE_NAMES[person] === key);
};

const objStrMapper = (string, obj) => string.split('.').reduce((o, i) => (!!o && o.hasOwnProperty(i) ? o[i] : ''), obj);

module.exports = { getFirstName, cpfMask, capitalizeEveryWord, documentMask, cnpjMask, getPersonTypeByKey, removeSpecialCharacters, objStrMapper };
