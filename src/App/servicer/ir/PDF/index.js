// to package within lamba uncon
// const PdfPrinter = require('../../layers/common/node_modules/pdfmake');
const PdfPrinter = require('pdfmake');
const {footer, header} = require('./header-footer');
const {proposalPage} = require('./proposal');
const {installmentsPage} = require('./installments');
const {IntroductionPage} = require('./Pages/introductionPage/introduction');

const $MAIN_DARK = '#3B3349';
// const path = process.env.NODE_ENV === 'test' ? './PDF/' : '/opt/pdf/ir/PDF/';
const path ='./PDF/'

const fonts = {
  Muli: {
    normal: `${path}assets/fonts/muli-regular.ttf`,
    bold: `${path}assets/fonts/muli-bold.ttf`,
    italics: `${path}assets/fonts/muli-regularitalic.ttf`,
    bolditalics: `${path}assets/fonts/muli-bolditalic.ttf`
  }
};

const buildContent = ({proposal, contractInfo}) => [
  IntroductionPage({contractInfo}), // intro(),
  proposalPage({proposal}),
  installmentsPage({proposal, contractInfo})
];

const getDocDefinition = ({contractInfo, proposal}) => {
  const contentParticipants = proposal.participants.map(() => buildContent({contractInfo, proposal}));

  return {
    content: contentParticipants,
    footer,
    header: page => header(page, proposal.participants, contentParticipants),
    pageSize: 'A4',
    pageMargins: [40, 80, 40, 80],
    styles: {
      proposalTable: {
        margin: [15, 15, 15, 15],
        fontSize: 8,
        paddingLeft: 5
      }
    },
    defaultStyle: {
      font: 'Muli',
      color: $MAIN_DARK
    },
    pageBreak: 'after'
  };
};

const generatePDF = async ({contractInfo, proposal}) => {
  console.log('----------- GENERATING PDF ----------- ');
  console.log('----------- GENERATING PDF ----------- ');
  console.log('----------- GENERATING PDF ----------- ');
  const docDefinition = getDocDefinition({
    contractInfo,
    proposal
  });

  const pdfBuffer = await new Promise(resolve => {
    let printer = new PdfPrinter(fonts);
    var doc = printer.createPdfKitDocument(docDefinition, {});

    doc.end();

    const buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => {
      const pdfData = Buffer.concat(buffers);
      resolve(pdfData);
    });
    console.log({doc})
  });

  return pdfBuffer;
};

module.exports = {generateTaxReturnPdf: generatePDF};
