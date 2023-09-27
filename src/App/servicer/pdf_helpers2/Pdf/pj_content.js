const {
  removeAccents,
  formatCurrency,
  formatDate,
  formatDateResume,
  formatDocumentNumber,
  convertToPercentage
} = require("./helpers/utils");

const {
  TableFactory,
  TableGenerator,
  createBackground,
  styles
} = require("./helpers/helpers");

// Function to create the Registration Table
const createRegistrationTable = (registration, tableGenerator) => {
  const registrationHeaders = [
    "Nome / Razão Social",
    "Documento",
    "Fundada em",
    "Status",
    "Cidade",
    "UF"
  ];
  const registrationValues = [
    [
      registration.companyName,
      formatDocumentNumber(registration.companyDocument),
      registration.foundationDate,
      registration.statusRegistration,
      registration.address.city,
      registration.address.state
    ]
  ];

  return tableGenerator.createInfoTable(registrationHeaders, registrationValues);
};

// Function to create a Negative Data Table
const createNegativeDataTable = (negativeType, summary, data, tableGenerator) => {
  const header = tableGenerator.createHeaderNegativeTable([
    negativeType,
    summary.count,
    "Valor Total",
    formatCurrency(summary.balance)
  ]);

  const content = extractNegativeData(negativeType, data, tableGenerator);

  if (content.length > 0) {
    return [header].concat(
        tableGenerator.createAuxTable(
            ["Natureza", "Credor", "Valor", "Data", "Cidade", "Estado", "Resumo"],
            content
        )
    );
  }
  return [header];
};

// Function to extract Negative Data
const extractNegativeData = (negativeType, data, tableGenerator) => {
  const tableData = [];

  if (data) {
    for (const item of data) {
      const info = [
        removeAccents(item.legalNature),
        item.creditorName,
        formatCurrency(item.amount),
        formatDate(item.occurrenceDate),
        item.city,
        item.federalUnit,
        `${negativeType} [${item.legalNature} - ${formatCurrency(
            item.amount
        )} - ${formatDateResume(item.occurrenceDate)}]`
      ];
      tableData.push(info);
    }
  }

  return tableData;
};

// Function to create the Score Table
const createScoreTable = (score, probInadimplencia, messageScore, tableGenerator) => {
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
                bold: true,
                fontSize: 14
              }
            ],
            [
              {
                text: score,
                alignment: "center",
                color: "#FFFFFF",
                bold: true,
                fontSize: 26
              }
            ]
          ]
        },
        margin: [10, 15, 0, 0]
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
                bold: true,
                fontSize: 26
              }
            ]
          ]
        },
        margin: [-95, 30, 0, 0]
      }
    ]
  };

  return [
    scoreTest,
    {
      style: "contentPDF",
      fontSize: "12",
      color: "#b81414",
      text: "\n" + messageScore
    }
  ];
};

// Function to create the Partner Table
const createPartnerTable = (partners, tableGenerator) => {
  const partnerAuxTable = [];

  for (const partner of partners) {
    const participationPercentage = partner.participationPercentage;

    if (participationPercentage > 0) {
      const partnerInfo = [
        formatDocumentNumber(partner.businessDocument || partner.documentId),
        partner.companyName || partner.name,
        participationPercentage
      ];

      partnerAuxTable.push(partnerInfo);
    }
  }

  const partnerInfoTable = tableGenerator.createInfoTable(
      ["Número de Documento", "Nome ou Razão Social", "% Participação"],
      partnerAuxTable
  );

  return partnerInfoTable;
};

// Function to create the Director Table
const createDirectorTable = (directors, tableGenerator) => {
  const directorAuxTable = [];

  for (const director of directors) {
    const directorInfo = [
      formatDocumentNumber(director.documentId),
      director.name,
      director.hasNegative
    ];

    directorAuxTable.push(directorInfo);
  }

  const directorInfoTable = tableGenerator.createInfoTable(
      ["Número de Documento", "Nome", "Tem negativo?"],
      directorAuxTable
  );

  return directorInfoTable;
};

function generateReportContentPJ(report, optional) {
  const registration = report.registration;
  const negativeData = report.negativeData;
  const facts = report.facts.pefinResponse;

  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

  const registrationTable = createRegistrationTable(registration, tableGenerator);

  const pefinTable = createNegativeDataTable("PEFIN", negativeData.pefin.summary, negativeData.pefin.pefinResponse, tableGenerator);
  const refinTable = createNegativeDataTable("REFIN", negativeData.refin.summary, negativeData.refin.refinResponse, tableGenerator);
  const checkTable = createNegativeDataTable("Cheque sem fundo", negativeData.check.summary, negativeData.check.checkResponse, tableGenerator);
  const notaryTable = createNegativeDataTable("Prosteto Nacional", negativeData.notary.summary, negativeData.notary.notoryResponse, tableGenerator);

  const score = report.score.score || 0;
  const probInadimplencia = report.score.defaultRate || 0;
  const messageScore = report.score.message || "";

  const scoreTable = createScoreTable(score, probInadimplencia, messageScore, tableGenerator);

  const partners = optional.partner.PartnerResponse.results;
  const partnerInfoTable = createPartnerTable(partners, tableGenerator);

  let directors = undefined;
  try {
    directors = optional.director.DirectorResponse.results;
    console.log({ directors });
  } catch {
    directors = undefined;
    console.log("Não foi possível extrair o opcional director.");
  }
  const directorInfoTable = createDirectorTable(directors, tableGenerator);

  const topo = {
    table: {
      widths: ["*"],
      body: [
        [
          {
            stack: [{ text: "Serasa", style: "header", fontSize: 16 }],
            fillColor: "#ADD8E6"
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
    ...scoreTable,
    {
      style: "contentPDF",
      text: "\nDados de Negativação"
    },
    ...pefinTable,
    ...refinTable,
    ...checkTable,
    ...notaryTable,
    {
      style: "contentPDF",
      text: "\nInformações Societárias"
    },
    [partnerInfoTable],
    {
      style: "contentPDF",
      text: "\nInformações de Diretoria"
    },
    [directorInfoTable]
  ];
}

function generateDDPJ({ reports, optionalFeatures }) {
  console.log("Dentro da função:\n", { reports, optionalFeatures });
  return {
    background: createBackground,
    content: generateReportContentPJ(reports[0], optionalFeatures),
    styles,
    
    pageSize: { width: 595.276, height: 841.89 },
    pageMargins: [0, 0, 0, 0]
  };
}

module.exports = {
  generateDDPJ
};
