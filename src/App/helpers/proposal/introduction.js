const { formatMoney, formatPercentage } = require('./helpers/number');
const { getFirstName } = require('./helpers/text');
const { formatMonth } = require('./helpers/date');
const { coinSVG, taxSVG, calendarSVG, sacSVG, costSVG, calendarMonthSVG } = require('./svg');
const {ColorScheme:{$MAIN_PURPLE}} = require('./constants')

const first_row = ({ proposal: { grossLoan, interestRate, terms } }) => ({
  columns: [
    {
      width: 140,
      stack: [
        {
          columns: [
            {
              width: 27,
              svg: coinSVG
            },
            {
              width: '*',
              stack: [
                { text: formatMoney(grossLoan), bold: true, fontSize: 13, color: $MAIN_PURPLE },
                { text: 'VALOR BRUTO', fontSize: 8 }
              ]
            }
          ]
        }
      ],
      columnGap: 10
    },
    {
      width: 140,
      stack: [
        {
          columns: [
            {
              width: 27,
              svg: taxSVG
            },
            {
              width: '*',
              stack: [
                { text: formatPercentage(interestRate), bold: true, fontSize: 13, color: $MAIN_PURPLE },
                { text: 'TAXA (A.M.)', fontSize: 8 }
              ]
            }
          ]
        }
      ],
      columnGap: 10
    },
    {
      width: 140,
      stack: [
        {
          columns: [
            {
              width: 27,
              svg: calendarSVG
            },
            {
              width: '*',
              stack: [
                { text: `${terms} meses`, bold: true, fontSize: 13, color: $MAIN_PURPLE },
                { text: 'PRAZO DE PAGAMENTO', fontSize: 8 }
              ]
            }
          ]
        }
      ],
      columnGap: 10
    }
  ],
  columnGap: 15,
  margin: [0, 60, 0, 0]
});

const second_row = ({ proposal: { amortizationSchedule, skipMonth, cet } }) => {
  return {
    columns: [
      {
        width: 140,
        stack: [
          {
            columns: [
              {
                width: 27,
                svg: sacSVG
              },
              {
                width: '*',
                stack: [
                  { text: amortizationSchedule, bold: true, fontSize: 13, color: $MAIN_PURPLE },
                  { text: 'SISTEMA DE AMORTIZAÇÃO', fontSize: 8 }
                ]
              }
            ]
          }
        ],
        columnGap: 10
      },
      {
        width: 140,
        stack: [
          {
            columns: [
              {
                width: 27,
                svg: costSVG
              },
              {
                width: '*',
                stack: [
                  { text: formatPercentage(cet * 100), bold: true, fontSize: 13, color: $MAIN_PURPLE },
                  { text: 'CUSTO EFETIVO TOTAL (A.A.)', fontSize: 8 }
                ]
              }
            ]
          }
        ],
        columnGap: 10
      },
      {
        width: 140,
        stack: [
          {
            columns: [
              {
                width: 27,
                svg: calendarMonthSVG
              },
              {
                width: '*',
                stack: [
                  { text: formatMonth(skipMonth || 0), bold: true, fontSize: 13, color: $MAIN_PURPLE },
                  { text: 'MÊS DO ANO SEM PAGAR', fontSize: 8 }
                ]
              }
            ]
          }
        ],
        columnGap: 10
      }
    ],
    columnGap: 15,
    margin: [0, 30, 0, 0]
  };
};

const introduction = ({ proposal, user: { name } }) => ({
  columns: [
    {
      width: 4,
      canvas: [
        {
          type: 'rect',
          x: 0,
          y: 0,
          w: 4,
          h: 260,
          r: 5,
          color: $MAIN_PURPLE,
          lineColor: $MAIN_PURPLE
        }
      ]
    },
    {
      width: '*',
      stack: [
        {
          text: `Olá ${getFirstName(name)}! Tudo bem?`,
          fontSize: 24,
          bold: true
        },
        {
          text: 'Elaboramos essa proposta com todo carinho para você!',
          fontSize: 16,
          italics: true,
          margin: [0, 20, 0, 0]
        },
        {
          text: 'Veja se ela não é a sua cara?!',
          fontSize: 16
        },
        first_row({ proposal }),
        second_row({ proposal })
      ]
    }
  ],
  margin: [45, 30, 0, 0],
  columnGap: 20
});

module.exports = { introductionPage: introduction };
