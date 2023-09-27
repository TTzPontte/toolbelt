const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const diacritics = require("diacritics");
const {
  TableFactory,
  TableGenerator,
  createBackground,
  styles
} = require("./helpers/helpers.js");
const {
  convertToPercentage,
  formatDateResume,
  formatCurrency,
  formatDocumentNumber,
  removeAccents,
  formatDate
} = require("./helpers/utils");
const { writeFileSync } = require("fs");

function generateReportContentPF(report, optional) {
  // Dados Pai - JSON
  const registration = report.registration;
  const negativeData = report.negativeData;
  const facts = report.facts.inquiry?.inquiryResponse;

  // Dados de negativação
  const pefins = negativeData.pefin.pefinResponse;
  const refins = negativeData.refin.refinResponse;
  const checks = negativeData.check.checkResponse;
  const notarys = negativeData.notary.notaryResponse;

  // Dados Opcionais
  const partners = optional.partner.partnershipResponse;
  console.log({ partners });

  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

  // Tabela Inicial
  const registrationTable = tableGenerator.createInfoTable(
    [
      "Nome",
      "CPF",
      "Nome da Mãe",
      "Data de Nascimento",
      "Status",
      "Cidade",
      "UF"
    ],
    [
      [
        registration.consumerName,
        formatDocumentNumber(registration?.documentNumber),
        registration.motherName,
        formatDate(registration.birthDate),
        registration.statusRegistration,
        registration.address.city,
        registration.address.state
      ]
    ]
  );

  // Pefin
  const pefinTable = tableGenerator.createHeaderNegativeTable([
    "PEFIN",
    negativeData.pefin.summary.count,
    "Valor Total",
    formatCurrency(negativeData.pefin.summary.balance)
  ]);

  // Refin
  const refinTable = tableGenerator.createHeaderNegativeTable([
    "REFIN",
    negativeData.refin.summary.count,
    "Valor Total",
    formatCurrency(negativeData.refin.summary.balance)
  ]);

  // Check
  const checkTable = tableGenerator.createHeaderNegativeTable([
    "Cheque sem fundo",
    negativeData.check.summary.count,
    "Valor Total",
    formatCurrency(negativeData.check.summary.balance)
  ]);

  // Notary
  const notaryTable = tableGenerator.createHeaderNegativeTable([
    "Protesto Nacional",
    negativeData.notary.summary.count,
    "Valor Total",
    formatCurrency(negativeData.notary.summary.balance)
  ]);

  // Adaptar o código para lidar com notarys de pessoa física, se houver

  //Dados Score
  var score = report.score.score;
  var probInadimplencia = report.score.defaultRate;
  var messageScore = "";

  if (score === undefined) {
    score = 0;
    probInadimplencia = 0;
    messageScore = report.score.message;
  }

  probInadimplencia = convertToPercentage(probInadimplencia);

  const scoreTest = {
    columns: [
      // Tabela do Score
      {
        style: "tableScore",
        table: {
          widths: ["25%"],
          body: [
            [
              {
                text: "Score",
                alignment: "center",
                color: "#FFFFFF",
                bold: "true",
                fontSize: 14
              }
            ],
            [
              {
                text: score,
                alignment: "center",
                color: "#FFFFFF",
                bold: "true",
                fontSize: 26
              }
            ]
          ]
        },
        margin: [10, 15, 0, 0] // Margem para separar as tabelas
      },

      // Texto de probabilidade inadimplência
      {
        text: [
          {
            text: "\n\nProbabilidade de inadimplência\n---------------------------------------->",
            alignment: "center",
            color: "#F",
            bold: true,
            fontSize: 14
          }
        ],
        margin: [-250, 0, 0, 0]
      },

      // Círculo Teste
      {
        style: "tableScore",
        table: {
          heights: [20],
          widths: ["35%"],
          body: [
            [
              {
                text: probInadimplencia,
                style: "centeredText",
                color: "#FFFFFF",
                bold: "true",
                fontSize: 26
              }
            ]
          ]
        },
        margin: [-95, 30, 0, 0] // Margem para separar as tabelas
      }
    ]
  };

  // Tabela de Sócios
  var textPartner = "";
  if (partners !== undefined) {
    const partnerAuxTable = [];

    for (let partner = 0; partner < partners.length; partner++) {
      const participationPercentage = partners[partner].participationPercentage;

      if (participationPercentage > 0) {
        try {
          const partnerInfo = [
            formatDocumentNumber(partners[partner].businessDocument),
            partners[partner].companyName,
            participationPercentage
          ];

          partnerAuxTable.push(partnerInfo);
        } catch {
          const partnerInfo = [
            formatDocumentNumber(partners[partner].documentId),
            partners[partner].name,
            participationPercentage
          ];

          partnerAuxTable.push(partnerInfo);
        }
      }
    }

    var partnerInfoTable = tableGenerator.createInfoTable(
      ["Número de Documento", "Nome ou Razão Social", "% Participação"],
      partnerAuxTable
    );

    textPartner = { style: "contentPDF", text: "\nInformações Societárias" };
  }

  // Topo - Serasa
  const topo = {
    table: {
      widths: ["*"],
      body: [
        [
          {
            stack: [{ text: "Serasa", style: "header", fontSize: 16 }],
            fillColor: "#ADD8E6" // Fundo azul para o texto 'Serasa'
          }
        ]
      ]
    }
  };

  const hasNegativeData = [
    {
      style: "contentPDF",
      text: "\nDados de Negativação"
    }
  ];

  const returnArr = [
    topo,
    { style: "contentPDF", text: "\nDados de Identificação" },
    registrationTable,
    {
      style: "contentPDF",
      text: "\nDados de Score"
    },
    scoreTest,

    textPartner,
    partnerInfoTable
  ];
  if (pefins.length > 0) {
    returnArr.push(pefinTable);
  }
  if (refins.length > 0) {
    returnArr.push(refinTable);
  }
  if (checks.length > 0) {
    returnArr.push(checkTable);
  }
  if (notarys.length > 0) {
    returnArr.push(notaryTable);
  }
  return returnArr;
}


function generateDDPF({ reports, optionalFeatures }) {
  console.log("Dentro da função:\n", { reports, optionalFeatures });

  return {
    background: createBackground,
    content: generateReportContentPF(reports[0], optionalFeatures),
    styles,
    pageSize: { width: 595.276, height: 841.89 },
    pageMargins: [0, 0, 0, 0]
  };
}

function createPDF(dd, nomeCliente) {
  console.log("createPDF");
  // Create a new PDF document
  const pdfDocGenerator = pdfMake.createPdf(dd);

  // Download the PDF document
  pdfDocGenerator.download(nomeCliente + ".pdf");
}

// Export the functions you want to use elsewhere

module.exports = {
  generateDDPF,
  createPDF
};
