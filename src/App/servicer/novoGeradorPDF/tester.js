const pdfMake = require("pdfmake");
const diacritics = require("diacritics");

// Helper functions
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function formatDocumentNumber(documentNumber) {
  // Implement your formatting logic here if needed
  return documentNumber;
}

function formatCurrency(amount) {
  // Implement your currency formatting logic here if needed
  return amount;
}

function removeAccents(input) {
  return diacritics.remove(input);
}

function convertToPercentage(value) {
  return `${value}%`;
}

class TableFactory {
  constructor(style) {
    this.style = style;
  }

  createTable(headers, body) {
    return {
      table: {
        headerRows: 1,
        widths: Array(headers.length).fill("*"),
        body: [headers, ...body]
      },
      layout: this.style
    };
  }

  createInfoTable(headers, data) {
    const body = data.map((row) => row.map((item) => ({ text: item })));
    return this.createTable(headers, body);
  }

  createHeaderTable(headers, body) {
    return this.createTable(
      headers.map((header) => ({ text: header, style: "tableHeader" })),
      body.map((row) => row.map((item) => ({ text: item, style: "tableData" })))
    );
  }

  createHeaderNegativeTable(headers) {
    return this.createTable(
      headers.map((header) => ({ text: header, style: "tableHeader" })),
      []
    );
  }
}

class TableGenerator {
  constructor(tableFactory) {
    this.tableFactory = tableFactory;
  }

  createTable(headers, body) {
    return this.tableFactory.createTable(headers, body);
  }

  createInfoTable(headers, data) {
    return this.tableFactory.createInfoTable(headers, data);
  }

  createHeaderTable(headers, body) {
    return this.tableFactory.createHeaderTable(headers, body);
  }

  createHeaderNegativeTable(headers) {
    return this.tableFactory.createHeaderNegativeTable(headers);
  }
}

function generateReportContent(report, optional) {
  const registration = report.registration;
  const negativeData = report.negativeData;
  const facts = report.facts.inquiry.inquiryResponse;

  const pefins = negativeData.pefin.pefinResponse;
  const refins = negativeData.refin.refinResponse;
  const checks = negativeData.check.checkResponse;
  const notarys = negativeData.notary.notaryResponse;

  const partners = optional.partner.partnershipResponse;
  const directors = optional.director
    ? optional.director.directorResponse
    : undefined;

  const tableFactory = new TableFactory("tableInfos");
  const tableGenerator = new TableGenerator(tableFactory);

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
        registration.consumerName,
        formatDocumentNumber(registration.documentNumber),
        formatDate(registration.birthDate),
        registration.statusRegistration,
        registration.address.city,
        registration.address.state
      ]
    ]
  );

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
        removeAccents(pefins[pefin].segmentDescription),
        pefins[pefin].creditorName,
        formatCurrency(pefins[pefin].amount),
        formatDate(pefins[pefin].occurrenceDate),
        pefins[pefin].address.city,
        pefins[pefin].address.state,
        "PEFIN [" +
          pefins[pefin].segmentDescription +
          " - " +
          formatCurrency(pefins[pefin].amount) +
          " - " +
          formatDate(pefins[pefin].occurrenceDate) +
          " ]"
      ];

      pefinAuxTable.push(partnerInfo);
    }

    pefinTable.table.body.push(pefinAuxTable);
  }

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
        removeAccents(refins[refin].segmentDescription),
        refins[refin].creditorName,
        formatCurrency(refins[refin].amount),
        formatDate(refins[refin].occurrenceDate),
        refins[refin].address.city,
        refins[refin].address.state,
        "REFIN [" +
          refins[refin].segmentDescription +
          " - " +
          formatCurrency(refins[refin].amount) +
          " - " +
          formatDate(refins[refin].occurrenceDate) +
          " ]"
      ];

      refinAuxTable.push(partnerInfo);
    }

    refinTable.table.body.push(refinAuxTable);
  }

  const checkTable = tableGenerator.createHeaderNegativeTable([
    "CHEQUE SEM FUNDO",
    negativeData.check.summary.count,
    "Valor Total",
    formatCurrency(negativeData.check.summary.balance)
  ]);

  if (checks !== undefined) {
    const checkAuxTable = [];

    for (let check = 0; check < checks.length; check++) {
      const partnerInfo = [
        removeAccents(checks[check].segmentDescription),
        checks[check].creditorName,
        formatCurrency(checks[check].amount),
        formatDate(checks[check].occurrenceDate),
        checks[check].address.city,
        checks[check].address.state,
        "CHEQUE [" +
          checks[check].segmentDescription +
          " - " +
          formatCurrency(checks[check].amount) +
          " - " +
          formatDate(checks[check].occurrenceDate) +
          " ]"
      ];

      checkAuxTable.push(partnerInfo);
    }

    checkTable.table.body.push(checkAuxTable);
  }

  const notaryTable = tableGenerator.createHeaderNegativeTable([
    "PROTESTO",
    negativeData.notary.summary.count,
    "Valor Total",
    formatCurrency(negativeData.notary.summary.balance)
  ]);

  if (notarys !== undefined) {
    const notaryAuxTable = [];

    for (let notary = 0; notary < notarys.length; notary++) {
      const partnerInfo = [
        removeAccents(notarys[notary].segmentDescription),
        notarys[notary].creditorName,
        formatCurrency(notarys[notary].amount),
        formatDate(notarys[notary].occurrenceDate),
        notarys[notary].address.city,
        notarys[notary].address.state,
        "PROTESTO [" +
          notarys[notary].segmentDescription +
          " - " +
          formatCurrency(notarys[notary].amount) +
          " - " +
          formatDate(notarys[notary].occurrenceDate) +
          " ]"
      ];

      notaryAuxTable.push(partnerInfo);
    }

    notaryTable.table.body.push(notaryAuxTable);
  }

  let partnerTable = undefined;

  if (partners !== undefined) {
    partnerTable = tableGenerator.createHeaderTable(
      ["Documento", "Porcentagem"],
      partners.map((partner) => [
        formatDocumentNumber(partner.businessDocument),
        convertToPercentage(partner.participationPercentage)
      ])
    );
  }

  let directorTable = undefined;

  if (directors !== undefined) {
    directorTable = tableGenerator.createHeaderTable(
      ["Documento", "Porcentagem"],
      directors.map((director) => [
        formatDocumentNumber(director.businessDocument),
        convertToPercentage(director.participationPercentage)
      ])
    );
  }

  const content = [];

  if (registrationTable) content.push(registrationTable);
  if (partnerTable) content.push(partnerTable);
  if (directorTable) content.push(directorTable);
  if (pefinTable) content.push(pefinTable);
  if (refinTable) content.push(refinTable);
  if (checkTable) content.push(checkTable);
  if (notaryTable) content.push(notaryTable);

  return {
    content,
    pageMargins: [20, 40, 20, 40],
    styles: {
      tableInfos: {
        fontSize: 9,
        alignment: "center"
      },
      tableHeader: {
        bold: true,
        fontSize: 10,
        color: "black",
        alignment: "center"
      },
      tableData: {
        fontSize: 9,
        color: "black",
        alignment: "center"
      }
    }
  };
}

const reportData = {
  reports: [
    {
      reportName: "COMBO_CONCESSAO_COM_SCORE_FINTECH",
      registration: {
        documentNumber: "00000197041",
        consumerName: "VIVIANE RIOS",
        motherName: "afvkp wrpbnvpq kxzyqkcgqbn",
        birthDate: "2002-07-19",
        statusRegistration: "REGULAR",
        address: {
          addressLine: "R VIRGEM 716",
          district: "JD SATELITE",
          zipCode: "12230420",
          country: "BRA",
          city: "SAO JOSE DOS CAMPOS",
          state: "SP"
        },
        phone: {
          regionCode: 55,
          areaCode: 11,
          phoneNumber: 974063008
        }
      },
      negativeData: {
        pefin: {
          pefinResponse: [],
          summary: {
            count: 0,
            balance: 0
          }
        },
        refin: {
          refinResponse: [],
          summary: {
            count: 0,
            balance: 0
          }
        },
        notary: {
          notaryResponse: [],
          summary: {
            count: 0,
            balance: 0
          }
        },
        check: {
          checkResponse: [],
          summary: {
            count: 0,
            balance: 0
          }
        }
      },
      score: {
        score: 900,
        scoreModel: "HFIN",
        defaultRate: "9,0"
      },
      facts: {
        inquiry: {
          inquiryResponse: [
            {
              occurrenceDate: "2023-08-17",
              segmentDescription: "",
              daysQuantity: 1
            },
            {
              occurrenceDate: "2023-08-02",
              segmentDescription: "",
              daysQuantity: 1
            },
            {
              occurrenceDate: "2023-05-05",
              segmentDescription: "INDUSTRIA DE INSUMOS",
              daysQuantity: 1
            },
            {
              occurrenceDate: "2022-12-07",
              segmentDescription: "INDUSTRIA DE INSUMOS",
              daysQuantity: 1
            },
            {
              occurrenceDate: "2022-12-01",
              segmentDescription: "INDUSTRIA DE INSUMOS",
              daysQuantity: 1
            }
          ],
          summary: {
            count: 5
          }
        },
        stolenDocuments: {
          stolenDocumentsResponse: [
            {
              occurrenceDate: "2022-07-16",
              inclusionDate: "2022-07-21T09:38:09",
              documentType: "CPF",
              documentNumber: "22053787830",
              issuingAuthority: "SSP",
              detailedReason: "ROUBADO",
              occurrenceState: "SP",
              phoneNumber: {
                regionCode: 55,
                areaCode: 11,
                phoneNumber: 974063008
              }
            }
          ],
          summary: {
            count: 1,
            balance: 0
          }
        }
      }
    }
  ],
  optionalFeatures: {
    partner: {
      partnershipResponse: [
        {
          businessDocument: "22174039000168",
          participationPercentage: 20,
          updateDate: "2021-08-05",
          participationInitialDate: "2021-07-24"
        },
        {
          businessDocument: "20198711000120",
          participationPercentage: 12.5,
          updateDate: "2021-08-05",
          participationInitialDate: "2021-08-05"
        },
        {
          businessDocument: "62173620000180",
          participationPercentage: 50,
          updateDate: "2022-07-01",
          participationInitialDate: "2020-07-01"
        }
      ],
      summary: {
        count: 3,
        balance: 0
      }
    }
  }
};

const pdfContent = generateReportContent(
  reportData.reports[0],
  reportData.optionalFeatures
);

const pdfDoc = pdfMake.createPdf(pdfContent);

pdfDoc.getBuffer((buffer) => {
  require("fs").writeFile("report.pdf", buffer, (err) => {
    if (err) {
      console.error("Error writing PDF to file:", err);
    } else {
      console.log("PDF saved to report.pdf");
    }
  });
});
