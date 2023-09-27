const {formatPercentage} = require('./helpers/number');
const {
  fillColor,
  ColorScheme: {$MAIN_PURPLE}
} = require('./constants');

const formatValue = value => ({text: value, bold: true, fontSize: 10, color: $MAIN_PURPLE});

const layout = {
  defaultBorder: false,
  fillColor: rowIndex => fillColor(rowIndex),
  paddingLeft: () => 15
};

const receiverSection = ({
                           receiver = 'MAUÁ CAPITAL REAL ESTATE DEBT III \n FUNDO DE INVESTIMENTO MULTIMERCADO',
                           cnpj = '30.982.547/0001-09',
                           address = 'Av. Brg. Faria Lima, 1485 - 18º andar - Pinheiros, \n   São Paulo - SP, 01452-002',
                           date = 'SÃO PAULO, 05 DE FEVEREIRO DE 2023'
                         }) => ({
  style: 'proposalTable',
  table: {
    headerRows: 0,
    widths: ['40%', '60%'],
    body: [
      ['FONTE RECEBEDORA', receiver],
      ['CNPJ', cnpj],
      ['ENDEREÇO', address],
      ['DATA', date]
    ]
  },
  layout,
  margin: [0, 40, 0, 10]
});
const participantsSection = ({
                               name = 'PADANIA CONSULTORIA EIRELI',
                               documentNumber = '06.109.309/0001-09',
                               participation = '0%'
                             }) => ({
  style: 'proposalTable',
  table: {
    headerRows: 0,
    widths: ['40%', '60%'],
    body: [
      ['NOME', name],
      ['CPF/CNPJ', documentNumber],
      ['PARTICIPAÇÃO', formatValue(formatPercentage(participation))]
    ]
  },
  layout,
  margin: [0, 40, 0, 0]
});

const proposal = ({proposal: {participants, receiverInfo}}) => {
  const rowsParticipants = participants.map(participantsSection);
  const rowReceiverInfo = receiverSection(receiverInfo);
  const margins = participants.length <= 4 ? [0, 20, 0, 0] : [0, 40, 0, 0]
  const makeMargins = (participant) => {

    const margin = {
      margin: [0, 40, 0, 0]
    }
    if (participants.length >= 3) {
      margin.margin = margins
    }
    return {
      ...participant,
      ...margin
    }
  }
  // const newRowsParticipants= rowsParticipants.map(makeMargins)

  return {
    columns: [
      {
        // stack: [ rowReceiverInfo, newRowsParticipants],
        stack: [ rowReceiverInfo, rowsParticipants],
        margin: [45, 30, 0, 0]
      }
    ]
  };
};

module.exports = {proposalPage: proposal};
