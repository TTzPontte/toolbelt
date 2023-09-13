const { getNowShortDateString } = require('./helpers/date');
const { logoPontteSVG } = require('./svg');

const header = ({ user: { name } }) => [
  {
    columns: [
      {
        svg: logoPontteSVG,
        width: 140
      },
      {
        stack: [
          { text: name.toUpperCase(), bold: true, fontSize: 8 },
          { text: `DATA DA PROPOSTA: ${getNowShortDateString().toUpperCase()}`, fontSize: 8 }
        ],
        alignment: 'right',
        margin: [0, 5, 0, 0]
      }
    ],
    margin: [40, 30, 40, 0]
  }
];

const footer = (currentPage, pageCount) => ({
  text: { text: `${currentPage.toString()} de ${pageCount}`, fontSize: 10 },
  alignment: 'right',
  margin: [40, 30, 40, 0]
});

module.exports = { footer, header };
