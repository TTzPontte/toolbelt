const { documentMask } = require('./helpers/text');
const {
  ColorScheme: { $MAIN_DARK }
} = require('./constants');

const findRelated = (user, relatedId) => user.relations.find(relation => relation.id === relatedId);

const sign = ({ user: { name, documentNumber, type } }) => {
  const documentType = type === 'PJ' ? 'CNPJ' : 'CPF';

  return {
    stack: [
      {
        canvas: [
          {
            type: 'rect',
            x: 0,
            y: 5,
            w: 180,
            h: 1,
            r: 0,
            color: $MAIN_DARK
          }
        ]
      },
      { text: name, fontSize: 8, margin: [0, 4] },
      {
        text: `${documentType}: ${documentMask(documentNumber, type)}`,
        fontSize: 8
      }
    ],
    margin: [10, 0, 0, 0]
  };
};

const signature = ({ contract }) => {
  const { property = {}, user, secondPayers = [] } = contract;
  const { owners = [] } = property;

  const [secondPayer] = secondPayers.map(secondPayerId => findRelated(user, secondPayerId));
  const [propertyOwner] = owners.map(ownerId => findRelated(user, ownerId));

  const hasSecondPayers = !!secondPayers && secondPayers.length;
  const hasPropertyOwner = !!propertyOwner && propertyOwner.length;

  const ownerSignature = sign({ user: contract.user });
  const secondPayerSignature = () => (hasSecondPayers ? sign({ user: secondPayer }) : {});
  const propertyOwnerSignature = () => (hasPropertyOwner ? sign({ user: propertyOwner }) : {});

  const secondSignature = hasSecondPayers ? secondPayerSignature() : hasPropertyOwner ? propertyOwnerSignature() : {};

  const createNewRow = owners.length && secondPayers.length;
  const newRow = createNewRow
    ? {
        columns: [propertyOwnerSignature],
        margin: [0, 20, 0, 0]
      }
    : {};

  return {
    stack: [
      {
        columns: [ownerSignature, secondSignature],
        margin: [0, 30, 0, 0]
      },
      newRow
    ]
  };
};

module.exports = { signature };
