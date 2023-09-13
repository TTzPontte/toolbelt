const { formatMoneyWOCurrency, removeFormatMoney } = require('./helpers/number');
const { brDateToGlobal, getMonthYear } = require('./helpers/date');

const { createHeadline } = require('./headline');
const {
  ColorScheme: { $MAIN_DARK, $MAIN_PURPLE, $WHITE },
  fillColor
} = require('./constants');

const layout = {
  paddingTop: rowIndex => (rowIndex > 0 ? 10 : 3),
  paddingBottom: rowIndex => (rowIndex > 0 ? 10 : 3),
  fillColor: rowIndex => (rowIndex === 0 ? $MAIN_PURPLE : fillColor(rowIndex)),
  hLineColor: () => 'white',
  vLineColor: () => 'white',
  paddingLeft: () => 0,
  paddingRight: () => 0
};

const creatHeader = (
  options = { alignment: 'center', color: $WHITE, lineHeight: 0.5 },
  marginSingleLine = [0, 10, 0, 0],
  marginDoubleLine = [0, 5, 0, 0]
) => [
  { text: 'Parcela', ...options, margin: marginSingleLine },
  { text: 'Data \n\n Vencimento', ...options, margin: marginDoubleLine },
  { text: 'Parcelas \n\n Mensais', ...options, margin: marginDoubleLine },
  { text: 'Amortização', ...options, margin: marginSingleLine },
  { text: 'Juros', ...options, margin: marginSingleLine },
  { text: 'Saldo \n\n Devedor', ...options, margin: marginDoubleLine },
  { text: 'Seguros \n\n (MIP + DFI)', ...options, margin: marginDoubleLine },
  { text: 'Taxa Adm', ...options, margin: marginSingleLine },
  { text: 'Prestação \n\n Mensal', ...options, margin: marginDoubleLine }
];

const createRow = ({ installments = [] }) => {
  const options = {
    alignment: 'center',
    color: $MAIN_DARK
  };

  const data = installments.map((installmentItem, index) => {
    const installmentNumber = index + 1;

    if (installmentItem) {
      const { installment, payment, interest, dueOn, balanceDue, mip, dfi, adm } = installmentItem;

      const mpiDfi = formatMoneyWOCurrency(removeFormatMoney(mip) + removeFormatMoney(dfi));
      const quota = installment.quota || formatMoneyWOCurrency(removeFormatMoney(payment) + removeFormatMoney(interest));

      return [
        { text: installmentNumber, ...options },
        { text: getMonthYear(brDateToGlobal(dueOn), true), ...options },
        { text: quota, ...options },
        { text: payment, ...options },
        { text: interest, ...options },
        { text: balanceDue, ...options },
        { text: mpiDfi, ...options },
        { text: adm, ...options },
        { text: installment, ...options }
      ];
    }
  });

  return data;
};

const installmentsTable = ({ installments }) => ({
  style: 'proposalTable',
  table: {
    headerRows: 1,
    widths: [57, 57, 57, 57, 57, 57, 57, 57, 57],
    heights: [30],
    body: [creatHeader(), ...createRow({ installments })]
  },
  layout,
  margin: [0, 0, 0, 10]
});

const installmentsPage = ({ proposal: { amortizationSchedule, installment: installments } }) => ({
  stack: [createHeadline(`PROPOSTA - TABELA ${amortizationSchedule}`), installmentsTable({ installments })]
});

module.exports = { installmentsPage };
