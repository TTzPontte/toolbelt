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
function createNotaryTable(data, title) {
  console.log({d:data.notaryResponse})
  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

  const headerTable = tableGenerator.createHeaderNegativeTable([
    title,
    data.summary.count,
    "Valor Total",
    formatCurrency(data.summary.balance)
  ]);

  const itemKey = `${title.toLowerCase()}Response`;

  if (data[itemKey] !== undefined) {
    const auxTable = data[itemKey].map((item) => {
      return [
        removeAccents(item?.officeNumber || "-"),
        formatCurrency(item?.amount || 0),
        formatDate(item?.occurrenceDate || ""),
        item?.city,
        item?.federalUnit,
        `${title} [${item?.federalUnit} - ${formatCurrency(
            item?.amount || 0
        )} - ${formatDateResume(item?.occurrenceDate || 0)}]`
      ];
    });

    const infoTable = tableGenerator.createAuxTable(
        [ "OfficeNumber", "Valor", "Data", "Cidade", "Estado", "Resumo"],
        auxTable
    );

    return [headerTable, infoTable];
  }

  return [headerTable];
}

const createNegativeTable = (data, title) => {
  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

  const headerTable = tableGenerator.createHeaderNegativeTable([
    title,
    data.summary.count,
    "Valor Total",
    formatCurrency(data.summary.balance)
  ]);

  if (data[`${title.toLowerCase()}Response`] !== undefined) {
    const auxTable = data[`${title.toLowerCase()}Response`].map(item => [
      removeAccents(item?.legalNature||'-'),
      item?.creditorName || '-',
      formatCurrency(item?.amount||0),
      formatDate(item?.occurrenceDate||''),
      item?.city,
      item?.federalUnit,
      `${title} [${item?.legalNature} - ${formatCurrency(item?.amount||0)} - ${formatDateResume(item?.occurrenceDate||0)}]`
    ]);

    const infoTable = tableGenerator.createAuxTable(
        ["Natureza", "Credor", "Valor", "Data", "Cidade", "Estado", "Resumo"],
        auxTable
    );

    return [headerTable, infoTable];
  }

  return [headerTable];
};

const generateReportContentPJ = (report, optional) => {
  const { registration, negativeData, facts } = report;
  const { pefin, refin, check, notary } = negativeData;
  // console.log(notary.notaryResponse)
  const partners = optional.partner.PartnerResponse.results;

  const getDirectors = () => {
    try {
      return optional.director.DirectorResponse.results;
    } catch {
      console.log("Não foi possível extrair o opcional director.");
      return undefined;
    }
  };

  const directors = getDirectors();

  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);


  const score = report.score.score || 0;
  const probInadimplencia = convertToPercentage(report.score.defaultRate || 0);
  const messageScore = report.score.message || "";

  return [
    { table: { widths: ["*"], body: [[{ stack: [{ text: "Serasa", style: "header", fontSize: 16 }], fillColor: "#ADD8E6" }]] } },
    { style: "contentPDF", text: "\nDados de Identificação" },
    tableGenerator.createInfoTable(
        ["Nome / Razão Social", "Documento", "Fundada em", "Status", "Cidade", "UF"],
        [[registration.companyName, formatDocumentNumber(registration.companyDocument), registration.foundationDate, registration.statusRegistration, registration.address.city, registration.address.state]]
    ),
    { style: "contentPDF", text: "\nDados de Score" },
    {
      columns: [
        { style: "tableScore", table: { widths: ["25%"], body: [[{ text: "Score", alignment: "center", color: "#FFFFFF", bold: "true", fontSize: 14 }], [{ text: score, alignment: "center", color: "#FFFFFF", bold: "true", fontSize: 26 }]] }, margin: [10, 15, 0, 0] },
        { text: ["\n\nProbabilidade de inadimplência\n---------------------------------------->"], alignment: "center", color: "#F", bold: true, fontSize: 14, margin: [-250, 0, 0, 0] },
        { style: "tableScore", table: { heights: [20], widths: ["35%"], body: [[{ text: probInadimplencia, style: "centeredText", color: "#FFFFFF", bold: "true", fontSize: 26 }]] }, margin: [-95, 30, 0, 0] }
      ]
    },
    { style: "contentPDF", fontSize: "12", color: "#b81414", text: "\n" + messageScore },
    { style: "contentPDF", text: "\nDados de Negativação" },
    ...createNegativeTable(pefin, "PEFIN"),
    ...createNegativeTable(refin, "REFIN"),
    ...createNegativeTable(check, "Cheque sem fundo"),
      ...createNotaryTable(notary, "Notary"),
    partners && { style: "contentPDF", text: "\nInformações Societárias" },
    tableGenerator.createInfoTable(["Número de Documento", "Nome ou Razão Social", "% Participação"], partners.map(partner => [formatDocumentNumber(partner.businessDocument || partner.documentId), partner.companyName || partner.name, partner.participationPercentage])),
    directors && { style: "contentPDF", text: "\nInformações de Diretoria" },
    tableGenerator.createInfoTable(["Número de Documento", "Nome", "Tem negativo?"], directors.map(director => [formatDocumentNumber(director.documentId), director.name, director.hasNegative]))
  ].filter(Boolean);
};


function generateReportContentPF(report, optional) {
  // Dados Pai - JSON
  const registration = report.registration;
  const negativeData = report.negativeData;
  const facts = report.facts.inquiry.inquiryResponse;

  // Dados de negativação
  const pefins = negativeData.pefin.pefinResponse;
  const refins = negativeData.refin.refinResponse;
  const checks = negativeData.check.checkResponse;
  const notarys = negativeData.notary.notaryResponse;

  // Dados Opcionais
  const partners = optional.partner.partnershipResponse;

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
          formatDocumentNumber(registration.documentNumber),
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


  const hasNegativeData = [ {
    style: "contentPDF",
    text: "\nDados de Negativação"
  }]

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

 function generateDDPJ({reports, optionalFeatures}) {
  // console.log("Dentro da função:\n", {reports, optionalFeatures});
  return {
    background: createBackground,
    content: generateReportContentPJ(
        reports[0],
        optionalFeatures
    ),
    styles,
    pageSize: { width: 595.276, height: 841.89 },
    pageMargins: [0, 0, 0, 0]
  };
}

 function generateDDPF({reports, optionalFeatures}) {
  // console.log("Dentro da função:\n", {reports, optionalFeatures});

  return {
    background: createBackground,
    content: generateReportContentPF(
        reports[0],
        optionalFeatures
    ),
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
module.exports={
  generateDDPJ,
  generateDDPF,
  createPDF
}
