const diacritics = require("diacritics");

// Styles
const styles = {
  centeredText: { alignment: "center", verticalAlignment: "middle" },
  header: { fontSize: 10, bold: true, alignment: "center", color: "#4B0082" },
  content: {
    fontSize: 8,
    margin: [10, 0, 0, 0],
    bold: true,
    alignment: "center"
  },
  contentPDF: {
    fontSize: 12,
    color: "#4B0082",
    bold: true,
    margin: [10, 0, 0, 0]
  },
  tableScore: { margin: [10, 15, 10, 0], fillColor: "#4682B4" },
  tableResumo: { width: "100%", margin: [10, 15, 10, 0], fillColor: "#DCDCDC" },
  tableInfos: { width: "100%", margin: [10, 0.4, 10, 0], fillColor: "#F0FFFF" }
};

// TableFactory Class
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

// TableGenerator Class
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
    const headerRow = headers.map((header) =>
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

// Helper functions
function createBackground() {
  return {
    canvas: [
      { type: "rect", x: 0, y: 0, w: 595.276, h: 841.89, color: "#FFFFFF" }
    ]
  };
}

function createRect() {
  return { type: "rect", x: 0, y: 0, w: 595.276, h: 841.89, color: "#FFFFFF" };
}

function createHeaderStack(text) {
  return {
    stack: [{ text, style: "header" }],
    fillColor: "#ADD8E6"
  };
}

function formatDocumentNumber(documentNumber) {
  const cleanNumber = documentNumber.replace(/\D/g, ""); // Remove non-numeric characters

  if (cleanNumber.length === 11) {
    // CPF has 11 digits
    return cleanNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (cleanNumber.length === 14) {
    // CNPJ has 14 digits
    return cleanNumber.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
        "$1.$2.$3/$4-$5"
    );
  } else {
    return "Invalid document number";
  }
}

function removeAccents(inputString) {
  return diacritics.remove(inputString);
}

function formatDate(inputDate) {
  const parts = inputDate.split("-");
  if (parts.length !== 3) {
    throw new Error("Invalid date format");
  }
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function formatDateResume(inputDate) {
  const parts = inputDate.split("-");
  if (parts.length !== 3) {
    throw new Error("Invalid date format");
  }
  return `${parts[1]}/${parts[0]}`;
}

function formatCurrency(inputValue) {
  return parseFloat(inputValue).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

const data = {
  reports: [
    {
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
          pefinResponse: [
            {
              occurrenceDate: "2023-01-01",
              legalNatureId: "001",
              legalNature: "Loan Default",
              contractId: "CON12345",
              creditorName: "ABC Bank",
              amount: 3000,
              city: "SAO PAULO",
              federalUnit: "SP",
              publicAgency: false,
              principal: true
            }
          ],
          summary: {
            count: 1,
            balance: 3000
          }
        },
        refin: {
          refinResponse: [
            {
              occurrenceDate: "2023-02-15",
              legalNatureId: "002",
              legalNature: "Credit Card Debt",
              contractId: "CON67890",
              creditorName: "DEF Credit",
              amount: 1500,
              city: "RIO DE JANEIRO",
              federalUnit: "RJ",
              publicAgency: false,
              principal: false
            }
          ],
          summary: {
            count: 1,
            balance: 1500
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
        range: "C",
        defaultRate: "9,0",
        codeMessage: 99,
        message: "ESPACO RESERVADO PARA MENSAGEM DA INSTITUICAO"
      },
      facts: {
        inquiry: {
          inquiryResponse: [
            {
              occurrenceDate: "2023-05-05",
              segmentDescription: "INDUSTRIA DE INSUMOS",
              daysQuantity: 1
            }
          ],
          summary: {
            count: 1
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
          companyName: "TKOZUJIX WLHM WUHRXLZX 07014131518",
          companyAlias: "IRUVK DCMHIKNWQ SN SYUMELGWFI",
          sinceDate: "2015-04-01",
          participationPercentage: 20,
          companyStatus: "SITUACAO DO CNPJ EM 21/07/2021: ATIVA",
          companyStatusCode: "ATIVA",
          companyState: "MG",
          companyStatusDate: "21/07/2021",
          updateDate: "2021-08-05"
        },
        {
          businessDocument: "20198711000120",
          companyName: "TXJNAR SW FUXKSRC IKSWRAI - DS",
          companyAlias: "EWLGRNIG OFK & ZKOFA",
          sinceDate: "2014-05-07",
          participationPercentage: 12.5,
          companyStatus: "SITUACAO DO CNPJ EM 21/07/2021: ATIVA",
          companyStatusCode: "ATIVA",
          companyState: "SP",
          companyStatusDate: "21/07/2021",
          updateDate: "2021-08-05"
        },
        {
          businessDocument: "62173620000180",
          companyName: "SERASA S/A",
          companyAlias: "SERASA LTDA DEMO DAY",
          participationPercentage: 50,
          companyStatus: "SITUACAO DO CNPJ EM 19/01/2023: ATIVA",
          companyStatusCode: "ATIVA",
          companyState: "PE",
          companyStatusDate: "19/01/2023",
          updateDate: "2022-07-01"
        }
      ],
      summary: {
        count: 3,
        balance: 0
      }
    }
  }
};

// Main function to generate PDF content
const makeDd = () => {
  const report = data.reports[0];
  const registration = report.registration;
  const negativeData = report.negativeData;
  const score = report.score;

  const tableFactory = new TableFactory(styles.tableInfos);
  const tableGenerator = new TableGenerator(tableFactory);

  const identificationTable = {
    style: 'tableExample',
    table: {
      widths: ['auto', '*', '*', '*'],
      body: [
        [
          { text: 'Razão Social', alignment: 'center', bold: true },
          { text: 'CNPJ', alignment: 'center', bold: true },
          { text: 'Data de Abertura', alignment: 'center', bold: true },
          { text: 'Situação do CNPJ', alignment: 'center', bold: true }
        ],
        [
          registration.consumerName,
          formatDocumentNumber(registration.documentNumber),
          formatDate(registration.birthDate),
          registration.statusRegistration
        ]
      ]
    }
  };

  const scoreTable = {
    columns: [
      {
        style: 'tableScore',
        table: {
          widths: ['25%'],
          body: [
            [{ text: 'Score', alignment: 'center', color: "#FFFFFF", bold: true, fontSize: 14 }],
            [{ text: score.score.toString(), alignment: 'center', color: "#FFFFFF", bold: true, fontSize: 26 }]
          ]
        },
        margin: [10, 15, 0, 0]
      },
      {
        text: [
          { text: '\n\nProbabilidade de inadimplência\n---------------------------------------->', alignment: 'center', color: '#F', bold: true, fontSize: 14 }
        ],
        margin: [-250, 0, 0, 0]
      },
      {
        style: 'tableScore',
        table: {
          heights: [20],
          widths: ['25%'],
          body: [
            [{ text: '7%', style: 'centeredText', color: "#FFFFFF", bold: true, fontSize: 26 }]
          ]
        },
        margin: [-95, 30, 0, 0]
      }
    ]
  };

  // Placeholder for other sections
  const otherSections = [];

  return {
    background: function(currentPage) {
      return { canvas: [{ type: 'rect', x: 0, y: 0, w: 595.276, h: 841.890, color: '#FFFFFF' }] };
    },
    content: [
      {
        table: {
          widths: ['*'],
          body: [
            [{
              stack: [
                { text: 'Serasa', style: 'header' }
              ],
              fillColor: '#ADD8E6'
            }]
          ]
        }
      },
      { style: 'content', text: '\nIdentificação' },
      identificationTable,
      { style: 'content', text: '\nScore' },
      scoreTable,
      // Add other sections here
      ...otherSections,
    ],
    styles: styles,
    pageSize: { width: 595.276, height: 841.890 },
    pageMargins: [0, 0, 0, 0]
  };
};

const dd = makeDd();
console.log(JSON.stringify(dd));
