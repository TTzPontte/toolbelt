const pdfMake = require("pdfmake/build/pdfmake");
const pdfFonts = require("pdfmake/build/vfs_fonts");

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const diacritics = require("diacritics");
const {
  convertToPercentage,
  createBackground,
  styles,
  formatDateResume,
  formatCurrency,
  formatDocumentNumber,
  removeAccents,
  formatDate
} = require("./helpers/utils");

class TableFactory {
  constructor(style) {
    this.style = style;
  }

  createTable(widths, body) {
    return {
      style: this.style,
      table: { widths, body },
      margin: [10, 15, 10, 0]
    };
  }

  createTableNegative(widths, body) {
    return {
      style: this.style,
      table: { widths, body },
      margin: [10, 1, 10, 0]
    };
  }

  createCell(text, style) {
    return { text, style };
  }
}

class TableGenerator {
  constructor(tableFactory) {
    this.tableFactory = tableFactory;
  }

  createScoreTable(score) {
    const widths = ["25%"];
    const body = [
      [this.tableFactory.createCell("Score", "header")],
      [this.tableFactory.createCell(score.toString(), "content")]
    ];
    return this.tableFactory.createTable(widths, body);
  }

  createSummaryTable(title, count, value) {
    const widths = ["14%", "14%", "14%", "14%"];
    const body = [
      [
        this.tableFactory.createCell(title, "header"),
        this.tableFactory.createCell(count, "header"),
        this.tableFactory.createCell("Valor Total", "header"),
        this.tableFactory.createCell(value, "header")
      ]
    ];
    return this.tableFactory.createTable(widths, body);
  }

  createInfoTable(headers, values) {
    const headerRow = headers?.map((header) =>
      this.tableFactory.createCell(header, "header")
    );
    const valueRows = values.map((item) =>
      item.map((value) => this.tableFactory.createCell(value, "content"))
    );

    return this.tableFactory.createTable(Array(headers.length).fill("*"), [
      headerRow,
      ...valueRows
    ]);
  }

  createHeaderNegativeTable(headers) {
    const headerRow = headers.map((header) =>
      this.tableFactory.createCell(header, "header")
    );

    return this.tableFactory.createTable(Array(headers.length).fill("16%"), [
      headerRow
    ]);
  }

  createAuxTable(headers, values) {
    const headerRow = headers.map((header) =>
      this.tableFactory.createCell(header, "header")
    );
    const valueRows = values.map((item) =>
      item.map((value) => this.tableFactory.createCell(value, "content"))
    );

    return this.tableFactory.createTableNegative(
      Array(headers.length).fill("*"),
      [headerRow, ...valueRows]
    );
  }
}

const createTable = (data, title, itemKeys, headers) => {
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
    const auxTable = data[itemKey].map((item) =>
      itemKeys.map((key) => key(item))
    );
    const infoTable = tableGenerator.createAuxTable(headers, auxTable);
    return [headerTable, infoTable];
  }

  return [headerTable];
};

const createNotaryTable = (data, title) =>
  createTable(
    data,
    title,
    [
      (item) => removeAccents(item?.officeNumber || "-"),
      (item) => formatCurrency(item?.amount || 0),
      (item) => formatDate(item?.occurrenceDate || ""),
      (item) => item?.city,
      (item) => item?.federalUnit,
      (item) =>
        `${title} [${item?.federalUnit} - ${formatCurrency(
          item?.amount || 0
        )} - ${formatDateResume(item?.occurrenceDate || 0)}]`
    ],
      data.summary.count > 0?["OfficeNumber", "Valor", "Data", "Cidade", "Estado", "Resumo"]:[]
  );

const createNegativeTable = (data, title) => {
  const headers = data.summary.count > 0?["Natureza", "Credor", "Valor", "Data", "Cidade", "Estado", "Resumo"]:[]
  console.log({data})

  return createTable(
    data,
    title,
    [
      (item) => removeAccents(item?.legalNature || "-"),
      (item) => item?.creditorName || "-",
      (item) => formatCurrency(item?.amount || 0),
      (item) => formatDate(item?.occurrenceDate || ""),
      (item) => item?.city,
      (item) => item?.federalUnit,
      (item) =>
        `${title} [${item?.legalNature} - ${formatCurrency(
          item?.amount || 0
        )} - ${formatDateResume(item?.occurrenceDate || 0)}]`
    ],
    headers
  );
}

const makeRegistrationTable = (registration, tableGenerator) => {
  function getStatus(text) {
    const words = text.split(' ');
    if (text.includes(':')) {
      return words[words.length - 1];
    } else {
      return text;
    }
  }

  const {statusRegistration} = registration
  console.log({statusRegistration})
  // Define the headers for the registration table
  const headers = [
    "Nome / Razão Social",
    "Documento",
    "Fundada em",
    "Status",
    "Cidade",
    "UF"
  ];

  // Create the data row based on the registration object
  const dataRow = [
    registration.companyName,
    formatDocumentNumber(registration.companyDocument),
    registration.foundationDate,
      getStatus(registration.statusRegistration),
    registration.address.city,
    registration.address.state
  ];

  // Utilize the createInfoTable method to generate the table
  const table = tableGenerator.createInfoTable(headers, [dataRow]);

  return table;
};

// Usage within generateReportContentPF or generateReportContentPJ

const generateReportContentPJ = (report, optional) => {
  const { registration, negativeData, facts } = report;
  const { pefin, refin, check, notary } = negativeData;
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
    {
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
    },
    {
      style: "contentPDF",
      text: "\nDados de Identificação"
    },
    makeRegistrationTable(registration, tableGenerator),
    {
      style: "contentPDF",
      text: "\nDados de Score"
    },
    {
      columns: [
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
          margin: [10, 15, 0, 0]
        },
        {
          text: [
            "\n\nProbabilidade de inadimplência\n---------------------------------------->"
          ],
          alignment: "center",
          color: "#F",
          bold: true,
          fontSize: 14,
          margin: [-250, 0, 0, 0]
        },
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
          margin: [-95, 30, 0, 0]
        }
      ]
    },
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
    ...createNegativeTable(pefin, "PEFIN"),
    ...createNegativeTable(refin, "REFIN"),
    ...createNegativeTable(check, "Cheque sem fundo"),
    ...createNotaryTable(notary, "Notary"),
    partners && {
      style: "contentPDF",
      text: "\nInformações Societárias"
    },
    tableGenerator.createInfoTable(
      ["Número de Documento", "Nome ou Razão Social", "% Participação"],
      partners.map((partner) => [
        formatDocumentNumber(partner.businessDocument || partner.documentId),
        partner.companyName || partner.name,
        partner.participationPercentage
      ])
    ),
    directors && {
      style: "contentPDF",
      text: "\nInformações de Diretoria"
    },
    tableGenerator.createInfoTable(
      ["Número de Documento", "Nome", "Tem negativo?"],
      directors.map((director) => [
        formatDocumentNumber(director.documentId),
        director.name,
        director.hasNegative
      ])
    )
  ].filter(Boolean);
};
const makePartners = (partners, tableGenerator) => {
  if (!partners) {
    return [];
  }

  // Check if any partner has a companyName or name
  const hasName = partners.some(
      partner => partner.companyName || partner.name
  );

  // Adjust header row based on presence of companyName or name
  const headerRow = [
    "Número de Documento",
    ...(hasName ? ["Nome ou Razão Social"] : []),
    "% Participação"
  ].map((header) => tableGenerator.tableFactory.createCell(header, "header"));

  // Adjust body rows based on presence of companyName or name
  const bodyRows = partners.map((partner) => {

    console.log(partner.businessDocument || partner.documentId)
    console.log(formatDocumentNumber(partner.businessDocument || partner.documentId))
    return[
      formatDocumentNumber(partner.businessDocument || partner.documentId),
      ...(hasName ? [partner.companyName || partner.name] : []),
      partner.participationPercentage
    ].map((value) => tableGenerator.tableFactory.createCell(value, "content"))
  }
  )

  const tableBody = [headerRow, ...bodyRows];

  const table = tableGenerator.tableFactory.createTable(
      Array(headerRow.length).fill("*"),
      tableBody
  );

  return [
    {
      style: "contentPDF",
      text: "\nParticipações Societárias"
    },
    table
  ];
};
const generateReportContentPF = (report, optional) => {
  const { registration, negativeData } = report;
  const { pefin, refin, check, notary } = negativeData;
  const partners = optional.partner.partnershipResponse;

  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

  const score = report.score.score || 0;
  const probInadimplencia = convertToPercentage(report.score.defaultRate || 0);
  const messageScore = report.score.message || "";
  console.log({ registration, partners });
  return [
    {
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
    },
    {
      style: "contentPDF",
      text: "\nDados de Identificação"
    },
    tableGenerator.createInfoTable(
      ["Nome", "Documento", "Nascimento", "Status", "Cidade", "UF"],
      [
        [
          registration.consumerName,
          formatDocumentNumber(registration.documentNumber),
          registration.birthDate,
          registration.statusRegistration,
          registration.address.city,
          registration.address.state
        ]
      ]
    ),
    {
      style: "contentPDF",
      text: "\nDados de Score"
    },
    {
      columns: [
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
          margin: [10, 15, 0, 0]
        },
        {
          text: [
            "\n\nProbabilidade de inadimplência\n---------------------------------------->"
          ],
          alignment: "center",
          color: "#F",
          bold: true,
          fontSize: 14,
          margin: [-250, 0, 0, 0]
        },
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
          margin: [-95, 30, 0, 0]
        }
      ]
    },
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
    ...createNegativeTable(pefin, "PEFIN"),
    ...createNegativeTable(refin, "REFIN"),
    ...createNegativeTable(check, "Cheque sem fundo"),
    ...createNotaryTable(notary, "Notary"),
      ...makePartners(partners, tableGenerator)
  ].filter(Boolean);
};

function generateDDPJ({ reports, optionalFeatures }) {
  // console.log("Dentro da função:\n", {reports, optionalFeatures});
  return {
    background: createBackground,
    content: generateReportContentPJ(reports[0], optionalFeatures),
    styles,
    pageSize: { width: 595.276, height: 841.89 },
    pageMargins: [0, 0, 0, 0]
  };
}

function generateDDPF({ reports, optionalFeatures }) {
  // console.log("Dentro da função:\n", {reports, optionalFeatures});

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

module.exports = {
  generateDDPJ,
  generateDDPF,
  createPDF
};
