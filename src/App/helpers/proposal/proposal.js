const { formatMoney, formatPercentage } = require('./helpers/number');
const {
  fillColor,
  ColorScheme: { $MAIN_PURPLE }
} = require('./constants');

const formatValue = value => ({ text: value, bold: true, fontSize: 10, color: $MAIN_PURPLE });

const layout = {
  defaultBorder: false,
  fillColor: rowIndex => fillColor(rowIndex),
  paddingLeft: () => 15
};

const proposal = ({
  proposal: {
    first_installment,
    dueDay,
    gracePeriod,
    propertyValue,
    reportPropertyValue,
    ltv,
    netLoan,
    iof,
    teo,
    registry_value,
    index,
    eCpfInvoiceValue
  },
  final
}) => {
  const propertyRealValue = reportPropertyValue || propertyValue;
  const data = {
    stack: [
      {
        style: 'proposalTable',
        table: {
          headerRows: 0,
          widths: ['*', 100],
          body: [
            ['PRIMEIRA PRESTAÇÃO', formatValue(formatMoney(first_installment))],
            ['DIA DO VENCIMENTO', formatValue(dueDay)],
            ['INDEXADOR', formatValue(index)],
            ['CARÊNCIA', formatValue(`${gracePeriod ? `${gracePeriod} meses` : 'Nenhum'}`)],
            ['VALOR DO IMÓVEL', formatValue(formatMoney(propertyRealValue))],
            ['LTV', formatValue(formatPercentage(ltv * 100))]
          ]
        },
        layout,
        margin: [0, 40, 0, 0]
      },
      {
        style: 'proposalTable',
        table: {
          headerRows: 0,
          widths: ['*', 100],
          body: [
            ['VALOR LÍQUIDO', formatValue(formatMoney(netLoan))],
            ['IOF', formatValue(formatMoney(iof))],
            ['TAG', formatValue(formatMoney(teo))],
            ['E-CPF', formatValue(formatMoney(eCpfInvoiceValue))],
            ['REGISTRO', formatValue(formatMoney(registry_value))]
          ]
        },
        layout,
        margin: [0, 20, 0, 0]
      }
    ],
    margin: [45, 30, 0, 0]
  };

  if (!final) {
    data.stack.push({
      text:
        '* Os valores demonstrados nesta proposta são informações preliminares e de caráter provisório, estando condicionadas à posterior comprovação de dados e análise de crédito, podendo sofrer alterações.',
      fontSize: 10,
      margin: [0, 15, 0, 0],
      bold: false
    });
  }

  return data;
};

module.exports = { proposalPage: proposal };
