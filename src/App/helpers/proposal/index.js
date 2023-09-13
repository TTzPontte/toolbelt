import pdfMake from "pdfmake/build/pdfmake";

const { footer, header } = require("./header-footer");
const { introductionPage } = require("./introduction");
const { proposalPage } = require("./proposal");
const { debtsPage } = require("./debts");
const { installmentsPage } = require("./installments");
const { signature } = require("./signature");
const { glossaryPage } = require("./glossary");

const {
  ColorScheme: { $MAIN_DARK }
} = require("./constants");

const fonts = {
  Roboto: {
    normal: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf',
    bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf',
    italics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf',
    bolditalics: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-MediumItalic.ttf'
  }
};

const buildContent = ({ proposal, contract, final }) => {
  const content = [
    introductionPage({ proposal, user: contract.user }),
    proposalPage({ proposal, final }),
    debtsPage({ contract, proposal }),
    installmentsPage({ proposal })
  ];

  if (final) {
    content.push(signature({ contract }));
  }

  content.push(...glossaryPage());

  return content;
};

const getDocDefinition = ({ proposal, contract, final }) => ({
  content: buildContent({ proposal, contract, final }),
  footer,
  header: () => header({ user: contract.user }),
  pageSize: "A4",
  pageMargins: [40, 80, 40, 80],
  styles: {
    proposalTable: {
      margin: [15, 15, 15, 15],
      fontSize: 8,
      paddingLeft: 5
    }
  },
  defaultStyle: {
    font: "Roboto",
    color: $MAIN_DARK
  }
});

const generatePDF = async ({ proposal, contract, final }) => {
  const docDefinition = getDocDefinition({ proposal, contract, final });

  const pdfBuffer = await new Promise((resolve) => {
    
    const doc = pdfMake.createPdf(docDefinition, null, fonts);

    doc.getBuffer(resolve);
  });

  return pdfBuffer;
};

export { generatePDF };
