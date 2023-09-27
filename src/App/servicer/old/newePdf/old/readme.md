makeDd.js
```javascript
const { formatDocumentNumber, formatDate, styles,  TableFactory, TableGenerator } = require("./helpers");
// Rest of your code
const data =require( "./data")

// Create Identification Table
function createIdentificationTable(registration, tableGenerator) {
    return tableGenerator.createInfoTable(
        ["Razão Social", "CNPJ", "Data de Abertura", "Situação do CNPJ"],
        [
            [
                registration.consumerName,
                formatDocumentNumber(registration.documentNumber),
                formatDate(registration.birthDate),
                registration.statusRegistration,
            ],
        ]
    );
}

// Create Score Table
function createScoreTable(score, tableGenerator) {
    return tableGenerator.createScoreTable(score.score);
}

// Create Table for Negative Data (pefin, refin, notary, check)
function createNegativeDataTable(negativeData, tableGenerator) {
    const tables = [];

    if (negativeData.pefin && negativeData.pefin.pefinResponse.length > 0) {
        const pefinTable = tableGenerator.createAuxTable(
            ["Occurrence Date", "Legal Nature", "Contract ID", "Creditor Name", "Amount"],
            negativeData.pefin.pefinResponse.map((response) => [
                formatDate(response.occurrenceDate),
                response.legalNature,
                response.contractId,
                response.creditorName,
                response.amount,
            ])
        );
        tables.push({ text: "\nPEFIN", style: "content" }, pefinTable);
    }

    if (negativeData.refin && negativeData.refin.refinResponse.length > 0) {
        const refinTable = tableGenerator.createAuxTable(
            ["Occurrence Date", "Legal Nature", "Contract ID", "Creditor Name", "Amount"],
            negativeData.refin.refinResponse.map((response) => [
                formatDate(response.occurrenceDate),
                response.legalNature,
                response.contractId,
                response.creditorName,
                response.amount,
            ])
        );
        tables.push({ text: "\nREFIN", style: "content" }, refinTable);
    }

    if (negativeData.notary && negativeData.notary.notaryResponse.length > 0) {
        const notaryTable = tableGenerator.createAuxTable(
            ["Occurrence Date", "Legal Nature", "Contract ID", "Creditor Name", "Amount"],
            negativeData.notary.notaryResponse.map((response) => [
                formatDate(response.occurrenceDate),
                response.legalNature,
                response.contractId,
                response.creditorName,
                response.amount,
            ])
        );
        tables.push({ text: "\nNotary", style: "content" }, notaryTable);
    }

    if (negativeData.check && negativeData.check.checkResponse.length > 0) {
        const checkTable = tableGenerator.createAuxTable(
            ["Occurrence Date", "Legal Nature", "Contract ID", "Creditor Name", "Amount"],
            negativeData.check.checkResponse.map((response) => [
                formatDate(response.occurrenceDate),
                response.legalNature,
                response.contractId,
                response.creditorName,
                response.amount,
            ])
        );
        tables.push({ text: "\nCheck", style: "content" }, checkTable);
    }

    return tables;
}

// Create Optional Features Table
function createOptionalFeaturesTable(optionalFeatures, tableGenerator) {
    return tableGenerator.createInfoTable(
        ["Business Document", "Company Name", "Participation Percentage", "Company Status"],
        optionalFeatures.partner.partnershipResponse.map((response) => [
            response.businessDocument,
            response.companyName,
            response.participationPercentage.toString(),
            response.companyStatus,
        ])
    );
}

// Main function to generate PDF content
function makeDd() {
    const report = data.reports[0];
    const registration = report.registration;
    const negativeData = report.negativeData;
    const score = report.score;

    const tableFactory = new TableFactory(styles.tableInfos);
    const tableGenerator = new TableGenerator(tableFactory);

    // Create Identification Table
    const identificationTable = createIdentificationTable(registration, tableGenerator);

    // Create Score Table
    const scoreTable = createScoreTable(score, tableGenerator);

    // Create Negative Data Tables (pefin, refin, notary, check)
    const negativeDataTables = createNegativeDataTable(negativeData, tableGenerator);

    // Create Optional Features Table
    const optionalFeaturesTable = createOptionalFeaturesTable(data.optionalFeatures, tableGenerator);

    return {
        background: function (currentPage) {
            return {
                canvas: [
                    {
                        type: "rect",
                        x: 0,
                        y: 0,
                        w: 595.276,
                        h: 841.890,
                        color: "#FFFFFF",
                    },
                ],
            };
        },
        content: [
            {
                table: {
                    widths: ["*"],
                    body: [
                        [
                            {
                                stack: [{ text: "Serasa", style: "header" }],
                                fillColor: "#ADD8E6",
                            },
                        ],
                    ],
                },
            },
            { style: "content", text: "\nIdentificação" },
            identificationTable,
            { style: "content", text: "\nScore" },
            scoreTable,
            // Add Negative Data Tables (pefin, refin, notary, check)
            ...negativeDataTables,
            // Add Optional Features Table
            { text: "\nOptional Features", style: "content" },
            optionalFeaturesTable,
        ],
        styles: styles,
        pageSize: { width: 595.276, height: 841.890 },
        pageMargins: [0, 0, 0, 0],
    };
}

const dd = makeDd();
console.log(JSON.stringify(dd));

```


helpers.js
```javascript
const diacritics =require( "diacritics");

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

// =-----
function createBackground() {
    return {
        canvas: [
            { type: "rect", x: 0, y: 0, w: 595.276, h: 841.89, color: "#FFFFFF" }
        ]
    };
}

const createRect = () => {
    return { type: "rect", x: 0, y: 0, w: 595.276, h: 841.89, color: "#FFFFFF" };
};

const createHeaderStack = (text) => {
    return {
        stack: [{ text, style: "header" }],
        fillColor: "#ADD8E6"
    };
};

function formatDocumentNumber(documentNumber) {
    const cleanNumber = documentNumber?.replace(/\D/g, ""); // Remove non-numeric characters

    if (cleanNumber?.length === 11) {
        return cleanNumber.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (cleanNumber?.length === 14) {
        return cleanNumber.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    } else {
        return "Número de documento inválido";
    }
}

// Função pra remover acentos
function removeAccents(inputString) {
    return diacritics.remove(inputString);
}

// Função pra formatar data ---> DD/MM/AAAA
function formatDate(inputDate) {
    const parts = inputDate.split("-");
    if (parts.length !== 3) {
        throw new Error("Formato de data inválido");
    }

    const formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
    return formattedDate;
}

// Função pra formatar data ---> MM/AAAA
function formatDateResume(inputDate) {
    const parts = inputDate.split("-");
    if (parts.length !== 3) {
        throw new Error("Formato de data inválido");
    }

    const formattedDate = `${parts[1]}/${parts[0]}`;
    return formattedDate;
}

// Função pra formatar valores monetáiros
function formatCurrency(inputValue) {
    const formattedValue = parseFloat(inputValue).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
    return formattedValue;
}
module.exports= {
    TableFactory,
    TableGenerator,
    createBackground,
    createRect,
    createHeaderStack,
    styles,
    formatDateResume,
    formatCurrency,
    formatDocumentNumber,
    removeAccents,
    formatDate
};

// const tableFactory = new TableFactory("tableScore");
// const tableGenerator = new TableGenerator(tableFactory);
//
// Usage examples
// const scoreTable = tableGenerator.createScoreTable(85);
// const summaryTable = tableGenerator.createSummaryTable("Summary", "Count", "$120");
// const infoTable = tableGenerator.createInfoTable(["Header1", "Header2", "Header3"], [["Value1", "Value2", "Value3"]]);
// console.log(scoreTable)

```



sample expected obj

```json
{"content":[{"table":{"widths":["*"],"body":[[{"stack":[{"text":"Serasa","style":"header"}],"fillColor":"#ADD8E6"}]]}},{"style":"content","text":"\nIdentificação"},{"style":"tableExample","table":{"widths":["auto","*","*","*"],"body":[[{"alignment":"center","bold":true,"text":"Razão Social"},{"alignment":"center","bold":true,"text":"CNPJ"},{"alignment":"center","bold":true,"text":"Data de Abertura"},{"alignment":"center","bold":true,"text":"Situação do CNPJ"}],[{"alignment":"center","text":"Garden Residencial Empreendimentos"},{"alignment":"center","text":"13.133.133/0001-02"},{"alignment":"center","text":"23/01/1998"},{"alignment":"center","text":"Ativo"}]]}},{"columns":[{"style":"tableScore","table":{"widths":["25%"],"body":[[{"text":"Score","alignment":"center","color":"#FFFFFF","bold":"true","fontSize":14}],[{"text":"830","alignment":"center","color":"#FFFFFF","bold":"true","fontSize":26}]]},"margin":[10,15,0,0]},{"text":[{"text":"\n\nProbabilidade de inadimplência\n---------------------------------------->","alignment":"center","color":"#F","bold":true,"fontSize":14}],"margin":[-250,0,0,0]},{"style":"tableScore","table":{"heights":[20],"widths":["25%"],"body":[[{"text":"7%","style":"centeredText","color":"#FFFFFF","bold":"true","fontSize":26}]]},"margin":[-95,30,0,0]}]},{"style":"content","text":"\nDados de negativação"},{"style":"tableResumo","table":{"widths":["14%","14%","14%","14%"],"body":[[{"alignment":"center","bold":true,"text":"Pefin","color":"#4B0082"},{"alignment":"center","bold":true,"color":"#4B0082","text":"1"},{"alignment":"center","bold":true,"color":"#4B0082","text":"Valor Total"},{"alignment":"center","bold":true,"color":"#4B0082","text":"2.500,00"}]]}},{"style":"tableInfos","table":{"widths":["*","*","*","*","*","*","*"],"body":[[{"alignment":"center","bold":true,"text":"Natureza"},{"alignment":"center","bold":true,"text":"Credor"},{"alignment":"center","bold":true,"text":"Valor"},{"alignment":"center","bold":true,"text":"Data"},{"alignment":"center","bold":true,"text":"Cidade"},{"alignment":"center","bold":true,"text":"Estado"},{"alignment":"center","bold":true,"text":"Resumo"}],[{"alignment":"center","text":"Outras operações"},{"alignment":"center","text":"Telefonica Brasil S.A"},{"alignment":"center","text":"2.500,00"},{"alignment":"center","text":"14/04/2023"},{"alignment":"center","text":"São Paulo"},{"alignment":"center","text":"SP"},{"alignment":"center","text":"Pefin [Outras Oper - Telefonica 08/2022]"}]]}},{"style":"tableResumo","table":{"widths":["14%","14%","14%","14%"],"body":[[{"alignment":"center","bold":true,"text":"Refin","color":"#4B0082"},{"alignment":"center","bold":true,"color":"#4B0082","text":"1"},{"alignment":"center","bold":true,"color":"#4B0082","text":"Valor Total"},{"alignment":"center","bold":true,"color":"#4B0082","text":"1.200,00"}]]}},{"style":"tableInfos","table":{"widths":["*","*","*","*","*","*","*"],"body":[[{"alignment":"center","bold":true,"text":"Natureza"},{"alignment":"center","bold":true,"text":"Credor"},{"alignment":"center","bold":true,"text":"Valor"},{"alignment":"center","bold":true,"text":"Data"},{"alignment":"center","bold":true,"text":"Cidade"},{"alignment":"center","bold":true,"text":"Estado"},{"alignment":"center","bold":true,"text":"Resumo"}],[{"alignment":"center","text":"Outras operações"},{"alignment":"center","text":"Bradesco"},{"alignment":"center","text":"1.200,00"},{"alignment":"center","text":"15/04/2023"},{"alignment":"center","text":"São Paulo"},{"alignment":"center","text":"SP"},{"alignment":"center","text":"Refin [Cred Cartão - Bradesco 04/2023]"}]]}},{"style":"tableResumo","table":{"widths":["14%","14%","14%","14%"],"body":[[{"alignment":"center","bold":true,"text":"Protestos","color":"#4B0082"},{"alignment":"center","bold":true,"color":"#4B0082","text":"1"},{"alignment":"center","bold":true,"color":"#4B0082","text":"Valor Total"},{"alignment":"center","bold":true,"color":"#4B0082","text":"2.300,00"}]]}},{"style":"tableInfos","table":{"widths":["*","*","*","*","*","*"],"body":[[{"alignment":"center","bold":true,"text":"Cartório"},{"alignment":"center","bold":true,"text":"Cidade"},{"alignment":"center","bold":true,"text":"UF"},{"alignment":"center","bold":true,"text":"Data"},{"alignment":"center","bold":true,"text":"Valor"},{"alignment":"center","bold":true,"text":"Resumo"}],[{"alignment":"center","text":"UN"},{"alignment":"center","text":"São Paulo"},{"alignment":"center","text":"SP"},{"alignment":"center","text":"18/05/2023"},{"alignment":"center","text":"2.300,00"},{"alignment":"center","text":"Protestos [São Paulo 05/2023]"}]]}},{"style":"tableResumo","table":{"widths":["14%","14%","14%","14%"],"body":[[{"alignment":"center","bold":true,"text":"Ação Judicial","color":"#4B0082"},{"alignment":"center","bold":true,"color":"#4B0082","text":"1"},{"alignment":"center","bold":true,"color":"#4B0082","text":"Valor Total"},{"alignment":"center","bold":true,"color":"#4B0082","text":"44.693,00"}]]}},{"style":"tableInfos","table":{"widths":["*","*","*","*","*","*"],"body":[[{"alignment":"center","bold":true,"text":"Natureza"},{"alignment":"center","bold":true,"text":"Cidade"},{"alignment":"center","bold":true,"text":"UF"},{"alignment":"center","bold":true,"text":"Data"},{"alignment":"center","bold":true,"text":"Valor"},{"alignment":"center","bold":true,"text":"Resumo"}],[{"alignment":"center","text":"Execução"},{"alignment":"center","text":"São Paulo"},{"alignment":"center","text":"SP"},{"alignment":"center","text":"18/05/2023"},{"alignment":"center","text":"44.693,00"},{"alignment":"center","text":"Ação Judicial [São Paulo 05/2023]"}]]}},{"style":"content","text":"\n\nParticipação Societaria"},{"style":"tableInfos","table":{"widths":["*","*","*"],"body":[[{"alignment":"center","bold":true,"text":"CPF/CNPJ"},{"alignment":"center","bold":true,"text":"Sócio"},{"alignment":"center","bold":true,"text":"Participação"}],[{"alignment":"center","text":"758.136.613-87"},{"alignment":"center","text":"ROGERIO ARAUJO COSTA"},{"alignment":"center","text":"100%"}]]}}],"styles":{"centeredText":{"alignment":"center","verticalAlignment":"middle"},"header":{"fontSize":18,"bold":true,"alignment":"center"},"content":{"fontSize":16,"color":"#4B0082","margin":[10,0,0,0],"bold":"true,"},"tableExample":{"width":"100%","margin":[10,5,10,0],"fillColor":"#F0FFFF"},"tableScore":{"margin":[10,15,10,0],"fillColor":"#4682B4"},"tableInadimplencia":{"margin":[10,15,10,0],"fillColor":"#4682B4"},"tableResumo":{"width":"100%","margin":[10,15,0,0],"fillColor":"#DCDCDC"},"tableInfos":{"width":"100%","margin":[10,0.4,10,0],"fillColor":"#F0FFFF"}},"pageSize":{"width":595.276,"height":841.89},"pageMargins":[0,0,0,0]}

```
