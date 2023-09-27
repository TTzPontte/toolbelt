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
