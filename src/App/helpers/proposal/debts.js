const { createHeadline } = require('./headline');
const { formatMoney } = require('./helpers/number');
const { getPersonTypeByKey } = require('./helpers/text');
const { groupBy, get } = require('lodash');
const {
  ColorScheme: { $MAIN_PURPLE, $WHITE, $GRAY_1 },
  fillColor
} = require('./constants');

const layout = {
  fillColor: rowIndex => (rowIndex === 0 ? $MAIN_PURPLE : fillColor(rowIndex)),
  hLineColor: () => 'white',
  vLineColor: () => 'white',
  paddingLeft: () => 16,
  paddingRight: () => 16,
  paddingTop: () => 7,
  paddingBottom: () => 7
};

const createRows = ({ debts }) =>
  debts.map(({ debtType, debtValue, negotiatedDebtValue }) => [
    { colSpan: 2, text: debtType },
    '',
    { text: formatMoney(negotiatedDebtValue || debtValue), alignment: 'center' }
  ]);

const createTable = ({ debts, person, contract }) => {
  const { property = {}, user, secondPayers = [] } = contract;
  const { owners = [] } = property;
  const total = debts.reduce((acc, curr) => acc + Number(curr.negotiatedDebtValue || curr.debtValue), 0);

  const [secondPayer] = secondPayers.map(secondPayerId => user.relations.find(relation => relation.id === secondPayerId));
  const [propertyOwner] = owners.map(ownerId => user.relations.find(relation => relation.id === ownerId));

  const relationPerson = user.relations.find(relation => relation.relationType[0].toLowerCase() === person);
  const name = person === 'owner' ? user.name : get(relationPerson, 'name');
  const personName = `${name} | ${getPersonTypeByKey(person)}`;

  const secondPayerText = secondPayer && person === secondPayer.relationType[0].toLowerCase() ? '| Segundo Pagador' : '';
  const propertyOwnerText = propertyOwner && person === propertyOwner.relationType[0].toLowerCase() ? '| Dono do Imóvel' : '';

  return {
    style: 'proposalTable',
    table: {
      headerRows: 1,
      widths: [304, 60, 60],
      height: 25,
      body: [
        [
          {
            colSpan: 3,
            text: `${personName} ${secondPayerText} ${propertyOwnerText}`,
            color: $WHITE
          },
          '',
          ''
        ],
        ...createRows({ debts }),
        [
          { fillColor: $WHITE, text: '' },
          { fillColor: $GRAY_1, text: 'Total', alignment: 'center' },
          { fillColor: $GRAY_1, text: formatMoney(total), alignment: 'center' }
        ]
      ]
    },
    layout,
    margin: [0, 20, 0, 0]
  };
};

const buildDebtors = ({ debtors, contract }) => {
  const people = Object.keys(debtors);
  return people.map(person => createTable({ debts: debtors[person], person, contract }));
};

const createStack = ({ contract, debts }) => {
  const total = (debts && debts.reduce((acc, curr) => acc + Number(curr.negotiatedDebtValue || curr.debtValue), 0)) || 0;
  const debtors = (debts && groupBy(debts, 'debtor')) || {};

  return {
    stack: [createHeadline('DÍVIDAS PARA QUITAR', `TOTAL: ${formatMoney(total)}`), buildDebtors({ debtors, contract })]
  };
};

const debtsPage = ({ contract, proposal }) => {
  const debts = get(proposal, 'debts');
  return debts ? createStack({ contract, debts }) : '';
};

module.exports = { debtsPage };
