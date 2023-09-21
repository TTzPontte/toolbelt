import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const diacritics = require("diacritics");
const {
  TableFactory,
  TableGenerator,
  createBackground,
  createRect,
  createHeaderStack,
  styles,
  convertToPercentage,
  formatDateResume,
  formatCurrency,
  formatDocumentNumber,
  removeAccents,
  formatDate
} = require("./helpers.js");

function generateReportContentPJ(report, optional) {
  //Dados Pai - JSON
  const registration = report.registration;
  const negativeData = report.negativeData;
  const facts = report.facts.pefinResponse;

  //Dados de negativação
  const pefins = negativeData.pefin.pefinResponse;
  const refins = negativeData.refin.refinResponse;
  const checks = negativeData.check.checkResponse;
  const notarys = negativeData.notary.notoryResponse;

  // Dados Opcionais
  const partners = optional.partner.PartnerResponse.results;

  // Opcional - Diretores
  var directors = undefined;
  try {
    directors = optional.director.DirectorResponse.results;
    console.log({ directors });
  } catch {
    directors = undefined;
    console.log("Não foi possível extrair o opcional director.");
  }

  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

  // Tabela Inicial
  const registrationTable = tableGenerator.createInfoTable(
    [
      "Nome / Razão Social",
      "Documento",
      "Fundada em",
      "Status",
      "Cidade",
      "UF"
    ],
    [
      [
        registration.companyName,
        formatDocumentNumber(registration.companyDocument),
        registration.foundationDate,
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

  if (pefins !== undefined) {
    const pefinAuxTable = [];

    for (let pefin = 0; pefin < pefins.length; pefin++) {
      const partnerInfo = [
        removeAccents(pefins[pefin].legalNature),
        pefins[pefin].creditorName,
        formatCurrency(pefins[pefin].amount),
        formatDate(pefins[pefin].occurrenceDate),
        pefins[pefin].city,
        pefins[pefin].federalUnit,
        "PEFIN [" +
          pefins[pefin].legalNature +
          " - " +
          formatCurrency(pefins[pefin].amount) +
          " - " +
          formatDateResume(pefins[pefin].occurrenceDate) +
          "]"
      ];
      pefinAuxTable.push(partnerInfo);
    }

    var pefinInfoTable = tableGenerator.createAuxTable(
      ["Natureza", "Credor", "Valor", "Data", "Cidade", "Estado", "Resumo"],
      pefinAuxTable
    );
  }

  // Refin
  const refinTable = tableGenerator.createHeaderNegativeTable([
    "REFIN",
    negativeData.refin.summary.count,
    "Valor Total",
    formatCurrency(negativeData.refin.summary.balance)
  ]);

  if (refins !== undefined) {
    const refinAuxTable = [];

    for (let refin = 0; refin < refins.length; refin++) {
      const partnerInfo = [
        removeAccents(refins[refin].legalNature),
        refins[refin].creditorName,
        formatCurrency(refins[refin].amount),
        formatDate(refins[refin].occurrenceDate),
        refins[refin].city,
        refins[refin].federalUnit,
        "REFIN [" +
          refins[refin].legalNature +
          " - " +
          formatDateResume(refins[refin].occurrenceDate) +
          "]"
      ];
      refinAuxTable.push(partnerInfo);
    }

    var refinInfoTable = tableGenerator.createAuxTable(
      ["Natureza", "Credor", "Valor", "Data", "Cidade", "Estado", "Resumo"],
      refinAuxTable
    );
  }

  // Check
  const checkTable = tableGenerator.createHeaderNegativeTable([
    "Cheque sem fundo",
    negativeData.check.summary.count,
    "Valor Total",
    formatCurrency(negativeData.check.summary.balance)
  ]);

  if (checks !== undefined) {
    const checkAuxTable = [];

    for (let check = 0; check < checks.length; check++) {
      const partnerInfo = [
        removeAccents(checks[check].legalNature),
        checks[check].creditorName,
        formatCurrency(checks[check].amount),
        formatDate(checks[check].occurrenceDate),
        checks[check].city,
        checks[check].federalUnit,
        "Cheque sem fundo [" +
          checks[check].legalNature +
          " - " +
          formatDateResume(checks[check].occurrenceDate) +
          "]"
      ];
      checkAuxTable.push(partnerInfo);
    }

    var checkInfoTable = tableGenerator.createAuxTable(
      ["Natureza", "Credor", "Valor", "Data", "Cidade", "Estado", "Resumo"],
      checkAuxTable
    );
  }

  // notary
  const notaryTable = tableGenerator.createHeaderNegativeTable([
    "Prostesto Nacional",
    negativeData.notary.summary.count,
    "Valor Total",
    formatCurrency(negativeData.notary.summary.balance)
  ]);

  if (notarys !== undefined) {
    const notaryAuxTable = [];

    for (let notary = 0; notary < notarys.length; notary++) {
      const partnerInfo = [
        removeAccents(notarys[notary].legalNature),
        notarys[notary].creditorName,
        formatCurrency(notarys[notary].amount),
        formatDate(notarys[notary].occurrenceDate),
        notarys[notary].city,
        notarys[notary].federalUnit,
        "Protesto Nacional [" +
          notarys[notary].legalNature +
          " - " +
          formatDateResume(notarys[notary].occurrenceDate) +
          "]"
      ];
      notaryAuxTable.push(partnerInfo);
    }

    var notaryInfoTable = tableGenerator.createAuxTable(
      ["Natureza", "Credor", "Valor", "Data", "Cidade", "Estado", "Resumo"],
      notaryAuxTable
    );
  }

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

  // Tabela de Sócios
  var textDirector = "";
  if (directors !== undefined) {
    const directorAuxTable = [];

    for (let director = 0; director < directors.length; director++) {
      const directorInfo = [
        formatDocumentNumber(directors[director].documentId),
        directors[director].name,
        directors[director].hasNegative
      ];

      directorAuxTable.push(directorInfo);
    }

    var directorInfoTable = tableGenerator.createInfoTable(
      ["Número de Documento", "Nome", "Tem negativo?"],
      directorAuxTable
    );

    textDirector = { style: "contentPDF", text: "\nInformações de Diretoria" };
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

  return [
    topo,
    { style: "contentPDF", text: "\nDados de Identificação" },
    registrationTable,
    {
      style: "contentPDF",
      text: "\nDados de Score"
    },
    scoreTest, //Mensagem de erro do score
    {
      style: "contentPDF",
      fontSize: "12",
      color: "#b81414",
      text: "\n" + messageScore
    },
    {
      style: "contentPDF",
      text: "\nDados de Negativação"
    },
    pefinTable,
    pefinInfoTable,
    refinTable,
    refinInfoTable,
    checkTable,
    checkInfoTable,
    notaryTable,
    notaryInfoTable,
    textPartner,
    partnerInfoTable,
    textDirector,
    directorInfoTable
  ];
}

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

export function generateDDPJ(jsonData) {
  console.log("Dentro da função:\n", jsonData);
  return {
    background: createBackground,
    content: generateReportContentPJ(
      jsonData.reports[0],
      jsonData.optionalFeatures
    ),
    styles,
    pageSize: { width: 595.276, height: 841.89 },
    pageMargins: [0, 0, 0, 0]
  };
}

export function generateDDPF(jsonData) {
  console.log("Dentro da função:\n", jsonData);

  return {
    background: createBackground,
    content: generateReportContentPF(
      jsonData.reports[0],
      jsonData.optionalFeatures
    ),
    styles,
    pageSize: { width: 595.276, height: 841.89 },
    pageMargins: [0, 0, 0, 0]
  };
}

export function createPDF(dd, nomeCliente) {
  console.log("createPDF");
  // Create a new PDF document
  const pdfDocGenerator = pdfMake.createPdf(dd);

  // Download the PDF document
  pdfDocGenerator.download(nomeCliente + ".pdf");
}

/*
// Teste pra exibir resultados das funções
const ddPJ = generateDDPJ(reportDataPJ);
const ddPF = generateDDPF(reportDataPF);

console.log(JSON.stringify(ddPJ, null, 2).replace("null,",""));

*/
